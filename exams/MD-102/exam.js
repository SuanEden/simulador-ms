/* =====================================================================
   SimuladorMS — definição da prova
   Este arquivo descreve a prova (domínios, pesos, tempo, estudos de caso).
   As questões ficam em questions.js, na mesma pasta.
   ===================================================================== */
SIM.registerExam({
  code: "MD-102",
  title: "Microsoft 365 Endpoint Administrator",
  language: "en",                 // idioma das questões
  passingScore: 700,              // escala 0–1000
  defaultQuestions: 50,           // tamanho padrão do simulado
  defaultMinutes: 100,            // tempo padrão para o tamanho acima (escala proporcionalmente)
  sourceNote: "Dump ExamTopics 269Q (maio/2024) — 241 questões curadas, out/2026",

  // Skills at a glance (Study Guide oficial). Os pesos são faixas, como no site.
  domains: [
    { id: 1, name: "Prepare infrastructure for devices",                                   min: 20, max: 25 },
    { id: 2, name: "Manage and maintain devices",                                          min: 25, max: 30 },
    { id: 3, name: "Protect devices",                                                      min: 15, max: 20 },
    { id: 4, name: "Manage and secure applications",                                       min: 15, max: 20 },
    { id: 5, name: "Optimize endpoint operations by using automation, monitoring, and reporting", min: 10, max: 15 }
  ],

  // Estudos de caso: o texto fica aqui uma vez só; as questões apontam para o id.
  cases: {
    ADATUM: {
      title: "ADatum Corporation",
      tabs: [
        { title: "Overview", body:
"ADatum Corporation is a consulting company that has a main office in Montreal and branch offices in Seattle and New York.\n\nADatum has a Microsoft 365 E5 subscription." },

        { title: "Environment", body:
"### Network environment\n\nThe network contains an on-premises Active Directory domain named adatum.com. The domain contains the servers shown in the following table.\n\n" +
"| Name | Operating system | Role |\n|---|---|---|\n| DC1 | Windows Server 2019 | Domain controller |\n| Server1 | Windows Server 2016 | Member server |\n| Server2 | Windows Server 2019 | Member server |\n\n" +
"ADatum has a hybrid Azure AD tenant named adatum.com.\n\n" +
"### Users and groups\n\nThe adatum.com tenant contains the users shown in the following table.\n\n" +
"| Name | Azure AD role | Member of |\n|---|---|---|\n| User1 | Cloud Device Administrator | GroupA |\n| User2 | Azure AD Joined Device Local Administrator | GroupB |\n| User3 | Global Reader | GroupA, GroupB |\n| User4 | Global Administrator | Group1 |\n\n" +
"All users are assigned a Microsoft Office 365 license and an Enterprise Mobility + Security E3 license.\n\nEnterprise State Roaming is enabled for Group1 and GroupA.\n\nGroup1 and Group2 have a Membership type of Assigned.\n\n" +
"### Devices\n\nADatum has the Windows 10 devices shown in the following table.\n\n" +
"| Name | Type | Member of | Scope (Tags) |\n|---|---|---|---|\n| Device1 | Corporate-owned | Group1 | Default |\n| Device2 | Corporate-owned | Group1, Group2 | Tag2 |\n| Device3 | Personally-owned | Group1 | Tag1 |\n| Device4 | Personally-owned | Group2 | Tag2 |\n| Device5 | Corporate-owned | Group3 | Default |\n\n" +
"The Windows 10 devices are joined to Azure AD and enrolled in Microsoft Intune.\n\nThe Windows 10 devices are configured as shown in the following table.\n\n" +
"| Name | BitLocker Drive Encryption (BitLocker) | Secure Boot | VPN connection |\n|---|---|---|---|\n| Device1 | Yes | No | VPN1 |\n| Device2 | Yes | Yes | VPN1, VPN3 |\n| Device3 | No | No | VPN3 |\n| Device4 | No | Yes | None |\n| Device5 | Yes | No | None |\n\n" +
"All the Azure AD joined devices have an executable file named C:\\AppA.exe and a folder named D:\\Folder1." },

        { title: "Intune configuration", body:
"### Compliance policies\n\nMicrosoft Intune has the compliance policies shown in the following table.\n\n" +
"| Name | Configuration | Assignment |\n|---|---|---|\n| Policy1 | Require BitLocker only | Group1 |\n| Policy2 | Require Secure Boot only | Group1 |\n| Policy3 | Require BitLocker and Secure Boot | Group2 |\n\n" +
"The Compliance policy settings are configured as follows:\n\n" +
"| Setting | Value |\n|---|---|\n| Mark devices with no compliance policy assigned as | **Compliant** |\n| Enhanced jailbreak detection | Disabled |\n| Compliance status validity period (days) | 30 |\n\n" +
"### Automatic enrollment\n\n- MDM user scope: GroupA\n- MAM user scope: GroupB\n\n" +
"### Endpoint protection\n\nYou have an Endpoint protection configuration profile that has the following Controlled folder access settings:\n\n- Name: Protection1\n- Folder protection: Enable\n- List of apps that have access to protected folders: C:\\*\\AppA.exe\n- List of additional folders that need to be protected: D:\\Folder1\n- Assignments — Included groups: Group2, GroupB\n\n" +
"### Windows Autopilot configuration\n\nADatum has a Windows Autopilot deployment profile configured as follows:\n\n" +
"| Setting | Value |\n|---|---|\n| Name | Profile1 |\n| Convert all targeted devices to Autopilot | Yes |\n| Device type | Windows PC |\n| Deployment mode | User-Driven |\n| Join to Azure AD as | Azure AD joined |\n| Skip AD connectivity check (preview) | No |\n| Language (Region) | Operating system default |\n| Automatically configure keyboard | Yes |\n| Microsoft Software License Terms | Hide |\n| Privacy settings | Hide |\n| Hide change account options | Hide |\n| User account type | Standard |\n| Allow White Glove OOBE | No |\n| Apply device name template | No |\n| Included groups | Group1 |\n| Excluded groups | Group2 |\n\n" +
"Currently, there are no devices deployed by using Windows Autopilot.\n\nThe Intune connector for Active Directory is installed on Server1." },

        { title: "Requirements", body:
"### Planned changes\n\nADatum plans to implement the following changes:\n\n" +
"- Purchase a new Windows 10 device named Device6 and enroll the device in Intune.\n- New computers will be deployed by using Windows Autopilot and will be hybrid Azure AD joined.\n" +
"- Deploy a network boundary configuration profile that will have the following settings:\n  - Name: Boundary1\n  - Network boundary: 192.168.1.0/24\n  - Scope tags: Tag1\n  - Assignments — Included groups: Group1, Group2\n" +
"- Deploy two VPN configuration profiles named Connection1 and Connection2 that will have the following settings:\n  - Connection1 — Connection name: VPN1 · Connection type: L2TP · Included groups: Group1, Group2, GroupA · Excluded groups: none\n  - Connection2 — Connection name: VPN2 · Connection type: IKEv2 · Included groups: GroupA · Excluded groups: GroupB\n\n" +
"### Technical requirements\n\nADatum must meet the following technical requirements:\n\n- Users in GroupA must be able to deploy new computers.\n- Administrative effort must be minimized." }
      ]
    },
    CONTOSO: {
      title: "Contoso, Ltd.",
      tabs: [
        { title: "Overview", body:
"Contoso, Ltd. is a consulting company that has a main office in Montreal and two branch offices in Seattle and New York.\n\nContoso has the users and computers shown in the following table.\n\n" +
"| Location | Users | Laptops | Desktop computers | Mobile devices |\n|---|---|---|---|---|\n| Montreal | 2,500 | 2,800 | 300 | 3,100 |\n| Seattle | 1,000 | 1,100 | 200 | 1,500 |\n| New York | 300 | 320 | 30 | 400 |\n\n" +
"The company has IT, human resources (HR), legal (LEG), marketing (MKG), and finance (FIN) departments.\n\nContoso recently purchased a Microsoft 365 subscription.\n\nThe company is opening a new branch office in Phoenix. Most of the users in the Phoenix office will work from home." },
        { title: "Existing environment", body:
"The network contains an Active Directory domain named contoso.com that is synced to Azure AD.\n\nAll member servers run Windows Server 2016. All laptops and desktop computers run Windows 10 Enterprise.\n\nThe computers are managed by using Microsoft Configuration Manager. The mobile devices are managed by using Microsoft Intune.\n\nThe naming convention for the computers is the department acronym, followed by a hyphen, and then four numbers, for example FIN-6785. All the computers are joined to the on-premises Active Directory domain.\n\nEach department has an organizational unit (OU) that contains a child OU named Computers. Each computer account is in the Computers OU of its respective department." },
        { title: "Intune configuration", body:
"The domain has the users shown in the following table.\n\n| Name | Role | Member of |\n|---|---|---|\n| User1 | Intune administrator | GroupA |\n| User2 | None | GroupB |\n\nUser2 is a device enrollment manager (DEM) in Intune.\n\nThe devices enrolled in Intune are shown in the following table.\n\n" +
"| Name | Platform | Encryption | Member of |\n|---|---|---|---|\n| Device1 | Android | Disabled | Group1 |\n| Device2 | iOS | Not applicable | Group2, Group3 |\n| Device3 | Android | Disabled | Group2, Group3 |\n| Device4 | iOS | Not applicable | Group2 |\n\n" +
"The device compliance policies in Intune are configured as shown in the following table.\n\n| Name | Platform | Require encryption | Assigned |\n|---|---|---|---|\n| Policy1 | Android | Not configured | Yes |\n| Policy2 | iOS | Not applicable | Yes |\n| Policy3 | Android | Require | Yes |\n\n" +
"The device compliance policies have the assignments shown in the following table.\n\n| Name | Include | Exclude |\n|---|---|---|\n| Policy1 | Group3 | None |\n| Policy2 | Group2 | Group3 |\n| Policy3 | Group1 | None |\n\n" +
"The device limit restrictions in Intune are configured as shown in the following table.\n\n| Priority | Name | Device limit | Assigned to |\n|---|---|---|---|\n| 1 | Restriction1 | 15 | GroupB |\n| 2 | Restriction2 | 10 | GroupA |\n| Default | All users | 5 | All users |" },
        { title: "Requirements", body:
"### Planned changes\n\nContoso plans to implement the following changes:\n\n- Provide new computers to the Phoenix office users. The new computers have Windows 10 Pro preinstalled and were purchased already.\n- Implement co-management for the computers.\n\n" +
"### Technical requirements\n\nContoso must meet the following technical requirements:\n\n- Ensure that the users in a group named Group4 can only access Microsoft Exchange Online from devices that are enrolled in Intune.\n- Deploy Windows 10 Enterprise to the computers of the Phoenix office users by using Windows Autopilot.\n- Create a provisioning package for new computers in the HR department.\n- Block iOS devices from sending diagnostic and usage telemetry data.\n- Use the principle of least privilege whenever possible.\n- Enable the users in the MKG department to use App1.\n- Pilot co-management for the IT department." }
      ]
    }
  }
});
