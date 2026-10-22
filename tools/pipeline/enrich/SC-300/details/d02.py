DET = {
"Q033": """Application Proxy :: publica apps on-premises; o SharePoint Online já está na nuvem.
Segundo Entra Connect (ou o mesmo) sincronizando para o West :: cria contas **membros** duplicadas, que precisariam de licença no West.
! Cross-tenant synchronization automatiza a criação dos B2B; os convidados usam a licença do tenant de origem (o SharePoint B2B não exige licença extra).""",
"Q034": """User consent settings :: tratam de consentimento a apps.
MFA registration policy :: é do ID Protection e não libera o CA.
Password protection on-premises :: sem relação com CA.
! Também é preciso Entra ID P1 para criar políticas de Conditional Access.""",
"Q035": """Named location :: é condição, não método de autenticação.
Authenticator :: exige celular, que é proibido.
Windows Hello for Business :: fica preso ao dispositivo (TPM); com PCs compartilhados, o usuário teria que provisionar em cada um, e sem biometria só restaria PIN por máquina.
! FIDO2 funciona em qualquer PC (USB/NFC) e é resistente a phishing.""",
"Q036": """Cloud apps or actions :: escolhe o recurso, não o protocolo do cliente.
User risk / sign-in risk :: tratam de risco do ID Protection.
! Hoje, use o template "Block legacy authentication"; sem MFA possível em protocolos legados, bloquear é o caminho.""",
"Q037": """Impossible travel / atypical travel / anonymous IP :: são detecções de risco de **entrada** (sign-in).
! Outras detecções de risco de usuário: Microsoft Entra threat intelligence (usuário), possible attempt to access PRT e anomalous user activity.""",
"Q038": """Activity policy do MDCA :: alerta ou governa depois do fato; não impede o download em tempo real.
CA com client apps :: escolhe browser/clientes, mas sozinho não bloqueia download.
App discovery policy :: trata de Shadow IT.
! "Use app enforced restrictions" no SharePoint permite acesso limitado (somente web, sem download) a dispositivos não gerenciados.""",
"Q039": """Application Proxy :: publica apps web, não VPN RADIUS.
Password Protection proxy :: trata de senhas banidas.
PTA proxy :: não existe; o agente PTA não faz MFA para VPN.
! A extensão NPS envia a 2ª etapa ao Entra MFA. O usuário precisa estar sincronizado e ter MFA registrado.""",
"Q040": """Entra Connect :: sincronização; não serve ao Password Protection.
Application Proxy / PCNS :: sem relação.
! Arquitetura: agente DC em todos os DCs (sem internet) + 2 ou mais proxies em servidores membro com saída na 443.""",
"Q042": """Notificação do Authenticator / SMS :: exigem celular conectado.
App password :: credencial legada para apps sem MFA; não é método de MFA.
! O WHfB conta como MFA porque combina posse (TPM do dispositivo) e conhecimento ou biometria (PIN/Hello).""",
"Q043": """**Série "Solution" (bloquear quem reporta MFA não iniciado):** só **Fraud alert** com bloqueio automático atende. Notifications, Account lockout e Block/unblock users não atendem.
! O substituto moderno é **Report suspicious activity** (Authentication methods > Settings), que marca o usuário como alto risco para o ID Protection.""",
"Q044": """**Série "Solution":** Account lockout conta negações seguidas de MFA (ex.: 10 em 5 min); não reage ao "reportar fraude".""",
"Q045": """**Série "Solution":** Block/unblock users é uma ação manual do administrador; o requisito é automático.""",
"Q046": """PIM / Identity Governance / SSPR :: não detectam credenciais vazadas.
Sign-in risk :: leaked credentials é risco de **usuário**.
Client apps / device state / location :: não são sinais de risco.
Block access / app enforced restrictions / app protection :: não remediam a credencial comprometida (o requisito pede manter o acesso).
! A troca de senha segura exige que o usuário já tenha MFA registrado (e SSPR habilitado, para híbridos com writeback).""",
"Q047": """Configurar a política com Security operator/reader :: só **Security administrator** (ou superior) altera políticas.
Ver o relatório só com o Security admin :: Security operator, Security reader e Global reader também veem usuários de risco.
! As políticas de risco legadas do ID Protection estão sendo substituídas por políticas de Conditional Access baseadas em risco.""",
"Q048": """Admin1 redefine senha de User3/User4 :: Não. Eles não são membros da AU; ser membro de um grupo da AU não os coloca no escopo.
Admin1 adiciona User1 ao Group2 :: Sim. O User administrator com escopo na AU gerencia os grupos dela.
Admin2 redefine senha do User1 :: Sim. O escopo do Admin2 é o diretório.
! Adicionar um grupo à AU não adiciona os membros do grupo à AU.""",
"Q049": """**Série "Solution":** **Fraud alert** atende: "Allow users to submit fraud alerts" + "Automatically block users who report fraud". O usuário bloqueado fica 90 dias bloqueado para MFA ou até um admin desbloquear.""",
"Q050": """Notificação do Authenticator :: precisa de conectividade no celular.
E-mail :: não é método de MFA para login (só para SSPR).
Perguntas de segurança :: só SSPR.
! O código TOTP (30 s) funciona offline porque deriva do relógio e de um segredo local.""",
"Q051": """HighRiskCountries como cloud app / grant / session :: locais são **condições** da política.
Sign-in frequency como condição / grant :: é controle de **sessão**.
! Configurar a sign-in frequency para "Every time" exige reautenticação a cada acesso (em cenários suportados).""",
"Q052": """5 / 10 / 11 :: repetir a mesma senha errada não conta de novo enquanto ela estiver entre as 3 últimas.
Limpar cache / InPrivate :: o bloqueio é no servidor (Entra), não no navegador.
! O smart lockout padrão é de 10 tentativas e 60 s de bloqueio; o desbloqueio também acontece com uma troca de senha bem-sucedida.""",
"Q053": """MFA em Conditions / Users / Sessions :: exigir MFA é um **grant control**.
8 h em Conditions / Grant :: frequência de login é **session control**.
Enable policy :: só liga ou desliga a política (On / Report-only / Off).""",
"Q054": """Authentication administrator :: também redefine senha, mas gerencia métodos de autenticação; mais amplo que o necessário.
Privileged authentication administrator :: atua inclusive sobre admins; excessivo.
Security operator :: investiga riscos, mas não redefine senha.
! Security administrator sozinho não redefine senhas.""",
"Q055": """Alguma aprovada :: depois da normalização (ex.: Pr0jectlitw@re → projectlitware), os termos banidos valem 1 ponto e sobram poucos caracteres; nenhuma chega a 5 pontos.
! A lista global da Microsoft é sempre aplicada; a lista customizada aceita até 1.000 termos e faz correspondência aproximada (fuzzy, distância de edição 1).""",
"Q056": """Perguntas de segurança :: não são método de MFA.
Voz / SMS :: exigem sinal de celular.""",
"Q057": """Access reviews / PIM :: não liberam métodos de MFA.
User2 / User3 :: o próprio usuário não altera configurações do tenant; um Privileged Authentication Administrator gerencia métodos de **usuários**, não os security defaults.
! Security defaults podem ser alterados por Security administrator, Conditional Access administrator ou Global administrator.""",
"Q058": """Teams chat :: não é método de SSPR.
Notificação do app :: com 1 método exigido, o SSPR só aceita o **código** do app.
FIDO2 :: não serve para redefinir senha.
! Métodos de SSPR: código ou notificação do app, SMS, voz (comercial/celular), e-mail alternativo, perguntas de segurança.""",
"Q059": """Política com limite médio ou baixo :: afeta todos os usuários; mais esforço e mais impacto.
Resetar o registro de MFA :: não força a troca de senha.
Sign-in risk policy :: risco de entrada pede MFA, não troca de senha.
! "Confirm compromised" também alimenta o aprendizado do ID Protection.""",
"Q060": """User1 :: Sim. Está só na política de risco de usuário (bloqueio), e o IP anônimo é risco de entrada.
User2 :: Não. A política de risco de entrada exige MFA, e ele não tem MFA registrado, então é bloqueado.
User3 :: Sim. Cumpre o MFA e remedia o risco de entrada.
! Quem não tem MFA registrado não consegue autorremediar o risco de entrada; daí a política de registro de MFA.""",
"Q061": """Smartcard / FIDO2 :: não são métodos de SSPR.
Teams chat :: não existe como método.
! O e-mail alternativo precisa ser **externo** à organização; endereços do próprio tenant não são indicados.""",
"Q062": """User2 / User3 :: estão habilitados para outros métodos (SMS, FIDO2…), que não usam number matching.
! O number matching é obrigatório em todas as notificações push do Authenticator desde 2023.""",
"Q063": """Access reviews :: revisam acessos, não simulam políticas.
Identity Secure Score :: dá recomendações de postura.
Teste de conectividade do M365 :: é de rede.
! O What If não gera login real; o modo report-only mostra o efeito em logins reais.""",
"Q064": """App password :: legado, não é MFA.
Voz :: exige celular.
Perguntas de segurança :: não são MFA.""",
"Q065": """Sign-in logs :: mostram logins reais; não permitem simular risco ou país.
MDCA activity log :: atividade em apps conectados.
Access reviews :: governança.
! O What If permite definir: usuário, app, IP/país, plataforma, client app, sign-in risk, user risk e estado do dispositivo.""",
}
