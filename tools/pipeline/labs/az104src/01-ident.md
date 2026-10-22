=== L01 | Usuários, grupos e licenças | A | 50
questions: Q043,Q050,Q051,Q210,Q243,Q257,Q222,Q258,Q071,Q1124,Q1145,Q087,Q282,Q072,Q054,Q090,Q057,Q081
predict: Q243
## overview
Testa o que a AZ-104 cobra em "Manage Microsoft Entra users and groups": tipos de grupo, grupos dinâmicos, licença por grupo, operações em massa e propriedades de usuário.

- Licença por grupo vale só para **membros diretos**; grupo aninhado não herda (Q210, Q243).
- Licença exige grupo de **segurança** ou M365 com `securityEnabled = true` (Q257); grupo com licença **não pode ser excluído** (Q282).
- Grupo com **"Microsoft Entra roles can be assigned"** não aceita grupos aninhados (Q222).
- Regra dinâmica: `(user.department -eq "Marketing") -and (user.country -eq "France")` (Q258, Q071, Q1124).
- **Expiração** só existe para grupos Microsoft 365 (Q043); **naming policy** formata o nome deles (Q1145).
- Bulk delete pede só o **UPN** (Q087); usuário sincronizado não muda Job title no Entra, mas muda Usage location (Q072).
- Funções do Entra no usuário (Q050), licenças (Q051), administrative units (Q090), domínio personalizado (Q057, Q081).

## prereqs
- sc-user01 a sc-user04 (somente nuvem) e, se possível, um usuário **sincronizado** do lab.local.
- Uma licença livre que possa ser atribuída por grupo (Entra Suite ou E5).

## steps
### 1. Grupos e aninhamento
@ Entra: Entra ID > Groups > All groups > New group

- **AZ104-L01-Lic** (Security, Assigned): sc-user01 + o grupo AZ104-L01-Filho
- **AZ104-L01-Filho** (Security, Assigned): sc-user02
- **AZ104-L01-Roles** (Security, Assigned, **Microsoft Entra roles can be assigned to the group = Yes**)

### 2. Licença por grupo
@ Entra: Entra ID > Billing > Licenses > All products > (produto) > Assign

Atribua ao grupo **AZ104-L01-Lic**. Desligue um dos serviços do pacote (Assignment options).

### 3. Grupos dinâmicos
@ Entra: Entra ID > Groups > All groups > New group > Membership type: Dynamic User > Add dynamic query

```text
AZ104-L01-MKT-FR   (user.department -eq "Marketing") -and (user.country -eq "France")
AZ104-L01-Cidade-M user.city -startsWith "M"
```
Ajuste department, country e city de sc-user03 e sc-user04 e use **Validate rules** antes de salvar.

### 4. Grupo M365, expiração e naming policy
- @ Entra: Entra ID > Groups > Expiration — 180 dias para **Selected** grupos (escolha um grupo M365 novo, AZ104-L01-M365).
- @ Entra: Entra ID > Groups > Naming policy > Group naming policy — Add prefix: **Attribute** > Department.

### 5. Operações em massa
@ Entra: Entra ID > Users > All users > Bulk operations

- **Bulk create** > Download: veja as colunas obrigatórias.
- **Bulk delete** > Download: o modelo só tem **User principal name**.

### 6. Funções e administrative units
- @ Entra: Entra ID > Users > sc-adm01 > Assigned roles > Add assignments > **User Administrator**.
- @ Entra: Entra ID > Roles & admins > Admin units > Add — **AZ104-L01-AU-Montreal** com sc-user03; atribua **Helpdesk Administrator** a sc-adm02 com escopo nessa AU.

## test
1. Confira as licenças de sc-user01 e sc-user02 (Assignment paths).
2. Tente adicionar o AZ104-L01-Filho como membro do AZ104-L01-Roles.
3. Tente remover a licença herdada direto no sc-user01.
4. Tente **excluir** o grupo AZ104-L01-Lic com a licença atribuída.
5. Com sc-adm02 (InPrivate), redefina a senha de sc-user03 e depois de sc-user04.
6. Crie um grupo M365 pelo Outlook com sc-user01 e veja o nome que ele recebe.
7. Em um usuário sincronizado, tente editar Job title e Usage location.

## evidence
- Licenças do usuário: coluna **Assignment paths** (Direct / Inherited).
- Grupo dinâmico: Dynamic membership rules > **Validate rules**.
- @ Entra: Entra ID > Monitoring & health > Audit logs.

## expected
| Teste | Resultado |
|---|---|
| sc-user02 (só no grupo aninhado) | **Não** recebe licença (Q210, Q243) |
| Grupo dentro de grupo role-assignable | Bloqueado (Q222) |
| Remover licença herdada no usuário | Botão desabilitado; tire o usuário do grupo (Q243) |
| Excluir grupo licenciado | Erro até remover a licença (Q282) |
| sc-adm02 redefinindo sc-user04 | Negado: fora da AU (Q090) |
| Grupo M365 criado pelo usuário | Prefixo com o department (Q1145) |
| Usuário sincronizado | Job title bloqueado; Usage location editável (Q072) |

## variations
- **Q043:** grupos de segurança não aparecem na política de expiração; só M365 (assigned ou dynamic).
- **Q257:** tente atribuir licença a um grupo M365 com segurança desabilitada (criado pelo Outlook, por exemplo).
- **Q054:** grupos de dispositivos — o dono de um grupo **assigned** adiciona dispositivos; grupo **dinâmico** não aceita membros manuais.
- **Q057 / Q081:** @ Entra: Entra ID > Domain names > Add custom domain. O portal pede um registro **TXT** (ou MX) no DNS público para verificar.

## breakit
Escreva a regra com `-or` no lugar de `-and` e valide: quem é da França de outro departamento entra no grupo.

## cleanup
Remova a licença do grupo, apague os grupos AZ104-L01-*, a AU e desfaça a naming policy e a expiração.

## refs
- https://learn.microsoft.com/en-us/entra/identity/users/licensing-groups-assign
- https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership
- https://learn.microsoft.com/en-us/entra/identity/users/groups-lifecycle
- https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units

=== L02 | Usuários externos, novos tenants e SSPR | C | 45
questions: Q039,Q206,Q247,Q248,Q069,Q254,Q098,Q099,Q100,Q763,Q259,Q755,Q761,Q1134
predict: Q206
## overview
Testa convites B2B, o que acontece ao criar um tenant novo, as permissões padrão dos usuários e o self-service password reset.

- Convidado é criado por **convite**: Bulk invite, `New-MgInvitation`; `New-MgUser` e Bulk create criam **membros** (Q039, Q206, Q247, Q248).
- Erro "Generic authorization exception" ao convidar = **External collaboration settings** (Q069).
- Trocar o e-mail de entrada de um convidado = editar o e-mail e **Reset redemption status** (Q254).
- Quem cria um tenant é o único Global admin dele; Owner da assinatura não tem acesso (Q098–Q100, Q763).
- Default user role permissions: registrar apps e acesso ao portal de administração (Q259).
- SSPR: habilitado para **grupos**; administradores sempre usam a política de 2 métodos, sem perguntas de segurança (Q755, Q761, Q1134).

## prereqs
- Um e-mail externo seu (Outlook.com ou Gmail) para receber convites.
- Classe C: criar um tenant novo é opcional (passo 4).

## steps
### 1. Convite individual e em massa
@ Entra: Entra ID > Users > All users > New user > Invite external user

- Convide seu e-mail externo. Depois: @ Entra: Entra ID > Users > All users > Bulk operations > **Bulk invite** > Download e veja as colunas (e-mail e **redirection URL**).

```powershell
Connect-MgGraph -Scopes "User.Invite.All","User.ReadWrite.All"
New-MgInvitation -InvitedUserEmailAddress "seu.email@outlook.com" `
  -InviteRedirectUrl "https://myapps.microsoft.com" -SendInvitationMessage
```

### 2. Restrições de colaboração
@ Entra: Entra ID > External Identities > External collaboration settings

- Guest invite settings: **Only users assigned to specific admin roles can invite**.
- Collaboration restrictions: **Allow invitations only to the specified domains** > outlook.com.

### 3. Default user role permissions
@ Entra: Entra ID > Users > User settings

- **Users can register applications = No** · **Restrict access to Microsoft Entra admin center = Yes**.

### 4. Tenant novo (opcional)
@ Entra: Entra ID > Overview > Manage tenants > Create

Crie com sc-adm01. Depois tente abrir o tenant novo com outra conta (Owner da assinatura, por exemplo).

### 5. SSPR
@ Entra: Entra ID > Password reset > Properties — **Selected** > grupo AZ104-L02-SSPR (com sc-user01).
@ Entra: Entra ID > Password reset > Authentication methods — **2 métodos**: Mobile phone + Security questions (3 para registrar, 3 para redefinir).

## test
1. Com sc-user01 (sem função), tente convidar um usuário depois do passo 2.
2. Convide um e-mail @gmail.com com a restrição de domínio ativa.
3. Abra https://aka.ms/sspr com sc-user01 e com sc-user02 (fora do grupo).
4. Abra https://aka.ms/sspr com sc-adm01 (com função): veja se as perguntas de segurança aparecem.
5. No convidado do passo 1: Edit properties > e-mail novo > **B2B collaboration > Reset redemption status**.
6. Com sc-user01, tente registrar um app em Entra ID > App registrations.

## evidence
- Usuário convidado: User type **Guest**, Identities, Invitation state.
- @ Entra: Entra ID > Password reset > Audit logs / Usage & insights.

## expected
| Teste | Resultado |
|---|---|
| Usuário comum convidando | "Generic authorization exception" (Q069) |
| Convite para domínio fora da lista | Bloqueado |
| SSPR para sc-user02 | Não habilitado: está fora do grupo selecionado (Q755) |
| SSPR para admin | Dois métodos, **sem** perguntas de segurança (Q761) |
| Escopo do SSPR | Grupo, não usuário individual (Q1134) |
| Tenant novo | Só o criador é Global admin (Q098) |
| Registrar app como usuário comum | Bloqueado (Q259) |

## variations
- **Q039 / Q247:** crie um usuário com `New-MgUser` ou Bulk create e compare o **User type** (Member) com o do convidado (Guest).
- **Q248:** em um script, percorra um CSV e chame `New-MgInvitation` por linha.

## breakit
Coloque só "Security questions" como método disponível com 1 método exigido e tente redefinir a senha de um admin: o admin continua exigindo dois métodos fortes.

## cleanup
Exclua o convidado, desfaça External collaboration settings, User settings e SSPR. Exclua o tenant novo (Manage tenants > Delete).

## refs
- https://learn.microsoft.com/en-us/entra/external-id/add-users-administrator
- https://learn.microsoft.com/en-us/entra/external-id/tutorial-bulk-invite
- https://learn.microsoft.com/en-us/entra/external-id/reset-redemption-status
- https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy

=== L03 | Azure RBAC: funções, escopos e herança | A | 50
questions: Q056,Q093,Q041,Q076,Q208,Q085,Q092,Q230,Q787,Q795,Q1122,Q234,Q096,Q070,Q077,Q058,Q059,Q060,Q091,Q078
predict: Q795
## overview
Testa as funções built-in do Azure RBAC, os escopos (management group → assinatura → RG → recurso) e como ler atribuições.

- Atribuir funções = **Owner** ou **User Access Administrator**; Contributor e Network Contributor não atribuem (Q056, Q093, Q085).
- Menor privilégio: Network Contributor no recurso (Q041); Contributor para VM + VNet (Q076); Reader and Data Access para ler dados do storage (Q208).
- Herança: atribuição no management group vale para as assinaturas abaixo (Q234, Q1122, Q096).
- **Elevar acesso**: Global admin vira User Access Administrator na raiz (Q070, Q077).
- Logic App Operator só lê/habilita; criar exige Logic App Contributor ou Contributor (Q058–Q060, Q091).
- **Virtual Machine Contributor** não dá login na VM nem gerencia snapshots (Q795).
- Managed identity da VM + função no RG (Q078).

## prereqs
- sc-user01 a sc-user03 sem nenhuma função no Azure.
- Global administrator no tenant (para o passo de elevar acesso).

## steps
### 1. Recursos
```bash
az group create -n rg-az104-l03 -l $LOC
az network vnet create -g rg-az104-l03 -n az104-l03-vnet --address-prefix 10.30.0.0/16 --subnet-name default --subnet-prefix 10.30.0.0/24
az storage account create -g rg-az104-l03 -n az104l03st$RANDOM -l $LOC --sku Standard_LRS
az vm create -g rg-az104-l03 -n az104-l03-vm --image Ubuntu2204 --size Standard_B1s \
  --vnet-name az104-l03-vnet --subnet default --public-ip-address "" --assign-identity \
  --admin-username $ADMIN --admin-password "$PASS"
```

### 2. Atribuições
@ Azure: rg-az104-l03 > Access control (IAM) > Add > Add role assignment

| Usuário | Função | Escopo |
|---|---|---|
| sc-user01 | Network Contributor | az104-l03-vnet |
| sc-user02 | User Access Administrator | az104-l03-vnet |
| sc-user03 | Virtual Machine Contributor | rg-az104-l03 |

### 3. Management group
@ Azure: Management groups > Create — **AZ104-L03-MG**, mova a Sub-Lab para ele. Atribua **Reader** a sc-user01 no MG.

### 4. Managed identity
@ Azure: az104-l03-vm > Security > Identity — já está **On** (system assigned). Em rg-az104-l03 > IAM, dê **Reader** à identidade da VM.

```bash
# dentro da VM (Run command ou SSH via Bastion)
curl -s -H Metadata:true "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://management.azure.com/" | head -c 120
```

### 5. Elevar acesso
@ Entra: Entra ID > Properties > **Access management for Azure resources = Yes** (com o Global admin).

## test
1. sc-user01: crie uma sub-rede na VNet; tente atribuir Reader a alguém nela.
2. sc-user02: atribua Reader na VNet a sc-user01; tente criar uma sub-rede.
3. sc-user03: redimensione a VM; tente entrar nela com Entra ID; tente criar um snapshot do disco.
4. sc-user01: veja a VM (herdou Reader do MG).
5. Global admin: depois do passo 5, abra Management groups > Tenant Root Group > IAM.
6. @ Azure: rg-az104-l03 > IAM > **Check access** para cada usuário.

## evidence
- IAM > Role assignments: coluna **Scope** (This resource / Inherited).
- `az role assignment list --all --assignee sc-user01@camposlab.online -o table`
- Activity log com a operação negada (AuthorizationFailed).

## expected
| Teste | Resultado |
|---|---|
| Network Contributor atribuindo função | Negado (Q085) |
| User Access Administrator | Atribui funções, mas não cria sub-rede (Q056) |
| VM Contributor: login / snapshot | Negado nos dois (Q795) |
| Reader no MG | Vê os recursos da assinatura (Q234) |
| Elevar acesso | Global admin passa a ver a raiz como User Access Administrator (Q070, Q077) |
| Token da managed identity | Retornado pelo IMDS (Q078) |

## variations
- **Q096:** dê **User Access Administrator** a um grupo no **Tenant Root Group** para valer em assinaturas atuais e futuras.
- **Q058–Q091:** crie uma logic app no RG com um usuário **Logic App Operator** (falha) e outro **Logic App Contributor** (funciona).
- **Q092 / Q230 / Q787:** leia as atribuições em JSON: `az role assignment list -g rg-az104-l03 -o json`.

## breakit
Remova a managed identity da VM e rode o curl de novo: o IMDS responde que não há identidade.

## cleanup
Desligue **Access management for Azure resources**, mova a Sub-Lab de volta para a raiz, apague o MG e o rg-az104-l03.

## refs
- https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles
- https://learn.microsoft.com/en-us/azure/role-based-access-control/elevate-access-global-admin
- https://learn.microsoft.com/en-us/azure/governance/management-groups/overview

=== L04 | Funções customizadas | A | 40
questions: Q065,Q101,Q261,Q094,Q789,Q207,Q845
predict: Q065
## overview
Testa a estrutura de uma função customizada: actions, notActions, dataActions e assignableScopes.

- Base de uma função: exporte uma built-in com `Get-AzRoleDefinition -Name "Reader" | ConvertTo-Json` (Q845).
- `assignableScopes` aceita **/subscriptions/<id>**, resource groups e management groups; "/subscriptions/<id>/resourceGroups" não é válido (Q065, Q101).
- Login em VM com Entra ID é **dataAction** (Q094); `Microsoft.Authorization/*` em notActions impede atribuir funções (Q065, Q789).
- Ação específica de leitura: `Microsoft.Storage/storageAccounts/read` (Q261).
- Clonar: Azure RBAC aceita built-in e custom; no Entra, só custom (Q207).

## prereqs
- L03 concluído (usuários sem função).

## steps
### 1. Exportar a Reader
```powershell
Get-AzRoleDefinition -Name "Reader" | ConvertTo-Json | Out-File reader.json
```

### 2. Criar a função AZ104-L04-Operador
```json
{
  "Name": "AZ104-L04-Operador",
  "IsCustom": true,
  "Description": "Opera VMs e NICs, sem atribuir acesso",
  "Actions": [
    "Microsoft.Resources/subscriptions/resourceGroups/read",
    "Microsoft.Compute/virtualMachines/*",
    "Microsoft.Compute/disks/*",
    "Microsoft.Network/networkInterfaces/*",
    "Microsoft.Network/virtualNetworks/subnets/join/action",
    "Microsoft.Network/virtualNetworks/read"
  ],
  "NotActions": [ "Microsoft.Authorization/*/Write", "Microsoft.Authorization/*/Delete" ],
  "DataActions": [ "Microsoft.Compute/virtualMachines/login/action" ],
  "NotDataActions": [],
  "AssignableScopes": [ "/subscriptions/<SUB-ID>" ]
}
```
```powershell
(Get-Content op.json -Raw).Replace("<SUB-ID>",$sub) | Set-Content op.json
New-AzRoleDefinition -InputFile op.json
```

### 3. Clonar pelo portal
@ Azure: Subscriptions > Sub-Lab > Access control (IAM) > Roles > (Reader) > ... > **Clone**

@ Entra: Entra ID > Roles & admins > (uma função built-in) — note que não há **Clone**; em uma função **custom** do Entra há.

## test
1. Tente salvar a função com `"/subscriptions/<id>/resourceGroups"` em AssignableScopes.
2. Atribua AZ104-L04-Operador a sc-user01 em um RG com uma VM: crie uma NIC, redimensione a VM, tente atribuir uma função.
3. Tire o `login/action` de DataActions e tente entrar na VM com Entra ID.

## evidence
- `Get-AzRoleDefinition -Name "AZ104-L04-Operador" | ConvertTo-Json`
- IAM > Roles > Type: CustomRole.

## expected
| Teste | Resultado |
|---|---|
| Escopo .../resourceGroups | Rejeitado (Q065) |
| Criar NIC / VM | Permitido (Q789) |
| Atribuir função | Negado por notActions (Q789) |
| Login sem dataAction | Negado (Q094) |
| Clonar built-in do Entra | Sem opção (Q207) |

## variations
- **Q101:** adicione /subscriptions/<outra-sub> ao AssignableScopes e remova o RG para reutilizar a função em várias assinaturas.

## breakit
Coloque `Microsoft.Compute/virtualMachines/login/action` em **Actions** em vez de DataActions: o comando aceita, mas a permissão de login não funciona.

## cleanup
```powershell
Get-AzRoleAssignment -RoleDefinitionName "AZ104-L04-Operador" | Remove-AzRoleAssignment
Remove-AzRoleDefinition -Name "AZ104-L04-Operador" -Force
```

## refs
- https://learn.microsoft.com/en-us/azure/role-based-access-control/custom-roles
- https://learn.microsoft.com/en-us/azure/role-based-access-control/role-definitions

=== L05 | Azure Policy | A | 60
questions: Q045,Q046,Q047,Q088,Q188,Q097,Q109,Q584,Q610,Q650,Q660,Q666,Q815
predict: Q088
## overview
Testa definições, atribuições, escopos, exclusões e efeitos (deny, append, modify).

- Escopo de atribuição: management group, assinatura ou RG; exclusão pode ser qualquer coisa abaixo, até um recurso (Q097, Q046).
- **Not allowed resource types** bloqueia criar e também atualizar/mover recursos do tipo (Q109, Q584, Q045).
- **Append a tag** age na criação/atualização, não em RGs nem em recursos existentes; tags do RG não são herdadas (Q047, Q088, Q188).
- Regra específica não existe built-in → **custom definition** (Q610, Q650, Q660, Q666).
- Criar definições: **Resource Policy Contributor** (Q815).

## prereqs
- Um management group (L03) ou a própria Sub-Lab.

## steps
### 1. Recursos
```bash
az group create -n rg-az104-l05a -l $LOC
az group create -n rg-az104-l05b -l $LOC
az network vnet create -g rg-az104-l05a -n az104-l05-vnet1 --address-prefix 10.50.0.0/16
```

### 2. Not allowed resource types no rg-az104-l05b
@ Azure: Policy > Assignments > Assign policy

- Scope: rg-az104-l05b · Definition: **Not allowed resource types** · Parameters: Microsoft.Network/virtualNetworks e Microsoft.Compute/virtualMachines.

### 3. Tag com append
- Scope: Sub-Lab · Exclusions: rg-az104-l05a/az104-l05-vnet1 · Definition: **Append a tag and its value to resources** · tag `Ambiente` = `Lab`.

### 4. Custom definition (deny de NSG sem regra para a 8080)
@ Azure: Policy > Definitions > + Policy definition

```json
{
  "mode": "All",
  "policyRule": {
    "if": { "allOf": [
      { "field": "type", "equals": "Microsoft.Network/networkSecurityGroups" },
      { "count": { "field": "Microsoft.Network/networkSecurityGroups/securityRules[*]",
          "where": { "allOf": [
            { "field": "Microsoft.Network/networkSecurityGroups/securityRules[*].destinationPortRange", "equals": "8080" },
            { "field": "Microsoft.Network/networkSecurityGroups/securityRules[*].access", "equals": "Deny" } ] } },
        "equals": 0 } ] },
    "then": { "effect": "deny" }
  }
}
```
Atribua à Sub-Lab como **AZ104-L05-NSG8080**.

## test
1. Crie uma VNet no rg-az104-l05b; mova a az104-l05-vnet1 para o rg-az104-l05b.
2. Crie um storage account no rg-az104-l05a e veja as tags; veja as tags do próprio RG e da vnet1 (excluída).
3. Crie um NSG sem regras e depois um NSG com uma regra Deny 8080.
4. @ Azure: Policy > Compliance — veja os recursos não conformes (force com `az policy state trigger-scan -g rg-az104-l05a`).

## evidence
- Erro **RequestDisallowedByPolicy** com o nome da atribuição.
- Policy > Compliance > (atribuição) > Resource compliance.

## expected
| Teste | Resultado |
|---|---|
| VNet nova no RG bloqueado | Negado (Q584) |
| Mover VNet para o RG bloqueado | Negado (Q109) |
| Storage novo | Recebe `Ambiente: Lab` (Q188) |
| RG e VNet excluída | Sem a tag (Q088) |
| NSG sem a regra 8080 | Negado pela custom policy (Q666) |

## variations
- **Q045:** atribua *Allowed resource types* = virtualNetworks em um MG e veja que mais nada pode ser criado nas assinaturas dele.
- **Q815:** dê **Resource Policy Contributor** a sc-user01 na assinatura e veja que ele cria definições, mas não recursos.

## breakit
Mude o efeito da custom definition para **audit**: o NSG é criado e só aparece como não conforme.

## cleanup
Remova as três atribuições e a custom definition; apague os RGs.

## refs
- https://learn.microsoft.com/en-us/azure/governance/policy/overview
- https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effects
- https://learn.microsoft.com/en-us/azure/governance/policy/concepts/assignment-structure

=== L06 | Locks e movimentação de recursos | A | 45
questions: Q086,Q187,Q1093,Q079,Q048,Q980,Q566,Q064
predict: Q187
## overview
Testa locks (CanNotDelete e ReadOnly) e a movimentação de recursos entre RGs e assinaturas.

- Locks e tags: assinaturas, RGs e recursos; management groups não recebem lock (Q086).
- **ReadOnly** bloqueia mover para o RG; **CanNotDelete** não bloqueia (Q187, Q1093).
- Lock e vault com backup impedem excluir o RG (Q079).
- Mover não muda a região (Q064, Q566); entre assinaturas, os recursos dependentes vão juntos (Q980, Q048).

## prereqs
- Duas assinaturas no mesmo tenant ajudam na variação Q980 (opcional).

## steps
### 1. Recursos e locks
```bash
for g in a b c; do az group create -n rg-az104-l06$g -l $LOC -o none; done
az network public-ip create -g rg-az104-l06a -n az104-l06-ip --sku Standard -o none
az storage account create -g rg-az104-l06a -n az104l06st$RANDOM --sku Standard_LRS -o none
az lock create -n trava-delete -g rg-az104-l06b --lock-type CanNotDelete
az lock create -n trava-ro     -g rg-az104-l06c --lock-type ReadOnly
```

### 2. Mover
@ Azure: rg-az104-l06a > (selecione o IP público) > Move > Move to another resource group

## test
1. Mova o IP público para rg-az104-l06b e depois para rg-az104-l06c.
2. Tente excluir o rg-az104-l06b.
3. Tente adicionar uma tag no rg-az104-l06c.
4. Veja a região do IP depois de mover.

## evidence
- Erro **ScopeLocked** e a validação do move (Validate).

## expected
| Teste | Resultado |
|---|---|
| Mover para RG com CanNotDelete | Permitido (Q187) |
| Mover para RG com ReadOnly | Negado (Q187, Q1093) |
| Excluir RG com CanNotDelete | Negado (Q079) |
| Região após mover | Inalterada (Q064, Q566) |

## variations
- **Q980 / Q048:** mova uma VM para outra assinatura: o portal exige levar disco, NIC e VNet juntos.
- **Q1093:** crie os locks por template ARM (`Microsoft.Authorization/locks`) dentro de uma implantação aninhada.

## breakit
Coloque um lock ReadOnly em um storage account e tente listar as chaves no portal: falha, porque listar chaves é uma operação POST.

## cleanup
```bash
az lock delete -n trava-delete -g rg-az104-l06b; az lock delete -n trava-ro -g rg-az104-l06c
for g in a b c; do az group delete -n rg-az104-l06$g --yes --no-wait; done
```

## refs
- https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources
- https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription

=== L07 | Custos: tags, budgets e Advisor | A | 30
questions: Q067,Q775,Q183,Q061,Q001
predict: Q183
## overview
Testa o controle de custos que aparece na AZ-104.

- **Tags** nos recursos para ratear custo por departamento; tags do RG não são herdadas (Q001, Q061).
- Budgets só **notificam**; alertas por porcentagem com action groups (Q183).
- **Advisor** (Cost): VMs subutilizadas e discos não anexados (Q067, Q775).

## steps
### 1. Tags
@ Azure: (qualquer recurso) > Tags — `Departamento: Financeiro`. Faça o mesmo em recursos de outro RG.

### 2. Cost analysis por tag
@ Azure: Cost Management > Cost analysis > Group by: **Tag** > Departamento > Download

### 3. Budget de RG
@ Azure: Cost Management > Budgets > Add — escopo: um RG, alertas em 50% e 100% com um action group.

### 4. Advisor
@ Azure: Advisor > Cost — crie e solte um disco gerenciado sem VM e espere a recomendação (pode levar 24 h).

## test
1. Filtre o Cost analysis pela tag.
2. Confira os alertas do budget.

## expected
| Teste | Resultado |
|---|---|
| Recursos sem tag própria | Não aparecem no filtro, mesmo com o RG marcado (Q061) |
| Budget estourado | Só notifica (Q183) |
| Disco órfão | Recomendação no Advisor (Q775) |

## cleanup
Apague o disco de teste e o budget.

## refs
- https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets
- https://learn.microsoft.com/en-us/azure/advisor/advisor-cost-recommendations
