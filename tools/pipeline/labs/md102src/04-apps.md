=== L24 | Aplicativos Win32: empacotamento, detecção, dependências e supersedência | A | 60
questions: Q009,Q084,Q223,Q269,Q127,Q156,Q247
predict: Q009
## overview
Empacota e publica apps Win32 pelo Intune, do jeito que as questões cobram.

- Instalador com vários arquivos ou .exe → **Win32 Content Prep Tool** → arquivo **.intunewin** (Q084, Q223, Q269).
- **Dependência** é configurada no app que depende do outro (Q009).
- **Information URL** e **Privacy URL** aparecem no Company Portal (Q127).
- Atribuição só a grupos com segurança (M365, segurança, mail-enabled security), não a grupos de distribuição (Q156).

## prereqs
- W11-LAB01 inscrita.
- **IntuneWinAppUtil.exe** (repositório microsoft/Microsoft-Win32-Content-Prep-Tool no GitHub).
- Instalador atual do 7-Zip (.exe x64) em `C:\Pack\7zip\src`.
- Grupos **MD102-L24-Dev** (dispositivos, com a W11-LAB01) e **MD102-L24-Users** (user01).

## steps
### 1. Empacote o App1 (7-Zip)
```powershell
.\IntuneWinAppUtil.exe -c C:\Pack\7zip\src -s 7z2409-x64.exe -o C:\Pack\7zip\out -q
```
(troque o nome do .exe pela versão que você baixou)

### 2. Crie o App2, que depende do 7-Zip
Pasta `C:\Pack\app2\src` com o `install.ps1`:
```powershell
New-Item C:\MD102 -ItemType Directory -Force | Out-Null
& "$env:ProgramFiles\7-Zip\7z.exe" a C:\MD102\teste.7z C:\Windows\win.ini | Out-Null
if (Test-Path C:\MD102\teste.7z) { Set-Content C:\MD102\L24-app2.ok "ok"; exit 0 } else { exit 1 }
```
```powershell
.\IntuneWinAppUtil.exe -c C:\Pack\app2\src -s install.ps1 -o C:\Pack\app2\out -q
```

### 3. Publique o App1
@ Intune: Apps > All apps > Create > App type: **Windows app (Win32)** > selecione o .intunewin do 7-Zip

- App information: Name **MD102-7-Zip** · Publisher · **Information URL** e **Privacy URL** preenchidas
- Program: Install `7z2409-x64.exe /S` · Uninstall `"%ProgramFiles%\7-Zip\Uninstall.exe" /S` · Install behavior: **System**
- Requirements: 64-bit · Minimum OS: Windows 10 22H2
- Detection rules: Manually configure > **File** · Path `C:\Program Files\7-Zip` · File `7z.exe` · Detection method: **File or folder exists**
- Assignments: **Available for enrolled devices** → MD102-L24-Users

### 4. Publique o App2 com dependência
Mesmo caminho, com o .intunewin do App2:

- Install: `powershell.exe -ExecutionPolicy Bypass -File .\install.ps1` · Uninstall: `cmd.exe /c del C:\MD102\L24-app2.ok`
- Detection: File `C:\MD102` · `L24-app2.ok` · exists
- **Dependencies** > Add > MD102-7-Zip > Automatically install: **Yes**
- Assignments: **Required** → MD102-L24-Dev

### 5. Company Portal
@ Intune: Apps > All apps > Create > App type: **Microsoft Store app (new)** > Search the Microsoft Store app (new) > **Company Portal** > Install behavior: System · Required → MD102-L24-Dev.

## test
1. Na VM, acelere o agente:
```powershell
Restart-Service IntuneManagementExtension
```
2. Acompanhe o log: o App2 dispara a instalação do 7-Zip **antes**.
3. Abra o Company Portal como user01: o MD102-7-Zip aparece como disponível, com os links de informação e privacidade.
4. Tente atribuir o app a um **grupo de distribuição**: ele não aparece no seletor.

## evidence
- `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\IntuneManagementExtension.log` e **AppWorkload.log**.
- @ Intune: Apps > All apps > (app) > **Device install status** / **User install status**.
- Registro: `HKLM\SOFTWARE\Microsoft\IntuneManagementExtension\Win32Apps`.

## expected
- O 7-Zip instala primeiro por dependência, depois o App2; o arquivo `C:\MD102\L24-app2.ok` existe.
- No Company Portal aparecem Information URL e Privacy URL (Developer e Owner não aparecem).

## variations
- **Supersedência:** empacote uma versão mais nova do 7-Zip como **MD102-7-Zip-New** e, na aba **Supersedence**, aponte para MD102-7-Zip com *Uninstall previous version* = No. Veja a atualização.
- **Q247:** o Intune não implanta apps em Linux; só conformidade e scripts.

## breakit
Erre o caminho da regra de detecção (ex.: `C:\Program Files\7Zip`). A instalação roda, mas o Intune reporta falha **0x87D1041C** ("o app não foi detectado depois da instalação"). É o erro número 1 de app Win32.

## cleanup
Desinstale (atribuição Uninstall) e apague MD102-L24-*.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-prepare
- https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-add
- https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-supersedence

=== L25 | Microsoft 365 Apps: Intune, ODT, OCT e Política de Nuvem | B | 90
questions: Q006,Q014,Q085,Q248,Q013,Q154,Q083,Q222,Q197
predict: Q006
## overview
Testa as formas de instalar e configurar o Microsoft 365 Apps.

- Pelo Intune: **Apps > Microsoft 365 Apps** (Q014, Q085).
- Pelo **ODT**: XML → `/download` → `/configure` (Q006); o XML vem da **Office Customization Tool** em config.office.com (Q083).
- No **Microsoft 365 Apps admin center**: Modern App Settings (WebView2) e **Policy Management** (Cloud Policy) (Q013, Q222).
- Várias atribuições de Microsoft 365 Apps no mesmo dispositivo: só a primeira vale (contexto da Q248).

## prereqs
- W11-LAB01 e W11-LAB02 inscritas, sem Office.
- user01 com E5 (inclui o Microsoft 365 Apps).
- ~3 GB de download por VM (o Delivery Optimization do L15 ajuda).

## steps
### 1. Pelo Intune (W11-LAB01)
@ Intune: Apps > All apps > Create > App type: **Microsoft 365 Apps** (Windows 10 and later)

- Configuration settings format: Configuration designer
- Apps: Excel, Outlook, PowerPoint, Teams, Word · Architecture: **64-bit**
- Update channel: **Monthly Enterprise Channel** · Remove other versions: Yes · Version to install: Latest
- Accept the Microsoft Software License Terms on behalf of users: Yes · Languages: Portuguese (Brazil)
- Assignments: Required → grupo com a W11-LAB01

### 2. Pelo ODT (W11-LAB02)
1. Em https://config.office.com > Customization > **Device Configuration** > Create: essa é a **Office Customization Tool**. Monte a configuração (mesmos apps, canal e idioma) e exporte o `config.xml`.
2. Baixe e extraia o **Office Deployment Tool** em `C:\ODT`.
3. Em prompt elevado:
```bat
cd C:\ODT
setup.exe /download config.xml
setup.exe /configure config.xml
```

### 3. Cloud Policy (Q222)
https://config.office.com > Customization > **Policy Management** > Create

- Nome: MD102-L25-Excel · Scope: grupo de usuários com user01
- Policy: **Default file format Excel** = Open Document Spreadsheet (*.ods)

### 4. Modern App Settings (Q013)
Na mesma Office Customization Tool (Customization > **Device Configuration**), a seção **Modern App Settings** tem a opção de instalação automática do **WebView2**. Bloquear o envio de feedback, por outro lado, é Cloud Policy (**Policy Management**).

## test
1. Acompanhe a instalação na W11-LAB01 (pode levar 30 a 60 minutos).
2. Abra o Excel como user01, crie uma planilha e salve: o formato padrão sugerido é .ods (a Cloud Policy pode levar até ~90 minutos e um reinício do app).
3. Nos dois PCs, File > Account: confira o canal de atualização.

## evidence
- @ Intune: Apps > All apps > (Microsoft 365 Apps) > Device install status.
- Registro da Cloud Policy: `HKCU\Software\Policies\Microsoft\Cloud\Office\16.0`.
- Logs de instalação do Click-to-Run em `%windir%\Temp` e `%temp%` (arquivos *.log com o nome do PC).

## expected
- Os dois caminhos instalam o Office: o do Intune sem tocar na VM; o do ODT com /download e /configure.
- A Cloud Policy muda o formato padrão do Excel para .ods para quem está no grupo (inclusive membros de grupos aninhados, Q222).

## variations
- **Q248:** crie um segundo Microsoft 365 Apps (só Word) atribuído ao **usuário** e mantenha o primeiro atribuído ao **dispositivo**. Observe o que realmente é instalado: com várias atribuições de Microsoft 365 Apps, o Intune processa só uma.
- **Q154:** teste o acesso a config.office.com com Office Apps Administrator e com Security Administrator.
- **Q085:** atribua o app a um grupo dinâmico `(device.deviceOwnership -eq "Company")` e veja que um dispositivo pessoal fica de fora.

## breakit
Rode `setup.exe /configure` com um XML que tenha `<Remove All="TRUE"/>` por engano: o Office instalado é removido. Por isso o XML sempre se gera na OCT e se revisa antes.

## cleanup
Desinstale o Office (atribuição Uninstall ou ODT com Remove), apague a Cloud Policy e os apps MD102-L25-*.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-add-office365
- https://learn.microsoft.com/en-us/microsoft-365-apps/deploy/overview-office-deployment-tool
- https://learn.microsoft.com/en-us/microsoft-365-apps/admin-center/overview-cloud-policy

=== L26 | Proteção de aplicativos (MAM) e configuração de aplicativos | C | 60
questions: Q157,Q005,Q008,Q081,Q153,Q204,Q253,Q219,Q155,Q221,Q007,Q010,Q082,Q125,Q246
predict: Q157
## overview
Testa as **app protection policies** (proteção dos dados dentro do app, sem inscrever o dispositivo) e as **app configuration policies**.

- App protection é atribuída a **usuários**, por **plataforma** (Q008, Q157).
- No Android, o **Company Portal** é o broker; no iOS, o Authenticator (Q157).
- PIN e credenciais (**Access requirements**), versão mínima (**Conditional launch**), copiar/colar e impressão (**Data protection**) (Q005, Q153, Q204, Q253).
- Conditional Access com **Require app protection policy** (Q219).
- App configuration por plataforma; Android Enterprise só para apps do Managed Google Play (Q010, Q082, Q125, Q246).

## prereqs
- **Parte Windows (Edge):** uma VM **não inscrita** no Intune (workgroup, só com a conta de trabalho no Edge).
- **Parte celular (opcional):** um Android ou iPhone pessoal com Outlook e Company Portal (Android) ou Authenticator (iOS).
- Grupo de usuários **MD102-L26-MAM** com user02.

## steps
### 1. App protection para Windows (Edge)
@ Intune: Apps > Manage apps > Protection > Create policy > **Windows**

- Target app: Microsoft Edge
- Data protection: Receive data from: **No sources** · Send org data to: **No destinations** · Allow cut, copy, and paste for: **No destination or source** · Print org data: **Block**
- Health checks > Conditional launch: Min OS version (ex.: 10.0.22631) · Action: Block access
- Assignments: MD102-L26-MAM

### 2. Conditional Access para o Edge no Windows (Q219)
@ Entra: Entra ID > Conditional Access > Policies > New policy

- Users: MD102-L26-MAM · Target resources: Office 365
- Conditions > Device platforms: **Windows** · Client apps: **Browser**
- Grant: **Require app protection policy**

### 3. App protection para Android/iOS (opcional)
@ Intune: Apps > Manage apps > Protection > Create policy > **Android** (ou iOS/iPadOS)

- Apps: Microsoft Outlook, Teams, OneDrive
- Data protection: Restrict cut, copy, and paste: **Policy managed apps** · Printing org data: Block
- Access requirements: PIN for access: Require · Recheck the access requirements after (minutes of inactivity): **30** · Work or school account credentials for access: Require
- Conditional launch: Max PIN attempts **5** → **Reset PIN** · Min OS version → Block access

### 4. App configuration para o Edge
@ Intune: Apps > Manage apps > Configuration > Create > **Managed apps**

- App: Microsoft Edge · Edge configuration settings: Homepage shortcut URL, Managed bookmarks.

## test
1. Na VM não inscrita, abra o Edge, adicione o perfil de trabalho com user02 e abra um documento do SharePoint. O Edge pede para "proteger os dados da organização" e aplica a política.
2. Tente copiar um texto do documento e colar no Bloco de Notas; tente imprimir.
3. No celular: abra o Outlook com user02, espere 30 minutos de inatividade e volte (pede PIN e credenciais); erre o PIN 5 vezes (o PIN do app é redefinido).

## evidence
- @ Intune: Apps > Monitor > **App protection status** (inclui dispositivos não inscritos, Q155).
- No Edge: `edge://management` (estado da proteção).
- Sign-in logs do Entra: o grant "Require app protection policy".

## expected
- Copiar e imprimir dados da organização ficam bloqueados no Edge de trabalho; o perfil pessoal continua livre.
- O acesso ao Office 365 pelo navegador, nessa VM, só funciona no Edge com a proteção aplicada.
- No celular: PIN e credenciais pedidos depois de 30 minutos; após 5 erros, o PIN do app é redefinido (Q005).

## variations
- **Q008 e Q010:** uma política por plataforma; versões diferentes do mesmo SO não pedem políticas separadas.
- **Q221:** no Windows, o Edge é configurado por **perfil de configuração**; no Android/iOS, por **app configuration policy**.
- **Q125 e Q246:** com Android Enterprise gerenciado, app configuration só se aplica a apps do Managed Google Play e system apps (veja o L31).

## breakit
Atribua a app protection a um grupo de **dispositivos**. Ela não se aplica: app protection é sempre por usuário.

## cleanup
Apague MD102-L26-* (políticas e CA); remova o perfil de trabalho do Edge.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/apps/protect-mam-windows
- https://learn.microsoft.com/en-us/intune/intune-service/apps/app-protection-policy
- https://learn.microsoft.com/en-us/intune/intune-service/apps/app-configuration-policies-overview

=== L27 | Quiosque com Microsoft Edge | A | 40
questions: Q028,Q212
predict: Q028
## overview
Transforma uma VM em quiosque de app único com o Edge.

- O template **Kiosk** atende "um app em tela cheia para o público" (Q212).
- No modo **Public browsing (InPrivate)**, o Edge tem várias abas e barra de endereço, sem restringir URLs (Q028).

## prereqs
- Uma VM inscrita **dedicada** ao teste (W11-LAB03), com checkpoint antes.

## steps
@ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > Kiosk

- Nome: MD102-L27-Kiosk
- Kiosk mode: **Single app, full-screen kiosk**
- User logon type: **Auto logon (Windows 10, version 1803 and later)**
- Application type: **Add Microsoft Edge browser**
- Edge Kiosk URL: `https://www.microsoft.com`
- Microsoft Edge kiosk mode type: **Public browsing (InPrivate)**
- Refresh browser after idle time: 5
- Atribua à W11-LAB03.

## test
1. Sincronize e reinicie a VM: ela entra sozinha numa conta de quiosque com o Edge em tela cheia.
2. Abra outra aba e digite outra URL. Feche a janela do Edge.
3. Para sair do quiosque: Ctrl+Alt+Del > Sign out > entre com outro usuário.

## evidence
- Event Viewer > Applications and Services Logs > Microsoft > Windows > **AssignedAccess** > Admin e Operational.
- Perfil > Per setting status.

## expected
- No Public browsing: dá para abrir abas e navegar para outras URLs; a URL do perfil é só a página inicial (Q028). O Edge reabre se for fechado.

## variations
- Troque para **Digital/Interactive signage**: sem barra de endereço e sem abas; a página fica fixa.
- Troque para **Multi-app kiosk** e escolha dois apps.

## breakit
Atribua o perfil Kiosk a uma VM que você usa nos outros labs. Ela vira quiosque no próximo reinício. Use sempre uma VM dedicada.

## cleanup
Restaure o checkpoint da W11-LAB03 (o mais rápido) e apague o perfil.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/configuration/kiosk-settings-windows
- https://learn.microsoft.com/en-us/deployedge/microsoft-edge-configure-kiosk-mode

=== L28 | Scripts e Correções (extra) | A | 40
questions:
predict:
## overview
Não há questão sobre isso no dump, mas **Remediations** e **platform scripts** estão no Skills Measured atual (domínio de automação e monitoramento). Este lab cobre o básico.

- **Platform scripts**: rodam uma vez (ou de novo se mudarem).
- **Remediations**: par de scripts de **detecção** e **correção**, com agendamento e relatório.

## prereqs
- W11-LAB01 inscrita, com licença Windows Enterprise E3/E5 do usuário (incluída no M365 E5).

## steps
### 1. Remediation
Script de detecção (`detect.ps1`):
```powershell
$v = (Get-ItemProperty "HKLM:\SOFTWARE\MD102" -Name Lab -ErrorAction SilentlyContinue).Lab
if ($v -eq "ok") { Write-Output "Conforme"; exit 0 } else { Write-Output "Não conforme"; exit 1 }
```
Script de correção (`remediate.ps1`):
```powershell
New-Item "HKLM:\SOFTWARE\MD102" -Force | Out-Null
Set-ItemProperty "HKLM:\SOFTWARE\MD102" -Name Lab -Value "ok"
Write-Output "Corrigido"
```
@ Intune: Devices > Manage devices > Scripts and remediations > Remediations > Create

- Nome: MD102-L28-Reg · envie os dois scripts · Run script in 64-bit PowerShell: Yes
- Assignments: grupo com a W11-LAB01 · Schedule: Hourly

### 2. Platform script
Na aba **Platform scripts** > Add > Windows 10 and later: um script que grava `C:\MD102\L28-platform.txt`.

## test
1. `Restart-Service IntuneManagementExtension` na VM.
2. Apague a chave `HKLM\SOFTWARE\MD102` e espere a próxima execução.

## evidence
- Remediation > **Device status** (saída de detecção e correção por dispositivo).
- `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\HealthScripts.log`.

## expected
A chave volta sozinha a cada execução; o relatório mostra "Issue fixed" com a saída dos scripts.

## variations
Use **Run remediation** (ação sob demanda) no dispositivo: @ Intune: Devices > All devices > (dispositivo) > ... > Run remediation.

## breakit
Faça o script de detecção sair com `exit 0` mesmo quando não está conforme. A correção nunca roda: o resultado depende do código de saída.

## cleanup
Apague MD102-L28-* e a chave `HKLM\SOFTWARE\MD102`.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/remediations

=== L29 | Análise de endpoint, relatórios e Log Analytics do Intune | A | 60
questions: Q087,Q016,Q093,Q132,Q216,Q217,Q249,Q141,Q155,Q190,Q254,Q031,Q210
predict: Q087
## overview
Testa as fontes de relatório do Intune e o que cada uma responde.

- **Endpoint analytics**: tempo de boot, reinícios, scores. Liga com a **Intune data collection policy** e precisa de **10 dispositivos** para scores e baselines (Q087, Q093, Q216). Só Windows (Q217).
- Relatórios nativos: **Device compliance trends** (60 dias), **Device actions**, **App protection status** (Q190, Q254, Q155).
- **Data Warehouse** + Power BI para tendências históricas (Q141, Q031).
- **Diagnostic settings** → Log Analytics para consultas KQL (Q210).

## prereqs
- Dispositivos inscritos (quanto mais, melhor; com menos de 10 os scores ficam como dados insuficientes).
- Para o Log Analytics: uma assinatura Azure (a sua MSDN) e um workspace.

## steps
### 1. Endpoint analytics
@ Intune: Reports > Endpoint analytics > Settings

- Ative a **Intune data collection policy** para os dispositivos gerenciados pelo Intune (All cloud-managed devices ou um grupo).
- Os clientes do MECM (co-management, L04) também podem entrar pelo tenant attach.
- Reinicie as VMs pelo menos uma vez depois da política.

### 2. Diagnostic settings (Q210)
1. Azure: crie o workspace **MD102-LAW**.
2. @ Intune: Reports > Diagnostic settings > Add diagnostic setting
   - Logs: AuditLogs, OperationalLogs, DeviceComplianceOrg, Devices · Destination: Send to Log Analytics workspace → MD102-LAW

### 3. Data Warehouse (Q141, Q031)
@ Intune: Reports > Data warehouse — copie a **OData feed URL**. No Power BI Desktop: Get data > **OData feed** > cole a URL > Organizational account.

## test
1. Depois de algumas horas, abra @ Intune: Reports > Endpoint analytics > **Startup performance**.
2. No workspace, rode:
```kusto
IntuneDevices | summarize count() by OS
IntuneAuditLogs | project TimeGenerated, OperationName, Identity | take 20
```
3. Veja @ Intune: Reports > Device compliance > **Trends** e @ Intune: Devices > Monitor > **Device actions**.

## evidence
As próprias telas de relatório e as consultas KQL.

## expected
- Com menos de 10 dispositivos, o Endpoint analytics coleta, mas não calcula scores nem baseline (Q087, Q216).
- O workspace recebe os logs do Intune e responde às consultas KQL.
- O Power BI lê o Data Warehouse pelo feed OData.

## variations
- **Q249:** no Startup performance, use a visão **Model performance** para achar modelos mais lentos que a média.
- **Q155:** em Apps > Monitor > App protection status, o relatório inclui dispositivos **não inscritos** com app protection (L26).

## breakit
Esqueça a Intune data collection policy: o Endpoint analytics fica vazio para sempre, por mais que os dispositivos reiniciem.

## cleanup
Apague o diagnostic setting e o workspace (para não gerar custo).

## refs
- https://learn.microsoft.com/en-us/intune/analytics/overview
- https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/review-logs-using-azure-monitor
- https://learn.microsoft.com/en-us/intune/intune-service/developer/reports-proc-get-a-link-powerbi

=== L30 | Azure Monitor Agent em clientes Windows | B | 90
questions: Q182,Q089,Q186,Q256
predict: Q182
## overview
Leva os eventos do Windows dos clientes para o Log Analytics.

- Agente: **Azure Monitor Agent** (instalador para cliente Windows) (Q186, Q256).
- Destino: workspace do **Log Analytics**, onde se criam alertas com KQL (Q256).
- O cliente precisa ser **Entra joined** (Q089).
- A data collection rule (DCR) é associada a um **Monitored Object**, não ao dispositivo (Q182).

## prereqs
- Assinatura Azure (MSDN) e workspace (pode reaproveitar o MD102-LAW do L29).
- W11-LAB01 **Entra joined**.
- Um Global Administrator com **elevação de acesso** (Entra ID > Properties > Access management for Azure resources = Yes) para atribuir a função no escopo do tenant.

## steps
### 1. Data collection rule
Azure portal > Monitor > **Data Collection Rules** > Create

- Nome: MD102-L30-DCR · Platform type: **Windows**
- Data sources: **Windows Event Logs** (System: Critical/Error/Warning; Application: Critical/Error)
- Destination: MD102-LAW

### 2. Instale o agente no cliente
Baixe o **Azure Monitor Agent client installer** (MSI) indicado na documentação e rode na VM:
```bat
msiexec /i AzureMonitorAgentClientSetup.msi /qn
```

### 3. Monitored Object e associação
```powershell
Connect-AzAccount
$tenant = (Get-AzContext).Tenant.Id
$me     = (Get-AzADUser -SignedIn).Id
# 1) Função "Monitored Objects Contributor" no escopo do tenant
New-AzRoleAssignment -ObjectId $me -RoleDefinitionName "Monitored Objects Contributor" -Scope "/providers/Microsoft.Insights"
# 2) Cria o Monitored Object do tenant (a região é a dos dados do Azure Monitor)
$mo = "/providers/Microsoft.Insights/monitoredObjects/$tenant"
Invoke-AzRestMethod -Method PUT -Path "$mo`?api-version=2021-09-01-preview" -Payload '{"properties":{"location":"eastus"}}'
# 3) Associa a DCR ao Monitored Object
$dcr = (Get-AzDataCollectionRule -ResourceGroupName "RG-MD102" -Name "MD102-L30-DCR").Id
$body = @{ properties = @{ dataCollectionRuleId = $dcr } } | ConvertTo-Json
Invoke-AzRestMethod -Method PUT -Path "$mo/providers/microsoft.insights/datacollectionruleassociations/md102-assoc`?api-version=2021-09-01-preview" -Payload $body
```

! Confira a versão de API e a região na documentação antes de rodar; elas mudam com o tempo. O nome do grupo de recursos é o que você usou na DCR.

## test
1. Gere um erro no cliente: `eventcreate /T ERROR /ID 999 /L APPLICATION /SO MD102 /D "teste L30"`.
2. No workspace (pode levar ~15 minutos):
```kusto
Event | where Source == "MD102" | project TimeGenerated, Computer, EventID, RenderedDescription
```

## evidence
- Serviço do Azure Monitor Agent em execução no cliente.
- Tabela **Event** e **Heartbeat** no workspace.

## expected
O evento 999 aparece no workspace; dá para criar uma regra de alerta de log em cima da consulta.

## variations
- **Q089:** tente instalar o agente numa VM **workgroup** sem Entra join: o agente não autentica.
- **Q186:** a resposta da prova é instalar o Azure Monitor Agent. Na prática, o instalador de cliente exige que o computador seja Entra joined ou hybrid joined; máquinas só do domínio precisam do hybrid join (L04) antes.

## breakit
Associe a DCR diretamente a um recurso (como se faz com VMs do Azure) e não ao Monitored Object: o cliente não recebe a configuração.

## cleanup
Apague a associação, a DCR e o workspace; desinstale o agente.

## refs
- https://learn.microsoft.com/en-us/azure/azure-monitor/agents/azure-monitor-agent-windows-client

=== L31 | Dispositivos móveis: Apple, Android e atualizações | C | 60
questions: Q148,Q032,Q090,Q094,Q191,Q126,Q158,Q019,Q030,Q193,Q011,Q268,Q220,Q062,Q138,Q027,Q238
predict: Q148
## overview
Sem frota de celulares corporativos, este lab cobre o que dá para fazer com um celular pessoal e o que é só portal.

- **Apple MDM push certificate** vem antes de qualquer inscrição Apple (Q032).
- Políticas de atualização do iOS e o adiamento de visibilidade só valem para **supervisionados** (ADE) (Q090, Q148, Q191).
- **Managed Google Play** vinculado é pré-requisito de apps no Android Enterprise; apps são **aprovados** e **sincronizados** (Q126, Q158).
- **Custom notifications** chegam a iOS/Android, não ao Windows (Q030).
- Formatos de app: .ipa (iOS), .apk (Android LOB) (Q011, Q268).

## prereqs
- Um Apple ID corporativo (para o push certificate) e/ou uma conta Google (para o Managed Google Play).
- Um iPhone ou Android pessoal (opcional).

## steps
### 1. Apple MDM push certificate
@ Intune: Devices > Device onboarding > Enrollment > Apple > Apple MDM Push certificate

1. Aceite os termos e **Download your CSR**.
2. Abra o Apple Push Certificates Portal, entre com o Apple ID, envie o CSR e baixe o `.pem`.
3. Volte ao Intune, informe o Apple ID e envie o .pem.

? Renove todo ano com o **mesmo** Apple ID; trocar o Apple ID obriga a reinscrever todos os dispositivos Apple.

### 2. Managed Google Play
@ Intune: Devices > Device onboarding > Enrollment > Android > Managed Google Play > Launch Google to connect now (entre com uma conta Google).

Depois: @ Intune: Apps > All apps > Create > **Managed Google Play app** > aprove um app (ex.: Chrome) > **Sync**.

### 3. Atualização do iOS (só portal)
@ Intune: Devices > Manage updates > Apple updates > Update policies for iOS/iPadOS > Create profile — veja os campos de agendamento (Q094).

Device restrictions do iOS > General > **Defer software updates** (só supervisionados, Q191).

### 4. Custom notification (Q030)
@ Intune: Tenant administration > Custom notifications — envie para um grupo com seu usuário.

## test
1. Inscreva o celular pessoal pelo Company Portal (iPhone: device enrollment; Android: work profile pessoal).
2. Atribua a ele a política de atualização do iOS: ela fica **Not applicable** (não é supervisionado).
3. Envie a custom notification: chega no celular; no Windows, não.

## evidence
- Status da política por dispositivo; notificação no Company Portal do celular.

## expected
- Política de update do iOS só se aplica a dispositivos **supervisionados** (ADE): os 800 da Q148, não os do Company Portal.
- Sem o push certificate, nenhum dispositivo Apple inscreve.

## variations
- **Q193:** iOS pessoal → **User enrollment**; Windows já no MECM → co-management.
- **Q027:** restrição de plataforma bloqueando o Android device administrator (L03).
- **Q019:** em Android Enterprise corporativo dedicado, o modo quiosque fica em Device restrictions > **Device experience**.
- **Q238:** o Intune gerencia atualizações de Windows, iOS/iPadOS, macOS e Android (Android Enterprise corporativo e FOTA da Samsung). Veja os nós em Devices > Manage updates.

## breakit
Deixe o push certificate expirar (ou não renove no lab): todos os iOS param de receber comandos. É o incidente clássico de Intune com Apple.

## cleanup
Retire o celular pessoal do Intune; desvincule o Managed Google Play se não for usar.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/enrollment/apple-mdm-push-certificate-get
- https://learn.microsoft.com/en-us/intune/intune-service/enrollment/connect-intune-android-enterprise
- https://learn.microsoft.com/en-us/intune/intune-service/protect/software-updates-ios

=== L32 | Windows 365 (sem licença no laboratório) | D | 20
questions: Q250,Q258,Q260,Q261
predict: Q260
## overview
O seu lab não tem licenças de Windows 365, então este é um roteiro de leitura guiada com o que olhar no portal.

- Cloud PC **hybrid joined** exige uma **Azure network connection (ANC)** para uma VNet que alcança e resolve o DC (Q260, Q261).
- VNet sem conexão com o on-premises → Cloud PC **Microsoft Entra joined** (Q250).
- Imagem customizada: Azure só aceita **VHD de tamanho fixo**, geração 2 (Q258).

## steps
@ Intune: Devices > Device onboarding > Windows 365

- Veja as abas **Provisioning policies**, **Custom images** e **Azure network connection**.
- Leia a ordem: ANC (para hybrid) → provisioning policy (que referencia a ANC) → atribuição a grupo de usuários licenciados.

Para converter um disco Hyper-V para o formato aceito:
```powershell
Convert-VHD -Path C:\VMs\ref.vhdx -DestinationPath C:\VMs\ref.vhd -VHDType Fixed
```

## expected
Saber a ordem e o pré-requisito de rede de cada tipo de join, e o formato de disco da imagem.

## refs
- https://learn.microsoft.com/en-us/windows-365/enterprise/azure-network-connections
- https://learn.microsoft.com/en-us/windows-365/enterprise/add-device-images
