=== L08 | Métodos de autenticação, TAP e intensidades de autenticação | A | 60
questions: Q062,Q035,Q042,Q050,Q056,Q064,Q080,Q081,Q095,Q099,Q118,Q133,Q358,Q288,Q254
predict: Q062
## overview
Testa a política unificada de métodos de autenticação e qual método atende a cada cenário.

- **Number matching** só existe nas notificações do Microsoft Authenticator (Q062).
- Sem sinal de celular: **código (TOTP)** do Authenticator ou **Windows Hello for Business** no laptop (Q042, Q050 e similares).
- PC compartilhado, sem celular: **FIDO2** (Q035).
- **Authentication strengths**: o *Phishing-resistant MFA* aceita Windows Hello, FIDO2/passkey e CBA multifator (Q358).
- **Certificate-based authentication** começa cadastrando a CA no tenant (Q288).
- **Temporary Access Pass** para o primeiro registro sem senha.

## prereqs
- sc-user01 e sc-user02, celular com o Microsoft Authenticator.
- Opcional: chave FIDO2; a PKI de lab (LAB-SUBCA-CA) para o CBA.
- Conta break-glass excluída de qualquer política de CA.

## steps
### 1. Política de métodos
@ Entra: Entra ID > Authentication methods > Policies

- **Microsoft Authenticator**: Enable · Target: grupo **SC300-L08-Auth** (sc-user01) · Configure: *Show application name* e *Show geographic location* = Enabled.
- **Temporary Access Pass**: Enable · Target: All users · Minimum lifetime 1 h · One-time: Yes.
- **Passkey (FIDO2)**: Enable para SC300-L08-Auth.
- **SMS**: deixe **desabilitado** para sc-user02 (não inclua no alvo).

### 2. TAP para o primeiro registro
@ Entra: Entra ID > Users > sc-user02 > Authentication methods > Add authentication method > Temporary Access Pass

### 3. Authentication strength na política de CA
@ Entra: Entra ID > Authentication methods > Authentication strengths — veja os três internos: *Multifactor authentication*, *Passwordless MFA* e *Phishing-resistant MFA* (abra cada um e veja os métodos aceitos).

@ Entra: Entra ID > Conditional Access > Policies > New policy

- **SC300-L08-Phish**: Users = SC300-L08-Auth · Target resources: **Microsoft Admin Portals** · Grant: **Require authentication strength** = Phishing-resistant MFA · Report-only.

### 4. CBA (opcional, com a PKI do lab)
1. @ Entra: Entra ID > Authentication methods > **Certificate authorities** (em tenants novos: *PKI-based trust store*) > Upload: a raiz e a LAB-SUBCA-CA, com a URL da CRL.
2. @ Entra: Entra ID > Authentication methods > Policies > **Certificate-based authentication** > Enable · Configure > Authentication binding: protection level **Multi-factor**.

## test
1. Entre como sc-user01 e aprove a notificação do Authenticator: aparece o número para digitar, com o nome do app e o local.
2. Coloque o celular em modo avião e entre de novo usando **Use a verification code**.
3. Em https://aka.ms/mysecurityinfo com sc-user02, entre com o **TAP** e registre o Authenticator e a passkey.
4. Abra o What If com sc-user01 em Microsoft Admin Portals: a política exige phishing-resistant.

## evidence
- Sign-in logs > (login) > **Authentication Details** (método usado, se houve number matching, se o TAP foi usado).
- @ Entra: Entra ID > Authentication methods > **User registration details** e **Registration and reset events**.

## expected
- Notificação com number matching, nome do app e localização (Q062).
- Código TOTP funciona sem rede no celular (Q050).
- O TAP permite registrar métodos sem senha e expira depois do uso único.
- Phishing-resistant: o Authenticator push **não** basta; FIDO2, Windows Hello ou CBA multifator sim (Q358).

## variations
- **Q133:** no registro (interrupt mode), o usuário consegue registrar Authenticator e e-mail; FIDO2 e Windows Hello são registrados depois, no Security info ou no Windows.
- **Q254:** num tenant novo com security defaults, o método liberado é o Microsoft Authenticator (L09).

## breakit
Ative a política SC300-L08-Phish (**On**) para sc-user01 sem que ele tenha FIDO2/Windows Hello. Ele não entra nos portais de administração e o erro diz que o método exigido não está registrado. É assim que se tranca um admin fora; por isso Report-only primeiro.

## cleanup
Apague a política de CA, o TAP pendente e restaure os alvos dos métodos.

## refs
- https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage
- https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths
- https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass
- https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-certificate-based-authentication

=== L09 | Configurações de MFA, campanha de registro e padrões de segurança | A | 45
questions: Q049,Q043,Q044,Q045,Q106,Q207,Q034,Q057,Q129,Q257,Q039
predict: Q049
## overview
Testa as configurações do MFA fora das políticas de método.

- Bloqueio automático de quem **reporta fraude** (Fraud alert / Report suspicious activity) (Q049 e série).
- **Registro de MFA** com carência de 14 dias (registration campaign / MFA registration policy) (Q106, Q207).
- **Security defaults** e Conditional Access são exclusivos: não dá para ligar um com o outro ativo (Q034, Q129, Q257).
- VPN com RADIUS → **NPS + extensão de MFA do Entra** (Q039).

## prereqs
- sc-user03 com o Authenticator registrado.

## steps
### 1. Report suspicious activity
@ Entra: Entra ID > Authentication methods > Settings > **Report suspicious activity**: State = Enabled · Target: All users.

Na configuração legada, o equivalente é @ Entra: Entra ID > Multifactor authentication > Fraud alert: *Automatically block users who report fraud* = On.

### 2. Campanha de registro
@ Entra: Entra ID > Authentication methods > **Registration campaign** > Edit

- State: Enabled · Days allowed to snooze: **14** · Include: SC300-L09-Reg (sc-user04, sem método registrado).

### 3. Security defaults
@ Entra: Entra ID > Overview > Properties > **Manage security defaults** — veja o estado atual.

## test
1. Dispare um login com sc-user03 e, no celular, toque em **No, it's not me** > **Report**.
2. Veja o usuário em @ Entra: Entra ID > ID Protection > Risky users (risco alto) e tente entrar de novo.
3. Entre como sc-user04: o Entra pede para configurar o Authenticator, com a opção **Skip for now** (adiar).
4. Com alguma política de Conditional Access existente (mesmo em report-only), tente **habilitar** os security defaults.

## evidence
- Audit logs e Risky users (o reporte de atividade suspeita eleva o risco para alto).
- @ Entra: Entra ID > Authentication methods > Activity.

## expected
- Quem reporta é marcado como de risco alto e, com política de risco de usuário, fica bloqueado até remediar (Q049).
- O usuário da campanha pode adiar o registro por até 14 dias (Q106).
- Com política de CA existente, o portal não deixa habilitar os security defaults (Q257); com security defaults ligados, não dá para criar políticas de CA (Q034).

## variations
- **Q043, Q044 e Q045:** abra Multifactor authentication > *Notifications*, *Account lockout* e *Block/unblock users* e veja que nenhum deles bloqueia automaticamente quem reporta fraude.
- **Q057:** com security defaults ativos, os usuários só registram o Authenticator; para liberar outros métodos é preciso desativá-los.
- **Q039:** para uma VPN com RADIUS, instale o **NPS** num servidor do lab e a **NPS Extension for Microsoft Entra multifactor authentication**.

## breakit
Desligue o Report suspicious activity e repita o passo 1: o usuário nega o push e nada acontece com o risco dele.

## cleanup
Dispense o risco de sc-user03 (Risky users > Dismiss user risk), desligue a campanha e volte os security defaults ao estado anotado.

## refs
- https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings
- https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-mfa-registration-campaign
- https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults

=== L10 | Redefinição de senha por autoatendimento (SSPR) | A | 40
questions: Q127,Q058,Q061,Q085,Q125,Q372,Q105,Q146
predict: Q127
## overview
Testa o SSPR para usuários comuns e para administradores.

- Com **um** método exigido, a notificação do Authenticator não serve; só o **código** (Q058, Q125, Q372).
- E-mail alternativo é método de SSPR; FIDO2, smartcard e Teams não (Q061).
- Administradores sempre usam a política forte: **dois métodos**, sem perguntas de segurança (Q105, Q127).
- Usuário sincronizado precisa de **password writeback** (Q146, L05).

## prereqs
- sc-user01 (sem função) e sc-adm01 com **User Administrator**.
- Os dois com telefone e e-mail alternativo registrados.

## steps
@ Entra: Entra ID > Password reset

- **Properties**: Self service password reset enabled = **Selected** → grupo SC300-L10-SSPR (sc-user01 e sc-adm01).
- **Authentication methods**: Number of methods required to reset = **1** · métodos: Mobile app code, Email, Mobile phone, Security questions (3 de 5).
- **Registration**: Require users to register when signing in = Yes · Days before users are asked to reconfirm = 180.
- **Notifications**: Notify users on password resets = Yes · Notify all admins when other admins reset their password = Yes.

? Desde a migração para a política unificada de métodos (2025), **quais** métodos estão habilitados também depende de Authentication methods > Policies. O blade Password reset continua definindo quantos métodos são exigidos.

## test
1. Em https://aka.ms/sspr, redefina a senha de **sc-user01**. Veja quais opções aparecem (a notificação do app aparece?).
2. Repita com **sc-adm01**.

## evidence
- @ Entra: Entra ID > Password reset > **Audit logs** e **Usage & insights** (registro e reset).
- Sign-in logs do reset.

## expected
| Usuário | Métodos exigidos | Perguntas de segurança | Notificação do app |
|---|---|---|---|
| sc-user01 | 1 | Sim | Não (só o código) |
| sc-adm01 (User Admin) | 2 | **Não** | Sim |

## variations
- Mude para **2** métodos exigidos: a notificação do app passa a ser aceita como um dos dois.
- **Q146:** para usuários sincronizados, o reset só funciona com **password writeback** (L05).

## breakit
Coloque o SSPR como **Selected** com um grupo que não inclui sc-user01 e tente o reset: a página diz que a conta não está habilitada. Atenção: administradores conseguem o reset mesmo fora do grupo (a política de administradores é sempre ativa).

## cleanup
Volte o SSPR à configuração anterior; apague o grupo SC300-L10-*.

## refs
- https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr
- https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy

=== L11 | Proteção de senha e bloqueio inteligente | B | 75
questions: Q055,Q040,Q052,Q128,Q211
predict: Q055
## overview
Testa a lista de senhas banidas no Entra e no AD on-premises, e o smart lockout.

- Senha avaliada com normalização e pontuação: precisa de **5 pontos** (Q055).
- On-premises: **proxy service** (busca a política no Azure) e **DC agent** em cada DC (Q040, Q211).
- O proxy **não** pode ficar no mesmo servidor de um conector do Application Proxy/Private Access (Q211).
- **Smart lockout** fica em Password protection e não conta de novo a mesma senha errada (Q052, Q128).

## prereqs
- DC LLK85SH20050 (agente de DC; reinicia na instalação).
- Servidor membro para o proxy: **LLK85SH20053**. Não use LLK85SH20066/67: são conectores do Private Access, o mesmo caso da Q211.
- Usuário sincronizado **lab-sync01** e usuário de nuvem sc-user02.

## steps
### 1. Política no Entra
@ Entra: Entra ID > Authentication methods > Password protection

- Lockout threshold: **5** · Lockout duration in seconds: 60
- Enforce custom list: **Yes** · Custom banned password list: `contoso`, `litware`, `camposlab`
- Enable password protection on Windows Server Active Directory: **Yes** · Mode: **Audit** (depois Enforced)

### 2. Proxy (LLK85SH20053)
Instale o **AzureADPasswordProtectionProxySetup.msi** (Microsoft Download Center) e registre:
```powershell
Import-Module AzureADPasswordProtection
Register-AzureADPasswordProtectionProxy -AccountUpn "admin@camposlab.online"
Register-AzureADPasswordProtectionForest -AccountUpn "admin@camposlab.online"
Get-AzureADPasswordProtectionProxy
```

### 3. Agente no DC (LLK85SH20050)
Instale o **AzureADPasswordProtectionDCAgentSetup.msi** e reinicie o DC no horário de manutenção do lab.

## test
1. **Nuvem:** troque a senha de sc-user02 para `C4mp0sl@b2026` e depois para `Camposlab!Lab` em https://myaccount.microsoft.com.
2. **AD (modo Audit):** troque a senha de lab-sync01 para uma senha com `litware`. Ela é aceita, mas gera evento de auditoria.
3. Mude para **Enforced**, espere a política chegar ao DC e repita: rejeitada.
4. **Smart lockout:** erre a senha de sc-user02 repetindo **a mesma** senha errada várias vezes, depois use senhas erradas **diferentes**.

## evidence
- No DC: Event Viewer > Applications and Services Logs > Microsoft > **AzureADPasswordProtection** > DCAgent > Admin (eventos de senha aceita em auditoria ou rejeitada).
- `Get-AzureADPasswordProtectionDCAgent` no DC.
- Sign-in logs: erro **50053** (conta bloqueada pelo smart lockout).

## expected
- Senhas com termos banidos e poucos caracteres extras são recusadas, mesmo com troca de letras por números/símbolos (Q055).
- Audit só registra; Enforced bloqueia.
- O smart lockout conta senhas erradas **distintas**; repetir a mesma senha errada não soma (Q052).

## variations
- **Q040:** um segundo proxy em outro servidor dá redundância.
- **Q128:** o limite do smart lockout fica em **Password protection**, não em Conditional Access nem no MFA.

## breakit
Pare o serviço do proxy (`Stop-Service AzureADPasswordProtectionProxy`) e crie um banned term novo no portal. O DC continua usando a última política baixada; a nova não chega até o proxy voltar.

## cleanup
Volte o Mode para Audit (ou desligue); desinstale os agentes se não for manter; tire os termos de teste.

## refs
- https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad
- https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-ban-bad-on-premises-deploy
- https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-smart-lockout

=== L12 | Acesso Condicional: condições, concessão, localizações e ferramenta E se | A | 60
questions: Q053,Q036,Q051,Q063,Q065,Q077,Q066,Q206,Q134,Q352,Q255
predict: Q053
## overview
Monta políticas de Conditional Access que cobrem as questões mais comuns.

- **Grant** (exigir MFA, bloquear) × **Session** (frequência de entrada) (Q053, Q051).
- Named location entra como **condição** e usa o IP **público** (Q051, Q066, Q206).
- Bloquear autenticação legada pela condição **Client apps** (Q036, Q077).
- **What If** para simular sem logar (Q063, Q065).
- Templates excluem o usuário que cria a política (Q134, Q352).
- **Filter for devices** com dispositivos não registrados (Q255).

## prereqs
- Grupo **SC300-L12-CA** (sc-user01, sc-user02). Break-glass excluída de tudo.
- O IP público de saída do lab (veja em https://www.bing.com/search?q=what+is+my+ip a partir de uma VM do lab).

## steps
### 1. Named location
@ Entra: Entra ID > Conditional Access > Named locations > IP ranges location

- **SC300-L12-Lab**: o IP público do lab em /32 · Mark as trusted location: Yes.

### 2. MFA fora do lab + frequência
@ Entra: Entra ID > Conditional Access > Policies > New policy

- **SC300-L12-MFA**: Users = SC300-L12-CA · Target resources: Office 365
- Conditions > Locations: Include **Any location** · Exclude **SC300-L12-Lab**
- Grant: **Require multifactor authentication**
- Session: **Sign-in frequency** = 1 hora
- Enable: Report-only → depois On

### 3. Bloqueio de autenticação legada
- **SC300-L12-Legado**: Users = SC300-L12-CA · All resources · Conditions > Client apps: só **Exchange ActiveSync clients** e **Other clients** · Grant: **Block access**

### 4. A partir de template (Q134)
@ Entra: Entra ID > Conditional Access > Policies > **Create new policy from templates** > Identities > *Require multifactor authentication for admins* > Review + Create.

## test
1. Entre como sc-user01 de dentro do lab (sem MFA) e depois por uma rede externa (celular roteado): MFA pedido fora.
2. Use o **What If**: sc-user01 · Office 365 · IP de outro país · Client app Browser.
3. Abra a política criada pelo template e veja **Exclude** e o estado inicial.
4. Teste autenticação legada (se tiver um cliente IMAP/POP) com sc-user02.

## evidence
- Sign-in logs > aba **Conditional Access** (políticas aplicadas, Success/Failure/Not applied) e **Report-only**.
- What If: lista de políticas que se aplicam e as que não se aplicam, com o motivo.

## expected
- Dentro do lab (trusted location): sem MFA. Fora: MFA, e nova autenticação a cada 1 hora.
- MFA é **Grant**; frequência é **Session** (Q053).
- A política do template exclui o seu usuário automaticamente (Q134) — anote também o estado inicial (Report-only/On), que é o ponto discutido na Q352.
- O cliente legado é bloqueado.

## variations
- **Q066:** crie uma named location com um IP **privado** (10.85.134.0/24): ela nunca corresponde, porque o Entra vê o IP público.
- **Q255:** em outra política, use **Filter for devices** com Exclude `device.displayName -startsWith "W11"` e teste a partir de um dispositivo não registrado.
- **Q206:** "Trusted IPs" da configuração legada de MFA × named location: o recomendado é a named location.

## breakit
Use Include = **All users** sem excluir a break-glass, e o grant **Block**, em modo On. Não faça isso: este é o item clássico de "como se trancar fora do tenant". Faça só em Report-only e veja no Sign-in log que até o seu admin seria bloqueado.

## cleanup
Apague as políticas SC300-L12-* e a named location.

## refs
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/what-if-tool
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-assignment-network

=== L13 | Acesso Condicional: controles de sessão e avaliação contínua de acesso | A | 45
questions: Q332,Q038,Q311,Q256,Q100,Q209
predict: Q332
## overview
Testa o que acontece **depois** do login.

- **Persistent browser session = Never persistent** sobrepõe o "Stay signed in?" (Q332).
- **Sign-in frequency** força reautenticação periódica.
- **App enforced restrictions**: SharePoint/OneDrive só web, sem download, em dispositivo não gerenciado (Q038, Q209, Q256).
- **Continuous access evaluation**: personalização por política de CA (Q311).
- **Conditional Access App Control** com o Defender for Cloud Apps (Q100, L21).

## prereqs
- Grupo SC300-L13-Sess (sc-user01, sc-user02). Um PC **não gerenciado** (sem join) e um gerenciado (Entra joined ou hybrid joined e compatível).

## steps
### 1. Sessão do navegador
@ Entra: Entra ID > Conditional Access > Policies > New policy

- **SC300-L13-Browser**: Users = sc-user01 · All resources · Session: **Persistent browser session** = Never persistent · **Sign-in frequency** = 1 hora

### 2. Acesso limitado ao SharePoint
No SharePoint admin center: Policies > Access control > **Unmanaged devices** > **Allow limited, web-only access**. Isso cria políticas de CA com *Use app enforced restrictions*. Ou crie à mão:

- **SC300-L13-SPO**: Users = SC300-L13-Sess · Target resources: Office 365 SharePoint Online · Session: **Use app enforced restrictions**

### 3. CAE
Em uma política para sc-user02: Session > **Customize continuous access evaluation** > *Strictly enforce location policies*.

## test
1. Entre como sc-user01: o "Stay signed in?" não aparece. Volte depois de 1 hora.
2. Abra o SharePoint pelo PC **não gerenciado** com sc-user02: tente baixar um arquivo e sincronizar com o OneDrive.
3. Abra pelo PC **gerenciado e compatível**.
4. CAE: com sc-user02 logado no Outlook web, desabilite a conta dele e veja quanto tempo a sessão sobrevive.

## evidence
- Sign-in logs > Conditional Access (controles de sessão aplicados) e o campo de CAE (token com CAE).
- A faixa amarela do SharePoint avisando o acesso limitado.

## expected
- Sem "Stay signed in?" para sc-user01 (Q332).
- PC não gerenciado: só leitura no navegador, sem download nem sync. PC compatível ou hybrid joined: acesso completo (Q256).
- Com CAE, a desabilitação da conta corta a sessão em minutos nos apps compatíveis (Exchange, SharePoint, Teams), sem esperar o token de 1 hora expirar.

## variations
- **Q100:** troque o controle de sessão para **Use Conditional Access App Control** e siga o L21 para criar uma session policy no Defender for Cloud Apps.
- **Q209:** apps on-premises recebem MFA via Application Proxy/Private Access; SharePoint, via app enforced restrictions.

## breakit
Aplique app enforced restrictions a um app que não é SharePoint/Exchange. O controle não tem efeito: só alguns apps entendem essa restrição.

## cleanup
Apague as políticas SC300-L13-* e volte a configuração de dispositivos não gerenciados do SharePoint.

## refs
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-session-lifetime
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation
- https://learn.microsoft.com/en-us/sharepoint/control-access-from-unmanaged-devices

=== L14 | ID Protection: detecções, risco de usuário e de entrada | A | 60
questions: Q088,Q037,Q046,Q047,Q059,Q060,Q084,Q086,Q107,Q119,Q145,Q154,Q202,Q205,Q303
predict: Q088
## overview
Gera risco de verdade no tenant e testa as políticas baseadas em risco.

- **Risco de usuário** (leaked credentials, threat intelligence) × **risco de entrada** (IP anônimo, viagem atípica) (Q037, Q084, Q107, Q119).
- Remediação: risco de entrada → **MFA**; risco de usuário → **troca segura de senha** (exige MFA registrado) (Q046, Q154, Q205).
- **Confirm user compromised** eleva para alto; **Dismiss** zera (Q059, Q088).
- Leaked credentials depende de **password hash sync** (Q202).
- Quem configura (Security Administrator) e quem só vê (Security Operator/Reader) (Q047).

## prereqs
- sc-user01 e sc-user02 com o Authenticator registrado; sc-user03 **sem** MFA registrado.
- **Tor Browser** numa VM descartável (gera detecção de IP anônimo; é o método de simulação documentado pela Microsoft).

## steps
### 1. Políticas baseadas em risco (Conditional Access)
@ Entra: Entra ID > Conditional Access > Policies > New policy

- **SC300-L14-SigninRisk**: Users = grupo SC300-L14 (sc-user01..03) · All resources · Conditions > **Sign-in risk** = Medium, High · Grant: Require multifactor authentication · Session: Sign-in frequency = Every time
- **SC300-L14-UserRisk**: mesmo grupo · Conditions > **User risk** = High · Grant: Require multifactor authentication **e** Require password change · Session: Every time

? A Microsoft está levando as antigas *User risk policy* e *Sign-in risk policy* do ID Protection para políticas de Conditional Access baseadas em risco. Configure por CA.

### 2. Funções
- sc-adm01 = **Security Operator**; sc-adm02 = **Security Reader**.

## test
1. No Tor Browser, entre com **sc-user01**: pede MFA (risco de entrada).
2. No Tor Browser, entre com **sc-user03** (sem MFA): bloqueado.
3. Em @ Entra: Entra ID > ID Protection > Risky users, marque **sc-user02** como **Confirm user compromised**. Entre com ele: MFA + troca de senha.
4. Como sc-adm01 e sc-adm02, tente **dismiss** um risco e tente editar as políticas.

## evidence
- @ Entra: Entra ID > ID Protection > **Risk detections**, **Risky sign-ins** e **Risky users** (nível, tipo de detecção, estado: At risk / Remediated / Dismissed).
- Sign-in logs: colunas de risco de entrada e de usuário.

## expected
| Usuário | Situação | Resultado |
|---|---|---|
| sc-user01 | IP anônimo, com MFA | Entra com MFA; risco remediado |
| sc-user03 | IP anônimo, sem MFA | Bloqueado (não tem como cumprir o MFA) |
| sc-user02 | Confirmado comprometido (alto) | MFA + troca de senha; depois, risco remediado |

- Security Operator pode dispensar risco; Security Reader só lê; só Security Administrator (ou superior) edita políticas (Q047).

## variations
- **Q088:** mude a política de risco de usuário para **Block access** a partir de Low e confirme um usuário como comprometido: nem com MFA ele entra.
- **Q202:** sem password hash sync, a detecção de **leaked credentials** não funciona para usuários sincronizados.
- **Q145:** veja em ID Protection quanto tempo cada relatório guarda (risky sign-ins × risky users).

## breakit
Exclua o grupo SC300-L14 de qualquer política e repita o Tor: a detecção aparece em Risk detections, mas nada é exigido. Detectar não é o mesmo que agir.

## cleanup
Dismiss nos riscos de teste, apague as políticas e remova as funções.

## refs
- https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks
- https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-simulate-risk
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-risk-based-sign-in

=== L15 | Global Secure Access: encaminhamento, sinalização e filtragem web | B | 75
questions: Q398,Q377,Q378,Q397,Q399,Q401,Q411
predict: Q398
## overview
Aproveita o seu lab de GSA (Private e Internet Access já funcionando) para cobrir o que o exame pergunta.

- Perfis de encaminhamento em **Traffic forwarding** (Q378).
- O cliente para Windows exige **Entra joined ou hybrid joined** (Q397, Q399).
- Exigir que o acesso venha pelo cliente: **Global Secure Access signaling** + condição **compliant network** no CA (Q398).
- Bloquear um site: **web content filtering policy** → **security profile** → **política de CA** (Q377, Q411).
- Administração: **Global Secure Access Administrator** (Q401).

## prereqs
- O lab de GSA (conectores LLK85SH20066/67, grupo "vLan 134").
- Uma VM Windows **Entra joined** com o cliente GSA e outra **apenas registrada**.

## steps
### 1. Encaminhamento
@ Entra: Global Secure Access > Connect > Traffic forwarding

- Confira os perfis **Microsoft traffic**, **Private access** e **Internet access** (ligados e atribuídos a SC300-L15-GSA, com sc-user01).

### 2. Sinalização
@ Entra: Global Secure Access > Settings > Session management > **Adaptive access** > *Enable Global Secure Access signaling in Conditional Access* = On

### 3. Exigir rede compatível
@ Entra: Entra ID > Conditional Access > Policies > New policy

- **SC300-L15-RedeOK**: Users = SC300-L15-GSA · Target resources: Office 365 · Conditions > **Network**: Include Any network · Exclude **All Compliant Network locations** · Grant: **Block** · Report-only primeiro.

### 4. Bloquear um site
1. @ Entra: Global Secure Access > Secure > **Web content filtering policies** > Create policy: **SC300-L15-Bloqueio** · Action Block · Rule: FQDN `www.contoso.com` (e uma categoria, como Gambling).
2. @ Entra: Global Secure Access > Secure > **Security profiles** > Create profile: **SC300-L15-Perfil** · vincule a policy · prioridade 100.
3. Nova política de CA **SC300-L15-Web**: Users = SC300-L15-GSA · Target resources: **All internet resources with Global Secure Access** · Session: **Use Global Secure Access security profile** = SC300-L15-Perfil.

## test
1. Tente instalar o cliente GSA na VM só **registrada**.
2. Na VM joined, com o cliente ligado, abra o Outlook web: permitido. Desligue o cliente (Pause) e tente de novo.
3. Abra https://www.contoso.com com o cliente ligado.
4. Entre como um usuário com Privileged Role Administrator e tente mexer em Traffic forwarding.

## evidence
- @ Entra: Global Secure Access > Monitor > **Traffic logs** (ação Block/Allow, regra e perfil).
- Ícone do cliente GSA > Advanced diagnostics (Forwarding profile, Health check).
- Sign-in logs: localização *Compliant network*.

## expected
- Cliente só funciona em dispositivo joined/hybrid joined (Q397).
- Com a política SC300-L15-RedeOK em On, o Office 365 só abre com o cliente ligado (Q398).
- contoso.com é bloqueado com a página do GSA (Q377).
- Privileged Role Administrator não administra o GSA (Q401).

## variations
- Troque a ordem: crie o security profile sem nenhuma policy e use na CA. Nada é bloqueado: a política de filtragem precisa vir primeiro (Q411).
- Coloque uma regra Allow de prioridade maior para contoso.com em outro perfil e veja a ordem de avaliação.

## breakit
Esqueça o passo 2 (sinalização) e ative a política do passo 3: a condição de rede compatível nunca é satisfeita e os usuários ficam bloqueados mesmo com o cliente.

## cleanup
Apague as políticas de CA, o perfil e a política de filtragem SC300-L15-*; deixe o resto do GSA como estava.

## refs
- https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-compliant-network
- https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-configure-web-content-filtering
- https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client

=== L16 | Logs, configurações de diagnóstico, KQL e alertas | B | 60
questions: Q188,Q185,Q212,Q269,Q404,Q248,Q116,Q174,Q176,Q230,Q245,Q182,Q183,Q184,Q181,Q218
predict: Q188
## overview
Leva os logs do Entra para o Log Analytics e cria um alerta.

- **Diagnostic settings** do Entra → workspace do **Log Analytics** (Q185, Q212, Q269, Q404).
- Consulta KQL com **summarize** e **render** (Q248).
- Retenção no portal: **30 dias** com P1/P2 (Q174); download de audit logs em CSV/JSON (Q176).
- Quem recebe o e-mail do alerta é definido no **action group** (Q182, Q183, Q184, Q188).
- Sign-in logs × audit logs × Identity Secure Score × Usage & insights (Q116, Q230, Q245).

## prereqs
- Assinatura Azure e um grupo de recursos **RG-SC300**.

## steps
### 1. Workspace
Azure portal > Log Analytics workspaces > Create: **SC300-LAW** (RG-SC300).

### 2. Diagnostic settings
@ Entra: Entra ID > Monitoring & health > Diagnostic settings > Add diagnostic setting

- Nome: SC300-L16-Diag · Logs: **AuditLogs**, **SignInLogs**, **NonInteractiveUserSignInLogs**, **ServicePrincipalSignInLogs**, **ManagedIdentitySignInLogs**, **RiskyUsers**, **UserRiskEvents**
- Destination: Send to Log Analytics workspace → SC300-LAW

### 3. Alerta de mudança em função privilegiada
Azure portal > SC300-LAW > Alerts > Create > Alert rule:
- Signal: **Custom log search**
```kusto
AuditLogs
| where OperationName == "Add member to role"
| project TimeGenerated, InitiatedBy, TargetResources
```
- Evaluation: a cada 5 minutos · Threshold > 0
- Actions: **Create action group** SC300-L16-AG com notificação por e-mail para um endereço seu.

## test
1. Espere ~15 minutos e rode no workspace:
```kusto
SigninLogs
| where ResultType == 0
| summarize login_count = count() by Identity
| render columnchart
```
2. Atribua uma função qualquer a sc-adm03 e espere o e-mail do alerta.
3. Troque o destinatário no **action group** (não na regra) e repita.
4. Baixe os audit logs pelo portal (Download > JSON/CSV).

## evidence
- Tabelas **SigninLogs** e **AuditLogs** no workspace.
- Azure Monitor > Alerts > histórico de disparos.

## expected
- O gráfico de logins por usuário aparece (Q248).
- O e-mail chega ao endereço do **action group**; mudar diagnostic settings ou data collection rules não muda o destinatário (Q183, Q184, Q188).

## variations
- **Q245:** @ Entra: Entra ID > Monitoring & health > **Usage & insights** > Microsoft Entra application activity — logins com sucesso/falha por app, já agregados.
- **Q230:** locais e IPs → Sign-in logs; mudanças em objetos → Audit logs; recomendações → Identity Secure Score.
- **Q181 e Q218 (borderline):** se quiser, conecte o Microsoft Sentinel ao workspace e habilite o conector do Entra ID Protection.

## breakit
Crie o diagnostic setting só com **AuditLogs** e rode a consulta de SigninLogs: a tabela não existe no workspace.

## cleanup
Apague a regra de alerta, o action group, o diagnostic setting e o workspace (custo).

## refs
- https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-integrate-activity-logs-with-azure-monitor-logs
- https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups
- https://learn.microsoft.com/en-us/entra/identity/monitoring-health/reference-reports-data-retention
