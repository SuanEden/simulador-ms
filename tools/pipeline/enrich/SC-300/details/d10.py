DET = {
"Q353": """User1 :: Sim. Membro do Group1, que pode solicitar.
User2 :: Não. Fora do Group1.
User3 aprova a si mesmo :: Não. Ninguém aprova a própria solicitação; outro aprovador do estágio (membro do Team1) precisa aprovar.
! Com "Users can request specific timeline", o solicitante escolhe as datas dentro do limite de 7 dias.""",
"Q354": """3, 4 ou 5 pacotes :: um pacote aceita várias políticas, cada uma com solicitantes e aprovadores próprios.
! Separe pacotes por **conjunto de recursos**, e políticas por **quem solicita e quem aprova**.""",
"Q356": """Access policy :: controla o login de usuários em apps.
App permission policy :: é o nome antigo das OAuth policies; a resposta canônica é OAuth app policy.
Endpoint protection :: Intune/Defender for Endpoint.""",
"Q357": """IP público :: o IMDS não é exposto externamente.
127.0.0.1 :: localhost não é o endpoint do IMDS.
IP privado da VM :: não atende requisições de token.
! Exemplo: curl -H "Metadata:true" "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://management.azure.com/".""",
"Q358": """Voz / SMS / e-mail OTP :: phishable.
CBA de fator único :: não conta como MFA.
Microsoft Authenticator (push) :: não é resistente a phishing (a passkey no Authenticator é, mas a opção se refere ao push).
! Use a authentication strength built-in "Phishing-resistant MFA" na política de CA para admins.""",
"Q361": """Seamless SSO :: só evita digitar a senha; não aplica bloqueio.
Cloud Sync / PHS :: a validação na nuvem usa o smart lockout do Entra, não a política do AD.
! Configure o smart lockout do Entra com limite **menor** que o do AD para evitar que ataques bloqueiem contas no AD.""",
"Q365": """HTML / RTF / DOCX :: não são aceitos; só PDF.
! É possível enviar versões em vários idiomas (um PDF por idioma).""",
"Q366": """Access package :: termos podem ser exigidos no pacote, mas para todo login a resposta é o CA.
Lifecycle workflow / authentication method :: não exibem termos.""",
"Q368": """User1 (Global Admin) :: não tem permissão de atributos de segurança por padrão.
User3 :: pela tabela, não tem Attribute Definition Administrator.
Grupos :: não suportam custom security attributes.
! Funções: Attribute Definition Administrator/Reader (definições) e Attribute Assignment Administrator/Reader (valores).""",
"Q369": """Grupos :: a cross-tenant sync provisiona apenas usuários (B2B members).
! Use grupos no escopo para escolher usuários; a associação aos grupos não é replicada no destino.""",
"Q370": """New-MgUser :: cria membro com senha no seu tenant.
External collaboration :: não cria o convidado.
Entra Connect :: sincroniza o seu AD, não usuários de outra organização.""",
"Q372": """Notificação do app :: exige 2 métodos para ser oferecida.
FIDO2 / Teams :: não são métodos de SSPR.""",
"Q374": """User1 lê segredos do Vault1 :: Não. Reader não lê conteúdo, e o Secrets User dele está no RG2.
User2 lê o Vault2 :: Sim. Tem Secrets User no RG2.
User3 atualiza a VM1 :: Sim. É Owner do RG1.""",
"Q375": """User2 em VM1 / VM2 :: pela tabela, tem só Virtual Machine Contributor (gerencia, não faz login).
User3 na VM2 :: a função dele está só no escopo da VM1.
! O login exige a extensão AADLoginForWindows na VM e o cliente RDP com a opção de "Web account" ou dispositivo joined/registered.""",
"Q377": """App protection policy :: Intune MAM.
Remote network :: para filiais sem cliente GSA; não define o bloqueio.
Ordem :: política de filtro → security profile (com prioridade) → CA que aplica o profile aos usuários.""",
"Q378": """Remote networks :: conectam filiais.
Security profiles :: Internet Access (filtragem).
Connectors :: são os conectores do Private Access, mas o perfil é habilitado em Traffic forwarding.
! Depois, publique o App1 em Enterprise applications (Global Secure Access app) ou use o Quick Access.""",
"Q379": """User1 (Reader) :: não lê dados e não lista chaves.
User2 no File2 :: Blob Data Reader não cobre Azure Files.
! Desabilitar Shared Key (allowSharedKeyAccess = false) cortaria o acesso do User3 via chave.""",
"Q380": """Excluir registros de dispositivo :: não resolve a falta de conectividade.
Revogar o PRT :: piora a situação.
OpenSSH :: para Linux / az ssh.
! Endpoints exigidos: login.microsoftonline.com, enterpriseregistration.windows.net, device.login.microsoftonline.com, pas.windows.net.""",
"Q383": """User1 (Local User Login) :: Não. Essa função não existe para login com conta Entra; o login exige VM User/Administrator Login.
User2 :: Sim. Virtual Machine User Login no RG1.
User3 (VM Contributor) :: Não. Gerencia, mas não faz login.""",
"Q385": """Vault1 / VM1 / App1 :: as condições ABAC não são suportadas nesses serviços (só Blob e Queue).""",
"Q386": """Managed identity :: não funciona entre tenants (é do tenant de origem e só para recursos do Azure).
User account / OTP :: não são credenciais de aplicativo.
! Prefira certificados (ou federated identity credentials) a segredos.""",
"Q387": """Certificado :: precisa de gestão e rotação.
SAS :: é de Storage, não de SQL.
Usuário do Entra :: exige senha/MFA, o que não é próprio de VMs.
! No SQL MI: CREATE USER [nome-da-identidade] FROM EXTERNAL PROVIDER.""",
"Q389": """User3 revisa o User1 / User4 :: Não. São membros (não guests), fora do escopo "Guest users only".
User3 revisa o User5 :: Sim. Guest indireto (via Group2) e o User3 é dono do Group1.
! Membros indiretos aparecem na revisão, mas a remoção só ocorre em membros diretos.""",
"Q391": """**Por que todos são Sim:** o owner revisor (User1) vê todos os membros no escopo All users: ele mesmo, o service principal (Managed2) e o membro indireto (User3).
! Revisores podem revisar o próprio acesso se forem membros; configure "Prevent reviewers from reviewing their own access" se necessário.""",
"Q394": """Intune Connector for AD :: só para Autopilot hybrid join (dispositivos novos).
Provisioning agent :: é do Cloud Sync, que não configura hybrid join de computadores.
Autopilot device preparation :: não se aplica a máquinas já no domínio.
WIP scope :: Windows Information Protection, aposentado.
! A inscrição automática também exige a GPO "Enable automatic MDM enrollment using default Azure AD credentials".""",
"Q396": """Usage location :: licenciamento.
Session management do GSA :: sem relação.
Conditional Access :: não altera o idioma da página.
! Crie uma customização por idioma (es-ES) em Company branding > Customize > Add language.""",
"Q397": """Device1 / Device3 (Windows só registrados) :: o cliente GSA para Windows exige joined ou hybrid joined.
Todos :: o tipo de vínculo e o SO importam.
! Clientes GSA existem para Windows, macOS, Android e iOS, cada um com seus requisitos.""",
"Q398": """Tagging de tenant restrictions :: outro recurso do GSA (bloquear tenants externos).
Named location :: o "compliant network" é uma condição própria, que depende do signaling.
Remote network :: conecta filiais sem cliente.""",
"Q399": """Dispositivos registrados :: o cliente GSA para Windows não suporta só registro.
! O dispositivo também precisa do cliente instalado e do usuário com licença Entra Internet/Private Access.""",
"Q401": """User3 (Privileged Role Administrator) :: atribui funções, mas não administra o GSA.
Só User1 :: o Global Secure Access Administrator (User2) também gerencia.""",
"Q402": """Cloud discovery :: identifica apps não gerenciados; não habilita sessão.
OAuth app policy :: governa apps OAuth.
Traffic forwarding profile :: é do GSA, não do MDCA.
! Depois do SSO: CA com "Use Conditional Access App Control" → session policies no MDCA.""",
"Q403": """Funções RBAC :: são do Azure, não do Graph.
Delegated :: exigem um usuário logado.
! Para ler sign-ins: AuditLog.Read.All + Directory.Read.All (application), com admin consent.""",
"Q404": """Event Hub :: streaming para SIEMs externos.
SQL Database :: não é destino de diagnostic settings.
Storage :: arquivamento, sem KQL.""",
"Q407": """User1 lê blob2 :: Não. A leitura é limitada ao container cont1.
User1 lê blob3 :: Sim. Está num container chamado cont1 (no storage2).
User2 lê blob1 :: Sim. A condição dele restringe só a escrita.
! Condições avaliam o nome do container independentemente da conta, se o escopo da atribuição cobrir as duas.""",
"Q408": """User1 (Global) altera o Secure1 :: Não. Precisa de Attribute Definition Administrator.
User2 vê os valores do Secure2 :: Não. Attribute Definition Administrator não lê valores, e ainda está restrito ao Set1.
User3 vê o Secure3 :: Sim. É Attribute Assignment Administrator no tenant.""",
"Q409": """Privileged Role / External IdP / Security Administrator :: não gerenciam access packages.
! Alternativas de menor escopo: Catalog owner ou Access package manager do catálogo do Package1.""",
"Q411": """Named location / adaptive access / NSG :: não filtram URLs por palavra.
! A filtragem por FQDN ou categoria é feita na web content filtering policy; palavras em URL exigem regra por FQDN/URL conforme os recursos suportados.""",
"Q412": """Só Group2 :: regra antiga dos "privileged access groups" (exigia role-assignable).
! Hoje o PIM for Groups aceita grupos de segurança e Microsoft 365 com associação atribuída (não dinâmicos nem sincronizados). Confira os tipos na tabela da questão.""",
"Q413": """User1 / User3 :: membros não fazem a autorrevisão num escopo "Guest users only".
User2 no Group3 :: grupos dinâmicos não entram na revisão (a associação é definida pela regra).""",
}
