=== ENV | Ambiente de referência dos laboratórios
## overview
Os labs da SC-300 usam o seu tenant de lab e a infraestrutura híbrida que já existe. Troque os nomes se algo mudou.

| Item | Valor |
|---|---|
| Tenant | camposlab.online (25 Microsoft 365 E5 + 25 Entra Suite → Entra ID P2, ID Governance, Private/Internet Access) |
| Domínio on-premises | lab.local · DC/DNS LLK85SH20050 (10.85.134.50) |
| Entra Connect | LLK85SH20053 (também DP do MECM e file server) |
| Global Secure Access | Já implantado: conectores LLK85SH20066 e LLK85SH20067, grupo "vLan 134" |
| Notebook de teste | LLK85SH20068 (cliente "limpo") |
| Azure | Assinatura MSDN/Visual Studio vinculada ao tenant (para RBAC, Key Vault, managed identities, Log Analytics) |

Um segundo tenant ajuda nos labs de B2B e sincronização entre tenants. Um tenant gratuito de desenvolvedor, ou qualquer outro tenant seu, serve como **"tenant parceiro"**.

## steps
### Usuários de teste
Crie os usuários abaixo **só na nuvem** (sem sincronizar), para não misturar com o lab.local. Os labs dizem quando precisam de um usuário sincronizado.

```powershell
# Requer: Install-Module Microsoft.Graph -Scope CurrentUser
Connect-MgGraph -Scopes "User.ReadWrite.All","Group.ReadWrite.All","Organization.Read.All"
$dom = "camposlab.online"
$e5  = (Get-MgSubscribedSku | Where-Object SkuPartNumber -eq "SPE_E5").SkuId
$pwd = @{ Password = "Lab@SC300-2026!"; ForceChangePasswordNextSignIn = $false }
foreach ($n in "sc-user01","sc-user02","sc-user03","sc-user04","sc-adm01","sc-adm02","sc-adm03") {
  $u = New-MgUser -DisplayName $n -UserPrincipalName "$n@$dom" -MailNickname $n `
       -AccountEnabled -PasswordProfile $pwd -UsageLocation "BR"
  Set-MgUserLicense -UserId $u.Id -AddLicenses @(@{SkuId=$e5}) -RemoveLicenses @()
}
```

? Para os labs de autenticação, tenha à mão um celular com o **Microsoft Authenticator** e, se possível, uma chave **FIDO2**.

### Conta de emergência (obrigatória antes dos labs de Conditional Access)
Crie **sc-breakglass@camposlab.online**, somente nuvem, com **Global Administrator** permanente e senha longa guardada fora do tenant. **Exclua essa conta de toda política de Conditional Access** que você criar nos labs.

### Convenção de nomes
Tudo o que um lab criar começa com **SC300-Lxx-**. A limpeza é procurar por esse prefixo em grupos, políticas, apps e catálogos.

```powershell
Connect-MgGraph -Scopes "Group.Read.All","Policy.Read.All","Application.Read.All"
Get-MgGroup -All | Where-Object DisplayName -like "SC300-*" | Select DisplayName, Id
Get-MgIdentityConditionalAccessPolicy -All | Where-Object DisplayName -like "SC300-*" | Select DisplayName, State
Get-MgApplication -All | Where-Object DisplayName -like "SC300-*" | Select DisplayName, AppId
```

### Ferramentas de teste
- Navegador com **janelas InPrivate** separadas para cada usuário (ou perfis do Edge), para não misturar sessões.
- **Sign-in logs** do Entra: a primeira coisa a abrir quando algo "não funciona". Cada login mostra o método de autenticação, as políticas de Conditional Access avaliadas e o risco.
- **What If** do Conditional Access, para simular sem logar.
- `dsregcmd /status` nos clientes Windows.

### Portais
- Entra: https://entra.microsoft.com
- Defender (Defender for Cloud Apps): https://security.microsoft.com
- Azure: https://portal.azure.com
- Minha conta / métodos: https://myaccount.microsoft.com e https://aka.ms/mysecurityinfo
- Acesso a pacotes (usuário final): https://myaccess.microsoft.com

! Os menus do Entra mudam de nome com frequência. Os caminhos dos labs foram conferidos na documentação de outubro de 2026. Se algum item não estiver onde o lab indica, use a caixa de busca do portal.

### Atrasos que parecem erro
| O que | Quanto demora |
|---|---|
| Membro de grupo dinâmico | De minutos a horas, dependendo do tenant |
| Sign-in logs | Alguns minutos para aparecer |
| Mudança de Conditional Access | Vale no próximo token (feche e reabra a sessão) |
| Ciclo do Entra Connect | 30 min (force com `Start-ADSyncSyncCycle -PolicyType Delta`) |
| Access reviews e entitlement management | Processamento em lote, pode levar horas |

### Classes de lab
| Classe | Significado |
|---|---|
| A | Rápido (até ~45 min). Configura e observa. |
| B | Longo (1 a 3 h). Envolve infraestrutura on-premises, Azure ou espera de processamento. |
| C | Parcial. Depende de algo que o lab pode não ter (segundo tenant, celular, chave FIDO2). |
| D | Sem lab prático. Só leitura guiada. |
