=== ENV | Ambiente de referência dos labs
## overview
Os labs da AZ-104 rodam na sua assinatura Azure de laboratório (MSDN/Visual Studio) vinculada ao tenant de lab. Quase tudo é feito pelo portal e pela Cloud Shell. Troque os nomes se algo mudou.

| Item | Valor |
|---|---|
| Tenant | camposlab.online (os usuários sc-user01 a sc-user04 e sc-adm01 a sc-adm03 dos labs da SC-300 servem aqui) |
| Assinatura | MSDN/Visual Studio (crédito mensal) — chamada de **Sub-Lab** nos labs |
| Região principal | **East US** (eastus) — barata e com zonas de disponibilidade |
| Região secundária | **West US** (westus) — para peering global, replicação e Site Recovery |
| Domínio on-premises | lab.local (DC/DNS LLK85SH20050), usado só no lab de Azure Files com AD DS |
| Ferramentas | Cloud Shell (Bash e PowerShell), Azure CLI, módulo Az, Storage Explorer, AzCopy |

! **Custo:** o crédito do MSDN acaba rápido com VMs ligadas, Bastion, gateways e Log Analytics. Cada lab tem limpeza no final: apague o resource group. Antes do primeiro lab, crie o orçamento abaixo.

## steps
### 1. Orçamento de segurança
@ Azure: Cost Management + Billing > Cost Management > Budgets > + Add

- Escopo: **Sub-Lab** · Valor: 80% do seu crédito mensal · Alertas em 50%, 80% e 100% para o seu e-mail.

? O orçamento só **avisa**; ele não desliga nada (isso é cobrado na Q183).

### 2. Cloud Shell e ferramentas
@ Azure: barra superior > ícone Cloud Shell (>_)

- Escolha **Bash** para os comandos `az` e **PowerShell** para os `*-Az*`. Na primeira vez, deixe o portal criar o storage da Cloud Shell (ou use "No storage account required").
- No seu notebook: Azure CLI, módulo Az (`Install-Module Az -Scope CurrentUser`), **Azure Storage Explorer** e **AzCopy v10**.

### 3. Variáveis usadas nos labs
Cada lab cria o seu próprio resource group **rg-az104-lXX** e recursos com prefixo **az104-lXX-**. Cole no início da sessão (Bash):

```bash
SUB=$(az account show --query id -o tsv)
LOC=eastus
LOC2=westus
ADMIN=azadmin
PASS='Lab@AZ104-2026!'      # senha das VMs dos labs
echo "Assinatura: $SUB"
```

E no PowerShell:

```powershell
$sub  = (Get-AzContext).Subscription.Id
$loc  = "eastus"
$loc2 = "westus"
$cred = New-Object PSCredential("azadmin",(ConvertTo-SecureString 'Lab@AZ104-2026!' -AsPlainText -Force))
```

### 4. Função de VM de teste (reaproveitada pelos labs)
Muitos labs precisam de uma VM pequena e sem IP público. Use este padrão (Bash):

```bash
# vm_teste <rg> <nome> <vnet> <subnet> [imagem]
vm_teste () {
  az vm create -g "$1" -n "$2" --image "${5:-Win2022AzureEditionCore}" --size Standard_B2s \
    -l "$(az network vnet show -g "$1" -n "$3" --query location -o tsv)" \
    --vnet-name "$3" --subnet "$4" --public-ip-address "" --nsg "" \
    --admin-username $ADMIN --admin-password "$PASS" --only-show-errors -o table
}
```

? Para Linux, passe `Ubuntu2204` como imagem (fica mais rápido e barato). A VM é criada na região da VNet. O Windows Server bloqueia ping (ICMP) no firewall local por padrão; quando o lab pedir ping para uma VM Windows, libere com Run command: `New-NetFirewallRule -DisplayName ICMPv4 -Protocol ICMPv4 -IcmpType 8 -Action Allow`. Para acessar VMs sem IP público, use Bastion (L26) ou o **Run command** do portal.

### 5. Limpeza
```bash
az group list --query "[?starts_with(name,'rg-az104-')].name" -o tsv
az group delete -n rg-az104-lXX --yes --no-wait
```

Desligue as VMs entre uma sessão e outra (**Stop** = desalocada; VM só parada pelo SO continua cobrando).

### Portais
- Azure: https://portal.azure.com
- Entra: https://entra.microsoft.com
- Learn (laboratórios oficiais da AZ-104): https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/

! Os menus do portal mudam de nome com frequência (ex.: "Geo-replication" virou "Redundancy"; "Replication" virou "Redundancy" na criação). Os caminhos foram conferidos na documentação de outubro de 2026; se um item não estiver onde o lab indica, use a busca do portal.

### Atrasos que parecem erro
| O que | Quanto demora |
|---|---|
| Atribuição de RBAC | Até ~10 min para valer (saia e entre de novo) |
| Azure Policy (avaliação de conformidade) | Até 30 min, ou force com `az policy state trigger-scan` |
| Grupo dinâmico | De minutos a horas |
| Métricas / logs no Log Analytics | 2 a 10 min |
| Flow logs / Traffic Analytics | 10 a 60 min |
| Primeiro backup de VM | 30 min a algumas horas |
| Lifecycle management | Roda uma vez por dia (até 24 h) |

### Classes de lab
| Classe | Significado |
|---|---|
| A | Rápido (até ~45 min). Configura e observa. |
| B | Longo (1 a 3 h). Envolve espera de processamento (backup, logs) ou vários recursos. |
| C | Parcial. Depende de algo que o lab pode não ter (segundo tenant, AD DS on-premises, custo alto). |
| D | Sem lab prático. Só leitura guiada. |
