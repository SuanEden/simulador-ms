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
          "title": "Overview",
          "body": "Contoso, Ltd. is a manufacturing company that has offices worldwide. Contoso works with partner organizations to bring products to market.\n\nContoso products are manufactured by using blueprint files that the company authors and maintains."
        },
        {
          "title": "Existing Environment",
          "body": "Currently, Contoso uses multiple types of servers for business operations, including the following:\n\n- File servers\n- Domain controllers\n- Microsoft SQL Server servers\n\nYour network contains an Active Directory forest named contoso.com. All servers and client computers are joined to Active Directory.\n\nYou have a public-facing application named App1. App1 is comprised of the following three tiers:\n\n- A SQL database\n- A web front end\n- A processing middle tier\n\nEach tier is comprised of five virtual machines. Users access the web front end by using HTTPS only."
        },
        {
          "title": "Requirements",
          "body": "### Planned Changes\n\nContoso plans to implement the following changes to the infrastructure:\n\n- Move all the tiers of App1 to Azure.\n- Move the existing product blueprint files to Azure Blob storage.\n- Create a hybrid directory to support an upcoming Microsoft 365 migration project.\n\n### Technical Requirements\n\nContoso must meet the following technical requirements:\n\n- Move all the virtual machines for App1 to Azure.\n- Minimize the number of open ports between the App1 tiers.\n- Ensure that all the virtual machines for App1 are protected by backups.\n- Copy the blueprint files to Azure over the Internet.\n- Ensure that the blueprint files are stored in the archive storage tier.\n- Ensure that partner access to the blueprint files is secured and temporary.\n- Prevent user passwords or hashes of passwords from being stored in Azure.\n- Use unmanaged standard storage for the hard disks of the virtual machines.\n- Ensure that when users join devices to Azure Active Directory (Azure AD), the users use a mobile phone to verify their identity.\n- Minimize administrative effort whenever possible.\n\n### User Requirements\n\nContoso identifies the following requirements for users:\n\n- Ensure that only users who are part of a group named Pilot can join devices to Azure AD.\n- Designate a new user named Admin1 as the service admin for the Azure subscription.\n- Admin1 must receive email alerts regarding service outages.\n- Ensure that a new user named User3 can create network objects for the Azure subscription."
        }
      ]
    },
    "CONTOSO_CONSULT": {
      "title": "Contoso, Ltd. (consultoria — Sub1, storage e NSGs)",
      "tabs": [
        {
          "title": "Overview",
          "body": "Contoso, Ltd. is a consulting company that has a main office in Montreal and branch offices in Seattle and New York."
        },
        {
          "title": "Existing Environment",
          "body": "Contoso has an Azure subscription named Sub1 that is linked to an Azure Active Directory (Azure AD) tenant. The network contains an on-premises Active Directory domain that syncs to the Azure AD tenant.\n\nThe Azure AD tenant contains the users shown in the following table.\n\n| Name | Type | Role |\n|---|---|---|\n| User1 | Member | None |\n| User2 | Guest | None |\n| User3 | Member | None |\n| User4 | Member | None |\n\nSub1 contains two resource groups named RG1 and RG2 and the virtual networks shown in the following table.\n\n| Name | Subnet | Peered with |\n|---|---|---|\n| VNET1 | Subnet1, Subnet2 | VNET2 |\n| VNET2 | Subnet1 | VNET1, VNET3 |\n| VNET3 | Subnet1 | VNET2 |\n| VNET4 | Subnet1 | None |\n\nUser1 manages the resources in RG1. User4 manages the resources in RG2.\n\nSub1 contains virtual machines that run Windows Server 2019 as shown in the following table.\n\n| Name | IP address | Location | Connected to |\n|---|---|---|---|\n| VM1 | 10.0.1.4 | West US | VNET1/Subnet1 |\n| VM2 | 10.0.2.4 | West US | VNET1/Subnet2 |\n| VM3 | 172.16.1.4 | Central US | VNET2/Subnet1 |\n| VM4 | 192.168.1.4 | West US | VNET3/Subnet1 |\n| VM5 | 10.0.22.4 | East US | VNET4/Subnet1 |\n\nNo network security groups (NSGs) are associated to the network interfaces or the subnets.\n\nSub1 contains the storage accounts shown in the following table.\n\n| Name | Kind | Location | File share | Identity-based access for file share |\n|---|---|---|---|---|\n| storage1 | Storage (general purpose v1) | West US | sharea | Azure Active Directory Domain Services (Azure AD DS) |\n| storage2 | StorageV2 (general purpose v2) | East US | shareb, sharec | Disabled |\n| storage3 | BlobStorage | East US 2 | Not applicable | Not applicable |\n| storage4 | FileStorage | Central US | shared | Azure Active Directory Domain Services (Azure AD DS) |"
        },
        {
          "title": "Requirements",
          "body": "### Planned Changes\n\nContoso plans to implement the following changes:\n\n- Create a blob container named container1 and a file share named share1 that will use the Cool storage tier.\n- Create a storage account named storage5 and configure storage replication for the Blob service.\n- Create an NSG named NSG1 that will have the custom inbound security rules shown in the following table.\n\n| Priority | Port | Protocol | Source | Destination | Action |\n|---|---|---|---|---|---|\n| 500 | 3389 | TCP | 10.0.2.0/24 | Any | Deny |\n| 1000 | Any | ICMP | Any | VirtualNetwork | Allow |\n\n- Associate NSG1 to the network interface of VM1.\n- Create an NSG named NSG2 that will have the custom outbound security rules shown in the following table.\n\n| Priority | Port | Protocol | Source | Destination | Action |\n|---|---|---|---|---|---|\n| 200 | 3389 | TCP | 10.0.0.0/16 | VirtualNetwork | Deny |\n| 400 | Any | ICMP | 10.0.2.0/24 | 10.0.1.0/24 | Allow |\n\n- Associate NSG2 to VNET1/Subnet2.\n\n### Technical Requirements\n\nContoso must meet the following technical requirements:\n\n- Create container1 and share1.\n- Use the principle of least privilege.\n- Create an Azure AD security group named Group4.\n- Back up the Azure file shares and virtual machines by using Azure Backup.\n- Trigger an alert if VM1 or VM2 has less than 20 GB of free space on volume C.\n- Enable User1 to create Azure policy definitions and User2 to assign Azure policies to RG1.\n- Create an internal Basic Azure Load Balancer named LB1 and connect the load balancer to VNET1/Subnet1.\n- Enable flow logging for IP traffic from VM5 and retain the flow logs for a period of eight months.\n- Whenever possible, grant Group4 Azure role-based access control (Azure RBAC) read-only permissions to the Azure file shares."
        }
      ]
    },
    "LITWARE": {
      "title": "Litware, Inc. (migração para o Azure)",
      "tabs": [
        {
          "title": "Overview",
          "body": "Litware, Inc. is a consulting company that has a main office in Montreal and two branch offices in Seattle and New York.\n\nThe Montreal office has 2,000 employees. The Seattle office has 1,000 employees. The New York office has 200 employees.\n\nAll the resources used by Litware are hosted on-premises.\n\nLitware creates a new Azure subscription. The Azure Active Directory (Azure AD) tenant uses a domain named litware.onmicrosoft.com. The tenant uses the Premium P1 pricing tier."
        },
        {
          "title": "Existing Environment",
          "body": "The network contains an Active Directory forest named litware.com. All domain controllers are configured as DNS servers and host the litware.com DNS zone.\n\nLitware has finance, human resources, sales, research, and information technology departments. Each department has an organizational unit (OU) that contains all the accounts of that respective department. All the user accounts have the department attribute set to their respective department. New users are added frequently.\n\nLitware.com contains a user named User1.\n\nAll the offices connect by using private connections.\n\nLitware has data centers in the Montreal and Seattle offices. Each office has a firewall that can be configured as a VPN device.\n\nAll infrastructure servers are virtualized. The virtualization environment contains the servers in the following table.\n\n| Name | Role | Contains virtual machine |\n|---|---|---|\n| Server1 | VMware vCenter server | VM1 |\n| Server2 | Hyper-V host | VM2 |\n\nLitware uses two web applications named App1 and App2. Each instance on each web application requires 1 GB of memory.\n\nThe Azure subscription contains the resources in the following table.\n\n| Name | Type |\n|---|---|\n| VNet1 | Virtual network |\n| VM3 | Virtual machine |\n| VM4 | Virtual machine |\n\nThe network security team implements several network security groups (NSGs)."
        },
        {
          "title": "Requirements",
          "body": "### Planned Changes\n\nLitware plans to implement the following changes:\n\n- Deploy Azure ExpressRoute to the Montreal office.\n- Migrate the virtual machines hosted on Server1 and Server2 to Azure.\n- Synchronize on-premises Active Directory to Azure Active Directory (Azure AD).\n- Migrate App1 and App2 to two Azure web apps named WebApp1 and WebApp2.\n\n### Technical Requirements\n\nLitware must meet the following technical requirements:\n\n- Ensure that WebApp1 can adjust the number of instances automatically based on the load and can scale up to five instances.\n- Ensure that VM3 can establish outbound connections over TCP port 8080 to the applications servers in the Montreal office.\n- Ensure that routing information is exchanged automatically between Azure and the routers in the Montreal office.\n- Enable Azure Multi-Factor Authentication (MFA) for the users in the finance department only.\n- Ensure that webapp2.azurewebsites.net can be accessed by using the name app2.litware.com.\n- Connect the New York office to VNet1 over the Internet by using an encrypted connection.\n- Create a workflow to send an email message when the settings of VM4 are modified.\n- Create a custom Azure role named Role1 that is based on the Reader role.\n- Minimize costs whenever possible."
        }
      ]
    }
  }
});
