=== L16 | Políticas de conformidade: carência, ações e conformidade personalizada | A | 60
questions: Q105,Q003,Q036,Q037,Q106,Q111,Q178,Q224,Q241,Q240,Q039,Q038,Q236,Q108,Q262,Q063,Q066,Q103
predict: Q105
## overview
Testa como o Intune decide se um dispositivo é **Compliant**, **Not compliant** ou **In grace period**.

- Onde mora cada exigência: BitLocker e Secure Boot em **Device Health**, versão do SO em **Device Properties** (Q036, Q236).
- **Mark devices with no compliance policy assigned as**: configuração do tenant que decide o destino de quem não recebe política (Q003, Q224, Q241).
- **Carência** nas ações de não conformidade (Q105, Q106, Q111) e ação de **retire** (Q241).
- **Notificações** por e-mail (Q108, Q262) e **conformidade personalizada** por script + JSON (Q039).
- Frequência do check-in após a inscrição (Q240).

## prereqs
- W11-LAB01 e W11-LAB02 inscritas, **sem BitLocker** e com o firewall ligado.
- Grupos de dispositivos **MD102-L16-A** (W11-LAB01) e **MD102-L16-B** (W11-LAB02).

## steps
### 1. Configuração do tenant
@ Intune: Devices > Manage devices > Compliance > Compliance settings

- Anote o valor de **Mark devices with no compliance policy assigned as** e do **Compliance status validity period**.

### 2. Política com carência
@ Intune: Devices > Manage devices > Compliance > Create policy > Windows 10 and later

- Nome: MD102-L16-Cripto
- System Security > **Encryption of data storage on device**: Require
- System Security > **Firewall**: Require
- Device Properties > Minimum OS version: `10.0.22631`
- Actions for noncompliance:
  - Mark device noncompliant: **2 dias**
  - Send email to end user: imediatamente (crie o template no passo 3)
  - Add device to retire list: 5 dias
- Assignments: MD102-L16-A e MD102-L16-B

? Use **Encryption of data storage** em vez de **Require BitLocker** (Device Health) neste primeiro teste. As regras de Device Health dependem do Device Health Attestation, que no Hyper-V só reporta depois de um reinício e pode demorar.

### 3. Template de notificação
@ Intune: Devices > Manage devices > Compliance > Notifications > Create notification

- Nome: MD102-L16-Aviso · Locale pt-br · Subject e texto à sua escolha. Volte à política e selecione o template na ação de e-mail.
- Em **Additional recipients (via email)**, tente escolher um usuário avulso e depois um grupo de distribuição (Q108).

### 4. Conformidade personalizada (Q039)
Script de descoberta (veja primeiro o valor real do BIOS da VM com `(Get-CimInstance Win32_BIOS).SMBIOSBIOSVersion`):
```powershell
$bios = (Get-CimInstance Win32_BIOS).SMBIOSBIOSVersion
$hash = @{ BiosVersion = $bios }
return $hash | ConvertTo-Json -Compress
```
@ Intune: Devices > Manage devices > Compliance > Scripts > Add > Windows 10 and later — cole o script (Run as 64-bit: Yes).

Arquivo JSON de regras (`MD102-L16-bios.json`):
```json
{
  "Rules": [
    {
      "SettingName": "BiosVersion",
      "Operator": "IsEquals",
      "DataType": "String",
      "Operand": "COLE_AQUI_O_VALOR_REAL",
      "MoreInfoUrl": "https://learn.microsoft.com",
      "RemediationStrings": [
        { "Language": "en_US", "Title": "BIOS fora do padrão", "Description": "Atualize o firmware." }
      ]
    }
  ]
}
```
Crie uma segunda política, **MD102-L16-Custom**: Custom Compliance = Require > selecione o script > envie o JSON.

## test
1. Sincronize as duas VMs e veja o status logo depois: devem estar **In grace period** (sem criptografia, dentro dos 2 dias).
2. Desligue o firewall da W11-LAB02 (`Set-NetFirewallProfile -All -Enabled False`) e sincronize.
3. Mude **Mark devices with no compliance policy assigned as** para **Not compliant**, crie uma VM inscrita sem nenhuma política e veja o status dela.
4. No Company Portal da VM, use **Check access** / **Check status** para ver o motivo pelo lado do usuário.
5. Para o JSON, troque o Operand por um valor errado e veja a VM ficar não conforme com a mensagem do RemediationStrings.

## evidence
- @ Intune: Devices > All devices > (dispositivo) > **Device compliance** > (política) — status por configuração.
- @ Intune: Reports > Device compliance (e o relatório de tendências, que mostra 60 dias).
- @ Intune: Devices > Manage devices > Compliance > **Retire Noncompliant Devices** (a lista da ação de retire).

## expected
- Dentro da carência: **In grace period**. Depois dos 2 dias: **Not compliant** (Q105, Q106, Q111).
- A ação de retire **não** apaga nada sozinha: coloca o dispositivo numa lista que o administrador confirma (Q241).
- Com "no compliance policy" = Not compliant, a VM sem política fica **Not compliant** (Q224).
- Destinatários adicionais são **grupos**; usuários avulsos não aparecem (Q108).
- Logo depois da inscrição, o Windows faz check-in a cada 3 minutos por 15 minutos, depois a cada 15 minutos por 2 horas, depois a cada ~8 horas (Q240).

## variations
- **Q037:** inclua um grupo e exclua outro que contém a mesma VM: a política nem é atribuída a ela.
- **Q038:** no Android/iOS, o equivalente de "firmware confiável" é bloquear root/jailbreak; no Windows, Secure Boot.
- **Q262:** a ordem é criar o **template** e depois usá-lo na ação da política (ou criar a política e voltar para ligar o template).
- **Q063 e Q066:** política de conformidade é **por plataforma**. Atribua a MD102-L16-Cripto a um grupo que também tenha um celular inscrito (L31): o celular não recebe a política de Windows.
- **Q103:** em Compliance settings, veja a opção **Enhanced jailbreak detection** (iOS): ela é do tenant, não da política.

## breakit
Atribua a política a um grupo de **usuários** em vez de dispositivos e entre na VM com um usuário fora do grupo. A política não chega a esse usuário: o status mostra a avaliação por usuário.

## cleanup
Volte o "no compliance policy" para o valor anotado; apague MD102-L16-* (políticas, script, template); religue o firewall.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-windows
- https://learn.microsoft.com/en-us/intune/intune-service/protect/actions-for-noncompliance
- https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-use-custom-settings

=== L17 | Acesso Condicional com dispositivo em conformidade | A | 45
questions: Q179,Q176,Q012,Q140,Q219
predict: Q179
## overview
Liga a conformidade do Intune ao **Conditional Access**: dispositivo não conforme não acessa o SharePoint.

- Grant control **Require device to be marked as compliant** (Q179).
- Dispositivo **sem política** de conformidade herda o "Mark devices with no compliance policy assigned as" (Q179).
- Bloqueio de **autenticação legada** pela condição Client apps (Q012).
- Onde ver as tentativas bloqueadas: **Conditional Access Insights and Reporting** (Q140).

## prereqs
- Política de conformidade do L16 nas duas VMs.
- Grupo de usuários **MD102-L17-CA** (user01).
- Uma conta de emergência (break-glass) para excluir de toda política de teste.

## steps
### 1. Política de acesso
@ Entra: Entra ID > Conditional Access > Policies > New policy

- Nome: MD102-L17-Compliant
- Users > Include: MD102-L17-CA · Exclude: a conta break-glass
- Target resources > Resources: **Office 365** (ou só **Office 365 SharePoint Online**)
- Grant > **Require device to be marked as compliant**
- Enable policy: **Report-only** primeiro

### 2. Veja o efeito em modo relatório
Entre como user01 no SharePoint pelas duas VMs. Depois: @ Entra: Entra ID > Monitoring & health > Sign-in logs > (login) > aba **Report-only**.

### 3. Ligue a política
Mude Enable policy para **On**.

## test
1. W11-LAB01 **compliant**: abra o SharePoint no Edge (logado no Windows com user01). Deve entrar.
2. W11-LAB02 **não compliant** (firewall desligado, fora da carência): deve aparecer a tela de bloqueio com o link para verificar o status no Company Portal.
3. Use o **What If** para simular sem logar: @ Entra: Entra ID > Conditional Access > Policies > What If.
4. Abra o SharePoint num navegador sem identidade do dispositivo (Firefox sem SSO do Windows ou numa máquina fora do Intune): é bloqueado porque o dispositivo não é identificado.

## evidence
- Sign-in logs > aba **Conditional Access** (Success/Failure por política).
- @ Entra: Entra ID > Conditional Access > **Insights and reporting** (precisa de um workspace do Log Analytics recebendo os sign-in logs — veja o L29).

## expected
| VM | Conformidade | Acesso ao SharePoint |
|---|---|---|
| W11-LAB01 | Compliant | Permitido |
| W11-LAB02 | Not compliant | Bloqueado |
| VM sem política, tenant em "Compliant" | Compliant | Permitido (Q179) |

## variations
- **Q012:** crie uma segunda política: Conditions > **Client apps** > marque só *Exchange ActiveSync clients* e *Other clients* > Grant: Block. A autenticação moderna continua passando.
- **Q176:** restringir por localização é **Conditional Access** com Named locations (@ Entra: Entra ID > Conditional Access > Named locations); reagir ao risco do Defender é a política de **conformidade**.
- **Q219:** para celulares sem inscrição, o grant é **Require app protection policy** (veja o L26).

## breakit
Esqueça de excluir a break-glass e coloque o escopo em **All users** com um dispositivo não conforme seu. É assim que admins se trancam fora do tenant; por isso o modo Report-only vem primeiro.

## cleanup
Desligue e apague MD102-L17-*.

## refs
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-insights-reporting

=== L18 | BitLocker e chaves de recuperação | A | 45
questions: Q209,Q131,Q133
predict: Q209
## overview
Liga o BitLocker silenciosamente pelo Intune e testa onde a chave fica e quem pode rotacioná-la.

- Política em **Endpoint security > Disk encryption** (BitLocker no Windows, FileVault no macOS) (Q209, Q133).
- A chave vai para o Entra ID e aparece no Intune.
- **Help Desk Operator** pode rotacionar a chave (Q209, ligado ao L08).

## prereqs
- W11-LAB01 inscrita, **Gen2 com TPM virtual ligado**.
- adm-helpdesk com Help Desk Operator (L08).

## steps
@ Intune: Endpoint security > Disk encryption > Create Policy > Platform: Windows > Profile: BitLocker

- Nome: MD102-L18-BitLocker
- Require Device Encryption: **Enabled**
- Allow Warning For Other Disk Encryption: **Disabled** (necessário para criptografia silenciosa)
- Allow Standard User Encryption: **Enabled**
- Configure Recovery Password Rotation: **Refresh on for Azure AD-joined devices**
- Operating System Drives > Enforce drive encryption type: **Used Space only encryption**
- Operating System Drives > Choose how BitLocker-protected operating system drives can be recovered: **Enabled** · Save BitLocker recovery information to AD DS: True · Do not enable BitLocker until recovery information is stored to AD DS: True
- Atribua à W11-LAB01.

? Nas VMs só nuvem, "AD DS" nessas configurações significa o Entra ID.

## test
1. Sincronize e espere alguns minutos.
2. Na VM:
```powershell
manage-bde -status C:
Get-BitLockerVolume C: | Select MountPoint, VolumeStatus, EncryptionPercentage, KeyProtector
manage-bde -protectors -get C:
```
3. Anote o ID do protetor *Numerical Password*.
4. Como **adm-helpdesk**, dispare @ Intune: Devices > All devices > W11-LAB01 > ... > **BitLocker key rotation**.
5. Repita o `manage-bde -protectors -get C:`.

## evidence
- @ Intune: Devices > All devices > (dispositivo) > **Recovery keys**.
- @ Entra: Entra ID > Devices > All devices > (dispositivo) > **BitLocker keys**.
- Event Viewer > Applications and Services Logs > Microsoft > Windows > **BitLocker-API** > Management (backup da chave no Entra).
- @ Intune: Reports > **Encryption report**.

## expected
- Disco C: criptografado sem nenhuma pergunta ao usuário.
- A chave de recuperação aparece no Intune e no Entra.
- Depois da rotação, o ID do protetor muda e a chave nova aparece no portal.

## variations
- **Q131:** no Endpoint security > Antivirus, o perfil **Windows Security experience** esconde áreas do app Windows Security (ex.: Firewall & network protection).
- **Q133:** FileVault (macOS) também fica em Disk encryption; Application Control em ASR (hoje App Control for Business); Credential Guard em Account protection.

## breakit
Desligue o TPM virtual da VM (com ela parada) e aplique a política em outra VM sem TPM. A criptografia silenciosa não acontece e o relatório de criptografia mostra o motivo (TPM ausente).

## cleanup
Tire a atribuição e, na VM, `manage-bde -off C:` (ou restaure o checkpoint).

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/protect/encrypt-devices
- https://learn.microsoft.com/en-us/intune/intune-service/protect/encryption-monitor

=== L19 | Windows LAPS, grupos locais e suporte remoto | A | 50
questions: Q266,Q199,Q112,Q232,Q053
predict: Q266
## overview
Testa o Windows LAPS com backup no Entra ID e a gestão de grupos locais pelo Intune.

- LAPS fica em **Endpoint security > Account protection** (Q266).
- O perfil **Local user group membership** adiciona/remove membros de Administrators e Remote Desktop Users (Q112, Q199).
- RDP para um dispositivo Entra joined e o prefixo `AzureAD\` (Q232).
- Remote Help: app no dispositivo + função RBAC + licença (Q053).

## prereqs
- W11-LAB01 inscrita.
- user02 (para RDP) e user01 (admin local pelo join do L01).

## steps
### 1. Habilite o LAPS no Entra
@ Entra: Entra ID > Devices > Overview > Device settings

- **Enable Microsoft Entra Local Administrator Password Solution (LAPS)**: Yes

### 2. Política de LAPS
@ Intune: Endpoint security > Account protection > Create Policy > Windows > Local admin password solution (Windows LAPS)

- Nome: MD102-L19-LAPS
- Backup Directory: **Backup the password to Azure AD only**
- Password Age Days: 7
- Administrator Account Name: deixe vazio para gerenciar o Administrator interno (ou o nome da conta criada pelo LAPS)
- Password Complexity: Large letters + small letters + numbers + special characters
- Post-authentication actions: Reset password and logoff · Grace period: 1 hora

? No Windows 11 24H2 ou superior, a política tem as opções de **gerenciamento automático de conta** (o LAPS cria e gerencia uma conta de admin local própria). Útil porque o Administrator interno vem desabilitado.

### 3. Grupos locais
@ Intune: Endpoint security > Account protection > Create Policy > Windows > Local user group membership

- Regra 1: Local group **Remote Desktop Users** · Group and user action: **Add (Update)** · User selection type: Users · user02
- Regra 2: Local group **Administrators** · **Remove (Update)** · user01

### 4. Habilite o RDP na VM
@ Windows: Settings > System > Remote Desktop > On

(Ou por perfil do Settings catalog.)

## test
1. Na VM, force o processamento e leia o estado:
```powershell
Invoke-LapsPolicyProcessing
Get-LapsDiagnostics -OutputFolder C:\Temp\LapsDiag
net localgroup Administrators
net localgroup "Remote Desktop Users"
```
2. Leia a senha no portal e por PowerShell:
```powershell
Connect-MgGraph -Scopes "Device.Read.All","DeviceLocalCredential.Read.All"
Get-LapsAADPassword -DeviceIds "W11-LAB01" -IncludePasswords -AsPlainText
```
3. Faça RDP como user02. No `mstsc`, aba Advanced, marque **Use a web account to sign in to the remote computer** (ou conecte a partir de um PC Entra joined do mesmo tenant).
4. Use a ação @ Intune: Devices > All devices > W11-LAB01 > ... > **Rotate local admin password** e leia a senha de novo.

## evidence
- @ Intune: Devices > All devices > (dispositivo) > **Local admin password** (Show / Copy).
- @ Entra: Entra ID > Devices > Overview > **Local administrator password recovery**.
- Event Viewer > Applications and Services Logs > Microsoft > Windows > **LAPS** > Operational.

## expected
- A senha do admin local fica no Entra ID, visível para quem tem permissão (Cloud Device Administrator e Intune Administrator; ou função customizada com `deviceLocalCredentials/password/read`).
- user02 entra por RDP; user01 sai do grupo Administrators.

## variations
- **Q232:** faça manualmente o que o perfil fez: `net localgroup "Remote Desktop Users" /add "AzureAD\user03@camposlab.online"`.
- **Q053 (Remote Help):** @ Intune: Tenant administration > Remote Help > Settings > Enable. Instale o app Remote Help na VM e dê ao adm-helpdesk uma função com permissão de Remote Help. A licença é add-on (ou Intune Suite); a Microsoft anunciou a inclusão de recursos do Intune Suite nos planos Microsoft 365 em 2026, então confira em Tenant administration > **Intune add-ons** se o recurso está ativo no seu tenant antes de testar.

## breakit
Tente ler a senha com um usuário com só **Helpdesk Administrator** do Entra. Sem a permissão de leitura de credencial local, o portal não mostra a senha.

## cleanup
Apague as políticas MD102-L19-*; desligue o RDP; restaure a VM.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-laps-policy
- https://learn.microsoft.com/en-us/entra/identity/devices/howto-manage-local-admin-passwords
- https://learn.microsoft.com/en-us/intune/intune-service/protect/endpoint-security-account-protection-policy

=== L20 | Windows Hello for Business e autenticação sem senha | A | 45
questions: Q061,Q059,Q060,Q107,Q102,Q203
predict: Q061
## overview
Testa onde se define o PIN do Windows Hello for Business e os métodos passwordless do Entra.

- O tamanho do PIN pedido **no join** vem das opções de inscrição do Windows Hello for Business no Intune (Q061).
- Device settings do Entra, device restrictions e Authentication methods **não** definem o PIN (Q059, Q060, Q107).
- Passwordless com **number matching** = Microsoft Authenticator (Q102). Sem celular e em Linux: **FIDO2** (Q203).

## prereqs
- W11-LAB02 no checkpoint 01-Limpa (para ver o provisionamento do PIN no join).
- MDM user scope incluindo user01.
- Celular com o Microsoft Authenticator (para a parte passwordless).

## steps
### 1. Opções de inscrição do Windows Hello
@ Intune: Devices > Windows > Enrollment > Windows Hello for Business

- Configure Windows Hello for Business: **Enabled**
- Minimum PIN length: **6**
- Use security keys for sign-in: Enabled

### 2. Alternativa por grupo
@ Intune: Endpoint security > Account protection > Create Policy > Windows > Account protection — as mesmas configurações de PIN, atribuídas a um grupo.

### 3. Passwordless no Entra
@ Entra: Entra ID > Authentication methods > Policies

- **Microsoft Authenticator**: Enable, Target: grupo com user01, Authentication mode: **Any**
- **Passkey (FIDO2)**: Enable para o mesmo grupo

## test
1. Faça o Entra join da W11-LAB02 com user01. No fim, o Windows pede para criar o PIN: tente 4 dígitos.
2. Confira com `dsregcmd /status` o campo **NgcSet : YES**.
3. Em https://aka.ms/mysecurityinfo, adicione o Microsoft Authenticator e habilite o **phone sign-in** no app.
4. Entre no portal pelo telefone (sem senha) e veja o **number matching**.

## evidence
- Event Viewer > Applications and Services Logs > Microsoft > Windows > **HelloForBusiness** > Operational.
- Sign-in logs do Entra: método de autenticação usado.

## expected
- O PIN de 4 dígitos é recusado: mínimo 6.
- O Entra Device settings não tem nenhum campo de PIN (Q059).
- O login sem senha pelo Authenticator mostra um número para digitar no celular (Q102).

## variations
- **Q060:** crie um perfil de Device restrictions e procure qualquer configuração de PIN do Windows Hello: não existe.
- **Q203:** para quem não pode usar celular e entra em Linux não gerenciado, a opção passwordless é a chave **FIDO2**. Se tiver uma chave (YubiKey ou similar), registre em mysecurityinfo.

## breakit
Aplique o PIN mínimo de 6 dígitos **depois** do join de um usuário que já tem PIN de 4. Observe se o Windows exige a troca no próximo logon ou só quando o usuário for trocar o PIN. Isso mostra por que a configuração de inscrição precisa existir **antes** do provisionamento.

## cleanup
Volte as opções de inscrição do Windows Hello aos valores anteriores; restaure a VM.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-hello
- https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-passwordless-phone

=== L21 | Defender for Endpoint: conexão, integração, proteção contra adulteração e antivírus | B | 90
questions: Q026,Q023,Q097,Q184,Q185,Q257,Q267,Q021,Q096,Q189,Q218,Q211,Q020
predict: Q026
## overview
Integra o Intune ao Defender for Endpoint e testa o que cada lado faz.

- **Conexão** de serviço Intune ↔ Defender em Connectors and tokens (Q097, Q023).
- **Onboarding** em massa por política de **EDR** (Q026).
- **Tamper protection** pelo portal do Defender ou por política de Antivirus (Q185, Q257, Q267).
- **Device groups** do Defender: o dispositivo entra só no primeiro grupo pelo rank (Q189).
- Inventário e pacote de onboarding no portal do Defender (Q184); Secure Score (Q096).

## prereqs
- W11-LAB01 inscrita (Windows 11 Enterprise ou Pro com E5).
- Acesso ao portal do Defender como Security Administrator ou Global Administrator.

## steps
### 1. Ligue a conexão no Defender
@ Defender: Settings > Endpoints > Advanced features

- **Microsoft Intune connection**: On
- **Tamper protection**: On (vale para o tenant todo, Q185)
- Save preferences

### 2. Ligue a conexão no Intune
@ Intune: Tenant administration > Connectors and tokens > Microsoft Defender for Endpoint

- **Connect Windows devices version 10.0.15063 and above to Microsoft Defender for Endpoint**: On

### 3. Onboarding por EDR
@ Intune: Endpoint security > Endpoint detection and response > Create Policy > Windows > Endpoint detection and response

- Microsoft Defender for Endpoint client configuration package type: **Auto from connector**
- Sample sharing: All · Atribua à W11-LAB01.

### 4. Antivírus e Windows Security experience
@ Intune: Endpoint security > Antivirus > Create Policy > Windows > Windows Security Experience

- **TamperProtection (Device)**: On (Q267)
- Hide the Firewall & network protection area: Yes (Q131)

## test
1. Sincronize. Na VM:
```powershell
Get-Service Sense
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows Advanced Threat Protection\Status" | Select OnboardingState
Get-MpComputerStatus | Select AMRunningMode, RealTimeProtectionEnabled, IsTamperProtected
```
2. Teste o tamper protection, como administrador local:
```powershell
Set-MpPreference -DisableRealtimeMonitoring $true
Get-MpComputerStatus | Select RealTimeProtectionEnabled
```
3. Rode o **teste de detecção** do Defender: @ Defender: Settings > Endpoints > Onboarding > *Run a detection test* (copie o comando e rode na VM).
4. **Device groups (Q189):** @ Defender: Settings > Endpoints > Permissions > Device groups > Add device group:
   - **MD102-G1** (rank 1): Tag Equals `demo` **And** OS In Windows 11
   - **MD102-G2** (rank 2): Tag Equals `demo`
   - Depois, em @ Defender: Assets > Devices > W11-LAB01 > **Manage tags**, adicione `demo`.

## evidence
- @ Defender: Assets > **Devices** (a VM aparece com o status de onboarding).
- @ Defender: Incidents & alerts (o alerta do teste de detecção).
- @ Intune: Devices > All devices > (dispositivo) — campos do Defender e o status da política EDR.
- Event Viewer > Applications and Services Logs > Microsoft > Windows > **SENSE** > Operational.

## expected
- **OnboardingState = 1** e o serviço Sense em execução; a VM aparece no portal do Defender em alguns minutos.
- Com tamper protection ligado, `RealTimeProtectionEnabled` continua **True** depois do `Set-MpPreference`.
- O teste de detecção gera um alerta.
- Com a tag `demo` e Windows 11, a VM entra **só** no MD102-G1 (o primeiro pelo rank).

## variations
- **Q021:** nos templates clássicos, o Defender Antivirus fica em Device restrictions e o Firewall em Endpoint protection. Hoje o caminho recomendado é Endpoint security.
- **Q023 e Q176:** na política de conformidade (L16), adicione *Require the device to be at or under the machine risk score* = Low. Isso só funciona com a conexão do passo 1 e 2.
- **Q096:** @ Defender: Exposure management > **Secure score**: veja as recomendações de configuração de dispositivos.
- **Q211 e Q020:** em @ Defender: Settings > Endpoints > Onboarding, mude o sistema operacional para macOS e Linux Server e veja os métodos de implantação oferecidos (Intune/MDM para macOS; script, Puppet, Ansible e Chef para Linux).

## breakit
Desligue a conexão do passo 2 e crie a política de EDR. Sem o conector, o "Auto from connector" não tem pacote para entregar e o onboarding não acontece.

## cleanup
- Faça o **offboarding** antes de destruir a VM: @ Defender: Settings > Endpoints > Offboarding (pacote de offboarding) — ou mantenha a VM no inventário.
- Apague os grupos MD102-G1/G2 e as políticas MD102-L21-*.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/protect/advanced-threat-protection-configure
- https://learn.microsoft.com/en-us/defender-endpoint/prevent-changes-to-security-settings-with-tamper-protection
- https://learn.microsoft.com/en-us/defender-endpoint/machine-groups

=== L22 | ASR, Acesso controlado a pastas e Proteção contra explorações | A | 60
questions: Q001,Q130,Q196,Q100,Q206,Q144
predict: Q001
## overview
Testa as regras de redução de superfície de ataque e a proteção de pastas contra ransomware.

- **Controlled folder access** só deixa apps confiáveis ou listados gravarem nas pastas protegidas (Q001, Q130).
- Configuração vinda do Intune não pode ser desfeita pelo admin local (Q001).
- Duas políticas com a **mesma regra** e valores diferentes → **conflito** → nenhuma é aplicada (Q196).
- **Exploit protection**: XML exportado do app Windows Security e importado no Intune (Q100, Q206).

## prereqs
- W11-LAB01 inscrita (de preferência já no Defender, L21, para ver os eventos no portal).
- Um disco de dados D: na VM (Hyper-V > Add hard drive) com a pasta **D:\Folder1**.
- Um executável qualquer copiado para **C:\Tools\AppA.exe** (ex.: uma cópia do notepad.exe renomeada).

## steps
### 1. Controlled folder access e ASR
@ Intune: Endpoint security > Attack surface reduction > Create Policy > Windows > Attack Surface Reduction Rules

- Nome: MD102-L22-ASR
- Enable Controlled Folder Access: **Enabled**
- Controlled Folder Access Protected Folders: `D:\Folder1`
- Controlled Folder Access Allowed Applications: `C:\Tools\AppA.exe`
- Block execution of potentially obfuscated scripts: **Audit**
- Atribua à W11-LAB01.

### 2. Política em conflito (Q196)
Crie **MD102-L22-ASR-B** com a regra *Block execution of potentially obfuscated scripts* = **Block** e atribua à mesma VM.

### 3. Exploit protection (Q100)
1. Numa VM de referência: @ Windows: Windows Security > App & browser control > Exploit protection settings > System settings
2. Deixe **Data Execution Prevention** = On by default e **Force randomization for images (Mandatory ASLR)** = On by default.
3. **Export settings** → `C:\Temp\ep.xml`.
4. @ Intune: Endpoint security > Attack surface reduction > Create Policy > Windows > **Exploit Protection** > Exploit Protection Settings: cole/importe o XML.

## test
1. Confira o que chegou:
```powershell
Get-MpPreference | Select EnableControlledFolderAccess, ControlledFolderAccessProtectedFolders, ControlledFolderAccessAllowedApplications
Get-MpPreference | Select -ExpandProperty AttackSurfaceReductionRules_Ids
```
2. **Notepad** salvando em D:\Folder1\a.txt: anote se grava.
3. **PowerShell** gravando na pasta protegida e na Área de trabalho:
```powershell
Set-Content D:\Folder1\b.txt "teste"
Set-Content "$env:USERPROFILE\Desktop\c.txt" "teste"
```
4. **AppA.exe** (cópia do Notepad) salvando em D:\Folder1.
5. Como admin local, tente remover D:\Folder1 em Windows Security > Virus & threat protection > **Ransomware protection**.
6. Veja o status da regra em conflito no portal.
7. Exploit protection: `Get-ProcessMitigation -System`.

## evidence
- Event Viewer > Applications and Services Logs > Microsoft > Windows > **Windows Defender** > Operational: **1123** (bloqueio do Controlled folder access), **1121/1122** (ASR em bloqueio/auditoria).
- Política > Per setting status (o **Conflict** da regra disputada).
- No portal do Defender: a timeline do dispositivo, com os eventos de ASR.

## expected
- PowerShell é bloqueado na pasta protegida e na Área de trabalho (pastas padrão também são protegidas).
- AppA.exe grava em D:\Folder1 (está na lista de permitidos).
- O Notepad pode gravar: a Microsoft confia em apps de boa reputação. É o ponto polêmico da Q001; anote o que aconteceu no seu teste.
- O admin local não consegue remover a pasta: a configuração é gerenciada.
- A regra em conflito mostra **Conflict** e fica com a configuração local (não aplicada).
- `Get-ProcessMitigation -System` mostra DEP e Mandatory ASLR ligados.

## variations
- **Q144:** "Block Office applications from creating child processes" é ASR (Exploit Guard); bloquear FTP (porta 21) é regra de Firewall.
- **Q206:** veja que o Exploit Guard nos templates clássicos fica em **Endpoint protection**.

## breakit
Coloque `D:\Folder1\` com um caminho errado (ex.: `D:\Pasta1`) e repita o teste do PowerShell: grava sem bloqueio. Erro de digitação em pasta protegida falha em silêncio.

## cleanup
Apague MD102-L22-*; `Set-MpPreference -EnableControlledFolderAccess Disabled` se a VM continuar em uso; restaure o checkpoint.

## refs
- https://learn.microsoft.com/en-us/defender-endpoint/controlled-folders
- https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference
- https://learn.microsoft.com/en-us/defender-endpoint/customize-exploit-protection

=== L23 | Certificados: raiz confiável e PKCS com a PKI do laboratório | B | 120
questions: Q098,Q188,Q239
predict: Q098
## overview
Usa a sua PKI de lab (Root CA offline + **LAB-SUBCA-CA**) para entregar certificados pelo Intune.

- A raiz vai num perfil **Trusted certificate** (Q188).
- O **Certificate Connector for Intune** pede o certificado PKCS à CA emissora.
- Ordem: raiz → perfil de confiança → perfil PKCS que referencia a raiz (Q098).
- Com duas camadas, a intermediária também precisa de perfil (contexto da Q239).

## prereqs
- PKI de lab funcionando (Root CA offline + LAB-SUBCA-CA emitindo).
- Um servidor membro do domínio para o conector (ex.: LLK85SH20053), com acesso à CA.
- W11-LAB01 inscrita.

## steps
### 1. Exporte os certificados das CAs
Exporte o certificado da Root CA e o da LAB-SUBCA-CA em formato **.cer** (DER ou Base64).

### 2. Perfis de confiança
@ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > Trusted certificate

- **MD102-L23-Root**: arquivo da Root CA · Destination store: **Computer certificate store - Root**
- **MD102-L23-Sub**: arquivo da LAB-SUBCA-CA · Destination store: **Computer certificate store - Intermediate**

### 3. Template na CA
Na LAB-SUBCA-CA, em `certtmpl.msc`:
1. Duplique o template **User** > nome **MD102-PKCS-User**.
2. Request Handling: **Allow private key to be exported**.
3. Subject Name: **Supply in the request**.
4. Security: a conta de computador do servidor do conector com **Read** e **Enroll**.
5. Em `certsrv.msc` > Certificate Templates > New > **Certificate Template to Issue** > MD102-PKCS-User.

### 4. Instale o conector
@ Intune: Tenant administration > Connectors and tokens > Certificate connectors > Add

- Baixe e instale no servidor. No assistente, marque **PKCS**, use a conta SYSTEM (ou uma conta de serviço) e entre com um Intune Administrator.

### 5. Perfil PKCS
Templates > **PKCS certificate**:

- Renewal threshold: 20 · Certificate validity: 1 ano
- Key storage provider: **Enroll to Software KSP**
- Certification authority: FQDN do servidor da LAB-SUBCA-CA · Certification authority name: **LAB-SUBCA-CA**
- Certificate template name: **MD102-PKCS-User** · Certificate type: **User**
- Subject name format: `CN={{UserName}},E={{EmailAddress}}` · Subject alternative name: UPN = `{{UserPrincipalName}}`
- Extended key usage: Client Authentication · Root certificate: **MD102-L23-Root**
- Atribua a um grupo de usuários com user01.

## test
1. Entre na W11-LAB01 com user01 e sincronize.
2. `certlm.msc`: Trusted Root Certification Authorities e Intermediate Certification Authorities com os certificados da sua PKI.
3. `certmgr.msc` (usuário): Personal > Certificates com um certificado emitido pela LAB-SUBCA-CA.
4. Na CA: `certsrv.msc` > Issued Certificates com o pedido do conector.

## evidence
- No servidor do conector: Event Viewer > Applications and Services Logs > Microsoft > Intune > **CertificateConnectors** > Operational/Admin.
- Perfil PKCS > Device and user check-in status.
- @ Intune: Devices > Monitor > **Certificates** (lista de certificados emitidos).

## expected
O usuário recebe um certificado da LAB-SUBCA-CA, e a cadeia é confiável porque a raiz e a intermediária chegaram pelos perfis de Trusted certificate.

## variations
- **Q239:** num perfil **SCEP**, o campo Root Certificate aponta para o perfil de confiança da **raiz** da cadeia. Abra o template SCEP e veja que ele pede um perfil Trusted certificate.
- Troque o Certificate type para **Device** e o subject para `CN={{AAD_Device_ID}}`.

## breakit
Tire o **Enroll** da conta do conector no template. O perfil PKCS falha, e o log CertificateConnectors registra o "access denied" da CA.

## cleanup
Apague os perfis MD102-L23-*, revogue os certificados de teste na CA e despublique o template.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/protect/certificates-pfx-configure
- https://learn.microsoft.com/en-us/intune/intune-service/protect/certificate-connector-install
- https://learn.microsoft.com/en-us/intune/intune-service/protect/certificates-trusted-root
