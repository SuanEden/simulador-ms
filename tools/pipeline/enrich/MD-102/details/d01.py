DET = {
"Q001": """User1 cria arquivo em D:\\Folder1 com o Notepad :: Não, pelo gabarito (pasta protegida). A comunidade aponta que o Notepad é confiável e passaria.
User2 remove a pasta da lista :: Não. Configuração gerenciada pelo Intune não é editável no dispositivo.
User3 grava no Desktop por script :: Não. O Desktop é pasta protegida por padrão, e scripts do PowerShell não são confiáveis.
! O Controlled folder access em modo Audit só registra (evento 1124); use-o antes de ativar o Block.""",
"Q002": """Device3 :: é pessoal; o "Convert all targeted devices to Autopilot" só registra dispositivos corporativos.
Device2 :: está no grupo excluído (Group2).
! A conversão faz o upload do hash do dispositivo; o perfil Autopilot só vale no próximo reset ou na reinstalação.""",
"Q003": """Device1 :: Não. A Policy2 exige Secure Boot, que ele não tem.
Device4 :: Não. Sem BitLocker, e a Policy3 exige.
Device5 :: Sim. Sem política atribuída, e o tenant marca "sem política" como compliant.
! O padrão seguro é "Mark devices with no compliance policy assigned as = Not compliant" (Compliance settings).""",
"Q004": """Só alguns dispositivos :: scope tags não filtram atribuições; definem quem administra o objeto.
! Para filtrar atribuições, use **assignment filters** (ex.: por modelo, SO ou ownership).""",
"Q005": """Só credenciais / só PIN :: com "Require" para as credenciais, a reverificação pede PIN e conta.
Bloquear / reset do PIN do dispositivo / wipe :: a ação configurada em "Max PIN attempts" é Reset PIN (do app).
! "Recheck the access requirements after (minutes of inactivity)" vale para o app protegido, não para o dispositivo.""",
"Q006": """/packager :: gera pacote App-V, não instala o Microsoft 365 Apps.
Ordem :: sem baixar e extrair o ODT não há setup.exe; sem o XML editado, o /download não sabe o que baixar.
! Para instalar direto da CDN, pule o /download e use só /configure com o XML (sem SourcePath).""",
"Q007": """Windows inscritos :: app config para Windows existe só via MAM (Edge, não inscritos).
Todos :: dispositivos gerenciados Windows usam perfis de configuração, não app config.""",
"Q008": """App configuration policy :: configura o app, não protege dados.
Conditional Access :: controla acesso, não copiar/colar.
Compliance policy :: avalia o dispositivo.
1, 2, 4 ou 5 políticas :: uma por plataforma (Windows, Android, iOS); versões não importam.""",
"Q009": """App1 deployment :: a dependência é declarada no app dependente (App2).
Dynamic group :: não define ordem de instalação.
Detection rule :: detecta se o app está instalado, mas não ordena.
! Dependências de Win32 suportam até 100 apps e cadeias aninhadas; marque "Automatically install".""",
"Q010": """1 :: as políticas são por plataforma (Android ≠ iOS).
3 a 5 :: versões diferentes do mesmo SO usam a mesma política.""",
"Q011": """.intunemac :: formato antigo de macOS (hoje .pkg/.dmg).
.apk :: Android.
.appx :: Windows.
! O .ipa precisa estar assinado com um certificado de distribuição Enterprise ou Ad Hoc.""",
"Q012": """Filter for devices / device platforms :: filtram o dispositivo, não o protocolo.
User risk / sign-in risk :: tratam de risco.
! A Microsoft oferece o template "Block legacy authentication"; teste em report-only.""",
"Q013": """Monthly Enterprise / What's New / Health / Inventory / Setup / Home :: não controlam WebView2 nem feedback.
! As políticas de nuvem (Cloud Policy) valem para o usuário em qualquer dispositivo onde ele entra no Office.""",
"Q014": """Device profile :: configura o Windows, não instala o Office.
App registration / enterprise app :: objetos de identidade.
! No app Microsoft 365 Apps do Intune, escolha a arquitetura, o canal (Current/Monthly/Semi-Annual) e os apps excluídos.""",
"Q015": """Retire :: fica pendente até o check-in; não remove o objeto "imediatamente".
Fresh Start :: reinstala o Windows e remove apps do usuário (pode manter dados).
Autopilot Reset :: limpa tudo, menos a inscrição.
! Delete remove o registro do Intune; no próximo check-in, o dispositivo sofre o retire automaticamente.""",
"Q016": """Azure Monitor :: plataforma de logs; não traz o relatório pronto de boot.
Intune Data Warehouse :: dados históricos de inventário e compliance.
Defender for Endpoint :: segurança.
! O Endpoint analytics exige que os dispositivos enviem dados (perfil de onboarding ou Intune data collection policy).""",
"Q017": """Quality deferidas indefinidamente ou 30 dias :: o adiamento configurado é 0, então instalam imediatamente.
Feature em 1 ou 30 dias :: adiamento de 30 + deadline de 30 = até 60 dias após o lançamento.
! O grace period (reinício) soma ainda mais dias depois do deadline.""",
"Q018": """Incluir o evento 3 (Security) :: a fonte "Windows event logs" do agente clássico não coleta o Security log.
! Hoje, com AMA + DCR (ou Sentinel/Defender for Cloud), o Security log é coletado normalmente.""",
"Q019": """Users and Accounts / General / System security :: não contêm as opções de quiosque.
! Para quiosque de verdade, use o perfil **dedicated** (COSU) com o Managed Home Screen.""",
"Q020": """Purview :: compliance, não Defender for Endpoint.
Security baseline :: não faz o onboarding no macOS.
Instalar o Defender manualmente :: mais esforço; o gabarito considera os perfis de configuração do Intune (mais o app).
! O onboarding no macOS precisa: system extensions, full disk access, network filter, notificações, o pacote de onboarding e o app (PKG).""",
"Q021": """GPO :: dispositivos só Entra joined não recebem GPO.
Antivírus em Endpoint protection :: nos templates clássicos, o Defender AV fica em Device restrictions.
Firewall em Device restrictions :: o Firewall fica em Endpoint protection.
! Hoje use Endpoint security > Antivirus e Firewall (melhor relatório e menos conflitos).""",
"Q022": """Settings :: não muda o alvo.
Scope tags :: definem quem administra o perfil.
Applicability rules :: as duas máquinas têm a mesma edição; não as diferenciam.
! Assignment filters também resolveriam (incluir só o nome do Device1).""",
"Q023": """**Por que cada um:** sem a conexão com o Intune, o risco de máquina do MDE não chega à compliance policy nem ao CA. Scripts ofuscados e downloaders JS/VBS são bloqueados por regras de ASR específicas.
! A compliance policy usa "Require the device to be at or under the machine risk score".""",
"Q024": """Administrative Templates :: ADMX; não incluem a política de senha local.
Endpoint protection :: firewall, BitLocker etc.
Custom :: OMA-URI manual; desnecessário.
! Em dispositivos Entra joined, a política de senha do Windows Hello/PIN é separada da senha local.""",
"Q025": """Security log :: não coletado pelo agente clássico.
Logs de texto :: possíveis como custom logs, mas fora do gabarito do dump (questão duvidosa).
! Com AMA + DCR, logs de texto e o Security log são coletados.""",
"Q026": """ASR / baseline / account protection / antivirus :: configuram proteção, mas não fazem o onboarding no MDE.
! Antes, habilite a conexão Intune ↔ MDE; aí a política de EDR usa automaticamente o pacote de onboarding do conector.""",
"Q027": """Bloquear só Personally Owned do device admin :: corporativos ainda entrariam pelo device administrator.
Permitir device admin :: contraria o requisito.
! O Android device administrator está descontinuado no Intune com GMS (desde dezembro de 2024).""",
"Q028": """Só URLs com contoso.com :: o Public Browsing não restringe URLs (precisaria da lista de bloqueio).
Sem barra de endereços :: o modo Digital/Interactive signage é que esconde.
Várias instâncias :: single-app kiosk tem uma instância só.
! A Kiosk URL é só a página inicial; o reset por inatividade limpa a sessão.""",
"Q029": """Bandwidth optimization / VPN peer caching :: não definem a fonte (LAN/internet).
App configuration / quality updates / update rings :: não configuram o Delivery Optimization.
! Download mode: HTTP only (0), LAN (1), Group (2), Internet (3), Simple (99), Bypass (100).""",
"Q030": """User1 no Device1 (Windows) :: Não. Custom notifications só chegam em iOS/Android.
User2 :: Não. Não está no Group1.
User1 no Device3 (iOS) :: Sim. A notificação segue o usuário em qualquer dispositivo iOS/Android dele.
! A notificação aparece como push do Company Portal; limite de 25 por hora.""",
"Q031": """Company Portal :: app do usuário final.
Endpoint analytics :: relatórios de desempenho.
Azure portal app :: não gera relatórios do Data Warehouse.
! O feed OData também pode ser consumido no Excel ou por qualquer cliente OData.""",
"Q032": """DEM :: conta para inscrever muitos dispositivos, mas depende do certificado antes.
Restrições :: vêm depois.
Identificadores :: são usados no Apple Configurator, mas só depois do push certificate.
! O certificado vale um ano; renove com o **mesmo Apple ID** para não perder a gestão dos dispositivos.""",
}
