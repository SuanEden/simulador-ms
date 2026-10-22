=== ENV | Ambiente de referência dos laboratórios
## overview
Todos os labs assumem o seu lab híbrido. Os nomes abaixo são os do seu ambiente; troque se algo mudou.

| Item | Valor |
|---|---|
| Tenant | camposlab.online (25 Microsoft 365 E5 + 25 Entra Suite) |
| Domínio on-premises | lab.local (Entra Connect ativo no LLK85SH20053) |
| DC / DNS | LLK85SH20050 (10.85.134.50) |
| MECM (site LAB) | LLK85SH20051 — primary, MP, DP, SUP · SQL no LLK85SH20052 |
| Clientes MECM | LLK85SH20061 e LLK85SH20062 (domain joined) |
| Notebook físico | LLK85SH20068 (útil para testes que exigem TPM físico) |
| Rede | VLAN 134 (10.85.134.0/24) com saída para a internet |

## steps
### VMs de teste "só nuvem"
A maioria dos labs usa VMs novas, fora do domínio. Sugestão: três VMs **W11-LAB01**, **W11-LAB02** e **W11-LAB03**.

- Hyper-V **Geração 2**, Secure Boot ligado, **TPM virtual ligado** (Settings > Security > Enable Trusted Platform Module).
- **Memória estática** de 4 GB ou mais (memória dinâmica derruba checagens de requisito, como você já viu no in-place upgrade).
- Windows 11 Enterprise ou Pro, em português ou inglês, como preferir.
- Tire um checkpoint **"00-OOBE"** com a VM parada na primeira tela do OOBE e outro **"01-Limpa"** logo depois de criar o usuário local. Quase todo lab começa de um desses dois.

### Usuários e grupos de teste
Crie de uma vez os usuários que os labs usam. Todos com licença Microsoft 365 E5, exceto onde o lab pedir o contrário.

```powershell
# Requer: Install-Module Microsoft.Graph -Scope CurrentUser
Connect-MgGraph -Scopes "User.ReadWrite.All","Group.ReadWrite.All","Organization.Read.All"
$dom = "camposlab.online"
$e5  = (Get-MgSubscribedSku | Where-Object SkuPartNumber -eq "SPE_E5").SkuId
$pwd = @{ Password = "Lab@MD102-2026!"; ForceChangePasswordNextSignIn = $false }
foreach ($n in "user01","user02","user03","user04","user05","adm-helpdesk","adm-roleadmin","adm-sec","adm-cda") {
  $u = New-MgUser -DisplayName $n -UserPrincipalName "$n@$dom" -MailNickname $n `
       -AccountEnabled -PasswordProfile $pwd -UsageLocation "BR"
  if ($n -like "user0*") { Set-MgUserLicense -UserId $u.Id -AddLicenses @(@{SkuId=$e5}) -RemoveLicenses @() }
}
```

? O SkuPartNumber do Microsoft 365 E5 costuma ser `SPE_E5`. Se o comando não achar, rode `Get-MgSubscribedSku | Select SkuPartNumber` e use o que aparecer.

### Convenção de nomes
Tudo o que um lab criar (grupos, políticas, perfis, apps) começa com **MD102-Lxx-**. Assim, a limpeza é procurar por esse prefixo.

```powershell
# Lista o que sobrou de um lab no Intune (perfis do Settings catalog e templates)
# Requer: Install-Module Microsoft.Graph.Beta -Scope CurrentUser
Connect-MgGraph -Scopes "DeviceManagementConfiguration.Read.All"
Get-MgBetaDeviceManagementConfigurationPolicy -All | Where-Object Name -like "MD102-*" | Select Name, Id
Get-MgBetaDeviceManagementDeviceConfiguration -All | Where-Object DisplayName -like "MD102-*" | Select DisplayName, Id
```

### Como acelerar a aplicação de políticas
O Intune não aplica na hora. Use um destes atalhos antes de concluir que algo falhou:

- No portal: @ Intune: Devices > All devices > (dispositivo) > Sync
- No Windows: Settings > Accounts > Access work or school > (conta) > Info > **Sync**
- No Company Portal: Settings > **Sync**
- Por PowerShell, no dispositivo:

```powershell
Get-ScheduledTask | Where-Object TaskName -eq "PushLaunch" | Start-ScheduledTask   # check-in MDM
Restart-Service IntuneManagementExtension                                            # apps Win32 e scripts
```

- No MECM: Configuration Manager (Painel de Controle) > Actions > **Machine Policy Retrieval & Evaluation Cycle**.

### Diagnóstico que serve para quase todo lab
| O que | Onde |
|---|---|
| Estado do join | `dsregcmd /status` (AzureAdJoined, DomainJoined, WorkplaceJoined, NgcSet) |
| Políticas MDM recebidas | Settings > Accounts > Access work or school > Info > **Create report** (gera `MDMDiagReport.html` em `C:\Users\Public\Documents\MDMDiagnostics`) |
| Log do MDM | Event Viewer > Applications and Services Logs > Microsoft > Windows > **DeviceManagement-Enterprise-Diagnostics-Provider** > Admin |
| Apps Win32 e scripts | `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\IntuneManagementExtension.log` e `AppWorkload.log` |
| Valores aplicados | `HKLM\SOFTWARE\Microsoft\PolicyManager\current\device\` |
| Coleta completa | `mdmdiagnosticstool.exe -area "DeviceEnrollment;DeviceProvisioning;Autopilot" -cab C:\Temp\diag.cab` |

### Portais
- Intune: https://intune.microsoft.com
- Entra: https://entra.microsoft.com
- Defender: https://security.microsoft.com
- Microsoft 365 Apps admin center: https://config.office.com

! Os menus do Intune e do Entra mudam de nome com frequência. Os caminhos dos labs foram conferidos na documentação de outubro de 2026. Se algum item não estiver onde o lab indica, use a caixa de busca do portal com o nome da configuração.

### Classes de lab
| Classe | Significado |
|---|---|
| A | Rápido (até ~45 min). Configura, sincroniza e observa. |
| B | Longo (1 a 3 h). Envolve OOBE, reinícios, conector ou download grande. |
| C | Parcial. Parte depende de algo que o lab não tem (iPhone/Android, licença extra). O lab faz o que dá e explica o resto. |
| D | Sem lab prático. Só leitura guiada. |
