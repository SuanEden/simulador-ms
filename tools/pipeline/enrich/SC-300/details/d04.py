DET = {
"Q098": """Microsoft.App :: Container Apps.
Microsoft.Compute :: VMs e discos.
Microsoft.Security :: Defender for Cloud.
Microsoft.Management :: management groups.
! ASGs: Microsoft.Network/applicationSecurityGroups/*; Firewall: Microsoft.Network/azureFirewalls/*.""",
"Q099": """Voz :: exige linha de celular.
App password :: legado, não é MFA.
Perguntas de segurança :: só SSPR.""",
"Q100": """Session policy antes da CA :: o app só aparece no MDCA depois que o tráfego passa pelo proxy (CA com App Control + primeiro login).
Connected apps antes da CA :: o app ainda não foi roteado pelo App Control.
! Apps da galeria com SSO SAML/OIDC são onboarded automaticamente; apps customizados exigem o primeiro login para aparecer.""",
"Q101": """Custom role :: não delimita escopo de usuários por filial; quem faz isso é a AU.
Dynamic group :: não limita onde um admin atua.
OU / ADAC / AD PowerShell :: são do AD on-premises e não controlam a administração no Entra.
Purview :: compliance.
! A função License administrator pode ser atribuída com escopo de AU.""",
"Q102": """User settings :: registro de apps e acesso ao portal; não tratam de limite de dispositivos.
Access reviews :: revisão de acessos.
Security defaults :: MFA básico.
! Maximum number of devices per user vale para joined + registered; dispositivos hybrid joined não contam.""",
"Q103": """Mudar para Dynamic User/Device :: grupos role-assignable não podem ser dinâmicos, e a propriedade não muda depois.
Adicionar owner :: não torna o grupo atribuível a funções.
! Grupos role-assignable só aceitam associação atribuída, não aceitam grupos aninhados, e só Privileged Role Admin ou Global Admin os gerenciam.""",
"Q104": """Incluir litware.com no Entra Connect existente :: o Connect exige conectividade (e trust/credenciais) com a floresta; sem trust, o caminho leve é o Cloud Sync.
Staging mode :: servidor de reserva; não sincroniza.
! O Cloud Sync usa agentes leves (alta disponibilidade com vários agentes) e é gerenciado na nuvem.""",
"Q105": """1 método / com perguntas de segurança :: administradores sempre usam a política de dois métodos, sem perguntas, independentemente da configuração.
! Funções privilegiadas (User admin, Helpdesk, Password admin, Global etc.) caem na política de administrador.""",
"Q106": """Authentication method policy :: define quais métodos são permitidos, não força o registro com adiamento.
Conditional Access :: pode exigir MFA, mas não tem período de carência de registro.
MFA Server :: produto on-premises aposentado.
7 ou 28 dias :: o período fixo da política é de 14 dias.
! Registration campaigns (Authenticator) permitem adiar o registro por até 14 dias e limitar o número de adiamentos.""",
"Q107": """Leaked credentials com sign-in risk :: o vazamento afeta a identidade (user risk).
Navegador suspeito / IP anônimo com user risk :: são sinais do login específico (sign-in risk).
! Detecções offline (como leaked credentials) são calculadas depois; detecções em tempo real afetam o login atual.""",
"Q108": """Respostas sem Group1 :: Azure RBAC aceita grupos de segurança, inclusive dinâmicos.
Respostas sem App1 / VM1 :: service principals e managed identities também são principals válidos.
! Grupos M365 sem securityEnabled não aparecem como principal no RBAC.""",
"Q109": """Same access / limited access :: guests ainda veriam propriedades de outros usuários (inclusive e-mails).
Anyone / Member users can invite :: permitiriam convites por não admins.
No one can invite :: impediria também o User1.
Self-service sign-up = Yes :: guests entrariam sem convite.
! O User administrator está entre as funções que podem convidar com a opção "specific admin roles" (ao lado de Guest Inviter).""",
"Q110": """Groups blade :: não remove licenças diretas.
Set-AzureADUser :: não gerencia licença (e o módulo foi aposentado).
Identity Governance :: governança, não licenças.""",
"Q111": """**Série "Solution" (atualizar o status no Identity Secure Score):** escrita = Global, Security, Exchange ou SharePoint administrator. Security operator só lê.""",
"Q112": """**Série "Solution":** o SharePoint administrator tem escrita no Secure Score (o mesmo vale para Exchange, Security e Global administrator).""",
"Q113": """Administrative unit :: limita escopo, não define permissões.
PIM :: torna atribuições just-in-time; não cria o conjunto de permissões.
Helpdesk administrator :: inclui redefinir senhas; excede "somente".
! Se Service Support Administrator estivesse nas opções, seria a resposta (exatamente essas três tarefas).""",
"Q114": """Password protection :: senhas banidas.
Cross-tenant sync :: B2B entre tenants.
PHS :: valida o hash na nuvem.
MIM / Entra admin center / Purview :: o método de login híbrido é configurado no assistente do Entra Connect.""",
"Q116": """Log Analytics :: exigiria enviar os logs antes; mais esforço.
Audit logs :: mudanças de configuração, não falhas de login.
Provisioning logs :: provisionamento em apps (SCIM).
! No sign-in log, abra a entrada e veja Failure reason, Conditional Access e o código AADSTS.""",
"Q117": """Activity policy / anomaly detection :: alertam ou suspendem depois do evento; não bloqueiam o login em tempo real.
Unsanction :: marca o app como não autorizado (Shadow IT), mas não controla o login de usuários corporativos.
! Access policies no MDCA dependem da CA com "Use Conditional Access App Control" para o app.""",
"Q118": """SMS :: exige sinal de celular.
E-mail / perguntas :: não são MFA de login.""",
"Q119": """Impossible travel / anonymous IP / malicious IP :: são riscos de entrada.
! A mesma detecção de threat intelligence existe em versão de usuário e de entrada; nas questões, ela costuma ser a opção de "user risk".""",
"Q120": """Administrative units / Groups blade / Set-WindowsProductKey :: nenhum remove licenças diretas em massa.""",
"Q121": """User1 usa SSPR :: Sim. Está sincronizado, e o password writeback está habilitado.
User1 autenticado por DC :: Sim. PTA valida no AD on-premises.
User2 como membro no SharePoint :: Não. A OU2 não está sincronizada, então o User2 não existe no Entra.""",
"Q122": """Update-MgGroup :: altera propriedades do grupo, não licenças diretas de usuários.
Set-WindowsProductKey / Administrative units :: sem relação.""",
"Q123": """Defender / Purview :: não comparam funções administrativas.
Entra admin center :: lista as funções, mas a comparação lado a lado de funções é recurso do M365 admin center (Roles > Compare roles).""",
"Q124": """Update-MgOrganization / Update-MgDomain / Update-MgDomainFederationConfiguration :: não tratam do self-service sign-up.
Update-MgPolicyPermissionGrantPolicyExclude :: é de consentimento de apps; o gabarito do dump está errado e nenhuma opção corresponde.
! Correto hoje: Update-MgPolicyAuthorizationPolicy -AllowedToSignUpEmailBasedSubscriptions:$false -AllowEmailVerifiedUsersToJoinOrganization:$false.""",
"Q125": """FIDO2 / Windows Hello PIN :: não são métodos de SSPR.
Teams :: não existe como método.""",
"Q126": """Managed account / Automation account :: custom extensions chamam Logic Apps, não runbooks.
Playbook / workflow :: playbooks são do Sentinel; workflows são do lifecycle workflows.
! A Logic App recebe o contexto (usuário, pacote, estágio) e pode chamar sistemas externos (ex.: ServiceNow).""",
"Q127": """Só User4 / outras combinações :: os usuários com função administrativa (User administrator, Password administrator) **não** usam perguntas de segurança; os demais seguem a política.
Todos :: administradores ficam na política de dois métodos.""",
"Q128": """Authentication strengths :: combinações de métodos para o CA.
User / sign-in risk policies :: ID Protection.
! Lockout threshold (padrão 10) e lockout duration (padrão 60 s) ficam em Password protection.""",
"Q129": """Password protection / MFA registration policy / user consent :: nenhum libera a criação de políticas de CA.
! Antes de desativar os security defaults, prepare políticas de CA equivalentes (MFA para todos e para admins, bloquear legacy auth).""",
"Q132": """User1 com Certificates/Secrets Officer :: não gerenciam chaves.
User2 com Crypto/Secrets Officer :: não gerenciam certificados.
! Para apenas **ler** o certificado, Key Vault Certificate User seria ainda mais restrito.""",
"Q133": """FIDO2 / Windows Hello :: registrados em Security info (modo gerenciar) ou no próprio Windows, não no fluxo de interrupção.
Hardware token (OATH) :: é importado pelo administrador, não registrado pelo usuário no fluxo.
! No modo interrupt, o usuário registra o que as políticas exigem: Authenticator, telefone, e-mail (SSPR) etc.""",
"Q134": """Include = usuários específicos :: templates começam com All users.
Exclude = None :: o template exclui automaticamente quem cria a política, como proteção contra lockout.
! Políticas criadas a partir de template entram em report-only por padrão; revise antes de ligar.""",
}
