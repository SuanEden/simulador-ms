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
    "skill": "1.2",
    "topic": "Licenciamento por grupo",
    "type": "single",
    "stem": "Você tem um tenant do Azure Active Directory (Azure AD) que contém os seguintes objetos:\n\n- Um dispositivo chamado Device1\n- Usuários chamados User1, User2, User3, User4 e User5\n- Grupos chamados Group1, Group2, Group3, Group4 e Group5\n\nOs grupos estão configurados conforme a tabela a seguir.\n\n![Imagem](img/S001-stem-1.png){w=589}\n\n### Tradução do texto da imagem\n\n| Nome | Tipo | Tipo de associação | Membros |\n|---|---|---|---|\n| Group1 | Segurança | Atribuído | User1, User3, Group2, Group3 |\n| Group2 | Segurança | Usuário Dinâmico | User2 |\n| Group3 | Segurança | Dispositivo Dinâmico | Device1 |\n| Group4 | Microsoft 365 | Atribuído | User4 |\n| Group5 | Microsoft 365 | Usuário Dinâmico | User5 |\n\nA quais grupos você pode atribuir diretamente uma licença do Microsoft Office 365 Enterprise E5?",
    "options": [
      "Somente Group1 e Group4",
      "Group1, Group2, Group3, Group4 e Group5",
      "Somente Group1 e Group2",
      "Somente Group1",
      "Somente Group1, Group2, Group4 e Group5"
    ],
    "answer": 2,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Licença por grupo exige grupo de **segurança** (ou M365 group com securityEnabled). Grupo de dispositivos não consome licença. Pela tabela, só Group1 e Group2 são elegíveis. Parte da comunidade argumenta que grupos M365 criados pelo portal do Entra também aceitam licença.",
    "details": "**Por que não as outras**\n- **Group3 / Group4 / Group5:** pela tabela, são grupos de dispositivos, distribuição ou M365 sem securityEnabled, que não aceitam licenciamento por grupo.\n- **Todos os grupos:** grupos com associação de dispositivos não consomem licença de usuário.\n\n**Dica de prova:** Licenciamento por grupo exige Entra ID P1 (ou E3/A3/Business Premium) no tenant.",
    "docs": [
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/licensing-group-advanced"
    ]
  },
  {
    "id": "Q002",
    "src": 2,
    "domain": 1,
    "skill": "1.3",
    "topic": "Cadastro por autoatendimento",
    "type": "single",
    "stem": "Você tem uma organização do Microsoft Exchange que usa o espaço de endereços SMTP contoso.com.\n\nVários usuários usam seus endereços de email contoso.com para se cadastrar por autoatendimento no Azure Active Directory (Azure AD).\n\nVocê obtém privilégios de administrador global no tenant do Azure AD que contém esses usuários cadastrados por autoatendimento.\n\nVocê precisa impedir que os usuários criem contas de usuário no tenant contoso.com do Azure AD para se cadastrar por autoatendimento nos serviços do Microsoft 365. Qual cmdlet do PowerShell você deve executar?",
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
    "details": "**Por que não as outras**\n- **Set-MsolDomainFederationSettings / Update-MsolFederatedDomain:** tratam de federação (AD FS), não de sign-up.\n- **Set-MsolDomain:** altera propriedades do domínio, não a política de sign-up.\n\n**Dica de prova:** Hoje: Update-MgPolicyAuthorizationPolicy -AllowEmailVerifiedUsersToJoinOrganization:$false e -AllowedToSignUpEmailBasedSubscriptions:$false.",
    "docs": [
      {
        "t": "Inscrição por autoatendimento para usuários com email verificado - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/directory-self-service-signup"
      },
      {
        "t": "Inscrição por autoatendimento - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/self-service-sign-up-overview"
      },
      {
        "t": "Propriedades de usuários convidados B2B - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/user-properties"
      },
      {
        "t": "Autenticação com senha de uso único por email - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/one-time-passcode"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/directory-self-service-signup"
    ]
  },
  {
    "id": "Q003",
    "src": 3,
    "domain": 1,
    "skill": "1.3",
    "topic": "Senha de uso único por email",
    "type": "single",
    "stem": "Você tem um tenant do Microsoft 365 que usa o domínio chamado fabrikam.com. As configurações de convite de convidados do Azure Active Directory (Azure AD) estão definidas conforme a imagem. (Clique na aba Imagem.)\n\n![Imagem](img/S003-stem-1.png){w=611}\n\n### Tradução do texto da primeira imagem\n\n**Acesso de usuário convidado — Restrições de acesso de usuário convidado (versão prévia)**\n\n- Usuários convidados têm o mesmo acesso que membros (mais inclusivo; não selecionado).\n- Usuários convidados têm acesso limitado às propriedades e associações de objetos de diretório (selecionado).\n- O acesso de usuários convidados é restrito às propriedades e associações de seus próprios objetos de diretório (mais restritivo; não selecionado).\n\n**Configurações de convite de convidados**\n\n| Configuração | Valor selecionado |\n|---|---|\n| Administradores e usuários com a função Emissor de Convites para Convidados podem convidar | Sim |\n| Membros podem convidar | Sim |\n| Convidados podem convidar | Não |\n| Senha de uso único por email para convidados | Sim |\n| Habilitar cadastro por autoatendimento de convidados por fluxos de usuário (versão prévia) | Sim |\n\nOs seletores também oferecem a opção oposta Sim/Não. Links informativos: Saiba mais.\n\n**Restrições de colaboração**\n\n- Permitir o envio de convites para qualquer domínio (mais inclusivo; selecionado).\n- Negar convites para os domínios especificados (não selecionado).\n- Permitir convites somente para os domínios especificados (mais restritivo; não selecionado).\n\nUm usuário em fabrikam.com compartilha uma biblioteca de documentos do Microsoft SharePoint Online com os usuários mostrados na tabela a seguir.\n\n![Imagem](img/S003-stem-2.png){w=594}\n\n### Tradução do texto da segunda imagem\n\n| Nome | Email | Descrição |\n|---|---|---|\n| User1 | User1@contoso.com | Um usuário convidado em fabrikam.com |\n| User2 | User2@outlook.com | Um usuário que nunca acessou recursos em fabrikam.com |\n| User3 | User3@fabrikam.com | Um usuário em fabrikam.com |\n\nQuais usuários receberão uma senha de uso único por email?",
    "options": [
      "Somente User2",
      "Somente User1",
      "Somente User1 e User2",
      "User1, User2 e User3"
    ],
    "answer": 0,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "OTP é usado por convidados **novos** que não têm conta Entra, Microsoft account (MSA) nem federação. O dump marca só User2. Ponto discutível: outlook.com é uma Microsoft account, que pela documentação **não** recebe OTP, e User1 já é guest. Confira a discussão.",
    "details": "**Por que não as outras**\n- **User1 (já guest):** quem já resgatou o convite usa o método existente.\n- **User3 / outros:** contas com Entra ID, Microsoft account ou federação (SAML/Google) não recebem OTP.\n\n**Dica de prova:** O OTP é o fallback para convidados sem nenhum provedor de identidade; os códigos valem por 30 minutos.",
    "docs": [
      {
        "t": "Autenticação com senha de uso único por email - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/one-time-passcode"
      },
      {
        "t": "Propriedades de usuários convidados B2B - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/user-properties"
      },
      {
        "t": "Inscrição por autoatendimento - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/self-service-sign-up-overview"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/one-time-passcode"
    ]
  },
  {
    "id": "Q004",
    "src": 4,
    "domain": 1,
    "skill": "1.2",
    "topic": "Licenciamento",
    "type": "single",
    "stem": "Você tem 2.500 usuários com licenças do Microsoft Office 365 Enterprise E3 atribuídas. As licenças são atribuídas individualmente aos usuários.\n\nNo painel Grupos do centro de administração do Azure Active Directory, você atribui licenças do Microsoft 365 Enterprise E5 aos usuários.\n\nVocê precisa remover as licenças do Office 365 Enterprise E3 dos usuários com o menor esforço administrativo possível.\n\nO que você deve usar?",
    "options": [
      "o painel Governança de Identidade do centro de administração do Azure Active Directory",
      "o cmdlet Set-AzureAdUser",
      "o painel Licenças do centro de administração do Azure Active Directory",
      "o cmdlet Set-WindowsProductKey"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Remover a licença E3 atribuída diretamente de 2.500 usuários de uma vez é mais simples pelo blade **Licenses** (selecionar o produto e remover os usuários em massa).",
    "details": "**Por que não as outras**\n- **Identity Governance:** access reviews e entitlement; não remove licenças.\n- **Set-AzureADUser:** altera propriedades do usuário, não licenças (e o módulo foi aposentado).\n- **Set-WindowsProductKey:** chave do Windows; não tem relação.\n\n**Dica de prova:** Em Licenses > All products > Office 365 E3 > Licensed users, selecione todos e remova a licença em massa.",
    "docs": [
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Set-MgUserLicense (Microsoft.Graph.Users.Actions)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"
      },
      {
        "t": "Atribuir ou remover licenças de usuários no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/assign-licenses-to-users"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/microsoft-365/admin/manage/remove-licenses-from-users?view=o365-worldwide"
    ]
  },
  {
    "id": "Q005",
    "src": 5,
    "domain": 1,
    "skill": "1.3",
    "topic": "Colaboração externa",
    "type": "yesno",
    "stem": "Você tem um tenant do Microsoft 365 chamado contoso.com.\n\nO acesso de usuários convidados está habilitado.\n\nOs usuários são convidados a colaborar com contoso.com conforme a tabela a seguir.\n\n![Imagem](img/S005-stem-1.png){w=541}\n\n### Tradução do texto da primeira imagem\n\n| Email do usuário | Tipo de usuário | Convite aceito | Recurso compartilhado |\n|---|---|---|---|\n| User1@outlook.com | Convidado | Não | Aplicativo empresarial |\n| User2@fabrikam.com | Convidado | Sim | Aplicativo empresarial |\n\nNas Configurações de colaboração externa do centro de administração do Azure Active Directory, você define as Restrições de colaboração conforme a imagem a seguir.\n\n![Imagem](img/S005-stem-2.png){w=485}\n\n### Tradução do texto da segunda imagem\n\n**Restrições de colaboração**\n\n- Permitir o envio de convites para qualquer domínio (mais inclusivo; não selecionado).\n- Negar convites para os domínios especificados (não selecionado).\n- Permitir convites somente para os domínios especificados (mais restritivo; selecionado).\n\nControle: Excluir. Tabela: DOMÍNIOS DE DESTINO; Outlook.com.\n\nEm um site do Microsoft SharePoint Online, um usuário convida User3 para o site.\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "User1 pode aceitar o convite e obter acesso ao aplicativo empresarial.",
      "User2 pode acessar o aplicativo empresarial.",
      "User3 pode aceitar o convite e obter acesso ao site do SharePoint."
    ],
    "answer": [
      true,
      true,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "As restrições de colaboração só permitem convites para outlook.com. User1 (outlook.com) pode aceitar o convite. User2 já tinha resgatado o convite antes da restrição e continua com acesso. O domínio de User3 não é permitido, então o convite não é enviado.",
    "details": "**Item a item**\n- **User1 (outlook.com):** Sim. Está na allow list.\n- **User2:** Sim. O convite foi resgatado antes da restrição; mudar a allow list não remove acessos existentes.\n- **User3:** Não. O domínio não está permitido, e o convite falha.\n\n**Dica de prova:** A allow/deny list vale para **novos convites**; revise contas existentes com access reviews.",
    "docs": [
      {
        "t": "Configurar a colaboração externa - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/external-collaboration-settings-configure"
      },
      {
        "t": "Permitir ou bloquear convites - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/allow-deny-list"
      }
    ]
  },
  {
    "id": "Q006",
    "src": 6,
    "domain": 1,
    "skill": "1.3",
    "topic": "B2B em massa",
    "type": "multi",
    "stem": "Você tem um tenant do Azure Active Directory (Azure AD) chamado contoso.com. Você planeja convidar em massa usuários de colaboração business-to-business (B2B) do Azure AD. Quais dois parâmetros você deve incluir ao criar o convite em massa? Cada resposta correta apresenta parte da solução.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "endereço de email",
      "URL de redirecionamento",
      "nome de usuário",
      "chave compartilhada",
      "senha"
    ],
    "answer": [
      0,
      1
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O CSV de convite em massa exige **endereço de e-mail** e **URL de redirecionamento**; os demais campos são opcionais.",
    "details": "**Por que não as outras**\n- **username / password:** o convidado usa a própria identidade; não se definem credenciais.\n- **shared key:** não existe no B2B.\n\n**Dica de prova:** Colunas opcionais: mensagem do convite, envio do e-mail (TRUE/FALSE) e CC.",
    "docs": [
      {
        "t": "Convidar usuários B2B em massa - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/tutorial-bulk-invite"
      },
      {
        "t": "Adicionar usuários de colaboração B2B - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/add-users-administrator"
      },
      {
        "t": "Resgate de convites de colaboração B2B do Microsoft Entra - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/redemption-experience"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/tutorial-bulk-invite"
    ]
  },
  {
    "id": "Q007",
    "src": 7,
    "domain": 1,
    "skill": "1.2",
    "topic": "Grupos",
    "type": "single",
    "stem": "Você tem um tenant do Azure Active Directory (Azure AD) que contém os objetos mostrados na tabela a seguir.\n\n![Imagem](img/S007-stem-1.png){w=589}\n\n### Tradução do texto da imagem\n\n| Nome | Tipo | Licença atribuída diretamente |\n|---|---|---|\n| User1 | Usuário | Nenhuma |\n| User2 | Usuário | Microsoft Office 365 Enterprise E5 |\n| Group1 | Grupo de segurança | Microsoft Office 365 Enterprise E5 |\n| Group2 | Grupo do Microsoft 365 | Nenhuma |\n| Group3 | Grupo de segurança habilitado para email | Nenhuma |\n\nQuais objetos você pode adicionar como membros a Group3?",
    "options": [
      "Somente User2 e Group2",
      "Somente User2, Group1 e Group2",
      "User1, User2, Group1 e Group2",
      "Somente User1 e User2",
      "Somente User2"
    ],
    "answer": 4,
    "scope": "in",
    "review": "ok",
    "explanation": "Mail-enabled security group é gerenciado pelo Exchange: aceita apenas destinatários com caixa de e-mail (User2, licenciado). Não aceita usuário sem licença/caixa (User1), grupo de segurança comum nem grupo M365 como membros.",
    "details": "**Por que não as outras**\n- **User1:** sem caixa de correio (sem licença), não é destinatário do Exchange.\n- **Group1 / Group2:** grupos de segurança comuns ou M365 não podem ser membros de um mail-enabled security group pelo Entra.\n\n**Dica de prova:** Mail-enabled security groups e listas de distribuição são gerenciados no Exchange admin center.",
    "docs": [
      {
        "t": "Como gerenciar grupos - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups"
      },
      {
        "t": "Gerenciar regras de grupos de associação dinâmica no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership"
      },
      {
        "t": "Definir a expiração de grupos do Microsoft 365 - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-lifecycle"
      }
    ],
    "refs": [
      "https://bitsizedbytes.wordpress.com/2018/12/10/distribution-security-and-office-365-groups-nesting/"
    ]
  },
  {
    "id": "Q008",
    "src": 8,
    "domain": 1,
    "skill": "1.1",
    "topic": "Tomada de controle administrativo",
    "type": "order",
    "stem": "Você tem uma organização local do Microsoft Exchange que usa o espaço de endereços SMTP contoso.com.\n\nVocê descobre que os usuários usam seus endereços de email para se cadastrar por autoatendimento nos serviços do Microsoft 365.\n\nVocê precisa obter privilégios de administrador global no tenant do Azure Active Directory (Azure AD) que contém esses usuários cadastrados por autoatendimento.\n\nQuais quatro ações você deve executar em sequência? Para responder, mova as ações apropriadas da lista de ações para a área de resposta e organize-as na ordem correta.",
    "pool": [
      "Entrar no centro de administração do Microsoft 365.",
      "Criar uma conta de usuário por autoatendimento no tenant do Azure AD.",
      "No centro de administração do Microsoft 365, adicionar o nome de domínio.",
      "Responder à mensagem Torne-se o administrador.",
      "No centro de administração do Microsoft 365, remover o nome de domínio.",
      "Criar um registro TXT na zona DNS contoso.com."
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
    "details": "**Sequência**\n- **Adicionar ou remover o domínio no admin center:** no takeover interno, o próprio fluxo \"Become the admin\" pede o TXT; não se adiciona o domínio antes.\n\n**Dica de prova:** O takeover **externo** (domínio movido para outro tenant gerenciado) é feito adicionando o domínio no seu tenant e verificando o TXT.",
    "docs": [
      {
        "t": "Assumir o controle administrativo de um diretório não gerenciado - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/domains-admin-takeover"
      },
      {
        "t": "Adicionar seu domínio personalizado - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/add-custom-domain"
      },
      {
        "t": "Adicionar e verificar nomes de domínio personalizados - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/domains-manage"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/domains-admin-takeover"
    ]
  },
  {
    "id": "Q009",
    "src": 9,
    "domain": 1,
    "skill": "1.2",
    "topic": "Grupos",
    "type": "hotarea",
    "stem": "Você tem um tenant do Azure Active Directory (Azure AD) que contém um usuário chamado User1 e os grupos mostrados na tabela a seguir.\n\n![Imagem](img/S009-stem-1.png){w=430}\n\n### Tradução do texto da primeira imagem\n\n| Nome | Tipo | Tipo de associação |\n|---|---|---|\n| Group1 | Segurança | Atribuído |\n| Group2 | Segurança | Usuário Dinâmico |\n| Group3 | Segurança | Dispositivo Dinâmico |\n| Group4 | Microsoft 365 | Atribuído |\n\nNo tenant, você cria os grupos mostrados na tabela a seguir.\n\n![Imagem](img/S009-stem-2.png){w=429}\n\n### Tradução do texto da segunda imagem\n\n| Nome | Tipo | Tipo de associação |\n|---|---|---|\n| GroupA | Segurança | Atribuído |\n| GroupB | Microsoft 365 | Atribuído |\n\nQuais membros você pode adicionar a GroupA e GroupB? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "GroupA:",
        "options": [
          "Somente User1",
          "Somente User1 e Group1",
          "Somente User1, Group1 e Group2",
          "Somente User1, Group1 e Group4",
          "Somente User1, Group1, Group2 e Group3",
          "User1, Group1, Group2, Group3 e Group4"
        ],
        "answer": 4
      },
      {
        "label": "GroupB:",
        "options": [
          "Somente User1",
          "Somente User1 e Group4",
          "Somente User1, Group1 e Group3",
          "Somente User1, Group1, Group2 e Group4",
          "User1, Group1, Group2, Group3 e Group4"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Grupos de segurança aceitam usuários e outros grupos de segurança/distribuição habilitados conforme o tipo, mas **não** grupos Microsoft 365 como membros. Grupos Microsoft 365 aceitam **apenas usuários** (sem grupos aninhados).",
    "details": "**Item a item**\n- **GroupA (segurança) com Group4:** Group4 é M365; grupos M365 não podem ser aninhados em grupos de segurança.\n- **GroupB (M365) com grupos:** grupos Microsoft 365 só aceitam usuários.\n\n**Dica de prova:** Grupos de segurança aceitam usuários, dispositivos, service principals e outros grupos de segurança.",
    "docs": [
      {
        "t": "Como gerenciar grupos - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups"
      },
      {
        "t": "Gerenciar regras de grupos de associação dinâmica no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership"
      },
      {
        "t": "Definir a expiração de grupos do Microsoft 365 - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-lifecycle"
      }
    ],
    "refs": [
      "https://bitsizedbytes.wordpress.com/2018/12/10/distribution-security-and-office-365-groups-nesting/"
    ]
  },
  {
    "id": "Q010",
    "src": 10,
    "domain": 1,
    "skill": "1.4",
    "topic": "Autenticação híbrida",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "DISABLED"
    },
    "stem": "Observação: esta questão faz parte de uma série de questões que apresentam o mesmo cenário. Cada questão da série contém uma solução diferente que pode atender aos objetivos declarados. Algumas séries podem ter mais de uma solução correta, enquanto outras podem não ter nenhuma.\n\nDepois de responder a uma questão desta seção, você NÃO poderá voltar a ela. Por isso, essas questões não aparecerão na tela de revisão.\n\nVocê tem uma floresta do Active Directory que é sincronizada com um tenant do Azure Active Directory (Azure AD).\n\nVocê descobre que, quando uma conta de usuário é desabilitada no Active Directory, o usuário desabilitado ainda pode se autenticar no Azure AD por até 30 minutos. Você precisa garantir que, quando uma conta de usuário for desabilitada no Active Directory, ela seja imediatamente impedida de se autenticar no Azure AD.\n\nSolução: você configura o write-back de senha.\n\nIsso atende ao objetivo?",
    "options": [
      "Sim",
      "Não"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Password writeback só grava no AD as senhas alteradas na nuvem. Não muda o fato de o usuário desabilitado continuar autenticando via hash sincronizado.",
    "details": "**Série \"Solution\" (bloquear na hora o usuário desabilitado no AD):** só **pass-through authentication** (ou federação) atende. Password writeback, Conditional Access e Password Protection não atendem.\n\n**Dica de prova:** Com PHS, a mudança de estado chega no próximo ciclo de sync (30 min); com PTA, o DC valida em tempo real.",
    "docs": [
      {
        "t": "Autenticação para soluções de identidade híbrida do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn"
      },
      {
        "t": "Entender as etapas de migração da autenticação de aplicativos do AD FS para o Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/migrate-adfs-apps-stages"
      },
      {
        "t": "Migrar da federação para a autenticação na nuvem no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/migrate-from-federation-to-cloud-authentication"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/choose-ad-authn"
    ]
  },
  {
    "id": "Q011",
    "src": 11,
    "domain": 1,
    "skill": "1.4",
    "topic": "Autenticação híbrida",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "DISABLED"
    },
    "stem": "Observação: esta questão faz parte de uma série de questões que apresentam o mesmo cenário. Cada questão da série contém uma solução diferente que pode atender aos objetivos declarados. Algumas séries podem ter mais de uma solução correta, enquanto outras podem não ter nenhuma.\n\nDepois de responder a uma questão desta seção, você NÃO poderá voltar a ela. Por isso, essas questões não aparecerão na tela de revisão.\n\nVocê tem uma floresta do Active Directory que é sincronizada com um tenant do Azure Active Directory (Azure AD).\n\nVocê descobre que, quando uma conta de usuário é desabilitada no Active Directory, o usuário desabilitado ainda pode se autenticar no Azure AD por até 30 minutos. Você precisa garantir que, quando uma conta de usuário for desabilitada no Active Directory, ela seja imediatamente impedida de se autenticar no Azure AD.\n\nSolução: você configura a autenticação de passagem.\n\nIsso atende ao objetivo?",
    "options": [
      "Sim",
      "Não"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Com **pass-through authentication**, a senha é validada no AD on-premises em tempo real; conta desabilitada é bloqueada imediatamente.",
    "details": "**Série \"Solution\":** PTA valida a senha e o estado da conta no AD on-premises a cada login. Contas desabilitadas, expiradas ou bloqueadas falham imediatamente.",
    "docs": [
      {
        "t": "Autenticação para soluções de identidade híbrida do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn"
      },
      {
        "t": "Entender as etapas de migração da autenticação de aplicativos do AD FS para o Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/migrate-adfs-apps-stages"
      },
      {
        "t": "Migrar da federação para a autenticação na nuvem no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/migrate-from-federation-to-cloud-authentication"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/choose-ad-authn"
    ]
  },
  {
    "id": "Q012",
    "src": 12,
    "domain": 1,
    "skill": "1.4",
    "topic": "Autenticação híbrida",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "DISABLED"
    },
    "stem": "Observação: esta questão faz parte de uma série de questões que apresentam o mesmo cenário. Cada questão da série contém uma solução diferente que pode atender aos objetivos declarados. Algumas séries podem ter mais de uma solução correta, enquanto outras podem não ter nenhuma.\n\nDepois de responder a uma questão desta seção, você NÃO poderá voltar a ela. Por isso, essas questões não aparecerão na tela de revisão.\n\nVocê tem um tenant do Azure Active Directory (Azure AD) que é sincronizado com uma floresta do Active Directory.\n\nVocê descobre que, quando uma conta de usuário é desabilitada no Active Directory, o usuário desabilitado ainda pode se autenticar no Azure AD por até 30 minutos. Você precisa garantir que, quando uma conta de usuário for desabilitada no Active Directory, ela seja imediatamente impedida de se autenticar no Azure AD.\n\nSolução: você configura políticas de Acesso Condicional.\n\nIsso atende ao objetivo?",
    "options": [
      "Sim",
      "Não"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Conditional Access não lê o estado da conta no AD on-premises; o atraso vem do ciclo de sincronização do hash. A solução é PTA.",
    "details": "**Série \"Solution\":** Conditional Access avalia sinais da nuvem; não sabe que a conta foi desabilitada no AD até o sync.",
    "docs": [
      {
        "t": "Autenticação para soluções de identidade híbrida do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn"
      },
      {
        "t": "Entender as etapas de migração da autenticação de aplicativos do AD FS para o Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/migrate-adfs-apps-stages"
      },
      {
        "t": "Migrar da federação para a autenticação na nuvem no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/migrate-from-federation-to-cloud-authentication"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/choose-ad-authn"
    ]
  },
  {
    "id": "Q013",
    "src": 13,
    "domain": 1,
    "skill": "1.2",
    "topic": "Licenciamento por grupo",
    "type": "single",
    "stem": "Você tem um tenant do Azure Active Directory (Azure AD) que contém os seguintes objetos.\n\n- Um dispositivo chamado Device1\n- Usuários chamados User1, User2, User3, User4 e User5\n\nCinco grupos chamados Group1, Group2, Group3, Group4 e Group5\n\nOs grupos estão configurados conforme a tabela a seguir.\n\n![Imagem](img/S013-stem-1.png){w=569}\n\n### Tradução do texto da imagem\n\n| Nome | Tipo | Tipo de associação | Membros |\n|---|---|---|---|\n| Group1 | Segurança | Atribuído | User1, User3, Group2, Group4 |\n| Group2 | Segurança | Usuário Dinâmico | User2 |\n| Group3 | Segurança | Dispositivo Dinâmico | Device1 |\n| Group4 | Microsoft 365 | Atribuído | User4 |\n| Group5 | Microsoft 365 | Atribuído | User5 |\n\nQuantas licenças serão usadas se você atribuir a licença do Microsoft 365 Enterprise E5 a Group1?",
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
    "details": "**Por que não as outras**\n- **0:** os membros diretos do Group1 consomem licença.\n- **3 ou 4:** membros de grupos aninhados não herdam; a contagem é só de usuários diretos (pela tabela, 2).\n\n**Dica de prova:** Dispositivos membros também não consomem licença.",
    "docs": [
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/licensing-group-advanced"
    ]
  },
  {
    "id": "Q014",
    "src": 14,
    "domain": 1,
    "skill": "1.3",
    "topic": "Usuários convidados",
    "type": "single",
    "stem": "Você tem um tenant do Azure Active Directory (Azure AD) chamado contoso.com que contém um aplicativo empresarial do Azure AD chamado App1.\n\nUm prestador de serviço usa as credenciais de contractor@fabrikam.com.\n\nVocê precisa garantir que possa fornecer ao prestador acesso a App1. O prestador deve poder se autenticar como contractor@fabrikam.com.\n\nO que você deve fazer?",
    "options": [
      "Executar o cmdlet New-AzADUser.",
      "Definir as Configurações de colaboração externa.",
      "Adicionar um provedor de identidade WS-Fed.",
      "Criar uma conta de usuário convidado em contoso.com."
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Para que a pessoa autentique com a própria conta externa, crie/convide um **usuário guest** no tenant (B2B).",
    "details": "**Por que não as outras**\n- **New-AzADUser:** cria usuário **membro** com credencial do seu tenant.\n- **External collaboration settings:** controlam quem pode convidar, mas sozinhos não criam o acesso.\n- **WS-Fed IdP:** só é necessário se o parceiro usar federação WS-Fed; a fabrikam.com pode usar Entra ID.\n\n**Dica de prova:** Depois do convite, atribua o guest ao App1 (Users and groups do enterprise app).",
    "docs": [
      {
        "t": "Redefinir o status de resgate de convidados - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/reset-redemption-status"
      },
      {
        "t": "New-MgInvitation (Microsoft.Graph.Identity.SignIns)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/new-mginvitation"
      },
      {
        "t": "Início rápido: adicionar um usuário convidado e enviar um convite - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/b2b-quickstart-add-guest-users-portal"
      },
      {
        "t": "Propriedades de usuários convidados B2B - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/user-properties"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/b2b-quickstart-add-guest-users-portal"
    ]
  },
  {
    "id": "Q015",
    "src": 15,
    "domain": 1,
    "skill": "1.4",
    "topic": "Entra Connect Sync",
    "type": "single",
    "stem": "Sua rede contém uma floresta do Active Directory chamada contoso.com, vinculada a um tenant do Azure Active Directory (Azure AD) chamado contoso.com usando o Azure AD Connect.\n\nVocê precisa impedir a sincronização de usuários cujo atributo extensionAttribute15 esteja definido como NoSync.\n\nO que você deve fazer no Azure AD Connect?",
    "options": [
      "Criar uma regra de sincronização de entrada para o conector do Windows Azure Active Directory.",
      "Configurar um perfil de execução de Importação Completa.",
      "Criar uma regra de sincronização de entrada para o conector do Active Directory Domain Services.",
      "Configurar um perfil de execução de Exportação."
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Filtragem negativa por atributo é feita com uma regra de sincronização **inbound** no conector do **Active Directory** (AD → metaverso), com scoping filter extensionAttribute15 = NoSync e ação cloudFiltered = True.",
    "details": "**Por que não as outras**\n- **Regra inbound no conector do Entra ID:** atua no fluxo nuvem → metaverso, não filtra objetos do AD.\n- **Full Import / Export run profile:** são execuções do ciclo, não filtros.\n\n**Dica de prova:** Na regra: Precedence menor que as padrão, Scoping filter extensionAttribute15 EQUAL NoSync, Transformation cloudFiltered = True.",
    "docs": [
      {
        "t": "Microsoft Entra Connect Sync: alterar a configuração padrão - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-change-the-configuration"
      },
      {
        "t": "O que são o Microsoft Entra Connect e o Connect Health? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-azure-ad-connect"
      },
      {
        "t": "Entender o Microsoft Entra Connect Sync - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-whatis"
      },
      {
        "t": "Microsoft Entra Connect Sync: configurar a filtragem - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-configure-filtering"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-sync-change-the-configuration"
    ]
  },
  {
    "id": "Q016",
    "src": 16,
    "domain": 1,
    "skill": "1.4",
    "topic": "Autenticação de passagem",
    "type": "single",
    "stem": "Sua rede contém um domínio do Active Directory local, sincronizado com um tenant do Azure Active Directory (Azure AD). O tenant contém os usuários mostrados na tabela a seguir.\n\n![Imagem](img/S016-stem-1.png){w=359}\n\n### Tradução do texto da primeira imagem\n\n| Nome | Tipo | Sincronizado com o diretório |\n|---|---|---|\n| User1 | Usuário | Não |\n| User2 | Usuário | Sim |\n| User3 | Convidado | Não |\n\nTodos os usuários trabalham remotamente.\n\nO Azure AD Connect está configurado no Azure AD conforme a imagem a seguir.\n\n![Imagem](img/S016-stem-2.png){w=585}\n\n### Tradução do texto da segunda imagem\n\n**Provisionamento a partir do Active Directory**\n\nProvisionamento na nuvem do Azure AD Connect: este recurso permite gerenciar o provisionamento pela nuvem. Gerenciar provisionamento (versão prévia).\n\n**Sincronização do Azure AD Connect**\n\n| Configuração | Valor |\n|---|---|\n| Status da sincronização | Habilitado |\n| Última sincronização | Há menos de 1 hora |\n| Sincronização de hash de senha | Habilitada |\n\n**Entrada do usuário**\n\n| Configuração | Status | Quantidade |\n|---|---|---|\n| Federação | Desabilitada | 0 domínios |\n| Logon único contínuo | Desabilitado | 0 domínios |\n| Autenticação de passagem | Habilitada | 2 agentes |\n\nA conectividade do domínio local com a internet é perdida. Quais usuários podem entrar no Azure AD?",
    "options": [
      "Somente User1 e User3",
      "Somente User1",
      "User1, User2 e User3",
      "Somente User1 e User2"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Com PTA ativo, usuários sincronizados (User2) dependem dos agentes on-premises; sem internet no ambiente local, não autenticam (o fallback para PHS não é automático). Usuários somente nuvem (User1) e guests (User3) continuam entrando.",
    "details": "**Por que não as outras**\n- **User2 entra:** Não. Com PTA, usuários sincronizados precisam do agente on-premises alcançável.\n- **Só User1:** guests (User3) autenticam no tenant de origem e não dependem do seu AD.\n\n**Dica de prova:** Configure PHS como backup; a troca para PHS é manual (mudar o método de login), não automática.",
    "docs": [
      {
        "t": "Microsoft Entra Connect: autenticação de passagem - Limitações atuais - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta-current-limitations"
      },
      {
        "t": "Microsoft Entra Connect: autenticação de passagem - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta"
      },
      {
        "t": "Autenticação de passagem do Microsoft Entra - Início rápido - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta-quick-start"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-pta-current-limitations"
    ]
  },
  {
    "id": "Q017",
    "src": 17,
    "domain": 1,
    "skill": "1.4",
    "topic": "Autenticação híbrida",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "DISABLED"
    },
    "stem": "Observação: esta questão faz parte de uma série de questões que apresentam o mesmo cenário. Cada questão da série contém uma solução diferente que pode atender aos objetivos declarados. Algumas séries podem ter mais de uma solução correta, enquanto outras podem não ter nenhuma.\n\nDepois de responder a uma questão desta seção, você NÃO poderá voltar a ela. Por isso, essas questões não aparecerão na tela de revisão.\n\nVocê tem uma floresta do Active Directory que é sincronizada com um tenant do Azure Active Directory (Azure AD).\n\nVocê descobre que, quando uma conta de usuário é desabilitada no Active Directory, o usuário desabilitado ainda pode se autenticar no Azure AD por até 30 minutos. Você precisa garantir que, quando uma conta de usuário for desabilitada no Active Directory, ela seja imediatamente impedida de se autenticar no Azure AD.\n\nSolução: você configura o Azure AD Password Protection.\n\nIsso atende ao objetivo?",
    "options": [
      "Sim",
      "Não"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O Password Protection só aplica listas de senhas banidas; não tem relação com o atraso de contas desabilitadas. A solução é PTA.",
    "details": "**Série \"Solution\":** o Password Protection bane senhas fracas; não controla o estado da conta.",
    "docs": [
      {
        "t": "Autenticação para soluções de identidade híbrida do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn"
      },
      {
        "t": "Entender as etapas de migração da autenticação de aplicativos do AD FS para o Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/migrate-adfs-apps-stages"
      },
      {
        "t": "Migrar da federação para a autenticação na nuvem no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/migrate-from-federation-to-cloud-authentication"
      }
    ]
  },
  {
    "id": "Q018",
    "src": 18,
    "domain": 1,
    "skill": "1.4",
    "topic": "Entra Connect Sync",
    "type": "yesno",
    "stem": "Sua rede contém um domínio do Active Directory local chamado contoso.com. O domínio contém os objetos mostrados na tabela a seguir.\n\n![Imagem](img/S018-stem-1.png){w=603}\n\n### Tradução do texto da primeira imagem\n\n| Nome | Tipo | Na unidade organizacional (OU) | Descrição |\n|---|---|---|---|\n| User1 | Usuário | OU1 | User1 é membro de Group1. |\n| User2 | Usuário | OU1 | User2 não é membro de nenhum grupo. |\n| Group1 | Grupo de segurança | OU2 | User1 e Group2 são membros de Group1. |\n| Group2 | Grupo de segurança | OU1 | Group2 é membro de Group1. |\n\nVocê instala o Azure AD Connect. Define as configurações de Filtragem de domínio e OU conforme a imagem Filtragem de domínio e OU. (Clique na aba Filtragem de domínio e OU.)\n\n![Imagem](img/S018-stem-2.png){w=611}\n\n### Tradução do texto da segunda imagem\n\n**Microsoft Azure Active Directory Connect — Filtragem de domínio e OU**\n\nSe você alterar a configuração de filtragem de OU de um diretório, o próximo ciclo de sincronização executará automaticamente uma importação completa nesse diretório.\n\nDiretório: contoso.com. Controle: Atualizar Domínios.\n\n- Sincronizar todos os domínios e OUs (não selecionado).\n- Sincronizar domínios e OUs selecionados (selecionado).\n\nNa árvore de contoso.com, OU1 e OU2 estão marcadas. As entradas Builtin, Computers, Domain Controllers, ForeignSecurityPrincipals, Infrastructure, LostAndFound, Managed Service Accounts, Program Data, System e Users estão desmarcadas. Esses são os nomes dos contêineres exibidos.\n\nMenu lateral: Boas-vindas; Tarefas; Conectado ao Azure AD; Sincronização; Conectar Diretórios; Filtragem de Domínio/OU; Filtragem; Recursos Opcionais; Configurar. Botões: Anterior; Avançar.\n\nVocê define as configurações de Filtrar usuários e dispositivos conforme a imagem Filtrar Usuários e Dispositivos. (Clique na aba Filtrar Usuários e Dispositivos.)\n\n![Imagem](img/S018-stem-3.png){w=611}\n\n### Tradução do texto da terceira imagem\n\n**Microsoft Azure Active Directory Connect — Filtrar usuários e dispositivos**\n\nPara uma implantação piloto, especifique um grupo que contenha os usuários e dispositivos que serão sincronizados. Grupos aninhados não são compatíveis e serão ignorados.\n\n- Sincronizar todos os usuários e dispositivos (não selecionado).\n- Sincronizar selecionados (selecionado).\n\nFloresta: contoso.com. Grupo: CN=Group1,OU=OU2,DC=contoso,DC=com. Controle: Resolver (marca de verificação exibida).\n\nMenu lateral: Boas-vindas; Tarefas; Conectado ao Azure AD; Sincronização; Conectar Diretórios; Filtragem de Domínio/OU; Filtragem; Recursos Opcionais; Configurar. Botões: Anterior; Avançar.\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "User1 é sincronizado com o Azure AD.",
      "User2 é sincronizado com o Azure AD.",
      "Group2 é sincronizado com o Azure AD."
    ],
    "answer": [
      true,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Com filtragem por grupo no Entra Connect, só os **membros diretos** do grupo são sincronizados. Um grupo aninhado (Group2) é sincronizado como objeto, mas os membros dele não.",
    "details": "**Item a item**\n- **User1:** Sim. Membro direto do grupo de filtro e dentro da OU selecionada.\n- **User2:** Não. Membro só de grupo aninhado, e a filtragem por grupo não é recursiva.\n- **Group2:** Sim. É membro direto do grupo de filtro (o objeto grupo sincroniza; os membros dele, não).\n\n**Dica de prova:** A filtragem por grupo é recomendada só para pilotos; em produção, use filtragem por domínio/OU ou por atributo.",
    "docs": [
      {
        "t": "Personalizar uma instalação do Microsoft Entra Connect - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-install-custom"
      },
      {
        "t": "O que são o Microsoft Entra Connect e o Connect Health? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-azure-ad-connect"
      },
      {
        "t": "Entender o Microsoft Entra Connect Sync - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-whatis"
      },
      {
        "t": "Microsoft Entra Connect Sync: configurar a filtragem - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-configure-filtering"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-custom"
    ]
  },
  {
    "id": "Q019",
    "src": 19,
    "domain": 1,
    "skill": "1.3",
    "topic": "External ID — cobrança",
    "type": "single",
    "stem": "Você tem um tenant do Azure Active Directory (Azure AD) chamado contoso.com. Você precisa garantir que o preço do Azure AD External Identities seja baseado em usuários ativos mensais (MAU).\n\nO que você deve configurar?",
    "options": [
      "um fluxo de usuário",
      "os termos de uso",
      "uma assinatura vinculada",
      "uma revisão de acesso"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Para usar a cobrança por **MAU** do External ID, o tenant precisa estar **vinculado a uma assinatura Azure** (linked subscription).",
    "details": "**Por que não as outras**\n- **User flow:** define o fluxo de cadastro, não a cobrança.\n- **Terms of use:** termos de aceite.\n- **Access review:** governança de acesso.\n\n**Dica de prova:** O vínculo é feito em External Identities > Linked subscriptions; as primeiras 50.000 MAU são gratuitas.",
    "docs": [
      {
        "t": "Preços do External ID - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/external-identities-pricing"
      },
      {
        "t": "Provedores de identidade para tenants de força de trabalho - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/identity-providers"
      },
      {
        "t": "Adicionar um provedor de identidade SAML/WS-Fed - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/direct-federation"
      },
      {
        "t": "Provedor de identidade do Google - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/google-federation"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/external-identities-pricing"
    ]
  },
  {
    "id": "Q020",
    "src": 20,
    "domain": 1,
    "skill": "1.1",
    "topic": "Domínios personalizados",
    "type": "order",
    "stem": "Você tem um novo tenant do Microsoft 365 que usa o nome de domínio contoso.onmicrosoft.com.\n\nVocê registra o nome contoso.com com um registrador de domínios.\n\nVocê precisa usar contoso.com como nome de domínio padrão para novos usuários do Microsoft 365.\n\nQuais quatro ações você deve executar em sequência? Para responder, mova as ações apropriadas da lista de ações para a área de resposta e organize-as na ordem correta.",
    "pool": [
      "Excluir o domínio contoso.ommicrosoft.com.",
      "Adicionar o nome de domínio personalizado contoso.com.",
      "Definir o domínio como primário.",
      "Criar um novo registro TXT no DNS.",
      "Verificar com êxito o nome de domínio."
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
    "details": "**Sequência**\n- **Excluir contoso.onmicrosoft.com:** o domínio inicial não pode ser removido.\n\n**Dica de prova:** A propagação do TXT pode levar até 72 h. Depois de verificado, defina o domínio como padrão em Domain names.",
    "docs": [
      {
        "t": "Adicionar seu domínio personalizado - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/add-custom-domain"
      },
      {
        "t": "Adicionar e verificar nomes de domínio personalizados - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/domains-manage"
      },
      {
        "t": "Assumir o controle administrativo de um diretório não gerenciado - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/domains-admin-takeover"
      }
    ],
    "refs": [
      "https://practical365.com/configure-a-custom-domain-in-office-365/"
    ]
  },
  {
    "id": "Q021",
    "src": 21,
    "domain": 1,
    "skill": "1.1",
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
    "details": "**Item a item**\n- **Mais 4 dispositivos:** Não. O limite (5) soma joined + registered; ele tem 4, e cabe 1.\n- **Admin1 (Cloud Device Admin) mudar a exigência de MFA:** Não. Device settings exige Global Admin (ou função com permissão nas configurações de dispositivo).\n- **Admin2 admin local no Device3:** Não. Os administradores locais adicionais valem só em dispositivos **Entra joined**.\n\n**Dica de prova:** A configuração \"Require MFA to join\" foi substituída por uma ação de usuário no Conditional Access (Register or join devices).",
    "docs": [
      {
        "t": "Gerenciar dispositivos no Microsoft Entra ID usando o centro de administração do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/manage-device-identities"
      },
      {
        "t": "Permissões padrão de usuários - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions"
      },
      {
        "t": "Definir configurações de grupo usando o PowerShell - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-settings-cmdlets"
      },
      {
        "t": "Impor uma política de nomenclatura de grupos no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-naming-policy"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/devices/device-management-azure-portal"
    ]
  },
  {
    "id": "Q022",
    "src": 22,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "User1: funções do Entra ID (User administrator, Device Administrators, Identity Governance Administrator) → **Entra admin center**. User2: os role groups Records Management e Quarantine Administrator são do **Exchange admin center** (parte da comunidade aponta o portal Purview). User3: funções do Intune → **Intune (Endpoint Manager) admin center**.",
    "details": "**Item a item**\n- **User1 em outro portal:** funções do Entra (inclusive Identity Governance Administrator) são atribuídas no Entra admin center.\n- **User2 no Entra:** Records Management e Quarantine Administrator são role groups do Exchange/Purview.\n- **User3 no Entra:** funções do Intune (RBAC do Intune) são atribuídas no Intune admin center.",
    "docs": [
      {
        "t": "Centro de administração do Microsoft 365 - Visão geral - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/admin-overview/admin-center-overview"
      },
      {
        "t": "Funções internas do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
      },
      {
        "t": "Criar uma função personalizada no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-create"
      },
      {
        "t": "Atribuir funções do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/manage-roles-portal"
      }
    ]
  },
  {
    "id": "Q023",
    "src": 23,
    "domain": 1,
    "skill": "1.4",
    "topic": "Autenticação de passagem",
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
    "details": "**Por que não as outras**\n- **DCs (Server1/Server2):** a política proíbe DC com acesso à internet.\n- **Server3:** pela tabela, não atende os requisitos (ex.: sem saída para a internet ou com softwares não exigidos).\n\n**Dica de prova:** Recomendação: três agentes PTA no total, em servidores membro Windows Server 2016+ com saída na 443.",
    "docs": [
      {
        "t": "Autenticação de passagem do Microsoft Entra - Início rápido - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta-quick-start"
      },
      {
        "t": "Microsoft Entra Connect: autenticação de passagem - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-pta-quick-start"
    ]
  },
  {
    "id": "Q024",
    "src": 24,
    "domain": 1,
    "skill": "1.3",
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
    "details": "**Por que não as outras**\n- **External collaboration settings:** não criam o convidado.\n- **WS-Fed IdP:** não é necessário para uma conta Entra/Microsoft.\n- **Entra Connect:** sincroniza o **seu** AD; não traz contas de outra organização.\n\n**Dica de prova:** Equivalente atual: New-MgInvitation -InvitedUserEmailAddress contractor@fabrikam.com -InviteRedirectUrl https://myapps.microsoft.com.",
    "docs": [
      {
        "t": "Redefinir o status de resgate de convidados - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/reset-redemption-status"
      },
      {
        "t": "New-MgInvitation (Microsoft.Graph.Identity.SignIns)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/new-mginvitation"
      },
      {
        "t": "Início rápido: adicionar um usuário convidado e enviar um convite - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/b2b-quickstart-add-guest-users-portal"
      },
      {
        "t": "Propriedades de usuários convidados B2B - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/user-properties"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/b2b-quickstart-add-guest-users-portal",
      "https://docs.microsoft.com/en-us/powershell/module/azuread/new-azureadmsinvitation?view=azureadps-2.0"
    ]
  },
  {
    "id": "Q025",
    "src": 25,
    "domain": 1,
    "skill": "1.2",
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
    "details": "**Por que não as outras**\n- **Administrative units:** delimitam escopo de administração; não removem licenças.\n- **Set-AzureADUser:** não gerencia licenças.\n- **Groups blade:** as licenças E3 são diretas, e o blade de grupos não remove licenças diretas.\n\n**Dica de prova:** Hoje: Get-MgUser -All | ForEach-Object { Set-MgUserLicense -UserId $_.Id -RemoveLicenses @($skuE3) -AddLicenses @() }.",
    "docs": [
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Set-MgUserLicense (Microsoft.Graph.Users.Actions)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/powershell/module/msonline/set-msoluserlicense?"
    ]
  },
  {
    "id": "Q026",
    "src": 26,
    "domain": 1,
    "skill": "1.3",
    "topic": "Cadastro por autoatendimento",
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
    "details": "**Item a item**\n- **Linked subscription:** é sobre cobrança MAU.\n- **PIM:** acesso privilegiado.\n- **External collaboration settings:** controlam convites, não o método OTP de cadastro (o OTP é habilitado em All identity providers).\n- **Access reviews / access package / tenant properties:** não definem os campos do cadastro.\n\n**Dica de prova:** O user flow também é associado ao app (Applications no user flow) para disparar o cadastro.",
    "docs": [
      {
        "t": "Inscrição por autoatendimento para usuários com email verificado - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/directory-self-service-signup"
      },
      {
        "t": "Inscrição por autoatendimento - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/self-service-sign-up-overview"
      },
      {
        "t": "Provedores de identidade para tenants de força de trabalho - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/identity-providers"
      },
      {
        "t": "Propriedades de usuários convidados B2B - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/user-properties"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/identity-providers",
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/self-service-sign-up-overview"
    ]
  },
  {
    "id": "Q027",
    "src": 27,
    "domain": 1,
    "skill": "1.2",
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
    "details": "**Por que não as outras**\n- **identityIssuer / userType:** não são colunas obrigatórias do modelo.\n- **givenName / surname:** opcionais.\n- **usageLocation:** opcional no CSV (necessário só para licenças).\n\n**Dica de prova:** O CSV do portal pede: Name, User name, Initial password e Block sign in (Yes/No).",
    "docs": [
      {
        "t": "Criar usuários em massa no portal do Azure - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/users-bulk-add"
      },
      {
        "t": "Adicionar membros de grupos em massa carregando um arquivo CSV - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-bulk-import-members"
      },
      {
        "t": "Visão geral do SDK do Microsoft Graph PowerShell",
        "u": "https://learn.microsoft.com/en-us/powershell/microsoftgraph/overview"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/users-bulk-add"
    ]
  },
  {
    "id": "Q028",
    "src": 28,
    "domain": 1,
    "skill": "1.4",
    "topic": "SSO contínuo",
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
    "details": "**Por que não as outras**\n- **Sign-in options do Settings:** configuram Windows Hello/PIN, não o SSO.\n- **Enterprise State Roaming:** sincroniza configurações, não autenticação.\n- **Authentication Agent:** é do PTA, não do Seamless SSO.\n\n**Dica de prova:** A GPO usada é \"Site to Zone Assignment List\" com https://autologon.microsoftazuread-sso.com = 1 (Intranet).",
    "docs": [
      {
        "t": "Início rápido: logon único contínuo do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sso-quick-start"
      },
      {
        "t": "Microsoft Entra Connect: logon único contínuo - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sso"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-sso-quick-start"
    ]
  },
  {
    "id": "Q030",
    "src": 30,
    "domain": 1,
    "skill": "1.2",
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
    "details": "**Item a item**\n- **Job title do User1 (sincronizado):** o AD on-premises é a fonte de autoridade.\n- **Usage location só para alguns:** é atributo de nuvem e pode ser editado em todos, inclusive convidados.\n\n**Dica de prova:** Em usuários sincronizados, o Entra mostra o campo desabilitado com a nota \"source of authority: Windows Server AD\".",
    "docs": [
      {
        "t": "Como gerenciar informações de perfil de usuário no centro de administração do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-user-profile-info"
      },
      {
        "t": "Como criar, convidar e excluir usuários no Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users"
      },
      {
        "t": "Restaurar ou remover permanentemente um usuário excluído recentemente - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/users-restore"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-users-profile-azure-portal",
      "https://docs.microsoft.com/en-us/power-platform/admin/invite-users-azure-active-directory-b2b-collaboration#update-users-name-and-usage-location"
    ]
  },
  {
    "id": "Q031",
    "src": 31,
    "domain": 4,
    "skill": "4.1",
    "topic": "Gerenciamento de direitos",
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
    "details": "**Por que não as outras**\n- **Groups administrator / Service support administrator:** não delegam a criação de catálogos.\n- **Funções do General catalog:** dão papéis só naquele catálogo, não a criação de novos.\n\n**Dica de prova:** Catalog creator pode criar catálogos e adicionar recursos que ele já possui (grupos, apps, sites).",
    "docs": [
      {
        "t": "Criar e gerenciar um catálogo de recursos no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-catalog-create"
      },
      {
        "t": "Funções internas do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
      },
      {
        "t": "O que é o gerenciamento de direitos? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"
      },
      {
        "t": "Cenários comuns no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-scenarios"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-catalog-create",
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference"
    ]
  },
  {
    "id": "Q032",
    "src": 32,
    "domain": 1,
    "skill": "1.4",
    "topic": "SSO contínuo",
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
    "details": "**Por que não as outras**\n- **Sign-in options / Enterprise State Roaming / Authentication Agent:** nenhum deles adiciona a URL à zona Intranet.\n\n**Dica de prova:** O Seamless SSO exige Kerberos: o dispositivo precisa estar no domínio e alcançar um DC.",
    "docs": [
      {
        "t": "Início rápido: logon único contínuo do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sso-quick-start"
      },
      {
        "t": "Microsoft Entra Connect: logon único contínuo - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sso"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-sso-quick-start"
    ]
  },
  {
    "id": "Q033",
    "src": 33,
    "domain": 1,
    "skill": "1.3",
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
    "details": "**Por que não as outras**\n- **Application Proxy:** publica apps on-premises; o SharePoint Online já está na nuvem.\n- **Segundo Entra Connect (ou o mesmo) sincronizando para o West:** cria contas **membros** duplicadas, que precisariam de licença no West.\n\n**Dica de prova:** Cross-tenant synchronization automatiza a criação dos B2B; os convidados usam a licença do tenant de origem (o SharePoint B2B não exige licença extra).",
    "docs": [
      {
        "t": "Considerações comuns para o gerenciamento de usuários em vários tenants no Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/multi-tenant-common-considerations"
      },
      {
        "t": "Visão geral do acesso entre tenants - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-overview"
      },
      {
        "t": "Configurações de acesso entre tenants - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-settings-b2b-collaboration"
      }
    ],
    "refs": [
      "https://redmondmag.com/articles/2020/03/11/guest-access-sharepoint-online-team-sites.aspx",
      "https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/multi-tenant-common-considerations"
    ]
  },
  {
    "id": "Q034",
    "src": 34,
    "domain": 2,
    "skill": "2.1",
    "topic": "Padrões de segurança",
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
    "details": "**Por que não as outras**\n- **User consent settings:** tratam de consentimento a apps.\n- **MFA registration policy:** é do ID Protection e não libera o CA.\n- **Password protection on-premises:** sem relação com CA.\n\n**Dica de prova:** Também é preciso Entra ID P1 para criar políticas de Conditional Access.",
    "docs": [
      {
        "t": "Configurar Padrões de segurança para o Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"
      },
      {
        "t": "Configurar a autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"
      },
      {
        "t": "Visão geral da autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/concept-fundamentals-security-defaults"
    ]
  },
  {
    "id": "Q035",
    "src": 35,
    "domain": 2,
    "skill": "2.1",
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
    "details": "**Por que não as outras**\n- **Named location:** é condição, não método de autenticação.\n- **Authenticator:** exige celular, que é proibido.\n- **Windows Hello for Business:** fica preso ao dispositivo (TPM); com PCs compartilhados, o usuário teria que provisionar em cada um, e sem biometria só restaria PIN por máquina.\n\n**Dica de prova:** FIDO2 funciona em qualquer PC (USB/NFC) e é resistente a phishing.",
    "docs": [
      {
        "t": "Método de autenticação com chaves de acesso (FIDO2) no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2"
      },
      {
        "t": "Gerenciar métodos de autenticação - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"
      },
      {
        "t": "Visão geral da autenticação baseada em certificado do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication"
      },
      {
        "t": "Configurar um Passe de Acesso Temporário no Microsoft Entra ID para registrar métodos de autenticação sem senha - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-passwordless"
    ]
  },
  {
    "id": "Q036",
    "src": 36,
    "domain": 2,
    "skill": "2.2",
    "topic": "Acesso Condicional",
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
    "details": "**Por que não as outras**\n- **Cloud apps or actions:** escolhe o recurso, não o protocolo do cliente.\n- **User risk / sign-in risk:** tratam de risco do ID Protection.\n\n**Dica de prova:** Hoje, use o template \"Block legacy authentication\"; sem MFA possível em protocolos legados, bloquear é o caminho.",
    "docs": [
      {
        "t": "Bloquear a autenticação herdada com o Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-block-legacy-authentication"
      },
      {
        "t": "Acesso Condicional do Microsoft Entra: mecanismo de políticas de Confiança Zero - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview"
      },
      {
        "t": "Planejar a implantação do Acesso Condicional do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access"
      },
      {
        "t": "Criar políticas de Acesso Condicional no Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/block-legacy-authentication"
    ]
  },
  {
    "id": "Q037",
    "src": 37,
    "domain": 2,
    "skill": "2.3",
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
    "details": "**Por que não as outras**\n- **Impossible travel / atypical travel / anonymous IP:** são detecções de risco de **entrada** (sign-in).\n\n**Dica de prova:** Outras detecções de risco de usuário: Microsoft Entra threat intelligence (usuário), possible attempt to access PRT e anomalous user activity.",
    "docs": [
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/concept-identity-protection-risks"
    ]
  },
  {
    "id": "Q038",
    "src": 38,
    "domain": 2,
    "skill": "2.2",
    "topic": "Acesso Condicional — sessão",
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
    "details": "**Por que não as outras**\n- **Activity policy do MDCA:** alerta ou governa depois do fato; não impede o download em tempo real.\n- **CA com client apps:** escolhe browser/clientes, mas sozinho não bloqueia download.\n- **App discovery policy:** trata de Shadow IT.\n\n**Dica de prova:** \"Use app enforced restrictions\" no SharePoint permite acesso limitado (somente web, sem download) a dispositivos não gerenciados.",
    "docs": [
      {
        "t": "Controle de aplicativos de Acesso Condicional - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-intro-aad"
      },
      {
        "t": "Políticas adaptáveis de tempo de vida de sessão do Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-session-lifetime"
      },
      {
        "t": "Configurar políticas adaptáveis de tempo de vida de sessão - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-session-lifetime"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/cloud-app-security/proxy-intro-aad"
    ]
  },
  {
    "id": "Q039",
    "src": 39,
    "domain": 2,
    "skill": "2.1",
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
    "details": "**Por que não as outras**\n- **Application Proxy:** publica apps web, não VPN RADIUS.\n- **Password Protection proxy:** trata de senhas banidas.\n- **PTA proxy:** não existe; o agente PTA não faz MFA para VPN.\n\n**Dica de prova:** A extensão NPS envia a 2ª etapa ao Entra MFA. O usuário precisa estar sincronizado e ter MFA registrado.",
    "docs": [
      {
        "t": "VPN com autenticação multifator do Microsoft Entra usando a extensão NPS - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-nps-extension-vpn"
      },
      {
        "t": "Configurar a autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"
      },
      {
        "t": "Configurar Padrões de segurança para o Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"
      },
      {
        "t": "Visão geral da autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-nps-extension-vpn"
    ]
  },
  {
    "id": "Q040",
    "src": 40,
    "domain": 2,
    "skill": "2.1",
    "topic": "Proteção de senha",
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
    "details": "**Por que não as outras**\n- **Entra Connect:** sincronização; não serve ao Password Protection.\n- **Application Proxy / PCNS:** sem relação.\n\n**Dica de prova:** Arquitetura: agente DC em todos os DCs (sem internet) + 2 ou mais proxies em servidores membro com saída na 443.",
    "docs": [
      {
        "t": "Implantar a Proteção por Senha do Microsoft Entra no ambiente local - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-ban-bad-on-premises-deploy"
      },
      {
        "t": "Proteção por senha no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad"
      },
      {
        "t": "Proteção por senha do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad-on-premises"
      },
      {
        "t": "Prevenir ataques usando o bloqueio inteligente - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-smart-lockout"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-password-ban-bad-on-premises-deploy"
    ]
  },
  {
    "id": "Q042",
    "src": 42,
    "domain": 2,
    "skill": "2.1",
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
    "details": "**Por que não as outras**\n- **Notificação do Authenticator / SMS:** exigem celular conectado.\n- **App password:** credencial legada para apps sem MFA; não é método de MFA.\n\n**Dica de prova:** O WHfB conta como MFA porque combina posse (TPM do dispositivo) e conhecimento ou biometria (PIN/Hello).",
    "docs": [
      {
        "t": "Visão geral da autenticação do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/overview-authentication"
      },
      {
        "t": "Visão geral do Windows Hello for Business",
        "u": "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/"
      },
      {
        "t": "Gerenciar métodos de autenticação - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"
      },
      {
        "t": "Visão geral da autenticação baseada em certificado do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-methods",
      "https://docs.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/hello-overview"
    ]
  },
  {
    "id": "Q043",
    "src": 43,
    "domain": 2,
    "skill": "2.1",
    "topic": "MFA — alerta de fraude",
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
    "details": "**Série \"Solution\" (bloquear quem reporta MFA não iniciado):** só **Fraud alert** com bloqueio automático atende. Notifications, Account lockout e Block/unblock users não atendem.\n\n**Dica de prova:** O substituto moderno é **Report suspicious activity** (Authentication methods > Settings), que marca o usuário como alto risco para o ID Protection.",
    "docs": [
      {
        "t": "Configurar a autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"
      },
      {
        "t": "Configurar Padrões de segurança para o Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"
      },
      {
        "t": "Visão geral da autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings"
    ]
  },
  {
    "id": "Q044",
    "src": 44,
    "domain": 2,
    "skill": "2.1",
    "topic": "MFA — alerta de fraude",
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
    "details": "**Série \"Solution\":** Account lockout conta negações seguidas de MFA (ex.: 10 em 5 min); não reage ao \"reportar fraude\".",
    "docs": [
      {
        "t": "Configurar a autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"
      },
      {
        "t": "Configurar Padrões de segurança para o Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"
      },
      {
        "t": "Visão geral da autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings"
    ]
  },
  {
    "id": "Q045",
    "src": 45,
    "domain": 2,
    "skill": "2.1",
    "topic": "MFA — alerta de fraude",
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
    "details": "**Série \"Solution\":** Block/unblock users é uma ação manual do administrador; o requisito é automático.",
    "docs": [
      {
        "t": "Configurar a autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"
      },
      {
        "t": "Configurar Padrões de segurança para o Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"
      },
      {
        "t": "Visão geral da autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings"
    ]
  },
  {
    "id": "Q046",
    "src": 46,
    "domain": 2,
    "skill": "2.3",
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
    "details": "**Item a item**\n- **PIM / Identity Governance / SSPR:** não detectam credenciais vazadas.\n- **Sign-in risk:** leaked credentials é risco de **usuário**.\n- **Client apps / device state / location:** não são sinais de risco.\n- **Block access / app enforced restrictions / app protection:** não remediam a credencial comprometida (o requisito pede manter o acesso).\n\n**Dica de prova:** A troca de senha segura exige que o usuário já tenha MFA registrado (e SSPR habilitado, para híbridos com writeback).",
    "docs": [
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/concept-identity-protection-risks"
    ]
  },
  {
    "id": "Q047",
    "src": 47,
    "domain": 2,
    "skill": "2.3",
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
    "details": "**Item a item**\n- **Configurar a política com Security operator/reader:** só **Security administrator** (ou superior) altera políticas.\n- **Ver o relatório só com o Security admin:** Security operator, Security reader e Global reader também veem usuários de risco.\n\n**Dica de prova:** As políticas de risco legadas do ID Protection estão sendo substituídas por políticas de Conditional Access baseadas em risco.",
    "docs": [
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection"
    ]
  },
  {
    "id": "Q048",
    "src": 48,
    "domain": 1,
    "skill": "1.1",
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
    "details": "**Item a item**\n- **Admin1 redefine senha de User3/User4:** Não. Eles não são membros da AU; ser membro de um grupo da AU não os coloca no escopo.\n- **Admin1 adiciona User1 ao Group2:** Sim. O User administrator com escopo na AU gerencia os grupos dela.\n- **Admin2 redefine senha do User1:** Sim. O escopo do Admin2 é o diretório.\n\n**Dica de prova:** Adicionar um grupo à AU não adiciona os membros do grupo à AU.",
    "docs": [
      {
        "t": "Unidades administrativas no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units"
      },
      {
        "t": "Criar ou excluir unidades administrativas - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-manage"
      },
      {
        "t": "Adicionar usuários, grupos ou dispositivos a uma unidade administrativa - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-members-add"
      },
      {
        "t": "Unidades administrativas de gerenciamento restrito no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-restricted-management"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/administrative-units"
    ]
  },
  {
    "id": "Q049",
    "src": 49,
    "domain": 2,
    "skill": "2.1",
    "topic": "MFA — alerta de fraude",
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
    "details": "**Série \"Solution\":** **Fraud alert** atende: \"Allow users to submit fraud alerts\" + \"Automatically block users who report fraud\". O usuário bloqueado fica 90 dias bloqueado para MFA ou até um admin desbloquear.",
    "docs": [
      {
        "t": "Configurar a autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"
      },
      {
        "t": "Configurar Padrões de segurança para o Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"
      },
      {
        "t": "Visão geral da autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings"
    ]
  },
  {
    "id": "Q050",
    "src": 50,
    "domain": 2,
    "skill": "2.1",
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
    "details": "**Por que não as outras**\n- **Notificação do Authenticator:** precisa de conectividade no celular.\n- **E-mail:** não é método de MFA para login (só para SSPR).\n- **Perguntas de segurança:** só SSPR.\n\n**Dica de prova:** O código TOTP (30 s) funciona offline porque deriva do relógio e de um segredo local.",
    "docs": [
      {
        "t": "Método de autenticação do Microsoft Authenticator - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-authenticator-app"
      },
      {
        "t": "Gerenciar métodos de autenticação - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"
      },
      {
        "t": "Visão geral da autenticação baseada em certificado do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication"
      },
      {
        "t": "Configurar um Passe de Acesso Temporário no Microsoft Entra ID para registrar métodos de autenticação sem senha - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-authenticator-app#verification-code-from-mobile-app"
    ]
  },
  {
    "id": "Q051",
    "src": 51,
    "domain": 2,
    "skill": "2.2",
    "topic": "Acesso Condicional",
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
    "details": "**Item a item**\n- **HighRiskCountries como cloud app / grant / session:** locais são **condições** da política.\n- **Sign-in frequency como condição / grant:** é controle de **sessão**.\n\n**Dica de prova:** Configurar a sign-in frequency para \"Every time\" exige reautenticação a cada acesso (em cenários suportados).",
    "docs": [
      {
        "t": "Política de Acesso Condicional: usar sinais de rede - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-assignment-network"
      },
      {
        "t": "Acesso Condicional: gerenciar controles de sessão com eficiência - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-session"
      },
      {
        "t": "Acesso Condicional do Microsoft Entra: mecanismo de políticas de Confiança Zero - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview"
      },
      {
        "t": "Planejar a implantação do Acesso Condicional do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/location-condition",
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-session"
    ]
  },
  {
    "id": "Q052",
    "src": 52,
    "domain": 2,
    "skill": "2.1",
    "topic": "Bloqueio inteligente",
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
    "details": "**Item a item**\n- **5 / 10 / 11:** repetir a mesma senha errada não conta de novo enquanto ela estiver entre as 3 últimas.\n- **Limpar cache / InPrivate:** o bloqueio é no servidor (Entra), não no navegador.\n\n**Dica de prova:** O smart lockout padrão é de 10 tentativas e 60 s de bloqueio; o desbloqueio também acontece com uma troca de senha bem-sucedida.",
    "docs": [
      {
        "t": "Prevenir ataques usando o bloqueio inteligente - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-smart-lockout"
      },
      {
        "t": "Proteção por senha no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad"
      },
      {
        "t": "Proteção por senha do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad-on-premises"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-sspr-deployment"
    ]
  },
  {
    "id": "Q053",
    "src": 53,
    "domain": 2,
    "skill": "2.2",
    "topic": "Acesso Condicional",
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
    "details": "**Item a item**\n- **MFA em Conditions / Users / Sessions:** exigir MFA é um **grant control**.\n- **8 h em Conditions / Grant:** frequência de login é **session control**.\n- **Enable policy:** só liga ou desliga a política (On / Report-only / Off).",
    "docs": [
      {
        "t": "Exigir MFA para todos os usuários com o Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-mfa-strength"
      },
      {
        "t": "Acesso Condicional do Microsoft Entra: mecanismo de políticas de Confiança Zero - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview"
      },
      {
        "t": "Planejar a implantação do Acesso Condicional do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access"
      },
      {
        "t": "Criar políticas de Acesso Condicional no Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/howto-conditional-access-policy-all-users-mfa"
    ]
  },
  {
    "id": "Q054",
    "src": 54,
    "domain": 2,
    "skill": "1.1",
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
    "details": "**Por que não as outras**\n- **Authentication administrator:** também redefine senha, mas gerencia métodos de autenticação; mais amplo que o necessário.\n- **Privileged authentication administrator:** atua inclusive sobre admins; excessivo.\n- **Security operator:** investiga riscos, mas não redefine senha.\n\n**Dica de prova:** Security administrator sozinho não redefine senhas.",
    "docs": [
      {
        "t": "Funções internas do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
      },
      {
        "t": "Criar uma função personalizada no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-create"
      },
      {
        "t": "Atribuir funções do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/manage-roles-portal"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference"
    ]
  },
  {
    "id": "Q055",
    "src": 55,
    "domain": 2,
    "skill": "2.1",
    "topic": "Proteção de senha",
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
    "details": "**Por que não as outras**\n- **Alguma aprovada:** depois da normalização (ex.: Pr0jectlitw@re → projectlitware), os termos banidos valem 1 ponto e sobram poucos caracteres; nenhuma chega a 5 pontos.\n\n**Dica de prova:** A lista global da Microsoft é sempre aplicada; a lista customizada aceita até 1.000 termos e faz correspondência aproximada (fuzzy, distância de edição 1).",
    "docs": [
      {
        "t": "Proteção por senha no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad"
      },
      {
        "t": "Proteção por senha do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad-on-premises"
      },
      {
        "t": "Prevenir ataques usando o bloqueio inteligente - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-smart-lockout"
      }
    ],
    "refs": [
      "https://blog.enablingtechcorp.com/azure-ad-password-protection-password-evaluation"
    ]
  },
  {
    "id": "Q056",
    "src": 56,
    "domain": 2,
    "skill": "2.1",
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
    "details": "**Por que não as outras**\n- **Perguntas de segurança:** não são método de MFA.\n- **Voz / SMS:** exigem sinal de celular.",
    "docs": [
      {
        "t": "Visão geral da autenticação do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/overview-authentication"
      },
      {
        "t": "Gerenciar métodos de autenticação - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"
      },
      {
        "t": "Visão geral da autenticação baseada em certificado do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication"
      },
      {
        "t": "Configurar um Passe de Acesso Temporário no Microsoft Entra ID para registrar métodos de autenticação sem senha - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-methods"
    ]
  },
  {
    "id": "Q057",
    "src": 57,
    "domain": 2,
    "skill": "2.1",
    "topic": "Padrões de segurança",
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
    "details": "**Item a item**\n- **Access reviews / PIM:** não liberam métodos de MFA.\n- **User2 / User3:** o próprio usuário não altera configurações do tenant; um Privileged Authentication Administrator gerencia métodos de **usuários**, não os security defaults.\n\n**Dica de prova:** Security defaults podem ser alterados por Security administrator, Conditional Access administrator ou Global administrator.",
    "docs": [
      {
        "t": "Configurar Padrões de segurança para o Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"
      },
      {
        "t": "Funções internas do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
      },
      {
        "t": "Configurar a autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"
      },
      {
        "t": "Visão geral da autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference"
    ]
  },
  {
    "id": "Q058",
    "src": 58,
    "domain": 2,
    "skill": "2.1",
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
    "details": "**Por que não as outras**\n- **Teams chat:** não é método de SSPR.\n- **Notificação do app:** com 1 método exigido, o SSPR só aceita o **código** do app.\n- **FIDO2:** não serve para redefinir senha.\n\n**Dica de prova:** Métodos de SSPR: código ou notificação do app, SMS, voz (comercial/celular), e-mail alternativo, perguntas de segurança.",
    "docs": [
      {
        "t": "Análise aprofundada da redefinição de senha por autoatendimento - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-howitworks"
      },
      {
        "t": "Habilitar a redefinição de senha por autoatendimento do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr"
      },
      {
        "t": "Políticas de redefinição de senha por autoatendimento - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy"
      },
      {
        "t": "Habilitar o write-back de senha do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr-writeback"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-sspr-howitworks"
    ]
  },
  {
    "id": "Q059",
    "src": 59,
    "domain": 2,
    "skill": "2.3",
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
    "details": "**Por que não as outras**\n- **Política com limite médio ou baixo:** afeta todos os usuários; mais esforço e mais impacto.\n- **Resetar o registro de MFA:** não força a troca de senha.\n- **Sign-in risk policy:** risco de entrada pede MFA, não troca de senha.\n\n**Dica de prova:** \"Confirm compromised\" também alimenta o aprendizado do ID Protection.",
    "docs": [
      {
        "t": "Fornecer comentários sobre riscos no Microsoft Entra ID Protection - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-risk-feedback"
      },
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-risk-feedback"
    ]
  },
  {
    "id": "Q060",
    "src": 60,
    "domain": 2,
    "skill": "2.3",
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
    "details": "**Item a item**\n- **User1:** Sim. Está só na política de risco de usuário (bloqueio), e o IP anônimo é risco de entrada.\n- **User2:** Não. A política de risco de entrada exige MFA, e ele não tem MFA registrado, então é bloqueado.\n- **User3:** Sim. Cumpre o MFA e remedia o risco de entrada.\n\n**Dica de prova:** Quem não tem MFA registrado não consegue autorremediar o risco de entrada; daí a política de registro de MFA.",
    "docs": [
      {
        "t": "Proteção de entrada de usuários baseada em risco no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-risk-based-sspr-mfa"
      },
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-risk-based-sspr-mfa"
    ]
  },
  {
    "id": "Q061",
    "src": 61,
    "domain": 2,
    "skill": "2.1",
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
    "details": "**Por que não as outras**\n- **Smartcard / FIDO2:** não são métodos de SSPR.\n- **Teams chat:** não existe como método.\n\n**Dica de prova:** O e-mail alternativo precisa ser **externo** à organização; endereços do próprio tenant não são indicados.",
    "docs": [
      {
        "t": "Políticas de redefinição de senha por autoatendimento - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy"
      },
      {
        "t": "Habilitar a redefinição de senha por autoatendimento do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr"
      },
      {
        "t": "Habilitar o write-back de senha do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr-writeback"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-sspr-policy#administrator-reset-policy-differences"
    ]
  },
  {
    "id": "Q062",
    "src": 62,
    "domain": 2,
    "skill": "2.1",
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
    "details": "**Por que não as outras**\n- **User2 / User3:** estão habilitados para outros métodos (SMS, FIDO2…), que não usam number matching.\n\n**Dica de prova:** O number matching é obrigatório em todas as notificações push do Authenticator desde 2023.",
    "docs": [
      {
        "t": "Método de autenticação com chaves de acesso (FIDO2) no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2"
      },
      {
        "t": "Gerenciar métodos de autenticação - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"
      },
      {
        "t": "Visão geral da autenticação baseada em certificado do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication"
      },
      {
        "t": "Configurar um Passe de Acesso Temporário no Microsoft Entra ID para registrar métodos de autenticação sem senha - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-passwordless"
    ]
  },
  {
    "id": "Q063",
    "src": 63,
    "domain": 2,
    "skill": "2.2",
    "topic": "Acesso Condicional",
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
    "details": "**Por que não as outras**\n- **Access reviews:** revisam acessos, não simulam políticas.\n- **Identity Secure Score:** dá recomendações de postura.\n- **Teste de conectividade do M365:** é de rede.\n\n**Dica de prova:** O What If não gera login real; o modo report-only mostra o efeito em logins reais.",
    "docs": [
      {
        "t": "Acesso Condicional do Microsoft Entra: mecanismo de políticas de Confiança Zero - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview"
      },
      {
        "t": "Planejar a implantação do Acesso Condicional do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access"
      },
      {
        "t": "Criar políticas de Acesso Condicional no Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies"
      }
    ],
    "refs": [
      "https://azure.microsoft.com/en-us/updates/azure-ad-conditional-access-what-if-tool-is-now-available"
    ]
  },
  {
    "id": "Q064",
    "src": 64,
    "domain": 2,
    "skill": "2.1",
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
    "details": "**Por que não as outras**\n- **App password:** legado, não é MFA.\n- **Voz:** exige celular.\n- **Perguntas de segurança:** não são MFA.",
    "docs": [
      {
        "t": "Método de autenticação do Microsoft Authenticator - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-authenticator-app"
      },
      {
        "t": "Gerenciar métodos de autenticação - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"
      },
      {
        "t": "Visão geral da autenticação baseada em certificado do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication"
      },
      {
        "t": "Configurar um Passe de Acesso Temporário no Microsoft Entra ID para registrar métodos de autenticação sem senha - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-authenticator-app#verification-code-from-mobile-app"
    ]
  },
  {
    "id": "Q065",
    "src": 65,
    "domain": 2,
    "skill": "2.2",
    "topic": "Acesso Condicional",
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
    "details": "**Por que não as outras**\n- **Sign-in logs:** mostram logins reais; não permitem simular risco ou país.\n- **MDCA activity log:** atividade em apps conectados.\n- **Access reviews:** governança.\n\n**Dica de prova:** O What If permite definir: usuário, app, IP/país, plataforma, client app, sign-in risk, user risk e estado do dispositivo.",
    "docs": [
      {
        "t": "Acesso Condicional do Microsoft Entra: mecanismo de políticas de Confiança Zero - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview"
      },
      {
        "t": "Planejar a implantação do Acesso Condicional do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access"
      },
      {
        "t": "Criar políticas de Acesso Condicional no Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies"
      }
    ],
    "refs": [
      "https://azure.microsoft.com/en-us/updates/azure-ad-conditional-access-what-if-tool-is-now-available"
    ]
  },
  {
    "id": "Q066",
    "src": 66,
    "domain": 2,
    "skill": "2.2",
    "topic": "Localizações e IPs confiáveis",
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
    "details": "**Item a item**\n- **User1 de 10.10.0.150:** Não. A named location com IP privado nunca casa (o Entra vê o IP público de NAT), então a CA não se aplica e ele não tem MFA por usuário.\n- **User2 da Location1:** Sim. O IP público não é confiável, e o MFA por usuário está imposto.\n- **User2 da Location2:** Não. O IP 193.17.17.x está nos trusted IPs do MFA, que dispensam o MFA por usuário.\n\n**Dica de prova:** Named locations usam sempre IPs **públicos**. \"All trusted locations\" inclui os trusted IPs do MFA legado e as named locations marcadas como confiáveis.",
    "docs": [
      {
        "t": "Política de Acesso Condicional: usar sinais de rede - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-assignment-network"
      },
      {
        "t": "Configurar a autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"
      },
      {
        "t": "Configuração do Acesso Condicional: usuários, grupos, agentes e identidades de carga de trabalho - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-users-groups"
      },
      {
        "t": "Selecionar recursos de destino em políticas de Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings"
    ]
  },
  {
    "id": "Q067",
    "src": 67,
    "domain": 1,
    "skill": "1.3",
    "topic": "Senha de uso único por email",
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
    "details": "**Item a item**\n- **Guest1 (conta Entra) / Guest2 (Microsoft account):** autenticam com a própria conta.\n- **60 min / 24 h / 48 h:** o código vale 30 minutos.\n\n**Dica de prova:** Se o OTP estiver desabilitado, convidados sem conta são orientados a criar uma Microsoft account.",
    "docs": [
      {
        "t": "Autenticação com senha de uso único por email - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/one-time-passcode"
      },
      {
        "t": "Propriedades de usuários convidados B2B - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/user-properties"
      },
      {
        "t": "Inscrição por autoatendimento - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/self-service-sign-up-overview"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/external-identities/one-time-passcode"
    ]
  },
  {
    "id": "Q068",
    "src": 68,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso — funções",
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
    "explanation": "Criar access reviews de grupos com menor privilégio (entre as opções): **User administrator**. Ver os relatórios de histórico de todas as revisões: **Security reader** (leitura). O dump marcava Global administrator e Global reader; Global administrator não é menor privilégio.",
    "details": "**Item a item**\n- **Global administrator para o User1:** funciona, mas viola o menor privilégio.\n- **Global reader para o User2:** também lê, mas o gabarito considera Security reader (que lê relatórios de governança).\n\n**Dica de prova:** Identity Governance Administrator é a função específica para access reviews de grupos e apps; se aparecer nas opções, prefira-a.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      },
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      }
    ]
  },
  {
    "id": "Q069",
    "src": 69,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "Azure Container Apps fica no provedor **Microsoft.App**. Adaptive network hardening é recurso do Defender for Cloud, no provedor **Microsoft.Security**. O dump marcava Microsoft.Compute para a Role1.",
    "details": "**Item a item**\n- **Microsoft.Compute:** é de VMs; o Container Apps fica em Microsoft.App.\n- **Microsoft.Management:** management groups.\n- **Microsoft.Network:** as regras de NSG ficam em Network, mas o recurso adaptive network hardening é do Defender (Microsoft.Security).\n\n**Dica de prova:** Para achar o provedor de um serviço: Get-AzResourceProvider -ListAvailable, ou a página \"Azure resource provider operations\".",
    "docs": [
      {
        "t": "Funções personalizadas do Azure - Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/role-based-access-control/custom-roles"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      },
      {
        "t": "Conceder permissão a aplicativos para acessar um cofre de chaves do Azure usando o Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"
      }
    ]
  },
  {
    "id": "Q070",
    "src": 70,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "Limitar o escopo aos 100 executivos: uma **unidade administrativa**. Redefinir senha **e** gerenciar métodos de MFA de não administradores é o **Authentication administrator**; o Helpdesk administrator não gerencia métodos de autenticação. O dump marcava função personalizada + Helpdesk administrator.",
    "details": "**Item a item**\n- **Função customizada:** funções customizadas do Entra não cobrem gestão de métodos de MFA.\n- **Dynamic group / M365 group:** grupos não delimitam escopo de administração.\n- **Helpdesk / Password administrator:** redefinem senha, mas não gerenciam métodos de MFA.\n- **Groups administrator:** gerencia grupos.\n\n**Dica de prova:** A AU pode ter associação dinâmica (ex.: jobTitle = Executive).",
    "docs": [
      {
        "t": "Criar ou excluir unidades administrativas - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-manage"
      },
      {
        "t": "Adicionar usuários, grupos ou dispositivos a uma unidade administrativa - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-members-add"
      },
      {
        "t": "Unidades administrativas de gerenciamento restrito no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-restricted-management"
      }
    ]
  },
  {
    "id": "Q071",
    "src": 71,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "Um grupo dentro de uma AU coloca o **grupo** no escopo, não seus membros. User5 (User administrator da Au1) só gerencia os usuários adicionados diretamente: User2 e User3.",
    "details": "**Por que não as outras**\n- **User1 / User4:** estão no escopo só como membros do Group1, ou fora da AU.\n\n**Dica de prova:** Para incluir os membros, adicione os usuários na AU (ou use regra dinâmica na AU).",
    "docs": [
      {
        "t": "Criar ou excluir unidades administrativas - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-manage"
      },
      {
        "t": "Adicionar usuários, grupos ou dispositivos a uma unidade administrativa - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-members-add"
      },
      {
        "t": "Unidades administrativas de gerenciamento restrito no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-restricted-management"
      }
    ]
  },
  {
    "id": "Q072",
    "src": 72,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "-and tem precedência sobre -or. A regra vira (local US/AU **e** Sales **e** não Manager) **ou** (jobTitle SalesRep). Pela tabela, isso resulta em User1 e User2.",
    "details": "**Por que não as outras**\n- **Só User1 / User2 / User3 isolados:** lembre a precedência: -and antes de -or.\n- **Incluir User3:** pela tabela, ele não atende nenhum dos dois lados do -or.\n\n**Dica de prova:** Use parênteses explícitos nas regras; o validador do portal (Validate rules) testa usuários específicos.",
    "docs": [
      {
        "t": "Gerenciar regras de grupos de associação dinâmica no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership"
      },
      {
        "t": "Como gerenciar grupos - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups"
      },
      {
        "t": "Definir a expiração de grupos do Microsoft 365 - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-lifecycle"
      }
    ]
  },
  {
    "id": "Q073",
    "src": 73,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "Entre as opções, só o **User administrator** gerencia atribuição de licenças **e** redefine senhas. (Helpdesk + License administrator seria mais restrito, mas não é uma opção única.)",
    "details": "**Por que não as outras**\n- **Helpdesk administrator:** redefine senhas, mas não atribui licenças.\n- **Billing administrator:** compra e cobrança, não atribuição.\n- **License administrator:** atribui licenças, mas não redefine senhas.",
    "docs": [
      {
        "t": "Funções internas do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
      },
      {
        "t": "Criar uma função personalizada no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-create"
      },
      {
        "t": "Atribuir funções do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/manage-roles-portal"
      }
    ]
  },
  {
    "id": "Q074",
    "src": 74,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "Pelo gabarito, **Set-MsolUserLicense** remove a licença E3 atribuída diretamente. MSOnline foi aposentado (hoje: Set-MgUserLicense ou o blade Licenses) — questão borderline.",
    "details": "**Por que não as outras**\n- **Set-AzureADGroup:** altera propriedades de grupo, não licenças diretas.\n- **Set-WindowsProductKey:** sem relação.\n- **Administrative units:** escopo de administração.\n\n**Dica de prova:** Também resolveria o blade Licenses > Office 365 E3 > selecionar todos > Remove license.",
    "docs": [
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Set-MgUserLicense (Microsoft.Graph.Users.Actions)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ]
  },
  {
    "id": "Q075",
    "src": 75,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "Pelo gabarito, **Set-MsolUserLicense**. MSOnline foi aposentado (hoje: Set-MgUserLicense ou o blade Licenses) — questão borderline.",
    "details": "**Por que não as outras**\n- **Set-AzureADGroup / Identity Governance / Set-WindowsProductKey:** nenhum remove licenças atribuídas diretamente aos usuários.",
    "docs": [
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Set-MgUserLicense (Microsoft.Graph.Users.Actions)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ]
  },
  {
    "id": "Q076",
    "src": 76,
    "domain": 1,
    "skill": "1.4",
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
    "explanation": "Autenticação validada pelo DC on-premises = **pass-through authentication**. Para SSPR de usuários do AD, a nova senha precisa voltar ao AD: **password writeback**.",
    "details": "**Item a item**\n- **AD FS:** também autentica no on-premises, mas é infraestrutura muito maior (farm + WAP); PTA é o recomendado.\n- **PHS para a autenticação:** valida na nuvem, não no DC.\n- **Device/Group writeback / PHS para o SSPR:** não gravam a senha nova no AD.\n\n**Dica de prova:** Password writeback exige Entra ID P1. Com Cloud Sync, ele também é suportado.",
    "docs": [
      {
        "t": "Autenticação para soluções de identidade híbrida do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn"
      },
      {
        "t": "Entender as etapas de migração da autenticação de aplicativos do AD FS para o Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/migrate-adfs-apps-stages"
      },
      {
        "t": "Migrar da federação para a autenticação na nuvem no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/migrate-from-federation-to-cloud-authentication"
      }
    ]
  },
  {
    "id": "Q077",
    "src": 77,
    "domain": 2,
    "skill": "2.2",
    "topic": "Acesso Condicional",
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
    "explanation": "Bloquear autenticação básica no Exchange Online é feito com **Conditional Access** (condição Client apps = legacy, ação Block).",
    "details": "**Por que não as outras**\n- **OAuth policy do MDCA:** trata de apps OAuth com permissões excessivas.\n- **Compliance policy do Intune:** avalia dispositivos.\n- **Application control:** controla executáveis no Windows.\n\n**Dica de prova:** A Microsoft já desabilitou a basic auth no Exchange Online para a maioria dos protocolos (2022); o CA continua sendo o controle de prova.",
    "docs": [
      {
        "t": "Acesso Condicional do Microsoft Entra: mecanismo de políticas de Confiança Zero - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview"
      },
      {
        "t": "Planejar a implantação do Acesso Condicional do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access"
      },
      {
        "t": "Criar políticas de Acesso Condicional no Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies"
      }
    ]
  },
  {
    "id": "Q078",
    "src": 78,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "Credencial que pertence só ao App1 e não exige gestão de segredo: **system-assigned managed identity** (ciclo de vida atrelado ao recurso).",
    "details": "**Por que não as outras**\n- **Conta de usuário do Entra:** exigiria senha/segredo e não é exclusiva do app.\n- **Conta SQL:** segredo na connection string.\n- **User-assigned:** funciona, mas pode ser compartilhada entre recursos e exige gerenciar o ciclo de vida separado.\n\n**Dica de prova:** No SQL, crie o usuário: CREATE USER [App1] FROM EXTERNAL PROVIDER; e dê os papéis necessários.",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q079",
    "src": 79,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "No portal, clonar para uma **função personalizada do Azure** permite partir de funções **built-in do Azure** ou de **funções customizadas do Azure** da assinatura (Role2). Funções do Entra ID (Role1, se for de diretório) não servem de base para RBAC do Azure.",
    "details": "**Por que não as outras**\n- **Só Role2 / só built-ins:** o portal permite clonar ambas as origens (built-in e customizadas do Azure).\n- **Built-ins do Entra / Role1:** funções de diretório não servem de base para funções do Azure RBAC.\n\n**Dica de prova:** Clonar = começar de uma definição existente, ajustar as permissões e definir os assignableScopes.",
    "docs": [
      {
        "t": "O que é o controle de acesso baseado em função do Azure (Azure RBAC)?",
        "u": "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview"
      },
      {
        "t": "Funções internas do Azure - Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      }
    ]
  },
  {
    "id": "Q080",
    "src": 80,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) deixa o **Windows Hello for Business**.",
    "details": "**Por que não as outras**\n- **App password / perguntas de segurança / e-mail:** não são métodos de MFA para login interativo.",
    "docs": [
      {
        "t": "Gerenciar métodos de autenticação - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"
      },
      {
        "t": "Visão geral da autenticação baseada em certificado do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication"
      },
      {
        "t": "Configurar um Passe de Acesso Temporário no Microsoft Entra ID para registrar métodos de autenticação sem senha - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass"
      },
      {
        "t": "Como habilitar chaves de acesso (FIDO2) no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-authentication-passkeys-fido2"
      }
    ]
  },
  {
    "id": "Q081",
    "src": 81,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) deixa o **Windows Hello for Business**, que é considerado MFA (dispositivo + PIN/biometria).",
    "details": "**Por que não as outras**\n- **Voz:** exige linha de celular.\n- **E-mail / perguntas:** não são MFA de login.",
    "docs": [
      {
        "t": "Gerenciar métodos de autenticação - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"
      },
      {
        "t": "Visão geral da autenticação baseada em certificado do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication"
      },
      {
        "t": "Configurar um Passe de Acesso Temporário no Microsoft Entra ID para registrar métodos de autenticação sem senha - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass"
      },
      {
        "t": "Como habilitar chaves de acesso (FIDO2) no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-authentication-passkeys-fido2"
      }
    ]
  },
  {
    "id": "Q082",
    "src": 82,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "Managed identities atribuídas pelo usuário podem ser usadas por recursos de **qualquer região** (Managed2 e Managed3). O V1 não tem identidade atribuída pelo sistema para receber a função de Owner como \"VM1\".",
    "details": "**Item a item**\n- **Managed2 e Managed3 no V1:** Sim. Identidades user-assigned podem ser usadas por recursos de qualquer região.\n- **Owner para \"VM1\" no RG1:** Não. A VM não tem identidade system-assigned habilitada (e o nome nem confere), então não há principal.\n\n**Dica de prova:** Identidades user-assigned são recursos regionais, mas o uso delas é cross-region.",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q083",
    "src": 83,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "O Secret1 está em soft delete (retenção de 10 dias), e o Key Vault Administrator pode recuperá-lo no dia 7. O Certificate1 está no KeyVault1, com **purge protection**: não pode ser expurgado antes de terminar a retenção de 15 dias (16 de junho), por ninguém.",
    "details": "**Item a item**\n- **Admin1 recupera o Secret1:** Sim. Está em soft delete (10 dias), e o Key Vault Administrator recupera.\n- **Admin2 / Admin3 expurgam o Certificate1:** Não. Com purge protection, ninguém expurga antes de terminar a retenção.\n\n**Dica de prova:** A purge protection, uma vez habilitada, não pode ser desabilitada; a retenção de soft delete vai de 7 a 90 dias (padrão 90).",
    "docs": [
      {
        "t": "Exclusão reversível do Azure Key Vault",
        "u": "https://learn.microsoft.com/en-us/azure/key-vault/general/soft-delete-overview"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      },
      {
        "t": "Conceder permissão a aplicativos para acessar um cofre de chaves do Azure usando o Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"
      }
    ]
  },
  {
    "id": "Q084",
    "src": 84,
    "domain": 2,
    "skill": "2.3",
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
    "explanation": "Detecções de **risco de usuário** incluem leaked credentials e **Microsoft Entra threat intelligence** (atividade incomum para o usuário). Password spray, IP anônimo e propriedades de entrada desconhecidas são de risco de entrada.",
    "details": "**Por que não as outras**\n- **Password spray / anonymous IP / unfamiliar sign-in properties:** são riscos de entrada.\n\n**Dica de prova:** Riscos de usuário avaliam a identidade (credencial vazada, inteligência de ameaças), não um login específico.",
    "docs": [
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ]
  },
  {
    "id": "Q085",
    "src": 85,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "Com um método exigido, o app só pode ser usado via **código**. Atenção: e-mail alternativo também é um método válido para um único método — a questão tem duas opções corretas; o dump marca o código do app.",
    "details": "**Por que não as outras**\n- **Smartcard:** não é método de SSPR.\n- **Notificação do app:** não é permitida quando só 1 método é exigido.\n- **E-mail externo:** também é válido; a questão tem duas corretas e o gabarito escolhe o código do app.",
    "docs": [
      {
        "t": "Habilitar a redefinição de senha por autoatendimento do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr"
      },
      {
        "t": "Políticas de redefinição de senha por autoatendimento - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy"
      },
      {
        "t": "Habilitar o write-back de senha do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr-writeback"
      }
    ]
  },
  {
    "id": "Q086",
    "src": 86,
    "domain": 2,
    "skill": "2.3",
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
    "explanation": "IP anônimo é detecção de **risco de entrada**: use política de **sign-in risk** (hoje recomendada como Conditional Access baseada em risco de entrada) exigindo MFA.",
    "details": "**Por que não as outras**\n- **User risk policy:** trata da identidade comprometida, não de um login de IP anônimo.\n- **MFA registration policy:** só força o registro do MFA.\n\n**Dica de prova:** Hoje, crie uma política de CA com a condição Sign-in risk = Medium+ e o grant Require MFA (as políticas legadas do ID Protection estão sendo descontinuadas).",
    "docs": [
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ]
  },
  {
    "id": "Q087",
    "src": 87,
    "domain": 4,
    "skill": "4.3",
    "topic": "PIM e Acesso Condicional",
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
    "explanation": "Pelas configurações da função no PIM (aprovação exigida, duração máxima e MFA na ativação) e pelas atribuições do exemplo, o dump marca Sim/Sim/Não. Para Admin3, a comunidade debate se o MFA é pedido duas vezes (no login pela CA e na ativação). Confira os exhibits e a discussão.",
    "details": "**Item a item**\n- **Admin1 precisa de aprovação:** Sim. A função exige aprovação na ativação.\n- **Admin2 ativa por 2 h:** Sim. Está dentro da duração máxima configurada.\n- **Admin3 com MFA duas vezes:** Não, pelo gabarito. Se o login já satisfez o MFA, a ativação no PIM aceita a mesma sessão.\n\n**Dica de prova:** Para exigir MFA \"fresco\" na ativação, use authentication context no PIM + CA.",
    "docs": [
      {
        "t": "Selecionar recursos de destino em políticas de Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps"
      },
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      }
    ]
  },
  {
    "id": "Q088",
    "src": 88,
    "domain": 2,
    "skill": "2.3",
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
    "explanation": "**Confirm user compromised** eleva o risco do usuário para **alto**. Com a política de risco de usuário bloqueando a partir de Low, User1 e User2 ficam bloqueados (MFA não remedia um bloqueio). User3 teve o risco **descartado**; IP anônimo normalmente gera risco de entrada médio, e a política de entrada só bloqueia High, então User3 entra. O dump marcava Sim/Sim/Não.",
    "details": "**Item a item**\n- **User1 / User2 entram com MFA:** Não. Confirmados como comprometidos (risco alto) e com a política de usuário em Block, MFA não remedia um bloqueio.\n- **User3 de IP anônimo:** Sim. Risco descartado; o IP anônimo gera risco de entrada médio, e a política só bloqueia High.\n\n**Dica de prova:** Para desbloquear, o admin redefine a senha ou descarta o risco (dismiss).",
    "docs": [
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ]
  },
  {
    "id": "Q089",
    "src": 89,
    "domain": 3,
    "skill": "3.3",
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
    "explanation": "O **Application administrator** gerencia registros, apps empresariais e configurações do Application Proxy, e não vira owner dos apps que cria. Cloud application administrator não gerencia Application Proxy; Application developer vira owner.",
    "details": "**Por que não as outras**\n- **Application developer:** registra apps, mas vira owner automaticamente.\n- **Cloud application administrator:** igual ao Application administrator, **sem** o Application Proxy.\n- **Service support administrator:** abre chamados de suporte.",
    "docs": [
      {
        "t": "Adicionar funções de aplicativo e obtê-las de um token - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps"
      }
    ]
  },
  {
    "id": "Q090",
    "src": 90,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "As duas são funções do **Azure RBAC**: login nas VMs com conta Entra (Virtual Machine User/Administrator Login) e criação de VMs (Virtual Machine Contributor). Funções do Entra ID não dão permissão sobre recursos do Azure. O dump marcava \"Azure AD built-in roles\" para a segunda.",
    "details": "**Item a item**\n- **Funções do Entra para criar VMs:** funções de diretório não dão permissão em recursos do Azure.\n- **Funções do Entra para login em VM:** o login com conta Entra é autorizado por Azure RBAC (VM User/Administrator Login).\n\n**Dica de prova:** Além da função, a VM precisa da extensão AADLoginForWindows (ou AADSSHLoginForLinux).",
    "docs": [
      {
        "t": "Funções internas do Azure - Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles"
      },
      {
        "t": "Entrar em uma máquina virtual Windows no Azure usando o Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/howto-vm-sign-in-azure-ad-windows"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      }
    ]
  },
  {
    "id": "Q091",
    "src": 91,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "Pelo gabarito, **Set-MsolUserLicense**. MSOnline foi aposentado — questão borderline.",
    "details": "**Por que não as outras**\n- **Groups blade:** não remove licenças atribuídas diretamente.\n- **Set-AzureADGroup / Identity Governance:** não gerenciam licenças de usuário.",
    "docs": [
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Set-MgUserLicense (Microsoft.Graph.Users.Actions)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ]
  },
  {
    "id": "Q093",
    "src": 93,
    "domain": 4,
    "skill": "4.4",
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
    "explanation": "Para alterar o status das ações de melhoria do Identity Secure Score, é preciso papel com leitura e gravação: Global, Security, **Exchange** ou SharePoint administrator.",
    "details": "**Série \"Solution\" (atualizar o status no Identity Secure Score):** escrita = Global, Security, **Exchange** ou SharePoint administrator. User administrator e funções de leitura não atendem.\n\n**Dica de prova:** Funções de leitura (Global reader, Security reader, Security operator) veem o score, mas não mudam status.",
    "docs": [
      {
        "t": "O que é a Pontuação de Segurança de Identidade? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score"
      }
    ]
  },
  {
    "id": "Q094",
    "src": 94,
    "domain": 4,
    "skill": "4.4",
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
    "explanation": "**User administrator** não está entre os papéis com escrita no Identity Secure Score (Global, Security, Exchange, SharePoint administrator).",
    "details": "**Série \"Solution\":** User administrator não tem permissão no Secure Score.",
    "docs": [
      {
        "t": "O que é a Pontuação de Segurança de Identidade? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score"
      }
    ]
  },
  {
    "id": "Q095",
    "src": 95,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) deixa o **Windows Hello for Business**.",
    "details": "**Por que não as outras**\n- **Notificação do Authenticator / SMS:** precisam de celular conectado.\n- **E-mail:** não é método de MFA de login.",
    "docs": [
      {
        "t": "Gerenciar métodos de autenticação - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"
      },
      {
        "t": "Visão geral da autenticação baseada em certificado do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication"
      },
      {
        "t": "Configurar um Passe de Acesso Temporário no Microsoft Entra ID para registrar métodos de autenticação sem senha - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass"
      },
      {
        "t": "Como habilitar chaves de acesso (FIDO2) no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-authentication-passkeys-fido2"
      }
    ]
  },
  {
    "id": "Q096",
    "src": 96,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "Contas de emergência (break-glass) devem ser **somente nuvem** (criadas direto no Entra ID, não sincronizadas), para funcionar mesmo com falha do ambiente on-premises, e ter **Global Administrator** permanente. O dump marcava OU1 (sincronizada).",
    "details": "**Item a item**\n- **OU1 / OU2 (sincronizadas):** uma falha no AD ou na federação impediria o login de emergência.\n- **Billing admin / Owner / Privileged Role Administrator:** o break-glass precisa de Global Administrator permanente (Owner é do Azure RBAC).\n\n**Dica de prova:** Recomendações: 2 contas, excluídas do CA (exceto passkey/FIDO2 resistente a phishing), senha longa guardada offline, alertas de login monitorados.",
    "docs": [
      {
        "t": "Gerenciar contas de administrador de acesso de emergência - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access"
      }
    ]
  },
  {
    "id": "Q097",
    "src": 97,
    "domain": 4,
    "skill": "4.1",
    "topic": "Gerenciamento de direitos",
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
    "explanation": "**Access package** com política de solicitação: aprovação automática para membros de um grupo e expiração da atribuição em 30 dias.",
    "details": "**Por que não as outras**\n- **Conditional Access:** controla a forma de acesso, não concede nem expira acesso.\n- **PIM role settings:** são para funções privilegiadas ou PIM for Groups.\n- **MDCA access policy:** controla a sessão; não concede.\n\n**Dica de prova:** A política do access package pode ter \"For users in your directory: specific groups\", aprovação \"No\" e expiração de 30 dias.",
    "docs": [
      {
        "t": "O que é o gerenciamento de direitos? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"
      },
      {
        "t": "Cenários comuns no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-scenarios"
      }
    ]
  },
  {
    "id": "Q098",
    "src": 98,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "Application security groups e Azure Firewall são recursos do provedor **Microsoft.Network**.",
    "details": "**Item a item**\n- **Microsoft.App:** Container Apps.\n- **Microsoft.Compute:** VMs e discos.\n- **Microsoft.Security:** Defender for Cloud.\n- **Microsoft.Management:** management groups.\n\n**Dica de prova:** ASGs: Microsoft.Network/applicationSecurityGroups/*; Firewall: Microsoft.Network/azureFirewalls/*.",
    "docs": [
      {
        "t": "Funções personalizadas do Azure - Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/role-based-access-control/custom-roles"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      },
      {
        "t": "Conceder permissão a aplicativos para acessar um cofre de chaves do Azure usando o Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"
      }
    ]
  },
  {
    "id": "Q099",
    "src": 99,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) deixa o **código de verificação** do Authenticator, gerado offline.",
    "details": "**Por que não as outras**\n- **Voz:** exige linha de celular.\n- **App password:** legado, não é MFA.\n- **Perguntas de segurança:** só SSPR.",
    "docs": [
      {
        "t": "Gerenciar métodos de autenticação - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"
      },
      {
        "t": "Visão geral da autenticação baseada em certificado do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication"
      },
      {
        "t": "Configurar um Passe de Acesso Temporário no Microsoft Entra ID para registrar métodos de autenticação sem senha - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass"
      },
      {
        "t": "Como habilitar chaves de acesso (FIDO2) no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-authentication-passkeys-fido2"
      }
    ]
  },
  {
    "id": "Q100",
    "src": 100,
    "domain": 2,
    "skill": "3.4",
    "topic": "Controle de Aplicativos de Acesso Condicional",
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
    "explanation": "Sequência: publicar (registrar) o App1 no Entra ID, criar a **política de CA** com o controle de sessão *Use Conditional Access App Control*, entrar no app para que ele apareça em **Connected apps** no Defender for Cloud Apps e, por fim, criar a **session policy**. O dump invertia a ordem da política de CA.",
    "details": "**Sequência**\n- **Session policy antes da CA:** o app só aparece no MDCA depois que o tráfego passa pelo proxy (CA com App Control + primeiro login).\n- **Connected apps antes da CA:** o app ainda não foi roteado pelo App Control.\n\n**Dica de prova:** Apps da galeria com SSO SAML/OIDC são onboarded automaticamente; apps customizados exigem o primeiro login para aparecer.",
    "docs": [
      {
        "t": "Controle de aplicativos de Acesso Condicional - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-intro-aad"
      },
      {
        "t": "Integrar aplicativos do catálogo de IdPs de terceiros ao controle de aplicativos de Acesso Condicional - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-deployment-featured-idp"
      }
    ]
  },
  {
    "id": "Q101",
    "src": 101,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "Para que cada helpdesk gerencie licenças só dos usuários do seu escritório: uma **unidade administrativa** por filial (com o escopo da função), criada no **Microsoft Entra admin center**.",
    "details": "**Item a item**\n- **Custom role:** não delimita escopo de usuários por filial; quem faz isso é a AU.\n- **Dynamic group:** não limita onde um admin atua.\n- **OU / ADAC / AD PowerShell:** são do AD on-premises e não controlam a administração no Entra.\n- **Purview:** compliance.\n\n**Dica de prova:** A função License administrator pode ser atribuída com escopo de AU.",
    "docs": [
      {
        "t": "Criar ou excluir unidades administrativas - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-manage"
      },
      {
        "t": "Adicionar usuários, grupos ou dispositivos a uma unidade administrativa - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-members-add"
      },
      {
        "t": "Unidades administrativas de gerenciamento restrito no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-restricted-management"
      }
    ]
  },
  {
    "id": "Q102",
    "src": 102,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "O limite de dispositivos por usuário é ajustado em **Device settings** (Maximum number of devices per user).",
    "details": "**Por que não as outras**\n- **User settings:** registro de apps e acesso ao portal; não tratam de limite de dispositivos.\n- **Access reviews:** revisão de acessos.\n- **Security defaults:** MFA básico.\n\n**Dica de prova:** Maximum number of devices per user vale para joined + registered; dispositivos hybrid joined não contam.",
    "docs": [
      {
        "t": "Gerenciar dispositivos no Microsoft Entra ID usando o centro de administração do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/manage-device-identities"
      },
      {
        "t": "Permissões padrão de usuários - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions"
      },
      {
        "t": "Definir configurações de grupo usando o PowerShell - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-settings-cmdlets"
      },
      {
        "t": "Impor uma política de nomenclatura de grupos no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-naming-policy"
      }
    ]
  },
  {
    "id": "Q103",
    "src": 103,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "Só grupos criados com **isAssignableToRole = true** aparecem para atribuição de funções do Entra, e essa propriedade não pode ser alterada depois: é preciso **recriar** o grupo.",
    "details": "**Por que não as outras**\n- **Mudar para Dynamic User/Device:** grupos role-assignable não podem ser dinâmicos, e a propriedade não muda depois.\n- **Adicionar owner:** não torna o grupo atribuível a funções.\n\n**Dica de prova:** Grupos role-assignable só aceitam associação atribuída, não aceitam grupos aninhados, e só Privileged Role Admin ou Global Admin os gerenciam.",
    "docs": [
      {
        "t": "Usar grupos do Microsoft Entra para gerenciar atribuições de funções - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/groups-concept"
      },
      {
        "t": "Listar atribuições de funções do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/view-assignments"
      },
      {
        "t": "Funções de menor privilégio por tarefa - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-by-task"
      }
    ]
  },
  {
    "id": "Q104",
    "src": 104,
    "domain": 1,
    "skill": "1.4",
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
    "explanation": "Para sincronizar uma floresta desconectada (sem trust) com o mesmo tenant, use **Entra Cloud Sync** com um agente em litware.com.",
    "details": "**Por que não as outras**\n- **Incluir litware.com no Entra Connect existente:** o Connect exige conectividade (e trust/credenciais) com a floresta; sem trust, o caminho leve é o Cloud Sync.\n- **Staging mode:** servidor de reserva; não sincroniza.\n\n**Dica de prova:** O Cloud Sync usa agentes leves (alta disponibilidade com vários agentes) e é gerenciado na nuvem.",
    "docs": [
      {
        "t": "O que é o Microsoft Entra Cloud Sync? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/what-is-cloud-sync"
      },
      {
        "t": "O que é o agente de provisionamento? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/what-is-provisioning-agent"
      }
    ]
  },
  {
    "id": "Q105",
    "src": 105,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "User3 tem a função User administrator. Administradores usam sempre a política forte de **dois métodos**, sem perguntas de segurança, independentemente da configuração de SSPR. Os métodos ficam entre e-mail, telefone e Microsoft Authenticator. O dump marcava 1 método e todos os quatro.",
    "details": "**Item a item**\n- **1 método / com perguntas de segurança:** administradores sempre usam a política de dois métodos, sem perguntas, independentemente da configuração.\n\n**Dica de prova:** Funções privilegiadas (User admin, Helpdesk, Password admin, Global etc.) caem na política de administrador.",
    "docs": [
      {
        "t": "Políticas de redefinição de senha por autoatendimento - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy"
      },
      {
        "t": "Habilitar a redefinição de senha por autoatendimento do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr"
      },
      {
        "t": "Habilitar o write-back de senha do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr-writeback"
      }
    ]
  },
  {
    "id": "Q106",
    "src": 106,
    "domain": 2,
    "skill": "2.3",
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
    "explanation": "\"Pedir o registro de MFA com opção de adiar\" é a **MFA registration policy** do ID Protection, que dá **14 dias** para o usuário pular o registro. Hoje a alternativa recomendada são as registration campaigns.",
    "details": "**Item a item**\n- **Authentication method policy:** define quais métodos são permitidos, não força o registro com adiamento.\n- **Conditional Access:** pode exigir MFA, mas não tem período de carência de registro.\n- **MFA Server:** produto on-premises aposentado.\n- **7 ou 28 dias:** o período fixo da política é de 14 dias.\n\n**Dica de prova:** Registration campaigns (Authenticator) permitem adiar o registro por até 14 dias e limitar o número de adiamentos.",
    "docs": [
      {
        "t": "Executar uma campanha de registro para configurar uma chave de acesso ou o Microsoft Authenticator - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-mfa-registration-campaign"
      },
      {
        "t": "Registro combinado de SSPR e autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-registration-mfa-sspr-combined"
      },
      {
        "t": "Configurar a política de registro de MFA - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-mfa-policy"
      }
    ]
  },
  {
    "id": "Q107",
    "src": 107,
    "domain": 2,
    "skill": "2.3",
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
    "explanation": "**Leaked credentials** é uma detecção de risco de **usuário** (user risk policy). Navegador suspeito e IP anônimo são detecções de risco de **entrada** (sign-in risk policy). Hoje a Microsoft recomenda configurar as duas como políticas de Conditional Access baseadas em risco.",
    "details": "**Item a item**\n- **Leaked credentials com sign-in risk:** o vazamento afeta a identidade (user risk).\n- **Navegador suspeito / IP anônimo com user risk:** são sinais do login específico (sign-in risk).\n\n**Dica de prova:** Detecções offline (como leaked credentials) são calculadas depois; detecções em tempo real afetam o login atual.",
    "docs": [
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ]
  },
  {
    "id": "Q108",
    "src": 108,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "Funções do **Azure RBAC** podem ser atribuídas a usuários, grupos (inclusive dinâmicos), managed identities (VM1) e service principals (App1). A restrição de grupos dinâmicos vale para funções do **Entra ID**, não do Azure.",
    "details": "**Por que não as outras**\n- **Respostas sem Group1:** Azure RBAC aceita grupos de segurança, inclusive dinâmicos.\n- **Respostas sem App1 / VM1:** service principals e managed identities também são principals válidos.\n\n**Dica de prova:** Grupos M365 sem securityEnabled não aparecem como principal no RBAC.",
    "docs": [
      {
        "t": "O que é o controle de acesso baseado em função do Azure (Azure RBAC)?",
        "u": "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview"
      },
      {
        "t": "Funções internas do Azure - Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      }
    ]
  },
  {
    "id": "Q109",
    "src": 109,
    "domain": 1,
    "skill": "1.3",
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
    "explanation": "Impedir que guests consultem e-mails de funcionários: acesso de guest **restrito aos próprios objetos**. Só admins com funções específicas (User1 é User administrator) convidam: **Only users assigned to specific admin roles**. E **desabilitar o self-service sign-up** via user flows, para que ninguém entre sem convite.",
    "details": "**Item a item**\n- **Same access / limited access:** guests ainda veriam propriedades de outros usuários (inclusive e-mails).\n- **Anyone / Member users can invite:** permitiriam convites por não admins.\n- **No one can invite:** impediria também o User1.\n- **Self-service sign-up = Yes:** guests entrariam sem convite.\n\n**Dica de prova:** O User administrator está entre as funções que podem convidar com a opção \"specific admin roles\" (ao lado de Guest Inviter).",
    "docs": [
      {
        "t": "Configurar a colaboração externa - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/external-collaboration-settings-configure"
      },
      {
        "t": "Permitir ou bloquear convites - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/allow-deny-list"
      }
    ]
  },
  {
    "id": "Q110",
    "src": 110,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "O blade **Licenses** permite remover a licença E3 atribuída diretamente de todos os usuários de uma vez.",
    "details": "**Por que não as outras**\n- **Groups blade:** não remove licenças diretas.\n- **Set-AzureADUser:** não gerencia licença (e o módulo foi aposentado).\n- **Identity Governance:** governança, não licenças.",
    "docs": [
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Set-MgUserLicense (Microsoft.Graph.Users.Actions)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ]
  },
  {
    "id": "Q111",
    "src": 111,
    "domain": 4,
    "skill": "4.4",
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
    "explanation": "**Security operator** só tem leitura no Identity Secure Score.",
    "details": "**Série \"Solution\" (atualizar o status no Identity Secure Score):** escrita = Global, Security, Exchange ou SharePoint administrator. Security operator só lê.",
    "docs": [
      {
        "t": "O que é a Pontuação de Segurança de Identidade? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score"
      }
    ]
  },
  {
    "id": "Q112",
    "src": 112,
    "domain": 4,
    "skill": "4.4",
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
    "explanation": "**SharePoint administrator** está entre os papéis com leitura e gravação no Identity Secure Score.",
    "details": "**Série \"Solution\":** o SharePoint administrator tem escrita no Secure Score (o mesmo vale para Exchange, Security e Global administrator).",
    "docs": [
      {
        "t": "O que é a Pontuação de Segurança de Identidade? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score"
      }
    ]
  },
  {
    "id": "Q113",
    "src": 113,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "Os três requisitos correspondem ao Service Support Administrator, que não está entre as opções. O Helpdesk administrator dá permissões extras (senhas), então para \"somente\" essas tarefas a resposta é uma **função personalizada**.",
    "details": "**Por que não as outras**\n- **Administrative unit:** limita escopo, não define permissões.\n- **PIM:** torna atribuições just-in-time; não cria o conjunto de permissões.\n- **Helpdesk administrator:** inclui redefinir senhas; excede \"somente\".\n\n**Dica de prova:** Se Service Support Administrator estivesse nas opções, seria a resposta (exatamente essas três tarefas).",
    "docs": [
      {
        "t": "Criar uma função personalizada no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-create"
      },
      {
        "t": "Funções internas do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
      },
      {
        "t": "Atribuir funções do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/manage-roles-portal"
      }
    ]
  },
  {
    "id": "Q114",
    "src": 114,
    "domain": 1,
    "skill": "1.4",
    "topic": "Autenticação de passagem",
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
    "explanation": "Validação de senha sempre no AD DS = **pass-through authentication**, configurada pelo **Entra Connect** (antes Azure AD Connect).",
    "details": "**Item a item**\n- **Password protection:** senhas banidas.\n- **Cross-tenant sync:** B2B entre tenants.\n- **PHS:** valida o hash na nuvem.\n- **MIM / Entra admin center / Purview:** o método de login híbrido é configurado no assistente do Entra Connect.",
    "docs": [
      {
        "t": "Microsoft Entra Connect: autenticação de passagem - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta"
      },
      {
        "t": "Autenticação de passagem do Microsoft Entra - Início rápido - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta-quick-start"
      }
    ]
  },
  {
    "id": "Q116",
    "src": 116,
    "domain": 4,
    "skill": "4.4",
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
    "explanation": "Erros de acesso a um app aparecem nos **sign-in logs**, com código e motivo da falha (ex.: bloqueio por CA).",
    "details": "**Por que não as outras**\n- **Log Analytics:** exigiria enviar os logs antes; mais esforço.\n- **Audit logs:** mudanças de configuração, não falhas de login.\n- **Provisioning logs:** provisionamento em apps (SCIM).\n\n**Dica de prova:** No sign-in log, abra a entrada e veja Failure reason, Conditional Access e o código AADSTS.",
    "docs": [
      {
        "t": "Logs de entrada no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins"
      },
      {
        "t": "Conhecer os logs de auditoria no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-audit-logs"
      },
      {
        "t": "Logs de provisionamento de usuários no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-provisioning-logs"
      }
    ]
  },
  {
    "id": "Q117",
    "src": 117,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "Bloquear entrada por localização no Defender for Cloud Apps é feito com **access policy** (exige Conditional Access App Control). Activity/anomaly policies apenas alertam ou agem depois.",
    "details": "**Por que não as outras**\n- **Activity policy / anomaly detection:** alertam ou suspendem depois do evento; não bloqueiam o login em tempo real.\n- **Unsanction:** marca o app como não autorizado (Shadow IT), mas não controla o login de usuários corporativos.\n\n**Dica de prova:** Access policies no MDCA dependem da CA com \"Use Conditional Access App Control\" para o app.",
    "docs": [
      {
        "t": "Criar políticas de sessão - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
      },
      {
        "t": "Controlar aplicativos de nuvem com políticas - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"
      },
      {
        "t": "Criar políticas de acesso - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"
      }
    ]
  },
  {
    "id": "Q118",
    "src": 118,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "O cenário (sem celular conectado, só laptop com internet cabeada) deixa o **código de verificação** do Authenticator.",
    "details": "**Por que não as outras**\n- **SMS:** exige sinal de celular.\n- **E-mail / perguntas:** não são MFA de login.",
    "docs": [
      {
        "t": "Gerenciar métodos de autenticação - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"
      },
      {
        "t": "Visão geral da autenticação baseada em certificado do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication"
      },
      {
        "t": "Configurar um Passe de Acesso Temporário no Microsoft Entra ID para registrar métodos de autenticação sem senha - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass"
      },
      {
        "t": "Como habilitar chaves de acesso (FIDO2) no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-authentication-passkeys-fido2"
      }
    ]
  },
  {
    "id": "Q119",
    "src": 119,
    "domain": 2,
    "skill": "2.3",
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
    "explanation": "**Microsoft Entra threat intelligence** pode ser detecção de risco de usuário. IP anônimo, malicioso e viagem impossível são de risco de entrada.",
    "details": "**Por que não as outras**\n- **Impossible travel / anonymous IP / malicious IP:** são riscos de entrada.\n\n**Dica de prova:** A mesma detecção de threat intelligence existe em versão de usuário e de entrada; nas questões, ela costuma ser a opção de \"user risk\".",
    "docs": [
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ]
  },
  {
    "id": "Q120",
    "src": 120,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "Pelo gabarito, **Set-MsolUserLicense**. MSOnline foi aposentado — questão borderline.",
    "details": "**Por que não as outras**\n- **Administrative units / Groups blade / Set-WindowsProductKey:** nenhum remove licenças diretas em massa.",
    "docs": [
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Set-MgUserLicense (Microsoft.Graph.Users.Actions)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ]
  },
  {
    "id": "Q121",
    "src": 121,
    "domain": 1,
    "skill": "1.4",
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
    "explanation": "Só a OU1 (e Users) é sincronizada, com **PTA** e **password writeback**. User1 (OU1) pode usar SSPR (o writeback devolve a senha ao AD) e é autenticado por um DC via PTA. User2 (OU2) **não é sincronizado** e não existe no Entra, então não pode ser adicionado como membro. O dump marcava Sim nas três.",
    "details": "**Item a item**\n- **User1 usa SSPR:** Sim. Está sincronizado, e o password writeback está habilitado.\n- **User1 autenticado por DC:** Sim. PTA valida no AD on-premises.\n- **User2 como membro no SharePoint:** Não. A OU2 não está sincronizada, então o User2 não existe no Entra.",
    "docs": [
      {
        "t": "O que são o Microsoft Entra Connect e o Connect Health? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-azure-ad-connect"
      },
      {
        "t": "Entender o Microsoft Entra Connect Sync - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-whatis"
      },
      {
        "t": "Microsoft Entra Connect Sync: configurar a filtragem - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-configure-filtering"
      }
    ]
  },
  {
    "id": "Q122",
    "src": 122,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "O blade **Licenses** remove a licença E3 de todos os usuários de uma vez.",
    "details": "**Por que não as outras**\n- **Update-MgGroup:** altera propriedades do grupo, não licenças diretas de usuários.\n- **Set-WindowsProductKey / Administrative units:** sem relação.",
    "docs": [
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Set-MgUserLicense (Microsoft.Graph.Users.Actions)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ]
  },
  {
    "id": "Q123",
    "src": 123,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "O Microsoft 365 admin center tem o recurso **Compare roles**. A comunidade aponta que o Application Administrator só aparece no Entra admin center — confira a discussão.",
    "details": "**Por que não as outras**\n- **Defender / Purview:** não comparam funções administrativas.\n- **Entra admin center:** lista as funções, mas a comparação lado a lado de funções é recurso do M365 admin center (Roles > Compare roles).",
    "docs": [
      {
        "t": "Funções internas do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
      },
      {
        "t": "Criar uma função personalizada no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-create"
      },
      {
        "t": "Atribuir funções do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/manage-roles-portal"
      }
    ]
  },
  {
    "id": "Q124",
    "src": 124,
    "domain": 1,
    "skill": "1.3",
    "topic": "Cadastro por autoatendimento",
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
    "explanation": "O equivalente atual do Set-MsolCompanySettings é **Update-MgPolicyAuthorizationPolicy** (AllowEmailVerifiedUsersToJoinOrganization / AllowedToSignUpEmailBasedSubscriptions), que **não está entre as opções**. O dump marca Update-MgPolicyPermissionGrantPolicyExclude, que trata de consentimento de apps. Questão mantida só como borderline.",
    "details": "**Por que não as outras**\n- **Update-MgOrganization / Update-MgDomain / Update-MgDomainFederationConfiguration:** não tratam do self-service sign-up.\n- **Update-MgPolicyPermissionGrantPolicyExclude:** é de consentimento de apps; o gabarito do dump está errado e nenhuma opção corresponde.\n\n**Dica de prova:** Correto hoje: Update-MgPolicyAuthorizationPolicy -AllowedToSignUpEmailBasedSubscriptions:$false -AllowEmailVerifiedUsersToJoinOrganization:$false.",
    "docs": [
      {
        "t": "Inscrição por autoatendimento para usuários com email verificado - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/directory-self-service-signup"
      },
      {
        "t": "Inscrição por autoatendimento - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/self-service-sign-up-overview"
      },
      {
        "t": "Propriedades de usuários convidados B2B - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/user-properties"
      },
      {
        "t": "Autenticação com senha de uso único por email - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/one-time-passcode"
      }
    ]
  },
  {
    "id": "Q125",
    "src": 125,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "Com um método exigido, o Authenticator só pode ser usado via **código de verificação**. FIDO2, Windows Hello e Teams não são métodos de SSPR.",
    "details": "**Por que não as outras**\n- **FIDO2 / Windows Hello PIN:** não são métodos de SSPR.\n- **Teams:** não existe como método.",
    "docs": [
      {
        "t": "Habilitar a redefinição de senha por autoatendimento do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr"
      },
      {
        "t": "Políticas de redefinição de senha por autoatendimento - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy"
      },
      {
        "t": "Habilitar o write-back de senha do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr-writeback"
      }
    ]
  },
  {
    "id": "Q126",
    "src": 126,
    "domain": 4,
    "skill": "4.1",
    "topic": "Gerenciamento de direitos",
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
    "explanation": "Custom extensions de entitlement management chamam um **Azure Logic App**, que precisa existir primeiro. O acesso aos recursos do catálogo é distribuído por **access packages**.",
    "details": "**Item a item**\n- **Managed account / Automation account:** custom extensions chamam Logic Apps, não runbooks.\n- **Playbook / workflow:** playbooks são do Sentinel; workflows são do lifecycle workflows.\n\n**Dica de prova:** A Logic App recebe o contexto (usuário, pacote, estágio) e pode chamar sistemas externos (ex.: ServiceNow).",
    "docs": [
      {
        "t": "O que é o gerenciamento de direitos? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"
      },
      {
        "t": "Cenários comuns no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-scenarios"
      }
    ]
  },
  {
    "id": "Q127",
    "src": 127,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "Funções administrativas como **User administrator** e **Password administrator** usam sempre a política forte de dois métodos para SSPR e não podem usar perguntas de segurança. Security Reader e usuários comuns seguem a política configurada.",
    "details": "**Por que não as outras**\n- **Só User4 / outras combinações:** os usuários com função administrativa (User administrator, Password administrator) **não** usam perguntas de segurança; os demais seguem a política.\n- **Todos:** administradores ficam na política de dois métodos.",
    "docs": [
      {
        "t": "Habilitar a redefinição de senha por autoatendimento do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr"
      },
      {
        "t": "Políticas de redefinição de senha por autoatendimento - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy"
      },
      {
        "t": "Habilitar o write-back de senha do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr-writeback"
      }
    ]
  },
  {
    "id": "Q128",
    "src": 128,
    "domain": 2,
    "skill": "2.1",
    "topic": "Bloqueio inteligente",
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
    "explanation": "O limite do **smart lockout** é configurado em Authentication methods > **Password protection** (Lockout threshold).",
    "details": "**Por que não as outras**\n- **Authentication strengths:** combinações de métodos para o CA.\n- **User / sign-in risk policies:** ID Protection.\n\n**Dica de prova:** Lockout threshold (padrão 10) e lockout duration (padrão 60 s) ficam em Password protection.",
    "docs": [
      {
        "t": "Prevenir ataques usando o bloqueio inteligente - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-smart-lockout"
      },
      {
        "t": "Proteção por senha no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad"
      },
      {
        "t": "Proteção por senha do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad-on-premises"
      }
    ]
  },
  {
    "id": "Q129",
    "src": 129,
    "domain": 2,
    "skill": "2.1",
    "topic": "Padrões de segurança",
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
    "explanation": "Tenants novos vêm com security defaults ativados, e eles impedem o uso de Conditional Access: primeiro **desative os security defaults**.",
    "details": "**Por que não as outras**\n- **Password protection / MFA registration policy / user consent:** nenhum libera a criação de políticas de CA.\n\n**Dica de prova:** Antes de desativar os security defaults, prepare políticas de CA equivalentes (MFA para todos e para admins, bloquear legacy auth).",
    "docs": [
      {
        "t": "Configurar Padrões de segurança para o Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"
      },
      {
        "t": "Configurar a autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"
      },
      {
        "t": "Visão geral da autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks"
      }
    ]
  },
  {
    "id": "Q132",
    "src": 132,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "Gerenciar e criar chaves: **Key Vault Crypto Officer**. Trabalhar com certificados: **Key Vault Certificates Officer** (entre as opções, a única de certificados).",
    "details": "**Item a item**\n- **User1 com Certificates/Secrets Officer:** não gerenciam chaves.\n- **User2 com Crypto/Secrets Officer:** não gerenciam certificados.\n\n**Dica de prova:** Para apenas **ler** o certificado, Key Vault Certificate User seria ainda mais restrito.",
    "docs": [
      {
        "t": "Conceder permissão a aplicativos para acessar um cofre de chaves do Azure usando o Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      }
    ]
  },
  {
    "id": "Q133",
    "src": 133,
    "domain": 2,
    "skill": "2.3",
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
    "explanation": "No modo de interrupção do registro combinado, o usuário pode registrar o **Microsoft Authenticator** e o **e-mail** (para SSPR), entre outros. FIDO2 e Windows Hello só são registrados no modo de gerenciamento (Security info) ou no próprio Windows.",
    "details": "**Por que não as outras**\n- **FIDO2 / Windows Hello:** registrados em Security info (modo gerenciar) ou no próprio Windows, não no fluxo de interrupção.\n- **Hardware token (OATH):** é importado pelo administrador, não registrado pelo usuário no fluxo.\n\n**Dica de prova:** No modo interrupt, o usuário registra o que as políticas exigem: Authenticator, telefone, e-mail (SSPR) etc.",
    "docs": [
      {
        "t": "Registro combinado de SSPR e autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-registration-mfa-sspr-combined"
      },
      {
        "t": "Executar uma campanha de registro para configurar uma chave de acesso ou o Microsoft Authenticator - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-mfa-registration-campaign"
      },
      {
        "t": "Configurar a política de registro de MFA - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-mfa-policy"
      }
    ]
  },
  {
    "id": "Q134",
    "src": 134,
    "domain": 2,
    "skill": "2.2",
    "topic": "Modelos de Acesso Condicional",
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
    "explanation": "Os templates de CA incluem **All users** e excluem automaticamente o **usuário que cria a política** (Admin1), para evitar que ele perca o acesso. O dump marcava \"None\" na exclusão.",
    "details": "**Item a item**\n- **Include = usuários específicos:** templates começam com All users.\n- **Exclude = None:** o template exclui automaticamente quem cria a política, como proteção contra lockout.\n\n**Dica de prova:** Políticas criadas a partir de template entram em report-only por padrão; revise antes de ligar.",
    "docs": [
      {
        "t": "Modelos de Acesso Condicional: simplificar a segurança - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policy-common"
      }
    ]
  },
  {
    "id": "Q135",
    "src": 135,
    "domain": 1,
    "skill": "1.3",
    "topic": "Identidades externas",
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
    "explanation": "B2B collaboration é configurado em **External collaboration settings**. A cobrança por MAU exige vincular o tenant a uma assinatura em **Linked subscriptions**.",
    "details": "**Por que não as outras**\n- **Cross-tenant access settings:** controlam a confiança e o B2B **com outros tenants Entra** específicos, não os convites em geral.\n- **All identity providers:** provedores (Google, SAML, OTP).\n- **User flows / custom attributes / API connectors:** self-service sign-up.\n- **Terms of use / access reviews:** governança.\n\n**Dica de prova:** B2B collaboration tem duas camadas: External collaboration settings (convites) e cross-tenant access (inbound/outbound).",
    "docs": [
      {
        "t": "Provedores de identidade para tenants de força de trabalho - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/identity-providers"
      },
      {
        "t": "Adicionar um provedor de identidade SAML/WS-Fed - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/direct-federation"
      },
      {
        "t": "Provedor de identidade do Google - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/google-federation"
      },
      {
        "t": "Preços do External ID - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/external-identities-pricing"
      }
    ]
  },
  {
    "id": "Q136",
    "src": 136,
    "domain": 1,
    "skill": "1.3",
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
    "explanation": "Para que o guest entre com o novo endereço/identidade, use **Reset redemption status**: ele refaz o resgate do convite mantendo o objeto, as associações e as permissões.",
    "details": "**Por que não as outras**\n- **Métodos de autenticação:** o guest autentica no tenant de origem.\n- **Reset de senha:** o guest não tem senha no seu tenant.\n- **Revogar sessões:** não troca a identidade de login.\n\n**Dica de prova:** O reset de redemption pode ser feito pelo portal ou pela API de convite (resetRedemption = true).",
    "docs": [
      {
        "t": "Redefinir o status de resgate de convidados - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/reset-redemption-status"
      },
      {
        "t": "New-MgInvitation (Microsoft.Graph.Identity.SignIns)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/new-mginvitation"
      },
      {
        "t": "Propriedades de usuários convidados B2B - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/user-properties"
      },
      {
        "t": "Autenticação com senha de uso único por email - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/one-time-passcode"
      }
    ]
  },
  {
    "id": "Q137",
    "src": 137,
    "domain": 1,
    "skill": "1.3",
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
    "explanation": "A lista de domínios permitidos/bloqueados para convites fica em **External collaboration settings > Collaboration restrictions**.",
    "details": "**Por que não as outras**\n- **All identity providers:** define como o guest autentica, não quais domínios podem ser convidados.\n- **Cross-tenant access settings:** controlam organizações Entra específicas (inbound/outbound), não uma lista simples de domínios para convite.\n- **Linked subscriptions:** cobrança.\n\n**Dica de prova:** A allow list e a deny list são mutuamente exclusivas; vale uma ou outra.",
    "docs": [
      {
        "t": "Configurar a colaboração externa - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/external-collaboration-settings-configure"
      },
      {
        "t": "Permitir ou bloquear convites - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/allow-deny-list"
      }
    ]
  },
  {
    "id": "Q138",
    "src": 138,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "explanation": "**Access review** recorrente (trimestral) dos membros guest do grupo, com o dono do grupo como revisor.",
    "details": "**Por que não as outras**\n- **External collaboration settings:** convites.\n- **Access package:** concede acesso; a revisão periódica de membros existentes é feita por access review.\n- **Expiration policy:** expira o grupo, não revisa os convidados.\n\n**Dica de prova:** Na revisão: escopo \"Guest users only\", revisor \"Group owner(s)\", recorrência trimestral, auto-apply e ação para quem não responder.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ]
  },
  {
    "id": "Q139",
    "src": 139,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "O Admin1 é User administrator com escopo na AU. User3/User4 estão fora da AU, então ele não redefine as senhas. O Group3 não está na AU, então ele também não gerencia a associação desse grupo. O Admin3 tem escopo no tenant e redefine a senha de User1. O gabarito em imagem marcava Sim na primeira, o que contradiz o escopo da AU.",
    "details": "**Item a item**\n- **Admin1 redefine senha de User3/User4:** Não. Estão fora da AU.\n- **Admin1 adiciona User1 ao Group3:** Não. O Group3 não está na AU.\n- **Admin3 redefine senha do User1:** Sim. Escopo no tenant inteiro.",
    "docs": [
      {
        "t": "Criar ou excluir unidades administrativas - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-manage"
      },
      {
        "t": "Adicionar usuários, grupos ou dispositivos a uma unidade administrativa - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-members-add"
      },
      {
        "t": "Unidades administrativas de gerenciamento restrito no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-restricted-management"
      }
    ]
  },
  {
    "id": "Q140",
    "src": 140,
    "domain": 1,
    "skill": "1.4",
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
    "explanation": "User1 é sincronizado, mas pode ser membro de um grupo **de nuvem** (Group1). Desabilitar User2 no Entra não afeta o AD DS, então ele continua entrando no Server1 (on-premises). User3 está **desabilitado no AD** e o domínio é federado (AD FS valida no AD), então habilitar a conta na nuvem não permite o login, e a próxima sincronização sobrescreve o estado. O dump marcava Não/Não/Sim, o que contraria a autoridade do AD sobre objetos sincronizados.",
    "details": "**Item a item**\n- **Adicionar o User1 ao Group1:** Sim. Grupos de nuvem aceitam usuários sincronizados como membros.\n- **User2 entra no Server1:** Sim. Desabilitar no Entra não afeta o AD.\n- **User3 entra no M365:** Não. A conta está desabilitada no AD, que é a fonte de autoridade, e a federação valida no AD.\n\n**Dica de prova:** O próximo ciclo de sync reescreve o accountEnabled no Entra com o valor do AD.",
    "docs": [
      {
        "t": "Recursos e configuração do serviço Microsoft Entra Connect Sync - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-syncservice-features"
      },
      {
        "t": "O que são o Microsoft Entra Connect e o Connect Health? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-azure-ad-connect"
      },
      {
        "t": "Entender o Microsoft Entra Connect Sync - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-whatis"
      },
      {
        "t": "Microsoft Entra Connect Sync: configurar a filtragem - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-configure-filtering"
      }
    ]
  },
  {
    "id": "Q143",
    "src": 143,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "Duas atribuições bastam: uma função personalizada na **assinatura** (ler tudo e reiniciar VMs) e uma no **RG1** (criar VMs e storage accounts) — ou Contributor no RG1 + função personalizada na assinatura.",
    "details": "**Por que não as outras**\n- **1 atribuição:** nenhuma função única dá \"ler tudo + reiniciar VMs\" na assinatura **e** \"criar só no RG1\".\n- **3 ou 4:** dá para combinar tudo em duas atribuições (uma por escopo).\n\n**Dica de prova:** Funções podem ser customizadas com várias ações; o escopo é que obriga a separar.",
    "docs": [
      {
        "t": "O que é o controle de acesso baseado em função do Azure (Azure RBAC)?",
        "u": "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview"
      },
      {
        "t": "Funções internas do Azure - Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      }
    ]
  },
  {
    "id": "Q144",
    "src": 144,
    "domain": 1,
    "skill": "1.3",
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
    "explanation": "O erro ao convidar adatum.com indica que o domínio não está na lista de permitidos (ou está na de bloqueados) em **Collaboration restrictions**.",
    "details": "**Por que não as outras**\n- **Guest invite settings:** definem **quem** pode convidar, não quais domínios.\n- **Verifiable credentials:** identidade descentralizada.\n- **Named locations:** condição de CA.\n\n**Dica de prova:** Se adatum.com estiver bloqueado também em cross-tenant access (inbound), ajuste lá também.",
    "docs": [
      {
        "t": "Configurar a colaboração externa - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/external-collaboration-settings-configure"
      },
      {
        "t": "Permitir ou bloquear convites - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/allow-deny-list"
      }
    ]
  },
  {
    "id": "Q145",
    "src": 145,
    "domain": 2,
    "skill": "2.3",
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
    "explanation": "O dump marca 30 dias. Pela tabela de retenção, os relatórios de risco têm retenção diferente por licença e por tipo (risky sign-ins chegam a 90 dias com P2, e risky users não expiram até serem remediados). Confira a discussão.",
    "details": "**Por que não as outras**\n- **60 / 90 / 180 dias:** o gabarito considera 30 dias para a atividade de usuários de risco (sem exportação).\n\n**Dica de prova:** Para retenção maior, envie RiskyUsers e UserRiskEvents a um workspace via diagnostic settings.",
    "docs": [
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ]
  },
  {
    "id": "Q146",
    "src": 146,
    "domain": 2,
    "skill": "2.1",
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
    "details": "**Item a item**\n- **Notifications:** avisos de reset para usuários e admins.\n- **Properties:** habilita o SSPR (None/Selected/All).\n- **Registration:** exige registro e define o reconfirmar.\n- **AD FS / PTA / PHS:** não gravam a senha no AD; só o writeback grava.\n\n**Dica de prova:** A notificação do app só fica disponível quando \"Number of methods required to reset\" é 2; com 1, apenas o código do app é aceito.",
    "docs": [
      {
        "t": "Habilitar o write-back de senha do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr-writeback"
      },
      {
        "t": "Método de autenticação com perguntas de segurança - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-security-questions"
      },
      {
        "t": "Habilitar a redefinição de senha por autoatendimento do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr"
      },
      {
        "t": "Políticas de redefinição de senha por autoatendimento - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-sspr-deployment",
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-security-questions"
    ]
  },
  {
    "id": "Q147",
    "src": 147,
    "domain": 3,
    "skill": "3.4",
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
    "details": "**Por que não as outras**\n- **Application Insights:** monitora apps seus.\n- **Access reviews:** revisa acessos.\n- **Enterprise applications:** lista apps integrados ao Entra, não Shadow IT.\n\n**Dica de prova:** Use snapshot reports (upload manual) ou o log collector (Docker) para análise contínua.",
    "docs": [
      {
        "t": "Criar políticas de sessão - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
      },
      {
        "t": "Controlar aplicativos de nuvem com políticas - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"
      },
      {
        "t": "Criar relatórios instantâneos de descoberta de nuvem - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/create-snapshot-cloud-discovery-reports"
      },
      {
        "t": "Criar políticas de acesso - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/cloud-app-security/create-snapshot-cloud-discovery-reports#using-traffic-logs-for-cloud-discovery"
    ]
  },
  {
    "id": "Q148",
    "src": 148,
    "domain": 3,
    "skill": "3.2",
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
    "details": "**Item a item**\n- **Password Protection DC agent / proxy:** senhas banidas.\n- **Web Application Proxy (Windows):** é do AD FS, não do Entra App Proxy.\n- **Entrada HTTPS / IPsec:** o conector não precisa de portas de entrada.\n\n**Dica de prova:** O conector precisa alcançar o App1 (interno) e *.msappproxy.net na 443 de saída. Instale 2 ou mais conectores para alta disponibilidade.",
    "docs": [
      {
        "t": "Publicar aplicativos locais com o proxy de aplicativo do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/app-proxy/overview-what-is-app-proxy"
      },
      {
        "t": "Delegação restrita de Kerberos para logon único (SSO) em aplicativos com proxy de aplicativo - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/app-proxy/how-to-configure-sso-with-kcd"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/application-proxy"
    ]
  },
  {
    "id": "Q149",
    "src": 149,
    "domain": 3,
    "skill": "3.3",
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
    "details": "**Item a item**\n- **Admin2 (Application developer) atribuir ao App1:** ele só gerencia apps de que é owner.\n- **User1 atribuir:** usuário comum não atribui.\n- **Registrar só admins:** com \"Users can register applications = Yes\" (padrão), qualquer membro registra.\n\n**Dica de prova:** Considere desabilitar \"Users can register applications\" e usar a função Application developer.",
    "docs": [
      {
        "t": "Como e por que os aplicativos são adicionados ao Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/how-applications-are-added"
      },
      {
        "t": "Como registrar um aplicativo no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
      },
      {
        "t": "Adicionar e gerenciar credenciais de aplicativos no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-assign-users",
      "https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-how-applications-are-added"
    ]
  },
  {
    "id": "Q150",
    "src": 150,
    "domain": 3,
    "skill": "3.2",
    "topic": "Propriedades de aplicativo empresarial",
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
    "details": "**Item a item**\n- **Homepage para atribuídos / owners / ninguém:** com assignment required = No, qualquer usuário do tenant acessa.\n- **Launcher para todos / ninguém / owners:** com Visible = Yes, o app aparece no My Apps só para usuários atribuídos.\n\n**Dica de prova:** Para mostrar a todos no My Apps, atribua um grupo grande (ex.: All users dinâmico).",
    "docs": [
      {
        "t": "Gerenciar a atribuição de usuários e grupos a um aplicativo - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal"
      },
      {
        "t": "Início rápido: adicionar um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal"
      },
      {
        "t": "Propriedades de um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/application-properties"
      },
      {
        "t": "Planejar uma implantação de logon único - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/plan-sso-deployment"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal"
    ]
  },
  {
    "id": "Q151",
    "src": 151,
    "domain": 3,
    "skill": "3.2",
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
    "details": "**Por que não as outras**\n- **Configurar SSO:** o SSO já está configurado; o problema é a atribuição.\n- **Assignment required = No:** liberaria o acesso, mas os usuários ainda não veriam o app no My Apps sem atribuição.\n- **Permissões de consentimento:** sem relação com a visibilidade.\n\n**Dica de prova:** Coleções só organizam apps já visíveis ao usuário; não concedem acesso.",
    "docs": [
      {
        "t": "Gerenciar a atribuição de usuários e grupos a um aplicativo - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal"
      },
      {
        "t": "Início rápido: adicionar um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal"
      },
      {
        "t": "Propriedades de um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/application-properties"
      },
      {
        "t": "Planejar uma implantação de logon único - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/plan-sso-deployment"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal",
      "https://docs.microsoft.com/en-us/azure/active-directory/user-help/my-applications-portal-workspaces"
    ]
  },
  {
    "id": "Q152",
    "src": 152,
    "domain": 3,
    "skill": "3.3",
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
    "details": "**Por que não as outras**\n- **Managed Application Contributor / App Configuration Data Owner:** são funções do Azure RBAC, não do diretório.\n- **Cloud application administrator:** registra, mas é mais amplo (gerencia todos os apps).\n\n**Dica de prova:** O Application developer vira owner dos apps que cria, e só deles.",
    "docs": [
      {
        "t": "Delegar permissões de administrador de gerenciamento de aplicativos - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-app-roles"
      },
      {
        "t": "Adicionar funções de aplicativo e obtê-las de um token - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/delegate-app-roles"
    ]
  },
  {
    "id": "Q153",
    "src": 153,
    "domain": 3,
    "skill": "3.2",
    "topic": "Autoatendimento de aplicativos",
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
    "details": "**Item a item**\n- **Group3 sem aprovação:** Não. Membros de grupo aninhado não herdam a atribuição do app.\n- **User1 vira owner do Group1:** Não. O self-service pode usar o grupo, mas não muda os donos.\n- **App1 no launcher do User4:** Não. Visible to users = No.\n\n**Dica de prova:** O self-service application access está sendo substituído por access packages (entitlement management).",
    "docs": [
      {
        "t": "Habilitar a atribuição de aplicativos por autoatendimento - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/manage-self-service-access"
      },
      {
        "t": "Gerenciar a atribuição de usuários e grupos a um aplicativo - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal"
      },
      {
        "t": "Adicionar funções de aplicativo e obtê-las de um token - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal",
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-assign-users"
    ]
  },
  {
    "id": "Q154",
    "src": 154,
    "domain": 2,
    "skill": "2.3",
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
    "details": "**Por que não as outras**\n- **Access reviews:** governança, não risco.\n- **Password Protection:** senhas banidas.\n- **SSPR:** é a remediação de risco de **usuário** (troca de senha), não de entrada.\n\n**Dica de prova:** Combine com uma política de registro de MFA (ou registration campaign) para todos estarem prontos.",
    "docs": [
      {
        "t": "Corrigir riscos e desbloquear usuários - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-remediate-unblock"
      },
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-remediate-unblock",
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-sspr-deployment"
    ]
  },
  {
    "id": "Q155",
    "src": 155,
    "domain": 3,
    "skill": "3.2",
    "topic": "SSO e Acesso Condicional",
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
    "details": "**Item a item**\n- **App registration:** é para apps que você desenvolve; app da galeria entra como enterprise app.\n- **Application Proxy:** publica apps on-premises; o Service1 é SaaS.\n- **Managed identity:** identidade de recursos do Azure.\n- **Compliance policy:** avalia o dispositivo, mas quem bloqueia é o CA.\n- **OAuth policy:** governança de apps no MDCA.",
    "docs": [
      {
        "t": "Planejar uma implantação de logon único - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/plan-sso-deployment"
      },
      {
        "t": "Como e por que os aplicativos são adicionados ao Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/how-applications-are-added"
      },
      {
        "t": "Como configurar controles de concessão no Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-grant"
      },
      {
        "t": "Habilitar o logon único SAML para um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal-setup-sso"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-how-applications-are-added",
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/require-managed-devices"
    ]
  },
  {
    "id": "Q156",
    "src": 156,
    "domain": 3,
    "skill": "3.2",
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
    "details": "**Por que não as outras**\n- **Provisioning:** cria contas no app (SCIM).\n- **Application proxy:** publicação on-premises.\n- **Roles and administrators:** funções de gestão do app.\n\n**Dica de prova:** No self-service, defina se exige aprovação, os aprovadores e o grupo para onde vão os aprovados.",
    "docs": [
      {
        "t": "Habilitar a atribuição de aplicativos por autoatendimento - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/manage-self-service-access"
      },
      {
        "t": "Início rápido: adicionar um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal"
      },
      {
        "t": "Propriedades de um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/application-properties"
      },
      {
        "t": "Planejar uma implantação de logon único - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/plan-sso-deployment"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/manage-self-service-access"
    ]
  },
  {
    "id": "Q157",
    "src": 157,
    "domain": 3,
    "skill": "3.3",
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
    "details": "**Sequência**\n- **Group claim:** emite grupos no token; não dá acesso ao Graph.\n- **Delegated permissions:** exigem um usuário logado; o web service lê sem usuário (application permission).\n\n**Dica de prova:** Permissões de aplicação sempre exigem admin consent; o app usa o client credentials flow.",
    "docs": [
      {
        "t": "Referência de permissões do Microsoft Graph - Microsoft Graph",
        "u": "https://learn.microsoft.com/en-us/graph/permissions-reference"
      },
      {
        "t": "Noções básicas de autenticação e autorização - Microsoft Graph",
        "u": "https://learn.microsoft.com/en-us/graph/auth/auth-concepts"
      },
      {
        "t": "Visão geral de permissões e consentimento na plataforma de identidade da Microsoft - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview"
      },
      {
        "t": "Registro de aplicativos de API Web e permissões de API - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-configure-app-access-web-apis"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/graph/auth/auth-concepts"
    ]
  },
  {
    "id": "Q158",
    "src": 158,
    "domain": 3,
    "skill": "3.2",
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
    "details": "**Por que não as outras**\n- **Tags / naming policies / dynamic groups:** não organizam o My Apps em seções.\n\n**Dica de prova:** Coleções são criadas em Enterprise applications > App launchers (ou pelo próprio usuário no My Apps).",
    "docs": [
      {
        "t": "Início rápido: adicionar um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal"
      },
      {
        "t": "Propriedades de um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/application-properties"
      },
      {
        "t": "Planejar uma implantação de logon único - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/plan-sso-deployment"
      }
    ],
    "refs": [
      "https://support.microsoft.com/en-us/account-billing/customize-app-collections-in-the-my-apps-portal-2dae6b8a-d8b0-4a16-9a5d-71ed4d6a6c1d"
    ]
  },
  {
    "id": "Q159",
    "src": 159,
    "domain": 3,
    "skill": "3.2",
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
    "details": "**Por que não as outras**\n- **Group2 (distribuição):** grupos sem segurança não são atribuíveis a apps.\n- **Group4:** o gabarito considera mail-enabled security group não elegível (comportamento discutido).\n\n**Dica de prova:** Grupos aninhados não herdam a atribuição de app; atribua o grupo que contém os usuários diretamente.",
    "docs": [
      {
        "t": "Usar um grupo para gerenciar o acesso a aplicativos SaaS - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-saasapps"
      },
      {
        "t": "Início rápido: adicionar um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal"
      },
      {
        "t": "Propriedades de um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/application-properties"
      },
      {
        "t": "Planejar uma implantação de logon único - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/plan-sso-deployment"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/groups-saasapps"
    ]
  },
  {
    "id": "Q160",
    "src": 160,
    "domain": 3,
    "skill": "3.2",
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
    "details": "**Por que não as outras**\n- **User1:** o consentimento de usuário está desabilitado.\n- **User2 / Admin2:** como revisores, só podem aprovar se tiverem função de Global, Cloud application ou Application administrator; sem a função, apenas revisam ou bloqueiam.\n\n**Dica de prova:** O admin consent workflow notifica os revisores por e-mail; as solicitações expiram conforme configurado (padrão 30 dias).",
    "docs": [
      {
        "t": "Configurar o fluxo de trabalho de consentimento do administrador - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow"
      },
      {
        "t": "Visão geral do consentimento de usuários e administradores - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview"
      },
      {
        "t": "Configurar como os usuários consentem com aplicativos - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/configure-admin-consent-workflow"
    ]
  },
  {
    "id": "Q162",
    "src": 162,
    "domain": 4,
    "skill": "4.1",
    "topic": "Termos de uso",
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
    "details": "**Por que não as outras**\n- **Access policy do MDCA:** controla a sessão; não exibe os termos do Entra.\n- **Terms and conditions do Intune:** são aceitos no Company Portal (registro do dispositivo), não no acesso a apps.\n- **Compliance policy:** avalia dispositivos.\n\n**Dica de prova:** A política pode exigir aceite por dispositivo e expiração periódica.",
    "docs": [
      {
        "t": "Configurar os Termos de Uso do Microsoft Entra com o Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/terms-of-use"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/terms-of-use"
    ]
  },
  {
    "id": "Q163",
    "src": 163,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "details": "**Por que não as outras**\n- **Group3 (dispositivos):** access reviews revisam pessoas, não dispositivos.\n- **Combinações sem grupos M365 ou dinâmicos:** os dois tipos são suportados.\n\n**Dica de prova:** Access reviews exigem licença Entra ID P2 (ou Entra ID Governance) para os revisores e os revisados.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q164",
    "src": 164,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "details": "**Por que não as outras**\n- **User1 (owner):** com Members (self), o owner não revisa os outros.\n- **User2:** cada membro revisa só a si mesmo.\n\n**Dica de prova:** Outras opções de revisor: Group owner(s), usuários ou grupos específicos e Managers (com fallback).",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      },
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-how-to-start-security-review"
    ]
  },
  {
    "id": "Q165",
    "src": 165,
    "domain": 4,
    "skill": "4.3",
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
    "details": "**Item a item**\n- **MFA a cada 15 dias ou 1 mês:** o MFA é pedido a cada ativação, e a ativação dura no máximo 8 h.\n- **Só Global / só Privileged Role / User admin permanente:** sem aprovadores definidos, o padrão é Global Administrator **ou** Privileged Role Administrator.",
    "docs": [
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Planejar uma implantação do Privileged Identity Management - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-deployment-plan"
      },
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-configure",
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-deployment-plan"
    ]
  },
  {
    "id": "Q166",
    "src": 166,
    "domain": 4,
    "skill": "4.1",
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
    "details": "**Item a item**\n- **Device1 em 20/11:** Sim. Ainda não aceitou nesse dispositivo.\n- **Device2 em 11/12:** Sim. Registra o dispositivo e aceita.\n- **Device3 em 7/12:** Não. Já aceitou em 15/11, e a expiração só começa em 10/12.\n\n**Dica de prova:** \"Require users to consent on every device\" exige que o dispositivo seja registrado ou joined no Entra; alguns clientes não suportam.",
    "docs": [
      {
        "t": "Configurar os Termos de Uso do Microsoft Entra com o Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/terms-of-use"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/terms-of-use"
    ]
  },
  {
    "id": "Q167",
    "src": 167,
    "domain": 4,
    "skill": "4.3",
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
    "details": "**Por que não as outras**\n- **Expirar atribuições elegíveis / ativas:** mantém o modelo de acesso permanente até expirar.\n- **Active:** é o estado atual, que é o problema.\n\n**Dica de prova:** Ao converter para Eligible, configure também MFA na ativação, justificativa e duração máxima.",
    "docs": [
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-configure"
    ]
  },
  {
    "id": "Q168",
    "src": 168,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "details": "**Por que não as outras**\n- **Access package (dentro ou fora do diretório):** concede acesso; o requisito é revisar periodicamente o acesso existente.\n- **Revisão baseada em aplicação:** o acesso ao EAC vem de uma função ou grupo, não de atribuição de app.\n\n**Dica de prova:** Com auto-apply e \"If reviewers don't respond = Remove access\", o acesso é bloqueado automaticamente.",
    "docs": [
      {
        "t": "O que são revisões de acesso? - Microsoft Entra - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview"
      },
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/access-reviews-overview"
    ]
  },
  {
    "id": "Q169",
    "src": 169,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "details": "**Série \"Solution\" (revisão deve ir ao gerente de cada departamento):** só **preencher o Manager** dos usuários atende. Revisões separadas por função, Members (self) e gerentes como fallback não atendem.\n\n**Dica de prova:** Fallback reviewers recebem as revisões de usuários **sem** gerente definido.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q170",
    "src": 170,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "details": "**Série \"Solution\":** com Reviewers = Managers, a revisão segue o atributo manager do usuário. Preenchido (no Entra ou sincronizado do AD), cada gerente recebe a sua equipe.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q171",
    "src": 171,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "details": "**Série \"Solution\":** Members (self) tira o gerente do processo, e o requisito é que o gerente revise.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q172",
    "src": 172,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "As outras opções (PIM, CA por local, MFA) criam dependências que podem impedir o acesso em uma emergência. A boa prática é **monitorar e alertar** quando a conta de emergência é usada ou modificada.",
    "details": "**Por que não as outras**\n- **PIM para o Global Admin de emergência:** a ativação depende do próprio Entra e de aprovação; pode falhar na crise.\n- **CA por local:** se a rede corporativa cair, a conta fica inacessível.\n- **CA exigindo MFA:** o MFA pode ser justamente o serviço com falha (a recomendação atual é exigir FIDO2/passkey para break-glass, mas o gabarito é monitorar).\n\n**Dica de prova:** Crie alertas no Log Analytics para logins e alterações nas contas de emergência e teste-as periodicamente.",
    "docs": [
      {
        "t": "Gerenciar contas de administrador de acesso de emergência - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access"
      }
    ]
  },
  {
    "id": "Q173",
    "src": 173,
    "domain": 4,
    "skill": "4.1",
    "topic": "Gerenciamento de direitos",
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
    "details": "**Por que não as outras**\n- **Access packages:** definem o acesso, não o ciclo de vida global dos externos.\n- **Terms of use / access reviews settings:** não removem convidados após expirar.\n\n**Dica de prova:** A remoção só vale para externos que entraram por access package e perderam a última atribuição.",
    "docs": [
      {
        "t": "Controlar o acesso de usuários externos no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-external-users"
      },
      {
        "t": "O que é o gerenciamento de direitos? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"
      },
      {
        "t": "Cenários comuns no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-scenarios"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-external-users"
    ]
  },
  {
    "id": "Q174",
    "src": 174,
    "domain": 4,
    "skill": "4.4",
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
    "details": "**Por que não as outras**\n- **14 dias:** não é um período de retenção do Entra.\n- **90 / 365 dias:** exigem enviar para Log Analytics ou storage.\n\n**Dica de prova:** Retenção no portal: Free = 7 dias; P1/P2 = 30 dias (audit e sign-in).",
    "docs": [
      {
        "t": "Retenção de dados do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/reference-reports-data-retention"
      },
      {
        "t": "Logs de entrada no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins"
      },
      {
        "t": "Conhecer os logs de auditoria no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-audit-logs"
      },
      {
        "t": "Logs de provisionamento de usuários no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-provisioning-logs"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/reference-reports-data-retention#how-long-does-azure-ad-store-the-data"
    ]
  },
  {
    "id": "Q175",
    "src": 175,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "details": "**Por que não as outras**\n- **Combinações sem App1:** atribuições de enterprise apps também são revisáveis.\n- **Só Group1 / só funções:** as access reviews cobrem os quatro tipos.\n\n**Dica de prova:** Revisões de funções do Entra e do Azure são criadas pelo PIM.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      },
      {
        "t": "O que são revisões de acesso? - Microsoft Entra - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview"
      },
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-how-to-start-security-review?toc=/azure/active-directory/governance/toc.json",
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/access-reviews-overview"
    ]
  },
  {
    "id": "Q176",
    "src": 176,
    "domain": 4,
    "skill": "4.4",
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
    "details": "**Por que não as outras**\n- **Sign-ins (CSV/JSON):** registram logins, não alterações em políticas.\n- **Audit logs em CSV:** também contém a mudança; o gabarito prefere JSON, que preserva a estrutura (modifiedProperties) para o SIEM.\n\n**Dica de prova:** Para integração contínua com SIEM, use diagnostic settings → Event Hub.",
    "docs": [
      {
        "t": "Conhecer os logs de auditoria no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-audit-logs"
      },
      {
        "t": "Logs de entrada no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins"
      },
      {
        "t": "Logs de provisionamento de usuários no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-provisioning-logs"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/concept-audit-logs"
    ]
  },
  {
    "id": "Q177",
    "src": 177,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "details": "**Série \"Solution\":** um fallback reviewer só recebe a revisão de quem não tem manager, e com vários gerentes como fallback todos receberiam tudo.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q178",
    "src": 178,
    "domain": 4,
    "skill": "4.3",
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
    "details": "**Por que não as outras**\n- **Identity1 (service principal / managed identity):** não pode ativar funções; só recebe atribuição ativa.\n- **Só User1:** guests também podem ser elegíveis.\n\n**Dica de prova:** Grupos role-assignable também podem ser elegíveis (ou usar PIM for Groups).",
    "docs": [
      {
        "t": "Planejar uma implantação do Privileged Identity Management - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-deployment-plan"
      },
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-deployment-plan"
    ]
  },
  {
    "id": "Q179",
    "src": 179,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "details": "**Item a item**\n- **User1 em 5/02:** Não. A instância de janeiro terminou em 29/01, e a próxima só começaria em 15/02, quando a série termina.\n- **User2 em 25/01:** Sim. Revisões ativas permitem mudar a resposta até o fim.\n- **User3 (owner):** Não. Os revisores são os próprios membros (self).",
    "docs": [
      {
        "t": "Revisar seu acesso a grupos e aplicativos nas revisões de acesso - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/review-your-access"
      },
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/review-your-access"
    ]
  },
  {
    "id": "Q180",
    "src": 180,
    "domain": 4,
    "skill": "4.1",
    "topic": "Gerenciamento de direitos",
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
    "details": "**Item a item**\n- **Assignment / CA / external collaboration para liberar:** a política do access package é que define quem pode solicitar (organização conectada).\n- **Policy / assignment / CA para bloquear litwareinc.com:** a deny list de domínios em External collaboration impede o convite desse domínio.\n\n**Dica de prova:** Organizações conectadas podem conter vários domínios; o filtro por domínio é feito fora do pacote.",
    "docs": [
      {
        "t": "Alterar configurações de solicitação de um pacote de acesso no gerenciamento de direitos - Microsoft Entra - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-request-policy"
      },
      {
        "t": "Criar um pacote de acesso no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-create"
      },
      {
        "t": "O que é o gerenciamento de direitos? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"
      },
      {
        "t": "Cenários comuns no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-scenarios"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-access-package-request-policy",
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-access-package-create"
    ]
  },
  {
    "id": "Q181",
    "src": 181,
    "domain": 4,
    "skill": "4.4",
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
    "details": "**Por que não as outras**\n- **Notify settings do ID Protection:** e-mails para admins.\n- **Playbook:** automação de resposta (vem depois do incidente).\n- **Diagnostic settings do Entra:** enviam logs (inclusive RiskyUsers), mas a geração de incidentes vem das regras e do conector.\n\n**Dica de prova:** Hoje, os alertas do ID Protection chegam ao Sentinel pelo conector Microsoft Defender XDR.",
    "docs": [
      {
        "t": "Detecção avançada de ataques em vários estágios no Microsoft Sentinel",
        "u": "https://learn.microsoft.com/en-us/azure/sentinel/fusion"
      },
      {
        "t": "Encontrar seu conector de dados do Microsoft Sentinel",
        "u": "https://learn.microsoft.com/en-us/azure/sentinel/data-connectors-reference"
      },
      {
        "t": "Como configurar as definições de diagnóstico do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-configure-diagnostic-settings"
      },
      {
        "t": "Integrar logs do Microsoft Entra aos logs do Azure Monitor - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-integrate-activity-logs-with-azure-monitor-logs"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/sentinel/connect-azure-ad-identity-protection"
    ]
  },
  {
    "id": "Q182",
    "src": 182,
    "domain": 4,
    "skill": "4.4",
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
    "explanation": "Insights administrator é uma função do Viva Insights e não muda quem recebe e-mails de alerta do Azure Monitor.",
    "details": "**Série \"Solution\" (trocar o destinatário dos alertas):** só **mudar o action group** atende. Funções do Entra, diagnostic settings e DCR não definem destinatários.",
    "docs": [
      {
        "t": "Criar regras de alerta de pesquisa de logs do Azure Monitor - Azure Monitor",
        "u": "https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-create-log-alert-rule"
      },
      {
        "t": "Analisar logs de atividades usando o Log Analytics - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-analyze-activity-logs-log-analytics"
      },
      {
        "t": "Introdução às consultas de log nos Logs do Azure Monitor - Azure Monitor",
        "u": "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/get-started-queries"
      }
    ]
  },
  {
    "id": "Q183",
    "src": 183,
    "domain": 4,
    "skill": "4.4",
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
    "explanation": "Diagnostic settings definem **para onde os logs vão** (workspace, storage, event hub), não quem recebe e-mails de alerta. Quem recebe o e-mail é definido no **action group** da regra de alerta. O dump marcava Sim.",
    "details": "**Série \"Solution\":** diagnostic settings definem para onde os logs vão; o e-mail de alerta vem do action group da regra.",
    "docs": [
      {
        "t": "Criar regras de alerta de pesquisa de logs do Azure Monitor - Azure Monitor",
        "u": "https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-create-log-alert-rule"
      },
      {
        "t": "Analisar logs de atividades usando o Log Analytics - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-analyze-activity-logs-log-analytics"
      },
      {
        "t": "Introdução às consultas de log nos Logs do Azure Monitor - Azure Monitor",
        "u": "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/get-started-queries"
      }
    ]
  },
  {
    "id": "Q184",
    "src": 184,
    "domain": 4,
    "skill": "4.4",
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
    "explanation": "Uma data collection rule define a coleta de dados, não os destinatários de alertas.",
    "details": "**Série \"Solution\":** DCR define coleta de agentes (VMs). Os destinatários do alerta continuam no action group.",
    "docs": [
      {
        "t": "Criar regras de alerta de pesquisa de logs do Azure Monitor - Azure Monitor",
        "u": "https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-create-log-alert-rule"
      },
      {
        "t": "Analisar logs de atividades usando o Log Analytics - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-analyze-activity-logs-log-analytics"
      },
      {
        "t": "Introdução às consultas de log nos Logs do Azure Monitor - Azure Monitor",
        "u": "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/get-started-queries"
      }
    ]
  },
  {
    "id": "Q185",
    "src": 185,
    "domain": 4,
    "skill": "4.4",
    "topic": "Configurações de diagnóstico",
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
    "details": "**Por que não as outras**\n- **Set-AzureADTenantDetail:** altera propriedades do tenant; sem relação com logs.\n- **Workbook:** precisa dos dados no workspace antes.\n- **Get-AzureADAuditDirectoryLogs:** consulta pontual; não integra com o Azure Monitor.\n\n**Dica de prova:** Selecione as categorias AuditLogs, SignInLogs, NonInteractiveUserSignInLogs etc. no diagnostic setting.",
    "docs": [
      {
        "t": "Integrar logs do Microsoft Entra aos logs do Azure Monitor - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-integrate-activity-logs-with-azure-monitor-logs"
      },
      {
        "t": "Como configurar as definições de diagnóstico do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-configure-diagnostic-settings"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/howto-integrate-activity-logs-with-log-analytics"
    ]
  },
  {
    "id": "Q186",
    "src": 186,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "\"On activation, require Azure MFA\" = Yes: User1 precisa de MFA (Sim). Não há aprovação exigida (Não). O Privileged Authentication Administrator gerencia métodos de autenticação, **não** atribuições de função, então a afirmação sobre User2 **e** User3 é falsa (Não).",
    "details": "**Item a item**\n- **User1 com MFA na ativação:** Sim. A opção está habilitada.\n- **User2 aprova:** Não. Aprovação não exigida.\n- **User2 e User3 editam a atribuição:** Não. Privileged Authentication Administrator não gerencia funções; isso exige Privileged Role Administrator ou Global Administrator.",
    "docs": [
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      }
    ]
  },
  {
    "id": "Q187",
    "src": 187,
    "domain": 4,
    "skill": "4.1",
    "topic": "Gerenciamento de direitos",
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
    "explanation": "O dump marca **criar o access package**, já que existe o catálogo General por padrão. Parte da comunidade defende criar um **catálogo** primeiro. Confira a discussão.",
    "details": "**Por que não as outras**\n- **App registration / administrative unit:** não fazem parte do entitlement management.\n- **Catálogo:** o General já existe; o gabarito considera o access package como primeiro passo (a comunidade se divide).\n\n**Dica de prova:** Boa prática: um catálogo por projeto/área, com catalog owners delegados.",
    "docs": [
      {
        "t": "O que é o gerenciamento de direitos? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"
      },
      {
        "t": "Cenários comuns no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-scenarios"
      }
    ]
  },
  {
    "id": "Q188",
    "src": 188,
    "domain": 4,
    "skill": "4.4",
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
    "explanation": "Os destinatários de e-mail de uma regra de alerta são definidos no **action group**. Alterar o action group para o novo administrador atende. O dump marcava Não.",
    "details": "**Série \"Solution\":** o action group define e-mail, SMS e outras ações. Trocar o destinatário ali atende.",
    "docs": [
      {
        "t": "Criar regras de alerta de pesquisa de logs do Azure Monitor - Azure Monitor",
        "u": "https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-create-log-alert-rule"
      },
      {
        "t": "Analisar logs de atividades usando o Log Analytics - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-analyze-activity-logs-log-analytics"
      },
      {
        "t": "Introdução às consultas de log nos Logs do Azure Monitor - Azure Monitor",
        "u": "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/get-started-queries"
      }
    ]
  },
  {
    "id": "Q189",
    "src": 189,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "details": "**Item a item**\n- **User1 removido do Group1:** Não. A revisão é do Group3, e o User1 é membro indireto (via Group1).\n- **User2 removido do Group3:** Não. Não é membro direto, e grupos sincronizados do AD não têm membros alterados pela revisão.\n- **User3 removido do Group2:** Não. Não é membro.\n\n**Dica de prova:** Access reviews só aplicam remoção em grupos gerenciados na nuvem.",
    "docs": [
      {
        "t": "O que são revisões de acesso? - Microsoft Entra - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview"
      },
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/access-reviews-overview"
    ]
  },
  {
    "id": "Q190",
    "src": 190,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "details": "**Por que não as outras**\n- **Conditional Access:** não remove acessos inativos.\n- **Compliance policy:** Intune.\n- **Revisão de grupo de guests:** o acesso é ao App1 (atribuição de app), não a um grupo.\n\n**Dica de prova:** Ative \"No sign-in within 30 days\" como recomendação + auto-apply + \"If reviewers don't respond = Take recommendations\".",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q191",
    "src": 191,
    "domain": 4,
    "skill": "4.2",
    "topic": "Licenciamento de revisões de acesso",
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
    "details": "**Item a item**\n- **525:** os guests não exigem licença por usuário no modelo MAU.\n- **1 para o Group1:** na auto-revisão, cada membro interno revisor precisa de licença.\n- **100 / 295 / 395 no Group2:** só o dono revisor (interno) precisa de licença.",
    "docs": [
      {
        "t": "Conceitos básicos de licenciamento do Microsoft Entra ID Governance - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/licensing-fundamentals"
      },
      {
        "t": "O que são revisões de acesso? - Microsoft Entra - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview"
      },
      {
        "t": "Planejar uma implantação de revisões de acesso do Microsoft Entra - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/deploy-access-reviews"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/access-reviews-overview#license-requirements"
    ]
  },
  {
    "id": "Q192",
    "src": 192,
    "domain": 4,
    "skill": "4.1",
    "topic": "Gerenciamento de direitos — ciclo de vida de usuários externos",
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
    "details": "**Item a item**\n- **Guest1 em 5/05:** Não. Removido 30 dias após perder a última atribuição; ter uma função de diretório não impede.\n- **Guest2:** Não. Mesmo motivo.\n- **Guest3:** Sim. Foi convidado fora do access package, e a regra não se aplica a ele.\n\n**Dica de prova:** A configuração vale para \"external users brought in by entitlement management\".",
    "docs": [
      {
        "t": "Alterar configurações de ciclo de vida de um pacote de acesso no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-lifecycle-policy"
      },
      {
        "t": "Controlar o acesso de usuários externos no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-external-users"
      },
      {
        "t": "Entender os fluxos de trabalho de ciclo de vida - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/understanding-lifecycle-workflows"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-access-package-lifecycle-policy",
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-external-users"
    ]
  },
  {
    "id": "Q193",
    "src": 193,
    "domain": 4,
    "skill": "4.1",
    "topic": "Termos de uso",
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
    "details": "**Por que não as outras**\n- **Sign-in logs:** logins, não aceites de termos.\n- **Usage and Insights:** uso de apps e métodos.\n- **Provisioning logs:** SCIM.\n\n**Dica de prova:** No portal: Terms of use > selecionar Terms1 > Accepted / Declined.",
    "docs": [
      {
        "t": "Configurar os Termos de Uso do Microsoft Entra com o Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/terms-of-use"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/terms-of-use"
    ]
  },
  {
    "id": "Q194",
    "src": 194,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "details": "**Por que não as outras**\n- **User1 (owner):** com \"Users review their own access\", o owner não revisa os outros.\n- **User2:** cada um revisa a si mesmo.\n\n**Dica de prova:** Guests B2B comuns podem fazer a autorrevisão; usuários B2B direct connect (canais compartilhados) não.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/create-access-review"
    ]
  },
  {
    "id": "Q195",
    "src": 195,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "User1 recebeu atribuição **elegível**, não ativa, e precisa ativar com aprovação (Não). O Group1 (User2 e User3) aprova, mas ninguém aprova a própria solicitação, então só o User3 pode aprovar a do User2 (Sim). A ativação nunca passa do fim da atribuição elegível (31/01 23:59), então o User1 não usa a função até 04:00 de 1º/02 (Não). O dump marcava Não/Não/Sim; a comunidade diverge na terceira.",
    "details": "**Item a item**\n- **User1 ativo automaticamente:** Não. A atribuição dele é elegível e exige ativação com aprovação.\n- **Só User3 aprova o User2:** Sim. O aprovador não pode aprovar a própria solicitação.\n- **User1 até 04:00:** Não. A ativação é cortada no fim da atribuição elegível.",
    "docs": [
      {
        "t": "Aprovar ou negar solicitações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-approval-workflow"
      },
      {
        "t": "Ativar funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-activate-role"
      }
    ]
  },
  {
    "id": "Q196",
    "src": 196,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso — configurações",
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
    "details": "**Por que não as outras**\n- **Auto apply:** já está habilitado (pelo exhibit).\n- **Ação para guests negados / notificações / lembretes / recomendações / justificativa:** não removem quem não responde.\n\n**Dica de prova:** \"If reviewers don't respond\" aceita: No change, Remove access, Approve access, Take recommendations.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ],
    "refs": [
      "https://blog.quadrotech-it.com/blog/how-to-manage-guest-access-in-azure-active-directory-pt-1/"
    ]
  },
  {
    "id": "Q197",
    "src": 197,
    "domain": 1,
    "skill": "1.2",
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
    "details": "**Por que não as outras**\n- **Distribution group:** não recebe licença.\n- **OU:** AD on-premises; não licencia no Entra.\n- **Administrative unit:** delimita o escopo de administração, não atribui licença.\n\n**Dica de prova:** A regra dinâmica pode usar companyName -eq \"ADatum\" ou o domínio do UPN.",
    "docs": [
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Unidades administrativas no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/administrative-units"
    ]
  },
  {
    "id": "Q198",
    "src": 198,
    "domain": 1,
    "skill": "1.4",
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
    "explanation": "Só a OU Contoso_Resources é sincronizada. Para incluir os usuários da ADatum, abra o assistente e use **Customize synchronization options** para adicionar a OU.",
    "details": "**Por que não as outras**\n- **Set-ADSyncScheduler:** muda o intervalo do ciclo.\n- **Start-ADSyncSyncCycle:** força um ciclo, mas a OU continua fora do escopo.\n- **Change user sign-in:** altera PHS/PTA/federação.\n\n**Dica de prova:** Depois de mudar a filtragem por OU, o assistente roda um Full sync automaticamente.",
    "docs": [
      {
        "t": "O que são o Microsoft Entra Connect e o Connect Health? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-azure-ad-connect"
      },
      {
        "t": "Entender o Microsoft Entra Connect Sync - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-whatis"
      },
      {
        "t": "Microsoft Entra Connect Sync: configurar a filtragem - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-configure-filtering"
      }
    ]
  },
  {
    "id": "Q201",
    "src": 201,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "Para levar o atributo personalizado LWLicenses ao Entra ID, habilite **Directory Extensions** no Entra Connect. Depois atribua as licenças a um **grupo dinâmico de usuários**, com regra baseada na extensão.",
    "details": "**Item a item**\n- **Domain filtering:** escolhe domínios e OUs, não atributos.\n- **Optional features:** habilita writeback, PHS etc. (inclui o checkbox de directory extensions, mas a página que escolhe o atributo é Directory Extensions).\n- **Grupo atribuído ou com aninhados:** não automatiza; grupos aninhados não herdam licença.\n\n**Dica de prova:** O atributo aparece no Entra como extension_<appId>_LWLicenses e pode ser usado na regra dinâmica.",
    "docs": [
      {
        "t": "Gerenciar regras de grupos de associação dinâmica no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership"
      },
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ]
  },
  {
    "id": "Q202",
    "src": 202,
    "domain": 2,
    "skill": "2.3",
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
    "details": "**Por que não as outras**\n- **Password Protection:** bane senhas fracas; não detecta vazamento.\n- **Authentication method policy:** define métodos permitidos.\n- **Federação com PingFederate:** não sincroniza hashes.\n\n**Dica de prova:** O PHS pode ficar habilitado como \"recurso secundário\" mesmo com federação ou PTA; também serve de fallback de login.",
    "docs": [
      {
        "t": "Proteger sua infraestrutura de identidade do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/azure/security/fundamentals/steps-secure-identity"
      },
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/security/fundamentals/steps-secure-identity"
    ]
  },
  {
    "id": "Q203",
    "src": 203,
    "domain": 2,
    "skill": "1.1",
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
    "details": "**Item a item**\n- **Global administrator:** funciona nos dois casos, mas viola o menor privilégio.\n- **Security administrator:** não atribui funções.\n- **User Access Administrator para funções do Entra / Privileged role administrator para funções do Azure:** cada um vale para um sistema (Azure RBAC ≠ funções do diretório).",
    "docs": [
      {
        "t": "Funções de menor privilégio por tarefa - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-by-task"
      },
      {
        "t": "Atribuir funções do Azure usando o portal do Azure - Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal"
      },
      {
        "t": "Funções internas do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
      },
      {
        "t": "Criar uma função personalizada no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-create"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal",
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference"
    ]
  },
  {
    "id": "Q204",
    "src": 204,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "Grupo só de membros (sem guests): `(user.objectId -ne null) and (user.userType -eq \"Member\")`. O dump marcava \"Guest\" no primeiro campo, o que não faz sentido para objectId.",
    "details": "**Item a item**\n- **\"Guest\"/\"Member\" no objectId:** objectId é um GUID; a comparação com null é o que serve de \"todos os objetos\".\n- **userType \"Guest\":** incluiria só convidados.\n\n**Dica de prova:** O padrão \"(user.objectId -ne null)\" é usado para criar grupos \"todos os usuários\".",
    "docs": [
      {
        "t": "Gerenciar regras de grupos de associação dinâmica no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership"
      },
      {
        "t": "Como gerenciar grupos - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups"
      },
      {
        "t": "Definir a expiração de grupos do Microsoft 365 - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-lifecycle"
      }
    ]
  },
  {
    "id": "Q205",
    "src": 205,
    "domain": 2,
    "skill": "2.3",
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
    "details": "**Item a item**\n- **Registrar no SSPR primeiro:** a remediação da política de risco usa MFA + troca de senha; o pré-requisito é o registro de MFA.\n- **Consentimento de apps:** sem relação.\n- **Sign-in risk policy:** trata do risco do login, não da identidade comprometida.\n- **Password Protection:** senhas banidas, não comprometimento.",
    "docs": [
      {
        "t": "Políticas de acesso baseadas em risco do Microsoft Entra ID Protection - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-policies"
      },
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/concept-identity-protection-policies"
    ]
  },
  {
    "id": "Q206",
    "src": 206,
    "domain": 2,
    "skill": "2.2",
    "topic": "Acesso Condicional — localizações",
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
    "details": "**Por que não as outras**\n- **IP privado:** o Entra nunca vê IPs privados de origem.\n- **Trusted IPs (público ou privado):** recurso do MFA por usuário legado; o caminho atual é named location em CA.\n\n**Dica de prova:** Marque a named location como \"trusted\" para usá-la em \"All trusted locations\" e no ID Protection.",
    "docs": [
      {
        "t": "Política de Acesso Condicional: usar sinais de rede - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-assignment-network"
      },
      {
        "t": "Configuração do Acesso Condicional: usuários, grupos, agentes e identidades de carga de trabalho - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-users-groups"
      },
      {
        "t": "Selecionar recursos de destino em políticas de Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/location-condition"
    ]
  },
  {
    "id": "Q207",
    "src": 207,
    "domain": 2,
    "skill": "2.3",
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
    "details": "**Item a item**\n- **Authentication method policy:** define métodos, não exige o MFA.\n- **MFA registration policy:** o gabarito desta variante prefere o CA (requisito de \"via Conditional Access\"); compare com a Q106.\n- **MFA Server:** aposentado.\n- **7 ou 28 dias:** o adiamento de registro é de 14 dias.",
    "docs": [
      {
        "t": "Executar uma campanha de registro para configurar uma chave de acesso ou o Microsoft Authenticator - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-mfa-registration-campaign"
      },
      {
        "t": "Registro combinado de SSPR e autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-registration-mfa-sspr-combined"
      },
      {
        "t": "Configurar a política de registro de MFA - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-mfa-policy"
      }
    ],
    "refs": [
      "https://www.syskit.com/blog/using-azure-conditional-access-when-security-defaults-isnt-enough/"
    ]
  },
  {
    "id": "Q208",
    "src": 208,
    "domain": 3,
    "skill": "3.3",
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
    "details": "**Por que não as outras**\n- **Policy set / app configuration policy do Intune:** tratam de dispositivos e apps móveis.\n- **Application Proxy:** o App1 não é on-premises.\n\n**Dica de prova:** No registro: redirect URI, tipo de conta suportado, segredo/certificado e permissões do Graph.",
    "docs": [
      {
        "t": "Como registrar um aplicativo no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
      },
      {
        "t": "Adicionar e gerenciar credenciais de aplicativos no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app"
    ]
  },
  {
    "id": "Q209",
    "src": 209,
    "domain": 2,
    "skill": "3.2",
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
    "details": "**Item a item**\n- **Cloud App Security policies:** o MDCA não publica apps on-premises; o App Proxy sim (e daí o CA aplica MFA).\n- **User consent settings:** consentimento a apps, não restrição de sessão.\n- **Publicar o SharePoint pelo App Proxy:** o SharePoint Online já está na nuvem.\n\n**Dica de prova:** App-enforced restrictions exigem configurar também o SharePoint (Unmanaged devices = limited, web-only).",
    "docs": [
      {
        "t": "Habilitar o acesso remoto ao SharePoint - Proxy de aplicativo do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/app-proxy/application-proxy-integrate-with-sharepoint-server"
      },
      {
        "t": "Usar restrições impostas por aplicativos - SharePoint no Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/sharepoint/app-enforced-restrictions"
      },
      {
        "t": "Acesso Condicional: gerenciar controles de sessão com eficiência - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-session"
      },
      {
        "t": "Publicar aplicativos locais com o proxy de aplicativo do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/app-proxy/overview-what-is-app-proxy"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/sharepoint/app-enforced-restrictions",
      "https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-session"
    ]
  },
  {
    "id": "Q210",
    "src": 210,
    "domain": 3,
    "skill": "3.3",
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
    "details": "**Item a item**\n- **Consent settings:** tratam de consentimento, não de registro.\n- **Application / Cloud application administrator:** mais amplos que o necessário para só registrar.",
    "docs": [
      {
        "t": "Delegar permissões de administrador de gerenciamento de aplicativos - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-app-roles"
      },
      {
        "t": "Como registrar um aplicativo no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
      },
      {
        "t": "Adicionar e gerenciar credenciais de aplicativos no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/roles/delegate-app-roles"
    ]
  },
  {
    "id": "Q211",
    "src": 211,
    "domain": 2,
    "skill": "2.1",
    "topic": "Proteção de senha",
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
    "details": "**Item a item**\n- **Proxy em DC1:** o proxy não deve rodar em DC (DCs sem internet).\n- **Proxy no SERVER1:** conflita com o conector do Application Proxy (Agent Updater incompatível).\n- **Lista em DC1/servidores:** a lista customizada é gerenciada no Entra e baixada pelos agentes.",
    "docs": [
      {
        "t": "Implantar a Proteção por Senha do Microsoft Entra no ambiente local - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-ban-bad-on-premises-deploy"
      },
      {
        "t": "Proteção por senha no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad"
      },
      {
        "t": "Proteção por senha do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad-on-premises"
      },
      {
        "t": "Prevenir ataques usando o bloqueio inteligente - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-smart-lockout"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-password-ban-bad-on-premises-deploy",
      "https://docs.microsoft.com/en-us/azure/active-directory/app-proxy/application-proxy-add-on-premises-application"
    ]
  },
  {
    "id": "Q212",
    "src": 212,
    "domain": 4,
    "skill": "4.4",
    "topic": "Configurações de diagnóstico",
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
    "details": "**Por que não as outras**\n- **Company branding / External Identities / App registrations:** não enviam logs.\n\n**Dica de prova:** Inclua AuditLogs e SignInLogs; a retenção passa a ser a do workspace.",
    "docs": [
      {
        "t": "O que são monitoramento e integridade do Microsoft Entra? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/overview-monitoring-health"
      },
      {
        "t": "Como configurar as definições de diagnóstico do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-configure-diagnostic-settings"
      },
      {
        "t": "Integrar logs do Microsoft Entra aos logs do Azure Monitor - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-integrate-activity-logs-with-azure-monitor-logs"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/overview-monitoring"
    ]
  },
  {
    "id": "Q213",
    "src": 213,
    "domain": 4,
    "skill": "4.1",
    "topic": "Gerenciamento de direitos",
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
    "details": "**Item a item**\n- **Access review:** revisa acessos existentes.\n- **CA:** não concede acesso nem tem fluxo de aprovação.\n- **Accepted domain / custom domain:** conceitos de Exchange/Entra para domínios próprios, não de parceiros.\n\n**Dica de prova:** A organização conectada permite que usuários da Fabrikam solicitem o pacote mesmo sem conta guest prévia.",
    "docs": [
      {
        "t": "Gerenciar organizações conectadas no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-organization"
      },
      {
        "t": "O que é o gerenciamento de direitos? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"
      },
      {
        "t": "Cenários comuns no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-scenarios"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-organization"
    ]
  },
  {
    "id": "Q214",
    "src": 214,
    "domain": 4,
    "skill": "4.3",
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
    "details": "**Por que não as outras**\n- **Access review:** revisa atribuições; não exige justificativa na ativação.\n- **Administrative unit:** delimita escopo.\n- **Active assignments:** não passam por ativação.",
    "docs": [
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      },
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-how-to-add-role-to-user?tabs=new"
    ]
  },
  {
    "id": "Q215",
    "src": 215,
    "domain": 4,
    "skill": "4.3",
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
    "details": "**Por que não as outras**\n- **Ticket information:** não é requisito do caso.\n- **Expire eligible assignments:** não é o pedido aqui.\n- **Active:** com atribuições ativas não há ativação, então não há justificativa.",
    "docs": [
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings"
    ]
  },
  {
    "id": "Q218",
    "src": 218,
    "domain": 4,
    "skill": "4.4",
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
    "explanation": "A detecção multiestágio é feita pela regra **Fusion** do Sentinel, ajustando a lógica da regra (os conectores já existem). Sentinel é periférico ao SC-300 — borderline.",
    "details": "**Por que não as outras**\n- **Workbook:** visualiza, mas não detecta.\n- **Data connectors:** já existem.\n- **Playbook:** resposta automatizada.\n\n**Dica de prova:** Fusion é habilitado por padrão; ajuste as fontes e os cenários na regra \"Advanced Multistage Attack Detection\".",
    "docs": [
      {
        "t": "Detecção avançada de ataques em vários estágios no Microsoft Sentinel",
        "u": "https://learn.microsoft.com/en-us/azure/sentinel/fusion"
      },
      {
        "t": "Encontrar seu conector de dados do Microsoft Sentinel",
        "u": "https://learn.microsoft.com/en-us/azure/sentinel/data-connectors-reference"
      },
      {
        "t": "Como configurar as definições de diagnóstico do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-configure-diagnostic-settings"
      },
      {
        "t": "Integrar logs do Microsoft Entra aos logs do Azure Monitor - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-integrate-activity-logs-with-azure-monitor-logs"
      }
    ]
  },
  {
    "id": "Q219",
    "src": 219,
    "domain": 4,
    "skill": "4.1",
    "topic": "Gerenciamento de direitos",
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
    "details": "**Por que não as outras**\n- **User consent / admin consent settings:** tratam de consentimento.\n- **Program:** conceito antigo de access reviews.\n\n**Dica de prova:** O catálogo agrupa recursos (grupos, apps, sites) e define quem pode criar pacotes (catalog owners/access package managers).",
    "docs": [
      {
        "t": "O que é o gerenciamento de direitos? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"
      },
      {
        "t": "Cenários comuns no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-scenarios"
      }
    ],
    "refs": [
      "https://docs.microsoft.com/en-us/azure/active-directory/governance/entitlement-management-overview"
    ]
  },
  {
    "id": "Q220",
    "src": 220,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "Session policies exigem que o app esteja roteado pelo **Conditional Access App Control**, o que começa com uma política de **Conditional Access** usando esse controle de sessão. O dump marcava \"User monitoring\", que não é pré-requisito.",
    "details": "**Por que não as outras**\n- **User monitoring / App onboarding / continuous report:** não são pré-requisito da session policy; o roteamento pelo App Control vem do CA.",
    "docs": [
      {
        "t": "Criar políticas de sessão - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
      },
      {
        "t": "Controlar aplicativos de nuvem com políticas - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"
      },
      {
        "t": "Criar políticas de acesso - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"
      }
    ]
  },
  {
    "id": "Q221",
    "src": 221,
    "domain": 3,
    "skill": "3.2",
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
    "explanation": "Para aprovar solicitações de consentimento, o revisor precisa ter **Global, Cloud application ou Application administrator**. Pela tabela: Admin1 e Admin2. Security administrator e o owner do app não aprovam.",
    "details": "**Por que não as outras**\n- **Admin3 (Security administrator):** não pode aprovar consentimento.\n- **User1 (owner):** ser owner do enterprise app não dá direito de conceder admin consent tenant-wide.\n- **Só Admin1:** o Admin2 também tem função elegível pela tabela.",
    "docs": [
      {
        "t": "Visão geral do consentimento de usuários e administradores - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview"
      },
      {
        "t": "Configurar como os usuários consentem com aplicativos - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent"
      },
      {
        "t": "Configurar o fluxo de trabalho de consentimento do administrador - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow"
      }
    ]
  },
  {
    "id": "Q222",
    "src": 222,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "Alerta por volume/taxa de uma atividade (mais de 50 downloads em 1 minuto) é uma **activity policy** com parâmetros de taxa.",
    "details": "**Por que não as outras**\n- **Session policy:** controla ações em tempo real, não conta volume.\n- **File policy:** analisa arquivos (conteúdo, compartilhamento).\n- **Anomaly detection:** detecções embutidas por ML (ex.: mass download), sem o limite exato configurável.\n\n**Dica de prova:** Na activity policy, use \"Repeated activity\" com o mínimo de 50 em 1 minuto.",
    "docs": [
      {
        "t": "Criar políticas de sessão - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
      },
      {
        "t": "Controlar aplicativos de nuvem com políticas - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"
      },
      {
        "t": "Criar políticas de acesso - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"
      }
    ]
  },
  {
    "id": "Q223",
    "src": 223,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "Bloquear **impressão** durante a sessão no navegador é uma **session policy** (via Conditional Access App Control).",
    "details": "**Por que não as outras**\n- **Activity policy:** alerta depois do fato.\n- **Access policy:** permite ou bloqueia a entrada no app, não ações dentro da sessão.\n- **File policy:** governa arquivos armazenados, não a impressão no navegador.",
    "docs": [
      {
        "t": "Criar políticas de sessão - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
      },
      {
        "t": "Controlar aplicativos de nuvem com políticas - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"
      },
      {
        "t": "Criar políticas de acesso - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"
      }
    ]
  },
  {
    "id": "Q224",
    "src": 224,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "Bloquear o acesso em tempo real a apps com base em condições do usuário/dispositivo é uma **access policy** (via Conditional Access App Control).",
    "details": "**Por que não as outras**\n- **OAuth app policy:** avalia apps conectados por OAuth.\n- **Anomaly detection / activity policy:** alertam; não bloqueiam o login em tempo real.\n\n**Dica de prova:** A alternativa nativa é uma política de CA com user risk = High → Block.",
    "docs": [
      {
        "t": "Criar políticas de sessão - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
      },
      {
        "t": "Controlar aplicativos de nuvem com políticas - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"
      },
      {
        "t": "Criar políticas de acesso - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"
      }
    ]
  },
  {
    "id": "Q225",
    "src": 225,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "**OAuth app policy** filtra apps por nível de permissão (alto) e número de usuários que autorizaram (mais de 20) e gera alerta. Activity policy olha atividades, não permissões de apps. O dump marcava activity policy.",
    "details": "**Por que não as outras**\n- **Anomaly detection:** detecções embutidas, sem filtro de permissões nem contagem.\n- **Access / activity policy:** não avaliam permissões de apps OAuth.\n\n**Dica de prova:** Hoje as políticas de OAuth estão em app governance (Defender XDR).",
    "docs": [
      {
        "t": "Criar políticas de sessão - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
      },
      {
        "t": "Controlar aplicativos de nuvem com políticas - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"
      },
      {
        "t": "Criar políticas de acesso - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"
      }
    ]
  },
  {
    "id": "Q226",
    "src": 226,
    "domain": 3,
    "skill": "3.3",
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
    "explanation": "Criar compromissos no calendário de **todos** os usuários exige **Calendars.ReadWrite** do tipo **Application** (independe do usuário logado). Pela tabela, só o App2, usado por User2, tem essa permissão.",
    "details": "**Por que não as outras**\n- **User1 / User3 / User4:** as permissões dos apps deles são delegadas (agem só no próprio calendário) ou não incluem calendário.\n\n**Dica de prova:** Permissões de aplicação permitem acessar dados de todos os usuários; restrinja com Application Access Policy do Exchange (RBAC for Applications).",
    "docs": [
      {
        "t": "Visão geral de permissões e consentimento na plataforma de identidade da Microsoft - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview"
      },
      {
        "t": "Registro de aplicativos de API Web e permissões de API - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-configure-app-access-web-apis"
      },
      {
        "t": "Referência de permissões do Microsoft Graph - Microsoft Graph",
        "u": "https://learn.microsoft.com/en-us/graph/permissions-reference"
      }
    ]
  },
  {
    "id": "Q227",
    "src": 227,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "Um usuário excluído fica em *soft delete* por **30 dias** e pode ser restaurado nesse período. A função de menor privilégio para restaurar é **User administrator** (o Helpdesk administrator não restaura).",
    "details": "**Item a item**\n- **15 / 90 / 180 dias:** o período de soft delete de usuários é de 30 dias.\n- **Network / Domain name / Helpdesk administrator:** não restauram usuários.\n\n**Dica de prova:** Depois de restaurado, o usuário volta com grupos, licenças e atributos.",
    "docs": [
      {
        "t": "Restaurar ou remover permanentemente um usuário excluído recentemente - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/users-restore"
      },
      {
        "t": "Como criar, convidar e excluir usuários no Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users"
      },
      {
        "t": "Como gerenciar informações de perfil de usuário no centro de administração do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-user-profile-info"
      }
    ]
  },
  {
    "id": "Q228",
    "src": 228,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "Managed identities (service principals) só entram em grupos de **segurança atribuídos de nuvem**: o Group2. O Group3 é dinâmico, o Group4 é sincronizado e grupos M365 não aceitam service principals. Um usuário de nuvem entra em qualquer grupo **atribuído de nuvem** (All Company, Group1, Group2), mas não em dinâmicos nem em sincronizados.",
    "details": "**Item a item**\n- **Managed identity em grupos dinâmicos, sincronizados ou M365:** só grupos de segurança atribuídos de nuvem aceitam service principals.\n- **Usuário de nuvem no Group3 (dinâmico) / Group4 (sincronizado):** não se adicionam membros manuais nesses grupos.",
    "docs": [
      {
        "t": "Como gerenciar grupos - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups"
      },
      {
        "t": "Gerenciar regras de grupos de associação dinâmica no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership"
      },
      {
        "t": "Definir a expiração de grupos do Microsoft 365 - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-lifecycle"
      }
    ]
  },
  {
    "id": "Q229",
    "src": 229,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "Grupos com isAssignableToRole precisam ter associação **Assigned** (não dinâmica) e podem ser de **Segurança** ou **Microsoft 365**.",
    "details": "**Por que não as outras**\n- **Dynamic User / Dynamic Device:** grupos role-assignable não aceitam associação dinâmica.\n\n**Dica de prova:** A opção \"Microsoft Entra roles can be assigned to the group\" só aparece na criação e exige P1.",
    "docs": [
      {
        "t": "Usar grupos do Microsoft Entra para gerenciar atribuições de funções - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/groups-concept"
      },
      {
        "t": "Listar atribuições de funções do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/view-assignments"
      },
      {
        "t": "Funções de menor privilégio por tarefa - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-by-task"
      }
    ]
  },
  {
    "id": "Q230",
    "src": 230,
    "domain": 2,
    "skill": "4.4",
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
    "explanation": "Locais e IPs de entrada: **Sign-in logs**. Alterações em usuários e service principals: **Audit logs**. Recomendações de melhoria de segurança: **Identity Secure Score**.",
    "details": "**Item a item**\n- **Audit logs para IPs:** os IPs e locais estão nos sign-in logs.\n- **Sign-in logs para mudanças:** alterações em objetos ficam nos audit logs.\n- **Secure Score para mudanças:** o score avalia a configuração, não registra eventos.",
    "docs": [
      {
        "t": "Logs de entrada no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins"
      },
      {
        "t": "Conhecer os logs de auditoria no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-audit-logs"
      },
      {
        "t": "Logs de provisionamento de usuários no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-provisioning-logs"
      }
    ]
  },
  {
    "id": "Q231",
    "src": 231,
    "domain": 3,
    "skill": "3.3",
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
    "explanation": "Um app registration excluído fica em **Deleted applications** por **30 dias** e pode ser restaurado nesse período.",
    "details": "**Por que não as outras**\n- **14 / 60 / 180 dias:** apps excluídos ficam 30 dias em Deleted applications.\n\n**Dica de prova:** Para restaurar, use App registrations > Deleted applications ou Restore-MgDirectoryDeletedItem.",
    "docs": [
      {
        "t": "Como registrar um aplicativo no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
      },
      {
        "t": "Adicionar e gerenciar credenciais de aplicativos no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
      }
    ]
  },
  {
    "id": "Q232",
    "src": 232,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "Alertar quando um app OAuth recebe permissões de leitura e gravação no e-mail: **política de OAuth app** no **Microsoft Defender for Cloud Apps** (app governance).",
    "details": "**Item a item**\n- **Identity Protection / Identity Governance / Endpoint Manager:** não monitoram permissões de apps OAuth.\n- **App discovery / app protection / CA / risk:** não avaliam permissões concedidas a apps.\n\n**Dica de prova:** Filtre por permissão Mail.ReadWrite e nível alto; a ação pode revogar o app automaticamente.",
    "docs": [
      {
        "t": "Criar políticas para controlar aplicativos OAuth - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-permission-policy"
      },
      {
        "t": "Governança de aplicativos no Microsoft Defender for Cloud Apps e no Microsoft Defender XDR - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance"
      }
    ]
  },
  {
    "id": "Q233",
    "src": 233,
    "domain": 3,
    "skill": "3.2",
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
    "explanation": "\"Exigir aprovação do administrador para acesso de apps a dados\" = desativar o consentimento do usuário nas **User consent settings** (e, idealmente, habilitar o fluxo de admin consent).",
    "details": "**Por que não as outras**\n- **Authentication methods:** tratam de MFA.\n- **Access packages:** concedem acesso a recursos.\n- **Application proxy:** publicação de apps.\n\n**Dica de prova:** Combine \"Do not allow user consent\" com o admin consent workflow para não travar os usuários.",
    "docs": [
      {
        "t": "Visão geral do consentimento de usuários e administradores - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview"
      },
      {
        "t": "Configurar como os usuários consentem com aplicativos - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent"
      },
      {
        "t": "Configurar o fluxo de trabalho de consentimento do administrador - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow"
      }
    ]
  },
  {
    "id": "Q234",
    "src": 234,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "explanation": "Pelo dump, User3 e User5 podem criar a revisão do Package1 — conforme as funções da tabela do caso (Identity Governance administrator, Catalog owner ou Access package manager do catálogo). Confira a tabela do caso.",
    "details": "**Por que não as outras**\n- **Combinações só com o User4:** pela tabela do caso, o User4 não tem função no catálogo nem de Identity Governance.\n\n**Dica de prova:** Quem cria revisões de access packages: Global, Identity Governance administrator, catalog owner e access package manager.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ]
  },
  {
    "id": "Q235",
    "src": 235,
    "domain": 1,
    "skill": "1.3",
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
    "explanation": "\"Somente usuários com funções de administrador específicas podem convidar\" é configurado em **External collaboration settings > Guest invite settings**.",
    "details": "**Por que não as outras**\n- **CAE:** revoga sessões em tempo quase real.\n- **CA:** não controla quem pode convidar.\n- **Access reviews settings:** governança de revisões.",
    "docs": [
      {
        "t": "Configurar a colaboração externa - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/external-collaboration-settings-configure"
      },
      {
        "t": "Permitir ou bloquear convites - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/allow-deny-list"
      }
    ]
  },
  {
    "id": "Q236",
    "src": 236,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "Para os User administrators **solicitarem** a função quando precisarem, as atribuições devem ser **Eligible**. O limite de até um ano vem de **Expire eligible assignments after** nas Role settings.",
    "details": "**Por que não as outras**\n- **Require justification / ticket:** o caso pede limite de tempo e solicitação, não justificativa ou ticket.\n- **Set Active:** elimina a solicitação (não há ativação).\n\n**Dica de prova:** \"Expire eligible assignments after\" aceita 15 dias, 1, 3, 6 meses ou 1 ano.",
    "docs": [
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      }
    ]
  },
  {
    "id": "Q237",
    "src": 237,
    "domain": 3,
    "skill": "3.2",
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
    "explanation": "**Permission classifications** marcam quais permissões são de baixo impacto. Com a configuração \"publicadores verificados, permissões de baixo impacto\", o usuário só consente nessas. O dump marcava \"criar uma coleção\", que só organiza o My Apps.",
    "details": "**Por que não as outras**\n- **Collection / access review / access package:** não restringem o tipo de permissão consentida.\n\n**Dica de prova:** Permissões classificadas como \"Low\" (ex.: User.Read, openid, profile, email) entram no consentimento do usuário.",
    "docs": [
      {
        "t": "Visão geral do consentimento de usuários e administradores - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview"
      },
      {
        "t": "Configurar como os usuários consentem com aplicativos - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent"
      },
      {
        "t": "Configurar o fluxo de trabalho de consentimento do administrador - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow"
      }
    ]
  },
  {
    "id": "Q238",
    "src": 238,
    "domain": 3,
    "skill": "3.4",
    "topic": "Governança de aplicativos",
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
    "explanation": "O dashboard de app governance fica no portal do **Microsoft Defender (Microsoft 365 Defender)**. Entre as opções, Application Administrator e Cloud Application Administrator dão acesso, e o Cloud Application Administrator é o de **menor privilégio** (não gerencia o Application Proxy). O dump marcava Application Administrator.",
    "details": "**Item a item**\n- **Application Administrator:** também dá acesso, mas inclui o Application Proxy; não é o menor.\n- **Application Developer:** não acessa o app governance.\n- **M365 admin center / MDCA / Purview:** o dashboard fica no portal do Microsoft Defender (security.microsoft.com).",
    "docs": [
      {
        "t": "Criar políticas para controlar aplicativos OAuth - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-permission-policy"
      },
      {
        "t": "Governança de aplicativos no Microsoft Defender for Cloud Apps e no Microsoft Defender XDR - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance"
      }
    ]
  },
  {
    "id": "Q239",
    "src": 239,
    "domain": 3,
    "skill": "3.2",
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
    "explanation": "O provisionamento automático de usuários do Entra para apps SaaS usa o protocolo **SCIM 2.0**.",
    "details": "**Por que não as outras**\n- **OAuth 2.0:** autorização/SSO, não provisionamento.\n- **WS-Fed:** SSO federado.\n- **LDAP 3:** protocolo de diretório on-premises.\n\n**Dica de prova:** O provisionamento usa um enterprise app com Provisioning = Automatic, URL do tenant SCIM e token secreto.",
    "docs": [
      {
        "t": "O que é o provisionamento automatizado de usuários de aplicativos no Microsoft Entra ID? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/app-provisioning/user-provisioning"
      },
      {
        "t": "Habilitar o logon único SAML para um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal-setup-sso"
      },
      {
        "t": "Guias de configuração de aplicativos SaaS para o Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/saas-apps/tutorial-list"
      }
    ]
  },
  {
    "id": "Q240",
    "src": 240,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "explanation": "Para criar access reviews de **funções do Entra ID** (via PIM), o mínimo é **Privileged role administrator**. User administrator não gerencia revisões de funções. O dump marcava User administrator.",
    "details": "**Por que não as outras**\n- **Identity Governance Administrator:** gerencia revisões de grupos e apps, não de funções do Entra.\n- **User administrator:** não gerencia funções privilegiadas.\n- **User Access Administrator:** é do Azure RBAC.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ]
  },
  {
    "id": "Q241",
    "src": 241,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "Role1 exige aprovação e o único aprovador é o User1, que **não pode aprovar a própria solicitação**: não há aprovação automática (Não). Role2 não exige aprovação, então não há o que o User1 aprovar (Não). Ao aprovar uma solicitação no PIM, o aprovador **sempre** informa uma justificativa (Sim). O dump marcava Sim na primeira.",
    "details": "**Item a item**\n- **Aprovação automática para o User1:** Não. O único aprovador é ele mesmo, e ninguém aprova a própria solicitação.\n- **User1 aprova a Role2:** Não. A Role2 não exige aprovação.\n- **Justificativa ao aprovar:** Sim. O PIM pede justificativa do aprovador.\n\n**Dica de prova:** Defina pelo menos dois aprovadores para evitar solicitações travadas.",
    "docs": [
      {
        "t": "Aprovar ou negar solicitações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-approval-workflow"
      },
      {
        "t": "Ativar funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-activate-role"
      }
    ]
  },
  {
    "id": "Q242",
    "src": 242,
    "domain": 3,
    "skill": "3.2",
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
    "explanation": "Instalar o conector do Application Proxy exige no mínimo **Application Administrator** (Admin2). O Cloud Application Administrator não gerencia o Application Proxy. Para o User1 registrar o App1 com menor privilégio: **Application Developer**. O dump marcava Cloud Application Administrator.",
    "details": "**Item a item**\n- **Admin1 / Admin3 / Admin4:** pela tabela, não têm Application Administrator (ou têm funções mais amplas, como Global).\n- **Cloud Application Administrator para o conector:** essa função não gerencia o Application Proxy.\n- **Application/Cloud Application Administrator ou Global para o User1:** mais amplos que o necessário para registrar.\n\n**Dica de prova:** O conector é registrado no tenant com as credenciais de quem instala.",
    "docs": [
      {
        "t": "Publicar aplicativos locais com o proxy de aplicativo do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/app-proxy/overview-what-is-app-proxy"
      },
      {
        "t": "Delegação restrita de Kerberos para logon único (SSO) em aplicativos com proxy de aplicativo - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/app-proxy/how-to-configure-sso-with-kcd"
      }
    ]
  },
  {
    "id": "Q243",
    "src": 243,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "O Password Administrator redefine senha de **não administradores** e de Directory Readers, Guest Inviter e Password Administrator, mas **não** de Global Reader. O User1 (escopo de organização) atinge User3, User4 e User5. O User4 tem escopo na AU1 (User1, User2, User3). Administradores com escopo de AU não gerenciam usuários com funções atribuídas, então sobra só o User3. O gabarito do dump ignorava essas restrições (todos / User1, User2 e User3).",
    "details": "**Item a item**\n- **User1 incluindo o User2:** o User2 é Global Reader, e o Password Administrator não redefine senha de Global Reader.\n- **User4 com User1/User2:** administradores com escopo de AU não gerenciam usuários que têm funções atribuídas.\n\n**Dica de prova:** A tabela \"Who can reset passwords\" na documentação de funções privilegiadas define exatamente quem cada função atinge.",
    "docs": [
      {
        "t": "Funções e permissões privilegiadas no Microsoft Entra ID (versão prévia) - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/privileged-roles-permissions"
      },
      {
        "t": "Funções internas do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
      },
      {
        "t": "Criar uma função personalizada no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-create"
      },
      {
        "t": "Atribuir funções do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/manage-roles-portal"
      }
    ]
  },
  {
    "id": "Q244",
    "src": 244,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "A ativação de funções elegíveis no PIM é feita no **Microsoft Entra admin center** (My roles), ou no portal do Azure.",
    "details": "**Por que não as outras**\n- **Defender for Cloud Apps / M365 admin center / Defender portal:** não fazem a ativação de funções do PIM.\n\n**Dica de prova:** Atalho: My roles (https://aka.ms/myroles) ou PIM > My roles > Eligible assignments > Activate.",
    "docs": [
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      }
    ]
  },
  {
    "id": "Q245",
    "src": 245,
    "domain": 4,
    "skill": "4.4",
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
    "explanation": "O relatório **Usage & insights > Microsoft Entra application activity** mostra, por app, os logins com sucesso, as falhas e a taxa de sucesso já agregados (menor esforço que filtrar os sign-in logs). O dump marcava sign-in logs.",
    "details": "**Por que não as outras**\n- **Sign-in logs:** exigiriam filtrar e calcular a taxa à mão.\n- **Access reviews / audit logs:** não mostram estatísticas de login.\n\n**Dica de prova:** Usage & insights também mostra o uso de métodos de autenticação e a atividade de service principals.",
    "docs": [
      {
        "t": "Relatório de uso e insights - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-usage-insights-report"
      },
      {
        "t": "O que são pastas de trabalho do Microsoft Entra? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/overview-workbooks"
      },
      {
        "t": "Como usar pastas de trabalho do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-use-workbooks"
      }
    ]
  },
  {
    "id": "Q246",
    "src": 246,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "Para limitar o escopo de gestão aos usuários de marketing, crie uma **administrative unit** e atribua a função com esse escopo.",
    "details": "**Por que não as outras**\n- **Management group / resource group:** escopos do Azure RBAC, não de usuários do Entra.\n- **Microsoft 365 group:** não delimita a administração.\n\n**Dica de prova:** Depois de criar a AU, atribua User administrator com escopo nela (e use associação dinâmica por department -eq \"Marketing\").",
    "docs": [
      {
        "t": "Criar ou excluir unidades administrativas - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-manage"
      },
      {
        "t": "Adicionar usuários, grupos ou dispositivos a uma unidade administrativa - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-members-add"
      },
      {
        "t": "Unidades administrativas de gerenciamento restrito no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-restricted-management"
      }
    ]
  },
  {
    "id": "Q247",
    "src": 247,
    "domain": 4,
    "skill": "4.1",
    "topic": "Gerenciamento de direitos",
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
    "explanation": "O dump marca User administrator. A comunidade relata que hoje nenhuma das funções listadas altera a revisão de um access package — o mínimo seria **Identity Governance administrator** ou Catalog owner/Access package manager. Questão desatualizada.",
    "details": "**Por que não as outras**\n- **Security / Privileged Role / External Identity Provider administrator:** não gerenciam access packages.\n- **User administrator:** o gabarito antigo marca, mas o correto hoje é Identity Governance administrator (ou papéis do catálogo).\n\n**Dica de prova:** Papéis do catálogo: Catalog owner, Catalog reader, Access package manager e Access package assignment manager.",
    "docs": [
      {
        "t": "O que é o gerenciamento de direitos? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"
      },
      {
        "t": "Cenários comuns no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-scenarios"
      }
    ]
  },
  {
    "id": "Q248",
    "src": 248,
    "domain": 2,
    "skill": "4.4",
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
    "explanation": "Agregar a contagem por usuário: **summarize** login_count = count() by Identity. Gerar o gráfico: **render** columnchart.",
    "details": "**Item a item**\n- **extend / project / print:** não agregam contagem.\n- **render no primeiro / summarize no segundo:** summarize agrega e render desenha.\n\n**Dica de prova:** Exemplo completo: SigninLogs | where ResultType == 0 | summarize login_count = count() by Identity | render columnchart.",
    "docs": [
      {
        "t": "Analisar logs de atividades usando o Log Analytics - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-analyze-activity-logs-log-analytics"
      },
      {
        "t": "Introdução às consultas de log nos Logs do Azure Monitor - Azure Monitor",
        "u": "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/get-started-queries"
      }
    ]
  },
  {
    "id": "Q249",
    "src": 249,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "Pelo dump, marcar o Facebook como **não sancionado** destaca o app na Cloud Discovery e permite acompanhar quem o usa. A comunidade diverge (access policy). Confira a discussão.",
    "details": "**Por que não as outras**\n- **CA / access policy:** exigiriam rotear todo o tráfego pelo proxy; mais esforço.\n- **App configuration do Intune:** configura apps móveis.\n\n**Dica de prova:** Marcar como unsanctioned também permite gerar um script de bloqueio para firewalls ou proxies, ou bloquear via integração com o Defender for Endpoint.",
    "docs": [
      {
        "t": "Criar políticas de sessão - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
      },
      {
        "t": "Controlar aplicativos de nuvem com políticas - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"
      },
      {
        "t": "Criar políticas de acesso - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"
      }
    ]
  },
  {
    "id": "Q250",
    "src": 250,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "Elegíveis para uma função do **Entra ID** (Cloud Application Administrator) são consultados em PIM > **Microsoft Entra roles** (antes \"Azure AD roles\") > Assignments > Eligible. \"Privileged access groups\" trata de grupos. O dump marcava Privileged access groups.",
    "details": "**Por que não as outras**\n- **Azure resources:** funções do Azure RBAC.\n- **Privileged access groups:** PIM for Groups.\n- **Review access:** access reviews.",
    "docs": [
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      }
    ]
  },
  {
    "id": "Q251",
    "src": 251,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "Para atributo vazio, use `null` sem aspas: `(user.department -eq null)`.",
    "details": "**Item a item**\n- **-ne:** pegaria quem **tem** departamento.\n- **-match / -notIn:** comparam padrões ou listas, não vazio.\n- **\"\" / $null / \"null\":** a sintaxe das regras usa null sem aspas nem $.",
    "docs": [
      {
        "t": "Gerenciar regras de grupos de associação dinâmica no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership"
      },
      {
        "t": "Como gerenciar grupos - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups"
      },
      {
        "t": "Definir a expiração de grupos do Microsoft 365 - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-lifecycle"
      }
    ]
  },
  {
    "id": "Q254",
    "src": 254,
    "domain": 2,
    "skill": "2.1",
    "topic": "Padrões de segurança",
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
    "explanation": "Tenant novo vem com **security defaults**, que fazem o registro de MFA pelo **Microsoft Authenticator** (notificações).",
    "details": "**Por que não as outras**\n- **SMS / voz / e-mail OTP:** não são habilitados pelos security defaults (que usam o Authenticator).\n\n**Dica de prova:** Os security defaults também bloqueiam autenticação legada e exigem MFA para administradores em todo login.",
    "docs": [
      {
        "t": "Configurar Padrões de segurança para o Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"
      },
      {
        "t": "Configurar a autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"
      },
      {
        "t": "Visão geral da autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks"
      }
    ]
  },
  {
    "id": "Q255",
    "src": 255,
    "domain": 2,
    "skill": "2.2",
    "topic": "Acesso Condicional — filtro de dispositivos",
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
    "explanation": "CAPolicy1 bloqueia o Group1 e **exclui** dispositivos com nome iniciando em \"Device\". Para dispositivos **não registrados** (Device1) os atributos não existem, e no modo exclude com operador positivo a política é **aplicada**: User1 é bloqueado (Não). User2 usa MFA no Device2 (Sim). Device3 é registrado, tem displayName \"Device3\" e fica excluído do bloqueio; com MFA, o User3 acessa (Sim). O dump marcava Não na terceira.",
    "details": "**Item a item**\n- **User1 no Device1:** Não. Dispositivo não registrado não tem atributos, então o filtro de exclusão não casa e o bloqueio se aplica.\n- **User2 no Device2:** Sim. A CAPolicy2 exige MFA, e ele a cumpre.\n- **User3 no Device3:** Sim. O dispositivo registrado casa com o filtro e fica fora do bloqueio.\n\n**Dica de prova:** Em filtros de dispositivo, \"exclude\" com operador positivo **aplica** a política a dispositivos sem atributos.",
    "docs": [
      {
        "t": "Filtrar dispositivos como condição em uma política de Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-condition-filters-for-devices"
      },
      {
        "t": "Como exigir a conformidade de dispositivos com o Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance"
      }
    ]
  },
  {
    "id": "Q256",
    "src": 256,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "Para o SharePoint, dispositivo gerenciado = **compatível** (Intune) ou **hybrid joined**. Device1 é joined, mas não está conforme; Device3 não é conhecido. Só User2, no Device2 conforme, tem acesso completo.",
    "details": "**Por que não as outras**\n- **User1 (Device1 joined, mas não conforme):** o SharePoint considera gerenciado só o conforme ou hybrid joined.\n- **User3 (dispositivo desconhecido):** acesso limitado (web-only).\n- **Combinações com User1/User3:** não têm dispositivo gerenciado.",
    "docs": [
      {
        "t": "Acesso Condicional: gerenciar controles de sessão com eficiência - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-session"
      }
    ]
  },
  {
    "id": "Q257",
    "src": 257,
    "domain": 2,
    "skill": "2.1",
    "topic": "Padrões de segurança",
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
    "explanation": "Security defaults não podem ser ativados enquanto houver políticas de **Conditional Access**: exclua (ou desative) o CAPolicy1 primeiro.",
    "details": "**Por que não as outras**\n- **Excluir o Package1:** access packages não impedem os security defaults.\n- **Authentication Administrator na Au1:** não habilita security defaults (exige Security admin, CA admin ou Global).\n- **Identity Governance:** sem relação.",
    "docs": [
      {
        "t": "Configurar Padrões de segurança para o Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"
      },
      {
        "t": "Configurar a autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"
      },
      {
        "t": "Visão geral da autenticação multifator do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks"
      }
    ]
  },
  {
    "id": "Q258",
    "src": 258,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas via PowerShell",
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
    "explanation": "`Get-AzVM` obtém a VM para habilitar a identidade system-assigned com `Update-AzVM -IdentityType SystemAssigned`. `Get-AzADServicePrincipal` obtém o service principal da identidade para adicioná-lo ao grupo. O script mistura o módulo AzureAD, que foi aposentado (Add-AzureADGroupMember); hoje usaria Microsoft Graph PowerShell. Por isso está como borderline.",
    "details": "**Por que esses cmdlets:** Get-AzVM retorna o objeto da VM para o Update-AzVM habilitar a identidade. Get-AzADServicePrincipal acha o service principal com o nome da VM, que é o que entra no grupo.\n\n**Dica de prova:** Hoje, para adicionar ao grupo: New-MgGroupMember -GroupId $g.Id -DirectoryObjectId $sp.Id.",
    "docs": [
      {
        "t": "Configurar identidades gerenciadas em máquinas virtuais (VMs) do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities"
      },
      {
        "t": "Perguntas frequentes sobre identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/managed-identities-faq"
      }
    ]
  },
  {
    "id": "Q259",
    "src": 259,
    "domain": 3,
    "skill": "3.3",
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
    "explanation": "Um app web .NET precisa da plataforma **Web** com **redirect URI** no registro. Bundle ID e package name são de apps iOS e Android.",
    "details": "**Por que não as outras**\n- **Executable name / bundle ID / package name:** identificam apps desktop ou mobile (iOS/Android), não web.\n\n**Dica de prova:** Em ASP.NET Core, o padrão do redirect é https://<host>/signin-oidc.",
    "docs": [
      {
        "t": "Como registrar um aplicativo no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
      },
      {
        "t": "Adicionar e gerenciar credenciais de aplicativos no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
      }
    ]
  },
  {
    "id": "Q261",
    "src": 261,
    "domain": 3,
    "skill": "3.2",
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
    "explanation": "Para exigir aprovação antes de novos apps acessarem o tenant, desative o consentimento do usuário e habilite o **fluxo de solicitação de admin consent**.",
    "details": "**Por que não as outras**\n- **Anomaly detection do MDCA:** detecta comportamento; não cria um processo de aprovação.\n- **App connector:** integra apps ao MDCA.\n- **Access review:** revisa acessos existentes.\n\n**Dica de prova:** Combine com permission classifications para permitir só consentimentos de baixo impacto.",
    "docs": [
      {
        "t": "Visão geral do consentimento de usuários e administradores - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview"
      },
      {
        "t": "Configurar como os usuários consentem com aplicativos - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent"
      },
      {
        "t": "Configurar o fluxo de trabalho de consentimento do administrador - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow"
      }
    ]
  },
  {
    "id": "Q262",
    "src": 262,
    "domain": 3,
    "skill": "3.4",
    "topic": "Governança de aplicativos",
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
    "explanation": "O app governance é ativado no portal do **Microsoft Defender** (antes Microsoft 365 Defender), em Settings > Cloud apps > App governance.",
    "details": "**Por que não as outras**\n- **MDCA portal / M365 admin / Entra / Purview:** a integração do app governance fica no portal unificado do Defender.",
    "docs": [
      {
        "t": "Criar políticas para controlar aplicativos OAuth - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-permission-policy"
      },
      {
        "t": "Governança de aplicativos no Microsoft Defender for Cloud Apps e no Microsoft Defender XDR - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance"
      }
    ]
  },
  {
    "id": "Q263",
    "src": 263,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "Access policies do Defender for Cloud Apps exigem que o app seja roteado por **Conditional Access App Control**: crie a política de CA com esse controle de sessão primeiro.",
    "details": "**Por que não as outras**\n- **App-enforced restrictions:** são para SharePoint/Exchange, não roteiam pelo proxy do MDCA.\n- **Token configuration / API permission:** configuram o app registration, não o controle de sessão.",
    "docs": [
      {
        "t": "Criar políticas de sessão - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
      },
      {
        "t": "Controlar aplicativos de nuvem com políticas - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"
      },
      {
        "t": "Criar políticas de acesso - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"
      }
    ]
  },
  {
    "id": "Q264",
    "src": 264,
    "domain": 3,
    "skill": "3.3",
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
    "explanation": "App web próprio (Azure), acessível pela internet e autenticado com contas do Entra: **app registration**.",
    "details": "**Por que não as outras**\n- **Policy set / app configuration do Intune:** dispositivos e apps móveis.\n- **Application Proxy:** o App1 roda no Azure (não é on-premises).",
    "docs": [
      {
        "t": "Como registrar um aplicativo no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
      },
      {
        "t": "Adicionar e gerenciar credenciais de aplicativos no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
      }
    ]
  },
  {
    "id": "Q265",
    "src": 265,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "O gerenciamento de **OAuth apps** do Defender for Cloud Apps funciona com conectores de **Microsoft 365, Google Workspace e Salesforce**. Conectar o Google Workspace atende. O dump marcava Não.",
    "details": "**Série \"Solution\" (monitorar OAuth no MDCA):** atende o conector com **Microsoft 365, Google Workspace ou Salesforce**. Azure, AWS e GitHub não atendem.",
    "docs": [
      {
        "t": "Criar políticas para controlar aplicativos OAuth - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-permission-policy"
      },
      {
        "t": "Governança de aplicativos no Microsoft Defender for Cloud Apps e no Microsoft Defender XDR - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance"
      }
    ]
  },
  {
    "id": "Q266",
    "src": 266,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "O conector do Azure não fornece monitoramento de OAuth apps (só Microsoft 365, Google Workspace e Salesforce).",
    "details": "**Série \"Solution\":** o conector do Azure traz atividades do Azure, não apps OAuth.",
    "docs": [
      {
        "t": "Criar políticas para controlar aplicativos OAuth - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-permission-policy"
      },
      {
        "t": "Governança de aplicativos no Microsoft Defender for Cloud Apps e no Microsoft Defender XDR - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance"
      }
    ]
  },
  {
    "id": "Q267",
    "src": 267,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "O conector da **AWS** traz auditoria/atividades da AWS, mas não habilita o gerenciamento de OAuth apps (só Microsoft 365, Google Workspace e Salesforce). O dump marcava Sim.",
    "details": "**Série \"Solution\":** o conector da AWS traz auditoria e postura (CSPM), não OAuth.",
    "docs": [
      {
        "t": "Criar políticas para controlar aplicativos OAuth - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-permission-policy"
      },
      {
        "t": "Governança de aplicativos no Microsoft Defender for Cloud Apps e no Microsoft Defender XDR - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance"
      }
    ]
  },
  {
    "id": "Q268",
    "src": 268,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "O Security administrator já tem acesso total ao Defender for Cloud Apps. O que falta para session policies é rotear o app por uma política de **CA com Conditional Access App Control**.",
    "details": "**Por que não as outras**\n- **Require app protection policy:** é do Intune MAM, não roteia pelo MDCA.\n- **Cloud Application Administrator:** não é necessária para o MDCA.\n- **Cloud App Security Administrator:** o Security Administrator já tem acesso total.",
    "docs": [
      {
        "t": "Criar políticas de sessão - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
      },
      {
        "t": "Controlar aplicativos de nuvem com políticas - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"
      },
      {
        "t": "Criar políticas de acesso - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"
      }
    ]
  },
  {
    "id": "Q269",
    "src": 269,
    "domain": 4,
    "skill": "4.4",
    "topic": "Configurações de diagnóstico",
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
    "explanation": "Para ver os audit logs no Azure Monitor/Log Analytics, configure as **Diagnostic settings** do Entra para enviar ao workspace.",
    "details": "**Por que não as outras**\n- **Update-MgOrganization / Update-MgDomain:** alteram propriedades do tenant ou do domínio.\n- **Workbook:** só funciona depois que os dados chegam ao workspace.",
    "docs": [
      {
        "t": "Como configurar as definições de diagnóstico do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-configure-diagnostic-settings"
      },
      {
        "t": "Integrar logs do Microsoft Entra aos logs do Azure Monitor - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-integrate-activity-logs-with-azure-monitor-logs"
      }
    ]
  },
  {
    "id": "Q271",
    "src": 271,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "A política de nomenclatura de grupos **não se aplica** a Global administrator e User administrator (entre outras funções privilegiadas). Ela afeta o Groups administrator (User3) e usuários sem função (User4).",
    "details": "**Por que não as outras**\n- **User1 (Global) / User2 (User admin):** funções isentas da naming policy.\n- **User3 isolado / User2 incluído:** o Groups administrator **não** é isento; a isenção vale para Global, User administrator e algumas outras.\n\n**Dica de prova:** A naming policy exige Entra ID P1 para os usuários afetados.",
    "docs": [
      {
        "t": "Impor uma política de nomenclatura de grupos no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-naming-policy"
      },
      {
        "t": "Permissões padrão de usuários - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions"
      },
      {
        "t": "Gerenciar dispositivos no Microsoft Entra ID usando o centro de administração do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/manage-device-identities"
      },
      {
        "t": "Definir configurações de grupo usando o PowerShell - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-settings-cmdlets"
      }
    ]
  },
  {
    "id": "Q272",
    "src": 272,
    "domain": 3,
    "skill": "3.2",
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
    "explanation": "Primeiro **habilite as solicitações de admin consent** no tenant (definindo os revisores na mesma tela); assim o usuário pode pedir aprovação.",
    "details": "**Por que não as outras**\n- **Designar revisores primeiro:** os revisores são definidos na mesma configuração, ao habilitar as solicitações.\n- **Conceder admin consent direto:** resolve o App1, mas não cria o processo de solicitação (e exige privilégio maior).\n- **CA:** não habilita o pedido de consentimento.",
    "docs": [
      {
        "t": "Visão geral do consentimento de usuários e administradores - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview"
      },
      {
        "t": "Configurar como os usuários consentem com aplicativos - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent"
      },
      {
        "t": "Configurar o fluxo de trabalho de consentimento do administrador - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow"
      }
    ]
  },
  {
    "id": "Q274",
    "src": 274,
    "domain": 3,
    "skill": "3.3",
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
    "explanation": "Com \"Users can register applications = No\", o **Application Developer** pode registrar apps com o menor privilégio.",
    "details": "**Por que não as outras**\n- **Cloud App Security Administrator:** gerencia o MDCA.\n- **Cloud Application / Application Administrator:** registram, mas gerenciam todos os apps; não são o menor privilégio.",
    "docs": [
      {
        "t": "Adicionar funções de aplicativo e obtê-las de um token - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps"
      }
    ]
  },
  {
    "id": "Q275",
    "src": 275,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "Podem receber a função Owner: as user-assigned **Managed1 e Managed2** e as VMs com identidade **system-assigned** (VM1, VM2). A VM3 só usa a Managed1 e não tem identidade própria. Identidades user-assigned podem ser associadas a VMs de **qualquer região**, então a Managed2 vai em VM1, VM2, VM3 e VM4. O dump errava as duas.",
    "details": "**Item a item**\n- **Owner para a VM3:** a VM3 não tem identidade system-assigned (usa só a Managed1).\n- **Owner só para Managed1:** user-assigned e system-assigned habilitadas são todas principals válidas.\n- **Managed2 só para algumas VMs:** user-assigned atravessa regiões.",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q276",
    "src": 276,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "O dump marca **discovered app query**: na Cloud Discovery é possível filtrar apps descobertos por fatores de risco de segurança (ex.: sem autenticação de usuário). A comunidade aponta que o catálogo também tem esse filtro. Confira a discussão.",
    "details": "**Por que não as outras**\n- **Cloud app catalog:** avalia apps em geral, não os descobertos no seu ambiente (o gabarito prefere a consulta de apps descobertos).\n- **OAuth policy:** apps conectados por OAuth.\n- **Snapshot report:** análise pontual de logs enviados manualmente.",
    "docs": [
      {
        "t": "Criar políticas de sessão - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
      },
      {
        "t": "Controlar aplicativos de nuvem com políticas - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"
      },
      {
        "t": "Criar políticas de acesso - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"
      }
    ]
  },
  {
    "id": "Q277",
    "src": 277,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "O PIM não gerencia funções **clássicas** de assinatura (Account Administrator, Service Administrator, Co-Administrator). Só o Admin3 (SharePoint administrator, função do Entra) pode usar o PIM. O dump marcava Admin1.",
    "details": "**Por que não as outras**\n- **Admin1 / Admin2:** funções clássicas (Account/Service Administrator, Co-Administrator) não são gerenciadas pelo PIM.\n\n**Dica de prova:** Migre administradores clássicos para Azure RBAC (Owner) e, então, para o PIM.",
    "docs": [
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      }
    ]
  },
  {
    "id": "Q278",
    "src": 278,
    "domain": 3,
    "skill": "3.3",
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
    "explanation": "Aplicativos excluídos ficam **30 dias** em soft delete. Excluídos em 5/04, os **quatro** podem ser restaurados em 16/04. Restaurar o registro recupera as propriedades do **app registration** (App roles, Client secret). Atribuições de usuários/grupos e self-service pertencem ao enterprise app (service principal). O dump excluía o App1 sem justificativa.",
    "details": "**Item a item**\n- **Excluir algum app:** todos estão dentro dos 30 dias de soft delete em 16/04.\n- **Restaurar users/groups e self-service:** essas configurações são do service principal, que é recriado e perde atribuições.\n\n**Dica de prova:** Restaurar o app registration (Deleted applications) traz o mesmo appId e as credenciais.",
    "docs": [
      {
        "t": "Restaurar um aplicativo empresarial excluído de forma reversível - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/restore-application"
      },
      {
        "t": "Como registrar um aplicativo no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
      },
      {
        "t": "Adicionar e gerenciar credenciais de aplicativos no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
      }
    ]
  },
  {
    "id": "Q279",
    "src": 279,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "O conector do GitHub não fornece monitoramento de OAuth apps (só Microsoft 365, Google Workspace e Salesforce).",
    "details": "**Série \"Solution\":** o conector do GitHub não oferece o recurso de OAuth apps.",
    "docs": [
      {
        "t": "Criar políticas para controlar aplicativos OAuth - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-permission-policy"
      },
      {
        "t": "Governança de aplicativos no Microsoft Defender for Cloud Apps e no Microsoft Defender XDR - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/app-governance-manage-app-governance"
      }
    ]
  },
  {
    "id": "Q280",
    "src": 280,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "O PIM gerencia funções do **Entra ID** (Global, Security administrator) e funções de **recursos do Azure** (Security Contributor é uma função do Azure). Account Administrator é clássica e não é suportada. O dump marcava só as duas do Entra.",
    "details": "**Por que não as outras**\n- **Só Global ou só funções do Entra:** o PIM também gerencia funções de recursos do Azure (Security Contributor) e grupos.\n- **Account Administrator:** função clássica, sem suporte no PIM.",
    "docs": [
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      }
    ]
  },
  {
    "id": "Q281",
    "src": 281,
    "domain": 4,
    "skill": "4.1",
    "topic": "Gerenciamento de direitos",
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
    "explanation": "Um **access package** com o site e a política de atribuição expirando em 90 dias, atribuído ao Group1 (ou com auto-assignment), resolve com pouco esforço.",
    "details": "**Por que não as outras**\n- **Access review:** revisa, mas não concede nem expira acesso.\n- **Lifecycle workflow:** automatiza joiner/mover/leaver, não acessos temporários a sites.\n- **Conditional Access:** controla a forma de acesso, não concede permissão ao site.\n\n**Dica de prova:** Na política do pacote: \"For users in your directory\" → specific groups (Group1) e expiração de 90 dias.",
    "docs": [
      {
        "t": "O que é o gerenciamento de direitos? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"
      },
      {
        "t": "Cenários comuns no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-scenarios"
      }
    ]
  },
  {
    "id": "Q282",
    "src": 282,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "Vários App Services acessando os mesmos storage accounts com mínimo esforço: uma **user-assigned managed identity** compartilhada, sem segredos para gerenciar, com acesso controlado por **RBAC**. Service principal exige gerenciar credenciais. O dump marcava Service principal.",
    "details": "**Item a item**\n- **Usuário do Entra:** exigiria senha e MFA; não é identidade de workload.\n- **Service principal:** exige gerenciar segredo ou certificado.\n- **System-assigned:** uma por app; mais atribuições para gerenciar.\n- **Domain Services / SAS / certificados:** não são o controle de acesso baseado em identidade com menor esforço.\n\n**Dica de prova:** Uma user-assigned pode ser associada a vários App Services e receber Storage Blob Data Contributor em cada conta.",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q283",
    "src": 283,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "O dump marca Cosmos DB Data Reader no RG1. Atenção: Account Reader lê só metadados da conta, e os papéis de dados do Cosmos DB são do plano de dados. Questão discutível.",
    "details": "**Por que não as outras**\n- **Owner na Sub1:** excessivo.\n- **Account Reader no DB1:** lê só metadados da conta, não os dados.\n- **Reader no RG1:** plano de controle, sem dados.\n\n**Dica de prova:** O Cosmos DB tem RBAC próprio de plano de dados (Built-in Data Reader/Contributor), atribuído via az cosmosdb sql role assignment.",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q284",
    "src": 284,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "Para a identidade do WebApp1 ler e gravar no storage1, atribua uma função de dados (ex.: Storage Blob Data Contributor) em **Access control (IAM)** da conta de armazenamento.",
    "details": "**Por que não as outras**\n- **Data protection:** soft delete e versionamento.\n- **SAS / access keys:** segredos; não usam a managed identity.\n- **File share settings:** configuram o share, não dão acesso à identidade.",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q285",
    "src": 285,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "Com o modelo de permissões **Azure RBAC** do Key Vault, é possível atribuir Key Vault Secrets User no escopo de **um único segredo** (IAM do Secret1) — menor privilégio.",
    "details": "**Por que não as outras**\n- **IAM do Vault1:** daria acesso a todos os segredos.\n- **Identity settings do Automation1:** a identidade já está habilitada; falta a permissão.\n- **Run as accounts:** aposentadas e baseadas em certificado.\n\n**Dica de prova:** Atribuição no escopo de um único segredo só funciona no modelo de permissões Azure RBAC (não em access policies).",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q288",
    "src": 288,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "Para CBA no Entra, primeiro adicione a CA (certificado raiz/intermediário e CRL) em **Certificate authorities** do tenant. Depois habilite o método no Authentication methods policy.",
    "details": "**Por que não as outras**\n- **Key Vault:** não é usado pela CBA do Entra.\n- **Auto-enrollment:** distribui certificados, mas a confiança no Entra vem antes.\n- **Windows Hello for Business:** outro método.\n\n**Dica de prova:** Depois: habilite o método Certificate-based authentication, configure as regras de binding (UPN/SKI) e defina se é de fator único ou múltiplo.",
    "docs": [
      {
        "t": "Visão geral da autenticação baseada em certificado do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-certificate-based-authentication"
      },
      {
        "t": "Gerenciar métodos de autenticação - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"
      },
      {
        "t": "Configurar um Passe de Acesso Temporário no Microsoft Entra ID para registrar métodos de autenticação sem senha - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass"
      },
      {
        "t": "Como habilitar chaves de acesso (FIDO2) no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-authentication-passkeys-fido2"
      }
    ]
  },
  {
    "id": "Q290",
    "src": 290,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "Avaliar e remediar o risco de contas altamente privilegiadas no tenant e nas assinaturas, com pouco esforço: **Privileged Identity Management** (descoberta, revisões, elegibilidade).",
    "details": "**Por que não as outras**\n- **Global Secure Access:** acesso à rede (SSE).\n- **Permissions Management:** gerencia permissões em multicloud (CIEM), e foi descontinuado.\n- **Verified ID:** credenciais verificáveis.\n\n**Dica de prova:** O \"Discovery and insights\" do PIM mostra contas com funções permanentes e sugere a conversão para elegível.",
    "docs": [
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      }
    ]
  },
  {
    "id": "Q293",
    "src": 293,
    "domain": 3,
    "skill": "4.3",
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
    "explanation": "O PIM gerencia **funções RBAC**, não access policies. Ler e atualizar segredos: **Key Vault Secrets Officer**. Só ler o conteúdo: **Key Vault Secrets User** (menor privilégio).",
    "details": "**Item a item**\n- **Access policies:** não são gerenciáveis pelo PIM.\n- **Secrets Officer para o User2:** daria também escrita.\n- **Key Vault Administrator / Contributor:** amplos demais (Contributor nem lê segredos no modelo RBAC).",
    "docs": [
      {
        "t": "Conceder permissão a aplicativos para acessar um cofre de chaves do Azure usando o Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"
      },
      {
        "t": "Atribuir funções de recursos do Azure no Privileged Identity Management - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-resource-roles-assign-roles"
      },
      {
        "t": "Configurar definições de funções de recursos do Azure no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-resource-roles-configure-role-settings"
      }
    ]
  },
  {
    "id": "Q296",
    "src": 296,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "Identidades gerenciadas atribuídas pelo usuário são recursos regionais, mas o service principal é global, e a identidade pode ser usada por recursos de **outras regiões**. VM, Storage account e App Service suportam user-assigned managed identity.",
    "details": "**Por que não as outras**\n- **Só WebApp1 / sem VM1 ou storage1:** VMs, App Service e storage (para CMK, por exemplo) suportam user-assigned em qualquer região.\n\n**Dica de prova:** A identidade user-assigned é um recurso regional, mas o uso dela atravessa regiões.",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q297",
    "src": 297,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "O PIM for Groups gerencia grupos de **segurança** e **Microsoft 365** com associação **atribuída**. Grupos dinâmicos (e grupos sincronizados do AD) não são suportados.",
    "details": "**Por que não as outras**\n- **Group2 (dinâmico) / Group4 (sincronizado):** o PIM for Groups exige associação atribuída e grupo de nuvem.\n\n**Dica de prova:** PIM for Groups permite tornar membership ou ownership elegíveis, inclusive para grupos role-assignable.",
    "docs": [
      {
        "t": "Privileged Identity Management (PIM) para Grupos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/concept-pim-for-groups"
      },
      {
        "t": "Atribuir elegibilidade para um grupo no Privileged Identity Management - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/groups-assign-member-owner"
      }
    ]
  },
  {
    "id": "Q299",
    "src": 299,
    "domain": 1,
    "skill": "1.3",
    "topic": "Senha de uso único por email",
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
    "explanation": "OTP vai para convidados **novos** sem conta Entra, Microsoft account ou federação: User2 (tailspintoys.com, nunca acessou). User1 já é guest; User3 é membro do próprio tenant.",
    "details": "**Por que não as outras**\n- **User1 (já guest):** usa o método de resgate existente.\n- **User3 (membro):** não é externo.\n\n**Dica de prova:** Domínios com Entra ID recebem o login do próprio Entra, não OTP.",
    "docs": [
      {
        "t": "Autenticação com senha de uso único por email - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/one-time-passcode"
      },
      {
        "t": "Propriedades de usuários convidados B2B - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/user-properties"
      },
      {
        "t": "Inscrição por autoatendimento - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/self-service-sign-up-overview"
      }
    ]
  },
  {
    "id": "Q300",
    "src": 300,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "O login do Entra em VMs (extensão AADLoginForWindows/Linux) exige **system-assigned managed identity**, que também serve para a VM acessar recursos da assinatura.",
    "details": "**Por que não as outras**\n- **Usuário do Entra:** não é identidade de recurso.\n- **User-assigned:** o login do Entra na VM depende da system-assigned (a extensão a usa).\n- **Automation account:** não é um tipo de identidade.\n\n**Dica de prova:** Usuários precisam de Virtual Machine Administrator/User Login no escopo da VM.",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q301",
    "src": 301,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "Pelo gabarito, **Set-MgUserLicense** (Graph PowerShell) remove a licença atribuída diretamente em massa. O blade Licenses é a alternativa pelo portal.",
    "details": "**Por que não as outras**\n- **Set-WindowsProductKey:** chave do Windows.\n- **Update-MgGroup / Update-MgUser:** não removem licenças.\n\n**Dica de prova:** Exemplo: Set-MgUserLicense -UserId $id -RemoveLicenses @($skuIdE3) -AddLicenses @().",
    "docs": [
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Set-MgUserLicense (Microsoft.Graph.Users.Actions)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ]
  },
  {
    "id": "Q302",
    "src": 302,
    "domain": 1,
    "skill": "1.2",
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
    "explanation": "O blade **Licenses** remove a licença E3 de todos os usuários de uma vez.",
    "details": "**Por que não as outras**\n- **Administrative units / Identity Governance:** não gerenciam licenças.\n- **Update-MgUser:** não altera licenças.",
    "docs": [
      {
        "t": "Atribuir ou remover licenças de um grupo no centro de administração do Microsoft 365 - Administração do Microsoft 365",
        "u": "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses"
      },
      {
        "t": "Set-MgUserLicense (Microsoft.Graph.Users.Actions)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"
      },
      {
        "t": "Licenciamento do Microsoft Entra - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/licensing"
      }
    ]
  },
  {
    "id": "Q303",
    "src": 303,
    "domain": 2,
    "skill": "2.3",
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
    "explanation": "A exclusão tem precedência sobre a inclusão. User1 (Group1, risco alto) troca a senha (Sim). User2 está só no Group2, excluído (Não). User3 está no Group1 e no Group2; a exclusão vence (Não).",
    "details": "**Item a item**\n- **User1:** Sim. Está incluído, com risco alto (≥ Medium).\n- **User2:** Não. Está só no grupo excluído.\n- **User3:** Não. A exclusão prevalece sobre a inclusão.\n\n**Dica de prova:** Exclusões vencem sempre, em CA e nas políticas do ID Protection.",
    "docs": [
      {
        "t": "O que é o Microsoft Entra ID Protection? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
      },
      {
        "t": "O que são detecções de risco? - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"
      },
      {
        "t": "Políticas de risco - Microsoft Entra ID Protection",
        "u": "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"
      }
    ]
  },
  {
    "id": "Q304",
    "src": 304,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "Condições de ABAC (role assignment conditions) são suportadas em funções de **dados de Storage** (Blob/Queue Data), como Storage Blob Data Reader.",
    "details": "**Por que não as outras**\n- **Reader / Contributor / Virtual Machine Contributor:** funções de plano de controle não suportam condições ABAC (exceto as condições de delegação do RBAC Administrator).\n\n**Dica de prova:** As condições ABAC atuam em ações de dados de Blob e Queue (ex.: tags de índice e nome do container).",
    "docs": [
      {
        "t": "O que é o controle de acesso baseado em atributos do Azure (Azure ABAC)?",
        "u": "https://learn.microsoft.com/en-us/azure/role-based-access-control/conditions-overview"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      },
      {
        "t": "Conceder permissão a aplicativos para acessar um cofre de chaves do Azure usando o Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"
      }
    ]
  },
  {
    "id": "Q305",
    "src": 305,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "Um **app registrado** acessa recursos pelo seu **service principal**. Uma identidade única compartilhada pelas duas VMs que hospedam o App2: **user-assigned managed identity**.",
    "details": "**Item a item**\n- **App1 com managed identity:** o app registrado já tem service principal; a identidade dele é essa.\n- **App2 com system-assigned:** cada VM teria a própria identidade (não seria \"uma só\").\n- **Usuário ou grupo do Entra:** não são identidades de workload.",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q306",
    "src": 306,
    "domain": 3,
    "skill": "3.2",
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
    "explanation": "O consentimento de usuários pode ser desabilitado no **Microsoft 365 admin center** (Settings > Org settings > User consent to apps). O admin consent workflow é configurado no **Microsoft Entra admin center** (Enterprise apps > Consent and permissions).",
    "details": "**Item a item**\n- **M365 Apps admin center / Defender / Purview:** não controlam consentimento de apps.\n\n**Dica de prova:** O consentimento de usuários também pode ser desabilitado no Entra (Enterprise apps > Consent and permissions > User consent settings).",
    "docs": [
      {
        "t": "Visão geral do consentimento de usuários e administradores - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview"
      },
      {
        "t": "Configurar como os usuários consentem com aplicativos - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent"
      },
      {
        "t": "Configurar o fluxo de trabalho de consentimento do administrador - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow"
      }
    ]
  },
  {
    "id": "Q307",
    "src": 307,
    "domain": 3,
    "skill": "3.3",
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
    "explanation": "Acessar o calendário do **usuário conectado** é feito com **delegated permissions** (Calendars.Read/ReadWrite delegada). Application permissions são para apps sem usuário, com acesso a todos os calendários. O dump marcava application permissions.",
    "details": "**Por que não as outras**\n- **Application permissions:** dariam acesso a todos os calendários, sem usuário; excede.\n- **Funções RBAC:** são do Azure, não do Graph.\n\n**Dica de prova:** Calendars.ReadWrite delegada: o app age em nome do usuário logado, e o usuário pode consentir.",
    "docs": [
      {
        "t": "Visão geral de permissões e consentimento na plataforma de identidade da Microsoft - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview"
      },
      {
        "t": "Registro de aplicativos de API Web e permissões de API - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-configure-app-access-web-apis"
      },
      {
        "t": "Referência de permissões do Microsoft Graph - Microsoft Graph",
        "u": "https://learn.microsoft.com/en-us/graph/permissions-reference"
      }
    ]
  },
  {
    "id": "Q311",
    "src": 311,
    "domain": 2,
    "skill": "2.2",
    "topic": "Avaliação contínua de acesso",
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
    "explanation": "A personalização do CAE (ex.: strict location enforcement) é feita numa política de **Conditional Access** (Session > Customize continuous access evaluation), atribuída aos usuários com a função Application Administrator. Access review não tem relação. O dump marcava access review.",
    "details": "**Por que não as outras**\n- **Sign-in risk policy:** ID Protection.\n- **Access review:** governança.\n- **Admin consent:** consentimento de apps.\n\n**Dica de prova:** O CAE é habilitado por padrão; a política de CA serve para customizar (strict location) ou desabilitar.",
    "docs": [
      {
        "t": "Avaliação contínua de acesso no Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation"
      }
    ]
  },
  {
    "id": "Q317",
    "src": 317,
    "domain": 1,
    "skill": "1.1",
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
    "explanation": "Security Administrator **não** pode ter escopo de unidade administrativa, só o tenant inteiro. User Administrator pode ter escopo de **AU ou de tenant** (o escopo não depende de o usuário ser membro da AU). O dump marcava \"AU1 only\" para o User2.",
    "details": "**Item a item**\n- **Security Administrator com escopo de AU:** não é suportado; só funções de gestão de usuários, grupos e dispositivos têm escopo de AU.\n- **User Administrator só na AU1 ou só no tenant:** os dois escopos são possíveis.\n\n**Dica de prova:** Funções com escopo de AU: User, Groups, Helpdesk, Password, Authentication, License, Printer, Cloud Device administrator, entre outras.",
    "docs": [
      {
        "t": "Visão geral do controle de acesso baseado em função (RBAC) do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-overview"
      },
      {
        "t": "Listar atribuições de funções do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/view-assignments"
      },
      {
        "t": "Usar grupos do Microsoft Entra para gerenciar atribuições de funções - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/groups-concept"
      },
      {
        "t": "Funções de menor privilégio por tarefa - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-by-task"
      }
    ]
  },
  {
    "id": "Q318",
    "src": 318,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "Pelo dump, **chave FIDO2** e **Temporary Access Pass** (métodos sem senha) atendem ao login sem senha com MFA. Gabarito pouco confiável — confira a discussão.",
    "details": "**Por que não as outras**\n- **Authenticator / SMS:** o requisito \"sem senha\" + MFA fora de banda aponta para métodos passwordless suportados no fluxo do az ssh.\n- **Windows Hello:** só em Windows.\n\n**Dica de prova:** O login do Entra em Linux usa az ssh vm com certificados de curta duração; os métodos aceitos dependem do CA.",
    "docs": [
      {
        "t": "Entrar em uma máquina virtual Linux no Azure usando o Microsoft Entra ID e o OpenSSH - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/howto-vm-sign-in-azure-ad-linux"
      },
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q319",
    "src": 319,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "explanation": "O comportamento quando os revisores não respondem (\"If reviewers don't respond: Remove access\") e a aplicação automática ficam em **Upon completion settings** (When completed).",
    "details": "**Por que não as outras**\n- **Scheduling:** define frequência e duração.\n- **General:** nome e descrição.\n- **Reviewers:** quem revisa.\n\n**Dica de prova:** Em \"Upon completion\": Auto apply = On; \"If reviewers don't respond\" = Remove access.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ]
  },
  {
    "id": "Q329",
    "src": 329,
    "domain": 4,
    "skill": "4.1",
    "topic": "Termos de uso",
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
    "explanation": "Em uma política de CA, os termos de uso são exigidos no controle **Grant** (Require terms of use).",
    "details": "**Por que não as outras**\n- **Conditions:** condições de aplicação.\n- **Session:** controles de sessão.\n- **Target resources:** apps alvo.\n\n**Dica de prova:** Os termos aparecem como opção no Grant depois de criados em Terms of use.",
    "docs": [
      {
        "t": "Configurar os Termos de Uso do Microsoft Entra com o Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/terms-of-use"
      }
    ]
  },
  {
    "id": "Q330",
    "src": 330,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "Com o modelo **Azure RBAC** do Key Vault (padrão em novos cofres), basta atribuir à identidade da VM uma função como **Key Vault Secrets User**.",
    "details": "**Por que não as outras**\n- **Resource access settings:** tratam de templates e VMs no modelo de access policy.\n- **Permissions model:** o novo cofre já usa RBAC por padrão.\n- **User-assigned:** a VM já tem a system-assigned.\n\n**Dica de prova:** A função é Key Vault Secrets User no Vault1 (ou no segredo).",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q332",
    "src": 332,
    "domain": 2,
    "skill": "2.2",
    "topic": "Acesso Condicional — sessão",
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
    "explanation": "Com **Persistent browser session = Never persistent**, a política sobrepõe o prompt \"Stay signed in?\", então User1 não o vê (Não). User2 e User3 estão no Group2, excluído da Policy2, e não têm a frequência de 2 horas (Não/Não). O dump marcava Sim na primeira.",
    "details": "**Item a item**\n- **User1 vê \"Stay signed in\":** Não. \"Never persistent\" suprime o prompt.\n- **User2 / User3 a cada 2 h:** Não. Estão no Group2, excluído da Policy2.\n\n**Dica de prova:** A sign-in frequency vale para apps cliente e navegador; a sessão persistente só afeta o navegador.",
    "docs": [
      {
        "t": "Políticas adaptáveis de tempo de vida de sessão do Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-session-lifetime"
      },
      {
        "t": "Configurar políticas adaptáveis de tempo de vida de sessão - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-session-lifetime"
      }
    ]
  },
  {
    "id": "Q333",
    "src": 333,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "Usuários do Entra não podem ser associados como identidade de recurso. A Managed1 aparece no exhibit original como a identidade **system-assigned** já vinculada (não reaproveitável), e a Managed2 é **user-assigned**. Na VM1, só a Managed2. No App1, uma identidade system-assigned própria + a Managed2. O exhibit do dump veio corrompido e foi reconstruído em tabela; confirme.",
    "details": "**Item a item**\n- **User1 em VM ou App:** usuários do Entra não são identidades de recurso.\n- **Managed1 no App1:** já é a system-assigned da VM1 e não pode ser reaproveitada.\n\n**Dica de prova:** Um recurso pode ter uma system-assigned e várias user-assigned.",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q342",
    "src": 342,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "Em 15/11 o Admin1 tem User Administrator **ativo** (Group1) e o Admin2 só tem atribuição **elegível**, não ativada, então a redefinição é permitida (Sim). Elegível não é ativo: o Admin2 precisa ativar a função no PIM antes de administrar o Exchange (Não). Em 1º/09 o Admin3 é User Administrator ativo e pode redefinir a senha de outro User Administrator (Sim).",
    "details": "**Item a item**\n- **Admin1 redefine a senha do Admin2 em 15/11:** Sim. O Admin2 só é elegível (sem função ativa).\n- **Admin2 administra o Exchange em 15/10:** Não. É elegível; precisa ativar no PIM.\n- **Admin3 redefine a senha do Admin1 em 1/09:** Sim. User Administrator pode redefinir a de outro User Administrator.",
    "docs": [
      {
        "t": "Listar atribuições de funções do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/view-assignments"
      },
      {
        "t": "O que é o Privileged Identity Management? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure"
      },
      {
        "t": "Definir as configurações de funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"
      },
      {
        "t": "Atribuir funções do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"
      }
    ]
  },
  {
    "id": "Q344",
    "src": 344,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "Várias VMs compartilham a mesma identidade com **user-assigned managed identity**. Os segredos da API de terceiros ficam no **Azure Key Vault**, acessado com essa identidade, sem segredo no código.",
    "details": "**Por que não as outras**\n- **User accounts:** exigem senha e MFA, o que não é próprio de VMs.\n- **Storage Service Encryption:** criptografia em repouso, não guarda segredos de API.\n- **System-assigned:** uma por VM, o que exige mais atribuições (o gabarito prefere user-assigned compartilhada).",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q345",
    "src": 345,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas e Key Vault",
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
    "explanation": "A Identity1 (do Automation1) tem acesso só no RG2, e o Vault1 está no RG1 (Não). A Identity2 é a system-assigned do Automation2, com acesso na Sub1 inteira (Sim). A Identity3 é a system-assigned da VM1, com acesso no RG1 (Sim).",
    "details": "**Item a item**\n- **Automation1 lê o Vault1:** Não. A Identity1 só tem acesso no RG2.\n- **Identity2 no Automation2:** Sim. Acesso na Sub1 inteira.\n- **VM1:** Sim. A Identity3 tem acesso no RG1, onde fica o Vault1.",
    "docs": [
      {
        "t": "Conceder permissão a aplicativos para acessar um cofre de chaves do Azure usando o Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      }
    ]
  },
  {
    "id": "Q346",
    "src": 346,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "Com **system-assigned managed identity**, a identidade e suas atribuições são removidas junto com a conta de Automation.",
    "details": "**Por que não as outras**\n- **Client secret / certificado:** precisam de rotação e não somem com a conta.\n- **User-assigned:** sobrevive à exclusão da conta (e suas permissões também).",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q348",
    "src": 348,
    "domain": 1,
    "skill": "1.3",
    "topic": "Sincronização entre tenants",
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
    "explanation": "O escopo por grupo sincroniza só os **membros diretos**: o User2 entra via Group2, mas o User1 (membro do Group1, aninhado) não. O User3 foi colocado diretamente no escopo e é sincronizado.",
    "details": "**Item a item**\n- **User1:** Não. Membro de grupo aninhado; o escopo por grupo não é recursivo.\n- **User2:** Sim. Membro direto do Group2.\n- **User3:** Sim. Atribuído diretamente ao escopo.",
    "docs": [
      {
        "t": "O que é a sincronização entre tenants no Microsoft Entra ID? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-overview"
      },
      {
        "t": "Configurar a sincronização entre tenants - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-configure"
      }
    ]
  },
  {
    "id": "Q349",
    "src": 349,
    "domain": 1,
    "skill": "1.3",
    "topic": "Cadastro por autoatendimento",
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
    "explanation": "**Update-MgPolicyAuthorizationPolicy** (AllowedToSignUpEmailBasedSubscriptions / AllowEmailVerifiedUsersToJoinOrganization = $false) bloqueia o self-service sign-up — equivalente atual do Set-MsolCompanySettings.",
    "details": "**Por que não as outras**\n- **Update-MgDomain / Update-MgDomainFederationConfiguration:** domínio e federação.\n- **Update-MgPolicyPermissionGrantPolicyExclude:** consentimento de apps.",
    "docs": [
      {
        "t": "Inscrição por autoatendimento para usuários com email verificado - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/directory-self-service-signup"
      },
      {
        "t": "Inscrição por autoatendimento - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/self-service-sign-up-overview"
      },
      {
        "t": "Propriedades de usuários convidados B2B - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/user-properties"
      },
      {
        "t": "Autenticação com senha de uso único por email - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/one-time-passcode"
      }
    ]
  },
  {
    "id": "Q350",
    "src": 350,
    "domain": 3,
    "skill": "3.2",
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
    "explanation": "Pelo dump, User1 e User3 podem solicitar acesso. Questão ambígua: User1 já está no Group1 (grupo de quem recebe acesso) e o aprovador (User2) também é um usuário comum. Confira a discussão.",
    "details": "**Por que não as outras**\n- **Ambígua:** o gabarito considera User1 e User3 (usuários sem o app). O User2 é o aprovador.\n\n**Dica de prova:** O self-service de apps tende a ser substituído por access packages (entitlement management).",
    "docs": [
      {
        "t": "Início rápido: adicionar um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal"
      },
      {
        "t": "Propriedades de um aplicativo empresarial - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/application-properties"
      },
      {
        "t": "Planejar uma implantação de logon único - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/plan-sso-deployment"
      }
    ]
  },
  {
    "id": "Q351",
    "src": 351,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "explanation": "Para criar access reviews de **funções do Entra**, o mínimo é **Privileged Role Administrator**.",
    "details": "**Por que não as outras**\n- **Identity Governance Administrator:** revisões de grupos e apps, não de funções do Entra.\n- **User Access Administrator:** Azure RBAC.\n- **User Administrator:** não gerencia funções privilegiadas.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ]
  },
  {
    "id": "Q352",
    "src": 352,
    "domain": 2,
    "skill": "2.2",
    "topic": "Acesso Condicional — modelos",
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
    "explanation": "O dump marca todos os administradores. Atenção: políticas criadas a partir de templates **excluem o usuário atual** (Admin4) e podem nascer em **report-only**, o que muda a resposta. Confira a discussão.",
    "details": "**Por que não as outras**\n- **Excluir Admin4:** o template exclui quem cria a política (Admin4) e pode nascer em report-only. O gabarito do dump ignora isso.\n\n**Dica de prova:** Na prova atual, considere: template = All users incluídos, o criador excluído, estado report-only até você ligar.",
    "docs": [
      {
        "t": "Modelos de Acesso Condicional: simplificar a segurança - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policy-common"
      }
    ]
  },
  {
    "id": "Q353",
    "src": 353,
    "domain": 4,
    "skill": "4.1",
    "topic": "Pacotes de acesso",
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
    "explanation": "Só membros do Group1 podem solicitar: o User1 sim (Sim), o User2 não (Não). Ninguém aprova a própria solicitação, nem um Global Administrator listado como aprovador (Não).",
    "details": "**Item a item**\n- **User1:** Sim. Membro do Group1, que pode solicitar.\n- **User2:** Não. Fora do Group1.\n- **User3 aprova a si mesmo:** Não. Ninguém aprova a própria solicitação; outro aprovador do estágio (membro do Team1) precisa aprovar.\n\n**Dica de prova:** Com \"Users can request specific timeline\", o solicitante escolhe as datas dentro do limite de 7 dias.",
    "docs": [
      {
        "t": "Criar um pacote de acesso no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-create"
      },
      {
        "t": "Alterar configurações de ciclo de vida de um pacote de acesso no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-lifecycle-policy"
      }
    ]
  },
  {
    "id": "Q354",
    "src": 354,
    "domain": 4,
    "skill": "4.1",
    "topic": "Gerenciamento de direitos",
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
    "explanation": "Um access package pode ter **várias políticas** (cada uma com seus solicitantes e aprovadores). Bastam **2 pacotes**: Site1 (política para Group3, aprovado por Group5) e Site1+Team1 (uma política para Group1, aprovada por Group2, e outra para Group4, aprovada por Group5). O dump marcava 3.",
    "details": "**Por que não as outras**\n- **3, 4 ou 5 pacotes:** um pacote aceita várias políticas, cada uma com solicitantes e aprovadores próprios.\n\n**Dica de prova:** Separe pacotes por **conjunto de recursos**, e políticas por **quem solicita e quem aprova**.",
    "docs": [
      {
        "t": "O que é o gerenciamento de direitos? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"
      },
      {
        "t": "Cenários comuns no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-scenarios"
      }
    ]
  },
  {
    "id": "Q356",
    "src": 356,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "Monitorar apps de terceiros com acesso OAuth aos dados: **OAuth app policy** (ou app governance).",
    "details": "**Por que não as outras**\n- **Access policy:** controla o login de usuários em apps.\n- **App permission policy:** é o nome antigo das OAuth policies; a resposta canônica é OAuth app policy.\n- **Endpoint protection:** Intune/Defender for Endpoint.",
    "docs": [
      {
        "t": "Criar políticas de sessão - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
      },
      {
        "t": "Controlar aplicativos de nuvem com políticas - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"
      },
      {
        "t": "Criar políticas de acesso - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"
      }
    ]
  },
  {
    "id": "Q357",
    "src": 357,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "Tokens de managed identity são obtidos no endpoint **IMDS** em **169.254.169.254** (não roteável, só acessível de dentro da VM).",
    "details": "**Por que não as outras**\n- **IP público:** o IMDS não é exposto externamente.\n- **127.0.0.1:** localhost não é o endpoint do IMDS.\n- **IP privado da VM:** não atende requisições de token.\n\n**Dica de prova:** Exemplo: curl -H \"Metadata:true\" \"http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://management.azure.com/\".",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q358",
    "src": 358,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "A authentication strength **Phishing-resistant MFA** inclui **Windows Hello for Business**, **FIDO2/passkeys** e **CBA multifator**.",
    "details": "**Por que não as outras**\n- **Voz / SMS / e-mail OTP:** phishable.\n- **CBA de fator único:** não conta como MFA.\n- **Microsoft Authenticator (push):** não é resistente a phishing (a passkey no Authenticator é, mas a opção se refere ao push).\n\n**Dica de prova:** Use a authentication strength built-in \"Phishing-resistant MFA\" na política de CA para admins.",
    "docs": [
      {
        "t": "Visão geral das intensidades de autenticação do Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths"
      },
      {
        "t": "Visão geral da autenticação do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/overview-authentication"
      },
      {
        "t": "Método de autenticação com chaves de acesso (FIDO2) no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2"
      }
    ]
  },
  {
    "id": "Q361",
    "src": 361,
    "domain": 1,
    "skill": "1.4",
    "topic": "Autenticação de passagem",
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
    "explanation": "Com **PTA**, a validação é feita pelo AD on-premises, e a política de bloqueio de conta do AD vale para entradas no Entra.",
    "details": "**Por que não as outras**\n- **Seamless SSO:** só evita digitar a senha; não aplica bloqueio.\n- **Cloud Sync / PHS:** a validação na nuvem usa o smart lockout do Entra, não a política do AD.\n\n**Dica de prova:** Configure o smart lockout do Entra com limite **menor** que o do AD para evitar que ataques bloqueiem contas no AD.",
    "docs": [
      {
        "t": "Microsoft Entra Connect: autenticação de passagem - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta"
      },
      {
        "t": "Autenticação de passagem do Microsoft Entra - Início rápido - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta-quick-start"
      }
    ]
  },
  {
    "id": "Q365",
    "src": 365,
    "domain": 4,
    "skill": "4.1",
    "topic": "Termos de uso",
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
    "explanation": "O documento dos termos de uso do Entra deve ser enviado em **PDF**.",
    "details": "**Por que não as outras**\n- **HTML / RTF / DOCX:** não são aceitos; só PDF.\n\n**Dica de prova:** É possível enviar versões em vários idiomas (um PDF por idioma).",
    "docs": [
      {
        "t": "Configurar os Termos de Uso do Microsoft Entra com o Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/terms-of-use"
      }
    ]
  },
  {
    "id": "Q366",
    "src": 366,
    "domain": 4,
    "skill": "4.1",
    "topic": "Termos de uso",
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
    "explanation": "Os termos de uso são apresentados no login por uma política de **Conditional Access** com Require terms of use.",
    "details": "**Por que não as outras**\n- **Access package:** termos podem ser exigidos no pacote, mas para todo login a resposta é o CA.\n- **Lifecycle workflow / authentication method:** não exibem termos.",
    "docs": [
      {
        "t": "Configurar os Termos de Uso do Microsoft Entra com o Acesso Condicional - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/terms-of-use"
      }
    ]
  },
  {
    "id": "Q368",
    "src": 368,
    "domain": 1,
    "skill": "1.2",
    "topic": "Atributos de segurança personalizados",
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
    "explanation": "Criar atributos de segurança personalizados exige **Attribute Definition Administrator**; nem o Global Administrator tem essa permissão por padrão. Os atributos podem ser atribuídos a usuários e a **service principals**, o que inclui managed identities, mas **não** a grupos. O dump marcava \"Service1 only\".",
    "details": "**Item a item**\n- **User1 (Global Admin):** não tem permissão de atributos de segurança por padrão.\n- **User3:** pela tabela, não tem Attribute Definition Administrator.\n- **Grupos:** não suportam custom security attributes.\n\n**Dica de prova:** Funções: Attribute Definition Administrator/Reader (definições) e Attribute Assignment Administrator/Reader (valores).",
    "docs": [
      {
        "t": "Gerenciar o acesso a atributos de segurança personalizados no Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/custom-security-attributes-manage"
      },
      {
        "t": "O que são atributos de segurança personalizados no Microsoft Entra ID? - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/custom-security-attributes-overview"
      },
      {
        "t": "Adicionar ou desativar definições de atributos de segurança personalizados no Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/custom-security-attributes-add"
      },
      {
        "t": "Atribuir, atualizar, listar ou remover atributos de segurança personalizados de um usuário - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/users-custom-security-attributes"
      }
    ]
  },
  {
    "id": "Q369",
    "src": 369,
    "domain": 1,
    "skill": "1.3",
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
    "explanation": "A sincronização entre tenants provisiona **usuários** (como B2B no tenant de destino). Grupos não são sincronizados; o escopo pode usar grupos só para selecionar usuários.",
    "details": "**Por que não as outras**\n- **Grupos:** a cross-tenant sync provisiona apenas usuários (B2B members).\n\n**Dica de prova:** Use grupos no escopo para escolher usuários; a associação aos grupos não é replicada no destino.",
    "docs": [
      {
        "t": "O que é a sincronização entre tenants no Microsoft Entra ID? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-overview"
      },
      {
        "t": "Configurar a sincronização entre tenants - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-configure"
      }
    ]
  },
  {
    "id": "Q370",
    "src": 370,
    "domain": 1,
    "skill": "1.3",
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
    "explanation": "**New-MgInvitation** (Graph PowerShell) convida o usuário externo como guest, que autentica com a própria conta.",
    "details": "**Por que não as outras**\n- **New-MgUser:** cria membro com senha no seu tenant.\n- **External collaboration:** não cria o convidado.\n- **Entra Connect:** sincroniza o seu AD, não usuários de outra organização.",
    "docs": [
      {
        "t": "Redefinir o status de resgate de convidados - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/reset-redemption-status"
      },
      {
        "t": "New-MgInvitation (Microsoft.Graph.Identity.SignIns)",
        "u": "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/new-mginvitation"
      },
      {
        "t": "Propriedades de usuários convidados B2B - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/user-properties"
      },
      {
        "t": "Autenticação com senha de uso único por email - Microsoft Entra External ID",
        "u": "https://learn.microsoft.com/en-us/entra/external-id/one-time-passcode"
      }
    ]
  },
  {
    "id": "Q372",
    "src": 372,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "Com **um** método exigido para reset, a notificação do app **não** é permitida (só o código). Entre as opções, o válido é o **e-mail alternativo** (fora da organização). O dump marcava a notificação do app.",
    "details": "**Por que não as outras**\n- **Notificação do app:** exige 2 métodos para ser oferecida.\n- **FIDO2 / Teams:** não são métodos de SSPR.",
    "docs": [
      {
        "t": "Habilitar a redefinição de senha por autoatendimento do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr"
      },
      {
        "t": "Políticas de redefinição de senha por autoatendimento - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy"
      },
      {
        "t": "Habilitar o write-back de senha do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr-writeback"
      }
    ]
  },
  {
    "id": "Q374",
    "src": 374,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "O User1 tem Reader na Sub1 (plano de controle, não lê o conteúdo de segredos) e Key Vault Secrets User só no RG2. O Vault1 está no RG1 (Não). O User2 tem Secrets User no RG2, onde está o Vault2 (Sim). O User3 é Owner do RG1, onde está a VM1 (Sim). O dump marcava Sim na primeira.",
    "details": "**Item a item**\n- **User1 lê segredos do Vault1:** Não. Reader não lê conteúdo, e o Secrets User dele está no RG2.\n- **User2 lê o Vault2:** Sim. Tem Secrets User no RG2.\n- **User3 atualiza a VM1:** Sim. É Owner do RG1.",
    "docs": [
      {
        "t": "Conceder permissão a aplicativos para acessar um cofre de chaves do Azure usando o Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      }
    ]
  },
  {
    "id": "Q375",
    "src": 375,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "O login com conta Entra exige **Virtual Machine User Login** ou **Virtual Machine Administrator Login** no escopo da VM. O User1 tem a função na assinatura (VM1 e VM2) e o User3 só na VM1. Virtual Machine Contributor gerencia a VM, mas não dá login.",
    "details": "**Item a item**\n- **User2 em VM1 / VM2:** pela tabela, tem só Virtual Machine Contributor (gerencia, não faz login).\n- **User3 na VM2:** a função dele está só no escopo da VM1.\n\n**Dica de prova:** O login exige a extensão AADLoginForWindows na VM e o cliente RDP com a opção de \"Web account\" ou dispositivo joined/registered.",
    "docs": [
      {
        "t": "Entrar em uma máquina virtual Windows no Azure usando o Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/howto-vm-sign-in-azure-ad-windows"
      },
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q377",
    "src": 377,
    "domain": 2,
    "skill": "2.4",
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
    "explanation": "No Internet Access do Global Secure Access: criar a **web content filtering policy** (bloqueando contoso.com), vinculá-la a um **security profile** e aplicar o perfil aos usuários por uma **política de Conditional Access** (sessão: Use Global Secure Access security profile).",
    "details": "**Sequência**\n- **App protection policy:** Intune MAM.\n- **Remote network:** para filiais sem cliente GSA; não define o bloqueio.\n- **Ordem:** política de filtro → security profile (com prioridade) → CA que aplica o profile aos usuários.",
    "docs": [
      {
        "t": "Como configurar a filtragem de conteúdo da Web do Global Secure Access - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-configure-web-content-filtering"
      },
      {
        "t": "Conhecer o Microsoft Entra Internet Access - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/concept-internet-access"
      }
    ]
  },
  {
    "id": "Q378",
    "src": 378,
    "domain": 2,
    "skill": "2.4",
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
    "explanation": "Os perfis de encaminhamento (Microsoft, Private Access, Internet Access) são habilitados em **Global Secure Access > Connect > Traffic forwarding**.",
    "details": "**Por que não as outras**\n- **Remote networks:** conectam filiais.\n- **Security profiles:** Internet Access (filtragem).\n- **Connectors:** são os conectores do Private Access, mas o perfil é habilitado em Traffic forwarding.\n\n**Dica de prova:** Depois, publique o App1 em Enterprise applications (Global Secure Access app) ou use o Quick Access.",
    "docs": [
      {
        "t": "Instalar o cliente do Global Secure Access para Windows - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client"
      },
      {
        "t": "Habilitar a verificação de rede em conformidade com o Acesso Condicional - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-compliant-network"
      },
      {
        "t": "O que é o Global Secure Access? - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access"
      }
    ]
  },
  {
    "id": "Q379",
    "src": 379,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "O User2 tem **Storage Blob Data Reader** e lê o blob File1, mas não arquivos do share. O User3 tem **Storage Account Contributor**, que permite listar as **chaves de acesso**, e com elas lê blob e file share (com Shared Key habilitada). Reader é só plano de controle.",
    "details": "**Item a item**\n- **User1 (Reader):** não lê dados e não lista chaves.\n- **User2 no File2:** Blob Data Reader não cobre Azure Files.\n\n**Dica de prova:** Desabilitar Shared Key (allowSharedKeyAccess = false) cortaria o acesso do User3 via chave.",
    "docs": [
      {
        "t": "Autorizar o acesso a blobs com o Microsoft Entra ID - Azure Storage",
        "u": "https://learn.microsoft.com/en-us/azure/storage/blobs/authorize-access-azure-active-directory"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      },
      {
        "t": "Conceder permissão a aplicativos para acessar um cofre de chaves do Azure usando o Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"
      }
    ]
  },
  {
    "id": "Q380",
    "src": 380,
    "domain": 2,
    "skill": "3.1",
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
    "explanation": "A VM precisa alcançar os endpoints do Entra (ex.: https://enterpriseregistration.windows.net, login.microsoftonline.com) para registrar o dispositivo e autenticar. Sem isso, o login com credenciais do Entra falha.",
    "details": "**Por que não as outras**\n- **Excluir registros de dispositivo:** não resolve a falta de conectividade.\n- **Revogar o PRT:** piora a situação.\n- **OpenSSH:** para Linux / az ssh.\n\n**Dica de prova:** Endpoints exigidos: login.microsoftonline.com, enterpriseregistration.windows.net, device.login.microsoftonline.com, pas.windows.net.",
    "docs": [
      {
        "t": "Entrar em uma máquina virtual Windows no Azure usando o Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/howto-vm-sign-in-azure-ad-windows"
      },
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q383",
    "src": 383,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "**Virtual Machine Local User Login** permite entrar só como usuário **local**, não com a conta Entra (User1: Não). **Virtual Machine User Login** no RG1 permite o login Entra (User2: Sim). **Virtual Machine Contributor** gerencia a VM, mas não dá login (User3: Não). O dump marcava Sim nas três.",
    "details": "**Item a item**\n- **User1 (Local User Login):** Não. Essa função não existe para login com conta Entra; o login exige VM User/Administrator Login.\n- **User2:** Sim. Virtual Machine User Login no RG1.\n- **User3 (VM Contributor):** Não. Gerencia, mas não faz login.",
    "docs": [
      {
        "t": "Entrar em uma máquina virtual Windows no Azure usando o Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/howto-vm-sign-in-azure-ad-windows"
      },
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q385",
    "src": 385,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "ABAC (condições de atribuição de função) é suportado para **Azure Storage** (blobs/filas). Não se aplica a Key Vault, VM ou App Service.",
    "details": "**Por que não as outras**\n- **Vault1 / VM1 / App1:** as condições ABAC não são suportadas nesses serviços (só Blob e Queue).",
    "docs": [
      {
        "t": "O que é o controle de acesso baseado em atributos do Azure (Azure ABAC)?",
        "u": "https://learn.microsoft.com/en-us/azure/role-based-access-control/conditions-overview"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      },
      {
        "t": "Conceder permissão a aplicativos para acessar um cofre de chaves do Azure usando o Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"
      }
    ]
  },
  {
    "id": "Q386",
    "src": 386,
    "domain": 3,
    "skill": "3.3",
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
    "explanation": "Um app acessando outro tenant (multitenant/app-only) autentica com **certificado** ou **client secret** do registro do app.",
    "details": "**Por que não as outras**\n- **Managed identity:** não funciona entre tenants (é do tenant de origem e só para recursos do Azure).\n- **User account / OTP:** não são credenciais de aplicativo.\n\n**Dica de prova:** Prefira certificados (ou federated identity credentials) a segredos.",
    "docs": [
      {
        "t": "Adicionar e gerenciar credenciais de aplicativos no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
      },
      {
        "t": "Como registrar um aplicativo no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
      }
    ]
  },
  {
    "id": "Q387",
    "src": 387,
    "domain": 3,
    "skill": "3.1",
    "topic": "Identidades gerenciadas",
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
    "explanation": "Para VMs acessarem o SQL Managed Instance sem gerenciar segredos, crie uma **managed identity** (por exemplo, user-assigned compartilhada) e conceda acesso a ela no SQL.",
    "details": "**Por que não as outras**\n- **Certificado:** precisa de gestão e rotação.\n- **SAS:** é de Storage, não de SQL.\n- **Usuário do Entra:** exige senha/MFA, o que não é próprio de VMs.\n\n**Dica de prova:** No SQL MI: CREATE USER [nome-da-identidade] FROM EXTERNAL PROVIDER.",
    "docs": [
      {
        "t": "Identidades gerenciadas para recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
      },
      {
        "t": "Aplicativos e entidades de serviço no Microsoft Entra ID - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals"
      },
      {
        "t": "Introdução às contas de serviço do Active Directory - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/architecture/service-accounts-on-premises"
      }
    ]
  },
  {
    "id": "Q389",
    "src": 389,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "explanation": "Escopo **somente guests** do Group1: User1 e User4 são membros (Member), fora do escopo (Não/Não). O User5 é guest do Group2, aninhado no Group1, e entra na revisão como membro **indireto**. O User3, dono do Group1, revisa (Sim).",
    "details": "**Item a item**\n- **User3 revisa o User1 / User4:** Não. São membros (não guests), fora do escopo \"Guest users only\".\n- **User3 revisa o User5:** Sim. Guest indireto (via Group2) e o User3 é dono do Group1.\n\n**Dica de prova:** Membros indiretos aparecem na revisão, mas a remoção só ocorre em membros diretos.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ]
  },
  {
    "id": "Q391",
    "src": 391,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "explanation": "Escopo *All users* com os donos (User1 e User4) como revisores. O User1 revisa todos os membros: a si mesmo, a identidade Managed2 (membro direto) e o User3 (via Group2, aninhado). O gabarito marca Sim nas três; a inclusão de service principals e membros aninhados depende de recursos mais recentes das access reviews.",
    "details": "**Por que todos são Sim:** o owner revisor (User1) vê todos os membros no escopo All users: ele mesmo, o service principal (Managed2) e o membro indireto (User3).\n\n**Dica de prova:** Revisores podem revisar o próprio acesso se forem membros; configure \"Prevent reviewers from reviewing their own access\" se necessário.",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ]
  },
  {
    "id": "Q394",
    "src": 394,
    "domain": 1,
    "skill": "1.2",
    "topic": "Ingresso híbrido e Intune",
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
    "explanation": "Os computadores já estão no domínio; o hybrid join é configurado pelo **Microsoft Entra Connect** (Device options). A inscrição automática no Intune exige configurar o **MDM user scope**. O Intune Connector for Active Directory só é usado no cenário Windows Autopilot hybrid join, para novos dispositivos. O dump marcava o Intune Connector.",
    "details": "**Item a item**\n- **Intune Connector for AD:** só para Autopilot hybrid join (dispositivos novos).\n- **Provisioning agent:** é do Cloud Sync, que não configura hybrid join de computadores.\n- **Autopilot device preparation:** não se aplica a máquinas já no domínio.\n- **WIP scope:** Windows Information Protection, aposentado.\n\n**Dica de prova:** A inscrição automática também exige a GPO \"Enable automatic MDM enrollment using default Azure AD credentials\".",
    "docs": [
      {
        "t": "Configurar o ingresso híbrido no Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/how-to-hybrid-join"
      },
      {
        "t": "O que é a identidade de dispositivo no Microsoft Entra ID? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/overview"
      },
      {
        "t": "O que é um dispositivo ingressado no Microsoft Entra? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/concept-directory-join"
      },
      {
        "t": "O que é um dispositivo com ingresso híbrido no Microsoft Entra? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/concept-hybrid-join"
      }
    ]
  },
  {
    "id": "Q396",
    "src": 396,
    "domain": 1,
    "skill": "1.1",
    "topic": "Identidade visual da empresa",
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
    "explanation": "A personalização da página de entrada por idioma do navegador é feita em **Company branding** (personalização por idioma).",
    "details": "**Por que não as outras**\n- **Usage location:** licenciamento.\n- **Session management do GSA:** sem relação.\n- **Conditional Access:** não altera o idioma da página.\n\n**Dica de prova:** Crie uma customização por idioma (es-ES) em Company branding > Customize > Add language.",
    "docs": [
      {
        "t": "Adicionar a identidade visual da empresa à página de entrada da organização - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-customize-branding"
      }
    ]
  },
  {
    "id": "Q397",
    "src": 397,
    "domain": 2,
    "skill": "2.4",
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
    "explanation": "O cliente GSA para **Windows** exige dispositivo **Entra joined ou hybrid joined** (registrado não serve). O cliente **Android** suporta dispositivos registrados/inscritos. Por isso, Device2 e Device4.",
    "details": "**Por que não as outras**\n- **Device1 / Device3 (Windows só registrados):** o cliente GSA para Windows exige joined ou hybrid joined.\n- **Todos:** o tipo de vínculo e o SO importam.\n\n**Dica de prova:** Clientes GSA existem para Windows, macOS, Android e iOS, cada um com seus requisitos.",
    "docs": [
      {
        "t": "Instalar o cliente do Global Secure Access para Windows - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client"
      },
      {
        "t": "Habilitar a verificação de rede em conformidade com o Acesso Condicional - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-compliant-network"
      },
      {
        "t": "O que é o Global Secure Access? - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access"
      }
    ]
  },
  {
    "id": "Q398",
    "src": 398,
    "domain": 2,
    "skill": "2.4",
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
    "explanation": "Exigir que o acesso venha pelo cliente GSA é feito com Conditional Access usando a condição de **compliant network**, que depende de **Global Secure Access signaling** ativado primeiro. Remote network é para filiais sem cliente. O dump marcava remote network.",
    "details": "**Por que não as outras**\n- **Tagging de tenant restrictions:** outro recurso do GSA (bloquear tenants externos).\n- **Named location:** o \"compliant network\" é uma condição própria, que depende do signaling.\n- **Remote network:** conecta filiais sem cliente.",
    "docs": [
      {
        "t": "Instalar o cliente do Global Secure Access para Windows - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client"
      },
      {
        "t": "Habilitar a verificação de rede em conformidade com o Acesso Condicional - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-compliant-network"
      },
      {
        "t": "O que é o Global Secure Access? - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access"
      }
    ]
  },
  {
    "id": "Q399",
    "src": 399,
    "domain": 2,
    "skill": "2.4",
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
    "explanation": "O cliente GSA para Windows exige dispositivo **Entra joined ou hybrid joined**. Só o Device3 atende.",
    "details": "**Por que não as outras**\n- **Dispositivos registrados:** o cliente GSA para Windows não suporta só registro.\n\n**Dica de prova:** O dispositivo também precisa do cliente instalado e do usuário com licença Entra Internet/Private Access.",
    "docs": [
      {
        "t": "Instalar o cliente do Global Secure Access para Windows - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client"
      },
      {
        "t": "Habilitar a verificação de rede em conformidade com o Acesso Condicional - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-compliant-network"
      },
      {
        "t": "O que é o Global Secure Access? - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access"
      }
    ]
  },
  {
    "id": "Q401",
    "src": 401,
    "domain": 2,
    "skill": "2.4",
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
    "explanation": "Gerenciar o Internet Access exige **Global Secure Access Administrator** (ou Global Administrator): User1 e User2. Privileged Role Administrator não gerencia o GSA. O dump marcava só User1.",
    "details": "**Por que não as outras**\n- **User3 (Privileged Role Administrator):** atribui funções, mas não administra o GSA.\n- **Só User1:** o Global Secure Access Administrator (User2) também gerencia.",
    "docs": [
      {
        "t": "Instalar o cliente do Global Secure Access para Windows - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client"
      },
      {
        "t": "Habilitar a verificação de rede em conformidade com o Acesso Condicional - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-compliant-network"
      },
      {
        "t": "O que é o Global Secure Access? - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access"
      }
    ]
  },
  {
    "id": "Q402",
    "src": 402,
    "domain": 3,
    "skill": "3.4",
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
    "explanation": "Para session controls, o app precisa usar o Entra como IdP via **SSO** (SAML/OIDC) e ser roteado pelo Conditional Access App Control. Cloud discovery não é pré-requisito. O dump marcava Cloud discovery.",
    "details": "**Por que não as outras**\n- **Cloud discovery:** identifica apps não gerenciados; não habilita sessão.\n- **OAuth app policy:** governa apps OAuth.\n- **Traffic forwarding profile:** é do GSA, não do MDCA.\n\n**Dica de prova:** Depois do SSO: CA com \"Use Conditional Access App Control\" → session policies no MDCA.",
    "docs": [
      {
        "t": "Criar políticas de sessão - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"
      },
      {
        "t": "Controlar aplicativos de nuvem com políticas - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"
      },
      {
        "t": "Criar políticas de acesso - Microsoft Defender for Cloud Apps",
        "u": "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"
      }
    ]
  },
  {
    "id": "Q403",
    "src": 403,
    "domain": 3,
    "skill": "3.3",
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
    "explanation": "Serviço sem usuário interativo lendo logs via Graph: **application permissions** (ex.: AuditLog.Read.All) com consentimento de admin.",
    "details": "**Por que não as outras**\n- **Funções RBAC:** são do Azure, não do Graph.\n- **Delegated:** exigem um usuário logado.\n\n**Dica de prova:** Para ler sign-ins: AuditLog.Read.All + Directory.Read.All (application), com admin consent.",
    "docs": [
      {
        "t": "Visão geral de permissões e consentimento na plataforma de identidade da Microsoft - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview"
      },
      {
        "t": "Registro de aplicativos de API Web e permissões de API - Plataforma de identidade da Microsoft",
        "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-configure-app-access-web-apis"
      },
      {
        "t": "Referência de permissões do Microsoft Graph - Microsoft Graph",
        "u": "https://learn.microsoft.com/en-us/graph/permissions-reference"
      }
    ]
  },
  {
    "id": "Q404",
    "src": 404,
    "domain": 4,
    "skill": "4.4",
    "topic": "Configurações de diagnóstico",
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
    "explanation": "Para analisar sign-in logs com Azure Monitor (KQL/workbooks), envie para um **Log Analytics workspace**.",
    "details": "**Por que não as outras**\n- **Event Hub:** streaming para SIEMs externos.\n- **SQL Database:** não é destino de diagnostic settings.\n- **Storage:** arquivamento, sem KQL.",
    "docs": [
      {
        "t": "Como configurar as definições de diagnóstico do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-configure-diagnostic-settings"
      },
      {
        "t": "Integrar logs do Microsoft Entra aos logs do Azure Monitor - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-integrate-activity-logs-with-azure-monitor-logs"
      }
    ]
  },
  {
    "id": "Q407",
    "src": 407,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "A Condition1 limita a **leitura** de blobs a contêineres chamados `cont1`. O User1 não lê blob2 (cont2) (Não), mas lê blob3 (cont1 do storage2) (Sim). A Condition2 do User2 restringe só a **gravação** (paths com \"2\"); a leitura não é afetada, e ele lê blob1 (Sim).",
    "details": "**Item a item**\n- **User1 lê blob2:** Não. A leitura é limitada ao container cont1.\n- **User1 lê blob3:** Sim. Está num container chamado cont1 (no storage2).\n- **User2 lê blob1:** Sim. A condição dele restringe só a escrita.\n\n**Dica de prova:** Condições avaliam o nome do container independentemente da conta, se o escopo da atribuição cobrir as duas.",
    "docs": [
      {
        "t": "O que é o controle de acesso baseado em atributos do Azure (Azure ABAC)?",
        "u": "https://learn.microsoft.com/en-us/azure/role-based-access-control/conditions-overview"
      },
      {
        "t": "Tutorial - Usar uma VM/VMSS Windows para acessar recursos do Azure - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-windows-managed-identities-vm-access"
      },
      {
        "t": "Usar identidades gerenciadas em uma máquina virtual para obter um token de acesso - Identidades gerenciadas para recursos do Azure",
        "u": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"
      },
      {
        "t": "Conceder permissão a aplicativos para acessar um cofre de chaves do Azure usando o Azure RBAC",
        "u": "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"
      }
    ]
  },
  {
    "id": "Q408",
    "src": 408,
    "domain": 1,
    "skill": "1.2",
    "topic": "Atributos de segurança personalizados",
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
    "explanation": "Global Administrator **não** tem acesso a atributos de segurança personalizados por padrão (User1: Não). Attribute Definition Administrator define atributos, mas **não lê valores** atribuídos (User2: Não). Attribute Assignment Administrator no tenant lê e atribui valores (User3: Sim).",
    "details": "**Item a item**\n- **User1 (Global) altera o Secure1:** Não. Precisa de Attribute Definition Administrator.\n- **User2 vê os valores do Secure2:** Não. Attribute Definition Administrator não lê valores, e ainda está restrito ao Set1.\n- **User3 vê o Secure3:** Sim. É Attribute Assignment Administrator no tenant.",
    "docs": [
      {
        "t": "Gerenciar o acesso a atributos de segurança personalizados no Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/custom-security-attributes-manage"
      },
      {
        "t": "O que são atributos de segurança personalizados no Microsoft Entra ID? - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/custom-security-attributes-overview"
      },
      {
        "t": "Adicionar ou desativar definições de atributos de segurança personalizados no Microsoft Entra ID - Microsoft Entra",
        "u": "https://learn.microsoft.com/en-us/entra/fundamentals/custom-security-attributes-add"
      },
      {
        "t": "Atribuir, atualizar, listar ou remover atributos de segurança personalizados de um usuário - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/users-custom-security-attributes"
      }
    ]
  },
  {
    "id": "Q409",
    "src": 409,
    "domain": 4,
    "skill": "4.1",
    "topic": "Gerenciamento de direitos",
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
    "explanation": "**Identity Governance Administrator** gerencia access packages, inclusive as configurações de revisão, com o menor privilégio entre as opções.",
    "details": "**Por que não as outras**\n- **Privileged Role / External IdP / Security Administrator:** não gerenciam access packages.\n\n**Dica de prova:** Alternativas de menor escopo: Catalog owner ou Access package manager do catálogo do Package1.",
    "docs": [
      {
        "t": "O que é o gerenciamento de direitos? - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"
      },
      {
        "t": "Cenários comuns no gerenciamento de direitos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-scenarios"
      }
    ]
  },
  {
    "id": "Q411",
    "src": 411,
    "domain": 2,
    "skill": "2.4",
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
    "explanation": "Para bloquear sites por categoria/URL, crie primeiro uma **web content filtering policy**, depois vincule-a a um **security profile** e use o profile em uma política de CA.",
    "details": "**Por que não as outras**\n- **Named location / adaptive access / NSG:** não filtram URLs por palavra.\n\n**Dica de prova:** A filtragem por FQDN ou categoria é feita na web content filtering policy; palavras em URL exigem regra por FQDN/URL conforme os recursos suportados.",
    "docs": [
      {
        "t": "Instalar o cliente do Global Secure Access para Windows - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client"
      },
      {
        "t": "Habilitar a verificação de rede em conformidade com o Acesso Condicional - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-compliant-network"
      },
      {
        "t": "O que é o Global Secure Access? - Global Secure Access",
        "u": "https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access"
      }
    ]
  },
  {
    "id": "Q412",
    "src": 412,
    "domain": 4,
    "skill": "4.3",
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
    "explanation": "O dump marca só o grupo atribuível a funções (Group2), regra antiga dos \"privileged access groups\". Hoje o **PIM for Groups** aceita grupos de segurança e Microsoft 365 com associação atribuída, não exige isAssignableToRole (veja a Q297) — o que indicaria todos os quatro grupos.",
    "details": "**Por que não as outras**\n- **Só Group2:** regra antiga dos \"privileged access groups\" (exigia role-assignable).\n\n**Dica de prova:** Hoje o PIM for Groups aceita grupos de segurança e Microsoft 365 com associação atribuída (não dinâmicos nem sincronizados). Confira os tipos na tabela da questão.",
    "docs": [
      {
        "t": "Privileged Identity Management (PIM) para Grupos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/concept-pim-for-groups"
      },
      {
        "t": "Atribuir elegibilidade para um grupo no Privileged Identity Management - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/groups-assign-member-owner"
      }
    ]
  },
  {
    "id": "Q413",
    "src": 413,
    "domain": 4,
    "skill": "4.2",
    "topic": "Revisões de acesso",
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
    "explanation": "Escopo **somente guests**: User1 e User3 são membros e não fazem a autorrevisão (Não/Não). O User2 é guest, mas só no Group3, que é **dinâmico**; a associação é controlada pela regra e não pode ser revisada/removida pela access review (Não).",
    "details": "**Item a item**\n- **User1 / User3:** membros não fazem a autorrevisão num escopo \"Guest users only\".\n- **User2 no Group3:** grupos dinâmicos não entram na revisão (a associação é definida pela regra).",
    "docs": [
      {
        "t": "Criar uma revisão de acesso de grupos e aplicativos - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
      },
      {
        "t": "Criar uma revisão de acesso de funções de recursos do Azure e do Microsoft Entra no PIM - Microsoft Entra ID Governance",
        "u": "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"
      }
    ]
  }
]);
