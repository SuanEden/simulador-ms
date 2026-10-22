/* =====================================================================
   SimuladorMS — definição da prova
   Este arquivo descreve a prova (domínios, pesos, tempo, estudos de caso).
   As questões ficam em questions.js, na mesma pasta.
   ===================================================================== */
SIM.registerExam({
  "code": "AZ-104",
  "title": "Microsoft Azure Administrator",
  "language": "en",
  "passingScore": 700,
  "defaultQuestions": 50,
  "defaultMinutes": 100,
  "sourceNote": "Dump SecExams AZ-104 (1.153Q, ~600 únicas) — 448 questões curadas, out/2026",
  "domains": [
    {
      "id": 1,
      "name": "Gerenciar identidades e governança do Azure",
      "min": 20,
      "max": 25
    },
    {
      "id": 2,
      "name": "Implementar e gerenciar o armazenamento",
      "min": 15,
      "max": 20
    },
    {
      "id": 3,
      "name": "Implantar e gerenciar recursos de computação do Azure",
      "min": 20,
      "max": 25
    },
    {
      "id": 4,
      "name": "Implementar e gerenciar redes virtuais",
      "min": 15,
      "max": 20
    },
    {
      "id": 5,
      "name": "Monitorar e manter recursos do Azure",
      "min": 10,
      "max": 15
    }
  ],
  "cases": {
    "CONTOSO_MFG": {
      "title": "Contoso, Ltd. (manufatura — App1 e blueprints)",
      "tabs": [
        {
          "title": "Visão geral",
          "body": "A Contoso, Ltd. é uma empresa de manufatura com escritórios no mundo todo. A Contoso trabalha com organizações parceiras para lançar produtos no mercado.\n\nOs produtos da Contoso são fabricados usando arquivos de projetos técnicos que a empresa cria e mantém."
        },
        {
          "title": "Ambiente existente",
          "body": "Atualmente, a Contoso usa vários tipos de servidores em suas operações de negócios, incluindo os seguintes:\n\n- Servidores de arquivos\n- Controladores de domínio\n- Servidores Microsoft SQL Server\n\nSua rede contém uma floresta do Active Directory chamada contoso.com. Todos os servidores e computadores cliente estão ingressados no Active Directory.\n\nVocê tem um aplicativo voltado ao público chamado App1. App1 é composto pelas três camadas a seguir:\n\n- Um banco de dados SQL\n- Um front-end web\n- Uma camada intermediária de processamento\n\nCada camada é composta por cinco máquinas virtuais. Os usuários acessam o front-end web somente por HTTPS."
        },
        {
          "title": "Requisitos",
          "body": "### Alterações planejadas\n\nA Contoso planeja implementar as seguintes alterações na infraestrutura:\n\n- Mover todas as camadas de App1 para o Azure.\n- Mover os arquivos existentes de projetos técnicos de produtos para o Azure Blob storage.\n- Criar um diretório híbrido para dar suporte a um futuro projeto de migração para o Microsoft 365.\n\n### Requisitos técnicos\n\nA Contoso deve atender aos seguintes requisitos técnicos:\n\n- Mover todas as máquinas virtuais de App1 para o Azure.\n- Minimizar o número de portas abertas entre as camadas de App1.\n- Garantir que todas as máquinas virtuais de App1 sejam protegidas por backups.\n- Copiar os arquivos de projetos técnicos para o Azure pela internet.\n- Garantir que os arquivos de projetos técnicos sejam armazenados na camada de armazenamento de arquivos.\n- Garantir que o acesso dos parceiros aos arquivos de projetos técnicos seja seguro e temporário.\n- Impedir que senhas de usuários ou hashes de senhas sejam armazenados no Azure.\n- Usar armazenamento padrão não gerenciado para os discos rígidos das máquinas virtuais.\n- Garantir que, ao ingressar dispositivos no Azure Active Directory (Azure AD), os usuários usem um telefone celular para verificar sua identidade.\n- Minimizar o esforço administrativo sempre que possível.\n\n### Requisitos dos usuários\n\nA Contoso identifica os seguintes requisitos para os usuários:\n\n- Garantir que somente os usuários que fazem parte de um grupo chamado Pilot possam ingressar dispositivos no Azure AD.\n- Designar um novo usuário chamado Admin1 como administrador de serviço da assinatura do Azure.\n- Admin1 deve receber alertas por email sobre interrupções do serviço.\n- Garantir que um novo usuário chamado User3 possa criar objetos de rede para a assinatura do Azure."
        }
      ]
    },
    "CONTOSO_CONSULT": {
      "title": "Contoso, Ltd. (consultoria — Sub1, storage e NSGs)",
      "tabs": [
        {
          "title": "Visão geral",
          "body": "A Contoso, Ltd. é uma empresa de consultoria com sede em Montreal e filiais em Seattle e Nova York."
        },
        {
          "title": "Ambiente existente",
          "body": "A Contoso tem uma assinatura do Azure chamada Sub1, vinculada a um tenant do Azure Active Directory (Azure AD). A rede contém um domínio do Active Directory local, sincronizado com o tenant do Azure AD.\n\nO tenant do Azure AD contém os usuários mostrados na tabela a seguir.\n\n| Nome | Tipo | Função |\n|---|---|---|\n| User1 | Membro | Nenhuma |\n| User2 | Convidado | Nenhuma |\n| User3 | Membro | Nenhuma |\n| User4 | Membro | Nenhuma |\n\nSub1 contém dois grupos de recursos chamados RG1 e RG2 e as redes virtuais mostradas na tabela a seguir.\n\n| Nome | Sub-rede | Emparelhada com |\n|---|---|---|\n| VNET1 | Subnet1, Subnet2 | VNET2 |\n| VNET2 | Subnet1 | VNET1, VNET3 |\n| VNET3 | Subnet1 | VNET2 |\n| VNET4 | Subnet1 | Nenhuma |\n\nUser1 gerencia os recursos em RG1. User4 gerencia os recursos em RG2.\n\nSub1 contém máquinas virtuais que executam o Windows Server 2019, conforme a tabela a seguir.\n\n| Nome | Endereço IP | Local | Conectada a |\n|---|---|---|---|\n| VM1 | 10.0.1.4 | West US | VNET1/Subnet1 |\n| VM2 | 10.0.2.4 | West US | VNET1/Subnet2 |\n| VM3 | 172.16.1.4 | Central US | VNET2/Subnet1 |\n| VM4 | 192.168.1.4 | West US | VNET3/Subnet1 |\n| VM5 | 10.0.22.4 | East US | VNET4/Subnet1 |\n\nNenhum grupo de segurança de rede (NSG) está associado às interfaces de rede ou às sub-redes.\n\nSub1 contém as contas de armazenamento mostradas na tabela a seguir.\n\n| Nome | Tipo | Local | Compartilhamento de arquivos | Acesso baseado em identidade para o compartilhamento de arquivos |\n|---|---|---|---|---|\n| storage1 | Storage (uso geral v1) | West US | sharea | Azure Active Directory Domain Services (Azure AD DS) |\n| storage2 | StorageV2 (uso geral v2) | East US | shareb, sharec | Desabilitado |\n| storage3 | BlobStorage | East US 2 | Não se aplica | Não se aplica |\n| storage4 | FileStorage | Central US | shared | Azure Active Directory Domain Services (Azure AD DS) |"
        },
        {
          "title": "Requisitos",
          "body": "### Alterações planejadas\n\nA Contoso planeja implementar as seguintes alterações:\n\n- Criar um contêiner de blobs chamado container1 e um compartilhamento de arquivos chamado share1 que usarão a camada de armazenamento Fria.\n- Criar uma conta de armazenamento chamada storage5 e configurar a replicação de armazenamento para o serviço Blob.\n- Criar um NSG chamado NSG1 com as regras de segurança de entrada personalizadas mostradas na tabela a seguir.\n\n| Prioridade | Porta | Protocolo | Origem | Destino | Ação |\n|---|---|---|---|---|---|\n| 500 | 3389 | TCP | 10.0.2.0/24 | Qualquer | Negar |\n| 1000 | Qualquer | ICMP | Qualquer | VirtualNetwork | Permitir |\n\n- Associar NSG1 à interface de rede de VM1.\n- Criar um NSG chamado NSG2 com as regras de segurança de saída personalizadas mostradas na tabela a seguir.\n\n| Prioridade | Porta | Protocolo | Origem | Destino | Ação |\n|---|---|---|---|---|---|\n| 200 | 3389 | TCP | 10.0.0.0/16 | VirtualNetwork | Negar |\n| 400 | Qualquer | ICMP | 10.0.2.0/24 | 10.0.1.0/24 | Permitir |\n\n- Associar NSG2 a VNET1/Subnet2.\n\n### Requisitos técnicos\n\nA Contoso deve atender aos seguintes requisitos técnicos:\n\n- Criar container1 e share1.\n- Usar o princípio do menor privilégio.\n- Criar um grupo de segurança do Azure AD chamado Group4.\n- Fazer backup dos compartilhamentos de arquivos do Azure e das máquinas virtuais usando o Azure Backup.\n- Disparar um alerta se VM1 ou VM2 tiver menos de 20 GB de espaço livre no volume C.\n- Permitir que User1 crie definições do Azure Policy e que User2 atribua políticas do Azure a RG1.\n- Criar um Azure Load Balancer Basic interno chamado LB1 e conectá-lo a VNET1/Subnet1.\n- Habilitar o registro de fluxos para o tráfego IP de VM5 e reter os logs de fluxo por oito meses.\n- Sempre que possível, conceder a Group4 permissões somente de leitura de controle de acesso baseado em função do Azure (Azure RBAC) para os compartilhamentos de arquivos do Azure."
        }
      ]
    },
    "LITWARE": {
      "title": "Litware, Inc. (migração para o Azure)",
      "tabs": [
        {
          "title": "Visão geral",
          "body": "A Litware, Inc. é uma empresa de consultoria com sede em Montreal e duas filiais, em Seattle e Nova York.\n\nO escritório de Montreal tem 2.000 funcionários. O escritório de Seattle tem 1.000 funcionários. O escritório de Nova York tem 200 funcionários.\n\nTodos os recursos usados pela Litware são hospedados localmente.\n\nA Litware cria uma nova assinatura do Azure. O tenant do Azure Active Directory (Azure AD) usa um domínio chamado litware.onmicrosoft.com. O tenant usa o tipo de preço Premium P1."
        },
        {
          "title": "Ambiente existente",
          "body": "A rede contém uma floresta do Active Directory chamada litware.com. Todos os controladores de domínio estão configurados como servidores DNS e hospedam a zona DNS litware.com.\n\nA Litware tem departamentos de finanças, recursos humanos, vendas, pesquisa e tecnologia da informação. Cada departamento tem uma unidade organizacional (OU) que contém todas as contas do respectivo departamento. Todas as contas de usuário têm o atributo department definido para o respectivo departamento. Novos usuários são adicionados com frequência.\n\nLitware.com contém um usuário chamado User1.\n\nTodos os escritórios se conectam usando conexões privadas.\n\nA Litware tem data centers nos escritórios de Montreal e Seattle. Cada escritório tem um firewall que pode ser configurado como dispositivo VPN.\n\nTodos os servidores de infraestrutura são virtualizados. O ambiente de virtualização contém os servidores da tabela a seguir.\n\n| Nome | Função | Contém a máquina virtual |\n|---|---|---|\n| Server1 | Servidor VMware vCenter | VM1 |\n| Server2 | Host Hyper-V | VM2 |\n\nA Litware usa dois aplicativos web chamados App1 e App2. Cada instância de cada aplicativo web exige 1 GB de memória.\n\nA assinatura do Azure contém os recursos da tabela a seguir.\n\n| Nome | Tipo |\n|---|---|\n| VNet1 | Rede virtual |\n| VM3 | Máquina virtual |\n| VM4 | Máquina virtual |\n\nA equipe de segurança de rede implementa vários grupos de segurança de rede (NSGs)."
        },
        {
          "title": "Requisitos",
          "body": "### Alterações planejadas\n\nA Litware planeja implementar as seguintes alterações:\n\n- Implantar o Azure ExpressRoute no escritório de Montreal.\n- Migrar para o Azure as máquinas virtuais hospedadas em Server1 e Server2.\n- Sincronizar o Active Directory local com o Azure Active Directory (Azure AD).\n- Migrar App1 e App2 para dois aplicativos web do Azure chamados WebApp1 e WebApp2.\n\n### Requisitos técnicos\n\nA Litware deve atender aos seguintes requisitos técnicos:\n\n- Garantir que WebApp1 possa ajustar automaticamente o número de instâncias com base na carga e possa escalar até cinco instâncias.\n- Garantir que VM3 possa estabelecer conexões de saída pela porta TCP 8080 com os servidores de aplicativos no escritório de Montreal.\n- Garantir que as informações de roteamento sejam trocadas automaticamente entre o Azure e os roteadores do escritório de Montreal.\n- Habilitar o Azure Multi-Factor Authentication (MFA) somente para os usuários do departamento de finanças.\n- Garantir que webapp2.azurewebsites.net possa ser acessado pelo nome app2.litware.com.\n- Conectar o escritório de Nova York a VNet1 pela internet usando uma conexão criptografada.\n- Criar um fluxo de trabalho para enviar uma mensagem de email quando as configurações de VM4 forem modificadas.\n- Criar uma função personalizada do Azure chamada Role1, baseada na função Leitor.\n- Minimizar os custos sempre que possível."
        }
      ]
    }
  }
});
