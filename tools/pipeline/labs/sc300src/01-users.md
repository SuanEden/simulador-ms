=== L01 | Usuários, grupos e licenciamento por grupo | A | 50
questions: Q013,Q001,Q197,Q201,Q004,Q110,Q122,Q301,Q302,Q007,Q009,Q228,Q027,Q030,Q227,Q072,Q204,Q251,Q271,Q025,Q074,Q075,Q091,Q120
predict: Q013
## overview
Testa o básico de identidades que aparece em muitas questões: tipos de grupo, quem pode ser membro de quê, grupos dinâmicos e licenças atribuídas por grupo.

- Licença por grupo **não é herdada por grupos aninhados**: só os membros diretos consomem (Q013).
- Licença precisa de grupo de **segurança** (ou M365 com segurança habilitada); dispositivos não consomem (Q001).
- Licença direta × herdada: remover em massa as diretas pelo blade **Licenses** ou pelo `Set-MgUserLicense` (Q004, Q301).
- Grupo M365 só aceita usuários; grupo de segurança aceita grupos de segurança; managed identity só em grupo de segurança atribuído (Q009, Q228).
- Regras dinâmicas: precedência de `-and` sobre `-or`, `null` sem aspas, só membros (Q072, Q204, Q251).
- Atributos de usuário sincronizado só mudam no AD (Q030); restauração em 30 dias (Q227); política de nomenclatura (Q271).

## prereqs
- sc-user01 a sc-user04 (ambiente de referência) e um usuário **sincronizado** do lab.local.
- Pelo menos uma licença livre de algum produto além do E5 (ex.: Entra Suite) para os testes de licença por grupo.

## steps
### 1. Grupos e aninhamento
@ Entra: Entra ID > Groups > All groups > New group

- **SC300-L01-Licenca** (Security, Assigned): sc-user01 + o grupo SC300-L01-Filho
- **SC300-L01-Filho** (Security, Assigned): sc-user02
- **SC300-L01-M365** (Microsoft 365, Assigned): tente adicionar SC300-L01-Filho como membro

### 2. Licença por grupo
@ Entra: Entra ID > Billing > Licenses > All products > Entra Suite > Assign

Atribua ao grupo **SC300-L01-Licenca**. Outro caminho: @ Entra: Entra ID > Groups > All groups > SC300-L01-Licenca > Licenses > Assignments.

### 3. Grupos dinâmicos
Crie três grupos **Dynamic User**:
```text
SC300-L01-SoMembros    (user.objectId -ne null) and (user.userType -eq "Member")
SC300-L01-SemDepto     (user.department -eq null)
SC300-L01-Precedencia  user.country -eq "BR" -or user.department -eq "Vendas" -and user.jobTitle -eq "Gerente"
```
Ajuste o department/jobTitle/country de sc-user03 e sc-user04 para ver quem entra em cada regra (use **Validate rules** antes de salvar).

### 4. Criação em massa
@ Entra: Entra ID > Users > All users > Bulk operations > Bulk create > Download

Abra o CSV e veja quais colunas vêm marcadas como obrigatórias.

### 5. Política de nomenclatura de grupos
@ Entra: Entra ID > Groups > Naming policy

- Group naming policy: prefixo `GRP-`. Salve.

## test
1. Confira as licenças de sc-user01 e sc-user02 (@ Entra: Entra ID > Users > (usuário) > Licenses).
2. Tente adicionar o grupo SC300-L01-Filho ao grupo M365.
3. Veja os membros de cada grupo dinâmico (pode levar alguns minutos).
4. Abra um usuário **sincronizado** e tente editar o Job title; depois o Usage location.
5. Apague sc-user04, veja em @ Entra: Entra ID > Users > Deleted users e restaure.
6. Crie um grupo M365 pelo Outlook/Teams com sc-user01 (sem função) e com um admin: só o do sc-user01 recebe o prefixo `GRP-`.

## evidence
- Licenças do usuário: coluna **Assignment paths** (Direct ou Inherited do grupo).
- Grupo dinâmico: **Dynamic membership rules** > Validate rules e a lista de membros.
- @ Entra: Entra ID > Monitoring & health > Audit logs (criação, exclusão, restauração).

## expected
| Teste | Resultado |
|---|---|
| sc-user01 (membro direto) | Recebe a licença (Inherited) |
| sc-user02 (só no grupo aninhado) | **Não** recebe (Q013) |
| Grupo de segurança dentro do M365 | Não permitido |
| `-and` antes de `-or` | O usuário do BR entra mesmo sem ser gerente de vendas (Q072) |
| Usuário sincronizado | Job title bloqueado; Usage location editável (Q030) |
| Usuário excluído | Restaurável por 30 dias, por um User Administrator (Q227) |
| Naming policy | Não afeta admins privilegiados (Q271) |

## variations
- **Q004 / Q301:** atribua a licença também **direto** a sc-user01. Remova as diretas em massa em @ Entra: Entra ID > Billing > Licenses > All products > (produto) > Licensed users, ou por script:
```powershell
Connect-MgGraph -Scopes "User.ReadWrite.All","Organization.Read.All"
$sku = (Get-MgSubscribedSku | Where-Object SkuPartNumber -eq "ENTRA_SUITE").SkuId   # confira o nome com Get-MgSubscribedSku
Set-MgUserLicense -UserId "sc-user01@camposlab.online" -AddLicenses @() -RemoveLicenses @($sku)
```
- **Q025, Q074, Q075, Q091, Q120 (borderline):** essas questões usam `Set-MsolUserLicense`, do módulo MSOnline aposentado. O equivalente atual é o `Set-MgUserLicense` acima.
- **Q201:** para licenciar por um atributo customizado do AD, o Entra Connect precisa de **Directory extensions** e o grupo dinâmico usa `user.extension_<appId>_<atributo>`.
- **Q228:** crie uma managed identity (L19) e tente adicioná-la a um grupo M365 e a um grupo de segurança.

## breakit
Use `"null"` entre aspas na regra do SC300-L01-SemDepto. O grupo fica vazio: a regra procura o texto literal "null".

## cleanup
Apague os grupos SC300-L01-*, desfaça a naming policy e devolva as licenças.

## refs
- https://learn.microsoft.com/en-us/entra/identity/users/licensing-groups-assign
- https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership
- https://learn.microsoft.com/en-us/entra/identity/users/groups-naming-policy

=== L02 | Unidades administrativas e funções do Entra | A | 50
questions: Q048,Q070,Q071,Q101,Q139,Q246,Q317,Q113,Q243,Q054,Q073,Q123,Q203,Q103,Q229,Q021,Q102
predict: Q048
## overview
Testa a delegação com escopo e o menor privilégio nas funções do Entra.

- **Administrative unit** limita o escopo de uma função a usuários, grupos e dispositivos (Q246, Q101, Q070).
- Grupo dentro da AU traz o **grupo** para o escopo (gerenciar membros), **não** os usuários dele (Q048, Q071, Q139).
- Nem toda função aceita escopo de AU (Security Administrator, por exemplo, não) (Q317).
- Quem redefine senha de quem: Helpdesk, Password, Authentication e User Administrator (Q054, Q073, Q243).
- Grupo para atribuir funções precisa nascer com **isAssignableToRole** (Q103, Q229).

## prereqs
- sc-user01 a sc-user04; sc-adm01 e sc-adm02 sem funções.

## steps
### 1. Administrative unit
@ Entra: Entra ID > Roles & admins > Admin units > Add

- Nome: **SC300-L02-AU**
- Membros: usuários **sc-user01** e **sc-user02** e o grupo **SC300-L02-Grupo** (que contém sc-user03).

### 2. Função com escopo na AU
@ Entra: Entra ID > Roles & admins > Admin units > SC300-L02-AU > Roles and administrators > User Administrator > Add assignments

- Atribua a **sc-adm01**.

### 3. Função no tenant
@ Entra: Entra ID > Roles & admins > Roles & admins > Helpdesk Administrator > Add assignments → **sc-adm02**.

### 4. Grupo atribuível a funções
@ Entra: Entra ID > Groups > All groups > New group

- **SC300-L02-Admins** · Security · **Microsoft Entra roles can be assigned to the group = Yes** · Membership type: Assigned.
- Tente criar outro com Membership type **Dynamic User** e a opção de funções em Yes.

## test
1. Entre como **sc-adm01** (InPrivate) e tente redefinir a senha de sc-user01, sc-user03 e sc-user04.
2. Como sc-adm01, adicione sc-user04 ao SC300-L02-Grupo e a outro grupo fora da AU.
3. Entre como **sc-adm02** (Helpdesk) e tente redefinir a senha de sc-user04 e de sc-adm01.
4. Tente atribuir **Security Administrator** com escopo na SC300-L02-AU.
5. Em Roles & admins, atribua uma função ao SC300-L02-Admins; tente o mesmo com um grupo de segurança comum.

## evidence
- O que o portal deixa ou não deixar fazer para cada conta.
- @ Entra: Entra ID > Roles & admins > Roles & admins > (função) > **Assignments** — coluna **Scope**.
- Audit logs (quem redefiniu senha de quem).

## expected
| Ação | Resultado |
|---|---|
| sc-adm01 redefine sc-user01 (na AU) | Permitido |
| sc-adm01 redefine sc-user03 (só via grupo na AU) | **Negado** (Q071) |
| sc-adm01 gerencia membros do SC300-L02-Grupo | Permitido (Q048) |
| sc-adm01 mexe em grupo fora da AU | Negado (Q139) |
| sc-adm02 (Helpdesk) redefine sc-user04 | Permitido |
| sc-adm02 redefine sc-adm01 (User Admin) | Negado |
| Security Administrator com escopo de AU | Opção indisponível (Q317) |
| Grupo dinâmico atribuível a funções | Não permitido (Q229) |

## variations
- **Q070:** para redefinir senha **e** gerenciar métodos de autenticação de um grupo restrito, use **Authentication Administrator** com escopo de AU.
- **Q113:** crie uma função personalizada (@ Entra: Entra ID > Roles & admins > Roles & admins > New custom role) e veja quais permissões existem.
- **Q021 e Q102:** @ Entra: Entra ID > Devices > Overview > Device settings — o **Maximum number of devices per user** conta joined + registered.
- **Q203:** atribuições de função do Entra se delegam com Privileged Role Administrator; do Azure RBAC, com User Access Administrator.

## breakit
Crie a AU como **restricted management administrative unit** e coloque nela sc-user01. Agora nem o Global Administrator do tenant altera sc-user01 fora do escopo da AU: só quem tem função na própria AU.

## cleanup
Remova as atribuições, apague a AU e os grupos SC300-L02-*.

## refs
- https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units
- https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/privileged-roles-permissions
- https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/groups-concept

=== L03 | Colaboração externa (B2B): convites, restrições e senha de uso único | C | 60
questions: Q005,Q109,Q137,Q144,Q235,Q003,Q067,Q299,Q014,Q024,Q136,Q370,Q006,Q019,Q135,Q026,Q033
predict: Q067
## overview
Testa como convidados entram no tenant e as travas sobre isso.

- **External collaboration settings**: quem pode convidar, o que o guest enxerga, domínios permitidos/bloqueados (Q109, Q137, Q144, Q235).
- Convite já resgatado continua valendo depois de uma restrição nova (Q005).
- **Email one-time passcode** só para quem não tem conta Entra, Microsoft account nem federação; código vale 30 minutos (Q003, Q067, Q299).
- **Reset redemption status** quando o e-mail do guest muda (Q136).
- Convite por **New-MgInvitation** e em massa por CSV (Q370, Q006).
- **Self-service sign-up** com user flow e cobrança por MAU com linked subscription (Q026, Q019, Q135).

## prereqs
- Um e-mail pessoal **Gmail** (sem federação Google configurada) e uma **Microsoft account** (outlook.com/hotmail).
- Opcional: um usuário de outro tenant Entra (o "tenant parceiro").
- Um app de teste para dar acesso (o SharePoint do tenant serve).

## steps
### 1. External collaboration settings
@ Entra: Entra ID > External Identities > External collaboration settings

Anote os valores atuais e configure:
- Guest user access: **Guest user access is restricted to properties and memberships of their own directory objects**
- Guest invite settings: **Only users assigned to specific admin roles can invite guest users**
- Enable guest self-service sign up via user flows: **No**
- Collaboration restrictions: **Allow invitations only to the specified domains** → `gmail.com`, `outlook.com`

### 2. Identity providers
@ Entra: Entra ID > External Identities > All identity providers

- Confira se **Email one-time passcode** está habilitado.

### 3. Convites
1. @ Entra: Entra ID > Users > All users > New user > **Invite external user** → o Gmail.
2. Mesmo caminho → a Microsoft account.
3. Por PowerShell (Q370):
```powershell
Connect-MgGraph -Scopes "User.Invite.All"
New-MgInvitation -InvitedUserEmailAddress "voce@gmail.com" `
  -InviteRedirectUrl "https://myapps.microsoft.com" -SendInvitationMessage:$true
```
4. Em massa (Q006): @ Entra: Entra ID > Users > All users > Bulk operations > **Bulk invite** > baixe o CSV e veja as colunas obrigatórias.

## test
1. Resgate o convite no Gmail: o login pede um **código por e-mail** (OTP). Anote quanto tempo o código vale.
2. Resgate na Microsoft account: entra com a senha da conta Microsoft, sem OTP.
3. Como **sc-user01** (sem função), tente convidar alguém: bloqueado.
4. Tente convidar um endereço `@yahoo.com`: o domínio não está na lista permitida.
5. Como guest, abra https://myaccount.microsoft.com e tente procurar outros usuários do diretório.
6. Mude o e-mail do guest Gmail (outro Gmail seu) e use **Reset redemption status** no perfil do usuário.

## evidence
- Usuário guest: **Identities** (MailOTP, MicrosoftAccount, ExternalAzureAD) e **Invitation state**.
- Sign-in logs: coluna de identidade/provedor de cada guest.
- Audit logs: convites bloqueados por restrição de domínio.

## expected
- Gmail → **Email one-time passcode**; código válido por **30 minutos** (Q067).
- Microsoft account → entra com a própria conta, sem OTP (o ponto polêmico da Q003).
- Usuário sem função não convida; domínio fora da lista é recusado (Q109, Q144).
- Guest restrito não enxerga a lista de usuários (Q109).
- Reset redemption status mantém o objeto e os acessos e refaz o resgate (Q136).

## variations
- **Q005:** com o Gmail já resgatado, remova `gmail.com` da lista permitida. O guest continua acessando: a restrição só vale para **novos convites**.
- **Q026 e Q135:** ligue o self-service sign-up, crie um **user flow** (@ Entra: Entra ID > External Identities > User flows) com atributos extras e associe a um app. A cobrança por MAU depende de **Linked subscriptions** (@ Entra: Entra ID > External Identities > Linked subscriptions).
- **Q033:** com o tenant parceiro, convide um usuário dele: ele entra como **ExternalAzureAD**, com a conta do tenant de origem.

## breakit
Coloque `gmail.com` em **Deny invitations to the specified domains** e reenvie o convite ao Gmail. O convite falha logo no envio.

## cleanup
Volte as External collaboration settings ao valor anotado; apague os guests e os user flows.

## refs
- https://learn.microsoft.com/en-us/entra/external-id/external-collaboration-settings-configure
- https://learn.microsoft.com/en-us/entra/external-id/one-time-passcode
- https://learn.microsoft.com/en-us/entra/external-id/reset-redemption-status

=== L04 | Acesso entre tenants e sincronização entre tenants | C | 60
questions: Q348,Q369,Q033
predict: Q348
## overview
Precisa de um segundo tenant. Testa a **cross-tenant synchronization**, que cria usuários B2B no tenant de destino automaticamente.

- O escopo por grupo sincroniza só os **membros diretos** (Q348).
- Sincroniza **usuários**, não grupos (Q369).
- Depende das **cross-tenant access settings** nos dois lados.

## prereqs
- Tenant de origem: camposlab.online (origem). Tenant de destino: o "tenant parceiro".
- Global Administrator (ou Hybrid Identity Administrator + Security Administrator) nos dois.
- No camposlab: grupos **SC300-L04-Pai** (com sc-user01 e o grupo SC300-L04-Filho) e **SC300-L04-Filho** (com sc-user02); um guest qualquer (L03).

## steps
### 1. No tenant de destino
@ Entra: Entra ID > External Identities > Cross-tenant access settings > Organizational settings > Add organization → o tenant ID do camposlab.

- Inbound access > **Cross-tenant sync**: marque **Allow users sync into this tenant**.
- Inbound access > **Trust settings**: marque **Automatically redeem invitations with the tenant**.

### 2. No tenant de origem (camposlab)
1. @ Entra: Entra ID > External Identities > Cross-tenant access settings > Organizational settings > Add organization → o tenant parceiro.
2. Outbound access > Trust settings: **Automatically redeem invitations with the tenant**.
3. @ Entra: Entra ID > External Identities > Cross-tenant synchronization > Configurations > New configuration: **SC300-L04-Sync**.
4. Provisioning > Get started > Admin credentials: o tenant ID do destino > Test connection.
5. Users and groups: adicione **SC300-L04-Pai** e o guest do L03.
6. Start provisioning (ou **Provision on demand** com sc-user01 para ver o detalhe na hora).

## test
1. Use **Provision on demand** com sc-user01 e depois com sc-user02.
2. No tenant de destino, confira os usuários criados (tipo **Member** ou Guest, conforme o mapeamento userType).
3. Confira se o grupo SC300-L04-Pai aparece no destino.

## evidence
- Configuração > **Provisioning logs** (cada objeto avaliado, motivo de skip).
- No destino: Users > All users — Creation type e userType.

## expected
- sc-user01 (membro direto) é sincronizado.
- sc-user02 (membro só do grupo aninhado) **não** é (Q348).
- Nenhum grupo é criado no destino; grupos servem só para escopo (Q369).
- O guest atribuído diretamente é avaliado de acordo com o escopo (veja o motivo no Provisioning log; o resultado depende do filtro de userType da configuração).

## variations
- Mude o mapeamento de atributo **userType** para Guest e veja os usuários chegarem como convidados.
- **Q033:** sem sincronização, a alternativa é convidar os usuários como guests (B2B manual, L03).

## breakit
Desmarque **Allow users sync into this tenant** no destino e rode o provisionamento. O log mostra a falha de autorização.

## cleanup
Pare e apague a configuração de sincronização; remova as organizações das cross-tenant access settings; apague os usuários criados no destino.

## refs
- https://learn.microsoft.com/en-us/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-configure
- https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-settings-b2b-collaboration

=== L05 | Entra Connect: filtros, PTA, write-back e SSO contínuo | B | 120
questions: Q011,Q010,Q012,Q017,Q076,Q016,Q023,Q114,Q361,Q015,Q018,Q198,Q104,Q121,Q140,Q028,Q032,Q146,Q394
predict: Q011
## overview
Usa o Entra Connect do LLK85SH20053 para testar os métodos de autenticação híbrida e a filtragem de sincronização.

- Usuário desabilitado no AD com **PHS** continua entrando até a próxima sincronização; com **PTA**, é bloqueado na hora (Q010, Q011, Q012, Q017).
- PTA aplica a política de bloqueio de conta do AD (Q361) e exige agentes em servidores membros com saída para a internet (Q023).
- **Password writeback** é o que permite SSPR para usuários sincronizados (Q076, Q146).
- Filtragem por grupo sincroniza só membros diretos (Q018); filtragem por atributo usa regra **inbound** no conector do AD (Q015).
- **Seamless SSO** exige a URL do autologon na zona Intranet dos navegadores (Q028, Q032).

## prereqs
- Entra Connect (Sync) no LLK85SH20053 funcionando, com a OU de usuários do lab.local no escopo.
- Dois usuários de teste no AD: **lab-sync01** e **lab-sync02**, sincronizados e com licença E5 no tenant.
- Um servidor membro com saída para a internet para o agente extra de PTA (ex.: LLK85SH20066).
- Anote o método de entrada atual do tenant (provavelmente PHS) para voltar no final.

## steps
### 1. Teste de base com PHS
1. Desabilite **lab-sync01** no AD (Active Directory Users and Computers > Disable Account).
2. **Não** force a sincronização. Tente entrar em https://myaccount.microsoft.com com ele numa janela InPrivate.

### 2. Mude para PTA
No LLK85SH20053, abra o **Microsoft Entra Connect** > Configure > **Change user sign-in**:
- Entre com um Global Administrator.
- Selecione **Pass-through authentication** · mantenha **Enable single sign-on** marcado · Next > Configure.

Agente extra (alta disponibilidade): @ Entra: Entra ID > Entra Connect > Connect Sync > Pass-through authentication > Download, instale no LLK85SH20066 e entre com um Global Administrator.

### 3. Password writeback e SSPR
- Entra Connect > Configure > Customize synchronization options > Optional features: **Password writeback**.
- @ Entra: Entra ID > Password reset > On-premises integration: **Enable password write back for synced users** = Yes.

### 4. Filtragem por atributo (Q015)
No LLK85SH20053, abra o **Synchronization Rules Editor** > Direction **Inbound** > Add new rule:
- Connected System: lab.local · Connected System Object Type: user · Metaverse Object Type: person · Link Type: Join · Precedence: 50
- Scoping filter: `extensionAttribute15` **EQUAL** `NoSync`
- Transformations: Constant · Target Attribute **cloudFiltered** · Source **True** · Apply Once.

Depois: `Start-ADSyncSyncCycle -PolicyType Initial`.

### 5. Seamless SSO
GPO para os clientes do domínio:

@ GPO: User Configuration > Policies > Administrative Templates > Windows Components > Internet Explorer > Internet Control Panel > Security Page > Site to Zone Assignment List

Valor: `https://autologon.microsoftazuread-sso.com` = **1** (Intranet).

## test
1. Com PTA ativo, desabilite **lab-sync02** no AD e tente entrar com ele imediatamente.
2. Erre a senha do lab-sync02 até estourar a política de bloqueio do AD e veja o efeito no Entra.
3. Com writeback ligado, use o SSPR (https://aka.ms/sspr) com lab-sync01 (reabilitado) e depois entre num PC do domínio com a nova senha.
4. Coloque `NoSync` no extensionAttribute15 de lab-sync02 e rode o ciclo: ele some do Entra (vai para Deleted users).
5. Num PC do domínio com a GPO, abra o portal: entra sem digitar senha.

## evidence
- @ Entra: Entra ID > Entra Connect > Connect Sync — status de PHS, PTA, Seamless SSO e agentes.
- Sign-in logs: o detalhe de autenticação mostra a validação pelo agente PTA.
- No servidor: **Synchronization Service Manager** (Operations) e o Event Viewer do agente PTA (Microsoft > AzureAdConnect > AuthenticationAgent > Admin).

## expected
| Teste | Resultado |
|---|---|
| PHS + usuário desabilitado, sem sync | Ainda entra (até a próxima sincronização) |
| PTA + usuário desabilitado | Bloqueado na hora (Q011) |
| PTA + conta bloqueada no AD | Bloqueado no Entra também (Q361) |
| SSPR com writeback | A nova senha vale no AD (Q076) |
| extensionAttribute15 = NoSync | Usuário filtrado (Q015) |

## variations
- **Q016:** com PTA, pare os dois agentes (serviço Microsoft Entra Connect Authentication Agent) e tente entrar: usuários sincronizados falham, usuários só nuvem continuam entrando.
- **Q018:** em Customize synchronization options > Filtering, use filtragem por grupo com um grupo aninhado e veja que os membros do aninhado não sincronizam.
- **Q104:** para uma floresta sem trust com a sua (como a litware.com do estudo de caso), a solução é **Entra Cloud Sync** com agente na outra floresta.
- **Q140:** desabilite no portal do Entra um usuário sincronizado e veja o Entra Connect reverter na próxima sincronização.

## breakit
Instale o agente de PTA num servidor sem saída para a internet (bloqueie no firewall do Hyper-V/Palo Alto). O agente aparece como inativo no portal e não atende os logins.

## cleanup
- Volte o sign-in para o método anotado (Change user sign-in).
- Apague a regra de sincronização customizada, limpe o extensionAttribute15 e rode um ciclo Initial.
- Reabilite os usuários de teste; remova a GPO.

## refs
- https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta-quick-start
- https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-configure-filtering
- https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr-writeback
- https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sso-quick-start

=== L06 | Domínios, identidade visual e tenants não gerenciados | A | 40
questions: Q020,Q396,Q008,Q002,Q124,Q349,Q022
predict: Q020
## overview
Testa a configuração do tenant que aparece em questões de "primeiro passo".

- Domínio personalizado: adicionar → TXT → verificar → definir como primário (Q020).
- **Company branding** com personalização por idioma do navegador (Q396).
- Bloquear o **self-service sign-up** (contas "virais") com `Update-MgPolicyAuthorizationPolicy` (Q349, Q002, Q124) e o **admin takeover** de um tenant não gerenciado (Q008).

## prereqs
- Um domínio seu com acesso ao DNS público (ou um subdomínio de camposlab.online).

## steps
### 1. Domínio personalizado
@ Entra: Entra ID > Domain names > Add custom domain

1. Informe o domínio e copie o registro **TXT** (MS=ms...).
2. Crie o TXT no DNS público.
3. Volte e clique em **Verify**.
4. No domínio verificado: **Make primary**.

### 2. Company branding com idioma
@ Entra: Entra ID > Custom branding > Default sign-in experience > Edit

- Imagem de fundo, logo, texto da página de entrada.
- Depois: **+ Customize by browser language** > Spanish (Español) > uma imagem e texto diferentes.

### 3. Bloquear self-service sign-up
```powershell
Connect-MgGraph -Scopes "Policy.ReadWrite.Authorization"
Get-MgPolicyAuthorizationPolicy | Select AllowedToSignUpEmailBasedSubscriptions, AllowEmailVerifiedUsersToJoinOrganization
Update-MgPolicyAuthorizationPolicy -AllowedToSignUpEmailBasedSubscriptions:$false -AllowEmailVerifiedUsersToJoinOrganization:$false
```

## test
1. Crie um usuário com UPN no domínio novo e entre com ele.
2. Abra https://portal.office.com num navegador com idioma **espanhol** como primeiro idioma (edge://settings/languages) e digite um usuário do tenant: aparece o branding em espanhol.
3. Rode de novo o `Get-MgPolicyAuthorizationPolicy` para confirmar os valores.

## evidence
- Domain names: status **Verified** e **Primary**.
- A página de entrada com o branding do idioma.

## expected
- Domínio verificado por TXT e definido como primário; o `.onmicrosoft.com` não pode ser removido.
- Branding diferente por idioma do navegador (Q396).
- Self-service sign-up bloqueado: usuários com e-mail do seu domínio não criam mais contas "virais" (Q349).

## variations
- **Q008:** o **admin takeover** interno segue: criar conta self-service com o e-mail do domínio → entrar no Microsoft 365 admin center → responder **Become the admin** → provar o domínio com TXT. Só dá para testar se existir um tenant não gerenciado com um domínio seu.
- **Q002 e Q124 (borderline):** as questões usam `Set-MsolCompanySettings` (MSOnline, aposentado). O equivalente atual é o comando do passo 3.

## breakit
Tente definir como primário um domínio ainda **não verificado**: a opção fica indisponível.

## cleanup
Volte o domínio primário para o anterior (remova o domínio só se nenhum objeto usar), apague o branding de teste e decida se mantém o bloqueio do self-service sign-up.

## refs
- https://learn.microsoft.com/en-us/entra/fundamentals/add-custom-domain
- https://learn.microsoft.com/en-us/entra/fundamentals/how-to-customize-branding
- https://learn.microsoft.com/en-us/entra/identity/users/directory-self-service-signup

=== L07 | Atributos de segurança personalizados | A | 30
questions: Q368,Q408
predict: Q408
## overview
Testa quem cria, atribui e lê **custom security attributes**.

- Nem o Global Administrator tem acesso por padrão (Q408).
- **Attribute Definition Administrator** cria atributos; **Attribute Assignment Administrator** atribui e lê valores (Q368, Q408).
- Atributos vão em usuários e **service principals** (inclui managed identities), não em grupos (Q368).

## prereqs
- sc-adm01, sc-adm02 e sc-adm03 sem funções; uma enterprise application qualquer (ex.: a do L18).

## steps
1. Dê a si mesmo (Global Administrator) as funções **Attribute Definition Administrator** e **Attribute Assignment Administrator** para montar o cenário.
2. @ Entra: Entra ID > Custom security attributes > Add attribute set → **SC300Set1**; Add attribute → **Projeto** (String, valores predefinidos: Alfa, Beta).
3. Crie o set **SC300Set2** com o atributo **Sensivel**.
4. Funções com escopo:
   - **sc-adm01**: Global Administrator (só para o teste; remova depois)
   - **sc-adm02**: Attribute Definition Administrator com escopo no **SC300Set1** (no attribute set > Roles and administrators)
   - **sc-adm03**: Attribute Assignment Administrator no tenant
5. Atribua **Projeto = Alfa** a sc-user01: @ Entra: Entra ID > Users > sc-user01 > Custom security attributes > Add assignment.

## test
1. Como **sc-adm01** (Global Admin), abra Custom security attributes e tente ver ou editar o SC300Set1.
2. Como **sc-adm02**, edite o atributo Projeto; tente ler o valor de sc-user01.
3. Como **sc-adm03**, leia e altere o valor de sc-user01; atribua Sensivel a uma enterprise application.
4. Tente atribuir um atributo a um **grupo**.

## evidence
- O que cada conta vê no portal.
- @ Entra: Entra ID > Monitoring & health > Audit logs (categoria de custom security attributes, separada).

## expected
| Conta | Resultado |
|---|---|
| Global Administrator sem as funções de atributo | Sem acesso |
| Attribute Definition Administrator (Set1) | Define/edita o atributo, mas **não lê** os valores atribuídos |
| Attribute Assignment Administrator | Lê e atribui valores em usuários e enterprise apps |
| Grupo | Não aceita custom security attributes |

## variations
O mesmo atributo pode alimentar **condições de ABAC** no Azure RBAC (veja o L20).

## breakit
Tente desativar um atributo que já tem valores: ele pode ser **desativado**, mas não apagado.

## cleanup
Desative os atributos de teste (não dá para apagar), remova as funções de sc-adm01..03.

## refs
- https://learn.microsoft.com/en-us/entra/fundamentals/custom-security-attributes-overview
- https://learn.microsoft.com/en-us/entra/fundamentals/custom-security-attributes-manage
