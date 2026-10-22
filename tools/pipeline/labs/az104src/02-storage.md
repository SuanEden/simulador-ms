=== L08 | Contas de armazenamento: tipos, redundância e camadas | A | 45
questions: Q012,Q117,Q120,Q137,Q276,Q1146,Q104,Q134,Q148,Q107,Q270,Q125,Q278,Q238,Q823,Q825,Q244,Q896,Q141,Q213
predict: Q276
## overview
Testa a escolha do tipo de conta, da redundância e do tier, e o que dá para mudar depois de criada.

- **GPv2** (StorageV2) tem tudo; GPv1 não tem tiers nem ZRS; **BlockBlobStorage** e **FileStorage** são Premium (Q104, Q134, Q148).
- LRS = 3 cópias no datacenter; **ZRS** = 3 zonas, síncrono; GRS/RA-GRS = outra região, assíncrono; RA-GRS lê a secundária (Q012, Q120, Q125, Q278).
- Converter para ZRS: Standard GPv2 com LRS (Q117, Q276, Q1146); GPv1 → primeiro upgrade para GPv2 (Q137).
- Archive exige LRS/GRS/RA-GRS (Q227 no L11); share Cool só em GPv2; SMB Multichannel só em Premium Files (Q238, Q825).
- **Routing preference** (Microsoft × Internet) e **Encryption type** mudam depois de criar; infraestrutura dupla não (Q244, Q896).
- Ler templates exportados: networkAcls, sku, restorePolicy (Q141, Q213).

## steps
### 1. Contas de tipos diferentes
```bash
az group create -n rg-az104-l08 -l $LOC -o none
R=$RANDOM
az storage account create -g rg-az104-l08 -n az104l08v2$R   --kind StorageV2        --sku Standard_LRS -o none
az storage account create -g rg-az104-l08 -n az104l08v1$R   --kind Storage          --sku Standard_LRS -o none
az storage account create -g rg-az104-l08 -n az104l08bb$R   --kind BlockBlobStorage --sku Premium_LRS  -o none
az storage account create -g rg-az104-l08 -n az104l08fs$R   --kind FileStorage      --sku Premium_LRS  -o none
az storage account create -g rg-az104-l08 -n az104l08ra$R   --kind StorageV2        --sku Standard_RAGRS -o none
```

### 2. Pelo portal
@ Azure: Storage accounts > + Create

- Em Basics, mude **Performance** para Premium e veja as opções de **Premium account type** (Block blobs, File shares, Page blobs).
- Em Networking, veja **Routing preference** (Microsoft network routing / Internet routing).

### 3. Redundância
@ Azure: az104l08v2... > Data management > **Redundancy**

### 4. Exportar o template
@ Azure: az104l08v2... > Automation > Export template

## test
1. Na conta v2 (LRS), mude para ZRS; na RA-GRS, tente ZRS; na GPv1, procure a opção de tier padrão.
2. Na GPv1: Settings > Configuration > **Upgrade** para GPv2.
3. Na conta Premium File shares, crie um share e veja **SMB Multichannel** (Settings > File share settings).
4. Na v2: Settings > Configuration — mude o access tier (Hot/Cool) e a Routing preference.
5. Na RA-GRS: Endpoints — veja o endpoint **-secondary**.

## evidence
- `az storage account show -n <conta> --query "{kind:kind,sku:sku.name,tier:accessTier}"`
- Template exportado: `networkAcls.defaultAction`, `sku.name`, `kind`.

## expected
| Teste | Resultado |
|---|---|
| LRS → ZRS (GPv2) | Conversão disponível (Q276) |
| RA-GRS → ZRS | Vai para GZRS; ZRS direto não (Q1146) |
| GPv1 | Sem tiers; ZRS só depois do upgrade (Q137) |
| SMB Multichannel | Só na conta Premium FileStorage (Q238) |
| Leitura na secundária | Só com RA-GRS/RA-GZRS (Q012) |

## variations
- **Q107:** crie pela CLI com `--kind StorageV2 --sku Standard_GRS` para tiers + proteção regional com menor custo.
- **Q270:** Data Lake Gen2 = `--hns true`, com Cool + GRS.
- **Q141 / Q213:** no template exportado, mude `defaultAction` para Deny e veja o efeito de `restorePolicy.days`.

## breakit
Tente criar uma conta **Premium** com **GRS**: a opção não existe (Premium só tem LRS/ZRS).

## cleanup
`az group delete -n rg-az104-l08 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview
- https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy
- https://learn.microsoft.com/en-us/azure/storage/common/redundancy-migration

=== L09 | Firewall de armazenamento, endpoints de serviço e endpoints privados | B | 60
questions: Q115,Q118,Q1144,Q1153,Q229,Q283,Q272,Q907,Q1101,Q1040
predict: Q1153
## overview
Testa como restringir o acesso de rede a um storage account.

- **Selected networks** + regras de VNet (com service endpoint) e de IP público (Q115, Q118, Q1144).
- Regras de IP **não valem para clientes na mesma região**; VMs da região usam a regra de VNet (Q1153).
- **Service endpoint** (Microsoft.Storage) vale por serviço, não por conta (Q272, Q907); **service endpoint policy** limita a contas específicas (Q1101, Q1040).
- **Private endpoint**: IP privado na VNet, tráfego pelo backbone (Q229, Q283).
- *Allow trusted Microsoft services* (ex.: Azure Backup) (Q115).

## steps
### 1. Rede e VMs
```bash
az group create -n rg-az104-l09 -l $LOC -o none
az network vnet create -g rg-az104-l09 -n az104-l09-vnet --address-prefix 10.90.0.0/16 \
  --subnet-name snet-se --subnet-prefix 10.90.1.0/24 -o none
az network vnet subnet create -g rg-az104-l09 --vnet-name az104-l09-vnet -n snet-pe --address-prefix 10.90.2.0/24 -o none
vm_teste rg-az104-l09 az104-l09-vm1 az104-l09-vnet snet-se Ubuntu2204
vm_teste rg-az104-l09 az104-l09-vm2 az104-l09-vnet snet-pe Ubuntu2204
ST=az104l09st$RANDOM; az storage account create -g rg-az104-l09 -n $ST --sku Standard_LRS -o none
az storage container create --account-name $ST -n teste -o none   # usa a chave da conta
```

### 2. Service endpoint + firewall
```bash
az network vnet subnet update -g rg-az104-l09 --vnet-name az104-l09-vnet -n snet-se --service-endpoints Microsoft.Storage -o none
az storage account update -g rg-az104-l09 -n $ST --default-action Deny -o none
az storage account network-rule add -g rg-az104-l09 --account-name $ST --vnet-name az104-l09-vnet --subnet snet-se -o none
az storage account network-rule add -g rg-az104-l09 --account-name $ST --ip-address $(curl -s ifconfig.me) -o none
```
@ Azure: (conta) > Security + networking > Networking > Firewalls and virtual networks — confira **Enabled from selected virtual networks and IP addresses**.

### 3. Private endpoint para a vm2
@ Azure: (conta) > Networking > Private endpoint connections > + Private endpoint — subresource **blob**, VNet az104-l09-vnet, sub-rede **snet-pe**, integração com Private DNS zone **privatelink.blob.core.windows.net**.

### 4. Service endpoint policy (opcional)
@ Azure: Service endpoint policies > Create — região East US, Resources: **somente esta conta**; associe à snet-se.

## test
1. Na vm1 (@ Azure: az104-l09-vm1 > Operations > Run command > RunShellScript): `nslookup <conta>.blob.core.windows.net` e `curl -s -o /dev/null -w '%{http_code}' 'https://<conta>.blob.core.windows.net/teste?restype=container'`.
2. Na vm2: o mesmo nslookup — veja o IP 10.90.2.x.
3. Do seu notebook (IP liberado) e de outra rede (celular) abra o container no Storage Explorer.
4. Com a policy do passo 4, da vm1 tente acessar **outra** conta de storage.

## evidence
- Respostas **403 AuthorizationFailure** (bloqueio de rede) × 404/409 (passou pela rede).
- Effective routes da NIC da vm1: rota **VirtualNetworkServiceEndpoint**.

## expected
| Teste | Resultado |
|---|---|
| vm1 (sub-rede com endpoint liberada) | Acessa (Q1153) |
| vm2 via private endpoint | Resolve para IP privado e acessa (Q229, Q283) |
| Notebook com IP na lista | Acessa; outra rede é bloqueada (Q118) |
| vm1 → outra conta com a policy | Bloqueada (Q1101) |

## variations
- **Q1153:** dê IP público a uma VM em sub-rede **sem** endpoint e libere esse IP no firewall: continua bloqueado (mesma região).
- **Q115:** com o backup de VMs com discos não gerenciados, *Allow trusted Microsoft services* precisa estar marcado.
- **Q907:** um único service endpoint Microsoft.Storage cobre todas as contas de storage.

## breakit
Remova o service endpoint da snet-se mantendo a regra de VNet: o portal avisa e o acesso da vm1 cai.

## cleanup
`az group delete -n rg-az104-l09 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security
- https://learn.microsoft.com/en-us/azure/storage/common/storage-private-endpoints
- https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoint-policies-overview

=== L10 | Acesso a dados: chaves, SAS, políticas de acesso armazenadas e RBAC | A | 60
questions: Q223,Q269,Q135,Q266,Q280,Q224,Q102,Q255,Q145,Q106,Q284,Q1147,Q1148,Q1149,Q240,Q249,Q260,Q219,Q1125
predict: Q284
## overview
Testa as formas de autorizar o acesso aos dados do storage.

- **Access key**: acesso total a todos os serviços; pode ser desabilitada (Q223, Q284).
- **SAS**: serviços, resource types (Service/Container/Object), permissões, IP, protocolo, validade (Q269, Q135, Q266, Q280).
- **Stored access policy**: até 5 por container; permite revogar SAS (Q224).
- RBAC de dados (Storage Blob Data Reader/Contributor) × plano de controle (Reader, Storage Account Contributor) (Q102, Q255, Q145, Q284).
- Chaves: Reader and Data Access lista; **Storage Account Key Operator Service Role** lista e regenera (Q1147–Q1149).
- **ABAC**: condições em blobs e filas, inclusive por **blob index tags** (Q240, Q249, Q260).
- Managed identity + IAM para apps; SAS com expiração para acesso temporário (Q106).

## steps
### 1. Conta e dados
```bash
az group create -n rg-az104-l10 -l $LOC -o none
ST=az104l10st$RANDOM; az storage account create -g rg-az104-l10 -n $ST --sku Standard_LRS -o none
KEY=$(az storage account keys list -g rg-az104-l10 -n $ST --query [0].value -o tsv)
az storage container create --account-name $ST --account-key $KEY -n cont1 -o none
echo teste > a.txt; az storage blob upload --account-name $ST --account-key $KEY -c cont1 -n a.txt -f a.txt -o none
az storage share create --account-name $ST --account-key $KEY -n share1 -o none
```

### 2. SAS de conta só para Table
@ Azure: (conta) > Security + networking > Shared access signature — Allowed services: **Table**; Resource types: todos; Signing key: key1.

### 3. SAS de container ligado a stored access policy
@ Azure: (conta) > Containers > cont1 > Settings > Access policy > + Add policy (Read, List, 1 dia)

```bash
END=$(date -u -d "+1 day" +%Y-%m-%dT%H:%MZ)
az storage container generate-sas --account-name $ST --account-key $KEY -n cont1 --policy-name <nome> -o tsv
az storage container generate-sas --account-name $ST --account-key $KEY -n cont1 --permissions r \
   --expiry $END --https-only -o tsv
```

### 4. RBAC de dados
@ Azure: (conta) > Access control (IAM) > Add role assignment

| Usuário | Função |
|---|---|
| sc-user01 | Reader (só) |
| sc-user02 | Reader + Storage Blob Data Contributor |
| sc-user03 | Storage Account Key Operator Service Role |

### 5. Condição (ABAC)
Adicione a sc-user01 a **Storage Blob Data Reader** com condição: *Read a blob* somente quando o blob index tag `Projeto` = `X`. Marque um blob com essa tag (Blob > Blob index tags).

## test
1. sc-user01 e sc-user02 abrem o container no portal com **Microsoft Entra user account** (Authentication method).
2. Use o SAS de conta (Table) para ler um blob.
3. Use o SAS de container sem `List` para listar o container, e com o nome do blob para baixar.
4. Apague a stored access policy e teste o SAS ligado a ela.
5. sc-user03 regenera a key2; sc-user01 tenta listar as chaves.
6. @ Azure: (conta) > Settings > Configuration > **Allow storage account key access = Disabled** e teste a key1.

## evidence
- Respostas 403 `AuthorizationPermissionMismatch` (RBAC) × `AuthenticationFailed` (SAS/chave).
- Activity log: `Regenerate Storage Account Keys`.

## expected
| Teste | Resultado |
|---|---|
| Só Reader | Vê a conta, não os dados (Q284) |
| Reader + Blob Data Contributor | Lê e grava pelo portal (Q145, Q102) |
| SAS de Table em blob | Negado (Q223) |
| SAS sem List | Baixa por nome, não lista (Q266, Q280) |
| Stored access policy apagada | SAS revogado (Q224) |
| Key Operator | Regenera chaves (Q1148) |
| Key access desabilitado | Chave não funciona mais (Q284) |
| Condição por tag | Só lê blobs com Projeto=X (Q249) |

## variations
- **Q135:** gere SAS com faixa de IP e só HTTPS e teste fora da faixa.
- **Q240:** tente adicionar condição a uma função de **File** ou **Table**: só Blob e Queue têm condições.
- **Q1125:** rotação de chaves: Key Vault (managed storage keys, legado) ou **key expiration policy** + lembrete.

## breakit
Gere um SAS com hora de início no futuro e teste na hora: "Signature not valid in the specified time frame".

## cleanup
`az group delete -n rg-az104-l10 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview
- https://learn.microsoft.com/en-us/rest/api/storageservices/define-stored-access-policy
- https://learn.microsoft.com/en-us/azure/storage/blobs/authorize-access-azure-active-directory
- https://learn.microsoft.com/en-us/azure/storage/blobs/storage-auth-abac

=== L11 | Blob: ciclo de vida, controle de versão, imutabilidade e replicação | B | 60
questions: Q138,Q144,Q212,Q226,Q281,Q215,Q232,Q227,Q275,Q143,Q146,Q827,Q931,Q279
predict: Q212
## overview
Testa a gestão de dados em Blob storage.

- **Lifecycle management**: GPv2, BlobStorage e Premium block blob; ação mais barata vence (delete < archive < cool) (Q138, Q226, Q227).
- Filtros: `prefixMatch` "container/prefixo", `blobTypes` blockBlob; condições `daysAfterModificationGreaterThan` (Q215, Q232, Q212, Q281, Q144).
- Bloco `version` age em **versões anteriores**, não em snapshots (Q275).
- **Imutabilidade**: retenção por tempo e legal hold em Access policy do container (Q143).
- **Object replication**: GPv2/premium block blob, versionamento nas duas contas e change feed na origem (Q146, Q827); cópia para região escolhida (Q931).
- **Blob inventory** com filtro de prefixo e saída CSV (Q279).

## steps
### 1. Duas contas
```bash
az group create -n rg-az104-l11 -l $LOC -o none
SRC=az104l11src$RANDOM; DST=az104l11dst$RANDOM
az storage account create -g rg-az104-l11 -n $SRC --sku Standard_LRS -l $LOC  -o none
az storage account create -g rg-az104-l11 -n $DST --sku Standard_LRS -l $LOC2 -o none
for c in $SRC $DST; do az storage account blob-service-properties update -g rg-az104-l11 -n $c --enable-versioning true -o none; done
az storage account blob-service-properties update -g rg-az104-l11 -n $SRC --enable-change-feed true -o none
```

### 2. Lifecycle
@ Azure: $SRC > Data management > Lifecycle management > Add a rule — ou JSON (Code view):

```json
{ "rules": [ { "enabled": true, "name": "rule1", "type": "Lifecycle",
  "definition": {
    "actions": { "baseBlob": {
        "tierToCool":    { "daysAfterModificationGreaterThan": 30 },
        "tierToArchive": { "daysAfterModificationGreaterThan": 90 },
        "delete":        { "daysAfterModificationGreaterThan": 365 } },
      "version": { "delete": { "daysAfterCreationGreaterThan": 30 } } },
    "filters": { "blobTypes": [ "blockBlob" ], "prefixMatch": [ "cont1/finance" ] } } } ] }
```

### 3. Imutabilidade
@ Azure: $SRC > Containers > cont-legal > Access policy > Immutable blob storage > Add policy — **Time-based retention**, 1 dia; depois **Legal hold** com a tag `caso1`.

### 4. Object replication
@ Azure: $SRC > Data management > Object replication > Create replication rules — destino $DST (West US), container de origem cont1, destino cont1-replica.

### 5. Blob inventory
@ Azure: $SRC > Data management > Blob inventory > Add rule — Object type Blob, Blob types: Block blobs, Prefix match `cont1/finance`, Daily, CSV.

## test
1. Envie um arquivo para cont1 e veja-o aparecer em $DST/cont1-replica.
2. No container imutável, tente sobrescrever e excluir um blob.
3. Altere um blob (crie versões) e veja Versions no blob.
4. Depois de 24 h, veja a execução do lifecycle e do inventário (arquivo CSV no container de destino).

## evidence
- Blob > Versions; Object replication > status da política.
- Immutable storage: "This operation is not permitted as the blob is immutable".

## expected
| Teste | Resultado |
|---|---|
| Delete e archive na mesma idade | Prevalece delete (Q226) |
| Regra `version` | Não afeta snapshots (Q275) |
| Blob imutável | Não altera nem exclui (Q143) |
| Object replication | Copia para outra região escolhida (Q931) |

## variations
- **Q212 / Q281:** monte a tabela de regras das questões com prefixos diferentes e calcule o estado de cada arquivo por data antes de conferir.
- **Q227:** tente Archive em conta **ZRS**: não disponível.

## breakit
Desative o change feed da conta de origem: o portal não deixa criar a regra de object replication.

## cleanup
Remova legal hold e (depois de vencer) a retenção; apague o RG. Políticas **locked** não podem ser removidas antes do prazo.

## refs
- https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview
- https://learn.microsoft.com/en-us/azure/storage/blobs/object-replication-overview
- https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-storage-overview
- https://learn.microsoft.com/en-us/azure/storage/blobs/blob-inventory

=== L12 | Criptografia: chaves do cliente, escopos de criptografia e discos | B | 60
questions: Q220,Q245,Q150,Q250,Q264,Q265
predict: Q265
## overview
Testa as opções de criptografia em repouso.

- **Customer-managed keys**: chave RSA/RSA-HSM 2048, 3072 ou 4096 no Key Vault (Q220, Q245).
- **Encryption scope**: chave diferente por container/blob; não vale para files, tabelas e filas (Q150, Q250).
- Discos: **encryption at host** (recomendado), SSE com CMK e **Azure Disk Encryption** (BitLocker/DM-Crypt no SO, protege o VHD baixado; aposentadoria anunciada) (Q264, Q265).

## steps
### 1. Key Vault e chave
```bash
az group create -n rg-az104-l12 -l $LOC -o none
KV=az104-l12-kv$RANDOM
az keyvault create -g rg-az104-l12 -n $KV --enable-purge-protection true --enable-rbac-authorization true -o none
az role assignment create --assignee $(az ad signed-in-user show --query id -o tsv) --role "Key Vault Crypto Officer" --scope $(az keyvault show -n $KV --query id -o tsv) -o none
az keyvault key create --vault-name $KV -n chave-st --kty RSA --size 4096 -o none
```

### 2. Storage com CMK
@ Azure: Storage accounts > + Create > Encryption — **Customer-managed keys**, selecione o $KV e a chave-st e uma **user-assigned identity** (ela precisa da função **Key Vault Crypto Service Encryption User** no vault).

Tente criar uma chave EC no vault e escolhê-la.

### 3. Encryption scope
@ Azure: (conta) > Security + networking > Encryption > Encryption scopes > + Add — **scope-fin** (Microsoft-managed). Crie um container com **Default encryption scope = scope-fin**.

### 4. Discos
- @ Azure: Virtual machines > Create > Disks — veja **Encryption at host** (precisa registrar o recurso: `az feature register --namespace Microsoft.Compute --name EncryptionAtHost`).
- ADE (opcional, em um vault criado com `--enabled-for-disk-encryption true`): `az vm encryption enable -g rg-az104-l12 -n <vm> --disk-encryption-keyvault <vault-ade> --volume-type All`

## test
1. Ver o tipo de chave aceito pelo storage.
2. Crie um file share e procure o encryption scope.
3. Na VM com ADE: `az vm encryption show`.

## expected
| Teste | Resultado |
|---|---|
| Chave EC no storage | Não aceita; só RSA (Q220) |
| Tamanho máximo | 4096 (Q245) |
| Scope em file share | Não existe (Q250) |
| ADE | Volumes do SO e de dados criptografados com a chave do vault (Q265) |

## variations
- **Q264:** para ADE com KEK, o vault precisa de **Azure Disk Encryption for volume encryption** e uma **chave**.

## breakit
Desabilite a chave-st no vault: o storage com CMK fica inacessível até reabilitar.

## cleanup
Apague o RG. O vault fica em soft delete (purge protection impede o purge imediato).

## refs
- https://learn.microsoft.com/en-us/azure/storage/common/customer-managed-keys-overview
- https://learn.microsoft.com/en-us/azure/storage/blobs/encryption-scope-overview
- https://learn.microsoft.com/en-us/azure/virtual-machines/disk-encryption-overview

=== L13 | Azure Files e acesso por identidade | C | 60
questions: Q139,Q112,Q095,Q235,Q817,Q084,Q1126,Q1135
predict: Q1135
## overview
Testa file shares SMB e a autenticação por identidade.

- SMB usa **TCP 445**; caminho `\\<conta>.file.core.windows.net\<share>` (Q139, Q112).
- Funções Storage File Data SMB Share * só funcionam com uma **fonte de identidade** habilitada: AD DS, Entra Domain Services ou Entra Kerberos (Q095, Q235, Q817).
- AD DS: identidades **híbridas**; contas de computador não recebem função de share (Q084, Q1126).
- **Default share-level permission** vale para todos os autenticados, inclusive identidades do AD não sincronizadas (Q1135).

## prereqs
- Classe C: AD DS on-premises (lab.local) com VPN/ExpressRoute ou um notebook do domínio com a porta 445 liberada para a internet.
- Módulo **AzFilesHybrid** para ingressar a conta no AD.

## steps
### 1. Conta e share
```bash
az group create -n rg-az104-l13 -l $LOC -o none
ST=az104l13st$RANDOM; az storage account create -g rg-az104-l13 -n $ST --sku Standard_LRS -o none
az storage share-rm create -g rg-az104-l13 --storage-account $ST -n share1 --quota 10 -o none
```

### 2. Montar com a chave
@ Azure: (conta) > File shares > share1 > Connect — copie o script do Windows e rode no notebook.

```powershell
Test-NetConnection -ComputerName "<conta>.file.core.windows.net" -Port 445
```

### 3. AD DS (em um computador do lab.local)
```powershell
Import-Module AzFilesHybrid
Connect-AzAccount
Join-AzStorageAccount -ResourceGroupName "rg-az104-l13" -StorageAccountName "<conta>" `
  -DomainAccountType ComputerAccount -OrganizationalUnitDistinguishedName "OU=AzFiles,DC=lab,DC=local"
```
@ Azure: (conta) > File shares > **Identity-based access** — confira **Active Directory: Configured**.

### 4. Permissões
@ Azure: (conta) > File shares > Identity-based access > **Default share-level permissions** — Enable for all authenticated users and groups (Storage File Data SMB Share Reader).
@ Azure: share1 > Access control (IAM) — **Storage File Data SMB Share Contributor** para um usuário sincronizado.

## test
1. Monte o share com o usuário sincronizado (sem chave) e grave um arquivo.
2. Monte com um usuário do AD de uma OU **não sincronizada**.
3. Tente atribuir a função de share a um usuário **só nuvem** e montar.

## evidence
- `klist` mostrando o ticket `cifs/<conta>.file.core.windows.net`.
- `Debug-AzStorageAccountAuth` (AzFilesHybrid).

## expected
| Teste | Resultado |
|---|---|
| Porta 445 bloqueada pelo provedor | Montagem falha (Q139) |
| Usuário sincronizado com Contributor | Lê e grava (Q1126) |
| Usuário AD não sincronizado | Acessa pela permissão padrão (Q1135) |
| Usuário só nuvem com AD DS | Não acessa (Q1126) |

## variations
- **Q095 / Q235 / Q817:** sem fonte de identidade, o IAM do share aceita a atribuição, mas o acesso SMB com identidade não funciona.

## breakit
Pare o cliente de DNS que resolve lab.local no notebook: o Kerberos falha e o Windows pede usuário e senha.

## cleanup
Apague a conta de computador do storage no AD e o RG.

## refs
- https://learn.microsoft.com/en-us/azure/storage/files/storage-files-identity-auth-active-directory-enable
- https://learn.microsoft.com/en-us/azure/storage/files/storage-files-identity-ad-ds-assign-permissions
- https://learn.microsoft.com/en-us/azure/storage/files/storage-troubleshoot-windows-file-connection-problems

=== L14 | AzCopy e Storage Explorer | A | 30
questions: Q126,Q147,Q113,Q127,Q149,Q142,Q218,Q277,Q821
predict: Q127
## overview
Testa as ferramentas de cópia de dados.

- **AzCopy v10**: Blob e Files (sem Table/Queue); Windows, Linux e macOS (Q126, Q142).
- `azcopy make`, `azcopy copy --recursive`, `azcopy sync` (Q113, Q147).
- Autenticação: Blob = Entra ID ou SAS; Files = SAS (e Entra ID nas versões recentes) (Q127, Q149).
- **Storage Explorer**: gerencia contas existentes (não cria contas); Windows, Linux e macOS (Q218, Q277, Q821).

## steps
### 1. Conta
```bash
az group create -n rg-az104-l14 -l $LOC -o none
ST=az104l14st$RANDOM; az storage account create -g rg-az104-l14 -n $ST --sku Standard_LRS -o none
az role assignment create --assignee $(az ad signed-in-user show --query id -o tsv) --role "Storage Blob Data Contributor" --scope $(az storage account show -n $ST --query id -o tsv) -o none
```

### 2. AzCopy com Entra ID
```powershell
azcopy login
azcopy make "https://<conta>.blob.core.windows.net/vmimages"
azcopy copy "C:\Temp\Pasta1" "https://<conta>.blob.core.windows.net/vmimages" --recursive
```

### 3. AzCopy para Files e entre serviços
Gere SAS de conta (Blob + File) e copie de blob para um share:
```powershell
azcopy copy "https://<conta>.blob.core.windows.net/vmimages?<SAS>" "https://<conta>.file.core.windows.net/share1?<SAS>" --recursive
```

### 4. Storage Explorer
Conecte com a sua conta Azure, navegue até a conta e faça upload de arquivos. Procure a opção de **criar** storage account.

## test
1. `azcopy copy` para uma **tabela** ou fila.
2. Copie para Files sem SAS (só com `azcopy login`).

## expected
| Teste | Resultado |
|---|---|
| Tabela/fila | Não suportado (Q126) |
| Blob com Entra ID | Funciona (Q127) |
| Blob → Files | SAS nos dois lados (Q149) |
| Storage Explorer | Sem criação de storage account (Q218) |

## cleanup
`az group delete -n rg-az104-l14 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10
- https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-authorize-azure-active-directory
- https://learn.microsoft.com/en-us/azure/storage/storage-explorer/vs-azure-tools-storage-manage-with-storage-explorer
