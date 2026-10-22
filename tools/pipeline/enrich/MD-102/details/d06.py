DET = {
"Q179": """Device1 :: Sim. Sem política atribuída, e o tenant marca como Compliant.
Device2 :: Sim. Atende a Compliance1.
Device3 :: Não. Sem criptografia, falha na Compliance2, e o CA bloqueia.
! Para o CA reconhecer o dispositivo no Edge, entre no perfil do Edge com a conta de trabalho (ou use a extensão no Chrome).""",
"Q180": """Autopilot :: tem a opção "User account type = Standard", mas a pergunta é sobre o join manual.
Provisioning packages :: não mudam o comportamento do join.
Security defaults :: sem relação.
! A mesma tela define "Additional local administrators on all Microsoft Entra joined devices".""",
"Q181": """Windows / iOS :: compliance por localização de rede nunca foi suportada nessas plataformas.
! Para restringir por rede no Windows, use o CA com named locations ou o compliant network do Global Secure Access.""",
"Q182": """Network Watcher / workspace :: a DCR aponta para o workspace (destino), mas a associação é com o recurso monitorado.
Device1 :: clientes Windows fora do Azure não são recursos ARM; por isso existe o Monitored Object.""",
"Q183": """Feature deferral 14 / quality 90 :: valores trocados.
Deadline de feature 7 / 14 :: o requisito diz 10 dias depois do adiamento.
Grace period 7 / 10 :: o reinício automático é 3 dias após a instalação.""",
"Q184": """Identities :: contas, não dispositivos.
Vulnerability management (várias) :: inventário de software fica em Inventories, mas para "dispositivos integrados com o Edge" o gabarito usa Devices.
Reports / Audit / Health / Permissions / Configuration management :: não baixam o pacote de onboarding.""",
"Q185": """Security baseline :: configura muitas coisas, mas não impede desligar o Defender (sem tamper protection).
Account protection / EDR :: outras funções.
! O tamper protection também protege exclusões (quando gerenciado pelo Intune) e configurações de proteção em tempo real.""",
"Q186": """Storage / Cosmos DB / SQL :: não são o destino nativo de eventos do Windows.
Collector-initiated subscription :: é o WEF (on-premises).
Intune / registro no Entra :: não coletam logs (o Entra join é pré-requisito do AMA client).
! Para computadores de domínio fora do Azure, o caminho comum é o Azure Arc + AMA.""",
"Q187": """LiteTouch.wsf :: é do MDT.
Unattend.bat / Unattend.xml :: usados na instalação limpa, não no setup de feature updates.
! O SetupConfig.ini também aceita outros parâmetros do setup (ex.: /DynamicUpdate Disable).""",
"Q188": """App config / app protection / compliance :: não distribuem certificados.
PKCS imported / PKCS / SCEP :: emitem certificados finais e dependem do perfil de raiz.""",
"Q189": """Group4 ou Group5 sem tag :: o computador entra só no primeiro grupo (rank) que corresponder.
Vários grupos com tag :: idem; a regra do Group1 (tag demo + Windows 10) tem o menor rank.""",
"Q190": """30 / 90 / 365 dias :: o relatório de tendência mostra 60 dias.
! Para histórico maior, use o Data Warehouse ou exporte os relatórios (Graph).""",
"Q191": """App provisioning profile :: é para apps LOB.
Device features :: AirPrint, Home screen etc.
Update policy :: instala versões; não adia notificações.""",
"Q192": """Start layout em Endpoint protection / Identity protection :: o layout do Iniciar fica em Device restrictions.
Renomear o Administrator em Device restriction / Identity protection :: fica em Endpoint protection > Local device security options.
Delivery optimization :: sem relação.""",
"Q193": """User enrollment para o Windows :: não se aplica ao Windows.
Autopilot :: reprovisiona; mais disruptivo.
ADE / Apple Configurator para iOS pessoal :: são para dispositivos corporativos (supervisão).""",
"Q194": """Compliance :: avalia, não configura.
Security baseline :: não inclui o MDMWinsOverGP.
GPO :: o objetivo é a prioridade do MDM.""",
"Q195": """User1 no Device1 :: Sim. Windows + MDM scope.
User1 no Device2 :: Não. A inscrição automática por escopo é para Windows; Android usa o Company Portal.
User2 no Device1 :: Não. Está só no escopo MAM.""",
"Q196": """Block / Warn :: nenhum perfil define esses valores.
Office executável = Disable :: os dois perfis concordam em Audit.
Win32 API = Audit :: há conflito; nenhum valor do Intune é aplicado e fica o local (Disabled).
! Conflitos aparecem no relatório do perfil como "Conflict"; resolva consolidando as regras numa política só.""",
"Q197": """Compliance policy / scope tag / assign the policy :: não fazem parte da migração de configuração.
Import ADMX :: só para templates de terceiros; os do Office já existem no Intune.
! O Group Policy analytics do Intune importa o XML da GPO e mostra o que é suportado em MDM.""",
"Q199": """Compliance / app config :: não alteram grupos locais.
! Use a ação "Remove (Update)" para tirar só o User1, sem substituir o grupo inteiro.""",
"Q200": """Wi-Fi removido :: o Autopilot Reset preserva o Wi-Fi para o dispositivo voltar à rede.
App1 reinstalado/retido :: apps do usuário são removidos; só os atribuídos pelo Intune voltam depois.
VPN mantida :: configurações pessoais são removidas.""",
"Q202": """Set-PSSessionConfiguration -AccessMode Local :: aceitaria só sessões locais.
Enable-PSRemoting -Force :: em rede pública ainda falha na checagem de perfil.
Set-NetFirewallRule ... Any :: abriria para qualquer origem.""",
"Q203": """WHfB para Research :: só Windows.
TAP :: temporário, para onboarding e recuperação.
FIDO2 para Sales :: o requisito é "pelo celular".""",
"Q204": """Data protection :: transferência de dados.
Scope :: não existe como seção de configuração da política.
Access requirements para versão / conditional launch para PIN :: invertidos.""",
"Q205": """Configuration profiles :: perfis, não o update ring.
Audit logs :: alterações administrativas.
Device compliance :: conformidade.
! Os relatórios do Windows Update for Business (Windows Autopatch reports) dão mais detalhe por dispositivo.""",
"Q206": """Purview :: compliance.
Azure Policy :: recursos do Azure.
Compliance policy / device restrictions :: não distribuem o Exploit Guard.
! Hoje: Endpoint security > ASR (Exploit protection) com o XML importado.""",
"Q207": """1 CNAME :: cada sufixo de UPN precisa do próprio registro.
TXT :: a descoberta usa CNAME, não TXT.
! Registros: EnterpriseEnrollment.<sufixo> → enterpriseenrollment-s.manage.microsoft.com (e EnterpriseRegistration → enterpriseregistration.windows.net).""",
"Q208": """Corporate identifiers :: marcam ownership.
Android/Apple/Windows enrollment :: configuram os métodos de inscrição, não restringem versões nem grupos.
! Restrições de plataforma também podem bloquear dispositivos pessoais (personally owned).""",
"Q209": """Cryptsetup / EFS :: não são os mecanismos de disco inteiro gerenciados pelo Intune.
Application Manager / Policy and Profile Manager / Intune Role Administrator :: não são o mínimo para rotacionar e consultar chaves.
! Ver chaves de recuperação do BitLocker exige a permissão "Read BitLocker keys" (Remote tasks).""",
}
