=== L15 | ARM templates e Bicep | A | 60
questions: Q013,Q014,Q015,Q184,Q194,Q195,Q196,Q162,Q516,Q534,Q1089,Q1026,Q873,Q870,Q268,Q972,Q526,Q1067,Q1047,Q540,Q020,Q156,Q049
predict: Q534
## overview
Testa ler, modificar e implantar templates ARM e arquivos Bicep.

- Escopos: RG = `New-AzResourceGroupDeployment`; assinatura = `New-AzDeployment`/`New-AzSubscriptionDeployment` (cria RGs); a `-Location` da assinatura guarda só os metadados (Q534, Q1089, Q1026, Q516).
- Modo **Complete** apaga o que não está no template (Q873).
- `copy`/`copyIndex()` em recursos e propriedades, `resourceGroup().location`, `dependsOn` com `resourceId()` (Q870, Q268, Q526, Q1067, Q1047, Q972).
- Location fixa no recurso ignora parâmetros e variáveis (Q162).
- Histórico em **RG > Deployments** mostra data, template e parâmetros (Q013–Q015, Q184, Q194–Q196).
- Senha via **referência de Key Vault** no arquivo de parâmetros (Q020, Q156); extensões (domain join com protectedSettings) (Q540); termos do Marketplace (Q049).

## steps
### 1. Template no escopo da assinatura (cria RGs com copy)
Salve como **rgs.json**:
```json
{
  "$schema": "https://schema.management.azure.com/schemas/2018-05-01/subscriptionDeploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "resources": [ {
    "type": "Microsoft.Resources/resourceGroups", "apiVersion": "2022-09-01",
    "name": "[concat('rg-az104-l15-', copyIndex())]", "location": "eastus",
    "copy": { "name": "rgcopy", "count": 3 } } ]
}
```
```powershell
New-AzSubscriptionDeployment -Name l15-rgs -Location westus -TemplateFile rgs.json
New-AzResourceGroupDeployment -ResourceGroupName rg-az104-l15-0 -TemplateFile rgs.json   # compare o erro
```

### 2. Storage com copy no RG (Bicep)
Salve como **st.bicep**:
```bicep
param prefix string = 'az104l15'
resource st 'Microsoft.Storage/storageAccounts@2023-01-01' = [for i in range(0, 3): {
  name: '${i}${prefix}${uniqueString(resourceGroup().id)}'
  location: resourceGroup().location
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
}]
```
```bash
az deployment group create -g rg-az104-l15-0 -f st.bicep
az deployment group create -g rg-az104-l15-0 -f st.bicep --mode Complete --parameters prefix=outro --what-if
```

### 3. Converter e exportar
```bash
az bicep decompile --file template-exportado.json      # ARM → Bicep
```
@ Azure: rg-az104-l15-0 > Settings > Deployments > (implantação) > Template — e Automation > Export template.

### 4. Senha do Key Vault
```bash
az keyvault create -g rg-az104-l15-1 -n az104-l15-kv$RANDOM --enabled-for-template-deployment true -o none
az keyvault secret set --vault-name <vault> -n vmSenha --value "$PASS" -o none
```
No arquivo de parâmetros:
```json
"adminPassword": { "reference": { "keyVault": { "id": "<id do vault>" }, "secretName": "vmSenha" } }
```

## test
1. Liste os RGs criados e a região deles.
2. Rode o what-if em modo Complete e veja o que seria **excluído**.
3. Implante uma VM de um quickstart com a senha vinda do Key Vault.
4. Abra RG > Deployments e veja horário, template e entradas.

## evidence
- `az deployment sub list -o table` e `az deployment group list -g rg-az104-l15-0 -o table`
- Saída do `--what-if` (Create / Delete / NoChange).

## expected
| Teste | Resultado |
|---|---|
| RGs com copy count 3 | rg-...-0, -1, -2 em East US, mesmo com -Location westus (Q1026, Q870) |
| Template de assinatura com cmdlet de RG | Erro de escopo (Q534, Q1089) |
| Complete com template diferente | Exclui o que não está no template (Q873) |
| Senha | Lida do vault, nunca em texto puro (Q156) |

## variations
- **Q162:** troque `location` por `"westus"` fixo e implante passando outro parâmetro: o recurso vai para West US.
- **Q049:** implante uma imagem do Marketplace com plano pela CLI; aceite antes com `az vm image terms accept` (ou `Set-AzMarketplaceTerms -Accept`).
- **Q540:** extensão `JsonADDomainExtension` com a senha em `protectedSettings`.

## breakit
Remova o `--enabled-for-template-deployment` do vault: a implantação falha ao ler o segredo.

## cleanup
```bash
for i in 0 1 2; do az group delete -n rg-az104-l15-$i --yes --no-wait; done
```

## refs
- https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-to-subscription
- https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deployment-modes
- https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/copy-resources
- https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/key-vault-parameter

=== L16 | Máquinas virtuais: criação, tamanho, discos e manutenção | B | 75
questions: Q005,Q017,Q022,Q492,Q178,Q016,Q1151,Q173,Q490,Q166,Q167,Q168,Q504,Q263,Q1022,Q201,Q570,Q612
predict: Q490
## overview
Testa as operações do dia a dia com VMs.

- Criar Linux com **cloud-init** (`az vm create --custom-data`) (Q005).
- Redimensionar reinicia a VM; se o tamanho não existe no cluster, **desalocar** (em availability set, todas) (Q178, Q016, Q1151, Q201).
- Cota regional de vCPU conta VMs desalocadas (Q173).
- Disco de dados: anexar/desanexar **a quente**; cache Read-only para dados críticos; Premium ZRS (Q017, Q263).
- **D:** (Windows) é temporário e some no redeploy (Q490); **Redeploy** muda de host (Q166–Q168, Q504).
- Upload de VHD **fixo** (VHDX não), `Add-AzVhd` (Q022, Q492); Compute Gallery e geração da imagem (Q1022).
- Extensões e RDP exigem a VM **ligada** (Q570, Q612).

## steps
### 1. VM Linux com cloud-init
```bash
az group create -n rg-az104-l16 -l $LOC -o none
cat > cloud-init.txt <<'EOF2'
#cloud-config
package_upgrade: true
packages: [nginx]
write_files:
  - path: /usr/local/share/ca-certificates/minha-ca.crt
    content: |
      -----BEGIN CERTIFICATE-----
      (cole aqui a CA raiz de teste)
      -----END CERTIFICATE-----
runcmd: [update-ca-certificates]
EOF2
az vm create -g rg-az104-l16 -n az104-l16-lnx --image Ubuntu2204 --size Standard_B1s \
  --custom-data cloud-init.txt --admin-username $ADMIN --generate-ssh-keys --public-ip-sku Standard
```

### 2. VM Windows e disco de dados
```bash
az vm create -g rg-az104-l16 -n az104-l16-win --image Win2022AzureEditionCore --size Standard_B2s \
  --admin-username $ADMIN --admin-password "$PASS" --public-ip-address "" -o none
az vm disk attach -g rg-az104-l16 --vm-name az104-l16-win --name dados1 --new --size-gb 32 --sku Premium_LRS --caching ReadOnly
```

### 3. Cotas
@ Azure: Subscriptions > Sub-Lab > Settings > Usage + quotas — filtre por **East US** e veja *Total Regional vCPUs*.

### 4. Redeploy e disco temporário
Na Windows (Run command > RunPowerShellScript):
```powershell
"teste" | Out-File D:\temp.txt ; "teste" | Out-File C:\perm.txt ; Get-ChildItem C:\,D:\ -Filter *.txt
```
@ Azure: az104-l16-win > Help > **Redeploy + reapply** > Redeploy

## test
1. Abra http://<IP da Linux> (nginx) e confira o certificado em /etc/ssl/certs.
2. Desanexe o dados1 com a VM ligada e anexe-o à VM Linux.
3. Depois do redeploy, procure D:\temp.txt e C:\perm.txt.
4. Redimensione a Windows para outro tamanho da série B e depois para um tamanho indisponível (a lista mostra "not available").
5. Pare a VM pelo portal e tente RDP; tente instalar uma extensão.

## evidence
- Activity log: Redeploy, Deallocate, Update VM.
- `az vm get-instance-view` (PowerState, platformFaultDomain).

## expected
| Teste | Resultado |
|---|---|
| cloud-init | nginx instalado e CA confiável na criação (Q005) |
| Desanexar disco de dados | Sem parar as VMs (Q017) |
| Redeploy | D:\ apagado, C:\ mantido (Q490, Q167) |
| Redimensionar | VM reinicia (Q178) |
| VM desalocada | Sem RDP e sem extensões até ligar (Q570, Q612) |

## variations
- **Q022 / Q492:** converta um VHDX: `Convert-VHD -Path .\disco.vhdx -DestinationPath .\disco.vhd -VHDType Fixed` e suba com `Add-AzVhd`.
- **Q1022:** crie uma Compute Gallery e uma definição **Gen1**; tente criar a versão a partir do disco de uma VM Gen2.
- **Q173:** com a cota em 20 vCPUs, tente criar uma VM que ultrapasse o total (as desalocadas contam).

## breakit
Crie a VM com `--custom-data` apontando para um YAML inválido: a VM sobe, mas o cloud-init falha (veja `/var/log/cloud-init-output.log`).

## cleanup
`az group delete -n rg-az104-l16 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/virtual-machines/linux/tutorial-automate-vm-deployment
- https://learn.microsoft.com/en-us/azure/virtual-machines/resize-vm
- https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/redeploy-to-new-node-windows
- https://learn.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview

=== L17 | Availability sets, zonas e proximity placement groups | A | 45
questions: Q018,Q019,Q129,Q164,Q174,Q506,Q063,Q199,Q600,Q193,Q1095
predict: Q174
## overview
Testa a distribuição de VMs para alta disponibilidade.

- Availability set: até **3 fault domains** (conforme a região) e **20 update domains** (Q018, Q019, Q506).
- Manutenção planejada reinicia um UD por vez; falha de rack derruba um FD (Q129, Q164, Q174).
- **Zonas**: uma VM por zona resiste à perda de um datacenter, não da região; exige managed disks (Q063, Q199, Q600).
- **Proximity placement group** na mesma região do recurso (Q193, Q1095).

## steps
### 1. Availability set e VMs
```bash
az group create -n rg-az104-l17 -l $LOC -o none
az vm availability-set create -g rg-az104-l17 -n az104-l17-avset --platform-fault-domain-count 3 --platform-update-domain-count 20 -o none
for i in 1 2 3 4; do az vm create -g rg-az104-l17 -n az104-l17-as$i --image Ubuntu2204 --size Standard_B1s \
  --availability-set az104-l17-avset --admin-username $ADMIN --generate-ssh-keys --public-ip-address "" --nsg "" -o none; done
```

### 2. Zonas
```bash
for z in 1 2 3; do az vm create -g rg-az104-l17 -n az104-l17-z$z --image Ubuntu2204 --size Standard_B1s --zone $z \
  --admin-username $ADMIN --generate-ssh-keys --public-ip-address "" --nsg "" -o none; done
```

### 3. PPG
@ Azure: Proximity placement groups > Create — em **West US**; depois tente usá-lo numa VM de East US.

## test
1. `az vm availability-set show -g rg-az104-l17 -n az104-l17-avset` e o FD/UD de cada VM (`az vm get-instance-view --query instanceView.platformFaultDomain`).
2. Tente criar o availability set com 4 fault domains em East US.
3. No portal, crie uma VM com disco **não gerenciado** e procure Availability zone (o portal só aceita managed disks hoje).

## expected
| Teste | Resultado |
|---|---|
| VMs no set | Distribuídas por FD e UD (Q174) |
| 4 FDs em East US | Erro: máximo 3 (Q018) |
| Uma VM por zona | Sobrevive à perda de um datacenter (Q199) |
| PPG de outra região | Não aparece na lista (Q1095) |

## variations
- **Q164:** com 10 VMs em 10 UDs, a manutenção derruba no máximo 1 de cada vez.

## breakit
Tente mover uma VM existente para um availability set: não dá; é preciso recriar a VM a partir do disco.

## cleanup
`az group delete -n rg-az104-l17 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/virtual-machines/availability-set-overview
- https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview
- https://learn.microsoft.com/en-us/azure/virtual-machines/co-location

=== L18 | Virtual Machine Scale Sets | B | 60
questions: Q158,Q510,Q159,Q202,Q538,Q181,Q494,Q602
predict: Q510
## overview
Testa scale sets: orquestração, autoscale, upgrade policy e extensões.

- **Flexible** (padrão) × Uniform; no Flexible, a VM é criada já no set e na mesma região (Q181, Q602).
- Autoscale: limite mínimo/máximo, regra por métrica, duração e cooldown (Q158, Q510).
- Upgrade policy **Automatic/Rolling/Manual**; upgrade automático de SO em lotes de 20% (mínimo 1) (Q494).
- Software nas instâncias: **Custom Script Extension** ou **DSC** no `extensionProfile` (Q159, Q202, Q538).

## steps
### 1. Scale set com Custom Script
```bash
az group create -n rg-az104-l18 -l $LOC -o none
az vmss create -g rg-az104-l18 -n az104-l18-vmss --image Ubuntu2204 --vm-sku Standard_B1s --instance-count 2 \
  --orchestration-mode Uniform --upgrade-policy-mode Automatic --admin-username $ADMIN --generate-ssh-keys --lb-sku Standard
az vmss extension set -g rg-az104-l18 --vmss-name az104-l18-vmss --name CustomScript --publisher Microsoft.Azure.Extensions \
  --settings '{"commandToExecute":"apt-get update && apt-get install -y nginx"}'
```

### 2. Autoscale
@ Azure: az104-l18-vmss > Availability + scale > Scaling > Custom autoscale

- Mínimo 1, máximo 10, padrão 2.
- Scale out: CPU média > 75% por 10 min → +1 (cooldown 5).
- Scale in: CPU média < 25% por 10 min → −1.

### 3. Gerar carga
@ Azure: (uma instância) > Run command
```bash
sudo apt-get install -y stress-ng && stress-ng --cpu 0 --timeout 1200s
```

## test
1. Acompanhe Instances e o **Run history** do autoscale.
2. Mude o tamanho no modelo (Size) e veja as instâncias atualizarem (upgrade policy Automatic).
3. Acesse o IP do load balancer: nginx em todas as instâncias.

## evidence
- Scaling > **Run history** e Activity log (Autoscale scale up/down).

## expected
| Teste | Resultado |
|---|---|
| CPU alta por 10 min | +1 instância; nova janela após o cooldown (Q510) |
| CPU baixa | Desce até o mínimo (Q510, Q158) |
| Mudança de modelo com Automatic | Aplicada às instâncias (Q494) |
| Custom Script | nginx em todas (Q538) |

## variations
- **Q602:** crie um scale set **Flexible** e uma VM nova com `--vmss` apontando para ele, em RG diferente e na mesma região.

## breakit
Coloque o mínimo maior que o máximo: o portal não salva.

## cleanup
`az group delete -n rg-az104-l18 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-orchestration-modes
- https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-autoscale-portal
- https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-automatic-upgrade

=== L19 | App Service: planos, slots, escala, domínios e backup | B | 75
questions: Q176,Q182,Q1024,Q157,Q512,Q163,Q179,Q498,Q488,Q1028,Q875,Q767,Q169,Q909,Q989,Q536,Q759,Q902,Q568,Q1110,Q205,Q777,Q1032
predict: Q1028
## overview
Testa o App Service do ponto de vista do administrador.

- Plano = SO + região + tier; vários apps no mesmo plano; Windows e Linux em planos separados (Q176, Q182, Q1024, Q157, Q512).
- **Slots** e **autoscale** a partir do Standard; swap e rollback por swap (Q163, Q179, Q498, Q989).
- Autoscale: duração, cooldown, limite máximo (Q488, Q1028, Q875); scale up × scale out (Q767).
- Domínio personalizado: **CNAME** + **TXT asuid** (Q169, Q909); certificado do Key Vault (Q1032).
- Backup em storage account (blob), filtro `_backup.filter`, retenção 0 = indefinida (Q536, Q759, Q902).
- **VNet integration** (saída) × ASE (dentro da VNet) (Q568, Q1110); Website Contributor (Q205); Web server logging (Q777).

## steps
### 1. Plano e app
```bash
az group create -n rg-az104-l19 -l $LOC -o none
az appservice plan create -g rg-az104-l19 -n az104-l19-plan --sku B1 --is-linux
az webapp create -g rg-az104-l19 -p az104-l19-plan -n az104-l19-app$RANDOM --runtime "NODE:20-lts"
```

### 2. Slots exigem Standard
@ Azure: (app) > Deployment > Deployment slots — veja o aviso de upgrade. Depois: @ Azure: (plano) > Settings > Scale up > **S1** (ou P0v3).

Crie o slot **staging**, mude o *App settings* dele e faça **Swap**; faça swap de novo para voltar.

### 3. Autoscale
@ Azure: (plano) > Settings > Scale out (App Service plan) > Rules Based > Custom autoscale — memória > 70% por 15 min → +1, cooldown 5, máximo 5.

### 4. Domínio personalizado (se tiver um domínio)
@ Azure: (app) > Settings > Custom domains > Add custom domain — copie o **Custom Domain Verification ID** e crie no DNS:
```text
www       CNAME  <app>.azurewebsites.net
asuid.www TXT    <Custom Domain Verification ID>
```

### 5. Backup
@ Azure: (app) > Settings > Backups > Configure custom backups — storage account e container; agende diário. Na raiz do site, crie `D:\home\site\wwwroot\_backup.filter` (Windows) com `\site\wwwroot\Pasta2`.

### 6. Logs e rede
- @ Azure: (app) > Monitoring > App Service logs — **Web server logging** = File System; abra o **Log stream**.
- @ Azure: (app) > Settings > Networking > Virtual network integration — integre a uma sub-rede delegada.

## test
1. Crie um app .NET Framework (ASP.NET 4.8) no plano Linux.
2. Crie um segundo app Node no mesmo plano.
3. Gere erros 500 e veja o log stream.
4. Com a VNet integration, acesse uma VM interna pelo Kudu Console (`curl` / `tcpping`).

## evidence
- Scale out > Run history; Deployment slots > swap history; Backups > lista.

## expected
| Teste | Resultado |
|---|---|
| ASP.NET 4.8 em plano Linux | Não disponível (Q182, Q1024) |
| Dois apps no mesmo plano | Permitido (Q176) |
| Slots no Basic | Pede scale up (Q163) |
| Swap de volta | Rollback imediato (Q498) |
| VNet integration | Saída para a VNet; não controla a entrada (Q568, Q1110) |

## variations
- **Q205:** dê **Website Contributor** a um desenvolvedor para publicar com a conta Entra.
- **Q1032:** importe um certificado do Key Vault: o principal **Microsoft Azure App Service** precisa de *get secret* (access policy) no vault.

## breakit
Apague o registro TXT asuid e tente validar o domínio: a verificação falha.

## cleanup
`az group delete -n rg-az104-l19 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans
- https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots
- https://learn.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-domain
- https://learn.microsoft.com/en-us/azure/app-service/manage-backup

=== L20 | Containers: ACR, Container Instances e Container Apps | A | 60
questions: Q1114,Q1150,Q1127,Q1132,Q1136,Q1137,Q1138,Q1139,Q1128,Q1043,Q128,Q924,Q1120,Q177,Q1131,Q1030,Q1034
predict: Q1114
## overview
Testa o provisionamento de containers no portal e na CLI.

- **ACR**: tiers (private endpoint e dedicated data endpoint só no Premium; Tasks em todos), admin user (usuário = nome do registry), content trust (Q1114, Q1128, Q1139, Q1127).
- `az acr create` + `docker push` (Q1132); ACI puxando do ACR com admin user ou managed identity/AcrPull (Q1136, Q1150).
- **ACI**: DNS name label só com rede pública; rede privada (VNet); volumes **Azure Files**; container groups multi-container só Linux; restartPolicy (Q1043, Q1120, Q128, Q924, Q177).
- **Container Apps**: só Linux, autoscale nativo; ambiente na VNet com sub-rede dedicada (/27 no mínimo com workload profiles) (Q1131, Q1030, Q1034).

## steps
### 1. Registry e imagem
```bash
az group create -n rg-az104-l20 -l $LOC -o none
ACR=az104l20acr$RANDOM
az acr create -g rg-az104-l20 -n $ACR --sku Basic --admin-enabled true
az acr import -n $ACR --source mcr.microsoft.com/azuredocs/aci-helloworld:latest --image hello:v1
az acr credential show -n $ACR
```

### 2. ACI a partir do ACR
```bash
az container create -g rg-az104-l20 -n az104-l20-aci --image $ACR.azurecr.io/hello:v1 \
  --registry-login-server $ACR.azurecr.io --registry-username $ACR \
  --registry-password "$(az acr credential show -n $ACR --query passwords[0].value -o tsv)" \
  --dns-name-label az104l20$RANDOM --ports 80 --os-type Linux --cpu 1 --memory 1.5 --restart-policy OnFailure
```

### 3. Container Apps
```bash
az extension add -n containerapp --upgrade -o none
az containerapp up -g rg-az104-l20 -n az104-l20-ca --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest \
  --ingress external --target-port 80 --location $LOC
az containerapp update -g rg-az104-l20 -n az104-l20-ca --min-replicas 0 --max-replicas 5 \
  --scale-rule-name http --scale-rule-type http --scale-rule-http-concurrency 10
```

### 4. Recursos Premium
@ Azure: $ACR > Settings > Networking — veja as abas Public access / Private access e a opção de dedicated data endpoint. @ Azure: $ACR > Overview > **Update** (SKU) para Premium e confira de novo.

## test
1. `docker login $ACR.azurecr.io` com o usuário mostrado pelo `credential show`.
2. Abra o FQDN do ACI e o do Container App.
3. No portal, crie um ACI **Windows** e mude Networking type para Private; crie um ACI com DNS name label e rede privada.
4. Gere carga no Container App (`hey`, `ab`) e veja as réplicas subirem.

## evidence
- `az container show --query "{ip:ipAddress.fqdn,state:instanceView.state}"`
- Container App > Revisions and replicas.

## expected
| Teste | Resultado |
|---|---|
| Usuário do admin user | O nome do registry (Q1114) |
| Private endpoint no Basic | Indisponível até o Premium (Q1128, Q1139) |
| DNS label com rede privada | Não disponível (Q1043) |
| Container App | Escala de 0 a 5 réplicas (Q1131) |

## variations
- **Q128:** monte um Azure Files como volume no ACI (`--azure-file-volume-share-name`).
- **Q924:** tente um container group YAML com dois containers Windows.

## breakit
Desabilite o admin user e recrie o ACI com as credenciais antigas: o pull falha com *unauthorized*.

## cleanup
`az group delete -n rg-az104-l20 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/container-registry/container-registry-skus
- https://learn.microsoft.com/en-us/azure/container-instances/container-instances-overview
- https://learn.microsoft.com/en-us/azure/container-apps/networking
- https://learn.microsoft.com/en-us/azure/container-apps/scale-app
