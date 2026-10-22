DET = {
"Q203": """Global administrator :: funciona nos dois casos, mas viola o menor privilégio.
Security administrator :: não atribui funções.
User Access Administrator para funções do Entra / Privileged role administrator para funções do Azure :: cada um vale para um sistema (Azure RBAC ≠ funções do diretório).""",
"Q204": """"Guest"/"Member" no objectId :: objectId é um GUID; a comparação com null é o que serve de "todos os objetos".
userType "Guest" :: incluiria só convidados.
! O padrão "(user.objectId -ne null)" é usado para criar grupos "todos os usuários".""",
"Q205": """Registrar no SSPR primeiro :: a remediação da política de risco usa MFA + troca de senha; o pré-requisito é o registro de MFA.
Consentimento de apps :: sem relação.
Sign-in risk policy :: trata do risco do login, não da identidade comprometida.
Password Protection :: senhas banidas, não comprometimento.""",
"Q206": """IP privado :: o Entra nunca vê IPs privados de origem.
Trusted IPs (público ou privado) :: recurso do MFA por usuário legado; o caminho atual é named location em CA.
! Marque a named location como "trusted" para usá-la em "All trusted locations" e no ID Protection.""",
"Q207": """Authentication method policy :: define métodos, não exige o MFA.
MFA registration policy :: o gabarito desta variante prefere o CA (requisito de "via Conditional Access"); compare com a Q106.
MFA Server :: aposentado.
7 ou 28 dias :: o adiamento de registro é de 14 dias.""",
"Q208": """Policy set / app configuration policy do Intune :: tratam de dispositivos e apps móveis.
Application Proxy :: o App1 não é on-premises.
! No registro: redirect URI, tipo de conta suportado, segredo/certificado e permissões do Graph.""",
"Q209": """Cloud App Security policies :: o MDCA não publica apps on-premises; o App Proxy sim (e daí o CA aplica MFA).
User consent settings :: consentimento a apps, não restrição de sessão.
Publicar o SharePoint pelo App Proxy :: o SharePoint Online já está na nuvem.
! App-enforced restrictions exigem configurar também o SharePoint (Unmanaged devices = limited, web-only).""",
"Q210": """Consent settings :: tratam de consentimento, não de registro.
Application / Cloud application administrator :: mais amplos que o necessário para só registrar.""",
"Q211": """Proxy em DC1 :: o proxy não deve rodar em DC (DCs sem internet).
Proxy no SERVER1 :: conflita com o conector do Application Proxy (Agent Updater incompatível).
Lista em DC1/servidores :: a lista customizada é gerenciada no Entra e baixada pelos agentes.""",
"Q212": """Company branding / External Identities / App registrations :: não enviam logs.
! Inclua AuditLogs e SignInLogs; a retenção passa a ser a do workspace.""",
"Q213": """Access review :: revisa acessos existentes.
CA :: não concede acesso nem tem fluxo de aprovação.
Accepted domain / custom domain :: conceitos de Exchange/Entra para domínios próprios, não de parceiros.
! A organização conectada permite que usuários da Fabrikam solicitem o pacote mesmo sem conta guest prévia.""",
"Q214": """Access review :: revisa atribuições; não exige justificativa na ativação.
Administrative unit :: delimita escopo.
Active assignments :: não passam por ativação.""",
"Q215": """Ticket information :: não é requisito do caso.
Expire eligible assignments :: não é o pedido aqui.
Active :: com atribuições ativas não há ativação, então não há justificativa.""",
"Q218": """Workbook :: visualiza, mas não detecta.
Data connectors :: já existem.
Playbook :: resposta automatizada.
! Fusion é habilitado por padrão; ajuste as fontes e os cenários na regra "Advanced Multistage Attack Detection".""",
"Q219": """User consent / admin consent settings :: tratam de consentimento.
Program :: conceito antigo de access reviews.
! O catálogo agrupa recursos (grupos, apps, sites) e define quem pode criar pacotes (catalog owners/access package managers).""",
"Q220": """User monitoring / App onboarding / continuous report :: não são pré-requisito da session policy; o roteamento pelo App Control vem do CA.""",
"Q221": """Admin3 (Security administrator) :: não pode aprovar consentimento.
User1 (owner) :: ser owner do enterprise app não dá direito de conceder admin consent tenant-wide.
Só Admin1 :: o Admin2 também tem função elegível pela tabela.""",
"Q222": """Session policy :: controla ações em tempo real, não conta volume.
File policy :: analisa arquivos (conteúdo, compartilhamento).
Anomaly detection :: detecções embutidas por ML (ex.: mass download), sem o limite exato configurável.
! Na activity policy, use "Repeated activity" com o mínimo de 50 em 1 minuto.""",
"Q223": """Activity policy :: alerta depois do fato.
Access policy :: permite ou bloqueia a entrada no app, não ações dentro da sessão.
File policy :: governa arquivos armazenados, não a impressão no navegador.""",
"Q224": """OAuth app policy :: avalia apps conectados por OAuth.
Anomaly detection / activity policy :: alertam; não bloqueiam o login em tempo real.
! A alternativa nativa é uma política de CA com user risk = High → Block.""",
"Q225": """Anomaly detection :: detecções embutidas, sem filtro de permissões nem contagem.
Access / activity policy :: não avaliam permissões de apps OAuth.
! Hoje as políticas de OAuth estão em app governance (Defender XDR).""",
"Q226": """User1 / User3 / User4 :: as permissões dos apps deles são delegadas (agem só no próprio calendário) ou não incluem calendário.
! Permissões de aplicação permitem acessar dados de todos os usuários; restrinja com Application Access Policy do Exchange (RBAC for Applications).""",
"Q227": """15 / 90 / 180 dias :: o período de soft delete de usuários é de 30 dias.
Network / Domain name / Helpdesk administrator :: não restauram usuários.
! Depois de restaurado, o usuário volta com grupos, licenças e atributos.""",
"Q228": """Managed identity em grupos dinâmicos, sincronizados ou M365 :: só grupos de segurança atribuídos de nuvem aceitam service principals.
Usuário de nuvem no Group3 (dinâmico) / Group4 (sincronizado) :: não se adicionam membros manuais nesses grupos.""",
"Q229": """Dynamic User / Dynamic Device :: grupos role-assignable não aceitam associação dinâmica.
! A opção "Microsoft Entra roles can be assigned to the group" só aparece na criação e exige P1.""",
"Q230": """Audit logs para IPs :: os IPs e locais estão nos sign-in logs.
Sign-in logs para mudanças :: alterações em objetos ficam nos audit logs.
Secure Score para mudanças :: o score avalia a configuração, não registra eventos.""",
"Q231": """14 / 60 / 180 dias :: apps excluídos ficam 30 dias em Deleted applications.
! Para restaurar, use App registrations > Deleted applications ou Restore-MgDirectoryDeletedItem.""",
"Q232": """Identity Protection / Identity Governance / Endpoint Manager :: não monitoram permissões de apps OAuth.
App discovery / app protection / CA / risk :: não avaliam permissões concedidas a apps.
! Filtre por permissão Mail.ReadWrite e nível alto; a ação pode revogar o app automaticamente.""",
"Q233": """Authentication methods :: tratam de MFA.
Access packages :: concedem acesso a recursos.
Application proxy :: publicação de apps.
! Combine "Do not allow user consent" com o admin consent workflow para não travar os usuários.""",
"Q234": """Combinações só com o User4 :: pela tabela do caso, o User4 não tem função no catálogo nem de Identity Governance.
! Quem cria revisões de access packages: Global, Identity Governance administrator, catalog owner e access package manager.""",
"Q235": """CAE :: revoga sessões em tempo quase real.
CA :: não controla quem pode convidar.
Access reviews settings :: governança de revisões.""",
"Q236": """Require justification / ticket :: o caso pede limite de tempo e solicitação, não justificativa ou ticket.
Set Active :: elimina a solicitação (não há ativação).
! "Expire eligible assignments after" aceita 15 dias, 1, 3, 6 meses ou 1 ano.""",
"Q237": """Collection / access review / access package :: não restringem o tipo de permissão consentida.
! Permissões classificadas como "Low" (ex.: User.Read, openid, profile, email) entram no consentimento do usuário.""",
"Q238": """Application Administrator :: também dá acesso, mas inclui o Application Proxy; não é o menor.
Application Developer :: não acessa o app governance.
M365 admin center / MDCA / Purview :: o dashboard fica no portal do Microsoft Defender (security.microsoft.com).""",
"Q239": """OAuth 2.0 :: autorização/SSO, não provisionamento.
WS-Fed :: SSO federado.
LDAP 3 :: protocolo de diretório on-premises.
! O provisionamento usa um enterprise app com Provisioning = Automatic, URL do tenant SCIM e token secreto.""",
"Q240": """Identity Governance Administrator :: gerencia revisões de grupos e apps, não de funções do Entra.
User administrator :: não gerencia funções privilegiadas.
User Access Administrator :: é do Azure RBAC.""",
}
