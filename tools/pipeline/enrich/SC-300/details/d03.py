DET = {
"Q066": """User1 de 10.10.0.150 :: Não. A named location com IP privado nunca casa (o Entra vê o IP público de NAT), então a CA não se aplica e ele não tem MFA por usuário.
User2 da Location1 :: Sim. O IP público não é confiável, e o MFA por usuário está imposto.
User2 da Location2 :: Não. O IP 193.17.17.x está nos trusted IPs do MFA, que dispensam o MFA por usuário.
! Named locations usam sempre IPs **públicos**. "All trusted locations" inclui os trusted IPs do MFA legado e as named locations marcadas como confiáveis.""",
"Q067": """Guest1 (conta Entra) / Guest2 (Microsoft account) :: autenticam com a própria conta.
60 min / 24 h / 48 h :: o código vale 30 minutos.
! Se o OTP estiver desabilitado, convidados sem conta são orientados a criar uma Microsoft account.""",
"Q068": """Global administrator para o User1 :: funciona, mas viola o menor privilégio.
Global reader para o User2 :: também lê, mas o gabarito considera Security reader (que lê relatórios de governança).
! Identity Governance Administrator é a função específica para access reviews de grupos e apps; se aparecer nas opções, prefira-a.""",
"Q069": """Microsoft.Compute :: é de VMs; o Container Apps fica em Microsoft.App.
Microsoft.Management :: management groups.
Microsoft.Network :: as regras de NSG ficam em Network, mas o recurso adaptive network hardening é do Defender (Microsoft.Security).
! Para achar o provedor de um serviço: Get-AzResourceProvider -ListAvailable, ou a página "Azure resource provider operations".""",
"Q070": """Função customizada :: funções customizadas do Entra não cobrem gestão de métodos de MFA.
Dynamic group / M365 group :: grupos não delimitam escopo de administração.
Helpdesk / Password administrator :: redefinem senha, mas não gerenciam métodos de MFA.
Groups administrator :: gerencia grupos.
! A AU pode ter associação dinâmica (ex.: jobTitle = Executive).""",
"Q071": """User1 / User4 :: estão no escopo só como membros do Group1, ou fora da AU.
! Para incluir os membros, adicione os usuários na AU (ou use regra dinâmica na AU).""",
"Q072": """Só User1 / User2 / User3 isolados :: lembre a precedência: -and antes de -or.
Incluir User3 :: pela tabela, ele não atende nenhum dos dois lados do -or.
! Use parênteses explícitos nas regras; o validador do portal (Validate rules) testa usuários específicos.""",
"Q073": """Helpdesk administrator :: redefine senhas, mas não atribui licenças.
Billing administrator :: compra e cobrança, não atribuição.
License administrator :: atribui licenças, mas não redefine senhas.""",
"Q074": """Set-AzureADGroup :: altera propriedades de grupo, não licenças diretas.
Set-WindowsProductKey :: sem relação.
Administrative units :: escopo de administração.
! Também resolveria o blade Licenses > Office 365 E3 > selecionar todos > Remove license.""",
"Q075": """Set-AzureADGroup / Identity Governance / Set-WindowsProductKey :: nenhum remove licenças atribuídas diretamente aos usuários.""",
"Q076": """AD FS :: também autentica no on-premises, mas é infraestrutura muito maior (farm + WAP); PTA é o recomendado.
PHS para a autenticação :: valida na nuvem, não no DC.
Device/Group writeback / PHS para o SSPR :: não gravam a senha nova no AD.
! Password writeback exige Entra ID P1. Com Cloud Sync, ele também é suportado.""",
"Q077": """OAuth policy do MDCA :: trata de apps OAuth com permissões excessivas.
Compliance policy do Intune :: avalia dispositivos.
Application control :: controla executáveis no Windows.
! A Microsoft já desabilitou a basic auth no Exchange Online para a maioria dos protocolos (2022); o CA continua sendo o controle de prova.""",
"Q078": """Conta de usuário do Entra :: exigiria senha/segredo e não é exclusiva do app.
Conta SQL :: segredo na connection string.
User-assigned :: funciona, mas pode ser compartilhada entre recursos e exige gerenciar o ciclo de vida separado.
! No SQL, crie o usuário: CREATE USER [App1] FROM EXTERNAL PROVIDER; e dê os papéis necessários.""",
"Q079": """Só Role2 / só built-ins :: o portal permite clonar ambas as origens (built-in e customizadas do Azure).
Built-ins do Entra / Role1 :: funções de diretório não servem de base para funções do Azure RBAC.
! Clonar = começar de uma definição existente, ajustar as permissões e definir os assignableScopes.""",
"Q080": """App password / perguntas de segurança / e-mail :: não são métodos de MFA para login interativo.""",
"Q081": """Voz :: exige linha de celular.
E-mail / perguntas :: não são MFA de login.""",
"Q082": """Managed2 e Managed3 no V1 :: Sim. Identidades user-assigned podem ser usadas por recursos de qualquer região.
Owner para "VM1" no RG1 :: Não. A VM não tem identidade system-assigned habilitada (e o nome nem confere), então não há principal.
! Identidades user-assigned são recursos regionais, mas o uso delas é cross-region.""",
"Q083": """Admin1 recupera o Secret1 :: Sim. Está em soft delete (10 dias), e o Key Vault Administrator recupera.
Admin2 / Admin3 expurgam o Certificate1 :: Não. Com purge protection, ninguém expurga antes de terminar a retenção.
! A purge protection, uma vez habilitada, não pode ser desabilitada; a retenção de soft delete vai de 7 a 90 dias (padrão 90).""",
"Q084": """Password spray / anonymous IP / unfamiliar sign-in properties :: são riscos de entrada.
! Riscos de usuário avaliam a identidade (credencial vazada, inteligência de ameaças), não um login específico.""",
"Q085": """Smartcard :: não é método de SSPR.
Notificação do app :: não é permitida quando só 1 método é exigido.
E-mail externo :: também é válido; a questão tem duas corretas e o gabarito escolhe o código do app.""",
"Q086": """User risk policy :: trata da identidade comprometida, não de um login de IP anônimo.
MFA registration policy :: só força o registro do MFA.
! Hoje, crie uma política de CA com a condição Sign-in risk = Medium+ e o grant Require MFA (as políticas legadas do ID Protection estão sendo descontinuadas).""",
"Q087": """Admin1 precisa de aprovação :: Sim. A função exige aprovação na ativação.
Admin2 ativa por 2 h :: Sim. Está dentro da duração máxima configurada.
Admin3 com MFA duas vezes :: Não, pelo gabarito. Se o login já satisfez o MFA, a ativação no PIM aceita a mesma sessão.
! Para exigir MFA "fresco" na ativação, use authentication context no PIM + CA.""",
"Q088": """User1 / User2 entram com MFA :: Não. Confirmados como comprometidos (risco alto) e com a política de usuário em Block, MFA não remedia um bloqueio.
User3 de IP anônimo :: Sim. Risco descartado; o IP anônimo gera risco de entrada médio, e a política só bloqueia High.
! Para desbloquear, o admin redefine a senha ou descarta o risco (dismiss).""",
"Q089": """Application developer :: registra apps, mas vira owner automaticamente.
Cloud application administrator :: igual ao Application administrator, **sem** o Application Proxy.
Service support administrator :: abre chamados de suporte.""",
"Q090": """Funções do Entra para criar VMs :: funções de diretório não dão permissão em recursos do Azure.
Funções do Entra para login em VM :: o login com conta Entra é autorizado por Azure RBAC (VM User/Administrator Login).
! Além da função, a VM precisa da extensão AADLoginForWindows (ou AADSSHLoginForLinux).""",
"Q091": """Groups blade :: não remove licenças atribuídas diretamente.
Set-AzureADGroup / Identity Governance :: não gerenciam licenças de usuário.""",
"Q093": """**Série "Solution" (atualizar o status no Identity Secure Score):** escrita = Global, Security, **Exchange** ou SharePoint administrator. User administrator e funções de leitura não atendem.
! Funções de leitura (Global reader, Security reader, Security operator) veem o score, mas não mudam status.""",
"Q094": """**Série "Solution":** User administrator não tem permissão no Secure Score.""",
"Q095": """Notificação do Authenticator / SMS :: precisam de celular conectado.
E-mail :: não é método de MFA de login.""",
"Q096": """OU1 / OU2 (sincronizadas) :: uma falha no AD ou na federação impediria o login de emergência.
Billing admin / Owner / Privileged Role Administrator :: o break-glass precisa de Global Administrator permanente (Owner é do Azure RBAC).
! Recomendações: 2 contas, excluídas do CA (exceto passkey/FIDO2 resistente a phishing), senha longa guardada offline, alertas de login monitorados.""",
"Q097": """Conditional Access :: controla a forma de acesso, não concede nem expira acesso.
PIM role settings :: são para funções privilegiadas ou PIM for Groups.
MDCA access policy :: controla a sessão; não concede.
! A política do access package pode ter "For users in your directory: specific groups", aprovação "No" e expiração de 30 dias.""",
}
