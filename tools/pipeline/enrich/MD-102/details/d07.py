DET = {
"Q210": """SharePoint site / certificate connector :: sem relação.
Power BI Desktop :: visualização opcional; a pergunta é sobre os dados brutos com KQL.
! Em Intune > Tenant administration > Diagnostic settings, escolha AuditLogs, OperationalLogs, DeviceComplianceOrg e Devices.""",
"Q211": """Group Policy / scripts VDI para macOS ou Linux :: são métodos só de Windows.
! Para macOS também servem JAMF, outro MDM ou script local; para Linux, script, Puppet, Ansible ou Chef.""",
"Q212": """Shared multi-user device :: PCs compartilhados com várias contas, sem app único em tela cheia.
Device restrictions / Endpoint protection :: não criam o quiosque.
! O Kiosk single-app aceita app UWP, Edge ou um app Win32 (com Assigned Access).""",
"Q213": """Assignments do Policy1 :: atribuições separadas podem divergir das do set.
Configurações do Policy1 :: não vinculam ao set.
Assignments do Set1 :: definem quem recebe, mas o Policy1 precisa estar dentro do set.""",
"Q214": """Device1 também do Device4 :: o Device4 está em outra sub-rede e outro site.
Device2 de algum peer :: com restrição por sub-rede, ele não tem peers na 10.20.x.
! Group (2) usa o AD site ou o domínio por padrão; o Group ID permite definir grupos personalizados.""",
"Q215": """Enrollment / CA / compliance :: não habilitam o link de reset na tela de logon.
! O link exige SSPR habilitado no Entra para os usuários e Windows 10 1803+.""",
"Q216": """Workloads / Log Analytics / Security baselines :: não calculam os scores do Endpoint analytics.
1 / 5 / 25 :: o mínimo para scores e baselines é 10 dispositivos.""",
"Q217": """Android / iOS :: o Endpoint analytics só coleta de Windows.
! As edições Home não são suportadas.""",
"Q218": """Todos os quatro :: o gabarito considera "Mac OS X" (10.x) fora do suporte.
! Hoje o MDE suporta as três últimas versões do macOS, Linux, Android, iOS e Windows Server.""",
"Q219": """App configuration :: configura apps.
Configuration profile / compliance :: exigem inscrição; o cenário é MAM.
! Hoje use "Require app protection policy" (o "Require approved client app" foi aposentado).""",
"Q220": """Registrar no Entra :: é para autenticação, não para distribuição.
Lojas públicas :: qualquer um baixaria.
MDT :: implantação de imagem Windows.
! Para Android Enterprise, publique como app privado do Managed Google Play e atribua ao grupo dinâmico de finanças.""",
"Q221": """App configuration no Windows :: no Windows inscrito, o Edge é configurado por perfis (ADMX).
Configuration profile no mobile :: no Android e iOS, o Edge é configurado por app configuration (managed apps ou managed devices).""",
"Q222": """User1 com .ods :: Sim. Policy1 (prioridade 0, Group1).
User2 com .xlsb :: Não. Também está no Group1 (aninhado), e a Policy1 vence.
User3 com .xlsx :: Não. Recebe a Policy1 (.ods).
! Diferente do Intune, as Office Cloud Policies resolvem conflito por prioridade e consideram grupos aninhados.""",
"Q223": """DISM / App-V Sequencer / winget :: não geram o .intunewin.
.apk / .appv / .ipa :: formatos de outras plataformas ou tecnologias.""",
"Q224": """CA settings / diagnostic settings :: não mudam o padrão de dispositivos sem política.
Ações de não conformidade da Policy1 :: só valem para quem recebe a Policy1.""",
"Q225": """Entra admin center :: não importa hashes do Autopilot.
VAMT / WDS :: distratores (ativação e imagem).
MAC + nome / chave de volume :: não identificam o dispositivo para o Autopilot.""",
"Q226": """Provisioning package / unattend.xml :: não usam o login do usuário no OOBE para inscrever.
Self-deploying :: não pede login.
! O user-driven também precisa do perfil atribuído e de licença Intune para o usuário.""",
"Q227": """Regra por operatingSystem :: pegaria todos os Windows, não só os do Autopilot.
Join no Entra / GPO / join no AD :: não atribuem o perfil.
! Variante por order ID: device.devicePhysicalIds -any _ -eq "[OrderID]:Lote1".""",
"Q232": """"Device Owners" :: não é um grupo local padrão.
"Contoso\\User1" / "User1@Contoso.com" :: contas do Entra exigem o prefixo AzureAD\\.
! Em escala, use Account protection > Local user group membership (Remote Desktop Users).""",
"Q233": """Device1 :: Não. TPM 1.2.
Device2 :: Não precisa de hardware. Atende o mínimo exatamente.
User3 :: Sim. Precisa de licença; O365 E5 + EMS E5 não incluem Windows Enterprise.""",
"Q234": """Enable-MMAgent :: Memory Manager.
Allow Remote Shell Access :: controla o WinRS, mas não habilita o WinRM.
Turn on Script Execution :: política de execução local.""",
"Q235": """App configuration / app protection :: sem relação com o provisionamento.
Platform restriction :: bloqueia plataformas na inscrição.""",
"Q236": """Custom / Properties / ConfigMgr compliance / System Security :: não contêm Secure Boot nem o risco do MDE.
! O risco de máquina exige a conexão Intune ↔ MDE habilitada.""",
"Q237": """Ativação / licença / quality updates :: não concluem o registro do hybrid join.
! dsregcmd /status mostra o estado; o evento 304/305 no log User Device Registration ajuda no diagnóstico.""",
"Q238": """Combinações parciais :: o Intune gerencia atualizações das quatro plataformas, cada uma com a sua política.""",
"Q239": """Server1 (DC) / Server4 (NDES) :: não são a raiz da cadeia.
Server3 (sub CA) :: o gabarito do dump marca, mas o campo pede o certificado raiz confiável.
! Distribua a raiz e as intermediárias como trusted certificates; o perfil SCEP referencia o da raiz.""",
"Q240": """Windows a cada 5 min / iOS como Windows :: os intervalos são diferentes por plataforma (Windows: 3 min no início; iOS: 15 min).""",
"Q241": """Device1 em 4/08 :: Não. Sem política, e o tenant marca como Not compliant.
Device2 em 2/08 :: Não, pelo gabarito (In grace period não é "compliant").
Device2 retirado em 6/08 :: Sim. A ação de retire acontece 5 dias após a não conformidade.
! Inconsistência entre questões: em outras, o grace period conta como compliant (para CA ele conta).""",
"Q242": """Edge Browser :: configurações do Edge legado.
Network proxy / Privacy / Search / Start etc. :: não bloqueiam sites suspeitos nem escaneiam scripts.""",
"Q243": """Wipe no Device4 :: iOS em User Enrollment não suporta wipe.
Reter a inscrição em Android/iOS :: a opção "Retain enrollment state" existe só no Windows.""",
"Q244": """Device1 :: Não. Não está no Intune, então não é convertido.
Device2 :: Não. Excluído (Group2).
Device3 :: Sim, pelo gabarito (com reset; um simples restart não dispara o Autopilot).""",
"Q246": """Web link / Android store app / built-in :: não suportam managed configurations.
! As Android Enterprise system apps são apps pré-instalados habilitados pelo Intune em dispositivos dedicados ou fully managed.""",
"Q247": """Device4 (Ubuntu) :: o Intune não implanta apps em Linux (só compliance e scripts).
Combinações sem Android ou iOS :: as duas plataformas recebem apps.""",
"Q248": """Excel instalado :: o gabarito diz Sim, mas a documentação indica que só a primeira atribuição de M365 Apps vale por dispositivo.
! Na prática, use um único app Microsoft 365 Apps com todos os apps necessários por dispositivo.""",
"Q249": """Compliance policies / Device diagnostics :: não medem tempo de boot por modelo.
M365 Apps admin center / Entra :: o Endpoint analytics fica no Intune admin center.""",
"Q250": """Hybrid join :: exige linha de visada para um DC (VNet com conectividade on-premises).
Rede hospedada pela Microsoft :: não alcança a VNet1.
Frontline :: acesso por turno, com limite de sessões simultâneas.""",
"Q252": """VM1 :: Geração 1, sem TPM.
VM3 :: 1 vCPU.
! O Windows 11 também exige processador de uma lista suportada; em VMs, conta a configuração virtual.""",
"Q253": """App configuration :: configura o app.
App provisioning profile :: assinatura de apps.
Policies for Office apps :: políticas de nuvem do Office (configurações), não DLP entre apps.""",
"Q254": """Noncompliant devices / assignment status / health attestation :: não registram ações remotas.
! O Audit log do Intune também mostra quem iniciou cada ação.""",
"Q255": """Configuration profile / security baseline :: não controlam atualizações mensais.
Feature update policy :: trata de versões do Windows, não das quality updates mensais.
! Alternativa moderna: Windows Autopatch, com anéis de teste/primeiro/rápido/amplo.""",
"Q256": """Event Hub / SQL / Storage :: não permitem alertas de log com KQL nativamente.
Event Collector / event subscription :: são WEF (on-premises).
! Crie uma DCR com XPath dos eventos e associe ao Monitored Object (clientes Windows).""",
"Q257": """ASR / account protection :: não impedem desligar o Defender.
CA :: reage ao acesso; não protege o agente.""",
"Q258": """Dynamically expanding :: o Azure exige disco de tamanho fixo.
Geração 1 :: o Windows 365 exige Geração 2.
Aumentar o disco :: 64 GB já atende.
! Comando: Convert-VHD -Path VM1.vhdx -DestinationPath VM1.vhd -VHDType Fixed; depois, sysprep /generalize /oobe.""",
"Q259": """Enroll / exportar hash no Server1 :: o servidor só hospeda o conector.
Delegar no Admin1 / Server1 como recurso :: a permissão de criar computadores é delegada na OU de destino.""",
"Q260": """Provisioning policy primeiro :: ela precisa de uma ANC para hybrid join.
Configuration profile / custom image :: opcionais.""",
"Q261": """VNet2 :: sem gateway e com Azure DNS; não resolve nem alcança o DC.
VNet3 :: tem gateway, mas não está conectada e usa Azure DNS.""",
"Q262": """CA / ASR / custom notification :: não enviam e-mail por não conformidade.
! Na prática, crie o template de notificação antes e selecione-o na ação "Send email to end user".""",
"Q263": """Device restrictions (Windows 10 Team) :: tem opções do Surface Hub; o gabarito usa Identity/Endpoint protection.
Defender for Endpoint (desktop) / health monitoring :: não configuram WHfB nem SmartScreen.""",
"Q264": """Device1 :: Não. Excluído via Group3 (atributo Test).
Device2 :: Sim. Só no Group2.
Device3 :: Não. Excluído via Group1.""",
"Q265": """Android Enterprise / iOS Platform :: já estão permitidas.
Versões do Android Enterprise / device admin :: o requisito de Android é o tipo, não a versão.
macOS / Windows :: fora do escopo.""",
"Q266": """Configuration profile :: possível via Settings catalog/OMA-URI, mas o caminho dedicado é Account protection.
App protection / compliance :: sem relação.
! O LAPS no Entra exige habilitar "Enable Microsoft Entra Local Administrator Password Solution" em Device settings.""",
"Q267": """Security baseline :: pode conter tamper protection em versões recentes, mas o gabarito usa a política de Antivirus.
CA / compliance :: não impedem a desativação.""",
"Q268": """Built-in / Android store / web link :: não aceitam o upload de APK.
Managed Google Play :: recomendado como app privado, mas o tipo "arquivo APK" é LOB (só no device administrator legado).""",
"Q269": """App configuration :: não empacota.
M365 Apps admin center :: Office.
Azure Blob :: o Intune hospeda o conteúdo.""",
}
