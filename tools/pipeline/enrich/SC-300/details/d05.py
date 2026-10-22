DET = {
"Q135": """Cross-tenant access settings :: controlam a confiança e o B2B **com outros tenants Entra** específicos, não os convites em geral.
All identity providers :: provedores (Google, SAML, OTP).
User flows / custom attributes / API connectors :: self-service sign-up.
Terms of use / access reviews :: governança.
! B2B collaboration tem duas camadas: External collaboration settings (convites) e cross-tenant access (inbound/outbound).""",
"Q136": """Métodos de autenticação :: o guest autentica no tenant de origem.
Reset de senha :: o guest não tem senha no seu tenant.
Revogar sessões :: não troca a identidade de login.
! O reset de redemption pode ser feito pelo portal ou pela API de convite (resetRedemption = true).""",
"Q137": """All identity providers :: define como o guest autentica, não quais domínios podem ser convidados.
Cross-tenant access settings :: controlam organizações Entra específicas (inbound/outbound), não uma lista simples de domínios para convite.
Linked subscriptions :: cobrança.
! A allow list e a deny list são mutuamente exclusivas; vale uma ou outra.""",
"Q138": """External collaboration settings :: convites.
Access package :: concede acesso; a revisão periódica de membros existentes é feita por access review.
Expiration policy :: expira o grupo, não revisa os convidados.
! Na revisão: escopo "Guest users only", revisor "Group owner(s)", recorrência trimestral, auto-apply e ação para quem não responder.""",
"Q139": """Admin1 redefine senha de User3/User4 :: Não. Estão fora da AU.
Admin1 adiciona User1 ao Group3 :: Não. O Group3 não está na AU.
Admin3 redefine senha do User1 :: Sim. Escopo no tenant inteiro.""",
"Q140": """Adicionar o User1 ao Group1 :: Sim. Grupos de nuvem aceitam usuários sincronizados como membros.
User2 entra no Server1 :: Sim. Desabilitar no Entra não afeta o AD.
User3 entra no M365 :: Não. A conta está desabilitada no AD, que é a fonte de autoridade, e a federação valida no AD.
! O próximo ciclo de sync reescreve o accountEnabled no Entra com o valor do AD.""",
"Q143": """1 atribuição :: nenhuma função única dá "ler tudo + reiniciar VMs" na assinatura **e** "criar só no RG1".
3 ou 4 :: dá para combinar tudo em duas atribuições (uma por escopo).
! Funções podem ser customizadas com várias ações; o escopo é que obriga a separar.""",
"Q144": """Guest invite settings :: definem **quem** pode convidar, não quais domínios.
Verifiable credentials :: identidade descentralizada.
Named locations :: condição de CA.
! Se adatum.com estiver bloqueado também em cross-tenant access (inbound), ajuste lá também.""",
"Q145": """60 / 90 / 180 dias :: o gabarito considera 30 dias para a atividade de usuários de risco (sem exportação).
! Para retenção maior, envie RiskyUsers e UserRiskEvents a um workspace via diagnostic settings.""",
"Q146": """Notifications :: avisos de reset para usuários e admins.
Properties :: habilita o SSPR (None/Selected/All).
Registration :: exige registro e define o reconfirmar.
AD FS / PTA / PHS :: não gravam a senha no AD; só o writeback grava.
! A notificação do app só fica disponível quando "Number of methods required to reset" é 2; com 1, apenas o código do app é aceito.""",
"Q147": """Application Insights :: monitora apps seus.
Access reviews :: revisa acessos.
Enterprise applications :: lista apps integrados ao Entra, não Shadow IT.
! Use snapshot reports (upload manual) ou o log collector (Docker) para análise contínua.""",
"Q148": """Password Protection DC agent / proxy :: senhas banidas.
Web Application Proxy (Windows) :: é do AD FS, não do Entra App Proxy.
Entrada HTTPS / IPsec :: o conector não precisa de portas de entrada.
! O conector precisa alcançar o App1 (interno) e *.msappproxy.net na 443 de saída. Instale 2 ou mais conectores para alta disponibilidade.""",
"Q149": """Admin2 (Application developer) atribuir ao App1 :: ele só gerencia apps de que é owner.
User1 atribuir :: usuário comum não atribui.
Registrar só admins :: com "Users can register applications = Yes" (padrão), qualquer membro registra.
! Considere desabilitar "Users can register applications" e usar a função Application developer.""",
"Q150": """Homepage para atribuídos / owners / ninguém :: com assignment required = No, qualquer usuário do tenant acessa.
Launcher para todos / ninguém / owners :: com Visible = Yes, o app aparece no My Apps só para usuários atribuídos.
! Para mostrar a todos no My Apps, atribua um grupo grande (ex.: All users dinâmico).""",
"Q151": """Configurar SSO :: o SSO já está configurado; o problema é a atribuição.
Assignment required = No :: liberaria o acesso, mas os usuários ainda não veriam o app no My Apps sem atribuição.
Permissões de consentimento :: sem relação com a visibilidade.
! Coleções só organizam apps já visíveis ao usuário; não concedem acesso.""",
"Q152": """Managed Application Contributor / App Configuration Data Owner :: são funções do Azure RBAC, não do diretório.
Cloud application administrator :: registra, mas é mais amplo (gerencia todos os apps).
! O Application developer vira owner dos apps que cria, e só deles.""",
"Q153": """Group3 sem aprovação :: Não. Membros de grupo aninhado não herdam a atribuição do app.
User1 vira owner do Group1 :: Não. O self-service pode usar o grupo, mas não muda os donos.
App1 no launcher do User4 :: Não. Visible to users = No.
! O self-service application access está sendo substituído por access packages (entitlement management).""",
"Q154": """Access reviews :: governança, não risco.
Password Protection :: senhas banidas.
SSPR :: é a remediação de risco de **usuário** (troca de senha), não de entrada.
! Combine com uma política de registro de MFA (ou registration campaign) para todos estarem prontos.""",
"Q155": """App registration :: é para apps que você desenvolve; app da galeria entra como enterprise app.
Application Proxy :: publica apps on-premises; o Service1 é SaaS.
Managed identity :: identidade de recursos do Azure.
Compliance policy :: avalia o dispositivo, mas quem bloqueia é o CA.
OAuth policy :: governança de apps no MDCA.""",
"Q156": """Provisioning :: cria contas no app (SCIM).
Application proxy :: publicação on-premises.
Roles and administrators :: funções de gestão do app.
! No self-service, defina se exige aprovação, os aprovadores e o grupo para onde vão os aprovados.""",
"Q157": """Group claim :: emite grupos no token; não dá acesso ao Graph.
Delegated permissions :: exigem um usuário logado; o web service lê sem usuário (application permission).
! Permissões de aplicação sempre exigem admin consent; o app usa o client credentials flow.""",
"Q158": """Tags / naming policies / dynamic groups :: não organizam o My Apps em seções.
! Coleções são criadas em Enterprise applications > App launchers (ou pelo próprio usuário no My Apps).""",
"Q159": """Group2 (distribuição) :: grupos sem segurança não são atribuíveis a apps.
Group4 :: o gabarito considera mail-enabled security group não elegível (comportamento discutido).
! Grupos aninhados não herdam a atribuição de app; atribua o grupo que contém os usuários diretamente.""",
"Q160": """User1 :: o consentimento de usuário está desabilitado.
User2 / Admin2 :: como revisores, só podem aprovar se tiverem função de Global, Cloud application ou Application administrator; sem a função, apenas revisam ou bloqueiam.
! O admin consent workflow notifica os revisores por e-mail; as solicitações expiram conforme configurado (padrão 30 dias).""",
"Q162": """Access policy do MDCA :: controla a sessão; não exibe os termos do Entra.
Terms and conditions do Intune :: são aceitos no Company Portal (registro do dispositivo), não no acesso a apps.
Compliance policy :: avalia dispositivos.
! A política pode exigir aceite por dispositivo e expiração periódica.""",
"Q163": """Group3 (dispositivos) :: access reviews revisam pessoas, não dispositivos.
Combinações sem grupos M365 ou dinâmicos :: os dois tipos são suportados.
! Access reviews exigem licença Entra ID P2 (ou Entra ID Governance) para os revisores e os revisados.""",
"Q164": """User1 (owner) :: com Members (self), o owner não revisa os outros.
User2 :: cada membro revisa só a si mesmo.
! Outras opções de revisor: Group owner(s), usuários ou grupos específicos e Managers (com fallback).""",
"Q165": """MFA a cada 15 dias ou 1 mês :: o MFA é pedido a cada ativação, e a ativação dura no máximo 8 h.
Só Global / só Privileged Role / User admin permanente :: sem aprovadores definidos, o padrão é Global Administrator **ou** Privileged Role Administrator.""",
"Q166": """Device1 em 20/11 :: Sim. Ainda não aceitou nesse dispositivo.
Device2 em 11/12 :: Sim. Registra o dispositivo e aceita.
Device3 em 7/12 :: Não. Já aceitou em 15/11, e a expiração só começa em 10/12.
! "Require users to consent on every device" exige que o dispositivo seja registrado ou joined no Entra; alguns clientes não suportam.""",
"Q167": """Expirar atribuições elegíveis / ativas :: mantém o modelo de acesso permanente até expirar.
Active :: é o estado atual, que é o problema.
! Ao converter para Eligible, configure também MFA na ativação, justificativa e duração máxima.""",
"Q168": """Access package (dentro ou fora do diretório) :: concede acesso; o requisito é revisar periodicamente o acesso existente.
Revisão baseada em aplicação :: o acesso ao EAC vem de uma função ou grupo, não de atribuição de app.
! Com auto-apply e "If reviewers don't respond = Remove access", o acesso é bloqueado automaticamente.""",
}
