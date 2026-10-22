=== L23 | Gerenciamento de direitos: catálogos, pacotes de acesso e usuários externos | B | 75
questions: Q354,Q031,Q097,Q126,Q173,Q180,Q187,Q213,Q219,Q247,Q281,Q409,Q192,Q353
predict: Q354
## overview
Monta um access package de ponta a ponta, com solicitação, aprovação, expiração e usuários externos.

- **Catálogo** agrupa recursos; **access package** distribui; um pacote pode ter **várias políticas** (Q354, Q219, Q126).
- Delegar criação de catálogos: **Catalog creators** nas Settings (Q031).
- Externos: **connected organization**, e o ciclo de vida (bloquear e remover X dias depois da última atribuição) em **Settings** (Q173, Q180, Q192, Q213).
- Ninguém aprova a própria solicitação (Q353).
- Quem gerencia: **Identity Governance Administrator**, Catalog owner, Access package manager (Q409, Q247).

## prereqs
- Grupos **SC300-L23-Vendas** (sc-user01) e **SC300-L23-TI** (sc-user02); **SC300-L23-Recurso** (grupo que dá o acesso); um site do SharePoint.
- O tenant parceiro (L04) como connected organization, ou um Gmail para externo sem tenant.

## steps
### 1. Configurações
@ Entra: Entra ID > Identity Governance > Entitlement management > Settings

- Manage the lifecycle of external users: **Block external user from signing in** = Yes · **Remove external user** = Yes · Number of days before removing = **1** (para o teste; o padrão é 30)
- Delegate entitlement management > Catalog creators: adicione **sc-adm01**

### 2. Catálogo (como sc-adm01)
@ Entra: Entra ID > Identity Governance > Entitlement management > Catalogs > New catalog

- **SC300-L23-Cat** · Enabled for external users: Yes · Resources: SC300-L23-Recurso (Member) e o site do SharePoint (Member)

### 3. Connected organization
@ Entra: Entra ID > Identity Governance > Entitlement management > Connected organizations > Add connected organization → o domínio do tenant parceiro.

### 4. Access package com duas políticas
Catalogs > SC300-L23-Cat > Access packages > New access package **SC300-L23-Pkg**:
- Resource roles: o grupo e o site
- Política 1 — *For users in your directory* > Specific users and groups: **SC300-L23-Vendas** · Require approval: Yes · Approver: **sc-user02** · Expiration: 1 dia
- Depois de criar: Policies > Add policy — Política 2 — *For users not in your directory* > Specific connected organizations: a do passo 3 · Approver: sc-user02

## test
1. Como **sc-user01**, abra https://myaccess.microsoft.com, peça o SC300-L23-Pkg com justificativa.
2. Como **sc-user02**, aprove em My Access > Approvals. Tente pedir o pacote como sc-user02 (ele está no grupo de TI, não no de Vendas).
3. Adicione sc-user02 como aprovador e peça como ele (se tiver como) — ele não aprova a si mesmo.
4. Como um usuário do **tenant parceiro**, abra o link do pacote (Access package > Overview > *My Access portal link*) e peça.
5. Remova a atribuição do externo e acompanhe: bloqueio e remoção do guest depois do prazo.

## evidence
- Access package > **Assignments** e **Requests** (estado de cada pedido).
- O grupo SC300-L23-Recurso ganha o membro quando a atribuição é entregue.
- @ Entra: Entra ID > Identity Governance > Entitlement management > **Reports**; Audit logs (categoria EntitlementManagement).

## expected
- sc-user01 recebe o grupo e o site depois da aprovação; perde quando a atribuição expira.
- sc-user02 não vê o pacote para pedir (não está na política).
- O externo da connected organization pede pelo link, vira guest e, ao perder a última atribuição, é bloqueado e removido (Q192).
- Um pacote com duas políticas resolve públicos diferentes com aprovadores diferentes (Q354).

## variations
- **Q126:** em Catalog > **Custom extensions**, veja que a extensão exige um **Azure Logic App** existente.
- **Q180:** para liberar só um domínio do parceiro, use a política do pacote; para bloquear outro domínio no tenant, as External collaboration settings (L03).
- **Q097 e Q281:** crie uma política com **automatic assignment** (regra de atributo) ou aprovação automática e expiração de 30 ou 90 dias.

## breakit
Remova o site do catálogo com o pacote em uso: as atribuições existentes perdem esse recurso. Recurso fora do catálogo não pode estar em nenhum pacote.

## cleanup
Remova as atribuições, apague o pacote, o catálogo e a connected organization; volte o prazo de remoção de externos para 30.

## refs
- https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-create
- https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-external-users
- https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-delegate

=== L24 | Revisões de acesso | B | 75
questions: Q179,Q138,Q163,Q164,Q168,Q169,Q170,Q171,Q175,Q177,Q189,Q190,Q191,Q194,Q196,Q234,Q240,Q319,Q351,Q389,Q391,Q413,Q068
predict: Q179
## overview
Cria revisões de acesso de grupos, apps e funções, e mostra o efeito do resultado.

- O que pode ser revisado: grupos (de usuários), apps, funções do Entra e funções do Azure (Q163, Q175).
- Revisores: **Members (self)**, **Group owners**, **Selected users**, **Managers** com **fallback** (Q164, Q169, Q170, Q171, Q177).
- **Upon completion settings**: aplicar resultados, *If reviewers don't respond* (Q196, Q319).
- Revisão de **funções do Entra** pelo PIM exige **Privileged Role Administrator** (Q240, Q351).
- Janela de resposta = duração da instância; a próxima instância só começa na data da recorrência (Q179).

## prereqs
- Grupo **SC300-L24-Projeto** com sc-user01, sc-user02 e um **guest** (L03); owner: sc-adm01.
- sc-user01 com **Manager** = sc-adm01; sc-user02 **sem** gerente.

## steps
### 1. Revisão de guests pelo dono
@ Entra: Entra ID > Identity Governance > Access reviews > New access review

- Select what to review: **Teams + Groups** · Review scope: Select Teams + groups → SC300-L24-Projeto · Scope: **Guest users only**
- Reviewers: **Group owner(s)** · Duration: 1 dia · Recurrence: Monthly
- Upon completion: **Auto apply results to resource** = Yes · If reviewers don't respond: **Remove access**
- Nome: SC300-L24-Guests

### 2. Revisão por gerente com fallback
Nova revisão do mesmo grupo · Scope: **All users** · Reviewers: **Managers of users** · Fallback reviewers: **sc-adm02** · Nome: SC300-L24-Gerentes.

### 3. Revisão de função do Entra
@ Entra: Entra ID > Identity Governance > Privileged Identity Management > Microsoft Entra roles > Access reviews > New

- Role: User Administrator (tenha alguém nela) · Reviewers: Selected (você) · Nome SC300-L24-Funcao.

## test
1. Como **sc-adm01**, abra https://myaccess.microsoft.com > Access reviews: ele revisa o guest da SC300-L24-Guests. Negue.
2. Na SC300-L24-Gerentes: sc-adm01 recebe a revisão de sc-user01; sc-adm02 (fallback) recebe a de sc-user02.
3. **Stop** a SC300-L24-Guests antes do fim e **Apply results**: o guest sai do grupo.
4. Tente criar a revisão do passo 3 com um usuário que tem só **User Administrator**.

## evidence
- Access review > **Results** (decisão por usuário, quem revisou) e o estado *Applied*.
- Membros do grupo depois da aplicação.
- @ Entra: Entra ID > Identity Governance > Access reviews > **Review history** (relatório baixável).

## expected
- Owner revisa os guests; a negativa remove o guest quando os resultados são aplicados.
- Revisão por gerente vai para o gerente; quem não tem gerente vai para o fallback (Q170).
- User Administrator não cria revisão de função do Entra; Privileged Role Administrator sim (Q240).
- Depois que a instância termina, ninguém consegue mais responder até a próxima ocorrência (Q179).

## variations
- **Q163:** tente selecionar um grupo de **dispositivos**: não é aceito.
- **Q389:** coloque um guest num grupo aninhado dentro do SC300-L24-Projeto e veja se ele aparece na revisão.
- **Q413:** revisão de *All Microsoft 365 groups with guest users* com **Users review their own access**: veja que grupos dinâmicos não entram.
- **Q191:** licenciamento — quem revisa ou se autorrevisa precisa de licença (P2/ID Governance); guests são cobertos pelo modelo MAU.

## breakit
Crie uma revisão com Reviewers = **Managers** e **sem** fallback para um grupo cujos usuários não têm gerente. Ninguém recebe a revisão e, com *If reviewers don't respond = Remove access*, todos perdem o acesso no fim.

## cleanup
Apague as revisões SC300-L24-* e o grupo; reponha o guest se precisar dele para outros labs.

## refs
- https://learn.microsoft.com/en-us/entra/id-governance/create-access-review
- https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review
- https://learn.microsoft.com/en-us/entra/id-governance/complete-access-review

=== L25 | Privileged Identity Management (funções, recursos do Azure e grupos) | A | 60
questions: Q215,Q167,Q178,Q214,Q236,Q244,Q250,Q277,Q280,Q290,Q297,Q412,Q165,Q186,Q195,Q241,Q087,Q342,Q293
predict: Q215
## overview
Configura uma função no PIM com elegibilidade, aprovação e MFA, e testa a ativação.

- **Eligible** × **Active**: só elegível passa por ativação (Q167, Q215, Q236).
- **Role settings**: duração máxima, MFA, justificativa, aprovação, expiração das atribuições (Q214, Q165, Q186).
- Sem aprovador definido, aprovam Global Admin e Privileged Role Admin; ninguém aprova a si mesmo; aprovador sempre informa justificativa (Q165, Q195, Q241).
- A ativação não passa do fim da atribuição elegível (Q195).
- PIM cobre funções do **Entra**, do **Azure** e **grupos** (atribuídos); não cobre funções clássicas de assinatura nem grupos dinâmicos (Q277, Q280, Q297, Q412).

## prereqs
- sc-adm01 e sc-adm02 sem funções, com MFA registrado.
- Assinatura Azure (para o passo de recursos).

## steps
### 1. Role settings
@ Entra: Entra ID > Identity Governance > Privileged Identity Management > Microsoft Entra roles > Roles > **User Administrator** > Role settings > Edit

- Activation maximum duration: **2 horas** · On activation, require: **Azure MFA** · Require justification on activation: Yes · Require approval to activate: Yes · Approvers: **sc-adm02**
- Assignment: Allow permanent eligible assignment: **No** · Expire eligible assignments after: **1 ano**

### 2. Atribuições
Roles > User Administrator > Add assignments:
- **sc-adm01**: Eligible, até daqui a 30 dias
- **sc-adm02**: Eligible, permanente se permitido (não será)

### 3. Recursos do Azure e grupos
- @ Entra: Entra ID > Identity Governance > Privileged Identity Management > **Azure resources** > a sua assinatura > Roles > **Contributor** > Add assignments: sc-adm01, Eligible.
- @ Entra: Entra ID > Identity Governance > Privileged Identity Management > **Groups** > Discover groups > SC300-L25-Grupo (assigned) > Manage > Assignments: sc-adm01 **Member**, Eligible.

## test
1. Como **sc-adm01**: @ Entra: Entra ID > Identity Governance > Privileged Identity Management > My roles > Eligible assignments > **Activate** User Administrator (pede MFA e justificativa; tente 3 horas).
2. Como **sc-adm02**: PIM > **Approve requests** > aprove (o portal exige justificativa do aprovador).
3. sc-adm01 redefine a senha de um usuário comum durante a ativação; depois tenta de novo após o fim.
4. sc-adm02 pede a própria ativação: ele é o único aprovador e não pode aprovar a si mesmo.
5. Ative o Contributor da assinatura e a associação ao grupo.

## evidence
- PIM > Microsoft Entra roles > **Assignments** (Eligible e Active, com o fim de cada uma).
- PIM > Microsoft Entra roles > **Resource audit** (pedido, aprovação, ativação, expiração).
- Sign-in logs da ativação (MFA).

## expected
- A ativação pede MFA e justificativa, fica pendente até a aprovação e dura no máximo 2 horas.
- O aprovador precisa justificar a aprovação (Q241); ninguém aprova o próprio pedido (Q195).
- Atribuição elegível permanente não é permitida pela configuração; o limite é 1 ano (Q236).
- Grupo dinâmico não aparece em Discover groups (Q297).

## variations
- **Q087:** troque *On activation, require Azure MFA* por **Microsoft Entra Conditional Access authentication context** e crie a política de CA para esse contexto (ex.: exigir phishing-resistant do L08).
- **Q250:** liste quem é elegível a uma função em PIM > **Microsoft Entra roles** > Assignments > Eligible.
- **Q277:** as funções clássicas (Service Administrator, Co-Administrator) não aparecem no PIM de recursos do Azure.
- **Q293:** em Azure resources, faça um Key Vault elegível com **Key Vault Secrets User**.

## breakit
Remova o sc-adm02 da lista de aprovadores sem colocar outro: os pedidos passam a ir para os aprovadores padrão (Global Admin e Privileged Role Admin). Se eles não olharem, as ativações ficam pendentes e expiram.

## cleanup
Volte as Role settings do User Administrator ao padrão; remova as atribuições de teste (Entra, Azure e grupo).

## refs
- https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings
- https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-activate-role
- https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/concept-pim-for-groups

=== L26 | Termos de uso | A | 30
questions: Q162,Q193,Q329,Q365,Q366,Q166
predict: Q329
## overview
Publica termos de uso e exige o aceite pelo Conditional Access.

- Documento em **PDF** (Q365).
- Exigido no **Grant** de uma política de CA (Q162, Q329, Q366).
- Aceites e recusas ficam no **audit log** e no próprio blade (Q193).
- *Require users to consent on every device* e expiração (Q166).

## prereqs
- Um PDF qualquer (uma página com "Termos de uso do lab").
- Grupo SC300-L26 (sc-user01, sc-user02).

## steps
### 1. Termos
@ Entra: Entra ID > Conditional Access > Terms of use > New terms

- Name: SC300-L26-Termos · Display name: Termos do lab · envie o PDF (idioma pt-BR)
- Require users to expand the terms of use: On · Require users to consent on every device: On
- Expire consents: On · Expire starting on: hoje · Frequency: Monthly
- Conditional Access: **Custom policy**

### 2. Política de CA
@ Entra: Entra ID > Conditional Access > Policies > New policy

- **SC300-L26-ToU**: Users = SC300-L26 · Target resources: Office 365 · Grant: marque **SC300-L26-Termos** · On.

## test
1. Entre como sc-user01 no portal: aparece o PDF para expandir e aceitar.
2. Entre como sc-user02 e **recuse**.
3. Entre com sc-user01 de outro dispositivo.

## evidence
- Terms of use > (termos) > **Accepted** e **Declined** (lista por usuário e dispositivo).
- Audit logs: *Accept Terms of use* / *Decline Terms of use*.
- Sign-in logs: a política exigindo os termos.

## expected
- sc-user01 aceita e entra; sc-user02 recusa e fica bloqueado.
- Em outro dispositivo, sc-user01 precisa aceitar de novo (consentimento por dispositivo); em dispositivo não registrado, o Entra pede para registrar antes (Q166).

## variations
Em https://myapps.microsoft.com > Settings & Privacy, o usuário vê os termos que aceitou.

## breakit
Envie um **.docx** em vez de PDF: o portal recusa o arquivo.

## cleanup
Apague a política e os termos.

## refs
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/terms-of-use

=== L27 | Identity Secure Score e contas de emergência | A | 40
questions: Q172,Q096,Q093,Q094,Q111,Q112,Q230
predict: Q172
## overview
Fecha o domínio de governança com dois cuidados de operação.

- **Conta de emergência**: somente nuvem, Global Administrator permanente, fora das políticas de CA, **monitorada com alerta** em vez de restringida (Q096, Q172).
- **Identity Secure Score**: quem pode alterar o status das ações (Global, Security, Exchange e SharePoint Administrator) e quem só lê (Q093, Q094, Q111, Q112).

## prereqs
- A conta **sc-breakglass** do ambiente de referência.
- O workspace e os diagnostic settings do L16.
- sc-adm01 com Security Operator e sc-adm02 com SharePoint Administrator.

## steps
### 1. Alerta de uso da conta de emergência
Azure portal > SC300-LAW > Alerts > Create > Alert rule > Custom log search:
```kusto
SigninLogs
| where UserPrincipalName =~ "sc-breakglass@camposlab.online"
| project TimeGenerated, IPAddress, AppDisplayName, ResultType
```
- Evaluation: a cada 5 minutos · Threshold > 0 · Action group: o SC300-L16-AG.

Crie outra regra para mudanças na conta:
```kusto
AuditLogs
| where TargetResources has "sc-breakglass@camposlab.online"
```

### 2. Identity Secure Score
@ Entra: Entra ID > Overview > **Recommendations** (Identity Secure Score) — ou @ Defender: Exposure management > Secure score.

## test
1. Entre com a sc-breakglass e espere o e-mail do alerta.
2. Como **sc-adm01** (Security Operator), tente mudar o status de uma ação de melhoria (ex.: *Risk accepted*).
3. Repita como **sc-adm02** (SharePoint Administrator).

## evidence
- E-mail do action group e o histórico de alertas.
- Histórico da ação no Secure Score (quem alterou o status).

## expected
- O login da conta de emergência gera alerta em minutos (Q172).
- Security Operator só lê; SharePoint Administrator consegue alterar o status (Q111, Q112).

## variations
- **Q096:** a conta de emergência criada no AD e sincronizada não serve: se o Entra Connect ou o AD falharem, ela também falha.

## breakit
Coloque a sc-breakglass dentro de uma política de CA que exige dispositivo compatível. Num incidente em que o Intune/CA estiver mal configurado, a conta de emergência também fica trancada — é exatamente o que ela deveria evitar.

## cleanup
Mantenha a conta de emergência e o alerta (são boas práticas); se não for manter o workspace, apague as regras.

## refs
- https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access
- https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score
