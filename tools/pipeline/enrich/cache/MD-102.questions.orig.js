/* =====================================================================
   SimuladorMS — banco de questões MD-102
   Fonte: dump "Simulator MD-102 -- 269Q" (ExamTopics, mai/2024) — curadoria Claude, out/2026.
   241 questões estruturadas (das 269 do dump; 28 ficaram de fora por escopo:
   MDT, WDS, USMT e Windows Admin Center, que saíram do exame).

   Campos de curadoria:
     scope   in | borderline | out        → o simulado usa só "in" (borderline é opcional)
     review  ok | corrigida | duvidosa    → corrigida = gabarito do dump foi alterado
     answer_original                      → o que o dump marcava, quando difere
   ===================================================================== */
SIM.registerQuestions("MD-102", [
  {
    "id": "Q001",
    "src": 1,
    "domain": 3,
    "topic": "Controlled folder access",
    "type": "yesno",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "For each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can create a file named D:\\Folder1\\file1.txt on Device4 by using Notepad.",
      "User2 can remove D:\\Folder1 from the list of protected folders on Device2.",
      "User3 can create a file named C:\\Users\\User3\\Desktop\\file1.txt on Device2 by running a custom Windows PowerShell script."
    ],
    "answer": [
      false,
      false,
      false
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Protection1 (Controlled folder access) se aplica a Group2 (Device2, Device4) e GroupB. Só C:\\*\\AppA.exe está na lista de apps permitidos; D:\\Folder1 e as pastas padrão (como Desktop) ficam protegidas. A configuração vem do Intune, então nem um admin local consegue removê-la no dispositivo. **Ponto de discussão:** o Controlled folder access também permite apps que a Microsoft considera confiáveis (como o Notepad), o que leva parte da comunidade a marcar Sim na primeira afirmação. O gabarito do dump é Não/Não/Não."
  },
  {
    "id": "Q002",
    "src": 2,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "Which devices are registered by using the Windows Autopilot deployment service?",
    "options": [
      "Device1 only",
      "Device3 only",
      "Device1 and Device3 only",
      "Device1, Device2, and Device3"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Profile1 tem **Convert all targeted devices to Autopilot = Yes**, incluído para Group1 (Device1, Device2, Device3) e excluindo Group2 (Device2, Device4). Sobram Device1 e Device3, mas a conversão só registra dispositivos **corporativos** — Device3 é pessoal. Resultado: só Device1.",
    "refs": [
      "https://learn.microsoft.com/en-us/autopilot/existing-devices"
    ]
  },
  {
    "id": "Q003",
    "src": 3,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "yesno",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
    "statements": [
      "Device1 is marked as compliant.",
      "Device4 is marked as compliant.",
      "Device5 is marked as compliant."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Device1 (Group1) recebe Policy1 e Policy2: tem BitLocker, mas **não** tem Secure Boot → não conforme. Device4 (Group2) recebe Policy3, que exige BitLocker, e ele não tem → não conforme. Device5 (Group3) não recebe nenhuma política, e o tenant está configurado para marcar dispositivos sem política como **Compliant** → conforme."
  },
  {
    "id": "Q004",
    "src": 4,
    "domain": 2,
    "topic": "Device configuration profiles",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "You implement Boundary1 based on the planned changes.\n\nWhich devices have a network boundary of 192.168.1.0/24 applied?",
    "options": [
      "Device2 only",
      "Device3 only",
      "Device1, Device2, and Device5 only",
      "Device1, Device2, Device3, and Device4 only"
    ],
    "answer": 3,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Boundary1 é atribuído a Group1 (Device1, Device2, Device3) e Group2 (Device2, Device4). **Scope tags não filtram a atribuição** — elas só controlam quais administradores enxergam o objeto. Logo, Device1 a Device4."
  },
  {
    "id": "Q005",
    "src": 5,
    "domain": 4,
    "topic": "App protection policies",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription.\n\nYou use Microsoft Intune Suite to manage devices.\n\nYou have the iOS app protection policy shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "exhibits": [
      {
        "src": "img/Q005-1.png",
        "alt": "Política de proteção de app iOS — Access requirements e Conditional launch"
      }
    ],
    "slots": [
      {
        "label": "After 30 minutes of inactivity, a user will be prompted for their",
        "options": [
          "account credentials only",
          "PIN only",
          "PIN and account credentials"
        ],
        "answer": 2
      },
      {
        "label": "Entering the wrong PIN five times will",
        "options": [
          "block access",
          "reset the app PIN",
          "reset the device PIN",
          "wipe company data"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Com **Recheck the access requirements after 30 minutes** e **Work or school account credentials for access = Require**, após 30 minutos de inatividade o app volta a exigir os requisitos de acesso: PIN e credenciais. Max PIN attempts = 5 com ação **Reset PIN** força o usuário a redefinir o PIN do app.",
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/apps/app-protection-policy-settings-ios"
    ]
  },
  {
    "id": "Q006",
    "src": 6,
    "domain": 4,
    "topic": "Microsoft 365 Apps",
    "type": "order",
    "stem": "You have a Microsoft 365 E5 subscription and a computer that runs Windows 11.\n\nYou need to create a customized installation of Microsoft 365 Apps for enterprise.\n\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
    "pool": [
      "Run setup.exe and specify the /packager switch.",
      "Download the Microsoft Office Deployment Tool (ODT) and run the self-extracting executable (.exe) file.",
      "Edit the XML configuration file.",
      "Run setup.exe and specify the /download switch.",
      "Run setup.exe and specify the /configure switch."
    ],
    "answer": [
      1,
      2,
      3,
      4
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Fluxo do ODT: baixar e extrair o ODT → editar o XML de configuração → `setup.exe /download` para baixar os binários → `setup.exe /configure` para instalar. O /packager gera pacote App-V, que não é o caso."
  },
  {
    "id": "Q007",
    "src": 7,
    "domain": 4,
    "topic": "App configuration policies",
    "type": "single",
    "stem": "You have devices enrolled in Microsoft Intune as shown in the following table.\n\n| Name | Platform |\n|---|---|\n| Device1 | Windows 10 |\n| Device2 | Windows 11 |\n| Device3 | Android |\n| Device4 | iOS |\n\nOn which devices can you apply app configuration policies?",
    "options": [
      "Device2 only",
      "Device1 and Device2 only",
      "Device3 and Device4 only",
      "Device2, Device3, and Device4 only",
      "Device1, Device2, Device3, and Device4"
    ],
    "answer": 2,
    "shuffle": false,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "App configuration policies para **dispositivos gerenciados** existem para Android e iOS/iPadOS. Atenção: desde 2023 há app config para **Windows (Edge via MAM)**, mas ela é para dispositivos **não inscritos**. Como os quatro dispositivos aqui estão inscritos, C continua sendo a resposta mais defensável — mas a questão ficou desatualizada e vale conferir a discussão no ExamTopics."
  },
  {
    "id": "Q008",
    "src": 8,
    "domain": 4,
    "topic": "App protection policies",
    "type": "hotarea",
    "stem": "You have an Azure AD tenant named contoso.com that contains the devices shown in the following table.\n\n| Name | Operating system |\n|---|---|\n| Device1 | Windows 10 |\n| Device2 | Android 8.0 |\n| Device3 | Android 9 |\n| Device4 | iOS 11.0 |\n| Device5 | iOS 11.4.1 |\n\nAll devices contain an app named App1 and are enrolled in Microsoft Intune.\n\nYou need to prevent users from copying data from App1 and pasting the data into other apps.\n\nWhich type of policy and how many policies should you create in Intune? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Policy type:",
        "options": [
          "App configuration policy",
          "App protection policy",
          "Conditional access policy",
          "Device compliance policy"
        ],
        "answer": 1
      },
      {
        "label": "Minimum number of policies:",
        "options": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Restringir copiar/colar entre apps é função da **app protection policy**, e cada política é por plataforma: Windows, Android e iOS → **3 políticas**. Versões diferentes do mesmo SO não exigem políticas separadas."
  },
  {
    "id": "Q009",
    "src": 9,
    "domain": 4,
    "topic": "Win32 apps",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices.\n\nYou plan to deploy two apps named App1 and App2 to all Windows devices. App1 must be installed before App2.\n\nFrom the Intune admin center, you create and deploy two Windows app (Win32) apps.\n\nYou need to ensure that App1 is installed before App2 on every device.\n\nWhat should you configure?",
    "options": [
      "the App1 deployment configurations",
      "a dynamic device group",
      "a detection rule",
      "the App2 deployment configurations"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "A **dependência** é configurada no app que depende do outro: em **App2 > Dependencies** adiciona-se App1. O Intune instala App1 antes."
  },
  {
    "id": "Q010",
    "src": 10,
    "domain": 4,
    "topic": "App configuration policies",
    "type": "single",
    "stem": "You have a Microsoft Intune subscription.\n\nYou have devices enrolled in Intune as shown in the following table.\n\n| Name | Operating system |\n|---|---|\n| Device1 | Android 8.1.0 |\n| Device2 | Android 9 |\n| Device3 | iOS 11.4.1 |\n| Device4 | iOS 12.3.1 |\n| Device5 | iOS 12.3.2 |\n\nAn app named App1 is installed on each device.\n\nWhat is the minimum number of app configuration policies required to manage App1?",
    "options": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "App configuration policies são criadas **por plataforma**. Uma para Android e uma para iOS/iPadOS → **2**. Versões diferentes do mesmo SO não exigem políticas separadas."
  },
  {
    "id": "Q011",
    "src": 11,
    "domain": 4,
    "topic": "Line-of-business apps",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains 100 iOS devices enrolled in Microsoft Intune.\n\nYou need to deploy a custom line-of-business (LOB) app to the devices by using Intune.\n\nWhich extension should you select for the app package file?",
    "options": [
      ".intunemac",
      ".ipa",
      ".apk",
      ".appx"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Apps LOB de iOS/iPadOS são pacotes **.ipa**. .apk é Android, .appx é Windows e .intunemac era o formato antigo de macOS."
  },
  {
    "id": "Q012",
    "src": 12,
    "domain": 1,
    "topic": "Conditional Access",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains a user named User1 and a web app named App1.\n\nApp1 must only accept modern authentication requests.\n\nYou plan to create a Conditional Access policy named CAPolicy1 that will have the following settings:\n\n- Assignments — Users or workload identities: User1\n- Cloud apps or actions: App1\n- Access controls — Grant: Block access\n\nYou need to block only legacy authentication requests to App1.\n\nWhich condition should you add to CAPolicy1?",
    "options": [
      "Filter for devices",
      "Device platforms",
      "User risk",
      "Sign-in risk",
      "Client apps"
    ],
    "answer": 4,
    "scope": "in",
    "review": "ok",
    "explanation": "A condição **Client apps** separa autenticação moderna (browser, apps móveis e desktop) de **legacy authentication clients** (Exchange ActiveSync e outros). Marcando só os legados com Block, a autenticação moderna continua permitida."
  },
  {
    "id": "Q013",
    "src": 13,
    "domain": 4,
    "topic": "Microsoft 365 Apps admin center",
    "type": "multi",
    "layout": "panel",
    "stem": "All users have Microsoft 365 apps deployed.\n\nYou need to configure Microsoft 365 apps to meet the following requirements:\n\n- Enable the automatic installation of WebView2 Runtime.\n- Prevent users from submitting feedback.\n\nWhich two settings should you configure in the Microsoft 365 Apps admin center? To answer, select the appropriate settings in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "panelTitle": "Microsoft 365 Apps admin center",
    "options": [
      "Home",
      "Servicing › Monthly Enterprise",
      "Customization › Device Configuration",
      "Customization › Policy Management",
      "Customization › What's New Management",
      "Health › Apps Health",
      "Health › Security Update Status",
      "Health › OneDrive Sync",
      "Health › Service Health",
      "Inventory",
      "Learn More",
      "Setup"
    ],
    "answer": [
      2,
      3
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "A instalação automática do WebView2 é uma das **Modern App Settings** em **Device Configuration**. Bloquear o envio de feedback é uma política de nuvem do Office (Cloud Policy), configurada em **Policy Management**."
  },
  {
    "id": "Q014",
    "src": 14,
    "domain": 4,
    "topic": "Microsoft 365 Apps",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription.\n\nYou have 10 computers that run Windows 10 and are enrolled in mobile device management (MDM).\n\nYou need to deploy the Microsoft 365 Apps for enterprise suite to all the computers.\n\nWhat should you do?",
    "options": [
      "From the Microsoft Intune admin center, create a Windows 10 device profile.",
      "From Azure AD, add an app registration.",
      "From Azure AD, add an enterprise application.",
      "From the Microsoft Intune admin center, add an app."
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "No Intune, o Microsoft 365 Apps é adicionado como app (**Apps > Add > Microsoft 365 Apps for Windows 10 and later**) e atribuído aos dispositivos. App registration e enterprise application são objetos de identidade, não de instalação."
  },
  {
    "id": "Q015",
    "src": 15,
    "domain": 2,
    "topic": "Device lifecycle",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices.\n\nYou have a Windows 11 device named Device1 that is enrolled in Intune. Device1 has been offline for 30 days.\n\nYou need to remove Device1 from Intune immediately. The solution must ensure that if the device checks in again, any apps and data provisioned by Intune are removed. User-installed apps, personal data, and OEM-installed apps must be retained.\n\nWhat should you use?",
    "options": [
      "a Delete action",
      "a Retire action",
      "a Fresh Start action",
      "an Autopilot Reset action"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "**Delete** tira o dispositivo do Intune na hora, e na próxima vez que ele fizer check-in os dados e apps da empresa são removidos (efeito de Retire). Um **Retire** num dispositivo offline fica pendente até o check-in, então não remove \"imediatamente\". Fresh Start e Autopilot Reset apagam apps do usuário.",
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/remote-actions/devices-wipe"
    ]
  },
  {
    "id": "Q016",
    "src": 16,
    "domain": 5,
    "topic": "Endpoint analytics",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices.\n\nYou need to review the startup times and restart frequencies of the devices.\n\nWhat should you use?",
    "options": [
      "Azure Monitor",
      "Intune Data Warehouse",
      "Microsoft Defender for Endpoint",
      "Endpoint analytics"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O relatório **Startup performance** do **Endpoint analytics** mostra tempo de boot/login e frequência de reinicializações.",
    "refs": [
      "https://learn.microsoft.com/en-us/mem/analytics/overview"
    ]
  },
  {
    "id": "Q017",
    "src": 17,
    "domain": 2,
    "topic": "Windows update rings",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou create a new update rings policy named Policy1 as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "exhibits": [
      {
        "src": "img/Q017-1.png",
        "alt": "Configurações do anel de atualização Policy1"
      }
    ],
    "slots": [
      {
        "label": "Updates that contain fixes and improvements to existing Windows functionality [answer choice]",
        "options": [
          "can be deferred indefinitely",
          "can be deferred for 30 days",
          "will be installed immediately"
        ],
        "answer": 2
      },
      {
        "label": "Updates that contain new Windows functionality will be installed within [answer choice] of release",
        "options": [
          "1 day",
          "30 days",
          "60 days"
        ],
        "answer": 2
      }
    ],
    "answer_original": [
      2,
      1
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "Quality updates: adiamento 0 e deadline 0 → instalação imediata. Feature updates: adiamento de **30 dias** e deadline de **30 dias**. O deadline começa a contar quando a atualização é **oferecida** ao dispositivo (ou seja, depois do adiamento), então o prazo total é de até **60 dias** após o lançamento. O dump marcava 30 dias.",
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/protect/windows-10-update-rings"
    ]
  },
  {
    "id": "Q018",
    "src": 18,
    "domain": 5,
    "topic": "Log Analytics",
    "type": "single",
    "stem": "You have computers that run Windows 10 and connect to an Azure Log Analytics workspace. The workspace is configured to collect all available events from the Windows event logs.\n\nThe computers have the logged events shown in the following table.\n\n| Event ID | Log | Type | Computer |\n|---|---|---|---|\n| 1 | Application | Success | Computer1 |\n| 2 | System | Information | Computer1 |\n| 3 | Security | Audit Success | Computer2 |\n| 4 | System | Error | Computer2 |\n\nWhich events are collected in the Log Analytics workspace?",
    "options": [
      "1 only",
      "2 and 3 only",
      "1 and 3 only",
      "1, 2, and 4 only",
      "1, 2, 3, and 4"
    ],
    "answer": 3,
    "shuffle": false,
    "scope": "borderline",
    "review": "ok",
    "explanation": "A fonte de dados **Windows event logs** do agente clássico (MMA) coleta Application, System e outros logs, mas **não o Security log** (que exige Microsoft Sentinel/Defender for Cloud). Por isso, 1, 2 e 4. Com o Azure Monitor Agent e DCRs atuais é possível coletar Security, então a questão é do modelo antigo — por isso está como borderline."
  },
  {
    "id": "Q019",
    "src": 19,
    "domain": 2,
    "topic": "Android Enterprise",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains 10 Android Enterprise devices. Each device has a corporate-owned work profile and is enrolled in Microsoft Intune.\n\nYou need to configure the devices to run a single app in kiosk mode.\n\nWhich Configuration settings should you modify in the device restrictions profile?",
    "options": [
      "Users and Accounts",
      "General",
      "System security",
      "Device experience"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "No perfil de device restrictions para Android Enterprise corporativo, o modo quiosque (single app / multi app) fica em **Device experience**. Na prática, quiosque é para dispositivos **dedicated**; mesmo assim, entre as opções, Device experience é a categoria correta."
  },
  {
    "id": "Q020",
    "src": 20,
    "domain": 3,
    "topic": "Defender for Endpoint (macOS)",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains 500 macOS devices enrolled in Microsoft Intune.\n\nYou need to ensure that you can apply Microsoft Defender for Endpoint antivirus policies to the macOS devices. The solution must minimize administrative effort.\n\nWhat should you do?",
    "options": [
      "Onboard the macOS devices to the Microsoft Purview compliance portal.",
      "From the Microsoft Intune admin center, create a security baseline.",
      "Install Defender for Endpoint on the macOS devices.",
      "From the Microsoft Intune admin center, create a configuration profile."
    ],
    "answer": 3,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O onboarding do Defender no macOS via Intune é feito com **perfis de configuração** (system extensions, full disk access, network filter e o pacote de onboarding), além do app. O gabarito do dump marca D. Parte da comunidade defende C (instalar o Defender), já que a política de antivírus só tem efeito com o agente instalado — vale conferir a discussão."
  },
  {
    "id": "Q021",
    "src": 21,
    "domain": 3,
    "topic": "Defender Antivirus & Firewall",
    "type": "multi",
    "stem": "You have an Azure AD tenant and 100 Windows 10 devices that are Azure AD joined and managed by using Microsoft Intune.\n\nYou need to configure Microsoft Defender Firewall and Microsoft Defender Antivirus on the devices. The solution must minimize administrative effort.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "To configure Microsoft Defender Antivirus, create a Group Policy Object (GPO) and configure the Windows Defender Antivirus settings.",
      "To configure Microsoft Defender Firewall, create a device configuration profile and configure the Device restrictions settings.",
      "To configure Microsoft Defender Antivirus, create a device configuration profile and configure the Endpoint protection settings.",
      "To configure Microsoft Defender Antivirus, create a device configuration profile and configure the Device restrictions settings.",
      "To configure Microsoft Defender Firewall, create a device configuration profile and configure the Endpoint protection settings.",
      "To configure Microsoft Defender Firewall, create a Group Policy Object (GPO) and configure Windows Defender Firewall with Advanced Security."
    ],
    "answer": [
      3,
      4
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Nos templates clássicos, o **Defender Antivirus** fica em **Device restrictions** e o **Firewall** em **Endpoint protection**. GPO não se aplica a dispositivos só Entra joined. (Hoje o caminho preferido é Endpoint security > Antivirus/Firewall, mas a questão usa os templates.)"
  },
  {
    "id": "Q022",
    "src": 22,
    "domain": 2,
    "topic": "Device configuration profiles",
    "type": "single",
    "stem": "You have an Azure AD group named Group1. Group1 contains two Windows 10 Enterprise devices named Device1 and Device2.\n\nYou create a device configuration profile named Profile1. You assign Profile1 to Group1.\n\nYou need to ensure that Profile1 applies to Device1 only.\n\nWhat should you modify in Profile1?",
    "options": [
      "Assignments",
      "Settings",
      "Scope (Tags)",
      "Applicability Rules"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Restringir a um único dispositivo é feito nas **Assignments** (excluir Device2 por grupo ou atribuir a um grupo só com Device1). Applicability rules filtram por edição/versão do SO — os dois são Windows 10 Enterprise, então não diferenciam."
  },
  {
    "id": "Q023",
    "src": 23,
    "domain": 3,
    "topic": "Defender for Endpoint",
    "type": "match",
    "stem": "You have a Microsoft 365 subscription that includes Microsoft Intune.\n\nYou need to implement a Microsoft Defender for Endpoint solution that meets the following requirements:\n\n- Enforces compliance for Defender for Endpoint by using Conditional Access\n- Prevents suspicious scripts from running on devices\n\nWhat should you configure? To answer, drag the appropriate features to the correct requirements. Each feature may be used once, more than once, or not at all.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "A device restriction policy",
      "A security baseline",
      "An attack surface reduction (ASR) rule",
      "An Intune connection"
    ],
    "targets": [
      {
        "label": "Enforces compliance:",
        "answer": 3
      },
      {
        "label": "Prevents suspicious scripts:",
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A **conexão Intune ↔ Defender for Endpoint** permite usar o risco de máquina na conformidade e no Conditional Access. Bloquear scripts suspeitos (ofuscados, JS/VBS baixando executáveis) é função das **regras de ASR**."
  },
  {
    "id": "Q024",
    "src": 24,
    "domain": 2,
    "topic": "Device restrictions",
    "type": "single",
    "stem": "Your network contains an on-premises Active Directory domain and an Azure AD tenant.\n\nThe Default Domain Policy Group Policy Object (GPO) contains the settings shown in the following table.\n\n| Name | GPO value |\n|---|---|\n| LockoutBadCount | 0 |\n| MaximumPasswordAge | 42 |\n| MinimumPasswordAge | 1 |\n| MinimumPasswordLength | 7 |\n| PasswordComplexity | True |\n| PasswordHistorySize | 24 |\n\nYou need to migrate the existing Default Domain Policy GPO settings to a device configuration profile.\n\nWhich device configuration profile type template should you use?",
    "options": [
      "Administrative Templates",
      "Endpoint protection",
      "Device restrictions",
      "Custom"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Configurações de senha local (tamanho, complexidade, expiração, histórico) ficam na seção **Password** do template **Device restrictions**. Administrative Templates cobre os ADMX (não inclui a política de senha da conta)."
  },
  {
    "id": "Q025",
    "src": 25,
    "domain": 5,
    "topic": "Log Analytics",
    "type": "multi",
    "stem": "You have 100 computers that run Windows 10 and connect to an Azure Log Analytics workspace.\n\nWhich three types of data can you collect from the computers by using Log Analytics? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "failure events from the Security log",
      "the list of processes and their execution times",
      "the average processor utilization",
      "error events from the System log",
      "third-party application logs stored as text files"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "shuffle": false,
    "scope": "borderline",
    "review": "duvidosa",
    "explanation": "O gabarito do dump é B, C e D: processos (via VM insights/Service Map), contadores de desempenho e eventos do System log. O Security log não é coletado pela fonte \"Windows event logs\" do agente clássico. A opção E é controversa, porque logs de texto podem ser coletados como **custom logs** — por isso a questão está marcada como duvidosa e borderline (modelo do agente MMA)."
  },
  {
    "id": "Q026",
    "src": 26,
    "domain": 3,
    "topic": "Defender for Endpoint",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription. The subscription contains 25 computers that run Windows 11 and are enrolled in Microsoft Intune.\n\nYou need to onboard the devices to Microsoft Defender for Endpoint.\n\nWhat should you create in the Microsoft Intune admin center?",
    "options": [
      "an attack surface reduction (ASR) policy",
      "a security baseline",
      "an endpoint detection and response (EDR) policy",
      "an account protection policy",
      "an antivirus policy"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O onboarding em massa pelo Intune é feito com uma política de **Endpoint detection and response (EDR)**, que entrega o pacote de onboarding do conector."
  },
  {
    "id": "Q027",
    "src": 27,
    "domain": 1,
    "topic": "Enrollment restrictions",
    "type": "multi",
    "stem": "Your company uses Microsoft Intune to manage devices.\n\nYou need to ensure that only Android devices that use Android work profiles can enroll in Intune.\n\nWhich two configurations should you perform in the device enrollment restrictions? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "From Platform Settings, set Android device administrator Personally Owned to Block.",
      "From Platform Settings, set Android Enterprise (work profile) to Allow.",
      "From Platform Settings, set Android device administrator Personally Owned to Allow.",
      "From Platform Settings, set Android device administrator to Block."
    ],
    "answer": [
      1,
      3
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Permita a plataforma **Android Enterprise (work profile)** e bloqueie a plataforma **Android device administrator** inteira. Bloquear só o \"Personally Owned\" do device administrator ainda deixaria corporativos entrarem por esse método.",
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/enrollment/enrollment-restrictions-set"
    ]
  },
  {
    "id": "Q028",
    "src": 28,
    "domain": 2,
    "topic": "Kiosk",
    "type": "hotarea",
    "stem": "You have the device configuration profile shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "exhibits": [
      {
        "src": "img/Q028-1.png",
        "alt": "Perfil Kiosk: single app, Edge, Public Browsing (InPrivate), URL https://contoso.com"
      }
    ],
    "slots": [
      {
        "label": "Users [answer choice].",
        "options": [
          "can access any URL",
          "cannot view the address bar in Microsoft Edge",
          "can only access URLs that include contoso.com",
          "can only access URLs that start with https://contoso.com"
        ],
        "answer": 0
      },
      {
        "label": "Windows 10 and later devices can have [answer choice].",
        "options": [
          "a single Microsoft Edge instance that has a single tab",
          "a single Microsoft Edge instance that has multiple tabs",
          "multiple Microsoft Edge instances that have multiple tabs",
          "multiple Microsoft Edge instances that each has a single tab"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "No modo **Public Browsing (InPrivate)**, o Edge roda em quiosque com navegação **multiaba** e barra de endereços, sem restringir URLs (a Edge Kiosk URL é só a página inicial). Como é **single app**, existe uma única instância do Edge."
  },
  {
    "id": "Q029",
    "src": 29,
    "domain": 2,
    "topic": "Delivery Optimization",
    "type": "hotarea",
    "stem": "You have 100 Windows 10 devices enrolled in Microsoft Intune.\n\nYou need to configure the devices to retrieve Windows updates from the internet and from other computers on a local network.\n\nWhich Delivery Optimization setting should you configure, and which type of Intune object should you create? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Delivery Optimization setting:",
        "options": [
          "Bandwidth optimization type",
          "Download mode",
          "VPN peer caching"
        ],
        "answer": 1
      },
      {
        "label": "Intune object:",
        "options": [
          "A configuration profile",
          "App configuration policies",
          "Windows 10 and later quality updates",
          "Windows 10 and later update rings"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "**Download mode** define se o dispositivo usa peers (LAN, grupo, internet). O Delivery Optimization é configurado num **perfil de configuração** (template Delivery Optimization ou Settings catalog).",
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/configuration/delivery-optimization-windows"
    ]
  },
  {
    "id": "Q030",
    "src": 30,
    "domain": 2,
    "topic": "Custom notifications",
    "type": "yesno",
    "stem": "You have an Azure AD tenant that contains the users shown in the following table.\n\n| Name | Member of |\n|---|---|\n| User1 | Group1 |\n| User2 | Group2 |\n\nYou have devices enrolled in Microsoft Intune as shown in the following table.\n\n| Name | Platform | Member of |\n|---|---|---|\n| Device1 | Windows 10 | Group1 |\n| Device2 | Android | Group1 |\n| Device3 | iOS | Group2 |\n\nFrom Intune, you create and send a custom notification named Notification1 to Group1.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 receives Notification1 on Device1.",
      "User2 receives Notification1 on Device2.",
      "User1 receives Notification1 on Device3."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Custom notifications são enviadas a **grupos de usuários** e chegam pelo Company Portal / app Intune em **iOS/iPadOS e Android** — não em Windows. User1 está em Group1: não recebe no Device1 (Windows), mas recebe no Device3 (iOS). User2 não está em Group1, então não recebe."
  },
  {
    "id": "Q031",
    "src": 31,
    "domain": 5,
    "topic": "Intune Data Warehouse",
    "type": "single",
    "stem": "You use Microsoft Intune and Intune Data Warehouse.\n\nYou need to create a device inventory report that includes the data stored in the data warehouse.\n\nWhat should you use to create the report?",
    "options": [
      "the Company Portal app",
      "Endpoint analytics",
      "the Azure portal app",
      "Microsoft Power BI"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O Data Warehouse expõe um feed OData consumido pelo **Power BI** (há inclusive um app pronto do Intune Compliance)."
  },
  {
    "id": "Q032",
    "src": 32,
    "domain": 1,
    "topic": "Apple enrollment",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription and 25 Apple iPads.\n\nYou need to enroll the iPads in Microsoft Intune by using the Apple Configurator enrollment method.\n\nWhat should you do first?",
    "options": [
      "Configure an Apple MDM push certificate.",
      "Add your user account as a device enrollment manager (DEM).",
      "Modify the enrollment restrictions.",
      "Upload a file that has the device identifiers for each iPad."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Qualquer inscrição de iOS/iPadOS (Apple Configurator, ADE, Company Portal) depende primeiro do **Apple MDM push certificate**. Sem ele o Intune não gerencia nenhum dispositivo Apple."
  },
  {
    "id": "Q033",
    "src": 33,
    "domain": 2,
    "topic": "Windows Update for Business",
    "type": "hotarea",
    "stem": "You have 100 computers that run Windows 10. You have no servers. All the computers are joined to Azure AD.\n\nThe computers have different update settings, and some computers are configured for manual updates.\n\nYou need to configure Windows Update. The solution must meet the following requirements:\n\n- The configuration must be managed from a central location.\n- Internet traffic must be minimized.\n- Costs must be minimized.\n\nHow should you configure Windows Update? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Windows Update technology to use:",
        "options": [
          "Windows Server Update Services (WSUS)",
          "Microsoft Configuration Manager",
          "Windows Update for Business"
        ],
        "answer": 2
      },
      {
        "label": "Manage the configuration by using:",
        "options": [
          "A Group Policy object (GPO)",
          "Microsoft Configuration Manager",
          "Microsoft Intune"
        ],
        "answer": 2
      },
      {
        "label": "Manage the traffic by using:",
        "options": [
          "Delivery Optimization",
          "BranchCache",
          "Peer cache"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Sem servidores e com dispositivos só Entra joined, a combinação é **Windows Update for Business** gerenciado pelo **Intune**, com **Delivery Optimization** para reduzir tráfego de internet (peers na LAN). WSUS, ConfigMgr e GPO exigem infraestrutura on-premises."
  },
  {
    "id": "Q034",
    "src": 34,
    "domain": 2,
    "topic": "Delivery Optimization",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains 150 hybrid Azure AD joined Windows devices. All the devices are enrolled in Microsoft Intune.\n\nYou need to configure Delivery Optimization on the devices to meet the following requirements:\n\n- Allow downloads from the internet and from other computers on the local network.\n- Limit the percentage of used bandwidth to 50.\n\nWhat should you use?",
    "options": [
      "a configuration profile",
      "a Windows Update for Business Group Policy setting",
      "a Microsoft Peer-to-Peer Networking Services Group Policy setting",
      "an Update ring for Windows 10 and later profile"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Download mode e limites de banda do Delivery Optimization ficam num **perfil de configuração** (template Delivery Optimization ou Settings catalog)."
  },
  {
    "id": "Q035",
    "src": 35,
    "domain": 1,
    "topic": "Local groups",
    "type": "single",
    "stem": "Your network contains an Active Directory domain named contoso.com. The domain contains a computer named Computer1 that runs Windows 10.\n\nYou have the groups shown in the following table.\n\n| Name | Type | Location |\n|---|---|---|\n| Group1 | Universal distribution group | Contoso.com |\n| Group2 | Global security group | Contoso.com |\n| Group3 | Group | Computer1 |\n| Group4 | Group | Computer1 |\n\nWhich groups can you add to Group4?",
    "options": [
      "Group2 only",
      "Group1 and Group2 only",
      "Group2 and Group3 only",
      "Group1, Group2, and Group3"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Um grupo local pode conter contas e **grupos de segurança do domínio** (como o global Group2), mas não grupos de **distribuição** (Group1) nem **outros grupos locais** (Group3)."
  },
  {
    "id": "Q036",
    "src": 36,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "match",
    "stem": "You have a Microsoft 365 subscription. The subscription contains computers that run Windows 11 and are enrolled in Microsoft Intune.\n\nYou need to create a compliance policy that meets the following requirements:\n\n- Requires BitLocker Drive Encryption (BitLocker) on each device\n- Requires a minimum operating system version\n\nWhich setting of the compliance policy should you configure for each requirement? To answer, drag the appropriate settings to the correct requirements. Each setting may be used once, more than once, or not at all.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "Device Health",
      "Device Properties",
      "Microsoft Defender for Endpoint",
      "System Security"
    ],
    "targets": [
      {
        "label": "Requires BitLocker:",
        "answer": 0
      },
      {
        "label": "Requires a minimum operating system version:",
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Na política de conformidade do Windows, **Require BitLocker** fica em **Device Health** (avaliado pelo Device Health Attestation), e a versão mínima do SO em **Device Properties**. System Security tem itens como criptografia de armazenamento, firewall e antivírus."
  },
  {
    "id": "Q037",
    "src": 37,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "yesno",
    "stem": "You have a Microsoft 365 E5 subscription that uses Microsoft Intune.\n\nYou have the Windows 11 devices shown in the following table.\n\n| Name | Member of | BitLocker Drive Encryption (BitLocker) |\n|---|---|---|\n| Device1 | Group1 | Enabled |\n| Device2 | Group1, Group3 | Disabled |\n| Device3 | Group1, Group2 | Enabled |\n\nYou deploy the device compliance policy shown in the following table.\n\n| Setting | Value |\n|---|---|\n| Name | Policy1 |\n| Platform | Windows 10 and later |\n| Device Health — Require BitLocker | Require |\n| Actions for noncompliance | Mark device noncompliant — Immediately |\n| Scope tags | Default |\n| Included groups | Group1, Group3 |\n| Excluded groups | Group2 |\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "Device1 will have Policy1 assigned and will be marked as compliant.",
      "Device2 will have Policy1 assigned and will be marked as compliant.",
      "Device3 will have Policy1 assigned and will be marked as compliant."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Device1 recebe a política e tem BitLocker → conforme. Device2 recebe a política, mas está sem BitLocker → não conforme. Device3 está em Group2, que é **excluído**; a exclusão vence a inclusão, então a política nem é atribuída."
  },
  {
    "id": "Q038",
    "src": 38,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "match",
    "stem": "You have a Microsoft 365 subscription that contains the devices shown in the following table.\n\n| Name | Type |\n|---|---|\n| Device1 | Windows 10 |\n| Device2 | iOS |\n| Device3 | Android Enterprise |\n\nYou need to ensure that only devices running trusted firmware or operating system builds can access network resources.\n\nWhich compliance policy setting should you configure for each device? To answer, drag the appropriate settings to the correct devices. Each setting may be used once, more than once, or not at all.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "Require BitLocker",
      "Prevent jailbroken devices from having corporate access.",
      "Prevent rooted devices from having corporate access.",
      "Require Secure Boot to be enabled on the device."
    ],
    "targets": [
      {
        "label": "Device1:",
        "answer": 3
      },
      {
        "label": "Device2:",
        "answer": 1
      },
      {
        "label": "Device3:",
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "\"Firmware/build confiável\" no Windows é **Secure Boot** (cadeia de boot íntegra). No iOS, o equivalente é bloquear **jailbreak**; no Android, bloquear **root**. BitLocker é criptografia, não integridade do boot."
  },
  {
    "id": "Q039",
    "src": 39,
    "domain": 1,
    "topic": "Custom compliance",
    "type": "order",
    "stem": "You have a Microsoft 365 subscription that contains 1,000 Windows 11 devices enrolled in Microsoft Intune.\n\nYou plan to create and monitor the results of a compliance policy used to validate the BIOS version of the devices.\n\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
    "pool": [
      "Review the compliance dashboard for results.",
      "Create and assign a compliance policy that has System Security settings configured.",
      "Review the Conditional Access Insights and Reporting workbook for results.",
      "Create a PowerShell discovery script and a JSON file.",
      "Upload the PowerShell script to Intune.",
      "Upload the JSON file to Azure AD.",
      "Create and assign a custom compliance policy."
    ],
    "answer": [
      3,
      4,
      6,
      0
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "**Custom compliance**: cria-se o script de descoberta (PowerShell) e o JSON com as regras → faz upload do script no Intune (Compliance policies > Scripts) → cria a política de conformidade com Custom Compliance, anexando o script e o JSON → acompanha o resultado nos relatórios de conformidade. O JSON é enviado na própria política, não no Entra ID."
  },
  {
    "id": "Q040",
    "src": 40,
    "domain": 2,
    "topic": "Local groups",
    "type": "match",
    "stem": "You have a computer that runs Windows 10 and contains two local users named User1 and User2.\n\nYou need to ensure that the users can perform the following actions:\n\n- User1 must be able to adjust the date and time.\n- User2 must be able to clear Windows logs.\n\nThe solution must use the principle of least privilege.\n\nTo which group should you add each user? To answer, drag the appropriate groups to the correct users. Each group may be used once, more than once, or not at all.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "Administrators",
      "Event Log Readers",
      "Performance Log Users",
      "Power Users",
      "System Managed Accounts Group"
    ],
    "targets": [
      {
        "label": "User1:",
        "answer": 0
      },
      {
        "label": "User2:",
        "answer": 0
      }
    ],
    "scope": "borderline",
    "review": "duvidosa",
    "explanation": "Por padrão, o direito \"Change the system time\" é dado a Administrators (e LOCAL SERVICE), e limpar logs exige \"Manage auditing and security log\", também de Administrators. Event Log Readers só **lê** logs, e Power Users no Windows 10 não tem direitos extras. Questão de ambiente local, marcada como duvidosa pela discussão sobre Power Users."
  },
  {
    "id": "Q041",
    "src": 41,
    "domain": 1,
    "topic": "Microsoft Entra join/registration",
    "type": "hotarea",
    "stem": "You have an Azure AD tenant named contoso.com.\n\nYou have the devices shown in the following table.\n\n| Name | Platform |\n|---|---|\n| Device1 | Windows 11 |\n| Device2 | Windows 10 |\n| Device3 | iOS |\n| Device4 | Ubuntu Linux |\n\nWhich devices can be Azure AD joined, and which devices can be registered in contoso.com? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Azure AD joined:",
        "options": [
          "Device1 only",
          "Device1 and Device2 only",
          "Device1 and Device3 only",
          "Device1, Device2, and Device3 only",
          "Device1, Device2, Device3, and Device4"
        ],
        "answer": 1
      },
      {
        "label": "Registered in contoso.com:",
        "options": [
          "Device1 and Device2 only",
          "Device2 and Device3 only",
          "Device3 and Device4 only",
          "Device2, Device3, and Device4 only",
          "Device1, Device2, Device3, and Device4"
        ],
        "answer": 4
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "**Entra join** é só para Windows 10/11 (e Windows Server em VMs Azure). **Entra registration** suporta Windows, iOS/iPadOS, Android, macOS e Ubuntu — os quatro dispositivos."
  },
  {
    "id": "Q042",
    "src": 42,
    "domain": 1,
    "topic": "Microsoft Entra join",
    "type": "yesno",
    "stem": "You have an Azure AD tenant named contoso.com that contains the users shown in the following table.\n\n| Name | Role |\n|---|---|\n| Admin1@contoso.com | Security Administrator |\n| Admin2@contoso.com | Cloud Device Administrator |\n| User1@contoso.com | None |\n\nYou have a computer named Computer1 that runs Windows 10. Computer1 is in a workgroup and has the local users shown in the following table.\n\n| Name | Member of |\n|---|---|\n| Administrator1 | Network Configuration Operators |\n| Administrator2 | Power Users |\n| UserA | Administrators |\n\nUserA joins Computer1 to Azure AD by using user1@contoso.com.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1@contoso.com is a member of the local Administrators group on Computer1.",
      "Admin1@contoso.com can configure the firewall and Microsoft Defender on Computer1.",
      "Admin2@contoso.com can install software on Computer1."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "No Entra join, entram no Administrators local: o **usuário que fez o join** (por padrão), a função **Global Administrator** e a função **Microsoft Entra Joined Device Local Administrator**. Security Administrator e Cloud Device Administrator não viram admins locais."
  },
  {
    "id": "Q043",
    "src": 43,
    "domain": 2,
    "topic": "PowerShell remoting",
    "type": "single",
    "stem": "Your network contains an Active Directory domain. The domain contains a user named Admin1. All computers run Windows 10.\n\nYou enable Windows PowerShell remoting on the computers.\n\nYou need to ensure that Admin1 can establish remote PowerShell connections to the computers. The solution must use the principle of least privilege.\n\nTo which group should you add Admin1?",
    "options": [
      "Access Control Assistance Operators",
      "Remote Desktop Users",
      "Power Users",
      "Remote Management Users"
    ],
    "answer": 3,
    "scope": "borderline",
    "review": "ok",
    "explanation": "O grupo local **Remote Management Users** dá acesso ao WinRM (e portanto ao PowerShell remoting) sem privilégios de administrador. Tema de gerenciamento on-premises, marcado como borderline no escopo atual."
  },
  {
    "id": "Q044",
    "src": 44,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "hotarea",
    "stem": "You have a Microsoft Intune subscription.\n\nYou are creating a Windows Autopilot deployment profile named Profile1 as shown in the following exhibit. Profile1 will be deployed to Windows 10 devices.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "exhibits": [
      {
        "src": "img/Q044-1.png",
        "alt": "Perfil Autopilot: User-Driven, Azure AD joined, conta Standard, teclado automático, sem template de nome"
      }
    ],
    "slots": [
      {
        "label": "Users who deploy a device by using Profile1 [answer choice].",
        "options": [
          "are prevented from modifying any desktop settings",
          "can create additional local users on the device",
          "can modify the desktop settings for all device users",
          "can modify the desktop settings only for themselves"
        ],
        "answer": 3
      },
      {
        "label": "Users can configure the [answer choice] during the deployment.",
        "options": [
          "computer name",
          "Cortana settings",
          "keyboard layout"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Com **User account type = Standard**, o usuário não é admin local: pode mudar as configurações só do próprio perfil. O dump marca **computer name** no segundo item. Ponto discutível: com o Autopilot e \"Apply device name template = No\" o nome é gerado automaticamente, e o teclado também é configurado automaticamente. Confira a discussão."
  },
  {
    "id": "Q048",
    "src": 48,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "yesno",
    "stem": "You have an Azure AD tenant named contoso.com that contains the devices shown in the following table.\n\n| Name | Operating system | Azure AD status | Mobile device management (MDM) |\n|---|---|---|---|\n| Device1 | Windows 11 | Registered | None |\n| Device2 | Windows 10 | Joined | None |\n| Device3 | Windows 10 | Joined | Microsoft Intune |\n\nContoso.com contains the Azure AD groups shown in the following table.\n\n| Name | Members |\n|---|---|\n| Group1 | Group2, Device1, Device3 |\n| Group2 | Device2 |\n\nYou add a Windows Autopilot deployment profile. The profile is configured as shown in the following table.\n\n| Setting | Value |\n|---|---|\n| Name | Profile1 |\n| Convert all targeted devices to Autopilot | Yes |\n| Device type | Windows PC |\n| Deployment mode | Self-Deploying (preview) |\n| Join to Azure AD as | Azure AD joined |\n| Language (Region) | Operating system default |\n| Automatically configure keyboard | Yes |\n| Microsoft Software License Terms / Privacy settings / Change account options | Hide |\n| User account type | Standard |\n| Allow White Glove OOBE | No |\n| Apply device name template | No |\n| Included groups | Group1 |\n| Excluded groups | — |\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "If Device1 starts in Out of Box Experience (OOBE) mode, the device will be deployed by using Autopilot.",
      "If Device2 starts in Out of Box Experience (OOBE) mode, the device will be deployed by using Autopilot.",
      "If Device3 starts in Out of Box Experience (OOBE) mode, the device will be deployed by using Autopilot."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A conversão (\"Convert all targeted devices\") só registra no Autopilot dispositivos **gerenciados pelo Intune** que estejam no grupo atribuído. Device1 não está no Intune. Device2 só está no grupo de forma **aninhada** (Group2 dentro de Group1), e grupos aninhados não são considerados na atribuição do Autopilot — além de também não estar no Intune. Só o Device3 é convertido."
  },
  {
    "id": "Q049",
    "src": 49,
    "domain": 2,
    "topic": "Remote Desktop (GPO)",
    "type": "multi",
    "layout": "panel",
    "stem": "Your network contains an Active Directory domain. The domain contains 1,000 computers that run Windows 11.\n\nYou need to configure the Remote Desktop settings of all the computers. The solution must meet the following requirements:\n\n- Prevent the sharing of clipboard contents.\n- Ensure that users authenticate by using Network Level Authentication (NLA).\n\nWhich two nodes of the Group Policy Management Editor should you use? To answer, select the appropriate nodes in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "panelTitle": "Remote Desktop Session Host",
    "options": [
      "Connections",
      "Device and Resource Redirection",
      "Licensing",
      "Printer Redirection",
      "Profiles",
      "RD Connection Broker",
      "Remote Session Environment",
      "Security",
      "Session Time Limits",
      "Temporary folders"
    ],
    "answer": [
      1,
      7
    ],
    "shuffle": false,
    "scope": "borderline",
    "review": "ok",
    "explanation": "\"Do not allow Clipboard redirection\" fica em **Device and Resource Redirection**; \"Require user authentication for remote connections by using NLA\" fica em **Security**. Tema de GPO/RDP, borderline no escopo atual."
  },
  {
    "id": "Q050",
    "src": 50,
    "domain": 1,
    "topic": "Windows 11 upgrade",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices.\n\nAzure AD joined Windows devices enroll automatically in Intune.\n\nYou have the devices shown in the following table.\n\n| Name | Operating system | Azure AD joined | Line-of-business (LOB) apps installed |\n|---|---|---|---|\n| Device1 | 64-bit version of Windows 10 Pro | Yes | No |\n| Device2 | 32-bit version of Windows 10 Pro | No | Yes |\n| Device3 | 64-bit version of Windows 10 Pro | No | Yes |\n\nYou are preparing to upgrade the devices to Windows 11. All the devices are compatible with Windows 11.\n\nYou need to evaluate Windows Autopilot and in-place upgrade as deployment methods to implement Windows 11 Pro on the devices, while retaining all user settings and applications.\n\nWhich devices can be upgraded by using each method? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Windows Autopilot:",
        "options": [
          "None of the devices",
          "Device1 only",
          "Device1 and Device3 only",
          "Device1, Device2, and Device3"
        ],
        "answer": 0
      },
      {
        "label": "In-place upgrade:",
        "options": [
          "None of the devices",
          "Device1 only",
          "Device1 and Device3 only",
          "Device1, Device2, and Device3"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O Autopilot provisiona a partir do OOBE (ou com Autopilot Reset) e **não preserva apps e configurações** do usuário, então não atende. O in-place upgrade preserva tudo, mas o Windows 11 é **só 64 bits**: um Windows 10 de 32 bits (Device2) não pode ir para o Windows 11 por upgrade."
  },
  {
    "id": "Q052",
    "src": 52,
    "domain": 1,
    "topic": "Enrollment Status Page",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices.\n\nYou use Windows Autopilot to deploy Windows 11 to devices.\n\nA support engineer reports that when a deployment fails, they cannot collect deployment logs from failed device.\n\nYou need to ensure that when a deployment fails, the deployment logs can be collected.\n\nWhat should you configure?",
    "options": [
      "the automatic enrollment settings",
      "the Windows Autopilot deployment profile",
      "the enrollment status page (ESP) profile",
      "the device configuration profile"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O perfil de **Enrollment Status Page** tem a opção \"Allow users to collect logs about installation errors\", que exibe o botão de coleta de logs quando a implantação falha."
  },
  {
    "id": "Q053",
    "src": 53,
    "domain": 2,
    "topic": "Remote Help",
    "type": "multi",
    "stem": "You have a Microsoft 365 E5 subscription that contains a user named User1 and uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices.\n\nYou have a device named Device1 that is enrolled in Intune.\n\nYou need to ensure that User1 can use Remote Help from the Intune admin center for Device1.\n\nWhich three actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "Deploy the Remote Help app to Device1.",
      "Assign the Help Desk Operator role to User1.",
      "Assign the Intune Administrator role to User1.",
      "Assign a Microsoft 365 E5 license to User1.",
      "Rerun device onboarding on Device1.",
      "Assign the Remote Help add-on license to User1."
    ],
    "answer": [
      0,
      1,
      5
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O Remote Help exige o **app Remote Help** instalado no dispositivo, uma **função RBAC** com permissão de Remote Help (Help Desk Operator atende com menor privilégio) e a **licença do Remote Help** (add-on ou Intune Suite)."
  },
  {
    "id": "Q054",
    "src": 54,
    "domain": 1,
    "topic": "Windows 11 upgrade",
    "type": "single",
    "stem": "You have a Windows 11 capable device named Device1 that runs the 64-bit version of Windows 10 Enterprise and has Microsoft Office 2019 installed.\n\nYou have the Windows 11 Enterprise images shown in the following table.\n\n| Name | Platform | Description |\n|---|---|---|\n| Image1 | x64 | Custom Windows 11 image that has Office 2021 installed |\n| Image2 | x64 | Default Windows 11 image created by Microsoft |\n\nWhich images can be used to perform an in-place upgrade of Device1?",
    "options": [
      "Image1 only",
      "Image2 only",
      "Image1 and Image2"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O in-place upgrade usa a **mídia original da Microsoft** (setup.exe com o install.wim padrão). Imagens customizadas, com apps já instalados, servem para wipe-and-load, não para upgrade."
  },
  {
    "id": "Q055",
    "src": 55,
    "domain": 1,
    "topic": "Deployment planning",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYour network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs with an Azure AD tenant by using Azure AD Connect.\n\nYou use Microsoft Intune and Configuration Manager to manage devices.\n\nYou need to recommend a deployment plan for new Windows 11 devices. The solution must meet the following requirements:\n\n- Devices for the marketing department must be joined to the AD DS domain only. The IT department will install complex applications on the devices at build time, before giving the devices to the marketing department users.\n- Devices for the sales department must be Azure AD joined. The devices will be shipped directly from the manufacturer to the homes of the sales department users.\n- Administrative effort must be minimized.\n\nWhich deployment method should you recommend for each department? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Sales:",
        "options": [
          "Configuration Manager",
          "Windows Autopilot with automatic registration",
          "Windows Autopilot with manual registration",
          "Windows Autopilot with OEM registration"
        ],
        "answer": 3
      },
      {
        "label": "Marketing:",
        "options": [
          "Configuration Manager",
          "Windows Autopilot with automatic registration",
          "Windows Autopilot with manual registration",
          "Windows Autopilot with OEM registration"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Vendas: dispositivos enviados direto do fabricante → **Autopilot com registro pelo OEM** (o fabricante faz o upload dos hashes). Marketing: só domínio AD (sem Entra) e apps complexos na montagem → **Configuration Manager** (task sequence), que o ambiente já usa."
  },
  {
    "id": "Q058",
    "src": 58,
    "domain": 1,
    "topic": "Provisioning packages",
    "type": "single",
    "stem": "Your company standardizes on Windows 10 Enterprise for all users.\n\nSome users purchase their own computer from a retail store. The computers run Windows 10 Pro.\n\nYou need to recommend a solution to upgrade the computers to Windows 10 Enterprise, join the computers to Azure AD, and install several Microsoft Store apps. The solution must meet the following requirements:\n\n- Ensure that any applications installed by the users are retained.\n- Minimize user intervention.\n\nWhat is the best recommendation to achieve the goal? More than one answer choice may achieve the goal. Select the BEST answer.",
    "options": [
      "Windows Autopilot",
      "Microsoft Deployment Toolkit (MDT)",
      "a Windows Configuration Designer provisioning package",
      "Windows Deployment Services (WDS)"
    ],
    "answer": 2,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Um **provisioning package** (Windows Configuration Designer) aplica a mudança de edição, faz o Entra join e instala apps **sem reinstalar o Windows**, preservando os apps do usuário. Autopilot, MDT e WDS partem de reinstalação/reset."
  },
  {
    "id": "Q059",
    "src": 59,
    "domain": 1,
    "topic": "Windows Hello for Business",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "PIN6"
    },
    "stem": "Your company has an Azure AD tenant named contoso.com that contains several Windows 10 devices.\n\nWhen you join new Windows 10 devices to contoso.com, users are prompted to set up a four-digit pin.\n\nYou need to ensure that the users are prompted to set up a six-digit pin when they join the Windows 10 devices to contoso.com.\n\n**Solution:** From the Microsoft Entra admin center, you modify the User settings and the Device settings.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "As configurações de usuário e de dispositivo do Entra não controlam a complexidade do PIN do Windows Hello for Business. Isso é feito no Intune (opções de inscrição do Windows Hello for Business ou política de Account protection)."
  },
  {
    "id": "Q060",
    "src": 60,
    "domain": 1,
    "topic": "Windows Hello for Business",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "PIN6"
    },
    "stem": "Your company has an Azure AD tenant named contoso.com that contains several Windows 10 devices.\n\nWhen you join new Windows 10 devices to contoso.com, users are prompted to set up a four-digit pin.\n\nYou need to ensure that the users are prompted to set up a six-digit pin when they join the Windows 10 devices to contoso.com.\n\n**Solution:** From the Microsoft Entra admin center, you configure automatic mobile device management (MDM) enrollment. From the Microsoft Intune admin center, you create and assign a device restrictions profile.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "A inscrição automática é necessária, mas o perfil de **device restrictions** não define o PIN do Windows Hello que é pedido durante o join. O PIN no provisionamento vem das opções de inscrição do Windows Hello for Business."
  },
  {
    "id": "Q061",
    "src": 61,
    "domain": 1,
    "topic": "Windows Hello for Business",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "PIN6"
    },
    "stem": "Your company has an Azure AD tenant named contoso.com that contains several Windows 10 devices.\n\nWhen you join new Windows 10 devices to contoso.com, users are prompted to set up a four-digit pin.\n\nYou need to ensure that the users are prompted to set up a six-digit pin when they join the Windows 10 devices to contoso.com.\n\n**Solution:** From the Microsoft Entra admin center, you configure automatic mobile device management (MDM) enrollment. From the Microsoft Intune admin center, you configure the Windows Hello for Business enrollment options.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Com a inscrição automática, o dispositivo entra no Intune no momento do join, e as **opções de inscrição do Windows Hello for Business** (Devices > Enrollment > Windows Hello for Business) definem o tamanho mínimo do PIN pedido durante o provisionamento."
  },
  {
    "id": "Q062",
    "src": 62,
    "domain": 2,
    "topic": "Device restrictions (iOS)",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO"
    },
    "stem": "You need to meet the technical requirements for the iOS devices.\n\nWhich object should you create in Intune?",
    "options": [
      "a deployment profile",
      "an app protection policy",
      "a device configuration profile",
      "a compliance policy"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Bloquear o envio de diagnóstico/telemetria no iOS é uma configuração de **device restrictions**, ou seja, um **perfil de configuração**."
  },
  {
    "id": "Q063",
    "src": 63,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "yesno",
    "group": {
      "kind": "case",
      "id": "CONTOSO"
    },
    "stem": "You are evaluating which devices are compliant.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "Device1 is compliant.",
      "Device3 is compliant.",
      "Device4 is compliant."
    ],
    "answer": [
      false,
      true,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Device1 (Android, Group1) recebe Policy3, que exige criptografia, e está sem criptografia → não conforme. Device3 (Android, Group2/Group3) recebe Policy1 (Group3), que não exige criptografia → conforme. Device4 (iOS, Group2) recebe Policy2, que não exige nada aplicável → conforme."
  },
  {
    "id": "Q064",
    "src": 64,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO"
    },
    "stem": "You need to prepare for the deployment of the Phoenix office computers.\n\nWhat should you do first?",
    "options": [
      "Generalize the computers and configure the Device settings from the Microsoft Entra admin center.",
      "Extract the serial number of each computer to an XML file and upload the file from the Microsoft Intune admin center.",
      "Extract the hardware ID information of each computer to a CSV file and upload the file from the Microsoft Intune admin center.",
      "Generalize the computers and configure the Mobility (MDM and MAM) settings from the Microsoft Entra admin center.",
      "Extract the serial number information of each computer to a CSV file and upload the file from the Microsoft Intune admin center."
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Os computadores já comprados precisam ser **registrados no Autopilot**: extrair o **hardware hash** (hardware ID) para CSV e importar no Intune. Número de série sozinho não registra o dispositivo."
  },
  {
    "id": "Q065",
    "src": 65,
    "domain": 1,
    "topic": "Enrollment restrictions",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO"
    },
    "stem": "What is the maximum number of devices that User1 and User2 can enroll in Intune? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "User1 can enroll a maximum of:",
        "options": [
          "5 devices",
          "10 devices",
          "15 devices",
          "1,000 devices",
          "An unlimited number of devices"
        ],
        "answer": 1
      },
      {
        "label": "User2 can enroll a maximum of:",
        "options": [
          "5 devices",
          "10 devices",
          "15 devices",
          "1,000 devices",
          "An unlimited number of devices"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "User1 está em GroupA → Restriction2 = **10**. A função Intune Administrator não muda o limite. User2 é **device enrollment manager**, e um DEM pode inscrever até **1.000** dispositivos, ignorando as restrições de limite."
  },
  {
    "id": "Q066",
    "src": 66,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO"
    },
    "stem": "To which devices do Policy1 and Policy2 apply? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Policy1:",
        "options": [
          "Device1 only",
          "Device2 only",
          "Device3 only",
          "Device4 only",
          "Device2 and Device3 only",
          "Device1 and Device3 only",
          "Device1, Device2, and Device3"
        ],
        "answer": 2
      },
      {
        "label": "Policy2:",
        "options": [
          "Device1 only",
          "Device2 only",
          "Device3 only",
          "Device4 only",
          "Device2 and Device3 only",
          "Device1 and Device3 only",
          "Device1, Device2, and Device3"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Policy1 é de **Android** e inclui Group3: o único Android em Group3 é Device3 (Device2 está em Group3, mas é iOS). Policy2 é de **iOS**, inclui Group2 e exclui Group3: Device2 é excluído, sobra Device4."
  },
  {
    "id": "Q067",
    "src": 67,
    "domain": 2,
    "topic": "PowerShell remoting",
    "type": "single",
    "stem": "Your network contains an Active Directory domain named contoso.com. The domain contains two computers named Computer1 and Computer2 that run Windows 10.\n\nOn Computer1, you need to run the Invoke-Command cmdlet to execute several PowerShell commands on Computer2.\n\nWhat should you do first?",
    "options": [
      "On Computer2, run the Enable-PSRemoting cmdlet.",
      "On Computer2, add Computer1 to the Remote Management Users group.",
      "From Active Directory, configure the Trusted for Delegation setting for the computer account of Computer2.",
      "On Computer1, run the New-PSSession cmdlet."
    ],
    "answer": 0,
    "scope": "borderline",
    "review": "ok",
    "explanation": "No Windows client o PowerShell remoting vem desabilitado; é preciso rodar **Enable-PSRemoting** no computador de destino (Computer2) para configurar o WinRM e o listener."
  },
  {
    "id": "Q068",
    "src": 68,
    "domain": 1,
    "topic": "Subscription activation",
    "type": "single",
    "stem": "You have an Azure AD tenant that contains the devices shown in the following table.\n\n| Name | Operating system | Azure AD join type |\n|---|---|---|\n| Device1 | Windows 11 Pro | Joined |\n| Device2 | Windows 11 Pro | Registered |\n| Device3 | Windows 10 Pro | Joined |\n| Device4 | Windows 10 Pro | Registered |\n\nWhich devices can be activated by using subscription activation?",
    "options": [
      "Device1 only",
      "Device1 and Device2 only",
      "Device1 and Device3 only",
      "Device1, Device2, Device3, and Device4"
    ],
    "answer": 2,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "A **subscription activation** (Pro → Enterprise pela licença do usuário) exige dispositivos **Entra joined** ou **hybrid joined**. Dispositivos apenas registrados não são elevados."
  },
  {
    "id": "Q072",
    "src": 72,
    "domain": 2,
    "topic": "WinRM",
    "type": "single",
    "stem": "Your network contains an Active Directory domain. The domain contains a computer named Computer1 that runs Windows 11.\n\nYou need to enable the Windows Remote Management (WinRM) service on Computer1 and perform the following configurations:\n\n- For the WinRM service, set Startup type to Automatic.\n- Create a listener that accepts requests from any IP address.\n- Enable a firewall exception for WS-Management communications.\n\nWhich PowerShell cmdlet should you use?",
    "options": [
      "Connect-WSMan",
      "Enable-PSRemoting",
      "Invoke-WSManAction",
      "Enable-PSSessionConfiguration"
    ],
    "answer": 1,
    "scope": "borderline",
    "review": "ok",
    "explanation": "**Enable-PSRemoting** faz exatamente isso: inicia o WinRM com início automático, cria o listener HTTP em qualquer IP, abre a exceção de firewall e registra as configurações de sessão."
  },
  {
    "id": "Q073",
    "src": 73,
    "domain": 1,
    "topic": "Subscription activation",
    "type": "yesno",
    "stem": "Your network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs with an Azure AD tenant. The tenant contains the users shown in the following table.\n\n| Name | Member of | On-premises sync |\n|---|---|---|\n| User1 | Group1 | Disabled |\n| User2 | Group2 | Enabled |\n\nYou assign Windows 10/11 Enterprise E5 licenses to Group1 and User2.\n\nYou deploy the devices shown in the following table.\n\n| Name | Operating system | Joined to |\n|---|---|---|\n| Device1 | Windows 11 Pro | Azure AD |\n| Device2 | Windows 11 Pro | AD DS |\n| Device3 | Windows 10 Pro | Azure AD |\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "If User1 signs in to Device1, Device1 is upgraded to Windows 11 Enterprise automatically.",
      "If User2 signs in to Device2, Device2 is upgraded to Windows 11 Enterprise automatically.",
      "If User2 signs in to Device3, Device3 is upgraded to Windows 11 Enterprise automatically."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A subscription activation eleva a **edição** (Pro → Enterprise), não a **versão**. Device1 é Entra joined e User1 tem licença → vira Windows 11 Enterprise. Device2 está só no AD DS (não é Entra/hybrid joined) → não ativa. Device3 é Windows 10 Pro → vira Windows **10** Enterprise, não 11. (No dump original a tabela repete \"Device2\" na terceira linha; aqui foi corrigido para Device3.)"
  },
  {
    "id": "Q075",
    "src": 75,
    "domain": 1,
    "topic": "Windows 11 requirements",
    "type": "single",
    "stem": "You have a Hyper-V host that contains the virtual machines shown in the following table.\n\n| Name | Generation | Virtual processors | Memory |\n|---|---|---|---|\n| VM1 | 1 | 4 | 16 GB |\n| VM2 | 2 | 1 | 8 GB |\n| VM3 | 2 | 2 | 4 GB |\n\nOn which virtual machines can you install Windows 11?",
    "options": [
      "VM1 only",
      "VM3 only",
      "VM1 and VM2 only",
      "VM2 and VM3 only",
      "VM1, VM2, and VM3"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O Windows 11 exige UEFI/Secure Boot e TPM (só em VM de **geração 2**), pelo menos **2 processadores** e **4 GB** de RAM. VM1 é geração 1 e VM2 tem 1 vCPU; só a VM3 atende."
  },
  {
    "id": "Q076",
    "src": 76,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "yesno",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune and contains the users shown in the following table.\n\n| Name | Member of | License |\n|---|---|---|\n| User1 | Group1 | None |\n| User2 | Group1 | Microsoft 365 E3 |\n| User3 | Group2 | Microsoft 365 E5 |\n\nGroup2 has been assigned in the Enrollment Status Page.\n\nYou have the devices shown in the following table.\n\n| Name | Operating system | Department |\n|---|---|---|\n| Device1 | Windows 10 Pro | Marketing |\n| Device2 | Windows 10 Home | Research |\n| Device3 | Windows 10 | Marketing |\n\nYou capture and upload the hardware IDs of the devices in the marketing department.\n\nYou configure Windows Autopilot.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can complete the Autopilot process on Device1.",
      "User2 can complete the Autopilot process on Device1.",
      "User3 can view device setup information during the enrollment phase of Device1."
    ],
    "answer": [
      false,
      true,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Concluir o Autopilot (Entra join + inscrição automática) exige que o usuário tenha licença do **Intune/Entra Premium** — User1 não tem licença. User2 (M365 E3) consegue. User3 está no grupo atribuído à **Enrollment Status Page**, então vê o progresso da configuração."
  },
  {
    "id": "Q077",
    "src": 77,
    "domain": 1,
    "topic": "Licensing",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that contains a user named User1. User1 is assigned a Windows 10/11 Enterprise E3 license.\n\nYou use Microsoft Intune Suite to manage devices.\n\nUser1 activates the following devices:\n\n- Device1: Windows 11 Enterprise\n- Device2: Windows 10 Enterprise\n- Device3: Windows 11 Enterprise\n\nHow many more devices can User1 activate?",
    "options": [
      "2",
      "3",
      "7",
      "8"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "A licença Windows Enterprise E3/E5 por usuário permite ativar em até **5 dispositivos**. Com 3 já ativados, restam **2**."
  },
  {
    "id": "Q078",
    "src": 78,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "order",
    "stem": "Your company has a computer named Computer1 that runs Windows 10.\n\nComputer1 was used by a user who left the company.\n\nYou plan to repurpose Computer1 and assign the computer to a new user.\n\nYou need to redeploy Computer1 by using Windows Autopilot.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
    "pool": [
      "Upload the file by using Microsoft Intune.",
      "Generate a CSV file that contains the computer information.",
      "Reset the computer.",
      "Generate a JSON file that contains the computer information.",
      "Upload the file by running azcopy.exe."
    ],
    "answer": [
      1,
      0,
      2
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Extraia o hardware hash para um **CSV** (Get-WindowsAutopilotInfo), **importe no Intune** e então **resete** o computador para que ele passe pelo OOBE com o perfil Autopilot. JSON é o formato do perfil offline, não do registro de hardware."
  },
  {
    "id": "Q081",
    "src": 81,
    "domain": 4,
    "topic": "App protection policies",
    "type": "single",
    "stem": "Your company implements Azure AD, Microsoft 365, Microsoft Intune, and Azure Information Protection.\n\nThe company's security policy states the following:\n\n- Personal devices do not need to be enrolled in Intune.\n- Users must authenticate by using a PIN before they can access corporate email data.\n- Users can use their personal iOS and Android devices to access corporate cloud services.\n- Users must be prevented from copying corporate email data to a cloud storage service other than Microsoft OneDrive for Business.\n\nYou need to configure a solution to enforce the security policy.\n\nWhat should you create?",
    "options": [
      "a device configuration profile from the Microsoft Intune admin center",
      "a data loss prevention (DLP) policy from the Microsoft Purview compliance portal",
      "an insider risk management policy from the Microsoft Purview compliance portal",
      "an app protection policy from the Microsoft Intune admin center"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Sem inscrição (MAM-WE), PIN para abrir o app e restrição de \"Save copies of org data\" só para OneDrive/SharePoint são exatamente o que a **app protection policy** faz."
  },
  {
    "id": "Q082",
    "src": 82,
    "domain": 4,
    "topic": "App configuration policies",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that contains 500 Android Enterprise devices.\n\nAll the devices are enrolled in Microsoft Intune.\n\nYou need to deliver bookmarks to the Chrome browser on the devices.\n\nWhat should you create?",
    "options": [
      "a compliance policy",
      "a configuration profile",
      "an app protection policy",
      "an app configuration policy"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Configurações específicas de um app (como favoritos do Chrome via managed configurations do Google Play) são entregues por **app configuration policy** para dispositivos gerenciados."
  },
  {
    "id": "Q083",
    "src": 83,
    "domain": 4,
    "topic": "Office Deployment Tool",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription and 100 computers that run Windows 10.\n\nYou need to deploy Microsoft Office Professional Plus 2019 to the computers by using Microsoft Office Deployment Tool (ODT).\n\nWhat should you use to create a customization file for ODT?",
    "options": [
      "the Microsoft 365 admin center",
      "the Microsoft Intune admin center",
      "the Microsoft Purview compliance portal",
      "the Microsoft 365 Apps admin center"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O XML do ODT é gerado pela **Office Customization Tool**, disponível no **Microsoft 365 Apps admin center** (config.office.com)."
  },
  {
    "id": "Q084",
    "src": 84,
    "domain": 4,
    "topic": "Win32 apps",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that contains 1,000 Windows 11 devices enrolled in Microsoft Intune.\n\nYou plan to use Intune to deploy an application named App1 that contains multiple installation files.\n\nWhat should you do first?",
    "options": [
      "Prepare the contents of App1 by using the Microsoft Win32 Content Prep Tool.",
      "Create an Android application package (APK).",
      "Upload the contents of App1 to Intune.",
      "Install the Microsoft Deployment Toolkit (MDT)."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Apps com vários arquivos de instalação são empacotados como **Win32** com o **Win32 Content Prep Tool**, que gera um único .intunewin com a pasta inteira."
  },
  {
    "id": "Q085",
    "src": 85,
    "domain": 4,
    "topic": "Microsoft 365 Apps",
    "type": "yesno",
    "stem": "You have groups that use the Dynamic Device membership type as shown in the following table.\n\n| Name | Syntax |\n|---|---|\n| Group1 | `(device.deviceOwnership -eq \"Company\")` |\n| Group2 | `(device.deviceOwnership -eq \"Personal\")` |\n\nYou are deploying Microsoft 365 apps.\n\nYou have devices enrolled in Microsoft Intune as shown in the following table.\n\n| Name | Ownership | Platform |\n|---|---|---|\n| LT1 | Company | Windows 10 Enterprise x64 |\n| LT2 | Personal | Windows 10 Enterprise x64 |\n| LT3 | Company | MacOS Big Sur |\n\nIn the Microsoft Intune admin center, you create a Microsoft 365 Apps app as shown in the following exhibit.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "exhibits": [
      {
        "src": "img/Q085-1.png",
        "alt": "App Microsoft 365 Apps for Windows 10, 64-bit, Current Channel, Required para Group1"
      }
    ],
    "statements": [
      "LT1 will have Microsoft 365 apps installed.",
      "LT2 will have Microsoft 365 apps installed.",
      "LT3 will have Microsoft 365 apps installed."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O app é **Microsoft 365 Apps for Windows 10** e está como Required para Group1 (dispositivos corporativos). LT1 é corporativo e Windows → instala. LT2 é pessoal → não está no grupo. LT3 é corporativo, mas é **macOS**, e o app atribuído é o de Windows."
  },
  {
    "id": "Q086",
    "src": 86,
    "domain": 2,
    "topic": "Windows Insider",
    "type": "multi",
    "stem": "You have a Microsoft 365 subscription. All devices run Windows 10.\n\nYou need to prevent users from enrolling the devices in the Windows Insider Program.\n\nWhat two configurations should you perform from the Microsoft Intune admin center? Each correct answer is a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "a device restrictions device configuration profile",
      "an app configuration policy",
      "a Windows 10 and later security baseline",
      "a custom device configuration profile",
      "a Windows 10 and later update ring"
    ],
    "answer": [
      3,
      4
    ],
    "shuffle": false,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "A política **System/AllowBuildPreview** pode ir num perfil **custom** (OMA-URI), e o **update ring** tinha a opção de pré-lançamento (Windows Insider) para bloquear. O dump marca D e E. Parte da comunidade aponta que o Device restrictions também já teve a opção \"Insider builds\", por isso a questão está como duvidosa."
  },
  {
    "id": "Q087",
    "src": 87,
    "domain": 5,
    "topic": "Endpoint analytics",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains 100 Windows 10 devices enrolled in Microsoft Intune.\n\nYou plan to use Endpoint analytics.\n\nYou need to create baseline metrics.\n\nWhat should you do first?",
    "options": [
      "Modify the Baseline regression threshold.",
      "Onboard 10 devices to Endpoint analytics.",
      "Create a Log Analytics workspace.",
      "Create an Azure Monitor workbook."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O Endpoint analytics só calcula scores e baselines depois que há dados de pelo menos **10 dispositivos** integrados."
  },
  {
    "id": "Q088",
    "src": 88,
    "domain": 2,
    "topic": "Windows updates",
    "type": "single",
    "stem": "You install a feature update on a computer that runs Windows 10.\n\nHow many days do you have to roll back the update?",
    "options": [
      "5",
      "10",
      "14",
      "30"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Por padrão o Windows mantém a versão anterior por **10 dias** (é possível estender até 60 com DISM ou com a configuração de uninstall period do update ring)."
  },
  {
    "id": "Q089",
    "src": 89,
    "domain": 5,
    "topic": "Azure Monitor",
    "type": "single",
    "stem": "You have a Microsoft Azure subscription that contains an Azure Log Analytics workspace.\n\nYou deploy a new computer named Computer1 that runs Windows 10. Computer1 is in a workgroup.\n\nYou need to ensure that you can use Log Analytics to query events from Computer1.\n\nWhat should you do on Computer1?",
    "options": [
      "Join Azure AD.",
      "Configure Windows Defender Firewall.",
      "Create an event subscription.",
      "Install the Azure Monitor Agent."
    ],
    "answer": 0,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O **Azure Monitor Agent** para Windows client (instalador para Windows 10/11) exige que o dispositivo esteja **Entra joined**; por isso o primeiro passo é o join. O gabarito do dump é A, mas muitos marcam D (instalar o agente), já que o agente também é necessário. Confira a discussão antes de confiar nesta."
  },
  {
    "id": "Q090",
    "src": 90,
    "domain": 2,
    "topic": "iOS updates",
    "type": "multi",
    "stem": "You have a Microsoft 365 E5 subscription and 100 unmanaged iPad devices.\n\nYou need to deploy a specific iOS update to the devices. Users must be prevented from manually installing a more recent version of iOS.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "Create a device configuration profile.",
      "Enroll the devices in Microsoft Intune by using the Intune Company Portal.",
      "Create a compliance policy.",
      "Create an iOS app provisioning profile.",
      "Enroll the devices in Microsoft Intune by using Apple Business Manager."
    ],
    "answer": [
      0,
      4
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Controlar a versão do iOS exige dispositivos **supervisionados**, o que vem da inscrição via **Apple Business Manager (ADE)**. A política de atualização / restrição de atualização é então entregue por perfil."
  },
  {
    "id": "Q091",
    "src": 91,
    "domain": 2,
    "topic": "Windows update rings",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that includes Microsoft Intune.\n\nYou have an update ring named UpdateRing1 that contains the following settings:\n\n- Automatic update behavior: Auto install and restart at a scheduled time\n- Automatic behavior frequency: First week of the month\n- Scheduled install day: Tuesday\n- Scheduled install time: 3 AM\n\nFrom the Microsoft Intune admin center, you select Uninstall for the feature updates of UpdateRing1.\n\nWhen will devices start to remove the feature updates?",
    "options": [
      "when a user approves the uninstall",
      "as soon as the policy is received",
      "next Tuesday",
      "the first Tuesday of the next month"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O Uninstall do update ring é aplicado **assim que o dispositivo recebe a política**; não espera a janela de instalação agendada."
  },
  {
    "id": "Q092",
    "src": 92,
    "domain": 2,
    "topic": "Co-existence with Group Policy",
    "type": "single",
    "stem": "You have a hybrid deployment of Azure AD that contains 50 Windows 10 devices. All the devices are enrolled in Microsoft Intune.\n\nYou discover that Group Policy settings override the settings configured in Microsoft Intune policies.\n\nYou need to ensure that the settings configured in Microsoft Intune override the Group Policy settings.\n\nWhat should you do?",
    "options": [
      "From Group Policy Management Editor, configure the Computer Configuration settings in the Default Domain Policy.",
      "From the Microsoft Intune admin center, create a custom device profile.",
      "From the Microsoft Intune admin center, create an Administrative Templates device profile.",
      "From Group Policy Management Editor, configure the User Configuration settings in the Default Domain Policy."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "A configuração **ControlPolicyConflict/MDMWinsOverGP** é entregue por OMA-URI num **perfil custom** (hoje também existe no Settings catalog). Entre as opções, custom é a correta."
  },
  {
    "id": "Q093",
    "src": 93,
    "domain": 5,
    "topic": "Endpoint analytics",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices.\n\nYou need to ensure that the startup performance of managed Windows 11 devices is captured and available for review in the Intune admin center.\n\nWhat should you configure?",
    "options": [
      "the Azure Monitor agent",
      "a device compliance policy",
      "a Conditional Access policy",
      "an Intune data collection policy"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "A coleta de dados do Endpoint analytics para dispositivos gerenciados pelo Intune é ligada pela **Intune data collection policy** (\"Windows health monitoring\")."
  },
  {
    "id": "Q094",
    "src": 94,
    "domain": 2,
    "topic": "iOS updates",
    "type": "yesno",
    "stem": "You have a Microsoft 365 E5 subscription that uses Microsoft Intune.\n\nDevices are enrolled in Intune as shown in the following table.\n\n| Name | Platform | Enrolled by using |\n|---|---|---|\n| Device1 | iOS | Apple Automated Device Enrollment (ADE) |\n| Device2 | iPadOS | Apple Automated Device Enrollment (ADE) |\n| Device3 | iPadOS | The Company Portal app |\n\nThe devices are the members of groups as shown in the following table.\n\n| Name | Members |\n|---|---|\n| Group1 | Device1, Device2, Device3 |\n| Group2 | Device2 |\n\nYou create an iOS/iPadOS update profile as shown in the following exhibit.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "exhibits": [
      {
        "src": "img/Q094-1.png",
        "alt": "Perfil de atualização iOS: Latest update, Update outside of scheduled time, janelas seg 1h–qua 13h e sex 1h–sáb 23h, inclui Group1, exclui Group2"
      }
    ],
    "statements": [
      "If an iOS update becomes available on Tuesday at 5 AM, the update is installed on Device1 automatically on Wednesday.",
      "If an iPadOS update becomes available on Thursday at 2 AM, the update is installed on Device2 automatically on Thursday.",
      "If an iPadOS update becomes available on Friday at 10 PM, the update is installed on Device3 automatically on Sunday."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Com **Update outside of scheduled time**, as janelas listadas são os períodos em que a atualização **não** é instalada. Device1: a atualização sai na terça às 5h, dentro do bloqueio (seg 1h–qua 13h), e é instalada depois das 13h de quarta. Device2 está em Group2, que é **excluído**. Device3 foi inscrito pelo Company Portal, **não é supervisionado**, e políticas de atualização de iOS só valem para dispositivos supervisionados (ADE)."
  },
  {
    "id": "Q095",
    "src": 95,
    "domain": 2,
    "topic": "Policy sets",
    "type": "single",
    "stem": "You have a Microsoft Intune deployment that contains the resources shown in the following table.\n\n| Name | Type | Platform |\n|---|---|---|\n| Comply1 | Device compliance policy | Windows 10 and later |\n| Comply2 | Device compliance policy | iOS/iPadOS |\n| CA1 | Conditional Access policy | Not applicable |\n| Conf1 | Device configuration profile | Windows 10 and later |\n| Office1 | Office app policy | Not applicable |\n\nYou create a policy set named Set1 and add Comply1 to Set1.\n\nWhich additional resources can you add to Set1?",
    "options": [
      "Conf1 only",
      "Comply2 only",
      "Comply2 and Conf1 only",
      "CA1, Conf1, and Office1 only",
      "Comply2, CA1, Conf1, and Office1"
    ],
    "answer": 2,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Policy sets aceitam apps, políticas de app, perfis de configuração, políticas de conformidade e perfis de inscrição, de **qualquer plataforma** no mesmo set. Políticas de Conditional Access e Office app policies não entram."
  },
  {
    "id": "Q096",
    "src": 96,
    "domain": 3,
    "topic": "Defender for Endpoint",
    "type": "single",
    "stem": "You use Microsoft Defender for Endpoint to protect computers that run Windows 10.\n\nYou need to assess the differences between the configuration of Microsoft Defender for Endpoint and the Microsoft-recommended configuration baseline.\n\nWhich tool should you use?",
    "options": [
      "Microsoft Defender for Endpoint Power BI app",
      "Microsoft Secure Score",
      "Endpoint Analytics",
      "Microsoft 365 Defender portal"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O **Microsoft Secure Score** (Secure Score for Devices) compara a configuração atual com as recomendações da Microsoft e lista as ações de melhoria."
  },
  {
    "id": "Q097",
    "src": 97,
    "domain": 3,
    "topic": "Defender for Endpoint",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains 1,000 Windows 11 devices. All the devices are enrolled in Microsoft Intune.\n\nYou plan to integrate Intune with Microsoft Defender for Endpoint.\n\nYou need to establish a service-to-service connection between Intune and Defender for Endpoint.\n\nWhich settings should you configure in the Microsoft Intune admin center?",
    "options": [
      "Premium add-ons",
      "Connectors and tokens",
      "Tenant enrollment",
      "Microsoft Tunnel Gateway"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "A conexão Intune ↔ Defender for Endpoint fica em **Tenant administration > Connectors and tokens > Microsoft Defender for Endpoint** (também acessível por Endpoint security)."
  },
  {
    "id": "Q098",
    "src": 98,
    "domain": 2,
    "topic": "Certificates",
    "type": "order",
    "stem": "You have a Microsoft Intune subscription that is configured to use a PFX certificate connector to an on-premises Enterprise certification authority (CA).\n\nYou need to use Intune to configure autoenrollment for Android devices by using public key pair (PKCS) certificates.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
    "pool": [
      "From the Microsoft Intune admin center, configure enrollment restrictions.",
      "From the Enterprise CA, configure certificate managers.",
      "Obtain the root certificate.",
      "From the Microsoft Intune admin center, create a trusted certificate configuration profile.",
      "From the Microsoft Intune admin center, create a PKCS certificate configuration profile."
    ],
    "answer": [
      2,
      3,
      4
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Com o conector já instalado: exporte o **certificado raiz** da CA → crie o perfil de **trusted certificate** para distribuí-lo → crie o perfil **PKCS**, que referencia o perfil de certificado confiável."
  },
  {
    "id": "Q099",
    "src": 99,
    "domain": 1,
    "topic": "Dynamic groups",
    "type": "single",
    "stem": "Your company uses Microsoft Intune.\n\nMore than 500 Android and iOS devices are enrolled in the Intune tenant.\n\nYou plan to deploy new Intune policies. Different policies will apply depending on the version of Android or iOS installed on the device.\n\nYou need to ensure that the policies can target the devices based on their version of Android or iOS.\n\nWhat should you configure first?",
    "options": [
      "groups that have dynamic membership rules in Azure AD",
      "Device categories in Intune",
      "Corporate device identifiers in Intune",
      "Device settings in Azure AD"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Grupos dinâmicos de dispositivos aceitam regras com **device.deviceOSVersion** e **device.deviceOSType**, o que permite direcionar políticas por versão do sistema."
  },
  {
    "id": "Q100",
    "src": 100,
    "domain": 3,
    "topic": "Exploit protection",
    "type": "match",
    "stem": "You have 500 Windows 10 devices enrolled in Microsoft Intune.\n\nYou plan to use Exploit protection in Microsoft Intune to enable the following system settings on the devices:\n\n- Data Execution Prevention (DEP)\n- Force randomization for images (Mandatory ASLR)\n\nYou need to configure a Windows 10 device that will be used to create a template file.\n\nWhich protection areas on the device should you configure in the Windows Security app before you create the template file? To answer, drag the appropriate protection areas to the correct settings. Each protection area may be used once, more than once, or not at all.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "Account protection",
      "App & browser control",
      "Device security",
      "Virus & threat protection"
    ],
    "targets": [
      {
        "label": "DEP:",
        "answer": 1
      },
      {
        "label": "Mandatory ASLR:",
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "As configurações de **Exploit protection** (DEP, ASLR etc.) ficam em **App & browser control > Exploit protection settings**. O XML exportado de lá é o que vai para o Intune."
  },
  {
    "id": "Q101",
    "src": 101,
    "domain": 1,
    "topic": "Microsoft Entra join",
    "type": "single",
    "stem": "You have an Azure AD tenant named contoso.com.\n\nYou have a workgroup computer named Computer1 that runs Windows 11.\n\nYou need to add Computer1 to contoso.com.\n\nWhat should you use?",
    "options": [
      "dsregcmd.exe",
      "Computer Management",
      "netdom.exe",
      "the Settings app"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O Entra join de um computador já instalado é feito em **Settings > Accounts > Access work or school > Connect > Join this device to Microsoft Entra ID**. dsregcmd serve para diagnóstico/hybrid, e netdom é para AD DS."
  },
  {
    "id": "Q102",
    "src": 102,
    "domain": 3,
    "topic": "Passwordless authentication",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage Windows 11 devices.\n\nYou need to implement passwordless authentication that requires users to use number matching.\n\nWhich authentication method should you use?",
    "options": [
      "Microsoft Authenticator",
      "voice calls",
      "FIDO2 security keys",
      "text messages"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "**Number matching** é um recurso das notificações push do **Microsoft Authenticator**, inclusive no sign-in passwordless pelo telefone."
  },
  {
    "id": "Q103",
    "src": 103,
    "domain": 1,
    "topic": "Compliance policy settings",
    "type": "single",
    "stem": "You use a Microsoft Intune subscription to manage iOS devices.\n\nYou configure a device compliance policy that blocks jailbroken iOS devices.\n\nYou need to enable Enhanced jailbreak detection.\n\nWhat should you configure?",
    "options": [
      "the Compliance policy settings",
      "the device compliance policy",
      "a network location",
      "a configuration profile"
    ],
    "answer": 0,
    "answer_original": 1,
    "scope": "in",
    "review": "corrigida",
    "explanation": "**Enhanced jailbreak detection** é uma configuração de tenant que fica em **Compliance policy settings** (Endpoint security > Device compliance > Compliance policy settings), junto de \"Mark devices with no compliance policy assigned as\" e do período de validade. A política de conformidade só tem o \"Jailbroken devices: Block\". O dump marcava a política."
  },
  {
    "id": "Q104",
    "src": 104,
    "domain": 1,
    "topic": "Entra roles",
    "type": "match",
    "stem": "You have a Microsoft 365 subscription that contains two users named User1 and User2.\n\nYou need to ensure that the users can perform the following tasks:\n\n- User1 must be able to create groups and manage users.\n- User2 must be able to reset passwords for nonadministrative users.\n\nThe solution must use the principle of least privilege.\n\nWhich role should you assign to each user? To answer, drag the appropriate roles to the correct users. Each role may be used once, more than once, or not at all.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "Global Administrator",
      "Helpdesk Administrator",
      "Security Administrator",
      "User Administrator"
    ],
    "targets": [
      {
        "label": "User1:",
        "answer": 3
      },
      {
        "label": "User2:",
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "**User Administrator** cria e gerencia usuários e grupos. **Helpdesk Administrator** redefine senhas de usuários não administradores (e de outros Helpdesk Admins). Global Administrator seria excesso de privilégio."
  },
  {
    "id": "Q105",
    "src": 105,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "yesno",
    "stem": "You have a Microsoft Intune subscription that has the following device compliance policy settings:\n\n- Mark devices with no compliance policy assigned as: Compliant\n- Compliance status validity period (days): 14\n\nOn January 1, you enroll Windows 10 devices in Intune as shown in the following table.\n\n| Name | BitLocker Drive Encryption (BitLocker) | Firewall | Scope (Tags) | Member of |\n|---|---|---|---|---|\n| Device1 | Enabled | Off | Tag1 | Group1 |\n| Device2 | Disabled | On | Tag2 | Group1 |\n\nOn January 4, you create the following two device compliance policies:\n\n- Policy1 — Platform: Windows 10 and later · Require BitLocker: Require · Mark device noncompliant: 5 days after noncompliance · Scope (Tags): Tag1\n- Policy2 — Platform: Windows 10 and later · Firewall: Require · Mark device noncompliant: Immediately · Scope (Tags): Tag2\n\nOn January 5, you assign Policy1 and Policy2 to Group1.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "On January 7, Device1 is marked as compliant.",
      "On January 8, Device1 is marked as compliant.",
      "On January 8, Device2 is marked as compliant."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Scope tags não afetam a atribuição: as duas políticas valem para os dois dispositivos. Device1 está com firewall desligado e Policy2 marca como não conforme **imediatamente** → não conforme em 7 e 8 de janeiro. Device2 está sem BitLocker, mas Policy1 dá **5 dias de carência** (até 10 de janeiro); em carência ele ainda conta como conforme, e o firewall está ligado."
  },
  {
    "id": "Q106",
    "src": 106,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "yesno",
    "stem": "You have a Microsoft 365 subscription that includes Microsoft Intune.\n\nYou have computers that run Windows 11 as shown in the following table.\n\n| Name | Azure AD status | Intune | BitLocker Drive Encryption (BitLocker) | Firewall |\n|---|---|---|---|---|\n| Computer1 | Joined | Enrolled | Disabled | Enabled |\n| Computer2 | Registered | Enrolled | Enabled | Enabled |\n| Computer3 | Registered | Not enrolled | Enabled | Disabled |\n\nYou have the groups shown in the following table.\n\n| Name | Members |\n|---|---|\n| Group1 | Computer1, Computer2 |\n| Group2 | Computer3 |\n\nYou create and assign the compliance policies shown in the following table.\n\n| Name | Configuration | Action for noncompliance | Assignment |\n|---|---|---|---|\n| Policy1 | Require BitLocker to be enabled on the device. | Mark device as noncompliant after 10 days. | Group1 |\n| Policy2 | Require firewall to be on and monitoring. | Mark device as noncompliant immediately. | Group2 |\n\nThe next day, you review the compliance status of the computers.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "The compliance status of Computer1 is in grace period.",
      "The compliance status of Computer2 is Compliant.",
      "The compliance status of Computer3 is Not compliant."
    ],
    "answer": [
      true,
      true,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Computer1 está sem BitLocker e a política dá 10 dias → **In grace period**. Computer2 atende → **Compliant**. Computer3 **não está inscrito no Intune**, então a política não é avaliada nele e ele não aparece como Not compliant."
  },
  {
    "id": "Q107",
    "src": 107,
    "domain": 1,
    "topic": "Windows Hello for Business",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "PIN6"
    },
    "stem": "Your company has an Azure AD tenant named contoso.com that contains several Windows 10 devices.\n\nWhen you join new Windows 10 devices to contoso.com, users are prompted to set up a four-digit pin.\n\nYou need to ensure that the users are prompted to set up a six-digit pin when they join the Windows 10 devices to contoso.com.\n\n**Solution:** From the Microsoft Entra admin center, you configure the Authentication methods.\n\nDoes this meet the goal?",
    "options": [
      "Yes",
      "No"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Authentication methods controla métodos como Authenticator, FIDO2 e SMS. Não define a política de PIN do Windows Hello for Business."
  },
  {
    "id": "Q108",
    "src": 108,
    "domain": 1,
    "topic": "Compliance notifications",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant that contains the objects shown in the following table.\n\n| Name | Type |\n|---|---|\n| Admin1 | User |\n| Group1 | Microsoft 365 group |\n| Group2 | Distribution group |\n| Group3 | Mail-enabled security group |\n| Group4 | Security group |\n\nYou are creating a compliance policy named Compliance1.\n\nWhich objects can you specify in Compliance1 as additional recipients of noncompliance notifications?",
    "options": [
      "Group3 and Group4 only",
      "Group3, Group4, and Admin1 only",
      "Group1, Group2, and Group3 only",
      "Group1, Group2, Group3, and Group4 only",
      "Group1, Group2, Group3, Group4, and Admin1"
    ],
    "answer": 2,
    "shuffle": false,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Destinatários adicionais são escolhidos por **grupo** (não por usuário) e recebem por e-mail, então só fazem sentido grupos com e-mail: Microsoft 365 group, distribution group e mail-enabled security group. Questão marcada como duvidosa porque o seletor do Intune também lista grupos de segurança sem e-mail."
  },
  {
    "id": "Q109",
    "src": 109,
    "domain": 1,
    "topic": "Microsoft Entra join",
    "type": "hotarea",
    "stem": "You have an Azure AD tenant named contoso.com that contains a user named User1. User1 has a user principal name (UPN) of user1@contoso.com.\n\nYou join a Windows 11 device named Client1 to contoso.com.\n\nYou need to add User1 to the local Administrators group of Client1.\n\nHow should you complete the command? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Command: [answer choice] Administrators /add",
        "options": [
          "net accounts",
          "net localgroup",
          "net user"
        ],
        "answer": 1
      },
      {
        "label": "Account prefix: \"[answer choice]\\user1@contoso.com\"",
        "options": [
          "AzureAD",
          "CONTOSO",
          "UPN"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O comando é `net localgroup Administrators /add \"AzureAD\\user1@contoso.com\"`. Contas do Entra ID são referenciadas localmente com o prefixo **AzureAD\\** seguido do UPN."
  },
  {
    "id": "Q110",
    "src": 110,
    "domain": 1,
    "topic": "Entra roles",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription.\n\nYou need to provide a user the ability to manage Security defaults and create Conditional Access policies. The solution must use the principle of least privilege.\n\nWhich role should you assign to the user?",
    "options": [
      "Global Administrator",
      "Conditional Access Administrator",
      "Security Administrator",
      "Intune Administrator"
    ],
    "answer": 1,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O dump marca **Conditional Access Administrator**. Atenção: a documentação do Entra indica **Security Administrator** como função mínima para habilitar/desabilitar Security defaults, e essa função também gerencia políticas de Conditional Access — por isso parte da comunidade marca C. Confira a discussão."
  },
  {
    "id": "Q111",
    "src": 111,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "yesno",
    "stem": "In Microsoft Intune, you have the device compliance policies shown in the following table.\n\n| Name | Type | Encryption | Windows Defender antimalware | Mark device as not compliant | Assigned to |\n|---|---|---|---|---|---|\n| Policy1 | Windows 8.1 and later | Require | Not applicable | 5 days | Group1 |\n| Policy2 | Windows 10 and later | Not configured | Require | 7 days | Group2 |\n| Policy3 | Windows 10 and later | Require | Require | 10 days | Group2 |\n\nThe Intune compliance policy settings are configured as follows:\n\n| Setting | Value |\n|---|---|\n| Mark devices with no compliance policy assigned as | Not Compliant |\n| Enhanced jailbreak detection | Disabled |\n| Compliance status validity period (days) | 30 |\n\nOn June 1, you enroll Windows 10 devices in Intune as shown in the following table.\n\n| Name | Use BitLocker Drive Encryption (BitLocker) | Windows Defender | Member of |\n|---|---|---|---|\n| Device1 | No | Enabled | Group1 |\n| Device2 | No | Enabled | Group2 |\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "On June 4, Device1 is marked as compliant.",
      "On June 6, Device1 is marked as compliant.",
      "On June 9, Device2 is marked as compliant."
    ],
    "answer": [
      true,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Device1 recebe Policy1 (exige criptografia, 5 dias de carência): em 4 de junho ainda está em carência (conta como conforme); em 6 de junho já passou o prazo → não conforme. Device2 recebe Policy2 (Defender ok) e Policy3 (criptografia, 10 dias): em 9 de junho ainda está na carência de Policy3 → conforme."
  },
  {
    "id": "Q112",
    "src": 112,
    "domain": 3,
    "topic": "Account protection",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that contains a user named User1 and uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices that run Windows 11.\n\nUser1 provides remote support for 75 devices in the marketing department.\n\nYou need to add User1 to the Remote Desktop Users group on each marketing department device.\n\nWhat should you configure?",
    "options": [
      "an app configuration policy",
      "a device compliance policy",
      "an account protection policy",
      "a device configuration profile"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O perfil **Local user group membership** fica em **Endpoint security > Account protection** e permite adicionar/substituir membros de grupos locais como Administrators e Remote Desktop Users."
  },
  {
    "id": "Q113",
    "src": 113,
    "domain": 1,
    "topic": "Automatic enrollment",
    "type": "yesno",
    "stem": "You have an Azure AD tenant named contoso.com that contains the users shown in the following table.\n\n| Name | Member of | License |\n|---|---|---|\n| User1 | Group1 | Microsoft 365 E5 |\n| User2 | Group2 | Microsoft 365 E5 |\n\nFor contoso.com, the Mobility (MDM and MAM) settings have the following configurations:\n\n- MDM user scope: Group1\n- MAM user scope: Group2\n\nYou purchase the devices shown in the following table.\n\n| Name | Platform |\n|---|---|\n| Device1 | Windows 11 |\n| Device2 | Windows 10 |\n| Device3 | Android |\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.",
    "statements": [
      "If User1 registers Device1 in contoso.com, Device1 is enrolled automatically in Microsoft Intune.",
      "If User1 joins Device2 to contoso.com, Device2 is enrolled automatically in Microsoft Intune.",
      "If User2 registers Device3 in contoso.com, Device3 is enrolled automatically in Microsoft Intune."
    ],
    "answer": [
      false,
      true,
      false
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O **Entra join** de um Windows por um usuário no MDM user scope dispara a inscrição automática → Device2 sim. Android não usa esse mecanismo, e User2 está no escopo **MAM** → não. A primeira afirmação é a polêmica: a documentação indica que, num Windows pessoal, adicionar a conta de trabalho (registro) também pode inscrever no MDM quando o usuário está no MDM scope; o dump marca Não. (No dump, a segunda afirmação misturava Device1 e Device2; aqui foi uniformizada.)"
  },
  {
    "id": "Q114",
    "src": 114,
    "domain": 2,
    "topic": "Device lifecycle",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to deploy and manage Windows devices.\n\nYou have 100 devices from users that left your company.\n\nYou need to repurpose the devices for new users by removing all the data and applications installed by the previous users. The solution must minimize administrative effort.\n\nWhat should you do?",
    "options": [
      "Deploy a new configuration profile to the devices.",
      "Perform a Windows Autopilot reset on the devices.",
      "Perform an in-place upgrade on the devices.",
      "Perform a clean installation of Windows 11 on the devices."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O **Autopilot Reset** remove apps, dados e configurações pessoais, mantém o vínculo com o Entra ID e o Intune, e devolve o dispositivo pronto para um novo usuário, sem reinstalar a imagem."
  },
  {
    "id": "Q115",
    "src": 115,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "multi",
    "layout": "panel",
    "stem": "You create a Windows Autopilot deployment profile.\n\nYou need to configure the profile settings to meet the following requirements:\n\n- Automatically enroll new devices and provision system apps without requiring end-user authentication.\n- Include the hardware serial number in the computer name.\n\nWhich two settings should you configure? To answer, select the appropriate settings in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "panelTitle": "Create profile — Windows PC · Out-of-box experience (OOBE)",
    "options": [
      "Deployment mode (User-Driven)",
      "Join to Azure AD as (Azure AD joined)",
      "Microsoft Software License Terms",
      "Privacy settings",
      "Hide change account options",
      "User account type",
      "Allow pre-provisioned deployment",
      "Language (Region)",
      "Automatically configure keyboard",
      "Apply device name template"
    ],
    "answer": [
      0,
      9
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Inscrever e provisionar sem autenticação do usuário é o modo **Self-deploying**, configurado em **Deployment mode** (que precisa ser trocado de User-Driven). O número de série no nome vem de **Apply device name template** com a macro `%SERIAL%`."
  },
  {
    "id": "Q116",
    "src": 116,
    "domain": 2,
    "topic": "Remote Desktop",
    "type": "single",
    "stem": "You have a computer named Computer1 that runs Windows 11.\n\nA user named User1 plans to use Remote Desktop to connect to Computer1.\n\nYou need to ensure that the device of User1 is authenticated before the Remote Desktop connection is established and the sign in page appears.\n\nWhat should you do on Computer1?",
    "options": [
      "Turn on Reputation-based protection",
      "Enable Network Level Authentication (NLA)",
      "Turn on Network Discovery",
      "Configure the Remote Desktop Configuration service"
    ],
    "answer": 1,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Com **Network Level Authentication**, a autenticação acontece antes de a sessão RDP ser criada e de a tela de logon aparecer."
  },
  {
    "id": "Q117",
    "src": 117,
    "domain": 1,
    "topic": "Subscription activation",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices.\n\nYou have the devices shown in the following table.\n\n| Name | Operating system | Activation type |\n|---|---|---|\n| Device1 | Windows 10 Pro for Workstation | Key |\n| Device2 | Windows 11 Pro | Key |\n| Device3 | Windows 11 Pro | Subscription |\n\nWhich devices can be changed to Windows 11 Enterprise by using subscription activation?",
    "options": [
      "Device3 only",
      "Device2 and Device3 only",
      "Device1 and Device2 only",
      "Device1, Device2, and Device3"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Subscription activation troca a **edição**, não a versão: Device1 iria para Windows **10** Enterprise. Os dois Windows 11 Pro podem virar Windows 11 Enterprise, independentemente de terem sido ativados por chave ou por assinatura."
  },
  {
    "id": "Q118",
    "src": 118,
    "domain": 2,
    "topic": "Remote Desktop",
    "type": "yesno",
    "stem": "Your network contains an Active Directory domain named adatum.com. The domain contains two computers named Computer1 and Computer2 that run Windows 10. Remote Desktop is enabled on Computer2.\n\nThe domain contains the user accounts shown in the following table.\n\n| Name | Member of |\n|---|---|\n| User1 | Domain Admins |\n| User2 | Domain Users |\n| User3 | Domain Users |\n\nComputer2 contains the local groups shown in the following table.\n\n| Name | Members |\n|---|---|\n| Group1 | ADATUM\\User2, ADATUM\\User3 |\n| Group2 | ADATUM\\User2 |\n| Group3 | ADATUM\\User3 |\n| Administrators | ADATUM\\Domain Admins, ADATUM\\User3 |\n| Remote Desktop Users | Group1 |\n\nThe relevant user rights assignments for Computer2 are shown in the following table.\n\n| Policy | Security Setting |\n|---|---|\n| Allow log on through Remote Desktop Services | Administrators, Remote Desktop Users |\n| Deny log on through Remote Desktop Services | Group2 |\n| Deny log on locally | Group3 |\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can establish a Remote Desktop session to Computer2.",
      "User2 can establish a Remote Desktop session to Computer2.",
      "User3 can establish a Remote Desktop session to Computer2."
    ],
    "answer": [
      true,
      false,
      true
    ],
    "scope": "borderline",
    "review": "ok",
    "explanation": "User1 é Domain Admin → Administrators → permitido. User2 está em Remote Desktop Users (via Group1), mas também em Group2, que tem **Deny log on through RDS** — o deny vence. User3 tem \"Deny log on **locally**\", que não afeta o RDP, e está em Administrators/Remote Desktop Users → permitido."
  },
  {
    "id": "Q119",
    "src": 119,
    "domain": 2,
    "topic": "Remote Desktop",
    "type": "single",
    "stem": "You have two computers named Computer1 and Computer2 that run Windows 10. Computer2 has Remote Desktop enabled.\n\nFrom Computer1, you connect to Computer2 by using Remote Desktop Connection.\n\nYou need to ensure that you can access the local drives on Computer1 from within the Remote Desktop session.\n\nWhat should you do?",
    "options": [
      "From Computer2, configure the Remote Desktop settings.",
      "From Windows Defender Firewall on Computer1, allow Remote Desktop.",
      "From Windows Defender Firewall on Computer2, allow File and Printer Sharing.",
      "From Computer1, configure the Remote Desktop Connection settings."
    ],
    "answer": 3,
    "scope": "borderline",
    "review": "ok",
    "explanation": "O redirecionamento de unidades locais é escolhido no **cliente** (mstsc em Computer1): Local Resources > More > Drives."
  },
  {
    "id": "Q120",
    "src": 120,
    "domain": 1,
    "topic": "Provisioning methods",
    "type": "multi",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune.\n\nYou have five new Windows 11 Pro devices.\n\nYou need to prepare the devices for corporate use. The solution must meet the following requirements:\n\n- Install Windows 11 Enterprise on each device.\n- Install a Windows Installer (MSI) package named App1 on each device.\n- Add a certificate named Certificate1 that is required by App1.\n- Join each device to Azure AD.\n\nWhich three provisioning options can you use? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "subscription activation",
      "a custom Windows image",
      "an in-place upgrade",
      "Windows Autopilot",
      "provisioning packages"
    ],
    "answer": [
      1,
      3,
      4
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Uma **imagem customizada**, o **Windows Autopilot** (com Intune entregando app e certificado) e um **provisioning package** atendem a todos os requisitos sozinhos. Subscription activation só troca a edição, e o in-place upgrade não faz join nem instala app/certificado."
  },
  {
    "id": "Q123",
    "src": 123,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription.\n\nYou plan to use Windows Autopilot to provision 25 Windows 11 devices.\n\nYou need to configure the Out-of-box experience (OOBE) settings.\n\nWhat should you create in the Microsoft Intune admin center?",
    "options": [
      "an enrollment status page (ESP)",
      "a deployment profile",
      "a compliance policy",
      "a PowerShell script",
      "a configuration profile"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "As telas do OOBE (licença, privacidade, tipo de conta, nome do dispositivo, modo de implantação) são definidas no **Autopilot deployment profile**. A ESP só mostra o progresso de apps e políticas."
  },
  {
    "id": "Q124",
    "src": 124,
    "domain": 1,
    "topic": "Subscription activation",
    "type": "single",
    "stem": "You have an Azure AD tenant that contains the devices shown in the following table.\n\n| Name | Operating system | Azure AD join type |\n|---|---|---|\n| Device1 | Windows 11 Pro | Joined |\n| Device2 | Windows 11 Pro | Registered |\n| Device3 | Windows 10 Pro | Joined |\n| Device4 | Windows 10 Pro | Registered |\n\nYou purchase Windows 11 Enterprise E5 licenses.\n\nWhich devices can use Subscription Activation to upgrade to Windows 11 Enterprise?",
    "options": [
      "Device1 only",
      "Device1 and Device2 only",
      "Device1 and Device3 only",
      "Device1, Device2, Device3, and Device4"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Precisa ser **Windows 11** Pro (a ativação não muda a versão) e **Entra joined/hybrid joined** (registro não basta). Só o Device1 atende os dois."
  },
  {
    "id": "Q125",
    "src": 125,
    "domain": 4,
    "topic": "App configuration policies",
    "type": "single",
    "stem": "You have a Microsoft 365 Subscription that uses Microsoft Intune.\n\nYou add apps to Intune as shown in the following table.\n\n| Name | App type |\n|---|---|\n| App1 | Android store app |\n| App2 | Android line-of-business app |\n| App3 | Managed Google Play app |\n\nYou need to create an app configuration policy named Policy1 for the Android Enterprise platform.\n\nWhich apps can you manage by using Policy1?",
    "options": [
      "App2 only",
      "App3 only",
      "App1 and App3 only",
      "App2 and App3 only",
      "App1, App2, and App3"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "App configuration policies para **Android Enterprise** (dispositivos gerenciados) usam as managed configurations do Google Play, então só se aplicam a apps do **Managed Google Play**."
  },
  {
    "id": "Q126",
    "src": 126,
    "domain": 4,
    "topic": "Android Enterprise apps",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune.\n\nYou need to ensure that you can deploy apps to Android Enterprise devices.\n\nWhat should you do first?",
    "options": [
      "Create a configuration profile.",
      "Add a certificate connector.",
      "Configure the Partner device management settings.",
      "Link your managed Google Play account to Intune."
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Android Enterprise depende da vinculação da conta **Managed Google Play** ao Intune; é ela que fornece os apps."
  },
  {
    "id": "Q127",
    "src": 127,
    "domain": 4,
    "topic": "Company Portal",
    "type": "multi",
    "stem": "You have a Microsoft 365 tenant that uses Microsoft Intune.\n\nYou use the Company Portal app to access and install published apps to enrolled devices.\n\nFrom the Microsoft Intune admin center, you add a Microsoft Store app.\n\nWhich two App information types are visible in the Company Portal?\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "Privacy URL",
      "Information URL",
      "Developer",
      "Owner"
    ],
    "answer": [
      0,
      1
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "**Information URL** e **Privacy URL** aparecem para o usuário no Company Portal. Developer e Owner são informativos para administradores no admin center."
  },
  {
    "id": "Q128",
    "src": 128,
    "domain": 2,
    "topic": "Device restrictions",
    "type": "multi",
    "layout": "panel",
    "stem": "You have 200 computers that run Windows 10. The computers are joined to Azure AD and enrolled in Microsoft Intune.\n\nYou need to set a custom image as the wallpaper and sign-in screen.\n\nWhich two settings should you configure in the Device restrictions configuration profile? To answer, select the appropriate settings in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "panelTitle": "Device restrictions — Windows 10 and later · Configuration settings",
    "options": [
      "App Store",
      "Cellular and connectivity",
      "Cloud and Storage",
      "Cloud Printer",
      "Control Panel and Settings",
      "Display",
      "General",
      "Locked Screen Experience",
      "Messaging",
      "Microsoft Edge Browser",
      "Network proxy",
      "Password",
      "Per-app privacy exceptions",
      "Personalization",
      "Printer",
      "Privacy",
      "Projection"
    ],
    "answer": [
      7,
      13
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "A imagem da tela de bloqueio/entrada fica em **Locked Screen Experience**, e o papel de parede em **Personalization** (Desktop background picture URL)."
  },
  {
    "id": "Q129",
    "src": 129,
    "domain": 2,
    "topic": "Edition upgrade",
    "type": "single",
    "stem": "You have computers that run Windows 11 Pro. The computers are joined to Azure AD and enrolled in Microsoft Intune.\n\nYou need to upgrade the computers to Windows 11 Enterprise.\n\nWhat should you configure in Intune?",
    "options": [
      "a device compliance policy",
      "a device cleanup rule",
      "a device enrollment policy",
      "a device configuration profile"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O upgrade de edição é feito com um perfil de configuração do tipo **Edition upgrade and mode switch**."
  },
  {
    "id": "Q130",
    "src": 130,
    "domain": 3,
    "topic": "Controlled folder access",
    "type": "single",
    "stem": "You have computers that run Windows 10 and are managed by using Microsoft Intune.\n\nUsers store their files in a folder named D:\\Folder1.\n\nYou need to ensure that only a trusted list of applications is granted write access to D:\\Folder1.\n\nWhat should you configure in the device configuration profile?",
    "options": [
      "Microsoft Defender Exploit Guard",
      "Microsoft Defender Application Guard",
      "Microsoft Defender SmartScreen",
      "Microsoft Defender Application Control"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "**Controlled folder access** faz parte do **Exploit Guard**: protege pastas e só permite gravação por apps confiáveis/listados."
  },
  {
    "id": "Q131",
    "src": 131,
    "domain": 3,
    "topic": "Endpoint security policies",
    "type": "multi",
    "layout": "panel",
    "stem": "You have a Microsoft 365 E5 subscription that contains 100 Windows 10 devices enrolled in Microsoft Intune.\n\nYou need to create Endpoint security policies to meet the following requirements:\n\n- Hide the Firewall & network protection area in the Windows Security app.\n- Disable the provisioning of Windows Hello for Business on the devices.\n\nWhich two policy types should you use? To answer, select the policies in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "panelTitle": "Endpoint security · Manage",
    "options": [
      "Antivirus",
      "Disk encryption",
      "Firewall",
      "Endpoint detection and response",
      "Attack surface reduction",
      "Account protection",
      "Device compliance",
      "Conditional access"
    ],
    "answer": [
      0,
      5
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "A visibilidade das áreas do app Windows Security é controlada pelo perfil **Windows Security experience**, que fica dentro de **Antivirus**. O Windows Hello for Business é configurado em **Account protection**."
  },
  {
    "id": "Q132",
    "src": 132,
    "domain": 5,
    "topic": "Endpoint analytics",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that contains 100 devices enrolled in Microsoft Intune.\n\nYou need to review the startup processes and how often each device restarts.\n\nWhat should you use?",
    "options": [
      "Endpoint analytics",
      "Device Management",
      "Azure Monitor",
      "Intune Data Warehouse"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "**Endpoint analytics > Startup performance** mostra os processos de inicialização e a frequência de reinícios por dispositivo."
  },
  {
    "id": "Q133",
    "src": 133,
    "domain": 3,
    "topic": "Endpoint security policies",
    "type": "match",
    "stem": "You have a Microsoft 365 subscription that contains devices enrolled in Microsoft Intune.\n\nYou need to create Endpoint security policies to enforce the following requirements:\n\n- Computers that run macOS must have FileVault enabled.\n- Computers that run Windows 10 must have Microsoft Defender Credential Guard enabled.\n- Computers that run Windows 10 must have Microsoft Defender Application Control enabled.\n\nWhich Endpoint security feature should you use for each requirement? To answer, drag the appropriate features to the correct requirements. Each feature may be used once, more than once, or not at all.",
    "pool": [
      "Account protection",
      "Attack surface reduction (ASR)",
      "Disk encryption",
      "Endpoint detection and response (EDR)"
    ],
    "targets": [
      {
        "label": "Computers that run macOS must have FileVault enabled:",
        "answer": 2
      },
      {
        "label": "Computers that run Windows 10 must have Microsoft Defender Application Control enabled:",
        "answer": 1
      },
      {
        "label": "Computers that run Windows 10 must have Microsoft Defender Credential Guard enabled:",
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "FileVault → **Disk encryption**. Application Control (WDAC) → **Attack surface reduction** (perfil Application control). Credential Guard → **Account protection**. Observação: em 2024 o Intune ganhou um nó próprio \"App Control for Business\" no Endpoint security; a resposta segue a estrutura da época da questão."
  },
  {
    "id": "Q134",
    "src": 134,
    "domain": 2,
    "topic": "Delivery Optimization",
    "type": "single",
    "stem": "Your company has 200 computers that run Windows 10. The computers are managed by using Microsoft Intune.\n\nCurrently, Windows updates are downloaded without using Delivery Optimization.\n\nYou need to configure the computers to use Delivery Optimization.\n\nWhat should you create in Intune?",
    "options": [
      "a device compliance policy",
      "a Windows 10 update ring",
      "a device configuration profile",
      "an app protection policy"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Delivery Optimization é configurado num **perfil de configuração**. O update ring define quando instalar, não de onde baixar."
  },
  {
    "id": "Q135",
    "src": 135,
    "domain": 1,
    "topic": "Provisioning packages",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices.\n\nAuto-enrollment in Intune is configured.\n\nYou have 100 Windows 11 devices in a workgroup.\n\nYou need to connect the devices to the corporate wireless network and enroll 100 new Windows 11 devices in Intune.\n\nWhat should you use?",
    "options": [
      "a provisioning package",
      "a Group Policy Object (GPO)",
      "mobile device management (MDM) automatic enrollment",
      "a device configuration policy"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Um **provisioning package** (Windows Configuration Designer) aplica o perfil Wi-Fi e faz o bulk enrollment no Entra/Intune em dispositivos de workgroup, de uma vez só. GPO exige domínio, e a inscrição automática exige que o dispositivo já esteja entrando no Entra."
  },
  {
    "id": "Q136",
    "src": 136,
    "domain": 1,
    "topic": "Device ownership",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 tenant that uses Microsoft Intune to manage personal and corporate devices. The tenant contains Windows 10 devices as shown in the following exhibit.\n\nHow will Intune classify each device after the devices are enrolled in Intune automatically? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "exhibits": [
      {
        "src": "img/Q136-1.png",
        "alt": "Lista de dispositivos LON-CL2 (Azure AD registered, User2) e LON-CL4 (Azure AD joined, User1)"
      }
    ],
    "slots": [
      {
        "label": "Identified by Intune as a personal device:",
        "options": [
          "LON-CL2 only",
          "LON-CL4 only",
          "Both LON-CL2 and LON-CL4",
          "Neither LON-CL2 or LON-CL4"
        ],
        "answer": 0
      },
      {
        "label": "Identified by Intune as a corporate device:",
        "options": [
          "LON-CL2 only",
          "LON-CL4 only",
          "Both LON-CL2 and LON-CL4",
          "Neither LON-CL2 or LON-CL4"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Dispositivos Windows **Entra joined** inscritos automaticamente são marcados como **corporativos**. Dispositivos **Entra registered** (conta de trabalho adicionada a um PC pessoal) são marcados como **pessoais**."
  },
  {
    "id": "Q137",
    "src": 137,
    "domain": 2,
    "topic": "Windows update rings",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices. All devices are in the same time zone.\n\nYou create an update rings policy and assign the policy to all Windows devices.\n\nOn the November 1, you pause the update rings policy.\n\nAll devices remain online.\n\nWithout further modification to the policy, on which date will the devices next attempt to update?",
    "options": [
      "December 1",
      "December 6",
      "November 15",
      "November 22"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "A pausa de um update ring dura **35 dias**. De 1º de novembro + 35 dias = **6 de dezembro**."
  },
  {
    "id": "Q138",
    "src": 138,
    "domain": 3,
    "topic": "Security baselines",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains the devices shown in the following table.\n\n| Name | Operating system | Enrolled in Microsoft Intune |\n|---|---|---|\n| Device1 | Windows 11 | Yes |\n| Device2 | Windows 10 | Yes |\n| Device3 | Android | Yes |\n| Device4 | iOS | Yes |\n\nAll devices have Microsoft Edge installed.\n\nFrom the Microsoft Intune admin center, you create a Microsoft Edge Baseline profile named Edge1.\n\nYou need to apply Edge1 to all the supported devices.\n\nTo which devices should you apply Edge1?",
    "options": [
      "Device1 only",
      "Device1 and Device2 only",
      "Device1, Device2, and Device3 only",
      "Device1, Device2, and Device4 only",
      "Device1, Device2, Device3, and Device4"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Os security baselines do Intune (inclusive o do Microsoft Edge) são só para **Windows 10/11**. No celular, o Edge é configurado com app configuration/app protection policies."
  },
  {
    "id": "Q139",
    "src": 139,
    "domain": 2,
    "topic": "Windows update rings",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune.\n\nYou plan to manage Windows updates by using Intune.\n\nYou create an update ring for Windows 10 and later and configure the User experience settings for the ring as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "exhibits": [
      {
        "src": "img/Q139-1.png",
        "alt": "User experience settings: active hours 8h–17h, deadline feature 5, quality 2, grace period 1, auto reboot before deadline No"
      }
    ],
    "slots": [
      {
        "label": "Automatic restarts are blocked [answer choice].",
        "options": [
          "before 8 AM",
          "between 8 AM and 5 PM",
          "after 5 PM"
        ],
        "answer": 1
      },
      {
        "label": "A restart will be forced on a device [answer choice] after the deadline.",
        "options": [
          "1 day",
          "2 days",
          "5 days"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "As **active hours** (8h às 17h) bloqueiam reinicializações automáticas. Depois que o deadline passa, o **grace period** (1 dia) é o tempo extra antes de forçar o reinício."
  },
  {
    "id": "Q140",
    "src": 140,
    "domain": 5,
    "topic": "Conditional Access reporting",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant.\n\nYou have devices enrolled in Microsoft Intune.\n\nYou assign a conditional access policy named Policy1 to a group named Group1. Policy1 restricts devices marked as noncompliant from accessing Microsoft OneDrive for Business.\n\nYou need to identify which noncompliant devices attempt to access OneDrive for Business.\n\nWhat should you do?",
    "options": [
      "From the Microsoft Entra admin center, review the Conditional Access Insights and Reporting workbook.",
      "From the Microsoft Intune admin center, review Device compliance report.",
      "From the Microsoft Intune admin center, review the Noncompliant devices report.",
      "From the Microsoft Intune admin center, review the Setting compliance report."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Os relatórios do Intune mostram quais dispositivos estão não conformes, mas não as **tentativas de acesso**. O workbook **Conditional Access Insights and Reporting** cruza os logs de sign-in com o resultado das políticas por app e dispositivo."
  },
  {
    "id": "Q141",
    "src": 141,
    "domain": 5,
    "topic": "Reporting",
    "type": "hotarea",
    "stem": "You use Microsoft Intune to manage Windows 10 devices.\n\nYou are designing a reporting solution that will provide reports on the following:\n\n- Compliance policy trends\n- Trends in device and user enrollment\n- App and operating system version breakdowns of mobile devices\n\nYou need to recommend a data source and a data visualization tool for the design.\n\nWhat should you recommend? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Data source:",
        "options": [
          "Audit logs in Azure AD",
          "Audit logs in Microsoft Intune",
          "Azure Synapse Analytics",
          "The Microsoft Intune Data Warehouse"
        ],
        "answer": 3
      },
      {
        "label": "Data visualization tool:",
        "options": [
          "Azure Data Studio",
          "Microsoft Power BI",
          "Microsoft Intune admin center"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Tendências históricas (compliance, inscrição, versões de app/SO) vêm do **Intune Data Warehouse**, e a visualização é feita no **Power BI**."
  },
  {
    "id": "Q142",
    "src": 142,
    "domain": 1,
    "topic": "Hybrid join / auto-enrollment",
    "type": "single",
    "stem": "Your network contains an Active Directory domain. The domain contains 2,000 computers that run Windows 10.\n\nYou implement hybrid Azure AD and Microsoft Intune.\n\nYou need to automatically register all the existing computers to Azure AD and enroll the computers in Intune. The solution must minimize administrative effort.\n\nWhat should you use?",
    "options": [
      "an Autodiscover address record",
      "a Group Policy object (GPO)",
      "an Autodiscover service connection point (SCP)",
      "a Windows Autopilot deployment profile"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Para computadores existentes no domínio, a GPO **Enable automatic MDM enrollment using default Azure AD credentials** dispara a inscrição no Intune depois do hybrid join. O SCP é configurado pelo Entra Connect para o hybrid join em si, e o Autopilot é para dispositivos novos ou resetados."
  },
  {
    "id": "Q143",
    "src": 143,
    "domain": 2,
    "topic": "Windows update rings",
    "type": "hotarea",
    "stem": "You have two computers that run Windows 10. The computers are enrolled in Microsoft Intune as shown in the following table.\n\n| Name | Member of |\n|---|---|\n| Computer1 | Group1 |\n| Computer2 | Group1, Group2 |\n\nWindows 10 update rings are defined in Intune as shown in the following table.\n\n| Name | Quality deferral (days) | Assigned |\n|---|---|---|\n| Ring1 | 3 | Yes |\n| Ring2 | 10 | Yes |\n\nYou assign the update rings as shown in the following table.\n\n| Name | Include | Exclude |\n|---|---|---|\n| Ring1 | Group1 | Group2 |\n| Ring2 | Group2 | Group1 |\n\nWhat is the effect of the configurations on Computer1 and Computer2? To answer, select the appropriate options in the answer area.",
    "slots": [
      {
        "label": "Quality deferral on Computer1:",
        "options": [
          "3 days",
          "7 days",
          "10 days",
          "13 days",
          "No effect"
        ],
        "answer": 0
      },
      {
        "label": "Quality deferral on Computer2:",
        "options": [
          "3 days",
          "7 days",
          "10 days",
          "13 days",
          "No effect"
        ],
        "answer": 4
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Computer1 só está em Group1 → Ring1 (3 dias). Computer2 está nos dois grupos: Ring1 o exclui por Group2 e Ring2 o exclui por Group1. **Exclusão vence inclusão**, então nenhum anel se aplica."
  },
  {
    "id": "Q144",
    "src": 144,
    "domain": 3,
    "topic": "Endpoint protection",
    "type": "multi",
    "layout": "panel",
    "stem": "You have 200 computers that run Windows 10. The computers are joined to Azure AD and enrolled in Microsoft Intune.\n\nYou need to configure an Intune device configuration profile to meet the following requirements:\n\n- Prevent Microsoft Office applications from launching child processes.\n- Block users from transferring files over FTP.\n\nWhich two settings should you configure in the Endpoint protection configuration profile? To answer, select the appropriate settings in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "panelTitle": "Endpoint protection — Windows 10 and later · Configuration settings",
    "options": [
      "Microsoft Defender Application Guard",
      "Microsoft Defender Firewall",
      "Microsoft Defender SmartScreen",
      "Windows Encryption",
      "Microsoft Defender Exploit Guard",
      "Microsoft Defender Application Control",
      "Microsoft Defender Credential Guard",
      "Microsoft Defender Security Center",
      "Local device security options",
      "Xbox services"
    ],
    "answer": [
      1,
      4
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "\"Block Office applications from creating child processes\" é uma regra de **Attack Surface Reduction**, que fica em **Microsoft Defender Exploit Guard**. Bloquear FTP (porta 21) é uma regra do **Microsoft Defender Firewall**."
  },
  {
    "id": "Q145",
    "src": 145,
    "domain": 2,
    "topic": "Device configuration profiles",
    "type": "single",
    "stem": "You have following types of devices enrolled in Microsoft Intune:\n\n- Windows 10\n- Android\n- iOS\n\nFor which types of devices can you create VPN profiles in Microsoft Intune admin center?",
    "options": [
      "Windows 10 only",
      "Windows 10 and Android only",
      "Windows 10 and iOS only",
      "Android and iOS only",
      "Windows 10, Android, and iOS"
    ],
    "answer": 4,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Há template de perfil VPN para Windows, Android (Enterprise) e iOS/iPadOS (e também macOS)."
  },
  {
    "id": "Q146",
    "src": 146,
    "domain": 2,
    "topic": "Device configuration profiles",
    "type": "single",
    "stem": "You are creating a device configuration profile in Microsoft Intune.\n\nYou need to configure specific OMA-URI settings in the profile.\n\nWhich profile type template should you use?",
    "options": [
      "Device restrictions (Windows 10 Team)",
      "Identity protection",
      "Custom",
      "Device restrictions"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Configurações OMA-URI arbitrárias são entregues pelo template **Custom**."
  },
  {
    "id": "Q147",
    "src": 147,
    "domain": 2,
    "topic": "Policy sets",
    "type": "yesno",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune and contains the users shown in the following table.\n\n| Name | Member of |\n|---|---|\n| User1 | Group1 |\n| User2 | None |\n| User3 | None |\n\nYou create a policy set named Set1 with the following content and assignments:\n\n| Section | Content |\n|---|---|\n| Device configuration profiles | ConfigurationProfile1 — Windows 10 and later — Device restrictions |\n| Device compliance policies | CompliancePolicy1 — Windows 10 and later |\n| Windows Autopilot deployment profiles | No results |\n| Enrollment status pages | No results |\n| Included groups | All Users |\n| Excluded groups | Group1 |\n\nYou enroll devices in Intune as shown in the following table.\n\n| Name | Operating system | User |\n|---|---|---|\n| Device1 | Windows 10 | User1 |\n| Device2 | Windows 11 | User2 |\n| Device3 | Android | User3 |\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "If User1 signs in to Device1, Device1 will have both ConfigurationProfile1 and CompliancePolicy1 assigned.",
      "If User2 signs in to Device2, Device2 will have both ConfigurationProfile1 and CompliancePolicy1 assigned.",
      "If User3 signs in to Device3, Device3 will have both ConfigurationProfile1 and CompliancePolicy1 assigned."
    ],
    "answer": [
      false,
      true,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "User1 está em Group1, que é **excluído** do Set1. User2 está em All Users e o Device2 é Windows 11, compatível com políticas \"Windows 10 and later\". User3 é incluído, mas o Device3 é **Android**, e as duas políticas são de Windows."
  },
  {
    "id": "Q148",
    "src": 148,
    "domain": 2,
    "topic": "iOS updates",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription that contains 1,000 iOS devices. The devices are enrolled in Microsoft Intune as follows:\n\n- Two hundred devices are enrolled by using the Intune Company Portal.\n- Eight hundred devices are enrolled by using Apple Automated Device Enrollment (ADE).\n\nYou create an iOS/iPadOS software updates policy named Policy1 that is configured to install iOS/iPadOS 15.5.\n\nHow many iOS devices will Policy1 update, and what should you configure to ensure that only iOS/iPadOS 15.5 is installed? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Number of devices:",
        "options": [
          "200",
          "800",
          "1000"
        ],
        "answer": 1
      },
      {
        "label": "Configure a:",
        "options": [
          "Compliance policy",
          "Conditional Access policy",
          "Device restriction policy"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Políticas de atualização de iOS só valem para dispositivos **supervisionados** (os 800 via ADE). Para impedir que o usuário instale manualmente uma versão mais nova, use **device restrictions** para adiar a visibilidade das atualizações."
  },
  {
    "id": "Q149",
    "src": 149,
    "domain": 1,
    "topic": "Automatic enrollment",
    "type": "yesno",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
    "statements": [
      "If User1 joins a Windows 10 device to Azure AD, the device will be enrolled in Intune automatically.",
      "If User2 joins a Windows 10 device to Azure AD, the device will be enrolled in Intune automatically.",
      "If User3 joins a Windows 10 device to Azure AD, the device will be enrolled in Intune automatically."
    ],
    "answer": [
      true,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O MDM user scope é GroupA. User1 está em GroupA → inscreve. User2 está só em GroupB (escopo MAM) → não inscreve em MDM. User3 está em GroupA e GroupB; quando o usuário está nos dois escopos, **o MDM tem precedência** → inscreve.",
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/enrollment/windows-enroll"
    ]
  },
  {
    "id": "Q150",
    "src": 150,
    "domain": 1,
    "topic": "Autopilot hybrid join",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "You need to ensure that computer objects can be created as part of the Windows Autopilot deployment. The solution must meet the technical requirements.\n\nTo what should you grant the right to create the computer objects?",
    "options": [
      "Server1",
      "DC1",
      "GroupA",
      "Server2"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O **Intune Connector for Active Directory** está instalado no Server1, e é a conta de computador do servidor do conector que cria os objetos de computador no AD durante o Autopilot hybrid join. A delegação \"Create computer objects\" é dada a ela na OU de destino."
  },
  {
    "id": "Q151",
    "src": 151,
    "domain": 2,
    "topic": "VPN profiles",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "You implement the planned changes for Connection1 and Connection2.\n\nHow many VPN connections will there be for User1 when the user signs in to Device1 and Device2? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Device1:",
        "options": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "answer": 1
      },
      {
        "label": "Device2:",
        "options": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "User1 está em GroupA, então recebe Connection1 (VPN1) e Connection2 (VPN2); os dispositivos em Group1/Group2 também recebem Connection1. Connection1 tem o **mesmo nome** da VPN1 já existente e a substitui. Device1: VPN1 + VPN2 = **2**. Device2: VPN1, VPN3 (que já existia) e VPN2 = **3**. A contagem depende de considerar que o perfil com nome igual sobrescreve a conexão local — por isso está como duvidosa."
  },
  {
    "id": "Q152",
    "src": 152,
    "domain": 1,
    "topic": "Enrollment",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "Which user can enroll Device6 in Intune?",
    "options": [
      "User4 and User1 only",
      "User4 and User2 only",
      "User4, User1, and User2 only",
      "User1, User2, User3, and User4"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O gabarito do dump é **User4 e User1**. A lógica é que User1 está no MDM user scope (GroupA) e User4 é Global Administrator. Mas o raciocínio é frágil: User3 também está em GroupA (e, estando nos escopos MDM e MAM, o MDM prevalece), e a inscrição manual pelo Company Portal funciona para qualquer usuário licenciado. Trate como duvidosa e confira a discussão."
  },
  {
    "id": "Q153",
    "src": 153,
    "domain": 4,
    "topic": "App protection policies",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that contains 1,000 iOS devices and includes Microsoft Intune.\n\nYou need to prevent the printing of corporate data from managed apps on the devices.\n\nWhat should you configure?",
    "options": [
      "an app configuration policy",
      "a security baseline",
      "an app protection policy",
      "an iOS app provisioning profile"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "**Printing org data: Block** é uma configuração de transferência de dados da **app protection policy**.",
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/apps/app-protection-policy"
    ]
  },
  {
    "id": "Q154",
    "src": 154,
    "domain": 4,
    "topic": "Microsoft 365 Apps admin center",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains the users shown in the following table.\n\n| Name | Role |\n|---|---|\n| Admin1 | Application Administrator |\n| Admin2 | Cloud Application Administrator |\n| Admin3 | Office Apps Administrator |\n| Admin4 | Security Administrator |\n\nIn the Microsoft 365 Apps admin center, you create a Microsoft Office customization.\n\nWhich users can download the Office customization file from the admin center?",
    "options": [
      "Admin3 only",
      "Admin1 and Admin3 only",
      "Admin3 and Admin4 only",
      "Admin1, Admin2, and Admin3 only",
      "Admin1, Admin2, Admin3, Admin4"
    ],
    "answer": 2,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "No Microsoft 365 Apps admin center, as funções que gerenciam customizações e políticas são **Global Administrator, Office Apps Administrator e Security Administrator**. Application/Cloud Application Administrator gerenciam registros de apps no Entra ID, não o Office."
  },
  {
    "id": "Q155",
    "src": 155,
    "domain": 5,
    "topic": "Reporting",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou need to download a report that lists all the devices that are NOT enrolled in Microsoft Intune and are assigned an app protection policy.\n\nWhat should you select in the Microsoft Intune admin center?",
    "options": [
      "Reports, and then Device compliance",
      "Apps, and then App protection policies",
      "Devices, and then Monitor",
      "Apps, and then Monitor"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Em **Apps > Monitor > App protection status** ficam os relatórios de MAM (App protection report: iOS, Android), que incluem dispositivos não inscritos que receberam política."
  },
  {
    "id": "Q156",
    "src": 156,
    "domain": 4,
    "topic": "App assignment",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant that contains the objects shown in the following table.\n\n| Name | Type |\n|---|---|\n| Admin1 | User |\n| Group1 | Microsoft 365 group |\n| Group2 | Distribution group |\n| Group3 | Mail-enabled security group |\n| Group4 | Security group |\n\nIn the Microsoft Intune admin center, you are creating a Microsoft 365 Apps app named App1.\n\nTo which objects can you assign App1?",
    "options": [
      "Group3 and Group4 only",
      "Admin1, Group3, and Group4 only",
      "Group1, Group3, and Group4 only",
      "Group1, Group2, Group3, and Group4 only",
      "Admin1, Group1, Group2, Group3, and Group4"
    ],
    "answer": 2,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Atribuições no Intune são feitas a **grupos** (não a usuários individuais), e grupos de **distribuição** não são suportados. Restam o grupo do Microsoft 365, o mail-enabled security e o security group. (No dump, a última linha da tabela repete \"Group3\"; aqui foi corrigida para Group4.)"
  },
  {
    "id": "Q157",
    "src": 157,
    "domain": 4,
    "topic": "App protection policies",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou create an app protection policy for Android device named Policy1 as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "exhibits": [
      {
        "src": "img/Q157-1.png",
        "alt": "App protection policy Android: Target to apps on all device types = Yes, Device types = Unmanaged, Target policy to = All Apps"
      }
    ],
    "slots": [
      {
        "label": "To apply Policy1 to an Android device, you must [answer choice].",
        "options": [
          "install the Company Portal app on the device",
          "install the Microsoft Authenticator app on the device",
          "onboard the device to Microsoft Defender for Endpoint",
          "onboard the device to the Microsoft Purview compliance portal"
        ],
        "answer": 0
      },
      {
        "label": "When Policy1 is assigned, the policy will apply to [answer choice].",
        "options": [
          "users only",
          "devices only",
          "users and devices"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "No Android, o **Company Portal** é o broker que aplica as app protection policies (mesmo sem inscrever o dispositivo). App protection policies são atribuídas a **usuários**, nunca a dispositivos."
  },
  {
    "id": "Q158",
    "src": 158,
    "domain": 4,
    "topic": "Managed Google Play",
    "type": "multi",
    "stem": "You have a Microsoft 365 subscription that includes Microsoft Intune.\n\nYou have 500 corporate-owned Android devices enrolled as fully managed devices.\n\nYou need to prepare an app named App1 for deployment to the devices.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "From the Intune Company Portal, download App1.",
      "Sync App1 with Intune.",
      "From the Managed Google Play Store, approve App1.",
      "Create an OEMConfig profile."
    ],
    "answer": [
      1,
      2
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Para Android Enterprise, o app é **aprovado no Managed Google Play** e depois **sincronizado** com o Intune, que passa a listá-lo para atribuição."
  },
  {
    "id": "Q159",
    "src": 159,
    "domain": 1,
    "topic": "Windows 11 upgrade",
    "type": "single",
    "stem": "You have the Windows 10 devices shown in the following table.\n\n| Name | Operating system | Edition |\n|---|---|---|\n| Device1 | 64-bit version of Windows 10 | Home |\n| Device2 | 32-bit version of Windows 10 | Pro |\n| Device3 | 64-bit version of Windows 10 | Enterprise |\n| Device4 | 64-bit version of Windows 10 | Pro |\n\nYou plan to upgrade the devices to Windows 11 Enterprise.\n\nOn which devices can you perform a direct in-place upgrade to Windows 11 Enterprise?",
    "options": [
      "Device3 only",
      "Device3 and Device4 only",
      "Device2, Device3, and Device4 only",
      "Device1, Device3, and Device4 only",
      "Device1, Device2, Device3, and Device4 only"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O Windows 11 é só 64 bits (Device2 fica de fora), e não há caminho direto de upgrade de **Home** para **Enterprise** (Device1). Pro e Enterprise de 64 bits podem ir direto para o Windows 11 Enterprise."
  },
  {
    "id": "Q160",
    "src": 160,
    "domain": 1,
    "topic": "Subscription activation",
    "type": "hotarea",
    "stem": "Your network contains an on-premises Active Directory domain named contoso.com that syncs to Azure AD.\n\nA user named User1 uses the domain-joined devices shown in the following table.\n\n| Name | Operating system |\n|---|---|\n| Device1 | Windows 10 Pro |\n| Device2 | Windows 11 Pro |\n\nIn the Microsoft Entra admin center, you assign a Windows 11 Enterprise E5 license to User1.\n\nYou need to identify what will occur when User1 next signs in to the devices.\n\nWhat should you identify for each device? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Device1:",
        "options": [
          "Will activate as Windows 11 Enterprise",
          "Will not upgrade to Windows 11 Enterprise",
          "Will perform a clean installation of Windows 11 Enterprise",
          "Will perform an in-place upgrade to Windows 11 Enterprise"
        ],
        "answer": 1
      },
      {
        "label": "Device2:",
        "options": [
          "Will activate as Windows 11 Enterprise",
          "Will not upgrade to Windows 11 Enterprise",
          "Will perform a clean installation of Windows 11 Enterprise",
          "Will perform an in-place upgrade to Windows 11 Enterprise"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A subscription activation só troca a **edição**: o Windows 10 Pro vira Windows **10** Enterprise e nunca é atualizado para o 11. O Windows 11 Pro é ativado como Windows 11 Enterprise (considerando os dispositivos hybrid joined pela sincronização com o Entra ID)."
  },
  {
    "id": "Q162",
    "src": 162,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "match",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune.\n\nYou plan to use Windows Autopilot to provision 25 Windows 11 devices.\n\nYou need to meet the following requirements during device provisioning:\n\n- Display the progress of app and profile deployments.\n- Join the devices to Azure AD.\n\nWhat should you configure to meet each requirement? To answer, drag the appropriate settings to the correct requirements. Each setting may be used once, more than once, or not at all.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "CNAME Validation",
      "Co-management Settings",
      "Deployment Profiles",
      "Enrollment notifications",
      "Enrollment Status Page"
    ],
    "targets": [
      {
        "label": "Display the progress of app and profile deployments:",
        "answer": 4
      },
      {
        "label": "Join the devices to Azure AD:",
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A **Enrollment Status Page** mostra o progresso de apps e perfis. O tipo de join (Entra joined ou hybrid) é definido no **Autopilot deployment profile**."
  },
  {
    "id": "Q168",
    "src": 168,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "hotarea",
    "stem": "You have a hybrid Azure AD tenant.\n\nYou configure a Windows Autopilot deployment profile as shown in the following exhibit.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.",
    "exhibits": [
      {
        "src": "img/Q168-1.png",
        "alt": "Perfil Autopilot: User-Driven, Azure AD joined, conta Standard"
      }
    ],
    "slots": [
      {
        "label": "To apply the profile to a new computer, you must first [answer choice].",
        "options": [
          "join the device to Azure AD",
          "enroll the device in Microsoft Intune",
          "import a CSV file into Windows Autopilot"
        ],
        "answer": 2
      },
      {
        "label": "When the Windows Autopilot profile is applied to a computer, the computer will be [answer choice].",
        "options": [
          "joined to Azure AD only",
          "registered in Azure AD only",
          "joined to Active Directory only",
          "joined to Active Directory and registered in Azure AD"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Um computador novo precisa primeiro ser **registrado no Autopilot** (importar o CSV com o hardware hash). O perfil está como **Azure AD joined**, então o computador fica só Entra joined, mesmo com o tenant híbrido."
  },
  {
    "id": "Q169",
    "src": 169,
    "domain": 2,
    "topic": "Windows editions & servicing",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices.\n\nYou plan to create Windows 11 device builds for the marketing and research departments. The solution must meet the requirements:\n\n- Marketing department devices must support Windows Update for Business.\n- Research department devices must have support for feature update versions for up to 36 months from release.\n\nWhat is the minimum Windows 11 edition required for each department? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Marketing:",
        "options": [
          "Windows 11 Enterprise",
          "Windows 11 Pro",
          "Windows 11 Pro for Workstations"
        ],
        "answer": 1
      },
      {
        "label": "Research:",
        "options": [
          "Windows 11 Enterprise",
          "Windows 11 Pro",
          "Windows 11 Pro for Workstations"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O **Windows Update for Business** funciona a partir do **Pro**. As versões de feature update do Windows 11 têm 24 meses de suporte no Pro e **36 meses no Enterprise/Education** (lançamento anual do segundo semestre)."
  },
  {
    "id": "Q170",
    "src": 170,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "single",
    "stem": "You have an Azure AD tenant named contoso.com.\n\nYou plan to use Windows Autopilot to configure the Windows 10 devices shown in the following table.\n\n| Name | Memory | TPM |\n|---|---|---|\n| Device1 | 16 GB | None |\n| Device2 | 8 GB | Version 1.2 |\n| Device3 | 4 GB | Version 2.0 |\n\nWhich devices can be configured by using Windows Autopilot self-deploying mode?",
    "options": [
      "Device2 only",
      "Device3 only",
      "Device1 and Device3 only",
      "Device1, Device2, and Device3"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O modo **self-deploying** usa o TPM para atestar o dispositivo e autenticar sem usuário, então exige **TPM 2.0**. A memória não é critério."
  },
  {
    "id": "Q171",
    "src": 171,
    "domain": 1,
    "topic": "Autopilot hybrid join",
    "type": "hotarea",
    "stem": "Your network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs with an Azure AD tenant.\n\nYou have a Microsoft 365 subscription.\n\nYou plan to use Windows Autopilot to deploy new Windows devices.\n\nYou plan to create a deployment profile.\n\nYou need to ensure that the deployment meets the following requirements:\n\n- Devices must be joined to AD DS regardless of their current working location.\n- Users in the marketing department must have a line-of-business (LOB) app installed during the deployment.\n\nThe solution must minimize administrative effort.\n\nWhat should you do for each requirement? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Devices must be joined to AD DS regardless of their current working location:",
        "options": [
          "Deploy Always On VPN.",
          "Install the Intune connector for Active Directory.",
          "Modify the Autopilot deployment profile.",
          "Edit the Co-management settings in Intune."
        ],
        "answer": 1
      },
      {
        "label": "The marketing department users must have an LOB app installed during the deployment:",
        "options": [
          "Modify the Autopilot deployment profile.",
          "Create a Microsoft Intune app deployment.",
          "Create a device configuration profile in Intune."
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O join ao AD DS pelo Autopilot (hybrid join) exige o **Intune Connector for Active Directory**, que cria o objeto de computador no domínio. O app LOB é entregue por uma **atribuição de app do Intune** (bloqueante na ESP). Ponto de discussão: \"regardless of working location\" sugere também a opção **Skip AD connectivity check** no perfil, que exige VPN — parte da comunidade marca \"Modify the Autopilot deployment profile\"."
  },
  {
    "id": "Q172",
    "src": 172,
    "domain": 2,
    "topic": "WinRM (GPO)",
    "type": "multi",
    "stem": "You have 200 computers that run Windows 10 and are joined to an Active Directory domain.\n\nYou need to enable Windows Remote Management (WinRM) on all the computers by using Group Policy.\n\nWhich three actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "Enable the Allow Remote Shell access setting.",
      "Enable the Allow remote server management through WinRM setting.",
      "Set the Startup Type of the Windows Remote Management (WS-Management) service to Automatic.",
      "Enable the Windows Defender Firewall: Allow inbound Remote Desktop exceptions setting.",
      "Set the Startup Type of the Remote Registry service to Automatic.",
      "Enable the Windows Defender Firewall: Allow inbound remote administration exception setting."
    ],
    "answer": [
      1,
      2,
      5
    ],
    "shuffle": false,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Via GPO são três peças: habilitar o **listener** (Allow remote server management through WinRM), colocar o **serviço WinRM** em automático e liberar o **firewall** para administração remota."
  },
  {
    "id": "Q173",
    "src": 173,
    "domain": 1,
    "topic": "Subscription activation",
    "type": "single",
    "stem": "You have a Microsoft 365 Business Standard subscription and 100 Windows 10 Pro devices.\n\nYou purchase a Microsoft 365 E5 subscription.\n\nYou need to upgrade the Windows 10 Pro devices to Windows 10 Enterprise. The solution must minimize administrative effort.\n\nWhich upgrade method should you use?",
    "options": [
      "Windows Autopilot",
      "a Microsoft Deployment Toolkit (MDT) lite-touch deployment",
      "Subscription Activation",
      "an in-place upgrade by using Windows installation media"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O M365 E5 inclui Windows Enterprise E5. A **subscription activation** eleva Pro → Enterprise no login do usuário licenciado, sem reinstalar nada."
  },
  {
    "id": "Q174",
    "src": 174,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "yesno",
    "stem": "You have devices that are not rooted enrolled in Microsoft Intune as shown in the following table.\n\n| Name | Platform | IP address |\n|---|---|---|\n| Device1 | Windows | 192.168.10.35 |\n| Device2 | Android | 10.10.10.40 |\n| Device3 | Android | 192.168.10.10 |\n\nThe devices are members of a group named Group1.\n\nIn Intune, you create a device compliance location that has the following configurations:\n\n- Name: Network1\n- IPv4 range: 192.168.0.0/16\n\nIn Intune, you create a device compliance policy for the Android platform. The policy has the following configurations:\n\n- Name: Policy1\n- Device health: Rooted devices: Block\n- Locations: Location: Network1\n- Mark device noncompliant: Immediately\n- Assigned: Group1\n\nThe Intune device compliance policy has the following configurations:\n\n- Mark devices with no compliance policy assigned as: Compliant\n- Enhanced jailbreak detection: Enabled\n- Compliance status validity period (days): 20\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "Device1 is marked as compliant.",
      "Device2 is marked as compliant.",
      "Device3 is marked as compliant."
    ],
    "answer": [
      true,
      false,
      true
    ],
    "scope": "borderline",
    "review": "ok",
    "explanation": "Device1 é Windows e não recebe a política de Android; sem política, conta como **Compliant**. Device2 está fora da faixa 192.168.0.0/16 → não conforme imediatamente. Device3 está dentro da faixa e não tem root → conforme. Borderline porque locations só funcionam no Android device administrator, já descontinuado."
  },
  {
    "id": "Q175",
    "src": 175,
    "domain": 1,
    "topic": "Microsoft Entra registration",
    "type": "single",
    "stem": "You need to implement mobile device management (MDM) for personal devices that run Windows 11. The solution must meet the following requirements:\n\n- Ensure that you can manage the personal devices by using Microsoft Intune.\n- Ensure that users can access company data seamlessly from their personal devices.\n- Ensure that users can only sign in to their personal devices by using their personal account.\n\nWhat should you use to add the devices to Azure AD?",
    "options": [
      "Azure AD registered",
      "hybrid Azure AD join",
      "Azure AD joined"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Em dispositivos pessoais (BYOD), o usuário continua entrando com a **conta pessoal** e adiciona a conta de trabalho, o que faz o **Entra registration** (com inscrição no MDM). No Entra join, o logon passa a ser com a conta corporativa."
  },
  {
    "id": "Q176",
    "src": 176,
    "domain": 3,
    "topic": "Conditional Access & compliance",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription.\n\nAll computers are enrolled in Microsoft Intune.\n\nYou have business requirements for securing your Windows 11 environment as shown in the following table.\n\n| Requirement | Detail |\n|---|---|\n| Requirement1 | Ensure that Microsoft Exchange Online can be accessed from known locations only. |\n| Requirement2 | Lock a device that has a high Microsoft Defender for Endpoint risk score. |\n\nWhat should you implement to meet each requirement? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Requirement1:",
        "options": [
          "A conditional access policy",
          "A device compliance policy",
          "A device configuration profile"
        ],
        "answer": 0
      },
      {
        "label": "Requirement2:",
        "options": [
          "A conditional access policy",
          "A device compliance policy",
          "A device configuration profile"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Restringir acesso a um app por localização (named locations) é **Conditional Access**. Reagir ao risco de máquina do Defender (Require the device to be at or under the machine risk score, com ação de não conformidade como bloqueio remoto) é feito na **compliance policy**."
  },
  {
    "id": "Q177",
    "src": 177,
    "domain": 2,
    "topic": "Intune RBAC",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription that contains two security groups named Group1 and Group2. Microsoft 365 uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices.\n\nYou need to assign roles in Intune to meet the following requirements:\n\n- The members of Group1 must manage Intune roles and assignments.\n- The members of Group2 must assign existing apps and policies to users and devices.\n\nThe solution must follow the principle of least privilege.\n\nWhich role should you assign to each group? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Group1:",
        "options": [
          "Help Desk Operator",
          "Intune Role Administrator",
          "Intune Service Administrator",
          "Policy and Profile Manager"
        ],
        "answer": 1
      },
      {
        "label": "Group2:",
        "options": [
          "Help Desk Operator",
          "Intune Role Administrator",
          "Intune Service Administrator",
          "Policy and Profile Manager"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "**Intune Role Administrator** gerencia funções personalizadas e atribuições de RBAC. Pela documentação, o **Help Desk Operator** \"executa tarefas remotas e pode atribuir apps ou políticas existentes a usuários e dispositivos\", sem criar novos — o mínimo exigido. Intune Service Administrator é uma função do Entra com acesso total."
  },
  {
    "id": "Q178",
    "src": 178,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "yesno",
    "stem": "You have devices enrolled in Microsoft Intune as shown in the following table.\n\n| Name | Platform | Encryption | Secure Boot | Member of |\n|---|---|---|---|---|\n| Device1 | Windows 10 | Yes | No | Group1 |\n| Device2 | Windows 10 | No | Yes | Group2 |\n| Device3 | Android | No | Not applicable | Group3 |\n\nIntune includes the device compliance policies shown in the following table.\n\n| Name | Platform | Encryption | Secure Boot |\n|---|---|---|---|\n| Policy1 | Windows 10 | Not configured | Not configured |\n| Policy2 | Windows 10 | Not configured | Required |\n| Policy3 | Windows 10 | Required | Required |\n| Policy4 | Android | Not configured | Not applicable |\n\nThe device compliance policies have the assignments shown in the following table.\n\n| Name | Assigned to |\n|---|---|\n| Policy1 | Group1 |\n| Policy2 | Group1, Group2 |\n| Policy3 | Group3 |\n| Policy4 | Group3 |\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "Device1 is marked as compliant.",
      "Device2 is marked as compliant.",
      "Device3 is marked as compliant."
    ],
    "answer": [
      false,
      true,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Device1 recebe Policy2, que exige Secure Boot, e não tem → não conforme. Device2 recebe Policy2 e tem Secure Boot → conforme. Device3 é Android: Policy3 é de Windows e não se aplica; Policy4 não exige nada → conforme."
  },
  {
    "id": "Q179",
    "src": 179,
    "domain": 3,
    "topic": "Conditional Access & compliance",
    "type": "yesno",
    "stem": "You have a Microsoft 365 subscription that contains a user named User1. The subscription contains devices enrolled in Microsoft Intune as shown in the following table.\n\n| Name | Platform | Member of | Description |\n|---|---|---|---|\n| Device1 | Windows 11 | Group1 | Disk encryption is not configured. |\n| Device2 | Windows 10 | Group2 | Disk encryption is configured. |\n| Device3 | Android | Group3 | Device local storage is not encrypted. |\n\nMicrosoft Edge is available on all the devices.\n\nIntune has the device compliance policies shown in the following table.\n\n| Name | Platform | Setting | Applied to |\n|---|---|---|---|\n| Compliance1 | Windows 10 and later | Require encryption of data storage on device | Group2 |\n| Compliance2 | Android Enterprise | Require encryption of data storage on device | Group3 |\n\nThe Compliance policy settings are configured as follows: Mark devices with no compliance policy assigned as: **Compliant** · Enhanced jailbreak detection: Disabled · Compliance status validity period (days): 30.\n\nYou create the following Conditional Access policy:\n\n- Name: Policy1\n- Assignments — Users and groups: User1 · Cloud apps or actions: Office 365 SharePoint Online\n- Access controls — Grant: Require device to be marked as compliant\n- Enable policy: On\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can access Microsoft SharePoint Online from Device1 by using Microsoft Edge.",
      "User1 can access Microsoft SharePoint Online from Device2 by using Microsoft Edge.",
      "User1 can access Microsoft SharePoint Online from Device3 by using Microsoft Edge."
    ],
    "answer": [
      true,
      true,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Device1 não tem política atribuída e o tenant marca esses dispositivos como **Compliant** → acessa. Device2 tem criptografia, como Compliance1 exige → acessa. Device3 não tem armazenamento criptografado e falha em Compliance2 → bloqueado pelo CA."
  },
  {
    "id": "Q180",
    "src": 180,
    "domain": 1,
    "topic": "Microsoft Entra join",
    "type": "single",
    "stem": "You have an Azure AD tenant named contoso.com.\n\nYou need to ensure that users are not added automatically to the local Administrators group when they join their Windows 11 device to contoso.com.\n\nWhat should you configure?",
    "options": [
      "Windows Autopilot",
      "provisioning packages for Windows",
      "Security defaults in Azure AD",
      "Device settings in Azure AD"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Em **Entra ID > Devices > Device settings** está a opção \"Registering user is added as local administrator on the device during Microsoft Entra join\". Definindo como None, o usuário deixa de virar admin local."
  },
  {
    "id": "Q181",
    "src": 181,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "single",
    "stem": "Your company has devices enrolled in Microsoft Intune as shown in the following table.\n\n| Name | Platform |\n|---|---|\n| Device1 | Windows 10 |\n| Device2 | Android device administrator |\n| Device3 | iOS |\n\nIn Microsoft Intune admin center, you define the company's network as a location named Location1.\n\nWhich devices can use network location-based compliance policies?",
    "options": [
      "Device1 only",
      "Device2 only",
      "Device1 and Device2 only",
      "Device2 and Device3 only",
      "Device1, Device2, and Device3"
    ],
    "answer": 1,
    "shuffle": false,
    "answer_original": 4,
    "scope": "borderline",
    "review": "corrigida",
    "explanation": "A regra de **Locations** (localização de rede) em políticas de conformidade é suportada apenas para **Android device administrator**. O dump marcava os três dispositivos. Como o Android device administrator está descontinuado, a questão ficou como borderline."
  },
  {
    "id": "Q182",
    "src": 182,
    "domain": 5,
    "topic": "Azure Monitor",
    "type": "single",
    "stem": "You have an Azure subscription.\n\nYou have an on-premises Windows 11 device named Device1.\n\nYou plan to monitor Device1 by using Azure Monitor.\n\nYou create a data collection rule (DCR) named DCR1 in the subscription.\n\nTo what should you associate DCR1?",
    "options": [
      "Azure Network Watcher",
      "Device1",
      "a Log Analytics workspace",
      "a Monitored Object"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Para clientes Windows com o Azure Monitor Agent (instalador de cliente), a DCR é associada a um **Monitored Object** criado no tenant, que representa os dispositivos Entra joined. VMs do Azure/Arc é que recebem a DCR diretamente.",
    "refs": [
      "https://learn.microsoft.com/en-us/azure/azure-monitor/agents/azure-monitor-agent-windows-client"
    ]
  },
  {
    "id": "Q183",
    "src": 183,
    "domain": 2,
    "topic": "Windows update rings",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices.\n\nYou need to configure an update ring that meets the following requirements:\n\n- Fixes and improvements to existing Windows functionality can be deferred for 14 days but will install automatically seven days after that date.\n- The installation of new Windows features can be deferred for 90 days but will install automatically 10 days after that date.\n- Devices must restart automatically three days after an update is installed.\n\nHow should you configure the update ring? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Feature update deferral period (days):",
        "options": [
          "3",
          "7",
          "10",
          "14",
          "90"
        ],
        "answer": 4
      },
      {
        "label": "Quality update deferral period (days):",
        "options": [
          "3",
          "7",
          "10",
          "14",
          "90"
        ],
        "answer": 3
      },
      {
        "label": "Deadline for feature updates:",
        "options": [
          "3",
          "7",
          "10",
          "14",
          "90"
        ],
        "answer": 2
      },
      {
        "label": "Grace period:",
        "options": [
          "3",
          "7",
          "10",
          "14",
          "90"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Feature deferral = **90**, quality deferral = **14**, deadline de feature = **10** (contado depois que a atualização é oferecida) e **grace period = 3** dias para o reinício automático. O deadline de quality (7) não estava entre os campos pedidos."
  },
  {
    "id": "Q184",
    "src": 184,
    "domain": 3,
    "topic": "Defender for Endpoint",
    "type": "multi",
    "layout": "panel",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou need to review and implement Microsoft 365 Defender device onboarding. The solution must meet the following requirements:\n\n- View onboarded devices that have the Chromium-based version for Microsoft Edge installed.\n- Download an onboarding package for a Windows 11 device.\n- Minimize administrative effort.\n\nWhich two settings should you use in the Microsoft 365 Defender portal? To answer, select the appropriate settings in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "panelTitle": "Microsoft 365 Defender",
    "options": [
      "Assets › Devices",
      "Assets › Identities",
      "Vulnerability management › Dashboard",
      "Vulnerability management › Recommendations",
      "Vulnerability management › Remediation",
      "Vulnerability management › Inventories",
      "Vulnerability management › Weaknesses",
      "Vulnerability management › Event timeline",
      "Configuration management",
      "Reports",
      "Audit",
      "Health",
      "Permissions & roles",
      "Settings"
    ],
    "answer": [
      0,
      13
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O inventário **Devices** mostra os dispositivos integrados e permite filtrar pelo software instalado. O pacote de onboarding é baixado em **Settings > Endpoints > Onboarding**."
  },
  {
    "id": "Q185",
    "src": 185,
    "domain": 3,
    "topic": "Tamper protection",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that contains 500 computers that run Windows 11. The computers are Azure AD joined and are enrolled in Microsoft Intune.\n\nYou plan to manage Microsoft Defender Antivirus on the computers.\n\nYou need to prevent users from disabling Microsoft Defender Antivirus.\n\nWhat should you do?",
    "options": [
      "From the Microsoft Intune admin center, create a security baseline.",
      "From the Microsoft 365 Defender portal, enable tamper protection.",
      "From the Microsoft Intune admin center, create an account protection policy.",
      "From the Microsoft Intune admin center, create an endpoint detection and response (EDR) policy."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O **tamper protection** impede que usuários (inclusive admins locais) desliguem o Defender Antivirus. Pode ser ligado para o tenant inteiro no **portal do Defender** (Settings > Endpoints > Advanced features) ou por política de Antivirus no Intune — entre as opções desta questão, B é a correta."
  },
  {
    "id": "Q186",
    "src": 186,
    "domain": 5,
    "topic": "Azure Monitor",
    "type": "hotarea",
    "stem": "You have 1,000 computers that run Windows 10 and are members of an Active Directory domain.\n\nYou need to capture the event logs from the computers to Azure.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Azure service to provision:",
        "options": [
          "An Azure Storage account",
          "Azure Cosmos DB",
          "Azure SQL Database",
          "Log Analytics"
        ],
        "answer": 3
      },
      {
        "label": "Action to perform on the computers:",
        "options": [
          "Create a collector-initiated subscription",
          "Install the Azure Monitor Agent",
          "Enroll in Microsoft Intune",
          "Register to Azure AD"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Logs de eventos vão para um **workspace do Log Analytics**, coletados pelo **Azure Monitor Agent** nos computadores, com regras de coleta (DCR) definindo quais logs enviar."
  },
  {
    "id": "Q187",
    "src": 187,
    "domain": 2,
    "topic": "Feature updates",
    "type": "single",
    "stem": "You have a computer named Computer5 that has Windows 10 installed.\n\nYou create a Windows PowerShell script named config.ps1.\n\nYou need to ensure that config.ps1 runs after feature updates are installed on Computer5.\n\nWhich file should you modify on Computer5?",
    "options": [
      "LiteTouch.wsf",
      "SetupConfig.ini",
      "Unattend.bat",
      "Unattend.xml"
    ],
    "answer": 1,
    "scope": "borderline",
    "review": "ok",
    "explanation": "O **SetupConfig.ini** (em %SystemDrive%\\Users\\Default\\AppData\\Local\\Microsoft\\Windows\\WSUS) passa parâmetros ao setup das feature updates, como `PostOOBE=` com o script a executar depois da atualização."
  },
  {
    "id": "Q188",
    "src": 188,
    "domain": 2,
    "topic": "Certificates",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 tenant and an internal certification authority (CA).\n\nYou need to use Microsoft Intune to deploy the root CA certificate to managed devices.\n\nWhich type of Intune policy and profile type template should you use? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Policy type:",
        "options": [
          "App configuration policy",
          "App protection policy",
          "Compliance policy",
          "Configuration profile"
        ],
        "answer": 3
      },
      {
        "label": "Profile type template:",
        "options": [
          "Imported public key pair (PKCS) certificate",
          "Public key pair (PKCS) certificate",
          "Simple Certificate Enrollment Protocol (SCEP) certificate",
          "Trusted certificate"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A CA raiz é distribuída por um **perfil de configuração** do tipo **Trusted certificate**. Os perfis PKCS e SCEP emitem certificados de usuário/dispositivo e dependem desse perfil de raiz."
  },
  {
    "id": "Q189",
    "src": 189,
    "domain": 3,
    "topic": "Defender device groups",
    "type": "hotarea",
    "stem": "Your company uses Microsoft Defender for Endpoint. Microsoft Defender for Endpoint includes the device groups shown in the following table.\n\n| Rank | Name | Members |\n|---|---|---|\n| 1 | Group1 | Tag Equals demo And OS In Windows 10 |\n| 2 | Group2 | Tag Equals demo |\n| 3 | Group3 | Domain Equals adatum.com |\n| 4 | Group4 | Domain Equals adatum.com And OS In Windows 10 |\n| 5 | Group5 | Name starts with COMP |\n| Last | Ungrouped devices (default) | Not applicable |\n\nYou onboard a computer to Microsoft Defender for Endpoint with the following properties:\n\n- Name: computer1\n- Domain: adatum.com\n- OS: Windows10 64-bit (Build 17134)\n\nWhat is the effect of the Microsoft Defender for Endpoint configuration? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Computer1 will be a member of:",
        "options": [
          "Group3 only",
          "Group4 only",
          "Group5 only",
          "Group3, Group4, and Group5 only"
        ],
        "answer": 0
      },
      {
        "label": "If you add the tag demo to Computer1, Computer1 will be a member of:",
        "options": [
          "Group1 only",
          "Group2 only",
          "Group1 and Group2 only",
          "Group1, Group2, Group3, Group4, and Group5"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "No Defender for Endpoint, um dispositivo entra **só no primeiro grupo** (pelo rank) cujas regras ele atende. Sem tag, a primeira correspondência é Group3 (domínio). Com a tag demo e Windows 10, a primeira é Group1."
  },
  {
    "id": "Q190",
    "src": 190,
    "domain": 5,
    "topic": "Reporting",
    "type": "single",
    "stem": "You manage 1,000 devices by using Microsoft Intune.\n\nYou review the Device compliance trends report.\n\nFor how long will the report display trend data?",
    "options": [
      "30 days",
      "60 days",
      "90 days",
      "365 days"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O relatório **Device compliance trends** mostra os últimos **60 dias**."
  },
  {
    "id": "Q191",
    "src": 191,
    "domain": 2,
    "topic": "iOS updates",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription that contains 100 iOS devices enrolled in Microsoft Intune.\n\nYou need to ensure that notifications of iOS updates are deferred for 30 days after the updates are released.\n\nWhat should you create?",
    "options": [
      "an iOS app provisioning profile",
      "a device configuration profile based on the Device features templates",
      "an update policy for iOS/iPadOS",
      "a device configuration profile based on the Device restrictions template"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O adiamento da **visibilidade** de atualizações (\"Defer software updates\", até 90 dias) fica no perfil de **Device restrictions** para dispositivos supervisionados. A update policy de iOS instala versões, não adia a notificação."
  },
  {
    "id": "Q192",
    "src": 192,
    "domain": 2,
    "topic": "Device configuration profiles",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune and contains 100 Windows 10 devices.\n\nYou need to create Intune configuration profiles to perform the following actions on the devices:\n\n- Deploy a custom Start layout.\n- Rename the local Administrator account.\n\nWhich profile type template should you use for each action? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Deploy a custom Start layout:",
        "options": [
          "Delivery optimization",
          "Device restriction",
          "Endpoint protection",
          "Identity protection"
        ],
        "answer": 1
      },
      {
        "label": "Rename the local Administrator account:",
        "options": [
          "Delivery optimization",
          "Device restriction",
          "Endpoint protection",
          "Identity protection"
        ],
        "answer": 2
      }
    ],
    "answer_original": [
      1,
      3
    ],
    "scope": "in",
    "review": "corrigida",
    "explanation": "O layout do Menu Iniciar fica em **Device restrictions > Start**. Renomear a conta Administrator local fica em **Endpoint protection > Local device security options > Accounts**. Identity protection só cobre o Windows Hello for Business. O dump marcava Identity protection na segunda."
  },
  {
    "id": "Q193",
    "src": 193,
    "domain": 1,
    "topic": "Enrollment methods",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription.\n\nYou plan to enable Microsoft Intune enrollment for the following types of devices:\n\n- Existing Windows 11 devices managed by using Configuration Manager\n- Personal iOS devices\n\nThe solution must minimize user disruption.\n\nWhich enrollment method should you use for each device type? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Windows 11 devices managed by using Configuration Manager:",
        "options": [
          "Co-management",
          "User enrollment",
          "Windows Autopilot"
        ],
        "answer": 0
      },
      {
        "label": "Personal iOS devices:",
        "options": [
          "Apple Configurator",
          "Automated Device Enrollment (ADE)",
          "User enrollment"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Dispositivos já gerenciados pelo ConfigMgr entram no Intune pelo **co-management**, sem reinstalação. Para iOS pessoal, a **User enrollment** (Account Driven User Enrollment) separa dados pessoais e corporativos. ADE e Apple Configurator são para dispositivos corporativos."
  },
  {
    "id": "Q194",
    "src": 194,
    "domain": 2,
    "topic": "Co-existence with Group Policy",
    "type": "single",
    "stem": "You have a Windows 10 device named Device1 that is joined to Active Directory and enrolled in Microsoft Intune.\n\nDevice1 is managed by using Group Policy and Intune.\n\nYou need to ensure that the Intune settings override the Group Policy settings.\n\nWhat should you configure?",
    "options": [
      "a device configuration profile",
      "a device compliance policy",
      "an MDM Security Baseline profile",
      "a Group Policy Object (GPO)"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "A política **ControlPolicyConflict/MDMWinsOverGP** é entregue num **perfil de configuração** (Settings catalog ou custom OMA-URI). Veja também a Q92, que cobre o mesmo tema."
  },
  {
    "id": "Q195",
    "src": 195,
    "domain": 1,
    "topic": "Automatic enrollment",
    "type": "yesno",
    "stem": "You have an Azure AD Premium P2 subscription that contains the users shown in the following table.\n\n| Name | Member of | Assigned license |\n|---|---|---|\n| User1 | Group1 | Enterprise Mobility + Security E5 |\n| User2 | Group2 | Enterprise Mobility + Security E5 |\n\nYou purchase the devices shown in the following table.\n\n| Name | Type |\n|---|---|\n| Device1 | Windows 10 |\n| Device2 | Android |\n\nYou configure automatic mobile device management (MDM) and mobile application management (MAM) enrollment by using the following settings:\n\n- MDM user scope: Group1\n- MAM user scope: Group2\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "User1 can enroll Device1 in Intune by using automatic enrollment.",
      "User1 can enroll Device2 in Intune by using automatic enrollment.",
      "User2 can enroll Device1 in Intune by using automatic enrollment."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A inscrição automática pelo MDM user scope é um mecanismo do **Windows** (no Entra join/registro). User1 está no MDM scope → Device1 sim. Android não usa esse recurso. User2 está só no MAM scope → não inscreve em MDM."
  },
  {
    "id": "Q196",
    "src": 196,
    "domain": 3,
    "topic": "Attack surface reduction",
    "type": "hotarea",
    "stem": "You have an MDM Security Baseline profile with the following attack surface reduction settings:\n\n| Setting | Value |\n|---|---|\n| Block Office applications from injecting code into other processes | Disable |\n| Block Office applications from creating executable content | Audit mode |\n| Block all Office applications from creating child processes | Audit mode |\n| Block Win32 API calls from Office macro | Disable |\n| Block execution of potentially obfuscated scripts (js/vbs/ps) | Disable |\n\nYou have an ASR Endpoint Security profile with the following attack surface reduction rules:\n\n| Rule | Value |\n|---|---|\n| Block credential stealing from the Windows local security authority subsystem (lsass.exe) | Audit mode |\n| Block Adobe Reader from creating child processes | Audit mode |\n| Block Office applications from injecting code into other processes | Audit mode |\n| Block Office applications from creating executable content | Audit mode |\n| Block all Office applications from creating child processes | Audit mode |\n| Block Win32 API calls from Office macro | Audit mode |\n\nYou plan to deploy both profiles to devices enrolled in Microsoft Intune.\n\nYou need to identify how the following settings will be configured on the devices:\n\n- Block Office applications from creating executable content\n- Block Win32 API calls from Office macro\n\nCurrently, the settings are disabled locally on each device.\n\nWhat are the effective settings on the devices? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Block Office applications from creating executable content:",
        "options": [
          "Audit mode",
          "Block",
          "Disable",
          "Warn"
        ],
        "answer": 0
      },
      {
        "label": "Block Win32 API calls from Office macro:",
        "options": [
          "Audit mode",
          "Block",
          "Disable",
          "Warn"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Quando dois perfis definem o **mesmo valor**, ele é aplicado (Audit mode). Quando definem **valores diferentes** (Disable × Audit), há **conflito** e nenhum dos dois é aplicado; o dispositivo mantém a configuração local, que é Disabled."
  },
  {
    "id": "Q197",
    "src": 197,
    "domain": 2,
    "topic": "Administrative Templates",
    "type": "order",
    "stem": "You have an on-premises Active Directory domain that syncs to Azure AD tenant.\n\nThe tenant contains computers that run Windows 10. The computers are hybrid Azure AD joined and enrolled in Microsoft Intune. The Microsoft Office settings on the computers are configured by using a Group Policy Object (GPO).\n\nYou need to migrate the GPO to Intune.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
    "pool": [
      "Assign the policy.",
      "Create a compliance policy.",
      "Set a scope tag to the policy.",
      "Import an ADMX file.",
      "Create a configuration profile.",
      "Configure the Administrative Templates settings.",
      "Assign the profile."
    ],
    "answer": [
      4,
      5,
      6
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "As configurações do Office já vêm nos **Administrative Templates** embutidos no Intune: crie o **perfil de configuração** (Templates > Administrative Templates ou Settings catalog), configure as opções equivalentes às da GPO e **atribua o perfil**. Importar ADMX só é necessário para templates de terceiros."
  },
  {
    "id": "Q199",
    "src": 199,
    "domain": 3,
    "topic": "Account protection",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that contains a user named User1 and uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage devices that run Windows 11.\n\nYou need to remove User1 from the local Administrators group on all enrolled devices.\n\nWhat should you configure?",
    "options": [
      "a device compliance policy",
      "an account protection policy",
      "an app configuration policy"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O perfil **Local user group membership** (Endpoint security > Account protection) pode remover membros do grupo Administrators local (ação Remove ou Replace)."
  },
  {
    "id": "Q200",
    "src": 200,
    "domain": 2,
    "topic": "Autopilot Reset",
    "type": "hotarea",
    "stem": "You have computers that run Windows 10 and are configured by using Windows Autopilot.\n\nA user performs the following tasks on a computer named Computer1:\n\n- Creates a VPN connection to the corporate network\n- Installs a Microsoft Store app named App1\n- Connects to a Wi-Fi network\n\nYou perform a Windows Autopilot Reset on Computer1.\n\nWhat will be the state of the computer when the user signs in? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "The Wi-Fi connection will be:",
        "options": [
          "Removed",
          "Retained and the passphrase will be retained",
          "Retained but the passphrase will be reset"
        ],
        "answer": 1
      },
      {
        "label": "App1 will be:",
        "options": [
          "Reinstalled at sign-in",
          "Removed",
          "Retained"
        ],
        "answer": 1
      },
      {
        "label": "The VPN connection will be:",
        "options": [
          "Removed",
          "Retained and the credentials will be cached",
          "Retained but the credentials will be reset"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O Autopilot Reset remove arquivos, apps e configurações pessoais, mas **preserva as conexões Wi-Fi** (com a senha), o vínculo com o Entra ID e o Intune, para o dispositivo voltar à rede. O app instalado pelo usuário e a VPN que ele criou são removidos."
  },
  {
    "id": "Q202",
    "src": 202,
    "domain": 2,
    "topic": "PowerShell remoting",
    "type": "single",
    "stem": "You have a workgroup computer named Client1 that runs Windows 11 and connects to a public network.\n\nYou need to enable PowerShell remoting on Client1. The solution must ensure that PowerShell remoting connections are accepted from the local subnet only.\n\nWhich PowerShell command should you run?",
    "options": [
      "Set-PSSessionConfiguration –AccessMode Local",
      "Enable-PSRemoting –SkipNetworkProfileCheck",
      "Enable-PSRemoting –Force",
      "Set-NetFirewallRule –Name \"WINRM-HTTP-In-TCP-PUBLIC\" –RemoteAddress Any"
    ],
    "answer": 1,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Em rede **pública**, o Enable-PSRemoting falha por padrão. Com **-SkipNetworkProfileCheck**, ele habilita o remoting e cria a regra de firewall do perfil público restrita à **sub-rede local**. Com `-AccessMode Local` só seriam aceitas sessões do próprio computador."
  },
  {
    "id": "Q203",
    "src": 203,
    "domain": 3,
    "topic": "Passwordless authentication",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription.\n\nYou need to enable passwordless authentication for all users. The solution must meet the following requirements:\n\n- Users in the research department cannot use mobile devices and must authenticate from unmanaged Linux devices by using an alternative method.\n- To access services, users in the sales department must authenticate by using their mobile phone.\n- Administrative effort must be minimized.\n\nWhich authentication method should you use for each department? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Sales:",
        "options": [
          "FIDO2 security keys",
          "Microsoft Authenticator",
          "Temporary Access Pass",
          "Windows Hello for Business"
        ],
        "answer": 1
      },
      {
        "label": "Research:",
        "options": [
          "FIDO2 security keys",
          "Microsoft Authenticator",
          "Temporary Access Pass",
          "Windows Hello for Business"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Passwordless pelo celular é o **Microsoft Authenticator**. Sem celular e em Linux não gerenciado (o Windows Hello for Business é só para Windows), a alternativa passwordless é a **chave de segurança FIDO2**. O Temporary Access Pass é temporário, para onboarding e recuperação."
  },
  {
    "id": "Q204",
    "src": 204,
    "domain": 4,
    "topic": "App protection policies",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription.\n\nUsers have iOS devices that are not enrolled in Microsoft Intune.\n\nYou create an app protection policy for the Microsoft Outlook app as shown in the exhibit.\n\nYou need to configure the policy to meet the following requirements:\n\n- Prevent the users from using the Outlook app if the operating system version is less than 12.0.0.\n- Require the users to use an alphanumeric passcode to access the Outlook app.\n\nWhat should you configure in an app protection policy for each requirement? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "exhibits": [
      {
        "src": "img/Q204-1.png",
        "alt": "App protection policy: Device types = Unmanaged, Public apps = Microsoft Outlook"
      }
    ],
    "slots": [
      {
        "label": "Prevent the users from using Outlook if the operating system version is less than 12.0.0:",
        "options": [
          "Access requirements",
          "Conditional launch",
          "Data protection",
          "Scope"
        ],
        "answer": 1
      },
      {
        "label": "Require the users to use an alphanumeric passcode to access Outlook:",
        "options": [
          "Access requirements",
          "Conditional launch",
          "Data protection",
          "Scope"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Versão mínima do SO (Min OS version com ação Block access) fica em **Conditional launch**. O PIN do app e o tipo (numérico ou passcode) ficam em **Access requirements**."
  },
  {
    "id": "Q205",
    "src": 205,
    "domain": 5,
    "topic": "Windows updates reporting",
    "type": "single",
    "stem": "You manage 1,000 computers that run Windows 10. All the computers are enrolled in Microsoft Intune. You manage the servicing channel settings of the computers by using Intune.\n\nYou need to review the servicing status of a computer.\n\nWhat should you do?",
    "options": [
      "From Device configuration – Profiles, view the device status.",
      "From Software updates, view the Per update ring deployment state.",
      "From Software updates, view the audit logs.",
      "From Device compliance, view the device compliance."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O status de cada dispositivo em relação ao update ring aparece em **Software updates > Per update ring deployment state** (hoje, Devices > Windows updates > Update rings > device status)."
  },
  {
    "id": "Q206",
    "src": 206,
    "domain": 3,
    "topic": "Exploit Guard",
    "type": "hotarea",
    "stem": "Your network contains an Active Directory domain. Active Directory is synced with Azure AD.\n\nThere are 500 Active Directory domain-joined computers that run Windows 10 and are enrolled in Microsoft Intune.\n\nYou plan to implement Microsoft Defender Exploit Guard.\n\nYou need to create a custom Microsoft Defender Exploit Guard policy, and then distribute the policy to all the computers.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Tool to use to configure the settings:",
        "options": [
          "Microsoft Purview compliance portal",
          "Windows Security app",
          "Microsoft Intune admin center"
        ],
        "answer": 2
      },
      {
        "label": "Distribution method:",
        "options": [
          "An Azure policy",
          "An Endpoint Protection configuration profile",
          "An Intune device compliance policy",
          "A device restrictions configuration profile"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O Exploit Guard é distribuído por um perfil **Endpoint protection**. O dump marca o **Intune admin center** como ferramenta. Ponto de discussão: para a parte de **Exploit protection**, o XML customizado é gerado no **Windows Security app** de um dispositivo de referência (veja a Q100) e depois importado no Intune; por isso parte da comunidade marca Windows Security app."
  },
  {
    "id": "Q207",
    "src": 207,
    "domain": 1,
    "topic": "Enrollment DNS",
    "type": "single",
    "stem": "You have a Microsoft Intune subscription associated to an Azure AD tenant named contoso.com.\n\nUsers use one of the following three suffixes when they sign in to the tenant: us.contoso.com, eu.contoso.com, or contoso.com.\n\nYou need to ensure that the users are NOT required to specify the mobile device management (MDM) enrollment URL as part of the enrollment process. The solution must minimize the number of changes.\n\nWhich DNS records do you need?",
    "options": [
      "one TXT record only",
      "three CNAME records",
      "three TXT records",
      "one CNAME record only"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O registro **CNAME EnterpriseEnrollment** aponta para enterpriseenrollment-s.manage.microsoft.com e precisa existir para **cada sufixo de UPN** usado na inscrição: três domínios, três CNAMEs."
  },
  {
    "id": "Q208",
    "src": 208,
    "domain": 1,
    "topic": "Enrollment settings",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription.\n\nYou plan to enroll devices in Microsoft Intune that have the platforms and versions shown in the following table.\n\n| Platform | Version |\n|---|---|\n| Android | 8, 9 |\n| iOS | 11, 12 |\n\nYou need to configure device enrollment to meet the following requirements:\n\n- Ensure that only devices that have approved platforms and versions can enroll in Microsoft Intune.\n- Ensure that devices are added to Azure AD groups based on a selection made by users during the enrollment.\n\nWhich device enrollment setting should you configure for each requirement? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Ensure that only devices that have approved platforms and versions can enroll in Microsoft Intune:",
        "options": [
          "Android enrollment",
          "Apple enrollment",
          "Corporate device identifiers",
          "Device categories",
          "Enrollment restrictions",
          "Windows enrollment"
        ],
        "answer": 4
      },
      {
        "label": "Ensure that devices are added to Azure AD groups based on a selection made by users during enrollment:",
        "options": [
          "Android enrollment",
          "Apple enrollment",
          "Corporate device identifiers",
          "Device categories",
          "Enrollment restrictions",
          "Windows enrollment"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "As **enrollment restrictions** (device platform restrictions) definem plataformas e versões mínimas/máximas permitidas. As **device categories** fazem o usuário escolher uma categoria no Company Portal, e grupos dinâmicos (`device.deviceCategory`) colocam o dispositivo no grupo certo."
  },
  {
    "id": "Q209",
    "src": 209,
    "domain": 3,
    "topic": "Disk encryption",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 tenant that uses Microsoft Intune and contains the devices shown in the following table.\n\n| Name | Platform |\n|---|---|\n| Device1 | Windows 10 |\n| Device2 | macOS |\n\nIn Microsoft Intune Endpoint security, you need to configure a disk encryption policy for each device.\n\nWhich encryption type should you use for each device, and which role-based access control (RBAC) role in Intune should you use to manage the encryption keys? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Device1:",
        "options": [
          "FileVault",
          "Cryptsetup",
          "Encrypting File System (EFS)",
          "BitLocker Drive Encryption (BitLocker)"
        ],
        "answer": 3
      },
      {
        "label": "Device2:",
        "options": [
          "FileVault",
          "Cryptsetup",
          "Encrypting File System (EFS)",
          "BitLocker Drive Encryption (BitLocker)"
        ],
        "answer": 0
      },
      {
        "label": "RBAC role:",
        "options": [
          "Help Desk Operator",
          "Application Manager",
          "Intune Role Administrator",
          "Policy and Profile Manager"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Windows usa **BitLocker** e macOS usa **FileVault**. Entre as funções listadas, o **Help Desk Operator** tem as permissões de tarefas remotas para rotacionar chaves de recuperação (BitLocker/FileVault) e consultá-las para dar suporte."
  },
  {
    "id": "Q210",
    "src": 210,
    "domain": 5,
    "topic": "Log Analytics",
    "type": "order",
    "stem": "Your company has a Microsoft 365 E5 tenant.\n\nAll the devices of the company are enrolled in Microsoft Intune.\n\nYou need to create advanced reports by using custom queries and visualizations from raw Microsoft Intune data.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
    "pool": [
      "Create a Microsoft SharePoint Online site.",
      "Purchase an Azure subscription.",
      "Add diagnostic settings.",
      "Install Microsoft Power BI Desktop.",
      "Create a Log Analytics workspace.",
      "Add a certificate connector to Microsoft Intune."
    ],
    "answer": [
      1,
      4,
      2
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Para enviar logs do Intune para consultas KQL: é preciso uma **assinatura Azure**, depois um **workspace do Log Analytics**, e por fim **Diagnostic settings** no Intune apontando para o workspace."
  },
  {
    "id": "Q211",
    "src": 211,
    "domain": 3,
    "topic": "Defender for Endpoint onboarding",
    "type": "match",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Defender for Endpoint.\n\nYou plan to onboard the following types of devices to Defender for Endpoint:\n\n- macOS\n- Linux Server\n\nWhat should you use to onboard each device? To answer, drag the appropriate tools to the correct device types. Each tool may be used once, more than once, or not at all.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "Ansible",
      "Group Policy",
      "Microsoft Intune",
      "Virtual Desktop Infrastructure (VDI) scripts"
    ],
    "targets": [
      {
        "label": "macOS:",
        "answer": 2
      },
      {
        "label": "Linux Server:",
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "macOS é integrado via **Intune** (ou outro MDM / script local). Para Linux, os métodos documentados são script manual, Puppet, **Ansible** e Chef. Group Policy e scripts VDI são só para Windows."
  },
  {
    "id": "Q212",
    "src": 212,
    "domain": 2,
    "topic": "Kiosk",
    "type": "single",
    "stem": "You have a Windows 10 device named Computer1 enrolled in Microsoft Intune.\n\nYou need to configure Computer1 as a public workstation that will run a single customer-facing, full-screen application.\n\nWhich configuration profile type template should you use in Microsoft Intune admin center?",
    "options": [
      "Shared multi-user device",
      "Device restrictions",
      "Kiosk",
      "Endpoint protection"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O template **Kiosk** (single-app, full-screen) atende exatamente a esse cenário."
  },
  {
    "id": "Q213",
    "src": 213,
    "domain": 2,
    "topic": "Policy sets",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Microsoft Intune to manage Windows 11 devices.\n\nYou create a new policy set named Set1 and add five device configuration profiles for Windows 10 and later.\n\nYou create a device compliance policy named Policy1.\n\nYou need to ensure that when users are assigned the device configuration profiles in Set1, they are always assigned Policy1 also.\n\nWhat should you configure?",
    "options": [
      "the assignments of Policy1",
      "the Policy1 configurations",
      "the assignments of Set1",
      "the Set1 configurations"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Basta **adicionar Policy1 ao conteúdo do Set1** (editar o policy set). Assim, quem recebe o Set1 recebe todos os objetos dele juntos."
  },
  {
    "id": "Q214",
    "src": 214,
    "domain": 2,
    "topic": "Delivery Optimization",
    "type": "hotarea",
    "stem": "Your network contains an on-premises Active Directory domain that contains the locations shown in the following table.\n\n| Name | Internal IP address | Public Network Address Translation (NAT) IP address | Active Directory site |\n|---|---|---|---|\n| Location1 | 10.10.0.0/16 | 131.107.15.0/24 | Site1 |\n| Location2 | 10.20.0.0/16 | 131.107.16.0/24 | Site1 |\n| Location3 | 172.16.0.0/16 | 131.107.196.0/24 | Site2 |\n\nIn Microsoft Intune, you enroll the Windows 10 devices shown in the following table.\n\n| Name | IP address |\n|---|---|\n| Device1 | 10.10.0.50 |\n| Device2 | 10.20.1.150 |\n| Device3 | 10.10.1.155 |\n| Device4 | 172.16.0.30 |\n\nYou have a Delivery Optimization device configuration profile applied to all the devices. The profile is configured as shown in the following exhibit.\n\nFrom which devices can Device1 and Device2 get updates? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "exhibits": [
      {
        "src": "img/Q214-1.png",
        "alt": "Delivery Optimization: Download mode = HTTP blended with peering across private group (2), Restrict Peer Selection = Subnet mask, Group ID source = AD site"
      }
    ],
    "slots": [
      {
        "label": "Device1:",
        "options": [
          "Can get updates from Device3 only.",
          "Cannot get updates from any device.",
          "Can get updates from Device1 and Device3 only.",
          "Can get updates from Device1, Device3, and Device4."
        ],
        "answer": 0
      },
      {
        "label": "Device2:",
        "options": [
          "Can get updates from Device3 only.",
          "Cannot get updates from any device.",
          "Can get updates from Device1 and Device3 only.",
          "Can get updates from Device1, Device3, and Device4."
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O modo **Group (2)** agrupa os peers pelo **AD site** (Site1: Device1, Device2 e Device3), e **Restrict Peer Selection = Subnet mask** limita os peers à mesma sub-rede. Device1 e Device3 estão em 10.10.0.0/16 e trocam conteúdo entre si. Device2 (10.20.x) está no mesmo site, mas em outra sub-rede, então não tem peers."
  },
  {
    "id": "Q215",
    "src": 215,
    "domain": 2,
    "topic": "Device configuration profiles",
    "type": "single",
    "stem": "You have 200 computers that run Windows 10. The computers are joined to Azure AD and enrolled in Microsoft Intune.\n\nYou need to enable self-service password reset on the sign-in screen.\n\nWhich settings should you configure from the Microsoft Intune admin center?",
    "options": [
      "Device configuration",
      "Device enrollment",
      "Conditional access",
      "Device compliance"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "O link de redefinição de senha na tela de logon é habilitado por um **perfil de configuração** (Authentication/AllowAadPasswordReset, via Settings catalog ou custom). O SSPR em si é habilitado no Entra ID."
  },
  {
    "id": "Q216",
    "src": 216,
    "domain": 5,
    "topic": "Endpoint analytics",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 tenant that uses Microsoft Intune.\n\nFrom the Microsoft Intune admin center, you plan to create a baseline to monitor the Startup score and the App reliability score of enrolled Windows 10 devices.\n\nYou need to identify which tool to use to create the baseline and the minimum number of devices required to create the baseline.\n\nWhat should you identify? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Tool to use:",
        "options": [
          "Workloads",
          "Log Analytics",
          "Endpoint analytics",
          "Security baselines"
        ],
        "answer": 2
      },
      {
        "label": "Minimum number of devices:",
        "options": [
          "1",
          "5",
          "10",
          "25"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Startup score e App reliability são do **Endpoint analytics**, e baselines/scores exigem dados de no mínimo **10 dispositivos**."
  },
  {
    "id": "Q217",
    "src": 217,
    "domain": 5,
    "topic": "Endpoint analytics",
    "type": "single",
    "stem": "You are implementing Microsoft Intune Suite.\n\nYou enroll devices in Intune as shown in the following table.\n\n| Name | Platform |\n|---|---|\n| Device1 | Windows 11 |\n| Device2 | Windows 10 |\n| Device3 | Android |\n| Device4 | iOS |\n\nThe performance of which devices can be analyzed by using Endpoint analytics?",
    "options": [
      "Device1 only",
      "Device1 and Device2 only",
      "Device1, Device2, and Device3 only",
      "Device1, Device2, and Device4 only",
      "Device1, Device2, Device3, and Device4"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O Endpoint analytics coleta dados de desempenho só de **Windows 10/11** (Pro, Enterprise, Education)."
  },
  {
    "id": "Q218",
    "src": 218,
    "domain": 3,
    "topic": "Defender for Endpoint",
    "type": "single",
    "stem": "You have the devices shown in the following table.\n\n| Name | Operating system | Domain member |\n|---|---|---|\n| Device1 | Windows 11 Enterprise | No |\n| Device2 | Windows 10 Pro | Yes |\n| Device3 | Android | No |\n| Device4 | Mac OS X | No |\n\nYou plan to implement Microsoft Defender for Endpoint.\n\nYou need to identify which devices can be onboarded to Microsoft Defender for Endpoint.\n\nWhat should you identify?",
    "options": [
      "Device1 only",
      "Device2 only",
      "Device1, Device2 only",
      "Device1, Device2, and Device3 only",
      "Device1, Device2, Device3, and Device4"
    ],
    "answer": 3,
    "shuffle": false,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O dump marca D, excluindo o \"Mac OS X\". Hoje o Defender for Endpoint suporta Windows, **macOS** (a versão atual e as duas anteriores), Linux, Android e iOS. A interpretação do dump é que \"Mac OS X\" (10.x) é uma versão antiga, fora do suporte. Se a prova disser apenas \"macOS\", a resposta seria todos os quatro."
  },
  {
    "id": "Q219",
    "src": 219,
    "domain": 4,
    "topic": "Conditional Access (MAM)",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription.\n\nYou use app protection policies to protect corporate data on Android devices.\n\nYou need to ensure that any user connecting from an Android device can only access the corporate data if they connect from an app that supports mobile application management (MAM).\n\nWhat should you configure?",
    "options": [
      "an app configuration policy",
      "a Conditional Access policy",
      "a device configuration profile",
      "a device compliance policy"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Uma política de **Conditional Access** com o controle **Require app protection policy** (antes, \"Require approved client app\") só libera acesso de apps que suportam MAM."
  },
  {
    "id": "Q220",
    "src": 220,
    "domain": 4,
    "topic": "App assignment",
    "type": "single",
    "stem": "Your company has a Microsoft 365 subscription.\n\nAll the users in the finance department own personal devices that run iOS or Android. All the devices are enrolled in Microsoft Intune.\n\nThe finance department adds new users each month.\n\nThe company develops a mobile application named App1 for the finance department users.\n\nYou need to ensure that only the finance department users can download App1.\n\nWhat should you do first?",
    "options": [
      "Register App1 in Azure AD.",
      "Add App1 to the vendor stores for iOS and Android applications.",
      "Add App1 to a Microsoft Deployment Toolkit (MDT) deployment share.",
      "Add App1 to Intune."
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Um app próprio (LOB) é **adicionado ao Intune** e atribuído como Available ao grupo do departamento de finanças, aparecendo só para eles no Company Portal. Publicar nas lojas o deixaria público."
  },
  {
    "id": "Q221",
    "src": 221,
    "domain": 4,
    "topic": "Microsoft Edge management",
    "type": "match",
    "stem": "You have a Microsoft 365 subscription that contains the devices shown in the following table.\n\n| Name | Platform | Enrolled in Microsoft Intune |\n|---|---|---|\n| Device1 | Windows 10 | Yes |\n| Device2 | Android Enterprise | Yes |\n| Device3 | iOS/iPadOS | Yes |\n\nYou need to configure the Microsoft Edge settings for each device.\n\nWhat should you use? To answer, drag the appropriate Intune features to the correct devices. Each feature may be used once, more than once, or not at all.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "App configuration policy",
      "Device compliance policy",
      "Device configuration profile",
      "Endpoint security policy"
    ],
    "targets": [
      {
        "label": "Device1:",
        "answer": 2
      },
      {
        "label": "Device2:",
        "answer": 0
      },
      {
        "label": "Device3:",
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "No Windows, o Edge é configurado por **perfil de configuração** (Administrative Templates/Settings catalog). No Android e no iOS, o Edge é um app gerenciado configurado por **app configuration policy**."
  },
  {
    "id": "Q222",
    "src": 222,
    "domain": 4,
    "topic": "Policies for Office apps",
    "type": "yesno",
    "stem": "You have a Microsoft 365 E5 subscription that uses Microsoft Intune. The subscription contains the users shown in the following table.\n\n| Name | Member of |\n|---|---|\n| User1 | Group1, Group2 |\n| User2 | Group2 |\n| User3 | Group3 |\n\nGroup2 and Group3 are members of Group1.\n\nAll the users use Microsoft Excel.\n\nFrom the Microsoft Intune admin center, you create the policies shown in the following table.\n\n| Name | Type | Priority | Assigned to | Default file format for Excel |\n|---|---|---|---|---|\n| Policy1 | Policies for Office apps | 0 | Group1 | OpenDocument Spreadsheet (*.ods) |\n| Policy2 | Policies for Office apps | 1 | Group2 | Excel Binary Workbook (*.xlsb) |\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "When User1 saves a new spreadsheet, the .ods format is used.",
      "When User2 saves a new spreadsheet, the .xlsb format is used.",
      "When User3 saves a new spreadsheet, the .xlsx format is used."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "As políticas para apps do Office (Cloud Policy) consideram **grupos aninhados**, e a de **prioridade 0 vence**. Os três usuários são membros (diretos ou aninhados) de Group1, então recebem Policy1 → .ods para todos."
  },
  {
    "id": "Q223",
    "src": 223,
    "domain": 4,
    "topic": "Win32 apps",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 E5 subscription that contains a computer named Computer1 that runs Windows 11. Computer1 is enrolled in Microsoft Intune.\n\nYou need to deploy an app named App1 to Computer1. The App1 installation will use multiple files.\n\nWhat should you use to package App1, and which file format will be used? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Use:",
        "options": [
          "Deployment Image Servicing and Management (DISM)",
          "Microsoft Application Virtualization (App-V) Sequencer",
          "Win32 Content Prep Tool",
          "Windows Package Manager"
        ],
        "answer": 2
      },
      {
        "label": "File format:",
        "options": [
          ".apk",
          ".appv",
          ".intunewin",
          ".ipa"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O **Win32 Content Prep Tool** (IntuneWinAppUtil.exe) empacota a pasta inteira do instalador em um único arquivo **.intunewin**."
  },
  {
    "id": "Q224",
    "src": 224,
    "domain": 1,
    "topic": "Compliance policy settings",
    "type": "single",
    "stem": "You have a Microsoft 365 tenant that contains the devices shown in the following table.\n\n| Name | Member of |\n|---|---|\n| Device1 | Group1 |\n| Device2 | Group1 |\n| Device3 | Group1 |\n\nThe devices are managed by using Microsoft Intune.\n\nYou create a compliance policy named Policy1 and assign Policy1 to Group1. Policy1 is configured to mark a device as Compliant only if the device security settings match the settings specified in the policy.\n\nYou discover that devices that are not members of Group1 are shown as Compliant.\n\nYou need to ensure that only devices that are assigned a compliance policy can be shown as Compliant. All other devices must be shown as Not compliant.\n\nWhat should you do from the Microsoft Intune admin center?",
    "options": [
      "From Device compliance, configure the Compliance policy settings.",
      "From Endpoint security, configure the Conditional access settings.",
      "From Tenant administration, modify the Diagnostic settings.",
      "From Policy1, modify the actions for noncompliance."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Em **Compliance policy settings**, mude \"Mark devices with no compliance policy assigned as\" para **Not compliant**."
  },
  {
    "id": "Q225",
    "src": 225,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "hotarea",
    "stem": "Your company has an infrastructure that has the following:\n\n- A Microsoft 365 tenant\n- An Active Directory forest\n- Microsoft Intune\n- A Key Management Service (KMS) server\n- A Windows Deployment Services (WDS) server\n- An Azure AD Premium tenant\n\nThe company purchases 100 new client computers that run Windows.\n\nYou need to ensure that the new computers are joined automatically to Azure AD by using Windows Autopilot.\n\nWhat should you use? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Management tool:",
        "options": [
          "Microsoft Entra admin center",
          "Microsoft Intune admin center",
          "Volume Activation Management Tool console",
          "Windows Deployment Services console"
        ],
        "answer": 1
      },
      {
        "label": "Required information from each computer:",
        "options": [
          "Device serial number and hardware hash",
          "MAC address and computer name",
          "Volume License Key and computer name"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O registro no Autopilot é feito no **Intune admin center** (Devices > Windows > Enrollment > Devices), importando o CSV com **número de série e hardware hash**. KMS e WDS são distratores."
  },
  {
    "id": "Q226",
    "src": 226,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "multi",
    "stem": "You have an Azure AD tenant named contoso.com.\n\nYou plan to purchase 25 computers that run Windows 11. You plan to deliver the computers directly to users.\n\nYou need to ensure that during the out-of-box experience (OOBE), users are prompted to sign in, and then the computers are configured to use Microsoft Intune.\n\nWhich two components should you configure? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "a provisioning package",
      "automatic enrollment",
      "an unattend.xml answer file",
      "a Windows Autopilot deployment profile for self-deploying mode",
      "a Windows Autopilot deployment profile for user-driven mode"
    ],
    "answer": [
      1,
      4
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O modo **user-driven** pede que o usuário entre com a conta no OOBE, e a **inscrição automática** faz o dispositivo entrar no Intune nesse momento. Self-deploying não pede login de usuário."
  },
  {
    "id": "Q227",
    "src": 227,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "multi",
    "stem": "You need to assign the same deployment profile to all the computers that are configured by using Windows Autopilot.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "Create an Azure AD group that has dynamic membership rules and uses the ZTDID tag.",
      "Create an Azure AD group that has dynamic membership rules and uses the operatingSystem tag.",
      "Assign a Windows Autopilot deployment profile to a group.",
      "Join the computers to Azure AD.",
      "Create a Group Policy object (GPO) that is linked to a domain.",
      "Join the computers to an on-premises Active Directory domain."
    ],
    "answer": [
      0,
      2
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A regra dinâmica `(device.devicePhysicalIDs -any (_ -startsWith \"[ZTDId]\"))` captura todos os dispositivos registrados no Autopilot. Depois, basta atribuir o perfil de implantação a esse grupo."
  },
  {
    "id": "Q232",
    "src": 232,
    "domain": 2,
    "topic": "Remote Desktop",
    "type": "hotarea",
    "stem": "You have an Azure AD tenant that contains the following:\n\n- Windows 11 devices that are joined to Azure AD\n- A user that has a display name of User1 and a UPN of user1@contoso.com\n\nYou enable Remote Desktop on the Windows 11 devices.\n\nYou need to ensure that User1 can use Remote Desktop to connect to the devices.\n\nHow should you complete the command that must be run on each device? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "net localgroup [answer choice] /add",
        "options": [
          "\"AzureAD\\User1@Contoso.com\"",
          "\"Contoso\\User1\"",
          "\"Device Owners\"",
          "\"Remote Desktop Users\"",
          "\"User1@Contoso.com\""
        ],
        "answer": 3
      },
      {
        "label": "Account to add:",
        "options": [
          "\"AzureAD\\User1@Contoso.com\"",
          "\"Contoso\\User1\"",
          "\"Device Owners\"",
          "\"Remote Desktop Users\"",
          "\"User1@Contoso.com\""
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "`net localgroup \"Remote Desktop Users\" /add \"AzureAD\\User1@Contoso.com\"` — o grupo local que dá acesso RDP e a conta do Entra ID com o prefixo **AzureAD\\** + UPN."
  },
  {
    "id": "Q233",
    "src": 233,
    "domain": 1,
    "topic": "Windows 11 requirements & licensing",
    "type": "yesno",
    "stem": "You have a Microsoft 365 subscription that contains the devices shown in the following table.\n\n| Name | RAM | Storage | TPM version |\n|---|---|---|---|\n| Device1 | 14 GB | 256 GB | 1.2 |\n| Device2 | 4 GB | 64 GB | 2.0 |\n| Device3 | 8 GB | 128 GB | 2.0 |\n\nAll the devices will be reimaged and licensed by using subscription activation.\n\nThe devices are assigned to the users shown in the following table.\n\n| Name | Device | License |\n|---|---|---|\n| User1 | Device1 | Microsoft 365 E5 |\n| User2 | Device2 | Microsoft 365 E3 |\n| User3 | Device3 | Office 365 E5, Enterprise Mobility + Security E5 |\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "Device1 can be upgraded to Windows 11 and activated.",
      "Device2 requires additional hardware before it can be upgraded to Windows 11.",
      "User3 requires an additional license to activate Windows 11 on Device3."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O Windows 11 exige **TPM 2.0**, 4 GB de RAM e 64 GB de armazenamento. Device1 tem TPM 1.2 → não. Device2 atende exatamente o mínimo → não precisa de hardware. **Office 365 E5 + EMS E5 não incluem licença do Windows** (o Microsoft 365 E3/E5 inclui) → User3 precisa de licença adicional."
  },
  {
    "id": "Q234",
    "src": 234,
    "domain": 2,
    "topic": "PowerShell remoting",
    "type": "single",
    "stem": "Your network contains an Active Directory domain. The domain contains 10 computers that run Windows 10. Users in the finance department use the computers.\n\nYou have a computer named Computer1 that runs Windows 10.\n\nFrom Computer1, you plan to run a script that executes Windows PowerShell commands on the finance department computers.\n\nYou need to ensure that you can run the PowerShell commands on the finance department computers from Computer1.\n\nWhat should you do on the finance department computers?",
    "options": [
      "From Windows PowerShell, run the Enable-MMAgent cmdlet.",
      "From the local Group Policy, enable the Allow Remote Shell Access setting.",
      "From Windows PowerShell, run the Enable-PSRemoting cmdlet.",
      "From the local Group Policy, enable the Turn on Script Execution setting."
    ],
    "answer": 2,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Os computadores de **destino** precisam ter o remoting habilitado com **Enable-PSRemoting** (WinRM, listener e firewall). Enable-MMAgent trata do Memory Manager, nada a ver com remoting."
  },
  {
    "id": "Q235",
    "src": 235,
    "domain": 1,
    "topic": "Enrollment Status Page",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that includes Microsoft Intune.\n\nYou plan to use Windows Autopilot to deploy Windows 11 devices.\n\nYou need to meet the following requirements during Autopilot provisioning:\n\n- Display the app and profile configuration progress.\n- Block users from using the devices until all apps and profiles are installed.\n\nWhat should you configure?",
    "options": [
      "an app configuration policy",
      "an app protection policy",
      "an enrollment device platform restriction",
      "an enrollment status page"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "A **Enrollment Status Page** mostra o progresso e, com \"Block device use until all apps and profiles are installed\", impede o uso até concluir."
  },
  {
    "id": "Q236",
    "src": 236,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "multi",
    "layout": "panel",
    "stem": "You have a Microsoft 365 subscription. The subscription contains 1,000 computers that run Windows 11 and are enrolled in Microsoft Intune.\n\nYou plan to create a compliance policy that has the following options enabled:\n\n- Require Secure Boot to be enabled on the device.\n- Require the device to be at or under the machine risk score.\n\nWhich two Compliance settings should you configure? To answer, select the appropriate settings in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "panelTitle": "Windows 10/11 compliance policy · Compliance settings",
    "options": [
      "Custom Compliance",
      "Device Health",
      "Device Properties",
      "Configuration Manager Compliance",
      "System Security",
      "Microsoft Defender for Endpoint"
    ],
    "answer": [
      1,
      5
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "**Require Secure Boot** fica em **Device Health** (atestado pelo Device Health Attestation). O risco de máquina fica na seção **Microsoft Defender for Endpoint**."
  },
  {
    "id": "Q237",
    "src": 237,
    "domain": 1,
    "topic": "Hybrid join",
    "type": "single",
    "stem": "Your network contains an Active Directory domain named contoso.com. The domain contains 25 computers that run Windows 11.\n\nYou have a Microsoft 365 subscription.\n\nYou have an Azure AD tenant that syncs with contoso.com.\n\nYou configure hybrid Azure AD join and discover that some of the computers have a registered state of Pending.\n\nYou need to ensure that the computers complete the join successfully.\n\nWhat should you ensure?",
    "options": [
      "that Windows is activated on all the computers",
      "that the users of the computers are assigned Microsoft 365 licenses",
      "that each computer has a line of sight to a domain controller",
      "that the computers contain the latest quality updates"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O estado **Pending** significa que o objeto foi sincronizado, mas o dispositivo ainda não concluiu o registro. Isso acontece no logon do usuário com **comunicação com um DC** (linha de visada), e o dispositivo precisa ler o SCP e se registrar."
  },
  {
    "id": "Q238",
    "src": 238,
    "domain": 2,
    "topic": "Updates for all platforms",
    "type": "single",
    "stem": "You have devices enrolled in Microsoft Intune as shown in the following table.\n\n| Name | Platform |\n|---|---|\n| Device1 | Windows |\n| Device2 | Android |\n| Device3 | iOS |\n| Device4 | macOS |\n\nFor which devices can you manage updates by using Intune?",
    "options": [
      "Device1 only",
      "Device1 and Device2 only",
      "Device1 and Device3 only",
      "Device1, Device3, and Device4 only",
      "Device1, Device2, Device3, and Device4"
    ],
    "answer": 4,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O Intune gerencia atualizações de **Windows** (rings, feature/quality), **iOS/iPadOS** e **macOS** (políticas de atualização) e **Android** (system update policy em Android Enterprise corporativo, além de FOTA da Samsung)."
  },
  {
    "id": "Q239",
    "src": 239,
    "domain": 2,
    "topic": "Certificates (SCEP)",
    "type": "single",
    "stem": "You have 500 computers that run Windows 10. The computers are joined to Azure AD and enrolled in Microsoft Intune.\n\nYou plan to distribute certificates to the computers by using Simple Certificate Enrollment Protocol (SCEP).\n\nYou have the servers shown in the following table.\n\n| Name | Configuration |\n|---|---|\n| Server1 | Domain controller |\n| Server2 | Root certification authority (CA) |\n| Server3 | Subordinate certification authority (CA) |\n| Server4 | Network Device Enrollment Service (NDES) |\n\nNDES issues certificates from the subordinate CA.\n\nYou are configuring a SCEP certificate device configuration profile. The profile has the Root Certificate field still empty.\n\nYou need to complete the SCEP profile.\n\nOn which server is the required root certificate located?",
    "options": [
      "Server1",
      "Server2",
      "Server3",
      "Server4"
    ],
    "answer": 1,
    "shuffle": false,
    "answer_original": 2,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O campo **Root Certificate** do perfil SCEP aponta para o perfil de **trusted certificate** da **CA raiz** da cadeia — que está no **Server2**. O dump marca Server3 (a CA emissora); há quem defenda que o perfil deve apontar para a CA que emite, mas a documentação fala em certificado da CA raiz. Confira a discussão."
  },
  {
    "id": "Q240",
    "src": 240,
    "domain": 1,
    "topic": "Compliance check-in",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription that contains the devices shown in the following table.\n\n| Name | Platform |\n|---|---|\n| Device1 | Windows 10 |\n| Device2 | iOS |\n\nYou plan to enroll the devices in Microsoft Intune.\n\nHow often will the compliance policy check-ins run after each device is enrolled in Intune? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Device1:",
        "options": [
          "Every 15 minutes for one hour, and then every eight hours",
          "Every five minutes for 15 minutes, then every 15 minutes for two hours, and then every eight hours",
          "Every three minutes for 15 minutes, then every 15 minutes for two hours, and then every eight hours"
        ],
        "answer": 2
      },
      {
        "label": "Device2:",
        "options": [
          "Every 15 minutes for one hour, and then every eight hours",
          "Every five minutes for 15 minutes, then every 15 minutes for two hours, and then every eight hours",
          "Every three minutes for 15 minutes, then every 15 minutes for two hours, and then every eight hours"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Depois da inscrição, o **Windows** faz check-in a cada 3 minutos por 15 minutos, depois a cada 15 minutos por 2 horas, e então a cada ~8 horas. **iOS/iPadOS** (e macOS) fazem a cada 15 minutos por 1 hora e depois a cada ~8 horas."
  },
  {
    "id": "Q241",
    "src": 241,
    "domain": 1,
    "topic": "Compliance policies",
    "type": "yesno",
    "stem": "You have two Windows 10 devices enrolled in Microsoft Intune as shown in the following table.\n\n| Name | BitLocker Drive Encryption (BitLocker) | Member of |\n|---|---|---|\n| Device1 | Enabled | Group2 |\n| Device2 | Disabled | Group1 |\n\nThe Compliance policy settings are configured as follows: Mark devices with no compliance policy assigned as: **Not Compliant** · Enhanced jailbreak detection: Disabled · Compliance status validity period (days): 10.\n\nOn August 1, you create a compliance policy with the following configuration:\n\n| Setting | Value |\n|---|---|\n| Name | Compliance1 |\n| Platform | Windows 10 and later |\n| Require BitLocker | Require |\n| Action: Mark device noncompliant | 3 days |\n| Action: Retire the noncompliant device | 5 days |\n| Included groups | Group1 |\n| Excluded groups | Group2 |\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "Device1 is marked as compliant on August 4.",
      "Device2 is marked as compliant on August 2.",
      "Device2 is retired on August 6."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Device1 está só em Group2 (excluído), fica **sem política**, e o tenant marca esses dispositivos como **Not Compliant**. Device2 está sem BitLocker; em 2 de agosto ele está **In grace period** (3 dias), e o dump considera que isso não é \"compliant\". Em 6 de agosto (1º + 5 dias) a ação de **retire** é executada. Atenção: nas Q105 e Q111 o dump trata dispositivos em carência como conformes. Essa inconsistência entre questões é o motivo de esta estar como duvidosa."
  },
  {
    "id": "Q242",
    "src": 242,
    "domain": 3,
    "topic": "Device restrictions",
    "type": "multi",
    "layout": "panel",
    "stem": "You have 100 computers that run Windows 10. The computers are joined to Azure AD and enrolled in Microsoft Intune.\n\nYou need to configure the following device restrictions:\n\n- Block users from browsing to suspicious websites.\n- Scan all scripts loaded into Microsoft Edge.\n\nWhich two settings should you configure in the Device restrictions configuration profile? To answer, select the appropriate settings in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "panelTitle": "Device restrictions — Windows 10 and later",
    "options": [
      "Microsoft Edge Browser",
      "Network proxy",
      "Password",
      "Per-app privacy exceptions",
      "Personalization",
      "Printer",
      "Privacy",
      "Projection",
      "Reporting and Telemetry",
      "Search",
      "Start",
      "Microsoft Defender SmartScreen",
      "Windows Spotlight",
      "Microsoft Defender Antivirus"
    ],
    "answer": [
      11,
      13
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O bloqueio de sites suspeitos é feito pelo **Microsoft Defender SmartScreen**. \"Scan scripts that are loaded into Microsoft web browsers\" é uma opção do **Microsoft Defender Antivirus** dentro do perfil de Device restrictions."
  },
  {
    "id": "Q243",
    "src": 243,
    "domain": 2,
    "topic": "Device lifecycle",
    "type": "hotarea",
    "stem": "You have devices enrolled in Microsoft Intune as shown in the following table.\n\n| Name | Description |\n|---|---|\n| Device1 | User-enrolled Windows 11 device |\n| Device2 | Auto-enrolled Windows 10 device |\n| Device3 | User-enrolled Android device |\n| Device4 | User-enrolled iOS device |\n\nYou need to identify the following:\n\n- Device you can remove from Intune by using the Wipe action.\n- The enrollment state and the associated user account can be retained on devices that are wiped.\n\nWhat should you identify? To answer, select the appropriate options in the answer area.",
    "slots": [
      {
        "label": "Devices you can remove from Intune by using the Wipe action:",
        "options": [
          "Device1 only",
          "Device1 and Device2 only",
          "Device1, Device2, and Device3 only",
          "Device1, Device2, and Device4 only",
          "Device1, Device2, Device3, and Device4"
        ],
        "answer": 2
      },
      {
        "label": "The enrollment state and the associated user account can be retained on devices that are wiped:",
        "options": [
          "Device1 only",
          "Device1 and Device2 only",
          "Device1, Device2, and Device3 only",
          "Device1, Device2, and Device4 only",
          "Device1, Device2, Device3, and Device4"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Dispositivos iOS em **User Enrollment** não suportam Wipe, só Retire. A opção \"Retain enrollment state and user account\" do Wipe existe apenas para **Windows**."
  },
  {
    "id": "Q244",
    "src": 244,
    "domain": 1,
    "topic": "Windows Autopilot",
    "type": "yesno",
    "stem": "You have an Azure AD tenant named contoso.com that contains the devices shown in the following table.\n\n| Name | Deployed by using Windows Autopilot | Azure AD status | Enrolled in Microsoft Intune |\n|---|---|---|---|\n| Device1 | No | Joined | No |\n| Device2 | No | Joined | Yes |\n| Device3 | Yes | Joined | Yes |\n\nThe tenant contains the Azure AD groups shown in the following table.\n\n| Name | Member |\n|---|---|\n| Group1 | Device1, Device2, Device3 |\n| Group2 | Device2 |\n\nYou add an Autopilot deployment profile with: Convert all targeted devices to Autopilot = **Yes** · Deployment mode = Self-Deploying (preview) · Join to Azure AD as = Azure AD joined · Included groups = **Group1** · Excluded groups = **Group2**.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "If you reset Device1, the device will be deployed by using Autopilot.",
      "If you reset Device2, the device will be deployed by using Autopilot.",
      "If you restart Device3, the device will be deployed by using Autopilot."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Device1 não está no Intune, então a conversão não o registra no Autopilot. Device2 está em Group2, **excluído**. Device3 já é Autopilot e está no grupo do perfil. Atenção: a terceira afirmação diz \"restart\" — um simples reinício não dispara o Autopilot; o gabarito \"Sim\" só faz sentido se a intenção era \"reset\". Por isso a questão está como duvidosa."
  },
  {
    "id": "Q246",
    "src": 246,
    "domain": 4,
    "topic": "App configuration policies",
    "type": "multi",
    "stem": "You have a Microsoft 365 subscription that contains 1,000 Android devices enrolled in Microsoft Intune.\n\nYou create an app configuration policy that contains the following settings:\n\n- Device enrollment type: Managed devices\n- Profile Type: All Profile Types\n- Platform: Android Enterprise\n\nWhich two types of apps can be associated with the policy? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "options": [
      "Android Enterprise system app",
      "Web link",
      "Android store app",
      "Managed Google Play store app",
      "Built-in Android app"
    ],
    "answer": [
      0,
      3
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "App configuration policies para Android Enterprise gerenciado se aplicam a apps do **Managed Google Play** e a **Android Enterprise system apps** (apps de sistema habilitados pelo Intune)."
  },
  {
    "id": "Q247",
    "src": 247,
    "domain": 4,
    "topic": "App deployment platforms",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription.\n\nYou have devices enrolled in Microsoft Intune as shown in the following table.\n\n| Name | Platform |\n|---|---|\n| Device1 | Windows 11 |\n| Device2 | Android |\n| Device3 | iOS |\n| Device4 | Ubuntu Linux |\n\nTo which devices can you deploy apps by using Intune?",
    "options": [
      "Device1 only",
      "Device1 and Device2 only",
      "Device1 and Device3 only",
      "Device1, Device2, and Device3 only",
      "Device1, Device2, Device3, and Device4"
    ],
    "answer": 3,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O Intune implanta apps em Windows, Android, iOS/iPadOS e macOS. Para **Linux** (Ubuntu), o Intune oferece só conformidade e scripts, sem implantação de apps."
  },
  {
    "id": "Q248",
    "src": 248,
    "domain": 4,
    "topic": "Microsoft 365 Apps",
    "type": "yesno",
    "stem": "You have a Microsoft 365 E5 subscription that uses Microsoft Intune. The subscription contains the resources shown in the following table.\n\n| Name | Type | Member of |\n|---|---|---|\n| User1 | User | Group1 |\n| Device1 | Device | Group2 |\n\nUser1 is the owner of Device1.\n\nYou deploy Microsoft 365 Apps Windows 10 and later app types to Intune as shown in the following table.\n\n| Name | Shows in Company Portal | Microsoft Office app to install | Assignment | Time of creation |\n|---|---|---|---|---|\n| App1 | Yes | Word | Group1 – Required | 10:00 AM |\n| App2 | Yes | Excel | Group2 – Required | 10:30 AM |\n| App3 | Yes | PowerPoint | Group1 – Available | 11:00 AM |\n\nThe next day you review the results of the app deployments.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "App1 shows in the Company Portal.",
      "Word is installed on Device1.",
      "Excel is installed on Device1."
    ],
    "answer": [
      true,
      true,
      true
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O dump marca Sim nas três: App1 está com \"Shows in Company Portal\" ativado; Word (Required para o usuário) e Excel (Required para o dispositivo) são instalados. **Ponto de discussão:** a documentação diz que, com várias atribuições de Microsoft 365 Apps para o mesmo dispositivo, só a **primeira** é aplicada e as demais falham — o que levaria a Excel = Não. Confira a discussão."
  },
  {
    "id": "Q249",
    "src": 249,
    "domain": 5,
    "topic": "Endpoint analytics",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Intune to manage devices.\n\nYou need to assess device performance during startup and identify any device models that take longer than average to start.\n\nWhat should you use to assess the device performance, and which portal should you use? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Use:",
        "options": [
          "Compliance policies",
          "Device diagnostics",
          "Endpoint analytics"
        ],
        "answer": 2
      },
      {
        "label": "In portal:",
        "options": [
          "Microsoft 365 Apps admin center",
          "Microsoft Entra admin center",
          "Microsoft Intune admin center"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O **Endpoint analytics** (no **Intune admin center**, em Reports) tem a visão de Startup performance por modelo de dispositivo."
  },
  {
    "id": "Q250",
    "src": 250,
    "domain": 2,
    "topic": "Windows 365",
    "type": "match",
    "stem": "Your on-premises network contains an Active Directory Domain Services (AD DS) domain.\n\nYou have an Azure subscription that contains a virtual network named VNet1. VNet1 contains five virtual machines and is NOT connected to the on-premises network.\n\nYou have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou purchase Windows 365 Enterprise licenses.\n\nYou need to deploy Cloud PC. The solution must meet the following requirements:\n\n- All users must be able to access their Cloud PC at any time without any restrictions.\n- The users must be able to connect to the virtual machines on VNet1.\n\nHow should you configure the provisioning policy for Windows 365? To answer, drag the appropriate options to the correct settings. Each option may be used once, more than once, or not at all.\n\nNOTE: Each correct selection is worth one point.",
    "pool": [
      "Azure network connection",
      "Enterprise",
      "Frontline",
      "Microsoft Entra Hybrid Join",
      "Microsoft Entra Join",
      "Microsoft hosted network"
    ],
    "targets": [
      {
        "label": "Join type:",
        "answer": 4
      },
      {
        "label": "Network:",
        "answer": 0
      },
      {
        "label": "License type:",
        "answer": 1
      }
    ],
    "answer_original": [
      3,
      0,
      1
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Para alcançar as VMs da VNet1 é preciso uma **Azure network connection** para essa VNet. Como a VNet1 **não tem conexão com o on-premises**, o Cloud PC não alcança um DC, então o join precisa ser **Microsoft Entra Join** (o hybrid join exige linha de visada para o AD DS). Licença **Enterprise** (Frontline é por turno, com acesso restrito). O dump marcava Hybrid Join."
  },
  {
    "id": "Q252",
    "src": 252,
    "domain": 1,
    "topic": "Windows 11 requirements",
    "type": "single",
    "stem": "You have a Hyper-V host. The host contains virtual machines that run Windows 10 as shown in following table.\n\n| Name | Generation | Virtual TPM | Virtual processors | Memory |\n|---|---|---|---|---|\n| VM1 | 1 | No | 4 | 16 GB |\n| VM2 | 2 | Yes | 2 | 4 GB |\n| VM3 | 2 | Yes | 1 | 8 GB |\n\nWhich virtual machines can be upgraded to Windows 11?",
    "options": [
      "VM1 only",
      "VM2 only",
      "VM2 and VM3 only",
      "VM1, VM2, and VM3"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Requisitos do Windows 11: geração 2 (UEFI/Secure Boot), **vTPM**, pelo menos **2 processadores** e 4 GB de RAM. VM1 é geração 1 sem TPM; VM3 tem 1 vCPU. Só a VM2 atende."
  },
  {
    "id": "Q253",
    "src": 253,
    "domain": 4,
    "topic": "App protection policies",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Intune to manage all devices.\n\nUsers have iOS devices with Microsoft apps installed.\n\nYou need to prevent users from cutting, copying, and pasting data between Microsoft Excel and other apps installed on the devices.\n\nWhat should you configure?",
    "options": [
      "an app protection policy",
      "an app configuration policy",
      "an iOS app provisioning profile",
      "policies for Microsoft Office apps"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "\"Restrict cut, copy, and paste between other apps\" é uma configuração de transferência de dados da **app protection policy**."
  },
  {
    "id": "Q254",
    "src": 254,
    "domain": 5,
    "topic": "Reporting",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Intune to manage devices.\n\nYou need to review details about device wipes initiated through Intune.\n\nWhich report should you review?",
    "options": [
      "Noncompliant devices",
      "Assignment status",
      "Windows health attestation report",
      "Device actions"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O relatório **Device actions** (Devices > Monitor) lista as ações remotas (wipe, retire, delete…) com quem iniciou e o status."
  },
  {
    "id": "Q255",
    "src": 255,
    "domain": 2,
    "topic": "Windows update rings",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription. The subscription contains 500 computers that run Windows 11 and are enrolled in Microsoft Intune.\n\nYou need to manage the deployment of monthly security updates. The solution must meet the following requirements:\n\n- Updates must be deployed to a group of test computers for quality assurance.\n- Updates must be deployed automatically 15 days after the quality assurance testing.\n\nWhat should you create in the Microsoft Intune admin center?",
    "options": [
      "a device configuration profile",
      "a feature update policy",
      "a security baseline",
      "an update ring"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Atualizações mensais (quality) são controladas por **update rings**: um anel de teste sem adiamento e um anel de produção com adiamento de 15 dias."
  },
  {
    "id": "Q256",
    "src": 256,
    "domain": 5,
    "topic": "Azure Monitor",
    "type": "hotarea",
    "stem": "Your company has computers that run Windows 10 and are Microsoft Entra joined.\n\nThe company purchases an Azure subscription.\n\nYou need to collect Windows events from the Windows 10 computers in Azure. The solution must enable you to create alerts based on the collected events.\n\nWhat should you create in Azure and what should you configure on the computers? To answer, select the appropriate options in the answer area.",
    "slots": [
      {
        "label": "Resource to create in Azure:",
        "options": [
          "An Azure event hub",
          "An Azure Log Analytics workspace",
          "An Azure SQL database",
          "An Azure Storage account"
        ],
        "answer": 1
      },
      {
        "label": "Configuration to perform on the computers:",
        "options": [
          "Configure the Event Collector service",
          "Create an event subscription",
          "Install the Azure Monitor Agent"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Os eventos vão para um **workspace do Log Analytics**, onde é possível criar alertas de log com KQL. Nos computadores, instale o **Azure Monitor Agent**."
  },
  {
    "id": "Q257",
    "src": 257,
    "domain": 3,
    "topic": "Tamper protection",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that contains 500 computers that run Windows 11. The computers are Azure AD joined and are enrolled in Microsoft Intune.\n\nYou plan to manage Microsoft Defender Antivirus on the computers.\n\nYou need to prevent users from disabling Microsoft Defender for Endpoint.\n\nWhat should you do?",
    "options": [
      "From the Microsoft Intune admin center, create an attack surface reduction (ASR) policy.",
      "From the Microsoft 365 Defender portal, enable tamper protection.",
      "From the Microsoft Intune admin center, create an account protection policy.",
      "From the Microsoft Entra admin center, create a Conditional Access policy."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O **tamper protection** impede a desativação do Defender; ele pode ser ligado para o tenant no **portal do Defender** (ou por política de Antivirus no Intune, como na Q267)."
  },
  {
    "id": "Q258",
    "src": 258,
    "domain": 2,
    "topic": "Windows 365",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that has Windows 365 Enterprise licenses.\n\nYou plan to use a custom Windows 11 image as a template for Cloud PCs.\n\nYou have a Hyper-V virtual machine that runs Windows 11 and has the following configurations:\n\n- Name: VM1\n- Disk size: 64 GB\n- Disk format: VHDX\n- Disk type: Fixed size\n- Generation: Generation 2\n\nYou need to ensure that you can use VM1 as a source for the custom image.\n\nWhat should you do on VM1 first?",
    "options": [
      "Change the disk type to Dynamically expanding.",
      "Change the disk format to the VHD.",
      "Change the generation to Generation 1.",
      "Increase the disk size."
    ],
    "answer": 1,
    "answer_original": 0,
    "scope": "in",
    "review": "corrigida",
    "explanation": "A imagem precisa virar uma **managed image no Azure**, e o Azure só aceita discos **VHD de tamanho fixo** — VHDX não é suportado. O disco já é fixo, de 64 GB e geração 2 (o que o Windows 365 exige), então o que falta é converter para **VHD**. O dump marcava \"Dynamically expanding\", que seria inclusive um passo na direção errada."
  },
  {
    "id": "Q259",
    "src": 259,
    "domain": 1,
    "topic": "Autopilot hybrid join",
    "type": "hotarea",
    "stem": "Your on-premises network contains an Active Directory domain named contoso.com. The domain contains a user account named Admin1 and the resources shown in the following table.\n\n| Name | Type |\n|---|---|\n| Server1 | Computer object |\n| OU1 | Organizational unit (OU) |\n\nYou have a Microsoft 365 E5 subscription.\n\nYou have a Microsoft Entra tenant that syncs with contoso.com.\n\nAdmin1 plans to use Windows Autopilot to deploy 100 Windows 11 devices. The deployment must meet the following requirements:\n\n- The devices must be Microsoft Entra hybrid joined during the deployment.\n- Computer objects must be created in OU1.\n\nYou need to configure Server1 and Active Directory delegation to support the deployment.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Server1:",
        "options": [
          "Enroll in Microsoft Intune.",
          "Export the hardware hash and upload the hash to Microsoft Intune.",
          "Install the Intune Connector for Active Directory."
        ],
        "answer": 2
      },
      {
        "label": "Resource:",
        "options": [
          "Admin1",
          "OU1",
          "Server1"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O hybrid join via Autopilot exige o **Intune Connector for Active Directory** instalado num servidor do domínio, e a conta do conector precisa de permissão delegada para **criar objetos de computador na OU** de destino (OU1).",
    "refs": [
      "https://learn.microsoft.com/en-us/autopilot/windows-autopilot-hybrid"
    ]
  },
  {
    "id": "Q260",
    "src": 260,
    "domain": 2,
    "topic": "Windows 365",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription.\n\nEach user is assigned a Windows 365 Enterprise license.\n\nYou need to deploy Cloud PCs that will be Microsoft Entra hybrid joined.\n\nWhat should you do first?",
    "options": [
      "Create an Azure network connection (ANC).",
      "Create a provisioning policy.",
      "Create a configuration profile in Microsoft Intune.",
      "Upload a custom image."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Cloud PCs com **hybrid join** exigem uma **Azure network connection** para uma VNet com alcance ao AD DS. A provisioning policy vem depois e referencia a ANC.",
    "refs": [
      "https://learn.microsoft.com/en-us/windows-365/enterprise/create-azure-network-connection"
    ]
  },
  {
    "id": "Q261",
    "src": 261,
    "domain": 2,
    "topic": "Windows 365",
    "type": "single",
    "stem": "Your on-premises network contains an Active Directory Domain Services (AD DS) domain named contoso.com.\n\nThe domain contains a domain controller named dc1.contoso.com.\n\nYou have a Microsoft 365 E5 subscription that uses Microsoft Intune Suite.\n\nYou have an Azure subscription that contains the resources shown in the following table.\n\n| Name | Description |\n|---|---|\n| LNG1 | Local network gateway that uses the public IP address of the local infrastructure |\n| GW1 | Virtual network gateway |\n| GW2 | Virtual network gateway |\n| CN1 | Site-to-Site (S2S) VPN connection that connects LNG1 and GW1 |\n\nThe subscription contains the virtual networks shown in the following table.\n\n| Name | IP address space | Subnet | DNS configuration | Virtual network gateway |\n|---|---|---|---|---|\n| VNet1 | 192.168.10.0/24 | 192.168.10.0/26 | dc1.contoso.com | GW1 |\n| VNet2 | 192.168.11.0/24 | 192.168.11.0/26 | Azure DNS | None |\n| VNet3 | 192.168.12.0/24 | 192.168.12.0/26 | Azure DNS | GW2 |\n\nYou plan to deploy Windows 365 Enterprise Cloud PC.\n\nYou need to create an Azure network connection (ANC) that will use Microsoft Entra hybrid join.\n\nWhich virtual network can you use for the ANC?",
    "options": [
      "VNet1 only",
      "VNet2 only",
      "VNet3 only",
      "VNet1 and VNet2",
      "VNet1 and VNet3"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Para hybrid join a VNet precisa **resolver e alcançar o DC**. Só a VNet1 tem conectividade com o on-premises (GW1 + CN1) e DNS apontando para dc1.contoso.com. A VNet3 tem gateway, mas sem conexão e com Azure DNS."
  },
  {
    "id": "Q262",
    "src": 262,
    "domain": 1,
    "topic": "Compliance notifications",
    "type": "order",
    "stem": "You have a Microsoft 365 E5 subscription that includes Microsoft Intune.\n\nThe subscription contains Android Enterprise devices that are enrolled in Intune and have personally-owned work profiles. All the Android devices are members of a group named Group1.\n\nYou need to ensure that end users and Intune administrators receive an email message when an Android device does NOT have an up-to-date security provider.\n\nWhich actions should you perform from the Microsoft Intune admin center in sequence? Place the first two steps in order. Step 3 is: Assign the policy to Group1.",
    "pool": [
      "Create a compliance policy.",
      "Create a Conditional Access policy.",
      "Create an attack surface reduction (ASR) policy.",
      "From Compliance policies, create a notification message template.",
      "From Tenant admin, create a custom notification."
    ],
    "answer": [
      0,
      3
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O e-mail ao usuário e aos admins é uma **ação de não conformidade** (Send email to end user + additional recipients) que usa um **notification message template**. A verificação \"Up-to-date security provider\" fica na política de conformidade. O dump coloca a política primeiro e o template depois. Na prática o template precisa existir antes de ser escolhido na ação, por isso a questão está como duvidosa quanto à ordem."
  },
  {
    "id": "Q263",
    "src": 263,
    "domain": 2,
    "topic": "Surface Hub",
    "type": "hotarea",
    "stem": "You have a Microsoft 365 subscription.\n\nYou have 25 Microsoft Surface Hub devices that you plan to manage by using Microsoft Intune.\n\nYou need to configure the devices to meet the following requirements:\n\n- Enable Windows Hello for Business.\n- Configure Microsoft Defender SmartScreen to block users from running unverified files.\n\nWhich profile type template should you use for each requirement? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "slots": [
      {
        "label": "Windows Hello for Business:",
        "options": [
          "Device restrictions",
          "Device restrictions (Windows 10 Team)",
          "Endpoint protection",
          "Identity protection",
          "Microsoft Defender for Endpoint (Desktop devices running Windows 10 or later)"
        ],
        "answer": 3
      },
      {
        "label": "Microsoft Defender SmartScreen:",
        "options": [
          "Windows health monitoring",
          "Device restrictions (Windows 10 Team)",
          "Endpoint protection",
          "Identity protection",
          "Microsoft Defender for Endpoint (Desktop devices running Windows 10 or later)"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O dump marca **Identity protection** para o Windows Hello e **Endpoint protection** para o SmartScreen. Ponto de discussão: o Surface Hub roda Windows 10 **Team**, e os templates de Identity/Endpoint protection são para Windows 10 desktop; o perfil **Device restrictions (Windows 10 Team)** tem opções próprias. Confira a discussão."
  },
  {
    "id": "Q264",
    "src": 264,
    "domain": 2,
    "topic": "Feature updates",
    "type": "yesno",
    "stem": "You have a Microsoft 365 E5 subscription that contains the security groups shown in the following table.\n\n| Name | Membership type | Membership rule |\n|---|---|---|\n| Group1 | Assigned | Not applicable |\n| Group2 | Dynamic | `(device.deviceOSType -eq \"Windows\")` |\n| Group3 | Dynamic | `(extensionAttribute1 -eq \"Test\")` |\n\nThe subscription contains devices that run Windows 11, version 21H2 as shown in the following table.\n\n| Name | extensionAttribute1 | Member of Group1 |\n|---|---|---|\n| Device1 | Test | No |\n| Device2 | None | No |\n| Device3 | None | Yes |\n\nYou have a feature update deployment profile named Deployment1 as shown in the following table.\n\n| Setting | Value |\n|---|---|\n| Feature update to deploy | Windows 11, version 22H2 |\n| Rollout options | Make update available as soon as possible |\n| Included groups | Group2 |\n| Excluded groups | Group1, Group3 |\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.",
    "statements": [
      "Device1 will be upgraded to Windows 11, version 22H2.",
      "Device2 will be upgraded to Windows 11, version 22H2.",
      "Device3 will be upgraded to Windows 11, version 22H2."
    ],
    "answer": [
      false,
      true,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Todos estão em Group2 (Windows). Device1 tem extensionAttribute1 = Test → está em Group3, **excluído**. Device3 está em Group1, **excluído**. Só o Device2 recebe a atualização."
  },
  {
    "id": "Q265",
    "src": 265,
    "domain": 1,
    "topic": "Enrollment restrictions",
    "type": "multi",
    "layout": "panel",
    "stem": "You have a Microsoft 365 E5 subscription that uses Microsoft Intune.\n\nYou need to ensure that users can only enroll devices that meet the following requirements:\n\n- Android devices that support the use of work profiles.\n- iOS devices that run iOS 11.0 or later.\n\nThe current device type restriction allows Android Enterprise (work profile), Android device administrator and iOS/iPadOS, with no version limits.\n\nWhich two restrictions should you modify? To answer, select the restrictions in the answer area.\n\nNOTE: Each correct selection is worth one point.",
    "panelTitle": "Edit restriction — Device type restriction · Platform settings",
    "options": [
      "Android Enterprise (work profile) › Platform",
      "Android Enterprise (work profile) › Versions",
      "Android device administrator › Platform (Block)",
      "Android device administrator › Versions",
      "iOS/iPadOS › Platform",
      "iOS/iPadOS › Versions (Min)",
      "macOS › Platform",
      "Windows (MDM) › Platform"
    ],
    "answer": [
      2,
      5
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Para aceitar só Android com work profile, **bloqueie a plataforma Android device administrator** (o Android Enterprise já está permitido). Para iOS 11.0 ou superior, defina a **versão mínima** do iOS/iPadOS como 11.0."
  },
  {
    "id": "Q266",
    "src": 266,
    "domain": 3,
    "topic": "Windows LAPS",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that uses Microsoft Intune Suite.\n\nYou use Intune to manage Windows 11 devices.\n\nYou need to implement Windows Local Administrator Password Solution (Windows LAPS).\n\nWhat should you configure?",
    "options": [
      "a configuration profile",
      "an account protection policy",
      "an app protection policy",
      "a device compliance policy"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O Windows LAPS é configurado em **Endpoint security > Account protection > Local admin password solution (Windows LAPS)**.",
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/protect/windows-laps-overview"
    ]
  },
  {
    "id": "Q267",
    "src": 267,
    "domain": 3,
    "topic": "Tamper protection",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that contains 500 computers that run Windows 11. The computers are Microsoft Entra joined and are enrolled in Microsoft Intune.\n\nYou plan to manage Microsoft Defender for Endpoint on the computers.\n\nYou need to prevent users from disabling Microsoft Defender for Endpoint.\n\nWhat should you do?",
    "options": [
      "From the Microsoft Intune admin center, create a security baseline.",
      "From the Microsoft Intune admin center, create an antivirus policy.",
      "From the Microsoft Entra admin center, create a Conditional Access policy.",
      "From the Microsoft Intune admin center, create a device compliance policy."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "**Tamper protection** é habilitado pela política de **Antivirus** (perfil Windows Security experience) no Endpoint security. Compliance e Conditional Access só reagem; não impedem que o usuário desligue o Defender."
  },
  {
    "id": "Q268",
    "src": 268,
    "domain": 4,
    "topic": "Line-of-business apps",
    "type": "single",
    "stem": "You have a Microsoft 365 subscription that includes Microsoft Intune.\n\nYou need to deploy a custom app to Android devices. The app uses the APK file format.\n\nWhich type of app should you select for the deployment?",
    "options": [
      "built-in",
      "Android store",
      "Managed Google Play",
      "line-of-business (LOB)",
      "web link"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Um .apk próprio carregado no Intune é um app **line-of-business**. (Para Android Enterprise, o recomendado seria publicar como app privado no Managed Google Play, mas a questão pede o tipo para um arquivo APK.)"
  },
  {
    "id": "Q269",
    "src": 269,
    "domain": 4,
    "topic": "Win32 apps",
    "type": "single",
    "stem": "You have a Microsoft 365 E5 subscription.\n\nYou use Microsoft Intune to manage all devices.\n\nYou need to prepare a Win32 app named App1.exe for deployment.\n\nWhat should you do first?",
    "options": [
      "From the Microsoft Intune admin center, create an app configuration policy.",
      "Change App1.exe to the INTUNEWIN format.",
      "From the Microsoft 365 Apps admin center, create a deployment configuration.",
      "Upload App1.exe to Azure Blob Storage."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Apps Win32 precisam ser empacotados com o **Microsoft Win32 Content Prep Tool** (IntuneWinAppUtil.exe), que gera o arquivo **.intunewin**.",
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/apps/apps-win32-prepare"
    ]
  }
]);
