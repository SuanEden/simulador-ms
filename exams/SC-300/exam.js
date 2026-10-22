/* =====================================================================
   SimuladorMS — definição da prova
   Este arquivo descreve a prova (domínios, pesos, tempo, estudos de caso).
   As questões ficam em questions.js, na mesma pasta.
   ===================================================================== */
SIM.registerExam({
  "code": "SC-300",
  "title": "Microsoft Identity and Access Administrator",
  "language": "en",
  "passingScore": 700,
  "defaultQuestions": 50,
  "defaultMinutes": 100,
  "sourceNote": "Dump ExamTopics SC-300 (413Q) — 337 questões curadas, out/2026",
  "domains": [
    {
      "id": 1,
      "name": "Implementar e gerenciar identidades de usuário",
      "min": 20,
      "max": 25
    },
    {
      "id": 2,
      "name": "Implementar autenticação e gerenciamento de acesso",
      "min": 20,
      "max": 25
    },
    {
      "id": 3,
      "name": "Planejar e implementar identidades de carga de trabalho",
      "min": 20,
      "max": 25
    },
    {
      "id": 4,
      "name": "Planejar e automatizar a governança de identidade",
      "min": 20,
      "max": 25
    }
  ],
  "cases": {
    "LITWARE": {
      "title": "ADatum Corporation (aquisição da Litware)",
      "tabs": [
        {
          "title": "Visão geral",
          "body": "A ADatum Corporation é uma empresa de consultoria em Montreal.\n\nA ADatum adquiriu recentemente uma empresa sediada em Vancouver chamada Litware, Inc."
        },
        {
          "title": "Ambiente existente",
          "body": "### Ambiente da ADatum\n\nA rede local da ADatum contém uma floresta do Active Directory Domain Services (AD DS) chamada adatum.com.\n\nA ADatum tem uma assinatura do Microsoft 365 E5. A assinatura contém um domínio verificado que é sincronizado com o domínio adatum.com do AD DS usando o Azure AD Connect.\n\nA ADatum tem um tenant do Azure Active Directory (Azure AD) chamado adatum.com. Os Padrões de segurança estão desabilitados no tenant.\n\nO tenant contém os usuários mostrados na tabela a seguir.\n\n| Nome | Função |\n|---|---|\n| User1 | Nenhuma |\n| User2 | Nenhuma |\n| User3 | Administrador de Usuários |\n| User4 | Administrador de Funções com Privilégios |\n| User5 | Administrador de Governança de Identidade |\n\nO tenant contém os grupos mostrados na tabela a seguir.\n\n| Nome | Tipo | Tipo de associação | Proprietário | Membros |\n|---|---|---|---|---|\n| IT_Group1 | Segurança | Atribuído | Nenhum | Todos os usuários do departamento de TI |\n| AdatumUsers | Segurança | Atribuído | Nenhum | User1, User2 |\n\n### Ambiente da Litware\n\nA Litware tem uma floresta do AD DS chamada litware.com.\n\n### Problemas identificados\n\nA ADatum identifica os seguintes problemas:\n\n- Vários usuários do departamento de vendas têm até cinco dispositivos. Esses usuários relatam que, às vezes, precisam entrar em contato com o suporte para ingressar seus dispositivos no tenant do Azure AD, pois atingiram o limite de dispositivos.\n- Um incidente de segurança recente revela que as credenciais de vários usuários vazaram, um navegador suspeito foi usado em uma entrada e recursos foram acessados de um endereço IP anônimo.\n- Ao tentar atribuir a função Administradores de Dispositivos a IT_Group1, o grupo NÃO aparece na lista de seleção.\n- Qualquer pessoa na organização pode convidar usuários convidados, incluindo outros convidados e usuários sem funções administrativas.\n- O suporte técnico gasta tempo demais redefinindo senhas de usuários.\n- Atualmente, os usuários usam somente senhas para autenticação."
        },
        {
          "title": "Requisitos",
          "body": "### Alterações planejadas\n\nA ADatum planeja implementar as seguintes alterações:\n\n- Configurar a redefinição de senha por autoatendimento (SSPR).\n- Configurar a autenticação multifator (MFA) para todos os usuários.\n- Configurar uma revisão de acesso para um pacote de acesso chamado Package1.\n- Exigir aprovação do administrador para que aplicativos acessem dados organizacionais.\n- Sincronizar os usuários e grupos do AD DS de litware.com com o tenant do Azure AD.\n- Garantir que somente usuários com funções administrativas específicas atribuídas possam convidar usuários convidados.\n- Aumentar para 10 o número máximo de dispositivos que podem ser ingressados ou registrados no Azure AD.\n\n### Requisitos técnicos\n\nA ADatum identifica os seguintes requisitos técnicos:\n\n- Os usuários com a função Administrador de Usuários atribuída devem poder solicitar permissão para usar essa função quando necessário por até um ano.\n- Os usuários devem ser solicitados a se registrar para MFA e receber uma opção para ignorar o registro durante um período de carência.\n- Os usuários devem fornecer um método de autenticação para redefinir a senha usando SSPR. Os métodos disponíveis devem incluir email, telefone, perguntas de segurança e o aplicativo Microsoft Authenticator.\n- NÃO devem ser estabelecidas relações de confiança entre os domínios adatum.com e litware.com do AD DS.\n- O princípio do menor privilégio deve ser usado."
        }
      ]
    },
    "CONTOSO_A": {
      "title": "Contoso, Ltd.",
      "tabs": [
        {
          "title": "Visão geral",
          "body": "A Contoso, Ltd. é uma empresa de consultoria com sede em Montreal e filiais em Londres e Seattle.\n\nA Contoso tem uma parceria com uma empresa chamada Fabrikam, Inc. A Fabrikam tem um tenant do Azure AD chamado fabrikam.com."
        },
        {
          "title": "Ambiente existente",
          "body": "### Ambiente existente\n\nA rede local da Contoso contém um domínio do Active Directory chamado contoso.com. O domínio contém uma unidade organizacional (OU) chamada Contoso_Resources. A OU Contoso_Resources contém todos os usuários e computadores.\n\nO domínio contoso.com do Active Directory contém os usuários relevantes mostrados na tabela a seguir.\n\n| Nome | Escritório | Departamento |\n|---|---|---|\n| Admin1 | Montreal | Suporte técnico |\n| User1 | Montreal | HR |\n| User2 | Montreal | HR |\n| User3 | Montreal | HR |\n| Admin2 | Londres | Suporte técnico |\n| User4 | Londres | Finanças |\n| User5 | Londres | Vendas |\n| User6 | Londres | Vendas |\n| Admin3 | Seattle | Suporte técnico |\n| User7 | Seattle | Vendas |\n| User8 | Seattle | Vendas |\n| User9 | Seattle | Vendas |\n\nA Contoso também tem um departamento de marketing com usuários em cada escritório.\n\n### Ambiente do Microsoft 365/Azure\n\nA Contoso tem um tenant do Azure AD chamado contoso.com com as seguintes licenças associadas:\n\n- Microsoft Office 365 Enterprise E5\n- Enterprise Mobility + Security E5\n- Windows 10 Enterprise E3\n- Project Plan 3\n\nO Azure AD Connect está configurado entre o Azure AD e o Active Directory Domain Services (AD DS). Somente a OU Contoso_Resources é sincronizada.\n\nOs administradores de suporte técnico usam rotineiramente o centro de administração do Microsoft 365 para gerenciar as configurações dos usuários.\n\nAtualmente, os administradores de usuários usam o centro de administração do Microsoft 365 para atribuir licenças manualmente. Todos os usuários têm todas as licenças atribuídas, com as seguintes exceções:\n\n- Os usuários do escritório de Londres não têm a licença do Microsoft 365 Phone System atribuída.\n- Os usuários do escritório de Seattle não têm a licença do Yammer Enterprise atribuída.\n\nOs Padrões de segurança estão desabilitados para contoso.com.\n\nA Contoso usa o Azure AD Privileged Identity Management (PIM) para proteger funções administrativas.\n\n### Problemas identificados\n\nA Contoso identifica os seguintes problemas:\n\n- Atualmente, todos os administradores de suporte técnico podem gerenciar licenças de usuários em todo o tenant do Microsoft 365.\n- Os administradores de usuários relatam que é trabalhoso configurar manualmente os diferentes requisitos de licenciamento de cada escritório da Contoso.\n- Os administradores de suporte técnico gastam tempo demais provisionando o acesso de usuários internos e convidados aos serviços e aplicativos necessários do Microsoft 365.\n- Atualmente, os administradores de suporte técnico podem executar tarefas usando a função Administrador de Usuários sem justificativa nem aprovação.\n- Quando o nó Logs é selecionado no Azure AD, aparece uma mensagem de erro informando que a integração com o Log Analytics não está habilitada."
        },
        {
          "title": "Requisitos",
          "body": "### Alterações planejadas\n\nA Contoso planeja implementar as seguintes alterações:\n\n- Implementar a redefinição de senha por autoatendimento (SSPR).\n- Analisar logs de atividades de auditoria do Azure usando o Azure Monitor.\n- Simplificar a alocação de licenças para novos usuários adicionados ao tenant.\n- Colaborar com os usuários da Fabrikam em uma campanha conjunta de marketing.\n- Configurar a função Administrador de Usuários para exigir justificativa e aprovação para ativação.\n- Implementar um aplicativo web do Azure de linha de negócios personalizado chamado App1. App1 será acessível pela internet e autenticado usando contas do Azure AD.\n- Para novos usuários do departamento de marketing, implementar um fluxo de aprovação automatizado para fornecer acesso a um site do Microsoft SharePoint Online, a um grupo e a um aplicativo.\n\nA Contoso planeja adquirir uma empresa chamada A. Datum Corporation. Cem novos usuários da A. Datum serão criados em uma OU do Active Directory chamada Adatum. Esses usuários estarão em Londres e Seattle.\n\n### Requisitos técnicos\n\nA Contoso identifica os seguintes requisitos técnicos:\n\n- Todos os usuários devem ser sincronizados do AD DS para o tenant contoso.com do Azure AD.\n- App1 deve ter uma URI de redirecionamento apontando para https://contoso.com/auth-response.\n- As licenças de novos usuários devem ser atribuídas automaticamente com base no local do usuário.\n- Os usuários da Fabrikam devem ter acesso ao site do SharePoint do departamento de marketing por no máximo 90 dias.\n- As ações administrativas executadas no Azure AD devem ser auditadas. Os logs de auditoria devem ser retidos por um ano.\n- Os administradores de suporte técnico devem poder gerenciar licenças somente dos usuários de seus respectivos escritórios.\n- Os usuários devem ser forçados a alterar a senha se houver probabilidade de comprometimento de suas identidades."
        }
      ]
    },
    "CONTOSO_B": {
      "title": "Litware, Inc.",
      "tabs": [
        {
          "title": "Visão geral",
          "body": "A Litware, Inc. é uma empresa farmacêutica que tem uma subsidiária chamada Fabrikam, Inc.\n\nA Litware tem escritórios em Boston e Seattle, mas seus funcionários estão distribuídos pelos Estados Unidos. Os funcionários se conectam remotamente a um dos escritórios usando uma conexão VPN."
        },
        {
          "title": "Ambiente existente",
          "body": "### Ambiente de identidade\n\nA rede contém uma floresta do Active Directory chamada litware.com, vinculada a um tenant do Azure Active Directory (Azure AD) chamado litware.com. O Azure AD Connect usa autenticação de passagem e tem a sincronização de hash de senha desabilitada.\n\nLitware.com contém um usuário chamado User1, responsável por todo o desenvolvimento de aplicativos.\n\nA Litware implementa o Azure AD Application Proxy.\n\nA Fabrikam tem um tenant do Azure AD chamado fabrikam.com. Os usuários da Fabrikam acessam os recursos de litware.com usando contas de convidado no tenant litware.com.\n\n### Ambiente de nuvem\n\nTodos os usuários da Litware têm licenças do Microsoft 365 Enterprise E5. Todas as políticas internas de detecção de anomalias do Microsoft Cloud App Security estão habilitadas.\n\nA Litware tem uma assinatura do Azure associada ao tenant litware.com do Azure AD. A assinatura contém uma instância do Azure Sentinel que usa o conector do Azure Active Directory e o conector do Office 365. Atualmente, o Azure Sentinel coleta os logs de entrada e os logs de auditoria do Azure AD.\n\n### Ambiente local\n\nA rede local contém os servidores mostrados na tabela a seguir.\n\n| Nome | Sistema operacional | Escritório | Descrição |\n|---|---|---|---|\n| DC1 | Windows Server 2019 | Boston | Controlador de domínio de litware.com |\n| SERVER1 | Windows Server 2019 | Boston | Servidor membro em litware.com que executa o conector do Azure AD Application Proxy |\n| SERVER2 | Windows Server 2019 | Boston | Servidor membro que usa o Azure AD Connect |\n\nOs dois escritórios da Litware se conectam diretamente à internet. Ambos se conectam às redes virtuais da assinatura do Azure por uma conexão VPN site a site. Todos os controladores de domínio locais estão impedidos de acessar a internet."
        },
        {
          "title": "Requisitos",
          "body": "### Requisitos de delegação\n\nA Litware identifica os seguintes requisitos de delegação:\n\n- Delegar o gerenciamento de funções com privilégios usando o Azure AD Privileged Identity Management (PIM).\n- Impedir que usuários sem privilégios registrem aplicativos no tenant litware.com do Azure AD.\n- Usar programas personalizados para Governança de Identidade.\n- Garantir que User1 possa criar aplicativos empresariais no Azure AD. Usar o princípio do menor privilégio.\n\n### Requisitos de licenciamento\n\nA Litware adicionou recentemente um atributo de usuário personalizado chamado LWLicenses à floresta litware.com do Active Directory. A Litware quer gerenciar a atribuição de licenças do Azure AD modificando o valor do atributo LWLicenses. Os usuários com o valor apropriado em LWLicenses devem ser adicionados automaticamente a um grupo do Microsoft 365 com as licenças apropriadas atribuídas.\n\n### Requisitos de gerenciamento\n\nA Litware quer criar um grupo chamado LWGroup1 que contenha todas as contas de usuário do Azure AD da Litware, mas exclua todas as contas de convidado do Azure AD.\n\n### Requisitos de autenticação\n\nA Litware identifica os seguintes requisitos de autenticação:\n\n- Implementar a autenticação multifator (MFA) para todos os usuários da Litware usando políticas de Acesso Condicional.\n- Dispensar os usuários de usar MFA para se autenticar no Azure AD a partir do escritório da Litware em Boston.\n- Implementar uma lista de senhas proibidas para a floresta litware.com.\n- Impor MFA ao acessar aplicativos locais.\n- Detectar e corrigir automaticamente credenciais vazadas externamente.\n\n### Requisitos de acesso\n\nA Litware identifica os seguintes requisitos de acesso:\n\n- Controlar todo o acesso a todos os recursos do Azure e aplicativos do Azure AD usando políticas de Acesso Condicional.\n- Implementar uma política de Acesso Condicional com controles de sessão para o Microsoft SharePoint Online.\n- Controlar o acesso privilegiado a aplicativos usando revisões de acesso no Azure AD.\n\n### Requisitos de monitoramento\n\nA Litware quer usar a regra Fusion no Azure Sentinel para detectar ataques em vários estágios que incluam uma combinação de entradas suspeitas no Azure AD seguidas de atividades anômalas do Microsoft Office 365."
        }
      ]
    }
  }
});
