DET = {
"Q108": """Admin1 (usuário) :: destinatários adicionais são grupos, não usuários avulsos.
Group4 (segurança sem e-mail) :: não tem endereço para receber; o gabarito o exclui.
! O e-mail usa um message template (Tenant administration > Notifications) e pode incluir o usuário do dispositivo.""",
"Q109": """net accounts / net user :: tratam de política de contas e de usuários, não de grupos.
CONTOSO\\ / UPN\\ :: o prefixo das contas Entra no Windows é AzureAD\\.
! Para gerenciar em escala, use a política Local user group membership (Account protection) no Intune.""",
"Q110": """Global Administrator :: excesso de privilégio.
Security Administrator :: também gerencia security defaults e CA (a documentação o cita como mínimo para security defaults).
Intune Administrator :: não gerencia CA nem security defaults.""",
"Q111": """Device1 em 4/06 :: Sim. Em grace period (5 dias).
Device1 em 6/06 :: Não. O prazo de 5 dias venceu.
Device2 em 9/06 :: Sim. Ainda na carência de 10 dias da Policy3.
! O estado In grace period conta como compliant para o Conditional Access.""",
"Q112": """App configuration / compliance :: não alteram grupos locais.
Device configuration profile :: também funcionaria via OMA-URI (custom), mas o caminho dedicado é Account protection.
! A ação "Add (Update)" adiciona membros sem remover os existentes; "Replace" substitui todos.""",
"Q113": """User1 registra o Device1 :: Não, pelo gabarito (registro sem join). A documentação discute inscrição via "Access work or school" para usuários no escopo.
User1 faz join do Device2 :: Sim. Entra join + MDM user scope = inscrição automática.
User2 registra o Device3 (Android) :: Não. Android se inscreve pelo Company Portal, e o User2 está só no escopo MAM.
! O MDM user scope tem prioridade sobre o MAM scope quando o usuário está nos dois.""",
"Q114": """Configuration profile :: não limpa dados.
In-place upgrade :: preserva apps e dados.
Clean install :: mais esforço (imagem, mídia).
! O Autopilot Reset exige o Windows RE funcional e o dispositivo Entra joined e gerenciado.""",
"Q115": """Join to Azure AD / termos / privacidade / tipo de conta / teclado / idioma :: não resolvem "sem autenticação" nem o nome com o serial.
Allow pre-provisioned :: é o White Glove (técnico + usuário), não o self-deploying.
! O self-deploying exige TPM 2.0 com atestação e não suporta hybrid join.""",
"Q116": """Reputation-based protection :: SmartScreen.
Network Discovery :: descoberta na rede.
Remote Desktop Configuration service :: é um serviço interno, não habilita a pré-autenticação.""",
"Q117": """Device1 :: viraria Windows 10 Enterprise, não 11 (a ativação troca só a edição).
Só o Device3 :: o tipo de ativação atual (chave ou assinatura) não importa.""",
"Q118": """User1 :: Sim. Domain Admins pertence a Administrators.
User2 :: Não. O Deny log on through RDS (Group2) vence o Allow.
User3 :: Sim. O "Deny log on locally" não afeta o RDP.
! Em direitos de usuário, Deny sempre prevalece sobre Allow.""",
"Q119": """Configurar o Computer2 :: o redirecionamento é escolhido no cliente (e pode ser bloqueado por política no host).
Firewall do Computer1 / File and Printer Sharing :: o redirecionamento passa dentro do canal RDP.""",
"Q120": """Subscription activation :: só troca a edição; não instala app nem faz join.
In-place upgrade :: não faz join nem instala app ou certificado.
! Autopilot + Intune entregam o MSI (LOB) e o certificado (perfil trusted/PKCS).""",
"Q123": """ESP :: mostra o progresso; não define as telas do OOBE.
Compliance / script / configuration profile :: não configuram o OOBE.""",
"Q124": """Device3 :: Windows 10; a ativação leva para Windows 10 Enterprise.
Device2 / Device4 :: só registrados.""",
"Q125": """App1 (store app) :: no Android Enterprise, apps "Android store app" são links para a loja pública, sem managed configuration.
App2 (LOB) :: managed configurations exigem Managed Google Play (um LOB pode ser publicado como app privado no MGP).""",
"Q126": """Configuration profile / certificate connector / Partner device management :: não habilitam a distribuição de apps.
! A vinculação também é pré-requisito para inscrever qualquer dispositivo Android Enterprise.""",
"Q127": """Developer / Owner :: campos informativos para administradores.
! Também aparecem para o usuário: Description, Publisher, Category e logo.""",
"Q128": """Display / General / Control Panel / Privacy etc. :: não contêm as imagens de fundo.
! Os dois exigem URL de imagem acessível (PNG/JPG); essas opções funcionam no Windows Enterprise/Education.""",
"Q129": """Compliance / cleanup / enrollment policy :: não trocam a edição.
! Com subscription activation e licença E3/E5, o upgrade acontece sozinho; o perfil é útil para chaves MAK/KMS.""",
"Q130": """Application Guard :: isola a navegação no Edge.
SmartScreen :: reputação de sites e apps.
Application Control :: controla quais apps executam, não quem grava na pasta.""",
"Q131": """Firewall :: configura o firewall, mas não esconde a área no app Windows Security.
Disk encryption / EDR / ASR :: outras funções.
Compliance / CA :: não são perfis de Endpoint security para essas opções.""",
"Q132": """Device Management / Azure Monitor / Data Warehouse :: não trazem processos de boot e reinícios prontos.""",
"Q133": """FileVault em Account protection / ASR :: criptografia de disco fica em Disk encryption.
Credential Guard em ASR :: Credential Guard fica em Account protection.
WDAC em Disk encryption :: o controle de aplicativos ficava em ASR (hoje em App Control for Business).""",
"Q134": """Compliance / app protection :: sem relação com download.
Update ring :: define quando instalar, não de onde baixar (a opção de DO dele é legada).""",
"Q135": """GPO :: exige domínio; os dispositivos estão em workgroup.
MDM automatic enrollment :: precisa que o dispositivo faça join no Entra antes.
Device configuration :: só se aplica a dispositivos já inscritos.
! O bulk enrollment usa um token de conta de pacote (expira em 180 dias).""",
"Q136": """Os dois como pessoal ou corporativo :: o tipo de vínculo define o ownership na inscrição automática.
! O ownership pode ser alterado manualmente depois; dispositivos corporativos permitem mais ações (ex.: inventário de apps completo).""",
"Q137": """1/12 / 15/11 / 22/11 :: a pausa dura 35 dias corridos a partir do início.
! A pausa pode ser estendida uma vez por mais 35 dias; a de feature updates e a de quality updates são separadas.""",
"Q138": """Android / iOS :: baselines são só Windows; no mobile, use app config/app protection para o Edge.""",
"Q139": """Antes das 8 h / depois das 17 h :: fora das active hours o reinício é permitido.
2 ou 5 dias :: o grace period configurado é 1 dia.""",
"Q140": """Device compliance / Noncompliant devices / Setting compliance :: mostram o estado do dispositivo, não as tentativas de acesso por app.
! O workbook exige os sign-in logs no Log Analytics (diagnostic settings).""",
"Q141": """Audit logs (Entra/Intune) :: registram alterações administrativas, não tendências de inventário.
Synapse :: não é fonte nativa do Intune.
Azure Data Studio / admin center :: não são a ferramenta de visualização indicada para o Data Warehouse.""",
"Q142": """Autodiscover A record / SCP :: o SCP permite o hybrid join; a inscrição em massa vem da GPO.
Autopilot :: para dispositivos novos ou resetados, não para os 2.000 existentes.
! A GPO fica em Computer Configuration > Administrative Templates > Windows Components > MDM.""",
}
