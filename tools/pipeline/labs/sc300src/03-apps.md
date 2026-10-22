=== L17 | Registro de apps, permissões de API e consentimento | A | 60
questions: Q157,Q149,Q208,Q210,Q231,Q259,Q264,Q160,Q221,Q233,Q237,Q261,Q272,Q306,Q226,Q307,Q403,Q089,Q152,Q274,Q386,Q278
predict: Q157
## overview
Registra um app de verdade, pede token do Microsoft Graph e testa o consentimento.

- Ordem para um serviço ler o diretório: **registrar** → **permissão de aplicativo** → **admin consent** (Q157).
- **Delegated** (em nome do usuário logado) × **application** (sem usuário) (Q226, Q307, Q403).
- Credenciais do app: **certificado** ou **client secret** (Q386).
- *Users can register applications* = No; quem continua registrando com menor privilégio: **Application Developer** (Q152, Q210, Q274).
- Consentimento do usuário, **permission classifications** e **admin consent workflow**; só Global/Cloud App/Application Administrator aprovam (Q160, Q221, Q237, Q261, Q272).
- App excluído: restaurável por **30 dias** (Q231, Q278).

## prereqs
- sc-user01 (sem função), sc-adm01 (Application Developer), sc-adm02 (Cloud Application Administrator).

## steps
### 1. Registro
@ Entra: Entra ID > App registrations > New registration

- Name: **SC300-L17-App** · Supported account types: Single tenant
- Redirect URI: platform **Web** · `https://jwt.ms`
- Depois: Authentication > marque **ID tokens** (para o teste no navegador).

Anote o **Application (client) ID** e o **Directory (tenant) ID**.

### 2. Segredo
Certificates & secrets > Client secrets > New client secret (validade curta). Copie o valor na hora.

### 3. Permissão de aplicativo
API permissions > Add a permission > Microsoft Graph > **Application permissions** > `User.Read.All` > Add. **Não** conceda o consentimento ainda.

### 4. Consentimento do usuário
@ Entra: Entra ID > Enterprise apps > Consent and permissions

- User consent settings: **Allow user consent for apps from verified publishers, for selected permissions**
- Permission classifications: adicione como *Low impact* `openid`, `profile`, `email`, `User.Read`
- Admin consent settings: Users can request admin consent = **Yes** · Reviewers: sc-adm02 e sc-user01 · Notifications Yes

### 5. Restringir registro
@ Entra: Entra ID > Users > User settings > **Users can register applications** = No

## test
1. **Token de aplicativo antes do consentimento:**
```powershell
$tenant = "<tenant-id>"; $appId = "<client-id>"; $secret = "<valor-do-segredo>"
$body = @{ client_id=$appId; client_secret=$secret; scope="https://graph.microsoft.com/.default"; grant_type="client_credentials" }
$tok = (Invoke-RestMethod -Method Post -Uri "https://login.microsoftonline.com/$tenant/oauth2/v2.0/token" -Body $body).access_token
Invoke-RestMethod -Headers @{ Authorization = "Bearer $tok" } -Uri "https://graph.microsoft.com/v1.0/users?`$top=3"
```
2. Em API permissions, clique em **Grant admin consent** e rode de novo.
3. **Consentimento delegado:** numa janela InPrivate, como sc-user01, abra (troque os IDs):
```text
https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/authorize?client_id=<client-id>&response_type=id_token&redirect_uri=https://jwt.ms&scope=openid%20profile%20Calendars.ReadWrite&nonce=123
```
4. Como sc-user01, tente registrar um app novo; repita como sc-adm01 (Application Developer).
5. Apague o SC300-L17-App e restaure em App registrations > **Deleted applications**.

## evidence
- Resposta do Graph (403 *Authorization_RequestDenied* antes; lista de usuários depois).
- Cole o token em https://jwt.ms e veja a claim **roles** (app) ou **scp** (delegado).
- @ Entra: Entra ID > Enterprise apps > **Admin consent requests** (pedido do sc-user01).
- Audit logs: *Consent to application*.

## expected
- Sem admin consent, o token não traz a permissão e o Graph nega; depois do consentimento, a claim `roles` tem `User.Read.All` (Q157).
- `Calendars.ReadWrite` não é low impact: o sc-user01 não consegue consentir e pode **pedir aprovação** (Q272).
- O pedido só pode ser aprovado por sc-adm02 (Cloud Application Administrator); o sc-user01 aparece como revisor, mas não aprova (Q160, Q221).
- Com registro bloqueado, só o Application Developer (ou superior) registra (Q152).
- O app restaurado volta com permissões e segredos; atribuições do enterprise app não (contexto da Q278).

## variations
- **Q237:** tire `User.Read` das permission classifications e repita o consentimento de um app só com `User.Read`: agora ele também precisa de admin.
- **Q089:** quem registra com Application Developer vira **owner** do app; com Application Administrator, não.
- **Q386:** troque o segredo por um **certificado** (Certificates & secrets > Upload certificate) e peça o token com `client_assertion`.

## breakit
Conceda **Grant admin consent** e depois remova a permissão em API permissions sem revogar o consentimento. O token continua trazendo a permissão até você revogar no enterprise app (Permissions > Review permissions). Permissão concedida e permissão configurada são coisas diferentes.

## cleanup
Volte *Users can register applications* e o consentimento do usuário aos valores anteriores; apague o app (e depois o item em Deleted applications, se quiser).

## refs
- https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
- https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent
- https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow

=== L18 | Enterprise apps: atribuição, visibilidade, self-service, SSO e Application Proxy | B | 75
questions: Q151,Q156,Q158,Q159,Q350,Q150,Q153,Q155,Q239,Q148,Q242
predict: Q150
## overview
Testa o lado "enterprise application" (service principal) dos apps.

- **Assignment required**, **Visible to users** e o que cada combinação faz no My Apps e no acesso pela URL (Q150, Q151, Q153).
- Atribuição a grupos: segurança e M365 sim, distribuição não; grupos aninhados não herdam (Q159, Q153).
- **Self-service** de acesso com aprovação (Q156, Q350); **collections** no My Apps (Q158).
- SSO SAML com o app de teste **Microsoft Entra SAML Toolkit**; provisionamento por **SCIM** (Q155, Q239).
- **Application Proxy** usando os seus conectores do Private Access; instalar exige **Application Administrator** (Q148, Q242).

## prereqs
- Grupos **SC300-L18-App** (security, com sc-user01) e **SC300-L18-Pai** (com o grupo SC300-L18-Filho, que tem sc-user02).
- O IIS **Web1** do seu lab de GSA e os conectores LLK85SH20066/67.

## steps
### 1. App SAML de teste
@ Entra: Entra ID > Enterprise apps > New application > procure **Microsoft Entra SAML Toolkit** > Create (nome SC300-L18-SAML).

- Single sign-on > SAML: siga as instruções do próprio app (Sign-on URL, Reply URL do toolkit).
- Properties: Assignment required = **Yes** · Visible to users = **Yes**
- Users and groups: **SC300-L18-App** e **SC300-L18-Pai**

### 2. Self-service
SC300-L18-SAML > **Self-service**:
- Allow users to request access to this application: Yes · Group: SC300-L18-App · Require approval: Yes · Approvers: sc-adm01

### 3. Collection
@ Entra: Entra ID > Enterprise apps > **App launchers** > Collections > New collection: **SC300-RH** com o app; atribua a SC300-L18-App.

### 4. Application Proxy no Web1
@ Entra: Entra ID > Enterprise apps > New application > **Add an on-premises application**

- Name: SC300-L18-Web1 · Internal URL: `http://web1/` (o endereço interno do seu IIS) · Pre Authentication: Microsoft Entra ID · Connector Group: **vLan 134**
- Users and groups: sc-user01

## test
1. Como **sc-user01**, abra https://myapps.microsoft.com: o app aparece, dentro da collection SC300-RH; faça o SSO SAML.
2. Como **sc-user02** (só no grupo aninhado): o app não aparece e o acesso é negado; em My Apps > **Request new apps** ele pede acesso.
3. Como sc-adm01, aprove em https://myapps.microsoft.com > **Approve requests** (ou My Access).
4. Mude Assignment required para **No** e Visible to users para **No**, e veja o comportamento de sc-user03 (não atribuído) pela URL e pelo My Apps.
5. Abra a **External URL** do SC300-L18-Web1 (fora da rede do lab): pede login do Entra e mostra a página do Web1.

## evidence
- Sign-in logs do app (AADSTS50105 = usuário não atribuído).
- Users and groups do app depois da aprovação (sc-user02 entra no grupo SC300-L18-App).
- No conector: Event Viewer > Applications and Services Logs > Microsoft > AadApplicationProxy > Connector > Admin.

## expected
| Configuração | Usuário não atribuído pela URL | No My Apps |
|---|---|---|
| Assignment required = Yes | Bloqueado (AADSTS50105) | Não aparece |
| Assignment required = No, Visible = Yes | Entra | Só para atribuídos (Q150) |
| Visible = No | (conforme assignment) | Não aparece para ninguém (Q153) |

- sc-user02, só no grupo aninhado, não herda a atribuição (Q153); depois da aprovação, entra no grupo do self-service.
- O app on-premises abre com pré-autenticação do Entra, sem porta de entrada no firewall (Q148).

## variations
- **Q159:** tente atribuir um grupo de **distribuição** ao app: ele não aparece no seletor.
- **Q239:** abra a aba **Provisioning** de um app da galeria que suporte (ex.: um SaaS conhecido): o provisionamento automático é **SCIM 2.0**.
- **Q242:** tente publicar o Application Proxy com um usuário **Cloud Application Administrator**: ele não gerencia o Application Proxy.

## breakit
Tire o sc-user01 do grupo e deixe Assignment required = Yes: o SSO falha com AADSTS50105. É o erro mais comum de "o usuário não consegue entrar no app".

## cleanup
Apague SC300-L18-* (apps, collection, grupos).

## refs
- https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal
- https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/manage-self-service-access
- https://learn.microsoft.com/en-us/entra/identity/app-proxy/application-proxy-add-on-premises-application

=== L19 | Managed identities | B | 75
questions: Q285,Q078,Q082,Q275,Q282,Q283,Q284,Q296,Q300,Q330,Q333,Q344,Q346,Q357,Q387,Q305,Q345,Q258
predict: Q285
## overview
Cria managed identities no Azure e usa para ler um segredo do Key Vault sem nenhuma senha.

- **System-assigned**: nasce e morre com o recurso (Q078, Q346).
- **User-assigned**: recurso próprio, compartilhável entre recursos de **qualquer região** (Q082, Q282, Q296, Q344).
- Acesso por **Azure RBAC**; no Key Vault com modelo RBAC dá para dar acesso a **um único segredo** (Q285, Q330).
- Token pelo **IMDS** em 169.254.169.254, só de dentro do recurso (Q357).

## prereqs
- Assinatura Azure (MSDN) · grupo de recursos **RG-SC300** (East US, por exemplo).

## steps
### 1. Key Vault e segredo
Azure portal > Key vaults > Create: **sc300kv<sufixo>** · Access configuration: **Azure role-based access control** · Soft delete ativo.

Dê a você mesmo **Key Vault Secrets Officer** no cofre e crie o segredo **Segredo1**.

### 2. Automation account com system-assigned
Azure portal > Automation Accounts > Create: **SC300-AA** · Advanced: **System assigned** = On.

Runbook PowerShell **SC300-Le-Segredo**:
```powershell
Connect-AzAccount -Identity | Out-Null
Get-AzKeyVaultSecret -VaultName "sc300kv<sufixo>" -Name "Segredo1" -AsPlainText
```

### 3. Permissão só no segredo (Q285)
Azure portal > sc300kv > Objects > Secrets > **Segredo1** > Access control (IAM) > Add role assignment: **Key Vault Secrets User** → Managed identity → SC300-AA.

### 4. User-assigned em outra região
Azure portal > Managed Identities > Create: **SC300-UAMI** em **West Europe**. Em SC300-AA > Identity > **User assigned** > Add SC300-UAMI.

## test
1. Rode o runbook **antes** do passo 3: erro de permissão (403).
2. Rode depois do passo 3: retorna o valor do segredo.
3. Crie um **Segredo2** e tente ler com o runbook: negado (a permissão é só do Segredo1).
4. No runbook, troque para `Connect-AzAccount -Identity -AccountId <clientId-da-UAMI>` e repita (sem permissão para a UAMI: negado; dê Secrets User à UAMI e funciona).
5. Opcional (VM): de dentro de uma VM com identidade, peça o token direto ao IMDS:
```powershell
Invoke-RestMethod -Headers @{Metadata="true"} -Uri "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://vault.azure.net"
```
6. Apague o SC300-AA e procure a identidade dele em Entra ID > Enterprise apps (filtro Managed Identities).

## evidence
- Saída do job do runbook.
- @ Entra: Entra ID > Enterprise apps > Application type = **Managed Identities**.
- Key vault > Access control (IAM) > Role assignments (escopo no segredo).

## expected
- O runbook lê o segredo sem guardar nenhuma credencial.
- Permissão no escopo do **segredo** dá acesso só a ele (Q285).
- A UAMI de West Europe funciona num recurso de East US (Q082, Q296).
- Ao apagar o SC300-AA, a identidade system-assigned some; a SC300-UAMI continua (Q346).

## variations
- **Q284:** numa storage account, dê **Storage Blob Data Contributor** à identidade em Access control (IAM) e leia/grave um blob com `New-AzStorageContext -UseConnectedAccount`.
- **Q305:** um app **registrado** (L17) acessa recursos pelo próprio **service principal**; managed identity é para recursos do Azure.
- **Q300:** o login do Entra numa VM (L20) habilita a **system-assigned** dela.
- **Q258 (borderline):** a questão usa `Update-AzVM -IdentityType SystemAssigned` e o módulo AzureAD (aposentado) para pôr a identidade num grupo. Hoje: `Update-AzVM` + `New-MgGroupMember` com o ID do service principal da identidade.

## breakit
Mude o Key Vault para **Vault access policy** (Access configuration). As atribuições RBAC param de valer e o runbook passa a ser negado, mesmo com Key Vault Secrets User.

## cleanup
Apague o grupo de recursos RG-SC300 (cofre em soft delete: purge se quiser reaproveitar o nome).

## refs
- https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview
- https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide
- https://learn.microsoft.com/en-us/azure/automation/enable-managed-identity-for-automation

=== L20 | Azure RBAC, Key Vault, ABAC e login do Entra em VMs | B | 90
questions: Q375,Q079,Q108,Q143,Q069,Q098,Q090,Q132,Q293,Q374,Q379,Q304,Q385,Q407,Q380,Q383,Q318,Q083
predict: Q375
## overview
Testa o controle de acesso aos recursos do Azure.

- Login na VM com conta Entra: **Virtual Machine User Login / Administrator Login**; Contributor e Local User Login não dão login Entra (Q375, Q383, Q090).
- **Funções personalizadas**: clonar de built-in ou custom do Azure; provedores de recurso (Microsoft.Network, Microsoft.App...) (Q079, Q069, Q098).
- Plano de controle × plano de dados: Reader não lê segredos; Storage Account Contributor lista chaves (Q374, Q379).
- **ABAC**: condições em funções de dados de **Storage** (Q304, Q385, Q407).
- Key Vault: funções RBAC, **soft delete** e **purge protection** (Q132, Q293, Q083).

## prereqs
- Assinatura Azure, RG-SC300; sc-user01, sc-user02 e sc-user03.
- Um cliente Windows Entra joined do mesmo tenant (para o RDP com conta Entra).

## steps
### 1. VM com login do Entra
Azure portal > Virtual machines > Create: **SC300-VM1** (Windows Server 2022, tamanho pequeno) · aba Management: **Login with Microsoft Entra ID** = On (isso liga a system-assigned e instala a extensão AADLoginForWindows).

Na VM > Access control (IAM) > Add role assignment:
- sc-user01: **Virtual Machine Administrator Login**
- sc-user02: **Virtual Machine Contributor**
- sc-user03: **Virtual Machine User Login** no **grupo de recursos**

### 2. ABAC numa storage account
Storage account **sc300st<sufixo>** com os contêineres **cont1** e **cont2** (um blob em cada).

Access control (IAM) > Add role assignment > **Storage Blob Data Reader** > sc-user01 > aba **Conditions** > Add condition:
- Action: *Read a blob* · Expression: Resource → *Container name* **StringEquals** `cont1`

### 3. Função personalizada
Subscription > Access control (IAM) > Add > **Add custom role** > Clone a role: **Virtual Machine Contributor** · Permissions: + Add permissions > `Microsoft.Network/applicationSecurityGroups/*` · Assignable scope: RG-SC300.

### 4. Key Vault
No cofre do L19 (ou um novo com **purge protection** ligado): apague um segredo e veja-o em **Manage deleted secrets**.

## test
1. Do cliente Entra joined, RDP para a VM com `AzureAD\sc-user01@camposlab.online` (ou no mstsc, Advanced > *Use a web account to sign in*). Repita com sc-user02 e sc-user03.
2. Como sc-user01, abra cont1 e cont2 no portal (Authentication method: **Microsoft Entra user account**).
3. Tente **Purge** no segredo apagado de um cofre com purge protection.

## evidence
- Na VM: `whoami /groups` (admin ou não) e o log da extensão em `C:\WindowsAzure\Logs\Plugins\Microsoft.Azure.ActiveDirectory.AADLoginForWindows`.
- Storage: erro *This request is not authorized to perform this operation* em cont2.
- Activity log da assinatura (atribuições e negações).

## expected
| Usuário | Função | Login na VM com Entra |
|---|---|---|
| sc-user01 | VM Administrator Login | Sim, como admin |
| sc-user02 | VM Contributor | **Não** (gerencia, mas não entra) |
| sc-user03 | VM User Login no RG | Sim, sem admin |

- sc-user01 lê cont1 e é negado em cont2 (Q407).
- Com purge protection, nem o dono do cofre consegue expurgar antes do fim da retenção (Q083).

## variations
- **Q379:** dê **Storage Account Contributor** a sc-user02: ele lê os blobs listando as **chaves de acesso** (Access keys), mesmo sem função de dados.
- **Q374:** dê **Reader** na assinatura a sc-user03 e tente abrir o valor de um segredo: o plano de dados é negado.
- **Q108:** atribua Contributor a um **grupo dinâmico**: no Azure RBAC funciona (a restrição de grupo dinâmico é das funções do Entra).
- **Q380:** bloqueie a saída da VM para `enterpriseregistration.windows.net` (NSG) e veja o login do Entra falhar.

## breakit
Desinstale a extensão **AADLoginForWindows** da VM: os logins com conta Entra falham mesmo com a função certa.

## cleanup
Apague o RG-SC300 (VM e storage geram custo) e a função personalizada.

## refs
- https://learn.microsoft.com/en-us/entra/identity/devices/howto-vm-sign-in-azure-ad-windows
- https://learn.microsoft.com/en-us/azure/role-based-access-control/conditions-overview
- https://learn.microsoft.com/en-us/azure/role-based-access-control/custom-roles-portal
- https://learn.microsoft.com/en-us/azure/key-vault/general/soft-delete-overview

=== L21 | Defender for Cloud Apps: Cloud Discovery e Conditional Access App Control | B | 75
questions: Q220,Q117,Q147,Q222,Q223,Q224,Q249,Q263,Q268,Q276,Q402,Q100
predict: Q220
## overview
Testa o Defender for Cloud Apps nas duas pontas: descobrir apps (Shadow IT) e controlar sessões em tempo real.

- **Cloud Discovery** analisa logs de firewall/proxy (Q147); sancionar/não sancionar apps (Q249, Q276).
- **Activity policy** para alertas por volume (Q222).
- **Access** e **session policies** exigem que o app passe pelo **Conditional Access App Control**, a começar por uma política de CA (Q220, Q263, Q268, Q100).
- O app precisa usar o Entra para **SSO** (Q402).

## prereqs
- Microsoft 365 E5 (inclui o Defender for Cloud Apps). Funções: Security Administrator ou Global Administrator.
- Grupo SC300-L21 (sc-user01). Um arquivo PDF numa biblioteca do SharePoint.

## steps
### 1. Cloud Discovery com log de exemplo
@ Defender: Cloud apps > Cloud discovery > Actions > **Create snapshot report**

- Data source: **Palo Alto - PA Series Firewall** (o mesmo fabricante do seu firewall) · clique em **View verified log sample** e baixe o exemplo · envie o arquivo.

### 2. Activity policy (Q222)
@ Defender: Cloud apps > Policies > Policy management > Create policy > **Activity policy**

- Nome: SC300-L21-Downloads · Act on: **Repeated activity** · Minimum repeated activities: 50 · Within timeframe: 1 minute · Activity type: Download file · App: Microsoft SharePoint Online · Alert.

### 3. Política de CA com App Control
@ Entra: Entra ID > Conditional Access > Policies > New policy

- **SC300-L21-CAAC**: Users = SC300-L21 · Target resources: **Office 365 SharePoint Online** · Session: **Use Conditional Access App Control** = *Use custom policy* · On.

### 4. Session policy (Q223)
Entre uma vez no SharePoint como sc-user01. Depois:

@ Defender: Cloud apps > Policies > Policy management > Create policy > **Session policy**

- Nome: SC300-L21-SemImpressao · Session control type: **Block activities** · Activity source: Activity type = **Print** · App: SharePoint Online · Action: Block.
- Crie também uma com **Control file download (with inspection)** bloqueando download de PDF.

## test
1. Abra o snapshot report: veja os apps descobertos, a pontuação de risco e os usuários. Marque um app como **Unsanctioned**.
2. Como sc-user01, abra o SharePoint: a URL ganha o sufixo **.mcas.ms** (a sessão está passando pelo proxy).
3. Tente imprimir o PDF e baixá-lo.

## evidence
- @ Defender: Cloud apps > **Activity log** (atividades bloqueadas pela sessão).
- @ Defender: Cloud apps > Connected apps > **Conditional Access App Control apps** (o SharePoint aparece depois do primeiro login).
- Sign-in logs: a política SC300-L21-CAAC com o controle de sessão.

## expected
- Sem a política de CA do passo 3, a session policy não tem efeito: o tráfego não passa pelo proxy (Q220).
- Com ela: impressão e download do PDF bloqueados, com mensagem no navegador.
- O snapshot lista os apps do log e permite sancionar ou bloquear (Q147).

## variations
- **Q117 e Q224:** crie uma **access policy** que bloqueia o acesso a partir de uma faixa de IP/localização de alto risco.
- **Q402:** para um SaaS de terceiros entrar no App Control, ele precisa primeiro usar o **Entra como IdP (SSO)**; Cloud Discovery não é pré-requisito.

## breakit
Crie a session policy para um app que não está em *Conditional Access App Control apps*. Ela fica salva, mas nunca dispara.

## cleanup
Apague as políticas SC300-L21-* (Defender e CA) e o snapshot report.

## refs
- https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-deployment-aad
- https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad
- https://learn.microsoft.com/en-us/defender-cloud-apps/create-snapshot-cloud-discovery-reports

=== L22 | OAuth apps e app governance | A | 40
questions: Q225,Q232,Q265,Q266,Q267,Q279,Q356,Q238,Q262
predict: Q225
## overview
Testa o monitoramento de apps de terceiros que recebem acesso OAuth aos dados dos usuários.

- **OAuth app policy**: filtrar por nível de permissão e número de usuários que consentiram (Q225, Q232, Q356).
- OAuth apps vêm dos conectores de **Microsoft 365, Google Workspace e Salesforce** (não Azure, AWS ou GitHub) (Q265, Q266, Q267, Q279).
- **App governance** é ligado no portal do Defender; o dashboard abre com Cloud Application Administrator (Q238, Q262).

## prereqs
- O app do L17 com alguma permissão delegada consentida por um usuário (ou consinta um app qualquer, como o Graph Explorer, com sc-user01).

## steps
### 1. Veja os OAuth apps
@ Defender: Cloud apps > **OAuth apps** — filtre por Permission level **High** e veja o app do L17.

### 2. OAuth app policy
@ Defender: Cloud apps > Policies > Policy management > Create policy > **OAuth app policy**

- Nome: SC300-L22-AltaPermissao · Filtros: Permission level **equals High** **and** Community use (ou Number of users) **greater than** 20 → Alert.
- Crie uma segunda com filtro Permission = `Mail.ReadWrite` (Q232).

### 3. App governance
@ Defender: Settings > Cloud apps > **App governance** > ligue a integração (Service status).

## test
1. Consinta, como sc-user01, um app pedindo `Mail.ReadWrite` (use o link de autorização do L17 com esse scope).
2. Veja se a política SC300-L22 dispara um alerta.
3. Abra o painel do app governance como um usuário com **Cloud Application Administrator**.

## evidence
- @ Defender: Incidents & alerts (alerta da OAuth app policy).
- @ Defender: Cloud apps > App governance > Overview/Policies.
- @ Defender: Settings > Cloud apps > **App connectors** (quais conectores existem).

## expected
- O app com permissão de leitura e gravação de e-mail dispara o alerta da política.
- Em App connectors, só os conectores de Microsoft 365, Google Workspace e Salesforce alimentam a lista de OAuth apps (Q265 a Q279).

## variations
- **Q356:** a OAuth app policy pode **revogar** o app automaticamente além de alertar (Governance actions).

## breakit
Desligue o conector do **Microsoft 365** (App connectors) e veja a lista de OAuth apps parar de ser atualizada.

## cleanup
Apague as políticas SC300-L22-*; revogue o consentimento de teste (Enterprise apps > app > Permissions).

## refs
- https://learn.microsoft.com/en-us/defender-cloud-apps/app-permission-policy
- https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance
