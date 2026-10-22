/* =====================================================================
   SimuladorMS — labs práticos MD-102
   32 labs montados a partir do banco de questões. Cada lab aponta para as
   questões que ele cobre (campo questions); o app mostra o link "Fazer o lab"
   na explicação dessas questões.
   Sintaxe extra de markdown usada aqui:
     @ Portal: Menu > Submenu > Item     → caminho de navegação
     ```powershell ... ```               → bloco de código com botão Copiar
     1. item                             → lista numerada
     ! texto  /  ? texto                 → aviso  /  dica
   ===================================================================== */
SIM.registerLabs("MD-102", {
 "env": {
  "title": "Ambiente de referência dos labs",
  "overview": "Todos os labs assumem o seu lab híbrido. Os nomes abaixo são os do seu ambiente; troque se algo mudou.\n\n| Item | Valor |\n|---|---|\n| Tenant | camposlab.online (25 Microsoft 365 E5 + 25 Entra Suite) |\n| Domínio on-premises | lab.local (Entra Connect ativo no LLK85SH20053) |\n| DC / DNS | LLK85SH20050 (10.85.134.50) |\n| MECM (site LAB) | LLK85SH20051 — primary, MP, DP, SUP · SQL no LLK85SH20052 |\n| Clientes MECM | LLK85SH20061 e LLK85SH20062 (domain joined) |\n| Notebook físico | LLK85SH20068 (útil para testes que exigem TPM físico) |\n| Rede | VLAN 134 (10.85.134.0/24) com saída para a internet |",
  "steps": "### VMs de teste \"só nuvem\"\nA maioria dos labs usa VMs novas, fora do domínio. Sugestão: três VMs **W11-LAB01**, **W11-LAB02** e **W11-LAB03**.\n\n- Hyper-V **Geração 2**, Secure Boot ligado, **TPM virtual ligado** (Settings > Security > Enable Trusted Platform Module).\n- **Memória estática** de 4 GB ou mais (memória dinâmica derruba checagens de requisito, como você já viu no in-place upgrade).\n- Windows 11 Enterprise ou Pro, em português ou inglês, como preferir.\n- Tire um checkpoint **\"00-OOBE\"** com a VM parada na primeira tela do OOBE e outro **\"01-Limpa\"** logo depois de criar o usuário local. Quase todo lab começa de um desses dois.\n\n### Usuários e grupos de teste\nCrie de uma vez os usuários que os labs usam. Todos com licença Microsoft 365 E5, exceto onde o lab pedir o contrário.\n\n```powershell\n# Requer: Install-Module Microsoft.Graph -Scope CurrentUser\nConnect-MgGraph -Scopes \"User.ReadWrite.All\",\"Group.ReadWrite.All\",\"Organization.Read.All\"\n$dom = \"camposlab.online\"\n$e5  = (Get-MgSubscribedSku | Where-Object SkuPartNumber -eq \"SPE_E5\").SkuId\n$pwd = @{ Password = \"Lab@MD102-2026!\"; ForceChangePasswordNextSignIn = $false }\nforeach ($n in \"user01\",\"user02\",\"user03\",\"user04\",\"user05\",\"adm-helpdesk\",\"adm-roleadmin\",\"adm-sec\",\"adm-cda\") {\n  $u = New-MgUser -DisplayName $n -UserPrincipalName \"$n@$dom\" -MailNickname $n `\n       -AccountEnabled -PasswordProfile $pwd -UsageLocation \"BR\"\n  if ($n -like \"user0*\") { Set-MgUserLicense -UserId $u.Id -AddLicenses @(@{SkuId=$e5}) -RemoveLicenses @() }\n}\n```\n\n? O SkuPartNumber do Microsoft 365 E5 costuma ser `SPE_E5`. Se o comando não achar, rode `Get-MgSubscribedSku | Select SkuPartNumber` e use o que aparecer.\n\n### Convenção de nomes\nTudo o que um lab criar (grupos, políticas, perfis, apps) começa com **MD102-Lxx-**. Assim, a limpeza é procurar por esse prefixo.\n\n```powershell\n# Lista o que sobrou de um lab no Intune (perfis do Settings catalog e templates)\n# Requer: Install-Module Microsoft.Graph.Beta -Scope CurrentUser\nConnect-MgGraph -Scopes \"DeviceManagementConfiguration.Read.All\"\nGet-MgBetaDeviceManagementConfigurationPolicy -All | Where-Object Name -like \"MD102-*\" | Select Name, Id\nGet-MgBetaDeviceManagementDeviceConfiguration -All | Where-Object DisplayName -like \"MD102-*\" | Select DisplayName, Id\n```\n\n### Como acelerar a aplicação de políticas\nO Intune não aplica na hora. Use um destes atalhos antes de concluir que algo falhou:\n\n- No portal: @ Intune: Devices > All devices > (dispositivo) > Sync\n- No Windows: Settings > Accounts > Access work or school > (conta) > Info > **Sync**\n- No Company Portal: Settings > **Sync**\n- Por PowerShell, no dispositivo:\n\n```powershell\nGet-ScheduledTask | Where-Object TaskName -eq \"PushLaunch\" | Start-ScheduledTask   # check-in MDM\nRestart-Service IntuneManagementExtension                                            # apps Win32 e scripts\n```\n\n- No MECM: Configuration Manager (Painel de Controle) > Actions > **Machine Policy Retrieval & Evaluation Cycle**.\n\n### Diagnóstico que serve para quase todo lab\n| O que | Onde |\n|---|---|\n| Estado do join | `dsregcmd /status` (AzureAdJoined, DomainJoined, WorkplaceJoined, NgcSet) |\n| Políticas MDM recebidas | Settings > Accounts > Access work or school > Info > **Create report** (gera `MDMDiagReport.html` em `C:\\Users\\Public\\Documents\\MDMDiagnostics`) |\n| Log do MDM | Event Viewer > Applications and Services Logs > Microsoft > Windows > **DeviceManagement-Enterprise-Diagnostics-Provider** > Admin |\n| Apps Win32 e scripts | `C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\IntuneManagementExtension.log` e `AppWorkload.log` |\n| Valores aplicados | `HKLM\\SOFTWARE\\Microsoft\\PolicyManager\\current\\device\\` |\n| Coleta completa | `mdmdiagnosticstool.exe -area \"DeviceEnrollment;DeviceProvisioning;Autopilot\" -cab C:\\Temp\\diag.cab` |\n\n### Portais\n- Intune: https://intune.microsoft.com\n- Entra: https://entra.microsoft.com\n- Defender: https://security.microsoft.com\n- Microsoft 365 Apps admin center: https://config.office.com\n\n! Os menus do Intune e do Entra mudam de nome com frequência. Os caminhos dos labs foram conferidos na documentação de outubro de 2026. Se algum item não estiver onde o lab indica, use a caixa de busca do portal com o nome da configuração.\n\n### Classes de lab\n| Classe | Significado |\n|---|---|\n| A | Rápido (até ~45 min). Configura, sincroniza e observa. |\n| B | Longo (1 a 3 h). Envolve OOBE, reinícios, conector ou download grande. |\n| C | Parcial. Parte depende de algo que o lab não tem (iPhone/Android, licença extra). O lab faz o que dá e explica o resto. |\n| D | Sem lab prático. Só leitura guiada. |"
 },
 "labs": [
  {
   "id": "L01",
   "title": "Entra join e administradores locais",
   "kind": "A",
   "minutes": 40,
   "domain": 1,
   "questions": [
    "Q042",
    "Q101",
    "Q109",
    "Q180",
    "Q232",
    "Q041",
    "Q175"
   ],
   "predict": "Q042",
   "refs": [
    "https://learn.microsoft.com/en-us/entra/identity/devices/assign-local-admin",
    "https://learn.microsoft.com/en-us/entra/identity/devices/device-join-plan"
   ],
   "overview": "Mostra quem vira administrador local quando um Windows entra no Entra ID (Entra join) e a diferença entre **join** e **registro**.\n\n- Quem vira admin local: o usuário que fez o join, a função Global Administrator e a função *Microsoft Entra Joined Device Local Administrator*. Security Administrator e Cloud Device Administrator **não** viram.\n- Como desligar a promoção automática do usuário que faz o join (Q180).\n- Como adicionar uma conta do Entra a um grupo local com o prefixo `AzureAD\\` (Q109 e Q232).\n- Entra join × Entra registered: quem pode o quê (Q041 e Q175).",
   "prereqs": "- W11-LAB01 no checkpoint **01-Limpa** (workgroup, usuário local).\n- user01 (sem função), adm-sec (função **Security Administrator**) e adm-cda (função **Cloud Device Administrator**).\n- Para atribuir as funções: @ Entra: Entra ID > Roles & admins > Roles & admins > (função) > Add assignments",
   "steps": "### 1. Confira as configurações de dispositivo do tenant\n@ Entra: Entra ID > Devices > Overview > Device settings\n\nAnote o valor atual e deixe assim para o teste:\n- **Users may join devices to Microsoft Entra**: All\n- **Registering user is added as local administrator on the device during Microsoft Entra join**: All\n- **Global administrator role is added as local administrator on the device during Microsoft Entra join**: Yes\n\n### 2. Faça o Entra join com o user01\n1. Na W11-LAB01: @ Windows: Settings > Accounts > Access work or school > Connect\n2. Clique em **Join this device to Microsoft Entra ID** (o link pequeno no rodapé da janela, não o botão principal).\n3. Entre com user01@camposlab.online, confirme a organização e conclua.\n4. Faça logoff e entre como **user01** (Other user > user01@camposlab.online).\n\n### 3. Veja quem está no grupo Administrators\n```powershell\nnet localgroup Administrators\nwhoami /groups | findstr /i \"S-1-12-1\"\n```\nAs funções do Entra aparecem como SIDs `S-1-12-1-...` (Global Administrator e Microsoft Entra Joined Device Local Administrator). O user01 aparece como `AzureAD\\user01...`.\n\n### 4. Adicione outra conta do Entra por linha de comando\nEm um prompt elevado (como user01, que é admin):\n```powershell\nnet localgroup Administrators /add \"AzureAD\\user02@camposlab.online\"\nnet localgroup \"Remote Desktop Users\" /add \"AzureAD\\user03@camposlab.online\"\n```",
   "test": "1. Faça logoff e entre como **adm-sec**. Tente abrir um PowerShell como administrador: o UAC deve pedir credencial de administrador.\n2. Repita com **adm-cda**: mesmo resultado.\n3. Entre como **user02** (adicionado no passo 4): ele deve abrir o prompt elevado sem pedir senha.\n4. Teste da Q180: em @ Entra: Entra ID > Devices > Overview > Device settings, mude **Registering user is added as local administrator...** para **None**. Restaure o checkpoint 01-Limpa, faça o join de novo com user01 e rode `net localgroup Administrators`: o user01 não aparece.\n5. Registro × join (Q175): restaure o checkpoint, entre com o usuário **local** e, em Access work or school > **Connect**, use o botão principal com user04 (sem clicar em \"Join this device\"). O dispositivo fica **registrado**: você continua entrando com a conta local e acessa os recursos da empresa pelo navegador e pelos apps.",
   "evidence": "- `dsregcmd /status`: **AzureAdJoined : YES** no join; **WorkplaceJoined : YES** no registro.\n- @ Entra: Entra ID > Devices > All devices — coluna **Join type**: *Microsoft Entra joined* × *Microsoft Entra registered*.\n- `net localgroup Administrators` e `whoami /groups`.",
   "expected": "| Conta | Admin local? | Por quê |\n|---|---|---|\n| user01 (fez o join) | Sim | \"Registering user is added as local administrator\" = All |\n| adm-sec (Security Administrator) | Não | A função não é adicionada ao grupo local |\n| adm-cda (Cloud Device Administrator) | Não | Gerencia dispositivos no Entra, mas não vira admin local |\n| user02 (adicionado com net localgroup) | Sim | `AzureAD\\UPN` é a forma de referenciar contas do Entra localmente |\n\nCom a configuração em **None**, o user01 deixa de ser admin no próximo join (Q180). No registro, o login continua com a conta pessoal/local (Q175).",
   "variations": "- **Q109 e Q232:** troque o prefixo por `CONTOSO\\` ou `user02@...` sem prefixo e veja o erro \"There is no such global user or group\".\n- **Q041:** registre um celular (Authenticator ou Company Portal) e veja que ele aparece como *registered*. Entra join só existe para Windows.\n- Atribua a função **Microsoft Entra Joined Device Local Administrator** ao user04 (@ Entra: Entra ID > Devices > Overview > Device settings > Manage Additional local administrators on all Microsoft Entra joined devices). Entre com user04 na W11-LAB01: ele é admin (pode levar até 4 horas ou exigir novo logon para o token refletir).",
   "breakit": "Em Device settings, mude **Users may join devices to Microsoft Entra** para **Selected** sem ninguém na lista e tente o join com user01. A tela final mostra que a organização não permite o join.",
   "cleanup": "- Volte as configurações de Device settings aos valores anotados no passo 1.\n- @ Entra: Entra ID > Devices > All devices — apague o dispositivo W11-LAB01.\n- Restaure o checkpoint 01-Limpa."
  },
  {
   "id": "L02",
   "title": "Inscrição automática no Intune (MDM e MAM user scope)",
   "kind": "A",
   "minutes": 45,
   "domain": 1,
   "questions": [
    "Q113",
    "Q149",
    "Q195",
    "Q136",
    "Q152"
   ],
   "predict": "Q149",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enroll",
    "https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enrollment-methods"
   ],
   "overview": "Testa quando um Windows entra **sozinho** no Intune ao fazer join ou registro, e como o Intune classifica o dispositivo (corporativo ou pessoal).\n\n- **MDM user scope** define quem inscreve automaticamente. **MAM/WIP user scope** não inscreve no MDM.\n- Usuário nos dois escopos: o MDM vence em dispositivo corporativo (Q149).\n- Entra joined → **Corporate**. Registrado (conta de trabalho em PC pessoal) → **Personal** (Q136).\n- A Q113 é duvidosa no banco: este lab tira a dúvida no seu tenant.",
   "prereqs": "- W11-LAB01 e W11-LAB02 no checkpoint **01-Limpa**.\n- Grupos de usuários: **MD102-L02-MDM** (user01, user03) e **MD102-L02-MAM** (user02, user03).",
   "steps": "### 1. Configure os escopos\n@ Intune: Devices > Device onboarding > Enrollment > Windows > Automatic Enrollment\n\n- **MDM user scope**: Some → MD102-L02-MDM\n- **Windows Information Protection (WIP) user scope** (o antigo \"MAM user scope\"): Some → MD102-L02-MAM\n- Deixe as URLs (terms of use, discovery, compliance) nos valores padrão e salve.\n\n? O mesmo blade aparece no Entra em Entra ID > Mobility (MDM and WIP) > Microsoft Intune. É a mesma configuração.\n\n### 2. Faça os joins\n1. W11-LAB01: Entra join com **user01** (como no L01).\n2. W11-LAB02: Entra join com **user02**.\n3. Restaure a W11-LAB02 e faça o join com **user03**.",
   "test": "1. Para cada join, abra Settings > Accounts > Access work or school > (conta) > **Info**. Se o botão Info existe e mostra \"Managed by camposlab\", o dispositivo está no MDM.\n2. Teste de registro (Q136 e Q113): restaure a W11-LAB02, entre com o usuário **local**, vá em Access work or school > **Connect** (botão principal) com **user01**. Veja se o dispositivo aparece no Intune e com qual propriedade.\n3. Repita o registro com **user02**: ele está só no escopo WIP.",
   "evidence": "- @ Intune: Devices > All devices — colunas **Ownership** (Corporate/Personal), **Managed by** e **Primary user UPN**.\n- Event Viewer > Applications and Services Logs > Microsoft > Windows > DeviceManagement-Enterprise-Diagnostics-Provider > Admin: eventos de \"MDM Enroll: Succeeded\" ou falha.\n- `dsregcmd /status`: na seção de diagnóstico, os campos **MdmUrl** e **MdmComplianceUrl** só aparecem preenchidos quando a inscrição automática foi oferecida.",
   "expected": "| Cenário | Entra | Intune |\n|---|---|---|\n| Join com user01 (MDM scope) | Joined | Inscrito, **Corporate** |\n| Join com user02 (só WIP) | Joined | **Não** inscrito |\n| Join com user03 (MDM + WIP) | Joined | Inscrito (MDM vence no corporativo) |\n| Registro com user01 | Registered | Inscrito como **Personal** (a anotar: é a afirmação polêmica da Q113) |\n| Registro com user02 | Registered | Não inscrito no MDM |\n\nAnote o resultado do registro com user01. Ele define qual leitura da Q113 vale no seu tenant.",
   "variations": "- **Q195:** Android não usa esse mecanismo. A inscrição automática por MDM user scope é coisa do Windows.\n- Mude o MDM user scope para **All** e repita o join com user02: agora ele inscreve.\n- Mude a propriedade de um dispositivo à mão: @ Intune: Devices > All devices > (dispositivo) > Properties > **Device ownership**.",
   "breakit": "Coloque o MDM user scope em **None** e faça o join com user01. O Entra join funciona, mas o dispositivo não entra no Intune. Esse é o sintoma clássico de \"join ok, mas nada de política chega\".",
   "cleanup": "- Volte o MDM user scope para o valor original do seu tenant (se for usar os outros labs, **All** ou um grupo com os usuários de teste).\n- Apague os dispositivos de teste no Intune e no Entra; restaure os checkpoints."
  },
  {
   "id": "L03",
   "title": "Restrições de inscrição, limites, DEM e categorias",
   "kind": "A",
   "minutes": 45,
   "domain": 1,
   "questions": [
    "Q027",
    "Q065",
    "Q265",
    "Q208",
    "Q207"
   ],
   "predict": "Q065",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/enrollment/enrollment-restrictions-set",
    "https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-manager-enroll",
    "https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-group-mapping"
   ],
   "overview": "Testa as travas na entrada do Intune: quantos dispositivos cada usuário pode inscrever, quais plataformas são aceitas e como fazer o usuário escolher uma **categoria** que coloca o dispositivo no grupo certo.\n\n- **Device limit restriction** por grupo de usuários, com prioridade.\n- **Device enrollment manager (DEM)** ignora o limite e inscreve até 1.000 dispositivos (Q065).\n- **Device platform restriction**: bloquear plataforma, versão ou dispositivo pessoal (Q027, Q265, Q208).\n- **Device categories** + grupo dinâmico `device.deviceCategory` (Q208).\n- Registro DNS **EnterpriseEnrollment** por sufixo de UPN (Q207).",
   "prereqs": "- W11-LAB01, W11-LAB02 e W11-LAB03 no checkpoint 01-Limpa.\n- Grupo **MD102-L03-Limite** com user04.\n- MDM user scope incluindo user04 e user05 (L02).",
   "steps": "### 1. Limite de dispositivos\n@ Intune: Devices > Device onboarding > Enrollment > Device limit restriction > Create restriction\n\n- Nome: MD102-L03-Limite1 · Device limit: **1** · Atribuição: MD102-L03-Limite\n- Confira a **prioridade** na lista: a restrição de prioridade 1 vence a \"All users\" (Default).\n\n### 2. Device enrollment manager\n@ Intune: Devices > Device onboarding > Enrollment > Device enrollment managers > Add\n\n- Adicione **user05**.\n\n### 3. Restrição de plataforma\n@ Intune: Devices > Device onboarding > Enrollment > Device platform restriction > (aba Windows) > Create restriction\n\n- Nome: MD102-L03-SemPessoal · Windows (MDM): Allow · **Personally owned devices: Block** · Atribua a MD102-L03-Limite.\n\n### 4. Categorias de dispositivo\n@ Intune: Devices > Organize devices > Device categories > Create device category\n\n- Crie **MD102-Vendas** e **MD102-TI**.\n- Grupo dinâmico de dispositivos **MD102-L03-Cat-Vendas**:\n\n@ Entra: Entra ID > Groups > All groups > New group\n\n```text\nMembership type: Dynamic Device\n(device.deviceCategory -eq \"MD102-Vendas\")\n```",
   "test": "1. **Limite:** faça o join da W11-LAB01 com user04 (ok). Faça o join da W11-LAB02 com user04: o join no Entra conclui, mas a inscrição no Intune falha por limite.\n2. **DEM:** com user05, inscreva duas VMs em sequência usando Settings > Accounts > Access work or school > **Enroll only in device management**. As duas entram, mesmo com um limite de 1 em vigor para ele.\n3. **Pessoal bloqueado:** na W11-LAB03, com usuário local, adicione a conta do user04 (registro). A inscrição é recusada porque o dispositivo é pessoal.\n4. **Categoria:** instale o Company Portal (L24) num dispositivo inscrito e abra o app. Ele pede a categoria; escolha MD102-Vendas. Confira se o dispositivo entra no grupo MD102-L03-Cat-Vendas.",
   "evidence": "- @ Intune: Devices > Monitor > **Enrollment failures** (motivo da recusa por limite ou plataforma).\n- Detalhes do dispositivo: **Device category**.\n- Membros do grupo dinâmico (pode levar alguns minutos para recalcular).",
   "expected": "- Limite 1: o segundo dispositivo do user04 não entra no Intune (Q065: o usuário respeita o limite do grupo dele).\n- DEM: o user05 ignora o limite e pode chegar a 1.000 dispositivos (Q065).\n- Pessoal bloqueado: o registro do user04 não inscreve.\n- Categoria: o dispositivo cai no grupo dinâmico certo (Q208).",
   "variations": "- **Q027 e Q265:** na aba **Android** da restrição de plataforma, veja que dá para bloquear o **Android device administrator** inteiro e permitir só o Android Enterprise (work profile). Na aba **iOS/iPadOS**, veja o campo de versão mínima (Q265: min 11.0). Não precisa de celular para enxergar onde ficam.\n- **Q207:** se você controla o DNS público do camposlab.online, crie `enterpriseenrollment.camposlab.online` CNAME `enterpriseenrollment-s.manage.microsoft.com` e teste com `Resolve-DnsName enterpriseenrollment.camposlab.online`. Um registro por sufixo de UPN.",
   "breakit": "Dê prioridade 1 a uma restrição com **Device limit: 15** para \"All users\" e prioridade 2 à de limite 1. Veja qual vale para o user04: a de menor número de prioridade que inclui o usuário.",
   "cleanup": "- Apague MD102-L03-* (restrições, categorias, grupo) e remova o user05 dos DEMs.\n- Apague os dispositivos de teste; restaure os checkpoints."
  },
  {
   "id": "L04",
   "title": "Hybrid join, inscrição por GPO e co-management com o MECM",
   "kind": "B",
   "minutes": 120,
   "domain": 1,
   "questions": [
    "Q142",
    "Q237",
    "Q193",
    "Q055"
   ],
   "predict": "Q142",
   "refs": [
    "https://learn.microsoft.com/en-us/entra/identity/devices/how-to-hybrid-join",
    "https://learn.microsoft.com/en-us/windows/client-management/enroll-a-windows-10-device-automatically-using-group-policy",
    "https://learn.microsoft.com/en-us/intune/configmgr/comanage/how-to-enable",
    "https://learn.microsoft.com/en-us/intune/configmgr/comanage/how-to-switch-workloads"
   ],
   "overview": "Usa o seu MECM para testar os dois caminhos de levar um computador **do domínio** para o Intune:\n\n- **GPO** \"Enable automatic MDM enrollment using default Azure AD credentials\" (Q142), depois do hybrid join.\n- **Co-management** pelo Cloud Attach do MECM (Q193), com troca de **workloads** entre MECM e Intune.\n- O estado **Pending** do hybrid join e por que ele depende de linha de visada com o DC (Q237).",
   "prereqs": "- Entra Connect no LLK85SH20053 sincronizando a OU dos computadores LLK85SH20061 e LLK85SH20062.\n- Os dois clientes com o agente do MECM saudável (site LAB).\n- user01 e user02 sincronizados do lab.local ou existentes no tenant com licença E5 (os usuários do domínio precisam estar sincronizados e licenciados para a inscrição por credencial de usuário).\n- MDM user scope incluindo esses usuários (L02).",
   "steps": "### 1. Configure o hybrid join no Entra Connect\nNo LLK85SH20053, abra o **Microsoft Entra Connect**:\n1. **Configure** > **Configure device options** > Next.\n2. Entre com um Global Administrator do tenant.\n3. **Configure Microsoft Entra hybrid join** > marque **Windows 10 or later domain-joined devices**.\n4. **SCP configuration**: floresta lab.local, Authentication Service **Microsoft Entra ID**, credencial de Enterprise Admin > Configure.\n\nConfira o SCP criado:\n```powershell\n$scp = \"CN=62a0ff2e-97b9-4513-943f-0d221bd30080,CN=Device Registration Configuration,CN=Services,\" + (Get-ADRootDSE).configurationNamingContext\nGet-ADObject $scp -Properties keywords | Select -ExpandProperty keywords\n```\n\n### 2. Faça o hybrid join dos clientes\nNos dois clientes, depois de um ciclo de sincronização do Entra Connect (`Start-ADSyncSyncCycle -PolicyType Delta` no servidor do Connect):\n1. Reinicie e entre com um usuário do domínio.\n2. Ou force: @ Windows: Task Scheduler > Microsoft > Windows > Workplace Join > Automatic-Device-Join > Run\n3. Rode `dsregcmd /status` até ver **AzureAdJoined : YES** e **DomainJoined : YES**.\n\n### 3. Caminho A — GPO (no LLK85SH20062)\nNo DC, crie a GPO **MD102-L04-AutoMDM** e vincule à OU do LLK85SH20062:\n\n@ GPO: Computer Configuration > Policies > Administrative Templates > Windows Components > MDM > Enable automatic MDM enrollment using default Azure AD credentials\n\nValor: **Enabled** · Credential type: **User Credential**\n\nNo cliente: `gpupdate /force`, faça logoff e logon com o usuário do domínio.\n\n### 4. Caminho B — Co-management (no LLK85SH20061)\n1. No MECM, crie a coleção de dispositivos **MD102-L04-Pilot** com o LLK85SH20061.\n2. @ MECM: Administration > Overview > Cloud Services > Cloud Attach > Configure Cloud Attach\n3. **Onboarding**: Azure public cloud > Sign In com um Global Administrator.\n4. **Enablement**: Automatic enrollment in Intune = **Pilot** · Intune Auto Enrollment = MD102-L04-Pilot.\n5. Conclua o assistente.\n6. Depois de habilitar, abra as propriedades do objeto de co-management (Cloud Attach > **CoMgmtSettingsProd** > Properties):\n   - Aba **Workloads**: Compliance policies → **Pilot Intune**.\n   - Aba **Staging**: pilot collection de Compliance policies = MD102-L04-Pilot.\n7. No cliente: Machine Policy Retrieval & Evaluation Cycle.",
   "test": "1. Espere a inscrição (no co-management ela é aleatorizada e pode levar algumas horas; no lab costuma ser rápida após o ciclo de política).\n2. No Intune, confira os dois dispositivos.\n3. Crie a política de conformidade do L16 (ou qualquer uma simples, como firewall obrigatório) e atribua aos dois.\n4. Veja o status de conformidade de cada um e compare com a posição do workload.\n5. Volte o workload de Compliance policies para **Configuration Manager** e sincronize de novo.",
   "evidence": "- @ Intune: Devices > All devices — **Managed by**: *Co-managed* (LLK85SH20061) e *Intune* (LLK85SH20062); **Join type**: *Microsoft Entra hybrid joined*.\n- Cliente: `C:\\Windows\\CCM\\Logs\\CoManagementHandler.log` (procure as linhas de habilitação do co-management e dos workloads).\n- GPO: Task Scheduler > Microsoft > Windows > **EnterpriseMgmt** (a tarefa criada pela inscrição) e o log DeviceManagement-Enterprise-Diagnostics-Provider > Admin.\n- MECM: Monitoring > Overview > **Cloud Attach** (painel de co-management).",
   "expected": "- Os dois clientes ficam hybrid joined e inscritos no Intune: um pela GPO, outro pelo co-management.\n- Com o workload **Pilot Intune**, a conformidade do LLK85SH20061 vem do Intune. Com o workload no **Configuration Manager**, o Intune mostra que a conformidade é avaliada pelo ConfigMgr (*See ConfigMgr*).\n- Q193: para um Windows já gerenciado pelo MECM, o caminho com menor impacto é o co-management.",
   "variations": "- **Q055:** compare os caminhos de provisionamento. Para máquinas que só existem no AD (sem Entra) e precisam de apps complexos na montagem, o MECM com task sequence continua sendo a resposta.\n- Mova outros workloads (Windows Update policies, Endpoint Protection) para Pilot Intune e veja o efeito no cliente.",
   "breakit": "- **Q237:** num cliente ainda não registrado, desconecte a rede da VM logo depois da sincronização do Entra Connect. O objeto aparece no Entra como **Pending** e fica assim até o dispositivo, com acesso a um DC, concluir o registro no logon do usuário.\n- Tire a OU do LLK85SH20062 do escopo de sincronização do Entra Connect: o dispositivo some do Entra e o hybrid join não completa.",
   "cleanup": "- Workloads de volta para Configuration Manager; Automatic enrollment = None, se não for manter.\n- Desvincule a GPO MD102-L04-AutoMDM.\n- Opcional: retire os dispositivos do Intune (eles continuam hybrid joined)."
  },
  {
   "id": "L05",
   "title": "Subscription activation e upgrade de edição",
   "kind": "B",
   "minutes": 60,
   "domain": 1,
   "questions": [
    "Q068",
    "Q073",
    "Q117",
    "Q124",
    "Q160",
    "Q173",
    "Q129",
    "Q169",
    "Q233",
    "Q077"
   ],
   "predict": "Q073",
   "refs": [
    "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation",
    "https://learn.microsoft.com/en-us/intune/intune-service/configuration/edition-upgrade-windows-settings"
   ],
   "overview": "Testa como a licença do usuário transforma um Windows **Pro** em **Enterprise** sem reinstalar nada, e os limites disso.\n\n- Muda a **edição** (Pro → Enterprise), nunca a **versão** (10 continua 10).\n- Só funciona em dispositivo **Entra joined** ou **hybrid joined**. Registrado não vale (Q068, Q124).\n- O usuário precisa de licença que inclua o Windows Enterprise (o Microsoft 365 E5 inclui).\n- O perfil **Edition upgrade and mode switch** do Intune faz a troca por chave (Q129).",
   "prereqs": "- Uma VM **Windows 11 Pro ativada** (chave da sua assinatura Visual Studio ou licença digital). Sem ativação, o step-up não acontece.\n- Opcional: uma VM **Windows 10 Pro** 64 bits ativada.\n- user01 com Microsoft 365 E5.",
   "steps": "### 1. Veja o estado inicial\n```powershell\nGet-WindowsEdition -Online\n(Get-CimInstance Win32_OperatingSystem).Caption\nslmgr /dlv\n```\n\n### 2. Faça o Entra join com o user01\nComo no L01. Depois do join, entre como user01.\n\n### 3. Teste o caso \"registrado\"\nEm outra VM Pro (ou restaurando o checkpoint), só **registre** o dispositivo (Access work or school > Connect com user01, sem join) e entre com a conta local.\n\n### 4. Perfil de upgrade de edição (alternativa por chave)\n@ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > Edition upgrade and mode switch\n\n- Edition to upgrade to: **Windows 10/11 Enterprise**\n- Product key: a chave do seu contrato. Para só ver a troca de edição no lab, dá para usar a chave genérica pública de KMS do Enterprise (`NPPR9-FWDCX-D2C8J-H872K-2YT43`). A edição muda, mas o Windows fica sem ativação até achar um KMS.",
   "test": "1. Na VM joined, depois do logon do user01, abra Settings > System > **Activation**. Espere alguns minutos e faça logoff/logon se não mudar.\n2. Na VM só registrada, confira a edição.\n3. Se tiver a VM Windows 10 Pro, faça o join com user01 e veja para qual edição ela vai.",
   "evidence": "- Settings > System > Activation: edição e a linha de assinatura ativa.\n- `Get-WindowsEdition -Online` (**Enterprise** depois do step-up).\n- @ Intune: Devices > All devices > (dispositivo) > Hardware — sistema operacional e SKU.",
   "expected": "| Dispositivo | Resultado |\n|---|---|\n| Windows 11 Pro, Entra joined, user01 com E5 | Windows 11 **Enterprise** |\n| Windows 11 Pro, só registrado | Continua **Pro** |\n| Windows 10 Pro, Entra joined | Windows **10** Enterprise (não vira 11) |",
   "variations": "- **Q233:** licenças Office 365 E5 + EMS E5 **não** incluem o Windows; Microsoft 365 E3/E5 incluem. Se tiver um usuário com só Office 365 E5, faça o logon e veja que a edição não muda.\n- **Q077:** a licença Windows Enterprise por usuário permite ativar em até 5 dispositivos.\n- **Q169:** compare no portal de lifecycle: feature updates do Windows 11 têm 24 meses no Pro e 36 meses no Enterprise (versão H2).",
   "breakit": "Remova a licença E5 do user01 e faça logon de novo depois de algumas horas. A ativação de assinatura deixa de ser renovada e o dispositivo volta para Pro quando a assinatura vence; não é imediato.",
   "cleanup": "- Devolva a licença ao user01; apague o perfil MD102-L05-*.\n- Restaure os checkpoints."
  },
  {
   "id": "L06",
   "title": "Provisioning package (Windows Configuration Designer)",
   "kind": "B",
   "minutes": 60,
   "domain": 1,
   "questions": [
    "Q135",
    "Q058",
    "Q120"
   ],
   "predict": "Q135",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-bulk-enroll",
    "https://learn.microsoft.com/en-us/windows/configuration/provisioning-packages/provisioning-create-package"
   ],
   "overview": "Testa a inscrição **em massa** de PCs de workgroup com um arquivo .ppkg: Entra join + Intune + Wi-Fi/apps, sem Autopilot e sem reinstalar.\n\n- O Windows Configuration Designer gera um **bulk token** (cria uma conta `package_<GUID>` no tenant).\n- O pacote pode trocar a edição, configurar rede e instalar apps (Q058, Q120).",
   "prereqs": "- W11-LAB02 no checkpoint 01-Limpa.\n- **Windows Configuration Designer** (Microsoft Store) numa máquina sua.\n- Entra: **Users may join devices to Microsoft Entra** = All (ou incluindo o usuário package_ depois que ele for criado).\n- MDM user scope = All (ou um grupo que inclua o usuário package_).",
   "steps": "1. Abra o Windows Configuration Designer > **Provision desktop devices**. Nome do projeto: MD102-L06.\n2. **Set up device**: Device name `MD102-%RAND:4%` · desmarque \"Remove pre-installed software\".\n3. **Set up network**: no Hyper-V use rede cabeada (desligue o Wi-Fi). Em notebook físico, informe SSID e senha (é o que a Q135 cobra).\n4. **Account Management**: **Enroll into Microsoft Entra ID** · Bulk Token Expiry (até 180 dias) · **Get Bulk Token** e entre com um admin.\n5. **Add applications** (opcional) e **Add certificates** (opcional, ex.: a raiz da sua PKI de lab).\n6. **Finish** > **Create**. Copie o `.ppkg` gerado.",
   "test": "1. Na W11-LAB02 (já no Windows), dê dois cliques no .ppkg e confirme. Ou, em PowerShell elevado:\n```powershell\nInstall-ProvisioningPackage -PackagePath C:\\Temp\\MD102-L06.ppkg -QuietInstall\n```\n2. Outra forma: com a VM em OOBE, conecte um disco/pendrive com o .ppkg na raiz; o OOBE detecta e oferece aplicar.\n3. Reinicie e verifique o join e a inscrição.",
   "evidence": "- `dsregcmd /status` (AzureAdJoined : YES).\n- @ Intune: Devices > All devices — dispositivo com nome MD102-xxxx, **sem usuário primário** (inscrição em massa é sem afinidade).\n- Settings > Accounts > Access work or school > **Add or remove a provisioning package** (pacotes aplicados).\n- Event Viewer > Applications and Services Logs > Microsoft > Windows > **Provisioning-Diagnostics-Provider** > Admin.\n- @ Entra: Entra ID > Users — a conta **package_<GUID>** criada pelo token.",
   "expected": "O PC de workgroup vira Entra joined e inscrito no Intune com um único arquivo, sem reinstalação. É o que a Q135 pede (Wi-Fi + inscrição em massa).",
   "variations": "- **Q058 (borderline):** em **Switch to advanced editor** > Runtime settings > EditionUpgrade, informe uma chave Enterprise: o pacote também troca a edição.\n- **Q120:** compare com Autopilot (L09) e imagem customizada: os três atendem a \"Enterprise + apps + certificado\", cada um com um custo diferente.",
   "breakit": "Apague a conta package_ no Entra (ou use um pacote com token vencido) e aplique em outra VM. O join falha.",
   "cleanup": "- Apague os dispositivos de teste no Intune e no Entra **antes** de apagar a conta package_.\n- Restaure o checkpoint."
  },
  {
   "id": "L07",
   "title": "Lógica de atribuição: grupos, exclusões, filtros, scope tags e policy sets",
   "kind": "A",
   "minutes": 50,
   "domain": 2,
   "questions": [
    "Q143",
    "Q004",
    "Q022",
    "Q099",
    "Q037",
    "Q147",
    "Q095",
    "Q213",
    "Q264"
   ],
   "predict": "Q143",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-profile-assign",
    "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/filters",
    "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/policy-sets"
   ],
   "overview": "Reproduz a lógica que mais aparece nas questões: **quem recebe** uma política.\n\n- **Exclusão vence inclusão** (Q143, Q037, Q264).\n- Restringir uma política a um dispositivo se faz nas **Assignments**, não em applicability rules (Q022).\n- **Scope tags** não mudam quem recebe; só quem administra (Q004).\n- **Filtros** refinam a atribuição sem criar grupos.\n- **Policy sets** agrupam objetos de várias plataformas e não aceitam Conditional Access (Q095, Q147, Q213).\n- Grupos dinâmicos por versão de SO (Q099).",
   "prereqs": "- W11-LAB01 e W11-LAB02 inscritos no Intune (L02).\n- Grupos de dispositivos **MD102-L07-G1** (W11-LAB01 e W11-LAB02) e **MD102-L07-G2** (só W11-LAB02).",
   "steps": "### 1. Reproduza a Q143 com dois update rings\n@ Intune: Devices > Windows > Manage updates > Windows updates > Update rings > Create profile\n\n- **MD102-L07-Ring1**: Quality update deferral period = **3** · Include **G1** · Exclude **G2**\n- **MD102-L07-Ring2**: Quality update deferral period = **5** · Include **G2** · Exclude **G1**\n\n### 2. Scope tag\n@ Intune: Tenant administration > Roles > Scope tags > Create\n\n- Crie **MD102-L07-Tag** e aplique ao Ring1 (Properties > Scope tags). Não mude as atribuições.\n\n### 3. Filtro\n@ Intune: Tenant administration > Assignment filters > Create\n\n```text\nNome: MD102-L07-SoLab02  ·  Platform: Windows 10 and later\n(device.deviceName -eq \"W11-LAB02\")\n```\n\nCrie um perfil simples do Settings catalog (ex.: **MD102-L07-Perfil**, Experience > Allow Cortana = Block) atribuído a **All devices** com o filtro em modo **Include**.\n\n### 4. Policy set\n@ Intune: Devices > Organize devices > Policy sets > Create\n\n- Adicione o Ring1, o perfil do passo 3 e uma política de conformidade qualquer. Tente adicionar uma política de Conditional Access: ela não aparece como opção.",
   "test": "1. Sincronize as duas VMs.\n2. Leia o adiamento aplicado em cada uma:\n```powershell\nGet-ItemProperty \"HKLM:\\SOFTWARE\\Microsoft\\PolicyManager\\current\\device\\Update\" |\n  Select DeferQualityUpdatesPeriodInDays\n```\n3. Veja quem recebeu o perfil com filtro.",
   "evidence": "- No ring: **Device status** / **Device assignment status**.\n- Em cada dispositivo: @ Intune: Devices > All devices > (dispositivo) > **Device configuration** — lista de perfis e estado.\n- No perfil com filtro: o dispositivo excluído pelo filtro aparece como **Not applicable**.",
   "expected": "| VM | Ring1 | Ring2 | Adiamento |\n|---|---|---|---|\n| W11-LAB01 (só G1) | Aplica | — | **3 dias** |\n| W11-LAB02 (G1 e G2) | Excluída por G2 | Excluída por G1 | **Nenhum** (sem valor no registro) |\n\n- A scope tag não muda nada na aplicação (Q004).\n- O perfil com filtro chega só à W11-LAB02.\n- O policy set não aceita Conditional Access (Q095).",
   "variations": "- **Q099:** grupo dinâmico de dispositivos com `(device.deviceOSVersion -startsWith \"10.0.26\")` para pegar só o Windows 11 24H2/25H2.\n- **Q147:** atribua o policy set a \"All users\" excluindo um grupo de usuários e entre com usuários diferentes.\n- Misturar grupo de **usuários** e grupo de **dispositivos** entre include e exclude não é avaliado como você espera. Teste incluindo G1 (dispositivos) e excluindo MD102-L02-MDM (usuários).",
   "breakit": "Use **applicability rules** (edição do SO) para tentar separar as duas VMs. Como as duas têm a mesma edição, não separa: é exatamente o distrator da Q022.",
   "cleanup": "Apague MD102-L07-* (rings, perfil, filtro, scope tag, policy set, grupos)."
  },
  {
   "id": "L08",
   "title": "RBAC do Intune, scope tags e funções do Entra",
   "kind": "A",
   "minutes": 45,
   "domain": 1,
   "questions": [
    "Q177",
    "Q104",
    "Q110",
    "Q209",
    "Q154"
   ],
   "predict": "Q177",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/role-based-access-control",
    "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/scope-tags",
    "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
   ],
   "overview": "Testa quem pode fazer o quê com o **menor privilégio**.\n\n- Intune: **Help Desk Operator** (tarefas remotas, atribuir o que já existe) × **Intune Role Administrator** (gerencia funções e atribuições) (Q177).\n- Help Desk Operator pode **rotacionar a chave do BitLocker** (Q209).\n- Scope tags limitando o que cada admin enxerga.\n- Entra: User Administrator × Helpdesk Administrator (Q104) e quem liga/desliga **Security defaults** (Q110, duvidosa no banco).",
   "prereqs": "- adm-helpdesk e adm-roleadmin (sem funções).\n- Dois dispositivos inscritos, um com a scope tag **MD102-L08-SP**.",
   "steps": "### 1. Scope tag nos dispositivos\n@ Intune: Tenant administration > Roles > Scope tags > Create\n\n- **MD102-L08-SP** · Assignments: um grupo de dispositivos com a W11-LAB01.\n\n### 2. Help Desk Operator com escopo\n@ Intune: Tenant administration > Roles > All roles > Help Desk Operator > Assignments > Assign\n\n- Members: grupo **MD102-L08-HD** (adm-helpdesk) · Scope groups: All devices · Scope tags: **MD102-L08-SP**.\n\n### 3. Intune Role Administrator\n@ Intune: Tenant administration > Roles > All roles > Intune Role Administrator > Assignments > Assign\n\n- Members: grupo com adm-roleadmin.\n\n### 4. Funções do Entra para o teste da Q110\n@ Entra: Entra ID > Roles & admins > Roles & admins > Conditional Access Administrator > Add assignments\n\n- Atribua ao **adm-sec** (troque a função dele do L01, ou use outro usuário).",
   "test": "1. Numa janela InPrivate, entre no Intune como **adm-helpdesk**:\n   - Abra All devices: só aparece a W11-LAB01 (scope tag).\n   - Tente **Sync**, **Restart** e **BitLocker key rotation** nela.\n   - Tente criar uma política de conformidade: o botão Create fica indisponível.\n2. Entre como **adm-roleadmin** e crie uma função personalizada (Tenant administration > Roles > All roles > Create).\n3. **Q110:** entre no Entra como adm-sec (Conditional Access Administrator) e vá em @ Entra: Entra ID > Overview > Properties > **Manage security defaults**. Anote se ele consegue alterar. Depois troque a função por **Security Administrator** e repita.\n4. **Q104:** dê **Helpdesk Administrator** a um usuário e tente redefinir a senha de um usuário comum e de um admin.",
   "evidence": "- O que aparece habilitado ou desabilitado no portal para cada conta.\n- @ Intune: Tenant administration > Audit logs (quem executou cada ação).\n- @ Entra: Entra ID > Monitoring & health > Audit logs.",
   "expected": "- Help Desk Operator: executa ações remotas (inclusive rotação da chave do BitLocker) só nos dispositivos com a scope tag dele; não cria políticas.\n- Intune Role Administrator: cria funções e atribuições, mas não opera dispositivos.\n- Helpdesk Administrator redefine senha de não administradores; User Administrator cria e gerencia usuários e grupos.\n- Q110: anote quem conseguiu alterar o Security defaults. A documentação aponta **Security Administrator** como mínimo; o dump marca Conditional Access Administrator.",
   "variations": "- **Q154:** com o adm-sec como Security Administrator, abra https://config.office.com e veja se ele gerencia Policy Management. Repita com Office Apps Administrator.\n- Tire a scope tag da W11-LAB01 e veja o adm-helpdesk perder o acesso a ela.",
   "breakit": "Atribua ao Help Desk Operator um **Scope group** que não contém a W11-LAB01, mantendo a scope tag. O dispositivo aparece na lista, mas as ações falham ou ficam indisponíveis: scope tag define o que se **vê**; scope group define **sobre quem** se age.",
   "cleanup": "Remova as atribuições e a scope tag; tire as funções do Entra dadas no lab."
  },
  {
   "id": "L09",
   "title": "Windows Autopilot user-driven com Enrollment Status Page",
   "kind": "B",
   "minutes": 120,
   "domain": 1,
   "questions": [
    "Q162",
    "Q064",
    "Q078",
    "Q123",
    "Q168",
    "Q225",
    "Q226",
    "Q227",
    "Q052",
    "Q235",
    "Q076",
    "Q044"
   ],
   "predict": "Q162",
   "refs": [
    "https://learn.microsoft.com/en-us/autopilot/add-devices",
    "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow",
    "https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enrollment-status"
   ],
   "overview": "Faz um Autopilot completo numa VM: registrar o hardware, criar o perfil, a ESP e provisionar pelo OOBE.\n\n- Registrar = **hardware hash** em CSV importado no Intune (Q064, Q078, Q225).\n- O **deployment profile** define o OOBE e o tipo de join (Q123, Q162, Q168).\n- A **Enrollment Status Page** mostra o progresso, bloqueia o uso e permite coletar logs (Q052, Q162, Q235).\n- **User-driven** + inscrição automática = usuário entra no OOBE e o dispositivo já cai no Intune (Q226).\n- Grupo dinâmico com **ZTDId** pega todos os dispositivos do Autopilot (Q227).",
   "prereqs": "- W11-LAB03 no checkpoint **00-OOBE** (Gen2, vTPM, memória estática, rede com internet).\n- MDM user scope incluindo user01 (L02).\n- user01 com licença (Q076: sem licença do Intune o usuário não conclui).",
   "steps": "### 1. Capture o hardware hash\nNa tela do OOBE da W11-LAB03, aperte **Shift+F10** e rode:\n```powershell\nPowerShell.exe -ExecutionPolicy Bypass\n[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12\nNew-Item -Type Directory -Path C:\\HWID -Force | Out-Null; Set-Location C:\\HWID\n$env:Path += \";C:\\Program Files\\WindowsPowerShell\\Scripts\"\nInstall-Script -Name Get-WindowsAutopilotInfo -Force\nGet-WindowsAutopilotInfo -OutputFile AutopilotHWID.csv -GroupTag MD102\n```\nCopie o CSV para fora da VM (ou use `Get-WindowsAutopilotInfo -Online -GroupTag MD102`, que envia direto com uma conta Intune Administrator). Desligue a VM e tire o checkpoint **00-OOBE-hash**.\n\n### 2. Importe no Intune\n@ Intune: Devices > Windows > Enrollment > Windows Autopilot > Devices > Import\n\n- Selecione o CSV > Import. Depois **Sync** e **Refresh** até o dispositivo aparecer.\n\n! Não abra o CSV no Excel para \"conferir\": salvar pelo Excel quebra o arquivo.\n\n### 3. Grupo dinâmico do Autopilot\n@ Entra: Entra ID > Groups > All groups > New group\n\n```text\nMD102-L09-Autopilot · Security · Dynamic Device\n(device.devicePhysicalIds -any (_ -eq \"[OrderID]:MD102\"))\n```\nPara pegar **todos** os dispositivos do Autopilot (Q227), a regra seria `(device.devicePhysicalIDs -any (_ -startsWith \"[ZTDId]\"))`.\n\n### 4. Deployment profile\n@ Intune: Devices > Windows > Enrollment > Windows Autopilot > Deployment profiles > Create profile > Windows PC\n\n- Nome: MD102-L09-UserDriven · Convert all targeted devices to Autopilot: **No**\n- Deployment mode: **User-Driven** · Join to Microsoft Entra ID as: **Microsoft Entra joined**\n- Microsoft Software License Terms: Hide · Privacy settings: Hide · Hide change account options: Hide\n- User account type: **Standard** · Allow pre-provisioned deployment: No\n- Language (Region): Operating system default · Automatically configure keyboard: Yes\n- Apply device name template: **Yes** · `MD102-%SERIAL%` (máximo 15 caracteres; o serial do Hyper-V é longo e é truncado)\n- Assignments: **MD102-L09-Autopilot**\n\n### 5. Enrollment Status Page\n@ Intune: Devices > Windows > Enrollment > Enrollment Status Page > Create\n\n- Show app and profile configuration progress: **Yes**\n- Show an error when installation takes longer than: 60\n- Turn on log collection and diagnostics page for end users: **Yes** (Q052)\n- Block device use until all apps and profiles are installed: **Yes** (Q235)\n- Allow users to reset device if installation error occurs: Yes\n- Block device use until required apps are installed: **Selected** → escolha o app do L24 se já existir\n- Assignments: MD102-L09-Autopilot\n\n### 6. Espere o perfil ser atribuído\nNa lista de dispositivos do Autopilot, a coluna **Profile status** precisa estar **Assigned** antes de ligar a VM. Pode levar de 15 minutos a algumas horas.",
   "test": "1. Restaure o checkpoint **00-OOBE-hash** e ligue a VM.\n2. O OOBE pula as telas escondidas e mostra a página de login da organização.\n3. Entre com **user01**. Acompanhe a ESP: *Device preparation* → *Device setup* → *Account setup*.\n4. Ao terminar, confira o nome do computador, o tipo de conta (user01 é **standard**) e a inscrição.",
   "evidence": "- @ Intune: Devices > Windows > Enrollment > Windows Autopilot > Devices — Profile status e o dispositivo associado.\n- @ Intune: Devices > Monitor > **Autopilot deployments** (relatório de implantações).\n- No cliente: Event Viewer > Applications and Services Logs > Microsoft > Windows > **ModernDeployment-Diagnostics-Provider** > Autopilot.\n- `mdmdiagnosticstool.exe -area Autopilot -cab C:\\Temp\\autopilot.cab`.",
   "expected": "- Nome no padrão MD102-<serial>, Entra joined, inscrito no Intune, user01 **sem** direitos de administrador local (User account type = Standard, Q044).\n- A ESP mostra o progresso e segura o usuário até os apps marcados terminarem.",
   "variations": "- **Q076:** tire a licença E5 de um usuário e tente o OOBE com ele: o processo para na inscrição.\n- **Q078:** para \"reaproveitar\" um PC já usado, o caminho é o mesmo: CSV → import → reset.\n- **Q168:** mude o perfil para *Microsoft Entra hybrid joined* sem o conector do L11 e veja a implantação falhar.\n- Coloque a ESP atribuída a um grupo de **usuários** e veja que ela só aparece na fase de conta.",
   "breakit": "Ligue a VM antes do Profile status ficar **Assigned**. O OOBE segue o fluxo normal do Windows (sem a página da organização). É o erro mais comum de laboratório.",
   "cleanup": "- Apague o dispositivo **primeiro** em All devices (Intune), depois em Windows Autopilot > Devices, e por fim no Entra.\n- Mantenha o perfil e a ESP se for fazer o L10 e o L11."
  },
  {
   "id": "L10",
   "title": "Autopilot para dispositivos existentes, self-deploying e Autopilot Reset",
   "kind": "B",
   "minutes": 90,
   "domain": 1,
   "questions": [
    "Q048",
    "Q002",
    "Q244",
    "Q115",
    "Q170",
    "Q200",
    "Q114"
   ],
   "predict": "Q048",
   "refs": [
    "https://learn.microsoft.com/en-us/autopilot/existing-devices",
    "https://learn.microsoft.com/en-us/autopilot/self-deploying",
    "https://learn.microsoft.com/en-us/autopilot/windows-autopilot-reset"
   ],
   "overview": "Testa três pontos do Autopilot que as questões exploram:\n\n- **Convert all targeted devices to Autopilot**: só converte dispositivos **corporativos e gerenciados pelo Intune** que estejam no grupo atribuído **diretamente** (grupos aninhados não contam) (Q048, Q002, Q244).\n- **Self-deploying** exige **TPM 2.0 físico** com atestação; não funciona em VM (Q115, Q170).\n- **Autopilot Reset** apaga apps e dados do usuário, mas mantém Entra join, Intune e Wi-Fi (Q200, Q114).",
   "prereqs": "- Uma VM já Entra joined e inscrita no Intune (do L02) que **não** passou pelo Autopilot.\n- Notebook físico LLK85SH20068 para o teste de self-deploying (opcional).\n- Perfil e ESP do L09.",
   "steps": "### 1. Conversão de dispositivo existente\n1. Crie o grupo de dispositivos **MD102-L10-Converter** e coloque a VM do L02.\n2. Crie também **MD102-L10-Pai** e coloque o grupo MD102-L10-Converter **dentro** dele (aninhado).\n3. Crie um perfil **MD102-L10-Convert** igual ao do L09, mas com **Convert all targeted devices to Autopilot = Yes**, atribuído a **MD102-L10-Pai**.\n4. Espere algumas horas e veja se a VM aparece em Windows Autopilot > Devices.\n5. Mude a atribuição para **MD102-L10-Converter** (direto) e espere de novo.\n\n### 2. Self-deploying\nCrie o perfil **MD102-L10-SelfDeploy**: Deployment mode **Self-Deploying**, Apply device name template `SD-%SERIAL%`. Atribua a um grupo com uma VM registrada (L09) e, se puder, com o notebook físico.\n\n### 3. Autopilot Reset\n1. Na VM do L09 (Autopilot, Entra joined, Intune), entre como user01 e:\n   - instale um app da Microsoft Store;\n   - crie uma conexão VPN em Settings > Network & internet > VPN > Add VPN;\n   - salve um arquivo em Documents.\n2. Confirme que o Windows RE está ativo: `reagentc /info` (Windows RE status: **Enabled**).\n3. @ Intune: Devices > All devices > (dispositivo) > ... > **Autopilot Reset**\n\n? Para o reset **local** (Ctrl+Win+R na tela de bloqueio), a política *Credential Providers > Disable Automatic Re Deployment Credentials* precisa estar **Disabled** (Settings catalog).",
   "test": "1. Conversão: anote em qual das duas atribuições (aninhada ou direta) o dispositivo apareceu no Autopilot.\n2. Self-deploying: reset a VM e veja o OOBE. Depois, faça o mesmo no notebook físico.\n3. Autopilot Reset: depois do reset, entre de novo e confira o app, a VPN e o arquivo.",
   "evidence": "- Windows Autopilot > Devices (dispositivo convertido aparece com o perfil).\n- Event Viewer > ModernDeployment-Diagnostics-Provider > Autopilot (erros de atestação de TPM no self-deploying).\n- @ Intune: Devices > Monitor > **Device actions** (Autopilot Reset).",
   "expected": "| Teste | Resultado |\n|---|---|\n| Conversão via grupo aninhado | Não converte |\n| Conversão via grupo direto | Converte (pode levar até 48 h) |\n| Self-deploying em VM | Falha na atestação de TPM |\n| Self-deploying no notebook (TPM 2.0) | Provisiona sem pedir usuário |\n| Autopilot Reset | App da Store e VPN removidos; dados do usuário apagados; continua Entra joined e no Intune; Wi-Fi mantido (teste no notebook) |",
   "variations": "- **Q002:** tente converter um dispositivo **pessoal** (registrado, do L02): não converte.\n- **Q244:** um simples reinício não dispara o Autopilot; é preciso reset/OOBE.\n- **Q170:** self-deploying exige TPM 2.0. Memória não é critério.",
   "breakit": "Desabilite o Windows RE (`reagentc /disable`) e peça um Autopilot Reset remoto. A ação falha porque depende do WinRE.",
   "cleanup": "- `reagentc /enable` se desligou.\n- Apague os perfis MD102-L10-* e os grupos; restaure as VMs."
  },
  {
   "id": "L11",
   "title": "Autopilot com hybrid join (Intune Connector for Active Directory)",
   "kind": "B",
   "minutes": 120,
   "domain": 1,
   "questions": [
    "Q259",
    "Q150",
    "Q171"
   ],
   "predict": "Q259",
   "refs": [
    "https://learn.microsoft.com/en-us/autopilot/windows-autopilot-hybrid",
    "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/hybrid-azure-ad-join-intune-connector"
   ],
   "overview": "Testa o Autopilot que coloca o computador **no domínio lab.local** além do Entra.\n\n- Exige o **Intune Connector for Active Directory** num servidor do domínio (Q150, Q171, Q259).\n- O conector cria o objeto de computador numa **OU** onde tem permissão delegada (Q259).\n- Exige um perfil **Domain Join** e um deployment profile com *Microsoft Entra hybrid joined*.\n\n! A Microsoft recomenda Entra join para implantações novas. O hybrid join pelo Autopilot continua cobrado na prova, mas é o cenário legado.",
   "prereqs": "- Hybrid join configurado (L04: Entra Connect + SCP).\n- Servidor membro do domínio para o conector (ex.: LLK85SH20053), Windows Server 2016 ou superior.\n- OU **MD102-Autopilot** em lab.local, dentro do escopo do Entra Connect.\n- VM W11-LAB03 registrada no Autopilot (L09) com rede na VLAN 134 (precisa enxergar o DC no OOBE).",
   "steps": "### 1. Instale o conector\n@ Intune: Devices > Windows > Enrollment > Intune Connector for Active Directory > Add\n\n- Baixe o instalador, rode no servidor e entre com um Intune Administrator.\n\n! A versão atual do conector (lançada em 2025) roda com uma **Managed Service Account** criada na instalação, e é essa conta que recebe a delegação na OU. Na versão antiga, a das questões, a permissão ia para a **conta de computador** do servidor do conector (Q150). Siga a documentação da versão que você instalar.\n\n### 2. Delegue a OU\nNo DC: Active Directory Users and Computers > OU MD102-Autopilot > **Delegate Control** > a conta do conector > **Create a custom task** > Computer objects > **Create selected objects in this folder** e **Delete selected objects in this folder** > Full Control.\n\n### 3. Perfil Domain Join\n@ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > Domain Join\n\n- Computer name prefix: `MD102H` · Domain name: `lab.local` · Organizational unit: `OU=MD102-Autopilot,DC=lab,DC=local`\n- Assignments: MD102-L09-Autopilot\n\n### 4. Deployment profile híbrido\nCrie **MD102-L11-Hybrid**: User-Driven · Join to Microsoft Entra ID as **Microsoft Entra hybrid joined** · Skip AD connectivity check: **No** (a VM está na rede do DC). Atribua ao grupo do Autopilot e tire o perfil do L09 desse grupo.",
   "test": "1. Espere o Profile status mostrar o perfil híbrido.\n2. Restaure a VM no checkpoint 00-OOBE-hash e ligue.\n3. No OOBE, entre com user01. O computador reinicia uma vez durante a ESP (é o join ao domínio).\n4. Na tela de login, entre com um usuário **do domínio** (LAB\\...).",
   "evidence": "- No DC: o objeto **MD102H...** criado na OU MD102-Autopilot.\n- No servidor do conector: Event Viewer > Applications and Services Logs > Microsoft > Intune > **ODJConnectorService** (pedidos de Offline Domain Join).\n- `dsregcmd /status`: **DomainJoined : YES** e, depois da sincronização do Entra Connect, **AzureAdJoined : YES**.",
   "expected": "O computador é criado na OU delegada, entra no domínio e vira hybrid joined. Sem o conector ou sem a delegação na OU, a implantação falha no join ao domínio (Q259: instale o conector no Server1 e delegue em OU1).",
   "variations": "- **Q171:** \"entrar no domínio de qualquer lugar\" exige VPN no OOBE ou **Skip AD connectivity check = Yes** com um cliente de VPN que conecte antes do logon. Sem isso, o primeiro logon do domínio falha fora da rede.\n- Mude o prefixo e a OU do perfil Domain Join e veja onde o objeto é criado.",
   "breakit": "Remova a delegação da OU e repita a implantação. O ODJConnectorService registra erro de acesso negado e a ESP falha.",
   "cleanup": "- Apague o computador da OU e do Intune/Entra/Autopilot.\n- Desinstale o conector se não for manter; apague o perfil Domain Join e o MD102-L11-Hybrid."
  },
  {
   "id": "L12",
   "title": "Ações remotas: Retire, Wipe, Delete e Fresh Start",
   "kind": "A",
   "minutes": 60,
   "domain": 2,
   "questions": [
    "Q015",
    "Q243",
    "Q254",
    "Q114"
   ],
   "predict": "Q015",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/remote-actions/devices-wipe",
    "https://learn.microsoft.com/en-us/intune/intune-service/remote-actions/device-fresh-start"
   ],
   "overview": "Compara as ações remotas de fim de ciclo do dispositivo, lado a lado, no mesmo cenário.\n\n- **Delete** remove o dispositivo do Intune **na hora**; se ele voltar a fazer check-in, os dados e apps da empresa são removidos (Q015).\n- **Retire** num dispositivo **desligado** fica pendente até o próximo check-in.\n- **Wipe** com \"Retain enrollment state and user account\" só existe no Windows (Q243).\n- O relatório **Device actions** mostra quem fez o quê (Q254).",
   "prereqs": "- Três VMs inscritas (W11-LAB01, 02 e 03), com um checkpoint **\"12-Antes\"** em cada uma.\n- Em cada VM: um perfil de configuração aplicado (ex.: o do L07), um app do Intune (L24, se já tiver) e um arquivo pessoal em Documents.",
   "steps": "1. **Delete com dispositivo desligado:** desligue a W11-LAB01. @ Intune: Devices > All devices > W11-LAB01 > **Delete**.\n2. **Retire com dispositivo desligado:** desligue a W11-LAB02. Mesmo caminho > **Retire**.\n3. **Wipe:** com a W11-LAB03 ligada > **Wipe** e marque **Retain enrollment state and user account**.\n4. Ligue a W11-LAB01 e a W11-LAB02 e espere alguns minutos.",
   "test": "Preencha a tabela abaixo enquanto observa:\n\n| | Some do Intune quando? | Perfil MDM removido? | App do Intune | Arquivo pessoal | Ainda Entra joined? |\n|---|---|---|---|---|---|\n| Delete (offline) | | | | | |\n| Retire (offline) | | | | | |\n| Wipe (retain) | | | | | |\n| Fresh Start (variação) | | | | | |",
   "evidence": "- @ Intune: Devices > Monitor > **Device actions** (ação, quem disparou, status: Pending/Complete).\n- Settings > Accounts > Access work or school (a conta continua? o botão Info continua?).\n- `dsregcmd /status`.",
   "expected": "- **Delete:** o registro some do Intune na hora; quando a VM liga e tenta check-in, a gestão da empresa é removida.\n- **Retire:** fica **Pending** em Device actions enquanto a VM está desligada; conclui no check-in. Os dados pessoais ficam.\n- **Wipe com retain:** o Windows é reinstalado/limpo e volta já inscrito e com a conta do usuário.\n- Q015: para tirar **imediatamente** do Intune um dispositivo offline há 30 dias, garantindo a limpeza se ele voltar, a resposta é **Delete**.",
   "variations": "- **Fresh Start** (W11-LAB03 restaurada): marque *Retain user data*. Ele remove os apps (inclusive os do fabricante) e mantém os arquivos do usuário.\n- **Q114:** compare com o **Autopilot Reset** (L10), a ação certa para reaproveitar PCs para outro usuário com pouco esforço.\n- **Q243:** veja no menu de ações de um iPhone em User Enrollment que não existe Wipe, só Retire.",
   "breakit": "Dispare um Wipe **sem** marcar retain numa VM sem Windows RE (`reagentc /disable`). A ação fica pendente/falha porque o reset depende do WinRE.",
   "cleanup": "Restaure os checkpoints \"12-Antes\" e apague os registros que sobraram no Intune e no Entra."
  },
  {
   "id": "L13",
   "title": "Perfis de configuração: Settings catalog, templates, OMA-URI, conflitos e GPO",
   "kind": "A",
   "minutes": 60,
   "domain": 2,
   "questions": [
    "Q192",
    "Q146",
    "Q024",
    "Q128",
    "Q215",
    "Q197",
    "Q092",
    "Q194",
    "Q196",
    "Q022",
    "Q242",
    "Q145",
    "Q151"
   ],
   "predict": "Q192",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/configuration/custom-settings-windows-10",
    "https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-controlpolicyconflict",
    "https://learn.microsoft.com/en-us/intune/intune-service/configuration/group-policy-analytics"
   ],
   "overview": "Testa onde cada configuração mora e o que acontece quando duas fontes dizem coisas diferentes.\n\n- Templates clássicos: **Device restrictions** (senha, Start, personalização) e **Endpoint protection** (renomear o Administrator local) (Q192, Q024, Q128).\n- **Custom (OMA-URI)** para o que não tem template (Q146), incluindo o **MDMWinsOverGP** (Q092, Q194).\n- **Conflito**: dois perfis com valores diferentes para a mesma configuração → nenhum é aplicado (Q196).\n- **Group Policy analytics** para levar GPO para o Intune (Q197).\n- Link de redefinição de senha na tela de logon (Q215).",
   "prereqs": "- W11-LAB01 inscrita (só nuvem).\n- LLK85SH20062 hybrid joined e inscrita (L04), para o teste de GPO × MDM.",
   "steps": "### 1. Renomear o Administrator local (Q192)\n@ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > Endpoint protection\n\n- Local device security options > Accounts > **Rename administrator account**: `LabAdmin` · Atribua à W11-LAB01.\n\n### 2. Device restrictions (Q024, Q128)\nTemplates > **Device restrictions**:\n- Password: Password = Require · Minimum password length = 10\n- Personalization: Desktop background picture URL = uma URL de imagem .jpg (só Enterprise/Education)\n- Locked Screen Experience: Locked screen picture URL\n\n### 3. OMA-URI: MDM vence a GPO (Q092, Q194)\nTemplates > **Custom** > Add:\n```text\nName:      MDMWinsOverGP\nOMA-URI:   ./Device/Vendor/MSFT/Policy/Config/ControlPolicyConflict/MDMWinsOverGP\nData type: Integer\nValue:     1\n```\nPara o teste, crie também uma **GPO** para o LLK85SH20062 com **Allow Use of Camera** = Disabled:\n\n@ GPO: Computer Configuration > Policies > Administrative Templates > Windows Components > Camera > Allow Use of Camera\n\nE um perfil do **Settings catalog** com Camera > **Allow Camera** = Allowed.\n\n### 4. Conflito (Q196)\nCrie dois perfis do Settings catalog para a W11-LAB01 com a mesma configuração e valores diferentes (ex.: Experience > Allow Cortana = Allow num, Block no outro).\n\n### 5. SSPR na tela de logon (Q215)\nSettings catalog > Authentication > **Allow Aad Password Reset** = Allow.\n\n### 6. Group Policy analytics (Q197)\nNo DC:\n```powershell\nGet-GPOReport -Name \"Default Domain Policy\" -ReportType Xml -Path C:\\Temp\\DDP.xml\n```\n@ Intune: Devices > Manage devices > Group Policy analytics > Import → selecione o XML.",
   "test": "1. W11-LAB01: `Get-LocalUser` deve mostrar **LabAdmin** no lugar de Administrator.\n2. LLK85SH20062 **sem** o perfil MDMWinsOverGP: Settings > Privacy & security > Camera mostra o acesso bloqueado (GPO venceu). Atribua o MDMWinsOverGP, sincronize e confira de novo.\n3. Abra o perfil de conflito no portal e veja o status por configuração.\n4. Bloqueie a tela da W11-LAB01: aparece o link **Reset password**.",
   "evidence": "- Por perfil: Device and user check-in status > **Per setting status**.\n- Settings > Accounts > Access work or school > Info > **Create report** (MDMDiagReport.html, seção de políticas).\n- Registro: `HKLM\\SOFTWARE\\Microsoft\\PolicyManager\\current\\device\\`.\n- GPO: `gpresult /h C:\\Temp\\gp.html`.",
   "expected": "- Administrator renomeado para LabAdmin pelo perfil **Endpoint protection** (não Identity protection).\n- Com GPO e MDM brigando, a GPO vence até o MDMWinsOverGP ser aplicado; depois, vale o MDM.\n- No conflito, o status é **Conflict** e nenhum dos dois valores é aplicado.\n- O Group Policy analytics mostra a porcentagem de configurações com suporte no MDM e permite migrar para o Settings catalog.",
   "variations": "- **Q022:** tente separar duas VMs iguais usando **Applicability rules** (edição do SO): não separa; é preciso mexer nas Assignments.\n- **Q197:** procure no Settings catalog as configurações do Office (Microsoft Office 2016 (Machine)/(User)) que a GPO usava.\n- **Q242:** no template Device restrictions, veja as seções **Microsoft Defender SmartScreen** (bloquear sites suspeitos) e **Microsoft Defender Antivirus** (scan de scripts carregados no navegador).\n- **Q145 e Q151 (VPN):** na W11-LAB01, crie à mão uma VPN chamada **VPN1** (Settings > Network & internet > VPN). Depois crie o perfil @ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > VPN com Connection name **VPN1** e outro com **VPN2**. A VPN do Intune com o mesmo nome **substitui** a manual; a VPN2 é somada. O template VPN existe também para Android Enterprise, iOS/iPadOS e macOS.",
   "breakit": "Coloque o valor do OMA-URI como **String** em vez de Integer. O perfil fica com erro (Remediation failed / tipo inválido) no relatório por configuração.",
   "cleanup": "Apague os perfis MD102-L13-* e a GPO de teste; restaure a W11-LAB01 (para desfazer o rename)."
  },
  {
   "id": "L14",
   "title": "Windows Update for Business: rings, pausa, desinstalação e feature updates",
   "kind": "A",
   "minutes": 60,
   "domain": 2,
   "questions": [
    "Q137",
    "Q017",
    "Q091",
    "Q139",
    "Q183",
    "Q255",
    "Q264",
    "Q205",
    "Q088",
    "Q086",
    "Q033",
    "Q050",
    "Q054",
    "Q159",
    "Q075",
    "Q252",
    "Q187"
   ],
   "predict": "Q137",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-10-update-rings",
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-10-feature-updates",
    "https://learn.microsoft.com/en-us/windows/deployment/update/waas-wu-settings"
   ],
   "overview": "Testa o controle de atualizações do Windows pelo Intune.\n\n- **Update rings**: adiamento, deadline e grace period, active hours (Q017, Q139, Q183, Q255).\n- **Pausa** dura 35 dias (Q137). **Uninstall** é aplicado assim que o dispositivo recebe a política (Q091).\n- **Feature updates policy** para levar a uma versão específica, inclusive Windows 10 → 11 (Q264, Q050).\n- Reversão de feature update: 10 dias por padrão (Q088).\n- Bloquear o Windows Insider (Q086).",
   "prereqs": "- W11-LAB01 inscrita. Opcional: uma VM **Windows 10** 64 bits inscrita para o feature update.\n- Para feature updates: @ Intune: Tenant administration > Connectors and tokens > **Windows data** → *Enable features that require Windows diagnostic data in processor configuration* = On, e marque a atestação de licença.",
   "steps": "### 1. Update ring\n@ Intune: Devices > Windows > Manage updates > Windows updates > Update rings > Create profile\n\n- Nome: MD102-L14-Ring\n- Quality update deferral: **0** · Feature update deferral: **30**\n- Feature update uninstall period: **10**\n- Automatic update behavior: Auto install at maintenance time · Active hours: **8 → 17**\n- Deadline for quality updates: 2 · Deadline for feature updates: 7 · Grace period: **1**\n- Atribua à W11-LAB01.\n\n### 2. Pausa\nAbra o ring > **Pause** > Quality updates. Anote a data de expiração exibida.\n\n### 3. Feature update (Q264)\n@ Intune: Devices > Windows > Manage updates > Windows updates > Feature updates > Create profile\n\n- Versão: a mais recente do Windows 11 disponível · Rollout: Make update available as soon as possible\n- Atribua à VM Windows 10 (ou a um grupo que exclua a W11-LAB01, para repetir a lógica de exclusão da Q264).\n\n### 4. Bloquear Insider (Q086)\nSettings catalog > System > **Allow Build Preview** = Not allowed.",
   "test": "1. Na W11-LAB01, abra Settings > Windows Update > Advanced options > **Configured update policies** e confira os valores do ring.\n2. Confira no portal a data de expiração da pausa: 35 dias depois de hoje.\n3. Na VM Windows 10, acompanhe o feature update em Settings > Windows Update.\n4. Depois do upgrade, rode:\n```powershell\nDISM /Online /Get-OSUninstallWindow\n```",
   "evidence": "- Ring > **Device status** e **Per setting status**.\n- @ Intune: Reports > Windows updates > **Windows Feature Update Report**.\n- Registro: `HKLM\\SOFTWARE\\Microsoft\\PolicyManager\\current\\device\\Update` (DeferQualityUpdatesPeriodInDays, PauseQualityUpdatesStartTime, ActiveHoursStart/End).",
   "expected": "- Pausa iniciada hoje expira em **hoje + 35 dias** (Q137: 1º/11 → 6/12).\n- Quality deferral 0 + deadline: instala logo; feature com deferral 30 + deadline 30 → até 60 dias do lançamento (Q017).\n- O Windows 10 vai para a versão do Windows 11 escolhida, se o hardware atender (TPM 2.0, 64 bits). Windows 10 de 32 bits não vai (Q050, Q159).\n- `Get-OSUninstallWindow` mostra **10** dias (Q088).",
   "variations": "- **Q091:** use **Uninstall** de quality update no ring: o dispositivo remove a atualização assim que recebe a política, sem esperar a janela de manutenção.\n- **Q054:** o in-place upgrade usa a mídia original da Microsoft; imagem customizada é para wipe-and-load (você já fez isso no MECM).\n- **Q205:** o status do ring por dispositivo é o \"Per update ring deployment state\" das questões antigas.\n- **Q075 e Q252:** antes do feature update, veja @ Intune: Reports > Windows updates > Reports > **Windows feature update device readiness report**: ele aponta quem não atende os requisitos do Windows 11 (TPM 2.0, 4 GB de RAM, 64 GB, CPU suportada).\n- **Q187 (borderline):** para rodar um script depois de um feature update, use o `SetupConfig.ini` em `%SystemDrive%\\Users\\Default\\AppData\\Local\\Microsoft\\Windows\\WSUS` com `PostOOBE=`.",
   "breakit": "Crie dois rings para a mesma VM com adiamentos diferentes. O dispositivo mostra conflito nas configurações em disputa.",
   "cleanup": "Resume (despause), apague MD102-L14-* e restaure as VMs se o feature update não for desejado."
  },
  {
   "id": "L15",
   "title": "Delivery Optimization",
   "kind": "A",
   "minutes": 45,
   "domain": 2,
   "questions": [
    "Q214",
    "Q029",
    "Q034",
    "Q134",
    "Q033"
   ],
   "predict": "Q214",
   "refs": [
    "https://learn.microsoft.com/en-us/windows/deployment/do/waas-delivery-optimization-reference",
    "https://learn.microsoft.com/en-us/intune/intune-service/configuration/delivery-optimization-windows"
   ],
   "overview": "Testa de onde o Windows baixa o conteúdo: só internet, LAN, grupo ou peers.\n\n- Delivery Optimization é configurado num **perfil de configuração**, não no update ring (Q029, Q034, Q134).\n- **Download mode** Group (2) agrupa por AD site/ID de grupo; **Restrict peer selection = Subnet mask** limita à mesma sub-rede (Q214).\n- Sem servidores, a combinação é WUfB + Intune + Delivery Optimization (Q033).",
   "prereqs": "- Duas VMs inscritas na mesma sub-rede (VLAN 134). Se puder, uma terceira em outra sub-rede.\n- Um conteúdo grande distribuído pelo Intune (ex.: o Microsoft 365 Apps do L25 ou um Win32 grande do L24).",
   "steps": "@ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > Delivery Optimization\n\n- Nome: MD102-L15-DO\n- Download mode: **HTTP blended with peering across private group (2)**\n- Group ID source: **Subnet** (as VMs só nuvem não têm AD site)\n- Restrict peer selection: **Subnet mask**\n- Minimum content file size for peer caching (MB): **1** (para o teste pegar arquivos menores)\n- Atribua às VMs.",
   "test": "1. Instale o conteúdo grande na primeira VM e espere terminar.\n2. Instale na segunda VM.\n3. Na segunda VM:\n```powershell\nGet-DeliveryOptimizationStatus | Select FileId, BytesFromPeers, BytesFromHttp, Status\nGet-DeliveryOptimizationPerfSnap\n```",
   "evidence": "- Settings > Windows Update > Advanced options > Delivery Optimization > **Activity monitor** (\"From PCs on your local network\").\n- As saídas de `Get-DeliveryOptimizationStatus` e `Get-DeliveryOptimizationPerfSnap`.",
   "expected": "A segunda VM puxa parte do conteúdo da primeira (BytesFromPeers > 0). A VM em outra sub-rede não usa peers, por causa do Restrict peer selection (Q214).",
   "variations": "- Mude o Download mode para **HTTP only (0)**: BytesFromPeers volta a zero.\n- **Q214:** com o Group ID source por **AD site** (nas máquinas do domínio), máquinas do mesmo site e de sub-redes diferentes só trocam conteúdo se a restrição por sub-rede estiver desligada.",
   "breakit": "Deixe o Minimum content file size no padrão e use um conteúdo pequeno: não há peering, e parece que o DO \"não funciona\".",
   "cleanup": "Apague o perfil MD102-L15-DO."
  },
  {
   "id": "L16",
   "title": "Políticas de conformidade: carência, ações e conformidade personalizada",
   "kind": "A",
   "minutes": 60,
   "domain": 1,
   "questions": [
    "Q105",
    "Q003",
    "Q036",
    "Q037",
    "Q106",
    "Q111",
    "Q178",
    "Q224",
    "Q241",
    "Q240",
    "Q039",
    "Q038",
    "Q236",
    "Q108",
    "Q262",
    "Q063",
    "Q066",
    "Q103"
   ],
   "predict": "Q105",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-windows",
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/actions-for-noncompliance",
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-use-custom-settings"
   ],
   "overview": "Testa como o Intune decide se um dispositivo é **Compliant**, **Not compliant** ou **In grace period**.\n\n- Onde mora cada exigência: BitLocker e Secure Boot em **Device Health**, versão do SO em **Device Properties** (Q036, Q236).\n- **Mark devices with no compliance policy assigned as**: configuração do tenant que decide o destino de quem não recebe política (Q003, Q224, Q241).\n- **Carência** nas ações de não conformidade (Q105, Q106, Q111) e ação de **retire** (Q241).\n- **Notificações** por e-mail (Q108, Q262) e **conformidade personalizada** por script + JSON (Q039).\n- Frequência do check-in após a inscrição (Q240).",
   "prereqs": "- W11-LAB01 e W11-LAB02 inscritas, **sem BitLocker** e com o firewall ligado.\n- Grupos de dispositivos **MD102-L16-A** (W11-LAB01) e **MD102-L16-B** (W11-LAB02).",
   "steps": "### 1. Configuração do tenant\n@ Intune: Devices > Manage devices > Compliance > Compliance settings\n\n- Anote o valor de **Mark devices with no compliance policy assigned as** e do **Compliance status validity period**.\n\n### 2. Política com carência\n@ Intune: Devices > Manage devices > Compliance > Create policy > Windows 10 and later\n\n- Nome: MD102-L16-Cripto\n- System Security > **Encryption of data storage on device**: Require\n- System Security > **Firewall**: Require\n- Device Properties > Minimum OS version: `10.0.22631`\n- Actions for noncompliance:\n  - Mark device noncompliant: **2 dias**\n  - Send email to end user: imediatamente (crie o template no passo 3)\n  - Add device to retire list: 5 dias\n- Assignments: MD102-L16-A e MD102-L16-B\n\n? Use **Encryption of data storage** em vez de **Require BitLocker** (Device Health) neste primeiro teste. As regras de Device Health dependem do Device Health Attestation, que no Hyper-V só reporta depois de um reinício e pode demorar.\n\n### 3. Template de notificação\n@ Intune: Devices > Manage devices > Compliance > Notifications > Create notification\n\n- Nome: MD102-L16-Aviso · Locale pt-br · Subject e texto à sua escolha. Volte à política e selecione o template na ação de e-mail.\n- Em **Additional recipients (via email)**, tente escolher um usuário avulso e depois um grupo de distribuição (Q108).\n\n### 4. Conformidade personalizada (Q039)\nScript de descoberta (veja primeiro o valor real do BIOS da VM com `(Get-CimInstance Win32_BIOS).SMBIOSBIOSVersion`):\n```powershell\n$bios = (Get-CimInstance Win32_BIOS).SMBIOSBIOSVersion\n$hash = @{ BiosVersion = $bios }\nreturn $hash | ConvertTo-Json -Compress\n```\n@ Intune: Devices > Manage devices > Compliance > Scripts > Add > Windows 10 and later — cole o script (Run as 64-bit: Yes).\n\nArquivo JSON de regras (`MD102-L16-bios.json`):\n```json\n{\n  \"Rules\": [\n    {\n      \"SettingName\": \"BiosVersion\",\n      \"Operator\": \"IsEquals\",\n      \"DataType\": \"String\",\n      \"Operand\": \"COLE_AQUI_O_VALOR_REAL\",\n      \"MoreInfoUrl\": \"https://learn.microsoft.com\",\n      \"RemediationStrings\": [\n        { \"Language\": \"en_US\", \"Title\": \"BIOS fora do padrão\", \"Description\": \"Atualize o firmware.\" }\n      ]\n    }\n  ]\n}\n```\nCrie uma segunda política, **MD102-L16-Custom**: Custom Compliance = Require > selecione o script > envie o JSON.",
   "test": "1. Sincronize as duas VMs e veja o status logo depois: devem estar **In grace period** (sem criptografia, dentro dos 2 dias).\n2. Desligue o firewall da W11-LAB02 (`Set-NetFirewallProfile -All -Enabled False`) e sincronize.\n3. Mude **Mark devices with no compliance policy assigned as** para **Not compliant**, crie uma VM inscrita sem nenhuma política e veja o status dela.\n4. No Company Portal da VM, use **Check access** / **Check status** para ver o motivo pelo lado do usuário.\n5. Para o JSON, troque o Operand por um valor errado e veja a VM ficar não conforme com a mensagem do RemediationStrings.",
   "evidence": "- @ Intune: Devices > All devices > (dispositivo) > **Device compliance** > (política) — status por configuração.\n- @ Intune: Reports > Device compliance (e o relatório de tendências, que mostra 60 dias).\n- @ Intune: Devices > Manage devices > Compliance > **Retire Noncompliant Devices** (a lista da ação de retire).",
   "expected": "- Dentro da carência: **In grace period**. Depois dos 2 dias: **Not compliant** (Q105, Q106, Q111).\n- A ação de retire **não** apaga nada sozinha: coloca o dispositivo numa lista que o administrador confirma (Q241).\n- Com \"no compliance policy\" = Not compliant, a VM sem política fica **Not compliant** (Q224).\n- Destinatários adicionais são **grupos**; usuários avulsos não aparecem (Q108).\n- Logo depois da inscrição, o Windows faz check-in a cada 3 minutos por 15 minutos, depois a cada 15 minutos por 2 horas, depois a cada ~8 horas (Q240).",
   "variations": "- **Q037:** inclua um grupo e exclua outro que contém a mesma VM: a política nem é atribuída a ela.\n- **Q038:** no Android/iOS, o equivalente de \"firmware confiável\" é bloquear root/jailbreak; no Windows, Secure Boot.\n- **Q262:** a ordem é criar o **template** e depois usá-lo na ação da política (ou criar a política e voltar para ligar o template).\n- **Q063 e Q066:** política de conformidade é **por plataforma**. Atribua a MD102-L16-Cripto a um grupo que também tenha um celular inscrito (L31): o celular não recebe a política de Windows.\n- **Q103:** em Compliance settings, veja a opção **Enhanced jailbreak detection** (iOS): ela é do tenant, não da política.",
   "breakit": "Atribua a política a um grupo de **usuários** em vez de dispositivos e entre na VM com um usuário fora do grupo. A política não chega a esse usuário: o status mostra a avaliação por usuário.",
   "cleanup": "Volte o \"no compliance policy\" para o valor anotado; apague MD102-L16-* (políticas, script, template); religue o firewall."
  },
  {
   "id": "L17",
   "title": "Conditional Access com dispositivo em conformidade",
   "kind": "A",
   "minutes": 45,
   "domain": 3,
   "questions": [
    "Q179",
    "Q176",
    "Q012",
    "Q140",
    "Q219"
   ],
   "predict": "Q179",
   "refs": [
    "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance",
    "https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-insights-reporting"
   ],
   "overview": "Liga a conformidade do Intune ao **Conditional Access**: dispositivo não conforme não acessa o SharePoint.\n\n- Grant control **Require device to be marked as compliant** (Q179).\n- Dispositivo **sem política** de conformidade herda o \"Mark devices with no compliance policy assigned as\" (Q179).\n- Bloqueio de **autenticação legada** pela condição Client apps (Q012).\n- Onde ver as tentativas bloqueadas: **Conditional Access Insights and Reporting** (Q140).",
   "prereqs": "- Política de conformidade do L16 nas duas VMs.\n- Grupo de usuários **MD102-L17-CA** (user01).\n- Uma conta de emergência (break-glass) para excluir de toda política de teste.",
   "steps": "### 1. Política de acesso\n@ Entra: Entra ID > Conditional Access > Policies > New policy\n\n- Nome: MD102-L17-Compliant\n- Users > Include: MD102-L17-CA · Exclude: a conta break-glass\n- Target resources > Resources: **Office 365** (ou só **Office 365 SharePoint Online**)\n- Grant > **Require device to be marked as compliant**\n- Enable policy: **Report-only** primeiro\n\n### 2. Veja o efeito em modo relatório\nEntre como user01 no SharePoint pelas duas VMs. Depois: @ Entra: Entra ID > Monitoring & health > Sign-in logs > (login) > aba **Report-only**.\n\n### 3. Ligue a política\nMude Enable policy para **On**.",
   "test": "1. W11-LAB01 **compliant**: abra o SharePoint no Edge (logado no Windows com user01). Deve entrar.\n2. W11-LAB02 **não compliant** (firewall desligado, fora da carência): deve aparecer a tela de bloqueio com o link para verificar o status no Company Portal.\n3. Use o **What If** para simular sem logar: @ Entra: Entra ID > Conditional Access > Policies > What If.\n4. Abra o SharePoint num navegador sem identidade do dispositivo (Firefox sem SSO do Windows ou numa máquina fora do Intune): é bloqueado porque o dispositivo não é identificado.",
   "evidence": "- Sign-in logs > aba **Conditional Access** (Success/Failure por política).\n- @ Entra: Entra ID > Conditional Access > **Insights and reporting** (precisa de um workspace do Log Analytics recebendo os sign-in logs — veja o L29).",
   "expected": "| VM | Conformidade | Acesso ao SharePoint |\n|---|---|---|\n| W11-LAB01 | Compliant | Permitido |\n| W11-LAB02 | Not compliant | Bloqueado |\n| VM sem política, tenant em \"Compliant\" | Compliant | Permitido (Q179) |",
   "variations": "- **Q012:** crie uma segunda política: Conditions > **Client apps** > marque só *Exchange ActiveSync clients* e *Other clients* > Grant: Block. A autenticação moderna continua passando.\n- **Q176:** restringir por localização é **Conditional Access** com Named locations (@ Entra: Entra ID > Conditional Access > Named locations); reagir ao risco do Defender é a política de **conformidade**.\n- **Q219:** para celulares sem inscrição, o grant é **Require app protection policy** (veja o L26).",
   "breakit": "Esqueça de excluir a break-glass e coloque o escopo em **All users** com um dispositivo não conforme seu. É assim que admins se trancam fora do tenant; por isso o modo Report-only vem primeiro.",
   "cleanup": "Desligue e apague MD102-L17-*."
  },
  {
   "id": "L18",
   "title": "BitLocker e chaves de recuperação",
   "kind": "A",
   "minutes": 45,
   "domain": 3,
   "questions": [
    "Q209",
    "Q131",
    "Q133"
   ],
   "predict": "Q209",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/encrypt-devices",
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/encryption-monitor"
   ],
   "overview": "Liga o BitLocker silenciosamente pelo Intune e testa onde a chave fica e quem pode rotacioná-la.\n\n- Política em **Endpoint security > Disk encryption** (BitLocker no Windows, FileVault no macOS) (Q209, Q133).\n- A chave vai para o Entra ID e aparece no Intune.\n- **Help Desk Operator** pode rotacionar a chave (Q209, ligado ao L08).",
   "prereqs": "- W11-LAB01 inscrita, **Gen2 com TPM virtual ligado**.\n- adm-helpdesk com Help Desk Operator (L08).",
   "steps": "@ Intune: Endpoint security > Disk encryption > Create Policy > Platform: Windows > Profile: BitLocker\n\n- Nome: MD102-L18-BitLocker\n- Require Device Encryption: **Enabled**\n- Allow Warning For Other Disk Encryption: **Disabled** (necessário para criptografia silenciosa)\n- Allow Standard User Encryption: **Enabled**\n- Configure Recovery Password Rotation: **Refresh on for Azure AD-joined devices**\n- Operating System Drives > Enforce drive encryption type: **Used Space only encryption**\n- Operating System Drives > Choose how BitLocker-protected operating system drives can be recovered: **Enabled** · Save BitLocker recovery information to AD DS: True · Do not enable BitLocker until recovery information is stored to AD DS: True\n- Atribua à W11-LAB01.\n\n? Nas VMs só nuvem, \"AD DS\" nessas configurações significa o Entra ID.",
   "test": "1. Sincronize e espere alguns minutos.\n2. Na VM:\n```powershell\nmanage-bde -status C:\nGet-BitLockerVolume C: | Select MountPoint, VolumeStatus, EncryptionPercentage, KeyProtector\nmanage-bde -protectors -get C:\n```\n3. Anote o ID do protetor *Numerical Password*.\n4. Como **adm-helpdesk**, dispare @ Intune: Devices > All devices > W11-LAB01 > ... > **BitLocker key rotation**.\n5. Repita o `manage-bde -protectors -get C:`.",
   "evidence": "- @ Intune: Devices > All devices > (dispositivo) > **Recovery keys**.\n- @ Entra: Entra ID > Devices > All devices > (dispositivo) > **BitLocker keys**.\n- Event Viewer > Applications and Services Logs > Microsoft > Windows > **BitLocker-API** > Management (backup da chave no Entra).\n- @ Intune: Reports > **Encryption report**.",
   "expected": "- Disco C: criptografado sem nenhuma pergunta ao usuário.\n- A chave de recuperação aparece no Intune e no Entra.\n- Depois da rotação, o ID do protetor muda e a chave nova aparece no portal.",
   "variations": "- **Q131:** no Endpoint security > Antivirus, o perfil **Windows Security experience** esconde áreas do app Windows Security (ex.: Firewall & network protection).\n- **Q133:** FileVault (macOS) também fica em Disk encryption; Application Control em ASR (hoje App Control for Business); Credential Guard em Account protection.",
   "breakit": "Desligue o TPM virtual da VM (com ela parada) e aplique a política em outra VM sem TPM. A criptografia silenciosa não acontece e o relatório de criptografia mostra o motivo (TPM ausente).",
   "cleanup": "Tire a atribuição e, na VM, `manage-bde -off C:` (ou restaure o checkpoint)."
  },
  {
   "id": "L19",
   "title": "Windows LAPS, grupos locais e suporte remoto",
   "kind": "A",
   "minutes": 50,
   "domain": 3,
   "questions": [
    "Q266",
    "Q199",
    "Q112",
    "Q232",
    "Q053"
   ],
   "predict": "Q266",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-laps-policy",
    "https://learn.microsoft.com/en-us/entra/identity/devices/howto-manage-local-admin-passwords",
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/endpoint-security-account-protection-policy"
   ],
   "overview": "Testa o Windows LAPS com backup no Entra ID e a gestão de grupos locais pelo Intune.\n\n- LAPS fica em **Endpoint security > Account protection** (Q266).\n- O perfil **Local user group membership** adiciona/remove membros de Administrators e Remote Desktop Users (Q112, Q199).\n- RDP para um dispositivo Entra joined e o prefixo `AzureAD\\` (Q232).\n- Remote Help: app no dispositivo + função RBAC + licença (Q053).",
   "prereqs": "- W11-LAB01 inscrita.\n- user02 (para RDP) e user01 (admin local pelo join do L01).",
   "steps": "### 1. Habilite o LAPS no Entra\n@ Entra: Entra ID > Devices > Overview > Device settings\n\n- **Enable Microsoft Entra Local Administrator Password Solution (LAPS)**: Yes\n\n### 2. Política de LAPS\n@ Intune: Endpoint security > Account protection > Create Policy > Windows > Local admin password solution (Windows LAPS)\n\n- Nome: MD102-L19-LAPS\n- Backup Directory: **Backup the password to Azure AD only**\n- Password Age Days: 7\n- Administrator Account Name: deixe vazio para gerenciar o Administrator interno (ou o nome da conta criada pelo LAPS)\n- Password Complexity: Large letters + small letters + numbers + special characters\n- Post-authentication actions: Reset password and logoff · Grace period: 1 hora\n\n? No Windows 11 24H2 ou superior, a política tem as opções de **gerenciamento automático de conta** (o LAPS cria e gerencia uma conta de admin local própria). Útil porque o Administrator interno vem desabilitado.\n\n### 3. Grupos locais\n@ Intune: Endpoint security > Account protection > Create Policy > Windows > Local user group membership\n\n- Regra 1: Local group **Remote Desktop Users** · Group and user action: **Add (Update)** · User selection type: Users · user02\n- Regra 2: Local group **Administrators** · **Remove (Update)** · user01\n\n### 4. Habilite o RDP na VM\n@ Windows: Settings > System > Remote Desktop > On\n\n(Ou por perfil do Settings catalog.)",
   "test": "1. Na VM, force o processamento e leia o estado:\n```powershell\nInvoke-LapsPolicyProcessing\nGet-LapsDiagnostics -OutputFolder C:\\Temp\\LapsDiag\nnet localgroup Administrators\nnet localgroup \"Remote Desktop Users\"\n```\n2. Leia a senha no portal e por PowerShell:\n```powershell\nConnect-MgGraph -Scopes \"Device.Read.All\",\"DeviceLocalCredential.Read.All\"\nGet-LapsAADPassword -DeviceIds \"W11-LAB01\" -IncludePasswords -AsPlainText\n```\n3. Faça RDP como user02. No `mstsc`, aba Advanced, marque **Use a web account to sign in to the remote computer** (ou conecte a partir de um PC Entra joined do mesmo tenant).\n4. Use a ação @ Intune: Devices > All devices > W11-LAB01 > ... > **Rotate local admin password** e leia a senha de novo.",
   "evidence": "- @ Intune: Devices > All devices > (dispositivo) > **Local admin password** (Show / Copy).\n- @ Entra: Entra ID > Devices > Overview > **Local administrator password recovery**.\n- Event Viewer > Applications and Services Logs > Microsoft > Windows > **LAPS** > Operational.",
   "expected": "- A senha do admin local fica no Entra ID, visível para quem tem permissão (Cloud Device Administrator e Intune Administrator; ou função customizada com `deviceLocalCredentials/password/read`).\n- user02 entra por RDP; user01 sai do grupo Administrators.",
   "variations": "- **Q232:** faça manualmente o que o perfil fez: `net localgroup \"Remote Desktop Users\" /add \"AzureAD\\user03@camposlab.online\"`.\n- **Q053 (Remote Help):** @ Intune: Tenant administration > Remote Help > Settings > Enable. Instale o app Remote Help na VM e dê ao adm-helpdesk uma função com permissão de Remote Help. A licença é add-on (ou Intune Suite); a Microsoft anunciou a inclusão de recursos do Intune Suite nos planos Microsoft 365 em 2026, então confira em Tenant administration > **Intune add-ons** se o recurso está ativo no seu tenant antes de testar.",
   "breakit": "Tente ler a senha com um usuário com só **Helpdesk Administrator** do Entra. Sem a permissão de leitura de credencial local, o portal não mostra a senha.",
   "cleanup": "Apague as políticas MD102-L19-*; desligue o RDP; restaure a VM."
  },
  {
   "id": "L20",
   "title": "Windows Hello for Business e passwordless",
   "kind": "A",
   "minutes": 45,
   "domain": 1,
   "questions": [
    "Q061",
    "Q059",
    "Q060",
    "Q107",
    "Q102",
    "Q203"
   ],
   "predict": "Q061",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-hello",
    "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-passwordless-phone"
   ],
   "overview": "Testa onde se define o PIN do Windows Hello for Business e os métodos passwordless do Entra.\n\n- O tamanho do PIN pedido **no join** vem das opções de inscrição do Windows Hello for Business no Intune (Q061).\n- Device settings do Entra, device restrictions e Authentication methods **não** definem o PIN (Q059, Q060, Q107).\n- Passwordless com **number matching** = Microsoft Authenticator (Q102). Sem celular e em Linux: **FIDO2** (Q203).",
   "prereqs": "- W11-LAB02 no checkpoint 01-Limpa (para ver o provisionamento do PIN no join).\n- MDM user scope incluindo user01.\n- Celular com o Microsoft Authenticator (para a parte passwordless).",
   "steps": "### 1. Opções de inscrição do Windows Hello\n@ Intune: Devices > Windows > Enrollment > Windows Hello for Business\n\n- Configure Windows Hello for Business: **Enabled**\n- Minimum PIN length: **6**\n- Use security keys for sign-in: Enabled\n\n### 2. Alternativa por grupo\n@ Intune: Endpoint security > Account protection > Create Policy > Windows > Account protection — as mesmas configurações de PIN, atribuídas a um grupo.\n\n### 3. Passwordless no Entra\n@ Entra: Entra ID > Authentication methods > Policies\n\n- **Microsoft Authenticator**: Enable, Target: grupo com user01, Authentication mode: **Any**\n- **Passkey (FIDO2)**: Enable para o mesmo grupo",
   "test": "1. Faça o Entra join da W11-LAB02 com user01. No fim, o Windows pede para criar o PIN: tente 4 dígitos.\n2. Confira com `dsregcmd /status` o campo **NgcSet : YES**.\n3. Em https://aka.ms/mysecurityinfo, adicione o Microsoft Authenticator e habilite o **phone sign-in** no app.\n4. Entre no portal pelo telefone (sem senha) e veja o **number matching**.",
   "evidence": "- Event Viewer > Applications and Services Logs > Microsoft > Windows > **HelloForBusiness** > Operational.\n- Sign-in logs do Entra: método de autenticação usado.",
   "expected": "- O PIN de 4 dígitos é recusado: mínimo 6.\n- O Entra Device settings não tem nenhum campo de PIN (Q059).\n- O login sem senha pelo Authenticator mostra um número para digitar no celular (Q102).",
   "variations": "- **Q060:** crie um perfil de Device restrictions e procure qualquer configuração de PIN do Windows Hello: não existe.\n- **Q203:** para quem não pode usar celular e entra em Linux não gerenciado, a opção passwordless é a chave **FIDO2**. Se tiver uma chave (YubiKey ou similar), registre em mysecurityinfo.",
   "breakit": "Aplique o PIN mínimo de 6 dígitos **depois** do join de um usuário que já tem PIN de 4. Observe se o Windows exige a troca no próximo logon ou só quando o usuário for trocar o PIN. Isso mostra por que a configuração de inscrição precisa existir **antes** do provisionamento.",
   "cleanup": "Volte as opções de inscrição do Windows Hello aos valores anteriores; restaure a VM."
  },
  {
   "id": "L21",
   "title": "Defender for Endpoint: conexão, onboarding, tamper protection e antivírus",
   "kind": "B",
   "minutes": 90,
   "domain": 3,
   "questions": [
    "Q026",
    "Q023",
    "Q097",
    "Q184",
    "Q185",
    "Q257",
    "Q267",
    "Q021",
    "Q096",
    "Q189",
    "Q218",
    "Q211",
    "Q020"
   ],
   "predict": "Q026",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/advanced-threat-protection-configure",
    "https://learn.microsoft.com/en-us/defender-endpoint/prevent-changes-to-security-settings-with-tamper-protection",
    "https://learn.microsoft.com/en-us/defender-endpoint/machine-groups"
   ],
   "overview": "Integra o Intune ao Defender for Endpoint e testa o que cada lado faz.\n\n- **Conexão** de serviço Intune ↔ Defender em Connectors and tokens (Q097, Q023).\n- **Onboarding** em massa por política de **EDR** (Q026).\n- **Tamper protection** pelo portal do Defender ou por política de Antivirus (Q185, Q257, Q267).\n- **Device groups** do Defender: o dispositivo entra só no primeiro grupo pelo rank (Q189).\n- Inventário e pacote de onboarding no portal do Defender (Q184); Secure Score (Q096).",
   "prereqs": "- W11-LAB01 inscrita (Windows 11 Enterprise ou Pro com E5).\n- Acesso ao portal do Defender como Security Administrator ou Global Administrator.",
   "steps": "### 1. Ligue a conexão no Defender\n@ Defender: Settings > Endpoints > Advanced features\n\n- **Microsoft Intune connection**: On\n- **Tamper protection**: On (vale para o tenant todo, Q185)\n- Save preferences\n\n### 2. Ligue a conexão no Intune\n@ Intune: Tenant administration > Connectors and tokens > Microsoft Defender for Endpoint\n\n- **Connect Windows devices version 10.0.15063 and above to Microsoft Defender for Endpoint**: On\n\n### 3. Onboarding por EDR\n@ Intune: Endpoint security > Endpoint detection and response > Create Policy > Windows > Endpoint detection and response\n\n- Microsoft Defender for Endpoint client configuration package type: **Auto from connector**\n- Sample sharing: All · Atribua à W11-LAB01.\n\n### 4. Antivírus e Windows Security experience\n@ Intune: Endpoint security > Antivirus > Create Policy > Windows > Windows Security Experience\n\n- **TamperProtection (Device)**: On (Q267)\n- Hide the Firewall & network protection area: Yes (Q131)",
   "test": "1. Sincronize. Na VM:\n```powershell\nGet-Service Sense\nGet-ItemProperty \"HKLM:\\SOFTWARE\\Microsoft\\Windows Advanced Threat Protection\\Status\" | Select OnboardingState\nGet-MpComputerStatus | Select AMRunningMode, RealTimeProtectionEnabled, IsTamperProtected\n```\n2. Teste o tamper protection, como administrador local:\n```powershell\nSet-MpPreference -DisableRealtimeMonitoring $true\nGet-MpComputerStatus | Select RealTimeProtectionEnabled\n```\n3. Rode o **teste de detecção** do Defender: @ Defender: Settings > Endpoints > Onboarding > *Run a detection test* (copie o comando e rode na VM).\n4. **Device groups (Q189):** @ Defender: Settings > Endpoints > Permissions > Device groups > Add device group:\n   - **MD102-G1** (rank 1): Tag Equals `demo` **And** OS In Windows 11\n   - **MD102-G2** (rank 2): Tag Equals `demo`\n   - Depois, em @ Defender: Assets > Devices > W11-LAB01 > **Manage tags**, adicione `demo`.",
   "evidence": "- @ Defender: Assets > **Devices** (a VM aparece com o status de onboarding).\n- @ Defender: Incidents & alerts (o alerta do teste de detecção).\n- @ Intune: Devices > All devices > (dispositivo) — campos do Defender e o status da política EDR.\n- Event Viewer > Applications and Services Logs > Microsoft > Windows > **SENSE** > Operational.",
   "expected": "- **OnboardingState = 1** e o serviço Sense em execução; a VM aparece no portal do Defender em alguns minutos.\n- Com tamper protection ligado, `RealTimeProtectionEnabled` continua **True** depois do `Set-MpPreference`.\n- O teste de detecção gera um alerta.\n- Com a tag `demo` e Windows 11, a VM entra **só** no MD102-G1 (o primeiro pelo rank).",
   "variations": "- **Q021:** nos templates clássicos, o Defender Antivirus fica em Device restrictions e o Firewall em Endpoint protection. Hoje o caminho recomendado é Endpoint security.\n- **Q023 e Q176:** na política de conformidade (L16), adicione *Require the device to be at or under the machine risk score* = Low. Isso só funciona com a conexão do passo 1 e 2.\n- **Q096:** @ Defender: Exposure management > **Secure score**: veja as recomendações de configuração de dispositivos.\n- **Q211 e Q020:** em @ Defender: Settings > Endpoints > Onboarding, mude o sistema operacional para macOS e Linux Server e veja os métodos de implantação oferecidos (Intune/MDM para macOS; script, Puppet, Ansible e Chef para Linux).",
   "breakit": "Desligue a conexão do passo 2 e crie a política de EDR. Sem o conector, o \"Auto from connector\" não tem pacote para entregar e o onboarding não acontece.",
   "cleanup": "- Faça o **offboarding** antes de destruir a VM: @ Defender: Settings > Endpoints > Offboarding (pacote de offboarding) — ou mantenha a VM no inventário.\n- Apague os grupos MD102-G1/G2 e as políticas MD102-L21-*."
  },
  {
   "id": "L22",
   "title": "ASR, Controlled folder access e Exploit protection",
   "kind": "A",
   "minutes": 60,
   "domain": 3,
   "questions": [
    "Q001",
    "Q130",
    "Q196",
    "Q100",
    "Q206",
    "Q144"
   ],
   "predict": "Q001",
   "refs": [
    "https://learn.microsoft.com/en-us/defender-endpoint/controlled-folders",
    "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference",
    "https://learn.microsoft.com/en-us/defender-endpoint/customize-exploit-protection"
   ],
   "overview": "Testa as regras de redução de superfície de ataque e a proteção de pastas contra ransomware.\n\n- **Controlled folder access** só deixa apps confiáveis ou listados gravarem nas pastas protegidas (Q001, Q130).\n- Configuração vinda do Intune não pode ser desfeita pelo admin local (Q001).\n- Duas políticas com a **mesma regra** e valores diferentes → **conflito** → nenhuma é aplicada (Q196).\n- **Exploit protection**: XML exportado do app Windows Security e importado no Intune (Q100, Q206).",
   "prereqs": "- W11-LAB01 inscrita (de preferência já no Defender, L21, para ver os eventos no portal).\n- Um disco de dados D: na VM (Hyper-V > Add hard drive) com a pasta **D:\\Folder1**.\n- Um executável qualquer copiado para **C:\\Tools\\AppA.exe** (ex.: uma cópia do notepad.exe renomeada).",
   "steps": "### 1. Controlled folder access e ASR\n@ Intune: Endpoint security > Attack surface reduction > Create Policy > Windows > Attack Surface Reduction Rules\n\n- Nome: MD102-L22-ASR\n- Enable Controlled Folder Access: **Enabled**\n- Controlled Folder Access Protected Folders: `D:\\Folder1`\n- Controlled Folder Access Allowed Applications: `C:\\Tools\\AppA.exe`\n- Block execution of potentially obfuscated scripts: **Audit**\n- Atribua à W11-LAB01.\n\n### 2. Política em conflito (Q196)\nCrie **MD102-L22-ASR-B** com a regra *Block execution of potentially obfuscated scripts* = **Block** e atribua à mesma VM.\n\n### 3. Exploit protection (Q100)\n1. Numa VM de referência: @ Windows: Windows Security > App & browser control > Exploit protection settings > System settings\n2. Deixe **Data Execution Prevention** = On by default e **Force randomization for images (Mandatory ASLR)** = On by default.\n3. **Export settings** → `C:\\Temp\\ep.xml`.\n4. @ Intune: Endpoint security > Attack surface reduction > Create Policy > Windows > **Exploit Protection** > Exploit Protection Settings: cole/importe o XML.",
   "test": "1. Confira o que chegou:\n```powershell\nGet-MpPreference | Select EnableControlledFolderAccess, ControlledFolderAccessProtectedFolders, ControlledFolderAccessAllowedApplications\nGet-MpPreference | Select -ExpandProperty AttackSurfaceReductionRules_Ids\n```\n2. **Notepad** salvando em D:\\Folder1\\a.txt: anote se grava.\n3. **PowerShell** gravando na pasta protegida e na Área de trabalho:\n```powershell\nSet-Content D:\\Folder1\\b.txt \"teste\"\nSet-Content \"$env:USERPROFILE\\Desktop\\c.txt\" \"teste\"\n```\n4. **AppA.exe** (cópia do Notepad) salvando em D:\\Folder1.\n5. Como admin local, tente remover D:\\Folder1 em Windows Security > Virus & threat protection > **Ransomware protection**.\n6. Veja o status da regra em conflito no portal.\n7. Exploit protection: `Get-ProcessMitigation -System`.",
   "evidence": "- Event Viewer > Applications and Services Logs > Microsoft > Windows > **Windows Defender** > Operational: **1123** (bloqueio do Controlled folder access), **1121/1122** (ASR em bloqueio/auditoria).\n- Política > Per setting status (o **Conflict** da regra disputada).\n- No portal do Defender: a timeline do dispositivo, com os eventos de ASR.",
   "expected": "- PowerShell é bloqueado na pasta protegida e na Área de trabalho (pastas padrão também são protegidas).\n- AppA.exe grava em D:\\Folder1 (está na lista de permitidos).\n- O Notepad pode gravar: a Microsoft confia em apps de boa reputação. É o ponto polêmico da Q001; anote o que aconteceu no seu teste.\n- O admin local não consegue remover a pasta: a configuração é gerenciada.\n- A regra em conflito mostra **Conflict** e fica com a configuração local (não aplicada).\n- `Get-ProcessMitigation -System` mostra DEP e Mandatory ASLR ligados.",
   "variations": "- **Q144:** \"Block Office applications from creating child processes\" é ASR (Exploit Guard); bloquear FTP (porta 21) é regra de Firewall.\n- **Q206:** veja que o Exploit Guard nos templates clássicos fica em **Endpoint protection**.",
   "breakit": "Coloque `D:\\Folder1\\` com um caminho errado (ex.: `D:\\Pasta1`) e repita o teste do PowerShell: grava sem bloqueio. Erro de digitação em pasta protegida falha em silêncio.",
   "cleanup": "Apague MD102-L22-*; `Set-MpPreference -EnableControlledFolderAccess Disabled` se a VM continuar em uso; restaure o checkpoint."
  },
  {
   "id": "L23",
   "title": "Certificados: raiz confiável e PKCS com a PKI do lab",
   "kind": "B",
   "minutes": 120,
   "domain": 2,
   "questions": [
    "Q098",
    "Q188",
    "Q239"
   ],
   "predict": "Q098",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/certificates-pfx-configure",
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/certificate-connector-install",
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/certificates-trusted-root"
   ],
   "overview": "Usa a sua PKI de lab (Root CA offline + **LAB-SUBCA-CA**) para entregar certificados pelo Intune.\n\n- A raiz vai num perfil **Trusted certificate** (Q188).\n- O **Certificate Connector for Intune** pede o certificado PKCS à CA emissora.\n- Ordem: raiz → perfil de confiança → perfil PKCS que referencia a raiz (Q098).\n- Com duas camadas, a intermediária também precisa de perfil (contexto da Q239).",
   "prereqs": "- PKI de lab funcionando (Root CA offline + LAB-SUBCA-CA emitindo).\n- Um servidor membro do domínio para o conector (ex.: LLK85SH20053), com acesso à CA.\n- W11-LAB01 inscrita.",
   "steps": "### 1. Exporte os certificados das CAs\nExporte o certificado da Root CA e o da LAB-SUBCA-CA em formato **.cer** (DER ou Base64).\n\n### 2. Perfis de confiança\n@ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > Trusted certificate\n\n- **MD102-L23-Root**: arquivo da Root CA · Destination store: **Computer certificate store - Root**\n- **MD102-L23-Sub**: arquivo da LAB-SUBCA-CA · Destination store: **Computer certificate store - Intermediate**\n\n### 3. Template na CA\nNa LAB-SUBCA-CA, em `certtmpl.msc`:\n1. Duplique o template **User** > nome **MD102-PKCS-User**.\n2. Request Handling: **Allow private key to be exported**.\n3. Subject Name: **Supply in the request**.\n4. Security: a conta de computador do servidor do conector com **Read** e **Enroll**.\n5. Em `certsrv.msc` > Certificate Templates > New > **Certificate Template to Issue** > MD102-PKCS-User.\n\n### 4. Instale o conector\n@ Intune: Tenant administration > Connectors and tokens > Certificate connectors > Add\n\n- Baixe e instale no servidor. No assistente, marque **PKCS**, use a conta SYSTEM (ou uma conta de serviço) e entre com um Intune Administrator.\n\n### 5. Perfil PKCS\nTemplates > **PKCS certificate**:\n\n- Renewal threshold: 20 · Certificate validity: 1 ano\n- Key storage provider: **Enroll to Software KSP**\n- Certification authority: FQDN do servidor da LAB-SUBCA-CA · Certification authority name: **LAB-SUBCA-CA**\n- Certificate template name: **MD102-PKCS-User** · Certificate type: **User**\n- Subject name format: `CN={{UserName}},E={{EmailAddress}}` · Subject alternative name: UPN = `{{UserPrincipalName}}`\n- Extended key usage: Client Authentication · Root certificate: **MD102-L23-Root**\n- Atribua a um grupo de usuários com user01.",
   "test": "1. Entre na W11-LAB01 com user01 e sincronize.\n2. `certlm.msc`: Trusted Root Certification Authorities e Intermediate Certification Authorities com os certificados da sua PKI.\n3. `certmgr.msc` (usuário): Personal > Certificates com um certificado emitido pela LAB-SUBCA-CA.\n4. Na CA: `certsrv.msc` > Issued Certificates com o pedido do conector.",
   "evidence": "- No servidor do conector: Event Viewer > Applications and Services Logs > Microsoft > Intune > **CertificateConnectors** > Operational/Admin.\n- Perfil PKCS > Device and user check-in status.\n- @ Intune: Devices > Monitor > **Certificates** (lista de certificados emitidos).",
   "expected": "O usuário recebe um certificado da LAB-SUBCA-CA, e a cadeia é confiável porque a raiz e a intermediária chegaram pelos perfis de Trusted certificate.",
   "variations": "- **Q239:** num perfil **SCEP**, o campo Root Certificate aponta para o perfil de confiança da **raiz** da cadeia. Abra o template SCEP e veja que ele pede um perfil Trusted certificate.\n- Troque o Certificate type para **Device** e o subject para `CN={{AAD_Device_ID}}`.",
   "breakit": "Tire o **Enroll** da conta do conector no template. O perfil PKCS falha, e o log CertificateConnectors registra o \"access denied\" da CA.",
   "cleanup": "Apague os perfis MD102-L23-*, revogue os certificados de teste na CA e despublique o template."
  },
  {
   "id": "L24",
   "title": "Apps Win32: empacotamento, detecção, dependências e supersedência",
   "kind": "A",
   "minutes": 60,
   "domain": 4,
   "questions": [
    "Q009",
    "Q084",
    "Q223",
    "Q269",
    "Q127",
    "Q156",
    "Q247"
   ],
   "predict": "Q009",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-prepare",
    "https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-add",
    "https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-win32-supersedence"
   ],
   "overview": "Empacota e publica apps Win32 pelo Intune, do jeito que as questões cobram.\n\n- Instalador com vários arquivos ou .exe → **Win32 Content Prep Tool** → arquivo **.intunewin** (Q084, Q223, Q269).\n- **Dependência** é configurada no app que depende do outro (Q009).\n- **Information URL** e **Privacy URL** aparecem no Company Portal (Q127).\n- Atribuição só a grupos com segurança (M365, segurança, mail-enabled security), não a grupos de distribuição (Q156).",
   "prereqs": "- W11-LAB01 inscrita.\n- **IntuneWinAppUtil.exe** (repositório microsoft/Microsoft-Win32-Content-Prep-Tool no GitHub).\n- Instalador atual do 7-Zip (.exe x64) em `C:\\Pack\\7zip\\src`.\n- Grupos **MD102-L24-Dev** (dispositivos, com a W11-LAB01) e **MD102-L24-Users** (user01).",
   "steps": "### 1. Empacote o App1 (7-Zip)\n```powershell\n.\\IntuneWinAppUtil.exe -c C:\\Pack\\7zip\\src -s 7z2409-x64.exe -o C:\\Pack\\7zip\\out -q\n```\n(troque o nome do .exe pela versão que você baixou)\n\n### 2. Crie o App2, que depende do 7-Zip\nPasta `C:\\Pack\\app2\\src` com o `install.ps1`:\n```powershell\nNew-Item C:\\MD102 -ItemType Directory -Force | Out-Null\n& \"$env:ProgramFiles\\7-Zip\\7z.exe\" a C:\\MD102\\teste.7z C:\\Windows\\win.ini | Out-Null\nif (Test-Path C:\\MD102\\teste.7z) { Set-Content C:\\MD102\\L24-app2.ok \"ok\"; exit 0 } else { exit 1 }\n```\n```powershell\n.\\IntuneWinAppUtil.exe -c C:\\Pack\\app2\\src -s install.ps1 -o C:\\Pack\\app2\\out -q\n```\n\n### 3. Publique o App1\n@ Intune: Apps > All apps > Create > App type: **Windows app (Win32)** > selecione o .intunewin do 7-Zip\n\n- App information: Name **MD102-7-Zip** · Publisher · **Information URL** e **Privacy URL** preenchidas\n- Program: Install `7z2409-x64.exe /S` · Uninstall `\"%ProgramFiles%\\7-Zip\\Uninstall.exe\" /S` · Install behavior: **System**\n- Requirements: 64-bit · Minimum OS: Windows 10 22H2\n- Detection rules: Manually configure > **File** · Path `C:\\Program Files\\7-Zip` · File `7z.exe` · Detection method: **File or folder exists**\n- Assignments: **Available for enrolled devices** → MD102-L24-Users\n\n### 4. Publique o App2 com dependência\nMesmo caminho, com o .intunewin do App2:\n\n- Install: `powershell.exe -ExecutionPolicy Bypass -File .\\install.ps1` · Uninstall: `cmd.exe /c del C:\\MD102\\L24-app2.ok`\n- Detection: File `C:\\MD102` · `L24-app2.ok` · exists\n- **Dependencies** > Add > MD102-7-Zip > Automatically install: **Yes**\n- Assignments: **Required** → MD102-L24-Dev\n\n### 5. Company Portal\n@ Intune: Apps > All apps > Create > App type: **Microsoft Store app (new)** > Search the Microsoft Store app (new) > **Company Portal** > Install behavior: System · Required → MD102-L24-Dev.",
   "test": "1. Na VM, acelere o agente:\n```powershell\nRestart-Service IntuneManagementExtension\n```\n2. Acompanhe o log: o App2 dispara a instalação do 7-Zip **antes**.\n3. Abra o Company Portal como user01: o MD102-7-Zip aparece como disponível, com os links de informação e privacidade.\n4. Tente atribuir o app a um **grupo de distribuição**: ele não aparece no seletor.",
   "evidence": "- `C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\IntuneManagementExtension.log` e **AppWorkload.log**.\n- @ Intune: Apps > All apps > (app) > **Device install status** / **User install status**.\n- Registro: `HKLM\\SOFTWARE\\Microsoft\\IntuneManagementExtension\\Win32Apps`.",
   "expected": "- O 7-Zip instala primeiro por dependência, depois o App2; o arquivo `C:\\MD102\\L24-app2.ok` existe.\n- No Company Portal aparecem Information URL e Privacy URL (Developer e Owner não aparecem).",
   "variations": "- **Supersedência:** empacote uma versão mais nova do 7-Zip como **MD102-7-Zip-New** e, na aba **Supersedence**, aponte para MD102-7-Zip com *Uninstall previous version* = No. Veja a atualização.\n- **Q247:** o Intune não implanta apps em Linux; só conformidade e scripts.",
   "breakit": "Erre o caminho da regra de detecção (ex.: `C:\\Program Files\\7Zip`). A instalação roda, mas o Intune reporta falha **0x87D1041C** (\"o app não foi detectado depois da instalação\"). É o erro número 1 de app Win32.",
   "cleanup": "Desinstale (atribuição Uninstall) e apague MD102-L24-*."
  },
  {
   "id": "L25",
   "title": "Microsoft 365 Apps: Intune, ODT, OCT e Cloud Policy",
   "kind": "B",
   "minutes": 90,
   "domain": 4,
   "questions": [
    "Q006",
    "Q014",
    "Q085",
    "Q248",
    "Q013",
    "Q154",
    "Q083",
    "Q222",
    "Q197"
   ],
   "predict": "Q006",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-add-office365",
    "https://learn.microsoft.com/en-us/microsoft-365-apps/deploy/overview-office-deployment-tool",
    "https://learn.microsoft.com/en-us/microsoft-365-apps/admin-center/overview-cloud-policy"
   ],
   "overview": "Testa as formas de instalar e configurar o Microsoft 365 Apps.\n\n- Pelo Intune: **Apps > Microsoft 365 Apps** (Q014, Q085).\n- Pelo **ODT**: XML → `/download` → `/configure` (Q006); o XML vem da **Office Customization Tool** em config.office.com (Q083).\n- No **Microsoft 365 Apps admin center**: Modern App Settings (WebView2) e **Policy Management** (Cloud Policy) (Q013, Q222).\n- Várias atribuições de Microsoft 365 Apps no mesmo dispositivo: só a primeira vale (contexto da Q248).",
   "prereqs": "- W11-LAB01 e W11-LAB02 inscritas, sem Office.\n- user01 com E5 (inclui o Microsoft 365 Apps).\n- ~3 GB de download por VM (o Delivery Optimization do L15 ajuda).",
   "steps": "### 1. Pelo Intune (W11-LAB01)\n@ Intune: Apps > All apps > Create > App type: **Microsoft 365 Apps** (Windows 10 and later)\n\n- Configuration settings format: Configuration designer\n- Apps: Excel, Outlook, PowerPoint, Teams, Word · Architecture: **64-bit**\n- Update channel: **Monthly Enterprise Channel** · Remove other versions: Yes · Version to install: Latest\n- Accept the Microsoft Software License Terms on behalf of users: Yes · Languages: Portuguese (Brazil)\n- Assignments: Required → grupo com a W11-LAB01\n\n### 2. Pelo ODT (W11-LAB02)\n1. Em https://config.office.com > Customization > **Device Configuration** > Create: essa é a **Office Customization Tool**. Monte a configuração (mesmos apps, canal e idioma) e exporte o `config.xml`.\n2. Baixe e extraia o **Office Deployment Tool** em `C:\\ODT`.\n3. Em prompt elevado:\n```bat\ncd C:\\ODT\nsetup.exe /download config.xml\nsetup.exe /configure config.xml\n```\n\n### 3. Cloud Policy (Q222)\nhttps://config.office.com > Customization > **Policy Management** > Create\n\n- Nome: MD102-L25-Excel · Scope: grupo de usuários com user01\n- Policy: **Default file format Excel** = Open Document Spreadsheet (*.ods)\n\n### 4. Modern App Settings (Q013)\nNa mesma Office Customization Tool (Customization > **Device Configuration**), a seção **Modern App Settings** tem a opção de instalação automática do **WebView2**. Bloquear o envio de feedback, por outro lado, é Cloud Policy (**Policy Management**).",
   "test": "1. Acompanhe a instalação na W11-LAB01 (pode levar 30 a 60 minutos).\n2. Abra o Excel como user01, crie uma planilha e salve: o formato padrão sugerido é .ods (a Cloud Policy pode levar até ~90 minutos e um reinício do app).\n3. Nos dois PCs, File > Account: confira o canal de atualização.",
   "evidence": "- @ Intune: Apps > All apps > (Microsoft 365 Apps) > Device install status.\n- Registro da Cloud Policy: `HKCU\\Software\\Policies\\Microsoft\\Cloud\\Office\\16.0`.\n- Logs de instalação do Click-to-Run em `%windir%\\Temp` e `%temp%` (arquivos *.log com o nome do PC).",
   "expected": "- Os dois caminhos instalam o Office: o do Intune sem tocar na VM; o do ODT com /download e /configure.\n- A Cloud Policy muda o formato padrão do Excel para .ods para quem está no grupo (inclusive membros de grupos aninhados, Q222).",
   "variations": "- **Q248:** crie um segundo Microsoft 365 Apps (só Word) atribuído ao **usuário** e mantenha o primeiro atribuído ao **dispositivo**. Observe o que realmente é instalado: com várias atribuições de Microsoft 365 Apps, o Intune processa só uma.\n- **Q154:** teste o acesso a config.office.com com Office Apps Administrator e com Security Administrator.\n- **Q085:** atribua o app a um grupo dinâmico `(device.deviceOwnership -eq \"Company\")` e veja que um dispositivo pessoal fica de fora.",
   "breakit": "Rode `setup.exe /configure` com um XML que tenha `<Remove All=\"TRUE\"/>` por engano: o Office instalado é removido. Por isso o XML sempre se gera na OCT e se revisa antes.",
   "cleanup": "Desinstale o Office (atribuição Uninstall ou ODT com Remove), apague a Cloud Policy e os apps MD102-L25-*."
  },
  {
   "id": "L26",
   "title": "Proteção de apps (MAM) e configuração de apps",
   "kind": "C",
   "minutes": 60,
   "domain": 4,
   "questions": [
    "Q157",
    "Q005",
    "Q008",
    "Q081",
    "Q153",
    "Q204",
    "Q253",
    "Q219",
    "Q155",
    "Q221",
    "Q007",
    "Q010",
    "Q082",
    "Q125",
    "Q246"
   ],
   "predict": "Q157",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/apps/protect-mam-windows",
    "https://learn.microsoft.com/en-us/intune/intune-service/apps/app-protection-policy",
    "https://learn.microsoft.com/en-us/intune/intune-service/apps/app-configuration-policies-overview"
   ],
   "overview": "Testa as **app protection policies** (proteção dos dados dentro do app, sem inscrever o dispositivo) e as **app configuration policies**.\n\n- App protection é atribuída a **usuários**, por **plataforma** (Q008, Q157).\n- No Android, o **Company Portal** é o broker; no iOS, o Authenticator (Q157).\n- PIN e credenciais (**Access requirements**), versão mínima (**Conditional launch**), copiar/colar e impressão (**Data protection**) (Q005, Q153, Q204, Q253).\n- Conditional Access com **Require app protection policy** (Q219).\n- App configuration por plataforma; Android Enterprise só para apps do Managed Google Play (Q010, Q082, Q125, Q246).",
   "prereqs": "- **Parte Windows (Edge):** uma VM **não inscrita** no Intune (workgroup, só com a conta de trabalho no Edge).\n- **Parte celular (opcional):** um Android ou iPhone pessoal com Outlook e Company Portal (Android) ou Authenticator (iOS).\n- Grupo de usuários **MD102-L26-MAM** com user02.",
   "steps": "### 1. App protection para Windows (Edge)\n@ Intune: Apps > Manage apps > Protection > Create policy > **Windows**\n\n- Target app: Microsoft Edge\n- Data protection: Receive data from: **No sources** · Send org data to: **No destinations** · Allow cut, copy, and paste for: **No destination or source** · Print org data: **Block**\n- Health checks > Conditional launch: Min OS version (ex.: 10.0.22631) · Action: Block access\n- Assignments: MD102-L26-MAM\n\n### 2. Conditional Access para o Edge no Windows (Q219)\n@ Entra: Entra ID > Conditional Access > Policies > New policy\n\n- Users: MD102-L26-MAM · Target resources: Office 365\n- Conditions > Device platforms: **Windows** · Client apps: **Browser**\n- Grant: **Require app protection policy**\n\n### 3. App protection para Android/iOS (opcional)\n@ Intune: Apps > Manage apps > Protection > Create policy > **Android** (ou iOS/iPadOS)\n\n- Apps: Microsoft Outlook, Teams, OneDrive\n- Data protection: Restrict cut, copy, and paste: **Policy managed apps** · Printing org data: Block\n- Access requirements: PIN for access: Require · Recheck the access requirements after (minutes of inactivity): **30** · Work or school account credentials for access: Require\n- Conditional launch: Max PIN attempts **5** → **Reset PIN** · Min OS version → Block access\n\n### 4. App configuration para o Edge\n@ Intune: Apps > Manage apps > Configuration > Create > **Managed apps**\n\n- App: Microsoft Edge · Edge configuration settings: Homepage shortcut URL, Managed bookmarks.",
   "test": "1. Na VM não inscrita, abra o Edge, adicione o perfil de trabalho com user02 e abra um documento do SharePoint. O Edge pede para \"proteger os dados da organização\" e aplica a política.\n2. Tente copiar um texto do documento e colar no Bloco de Notas; tente imprimir.\n3. No celular: abra o Outlook com user02, espere 30 minutos de inatividade e volte (pede PIN e credenciais); erre o PIN 5 vezes (o PIN do app é redefinido).",
   "evidence": "- @ Intune: Apps > Monitor > **App protection status** (inclui dispositivos não inscritos, Q155).\n- No Edge: `edge://management` (estado da proteção).\n- Sign-in logs do Entra: o grant \"Require app protection policy\".",
   "expected": "- Copiar e imprimir dados da organização ficam bloqueados no Edge de trabalho; o perfil pessoal continua livre.\n- O acesso ao Office 365 pelo navegador, nessa VM, só funciona no Edge com a proteção aplicada.\n- No celular: PIN e credenciais pedidos depois de 30 minutos; após 5 erros, o PIN do app é redefinido (Q005).",
   "variations": "- **Q008 e Q010:** uma política por plataforma; versões diferentes do mesmo SO não pedem políticas separadas.\n- **Q221:** no Windows, o Edge é configurado por **perfil de configuração**; no Android/iOS, por **app configuration policy**.\n- **Q125 e Q246:** com Android Enterprise gerenciado, app configuration só se aplica a apps do Managed Google Play e system apps (veja o L31).",
   "breakit": "Atribua a app protection a um grupo de **dispositivos**. Ela não se aplica: app protection é sempre por usuário.",
   "cleanup": "Apague MD102-L26-* (políticas e CA); remova o perfil de trabalho do Edge."
  },
  {
   "id": "L27",
   "title": "Quiosque com Microsoft Edge",
   "kind": "A",
   "minutes": 40,
   "domain": 2,
   "questions": [
    "Q028",
    "Q212"
   ],
   "predict": "Q028",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/configuration/kiosk-settings-windows",
    "https://learn.microsoft.com/en-us/deployedge/microsoft-edge-configure-kiosk-mode"
   ],
   "overview": "Transforma uma VM em quiosque de app único com o Edge.\n\n- O template **Kiosk** atende \"um app em tela cheia para o público\" (Q212).\n- No modo **Public browsing (InPrivate)**, o Edge tem várias abas e barra de endereço, sem restringir URLs (Q028).",
   "prereqs": "- Uma VM inscrita **dedicada** ao teste (W11-LAB03), com checkpoint antes.",
   "steps": "@ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > Kiosk\n\n- Nome: MD102-L27-Kiosk\n- Kiosk mode: **Single app, full-screen kiosk**\n- User logon type: **Auto logon (Windows 10, version 1803 and later)**\n- Application type: **Add Microsoft Edge browser**\n- Edge Kiosk URL: `https://www.microsoft.com`\n- Microsoft Edge kiosk mode type: **Public browsing (InPrivate)**\n- Refresh browser after idle time: 5\n- Atribua à W11-LAB03.",
   "test": "1. Sincronize e reinicie a VM: ela entra sozinha numa conta de quiosque com o Edge em tela cheia.\n2. Abra outra aba e digite outra URL. Feche a janela do Edge.\n3. Para sair do quiosque: Ctrl+Alt+Del > Sign out > entre com outro usuário.",
   "evidence": "- Event Viewer > Applications and Services Logs > Microsoft > Windows > **AssignedAccess** > Admin e Operational.\n- Perfil > Per setting status.",
   "expected": "- No Public browsing: dá para abrir abas e navegar para outras URLs; a URL do perfil é só a página inicial (Q028). O Edge reabre se for fechado.",
   "variations": "- Troque para **Digital/Interactive signage**: sem barra de endereço e sem abas; a página fica fixa.\n- Troque para **Multi-app kiosk** e escolha dois apps.",
   "breakit": "Atribua o perfil Kiosk a uma VM que você usa nos outros labs. Ela vira quiosque no próximo reinício. Use sempre uma VM dedicada.",
   "cleanup": "Restaure o checkpoint da W11-LAB03 (o mais rápido) e apague o perfil."
  },
  {
   "id": "L28",
   "title": "Scripts e Remediations (extra)",
   "kind": "A",
   "minutes": 40,
   "domain": 5,
   "questions": [],
   "predict": null,
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/remediations"
   ],
   "overview": "Não há questão sobre isso no dump, mas **Remediations** e **platform scripts** estão no Skills Measured atual (domínio de automação e monitoramento). Este lab cobre o básico.\n\n- **Platform scripts**: rodam uma vez (ou de novo se mudarem).\n- **Remediations**: par de scripts de **detecção** e **correção**, com agendamento e relatório.",
   "prereqs": "- W11-LAB01 inscrita, com licença Windows Enterprise E3/E5 do usuário (incluída no M365 E5).",
   "steps": "### 1. Remediation\nScript de detecção (`detect.ps1`):\n```powershell\n$v = (Get-ItemProperty \"HKLM:\\SOFTWARE\\MD102\" -Name Lab -ErrorAction SilentlyContinue).Lab\nif ($v -eq \"ok\") { Write-Output \"Conforme\"; exit 0 } else { Write-Output \"Não conforme\"; exit 1 }\n```\nScript de correção (`remediate.ps1`):\n```powershell\nNew-Item \"HKLM:\\SOFTWARE\\MD102\" -Force | Out-Null\nSet-ItemProperty \"HKLM:\\SOFTWARE\\MD102\" -Name Lab -Value \"ok\"\nWrite-Output \"Corrigido\"\n```\n@ Intune: Devices > Manage devices > Scripts and remediations > Remediations > Create\n\n- Nome: MD102-L28-Reg · envie os dois scripts · Run script in 64-bit PowerShell: Yes\n- Assignments: grupo com a W11-LAB01 · Schedule: Hourly\n\n### 2. Platform script\nNa aba **Platform scripts** > Add > Windows 10 and later: um script que grava `C:\\MD102\\L28-platform.txt`.",
   "test": "1. `Restart-Service IntuneManagementExtension` na VM.\n2. Apague a chave `HKLM\\SOFTWARE\\MD102` e espere a próxima execução.",
   "evidence": "- Remediation > **Device status** (saída de detecção e correção por dispositivo).\n- `C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\HealthScripts.log`.",
   "expected": "A chave volta sozinha a cada execução; o relatório mostra \"Issue fixed\" com a saída dos scripts.",
   "variations": "Use **Run remediation** (ação sob demanda) no dispositivo: @ Intune: Devices > All devices > (dispositivo) > ... > Run remediation.",
   "breakit": "Faça o script de detecção sair com `exit 0` mesmo quando não está conforme. A correção nunca roda: o resultado depende do código de saída.",
   "cleanup": "Apague MD102-L28-* e a chave `HKLM\\SOFTWARE\\MD102`."
  },
  {
   "id": "L29",
   "title": "Endpoint analytics, relatórios e Log Analytics do Intune",
   "kind": "A",
   "minutes": 60,
   "domain": 5,
   "questions": [
    "Q087",
    "Q016",
    "Q093",
    "Q132",
    "Q216",
    "Q217",
    "Q249",
    "Q141",
    "Q155",
    "Q190",
    "Q254",
    "Q031",
    "Q210"
   ],
   "predict": "Q087",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/analytics/overview",
    "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/review-logs-using-azure-monitor",
    "https://learn.microsoft.com/en-us/intune/intune-service/developer/reports-proc-get-a-link-powerbi"
   ],
   "overview": "Testa as fontes de relatório do Intune e o que cada uma responde.\n\n- **Endpoint analytics**: tempo de boot, reinícios, scores. Liga com a **Intune data collection policy** e precisa de **10 dispositivos** para scores e baselines (Q087, Q093, Q216). Só Windows (Q217).\n- Relatórios nativos: **Device compliance trends** (60 dias), **Device actions**, **App protection status** (Q190, Q254, Q155).\n- **Data Warehouse** + Power BI para tendências históricas (Q141, Q031).\n- **Diagnostic settings** → Log Analytics para consultas KQL (Q210).",
   "prereqs": "- Dispositivos inscritos (quanto mais, melhor; com menos de 10 os scores ficam como dados insuficientes).\n- Para o Log Analytics: uma assinatura Azure (a sua MSDN) e um workspace.",
   "steps": "### 1. Endpoint analytics\n@ Intune: Reports > Endpoint analytics > Settings\n\n- Ative a **Intune data collection policy** para os dispositivos gerenciados pelo Intune (All cloud-managed devices ou um grupo).\n- Os clientes do MECM (co-management, L04) também podem entrar pelo tenant attach.\n- Reinicie as VMs pelo menos uma vez depois da política.\n\n### 2. Diagnostic settings (Q210)\n1. Azure: crie o workspace **MD102-LAW**.\n2. @ Intune: Reports > Diagnostic settings > Add diagnostic setting\n   - Logs: AuditLogs, OperationalLogs, DeviceComplianceOrg, Devices · Destination: Send to Log Analytics workspace → MD102-LAW\n\n### 3. Data Warehouse (Q141, Q031)\n@ Intune: Reports > Data warehouse — copie a **OData feed URL**. No Power BI Desktop: Get data > **OData feed** > cole a URL > Organizational account.",
   "test": "1. Depois de algumas horas, abra @ Intune: Reports > Endpoint analytics > **Startup performance**.\n2. No workspace, rode:\n```kusto\nIntuneDevices | summarize count() by OS\nIntuneAuditLogs | project TimeGenerated, OperationName, Identity | take 20\n```\n3. Veja @ Intune: Reports > Device compliance > **Trends** e @ Intune: Devices > Monitor > **Device actions**.",
   "evidence": "As próprias telas de relatório e as consultas KQL.",
   "expected": "- Com menos de 10 dispositivos, o Endpoint analytics coleta, mas não calcula scores nem baseline (Q087, Q216).\n- O workspace recebe os logs do Intune e responde às consultas KQL.\n- O Power BI lê o Data Warehouse pelo feed OData.",
   "variations": "- **Q249:** no Startup performance, use a visão **Model performance** para achar modelos mais lentos que a média.\n- **Q155:** em Apps > Monitor > App protection status, o relatório inclui dispositivos **não inscritos** com app protection (L26).",
   "breakit": "Esqueça a Intune data collection policy: o Endpoint analytics fica vazio para sempre, por mais que os dispositivos reiniciem.",
   "cleanup": "Apague o diagnostic setting e o workspace (para não gerar custo)."
  },
  {
   "id": "L30",
   "title": "Azure Monitor Agent em clientes Windows",
   "kind": "B",
   "minutes": 90,
   "domain": 5,
   "questions": [
    "Q182",
    "Q089",
    "Q186",
    "Q256"
   ],
   "predict": "Q182",
   "refs": [
    "https://learn.microsoft.com/en-us/azure/azure-monitor/agents/azure-monitor-agent-windows-client"
   ],
   "overview": "Leva os eventos do Windows dos clientes para o Log Analytics.\n\n- Agente: **Azure Monitor Agent** (instalador para cliente Windows) (Q186, Q256).\n- Destino: workspace do **Log Analytics**, onde se criam alertas com KQL (Q256).\n- O cliente precisa ser **Entra joined** (Q089).\n- A data collection rule (DCR) é associada a um **Monitored Object**, não ao dispositivo (Q182).",
   "prereqs": "- Assinatura Azure (MSDN) e workspace (pode reaproveitar o MD102-LAW do L29).\n- W11-LAB01 **Entra joined**.\n- Um Global Administrator com **elevação de acesso** (Entra ID > Properties > Access management for Azure resources = Yes) para atribuir a função no escopo do tenant.",
   "steps": "### 1. Data collection rule\nAzure portal > Monitor > **Data Collection Rules** > Create\n\n- Nome: MD102-L30-DCR · Platform type: **Windows**\n- Data sources: **Windows Event Logs** (System: Critical/Error/Warning; Application: Critical/Error)\n- Destination: MD102-LAW\n\n### 2. Instale o agente no cliente\nBaixe o **Azure Monitor Agent client installer** (MSI) indicado na documentação e rode na VM:\n```bat\nmsiexec /i AzureMonitorAgentClientSetup.msi /qn\n```\n\n### 3. Monitored Object e associação\n```powershell\nConnect-AzAccount\n$tenant = (Get-AzContext).Tenant.Id\n$me     = (Get-AzADUser -SignedIn).Id\n# 1) Função \"Monitored Objects Contributor\" no escopo do tenant\nNew-AzRoleAssignment -ObjectId $me -RoleDefinitionName \"Monitored Objects Contributor\" -Scope \"/providers/Microsoft.Insights\"\n# 2) Cria o Monitored Object do tenant (a região é a dos dados do Azure Monitor)\n$mo = \"/providers/Microsoft.Insights/monitoredObjects/$tenant\"\nInvoke-AzRestMethod -Method PUT -Path \"$mo`?api-version=2021-09-01-preview\" -Payload '{\"properties\":{\"location\":\"eastus\"}}'\n# 3) Associa a DCR ao Monitored Object\n$dcr = (Get-AzDataCollectionRule -ResourceGroupName \"RG-MD102\" -Name \"MD102-L30-DCR\").Id\n$body = @{ properties = @{ dataCollectionRuleId = $dcr } } | ConvertTo-Json\nInvoke-AzRestMethod -Method PUT -Path \"$mo/providers/microsoft.insights/datacollectionruleassociations/md102-assoc`?api-version=2021-09-01-preview\" -Payload $body\n```\n\n! Confira a versão de API e a região na documentação antes de rodar; elas mudam com o tempo. O nome do grupo de recursos é o que você usou na DCR.",
   "test": "1. Gere um erro no cliente: `eventcreate /T ERROR /ID 999 /L APPLICATION /SO MD102 /D \"teste L30\"`.\n2. No workspace (pode levar ~15 minutos):\n```kusto\nEvent | where Source == \"MD102\" | project TimeGenerated, Computer, EventID, RenderedDescription\n```",
   "evidence": "- Serviço do Azure Monitor Agent em execução no cliente.\n- Tabela **Event** e **Heartbeat** no workspace.",
   "expected": "O evento 999 aparece no workspace; dá para criar uma regra de alerta de log em cima da consulta.",
   "variations": "- **Q089:** tente instalar o agente numa VM **workgroup** sem Entra join: o agente não autentica.\n- **Q186:** a resposta da prova é instalar o Azure Monitor Agent. Na prática, o instalador de cliente exige que o computador seja Entra joined ou hybrid joined; máquinas só do domínio precisam do hybrid join (L04) antes.",
   "breakit": "Associe a DCR diretamente a um recurso (como se faz com VMs do Azure) e não ao Monitored Object: o cliente não recebe a configuração.",
   "cleanup": "Apague a associação, a DCR e o workspace; desinstale o agente."
  },
  {
   "id": "L31",
   "title": "Dispositivos móveis: Apple, Android e atualizações",
   "kind": "C",
   "minutes": 60,
   "domain": 2,
   "questions": [
    "Q148",
    "Q032",
    "Q090",
    "Q094",
    "Q191",
    "Q126",
    "Q158",
    "Q019",
    "Q030",
    "Q193",
    "Q011",
    "Q268",
    "Q220",
    "Q062",
    "Q138",
    "Q027",
    "Q238"
   ],
   "predict": "Q148",
   "refs": [
    "https://learn.microsoft.com/en-us/intune/intune-service/enrollment/apple-mdm-push-certificate-get",
    "https://learn.microsoft.com/en-us/intune/intune-service/enrollment/connect-intune-android-enterprise",
    "https://learn.microsoft.com/en-us/intune/intune-service/protect/software-updates-ios"
   ],
   "overview": "Sem frota de celulares corporativos, este lab cobre o que dá para fazer com um celular pessoal e o que é só portal.\n\n- **Apple MDM push certificate** vem antes de qualquer inscrição Apple (Q032).\n- Políticas de atualização do iOS e o adiamento de visibilidade só valem para **supervisionados** (ADE) (Q090, Q148, Q191).\n- **Managed Google Play** vinculado é pré-requisito de apps no Android Enterprise; apps são **aprovados** e **sincronizados** (Q126, Q158).\n- **Custom notifications** chegam a iOS/Android, não ao Windows (Q030).\n- Formatos de app: .ipa (iOS), .apk (Android LOB) (Q011, Q268).",
   "prereqs": "- Um Apple ID corporativo (para o push certificate) e/ou uma conta Google (para o Managed Google Play).\n- Um iPhone ou Android pessoal (opcional).",
   "steps": "### 1. Apple MDM push certificate\n@ Intune: Devices > Device onboarding > Enrollment > Apple > Apple MDM Push certificate\n\n1. Aceite os termos e **Download your CSR**.\n2. Abra o Apple Push Certificates Portal, entre com o Apple ID, envie o CSR e baixe o `.pem`.\n3. Volte ao Intune, informe o Apple ID e envie o .pem.\n\n? Renove todo ano com o **mesmo** Apple ID; trocar o Apple ID obriga a reinscrever todos os dispositivos Apple.\n\n### 2. Managed Google Play\n@ Intune: Devices > Device onboarding > Enrollment > Android > Managed Google Play > Launch Google to connect now (entre com uma conta Google).\n\nDepois: @ Intune: Apps > All apps > Create > **Managed Google Play app** > aprove um app (ex.: Chrome) > **Sync**.\n\n### 3. Atualização do iOS (só portal)\n@ Intune: Devices > Manage updates > Apple updates > Update policies for iOS/iPadOS > Create profile — veja os campos de agendamento (Q094).\n\nDevice restrictions do iOS > General > **Defer software updates** (só supervisionados, Q191).\n\n### 4. Custom notification (Q030)\n@ Intune: Tenant administration > Custom notifications — envie para um grupo com seu usuário.",
   "test": "1. Inscreva o celular pessoal pelo Company Portal (iPhone: device enrollment; Android: work profile pessoal).\n2. Atribua a ele a política de atualização do iOS: ela fica **Not applicable** (não é supervisionado).\n3. Envie a custom notification: chega no celular; no Windows, não.",
   "evidence": "- Status da política por dispositivo; notificação no Company Portal do celular.",
   "expected": "- Política de update do iOS só se aplica a dispositivos **supervisionados** (ADE): os 800 da Q148, não os do Company Portal.\n- Sem o push certificate, nenhum dispositivo Apple inscreve.",
   "variations": "- **Q193:** iOS pessoal → **User enrollment**; Windows já no MECM → co-management.\n- **Q027:** restrição de plataforma bloqueando o Android device administrator (L03).\n- **Q019:** em Android Enterprise corporativo dedicado, o modo quiosque fica em Device restrictions > **Device experience**.\n- **Q238:** o Intune gerencia atualizações de Windows, iOS/iPadOS, macOS e Android (Android Enterprise corporativo e FOTA da Samsung). Veja os nós em Devices > Manage updates.",
   "breakit": "Deixe o push certificate expirar (ou não renove no lab): todos os iOS param de receber comandos. É o incidente clássico de Intune com Apple.",
   "cleanup": "Retire o celular pessoal do Intune; desvincule o Managed Google Play se não for usar."
  },
  {
   "id": "L32",
   "title": "Windows 365 (sem licença no lab)",
   "kind": "D",
   "minutes": 20,
   "domain": 2,
   "questions": [
    "Q250",
    "Q258",
    "Q260",
    "Q261"
   ],
   "predict": "Q260",
   "refs": [
    "https://learn.microsoft.com/en-us/windows-365/enterprise/azure-network-connections",
    "https://learn.microsoft.com/en-us/windows-365/enterprise/add-device-images"
   ],
   "overview": "O seu lab não tem licenças de Windows 365, então este é um roteiro de leitura guiada com o que olhar no portal.\n\n- Cloud PC **hybrid joined** exige uma **Azure network connection (ANC)** para uma VNet que alcança e resolve o DC (Q260, Q261).\n- VNet sem conexão com o on-premises → Cloud PC **Microsoft Entra joined** (Q250).\n- Imagem customizada: Azure só aceita **VHD de tamanho fixo**, geração 2 (Q258).",
   "steps": "@ Intune: Devices > Device onboarding > Windows 365\n\n- Veja as abas **Provisioning policies**, **Custom images** e **Azure network connection**.\n- Leia a ordem: ANC (para hybrid) → provisioning policy (que referencia a ANC) → atribuição a grupo de usuários licenciados.\n\nPara converter um disco Hyper-V para o formato aceito:\n```powershell\nConvert-VHD -Path C:\\VMs\\ref.vhdx -DestinationPath C:\\VMs\\ref.vhd -VHDType Fixed\n```",
   "expected": "Saber a ordem e o pré-requisito de rede de cada tipo de join, e o formato de disco da imagem."
  }
 ]
});
