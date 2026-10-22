DET = {
"Q001": """Group3 / Group4 / Group5 :: pela tabela, são grupos de dispositivos, distribuição ou M365 sem securityEnabled, que não aceitam licenciamento por grupo.
Todos os grupos :: grupos com associação de dispositivos não consomem licença de usuário.
! Licenciamento por grupo exige Entra ID P1 (ou E3/A3/Business Premium) no tenant.""",
"Q002": """Set-MsolDomainFederationSettings / Update-MsolFederatedDomain :: tratam de federação (AD FS), não de sign-up.
Set-MsolDomain :: altera propriedades do domínio, não a política de sign-up.
! Hoje: Update-MgPolicyAuthorizationPolicy -AllowEmailVerifiedUsersToJoinOrganization:$false e -AllowedToSignUpEmailBasedSubscriptions:$false.""",
"Q003": """User1 (já guest) :: quem já resgatou o convite usa o método existente.
User3 / outros :: contas com Entra ID, Microsoft account ou federação (SAML/Google) não recebem OTP.
! O OTP é o fallback para convidados sem nenhum provedor de identidade; os códigos valem por 30 minutos.""",
"Q004": """Identity Governance :: access reviews e entitlement; não remove licenças.
Set-AzureADUser :: altera propriedades do usuário, não licenças (e o módulo foi aposentado).
Set-WindowsProductKey :: chave do Windows; não tem relação.
! Em Licenses > All products > Office 365 E3 > Licensed users, selecione todos e remova a licença em massa.""",
"Q005": """User1 (outlook.com) :: Sim. Está na allow list.
User2 :: Sim. O convite foi resgatado antes da restrição; mudar a allow list não remove acessos existentes.
User3 :: Não. O domínio não está permitido, e o convite falha.
! A allow/deny list vale para **novos convites**; revise contas existentes com access reviews.""",
"Q006": """username / password :: o convidado usa a própria identidade; não se definem credenciais.
shared key :: não existe no B2B.
! Colunas opcionais: mensagem do convite, envio do e-mail (TRUE/FALSE) e CC.""",
"Q007": """User1 :: sem caixa de correio (sem licença), não é destinatário do Exchange.
Group1 / Group2 :: grupos de segurança comuns ou M365 não podem ser membros de um mail-enabled security group pelo Entra.
! Mail-enabled security groups e listas de distribuição são gerenciados no Exchange admin center.""",
"Q008": """Adicionar ou remover o domínio no admin center :: no takeover interno, o próprio fluxo "Become the admin" pede o TXT; não se adiciona o domínio antes.
! O takeover **externo** (domínio movido para outro tenant gerenciado) é feito adicionando o domínio no seu tenant e verificando o TXT.""",
"Q009": """GroupA (segurança) com Group4 :: Group4 é M365; grupos M365 não podem ser aninhados em grupos de segurança.
GroupB (M365) com grupos :: grupos Microsoft 365 só aceitam usuários.
! Grupos de segurança aceitam usuários, dispositivos, service principals e outros grupos de segurança.""",
"Q010": """**Série "Solution" (bloquear na hora o usuário desabilitado no AD):** só **pass-through authentication** (ou federação) atende. Password writeback, Conditional Access e Password Protection não atendem.
! Com PHS, a mudança de estado chega no próximo ciclo de sync (30 min); com PTA, o DC valida em tempo real.""",
"Q011": """**Série "Solution":** PTA valida a senha e o estado da conta no AD on-premises a cada login. Contas desabilitadas, expiradas ou bloqueadas falham imediatamente.""",
"Q012": """**Série "Solution":** Conditional Access avalia sinais da nuvem; não sabe que a conta foi desabilitada no AD até o sync.""",
"Q013": """0 :: os membros diretos do Group1 consomem licença.
3 ou 4 :: membros de grupos aninhados não herdam; a contagem é só de usuários diretos (pela tabela, 2).
! Dispositivos membros também não consomem licença.""",
"Q014": """New-AzADUser :: cria usuário **membro** com credencial do seu tenant.
External collaboration settings :: controlam quem pode convidar, mas sozinhos não criam o acesso.
WS-Fed IdP :: só é necessário se o parceiro usar federação WS-Fed; a fabrikam.com pode usar Entra ID.
! Depois do convite, atribua o guest ao App1 (Users and groups do enterprise app).""",
"Q015": """Regra inbound no conector do Entra ID :: atua no fluxo nuvem → metaverso, não filtra objetos do AD.
Full Import / Export run profile :: são execuções do ciclo, não filtros.
! Na regra: Precedence menor que as padrão, Scoping filter extensionAttribute15 EQUAL NoSync, Transformation cloudFiltered = True.""",
"Q016": """User2 entra :: Não. Com PTA, usuários sincronizados precisam do agente on-premises alcançável.
Só User1 :: guests (User3) autenticam no tenant de origem e não dependem do seu AD.
! Configure PHS como backup; a troca para PHS é manual (mudar o método de login), não automática.""",
"Q017": """**Série "Solution":** o Password Protection bane senhas fracas; não controla o estado da conta.""",
"Q018": """User1 :: Sim. Membro direto do grupo de filtro e dentro da OU selecionada.
User2 :: Não. Membro só de grupo aninhado, e a filtragem por grupo não é recursiva.
Group2 :: Sim. É membro direto do grupo de filtro (o objeto grupo sincroniza; os membros dele, não).
! A filtragem por grupo é recomendada só para pilotos; em produção, use filtragem por domínio/OU ou por atributo.""",
"Q019": """User flow :: define o fluxo de cadastro, não a cobrança.
Terms of use :: termos de aceite.
Access review :: governança de acesso.
! O vínculo é feito em External Identities > Linked subscriptions; as primeiras 50.000 MAU são gratuitas.""",
"Q020": """Excluir contoso.onmicrosoft.com :: o domínio inicial não pode ser removido.
! A propagação do TXT pode levar até 72 h. Depois de verificado, defina o domínio como padrão em Domain names.""",
"Q021": """Mais 4 dispositivos :: Não. O limite (5) soma joined + registered; ele tem 4, e cabe 1.
Admin1 (Cloud Device Admin) mudar a exigência de MFA :: Não. Device settings exige Global Admin (ou função com permissão nas configurações de dispositivo).
Admin2 admin local no Device3 :: Não. Os administradores locais adicionais valem só em dispositivos **Entra joined**.
! A configuração "Require MFA to join" foi substituída por uma ação de usuário no Conditional Access (Register or join devices).""",
"Q022": """User1 em outro portal :: funções do Entra (inclusive Identity Governance Administrator) são atribuídas no Entra admin center.
User2 no Entra :: Records Management e Quarantine Administrator são role groups do Exchange/Purview.
User3 no Entra :: funções do Intune (RBAC do Intune) são atribuídas no Intune admin center.""",
"Q023": """DCs (Server1/Server2) :: a política proíbe DC com acesso à internet.
Server3 :: pela tabela, não atende os requisitos (ex.: sem saída para a internet ou com softwares não exigidos).
! Recomendação: três agentes PTA no total, em servidores membro Windows Server 2016+ com saída na 443.""",
"Q024": """External collaboration settings :: não criam o convidado.
WS-Fed IdP :: não é necessário para uma conta Entra/Microsoft.
Entra Connect :: sincroniza o **seu** AD; não traz contas de outra organização.
! Equivalente atual: New-MgInvitation -InvitedUserEmailAddress contractor@fabrikam.com -InviteRedirectUrl https://myapps.microsoft.com.""",
"Q025": """Administrative units :: delimitam escopo de administração; não removem licenças.
Set-AzureADUser :: não gerencia licenças.
Groups blade :: as licenças E3 são diretas, e o blade de grupos não remove licenças diretas.
! Hoje: Get-MgUser -All | ForEach-Object { Set-MgUserLicense -UserId $_.Id -RemoveLicenses @($skuE3) -AddLicenses @() }.""",
"Q026": """Linked subscription :: é sobre cobrança MAU.
PIM :: acesso privilegiado.
External collaboration settings :: controlam convites, não o método OTP de cadastro (o OTP é habilitado em All identity providers).
Access reviews / access package / tenant properties :: não definem os campos do cadastro.
! O user flow também é associado ao app (Applications no user flow) para disparar o cadastro.""",
"Q027": """identityIssuer / userType :: não são colunas obrigatórias do modelo.
givenName / surname :: opcionais.
usageLocation :: opcional no CSV (necessário só para licenças).
! O CSV do portal pede: Name, User name, Initial password e Block sign in (Yes/No).""",
"Q028": """Sign-in options do Settings :: configuram Windows Hello/PIN, não o SSO.
Enterprise State Roaming :: sincroniza configurações, não autenticação.
Authentication Agent :: é do PTA, não do Seamless SSO.
! A GPO usada é "Site to Zone Assignment List" com https://autologon.microsoftazuread-sso.com = 1 (Intranet).""",
"Q030": """Job title do User1 (sincronizado) :: o AD on-premises é a fonte de autoridade.
Usage location só para alguns :: é atributo de nuvem e pode ser editado em todos, inclusive convidados.
! Em usuários sincronizados, o Entra mostra o campo desabilitado com a nota "source of authority: Windows Server AD".""",
"Q031": """Groups administrator / Service support administrator :: não delegam a criação de catálogos.
Funções do General catalog :: dão papéis só naquele catálogo, não a criação de novos.
! Catalog creator pode criar catálogos e adicionar recursos que ele já possui (grupos, apps, sites).""",
"Q032": """Sign-in options / Enterprise State Roaming / Authentication Agent :: nenhum deles adiciona a URL à zona Intranet.
! O Seamless SSO exige Kerberos: o dispositivo precisa estar no domínio e alcançar um DC.""",
}
