/* =====================================================================
   SimuladorMS — banco de questões SC-300
   Fonte: dump SC-300 (ExamTopics, 413 questões) — curadoria Claude, out/2026.
   337 questões estruturadas. Fora do banco: 34 duplicadas/variantes,
   23 fora de escopo (Microsoft Entra Permissions Management, descontinuado,
   e questões inconsistentes) e 19 simulações (labs).

   Campos de curadoria:
     scope   in | borderline | out        → o simulado usa só "in" (borderline é opcional)
     review  ok | corrigida | duvidosa    → corrigida = gabarito do dump foi alterado
     answer_original                      → o que o dump marcava, quando difere
   ===================================================================== */
SIM.registerQuestions("SC-300", [
  {
    "id": "Q001",
    "src": 1,
    "domain": 1,
    "topic": "Licenciamento por grupo",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the following objects:\n\n- A device named Device1\n- Users named User1, User2, User3, User4, and User5\n- Groups named Group1, Group2, Group3, Group4, and Group5\n\nThe groups are configured as shown in the following table.\n\n![Exhibit](img/S001-stem-1.png){w=589}\n\nTo which groups can you assign a Microsoft Office 365 Enterprise E5 license directly?",
    "options": [
      "Group1 and Group4 only",
      "Group1, Group2, Group3, Group4, and Group5",
      "Group1 and Group2 only",
      "Group1 only",
      "Group1, Group2, Group4, and Group5 only"
    ],
    "answer": 2,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Licença por grupo exige grupo de **segurança** (ou M365 group com securityEnabled). Grupo de dispositivos não consome licença. Pela tabela, só Group1 e Group2 são elegíveis. Parte da comunidade argumenta que grupos M365 criados pelo portal do Entra também aceitam licença.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/licensing-group-advanced"
    ]
  },
  {
    "id": "Q002",
    "src": 2,
    "domain": 1,
    "topic": "Self-service sign-up",
    "type": "single",
    "stem": "You have a Microsoft Exchange organization that uses an SMTP address space of contoso.com.\n\nSeveral users use their contoso.com email address for self-service sign-up to Azure Active Directory (Azure AD).\n\nYou gain global administrator privileges to the Azure AD tenant that contains the self-signed users.\n\nYou need to prevent the users from creating user accounts in the contoso.com Azure AD tenant for self-service sign-up to Microsoft 365 services. Which PowerShell cmdlet should you run?",
    "options": [
      "Set-MsolCompanySettings",
      "Set-MsolDomainFederationSettings",
      "Update-MsolfederatedDomain",
      "Set-MsolDomain"
    ],
    "answer": 0,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Bloquear o self-service sign-up (contas \"viral\") era feito com **Set-MsolCompanySettings** (-AllowEmailVerifiedUsers $false -AllowAdHocSubscriptions $false). O módulo MSOnline foi aposentado; hoje o equivalente é **Update-MgPolicyAuthorizationPolicy** (Graph). Por isso a questão está como borderline.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/directory-self-service-signup"
    ]
  },
  {
    "id": "Q003",
    "src": 3,
    "domain": 1,
    "topic": "Email one-time passcode",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant that uses the domain named fabrikam.com. The Guest invite settings for Azure Active Directory (Azure AD) are configured as shown in the exhibit. (Click the Exhibit tab.)\n\n![Exhibit](img/S003-stem-1.png){w=611}\n\nA user in fabrikam.com shares a Microsoft SharePoint Online document library to the users shown in the following table.\n\n![Exhibit](img/S003-stem-2.png){w=594}\n\nWhich users will be emailed a passcode?",
    "options": [
      "User2 only",
      "User1 only",
      "User1 and User2 only",
      "User1, User2, and User3"
    ],
    "answer": 0,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "OTP é usado por convidados **novos** que não têm conta Entra, Microsoft account (MSA) nem federação. O dump marca só User2. Ponto discutível: outlook.com é uma Microsoft account, que pela documentação **não** recebe OTP, e User1 já é guest. Confira a discussão.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/one-time-passcode"
    ]
  },
  {
    "id": "Q004",
    "src": 4,
    "domain": 1,
    "topic": "Licenciamento",
    "type": "single",
    "stem": "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.\n\nFrom the Groups blade in the Azure Active Directory admin center, you assign Microsoft 365 Enterprise E5 licenses to the users.\n\nYou need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.\n\nWhat should you use?",
    "options": [
      "the Identity Governance blade in the Azure Active Directory admin center",
      "the Set-AzureAdUser cmdlet",
      "the Licenses blade in the Azure Active Directory admin center",
      "the Set-WindowsProductKey cmdlet"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Remover a licença E3 atribuída diretamente de 2.500 usuários de uma vez é mais simples pelo blade **Licenses** (selecionar o produto e remover os usuários em massa).",
    "refs": [
      "https://docs.microsoft.com/en-us/microsoft-365/admin/manage/remove-licenses-from-users?view=o365-worldwide"
    ]
  },
  {
    "id": "Q005",
    "src": 5,
    "domain": 1,
    "topic": "Colaboração externa",
    "type": "yesno",
    "stem": "You have a Microsoft 365 tenant named contoso.com.\n\nGuest user access is enabled.\n\nUsers are invited to collaborate with contoso.com as shown in the following table.\n\n![Exhibit](img/S005-stem-1.png){w=541}\n\nFrom the External collaboration settings in the Azure Active Directory admin center, you configure the Collaboration restrictions settings as shown in the following exhibit.\n\n![Exhibit](img/S005-stem-2.png){w=485}\n\nFrom a Microsoft SharePoint Online site, a user invites User3 to the site.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can accept the invitation and gain access to the enterprise application.",
      "User2 can access the enterprise application.",
      "User3 can accept the invitation and gain access to the SharePoint site."
    ],
    "answer": [
      true,
      true,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "As restrições de colaboração só permitem convites para outlook.com. User1 (outlook.com) pode aceitar o convite. User2 já tinha resgatado o convite antes da restrição e continua com acesso. O domínio de User3 não é permitido, então o convite não é enviado."
  },
  {
    "id": "Q006",
    "src": 6,
    "domain": 1,
    "topic": "B2B em massa",
    "type": "multi",
    "stem": "You have an Azure Active Directory (Azure AD) tenant named contoso.com. You plan to bulk invite Azure AD business-to-business (B2B) collaboration users. Which two parameters must you include when you create the bulk invite? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "email address",
      "redirection URL",
      "username",
      "shared key",
      "password"
    ],
    "answer": [
      0,
      1
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O CSV de convite em massa exige **endereço de e-mail** e **URL de redirecionamento**; os demais campos são opcionais.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/tutorial-bulk-invite"
    ]
  },
  {
    "id": "Q007",
    "src": 7,
    "domain": 1,
    "topic": "Grupos",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the objects shown in the following table.\n\n![Exhibit](img/S007-stem-1.png){w=589}\n\nWhich objects can you add as members to Group3?",
    "options": [
      "User2 and Group2 only",
      "User2, Group1, and Group2 only",
      "User1, User2, Group1 and Group2",
      "User1 and User2 only",
      "User2 only"
    ],
    "answer": 4,
    "scope": "in",
    "review": "ok",
    "explanation": "Mail-enabled security group é gerenciado pelo Exchange: aceita apenas destinatários com caixa de e-mail (User2, licenciado). Não aceita usuário sem licença/caixa (User1), grupo de segurança comum nem grupo M365 como membros.",
    "refs": [
      "https://bitsizedbytes.wordpress.com/2018/12/10/distribution-security-and-office-365-groups-nesting/"
    ]
  },
  {
    "id": "Q008",
    "src": 8,
    "domain": 1,
    "topic": "Admin takeover",
    "type": "order",
    "stem": "You have an on-premises Microsoft Exchange organization that uses an SMTP address space of contoso.com.\n\nYou discover that users use their email address for self-service sign-up to Microsoft 365 services.\n\nYou need to gain global administrator privileges to the Azure Active Directory (Azure AD) tenant that contains the self-signed users.\n\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
    "pool": [
      "Sign in to the Microsoft 365 admin center.",
      "Create a self-signed user account in the Azure AD tenant.",
      "From the Microsoft 365 admin center, add the domain name.",
      "Respond to the Become the admin message.",
      "From the Microsoft 365 admin center, remove the domain name.",
      "Create a TXT record in the contoso.com DNS zone."
    ],
    "answer": [
      1,
      0,
      3,
      5
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Takeover interno de um tenant não gerenciado (viral): **criar uma conta self-service** com um endereço do domínio, **entrar no Microsoft 365 admin center**, responder à mensagem **Become the admin** e comprovar a posse do domínio com um **registro TXT**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/domains-admin-takeover"
    ]
  },
  {
    "id": "Q009",
    "src": 9,
    "domain": 1,
    "topic": "Grupos",
    "type": "hotarea",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains a user named User1 and the groups shown in the following table.\n\n![Exhibit](img/S009-stem-1.png){w=430}\n\nIn the tenant, you create the groups shown in the following table.\n\n![Exhibit](img/S009-stem-2.png){w=429}\n\nWhich members can you add to GroupA and GroupB? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "GroupA:",
        "options": [
          "User1 only",
          "User1 and Group1 only",
          "User1, Group1, and Group2 only",
          "User1, Group1, and Group4 only",
          "User1, Group1, Group2, and Group3 only",
          "User1, Group1, Group2, Group3, and Group4"
        ],
        "answer": 4
      },
      {
        "label": "GroupB:",
        "options": [
          "User1 only",
          "User1 and Group4 only",
          "User1, Group1, and Group3 only",
          "User1, Group1, Group2, and Group4 only",
          "User1, Group1, Group2, Group3, and Group4"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Grupos de segurança aceitam usuários e outros grupos de segurança/distribuição habilitados conforme o tipo, mas **não** grupos Microsoft 365 como membros. Grupos Microsoft 365 aceitam **apenas usuários** (sem grupos aninhados).",
    "refs": [
      "https://bitsizedbytes.wordpress.com/2018/12/10/distribution-security-and-office-365-groups-nesting/"
    ]
  },
  {
    "id": "Q010",
    "src": 10,
    "domain": 1,
    "topic": "Autenticação híbrida",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "DISABLED"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have an Active Directory forest that syncs to an Azure Active Directory (Azure AD) tenant.\n\nYou discover that when a user account is disabled in Active Directory, the disabled user can still authenticate to Azure AD for up to 30 minutes. You need to ensure that when a user account is disabled in Active Directory, the user account is immediately prevented from authenticating to Azure AD.\n\nSolution: You configure password writeback.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Password writeback só grava no AD as senhas alteradas na nuvem. Não muda o fato de o usuário desabilitado continuar autenticando via hash sincronizado.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/choose-ad-authn"
    ]
  },
  {
    "id": "Q011",
    "src": 11,
    "domain": 1,
    "topic": "Autenticação híbrida",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "DISABLED"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have an Active Directory forest that syncs to an Azure Active Directory (Azure AD) tenant.\n\nYou discover that when a user account is disabled in Active Directory, the disabled user can still authenticate to Azure AD for up to 30 minutes. You need to ensure that when a user account is disabled in Active Directory, the user account is immediately prevented from authenticating to Azure AD.\n\nSolution: You configure pass-through authentication.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Com **pass-through authentication**, a senha é validada no AD on-premises em tempo real; conta desabilitada é bloqueada imediatamente.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/choose-ad-authn"
    ]
  },
  {
    "id": "Q012",
    "src": 12,
    "domain": 1,
    "topic": "Autenticação híbrida",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "DISABLED"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have an Azure Active Directory (Azure AD) tenant that syncs to an Active Directory forest.\n\nYou discover that when a user account is disabled in Active Directory, the disabled user can still authenticate to Azure AD for up to 30 minutes. You need to ensure that when a user account is disabled in Active Directory, the user account is immediately prevented from authenticating to Azure AD.\n\nSolution: You configure conditional access policies.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Conditional Access não lê o estado da conta no AD on-premises; o atraso vem do ciclo de sincronização do hash. A solução é PTA.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/choose-ad-authn"
    ]
  },
  {
    "id": "Q013",
    "src": 13,
    "domain": 1,
    "topic": "Licenciamento por grupo",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the following objects.\n\n- A device named Device1\n- Users named User1, User2, User3, User4, and User5\n\nFive groups named Group1, Group2, Group3, Group4, and Group5\n\nThe groups are configured as shown in the following table.\n\n![Exhibit](img/S013-stem-1.png){w=569}\n\nHow many licenses are used if you assign the Microsoft 365 Enterprise E5 license to Group1?",
    "options": [
      "0",
      "2",
      "3",
      "4"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Licença atribuída a um grupo **não é herdada por grupos aninhados** — só membros diretos (usuários) de Group1 consomem licença.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/licensing-group-advanced"
    ]
  },
  {
    "id": "Q014",
    "src": 14,
    "domain": 1,
    "topic": "Usuários convidados",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant named contoso.com that contains an Azure AD enterprise application named App1.\n\nA contractor uses the credentials of contractor@fabrikam.com.\n\nYou need to ensure that you can provide the contractor with access to App1. The contractor must be able to authenticate as contractor@fabrikam.com.\n\nWhat should you do?",
    "options": [
      "Run the New-AzADUser cmdlet.",
      "Configure the External collaboration settings.",
      "Add a WS-Fed identity provider.",
      "Create a guest user account in contoso.com."
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Para que a pessoa autentique com a própria conta externa, crie/convide um **usuário guest** no tenant (B2B).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/b2b-quickstart-add-guest-users-portal"
    ]
  },
  {
    "id": "Q015",
    "src": 15,
    "domain": 1,
    "topic": "Entra Connect Sync",
    "type": "single",
    "stem": "Your network contains an Active Directory forest named contoso.com that is linked to an Azure Active Directory (Azure AD) tenant named contoso.com by using\n\nAzure AD Connect.\n\nYou need to prevent the synchronization of users who have the extensionAttribute15 attribute set to NoSync.\n\nWhat should you do in Azure AD Connect?",
    "options": [
      "Create an inbound synchronization rule for the Windows Azure Active Directory connector.",
      "Configure a Full Import run profile.",
      "Create an inbound synchronization rule for the Active Directory Domain Services connector.",
      "Configure an Export run profile."
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Filtragem negativa por atributo é feita com uma regra de sincronização **inbound** no conector do **Active Directory** (AD → metaverso), com scoping filter extensionAttribute15 = NoSync e ação cloudFiltered = True.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-sync-change-the-configuration"
    ]
  },
  {
    "id": "Q016",
    "src": 16,
    "domain": 1,
    "topic": "Pass-through authentication",
    "type": "single",
    "stem": "Your network contains an on-premises Active Directory domain that syncs to an Azure Active Directory (Azure AD) tenant. The tenant contains the users shown in the following table.\n\n![Exhibit](img/S016-stem-1.png){w=359}\n\nAll the users work remotely.\n\nAzure AD Connect is configured in Azure AD as shown in the following exhibit.\n\n![Exhibit](img/S016-stem-2.png){w=585}\n\nConnectivity from the on-premises domain to the internet is lost. Which users can sign in to Azure AD?",
    "options": [
      "User1 and User3 only",
      "User1 only",
      "User1, User2, and User3",
      "User1 and User2 only"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Com PTA ativo, usuários sincronizados (User2) dependem dos agentes on-premises; sem internet no ambiente local, não autenticam (o fallback para PHS não é automático). Usuários somente nuvem (User1) e guests (User3) continuam entrando.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-pta-current-limitations"
    ]
  },
  {
    "id": "Q017",
    "src": 17,
    "domain": 1,
    "topic": "Autenticação híbrida",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "DISABLED"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have an Active Directory forest that syncs to an Azure Active Directory (Azure AD) tenant.\n\nYou discover that when a user account is disabled in Active Directory, the disabled user can still authenticate to Azure AD for up to 30 minutes. You need to ensure that when a user account is disabled in Active Directory, the user account is immediately prevented from authenticating to Azure AD.\n\nSolution: You configure Azure AD Password Protection.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O Password Protection só aplica listas de senhas banidas; não tem relação com o atraso de contas desabilitadas. A solução é PTA."
  },
  {
    "id": "Q018",
    "src": 18,
    "domain": 1,
    "topic": "Entra Connect Sync",
    "type": "yesno",
    "stem": "Your network contains an on-premises Active Directory domain named contoso.com. The domain contains the objects shown in the following table.\n\n![Exhibit](img/S018-stem-1.png){w=603}\n\nYou install Azure AD Connect. You configure the Domain and OU filtering settings as shown in the Domain and OU Filtering exhibit. (Click the Domain and OU Filtering tab.)\n\n![Exhibit](img/S018-stem-2.png){w=611}\n\nYou configure the Filter users and devices settings as shown in the Filter Users and Devices exhibit. (Click the Filter Users and Devices tab.)\n\n![Exhibit](img/S018-stem-3.png){w=611}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 syncs to Azure AD.",
      "User2 syncs to Azure AD.",
      "Group2 syncs to Azure AD."
    ],
    "answer": [
      true,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Com filtragem por grupo no Entra Connect, só os **membros diretos** do grupo são sincronizados. Um grupo aninhado (Group2) é sincronizado como objeto, mas os membros dele não.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-custom"
    ]
  },
  {
    "id": "Q019",
    "src": 19,
    "domain": 1,
    "topic": "External ID — cobrança",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant named contoso.com. You need to ensure that Azure AD External Identities pricing is based on monthly active users (MAU).\n\nWhat should you configure?",
    "options": [
      "a user flow",
      "the terms of use",
      "a linked subscription",
      "an access review"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Para usar a cobrança por **MAU** do External ID, o tenant precisa estar **vinculado a uma assinatura Azure** (linked subscription).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/external-identities-pricing"
    ]
  },
  {
    "id": "Q020",
    "src": 20,
    "domain": 1,
    "topic": "Domínios personalizados",
    "type": "order",
    "stem": "You have a new Microsoft 365 tenant that uses a domain name of contoso.onmicrosoft.com.\n\nYou register the name contoso.com with a domain registrar.\n\nYou need to use contoso.com as the default domain name for new Microsoft 365 users.\n\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
    "pool": [
      "Delete the contoso.ommicrosoft.com domain.",
      "Add a custom domain name of contoso.com.",
      "Set the domain to primary.",
      "Create a new TXT record in DNS.",
      "Successfully verify the domain name."
    ],
    "answer": [
      1,
      3,
      4,
      2
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Adicionar o domínio personalizado, criar o registro **TXT** no DNS, verificar o domínio e defini-lo como **primário (padrão)**. O domínio .onmicrosoft.com não pode ser excluído.",
    "refs": [
      "https://practical365.com/configure-a-custom-domain-in-office-365/"
    ]
  },
  {
    "id": "Q021",
    "src": 21,
    "domain": 1,
    "topic": "Configurações de dispositivo",
    "type": "yesno",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that has an Azure Active Directory Premium Plan 2 license. The tenant contains the users shown in the following table.\n\n![Exhibit](img/S021-stem-1.png){w=497}\n\nYou have the Device Settings shown in the following exhibit.\n\n![Exhibit](img/S021-stem-2.png){w=611}\n\nUser1 has the devices shown in the following table.\n\n![Exhibit](img/S021-stem-3.png){w=558}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can join four additional Windows 10 devices to Azure AD.",
      "Admin1 can set Devices to be Azure AD joined or Azure AD registered require Multi-Factor Authentication to Yes.",
      "Admin2 is a local administrator on Device3."
    ],
    "answer": [
      false,
      false,
      false
    ],
    "answer_original": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "O limite de 5 dispositivos vale para dispositivos **joined + registered**. User1 já tem 4 (1 joined, 3 registered) e só pode adicionar mais 1. Cloud device administrator não altera Device settings. Admin2 é administrador local apenas em dispositivos **Entra joined**, e o Device3 é só registrado. O dump marcava Sim na primeira.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/devices/device-management-azure-portal"
    ]
  },
  {
    "id": "Q022",
    "src": 22,
    "domain": 1,
    "topic": "Portais de administração",
    "type": "match",
    "stem": "You have a Microsoft 365 E5 subscription that contains three users named User1, User2, and User3.\n\nYou need to configure the users as shown in the following table.\n\n![Exhibit](img/S022-stem-1.png){w=552}\n\nWhich portal should you use to configure each user? To answer, drag the appropriate portals to the correct users. Each portal may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "Azure Active Directory admin center",
      "Exchange admin center",
      "Microsoft 365 compliance center",
      "Microsoft Endpoint Manager admin center",
      "SharePoint admin center"
    ],
    "targets": [
      {
        "label": "User1:",
        "answer": 0
      },
      {
        "label": "User2:",
        "answer": 1
      },
      {
        "label": "User3:",
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "User1: funções do Entra ID (User administrator, Device Administrators, Identity Governance Administrator) → **Entra admin center**. User2: os role groups Records Management e Quarantine Administrator são do **Exchange admin center** (parte da comunidade aponta o portal Purview). User3: funções do Intune → **Intune (Endpoint Manager) admin center**."
  },
  {
    "id": "Q023",
    "src": 23,
    "domain": 1,
    "topic": "Pass-through authentication",
    "type": "single",
    "stem": "You have an Active Directory forest that syncs to an Azure Active Directory (Azure AD) tenant. The tenant uses pass-through authentication. A corporate security policy states the following:\n\n- Domain controllers must never communicate directly to the internet.\n- Only required software must be installed on servers.\n\nThe Active Directory domain contains the on-premises servers shown in the following table.\n\n![Exhibit](img/S023-stem-1.png){w=555}\n\nYou need to ensure that users can authenticate to Azure AD if a server fails. On which server should you install an additional pass-through authentication agent?",
    "options": [
      "Server4",
      "Server2",
      "Server1",
      "Server3"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Agente de PTA adicional para alta disponibilidade deve ficar em servidor membro que pode acessar a internet e não seja DC — pela tabela, o **Server4**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-pta-quick-start"
    ]
  },
  {
    "id": "Q024",
    "src": 24,
    "domain": 1,
    "topic": "Usuários convidados",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant named contoso.com that contains an Azure AD enterprise application named App1.\n\nA contractor uses the credentials of contractor@fabrikam.com.\n\nYou need to ensure that you can provide the contractor with access to App1. The contractor must be able to authenticate as contractor@fabrikam.com.\n\nWhat should you do?",
    "options": [
      "Run the New-AzureADMSInvitation cmdlet.",
      "Configure the External collaboration settings.",
      "Add a WS-Fed identity provider.",
      "Implement Azure AD Connect."
    ],
    "answer": 0,
    "scope": "borderline",
    "review": "ok",
    "explanation": "**New-AzureADMSInvitation** convida o usuário externo como guest. O módulo AzureAD foi aposentado; hoje o equivalente é **New-MgInvitation** — por isso a questão está como borderline.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/b2b-quickstart-add-guest-users-portal",
      "https://docs.microsoft.com/en-us/powershell/module/azuread/new-azureadmsinvitation?view=azureadps-2.0"
    ]
  },
  {
    "id": "Q025",
    "src": 25,
    "domain": 1,
    "topic": "Licenciamento",
    "type": "single",
    "stem": "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.\n\nFrom the Groups blade in the Azure Active Directory admin center, you assign Microsoft 365 Enterprise E5 licenses to the users.\n\nYou need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.\n\nWhat should you use?",
    "options": [
      "the Administrative units blade in the Azure Active Directory admin center",
      "the Set-AzureAdUser cmdlet",
      "the Groups blade in the Azure Active Directory admin center",
      "the Set-MsolUserLicense cmdlet"
    ],
    "answer": 3,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Pelo gabarito, **Set-MsolUserLicense** remove a licença em massa via script. O MSOnline foi aposentado; hoje seria **Set-MgUserLicense**. Questão marcada como borderline.",
    "refs": [
      "https://docs.microsoft.com/en-us/powershell/module/msonline/set-msoluserlicense?"
    ]
  },
  {
    "id": "Q026",
    "src": 26,
    "domain": 1,
    "topic": "Self-service sign-up",
    "type": "hotarea",
    "stem": "You have an Azure Active Directory (Azure AD) tenant and an Azure web app named App1.\n\nYou need to provide guest users with self-service sign-up for App1. The solution must meet the following requirements:\n\n- Guest users must be able to sign up by using a one-time password.\n- The users must provide their first name, last name, city, and email address during the sign-up process.\n\nWhat should you configure in the Azure Active Directory admin center for each requirement? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "One-time password:",
        "options": [
          "A linked subscription",
          "An identity provider",
          "Azure AD Privileged Identity Management (PIM)",
          "The External collaboration settings"
        ],
        "answer": 1
      },
      {
        "label": "User details:",
        "options": [
          "A user flow",
          "Access reviews",
          "An access package",
          "The tenant properties"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O one-time passcode por e-mail é habilitado como **identity provider** (Email one-time passcode). Os atributos coletados no cadastro (nome, sobrenome, cidade) são definidos no **user flow** de self-service sign-up.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/identity-providers",
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/self-service-sign-up-overview"
    ]
  },
  {
    "id": "Q027",
    "src": 27,
    "domain": 1,
    "topic": "Criação em massa",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) Azure AD tenant. You need to bulk create 25 new user accounts by uploading a template file. Which properties are required in the template file?",
    "options": [
      "displayName, identityIssuer, usageLocation, and userType",
      "accountEnabled, givenName, surname, and userPrincipalName",
      "accountEnabled, displayName, userPrincipalName, and passwordProfile",
      "accountEnabled, passwordProfile, usageLocation, and userPrincipalName"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O template de criação em massa exige **displayName, userPrincipalName, passwordProfile (senha inicial) e accountEnabled (bloquear entrada)**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/users-bulk-add"
    ]
  },
  {
    "id": "Q028",
    "src": 28,
    "domain": 1,
    "topic": "Seamless SSO",
    "type": "single",
    "stem": "Your network contains an on-premises Active Directory domain that syncs to an Azure Active Directory (Azure AD) tenant.\n\nUsers sign in to computers that run Windows 10 and are joined to the domain. You plan to implement Azure AD Seamless Single Sign-On (Azure AD Seamless SSO).\n\nYou need to configure the Windows 10 computers to support Azure AD Seamless SSO.\n\nWhat should you do?",
    "options": [
      "Configure Sign-in options from the Settings app.",
      "Enable Enterprise State Roaming.",
      "Modify the Intranet Zone settings.",
      "Install the Azure AD Connect Authentication Agent."
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Para o Seamless SSO, a URL https://autologon.microsoftazuread-sso.com precisa estar na zona **Intranet local** dos navegadores (via GPO).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-sso-quick-start"
    ]
  },
  {
    "id": "Q030",
    "src": 30,
    "domain": 1,
    "topic": "Propriedades de usuário",
    "type": "hotarea",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.\n\n![Exhibit](img/S030-stem-1.png){w=398}\n\nFor which users can you configure the Job title property and the Usage location property in Azure AD? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Job title property:",
        "options": [
          "User2 only",
          "User1 and User2 only",
          "User2 and User3 only",
          "User1, User2, and User3"
        ],
        "answer": 2
      },
      {
        "label": "Usage location property:",
        "options": [
          "User2 only",
          "User1 and User2 only",
          "User2 and User3 only",
          "User1, User2, and User3"
        ],
        "answer": 3
      }
    ],
    "answer_original": [
      1,
      3
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Atributos de usuários **sincronizados** do AD (User1) como Job title só são editados on-premises. Usage location é um atributo de nuvem e pode ser definido para todos, inclusive guests. O dump marcava User1 e User2 para Job title.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-users-profile-azure-portal",
      "https://docs.microsoft.com/en-us/power-platform/admin/invite-users-azure-active-directory-b2b-collaboration#update-users-name-and-usage-location"
    ]
  },
  {
    "id": "Q031",
    "src": 31,
    "domain": 4,
    "topic": "Entitlement management",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that: contains a user named User1.\n\nYou need to ensure that User1 can create new catalogs and add1 resources to the catalogs they own.\n\nWhat should you do?",
    "options": [
      "From the Roles and administrators blade, modify the Groups administrator role.",
      "From the Roles and administrators blade, modify the Service support administrator role.",
      "From the Identity Governance blade, modify the Entitlement management settings.",
      "From the Identity Governance blade, modify the roles and administrators for the General catalog."
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Para delegar a criação de catálogos, adicione o usuário como **Catalog creator** em Identity Governance > Entitlement management > Settings.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-catalog-create",
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference"
    ]
  },
  {
    "id": "Q032",
    "src": 32,
    "domain": 1,
    "topic": "Seamless SSO",
    "type": "single",
    "stem": "Your network contains an on-premises Active Directory domain that syncs to an Azure Active Directory (Azure AD) tenant.\n\nUsers sign in to computers that run Windows 10 and are joined to the domain. You plan to implement Azure AD Seamless Single Sign-On (Azure AD Seamless SSO).\n\nYou need to configure the Windows 10 computers to support Azure AD Seamless SSO.\n\nWhat should you do?",
    "options": [
      "Configure Sign-in options from the Settings app.",
      "Enable Enterprise State Roaming.",
      "Modify the Local intranet Zone settings.",
      "Install the Azure AD Connect Authentication Agent."
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Os computadores precisam ter https://autologon.microsoftazuread-sso.com na zona **Local intranet** (via GPO).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-sso-quick-start"
    ]
  },
  {
    "id": "Q033",
    "src": 33,
    "domain": 1,
    "topic": "Colaboração entre tenants",
    "type": "single",
    "stem": "Your company has two divisions named Contoso East and Contoso West. The Microsoft 365 identity architecture for both divisions is shown in the following exhibit.\n\n![Exhibit](img/S033-stem-1.png){w=611}\n\nYou need to assign users from the Contoso East division access to Microsoft SharePoint Online sites in the Contoso West tenant. The solution must not require additional Microsoft 365 licenses.\n\nWhat should you do?",
    "options": [
      "Configure Azure AD Application Proxy in the Contoso West tenant.",
      "Invite the Contoso East users as guests in the Contoso West tenant.",
      "Deploy a second Azure AD Connect server to Contoso East and configure the server to sync the Contoso East Active Directory forest to the Contoso West tenant.",
      "Configure the existing Azure AD Connect server in Contoso East to sync the Contoso East Active Directory forest to the Contoso West tenant."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Sem licenças extras, a forma é **convidar os usuários como guests (B2B)** no tenant Contoso West. Hoje isso pode ser complementado com cross-tenant access settings / sincronização entre tenants.",
    "refs": [
      "https://redmondmag.com/articles/2020/03/11/guest-access-sharepoint-online-team-sites.aspx",
      "https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/multi-tenant-common-considerations"
    ]
  },
  {
    "id": "Q034",
    "src": 34,
    "domain": 2,
    "topic": "Security defaults",
    "type": "single",
    "stem": "You configure a new Microsoft 365 tenant to use a default domain name of contoso.com.\n\nYou need to ensure that you can control access to Microsoft 365 resources by using conditional access policies.\n\nWhat should you do first?",
    "options": [
      "Disable the User consent settings.",
      "Disable Security defaults.",
      "Configure a multi-factor authentication (MFA) registration policy.",
      "Configure password protection for Windows Server Active Directory."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Security defaults e políticas de Conditional Access são mutuamente exclusivos: primeiro **desabilite os security defaults**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/concept-fundamentals-security-defaults"
    ]
  },
  {
    "id": "Q035",
    "src": 35,
    "domain": 2,
    "topic": "Métodos de autenticação",
    "type": "single",
    "stem": "Your company has a Microsoft 365 tenant.\n\nThe company has a call center that contains 300 users. In the call center, the users share desktop computers and might use a different computer every day. The call center computers are NOT configured for biometric identification. The users are prohibited from having a mobile phone in the call center. You need to require multi-factor authentication (MFA) for the call center users when they access Microsoft 365 services.\n\nWhat should you include in the solution?",
    "options": [
      "a named network location",
      "the Microsoft Authenticator app",
      "Windows Hello for Business authentication",
      "FIDO2 tokens"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Sem celular, sem biometria e com PCs compartilhados, a opção de MFA é uma chave de segurança **FIDO2** (passkey) que o usuário leva consigo.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-passwordless"
    ]
  },
  {
    "id": "Q036",
    "src": 36,
    "domain": 2,
    "topic": "Conditional Access",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant named contoso.com. All users who run applications registered in Azure AD are subject to conditional access policies.\n\nYou need to prevent the users from using legacy authentication. What should you include in the conditional access policies to filter out legacy authentication attempts?",
    "options": [
      "a cloud apps or actions condition",
      "a user risk condition",
      "a client apps condition",
      "a sign-in risk condition"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Autenticação legada é filtrada pela condição **Client apps** (Exchange ActiveSync e Other clients).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/block-legacy-authentication"
    ]
  },
  {
    "id": "Q037",
    "src": 37,
    "domain": 2,
    "topic": "ID Protection",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant.\n\nYou open the risk detections report.\n\nWhich risk detection type is classified as a user risk?",
    "options": [
      "impossible travel",
      "anonymous IP address",
      "atypical travel",
      "leaked credentials"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "**Leaked credentials** é detecção de **risco de usuário**. As demais (viagem impossível/atípica, IP anônimo) são de risco de entrada.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/concept-identity-protection-risks"
    ]
  },
  {
    "id": "Q038",
    "src": 38,
    "domain": 2,
    "topic": "Conditional Access — sessão",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nAll users have computers that run Windows 10. Most computers are company- owned and joined to Azure Active Directory (Azure AD). Some computers are user- owned and are only registered in Azure AD.\n\nYou need to prevent users who connect to Microsoft SharePoint Online on their user-owned computer from downloading or syncing files. Other users must NOT be restricted.\n\nWhich policy type should you create?",
    "options": [
      "a Microsoft Cloud App Security activity policy that has Microsoft Office 365 governance actions configured",
      "an Azure AD conditional access policy that has session controls configured",
      "an Azure AD conditional access policy that has client apps conditions configured",
      "a Microsoft Cloud App Security app discovery policy that has governance actions configured"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Bloquear download/sync em dispositivos não gerenciados é feito com CA com controle de **sessão** (app enforced restrictions ou Conditional Access App Control), condicionado a dispositivo não conforme/não joined.",
    "refs": [
      "https://docs.microsoft.com/en-us/cloud-app-security/proxy-intro-aad"
    ]
  },
  {
    "id": "Q039",
    "src": 39,
    "domain": 2,
    "topic": "MFA para VPN",
    "type": "single",
    "stem": "You have an Active Directory domain that syncs to an Azure Active Directory (Azure AD) tenant.\n\nThe on-premises network contains a VPN server that authenticates to the on- premises Active Directory domain. The VPN server does NOT support Azure Multi-\n\nFactor Authentication (MFA).\n\nYou need to recommend a solution to provide Azure MFA for VPN connections. What should you include in the recommendation?",
    "options": [
      "Azure AD Application Proxy",
      "an Azure AD Password Protection proxy",
      "Network Policy Server (NPS)",
      "a pass-through authentication proxy"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Para VPN que não suporta MFA do Entra, use **NPS** com a extensão NPS do Entra MFA (RADIUS).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-nps-extension-vpn"
    ]
  },
  {
    "id": "Q040",
    "src": 40,
    "domain": 2,
    "topic": "Password protection",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nThe Azure Active Directory (Azure AD) tenant is configured to sync with an on- premises Active Directory domain. The domain contains the servers shown in the following table.\n\n![Exhibit](img/S040-stem-1.png){w=611}\n\nThe domain controllers are prevented from communicating to the internet. You implement Azure AD Password Protection on Server1 and Server2. You deploy a new server named Server4 that runs Windows Server 2019. You need to ensure that Azure AD Password Protection will continue to work if a single server fails.\n\nWhat should you implement on Server4?",
    "options": [
      "Azure AD Connect",
      "Azure AD Application Proxy",
      "Password Change Notification Service (PCNS)",
      "the Azure AD Password Protection proxy service"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O **proxy service** do Password Protection busca a lista de senhas banidas no Azure para os agentes dos DCs. Um segundo proxy (Server4) dá redundância.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-password-ban-bad-on-premises-deploy"
    ]
  },
  {
    "id": "Q042",
    "src": 42,
    "domain": 2,
    "topic": "Métodos de autenticação",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nAll users have mobile phones and laptops.\n\nThe users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptop to a wired network that has internet access. You plan to implement multi-factor authentication (MFA).\n\nWhich MFA authentication method can the users use from the remote location?",
    "options": [
      "a notification through the Microsoft Authenticator app",
      "an app password",
      "Windows Hello for Business",
      "SMS"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) elimina notificação push e SMS. O **Windows Hello for Business** é MFA (dispositivo + PIN/biometria) e funciona só com a internet do laptop.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-methods",
      "https://docs.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/hello-overview"
    ]
  },
  {
    "id": "Q043",
    "src": 43,
    "domain": 2,
    "topic": "MFA — fraud alert",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "FRAUD"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Microsoft 365 tenant.\n\nAll users must use the Microsoft Authenticator app for multi-factor authentication (MFA) when accessing Microsoft 365 services.\n\nSome users report that they received an MFA prompt on their Microsoft Authenticator app without initiating a sign-in request.\n\nYou need to block the users automatically when they report an MFA request that they did not initiate.\n\nSolution: From the Azure portal, you configure the Notifications settings for multi-factor authentication (MFA).\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "As configurações de notificações só definem quem recebe e-mail de fraude. Bloquear automaticamente quem reporta é feito em **Fraud alert** (hoje: Report suspicious activity).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings"
    ]
  },
  {
    "id": "Q044",
    "src": 44,
    "domain": 2,
    "topic": "MFA — fraud alert",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "FRAUD"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Microsoft 365 tenant.\n\nAll users must use the Microsoft Authenticator app for multi-factor authentication (MFA) when accessing Microsoft 365 services.\n\nSome users report that they received an MFA prompt on their Microsoft Authenticator app without initiating a sign-in request.\n\nYou need to block the users automatically when they report an MFA request that they did not initiate.\n\nSolution: From the Azure portal, you configure the Account lockout settings for multi-factor authentication (MFA).\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Account lockout bloqueia após tentativas de MFA negadas em sequência, não quando o usuário reporta fraude. A configuração correta é **Fraud alert**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings"
    ]
  },
  {
    "id": "Q045",
    "src": 45,
    "domain": 2,
    "topic": "MFA — fraud alert",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "FRAUD"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Microsoft 365 tenant.\n\nAll users must use the Microsoft Authenticator app for multi-factor authentication (MFA) when accessing Microsoft 365 services.\n\nSome users report that they received an MFA prompt on their Microsoft Authenticator app without initiating a sign-in request.\n\nYou need to block the users automatically when they report an MFA request that they did not initiate.\n\nSolution: From the Azure portal, you configure the Block/unblock users settings for multi-factor authentication (MFA).\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Block/unblock users é manual. O bloqueio automático vem da opção \"Automatically block users who report fraud\" em **Fraud alert**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings"
    ]
  },
  {
    "id": "Q046",
    "src": 46,
    "domain": 2,
    "topic": "ID Protection",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 tenant.\n\nYou need to identify users who have leaked credentials. The solution must meet the following requirements:\n\n- Identify sign-ins by users who are suspected of having leaked credentials.\n- Flag the sign-ins as a high-risk event.\n- Immediately enforce a control to mitigate the risk, while still allowing the user to access applications.\n\nWhat should you use? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "To classify leaked credentials as high-risk, use:",
        "options": [
          "Azure Active Directory (Azure AD) Identity Protection",
          "Azure Active Directory (Azure AD) Privileged Identity Management (PIM)",
          "Identity Governance",
          "Self-service password reset (SSPR)"
        ],
        "answer": 0
      },
      {
        "label": "To trigger remediation, use:",
        "options": [
          "Client apps not using Modern authentication",
          "Device state",
          "Sign-in risk",
          "User location",
          "User risk"
        ],
        "answer": 4
      },
      {
        "label": "To mitigate the risk, select:",
        "options": [
          "Apply app enforced restrictions",
          "Block access",
          "Grant access but require app protection policy",
          "Grant access but require password change"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Leaked credentials é detectado e classificado pelo **ID Protection** como **risco de usuário**. A remediação que mantém o acesso é exigir **troca de senha** (segura, com MFA).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/concept-identity-protection-risks"
    ]
  },
  {
    "id": "Q047",
    "src": 47,
    "domain": 2,
    "topic": "ID Protection",
    "type": "hotarea",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.\n\n![Exhibit](img/S047-stem-1.png){w=417}\n\nYou plan to implement Azure AD Identity Protection.\n\nWhich users can configure the user risk policy, and which users can view the risky users report? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Configure the user risk policy:",
        "options": [
          "User3 only",
          "User3 and User4 only",
          "User1, User2, and User3 only",
          "User1, User3, and User4 only",
          "User1, User2, User3, and User4"
        ],
        "answer": 0
      },
      {
        "label": "View the risky users report:",
        "options": [
          "User3 only",
          "User3 and User4 only",
          "User1, User2, and User3 only",
          "User1, User3, and User4 only",
          "User1, User2, User3, and User4"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A política de risco de usuário do ID Protection é configurada por **Security administrator** (ou Global). O relatório de usuários de risco pode ser visto também pelo **Security operator** (e Security reader / Global reader).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection"
    ]
  },
  {
    "id": "Q048",
    "src": 48,
    "domain": 1,
    "topic": "Unidades administrativas",
    "type": "yesno",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains a group named Group3 and an administrative unit named Department1.\n\nDepartment1 has the users shown in the Users exhibit. (Click the Users tab.)\n\n![Exhibit](img/S048-stem-1.png){w=611}\n\nDepartment1 has the groups shown in the Groups exhibit. (Click the Groups tab.)\n\n![Exhibit](img/S048-stem-2.png){w=611}\n\nDepartment1 has the user administrator assignments shown in the Assignments exhibit. (Click the Assignments tab.)\n\n![Exhibit](img/S048-stem-3.png){w=611}\n\nThe members of Group2 are shown in the Group2 exhibit. (Click the Group2 tab.)\n\n![Exhibit](img/S048-stem-4.png){w=611}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "Admin1 can reset the passwords of User3 and User4.",
      "Admin1 can add User1 to Group2.",
      "Admin2 can reset the password of User1."
    ],
    "answer": [
      false,
      true,
      true
    ],
    "answer_original": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "O Admin1 é User administrator com escopo na AU, que contém User1, User2, Group1 e Group2. Ele não redefine senha de User3/User4 (membros do Group2, mas fora da AU), mas **gerencia a associação** dos grupos da AU, então pode adicionar User1 ao Group2. O Admin2 tem escopo no diretório inteiro. O dump marcava Não na segunda (a comunidade testou Sim).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/administrative-units"
    ]
  },
  {
    "id": "Q049",
    "src": 49,
    "domain": 2,
    "topic": "MFA — fraud alert",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "FRAUD"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Microsoft 365 tenant.\n\nAll users must use the Microsoft Authenticator app for multi-factor authentication (MFA) when accessing Microsoft 365 services.\n\nSome users report that they received an MFA prompt on their Microsoft Authenticator app without initiating a sign-in request.\n\nYou need to block the users automatically when they report an MFA request that they did not initiate.\n\nSolution: From the Azure portal, you configure the Fraud alert settings for multi- factor authentication (MFA).\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "**Fraud alert** com \"Automatically block users who report fraud = On\" bloqueia automaticamente quem reporta um MFA não iniciado. (Hoje a Microsoft recomenda o recurso Report suspicious activity, que eleva o risco do usuário.)",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings"
    ]
  },
  {
    "id": "Q050",
    "src": 50,
    "domain": 2,
    "topic": "Métodos de autenticação",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nAll users have mobile phones and laptops.\n\nThe users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptop to a wired network that has internet access. You plan to implement multi-factor authentication (MFA).\n\nWhich MFA authentication method can the users use from the remote location?",
    "options": [
      "a notification through the Microsoft Authenticator app",
      "email",
      "security questions",
      "a verification code from the Microsoft Authenticator app"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) deixa como opção o **código de verificação (OATH TOTP)** do Authenticator, que é gerado offline no celular.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-authenticator-app#verification-code-from-mobile-app"
    ]
  },
  {
    "id": "Q051",
    "src": 51,
    "domain": 2,
    "topic": "Conditional Access",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 tenant.\n\nYou create a named location named HighRiskCountries that contains a list of high-risk countries.\n\nYou need to limit the amount of time a user can stay authenticated when connecting from a high-risk country.\n\nWhat should you configure in a conditional access policy? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Configure HighRiskCountries by using:",
        "options": [
          "A cloud app or action",
          "A condition",
          "A grant control",
          "A session control"
        ],
        "answer": 1
      },
      {
        "label": "Configure Sign-in frequency by using:",
        "options": [
          "A cloud app or action",
          "A condition",
          "A grant control",
          "A session control"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O named location entra como **condição** (Locations) da política. A frequência de reautenticação é um **controle de sessão** (Sign-in frequency).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/location-condition",
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-session"
    ]
  },
  {
    "id": "Q052",
    "src": 52,
    "domain": 2,
    "topic": "Smart lockout",
    "type": "hotarea",
    "stem": "A user named User1 attempts to sign in to the tenant by entering the following incorrect passwords:\n\n- Pa55w0rd12\n- Pa55w0rd12\n- Pa55w0rd12\n- Pa55w.rd12\n- Pa55w.rd123\n- Pa55w.rd123\n- Pa55w.rd123\n- Pa55word12\n- Pa55word12\n- Pa55word12\n- Pa55w.rd12\n\nYou need to identify how many sign-in attempts were tracked for User1, and how User1 can unlock her account before the 300-second lockout duration expires.\n\nWhat should identify? To answer, select the appropriate\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Tracked sign-in attempts:",
        "options": [
          "4",
          "5",
          "10",
          "11"
        ],
        "answer": 0
      },
      {
        "label": "Unlock by:",
        "options": [
          "Clearing the browser cache",
          "Signing in by using InPrivate browsing mode",
          "Performing a self-service password reset (SSPR)"
        ],
        "answer": 2
      }
    ],
    "answer_original": [
      3,
      2
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O smart lockout guarda os hashes das **últimas três senhas erradas** e não conta de novo uma senha repetida. Na sequência há quatro senhas erradas distintas (Pa55w0rd12, Pa55w.rd12, Pa55w.rd123, Pa55word12); a última repetição de Pa55w.rd12 ainda está entre as três últimas. Logo, **4** tentativas contadas. Para desbloquear antes do prazo, use o **SSPR**. O dump marcava 11.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-sspr-deployment"
    ]
  },
  {
    "id": "Q053",
    "src": 53,
    "domain": 2,
    "topic": "Conditional Access",
    "type": "hotarea",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that has Security defaults disabled.\n\nYou are creating a conditional access policy as shown in the following exhibit.\n\n![Exhibit](img/S053-stem-1.png){w=611}\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "To ensure that User1 is prompted for multi-factor authentication (MFA) when accessing Cloud apps, you must configure the [answer choice].",
        "options": [
          "Conditions settings",
          "Enable policy setting",
          "Grant settings",
          "Sessions settings",
          "Users and groups setting"
        ],
        "answer": 2
      },
      {
        "label": "To ensure that User1 is prompted for authentication every eight hours, you must configure the [answer choice].",
        "options": [
          "Conditions settings",
          "Enable policy setting",
          "Grant settings",
          "Sessions settings",
          "Users and groups setting"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Exigir MFA é um controle de **concessão** (Grant). Reautenticar a cada 8 horas é um controle de **sessão** (Sign-in frequency).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/howto-conditional-access-policy-all-users-mfa"
    ]
  },
  {
    "id": "Q054",
    "src": 54,
    "domain": 2,
    "topic": "Funções administrativas",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains a user named SecAdmin1. SecAdmin1 is assigned the Security administrator role. SecAdmin1 reports that she cannot reset passwords from the Azure AD Identity Protection portal.\n\nYou need to ensure that SecAdmin1 can manage passwords and invalidate sessions on behalf of non-administrative users. The solution must use the principle of least privilege.\n\nWhich role should you assign to SecAdmin1?",
    "options": [
      "Authentication administrator",
      "Helpdesk administrator",
      "Privileged authentication administrator",
      "Security operator"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O **Helpdesk administrator** redefine senha e invalida refresh tokens de usuários não administradores. O Authentication administrator também redefine senha, mas o menor privilégio que cobre os dois é o Helpdesk.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference"
    ]
  },
  {
    "id": "Q055",
    "src": 55,
    "domain": 2,
    "topic": "Password protection",
    "type": "single",
    "stem": "You configure Azure Active Directory (Azure AD) Password Protection as shown in the exhibit. (Click the Exhibit tab.)\n\n![Exhibit](img/S055-stem-1.png){w=611}\n\nYou are evaluating the following passwords:\n\n- Pr0jectlitw@re\n- T@ilw1nd\n- C0nt0s0\n\nWhich passwords will be blocked?",
    "options": [
      "Pr0jectlitw@re and T@ilw1nd only",
      "C0nt0s0 only",
      "C0nt0s0, Pr0jectlitw@re, and T@ilw1nd",
      "C0nt0s0 and T@ilw1nd only",
      "C0nt0s0 and Pr0jectlitw@re only"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Na avaliação, a senha é normalizada (substituições como 0→o, @→a, 1→i) e cada termo banido encontrado vale 1 ponto, cada caractere restante também; é preciso **5 pontos** para passar. As três ficam abaixo de 5 e são bloqueadas.",
    "refs": [
      "https://blog.enablingtechcorp.com/azure-ad-password-protection-password-evaluation"
    ]
  },
  {
    "id": "Q056",
    "src": 56,
    "domain": 2,
    "topic": "Métodos de autenticação",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nAll users have mobile phones and laptops.\n\nThe users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptop to a wired network that has internet access. You plan to implement multi-factor authentication (MFA).\n\nWhich MFA authentication method can the users use from the remote location?",
    "options": [
      "a verification code from the Microsoft Authenticator app",
      "security questions",
      "voice",
      "SMS"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) deixa como opção o **código de verificação** do Authenticator, gerado offline. Voz e SMS exigem sinal de celular; perguntas de segurança não são MFA.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-methods"
    ]
  },
  {
    "id": "Q057",
    "src": 57,
    "domain": 2,
    "topic": "Security defaults",
    "type": "hotarea",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.\n\n![Exhibit](img/S057-stem-1.png){w=551}\n\nUser2 reports that he can only configure multi-factor authentication (MFA) to use the Microsoft Authenticator app.\n\nYou need to ensure that User2 can configure alternate MFA methods. Which configuration is required, and which user should perform the configuration? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Configuration:",
        "options": [
          "Enable access reviews.",
          "Enable Azure AD Privileged Identity Management (PIM).",
          "Modify security defaults."
        ],
        "answer": 2
      },
      {
        "label": "User:",
        "options": [
          "User1 only",
          "User2 only",
          "User3 only",
          "User1 and User2 only",
          "User1 and User3 only",
          "User2 and User3 only"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Com security defaults ativos, os usuários só podem registrar o Microsoft Authenticator. Para liberar outros métodos, é preciso **desativar os security defaults** (e usar CA/authentication methods), o que pode ser feito pelo **Security administrator** (User1). Privileged authentication administrator gerencia métodos de usuários, não as configurações do tenant.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference"
    ]
  },
  {
    "id": "Q058",
    "src": 58,
    "domain": 2,
    "topic": "SSPR",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant.\n\nYou configure self-service password reset (SSPR) by using the following settings:\n\n- Require users to register when signing in: Yes\n- Number of methods required to reset: 1\n\nWhat is a valid authentication method available to users?",
    "options": [
      "a Microsoft Teams chat",
      "a mobile app notification",
      "a mobile app code",
      "an FIDO2 security token"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Com **um** método exigido para reset, a notificação do app não é permitida; o app só pode ser usado com o **código de verificação**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-sspr-howitworks"
    ]
  },
  {
    "id": "Q059",
    "src": 59,
    "domain": 2,
    "topic": "ID Protection",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that uses Azure AD Identity Protection and contains the resources shown in the following table.\n\n![Exhibit](img/S059-stem-1.png){w=611}\n\nAzure Multi-factor Authentication (MFA) is enabled for all users. User1 triggers a medium severity alert that requires additional investigation. You need to force User1 to reset his password the next time he signs in. The solution must minimize administrative effort.\n\nWhat should you do?",
    "options": [
      "Reconfigure the user risk, policy to trigger on medium or low severity.",
      "Mark User1 as compromised.",
      "Reset the Azure MIFA registration for User1.",
      "Configure a sign-in risk policy."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "**Confirm user compromised** eleva o risco do usuário para alto; com a política de risco de usuário, ele é forçado a trocar a senha no próximo login — sem alterar a política para todos.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-risk-feedback"
    ]
  },
  {
    "id": "Q060",
    "src": 60,
    "domain": 2,
    "topic": "ID Protection",
    "type": "yesno",
    "stem": "You have an Azure Active Directory (Azure AD) tenant: that contains the users shown in the following table.\n\n![Exhibit](img/S060-stem-1.png){w=494}\n\nIn Azure. AD Identity Protection, you configure a user risk policy that has the following settings:\n\n- Assignments:\n- Users: Group1\n- User risk: Low and above\n- Controls:\n- Access: Block access\n- Enforce policy: On\n\nIn Azure AD Identify Protection, you configure a sign-in risk policy that has the following settings:\n\n- Assignments:\n- Users: Group2\n- Sign-in risk: Low and above\n- Controls:\n- Access: Require multi-factor authentication\n- Enforce policy: On\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can sign in from an anonymous IP address.",
      "User2 can sign in from an anonymous IP address.",
      "User3 can sign in from an anonymous IP address."
    ],
    "answer": [
      true,
      false,
      true
    ],
    "answer_original": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "IP anônimo é detecção de **risco de entrada**. User1 só está na política de risco de usuário: entra. User2 cai na política de risco de entrada, que exige MFA, mas não tem MFA registrado: bloqueado. User3 cumpre o MFA, o que remedia o risco de entrada; o dump marca Não, mas a comunidade e a documentação indicam que ele consegue entrar.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-risk-based-sspr-mfa"
    ]
  },
  {
    "id": "Q061",
    "src": 61,
    "domain": 2,
    "topic": "SSPR",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant.\n\nYou configure self-service password reset (SSPR) by using the following settings:\n\n- Require users to register when signing in: Yes\n- Number of methods required to reset: 1\n\nWhat is a valid authentication method available to users?",
    "options": [
      "an email to an address outside your organization",
      "a smartcard",
      "an FID02 security token",
      "a Microsoft Teams chat"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Entre as opções, só o **e-mail alternativo** é método de SSPR. Smartcard, FIDO2 e Teams não servem para redefinir senha.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-sspr-policy#administrator-reset-policy-differences"
    ]
  },
  {
    "id": "Q062",
    "src": 62,
    "domain": 2,
    "topic": "Métodos de autenticação",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.\n\n![Exhibit](img/S062-stem-1.png){w=308}\n\nThe tenant has the authentication methods shown in the following table.\n\n![Exhibit](img/S062-stem-2.png){w=571}\n\nWhich users will sign in to cloud apps by matching a number shown in the app with a number shown on their phone?",
    "options": [
      "User1 only",
      "User2 only",
      "User3 only",
      "User1 and User2 only",
      "User2 and User3 only"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "**Number matching** é exclusivo das notificações do Microsoft Authenticator. Pela tabela de métodos, só o User1 está habilitado para o Authenticator.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-passwordless"
    ]
  },
  {
    "id": "Q063",
    "src": 63,
    "domain": 2,
    "topic": "Conditional Access",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains a user named User1 and the conditional access policies shown in the following table.\n\n![Exhibit](img/S063-stem-1.png){w=611}\n\nYou need to evaluate which policies will be applied to User1 when User1 attempts to sign-in from various IP addresses.\n\nWhich feature should you use?",
    "options": [
      "Access reviews",
      "Identity Secure Score",
      "The What If tool",
      "the Microsoft 365 network connectivity test tool"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O **What If** simula um login (usuário, IP, app, plataforma) e mostra quais políticas se aplicam.",
    "refs": [
      "https://azure.microsoft.com/en-us/updates/azure-ad-conditional-access-what-if-tool-is-now-available"
    ]
  },
  {
    "id": "Q064",
    "src": 64,
    "domain": 2,
    "topic": "Métodos de autenticação",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nAll users have mobile phones and Windows 10 laptops.\n\nThe users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptops to a wired network that has internet access. You plan to implement multi-factor authentication (MFA).\n\nWhich MFA authentication method can the users use from the remote location?",
    "options": [
      "an app password",
      "voice",
      "Windows Hello for Business",
      "security questions"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) deixa o **Windows Hello for Business**. App passwords são legadas e não são MFA; voz exige celular.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-authenticator-app#verification-code-from-mobile-app"
    ]
  },
  {
    "id": "Q065",
    "src": 65,
    "domain": 2,
    "topic": "Conditional Access",
    "type": "single",
    "stem": "You create a conditional access policy that blocks access when a user triggers a high-severity sign-in alert.\n\nYou need to test the policy under the following conditions:\n\n- A user signs in from another country.\n- A user triggers a sign-in risk.\n\nWhat should you use to complete the test?",
    "options": [
      "the Conditional Access What If tool",
      "sign-ins logs in Azure Active Directory (Azure AD)",
      "the activity logs in Microsoft Defender for Cloud Apps",
      "access reviews in Azure Active Directory (Azure AD)"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "O **What If** permite simular país/IP e nível de risco de entrada para testar a política sem logins reais.",
    "refs": [
      "https://azure.microsoft.com/en-us/updates/azure-ad-conditional-access-what-if-tool-is-now-available"
    ]
  },
  {
    "id": "Q066",
    "src": 66,
    "domain": 2,
    "topic": "Localizações e trusted IPs",
    "type": "yesno",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.\n\n![Exhibit](img/S066-stem-1.png){w=611}\n\nYou have the locations shown in the following table.\n\n![Exhibit](img/S066-stem-2.png){w=611}\n\nThe tenant contains a named location that has the following configurations:\n\n- Name: Location1\n- Mark as trusted location: Enabled\n\nIPv4 range: 10.10.0.0/16 -\n\nMFA has a trusted IP address range of 193.17.17.0/24.\n\n- Name: CAPolicy1\n- Assignments\n- Users or workload identities: Group1\n- Cloud apps or actions: All cloud apps\n- Conditions\n- Locations: All trusted locations\n- Access controls\n- Grant\n- Grant access: Require multi-factor authentication\n- Session: 0 controls selected\n- Enable policy: On\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "If User1 connects to the tenant from IP address 10.10.0.150, the user will be prompted for MFA.",
      "If User2 connects to the tenant from IP address 10.10.1.160, the user will be prompted for MFA.",
      "If User2 connects to the tenant from IP address 192.168.1.20, the user will be prompted for MFA."
    ],
    "answer": [
      false,
      true,
      false
    ],
    "answer_original": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O Entra vê o IP **público** (NAT). A named location 10.10.0.0/16 (privada) nunca corresponde, e o tráfego da Location1 sai por 20.93.15.0/24, que não é confiável. Os **trusted IPs do MFA** (193.17.17.0/24, NAT da Location2) entram em \"All trusted locations\" e dispensam o MFA por usuário. User1: a CA não se aplica (nenhuma localização confiável) e o MFA por usuário está desabilitado → **Não**. User2 vindo da Location1: MFA por usuário imposto e o IP não é confiável → **Sim**. User2 vindo da Location2: IP confiável dispensa o MFA → **Não**. O dump marca Não/Não/Sim.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings"
    ]
  },
  {
    "id": "Q067",
    "src": 67,
    "domain": 1,
    "topic": "Email one-time passcode",
    "type": "hotarea",
    "stem": "You have an Azure Active Directory (Azure AD) tenant named contoso.com that has Email one-time passcode for guests set to Yes.\n\nYou invite the guest users shown in the following table.\n\n![Exhibit](img/S067-stem-1.png){w=611}\n\nWhich users will receive a one-time passcode, and how long will the passcode be valid? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Users:",
        "options": [
          "Guest1 only",
          "Guest2 only",
          "Guest3 only",
          "Guest1 and Guest2 only",
          "Guest2 and Guest3 only",
          "Guest1, Guest2, and Guest3"
        ],
        "answer": 2
      },
      {
        "label": "Valid for:",
        "options": [
          "30 minutes",
          "60 minutes",
          "24 hours",
          "48 hours"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "OTP é usado por convidados sem conta Entra, sem Microsoft account e sem federação configurada. Guest1 (conta Entra) e Guest2 (MSA) não recebem; Guest3 (Google pessoal, sem federação com Google) recebe. O código vale **30 minutos**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/one-time-passcode"
    ]
  },
  {
    "id": "Q068",
    "src": 68,
    "domain": 4,
    "topic": "Access reviews — funções",
    "type": "match",
    "stem": "You have a Microsoft 365 E5 subscription that contains two users named User1 and User2.\n\nYou need to ensure that User1 can create access reviews for groups, and that User2 can review the history report for all the completed access reviews. The solution must use the principle of least privilege.\n\nWhich role should you assign to each user? To answer, drag the appropriate roles to the correct users. Each role may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "Global administrator",
      "Global reader",
      "Reports reader",
      "Security operator",
      "Security reader",
      "User administrator"
    ],
    "targets": [
      {
        "label": "User1:",
        "answer": 5
      },
      {
        "label": "User2:",
        "answer": 4
      }
    ],
    "answer_original": [
      0,
      1
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Criar access reviews de grupos com menor privilégio (entre as opções): **User administrator**. Ver os relatórios de histórico de todas as revisões: **Security reader** (leitura). O dump marcava Global administrator e Global reader; Global administrator não é menor privilégio."
  },
  {
    "id": "Q069",
    "src": 69,
    "domain": 3,
    "topic": "Azure RBAC — funções personalizadas",
    "type": "hotarea",
    "stem": "You have an Azure subscription.\n\nYou need to create two custom roles named Role1 and Role2. The solution must meet the following requirements:\n\n- Users that are assigned Role1 can create or delete instances of Azure Container Apps.\n- Users that are assigned Role2 can enforce adaptive network hardening rules. Which resource provider permissions are required for each role? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Role1:",
        "options": [
          "Microsoft.App",
          "Microsoft.Compute",
          "Microsoft.Management",
          "Microsoft.Security"
        ],
        "answer": 0
      },
      {
        "label": "Role2:",
        "options": [
          "Microsoft.App",
          "Microsoft.Compute",
          "Microsoft.Network",
          "Microsoft.Security"
        ],
        "answer": 3
      }
    ],
    "answer_original": [
      1,
      3
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Azure Container Apps fica no provedor **Microsoft.App**. Adaptive network hardening é recurso do Defender for Cloud, no provedor **Microsoft.Security**. O dump marcava Microsoft.Compute para a Role1."
  },
  {
    "id": "Q070",
    "src": 70,
    "domain": 1,
    "topic": "Unidades administrativas",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 tenant that has 5,000 users. One hundred of the users are executives. The executives have a dedicated support team.\n\nYou need to ensure that the support team can reset passwords and manage multi-factor authentication (MFA) settings for only the executives. The solution must use the principle of least privilege.\n\nWhich object type and Azure Active Directory (Azure AD) role should you use? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Object type:",
        "options": [
          "An administrative unit",
          "A custom administrator role",
          "A dynamic group",
          "A Microsoft 365 group"
        ],
        "answer": 0
      },
      {
        "label": "Role:",
        "options": [
          "Authentication administrator",
          "Groups administrator",
          "Helpdesk administrator",
          "Password administrator"
        ],
        "answer": 0
      }
    ],
    "answer_original": [
      1,
      2
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Limitar o escopo aos 100 executivos: uma **unidade administrativa**. Redefinir senha **e** gerenciar métodos de MFA de não administradores é o **Authentication administrator**; o Helpdesk administrator não gerencia métodos de autenticação. O dump marcava função personalizada + Helpdesk administrator."
  },
  {
    "id": "Q071",
    "src": 71,
    "domain": 1,
    "topic": "Unidades administrativas",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.\n\n![Exhibit](img/S071-stem-1.png){w=408}\n\nYou have an administrative unit named Au1. Group1, User2, and User3 are members of Au1.\n\nUser5 is assigned the User administrator role for Au1.\n\nFor which users can User5 reset passwords?",
    "options": [
      "User1, User2, and User3",
      "User1 and User2 only",
      "User3 and User4 only",
      "User2 and User3 only"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Um grupo dentro de uma AU coloca o **grupo** no escopo, não seus membros. User5 (User administrator da Au1) só gerencia os usuários adicionados diretamente: User2 e User3."
  },
  {
    "id": "Q072",
    "src": 72,
    "domain": 1,
    "topic": "Grupos dinâmicos",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.\n\n![Exhibit](img/S072-stem-1.png){w=602}\n\nYou create a dynamic user group and configure the following rule syntax. user.usageLocation -in [\"US\",\"AU\"] -and (user.department -eq \"Sales\") -and -not (user.jobTitle -eq \"Manager\") -or (user. jobTitle -eq \"SalesRep\") Which users will be added to the group?",
    "options": [
      "User1 only",
      "User2 only",
      "User3 only",
      "User1 and User2 only",
      "User1 and User3 only",
      "User1, User2, and User3"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "-and tem precedência sobre -or. A regra vira (local US/AU **e** Sales **e** não Manager) **ou** (jobTitle SalesRep). Pela tabela, isso resulta em User1 e User2."
  },
  {
    "id": "Q073",
    "src": 73,
    "domain": 1,
    "topic": "Funções administrativas",
    "type": "single",
    "stem": "You have an Azure AD tenant that contains a user named User1.\n\nUser1 needs to manage license assignments and reset user passwords. Which role should you assign to User1?",
    "options": [
      "Helpdesk administrator",
      "Billing administrator",
      "License administrator",
      "User administrator"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Entre as opções, só o **User administrator** gerencia atribuição de licenças **e** redefine senhas. (Helpdesk + License administrator seria mais restrito, mas não é uma opção única.)"
  },
  {
    "id": "Q074",
    "src": 74,
    "domain": 1,
    "topic": "Licenciamento",
    "type": "single",
    "stem": "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.\n\nFrom the Groups blade in the Azure Active Directory admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users. You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.\n\nWhat should you use?",
    "options": [
      "the Set-MsolUserLicense cmdlet",
      "the Set-AzureADGroup cmdlet",
      "the Set-WindowsProductKey cmdlet",
      "the Administrative units blade in the Azure Active Directory admin center"
    ],
    "answer": 0,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Pelo gabarito, **Set-MsolUserLicense** remove a licença E3 atribuída diretamente. MSOnline foi aposentado (hoje: Set-MgUserLicense ou o blade Licenses) — questão borderline."
  },
  {
    "id": "Q075",
    "src": 75,
    "domain": 1,
    "topic": "Licenciamento",
    "type": "single",
    "stem": "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.\n\nFrom the Groups blade in the Azure Active Directory admin center, you assign Microsoft 365 Enterprise E5 licenses to a group that includes all the users. You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.\n\nWhat should you use?",
    "options": [
      "the Set-AzureADGroup cmdlet",
      "the Identity Governance blade in the Azure Active Directory admin center",
      "the Set-WindowsProductKey cmdlet",
      "the Set-MsolUserLicense cmdlet"
    ],
    "answer": 3,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Pelo gabarito, **Set-MsolUserLicense**. MSOnline foi aposentado (hoje: Set-MgUserLicense ou o blade Licenses) — questão borderline."
  },
  {
    "id": "Q076",
    "src": 76,
    "domain": 1,
    "topic": "Autenticação híbrida",
    "type": "hotarea",
    "stem": "Your on-premises network contains an Active Directory domain that uses Azure AD Connect to sync with an Azure AD tenant.\n\nYou need to configure Azure AD Connect to meet the following requirements:\n\n- User sign-ins to Azure AD must be authenticated by an Active Directory domain controller.\n- Active Directory domain users must be able to use Azure AD self-service password reset (SSPR).\n\nWhat should you use for each requirement? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Authentication by the domain controller:",
        "options": [
          "Federation with Active Directory Federation Services (AD FS)",
          "Pass-through authentication",
          "Password hash synchronization"
        ],
        "answer": 1
      },
      {
        "label": "SSPR:",
        "options": [
          "Device writeback",
          "Group writeback",
          "Password hash synchronization",
          "Password writeback"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Autenticação validada pelo DC on-premises = **pass-through authentication**. Para SSPR de usuários do AD, a nova senha precisa voltar ao AD: **password writeback**."
  },
  {
    "id": "Q077",
    "src": 77,
    "domain": 2,
    "topic": "Conditional Access",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nYou currently allow email clients that use Basic authentication to connect to Microsoft Exchange Online.\n\nYou need to ensure that users can connect to Exchange only from email clients that use Modern authentication protocols.\n\nWhat should you implement?",
    "options": [
      "an OAuth policy in Microsoft Defender for Cloud Apps",
      "a conditional access policy in Azure Active Directory (Azure AD)",
      "a compliance policy in Microsoft Endpoint Manager",
      "an application control profile in Microsoft Endpoint Manager"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Bloquear autenticação básica no Exchange Online é feito com **Conditional Access** (condição Client apps = legacy, ação Block)."
  },
  {
    "id": "Q078",
    "src": 78,
    "domain": 3,
    "topic": "Managed identities",
    "type": "single",
    "stem": "You have an Azure subscription that contains an Azure SQL database named db1.\n\nYou deploy an Azure App Service web app named App1 that provides product information to users that connect to App1 anonymously.\n\nYou need to provide App1 with access to db1. The solution must meet the following requirements:\n\n- Credentials must only be available to App1.\n- Administrative effort must be minimized.\n\nWhich type of credentials should you use?",
    "options": [
      "a system-assigned managed identity",
      "an Azure Active Directory (Azure AD) user account",
      "a SQL Server account",
      "a user-assigned managed identity"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Credencial que pertence só ao App1 e não exige gestão de segredo: **system-assigned managed identity** (ciclo de vida atrelado ao recurso)."
  },
  {
    "id": "Q079",
    "src": 79,
    "domain": 3,
    "topic": "Azure RBAC",
    "type": "single",
    "stem": "You have an Azure subscription that contains the custom roles shown in the following table.\n\n![Exhibit](img/S079-stem-1.png){w=478}\n\nYou need to create a custom Azure subscription role named Role3 by using the Azure portal. Role3 will use the baseline permissions of an existing role. Which roles can you clone to create Role3?",
    "options": [
      "Role2 only",
      "built-in Azure subscription roles only",
      "built-in Azure subscription roles and Role2 only",
      "built-in Azure subscription roles and built-in Azure AD roles only",
      "Role1, Role2, built-in Azure subscription roles, and built-in Azure AD roles"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "No portal, clonar para uma **função personalizada do Azure** permite partir de funções **built-in do Azure** ou de **funções customizadas do Azure** da assinatura (Role2). Funções do Entra ID (Role1, se for de diretório) não servem de base para RBAC do Azure."
  },
  {
    "id": "Q080",
    "src": 80,
    "domain": 2,
    "topic": "Métodos de autenticação",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nAll users have mobile phones and Windows 10 laptops.\n\nThe users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptops to a wired network that has internet access. You plan to implement multi-factor authentication (MFA).\n\nWhich MFA authentication method can the users use from the remote location?",
    "options": [
      "Windows Hello for Business",
      "an app password",
      "security questions",
      "email"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) deixa o **Windows Hello for Business**."
  },
  {
    "id": "Q081",
    "src": 81,
    "domain": 2,
    "topic": "Métodos de autenticação",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nAll users have mobile phones and Windows 10 laptops.\n\nThe users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptops to a wired network that has internet access. You plan to implement multi-factor authentication (MFA).\n\nWhich MFA authentication method can the users use from the remote location?",
    "options": [
      "voice",
      "Windows Hello for Business",
      "email",
      "security questions"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) deixa o **Windows Hello for Business**, que é considerado MFA (dispositivo + PIN/biometria)."
  },
  {
    "id": "Q082",
    "src": 82,
    "domain": 3,
    "topic": "Managed identities",
    "type": "yesno",
    "stem": "You have an Azure subscription that contains the following virtual machine:\n\n- Name: V1\n- Azure region: East US\n- System-assigned managed identity: Disabled\n\nYou create the managed identities shown in the following table.\n\n![Exhibit](img/S082-stem-1.png){w=356}\n\nYou perform the following actions:\n\n- Assign Managed1 to V1.\n- Create a resource group named RG1 in the West US region.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "You can assign Managed2 to V1.",
      "You can assign Managed3 to V1.",
      "You can assign VM1 the Owner role for RG1."
    ],
    "answer": [
      true,
      true,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Managed identities atribuídas pelo usuário podem ser usadas por recursos de **qualquer região** (Managed2 e Managed3). O V1 não tem identidade atribuída pelo sistema para receber a função de Owner como \"VM1\"."
  },
  {
    "id": "Q083",
    "src": 83,
    "domain": 3,
    "topic": "Key Vault — soft delete e purge",
    "type": "yesno",
    "stem": "You have an Azure subscription that contains the key vaults shown in the following table.\n\n![Exhibit](img/S083-stem-1.png){w=611}\n\nThe subscription contains the users shown in the following table.\n\n![Exhibit](img/S083-stem-2.png){w=500}\n\nOn June 1, Admin4 performs the following actions:\n\n- Deletes a certificate named Certificate1 from KeyVault1\n- Deletes a secret named Secret1 from KeyVault2\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "Admin1 can recover Secret1 on June 7.",
      "Admin2 can purge Certificate1 on June 12.",
      "Admin3 can purge Certificate1 on June 14."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O Secret1 está em soft delete (retenção de 10 dias), e o Key Vault Administrator pode recuperá-lo no dia 7. O Certificate1 está no KeyVault1, com **purge protection**: não pode ser expurgado antes de terminar a retenção de 15 dias (16 de junho), por ninguém."
  },
  {
    "id": "Q084",
    "src": 84,
    "domain": 2,
    "topic": "ID Protection",
    "type": "single",
    "stem": "You have an Azure AD tenant.\n\nYou open the risk detections report.\n\nWhich risk detection type is classified as a user risk?",
    "options": [
      "password spray",
      "anonymous IP address",
      "unfamiliar sign-in properties",
      "Azure AD threat intelligence"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Detecções de **risco de usuário** incluem leaked credentials e **Microsoft Entra threat intelligence** (atividade incomum para o usuário). Password spray, IP anônimo e propriedades de entrada desconhecidas são de risco de entrada."
  },
  {
    "id": "Q085",
    "src": 85,
    "domain": 2,
    "topic": "SSPR",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant.\n\nYou configure self-service password reset (SSPR) by using the following settings:\n\n- Require users to register when signing in: Yes\n- Number of methods required to reset: 1\n\nWhat is a valid authentication method available to users?",
    "options": [
      "a smartcard",
      "a mobile app code",
      "a mobile app notification",
      "an email to an address outside your organization"
    ],
    "answer": 1,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Com um método exigido, o app só pode ser usado via **código**. Atenção: e-mail alternativo também é um método válido para um único método — a questão tem duas opções corretas; o dump marca o código do app."
  },
  {
    "id": "Q086",
    "src": 86,
    "domain": 2,
    "topic": "ID Protection",
    "type": "single",
    "stem": "You create a new Microsoft 365 E5 tenant.\n\nYou need to ensure that when users connect to the Microsoft 365 portal from an anonymous IP address, they are prompted to use multi-factor authentication (MFA).\n\nWhat should you configure?",
    "options": [
      "a sign-in risk policy",
      "a user risk policy",
      "an MFA registration policy"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "IP anônimo é detecção de **risco de entrada**: use política de **sign-in risk** (hoje recomendada como Conditional Access baseada em risco de entrada) exigindo MFA."
  },
  {
    "id": "Q087",
    "src": 87,
    "domain": 4,
    "topic": "PIM e Conditional Access",
    "type": "yesno",
    "stem": "You have a Microsoft 365 tenant.\n\nYou configure a conditional access policy as shown in the Conditional Access policy exhibit. (Click the Conditional Access policy tab.)\n\n![Exhibit](img/S087-stem-1.png){w=611}\n\nYou view the User administrator role settings as shown in the Role setting details exhibit. (Click the Role setting details tab.)\n\n![Exhibit](img/S087-stem-2.png){w=611}\n\nYou view the User administrator role assignments as shown in the Role assignments exhibit. (Click the Role assignments tab.)\n\n![Exhibit](img/S087-stem-3.png){w=611}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "Before Admin1 can perform a task that requires the User administrator role, an approver must approve the activation request.",
      "Admin2 can request activation of the User administrator role for a period of two hours.",
      "If Admin3 connects to the Azure Active Directory admin center, and then activates the User administrator role, Admin3 will be prompted to authenticate by using multi-factor authentication (MFA) twice."
    ],
    "answer": [
      true,
      true,
      false
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Pelas configurações da função no PIM (aprovação exigida, duração máxima e MFA na ativação) e pelas atribuições do exemplo, o dump marca Sim/Sim/Não. Para Admin3, a comunidade debate se o MFA é pedido duas vezes (no login pela CA e na ativação). Confira os exhibits e a discussão."
  },
  {
    "id": "Q088",
    "src": 88,
    "domain": 2,
    "topic": "ID Protection",
    "type": "yesno",
    "stem": "You have an Azure AD tenant that contains the users shown in the following table.\n\n![Exhibit](img/S088-stem-1.png){w=248}\n\nYou have the Azure AD Identity Protection policies shown in the following table.\n\n![Exhibit](img/S088-stem-2.png){w=611}\n\nYou review the Risky users report and the Risky sign-ins report and perform actions for each user as shown in the following table.\n\n![Exhibit](img/S088-stem-3.png){w=347}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can sign in by using multi-factor authentication (MFA).",
      "User2 can sign in by using multi-factor authentication (MFA).",
      "User3 can sign in from an anonymous IP address."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "answer_original": [
      true,
      true,
      false
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "**Confirm user compromised** eleva o risco do usuário para **alto**. Com a política de risco de usuário bloqueando a partir de Low, User1 e User2 ficam bloqueados (MFA não remedia um bloqueio). User3 teve o risco **descartado**; IP anônimo normalmente gera risco de entrada médio, e a política de entrada só bloqueia High, então User3 entra. O dump marcava Sim/Sim/Não."
  },
  {
    "id": "Q089",
    "src": 89,
    "domain": 3,
    "topic": "Funções de aplicativos",
    "type": "single",
    "stem": "You have an Azure subscription that contains a user named User1. You need to meet the following requirements:\n\n- Prevent User1 from being added as an owner of newly registered apps.\n- Ensure that User1 can manage the application proxy settings.\n- Ensure that User1 can register apps.\n- Use the principle of least privilege.\n\nWhich role should you assign to User1?",
    "options": [
      "Application developer",
      "Cloud application administrator",
      "Service support administrator",
      "Application administrator"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O **Application administrator** gerencia registros, apps empresariais e configurações do Application Proxy, e não vira owner dos apps que cria. Cloud application administrator não gerencia Application Proxy; Application developer vira owner."
  },
  {
    "id": "Q090",
    "src": 90,
    "domain": 3,
    "topic": "Azure RBAC em VMs",
    "type": "match",
    "stem": "You have a Microsoft 365 E5 subscription and an Azure subscription. You need to meet the following requirements:\n\n- Ensure that users can sign in to Azure virtual machines by using their Microsoft 365 credentials.\n- Delegate the ability to create new virtual machines.\n\nWhat should you use for each requirement? To answer, drag the appropriate features to the correct requirements. Each feature may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "Azure AD built-in roles",
      "Azure AD managed identities",
      "Azure role-based access control (Azure RBAC)"
    ],
    "targets": [
      {
        "label": "Ensure that users can sign in to Azure virtual machines by using their Microsoft 365 credentials:",
        "answer": 2
      },
      {
        "label": "Delegate the ability to create new virtual machines:",
        "answer": 2
      }
    ],
    "answer_original": [
      2,
      0
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "As duas são funções do **Azure RBAC**: login nas VMs com conta Entra (Virtual Machine User/Administrator Login) e criação de VMs (Virtual Machine Contributor). Funções do Entra ID não dão permissão sobre recursos do Azure. O dump marcava \"Azure AD built-in roles\" para a segunda."
  },
  {
    "id": "Q091",
    "src": 91,
    "domain": 1,
    "topic": "Licenciamento",
    "type": "single",
    "stem": "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.\n\nFrom the Groups blade in the Azure Active Directory admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users. You needed to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.\n\nWhat should you use?",
    "options": [
      "the Groups blade in the Azure Active Directory admin center",
      "the Set-AzureADGroup cmdlet",
      "the Identity Governance blade in the Azure Active Directory admin center",
      "the Set-MsolUserLicense cmdlet"
    ],
    "answer": 3,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Pelo gabarito, **Set-MsolUserLicense**. MSOnline foi aposentado — questão borderline."
  },
  {
    "id": "Q093",
    "src": 93,
    "domain": 4,
    "topic": "Identity Secure Score",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "SECSCORE"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Microsoft 365 E5 subscription.\n\nYou create a user named User1.\n\nYou need to ensure that User1 can update the status of Identity Secure Score improvement actions.\n\nSolution: You assign the Exchange Administrator role to User1. Does this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Para alterar o status das ações de melhoria do Identity Secure Score, é preciso papel com leitura e gravação: Global, Security, **Exchange** ou SharePoint administrator."
  },
  {
    "id": "Q094",
    "src": 94,
    "domain": 4,
    "topic": "Identity Secure Score",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "SECSCORE"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Microsoft 365 E5 subscription.\n\nYou create a user named User1.\n\nYou need to ensure that User1 can update the status of Identity Secure Score improvement actions.\n\nSolution: You assign the User Administrator role to User1.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "**User administrator** não está entre os papéis com escrita no Identity Secure Score (Global, Security, Exchange, SharePoint administrator)."
  },
  {
    "id": "Q095",
    "src": 95,
    "domain": 2,
    "topic": "Métodos de autenticação",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nAll users have mobile phones and Windows 10 laptops.\n\nThe users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptops to a wired network that has internet access. You plan to implement multi-factor authentication (MFA).\n\nWhich MFA authentication method can the users use from the remote location?",
    "options": [
      "a notification through the Microsoft Authenticator app",
      "SMS",
      "email",
      "Windows Hello for Business"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) deixa o **Windows Hello for Business**."
  },
  {
    "id": "Q096",
    "src": 96,
    "domain": 4,
    "topic": "Contas de emergência",
    "type": "hotarea",
    "stem": "Your network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs with an Azure AD tenant. The AD DS domain contains the organizational units (OUs) shown in the following table.\n\n![Exhibit](img/S096-stem-1.png){w=608}\n\nYou need to create a break-glass account named BreakGlass.\n\nWhere should you create BreakGlass, and which role should you assign to BreakGlass? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Location:",
        "options": [
          "Azure AD",
          "OU1",
          "OU2"
        ],
        "answer": 0
      },
      {
        "label": "Role:",
        "options": [
          "Billing Administrator",
          "Global Administrator",
          "Owner",
          "Privileged Role Administrator"
        ],
        "answer": 1
      }
    ],
    "answer_original": [
      1,
      1
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Contas de emergência (break-glass) devem ser **somente nuvem** (criadas direto no Entra ID, não sincronizadas), para funcionar mesmo com falha do ambiente on-premises, e ter **Global Administrator** permanente. O dump marcava OU1 (sincronizada)."
  },
  {
    "id": "Q097",
    "src": 97,
    "domain": 4,
    "topic": "Entitlement management",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains a Microsoft SharePoint Online site named Site1.\n\nYou need to ensure that users can request access to Site1. The solution must meet the following requirements:\n\n- Automatically approve requests from users based on their group membership.\n- Automatically remove the access after 30 days.\n\nWhat should you do?",
    "options": [
      "Create a Conditional Access policy.",
      "Create an access package.",
      "Configure Role settings in Azure AD Privileged Identity Management.",
      "Create a Microsoft Defender for Cloud Apps access policy."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "**Access package** com política de solicitação: aprovação automática para membros de um grupo e expiração da atribuição em 30 dias."
  },
  {
    "id": "Q098",
    "src": 98,
    "domain": 3,
    "topic": "Azure RBAC — funções personalizadas",
    "type": "hotarea",
    "stem": "You have an Azure subscription.\n\nYou need to create two custom roles named Role1 and Role2. The solution must meet the following requirements:\n\n- Users that are assigned Role1 can manage application security groups.\n- Users that are assigned Role2 can manage Azure Firewall.\n\nWhich resource provider permissions are required for each role? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Role1:",
        "options": [
          "Microsoft.App",
          "Microsoft.Compute",
          "Microsoft.Network",
          "Microsoft.Security"
        ],
        "answer": 2
      },
      {
        "label": "Role2:",
        "options": [
          "Microsoft.App",
          "Microsoft.Management",
          "Microsoft.Network",
          "Microsoft.Security"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Application security groups e Azure Firewall são recursos do provedor **Microsoft.Network**."
  },
  {
    "id": "Q099",
    "src": 99,
    "domain": 2,
    "topic": "Métodos de autenticação",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nAll users have mobile phones and Windows 10 laptops.\n\nThe users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptop to a wired network that has internet access. You plan to implement multi-factor authentication (MFA).\n\nWhich MFA authentication method can the users use from the remote location?",
    "options": [
      "voice",
      "an app password",
      "security questions",
      "a verification code from the Microsoft Authenticator app"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) deixa o **código de verificação** do Authenticator, gerado offline."
  },
  {
    "id": "Q100",
    "src": 100,
    "domain": 2,
    "topic": "Conditional Access App Control",
    "type": "order",
    "stem": "You have a Microsoft 365 E5 tenant.\n\nYou purchase a cloud app named App1.\n\nYou need to enable real-time session-level monitoring of App1 by using Microsoft Defender for Cloud Apps.\n\nIn which order should you perform the actions? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
    "pool": [
      "Publish App1 in Azure AD.",
      "Create a conditional access policy that has session controls configured.",
      "From Microsoft Defender for Cloud Apps, create a session policy.",
      "From Microsoft Defender for Cloud Apps, modify the Connected apps settings for App1."
    ],
    "answer": [
      0,
      1,
      3,
      2
    ],
    "answer_original": [
      0,
      3,
      2,
      1
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Sequência: publicar (registrar) o App1 no Entra ID, criar a **política de CA** com o controle de sessão *Use Conditional Access App Control*, entrar no app para que ele apareça em **Connected apps** no Defender for Cloud Apps e, por fim, criar a **session policy**. O dump invertia a ordem da política de CA."
  },
  {
    "id": "Q101",
    "src": 101,
    "domain": 1,
    "topic": "Unidades administrativas",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO_A"
    },
    "stem": "You need to meet the technical requirements for license management by the help desk administrators.\n\nWhat should you create first, and which tool should you use? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Object to create for each branch office:",
        "options": [
          "An administrative unit",
          "A custom role",
          "A Dynamic User security group",
          "An OU"
        ],
        "answer": 0
      },
      {
        "label": "Tool to use:",
        "options": [
          "Azure Active Directory admin center",
          "Active Directory Administrative Center",
          "Active Directory module for Windows PowerShell",
          "Microsoft Purview Compliance portal"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Para que cada helpdesk gerencie licenças só dos usuários do seu escritório: uma **unidade administrativa** por filial (com o escopo da função), criada no **Microsoft Entra admin center**."
  },
  {
    "id": "Q102",
    "src": 102,
    "domain": 1,
    "topic": "Configurações de dispositivo",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "LITWARE"
    },
    "stem": "You need to resolve the issue of the sales department users.\n\nWhat should you configure for the Azure AD tenant?",
    "options": [
      "the Device settings",
      "the User settings",
      "the Access reviews settings",
      "Security defaults"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "O limite de dispositivos por usuário é ajustado em **Device settings** (Maximum number of devices per user)."
  },
  {
    "id": "Q103",
    "src": 103,
    "domain": 1,
    "topic": "Grupos atribuíveis a funções",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "LITWARE"
    },
    "stem": "You need to resolve the issue of IT_Group1.\n\nWhat should you do first?",
    "options": [
      "Change Membership type of IT_Group1 to Dynamic User.",
      "Recreate the IT_Group1 group.",
      "Change Membership type of IT Group1 to Dynamic Device.",
      "Add an owner to IT_Group1."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Só grupos criados com **isAssignableToRole = true** aparecem para atribuição de funções do Entra, e essa propriedade não pode ser alterada depois: é preciso **recriar** o grupo."
  },
  {
    "id": "Q104",
    "src": 104,
    "domain": 1,
    "topic": "Entra Cloud Sync",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "LITWARE"
    },
    "stem": "You need to implement the planned changes for litware.com.\n\nWhat should you configure?",
    "options": [
      "Azure AD Connect cloud sync between the Azure AD tenant and litware.com",
      "Azure AD Connect to include the litware.com domain",
      "staging mode in Azure AD Connect for the litware.com domain"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Para sincronizar uma floresta desconectada (sem trust) com o mesmo tenant, use **Entra Cloud Sync** com um agente em litware.com."
  },
  {
    "id": "Q105",
    "src": 105,
    "domain": 2,
    "topic": "SSPR para administradores",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "LITWARE"
    },
    "stem": "You implement the planned changes for SSPR.\n\nWhat occurs when User3 attempts to use SSPR? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Number of authentication methods required:",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "answer": 1
      },
      {
        "label": "Authentication methods that can be used:",
        "options": [
          "Microsoft Authenticator only",
          "Security questions only",
          "Email and phone only",
          "Phone and Microsoft Authenticator only",
          "Email, phone, and Microsoft Authenticator only",
          "Email, phone, Microsoft Authenticator, and security questions"
        ],
        "answer": 4
      }
    ],
    "answer_original": [
      0,
      5
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "User3 tem a função User administrator. Administradores usam sempre a política forte de **dois métodos**, sem perguntas de segurança, independentemente da configuração de SSPR. Os métodos ficam entre e-mail, telefone e Microsoft Authenticator. O dump marcava 1 método e todos os quatro."
  },
  {
    "id": "Q106",
    "src": 106,
    "domain": 2,
    "topic": "Registro de MFA",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "LITWARE"
    },
    "stem": "You need to support the planned changes and meet the technical requirements for MFA.\n\nWhich feature should you use, and how long before the users must complete the registration? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Feature:",
        "options": [
          "An authentication method policy",
          "A Conditional Access policy",
          "An MFA registration policy",
          "The Multi-Factor Authentication Server settings"
        ],
        "answer": 2
      },
      {
        "label": "Grace period:",
        "options": [
          "7 days",
          "14 days",
          "28 days"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "\"Pedir o registro de MFA com opção de adiar\" é a **MFA registration policy** do ID Protection, que dá **14 dias** para o usuário pular o registro. Hoje a alternativa recomendada são as registration campaigns."
  },
  {
    "id": "Q107",
    "src": 107,
    "domain": 2,
    "topic": "ID Protection",
    "type": "match",
    "group": {
      "kind": "case",
      "id": "LITWARE"
    },
    "stem": "You need to resolve the recent security incident issues.\n\nWhat should you configure for each incident? To answer, drag the appropriate policy types to the correct issues. Each policy type may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "An authentication method policy",
      "A Conditional Access policy",
      "A sign-in risk policy",
      "A user risk policy"
    ],
    "targets": [
      {
        "label": "Leaked credentials:",
        "answer": 3
      },
      {
        "label": "A sign-in from a suspicious browser:",
        "answer": 2
      },
      {
        "label": "Resources accessed from an anonymous IP address:",
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "**Leaked credentials** é uma detecção de risco de **usuário** (user risk policy). Navegador suspeito e IP anônimo são detecções de risco de **entrada** (sign-in risk policy). Hoje a Microsoft recomenda configurar as duas como políticas de Conditional Access baseadas em risco."
  },
  {
    "id": "Q108",
    "src": 108,
    "domain": 3,
    "topic": "Azure RBAC",
    "type": "single",
    "stem": "You have the Azure resources shown in the following table.\n\n![Exhibit](img/S108-stem-1.png){w=611}\n\nTo which identities can you assign the Contributor role for RG1?",
    "options": [
      "User1 only",
      "User1 and Group1 only",
      "User1 and VM1 only",
      "User1, VM1, and App1 only",
      "User1, Group1, VM1, and App1"
    ],
    "answer": 4,
    "scope": "in",
    "review": "ok",
    "explanation": "Funções do **Azure RBAC** podem ser atribuídas a usuários, grupos (inclusive dinâmicos), managed identities (VM1) e service principals (App1). A restrição de grupos dinâmicos vale para funções do **Entra ID**, não do Azure."
  },
  {
    "id": "Q109",
    "src": 109,
    "domain": 1,
    "topic": "Colaboração externa",
    "type": "hotarea",
    "stem": "You have an Azure AD tenant that contains a user named User1. User1 is assigned the User Administrator role.\n\nYou need to configure External collaboration settings for the tenant to meet the following requirements:\n\n- Guest users must be prevented from querying staff email addresses.\n- Guest users must be able to access the tenant only if they are invited by User1. Which three settings should you configure? To answer, select the appropriate settings in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Guest user access restrictions:",
        "options": [
          "Guest users have the same access as members (most inclusive)",
          "Guest users have limited access to properties and memberships of directory objects",
          "Guest user access is restricted to properties and memberships of their own directory objects (most restrictive)"
        ],
        "answer": 2
      },
      {
        "label": "Guest invite restrictions:",
        "options": [
          "Anyone in the organization can invite guest users including guests and non-admins (most inclusive)",
          "Member users and users assigned to specific admin roles can invite guest users including guests with member permissions",
          "Only users assigned to specific admin roles can invite guest users",
          "No one in the organization can invite guest users including admins (most restrictive)"
        ],
        "answer": 2
      },
      {
        "label": "Enable guest self-service sign up via user flows:",
        "options": [
          "No",
          "Yes"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Impedir que guests consultem e-mails de funcionários: acesso de guest **restrito aos próprios objetos**. Só admins com funções específicas (User1 é User administrator) convidam: **Only users assigned to specific admin roles**. E **desabilitar o self-service sign-up** via user flows, para que ninguém entre sem convite."
  },
  {
    "id": "Q110",
    "src": 110,
    "domain": 1,
    "topic": "Licenciamento",
    "type": "single",
    "stem": "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.\n\nFrom the Groups blade in the Azure Active Directory admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users. You needed to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.\n\nWhat should you use?",
    "options": [
      "the Groups blade in the Azure Active Directory admin center",
      "the Set-AzureAdUser cmdlet",
      "the Identity Governance blade in the Azure Active Directory admin center",
      "the Licenses blade in the Azure Active Directory admin center"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O blade **Licenses** permite remover a licença E3 atribuída diretamente de todos os usuários de uma vez."
  },
  {
    "id": "Q111",
    "src": 111,
    "domain": 4,
    "topic": "Identity Secure Score",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "SECSCORE"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Microsoft 365 E5 subscription.\n\nYou create a user named User1.\n\nYou need to ensure that User1 can update the status of Identity Secure Score improvement actions.\n\nSolution: You assign the Security Operator role to User1.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "**Security operator** só tem leitura no Identity Secure Score."
  },
  {
    "id": "Q112",
    "src": 112,
    "domain": 4,
    "topic": "Identity Secure Score",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "SECSCORE"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Microsoft 365 E5 subscription.\n\nYou create a user named User1.\n\nYou need to ensure that User1 can update the status of Identity Secure Score improvement actions.\n\nSolution: You assign the SharePoint Administrator role to User1. Does this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "**SharePoint administrator** está entre os papéis com leitura e gravação no Identity Secure Score."
  },
  {
    "id": "Q113",
    "src": 113,
    "domain": 1,
    "topic": "Funções personalizadas",
    "type": "single",
    "stem": "You have an Azure AD tenant that contains a user named Admin1. You need to ensure that Admin1 can perform only the following tasks:\n\n- From the Microsoft 365 admin center, create and manage service requests.\n- From the Microsoft 365 admin center, read and configure service health.\n- From the Azure portal, create and manage support tickets.\n\nThe solution must minimize administrative effort.\n\nWhat should you do?",
    "options": [
      "Create an administrative unit and add Admin1.",
      "Enable Azure AD Privileged Identity Management (PIM) for Admin1.",
      "Assign Admin1 the Helpdesk Administrator role.",
      "Create a custom role and assign the role to Admin1."
    ],
    "answer": 3,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Os três requisitos correspondem ao Service Support Administrator, que não está entre as opções. O Helpdesk administrator dá permissões extras (senhas), então para \"somente\" essas tarefas a resposta é uma **função personalizada**."
  },
  {
    "id": "Q114",
    "src": 114,
    "domain": 1,
    "topic": "Pass-through authentication",
    "type": "hotarea",
    "stem": "Your network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs with an Azure AD tenant.\n\nYou need to ensure that user authentication always occurs by validating passwords against the AD DS domain.\n\nWhat should you configure, and what should you use? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Configure:",
        "options": [
          "Azure AD Password protection",
          "Cross-tenant synchronization",
          "Pass-through authentication",
          "Password hash synchronization"
        ],
        "answer": 2
      },
      {
        "label": "Use:",
        "options": [
          "Azure AD Connect",
          "Microsoft Identity Manager (MIM)",
          "The Microsoft Entra admin center",
          "The Microsoft Purview compliance portal"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Validação de senha sempre no AD DS = **pass-through authentication**, configurada pelo **Entra Connect** (antes Azure AD Connect)."
  },
  {
    "id": "Q116",
    "src": 116,
    "domain": 4,
    "topic": "Logs de entrada",
    "type": "single",
    "stem": "A user named User1 receives an error message when attempting to access the Microsoft Defender for Cloud Apps portal.\n\nYou need to identify the cause of the error. The solution must minimize administrative effort.\n\nWhat should you use?",
    "options": [
      "Log Analytics",
      "sign-in logs",
      "audit logs",
      "provisioning logs"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Erros de acesso a um app aparecem nos **sign-in logs**, com código e motivo da falha (ex.: bloqueio por CA)."
  },
  {
    "id": "Q117",
    "src": 117,
    "domain": 3,
    "topic": "Defender for Cloud Apps",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that uses Microsoft Defender for Cloud Apps and Yammer.\n\nYou need prevent users from signing in to Yammer from high-risk locations. What should you do in the Microsoft Defender for Cloud Apps portal?",
    "options": [
      "Create an access policy.",
      "Create an activity policy.",
      "Unsanction Yammer.",
      "Create an anomaly detection policy."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Bloquear entrada por localização no Defender for Cloud Apps é feito com **access policy** (exige Conditional Access App Control). Activity/anomaly policies apenas alertam ou agem depois."
  },
  {
    "id": "Q118",
    "src": 118,
    "domain": 2,
    "topic": "Métodos de autenticação",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nAll users have mobile phones and Windows 10 laptops.\n\nThe users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptop to a wired network that has internet access. You plan to implement multi-factor authentication (MFA).\n\nWhich MFA authentication method can the users use from the remote location?",
    "options": [
      "SMS",
      "email",
      "security questions",
      "a verification code from the Microsoft Authenticator app"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) deixa o **código de verificação** do Authenticator."
  },
  {
    "id": "Q119",
    "src": 119,
    "domain": 2,
    "topic": "ID Protection",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant.\n\nYou open the risk detections report.\n\nWhich risk detection type is classified as a user risk?",
    "options": [
      "impossible travel",
      "anonymous IP address",
      "malicious IP address",
      "Azure AD threat intelligence"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "**Microsoft Entra threat intelligence** pode ser detecção de risco de usuário. IP anônimo, malicioso e viagem impossível são de risco de entrada."
  },
  {
    "id": "Q120",
    "src": 120,
    "domain": 1,
    "topic": "Licenciamento",
    "type": "single",
    "stem": "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.\n\nFrom the Groups blade in the Azure Active Directory admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users. You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.\n\nWhat should you use?",
    "options": [
      "the Administrative units blade in the Azure Active Directory admin center",
      "the Set-MsolUserLicense cmdlet",
      "the Groups blade in the Azure Active Directory admin center",
      "the Set-WindowsProductKey cmdlet"
    ],
    "answer": 1,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Pelo gabarito, **Set-MsolUserLicense**. MSOnline foi aposentado — questão borderline."
  },
  {
    "id": "Q121",
    "src": 121,
    "domain": 1,
    "topic": "Entra Connect",
    "type": "yesno",
    "stem": "Your network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs with Azure AD and contains the users shown in the following table.\n\n![Exhibit](img/S121-stem-1.png){w=452}\n\nIn Azure AD Connect, Domain/OU Filtering is configured as shown in the following exhibit.\n\n![Exhibit](img/S121-stem-2.png){w=611}\n\nAzure AD Connect is configured as shown in the following exhibit.\n\n![Exhibit](img/S121-stem-3.png){w=611}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can use self-service password reset (SSPR) to reset his password.",
      "If User1 accesses Microsoft Exchange Online, he will be authenticated by an on-premises domain controller.",
      "User2 can be added to a Microsoft SharePoint Online site as a member."
    ],
    "answer": [
      true,
      true,
      false
    ],
    "answer_original": [
      true,
      true,
      true
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Só a OU1 (e Users) é sincronizada, com **PTA** e **password writeback**. User1 (OU1) pode usar SSPR (o writeback devolve a senha ao AD) e é autenticado por um DC via PTA. User2 (OU2) **não é sincronizado** e não existe no Entra, então não pode ser adicionado como membro. O dump marcava Sim nas três."
  },
  {
    "id": "Q122",
    "src": 122,
    "domain": 1,
    "topic": "Licenciamento",
    "type": "single",
    "stem": "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.\n\nFrom the Groups blade in the Azure Active Directory admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users. You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.\n\nWhat should you use?",
    "options": [
      "the Update-MgGroup cmdlet",
      "the Licenses blade in the Azure Active Directory admin center",
      "the Set-WindowsProductKey cmdlet",
      "the Administrative units blade in the Azure Active Directory admin center"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O blade **Licenses** remove a licença E3 de todos os usuários de uma vez."
  },
  {
    "id": "Q123",
    "src": 123,
    "domain": 1,
    "topic": "Funções administrativas",
    "type": "single",
    "stem": "You have an Azure AD tenant that contains the users shown in the following table.\n\n![Exhibit](img/S123-stem-1.png){w=365}\n\nYou need to compare the role permissions of each user. The solution must minimize administrative effort.\n\nWhat should you use?",
    "options": [
      "the Microsoft 365 Defender portal",
      "the Microsoft 365 admin center",
      "the Microsoft Entra admin center",
      "the Microsoft Purview compliance portal"
    ],
    "answer": 1,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O Microsoft 365 admin center tem o recurso **Compare roles**. A comunidade aponta que o Application Administrator só aparece no Entra admin center — confira a discussão."
  },
  {
    "id": "Q124",
    "src": 124,
    "domain": 1,
    "topic": "Self-service sign-up",
    "type": "single",
    "stem": "You have a Microsoft Exchange organization that uses an SMTP address space of contoso.com.\n\nSeveral users use their contoso.com email address for self-service sign-up to Azure AD.\n\nYou gain global administrator privileges to the Azure AD tenant that contains the self-signed users.\n\nYou need to prevent the users from creating user accounts in the contoso.com Azure AD tenant for self-service sign-up to Microsoft 365 services. Which PowerShell cmdlet should you run?",
    "options": [
      "Update-MgOrganization",
      "Update-MgPolicyPermissionGrantPolicyExclude",
      "Update-MgDomain",
      "Update-MgDomainFederationConfiguration"
    ],
    "answer": 1,
    "scope": "borderline",
    "review": "duvidosa",
    "explanation": "O equivalente atual do Set-MsolCompanySettings é **Update-MgPolicyAuthorizationPolicy** (AllowEmailVerifiedUsersToJoinOrganization / AllowedToSignUpEmailBasedSubscriptions), que **não está entre as opções**. O dump marca Update-MgPolicyPermissionGrantPolicyExclude, que trata de consentimento de apps. Questão mantida só como borderline."
  },
  {
    "id": "Q125",
    "src": 125,
    "domain": 2,
    "topic": "SSPR",
    "type": "single",
    "stem": "You have an Azure AD Tenant.\n\nYou configure self-service password reset (SSPR) by using the following settings:\n\n- Require users to register when signing in: Yes\n- Number of methods required to reset: 1\n\nWhat is a valid authentication method available to users?",
    "options": [
      "an FIDO2 security token",
      "a mobile app code",
      "a Microsoft Teams chat",
      "a Windows Hello PIN"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Com um método exigido, o Authenticator só pode ser usado via **código de verificação**. FIDO2, Windows Hello e Teams não são métodos de SSPR."
  },
  {
    "id": "Q126",
    "src": 126,
    "domain": 4,
    "topic": "Entitlement management",
    "type": "hotarea",
    "stem": "You have an Azure subscription.\n\nFrom Entitlement management, you plan to create a catalog named Catalog1 that will contain a custom extension.\n\nWhat should you create first, and what should you use to distribute Catalog1? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "First create:",
        "options": [
          "A managed account",
          "An Azure Automation account",
          "An Azure logic app"
        ],
        "answer": 2
      },
      {
        "label": "Distribute Catalog1 by using:",
        "options": [
          "A playbook",
          "A workflow",
          "An access package"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Custom extensions de entitlement management chamam um **Azure Logic App**, que precisa existir primeiro. O acesso aos recursos do catálogo é distribuído por **access packages**."
  },
  {
    "id": "Q127",
    "src": 127,
    "domain": 2,
    "topic": "SSPR",
    "type": "single",
    "stem": "You have an Azure AD tenant that contains the users shown in the following table.\n\n![Exhibit](img/S127-stem-1.png){w=412}\n\nYou enable self-service password reset (SSPR) for all the users and configure SSPR to require security questions as the only authentication method. Which users must use security questions when resetting their password?",
    "options": [
      "User4 only",
      "User3 and User4 only",
      "User1 and User4 only",
      "User1, User3, and User4 only",
      "User1, User2, User3, and User4"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Funções administrativas como **User administrator** e **Password administrator** usam sempre a política forte de dois métodos para SSPR e não podem usar perguntas de segurança. Security Reader e usuários comuns seguem a política configurada."
  },
  {
    "id": "Q128",
    "src": 128,
    "domain": 2,
    "topic": "Smart lockout",
    "type": "single",
    "stem": "You have an Azure AD tenant.\n\nYou need to implement smart lockout with a lockout threshold of 10 failed sign- ins.\n\nWhat should you configure in the Azure AD admin center?",
    "options": [
      "Authentication strengths",
      "Password protection",
      "User risk policy",
      "Sign-in risk policy"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O limite do **smart lockout** é configurado em Authentication methods > **Password protection** (Lockout threshold)."
  },
  {
    "id": "Q129",
    "src": 129,
    "domain": 2,
    "topic": "Security defaults",
    "type": "single",
    "stem": "You configure a new Microsoft 365 tenant to use a default domain name of contoso.com.\n\nYou need to ensure that you can control access to Microsoft 365 resources by using conditional access policies.\n\nWhat should you do first?",
    "options": [
      "Disable Security defaults.",
      "Configure password protection for the Azure AD tenant.",
      "Configure a multi-factor authentication (MFA) registration policy.",
      "Disable the User consent settings."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Tenants novos vêm com security defaults ativados, e eles impedem o uso de Conditional Access: primeiro **desative os security defaults**."
  },
  {
    "id": "Q132",
    "src": 132,
    "domain": 3,
    "topic": "Key Vault RBAC",
    "type": "hotarea",
    "stem": "You have an Azure subscription that contains the resources shown in the following table.\n\n![Exhibit](img/S132-stem-1.png){w=377}\n\nYou need to configure access to Vault1. The solution must meet the following requirements:\n\n- Ensure that User1 can manage and create keys in Vault1.\n- Ensure that User2 can access a certificate stored in Vault1.\n- Use the principle of least privilege.\n\nWhich role should you assign to each user? To answer select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "User1:",
        "options": [
          "Key Vault Certificates Officer",
          "Key Vault Crypto Officer",
          "Key Vault Secrets Officer"
        ],
        "answer": 1
      },
      {
        "label": "User2:",
        "options": [
          "Key Vault Certificates Officer",
          "Key Vault Crypto Officer",
          "Key Vault Secrets Officer"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Gerenciar e criar chaves: **Key Vault Crypto Officer**. Trabalhar com certificados: **Key Vault Certificates Officer** (entre as opções, a única de certificados)."
  },
  {
    "id": "Q133",
    "src": 133,
    "domain": 2,
    "topic": "Registro combinado",
    "type": "multi",
    "stem": "You have an Azure AD tenant that has multi-factor authentication (MFA) enforced and self-service password reset (SSPR) enabled.\n\nYou enable combined registration in interrupt mode.\n\nYou create a new user named User1.\n\nWhich two authentication methods can User1 use to complete the combined registration process? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "a FIDO2 security key",
      "a hardware token",
      "a one-time passcode email",
      "Windows Hello for Business",
      "the Microsoft Authenticator app"
    ],
    "answer": [
      2,
      4
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "No modo de interrupção do registro combinado, o usuário pode registrar o **Microsoft Authenticator** e o **e-mail** (para SSPR), entre outros. FIDO2 e Windows Hello só são registrados no modo de gerenciamento (Security info) ou no próprio Windows."
  },
  {
    "id": "Q134",
    "src": 134,
    "domain": 2,
    "topic": "Templates de Conditional Access",
    "type": "match",
    "stem": "You have an Azure AD tenant that contains a user named Admin1. Admin1 uses the Require password change for high-risk users policy template to create a new Conditional Access policy.\n\nWho is included and excluded by default in the policy assignment? To answer, drag the appropriate options to the correct target. Each option may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point",
    "pool": [
      "Admin1",
      "All guest and external users",
      "All users",
      "Directory roles",
      "None"
    ],
    "targets": [
      {
        "label": "Include:",
        "answer": 2
      },
      {
        "label": "Exclude:",
        "answer": 0
      }
    ],
    "answer_original": [
      2,
      4
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Os templates de CA incluem **All users** e excluem automaticamente o **usuário que cria a política** (Admin1), para evitar que ele perca o acesso. O dump marcava \"None\" na exclusão."
  },
  {
    "id": "Q135",
    "src": 135,
    "domain": 1,
    "topic": "External Identities",
    "type": "multi",
    "layout": "panel",
    "panelTitle": "External Identities",
    "stem": "You have an Azure AD tenant.\n\nYou need to configure the following External Identities features:\n\n- B2B collaboration\n- Monthly active users (MAU)-based pricing\n\nWhich two settings should you configure? To answer, select the settings in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "Overview",
      "Cross-tenant access settings",
      "All identity providers",
      "External collaboration settings",
      "Diagnose and solve problems",
      "Custom user attributes",
      "All API connectors",
      "User flows",
      "Linked subscriptions",
      "Terms of use",
      "Access reviews"
    ],
    "answer": [
      3,
      8
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "B2B collaboration é configurado em **External collaboration settings**. A cobrança por MAU exige vincular o tenant a uma assinatura em **Linked subscriptions**."
  },
  {
    "id": "Q136",
    "src": 136,
    "domain": 1,
    "topic": "Usuários convidados",
    "type": "single",
    "stem": "You have an Azure AD tenant that contains the external user shown in the following exhibit.\n\n![Exhibit](img/S136-stem-1.png){w=611}\n\nYou update the email address of the user.\n\nYou need to ensure that the user can authenticate by using the updated email address.\n\nWhat should you do for the user?",
    "options": [
      "Modify the Authentication methods settings.",
      "Reset the password.",
      "Revoke the active sessions.",
      "Reset the redemption status."
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Para que o guest entre com o novo endereço/identidade, use **Reset redemption status**: ele refaz o resgate do convite mantendo o objeto, as associações e as permissões."
  },
  {
    "id": "Q137",
    "src": 137,
    "domain": 1,
    "topic": "Colaboração externa",
    "type": "single",
    "stem": "You have an Azure AD tenant.\n\nYou need to ensure that only users from specific external domains can be invited as guests to the tenant.\n\nWhich settings should you configure?",
    "options": [
      "External collaboration settings",
      "All identity providers",
      "Cross-tenant access settings",
      "Linked subscriptions"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "A lista de domínios permitidos/bloqueados para convites fica em **External collaboration settings > Collaboration restrictions**."
  },
  {
    "id": "Q138",
    "src": 138,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "stem": "You have an Azure AD tenant that contains a user named User1 and a Microsoft 365 group named Group1. User1 is the owner of Group1.\n\nYou need to ensure that User1 is notified every three months to validate the guest membership of Group1.\n\nWhat should you do?",
    "options": [
      "Configure the External collaboration settings.",
      "Create an access review.",
      "Configure an access package.",
      "Create a group expiration policy."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "**Access review** recorrente (trimestral) dos membros guest do grupo, com o dono do grupo como revisor."
  },
  {
    "id": "Q139",
    "src": 139,
    "domain": 1,
    "topic": "Unidades administrativas",
    "type": "yesno",
    "stem": "You have a Microsoft Entra tenant that contains a group named Group3 and an administrative unit named Department1.\n\nDepartment1 has the users shown in the Users exhibit. (Click the Users tab.)\n\n![Exhibit](img/S139-stem-1.png){w=611}\n\nDepartment1 has the groups shown in the Groups exhibit. (Click the Groups tab.)\n\n![Exhibit](img/S139-stem-2.png){w=611}\n\nThe User Administrator role assignments are shown in the Assignments exhibit (Click the Assignments tab.)\n\n![Exhibit](img/S139-stem-3.png){w=611}\n\nThe members of Group2 are shown in the Group2 exhibit. (Click the Group2 tab.)\n\n![Exhibit](img/S139-stem-4.png){w=611}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "Admin1 can reset the passwords of User3 and User4.",
      "Admin1 can add User1 to Group3.",
      "Admin3 can reset the password of User1."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "answer_original": [
      true,
      false,
      true
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "O Admin1 é User administrator com escopo na AU. User3/User4 estão fora da AU, então ele não redefine as senhas. O Group3 não está na AU, então ele também não gerencia a associação desse grupo. O Admin3 tem escopo no tenant e redefine a senha de User1. O gabarito em imagem marcava Sim na primeira, o que contradiz o escopo da AU."
  },
  {
    "id": "Q140",
    "src": 140,
    "domain": 1,
    "topic": "Usuários sincronizados",
    "type": "yesno",
    "stem": "Your network contains an on-premises Active Directory Domain Services (AD DS) domain named fabrikam.com. The domain contains an Active Directory Federation Services (AD FS) instance and a member server named Server1 that runs Windows Server. The domain contains the users shown in the following table.\n\n![Exhibit](img/S140-stem-1.png){w=446}\n\nYou have a Microsoft Entra tenant named contoso.com that is linked to a Microsoft 365 subscription.\n\nYou establish federation between fabrikam.com and contoso.com by using a Microsoft Entra Connect instance that is configured as shown in the following exhibit.\n\n![Exhibit](img/S140-stem-2.png){w=611}\n\nYou perform the following tasks in contoso.com:\n\n- Create a group named Group1.\n- Disable User2.\n- Enable User3.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "You can add User1 to Group1.",
      "User2 can sign in to Server1.",
      "User3 can sign in to Microsoft 365."
    ],
    "answer": [
      true,
      true,
      false
    ],
    "answer_original": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "User1 é sincronizado, mas pode ser membro de um grupo **de nuvem** (Group1). Desabilitar User2 no Entra não afeta o AD DS, então ele continua entrando no Server1 (on-premises). User3 está **desabilitado no AD** e o domínio é federado (AD FS valida no AD), então habilitar a conta na nuvem não permite o login, e a próxima sincronização sobrescreve o estado. O dump marcava Não/Não/Sim, o que contraria a autoridade do AD sobre objetos sincronizados."
  },
  {
    "id": "Q143",
    "src": 143,
    "domain": 3,
    "topic": "Azure RBAC",
    "type": "single",
    "stem": "You have an Azure subscription that contains a user named User1 and two resource groups named RG1 and RG2.\n\nYou need to ensure that User1 can perform the following tasks:\n\n- View all resources.\n- Restart virtual machines.\n- Create virtual machines in RG1 only.\n- Create storage accounts in RG1 only.\n\nWhat is the minimum number of role-based access control (RBAC) role assignments required?",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": 1,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Duas atribuições bastam: uma função personalizada na **assinatura** (ler tudo e reiniciar VMs) e uma no **RG1** (criar VMs e storage accounts) — ou Contributor no RG1 + função personalizada na assinatura."
  },
  {
    "id": "Q144",
    "src": 144,
    "domain": 1,
    "topic": "Colaboração externa",
    "type": "single",
    "stem": "You work for a company named Contoso, Ltd. that has a Microsoft Entra tenant named contoso.com.\n\nContoso is working on a project with the following two partner companies:\n\n- A company named A. Datum Corporation that has a Microsoft Entra tenant named adatum.com.\n- A company named Fabrikam, Inc. that has a Microsoft Entra tenant named fabrikam.com.\n\nWhen you attempt to invite a new guest user from adatum.com to contoso.com, you receive an error message.\n\nYou can successfully invite a new guest user from fabnkam.com to contoso.com. You need to be able to invite new guest users from adatum.com to contoso.com. What should you configure?",
    "options": [
      "Guest invite settings",
      "Verifiable credentials",
      "Named locations",
      "Collaboration restrictions"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O erro ao convidar adatum.com indica que o domínio não está na lista de permitidos (ou está na de bloqueados) em **Collaboration restrictions**."
  },
  {
    "id": "Q145",
    "src": 145,
    "domain": 2,
    "topic": "ID Protection",
    "type": "single",
    "stem": "You have a Microsoft Entra tenant.\n\nYou need to query risky user activity for the tenant.\n\nHow long will the logs of risky user activity be retained?",
    "options": [
      "30 days",
      "60 days",
      "90 days",
      "180 days"
    ],
    "answer": 0,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O dump marca 30 dias. Pela tabela de retenção, os relatórios de risco têm retenção diferente por licença e por tipo (risky sign-ins chegam a 90 dias com P2, e risky users não expiram até serem remediados). Confira a discussão."
  },
  {
    "id": "Q146",
    "src": 146,
    "domain": 2,
    "topic": "SSPR híbrido",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 tenant and an Active Directory domain named adatum.com.\n\nYou deploy Azure AD Connect by using the Express Settings.\n\nYou need to configure self-service password reset (SSPR) to meet the following requirements:\n\n- When users reset their password, they must be prompted to respond to a mobile app notification or answer three predefined security questions.\n- Passwords must be synced between the tenant and the domain regardless of where the password was reset.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "From the Password reset blade in the Azure Active Directory admin center, configure:",
        "options": [
          "Authentication methods",
          "Notifications",
          "Properties",
          "Registration"
        ],
        "answer": 0
      },
      {
        "label": "From Azure AD Connect, enable:",
        "options": [
          "Federation with Active Directory Federation Services (AD FS)",
          "Pass-through authentication",
          "Password hash synchronization",
          "Password writeback"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Os métodos permitidos na redefinição (notificação no app móvel ou três perguntas de segurança) são definidos em **Authentication methods** no blade Password reset. Para que a nova senha volte ao AD on-premises, habilite **Password writeback** no Entra Connect.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-sspr-deployment",
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-security-questions"
    ]
  },
  {
    "id": "Q147",
    "src": 147,
    "domain": 3,
    "topic": "Defender for Cloud Apps",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nThe Azure Active Directory (Azure AD) tenant syncs to an on-premises Active Directory domain.\n\nUsers connect to the internet by using a hardware firewall at your company. The users authenticate to the firewall by using their Active Directory credentials. You plan to manage access to external applications by using Azure AD. You need to use the firewall logs to create a list of unmanaged external applications and the users who access them.\n\nWhat should you use to gather the information?",
    "options": [
      "Application Insights in Azure Monitor",
      "access reviews in Azure AD",
      "Cloud App Discovery in Microsoft Cloud App Security",
      "enterprise applications in Azure AD"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "**Cloud Discovery** do Defender for Cloud Apps analisa os logs de tráfego do firewall/proxy (upload manual ou log collector) e lista apps não gerenciados e quem os usa.",
    "refs": [
      "https://docs.microsoft.com/en-us/cloud-app-security/create-snapshot-cloud-discovery-reports#using-traffic-logs-for-cloud-discovery"
    ]
  },
  {
    "id": "Q148",
    "src": 148,
    "domain": 3,
    "topic": "Application Proxy",
    "type": "hotarea",
    "stem": "You have an on-premises datacenter that contains the hosts shown in the following table.\n\n![Exhibit](img/S148-stem-1.png){w=549}\n\nThe Active Directory forest syncs to an Azure Active Directory (Azure AD) tenant. Multi-factor authentication (MFA) is enforced for Azure AD.\n\nYou need to ensure that you can publish App1 to Azure AD users. What should you configure on Server4 and Firewall1? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Service to install on Server4:",
        "options": [
          "Azure AD Application Proxy",
          "The Azure AD Password Protection DC agent",
          "The Azure AD Password Protection proxy service",
          "Web Application Proxy in Windows Server"
        ],
        "answer": 0
      },
      {
        "label": "Rule to configure on Firewall1:",
        "options": [
          "Allow incoming HTTPS connections from Azure AD to Server4.",
          "Allow incoming IPsec connections from Azure AD to Server4.",
          "Allow outbound HTTPS connections from Server4 to Azure AD.",
          "Allow outbound IPsec connections from Server4 to Azure AD."
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Para publicar um app on-premises no Entra ID, instale o **conector do Application Proxy** no Server4. O conector só faz conexões **de saída HTTPS** (443) para o serviço; não é preciso abrir portas de entrada.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/application-proxy"
    ]
  },
  {
    "id": "Q149",
    "src": 149,
    "domain": 3,
    "topic": "Registro de aplicativos",
    "type": "hotarea",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that has the default App registrations settings. The tenant contains the users shown in the following table.\n\n![Exhibit](img/S149-stem-1.png){w=355}\n\nYou purchase two cloud apps named App1 and App2. The global administrator registers App1 in Azure AD.\n\nYou need to identify who can assign users to App1, and who can register App2 in Azure AD.\n\nWhat should you identify? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Can assign users to App1:",
        "options": [
          "Admin1 only",
          "Admin3 only",
          "Admin1 and Admin3 only",
          "Admin1, Admin2, and Admin3 only",
          "Admin1, Admin2, Admin3, and User1"
        ],
        "answer": 2
      },
      {
        "label": "Can register App2 in Azure AD:",
        "options": [
          "Admin1 only",
          "Admin3 only",
          "Admin1 and Admin3 only",
          "Admin1, Admin2, and Admin3 only",
          "Admin1, Admin2, Admin3, and User1"
        ],
        "answer": 4
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Atribuir usuários a um enterprise app: **Application administrator** e **Cloud application administrator** (Application developer só gerencia o que criou). Com as configurações padrão (\"Users can register applications\" = Yes), **qualquer usuário** pode registrar apps.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-assign-users",
      "https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-how-applications-are-added"
    ]
  },
  {
    "id": "Q150",
    "src": 150,
    "domain": 3,
    "topic": "Propriedades de enterprise app",
    "type": "hotarea",
    "stem": "You have a custom cloud app named App1 that is registered in Azure Active Directory (Azure AD).\n\nApp1 is configured as shown in the following exhibit.\n\n![Exhibit](img/S150-stem-1.png){w=611}\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "[answer choice] can access App1 from the homepage URL.",
        "options": [
          "All users",
          "No one",
          "Only users listed on the Owners blade",
          "Only users listed on the Users and groups blade"
        ],
        "answer": 0
      },
      {
        "label": "App1 will appear in the Microsoft Office 365 app launcher for [answer choice].",
        "options": [
          "all users",
          "no one",
          "only users listed on the Owners blade",
          "only users listed on the Users and groups blade"
        ],
        "answer": 3
      }
    ],
    "answer_original": [
      0,
      1
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Com **User assignment required = No**, qualquer usuário do tenant acessa o App1 pela URL. **Visible to users = Yes** mostra o app no My Apps / launcher, mas só para usuários **atribuídos** (listados em Users and groups). O dump marcava \"no one\" para o launcher, e parte da comunidade relata \"all users\" em laboratório.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal"
    ]
  },
  {
    "id": "Q151",
    "src": 151,
    "domain": 3,
    "topic": "Apps empresariais",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant.\n\nYou create an enterprise application collection named HR Apps that has the following settings:\n\n- Applications: App1, App2, App3\n- Owners: Admin1\n- Users and groups: HRUsers\n\nAll three apps have the following Properties settings:\n\n- Enabled for users to sign in: Yes\n- User assignment required: Yes\n\nVisible to users: Yes -\n\nUsers report that when they go to the My Apps portal, they only see App1 and App2.\n\nYou need to ensure that the users can also see App3.\n\nWhat should you do from App3?",
    "options": [
      "From Users and groups, add HRUsers.",
      "From Single sign-on, configure a sign-on method.",
      "From Properties, change User assignment required to No.",
      "From Permissions, review the User consent permissions."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Com **User assignment required = Yes**, o app só aparece no My Apps para quem foi atribuído a ele. Adicionar o app a uma coleção não atribui usuários: é preciso adicionar HRUsers em **Users and groups** do App3.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal",
      "https://docs.microsoft.com/en-us/azure/active-directory/user-help/my-applications-portal-workspaces"
    ]
  },
  {
    "id": "Q152",
    "src": 152,
    "domain": 3,
    "topic": "Funções de aplicativos",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant.\n\nFor the tenant, Users can register applications is set to No.\n\nA user named Admin1 must deploy a new cloud app named App1.\n\nYou need to ensure that Admin1 can register App1 in Azure AD. The solution must use the principle of least privilege.\n\nWhich role should you assign to Admin1?",
    "options": [
      "Managed Application Contributor for Subscription1.",
      "Application developer in Azure AD.",
      "Cloud application administrator in Azure AD.",
      "App Configuration Data Owner for Subscription1."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O **Application developer** pode registrar apps mesmo com \"Users can register applications = No\", com o menor privilégio.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/delegate-app-roles"
    ]
  },
  {
    "id": "Q153",
    "src": 153,
    "domain": 3,
    "topic": "Self-service de aplicativos",
    "type": "yesno",
    "stem": "You have a Microsoft 365 tenant that contains a group named Group1 as shown in the Group1 exhibit. (Click the Group1 tab.)\n\n![Exhibit](img/S153-stem-1.png){w=611}\n\nYou create an enterprise application named App1 as shown in the App1 Properties exhibit. (Click the App1 Properties tab.)\n\n![Exhibit](img/S153-stem-2.png){w=611}\n\nYou configure self-service for App1 as shown in the App1 Self-service exhibit. (Click the App1 Self-service tab.)\n\n![Exhibit](img/S153-stem-3.png){w=611}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "The members of Group3 can access App1 without first being approved by User1.",
      "After you configure self-service for App1, the owner of Group1 is User1.",
      "App1 appears in the Microsoft Office 365 app launcher of User4."
    ],
    "answer": [
      false,
      false,
      false
    ],
    "answer_original": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Group3 está aninhado no Group1, e membros de grupos aninhados não herdam a atribuição do app, então precisam pedir acesso e aguardar aprovação. Configurar o self-service **não** torna o aprovador dono do grupo. O App1 está com **Visible to users = No**, então não aparece no launcher de ninguém. O dump marcava Sim na terceira, o que contraria o exhibit.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal",
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-assign-users"
    ]
  },
  {
    "id": "Q154",
    "src": 154,
    "domain": 2,
    "topic": "ID Protection",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant named contoso.com that has Azure AD Identity Protection enabled.\n\nYou need to implement a sign-in risk remediation policy without blocking user access.\n\nWhat should you do first?",
    "options": [
      "Configure access reviews in Azure AD.",
      "Enforce Azure AD Password Protection.",
      "Configure self-service password reset (SSPR) for all users.",
      "Implement multi-factor authentication (MFA) for all users."
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "A remediação sem bloqueio de risco de entrada é **exigir MFA**, então os usuários precisam estar registrados para MFA primeiro. Para risco de usuário, a remediação é a troca de senha (SSPR).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-remediate-unblock",
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-sspr-deployment"
    ]
  },
  {
    "id": "Q155",
    "src": 155,
    "domain": 3,
    "topic": "SSO e Conditional Access",
    "type": "hotarea",
    "stem": "Your company has a Microsoft 365 tenant.\n\nAll users have computers that run Windows 10 and are joined to the Azure Active Directory (Azure AD) tenant.\n\nThe company subscribes to a third-party cloud service named Service1. Service1 supports Azure AD authentication and authorization based on OAuth. Service1 is published to the Azure AD gallery.\n\nYou need to recommend a solution to ensure that the users can connect to Service1 without being prompted for authentication. The solution must ensure that the users can access Service1 only from Azure AD-joined computers. The solution must minimize administrative effort.\n\nWhat should you recommend for each requirement? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Ensure that the users can connect to Service1 without being prompted for authentication:",
        "options": [
          "An app registration in Azure AD",
          "Azure AD Application Proxy",
          "An enterprise application in Azure AD",
          "A managed identity in Azure AD"
        ],
        "answer": 2
      },
      {
        "label": "Ensure that the users can access Service1 only from the Azure AD-joined computers:",
        "options": [
          "Azure AD Application Proxy",
          "A compliance policy",
          "A conditional access policy",
          "An OAuth policy"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "App da galeria com OAuth/OIDC: adicione como **enterprise application** para ter SSO. Para restringir o acesso a dispositivos Entra joined: **política de Conditional Access** (exigir dispositivo híbrido/joined ou compatível).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-how-applications-are-added",
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/require-managed-devices"
    ]
  },
  {
    "id": "Q156",
    "src": 156,
    "domain": 3,
    "topic": "Apps empresariais",
    "type": "single",
    "stem": "Your company requires that users request access before they can access corporate applications.\n\nYou register a new enterprise application named MyApp1 in Azure Active Directory (Azure AD) and configure single sign-on (SSO) for MyApp1. Which settings should you configure next for MyApp1?",
    "options": [
      "Self-service",
      "Provisioning",
      "Application proxy",
      "Roles and administrators"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Para que usuários **solicitem acesso** a um app, configure o **Self-service** (self-service application access) do app empresarial. Hoje o caminho recomendado para isso é entitlement management.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/manage-self-service-access"
    ]
  },
  {
    "id": "Q157",
    "src": 157,
    "domain": 3,
    "topic": "Microsoft Graph — permissões",
    "type": "order",
    "stem": "Your company has an Azure Active Directory (Azure AD) tenant named contoso.com.\n\nThe company is developing a web service named App1.\n\nYou need to ensure that App1 can use Microsoft Graph to read directory data in contoso.com.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange then in the correct order.",
    "pool": [
      "Add a group claim.",
      "Create an app registration.",
      "Grant admin consent.",
      "Add delegated permissions.",
      "Add app permissions."
    ],
    "answer": [
      1,
      4,
      2
    ],
    "answer_original": [
      1,
      2,
      4
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Sequência: **registrar o app**, **adicionar a permissão de aplicativo** (Directory.Read.All, pois é um serviço sem usuário) e **conceder admin consent**. Não há consentimento sem permissões configuradas antes. O dump colocava o consentimento antes das permissões.",
    "refs": [
      "https://docs.microsoft.com/en-us/graph/auth/auth-concepts"
    ]
  },
  {
    "id": "Q158",
    "src": 158,
    "domain": 3,
    "topic": "Apps empresariais",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains cloud-based enterprise apps.\n\nYou need to group related apps into categories in the My Apps portal. What should you create?",
    "options": [
      "tags",
      "collections",
      "naming policies",
      "dynamic groups"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "No My Apps, apps relacionados são agrupados em **collections**.",
    "refs": [
      "https://support.microsoft.com/en-us/account-billing/customize-app-collections-in-the-my-apps-portal-2dae6b8a-d8b0-4a16-9a5d-71ed4d6a6c1d"
    ]
  },
  {
    "id": "Q159",
    "src": 159,
    "domain": 3,
    "topic": "Apps empresariais",
    "type": "single",
    "stem": "The Azure Active Directory (Azure AD) tenant contains the groups shown in the following table.\n\n![Exhibit](img/S159-stem-1.png){w=534}\n\nIn Azure AD, you add a new enterprise application named App1.\n\nWhich groups can you assign to App1?",
    "options": [
      "Group1 only",
      "Group2 only",
      "Group3 only",
      "Group1 and Group4",
      "Group1 and Group3"
    ],
    "answer": 4,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Atribuição de grupo a app empresarial aceita grupos com segurança habilitada: grupo de **segurança** e grupo **Microsoft 365** (securityEnabled). Grupos de distribuição não. A comunidade relata que grupos de segurança habilitados para e-mail (Group4) também funcionam; o dump marca só Group1 e Group3.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/groups-saasapps"
    ]
  },
  {
    "id": "Q160",
    "src": 160,
    "domain": 3,
    "topic": "Consentimento de apps",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in, the following table.\n\n![Exhibit](img/S160-stem-1.png){w=422}\n\nThe User settings for enterprise applications have the following configurations:\n\n- Users can consent to apps accessing company data on their behalf: No\n- Users can consent to apps accessing company data for the groups they own:\n\nNo\n\n- Users can request admin consent to apps they are unable to consent to: Yes Who can review admin consent requests: Admin2, User2\n\nUser1 attempts, to add an app that requires consent to access company data. Which user can provide consent?",
    "options": [
      "User1",
      "User2",
      "Admin1",
      "Admin2"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Mesmo indicados como revisores, só podem aprovar solicitações de consentimento usuários com função de **Global, Cloud application ou Application administrator**. Pela tabela, só o Admin1 atende.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/configure-admin-consent-workflow"
    ]
  },
  {
    "id": "Q162",
    "src": 162,
    "domain": 4,
    "topic": "Terms of use",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nIn Azure Active Directory (Azure AD), you configure the terms of use. You need to ensure that only users who accept the terms of use can access the resources in the tenant. Other users must be denied access.\n\nWhat should you configure?",
    "options": [
      "an access policy in Microsoft Cloud App Security.",
      "Terms and conditions in Microsoft Endpoint Manager.",
      "a conditional access policy in Azure AD",
      "a compliance policy in Microsoft Endpoint Manager"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Os termos de uso do Entra são exigidos por uma política de **Conditional Access** com o controle de concessão \"Require terms of use\".",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/terms-of-use"
    ]
  },
  {
    "id": "Q163",
    "src": 163,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the groups shown in the following table.\n\n![Exhibit](img/S163-stem-1.png){w=430}\n\nFor which groups can you create an access review?",
    "options": [
      "Group1 only",
      "Group1 and Group4 only",
      "Group1 and Group2 only",
      "Group1, Group2, Group4, and Group5 only",
      "Group1, Group2, Group3, Group4 and Group5"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Access reviews de grupos valem para grupos de **usuários** (atribuídos ou dinâmicos, segurança ou Microsoft 365); grupos de **dispositivos** não são suportados.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q164",
    "src": 164,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.\n\n![Exhibit](img/S164-stem-1.png){w=374}\n\nUser1 is the owner of Group1.\n\nYou create an access review that has the following settings:\n\n- Users to review: Members of a group\n- Scope: Everyone\n- Group: Group1\n- Reviewers: Members (self)\n\nWhich users can perform access reviews for User3?",
    "options": [
      "User1, User2, and User3",
      "User3 only",
      "User1 only",
      "User1 and User2 only"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Com **Members (self)**, cada membro revisa o próprio acesso: só User3 revisa User3.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-how-to-start-security-review"
    ]
  },
  {
    "id": "Q165",
    "src": 165,
    "domain": 4,
    "topic": "PIM — configurações de função",
    "type": "hotarea",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains Azure AD Privileged Identity Management (PIM) role settings for the User administrator role as shown in the following exhibit.\n\n![Exhibit](img/S165-stem-1.png){w=611}\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "A user who requires access to the User administration role must perform multi-factor authentication (MFA) every [answer choice].",
        "options": [
          "8 hours",
          "15 days",
          "1 month"
        ],
        "answer": 0
      },
      {
        "label": "Before an eligible user can perform a task that requires the User administrator role, the activation must be approved by a [answer choice].",
        "options": [
          "global administrator only",
          "global administrator or privileged role administrator",
          "permanently assigned user administrator",
          "privileged role administrator only"
        ],
        "answer": 1
      }
    ],
    "answer_original": [
      0,
      3
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Duração máxima de ativação de 8 horas com MFA na ativação: o usuário faz MFA a cada **8 horas**. Com aprovação exigida e nenhum aprovador definido, os aprovadores padrão são **Global Administrators e Privileged Role Administrators**. O dump marcava apenas Privileged Role Administrator.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-configure",
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-deployment-plan"
    ]
  },
  {
    "id": "Q166",
    "src": 166,
    "domain": 4,
    "topic": "Termos de uso",
    "type": "yesno",
    "stem": "You have an Azure Active Directory (Azure AD) tenant named contoso.com that contains a user named User1.\n\nUser1 has the devices shown in the following table.\n\n![Exhibit](img/S166-stem-1.png){w=476}\n\nOn November 5, 2020, you create and enforce terms of use in contoso.com that has the following settings:\n\n- Name: Terms1\n- Display name: Contoso terms of use\n- Require users to expand the terms of use: On\n- Require users to consent on every device: On\n- Expire consents: On\n- Expire starting on: December 10, 2020\n- Frequency: Monthly\n\nOn November 15, 2020, User1 accepts Terms1 on Device3.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "On November 20, 2020, User1 can accept Terms1 on Device1.",
      "On December 11, 2020, User1 can accept Terms1 on Device2.",
      "On December 7, 2020, User1 can accept Terms1 on Device3."
    ],
    "answer": [
      true,
      true,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Com consentimento por dispositivo, o User1 precisa aceitar em cada dispositivo. No Device1 ainda não aceitou (Sim). No Device2, não registrado, ele é solicitado a registrar o dispositivo e depois aceita (Sim). No Device3 já aceitou em 15/11, e a expiração só começa em 10/12, então não há nada a aceitar em 7/12 (Não).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/terms-of-use"
    ]
  },
  {
    "id": "Q167",
    "src": 167,
    "domain": 4,
    "topic": "PIM",
    "type": "single",
    "stem": "Your company recently implemented Azure Active Directory (Azure AD) Privileged Identity Management (PIM).\n\nWhile you review the roles in PIM, you discover that all 15 users in the IT department at the company have permanent security administrator rights. You need to ensure that the IT department users only have access to the Security administrator role when required.\n\nWhat should you configure for the Security administrator role assignment?",
    "options": [
      "Expire eligible assignments after from the Role settings details",
      "Expire active assignments after from the Role settings details",
      "Assignment type to Active",
      "Assignment type to Eligible"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Mude a atribuição de **Active** para **Eligible**: o usuário só terá a função depois de ativá-la no PIM, quando precisar.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-configure"
    ]
  },
  {
    "id": "Q168",
    "src": 168,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nThe Sign-ins activity report shows that an external contractor signed in to the Exchange admin center.\n\nYou need to review access to the Exchange admin center at the end of each month and block sign-ins if required.\n\nWhat should you create?",
    "options": [
      "an access package that targets users outside your directory",
      "an access package that targets users in your directory",
      "a group-based access review that targets guest users",
      "an application-based access review that targets guest users"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Revisão mensal do acesso ao Exchange admin center por um terceiro: **access review baseada em grupo** (o grupo que dá a função), direcionada a **guests**, com aplicação automática dos resultados.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/access-reviews-overview"
    ]
  },
  {
    "id": "Q169",
    "src": 169,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "REVIEWERS"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Microsoft 365 tenant.\n\nYou have 100 IT administrators who are organized into 10 departments. You create the access review shown in the exhibit. (Click the Exhibit tab.)\n\n![Exhibit](img/S169-stem-1.png){w=611}\n\nYou discover that all access review requests are received by Megan Bowen. You need to ensure that the manager of each department receives the access reviews of their respective department.\n\nSolution: You create a separate access review for each role.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Criar uma revisão por função não muda o fato de os usuários não terem **gerente** definido: Megan Bowen (fallback reviewer) continuaria recebendo.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q170",
    "src": 170,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "REVIEWERS"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Microsoft 365 tenant.\n\nYou have 100 IT administrators who are organized into 10 departments. You create the access review shown in the exhibit. (Click the Exhibit tab.)\n\n![Exhibit](img/S170-stem-1.png){w=611}\n\nYou discover that all access review requests are received by Megan Bowen. You need to ensure that the manager of each department receives the access reviews of their respective department.\n\nSolution: You modify the properties of the IT administrator user accounts. Does this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Com Reviewers = Managers, a revisão vai para o **gerente** de cada usuário; Megan Bowen é a fallback porque os usuários não têm gerente. Definir o **Manager** nas propriedades de cada usuário resolve.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q171",
    "src": 171,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "REVIEWERS"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Microsoft 365 tenant.\n\nYou have 100 IT administrators who are organized into 10 departments. You create the access review shown in the exhibit. (Click the Exhibit tab.)\n\n![Exhibit](img/S171-stem-1.png){w=611}\n\nYou discover that all access review requests are received by Megan Bowen. You need to ensure that the manager of each department receives the access reviews of their respective department.\n\nSolution: You set Reviewers to Member (self).\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Com Members (self), cada usuário revisaria o próprio acesso, e não o gerente do departamento.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q172",
    "src": 172,
    "domain": 4,
    "topic": "Contas de emergência",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nThe Azure Active Directory (Azure AD) tenant syncs to an on-premises Active Directory domain.\n\nYou plan to create an emergency-access administrative account named Emergency1. Emergency1 will be assigned the Global administrator role in Azure AD.\n\nEmergency1 will be used in the event of Azure AD functionality failures and on- premises infrastructure failures.\n\nYou need to reduce the likelihood that Emergency1 will be prevented from signing in during an emergency.\n\nWhat should you do?",
    "options": [
      "Configure Azure Monitor to generate an alert if Emergency1 is modified or signs in.",
      "Require Azure AD Privileged Identity Management (PIM) activation of the Global administrator role for Emergency1.",
      "Configure a conditional access policy to restrict sign-in locations for Emergency1 to only the corporate network.",
      "Configure a conditional access policy to require multi-factor authentication (MFA) for Emergency1."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "As outras opções (PIM, CA por local, MFA) criam dependências que podem impedir o acesso em uma emergência. A boa prática é **monitorar e alertar** quando a conta de emergência é usada ou modificada."
  },
  {
    "id": "Q173",
    "src": 173,
    "domain": 4,
    "topic": "Entitlement management",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant named contoso.com. You implement entitlement management to provide resource access to users at a company named Fabrikam, Inc. Fabrikam uses a domain named fabrikam.com. Fabrikam users must be removed automatically from the tenant when access is no longer required.\n\nYou need to configure the following settings:\n\n- Block external user from signing in to this directory: No\n- Remove external user: Yes\n- Number of days before removing external user from this directory: 90 What should you configure on the Identity Governance blade?",
    "options": [
      "Access packages",
      "Entitlement management settings",
      "Terms of use",
      "Access reviews settings"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O ciclo de vida de usuários externos (bloquear entrada, remover após X dias) é definido em **Entitlement management > Settings**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-external-users"
    ]
  },
  {
    "id": "Q174",
    "src": 174,
    "domain": 4,
    "topic": "Logs",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) P1 tenant.\n\nYou need to review the Azure AD sign-in logs to investigate sign-ins that occurred in the past.\n\nFor how long does Azure AD store events in the sign-in logs?",
    "options": [
      "14 days",
      "30 days",
      "90 days",
      "365 days"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Com Entra ID P1/P2, os sign-in logs ficam **30 dias** no portal (7 dias no Free). Para mais tempo, use diagnostic settings.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/reference-reports-data-retention#how-long-does-azure-ad-store-the-data"
    ]
  },
  {
    "id": "Q175",
    "src": 175,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "stem": "You have an Azure subscription that contains the resources shown in the following table.\n\n![Exhibit](img/S175-stem-1.png){w=578}\n\nFor which resources can you create an access review?",
    "options": [
      "Group1, Role1, and Contributor only",
      "Group1 only",
      "Group1, App1, Contributor, and Role1",
      "Role1 and Contributor only"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Access reviews cobrem **grupos**, **aplicativos** (atribuições), **funções do Entra** e **funções de recursos do Azure** (via PIM).",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-how-to-start-security-review?toc=/azure/active-directory/governance/toc.json",
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/access-reviews-overview"
    ]
  },
  {
    "id": "Q176",
    "src": 176,
    "domain": 4,
    "topic": "Logs de auditoria",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that uses conditional access policies.\n\nYou plan to use third-party security information and event management (SIEM) to analyze conditional access usage.\n\nYou need to download the Azure AD log by using the administrative portal. The log file must contain changes to conditional access policies.\n\nWhat should you export from Azure AD?",
    "options": [
      "audit logs in CSV format",
      "sign-ins in CSV format",
      "audit logs in JSON format",
      "sign-ins in JSON format"
    ],
    "answer": 2,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Alterações em políticas de CA estão nos **audit logs**. O download pode ser feito em CSV ou JSON; o dump marca JSON. Questão duvidosa porque CSV também atenderia.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/concept-audit-logs"
    ]
  },
  {
    "id": "Q177",
    "src": 177,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "REVIEWERS"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a Microsoft 365 tenant.\n\nYou have 100 IT administrators who are organized into 10 departments. You create the access review shown in the exhibit. (Click the Exhibit tab.)\n\n![Exhibit](img/S177-stem-1.png){w=611}\n\nYou discover that all access review requests are received by Megan Bowen. You need to ensure that the manager of each department receives the access reviews of their respective department.\n\nSolution: You add each manager as a fallback reviewer.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Fallback reviewers só recebem quando o usuário não tem gerente, e todos os gerentes como fallback receberiam **todas** as revisões. Não atende.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q178",
    "src": 178,
    "domain": 4,
    "topic": "PIM",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the objects shown in the following table.\n\n![Exhibit](img/S178-stem-1.png){w=386}\n\nWhich objects can you add as eligible in Azure AD Privileged Identity Management (PIM) for an Azure AD role?",
    "options": [
      "User1, Guest1, and Identity1",
      "User1 and Guest1 only",
      "User1 only",
      "User1 and Identity1 only"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Atribuições **eligible** no PIM exigem usuário interativo (membro ou guest); service principals/identities só recebem atribuição ativa.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-deployment-plan"
    ]
  },
  {
    "id": "Q179",
    "src": 179,
    "domain": 4,
    "topic": "Access reviews",
    "type": "yesno",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the following group:\n\n- Name: Group1\n- Members: User1, User2\n- Owner: User3\n\nOn January 15, 2021, you create an access review as shown in the exhibit. (Click the Exhibit tab.)\n\n![Exhibit](img/S179-stem-1.png){w=611}\n\nUsers answer the Review1 question as shown in the following table.\n\n![Exhibit](img/S179-stem-2.png){w=611}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "On February 5, 2021, User1 can answer the Review1 question again.",
      "On January 25, 2021, User2 can answer the Review1 question again.",
      "On January 22, 2021, User3 can answer the Review1 question."
    ],
    "answer": [
      false,
      true,
      false
    ],
    "answer_original": [
      true,
      true,
      false
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "A revisão começa em 15/01 e dura 14 dias (até 29/01). A próxima instância mensal começaria em 15/02, que é a data de término da série. Em 5/02 não há revisão ativa, então User1 não responde (Não). Em 25/01 a revisão está ativa e o User2 pode **alterar** a resposta (Sim). User3 é dono, não membro, e os revisores são os próprios membros (Não). O dump marcava Sim na primeira.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/review-your-access"
    ]
  },
  {
    "id": "Q180",
    "src": 180,
    "domain": 4,
    "topic": "Entitlement management",
    "type": "hotarea",
    "stem": "Your company has an Azure Active Directory (Azure AD) tenant named contoso.com. The company has a business partner named Fabrikam, Inc. Fabrikam uses Azure AD and has two verified domain names of fabrikam.com and litwareinc.com. Both domain names are used for Fabrikam email addresses. You plan to create an access package named package1 that will be accessible only to the users at Fabrikam.\n\nYou create a connected organization for Fabrikam.\n\nYou need to ensure that the package1 will be accessible only to users who have fabrikam.com email addresses.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "To allow access for users who have fabrikam.com email addresses, configure:",
        "options": [
          "An access package assignment in Identity Governance",
          "An access package policy in Identity Governance",
          "A conditional access policy in Azure AD",
          "The External collaboration settings in Azure AD"
        ],
        "answer": 1
      },
      {
        "label": "To block access for users who have litwareinc.com email addresses, configure:",
        "options": [
          "An access package assignment in Identity Governance",
          "An access package policy in Identity Governance",
          "A conditional access policy in Azure AD",
          "The External collaboration settings in Azure AD"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Para liberar só fabrikam.com, use a **política do access package** (usuários específicos da organização conectada). Para bloquear litwareinc.com no tenant, use a lista de domínios negados nas **External collaboration settings**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-access-package-request-policy",
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-access-package-create"
    ]
  },
  {
    "id": "Q181",
    "src": 181,
    "domain": 4,
    "topic": "Microsoft Sentinel",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant named contoso.com that has Azure AD Identity Protection policies enforced.\n\nYou create an Azure Sentinel instance and configure the Azure Active Directory connector.\n\nYou need to ensure that Azure Sentinel can generate incidents based on the risk alerts raised by Azure AD Identity Protection.\n\nWhat should you do first?",
    "options": [
      "Add a Microsoft Sentinel data connector.",
      "Configure the Notify settings in Azure AD Identity Protection.",
      "Create a Microsoft Sentinel playbook.",
      "Modify the Diagnostics settings in Azure AD."
    ],
    "answer": 0,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Os alertas do ID Protection entram no Sentinel por um **data connector** (Microsoft Entra ID Protection ou Defender XDR) com regras que geram incidentes. Sentinel é periférico ao SC-300 — borderline.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/sentinel/connect-azure-ad-identity-protection"
    ]
  },
  {
    "id": "Q182",
    "src": 182,
    "domain": 4,
    "topic": "Azure Monitor — alertas",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "ALERTS"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou use Azure Monitor to analyze Azure Active Directory (Azure AD) activity logs. You receive more than 100 email alerts each day for failed Azure AD user sign-in attempts.\n\nYou need to ensure that a new security administrator receives the alerts instead of you.\n\nSolution: From Azure AD, you create an assignment for the Insights administrator role.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Insights administrator é uma função do Viva Insights e não muda quem recebe e-mails de alerta do Azure Monitor."
  },
  {
    "id": "Q183",
    "src": 183,
    "domain": 4,
    "topic": "Azure Monitor — alertas",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "ALERTS"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou use Azure Monitor to analyze Azure Active Directory (Azure AD) activity logs. You receive more than 100 email alerts each day for failed Azure AD user sign-in attempts.\n\nYou need to ensure that a new security administrator receives the alerts instead of you.\n\nSolution: From Azure AD, you modify the Diagnostics settings.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "answer_original": 0,
    "shuffle": false,
    "scope": "in",
    "review": "corrigida",
    "explanation": "Diagnostic settings definem **para onde os logs vão** (workspace, storage, event hub), não quem recebe e-mails de alerta. Quem recebe o e-mail é definido no **action group** da regra de alerta. O dump marcava Sim."
  },
  {
    "id": "Q184",
    "src": 184,
    "domain": 4,
    "topic": "Azure Monitor — alertas",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "ALERTS"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou use Azure Monitor to analyze Azure Active Directory (Azure AD) activity logs. You receive more than 100 email alerts each day for failed Azure AD user sign-in attempts.\n\nYou need to ensure that a new security administrator receives the alerts instead of you.\n\nSolution: From Azure Monitor, you create a data collection rule. Does this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Uma data collection rule define a coleta de dados, não os destinatários de alertas."
  },
  {
    "id": "Q185",
    "src": 185,
    "domain": 4,
    "topic": "Diagnostic settings",
    "type": "single",
    "stem": "You have an Azure Active Directory Premium P2 tenant.\n\nYou create a Log Analytics workspace.\n\nYou need to ensure that you can view Azure Active Directory (Azure AD) audit log information by using Azure Monitor.\n\nWhat should you do first?",
    "options": [
      "Run the Set-AzureADTenantDetail cmdlet.",
      "Create an Azure AD workbook.",
      "Modify the Diagnostics settings for Azure AD.",
      "Run the Get-AzureADAuditDirectoryLogs cmdlet."
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Para enviar audit/sign-in logs ao Log Analytics, configure as **Diagnostic settings** do Entra ID apontando para o workspace.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/howto-integrate-activity-logs-with-log-analytics"
    ]
  },
  {
    "id": "Q186",
    "src": 186,
    "domain": 4,
    "topic": "PIM — configurações de função",
    "type": "yesno",
    "stem": "You have an Azure Active Directory (Azure AD) tenant contains the users shown in the following table.\n\n![Exhibit](img/S186-stem-1.png){w=611}\n\nIn Azure AD Privileged Identity Management (PIM), you configure the Global administrator role as shown in the following exhibit.\n\n![Exhibit](img/S186-stem-2.png){w=611}\n\nUser1 is eligible for the Global administrator role.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 requires Azure Multi-Factor Authentication (MFA) to activate the Global administrator role.",
      "User2 must approve all activation requests for the Global administrator role.",
      "User2 and User3 can edit the Global administrator role assignment."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "\"On activation, require Azure MFA\" = Yes: User1 precisa de MFA (Sim). Não há aprovação exigida (Não). O Privileged Authentication Administrator gerencia métodos de autenticação, **não** atribuições de função, então a afirmação sobre User2 **e** User3 é falsa (Não)."
  },
  {
    "id": "Q187",
    "src": 187,
    "domain": 4,
    "topic": "Entitlement management",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that contains the following:\n\n- An Azure Active Directory (Azure AD) tenant that has an Azure Active Directory Premium P2 license\n- A Microsoft SharePoint Online site named Site1\n- A Microsoft Teams team named Team1\n\nYou need to create an entitlement management workflow to manage Site1 and Team1.\n\nWhat should you do first?",
    "options": [
      "Configure an app registration.",
      "Create an Administrative unit.",
      "Create an access package.",
      "Create a catalog."
    ],
    "answer": 2,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O dump marca **criar o access package**, já que existe o catálogo General por padrão. Parte da comunidade defende criar um **catálogo** primeiro. Confira a discussão."
  },
  {
    "id": "Q188",
    "src": 188,
    "domain": 4,
    "topic": "Azure Monitor — alertas",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "ALERTS"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou use Azure Monitor to analyze Azure Active Directory (Azure AD) activity logs. You receive more than 100 email alerts each day for failed Azure AD user sign-in attempts.\n\nYou need to ensure that a new security administrator receives the alerts instead of you.\n\nSolution: From Azure Monitor, you modify the action group.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 0,
    "answer_original": 1,
    "shuffle": false,
    "scope": "in",
    "review": "corrigida",
    "explanation": "Os destinatários de e-mail de uma regra de alerta são definidos no **action group**. Alterar o action group para o novo administrador atende. O dump marcava Não."
  },
  {
    "id": "Q189",
    "src": 189,
    "domain": 4,
    "topic": "Access reviews",
    "type": "yesno",
    "stem": "Your network contains an on-premises Active Directory domain that syncs to an Azure Active Directory (Azure AD) tenant.\n\nThe tenant contains the groups shown in the following table.\n\n![Exhibit](img/S189-stem-1.png){w=611}\n\nThe tenant contains the users shown in the following table.\n\n![Exhibit](img/S189-stem-2.png){w=611}\n\nYou create an access review as shown in the following table.\n\n![Exhibit](img/S189-stem-3.png){w=611}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 will be removed automatically from Group 1 if the user does not respond to the review request.",
      "User 2 will be removed automatically from Group 3 if the user does not respond to the review request.",
      "User 3 will be removed automatically from Group 2 if the user does not respond to the review"
    ],
    "answer": [
      false,
      false,
      false
    ],
    "answer_original": [
      false,
      true,
      false
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "User1 está no Group1, que é membro do Group3. A revisão de grupo vale para membros **diretos** do Group3, então User1 não é removido do Group1 (Não). User2 nem é membro do Group3; além disso, o Group2 é sincronizado do AD, e a revisão não remove membros de grupos on-premises (Não). User3 não é membro do Group2 (Não). O dump marcava Sim na segunda.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/access-reviews-overview"
    ]
  },
  {
    "id": "Q190",
    "src": 190,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains a web app named App1. Guest users are regularly granted access to App1.\n\nYou need to ensure that the guest users that have NOT accessed App1 during the past 30 days have their access removed. The solution must minimize administrative effort.\n\nWhat should you configure?",
    "options": [
      "a Conditional Access policy",
      "a compliance policy",
      "a guest access review",
      "an access review for application access"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Access review de **acesso a aplicativo**, focada em guests e recorrente, com a recomendação de remover quem não entrou em 30 dias e aplicação automática.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q191",
    "src": 191,
    "domain": 4,
    "topic": "Licenciamento de access reviews",
    "type": "hotarea",
    "stem": "You have an Azure Active Directory (Azure AD) ten-ant: that contains the groups shown in the following table.\n\n![Exhibit](img/S191-stem-1.png){w=593}\n\nYou create an access review for Group1 as shown in the following table.\n\n![Exhibit](img/S191-stem-2.png){w=452}\n\nYou create an access review for Group2 as shown in the following table.\n\n![Exhibit](img/S191-stem-3.png){w=488}\n\nWhat is the minimum member of Azure Active Directory Premium P2 licenses required for each group? To answer, select the appropriate, options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Group1:",
        "options": [
          "1",
          "500",
          "525"
        ],
        "answer": 1
      },
      {
        "label": "Group2:",
        "options": [
          "1",
          "100",
          "295",
          "395"
        ],
        "answer": 0
      }
    ],
    "answer_original": [
      2,
      0
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Precisa de licença (P2/ID Governance) cada usuário **membro** que se autorrevisa ou atua como revisor. Group1 (auto-revisão de todos): **500** internos. Guests são cobertos pelo modelo MAU do External ID e não exigem licença por usuário. Group2 (o dono revisa os guests): **1** licença, a do dono. O dump marcava 525 para o Group1.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/access-reviews-overview#license-requirements"
    ]
  },
  {
    "id": "Q192",
    "src": 192,
    "domain": 4,
    "topic": "Entitlement management — ciclo de vida de externos",
    "type": "yesno",
    "stem": "You have an Azure Active Directory (Azure AD) tenant named contoso.com that contains a group named All Company and has the following Identity Governance settings:\n\n- Block external users from signing in to this directory: Yes\n- Remove external user. Yes\n- Number of days before removing external user from this directory: 30\n\nOn February 28, 2022, you create an access package named Package1 that has the following settings:\n\n- Resource roles 1. Name: All Company 2. Type: Group and Team 3. Role: Member\n- Lifecycle 1. Access package assignment expire: On date 2. Assignment expiration date: April 1, 2022\n\nOn March 1, 2022, you assign Package1 to the guest users shown in the following table.\n\n![Exhibit](img/S192-stem-1.png){w=389}\n\nOn March 2, 2022, you assign the Reports reader role to Guest1. On April 1, 2022, you invite a guest user named Guest3 to contoso.com. On April 4, 2022, you add Guest3 to the All Company group.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "On May 5, 2022, the Guest1 account is in contoso.com.",
      "On May 5, 2022, the Guest2 account is in contoso.com.",
      "On May 5, 2022, the Guest3 account is in contoso.com."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Guest1 e Guest2 entraram pelo access package. Quando a atribuição expira (1º de abril), eles são bloqueados e removidos 30 dias depois, antes de 5 de maio (a função de diretório não impede a remoção). Guest3 foi convidado diretamente, fora do access package, então a regra não se aplica e ele continua no tenant.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-access-package-lifecycle-policy",
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-external-users"
    ]
  },
  {
    "id": "Q193",
    "src": 193,
    "domain": 4,
    "topic": "Terms of use",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant named Contoso that contains a terms of use (Toll) named Terms1 and an access package. Contoso users collaborate with an external organization named Fabrikam. Fabrikam users must accept Terms1 before being allowed to use the access package. You need to identify which users accepted or declined Terms1.\n\nWhat should you use?",
    "options": [
      "sign-in logs",
      "the Usage and Insights report",
      "provisioning logs",
      "audit logs"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Cada aceite ou recusa de termos de uso gera evento nos **audit logs**. O próprio blade de Terms of use também mostra quem aceitou ou recusou.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/terms-of-use"
    ]
  },
  {
    "id": "Q194",
    "src": 194,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.\n\n![Exhibit](img/S194-stem-1.png){w=333}\n\nUser1 is the owner of Group1.\n\nYou create an access review that has the following settings:\n\n- What to review: Teams + Groups\n- Scope: All users\n- Group: Group1\n- Reviewers: Users review their own access\n\nWhich users can perform access reviews for User3?",
    "options": [
      "User1 only",
      "User3 only",
      "User1 and User2 only",
      "User1, User2, and User3"
    ],
    "answer": 1,
    "answer_original": 0,
    "scope": "in",
    "review": "corrigida",
    "explanation": "Com \"Users review their own access\", cada usuário, inclusive o **guest** User3, revisa o próprio acesso. A exceção da nota do dump vale para usuários **B2B direct connect** (canais compartilhados do Teams), o que não é o caso. O dump marcava User1.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q195",
    "src": 195,
    "domain": 4,
    "topic": "PIM — aprovação e duração",
    "type": "yesno",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains three users named User1, User2, and User3.\n\nYou create a group named Group1. You add User2 and User3 to Group1. You configure a role in Azure AD Privileged Identity Management (PIM) as shown in the Application Administrator exhibit. (Click the Application Administrator tab.)\n\n![Exhibit](img/S195-stem-1.png){w=611}\n\nGroup1 is configured as the approver for the Application administrator role. You configure User2 to be eligible for the Application administrator role. For User1 you add an assignment to the Application administrator role as shown in the Assignment exhibit. (Click the Assignment tab.)\n\n![Exhibit](img/S195-stem-2.png){w=611}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 is assigned the Application administrator role automatically.",
      "When User2 requests to be assigned the Application administrator role, only User3 can approve the request.",
      "If a request by User1 to be assigned the Application administrator role is approved on January 31, 2021, at 23:00, User1 can use the role until February 1, 2021, at 04:00."
    ],
    "answer": [
      false,
      true,
      false
    ],
    "answer_original": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "User1 recebeu atribuição **elegível**, não ativa, e precisa ativar com aprovação (Não). O Group1 (User2 e User3) aprova, mas ninguém aprova a própria solicitação, então só o User3 pode aprovar a do User2 (Sim). A ativação nunca passa do fim da atribuição elegível (31/01 23:59), então o User1 não usa a função até 04:00 de 1º/02 (Não). O dump marcava Não/Não/Sim; a comunidade diverge na terceira."
  },
  {
    "id": "Q196",
    "src": 196,
    "domain": 4,
    "topic": "Access reviews — configurações",
    "type": "multi",
    "layout": "panel",
    "panelTitle": "Access review settings",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou create an access review for Azure Active Directory (Azure AD) roles. You need to ensure that users who do not respond to review requests are removed automatically from the roles. The solution must minimize administrative effort.\n\nWhich two settings should you modify? To answer, select the settings in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "Reviewers",
      "Auto apply results to resource",
      "If reviewers don't respond",
      "Action to apply on denied guest users",
      "At end of review, send notification to",
      "Show recommendations",
      "Require reason on approval",
      "Mail notifications",
      "Reminders",
      "Additional content for reviewer email"
    ],
    "answer": [
      0,
      2
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Para remover automaticamente quem não responde, altere **If reviewers don't respond** para *Remove access* (o Auto apply já está habilitado). O gabarito também aponta **Reviewers** (Members/self) como a outra configuração a ajustar.",
    "refs": [
      "https://blog.quadrotech-it.com/blog/how-to-manage-guest-access-in-azure-active-directory-pt-1/"
    ]
  },
  {
    "id": "Q197",
    "src": 197,
    "domain": 1,
    "topic": "Licenciamento por grupo",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO_A"
    },
    "stem": "You need to allocate licenses to the new users from ADatum. The solution must meet the technical requirements. Which type of object should you create?",
    "options": [
      "a Dynamic User security group",
      "a distribution group",
      "an OU",
      "an administrative unit"
    ],
    "answer": 0,
    "answer_original": 3,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Licenças só podem ser atribuídas a **grupos** (não a unidades administrativas). Para licenciar automaticamente os novos usuários, use um **grupo dinâmico de usuários**; a AU serve para limitar o escopo dos helpdesks. O dump marcava unidade administrativa.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/administrative-units"
    ]
  },
  {
    "id": "Q198",
    "src": 198,
    "domain": 1,
    "topic": "Entra Connect Sync",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO_A"
    },
    "stem": "You need to sync the ADatum users. The solution must meet the technical requirements.\n\nWhat should you do?",
    "options": [
      "From the Microsoft Azure Active Directory Connect wizard, select Customize synchronization options.",
      "From PowerShell, run Set-ADSyncScheduler.",
      "From PowerShell, run Start-ADSyncSyncCycle.",
      "From the Microsoft Azure Active Directory Connect wizard, select Change user sign-in."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Só a OU Contoso_Resources é sincronizada. Para incluir os usuários da ADatum, abra o assistente e use **Customize synchronization options** para adicionar a OU."
  },
  {
    "id": "Q201",
    "src": 201,
    "domain": 1,
    "topic": "Licenciamento por grupo dinâmico",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO_B"
    },
    "stem": "You need to configure the assignment of Azure AD licenses to the Litware users. The solution must meet the licensing requirements.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Azure AD Connect settings to modify:",
        "options": [
          "Directory Extensions",
          "Domain Filtering",
          "Optional Features"
        ],
        "answer": 0
      },
      {
        "label": "Assign Azure AD licenses to:",
        "options": [
          "An Azure Active Directory group that has only nested groups",
          "An Azure Active Directory group that has the Assigned membership type",
          "An Azure Active Directory group that has the Dynamic User membership type"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Para levar o atributo personalizado LWLicenses ao Entra ID, habilite **Directory Extensions** no Entra Connect. Depois atribua as licenças a um **grupo dinâmico de usuários**, com regra baseada na extensão."
  },
  {
    "id": "Q202",
    "src": 202,
    "domain": 2,
    "topic": "ID Protection",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO_B"
    },
    "stem": "You need to meet the authentication requirements for leaked credentials.\n\nWhat should you do?",
    "options": [
      "Enable password hash synchronization in Azure AD Connect.",
      "Configure Azure AD Password Protection.",
      "Configure an authentication method policy in Azure AD.",
      "Enable federation with PingFederate in Azure AD Connect."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "A detecção de **leaked credentials** compara hashes vazados com os hashes de senha sincronizados: exige **password hash synchronization**, mesmo usando federação/PTA para autenticar.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/security/fundamentals/steps-secure-identity"
    ]
  },
  {
    "id": "Q203",
    "src": 203,
    "domain": 2,
    "topic": "Delegação de funções",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO_B"
    },
    "stem": "You need to identify which roles to use for managing role assignments. The solution must meet the delegation requirements.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "To manage Azure AD built-in role assignments, use:",
        "options": [
          "Global administrator",
          "Privileged role administrator",
          "Security administrator",
          "User access administrator"
        ],
        "answer": 1
      },
      {
        "label": "To manage Azure built-in role assignments, use:",
        "options": [
          "Global administrator",
          "Privileged role administrator",
          "Security administrator",
          "User access administrator"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Atribuições de funções do Entra ID (com menor privilégio): **Privileged role administrator**. Atribuições de funções RBAC do Azure: **User Access Administrator**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal",
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference"
    ]
  },
  {
    "id": "Q204",
    "src": 204,
    "domain": 1,
    "topic": "Grupos dinâmicos",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO_B"
    },
    "stem": "You need to create the LWGroup1 group to meet the management requirements. How should you complete the dynamic membership rule? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "(user.objectId -ne [answer choice])",
        "options": [
          "\"Guest\"",
          "\"Member\"",
          "Null"
        ],
        "answer": 2
      },
      {
        "label": "and (user.userType -eq [answer choice])",
        "options": [
          "\"Guest\"",
          "\"Member\"",
          "Null"
        ],
        "answer": 1
      }
    ],
    "answer_original": [
      0,
      1
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Grupo só de membros (sem guests): `(user.objectId -ne null) and (user.userType -eq \"Member\")`. O dump marcava \"Guest\" no primeiro campo, o que não faz sentido para objectId."
  },
  {
    "id": "Q205",
    "src": 205,
    "domain": 2,
    "topic": "ID Protection — risco de usuário",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO_A"
    },
    "stem": "You need to meet the technical requirements for the probability that user identities were compromised.\n\nWhat should the users do first, and what should you configure? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "The users must first:",
        "options": [
          "Provide consent for any app to access the data of Contoso.",
          "Register for multi-factor authentication (MFA).",
          "Register for self-service password reset (SSPR)."
        ],
        "answer": 1
      },
      {
        "label": "You must configure:",
        "options": [
          "A sign-in risk policy",
          "A user risk policy",
          "An Azure AD Password Protection policy"
        ],
        "answer": 1
      }
    ],
    "answer_original": [
      2,
      1
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "\"Forçar troca de senha quando houver probabilidade de comprometimento\" é a **política de risco de usuário** com *Require password change*. Essa troca segura exige que o usuário passe por MFA antes, então os usuários precisam **se registrar no MFA** primeiro. O dump marcava registro no SSPR.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/concept-identity-protection-policies"
    ]
  },
  {
    "id": "Q206",
    "src": 206,
    "domain": 2,
    "topic": "Conditional Access — localizações",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO_B"
    },
    "stem": "You need to configure the MFA settings for users who connect from the Boston office. The solution must meet the authentication requirements and the access requirements.\n\nWhat should you include in the configuration?",
    "options": [
      "named locations that have a private IP address range",
      "named locations that have a public IP address range",
      "trusted IPs that have a public IP address range",
      "trusted IPs that have a private IP address range"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O Entra vê o IP **público** (NAT) do escritório. O caminho recomendado é **named location com o intervalo público** em Conditional Access; Trusted IPs são da configuração legada de MFA.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/location-condition"
    ]
  },
  {
    "id": "Q207",
    "src": 207,
    "domain": 2,
    "topic": "Registro de MFA",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO_B"
    },
    "stem": "You need to support the planned changes and meet the technical requirements for MFA.\n\nWhich feature should you use, and how long before the users must complete the registration? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Feature:",
        "options": [
          "An authentication method policy",
          "A Conditional Access policy",
          "An MFA registration policy",
          "The Multi-Factor Authentication Server settings"
        ],
        "answer": 1
      },
      {
        "label": "Grace period:",
        "options": [
          "7 days",
          "14 days",
          "28 days"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O requisito do caso é aplicar MFA **por políticas de Conditional Access**. O período de carência de **14 dias** para registro vem do MFA registration policy / registration campaign. O gabarito combina CA + 14 dias; parte da comunidade argumenta que a feature correta seria a MFA registration policy (compare com a Q106).",
    "refs": [
      "https://www.syskit.com/blog/using-azure-conditional-access-when-security-defaults-isnt-enough/"
    ]
  },
  {
    "id": "Q208",
    "src": 208,
    "domain": 3,
    "topic": "Registro de aplicativos",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO_A"
    },
    "stem": "You need to meet the planned changes and technical requirements for App1.\n\nWhat should you implement?",
    "options": [
      "a policy set in Microsoft Endpoint Manager",
      "an app configuration policy in Microsoft Endpoint Manager",
      "an app registration in Azure AD",
      "Azure AD Application Proxy"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Um app web de linha de negócio que autentica contas do Entra precisa de um **app registration** (redirect URI, credenciais). O Application Proxy é para apps on-premises.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app"
    ]
  },
  {
    "id": "Q209",
    "src": 209,
    "domain": 2,
    "topic": "Application Proxy e SharePoint",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO_B"
    },
    "stem": "You need to implement on-premises application and SharePoint Online restrictions to meet the authentication requirements and the access requirements.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "For on-premises applications:",
        "options": [
          "Configure Cloud App Security policies.",
          "Modify the User consent settings for the enterprise applications.",
          "Publish the applications by using Azure AD Application Proxy."
        ],
        "answer": 2
      },
      {
        "label": "For SharePoint Online:",
        "options": [
          "Configure app-enforced restrictions.",
          "Modify the User consent settings for the enterprise applications.",
          "Publish an application by using Azure AD Application Proxy."
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Apps on-premises: publique pelo **Application Proxy**, para que o Conditional Access (MFA) seja aplicado. SharePoint Online com controles de sessão: **app-enforced restrictions**, usadas na política de CA.",
    "refs": [
      "https://docs.microsoft.com/en-us/sharepoint/app-enforced-restrictions",
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-session"
    ]
  },
  {
    "id": "Q210",
    "src": 210,
    "domain": 3,
    "topic": "Registro de aplicativos",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO_B"
    },
    "stem": "You need to configure app registration in Azure AD to meet the delegation requirements.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Azure AD tenant-level setting to modify:",
        "options": [
          "Allow users to register application",
          "Users can consent to apps accessing company data on their behalf",
          "Users can request admin consent to apps they are unable to consent to"
        ],
        "answer": 0
      },
      {
        "label": "Role to assign to User1:",
        "options": [
          "Application administrator",
          "Application developer",
          "Cloud application administrator"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Para impedir que usuários comuns registrem apps, defina **Users can register applications = No**. Para o User1 continuar registrando com menor privilégio: **Application developer**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/delegate-app-roles"
    ]
  },
  {
    "id": "Q211",
    "src": 211,
    "domain": 2,
    "topic": "Password Protection",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO_B"
    },
    "stem": "You need to implement a banned password list for the litware.com forest. What should you do?",
    "slots": [
      {
        "label": "Configure the Azure AD Password Protection proxy service on:",
        "options": [
          "DC1",
          "SERVER1",
          "SERVER2"
        ],
        "answer": 2
      },
      {
        "label": "Configure the password list:",
        "options": [
          "In Azure AD",
          "On DC1",
          "On SERVER1",
          "On SERVER2"
        ],
        "answer": 0
      }
    ],
    "answer_original": [
      2,
      1
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "O proxy do Password Protection vai em um servidor membro, mas não no SERVER1, porque o conector do Application Proxy usa uma versão incompatível do Agent Updater. Fica, então, no **SERVER2**. A lista de senhas banidas é configurada **no Entra ID** (Authentication methods > Password protection) e baixada pelos agentes dos DCs. O dump marcava \"On DC1\" para a lista.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-password-ban-bad-on-premises-deploy",
      "https://docs.microsoft.com/en-us/azure/active-directory/app-proxy/application-proxy-add-on-premises-application"
    ]
  },
  {
    "id": "Q212",
    "src": 212,
    "domain": 4,
    "topic": "Diagnostic settings",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO_A"
    },
    "stem": "You create a Log Analytics workspace.\n\nYou need to implement the technical requirements for auditing. What should you configure in Azure AD?",
    "options": [
      "Company branding",
      "Diagnostics settings",
      "External Identities",
      "App registrations"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Para enviar logs de auditoria do Entra ao Log Analytics (requisito de auditoria/Azure Monitor), configure as **Diagnostic settings**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/overview-monitoring"
    ]
  },
  {
    "id": "Q213",
    "src": 213,
    "domain": 4,
    "topic": "Entitlement management",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO_A"
    },
    "stem": "You need to implement the planned changes and technical requirements for the marketing department.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "To configure user access:",
        "options": [
          "An access package",
          "An access review",
          "A conditional access policy"
        ],
        "answer": 0
      },
      {
        "label": "To enable collaboration with fabrikam.com:",
        "options": [
          "An accepted domain",
          "A connected organization",
          "A custom domain name"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Fluxo de aprovação para acesso a site, grupo e app: **access package**. Colaboração com a Fabrikam (outro tenant Entra): **connected organization**.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-organization"
    ]
  },
  {
    "id": "Q214",
    "src": 214,
    "domain": 4,
    "topic": "PIM",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO_A"
    },
    "stem": "You need to meet the planned changes for the User administrator role.\n\nWhat should you do?",
    "options": [
      "Create an access review.",
      "Create an administrative unit.",
      "Modify Active assignments.",
      "Modify Role settings."
    ],
    "answer": 3,
    "answer_original": 2,
    "scope": "in",
    "review": "corrigida",
    "explanation": "Exigir justificativa e aprovação para ativar o User administrator é feito nas **Role settings** do PIM para essa função. Modificar atribuições ativas não cria esse controle. O dump marcava \"Modify Active assignments\".",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-how-to-add-role-to-user?tabs=new"
    ]
  },
  {
    "id": "Q215",
    "src": 215,
    "domain": 4,
    "topic": "PIM",
    "type": "multi",
    "group": {
      "kind": "case",
      "id": "CONTOSO_A"
    },
    "stem": "You need to modify the settings of the User administrator role to meet the technical requirements. Which two actions should you perform for the role? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "Select Require justification on activation.",
      "Select Require ticket information on activation.",
      "Modify the Expire eligible assignments after setting.",
      "Set all assignments to Eligible.",
      "Set all assignments to Active."
    ],
    "answer": [
      0,
      3
    ],
    "answer_original": [
      0,
      4
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Para exigir justificativa (e aprovação) **na ativação**, as atribuições precisam ser **Eligible**, e a Role setting **Require justification on activation** precisa estar marcada. Atribuições Active não passam por ativação. O dump marcava Active.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings"
    ]
  },
  {
    "id": "Q218",
    "src": 218,
    "domain": 4,
    "topic": "Microsoft Sentinel",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO_B"
    },
    "stem": "You need to configure the detection of multi-staged attacks to meet the monitoring requirements. What should you do?",
    "options": [
      "Customize the Microsoft Sentinel rule logic.",
      "Create a workbook.",
      "Add Microsoft Sentinel data connectors.",
      "Add an Microsoft Sentinel playbook."
    ],
    "answer": 0,
    "scope": "borderline",
    "review": "ok",
    "explanation": "A detecção multiestágio é feita pela regra **Fusion** do Sentinel, ajustando a lógica da regra (os conectores já existem). Sentinel é periférico ao SC-300 — borderline."
  },
  {
    "id": "Q219",
    "src": 219,
    "domain": 4,
    "topic": "Entitlement management",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO_B"
    },
    "stem": "You need to track application access assignments by using Identity Governance. The solution must meet the delegation requirements.\n\nWhat should you do first?",
    "options": [
      "Modify the User consent settings for the enterprise applications.",
      "Create a catalog.",
      "Create a program.",
      "Modify the Admin consent requests settings for the enterprise applications."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Para delegar a gestão de acesso a apps no Identity Governance, comece criando um **catálogo** com os recursos e defina seus owners/managers.",
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-overview"
    ]
  },
  {
    "id": "Q220",
    "src": 220,
    "domain": 3,
    "topic": "Defender for Cloud Apps",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou need to create a Microsoft Defender for Cloud Apps session policy. What should you do first?",
    "options": [
      "From the Microsoft Defender for Cloud Apps portal, select User monitoring.",
      "From the Microsoft Defender for Cloud Apps portal, select App onboarding/maintenance.",
      "From the Azure Active Directory admin center, create a Conditional Access policy.",
      "From the Microsoft Defender for Cloud Apps portal, create a continuous report."
    ],
    "answer": 2,
    "answer_original": 0,
    "scope": "in",
    "review": "corrigida",
    "explanation": "Session policies exigem que o app esteja roteado pelo **Conditional Access App Control**, o que começa com uma política de **Conditional Access** usando esse controle de sessão. O dump marcava \"User monitoring\", que não é pré-requisito."
  },
  {
    "id": "Q221",
    "src": 221,
    "domain": 3,
    "topic": "Consentimento de apps",
    "type": "single",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.\n\n![Exhibit](img/S221-stem-1.png){w=443}\n\nYou add an enterprise application named App1 to Azure AD and set User1 as the owner of App1. App1 requires admin consent to access Azure AD before the app can be used.\n\nYou configure the Admin consent requests settings as shown in the following exhibit.\n\n![Exhibit](img/S221-stem-2.png){w=611}\n\nAdmin1, Admin2, Admin3, and User' are added as reviewers.\n\nWhich users can review and approve the admin consent requests?",
    "options": [
      "Admin1 only",
      "Admin1, Admin2 and Admin3 only",
      "Admin1, Admin2, and User1 only",
      "Admin1 and Admin2 only",
      "Admin1, Admin2, Admin3, and User1"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Para aprovar solicitações de consentimento, o revisor precisa ter **Global, Cloud application ou Application administrator**. Pela tabela: Admin1 e Admin2. Security administrator e o owner do app não aprovam."
  },
  {
    "id": "Q222",
    "src": 222,
    "domain": 3,
    "topic": "Defender for Cloud Apps",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains a Microsoft SharePoint Online site named Site1.\n\nYou need to be notified if a user downloads more than 50 files in one minute from Site1.\n\nWhich type of policy should you create in the Microsoft Defender for Cloud Apps portal?",
    "options": [
      "session policy",
      "activity policy",
      "file policy",
      "anomaly detection policy"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Alerta por volume/taxa de uma atividade (mais de 50 downloads em 1 minuto) é uma **activity policy** com parâmetros de taxa."
  },
  {
    "id": "Q223",
    "src": 223,
    "domain": 3,
    "topic": "Defender for Cloud Apps",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains a Microsoft SharePoint Online site named Site1. Site1 hosts PDF files.\n\nYou need to prevent users from printing the files directly from Site1. Which type of policy should you create in the Microsoft Defender for Cloud Apps portal?",
    "options": [
      "activity policy",
      "access policy",
      "file policy",
      "session policy"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Bloquear **impressão** durante a sessão no navegador é uma **session policy** (via Conditional Access App Control)."
  },
  {
    "id": "Q224",
    "src": 224,
    "domain": 3,
    "topic": "Defender for Cloud Apps",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that uses Microsoft Defender for Cloud Apps and Conditional Access policies.\n\nYou need to block access to cloud apps when a user is assessed as high risk. Which type of policy should you create in the Microsoft Defender for Cloud Apps portal?",
    "options": [
      "access policy",
      "OAuth app policy",
      "anomaly detection policy",
      "activity policy"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Bloquear o acesso em tempo real a apps com base em condições do usuário/dispositivo é uma **access policy** (via Conditional Access App Control)."
  },
  {
    "id": "Q225",
    "src": 225,
    "domain": 3,
    "topic": "Defender for Cloud Apps",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nUsers authorize third-party cloud apps to access their data.\n\nYou need to configure an alert that will be triggered when an app requires high permissions and is authorized by more than 20 users.\n\nWhich type of policy should you create in the Microsoft Defender for Cloud Apps portal?",
    "options": [
      "anomaly detection policy",
      "OAuth app policy",
      "access policy",
      "activity policy"
    ],
    "answer": 1,
    "answer_original": 3,
    "scope": "in",
    "review": "corrigida",
    "explanation": "**OAuth app policy** filtra apps por nível de permissão (alto) e número de usuários que autorizaram (mais de 20) e gera alerta. Activity policy olha atividades, não permissões de apps. O dump marcava activity policy."
  },
  {
    "id": "Q226",
    "src": 226,
    "domain": 3,
    "topic": "Permissões de API",
    "type": "single",
    "stem": "Your company has an Azure AD tenant that contains the users shown in the following table.\n\n![Exhibit](img/S226-stem-1.png){w=370}\n\nYou have the app registrations shown in the following table.\n\n![Exhibit](img/S226-stem-2.png){w=611}\n\nA company policy prevents changes to user permissions.\n\nWhich user can create appointments in the calendar of each user at the company?",
    "options": [
      "User1",
      "User2",
      "User3",
      "User4"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Criar compromissos no calendário de **todos** os usuários exige **Calendars.ReadWrite** do tipo **Application** (independe do usuário logado). Pela tabela, só o App2, usado por User2, tem essa permissão."
  },
  {
    "id": "Q227",
    "src": 227,
    "domain": 1,
    "topic": "Usuários excluídos",
    "type": "hotarea",
    "stem": "You have an Azure Active Directory (Azure AD) tenant that contains a user named User1.\n\nAn administrator deletes User1.\n\nYou need to identify the following:\n\n- How many days after the account of User1 is deleted can you restore the account?\n- Which is the least privileged role that can be used to restore User1?\n\nWhat should you identify? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Number of days:",
        "options": [
          "15",
          "30",
          "90",
          "180"
        ],
        "answer": 1
      },
      {
        "label": "Role:",
        "options": [
          "User administrator",
          "Network administrator",
          "Helpdesk administrator",
          "Domain name administrator"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Um usuário excluído fica em *soft delete* por **30 dias** e pode ser restaurado nesse período. A função de menor privilégio para restaurar é **User administrator** (o Helpdesk administrator não restaura)."
  },
  {
    "id": "Q228",
    "src": 228,
    "domain": 1,
    "topic": "Grupos",
    "type": "hotarea",
    "stem": "You have an Azure AD tenant that contains the groups shown in the following exhibit.\n\n![Exhibit](img/S228-stem-1.png){w=611}\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "You can add a managed identity to <answer choice>.",
        "options": [
          "Group2 only",
          "All Company and Group1 only",
          "Group2, Group3, and Group4 only",
          "All Company, Group1, and Group2 only",
          "All Company, Group1, Group2, Group3, and Group4"
        ],
        "answer": 0
      },
      {
        "label": "You can add an Azure AD cloud user to <answer choice>.",
        "options": [
          "Group2 only",
          "All Company and Group1 only",
          "Group2, Group3, and Group4 only",
          "All Company, Group1, and Group2 only",
          "All Company, Group1, Group2, Group3, and Group4"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Managed identities (service principals) só entram em grupos de **segurança atribuídos de nuvem**: o Group2. O Group3 é dinâmico, o Group4 é sincronizado e grupos M365 não aceitam service principals. Um usuário de nuvem entra em qualquer grupo **atribuído de nuvem** (All Company, Group1, Group2), mas não em dinâmicos nem em sincronizados."
  },
  {
    "id": "Q229",
    "src": 229,
    "domain": 1,
    "topic": "Grupos atribuíveis a funções",
    "type": "multi",
    "stem": "You have an Azure AD tenant that contains two users named User1 and User2. You plan to perform the following actions:\n\n- Create a group named Group1.\n- Add User1 and User2 to Group1.\n- Assign Azure AD roles to Group1.\n\nYou need to create Group1.\n\nWhich two settings can you use? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "Group type: Microsoft 365 - Membership type: Assigned",
      "Group type: Security - Membership type: Assigned",
      "Group type: Security - Membership type: Dynamic User",
      "Group type: Microsoft 365 - Membership type: Dynamic User",
      "Group type: Security - Membership type: Dynamic Device"
    ],
    "answer": [
      0,
      1
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Grupos com isAssignableToRole precisam ter associação **Assigned** (não dinâmica) e podem ser de **Segurança** ou **Microsoft 365**."
  },
  {
    "id": "Q230",
    "src": 230,
    "domain": 2,
    "topic": "Monitoramento do Entra ID",
    "type": "match",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou need to perform the following tasks:\n\n- Identify the locations and IP addresses used by Azure AD users to sign in.\n- Review the Azure AD security settings and identify improvement recommendations.\n- Identify changes to Azure AD users or service principals.\n\nWhat should you use for each task? To answer, drag the appropriate resources to the correct requirements. Each resource may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "Audit logs",
      "Identity secure score",
      "Provisioning logs",
      "Sign-in logs"
    ],
    "targets": [
      {
        "label": "Identify the locations and IP addresses used by Azure AD users to sign in:",
        "answer": 3
      },
      {
        "label": "Identify changes to Azure AD users or service principals:",
        "answer": 0
      },
      {
        "label": "Review the Azure AD security settings and identify improvement recommendations:",
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Locais e IPs de entrada: **Sign-in logs**. Alterações em usuários e service principals: **Audit logs**. Recomendações de melhoria de segurança: **Identity Secure Score**."
  },
  {
    "id": "Q231",
    "src": 231,
    "domain": 3,
    "topic": "Registro de aplicativos",
    "type": "single",
    "stem": "You have an Azure AD tenant that contains a user named User1 and a registered app named App1.\n\nUser1 deletes the app registration of App1.\n\nYou need to restore the app registration.\n\nWhat is the maximum number of days you have to restore the app registration from when it was deleted?",
    "options": [
      "14",
      "30",
      "60",
      "180"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Um app registration excluído fica em **Deleted applications** por **30 dias** e pode ser restaurado nesse período."
  },
  {
    "id": "Q232",
    "src": 232,
    "domain": 3,
    "topic": "Defender for Cloud Apps — OAuth",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 tenant.\n\nSometimes, users use external, third-party applications that require limited access to the Microsoft 365 data of the respective user. The users register the applications in Azure AD.\n\nYou need to receive an alert if a registered application gains read and write access to the users' email.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Tool to use:",
        "options": [
          "Azure AD Identity Protection",
          "Identity Governance",
          "Microsoft Defender for Cloud Apps",
          "Microsoft Endpoint Manager"
        ],
        "answer": 2
      },
      {
        "label": "Policy type to create:",
        "options": [
          "App discovery",
          "App protection",
          "Conditional access",
          "OAuth app",
          "Sign-in risk",
          "User risk"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Alertar quando um app OAuth recebe permissões de leitura e gravação no e-mail: **política de OAuth app** no **Microsoft Defender for Cloud Apps** (app governance)."
  },
  {
    "id": "Q233",
    "src": 233,
    "domain": 3,
    "topic": "Consentimento de apps",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "LITWARE"
    },
    "stem": "You need implement the planned changes for application access to organizational data.\n\nWhat should you configure?",
    "options": [
      "authentication methods",
      "the User consent settings",
      "access packages",
      "an application proxy"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "\"Exigir aprovação do administrador para acesso de apps a dados\" = desativar o consentimento do usuário nas **User consent settings** (e, idealmente, habilitar o fluxo de admin consent)."
  },
  {
    "id": "Q234",
    "src": 234,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "LITWARE"
    },
    "stem": "You need to implement the planned changes for Package1.\n\nWhich users can create and manage the access review?",
    "options": [
      "User3 only",
      "User4 only",
      "User5 only",
      "User3 and User4",
      "User3 and User5",
      "User4 and User5"
    ],
    "answer": 4,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Pelo dump, User3 e User5 podem criar a revisão do Package1 — conforme as funções da tabela do caso (Identity Governance administrator, Catalog owner ou Access package manager do catálogo). Confira a tabela do caso."
  },
  {
    "id": "Q235",
    "src": 235,
    "domain": 1,
    "topic": "Colaboração externa",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "LITWARE"
    },
    "stem": "You need to resolve the issue of the guest user invitations.\n\nWhat should you do for the Azure AD tenant?",
    "options": [
      "Configure the Continuous access evaluation settings.",
      "Configure a Conditional Access policy.",
      "Modify the External collaboration settings.",
      "Configure the Access reviews settings."
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "\"Somente usuários com funções de administrador específicas podem convidar\" é configurado em **External collaboration settings > Guest invite settings**."
  },
  {
    "id": "Q236",
    "src": 236,
    "domain": 4,
    "topic": "PIM",
    "type": "multi",
    "group": {
      "kind": "case",
      "id": "LITWARE"
    },
    "stem": "You need to modify the settings of the User administrator role to meet the technical requirements.\n\nWhich two actions should you perform for the role? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "Select Require justification on activation.",
      "Select Require ticket information on activation.",
      "Modify the Expire eligible assignments after setting.",
      "Set all assignments to Eligible.",
      "Set all assignments to Active."
    ],
    "answer": [
      2,
      3
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Para os User administrators **solicitarem** a função quando precisarem, as atribuições devem ser **Eligible**. O limite de até um ano vem de **Expire eligible assignments after** nas Role settings."
  },
  {
    "id": "Q237",
    "src": 237,
    "domain": 3,
    "topic": "Consentimento de apps",
    "type": "single",
    "stem": "You have an Azure AD tenant.\n\nYou configure User consent settings to allow users to provide consent to apps from verified publishers.\n\nYou need to ensure that the users can only provide consent to apps that require low impact permissions.\n\nWhat should you do?",
    "options": [
      "Create an enterprise application collection.",
      "Create an access review.",
      "Create an access package.",
      "Configure permission classifications."
    ],
    "answer": 3,
    "answer_original": 0,
    "scope": "in",
    "review": "corrigida",
    "explanation": "**Permission classifications** marcam quais permissões são de baixo impacto. Com a configuração \"publicadores verificados, permissões de baixo impacto\", o usuário só consente nessas. O dump marcava \"criar uma coleção\", que só organiza o My Apps."
  },
  {
    "id": "Q238",
    "src": 238,
    "domain": 3,
    "topic": "App governance",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 E5 subscription that contains a user named User1. You configure app governance integration.\n\nUser1 needs to view the App governance dashboard. The solution must use the principle of the least privilege.\n\nWhich role should you assign to User1, and which portal should User1 use to view the dashboard? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Role:",
        "options": [
          "Application Administrator",
          "Application Developer",
          "Cloud Application Administrator"
        ],
        "answer": 2
      },
      {
        "label": "Portal:",
        "options": [
          "The Microsoft 365 admin center",
          "The Microsoft 365 Defender portal",
          "The Microsoft Defender for Cloud Apps portal",
          "The Microsoft Purview compliance portal"
        ],
        "answer": 1
      }
    ],
    "answer_original": [
      0,
      1
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O dashboard de app governance fica no portal do **Microsoft Defender (Microsoft 365 Defender)**. Entre as opções, Application Administrator e Cloud Application Administrator dão acesso, e o Cloud Application Administrator é o de **menor privilégio** (não gerencia o Application Proxy). O dump marcava Application Administrator."
  },
  {
    "id": "Q239",
    "src": 239,
    "domain": 3,
    "topic": "Provisionamento de apps",
    "type": "single",
    "stem": "You have an Azure subscription.\n\nYou are evaluating enterprise software as a service (SaaS) apps. You need to ensure that the apps support automatic provisioning of Azure AD users.\n\nWhich specification should the apps support?",
    "options": [
      "OAuth 2.0",
      "WS-Fed",
      "SCIM 2.0",
      "LDAP 3"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O provisionamento automático de usuários do Entra para apps SaaS usa o protocolo **SCIM 2.0**."
  },
  {
    "id": "Q240",
    "src": 240,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains a user named User1. You need to ensure that User1 can create access reviews for Azure AD roles. The solution must use the principle of least privilege.\n\nWhich role should you assign to User1?",
    "options": [
      "Privileged role administrator",
      "Identity Governance Administrator",
      "User administrator",
      "User Access Administrator"
    ],
    "answer": 0,
    "answer_original": 2,
    "scope": "in",
    "review": "corrigida",
    "explanation": "Para criar access reviews de **funções do Entra ID** (via PIM), o mínimo é **Privileged role administrator**. User administrator não gerencia revisões de funções. O dump marcava User administrator."
  },
  {
    "id": "Q241",
    "src": 241,
    "domain": 4,
    "topic": "PIM — aprovação",
    "type": "yesno",
    "stem": "You have a Microsoft 365 E5 subscription that contains three users named User1, User2, and User3.\n\nYou have two Azure AD roles that have the Activation settings shown in the following table.\n\n![Exhibit](img/S241-stem-1.png){w=611}\n\nThe Azure AD roles have the Assignment settings shown in the following table.\n\n![Exhibit](img/S241-stem-2.png){w=611}\n\nThe Azure AD roles have the eligible users shown in the following table.\n\n![Exhibit](img/S241-stem-3.png){w=506}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "If User1 requests Role1, the request will be approved automatically.",
      "User1 can approve the request of User3 for Role2.",
      "User1 must provide justification to approve the request of User2 for Role1."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "answer_original": [
      true,
      false,
      true
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Role1 exige aprovação e o único aprovador é o User1, que **não pode aprovar a própria solicitação**: não há aprovação automática (Não). Role2 não exige aprovação, então não há o que o User1 aprovar (Não). Ao aprovar uma solicitação no PIM, o aprovador **sempre** informa uma justificativa (Sim). O dump marcava Sim na primeira."
  },
  {
    "id": "Q242",
    "src": 242,
    "domain": 3,
    "topic": "Application Proxy",
    "type": "hotarea",
    "stem": "You have a hybrid Microsoft 365 subscription that contains the users shown in the following table.\n\n![Exhibit](img/S242-stem-1.png){w=399}\n\nYou plan to deploy an on-premises app named App1. App1 will be registered in Azure AD and will use Azure AD Application Proxy.\n\nYou need to delegate the installation of the Application Proxy connector and ensure that User1 can register App1 in Azure AD. The solution must use the principle of least privilege.\n\nWhich user should perform the installation, and which role should you assign to User1? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "User that should perform the installation:",
        "options": [
          "Admin1",
          "Admin2",
          "Admin3",
          "Admin4"
        ],
        "answer": 1
      },
      {
        "label": "Assign User1 the role of:",
        "options": [
          "Application Administrator",
          "Application Developer",
          "Cloud Application Administrator",
          "Global Administrator"
        ],
        "answer": 1
      }
    ],
    "answer_original": [
      1,
      2
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Instalar o conector do Application Proxy exige no mínimo **Application Administrator** (Admin2). O Cloud Application Administrator não gerencia o Application Proxy. Para o User1 registrar o App1 com menor privilégio: **Application Developer**. O dump marcava Cloud Application Administrator."
  },
  {
    "id": "Q243",
    "src": 243,
    "domain": 1,
    "topic": "Quem pode redefinir senhas",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 E5 subscription that contains the users shown in the following table.\n\n![Exhibit](img/S243-stem-1.png){w=500}\n\nThe users are assigned the roles shown in the following table.\n\n![Exhibit](img/S243-stem-2.png){w=578}\n\nFor which users can User1 and User4 reset passwords? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "User 1:",
        "options": [
          "User3 only",
          "User2 and User5 only",
          "User3 and User5 only",
          "User2, User3, and User5 only",
          "User3, User4 and User5 only",
          "User2, User3, User4, and User5"
        ],
        "answer": 4
      },
      {
        "label": "User 4:",
        "options": [
          "User3 only",
          "User2 and User3 only",
          "User3 and User5 only",
          "User1, User2, and User3 only"
        ],
        "answer": 0
      }
    ],
    "answer_original": [
      5,
      3
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O Password Administrator redefine senha de **não administradores** e de Directory Readers, Guest Inviter e Password Administrator, mas **não** de Global Reader. O User1 (escopo de organização) atinge User3, User4 e User5. O User4 tem escopo na AU1 (User1, User2, User3). Administradores com escopo de AU não gerenciam usuários com funções atribuídas, então sobra só o User3. O gabarito do dump ignorava essas restrições (todos / User1, User2 e User3)."
  },
  {
    "id": "Q244",
    "src": 244,
    "domain": 4,
    "topic": "PIM",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains a user named User1. User is eligible for the Application administrator role.\n\nUser1 needs to configure a new connector group for an application proxy. What should you use to activate the role for User1?",
    "options": [
      "the Microsoft Defender for Cloud Apps portal",
      "the Microsoft 365 admin center",
      "the Azure Active Directory admin center",
      "the Microsoft 365 Defender portal"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "A ativação de funções elegíveis no PIM é feita no **Microsoft Entra admin center** (My roles), ou no portal do Azure."
  },
  {
    "id": "Q245",
    "src": 245,
    "domain": 4,
    "topic": "Relatórios",
    "type": "single",
    "stem": "You have an Azure subscription that contains a registered app named App1. You need to review the sign-in activity for App1. The solution must meet the following requirements:\n\n- Identify the number of failed sign-ins.\n- Identify the success rate of sign-ins.\n- Minimize administrative effort.\n\nWhat should you use?",
    "options": [
      "Sign-in logs",
      "Access reviews",
      "Audit logs",
      "Usage & insights"
    ],
    "answer": 3,
    "answer_original": 0,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O relatório **Usage & insights > Microsoft Entra application activity** mostra, por app, os logins com sucesso, as falhas e a taxa de sucesso já agregados (menor esforço que filtrar os sign-in logs). O dump marcava sign-in logs."
  },
  {
    "id": "Q246",
    "src": 246,
    "domain": 1,
    "topic": "Unidades administrativas",
    "type": "single",
    "stem": "Your company has an Azure AD tenant that contains a user named User1. The company has two departments named marketing and finance.\n\nYou need to grant permissions to User1 to manage only the users in the marketing department. The solution must ensure that User1 does NOT have permissions to manage the users in the finance department.\n\nWhat should you create first?",
    "options": [
      "a management group",
      "an administrative unit",
      "a resource group",
      "a Microsoft 365 group"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Para limitar o escopo de gestão aos usuários de marketing, crie uma **administrative unit** e atribua a função com esse escopo."
  },
  {
    "id": "Q247",
    "src": 247,
    "domain": 4,
    "topic": "Entitlement management",
    "type": "single",
    "stem": "You have an Azure AD tenant that contains an access package named Package1 and a user named User1. Package1 is configured as shown in the following exhibit.\n\n![Exhibit](img/S247-stem-1.png){w=611}\n\nYou need to ensure that User1 can modify the review frequency of Package1. The solution must use the principle of least privilege.\n\nWhich role should you assign to User1?",
    "options": [
      "Security administrator",
      "Privileged role administrator",
      "External Identity Provider administrator",
      "User administrator"
    ],
    "answer": 3,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O dump marca User administrator. A comunidade relata que hoje nenhuma das funções listadas altera a revisão de um access package — o mínimo seria **Identity Governance administrator** ou Catalog owner/Access package manager. Questão desatualizada."
  },
  {
    "id": "Q248",
    "src": 248,
    "domain": 2,
    "topic": "KQL — Sign-in logs",
    "type": "hotarea",
    "stem": "You have an Azure subscription.\n\nAzure AD logs are sent to a Log Analytics workspace.\n\nYou need to query the logs and graphically display the number of sign-ins per user.\n\nHow should you complete the query? To answer, select the appropriate options in the answer area,\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "SigninLogs | where ResultType == 0 | [answer choice] login_count = count() by Identity",
        "options": [
          "extend",
          "print",
          "project",
          "render",
          "summarize"
        ],
        "answer": 4
      },
      {
        "label": "| [answer choice] columnchart",
        "options": [
          "extend",
          "print",
          "project",
          "render",
          "summarize"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Agregar a contagem por usuário: **summarize** login_count = count() by Identity. Gerar o gráfico: **render** columnchart."
  },
  {
    "id": "Q249",
    "src": 249,
    "domain": 3,
    "topic": "Defender for Cloud Apps",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that uses Microsoft Defender for Cloud Apps.\n\nYou need to identify which users access Facebook from their devices and browsers. The solution must minimize administrative effort.\n\nWhat should you do first?",
    "options": [
      "Create a Conditional Access policy.",
      "Create a Defender for Cloud Apps access policy.",
      "Create an app configuration policy in Microsoft Endpoint Manager.",
      "From the Microsoft Defender for Cloud Apps portal, unsanction Facebook."
    ],
    "answer": 3,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Pelo dump, marcar o Facebook como **não sancionado** destaca o app na Cloud Discovery e permite acompanhar quem o usa. A comunidade diverge (access policy). Confira a discussão."
  },
  {
    "id": "Q250",
    "src": 250,
    "domain": 4,
    "topic": "PIM",
    "type": "single",
    "stem": "You have an Azure subscription that uses Azure AD Privileged Identity Management (PIM).\n\nYou need to identify users that are eligible for the Cloud Application Administrator role.\n\nWhich blade in the Privileged Identity Management settings should you use?",
    "options": [
      "Azure resources",
      "Privileged access groups",
      "Review access",
      "Azure AD roles"
    ],
    "answer": 3,
    "answer_original": 1,
    "scope": "in",
    "review": "corrigida",
    "explanation": "Elegíveis para uma função do **Entra ID** (Cloud Application Administrator) são consultados em PIM > **Microsoft Entra roles** (antes \"Azure AD roles\") > Assignments > Eligible. \"Privileged access groups\" trata de grupos. O dump marcava Privileged access groups."
  },
  {
    "id": "Q251",
    "src": 251,
    "domain": 1,
    "topic": "Grupos dinâmicos",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou need to create a dynamic user group that will include all the users that do NOT have a department defined in their user profile.\n\nHow should you complete the membership rule? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "(user.department [answer choice]",
        "options": [
          "-eq",
          "-match",
          "-ne",
          "-notIn"
        ],
        "answer": 0
      },
      {
        "label": "[answer choice])",
        "options": [
          "\"\"",
          "null",
          "$null",
          "\"null\""
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Para atributo vazio, use `null` sem aspas: `(user.department -eq null)`."
  },
  {
    "id": "Q254",
    "src": 254,
    "domain": 2,
    "topic": "Security defaults",
    "type": "single",
    "stem": "You plan to deploy a new Azure AD tenant.\n\nWhich multifactor authentication (MFA) method will be enabled by default for the tenant?",
    "options": [
      "Microsoft Authenticator",
      "SMS",
      "voice call",
      "email OTP"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Tenant novo vem com **security defaults**, que fazem o registro de MFA pelo **Microsoft Authenticator** (notificações)."
  },
  {
    "id": "Q255",
    "src": 255,
    "domain": 2,
    "topic": "Conditional Access — filtro de dispositivos",
    "type": "yesno",
    "stem": "You have a Microsoft 365 E5 subscription that contains a Microsoft SharePoint Online site named Site1 and the users shown in the following table.\n\n![Exhibit](img/S255-stem-1.png){w=277}\n\nThe users have the devices shown in the following table.\n\n![Exhibit](img/S255-stem-2.png){w=456}\n\nYou create the following two Conditional Access policies:\n\n- Name: CAPolicy1\n- Assignments o Users or workload identities: Group1 o Cloud apps or actions: Office 365 SharePoint Online o Conditions\n\nFilter for devices: Exclude filtered devices from the policy\n\nRule syntax: device.displayName -startsWith \"Device\" o Access controls\n\nGrant: Block access\n\nSession: 0 controls selected o Enable policy: On\n\n- Name: CAPolicy2\n- Assignments o Users or workload identities: Group2 o Cloud apps or actions: Office 365 SharePoint Online o Conditions: 0 conditions selected\n- Access controls o Grant: Grant access\n\nRequire multifactor authentication o Session: 0 controls selected\n\n- Enable policy: On\n\nAll users confirm that they can successfully authenticate using MFA. For each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can access Site1 from Device1.",
      "User2 can access Site1 from Device2.",
      "User3 can access Site1 from Device3."
    ],
    "answer": [
      false,
      true,
      true
    ],
    "answer_original": [
      false,
      true,
      false
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "CAPolicy1 bloqueia o Group1 e **exclui** dispositivos com nome iniciando em \"Device\". Para dispositivos **não registrados** (Device1) os atributos não existem, e no modo exclude com operador positivo a política é **aplicada**: User1 é bloqueado (Não). User2 usa MFA no Device2 (Sim). Device3 é registrado, tem displayName \"Device3\" e fica excluído do bloqueio; com MFA, o User3 acessa (Sim). O dump marcava Não na terceira."
  },
  {
    "id": "Q256",
    "src": 256,
    "domain": 3,
    "topic": "Restrições aplicadas pelo app",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains three users named User1, User2, and User3 and a Microsoft SharePoint Online site named Site1. The subscription contains the devices shown in the following table.\n\n![Exhibit](img/S256-stem-1.png){w=381}\n\nThe users sign in to the devices as shown in the following table.\n\n![Exhibit](img/S256-stem-2.png){w=191}\n\nYou have a Conditional Access policy that has the following settings:\n\n- Name: CA1\n- Assignments o Users and groups: User1, User2, User3 o Cloud apps or actions: SharePoint - Site1\n- Access controls o Session: Use app enforced restrictions\n\nFrom the SharePoint admin center, you configure Access control for unmanaged devices to allow limited, web-only access.\n\nWhich users will have full access to Site1?",
    "options": [
      "User1 only",
      "User2 only",
      "User3only",
      "User1 and User2 only",
      "User1, User2, and User3"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Para o SharePoint, dispositivo gerenciado = **compatível** (Intune) ou **hybrid joined**. Device1 é joined, mas não está conforme; Device3 não é conhecido. Só User2, no Device2 conforme, tem acesso completo."
  },
  {
    "id": "Q257",
    "src": 257,
    "domain": 2,
    "topic": "Security defaults",
    "type": "single",
    "stem": "You have an Azure AD tenant named contoso.com that contains the resources shown in the following table.\n\n![Exhibit](img/S257-stem-1.png){w=303}\n\nYou create a user named Admin1.\n\nYou need to ensure that Admin1 can enable Security defaults for contoso.com. What should you do first?",
    "options": [
      "Delete Package1.",
      "Delete CAPolicy1.",
      "Assign Admin1 the Authentication Administrator role for Au1.",
      "Configure Identity Governance."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Security defaults não podem ser ativados enquanto houver políticas de **Conditional Access**: exclua (ou desative) o CAPolicy1 primeiro."
  },
  {
    "id": "Q258",
    "src": 258,
    "domain": 3,
    "topic": "Managed identities via PowerShell",
    "type": "match",
    "stem": "You have an Azure subscription that is linked to an Azure AD tenant named contoso.com. The subscription contains a group named Group1 and a virtual machine named VM1.\n\nYou need to meet the following requirements:\n\n- Enable a system-assigned managed identity for VM1.\n- Add VM1 to Group1.\n\nHow should you complete the PowerShell script? To answer, drag the appropriate cmdlets to the correct targets. Each cmdlet may be used once, more than once or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "Get-AzADGroup",
      "Get-AzADServicePrincipal",
      "Get-AzVM",
      "Update-AzADServicePrincipal",
      "Update-AzVM"
    ],
    "targets": [
      {
        "label": "$vm = [cmdlet] -ResourceGroupName myResourceGroup -Name vm1",
        "answer": 2
      },
      {
        "label": "$displayname = [cmdlet] -displayname \"vm1\"",
        "answer": 1
      }
    ],
    "scope": "borderline",
    "review": "ok",
    "explanation": "`Get-AzVM` obtém a VM para habilitar a identidade system-assigned com `Update-AzVM -IdentityType SystemAssigned`. `Get-AzADServicePrincipal` obtém o service principal da identidade para adicioná-lo ao grupo. O script mistura o módulo AzureAD, que foi aposentado (Add-AzureADGroupMember); hoje usaria Microsoft Graph PowerShell. Por isso está como borderline."
  },
  {
    "id": "Q259",
    "src": 259,
    "domain": 3,
    "topic": "Registro de aplicativos",
    "type": "single",
    "stem": "You have an Azure AD tenant and a .NET web app named App1.\n\nYou need to register App1 for Azure AD authentication.\n\nWhat should you configure for App1?",
    "options": [
      "the executable name",
      "the bundle ID",
      "the package name",
      "the redirect URI"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Um app web .NET precisa da plataforma **Web** com **redirect URI** no registro. Bundle ID e package name são de apps iOS e Android."
  },
  {
    "id": "Q261",
    "src": 261,
    "domain": 3,
    "topic": "Consentimento de apps",
    "type": "single",
    "stem": "You have an Azure AD tenant.\n\nYou discover that a large number of new apps were added to the tenant. You need to implement an approval process for new enterprise applications. What should you do?",
    "options": [
      "From the Microsoft Defender for Cloud Apps portal, create a Cloud Discovery anomaly detection policy.",
      "From the Microsoft Entra admin center, configure the Admin consent settings.",
      "From the Microsoft Defender for Cloud Apps portal, configure an app connector.",
      "From the Microsoft Entra admin center, configure an access review."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Para exigir aprovação antes de novos apps acessarem o tenant, desative o consentimento do usuário e habilite o **fluxo de solicitação de admin consent**."
  },
  {
    "id": "Q262",
    "src": 262,
    "domain": 3,
    "topic": "App governance",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou purchase the app governance add-on license.\n\nYou need to enable app governance integration.\n\nWhich portal should you use?",
    "options": [
      "the Microsoft Defender for Cloud Apps portal",
      "the Microsoft 365 admin center",
      "Microsoft 365 Defender",
      "the Azure Active Directory admin center",
      "the Microsoft Purview compliance portal"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O app governance é ativado no portal do **Microsoft Defender** (antes Microsoft 365 Defender), em Settings > Cloud apps > App governance."
  },
  {
    "id": "Q263",
    "src": 263,
    "domain": 3,
    "topic": "Defender for Cloud Apps",
    "type": "single",
    "stem": "Your company purchases a new Microsoft 365 E5 subscription and an app named App1.\n\nYou need to create a Microsoft Defender for Cloud Apps access policy for App1. What should you do you first?",
    "options": [
      "Configure a Conditional Access policy to use app-enforced restrictions.",
      "Configure a Token configuration for App1.",
      "Add an API permission for App1.",
      "Configure a Conditional Access policy to use Conditional Access App Control."
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Access policies do Defender for Cloud Apps exigem que o app seja roteado por **Conditional Access App Control**: crie a política de CA com esse controle de sessão primeiro."
  },
  {
    "id": "Q264",
    "src": 264,
    "domain": 3,
    "topic": "Registro de aplicativos",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO_A"
    },
    "stem": "You need to meet the planned changes and technical requirements for App1. What should you implement?",
    "options": [
      "a policy set in Microsoft Intune",
      "Azure AD Application Proxy",
      "an app configuration policy in Microsoft Intune",
      "an app registration in Azure AD"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "App web próprio (Azure), acessível pela internet e autenticado com contas do Entra: **app registration**."
  },
  {
    "id": "Q265",
    "src": 265,
    "domain": 3,
    "topic": "Defender for Cloud Apps — OAuth",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "OAUTH"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have an Amazon Web Services (AWS) account, a Google Workspace subscription, and a GitHub account.\n\nYou deploy an Azure subscription and enable Microsoft 365 Defender. You need to ensure that you can monitor OAuth authentication requests by using Microsoft Defender for Cloud Apps.\n\nSolution: From the Microsoft 365 Defender portal, you add the Google Workspace app connector.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 0,
    "answer_original": 1,
    "shuffle": false,
    "scope": "in",
    "review": "corrigida",
    "explanation": "O gerenciamento de **OAuth apps** do Defender for Cloud Apps funciona com conectores de **Microsoft 365, Google Workspace e Salesforce**. Conectar o Google Workspace atende. O dump marcava Não."
  },
  {
    "id": "Q266",
    "src": 266,
    "domain": 3,
    "topic": "Defender for Cloud Apps — OAuth",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "OAUTH"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have an Amazon Web Services (AWS) account, a Google Workspace subscription, and a GitHub account.\n\nYou deploy an Azure subscription and enable Microsoft 365 Defender. You need to ensure that you can monitor OAuth authentication requests by using Microsoft Defender for Cloud Apps.\n\nSolution: From the Microsoft 365 Defender portal, you add the Microsoft Azure app connector.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O conector do Azure não fornece monitoramento de OAuth apps (só Microsoft 365, Google Workspace e Salesforce)."
  },
  {
    "id": "Q267",
    "src": 267,
    "domain": 3,
    "topic": "Defender for Cloud Apps — OAuth",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "OAUTH"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have an Amazon Web Services (AWS) account, a Google Workspace subscription, and a GitHub account.\n\nYou deploy an Azure subscription and enable Microsoft 365 Defender. You need to ensure that you can monitor OAuth authentication requests by using Microsoft Defender for Cloud Apps.\n\nSolution: From the Microsoft 365 Defender portal, you add the Amazon Web Services app connector.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "answer_original": 0,
    "shuffle": false,
    "scope": "in",
    "review": "corrigida",
    "explanation": "O conector da **AWS** traz auditoria/atividades da AWS, mas não habilita o gerenciamento de OAuth apps (só Microsoft 365, Google Workspace e Salesforce). O dump marcava Sim."
  },
  {
    "id": "Q268",
    "src": 268,
    "domain": 3,
    "topic": "Defender for Cloud Apps",
    "type": "single",
    "stem": "Your company purchases a Microsoft 365 E5 subscription.\n\nA user named User1 is assigned the Security Administrator role. You need to ensure that User1 can create Microsoft Defender for Cloud Apps session policies.\n\nWhat should you do first?",
    "options": [
      "Create a Conditional Access policy and select Require app protection policy.",
      "Create a Conditional Access policy and select Use Conditional Access App Control.",
      "Assign the Cloud Application Administrator role to User1.",
      "Assign the Cloud App Security Administrator role to User1."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O Security administrator já tem acesso total ao Defender for Cloud Apps. O que falta para session policies é rotear o app por uma política de **CA com Conditional Access App Control**."
  },
  {
    "id": "Q269",
    "src": 269,
    "domain": 4,
    "topic": "Diagnostic settings",
    "type": "single",
    "stem": "You have an Azure AD Premium P2 tenant.\n\nYou create a Log Analytics workspace.\n\nYou need to ensure that you can view Azure AD audit log information by using Azure Monitor.\n\nWhat should you do first?",
    "options": [
      "Modify the Diagnostics settings for Azure AD.",
      "Run the Update-MgOrganization cmdlet.",
      "Run the Update-MgDomain cmdlet.",
      "Create an Azure AD workbook."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Para ver os audit logs no Azure Monitor/Log Analytics, configure as **Diagnostic settings** do Entra para enviar ao workspace."
  },
  {
    "id": "Q271",
    "src": 271,
    "domain": 1,
    "topic": "Política de nomenclatura",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that contains the users shown in the following table.\n\n![Exhibit](img/S271-stem-1.png){w=255}\n\nFrom the tenant, you configure a naming policy for groups.\n\nWhich users are affected by the naming policy?",
    "options": [
      "User2 only",
      "User3only",
      "User2 and User3 only",
      "User3 and User4 only",
      "User1, User2, and User3 only",
      "User1, User2, User3, and User4"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "A política de nomenclatura de grupos **não se aplica** a Global administrator e User administrator (entre outras funções privilegiadas). Ela afeta o Groups administrator (User3) e usuários sem função (User4)."
  },
  {
    "id": "Q272",
    "src": 272,
    "domain": 3,
    "topic": "Consentimento de apps",
    "type": "single",
    "stem": "You have an Azure AD tenant.\n\nYou deploy a new enterprise application named App1.\n\nWhen users attempt to provide App1 with access to the tenant, the attempt fails. You need to ensure that the users can request admin consent for App1. The solution must follow the principle of least privilege.\n\nWhat should you do first?",
    "options": [
      "Enable admin consent requests for the tenant.",
      "Designate a reviewer of admin consent requests for the tenant.",
      "From the Permissions settings of App1, grant App1 admin consent for the tenant.",
      "Create a Conditional Access policy for App1."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Primeiro **habilite as solicitações de admin consent** no tenant (definindo os revisores na mesma tela); assim o usuário pode pedir aprovação."
  },
  {
    "id": "Q274",
    "src": 274,
    "domain": 3,
    "topic": "Funções de aplicativos",
    "type": "single",
    "stem": "You have an Azure subscription that contains a user named User1. The App registration settings for the Azure AD tenant are configured as shown in the following exhibit.\n\n![Exhibit](img/S274-stem-1.png){w=597}\n\nUser1 builds an ASP.NET web app named App1.\n\nYou need to ensure that User1 can register App1. The solution must use the principle of least privilege.\n\nWhich role should you assign to User1?",
    "options": [
      "Application Developer",
      "Cloud App Security Administrator",
      "Cloud Application Administrator",
      "Application Administrator"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Com \"Users can register applications = No\", o **Application Developer** pode registrar apps com o menor privilégio."
  },
  {
    "id": "Q275",
    "src": 275,
    "domain": 3,
    "topic": "Managed identities",
    "type": "hotarea",
    "stem": "You have an Azure subscription that contains the resources shown in the following table.\n\n![Exhibit](img/S275-stem-1.png){w=611}\n\nThe subscription contains the virtual machines shown in the following table.\n\n![Exhibit](img/S275-stem-2.png){w=611}\n\nWhich identities can be assigned the Owner role for RG1, and to which virtual machines can you assign Managed2? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Identities with Owner role:",
        "options": [
          "Managed1 only",
          "Managed1, VM1, and VM3 only",
          "Managed1, Managed2, and VM1 only",
          "Managed1, Managed2, VM1, and VM2 only",
          "Managed1, Managed2, VM1, VM2, and VM3 only"
        ],
        "answer": 3
      },
      {
        "label": "Virtual machines assigned to Managed2:",
        "options": [
          "VM4 only",
          "VM2 and VM4 only",
          "VM1, VM2, and VM4 only",
          "VM1, VM2, VM3, and VM4"
        ],
        "answer": 3
      }
    ],
    "answer_original": [
      1,
      1
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Podem receber a função Owner: as user-assigned **Managed1 e Managed2** e as VMs com identidade **system-assigned** (VM1, VM2). A VM3 só usa a Managed1 e não tem identidade própria. Identidades user-assigned podem ser associadas a VMs de **qualquer região**, então a Managed2 vai em VM1, VM2, VM3 e VM4. O dump errava as duas."
  },
  {
    "id": "Q276",
    "src": 276,
    "domain": 3,
    "topic": "Defender for Cloud Apps",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that uses Microsoft Defender for Cloud Apps.\n\nYou plan to increase app security for the subscription.\n\nYou need to identify which apps do NOT require user authentication. What should you do in the Microsoft 365 Defender portal?",
    "options": [
      "Review the cloud app catalog.",
      "Create an OAuth policy and review alerts.",
      "Create a snapshot Cloud Discovery report.",
      "Create a discovered app query."
    ],
    "answer": 3,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O dump marca **discovered app query**: na Cloud Discovery é possível filtrar apps descobertos por fatores de risco de segurança (ex.: sem autenticação de usuário). A comunidade aponta que o catálogo também tem esse filtro. Confira a discussão."
  },
  {
    "id": "Q277",
    "src": 277,
    "domain": 4,
    "topic": "PIM",
    "type": "single",
    "stem": "You have an Azure subscription that contains the users shown in the following table.\n\n![Exhibit](img/S277-stem-1.png){w=437}\n\nYou need to implement Azure AD Privileged Identity Management (PIM). Which users can use PIM to activate their role permissions?",
    "options": [
      "Admin1 only",
      "Admin2 only",
      "Admin3 only",
      "Admin1 and Admin2 only",
      "Admin2 and Admin3 only",
      "Admin1, Admin2, and Admin3"
    ],
    "answer": 2,
    "answer_original": 0,
    "scope": "in",
    "review": "corrigida",
    "explanation": "O PIM não gerencia funções **clássicas** de assinatura (Account Administrator, Service Administrator, Co-Administrator). Só o Admin3 (SharePoint administrator, função do Entra) pode usar o PIM. O dump marcava Admin1."
  },
  {
    "id": "Q278",
    "src": 278,
    "domain": 3,
    "topic": "Restaurar aplicativos",
    "type": "hotarea",
    "stem": "You have an Azure AD tenant.\n\nYou perform the tasks shown in the following table.\n\n![Exhibit](img/S278-stem-1.png){w=611}\n\nOn April 5, an administrator deletes App1, App2, App3, and App4. You need to restore the apps and the settings.\n\nWhich apps can you restore on April 16, and which settings can you restore for App4 on April 16? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Apps:",
        "options": [
          "No apps",
          "App4 only",
          "App3 and App4 only",
          "App2, App3, and App4 only",
          "App1, App2, App3, and App4"
        ],
        "answer": 4
      },
      {
        "label": "App4 settings:",
        "options": [
          "No settings",
          "Self-service only",
          "App roles and Client secret only",
          "Users and groups and Self-service only",
          "App roles, Users and groups, Client secret, and Self-service"
        ],
        "answer": 2
      }
    ],
    "answer_original": [
      3,
      2
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Aplicativos excluídos ficam **30 dias** em soft delete. Excluídos em 5/04, os **quatro** podem ser restaurados em 16/04. Restaurar o registro recupera as propriedades do **app registration** (App roles, Client secret). Atribuições de usuários/grupos e self-service pertencem ao enterprise app (service principal). O dump excluía o App1 sem justificativa."
  },
  {
    "id": "Q279",
    "src": 279,
    "domain": 3,
    "topic": "Defender for Cloud Apps — OAuth",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "OAUTH"
    },
    "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have an Amazon Web Services (AWS) account, a Google Workspace subscription, and a GitHub account.\n\nYou deploy an Azure subscription and enable Microsoft 365 Defender. You need to ensure that you can monitor OAuth authentication requests by using Microsoft Defender for Cloud Apps.\n\nSolution: From the Microsoft 365 Defender portal, you add the GitHub app connector.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O conector do GitHub não fornece monitoramento de OAuth apps (só Microsoft 365, Google Workspace e Salesforce)."
  },
  {
    "id": "Q280",
    "src": 280,
    "domain": 4,
    "topic": "PIM",
    "type": "single",
    "stem": "You have an Azure AD tenant.\n\nYou plan to implement Azure AD Privileged Identity Management (PIM). Which roles can you manage by using PIM?",
    "options": [
      "Global Administrator only",
      "Global Administrator and Security Administrator only",
      "Global Administrator, Security Administrator, and Security Contributor only",
      "Account Administrator, Global Administrator, Security Administrator, and Security Contributor only"
    ],
    "answer": 2,
    "answer_original": 1,
    "scope": "in",
    "review": "corrigida",
    "explanation": "O PIM gerencia funções do **Entra ID** (Global, Security administrator) e funções de **recursos do Azure** (Security Contributor é uma função do Azure). Account Administrator é clássica e não é suportada. O dump marcava só as duas do Entra."
  },
  {
    "id": "Q281",
    "src": 281,
    "domain": 4,
    "topic": "Entitlement management",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that contains a Microsoft SharePoint Online site named Site1 and a Microsoft 365 group named Group1. You need to ensure that the members of Group1 can access Site1 for 90 days. The solution must minimize administrative effort.\n\nWhat should you use?",
    "options": [
      "an access package",
      "an access review",
      "a lifecycle workflow",
      "a Conditional Access policy"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Um **access package** com o site e a política de atribuição expirando em 90 dias, atribuído ao Group1 (ou com auto-assignment), resolve com pouco esforço."
  },
  {
    "id": "Q282",
    "src": 282,
    "domain": 3,
    "topic": "Managed identities",
    "type": "hotarea",
    "stem": "You have a Microsoft Entra tenant that contains multiple storage accounts. You plan to deploy multiple Azure App Service apps that will require access to the storage accounts.\n\nYou need to recommend an identity solution to provide the apps with access to the storage accounts. The solution must minimize administrative effort. Which type of identity should you recommend, and what should you recommend using to control access to the storage accounts? To answer, select the appropriate options in the answer area.",
    "slots": [
      {
        "label": "Identity type:",
        "options": [
          "Microsoft Entra user",
          "Service principal",
          "System-assigned managed identity",
          "User-assigned managed identity"
        ],
        "answer": 3
      },
      {
        "label": "To control access, use:",
        "options": [
          "Microsoft Entra Domain Services",
          "Role-based access control (RBAC)",
          "Shared access signature (SAS) tokens",
          "X.509 certificates"
        ],
        "answer": 1
      }
    ],
    "answer_original": [
      1,
      1
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Vários App Services acessando os mesmos storage accounts com mínimo esforço: uma **user-assigned managed identity** compartilhada, sem segredos para gerenciar, com acesso controlado por **RBAC**. Service principal exige gerenciar credenciais. O dump marcava Service principal."
  },
  {
    "id": "Q283",
    "src": 283,
    "domain": 3,
    "topic": "Managed identities",
    "type": "single",
    "stem": "You have an Azure subscription named Sub1 that contains a resource group named RG1. RG1 contains an Azure Cosmos DB database named DB1 and an Azure Kubernetes Service (AKS) cluster named AKS1. AKS1 uses a managed identity.\n\nYou need to ensure that AKS1 can access DB1. The solution must meet the following requirements:\n\n- Ensure that AKS1 uses the managed identity to access DB1.\n- Follow the principle of least privilege.\n\nWhich role should you assign to the managed identity of AKS1?",
    "options": [
      "For Sub1, assign the Owner role.",
      "For DB1, assign the Azure Cosmos DB Account Reader Role role.",
      "For RG1, assign the Azure Cosmos DB Data Reader Role role.",
      "For RG1, assign the Reader role."
    ],
    "answer": 2,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O dump marca Cosmos DB Data Reader no RG1. Atenção: Account Reader lê só metadados da conta, e os papéis de dados do Cosmos DB são do plano de dados. Questão discutível."
  },
  {
    "id": "Q284",
    "src": 284,
    "domain": 3,
    "topic": "Managed identities",
    "type": "single",
    "stem": "You have an Azure subscription that contains a storage account named storage1 and a web app named WebApp1. WebApp1 uses a system-assigned managed identity.\n\nYou need to ensure that WebApp1 can read and write files to storage1 by using the system-assigned managed identity.\n\nWhat should you configure for storage1 in the Azure portal?",
    "options": [
      "data protection",
      "a shared access signature (SAS)",
      "the Access control (IAM) settings",
      "the File share settings",
      "access keys"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Para a identidade do WebApp1 ler e gravar no storage1, atribua uma função de dados (ex.: Storage Blob Data Contributor) em **Access control (IAM)** da conta de armazenamento."
  },
  {
    "id": "Q285",
    "src": 285,
    "domain": 3,
    "topic": "Managed identities",
    "type": "single",
    "stem": "You have an Azure subscription that contains an Azure Automation account named Automation1 and an Azure key vault named Vault1. Vault1 contains a secret named Secret1.\n\nYou enable a system-assigned managed identity for Automation1. You need to ensure that Automation1 can read the contents of Secret1. The solution must meet the following requirements:\n\n- Prevent Automation1 from accessing other secrets stored in Vault1.\n- Follow the principle of least privilege.\n\nWhat should you do?",
    "options": [
      "From Vault1, configure the Access control (IAM) settings.",
      "From Automation1, configure the Identity settings.",
      "From Automation1, configure the Run as accounts settings.",
      "From Secret1, configure the Access control (IAM) settings."
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Com o modelo de permissões **Azure RBAC** do Key Vault, é possível atribuir Key Vault Secrets User no escopo de **um único segredo** (IAM do Secret1) — menor privilégio."
  },
  {
    "id": "Q288",
    "src": 288,
    "domain": 2,
    "topic": "Autenticação baseada em certificado",
    "type": "single",
    "stem": "Your on-premises network contains an Active Directory Domain Services (AD DS) domain and a certification authority (CA) named CA1.\n\nYou have an Azure AD tenant.\n\nYou need to implement certificate-based authentication in Azure AD. The solution must ensure that users can sign in by using certificates issued by CA1. What should you do first?",
    "options": [
      "Deploy an Azure key vault.",
      "Add CA1 as a Certificate Authority to the Microsoft Entra ID tenant.",
      "Enable auto-enrollment for CA1.",
      "Deploy Windows Hello for Business."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Para CBA no Entra, primeiro adicione a CA (certificado raiz/intermediário e CRL) em **Certificate authorities** do tenant. Depois habilite o método no Authentication methods policy."
  },
  {
    "id": "Q290",
    "src": 290,
    "domain": 4,
    "topic": "PIM",
    "type": "single",
    "stem": "You have three Azure subscriptions that are linked to a single Microsoft Entra tenant.\n\nYou need to evaluate and remediate the risks associated with highly privileged accounts. The solution must minimize administrative effort.\n\nWhat should you use?",
    "options": [
      "Global Secure Access",
      "Privileged Identity Management (PIM)",
      "Microsoft Entra Permissions Management",
      "Microsoft Entra Verified ID"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Avaliar e remediar o risco de contas altamente privilegiadas no tenant e nas assinaturas, com pouco esforço: **Privileged Identity Management** (descoberta, revisões, elegibilidade)."
  },
  {
    "id": "Q293",
    "src": 293,
    "domain": 3,
    "topic": "Key Vault RBAC com PIM",
    "type": "match",
    "stem": "You have an Azure subscription that contains the resources shown in the following table.\n\n![Exhibit](img/S293-stem-1.png){w=399}\n\nThe subscription uses Privileged Identity Management (PIM).\n\nYou need to configure the following access controls by using PIM:\n\n- Ensure that User1 can read and update Secret1.\n- Ensure that User2 can read the contents of the secrets stored in Vault2. The solution must follow the principle of least privilege.\n\nWhich authorization method should you use for each user? To answer, drag the appropriate authorization methods to the correct users. Each authorization method may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "The GET Secret Permissions Access Policy permission",
      "The Key Vault Secrets Officer RBAC role",
      "The Key Vault Reader RBAC role",
      "The Key Vault Secrets User RBAC role",
      "The LIST Secret Permissions Access Policy permission",
      "The SET Secret Permissions Access Policy permission"
    ],
    "targets": [
      {
        "label": "User1:",
        "answer": 1
      },
      {
        "label": "User2:",
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O PIM gerencia **funções RBAC**, não access policies. Ler e atualizar segredos: **Key Vault Secrets Officer**. Só ler o conteúdo: **Key Vault Secrets User** (menor privilégio)."
  },
  {
    "id": "Q296",
    "src": 296,
    "domain": 3,
    "topic": "Managed identities",
    "type": "single",
    "stem": "You have an Azure subscription that contains a user-assigned managed identity named Managed1 in the East US Azure region. The subscription contains the resources shown in the following table.\n\n![Exhibit](img/S296-stem-1.png){w=380}\n\nWhich resources can use Managed1 as their identity?",
    "options": [
      "WebApp1 only",
      "storage1 and WebApp1 only",
      "VM1 and WebApp1 only",
      "VM1, storage1, and WebApp1"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Identidades gerenciadas atribuídas pelo usuário são recursos regionais, mas o service principal é global, e a identidade pode ser usada por recursos de **outras regiões**. VM, Storage account e App Service suportam user-assigned managed identity."
  },
  {
    "id": "Q297",
    "src": 297,
    "domain": 4,
    "topic": "PIM para grupos",
    "type": "single",
    "stem": "You have a Microsoft Entra tenant that contains the groups shown in the following table.\n\n![Exhibit](img/S297-stem-1.png){w=313}\n\nYou need to implement Privileged Identity Management (PIM) for the groups. Which groups can be managed by using PIM?",
    "options": [
      "Group1 only",
      "Group1 and Group2 only",
      "Group1 and Group3 only",
      "Group3 and Group4 only",
      "Group1, Group2, Group3, and Group4"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O PIM for Groups gerencia grupos de **segurança** e **Microsoft 365** com associação **atribuída**. Grupos dinâmicos (e grupos sincronizados do AD) não são suportados."
  },
  {
    "id": "Q299",
    "src": 299,
    "domain": 1,
    "topic": "Email one-time passcode",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant that uses the domain name fabrikam.com. The External collaboration settings are configured as shown in the Collaboration exhibit. (Click the Collaboration tab.)\n\n![Exhibit](img/S299-stem-1.png){w=606}\n\nThe Email one-time passcode for guests setting is enabled for the tenant. A user in fabrikam.com shares a Microsoft SharePoint Online document library to the users shown in the following table.\n\n![Exhibit](img/S299-stem-2.png){w=555}\n\nWhich users will be emailed a passcode?",
    "options": [
      "User1 only",
      "User2 only",
      "User1 and User2 only",
      "User1, User2, and User3"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "OTP vai para convidados **novos** sem conta Entra, Microsoft account ou federação: User2 (tailspintoys.com, nunca acessou). User1 já é guest; User3 é membro do próprio tenant."
  },
  {
    "id": "Q300",
    "src": 300,
    "domain": 3,
    "topic": "Managed identities",
    "type": "single",
    "stem": "You have an Azure subscription named Sub1 that contains a virtual machine named VM1.\n\nYou need to enable Microsoft Entra login for VM1 and configure VM1 to access the resources in Sub1.\n\nWhich type of identity should you assign to VM1?",
    "options": [
      "Microsoft Entra user account",
      "user-assigned managed identity",
      "Azure Automation account",
      "system-assigned managed identity"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O login do Entra em VMs (extensão AADLoginForWindows/Linux) exige **system-assigned managed identity**, que também serve para a VM acessar recursos da assinatura."
  },
  {
    "id": "Q301",
    "src": 301,
    "domain": 1,
    "topic": "Licenciamento",
    "type": "single",
    "stem": "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.\n\nFrom the Groups blade in the Microsoft Entra admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users. You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.\n\nWhat should you use?",
    "options": [
      "the Set-WindowsProductKey cmdlet",
      "the Update-MgGroup cmdlet",
      "the Set-MgUserLicense cmdlet",
      "the Update-MgUser cmdlet"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Pelo gabarito, **Set-MgUserLicense** (Graph PowerShell) remove a licença atribuída diretamente em massa. O blade Licenses é a alternativa pelo portal."
  },
  {
    "id": "Q302",
    "src": 302,
    "domain": 1,
    "topic": "Licenciamento",
    "type": "single",
    "stem": "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.\n\nFrom the Groups blade in the Microsoft Entra admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users. You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.\n\nWhat should you use?",
    "options": [
      "the Licenses blade in the Microsoft Entra admin center",
      "the Administrative units blade in the Microsoft Entra admin center",
      "the Identity Governance blade in the Microsoft Entra admin center",
      "the Update-MgUser cmdlet"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "O blade **Licenses** remove a licença E3 de todos os usuários de uma vez."
  },
  {
    "id": "Q303",
    "src": 303,
    "domain": 2,
    "topic": "ID Protection — risco de usuário",
    "type": "yesno",
    "stem": "You have a Microsoft Entra tenant that contains the users shown in the following table.\n\n![Exhibit](img/S303-stem-1.png){w=214}\n\nYou have a user risk policy that has the following settings:\n\n- Assignments:\n  - Include: Group1 o Exclude: Group2\n- Sign-in risk: Medium and above\n- Access controls:\n  - Grant access: Require password change\n\nWhen the users attempt to sign in, user risk levels are detected as shown in the following table.\n\n![Exhibit](img/S303-stem-2.png){w=187}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 must change their password during sign in.",
      "User2 must change their password during sign in.",
      "User3 must change their password during sign in."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A exclusão tem precedência sobre a inclusão. User1 (Group1, risco alto) troca a senha (Sim). User2 está só no Group2, excluído (Não). User3 está no Group1 e no Group2; a exclusão vence (Não)."
  },
  {
    "id": "Q304",
    "src": 304,
    "domain": 3,
    "topic": "Azure ABAC",
    "type": "single",
    "stem": "You have an Azure subscription that contains a resource group named RG1 and four users named User1, User2, User3, and User4.\n\nYou plan to assign the users the following roles for RG1:\n\n- User1: Reader\n- User2: Contributor\n- User3: Storage Blob Data Reader\n- User4: Virtual Machine Contributor\n\nYou are evaluating the use of attribute-based access control (ABAC). Which user's role will support the use of ABAC?",
    "options": [
      "User1",
      "User2",
      "User3",
      "User4"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Condições de ABAC (role assignment conditions) são suportadas em funções de **dados de Storage** (Blob/Queue Data), como Storage Blob Data Reader."
  },
  {
    "id": "Q305",
    "src": 305,
    "domain": 3,
    "topic": "Identidades de aplicativos",
    "type": "hotarea",
    "stem": "You have an Azure subscription named Sub1 that contains a storage account named storage1.\n\nYou need to deploy two apps named App1 and App2 that will have the following configurations:\n\n- App1 will be deployed as a registered app in Sub1.\n- App1 will access storage1 by using Microsoft Entra authentication.\n- App2 will access storage1 by using a single Microsoft Entra identity.\n- App2 be hosted on two new virtual machines named VM1 and VM2. The solution must minimize administrative effort.\n\nWhich type of identity will each app use to access storage1? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "App1:",
        "options": [
          "User-assigned managed identity",
          "Microsoft Entra group account",
          "Microsoft Entra user account",
          "Service principal",
          "System-assigned managed identity"
        ],
        "answer": 3
      },
      {
        "label": "App2:",
        "options": [
          "User-assigned managed identity",
          "Microsoft Entra group account",
          "Microsoft Entra user account",
          "Service principal",
          "System-assigned managed identity"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Um **app registrado** acessa recursos pelo seu **service principal**. Uma identidade única compartilhada pelas duas VMs que hospedam o App2: **user-assigned managed identity**."
  },
  {
    "id": "Q306",
    "src": 306,
    "domain": 3,
    "topic": "Consentimento de aplicativos",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou need to configure app consent for the subscription. The solution must meet the following requirements:\n\n- Disable user consent to apps.\n- Configure admin consent workflow for apps.\n\nWhich portal should you use for each requirement? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Disable user consent to apps:",
        "options": [
          "Microsoft 365 admin center",
          "Microsoft 365 Apps admin center",
          "Microsoft 365 Defender portal",
          "Microsoft Purview compliance portal"
        ],
        "answer": 0
      },
      {
        "label": "Configure admin consent workflow for apps:",
        "options": [
          "Microsoft Entra admin center",
          "Microsoft 365 admin center",
          "Microsoft 365 Defender portal",
          "Microsoft Purview compliance portal"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O consentimento de usuários pode ser desabilitado no **Microsoft 365 admin center** (Settings > Org settings > User consent to apps). O admin consent workflow é configurado no **Microsoft Entra admin center** (Enterprise apps > Consent and permissions)."
  },
  {
    "id": "Q307",
    "src": 307,
    "domain": 3,
    "topic": "Permissões de API",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription.\n\nYou plan to deploy an app named App1 that will have the following configurations:\n\n- Will be registered in Microsoft Entra\n- Will access the signed-in user's Microsoft Outlook calendar by using the Microsoft Graph API\n\nYou need to ensure that App1 can access Microsoft Graph.\n\nWhat should you use?",
    "options": [
      "application permissions",
      "delegated permissions",
      "a custom role-based access control (RBAC) role",
      "a built-in role-based access control (RBAC) role"
    ],
    "answer": 1,
    "answer_original": 0,
    "scope": "in",
    "review": "corrigida",
    "explanation": "Acessar o calendário do **usuário conectado** é feito com **delegated permissions** (Calendars.Read/ReadWrite delegada). Application permissions são para apps sem usuário, com acesso a todos os calendários. O dump marcava application permissions."
  },
  {
    "id": "Q311",
    "src": 311,
    "domain": 2,
    "topic": "Continuous access evaluation",
    "type": "single",
    "stem": "You have a Microsoft Entra tenant.\n\nYou need to configure continuous access evaluation for app sign-ins and assign the configuration to users that are assigned the Application Administrator role. What should you configure?",
    "options": [
      "a sign-in risk policy",
      "an access review",
      "a Conditional Access policy",
      "the Admin consent settings"
    ],
    "answer": 2,
    "answer_original": 1,
    "scope": "in",
    "review": "corrigida",
    "explanation": "A personalização do CAE (ex.: strict location enforcement) é feita numa política de **Conditional Access** (Session > Customize continuous access evaluation), atribuída aos usuários com a função Application Administrator. Access review não tem relação. O dump marcava access review."
  },
  {
    "id": "Q317",
    "src": 317,
    "domain": 1,
    "topic": "Escopo de funções",
    "type": "hotarea",
    "stem": "You have a Microsoft Entra tenant named contoso.com that contains an administrative unit named AU1 and two users named User1 and User2. User1 is a member of AU1.\n\nYou need to perform the following role assignments:\n\n- User1: Security Administrator\n- User2: User Administrator\n\nFor which scopes can each user be assigned the role? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "User1:",
        "options": [
          "AU1 only",
          "contoso.com only",
          "AU1 and contoso.com"
        ],
        "answer": 1
      },
      {
        "label": "User2:",
        "options": [
          "AU1 only",
          "contoso.com only",
          "AU1 and contoso.com"
        ],
        "answer": 2
      }
    ],
    "answer_original": [
      1,
      0
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Security Administrator **não** pode ter escopo de unidade administrativa, só o tenant inteiro. User Administrator pode ter escopo de **AU ou de tenant** (o escopo não depende de o usuário ser membro da AU). O dump marcava \"AU1 only\" para o User2."
  },
  {
    "id": "Q318",
    "src": 318,
    "domain": 3,
    "topic": "Login do Entra em VM Linux",
    "type": "multi",
    "stem": "You have an Azure subscription. The subscription contains a virtual machine named VM1 that runs Linux.\n\nYou need to configure enhanced security for VM1. The solution must meet the following requirements:\n\n- Ensure that users can sign in to VM1 by using their Microsoft Entra credentials.\n- Ensure that users authenticate by using multi-factor out-of-band.\n- Prevent users from signing in to VM1 by using passwords.\n\nWhich two authentication methods can you include in the solution? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "the Microsoft Authenticator app",
      "FIDO2 security keys",
      "Temporary Access Pass",
      "SMS",
      "Windows Hello for Business"
    ],
    "answer": [
      1,
      2
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Pelo dump, **chave FIDO2** e **Temporary Access Pass** (métodos sem senha) atendem ao login sem senha com MFA. Gabarito pouco confiável — confira a discussão."
  },
  {
    "id": "Q319",
    "src": 319,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou create an access review named Review1. Review1 requires that every six months, Microsoft 365 group owners review guest user access to their groups. You need to ensure that if the group owners fail to review the membership of Review1, guest users are removed automatically.\n\nWhich settings should you configure for Review1?",
    "options": [
      "Scheduling",
      "When completed",
      "General",
      "Reviewers"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O comportamento quando os revisores não respondem (\"If reviewers don't respond: Remove access\") e a aplicação automática ficam em **Upon completion settings** (When completed)."
  },
  {
    "id": "Q329",
    "src": 329,
    "domain": 4,
    "topic": "Terms of use",
    "type": "single",
    "stem": "You have a Microsoft Entra tenant that contains a terms of use (ToU) named Terms1.\n\nYou create a Conditional Access policy named Policy1 to deploy Terms1. You need to configure Policy1 to require users to accept Terms1. Which settings should you configure for Policy1?",
    "options": [
      "Conditions",
      "Session",
      "Grant",
      "Target resources"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Em uma política de CA, os termos de uso são exigidos no controle **Grant** (Require terms of use)."
  },
  {
    "id": "Q330",
    "src": 330,
    "domain": 3,
    "topic": "Managed identities",
    "type": "single",
    "stem": "You have an Azure subscription that contains a virtual machine named VM1 and an Azure key vault named Vault1. VM1 has a system-assigned managed identity. You need to ensure that VM1 can retrieve the values of secrets stored in Vault1. The solution must minimize administrative effort.\n\nWhat should you do first?",
    "options": [
      "Configure the Resource access settings for Vault1.",
      "Configure the permissions model for Vault1.",
      "Add a user-assigned managed identity to VM1.",
      "Assign an Azure role to VM1."
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Com o modelo **Azure RBAC** do Key Vault (padrão em novos cofres), basta atribuir à identidade da VM uma função como **Key Vault Secrets User**."
  },
  {
    "id": "Q332",
    "src": 332,
    "domain": 2,
    "topic": "Conditional Access — sessão",
    "type": "yesno",
    "stem": "You have a Microsoft 365 E5 subscription that contains two groups named Group1 and Group2. The subscription contains the users shown in the following table.\n\n![Exhibit](img/S332-stem-1.png){w=537}\n\nYou create the following Conditional Access policies:\n\n- Name: Policy1\n- Users:\n  - Include: Group1 o Exclude: Group2\n- Target resources:\n  - Include: All cloud apps\n- Grant:\n  - Grant access: Require multi-factor authentication\n- Session:\n  - Persistent browser session: Never persistent\n- Name: Policy2\n- Users:\n  - Include:\n- Directory roles: Global Administrator\n- Users and groups: User3 o Exclude: Group2\n- Target resources:\n  - Include: All cloud apps\n- Session:\n  - Sign-in frequency:\n- Periodic authentication: 2 hours\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 will be prompted for the Stay signed in option when they sign in to the Microsoft 365 portal.",
      "User2 must reauthenticate to Microsoft 365 Apps every two hours.",
      "User3 must reauthenticate to Microsoft 365 Apps every two hours."
    ],
    "answer": [
      false,
      false,
      false
    ],
    "answer_original": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Com **Persistent browser session = Never persistent**, a política sobrepõe o prompt \"Stay signed in?\", então User1 não o vê (Não). User2 e User3 estão no Group2, excluído da Policy2, e não têm a frequência de 2 horas (Não/Não). O dump marcava Sim na primeira."
  },
  {
    "id": "Q333",
    "src": 333,
    "domain": 3,
    "topic": "Managed identities",
    "type": "hotarea",
    "stem": "You have an Azure subscription that contains the resources shown in the following table.\n\n| Name | Type | Identity |\n|---|---|---|\n| VM1 | Virtual machine | Managed1 (system-assigned) |\n| App1 | Azure App Service web app | None |\n| Managed1 | Managed identity (system-assigned) | VM1 |\n| Managed2 | Managed identity (user-assigned) | Not applicable |\n\nYou create a Microsoft Entra user named User1.\n\nWhich identities can you add to VM1 and App1? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct answer is worth one point.",
    "slots": [
      {
        "label": "VM1:",
        "options": [
          "User1 only",
          "Managed2 only",
          "Managed1 and Managed2 only",
          "Managed2 and User1 only",
          "Managed1, Managed2, and User1"
        ],
        "answer": 1
      },
      {
        "label": "App1:",
        "options": [
          "User1 only",
          "Managed2 only",
          "Managed2 and User1 only",
          "A system-assigned managed identity only",
          "A system-assigned managed identity and Managed2 only",
          "A system-assigned managed identity, Managed2, and User1"
        ],
        "answer": 4
      }
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Usuários do Entra não podem ser associados como identidade de recurso. A Managed1 aparece no exhibit original como a identidade **system-assigned** já vinculada (não reaproveitável), e a Managed2 é **user-assigned**. Na VM1, só a Managed2. No App1, uma identidade system-assigned própria + a Managed2. O exhibit do dump veio corrompido e foi reconstruído em tabela; confirme."
  },
  {
    "id": "Q342",
    "src": 342,
    "domain": 4,
    "topic": "Atribuições de funções",
    "type": "yesno",
    "stem": "You have a Microsoft Entra tenant that contains the users shown in the following table.\n\n![Exhibit](img/S342-stem-1.png){w=281}\n\nYou add the following assignment for the User Administrator role:\n\n- Scope type: Directory\n- Selected members: Group1\n- Assignment type: Active\n- Assignments starts: August 15, 2022\n- Assignment ends: December 15, 2022\n\nYou add the following assignment for the Exchange Administrator role:\n\n- Scope type: Directory\n- Selected members: Group2\n- Assignment type: Eligible\n- Assignments starts: October 15, 2022\n- Assignment ends: January 15, 2023\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "On November 15, 2022, Admin1 can reset the password of Admin2.",
      "On October 15, 2022, Admin2 signs in and can administer Exchange Online.",
      "On September 1, 2022, Admin3 can reset the password of Admin1."
    ],
    "answer": [
      true,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Em 15/11 o Admin1 tem User Administrator **ativo** (Group1) e o Admin2 só tem atribuição **elegível**, não ativada, então a redefinição é permitida (Sim). Elegível não é ativo: o Admin2 precisa ativar a função no PIM antes de administrar o Exchange (Não). Em 1º/09 o Admin3 é User Administrator ativo e pode redefinir a senha de outro User Administrator (Sim)."
  },
  {
    "id": "Q344",
    "src": 344,
    "domain": 3,
    "topic": "Managed identities",
    "type": "single",
    "stem": "You have an Azure subscription that contains a storage account named storage1. You plan to deploy an app named App1 that will be hosted on multiple virtual machines. The virtual machines will authenticate to a third-party API by using secrets.\n\nYou need to recommend an authentication solution for the virtual machines. The solution must meet the following requirements:\n\n- Securely store secrets.\n- Ensure that credentials do NOT need to be stored in the App1 code.\n- Ensure that the virtual machines can access Azure resources by using Microsoft Entra authentication\n- Minimize administrative effort.\n\nWhat should you include in the recommendation?",
    "options": [
      "user accounts and Storage Service Encryption",
      "user-assigned managed identities and Azure Key Vault",
      "user accounts and Azure Key Vault",
      "system assigned managed identities and Storage Service Encryption"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Várias VMs compartilham a mesma identidade com **user-assigned managed identity**. Os segredos da API de terceiros ficam no **Azure Key Vault**, acessado com essa identidade, sem segredo no código."
  },
  {
    "id": "Q345",
    "src": 345,
    "domain": 3,
    "topic": "Managed identities e Key Vault",
    "type": "yesno",
    "stem": "You have an Azure subscription named Sub1 that contains the resources shown in the following table.\n\n![Exhibit](img/S345-stem-1.png){w=394}\n\nSub1 contains the managed identities shown in the following table.\n\n![Exhibit](img/S345-stem-2.png){w=254}\n\nSub1 has the role-based access control (RBAC) role assignments shown in the following table.\n\n![Exhibit](img/S345-stem-3.png){w=369}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "Automation1 can access the contents of the secrets stored in Vault1.",
      "Identity2 can be assigned to Automation2 to gain access to the contents of the secrets stored in Vault1.",
      "VM1 can access the contents of the secrets stored in Vault1."
    ],
    "answer": [
      false,
      true,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A Identity1 (do Automation1) tem acesso só no RG2, e o Vault1 está no RG1 (Não). A Identity2 é a system-assigned do Automation2, com acesso na Sub1 inteira (Sim). A Identity3 é a system-assigned da VM1, com acesso no RG1 (Sim)."
  },
  {
    "id": "Q346",
    "src": 346,
    "domain": 3,
    "topic": "Managed identities",
    "type": "single",
    "stem": "You have an Azure subscription that contains an Azure Automation account named Automation1.\n\nYou need to grant Automation1 access to Azure resources. The solution must meet the following requirements:\n\n- Ensure that any permissions granted to Automation1 are removed when the account is deleted.\n- Minimize administrative effort.\n\nWhat should you use?",
    "options": [
      "a client secret",
      "a system-assigned managed identity",
      "a certificate",
      "user-assigned managed identity"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Com **system-assigned managed identity**, a identidade e suas atribuições são removidas junto com a conta de Automation."
  },
  {
    "id": "Q348",
    "src": 348,
    "domain": 1,
    "topic": "Cross-tenant synchronization",
    "type": "yesno",
    "stem": "You have two Microsoft Entra tenants named contoso.com and fabrikam.com. Contoso.com contains the users shown in the following table.\n\n![Exhibit](img/S348-stem-1.png){w=153}\n\nContoso.com contains the groups shown in the following table.\n\n![Exhibit](img/S348-stem-2.png){w=322}\n\nYou configure cross-tenant synchronization from contoso.com to fabrikam.com and enable cross-tenant synchronization for User3 and Group2.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 will sync to fabrikam.com.",
      "User2 will sync to fabrikam.com.",
      "User3 will sync to fabrikam.com."
    ],
    "answer": [
      false,
      true,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O escopo por grupo sincroniza só os **membros diretos**: o User2 entra via Group2, mas o User1 (membro do Group1, aninhado) não. O User3 foi colocado diretamente no escopo e é sincronizado."
  },
  {
    "id": "Q349",
    "src": 349,
    "domain": 1,
    "topic": "Self-service sign-up",
    "type": "single",
    "stem": "You have a Microsoft Exchange organization that uses an SMTP address space of contoso.com.\n\nSeveral users use their contoso.com email address for self-service sign-up to Microsoft Entra.\n\nYou gain global administrator privileges to the Microsoft Entra tenant that contains the self-signed users.\n\nYou need to prevent the users from creating user accounts in the contoso.com Microsoft Entra tenant for self-service sign-up to Microsoft 365 services. Which PowerShell cmdlet should you run?",
    "options": [
      "Update-MgPolicyAuthorizationPolicy",
      "Update-MgDomain",
      "Update-MgPolicyPermissionGrantPolicyExclude",
      "Update-MgDomainFederationConfiguration"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "**Update-MgPolicyAuthorizationPolicy** (AllowedToSignUpEmailBasedSubscriptions / AllowEmailVerifiedUsersToJoinOrganization = $false) bloqueia o self-service sign-up — equivalente atual do Set-MsolCompanySettings."
  },
  {
    "id": "Q350",
    "src": 350,
    "domain": 3,
    "topic": "Apps empresariais",
    "type": "single",
    "stem": "You have a Microsoft Entra tenant that contains the users shown in the following table.\n\n![Exhibit](img/S350-stem-1.png){w=168}\n\nYou add an enterprise application named App1 and configure the following Self- service settings:\n\n- Allow users to request access to this application: Yes\n- To which group should assigned users be added: Group1\n- Require approval before granting access to this application: Yes\n- Who is allowed to approve access to this application: User2\n\nWhich users can request access to App1?",
    "options": [
      "User3 only",
      "User2 and User3 only",
      "User1 and User3 only",
      "User1, User2, and User3"
    ],
    "answer": 2,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Pelo dump, User1 e User3 podem solicitar acesso. Questão ambígua: User1 já está no Group1 (grupo de quem recebe acesso) e o aprovador (User2) também é um usuário comum. Confira a discussão."
  },
  {
    "id": "Q351",
    "src": 351,
    "domain": 4,
    "topic": "Access reviews",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains a user named User1. You need to ensure that User1 can create access reviews for Microsoft Entra roles. The solution must use the principle of least privilege. Which role should you assign to User1?",
    "options": [
      "Identity Governance Administrator",
      "User Access Administrator",
      "User Administrator",
      "Privileged Role Administrator"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Para criar access reviews de **funções do Entra**, o mínimo é **Privileged Role Administrator**."
  },
  {
    "id": "Q352",
    "src": 352,
    "domain": 2,
    "topic": "Conditional Access — templates",
    "type": "single",
    "stem": "You have a Microsoft Entra tenant that contains the users shown in the following table.\n\n![Exhibit](img/S352-stem-1.png){w=355}\n\nAdmin4 creates a Conditional Access policy named Policy1 by using the Require multifactor authentication for Azure management template.\n\nWhich users will be required to use multi-factor authentication (MFA) the next time they sign in?",
    "options": [
      "Admin2 and Admin3 only",
      "Admin1 and Admin4 only",
      "Admin1, Admin2, and Admin3 only",
      "Admin1, Admin2, Admin3, and Admin4"
    ],
    "answer": 3,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O dump marca todos os administradores. Atenção: políticas criadas a partir de templates **excluem o usuário atual** (Admin4) e podem nascer em **report-only**, o que muda a resposta. Confira a discussão."
  },
  {
    "id": "Q353",
    "src": 353,
    "domain": 4,
    "topic": "Access packages",
    "type": "yesno",
    "stem": "You have a Microsoft 365 E5 subscription that contains a Microsoft Teams team named Team1 and two Microsoft 365 groups named Group1 and Group2. The subscription contains the users shown in the following table.\n\n![Exhibit](img/S353-stem-1.png){w=346}\n\nYou create an access package that has the following settings:\n\n- Name: Package1\n- Resource roles:\n  - Team1: Owner\n- Users who can request access: For users in your directory o Specific Users and Groups: Group1\n- Require approval: Yes o Require requestor justification: No o How many stages: 1 o First Approver: Team1, User3 o Require approver justification: Yes\n- Enable new requests: Yes\n- Expiration:\n  - Access package assignments expire: 7 days o Users can request specific timeline: Yes\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can gain access to Team1 by requesting Package1.",
      "User2 can gain access to Team1 by requesting Package1.",
      "User3 can approve their own request for Package1."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Só membros do Group1 podem solicitar: o User1 sim (Sim), o User2 não (Não). Ninguém aprova a própria solicitação, nem um Global Administrator listado como aprovador (Não)."
  },
  {
    "id": "Q354",
    "src": 354,
    "domain": 4,
    "topic": "Entitlement management",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains a Microsoft SharePoint Online site named Site1 and a Microsoft Teams team named Team1. The subscription contains five security groups named Group1, Group2, Group3, Group4, and Group5.\n\nYou need to implement access packages for Site1 and Team1. The solution must meet the following requirements:\n\n- Members of Group3 must be able to request access to Site1 only.\n- Members of Group1 must be able to request access to Site1 and Team1.\n- Members of Group4 must be able to request access to Site1 and Team1.\n- Only members of Group2 must be able to approve access package requests from Group1 members.\n- Only members of Groups must be able to approve access package requests from Group3 and Group4 members.\n\nWhat h the minimum number of access packages you should create?",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "answer": 0,
    "answer_original": 1,
    "scope": "in",
    "review": "corrigida",
    "explanation": "Um access package pode ter **várias políticas** (cada uma com seus solicitantes e aprovadores). Bastam **2 pacotes**: Site1 (política para Group3, aprovado por Group5) e Site1+Team1 (uma política para Group1, aprovada por Group2, e outra para Group4, aprovada por Group5). O dump marcava 3."
  },
  {
    "id": "Q356",
    "src": 356,
    "domain": 3,
    "topic": "Defender for Cloud Apps",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Defender for Cloud Apps.\n\nYou have multiple third-party apps that access the resources in the subscription.\n\nYou need to monitor the access of the third-party apps.\n\nWhat should you create?",
    "options": [
      "an access policy",
      "an app permission policy",
      "an OAuth app policy",
      "an endpoint protection policy"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Monitorar apps de terceiros com acesso OAuth aos dados: **OAuth app policy** (ou app governance)."
  },
  {
    "id": "Q357",
    "src": 357,
    "domain": 3,
    "topic": "Managed identities",
    "type": "single",
    "stem": "You have an Azure subscription that contains a virtual machine named VM1. VM1 has the following configurations:\n\n- Private IP address: 172.16.1.5\n- Public IP address: 108.143.161.25\n- System-assigned managed identity status: On\n\nYou install an app named App1 on VM1.\n\nYou need to configure App1 to request a managed identity app-only access token.\n\nWhich IP address should App1 use for the request?",
    "options": [
      "108.143.161.25",
      "127.0.0.1",
      "169.254.169.254",
      "172.16.1.5"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Tokens de managed identity são obtidos no endpoint **IMDS** em **169.254.169.254** (não roteável, só acessível de dentro da VM)."
  },
  {
    "id": "Q358",
    "src": 358,
    "domain": 2,
    "topic": "MFA resistente a phishing",
    "type": "multi",
    "stem": "You have a Microsoft Entra tenant.\n\nYou need to create a Conditional Access policy to manage administrative access to the tenant. The solution must ensure that administrators are authenticated by using a phishing-resistant multi-factor authentication (MFA) method. Which three authentication methods should you include in the solution? Each correct answer presents a complete solution.",
    "options": [
      "Windows Hello for Business",
      "an FIDO2 security key",
      "certificate-based authentication (multi-factor)",
      "voice call",
      "SMS",
      "email OTP",
      "certificate-based authentication (single-factor)",
      "Microsoft Authenticator"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A authentication strength **Phishing-resistant MFA** inclui **Windows Hello for Business**, **FIDO2/passkeys** e **CBA multifator**."
  },
  {
    "id": "Q361",
    "src": 361,
    "domain": 1,
    "topic": "Pass-through authentication",
    "type": "single",
    "stem": "Your network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs user accounts with a Microsoft 365 E5 subscription. You need to ensure that on-premises account lockout policies are applied to Microsoft Entra sign-ins.\n\nWhat should you configure?",
    "options": [
      "Azure Active Directory Seamless Single Sign-on (Azure AD Seamless SSO)",
      "Microsoft Entra Cloud Sync",
      "password hash synchronization",
      "pass-through authentication"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Com **PTA**, a validação é feita pelo AD on-premises, e a política de bloqueio de conta do AD vale para entradas no Entra."
  },
  {
    "id": "Q365",
    "src": 365,
    "domain": 4,
    "topic": "Terms of use",
    "type": "single",
    "stem": "You have a Microsoft Entra tenant that uses Microsoft Entra ID Premium licenses.\n\nYou plan to configure a terms of use (ToU) for the tenant.\n\nYou need to upload the ToU document.\n\nWhich format should you use for the document?",
    "options": [
      "HTML",
      "RTF",
      "PDF",
      "DOCX"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O documento dos termos de uso do Entra deve ser enviado em **PDF**."
  },
  {
    "id": "Q366",
    "src": 366,
    "domain": 4,
    "topic": "Terms of use",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou need to ensure that users are prompted to accept a custom terms of use (ToU) agreement when they sign in to the subscription.\n\nWhat should you configure?",
    "options": [
      "an access package",
      "a Conditional Access policy",
      "a lifecycle workflow",
      "an authentication method"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Os termos de uso são apresentados no login por uma política de **Conditional Access** com Require terms of use."
  },
  {
    "id": "Q368",
    "src": 368,
    "domain": 1,
    "topic": "Custom security attributes",
    "type": "hotarea",
    "stem": "You have a Microsoft Entra tenant that contains the users shown in the following table.\n\n![Exhibit](img/S368-stem-1.png){w=334}\n\nThe tenant contains the identities shown in the following table.\n\n![Exhibit](img/S368-stem-2.png){w=261}\n\nWhich users can create custom security attributes, and to which identities can the attributes be assigned? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Can create custom security attributes:",
        "options": [
          "User1 only",
          "User2 only",
          "User1 and User2 only",
          "User1 and User3 only",
          "User1, User2, and User3"
        ],
        "answer": 1
      },
      {
        "label": "Custom security attributes can be assigned to:",
        "options": [
          "Group1 only",
          "Group1 and MI1 only",
          "Group1 and Service1 only",
          "Group1, MI1, and Service1 MI1 only",
          "MI1 and Service1 only",
          "Service1 only"
        ],
        "answer": 4
      }
    ],
    "answer_original": [
      1,
      5
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Criar atributos de segurança personalizados exige **Attribute Definition Administrator**; nem o Global Administrator tem essa permissão por padrão. Os atributos podem ser atribuídos a usuários e a **service principals**, o que inclui managed identities, mas **não** a grupos. O dump marcava \"Service1 only\"."
  },
  {
    "id": "Q369",
    "src": 369,
    "domain": 1,
    "topic": "Sincronização entre tenants",
    "type": "single",
    "stem": "You have two Microsoft Entra tenants named contoso.com and fabrikam.com. Contoso.com contains the identities shown in the following table.\n\n![Exhibit](img/S369-stem-1.png){w=259}\n\nYou configure cross-tenant synchronization from contoso.com to fabrikam.com. Which identities will sync with fabrikam.com?",
    "options": [
      "User1 only",
      "User1 and Group1 only",
      "User1 and Group2 only",
      "User1, Group1, and Group2"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "A sincronização entre tenants provisiona **usuários** (como B2B no tenant de destino). Grupos não são sincronizados; o escopo pode usar grupos só para selecionar usuários."
  },
  {
    "id": "Q370",
    "src": 370,
    "domain": 1,
    "topic": "Usuários convidados",
    "type": "single",
    "stem": "You have a Microsoft Entra tenant named contoso.com that contains an enterprise application named App1.\n\nA contractor uses the credentials of contractor@fabrikam.com.\n\nYou need to ensure that you can provide the contractor with access to App1. The contractor must be able to authenticate as contractor@fabrikam.com.\n\nWhat should you do?",
    "options": [
      "Run the New-MgUser cmdlet.",
      "Run the New-MgInvitation cmdlet.",
      "Configure the External collaboration settings.",
      "Implement Microsoft Entra Connect sync."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "**New-MgInvitation** (Graph PowerShell) convida o usuário externo como guest, que autentica com a própria conta."
  },
  {
    "id": "Q372",
    "src": 372,
    "domain": 2,
    "topic": "SSPR",
    "type": "single",
    "stem": "You have a Microsoft Entra tenant.\n\nYou configure self-service password reset (SSPR) by using the following settings:\n\n- Require users to register when signing in: Yes\n- Number of methods required to reset: 1\n\nWhat is a valid authentication method available to users?",
    "options": [
      "a mobile app notification",
      "an FIDO2 security token",
      "a Microsoft Teams chat",
      "an email to an address outside your organization"
    ],
    "answer": 3,
    "answer_original": 0,
    "scope": "in",
    "review": "corrigida",
    "explanation": "Com **um** método exigido para reset, a notificação do app **não** é permitida (só o código). Entre as opções, o válido é o **e-mail alternativo** (fora da organização). O dump marcava a notificação do app."
  },
  {
    "id": "Q374",
    "src": 374,
    "domain": 3,
    "topic": "Azure RBAC e Key Vault",
    "type": "yesno",
    "stem": "You have an Azure subscription named Sub1 that contains two resource groups named RG1 and RG2. Sub1 contains the users shown in the following table.\n\n![Exhibit](img/S374-stem-1.png){w=235}\n\nSub1 contains the resources shown in the following table.\n\n![Exhibit](img/S374-stem-2.png){w=329}\n\nYou create the role-based access control (RBAQ role assignments shown in the following table.\n\n![Exhibit](img/S374-stem-3.png){w=394}\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can read the contents of the secrets stored in Vault1.",
      "User2 can read the contents of the secrets stored in Vault2.",
      "User3 can update the configuration of VM1."
    ],
    "answer": [
      false,
      true,
      true
    ],
    "answer_original": [
      true,
      true,
      true
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "O User1 tem Reader na Sub1 (plano de controle, não lê o conteúdo de segredos) e Key Vault Secrets User só no RG2. O Vault1 está no RG1 (Não). O User2 tem Secrets User no RG2, onde está o Vault2 (Sim). O User3 é Owner do RG1, onde está a VM1 (Sim). O dump marcava Sim na primeira."
  },
  {
    "id": "Q375",
    "src": 375,
    "domain": 3,
    "topic": "Login do Entra em VMs",
    "type": "hotarea",
    "stem": "You have an Azure subscription that contains a resource group named RG1. RG1 contains two virtual machines named VM1 and VM2 that have Microsoft Entra ID login enabled.\n\nThe subscription contains the users shown in the following table.\n\n![Exhibit](img/S375-stem-1.png){w=514}\n\nWhich users can sign in to VM1, and which users can sign in to VM2? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "VM1:",
        "options": [
          "User1 only",
          "User2 only",
          "User3 only",
          "User1 and User3 only",
          "User2 and User3 only",
          "User1, User2, and User3"
        ],
        "answer": 3
      },
      {
        "label": "VM2:",
        "options": [
          "User1 only",
          "User2 only",
          "User3 only",
          "User1 and User3 only",
          "User2 and User3 only",
          "User1, User2, and User3"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O login com conta Entra exige **Virtual Machine User Login** ou **Virtual Machine Administrator Login** no escopo da VM. O User1 tem a função na assinatura (VM1 e VM2) e o User3 só na VM1. Virtual Machine Contributor gerencia a VM, mas não dá login."
  },
  {
    "id": "Q377",
    "src": 377,
    "domain": 2,
    "topic": "Global Secure Access — filtragem web",
    "type": "order",
    "stem": "You have a Microsoft 365 E5 subscription. The subscription contains 500 devices that run Windows.\n\nYou deploy the Global Secure Access client to the devices.\n\nYou need to prevent users from accessing https://contoso.com from the devices.\n\nWhich three actions should you perform in sequence? To answer move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
    "pool": [
      "Create an app protection policy.",
      "Create a Conditional Access policy.",
      "Create a remote network.",
      "Configure a security profile.",
      "Create a web content filtering policy."
    ],
    "answer": [
      4,
      3,
      1
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "No Internet Access do Global Secure Access: criar a **web content filtering policy** (bloqueando contoso.com), vinculá-la a um **security profile** e aplicar o perfil aos usuários por uma **política de Conditional Access** (sessão: Use Global Secure Access security profile)."
  },
  {
    "id": "Q378",
    "src": 378,
    "domain": 2,
    "topic": "Global Secure Access",
    "type": "single",
    "stem": "You have an on-premises app named App1.\n\nYou have a Microsoft Entra tenant.\n\nYou plan to publish App1 by using Microsoft Entra Private Access. You need to enable the Private access profile.\n\nWhich blade should you use in the Microsoft Entra admin center?",
    "options": [
      "Remote networks",
      "Traffic forwarding",
      "Security profiles",
      "Connectors"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Os perfis de encaminhamento (Microsoft, Private Access, Internet Access) são habilitados em **Global Secure Access > Connect > Traffic forwarding**."
  },
  {
    "id": "Q379",
    "src": 379,
    "domain": 3,
    "topic": "Azure Storage — acesso a dados",
    "type": "hotarea",
    "stem": "You have an Azure subscription named Sub1 that contains three users named User1, User2, and User3. Sub1 has a storage account named storage1 that contains the resources shown in the following table.\n\n![Exhibit](img/S379-stem-1.png){w=246}\n\nSub1 contains the users shown in the following table.\n\n![Exhibit](img/S379-stem-2.png){w=445}\n\nWhich users can read File1, and which users can read File2? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "File1:",
        "options": [
          "User2 only",
          "User3 only",
          "User1 and User2 only",
          "User2 and User3 only",
          "User1, User2, and User3"
        ],
        "answer": 3
      },
      {
        "label": "File2:",
        "options": [
          "User2 only",
          "User3 only",
          "User1 and User2 only",
          "User2 and User3 only",
          "User1, User2, and User3"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O User2 tem **Storage Blob Data Reader** e lê o blob File1, mas não arquivos do share. O User3 tem **Storage Account Contributor**, que permite listar as **chaves de acesso**, e com elas lê blob e file share (com Shared Key habilitada). Reader é só plano de controle."
  },
  {
    "id": "Q380",
    "src": 380,
    "domain": 2,
    "topic": "Login do Entra em VMs",
    "type": "single",
    "stem": "You have an Azure subscription. The subscription contains 50 virtual machines that run Windows Server.\n\nYou enable Microsoft Entra login for the virtual machines.\n\nUsers report that they cannot sign in to the virtual machines by using their Microsoft Entra credentials.\n\nYou need to ensure that the users can sign in to the virtual machines. What should you do first?",
    "options": [
      "From the Microsoft Entra admin center, delete the device registrations of the virtual machines.",
      "Revoke the primary refresh token.",
      "Enable SSH client support for OpenSSH.",
      "Ensure that the virtual machines can access https://enterpriseregistration.windows.net."
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "A VM precisa alcançar os endpoints do Entra (ex.: https://enterpriseregistration.windows.net, login.microsoftonline.com) para registrar o dispositivo e autenticar. Sem isso, o login com credenciais do Entra falha."
  },
  {
    "id": "Q383",
    "src": 383,
    "domain": 3,
    "topic": "Login do Entra em VMs",
    "type": "yesno",
    "stem": "You have an Azure subscription named Sub1 that is linked to a Microsoft Entra tenant. The tenant contains the users shown in the following table.\n\n![Exhibit](img/S383-stem-1.png){w=121}\n\nSub1 contains a resource group named RG1.\n\nThe tenant contains the groups shown in the following table.\n\n![Exhibit](img/S383-stem-2.png){w=342}\n\nYou deploy a virtual machine named VM1 to RG1. VM1 runs Windows Server and has Microsoft Entra login enabled.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can sign in to VM1.",
      "User2 can sign in to VM1.",
      "User3 can sign in to VM1."
    ],
    "answer": [
      false,
      true,
      false
    ],
    "answer_original": [
      true,
      true,
      true
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "**Virtual Machine Local User Login** permite entrar só como usuário **local**, não com a conta Entra (User1: Não). **Virtual Machine User Login** no RG1 permite o login Entra (User2: Sim). **Virtual Machine Contributor** gerencia a VM, mas não dá login (User3: Não). O dump marcava Sim nas três."
  },
  {
    "id": "Q385",
    "src": 385,
    "domain": 3,
    "topic": "Azure ABAC",
    "type": "single",
    "stem": "You have an Azure subscription that contains the resources shown in the following table.\n\n![Exhibit](img/S385-stem-1.png){w=222}\n\nYou need to grant permissions to the resources by using attribute-based access control (ABAC).\n\nTo which resource can you grant permissions?",
    "options": [
      "Vault1",
      "VM1",
      "App1",
      "Storage1"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "ABAC (condições de atribuição de função) é suportado para **Azure Storage** (blobs/filas). Não se aplica a Key Vault, VM ou App Service."
  },
  {
    "id": "Q386",
    "src": 386,
    "domain": 3,
    "topic": "Credenciais de aplicativos",
    "type": "multi",
    "stem": "You have an Azure subscription that is linked to a Microsoft Entra tenant. The tenant contains a registered app named App1.\n\nYou have a partner organization that has a Microsoft Entra tenant. The tenant contains a registered app named App2.\n\nYou need to ensure that App1 can access App2.\n\nWhich two types of credentials can App1 use? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "certificate",
      "managed identity",
      "secret",
      "user account",
      "one-time password"
    ],
    "answer": [
      0,
      2
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Um app acessando outro tenant (multitenant/app-only) autentica com **certificado** ou **client secret** do registro do app."
  },
  {
    "id": "Q387",
    "src": 387,
    "domain": 3,
    "topic": "Managed identities",
    "type": "single",
    "stem": "You have an Azure subscription that contains two virtual machines named VM1 and VM2 and an Azure SQL managed instance named SQL1.\n\nYou need to ensure that VM1 and VM2 can retrieve data from SQL1. The solution must minimize administrative effort.\n\nWhat should you create first?",
    "options": [
      "a certificate",
      "a shared access signature (SAS) token",
      "a managed identity",
      "a Microsoft Entra user account"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Para VMs acessarem o SQL Managed Instance sem gerenciar segredos, crie uma **managed identity** (por exemplo, user-assigned compartilhada) e conceda acesso a ela no SQL."
  },
  {
    "id": "Q389",
    "src": 389,
    "domain": 4,
    "topic": "Access reviews",
    "type": "yesno",
    "stem": "You have a Microsoft Entra tenant that contains two groups named Group1 and Group2 and the users shown in the following table.\n\n![Exhibit](img/S389-stem-1.png){w=504}\n\nGroup2 is a member of Group1.\n\nYou configure an access review that has the following settings:\n\n- Name: Review1\n- Select what to review: Teams + Groups\n- Review scope: Select Teams + groups\n- Group: Group1\n- Scope: Guest users only\n- Select reviewers: Group owners(s)\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User3 can perform an access review of User1.",
      "User3 can perform an access review of User4.",
      "User3 can perform an access review of User5."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Escopo **somente guests** do Group1: User1 e User4 são membros (Member), fora do escopo (Não/Não). O User5 é guest do Group2, aninhado no Group1, e entra na revisão como membro **indireto**. O User3, dono do Group1, revisa (Sim)."
  },
  {
    "id": "Q391",
    "src": 391,
    "domain": 4,
    "topic": "Access reviews",
    "type": "yesno",
    "stem": "You have a Microsoft Entra tenant that contains the identities shown in the following table.\n\n![Exhibit](img/S391-stem-1.png){w=346}\n\nGroup1 has the following configurations:\n\n- Owners: User1, User4\n- Members: User1, Managed2, Group2\n\nYou create an access review that has the following settings:\n\n- Name: Review1\n- Review scope: Select Teams + Groups\n- Group: Group1\n- Scope: All users\n- Select reviewers: Group owner(s)\n\nThe Fallback reviewers setting is NOT configured.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can perform an access review for User1.",
      "User1 can perform an access review for Managed2.",
      "User1 can perform an access review for User3."
    ],
    "answer": [
      true,
      true,
      true
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Escopo *All users* com os donos (User1 e User4) como revisores. O User1 revisa todos os membros: a si mesmo, a identidade Managed2 (membro direto) e o User3 (via Group2, aninhado). O gabarito marca Sim nas três; a inclusão de service principals e membros aninhados depende de recursos mais recentes das access reviews."
  },
  {
    "id": "Q394",
    "src": 394,
    "domain": 1,
    "topic": "Hybrid join e Intune",
    "type": "hotarea",
    "stem": "Your on-premises network contains an Active Directory Domain Services (AD DS) domain. The domain contains computers that run Windows 11.\n\nYou have a Microsoft 365 E5 subscription.\n\nYou plan to enable hybrid join and enroll the computers in Microsoft Intune. You need to recommend the software that should be deployed to the domain, and the actions that should be performed in Intune.\n\nWhat should you include in the recommendation? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Domain:",
        "options": [
          "Intune Connector for Active Directory",
          "Microsoft Entra Connect",
          "The Microsoft Entra provisioning agent"
        ],
        "answer": 1
      },
      {
        "label": "Intune:",
        "options": [
          "Create a Windows Autopilot device preparation policy.",
          "Modify the mobile device management (MDM) user scope.",
          "Modify the Windows Information Protection (WIP) user scope."
        ],
        "answer": 1
      }
    ],
    "answer_original": [
      0,
      1
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Os computadores já estão no domínio; o hybrid join é configurado pelo **Microsoft Entra Connect** (Device options). A inscrição automática no Intune exige configurar o **MDM user scope**. O Intune Connector for Active Directory só é usado no cenário Windows Autopilot hybrid join, para novos dispositivos. O dump marcava o Intune Connector."
  },
  {
    "id": "Q396",
    "src": 396,
    "domain": 1,
    "topic": "Company branding",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription.\n\nYou need to ensure that when users access the Microsoft 365 portal from Microsoft Edge and have their browser language set to Spanish, they are presented with a Spanish sign-in form.\n\nWhat should you do in the Microsoft Entra admin center?",
    "options": [
      "From Settings for the users, configure the Usage location setting.",
      "From Global Secure Access, configure the Session management settings.",
      "Configure the Company branding settings.",
      "Create a Conditional Access policy."
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "A personalização da página de entrada por idioma do navegador é feita em **Company branding** (personalização por idioma)."
  },
  {
    "id": "Q397",
    "src": 397,
    "domain": 2,
    "topic": "Global Secure Access",
    "type": "single",
    "stem": "You have a Microsoft Entra tenant that contains the devices shown in the following table.\n\n![Exhibit](img/S397-stem-1.png){w=437}\n\nYou plan to configure Microsoft Entra Private Access.\n\nYou deploy the Global Secure Access client to compatible devices. From which devices can you use Private Access?",
    "options": [
      "Device1 only",
      "Device2 only",
      "Device2 and Device4 only",
      "Device1, Device2, and Device3 only",
      "Device1, Device2, Device3, and Device4"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O cliente GSA para **Windows** exige dispositivo **Entra joined ou hybrid joined** (registrado não serve). O cliente **Android** suporta dispositivos registrados/inscritos. Por isso, Device2 e Device4."
  },
  {
    "id": "Q398",
    "src": 398,
    "domain": 2,
    "topic": "Global Secure Access",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou need to ensure that users can only access resources in the subscription from a device that has the Global Secure Access client connected. What should you do first?",
    "options": [
      "Enable Global Secure Access signaling.",
      "Enable tagging to enforce tenant restrictions.",
      "Create a named location.",
      "Create a remote network."
    ],
    "answer": 0,
    "answer_original": 3,
    "scope": "in",
    "review": "corrigida",
    "explanation": "Exigir que o acesso venha pelo cliente GSA é feito com Conditional Access usando a condição de **compliant network**, que depende de **Global Secure Access signaling** ativado primeiro. Remote network é para filiais sem cliente. O dump marcava remote network."
  },
  {
    "id": "Q399",
    "src": 399,
    "domain": 2,
    "topic": "Global Secure Access",
    "type": "single",
    "stem": "You have a Microsoft Entra tenant.\n\nYou have the devices shown in the following table.\n\n![Exhibit](img/S399-stem-1.png){w=422}\n\nYou configure Microsoft Entra Internet Access for the tenant.\n\nOn which devices can you use Global Secure Access?",
    "options": [
      "Device1 only",
      "Device3 only",
      "Device1 and Device2 only",
      "Device1, Device3, and Device4 only",
      "Device1, Device2, Device3, and Device4"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O cliente GSA para Windows exige dispositivo **Entra joined ou hybrid joined**. Só o Device3 atende."
  },
  {
    "id": "Q401",
    "src": 401,
    "domain": 2,
    "topic": "Global Secure Access",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains the users shown in the following table.\n\n![Exhibit](img/S401-stem-1.png){w=462}\n\nYou configure Microsoft Entra Internet Access.\n\nWhich users can manage Microsoft Entra Internet Access?",
    "options": [
      "User1 only",
      "User2 only",
      "User3 only",
      "User1 and User2 only",
      "User1, User2, and User3"
    ],
    "answer": 3,
    "answer_original": 0,
    "scope": "in",
    "review": "corrigida",
    "explanation": "Gerenciar o Internet Access exige **Global Secure Access Administrator** (ou Global Administrator): User1 e User2. Privileged Role Administrator não gerencia o GSA. O dump marcava só User1."
  },
  {
    "id": "Q402",
    "src": 402,
    "domain": 3,
    "topic": "Defender for Cloud Apps",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou plan to deploy a third-party software as a service (SaaS) app named App1. You need to onboard App1 to Microsoft Defender for Cloud Apps. The solution must ensure that you can implement session control policies.\n\nWhat should you do first?",
    "options": [
      "From the Microsoft Defender portal, configure Cloud discovery.",
      "From the Microsoft Entra admin center, configure single sign-on (SSO) for App1.",
      "From the Microsoft Defender portal, create an OAuth app policy.",
      "From the Microsoft Entra admin center, configure a traffic forwarding profile."
    ],
    "answer": 1,
    "answer_original": 0,
    "scope": "in",
    "review": "corrigida",
    "explanation": "Para session controls, o app precisa usar o Entra como IdP via **SSO** (SAML/OIDC) e ser roteado pelo Conditional Access App Control. Cloud discovery não é pré-requisito. O dump marcava Cloud discovery."
  },
  {
    "id": "Q403",
    "src": 403,
    "domain": 3,
    "topic": "Permissões de API",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription.\n\nYou plan to deploy an app named App1 that will have the following configurations:\n\n- Will be registered in Microsoft Entra\n- Will run as a service without user interaction\n- Will collect audit logs associated with user sign-ins\n- Will access resources by using the Microsoft Graph API\n\nYou need to ensure that App1 can access Microsoft Graph.\n\nWhat should you use?",
    "options": [
      "a built-in role-based access control (RBAC) role",
      "a custom role-based access control (RBAC) role",
      "application permissions",
      "delegated permissions"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Serviço sem usuário interativo lendo logs via Graph: **application permissions** (ex.: AuditLog.Read.All) com consentimento de admin."
  },
  {
    "id": "Q404",
    "src": 404,
    "domain": 4,
    "topic": "Diagnostic settings",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription and an Azure subscription. You plan to analyze Microsoft Entra sign-in logs by using Azure Monitor. You need to configure diagnostic settings for Microsoft Entra. Which destination should you configure for the sign-in logs?",
    "options": [
      "an Azure event hub",
      "an Azure SQL database",
      "a Log Analytics workspace",
      "an Azure Storage account"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Para analisar sign-in logs com Azure Monitor (KQL/workbooks), envie para um **Log Analytics workspace**."
  },
  {
    "id": "Q407",
    "src": 407,
    "domain": 3,
    "topic": "ABAC — condições de atribuição",
    "type": "yesno",
    "stem": "You have an Azure subscription named Sub1 that contains two storage accounts named storage1 and storage2 and the blob containers shown in the following table.\n\n![Exhibit](img/S407-stem-1.png){w=393}\n\nSub1 contains the users shown in the following table.\n\n![Exhibit](img/S407-stem-2.png){w=560}\n\nCondition1 has the following definition:\n\n![Exhibit](img/S407-stem-3.png){w=611}\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can read the contents of blob2.",
      "User1 can read the contents of blob3.",
      "User2 can read the contents of blob1."
    ],
    "answer": [
      false,
      true,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A Condition1 limita a **leitura** de blobs a contêineres chamados `cont1`. O User1 não lê blob2 (cont2) (Não), mas lê blob3 (cont1 do storage2) (Sim). A Condition2 do User2 restringe só a **gravação** (paths com \"2\"); a leitura não é afetada, e ele lê blob1 (Sim)."
  },
  {
    "id": "Q408",
    "src": 408,
    "domain": 1,
    "topic": "Custom security attributes",
    "type": "yesno",
    "stem": "You have a Microsoft 365 E5 subscription that contains two attribute sets named Set1 and Set2. The subscription contains the users shown in the following table.\n\n![Exhibit](img/S408-stem-1.png){w=506}\n\nYou have the custom security attributes shown in the following table.\n\n![Exhibit](img/S408-stem-2.png){w=530}\n\nYou assign User2 the Attribute Definition Administrator role for Set1. For each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can modify the configuration of Secure1.",
      "User2 can view the value of Secure2 for all users.",
      "User3 can view the value of Secure3 for all users."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Global Administrator **não** tem acesso a atributos de segurança personalizados por padrão (User1: Não). Attribute Definition Administrator define atributos, mas **não lê valores** atribuídos (User2: Não). Attribute Assignment Administrator no tenant lê e atribui valores (User3: Sim)."
  },
  {
    "id": "Q409",
    "src": 409,
    "domain": 4,
    "topic": "Entitlement management",
    "type": "single",
    "stem": "You have a Microsoft Entra tenant that contains an access package named Package1 and a user named User1. Package1 is configured as shown in the following exhibit.\n\n![Exhibit](img/S409-stem-1.png){w=611}\n\nYou need to ensure that User1 can modify the review frequency of Package1. The solution must use the principle of least privilege.\n\nWhich role should you assign to User1?",
    "options": [
      "Privileged Role Administrator",
      "External Identity Provider Administrator",
      "Identity Governance Administrator",
      "Security Administrator"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "**Identity Governance Administrator** gerencia access packages, inclusive as configurações de revisão, com o menor privilégio entre as opções."
  },
  {
    "id": "Q411",
    "src": 411,
    "domain": 2,
    "topic": "Global Secure Access",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription.\n\nYou need to create a Conditional Access policy that will use a Global Secure Access security profile. The solution must ensure that users are prevented from accessing websites that include the word gambling in the URL.\n\nWhat should you do first?",
    "options": [
      "Create a web content filtering policy.",
      "Create a named location.",
      "Configure the Adaptive Access settings.",
      "Create a network security group (NSG)."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Para bloquear sites por categoria/URL, crie primeiro uma **web content filtering policy**, depois vincule-a a um **security profile** e use o profile em uma política de CA."
  },
  {
    "id": "Q412",
    "src": 412,
    "domain": 4,
    "topic": "PIM para grupos",
    "type": "single",
    "stem": "You have an Azure subscription that is linked to a Microsoft Entra tenant. The tenant contains the groups shown in the following table.\n\n![Exhibit](img/S412-stem-1.png){w=611}\n\nWhich groups can you manage by using Privileged Identity Management (PIM)?",
    "options": [
      "Group2 only",
      "Group1 and Group2 only",
      "Group2 and Group4 only",
      "Group1, Group2, and Group3 only",
      "Group1, Group2, Group3, and Group4"
    ],
    "answer": 4,
    "answer_original": 0,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O dump marca só o grupo atribuível a funções (Group2), regra antiga dos \"privileged access groups\". Hoje o **PIM for Groups** aceita grupos de segurança e Microsoft 365 com associação atribuída, não exige isAssignableToRole (veja a Q297) — o que indicaria todos os quatro grupos."
  },
  {
    "id": "Q413",
    "src": 413,
    "domain": 4,
    "topic": "Access reviews",
    "type": "yesno",
    "stem": "You have a Microsoft Entra tenant that contains the users shown in the following table.\n\n![Exhibit](img/S413-stem-1.png){w=217}\n\nThe tenant contains the Microsoft 365 groups shown in the following table.\n\n![Exhibit](img/S413-stem-2.png){w=597}\n\nYou create an access review named Access1 that has the following settings:\n\n- Select what to review: Teams + Groups\n- Review scope: All Microsoft groups with guest users\n- Scope: Guest users only\n- Select reviewers: Users review their own access\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can review their membership in Group1 by using Access1.",
      "User2 can review their membership in Group3 by using Access1.",
      "User3 can review their membership in Group2 by using Access1."
    ],
    "answer": [
      false,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Escopo **somente guests**: User1 e User3 são membros e não fazem a autorrevisão (Não/Não). O User2 é guest, mas só no Group3, que é **dinâmico**; a associação é controlada pela regra e não pode ser revisada/removida pela access review (Não)."
  }
]);
