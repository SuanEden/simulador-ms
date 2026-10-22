/* =====================================================================
   SimuladorMS — definição da prova
   Este arquivo descreve a prova (domínios, pesos, tempo, estudos de caso).
   As questões ficam em questions.js, na mesma pasta.
   ===================================================================== */
SIM.registerExam({
  code: "SC-300",
  title: "Microsoft Identity and Access Administrator",
  language: "en",                 // idioma das questões
  passingScore: 700,              // escala 0–1000
  defaultQuestions: 50,           // tamanho padrão do simulado
  defaultMinutes: 100,            // tempo padrão para o tamanho acima (escala proporcionalmente)
  sourceNote: "Dump ExamTopics SC-300 (413Q) — 337 questões curadas, out/2026",

  // Skills at a glance (Study Guide oficial, vigente a partir de 28/out/2026).
  domains: [
    { id: 1, name: "Implement and manage user identities",              min: 20, max: 25 },
    { id: 2, name: "Implement authentication and access management",    min: 20, max: 25 },
    { id: 3, name: "Plan and implement workload identities",            min: 20, max: 25 },
    { id: 4, name: "Plan and automate identity governance",             min: 20, max: 25 }
  ],

  // Estudos de caso: o texto fica aqui uma vez só; as questões apontam para o id.
  cases: {
    LITWARE: {
      title: "ADatum Corporation (aquisição da Litware)",
      tabs: [
        { title: "Overview", body:
"ADatum Corporation is a consulting company in Montreal.\n\nADatum recently acquired a Vancouver-based company named Litware, Inc." },

        { title: "Existing Environment", body:
"### ADatum environment\n\n" +
"The on-premises network of ADatum contains an Active Directory Domain Services (AD DS) forest named adatum.com.\n\n" +
"ADatum has a Microsoft 365 E5 subscription. The subscription contains a verified domain that syncs with the adatum.com AD DS domain by using Azure AD Connect.\n\n" +
"ADatum has an Azure Active Directory (Azure AD) tenant named adatum.com. The tenant has Security defaults disabled.\n\n" +
"The tenant contains the users shown in the following table.\n\n" +
"| Name | Role |\n|---|---|\n| User1 | None |\n| User2 | None |\n| User3 | User administrator |\n| User4 | Privileged role administrator |\n| User5 | Identity Governance Administrator |\n\n" +
"The tenant contains the groups shown in the following table.\n\n" +
"| Name | Type | Membership type | Owner | Members |\n|---|---|---|---|---|\n| IT_Group1 | Security | Assigned | None | All users in the IT department |\n| AdatumUsers | Security | Assigned | None | User1, User2 |\n\n" +
"### Litware environment\n\nLitware has an AD DS forest named litware.com.\n\n" +
"### Problem statements\n\nADatum identifies the following issues:\n\n" +
"- Multiple users in the sales department have up to five devices. The sales department users report that sometimes they must contact the support department to join their devices to the Azure AD tenant because they have reached their device limit.\n" +
"- A recent security incident reveals that several users leaked their credentials, a suspicious browser was used for a sign-in, and resources were accessed from an anonymous IP address.\n" +
"- When you attempt to assign the Device Administrators role to IT_Group1, the group does NOT appear in the selection list.\n" +
"- Anyone in the organization can invite guest users, including other guests and non-administrators.\n" +
"- The helpdesk spends too much time resetting user passwords.\n" +
"- Users currently use only passwords for authentication." },

        { title: "Requirements", body:
"### Planned changes\n\nADatum plans to implement the following changes:\n\n" +
"- Configure self-service password reset (SSPR).\n" +
"- Configure multi-factor authentication (MFA) for all users.\n" +
"- Configure an access review for an access package named Package1.\n" +
"- Require admin approval for application access to organizational data.\n" +
"- Sync the AD DS users and groups of litware.com with the Azure AD tenant.\n" +
"- Ensure that only users that are assigned specific admin roles can invite guest users.\n" +
"- Increase the maximum number of devices that can be joined or registered to Azure AD to 10.\n\n" +
"### Technical requirements\n\nADatum identifies the following technical requirements:\n\n" +
"- Users assigned the User administrator role must be able to request permission to use the role when needed for up to one year.\n" +
"- Users must be prompted to register for MFA and provided with an option to bypass the registration for a grace period.\n" +
"- Users must provide one authentication method to reset their password by using SSPR. Available methods must include: email, phone, security questions, and the Microsoft Authenticator app.\n" +
"- Trust relationships must NOT be established between the adatum.com and litware.com AD DS domains.\n" +
"- The principle of least privilege must be used." }
      ]
    },

    CONTOSO_A: {
      title: "Contoso, Ltd.",
      tabs: [
        { title: "Overview", body:
"Contoso, Ltd. is a consulting company that has a main office in Montreal and branch offices in London and Seattle.\n\n" +
"Contoso has a partnership with a company named Fabrikam, Inc. Fabrikam has an Azure AD tenant named fabrikam.com." },

        { title: "Existing Environment", body:
"### Existing environment\n\n" +
"The on-premises network of Contoso contains an Active Directory domain named contoso.com. The domain contains an organizational unit (OU) named Contoso_Resources. The Contoso_Resources OU contains all users and computers.\n\n" +
"The contoso.com Active Directory domain contains the relevant users shown in the following table.\n\n" +
"| Name | Office | Department |\n|---|---|---|\n| Admin1 | Montreal | Helpdesk |\n| User1 | Montreal | HR |\n| User2 | Montreal | HR |\n| User3 | Montreal | HR |\n| Admin2 | London | Helpdesk |\n| User4 | London | Finance |\n| User5 | London | Sales |\n| User6 | London | Sales |\n| Admin3 | Seattle | Helpdesk |\n| User7 | Seattle | Sales |\n| User8 | Seattle | Sales |\n| User9 | Seattle | Sales |\n\n" +
"Contoso also includes a marketing department that has users in each office.\n\n" +
"### Microsoft 365/Azure environment\n\n" +
"Contoso has an Azure AD tenant named contoso.com that has the following associated licenses:\n\n" +
"- Microsoft Office 365 Enterprise E5\n- Enterprise Mobility + Security E5\n- Windows 10 Enterprise E3\n- Project Plan 3\n\n" +
"Azure AD Connect is configured between Azure AD and Active Directory Domain Services (AD DS). Only the Contoso_Resources OU is synced.\n\n" +
"Helpdesk administrators routinely use the Microsoft 365 admin center to manage user settings.\n\n" +
"User administrators currently use the Microsoft 365 admin center to manually assign licenses. All users have all licenses assigned besides the following exceptions:\n\n" +
"- The users in the London office have the Microsoft 365 Phone System license unassigned.\n" +
"- The users in the Seattle office have the Yammer Enterprise license unassigned.\n\n" +
"Security defaults are disabled for contoso.com.\n\n" +
"Contoso uses Azure AD Privileged Identity Management (PIM) to protect administrative roles.\n\n" +
"### Problem statements\n\nContoso identifies the following issues:\n\n" +
"- Currently, all the helpdesk administrators can manage user licenses throughout the entire Microsoft 365 tenant.\n" +
"- The user administrators report that it is tedious to manually configure the different license requirements for each Contoso office.\n" +
"- The helpdesk administrators spend too much time provisioning internal and guest access to the required Microsoft 365 services and apps.\n" +
"- Currently, the helpdesk administrators can perform tasks by using the User administrator role without justification or approval.\n" +
"- When the Logs node is selected in Azure AD, an error message appears stating that Log Analytics integration is not enabled." },

        { title: "Requirements", body:
"### Planned changes\n\nContoso plans to implement the following changes:\n\n" +
"- Implement self-service password reset (SSPR).\n" +
"- Analyze Azure audit activity logs by using Azure Monitor.\n" +
"- Simplify license allocation for new users added to the tenant.\n" +
"- Collaborate with the users at Fabrikam on a joint marketing campaign.\n" +
"- Configure the User administrator role to require justification and approval to activate.\n" +
"- Implement a custom line-of-business Azure web app named App1. App1 will be accessible from the internet and authenticated by using Azure AD accounts.\n" +
"- For new users in the marketing department, implement an automated approval workflow to provide access to a Microsoft SharePoint Online site, group, and app.\n\n" +
"Contoso plans to acquire a company named A. Datum Corporation. One hundred new A. Datum users will be created in an Active Directory OU named Adatum. The users will be located in London and Seattle.\n\n" +
"### Technical requirements\n\nContoso identifies the following technical requirements:\n\n" +
"- All users must be synced from AD DS to the contoso.com Azure AD tenant.\n" +
"- App1 must have a redirect URI pointed to https://contoso.com/auth-response.\n" +
"- License allocation for new users must be assigned automatically based on the location of the user.\n" +
"- Fabrikam users must have access to the marketing department's SharePoint site for a maximum of 90 days.\n" +
"- Administrative actions performed in Azure AD must be audited. Audit logs must be retained for one year.\n" +
"- The helpdesk administrators must be able to manage licenses for only the users in their respective office.\n" +
"- Users must be forced to change their password if there is a probability that the users' identity was compromised." }
      ]
    },

    CONTOSO_B: {
      title: "Litware, Inc.",
      tabs: [
        { title: "Overview", body:
"Litware, Inc. is a pharmaceutical company that has a subsidiary named Fabrikam, Inc.\n\n" +
"Litware has offices in Boston and Seattle, but has employees located across the United States. Employees connect remotely to either office by using a VPN connection." },

        { title: "Existing Environment", body:
"### Identity environment\n\n" +
"The network contains an Active Directory forest named litware.com that is linked to an Azure Active Directory (Azure AD) tenant named litware.com. Azure AD Connect uses pass-through authentication and has password hash synchronization disabled.\n\n" +
"Litware.com contains a user named User1 who oversees all application development.\n\n" +
"Litware implements Azure AD Application Proxy.\n\n" +
"Fabrikam has an Azure AD tenant named fabrikam.com. The users at Fabrikam access the resources in litware.com by using guest accounts in the litware.com tenant.\n\n" +
"### Cloud environment\n\n" +
"All the users at Litware have Microsoft 365 Enterprise E5 licenses. All the built-in anomaly detection policies in Microsoft Cloud App Security are enabled.\n\n" +
"Litware has an Azure subscription associated to the litware.com Azure AD tenant. The subscription contains an Azure Sentinel instance that uses the Azure Active Directory connector and the Office 365 connector. Azure Sentinel currently collects the Azure AD sign-ins logs and audit logs.\n\n" +
"### On-premises environment\n\n" +
"The on-premises network contains the servers shown in the following table.\n\n" +
"| Name | Operating system | Office | Description |\n|---|---|---|---|\n| DC1 | Windows Server 2019 | Boston | Domain controller for litware.com |\n| SERVER1 | Windows Server 2019 | Boston | Member server in litware.com that runs the Azure AD Application Proxy connector |\n| SERVER2 | Windows Server 2019 | Boston | Member server that uses Azure AD Connect |\n\n" +
"Both Litware offices connect directly to the internet. Both offices connect to virtual networks in the Azure subscription by using a site-to-site VPN connection. All on-premises domain controllers are prevented from accessing the internet." },

        { title: "Requirements", body:
"### Delegation requirements\n\nLitware identifies the following delegation requirements:\n\n" +
"- Delegate the management of privileged roles by using Azure AD Privileged Identity Management (PIM).\n" +
"- Prevent nonprivileged users from registering applications in the litware.com Azure AD tenant.\n" +
"- Use custom programs for Identity Governance.\n" +
"- Ensure that User1 can create enterprise applications in Azure AD. Use the principle of least privilege.\n\n" +
"### Licensing requirements\n\n" +
"Litware recently added a custom user attribute named LWLicenses to the litware.com Active Directory forest. Litware wants to manage the assignment of Azure AD licenses by modifying the value of the LWLicenses attribute. Users who have the appropriate value for LWLicenses must be added automatically to a Microsoft 365 group that has the appropriate licenses assigned.\n\n" +
"### Management requirements\n\n" +
"Litware wants to create a group named LWGroup1 that will contain all the Azure AD user accounts for Litware but exclude all the Azure AD guest accounts.\n\n" +
"### Authentication requirements\n\nLitware identifies the following authentication requirements:\n\n" +
"- Implement multi-factor authentication (MFA) for all Litware users by using conditional access policies.\n" +
"- Exempt users from using MFA to authenticate to Azure AD from the Boston office of Litware.\n" +
"- Implement a banned password list for the litware.com forest.\n" +
"- Enforce MFA when accessing on-premises applications.\n" +
"- Automatically detect and remediate externally leaked credentials.\n\n" +
"### Access requirements\n\nLitware identifies the following access requirements:\n\n" +
"- Control all access to all Azure resources and Azure AD applications by using conditional access policies.\n" +
"- Implement a conditional access policy that has session controls for Microsoft SharePoint Online.\n" +
"- Control privileged access to applications by using access reviews in Azure AD.\n\n" +
"### Monitoring requirements\n\n" +
"Litware wants to use the Fusion rule in Azure Sentinel to detect multi-staged attacks that include a combination of suspicious Azure AD sign-ins followed by anomalous Microsoft Office 365 activity." }
      ]
    }
  }
});
