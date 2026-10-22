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
    "skill": "3.1",
    "topic": "Acesso controlado a pastas",
    "type": "yesno",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "Para cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "User1 pode criar um arquivo chamado D:\\Folder1\\file1.txt em Device4 usando o Notepad.",
      "User2 pode remover D:\\Folder1 da lista de pastas protegidas em Device2.",
      "User3 pode criar um arquivo chamado C:\\Users\\User3\\Desktop\\file1.txt em Device2 executando um script personalizado do Windows PowerShell."
    ],
    "answer": [
      false,
      false,
      false
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Protection1 (Controlled folder access) se aplica a Group2 (Device2, Device4) e GroupB. Só C:\\*\\AppA.exe está na lista de apps permitidos; D:\\Folder1 e as pastas padrão (como Desktop) ficam protegidas. A configuração vem do Intune, então nem um admin local consegue removê-la no dispositivo. **Ponto de discussão:** o Controlled folder access também permite apps que a Microsoft considera confiáveis (como o Notepad), o que leva parte da comunidade a marcar Sim na primeira afirmação. O gabarito do dump é Não/Não/Não.",
    "details": "**Item a item**\n- **User1 cria arquivo em D:\\Folder1 com o Notepad:** Não, pelo gabarito (pasta protegida). A comunidade aponta que o Notepad é confiável e passaria.\n- **User2 remove a pasta da lista:** Não. Configuração gerenciada pelo Intune não é editável no dispositivo.\n- **User3 grava no Desktop por script:** Não. O Desktop é pasta protegida por padrão, e scripts do PowerShell não são confiáveis.\n\n**Dica de prova:** O Controlled folder access em modo Audit só registra (evento 1124); use-o antes de ativar o Block.",
    "docs": [
      {
        "t": "Protect folders from ransomware with controlled folder access - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/controlled-folder-access-overview"
      },
      {
        "t": "Manage attack surface reduction settings with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/attack-surface-reduction"
      },
      {
        "t": "ASR rules reference - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"
      }
    ]
  },
  {
    "id": "Q002",
    "src": 2,
    "domain": 1,
    "skill": "2.1",
    "topic": "Windows Autopilot",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "Quais dispositivos são registrados usando o serviço de implantação do Windows Autopilot?",
    "options": [
      "Somente Device1",
      "Somente Device3",
      "Somente Device1 e Device3",
      "Device1, Device2 e Device3"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Profile1 tem **Convert all targeted devices to Autopilot = Yes**, incluído para Group1 (Device1, Device2, Device3) e excluindo Group2 (Device2, Device4). Sobram Device1 e Device3, mas a conversão só registra dispositivos **corporativos** — Device3 é pessoal. Resultado: só Device1.",
    "details": "**Por que não as outras**\n- **Device3:** é pessoal; o \"Convert all targeted devices to Autopilot\" só registra dispositivos corporativos.\n- **Device2:** está no grupo excluído (Group2).\n\n**Dica de prova:** A conversão faz o upload do hash do dispositivo; o perfil Autopilot só vale no próximo reset ou na reinstalação.",
    "docs": [
      {
        "t": "Windows Autopilot for existing devices",
        "u": "https://learn.microsoft.com/en-us/autopilot/existing-devices"
      },
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/autopilot/existing-devices"
    ]
  },
  {
    "id": "Q003",
    "src": 3,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
    "type": "yesno",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "Para cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.",
    "statements": [
      "Device1 é marcado como em conformidade.",
      "Device4 é marcado como em conformidade.",
      "Device5 é marcado como em conformidade."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Device1 (Group1) recebe Policy1 e Policy2: tem BitLocker, mas **não** tem Secure Boot → não conforme. Device4 (Group2) recebe Policy3, que exige BitLocker, e ele não tem → não conforme. Device5 (Group3) não recebe nenhuma política, e o tenant está configurado para marcar dispositivos sem política como **Compliant** → conforme.",
    "details": "**Item a item**\n- **Device1:** Não. A Policy2 exige Secure Boot, que ele não tem.\n- **Device4:** Não. Sem BitLocker, e a Policy3 exige.\n- **Device5:** Sim. Sem política atribuída, e o tenant marca \"sem política\" como compliant.\n\n**Dica de prova:** O padrão seguro é \"Mark devices with no compliance policy assigned as = Not compliant\" (Compliance settings).",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q004",
    "src": 4,
    "domain": 2,
    "skill": "2.2",
    "topic": "Perfis de configuração de dispositivos",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "Você implementa Boundary1 de acordo com as alterações planejadas.\n\nA quais dispositivos é aplicado o limite de rede 192.168.1.0/24?",
    "options": [
      "Somente Device2",
      "Somente Device3",
      "Somente Device1, Device2 e Device5",
      "Somente Device1, Device2, Device3 e Device4"
    ],
    "answer": 3,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Boundary1 é atribuído a Group1 (Device1, Device2, Device3) e Group2 (Device2, Device4). **Scope tags não filtram a atribuição** — elas só controlam quais administradores enxergam o objeto. Logo, Device1 a Device4.",
    "details": "**Por que não as outras**\n- **Só alguns dispositivos:** scope tags não filtram atribuições; definem quem administra o objeto.\n\n**Dica de prova:** Para filtrar atribuições, use **assignment filters** (ex.: por modelo, SO ou ownership).",
    "docs": [
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q005",
    "src": 5,
    "domain": 4,
    "skill": "4.2",
    "topic": "Políticas de proteção de aplicativos",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365.\n\nVocê usa o Microsoft Intune Suite para gerenciar dispositivos.\n\nVocê tem a política de proteção de aplicativos iOS mostrada na imagem a seguir.\n\n### Tradução do texto da imagem\n\n**Requisitos de acesso**\n\n| Configuração | Valor |\n|---|---|\n| PIN para acesso | Exigir |\n| Tipo de PIN | Numérico |\n| PIN simples | Permitir |\n| Comprimento mínimo do PIN | 6 |\n| Touch ID em vez de PIN para acesso (iOS8+/iPadOS) | Permitir |\n| Substituir biometria por PIN após o tempo limite | Exigir |\n| Tempo limite (minutos de inatividade) | 30 |\n| Face ID em vez de PIN para acesso (iOS11+/iPadOS) | Bloquear |\n| Redefinir PIN após determinado número de dias | Não |\n| Número de dias | 0 |\n| PIN do aplicativo quando há um PIN definido no dispositivo | Exigir |\n| Credenciais da conta corporativa ou de estudante para acesso | Exigir |\n| Verificar novamente os requisitos de acesso após este número de minutos de inatividade | 30 |\n\n**Inicialização condicional**\n\n| Configuração | Valor | Ação |\n|---|---|---|\n| Número máximo de tentativas de PIN | 5 | Redefinir PIN |\n| Período de carência offline | 720 | Bloquear acesso (minutos) |\n| Período de carência offline | 90 | Apagar dados (dias) |\n| Dispositivos com jailbreak/root | | Bloquear acesso |\n\nUse as listas suspensas para selecionar a opção que completa cada afirmação com base nas informações apresentadas na imagem.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Após 30 minutos de inatividade, será solicitado ao usuário que informe",
        "options": [
          "somente as credenciais da conta",
          "somente o PIN",
          "o PIN e as credenciais da conta"
        ],
        "answer": 2
      },
      {
        "label": "Inserir o PIN errado cinco vezes fará com que o sistema",
        "options": [
          "bloqueie o acesso",
          "redefina o PIN do aplicativo",
          "redefina o PIN do dispositivo",
          "apague os dados da empresa"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Com **Recheck the access requirements after 30 minutes** e **Work or school account credentials for access = Require**, após 30 minutos de inatividade o app volta a exigir os requisitos de acesso: PIN e credenciais. Max PIN attempts = 5 com ação **Reset PIN** força o usuário a redefinir o PIN do app.",
    "details": "**Item a item**\n- **Só credenciais / só PIN:** com \"Require\" para as credenciais, a reverificação pede PIN e conta.\n- **Bloquear / reset do PIN do dispositivo / wipe:** a ação configurada em \"Max PIN attempts\" é Reset PIN (do app).\n\n**Dica de prova:** \"Recheck the access requirements after (minutes of inactivity)\" vale para o app protegido, não para o dispositivo.",
    "docs": [
      {
        "t": "iOS/iPadOS App Protection Policy Settings - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/ref-settings-ios"
      },
      {
        "t": "App Protection Policies Overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/overview"
      },
      {
        "t": "Create and Deploy App Protection Policies - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/create-policy"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/apps/app-protection-policy-settings-ios"
    ],
    "exhibits": [
      {
        "src": "img/Q005-1.png",
        "alt": "Política de proteção de aplicativos iOS — requisitos de acesso e inicialização condicional"
      }
    ]
  },
  {
    "id": "Q006",
    "src": 6,
    "domain": 4,
    "skill": "4.1",
    "topic": "Microsoft 365 Apps",
    "type": "order",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 e um computador que executa o Windows 11.\n\nVocê precisa criar uma instalação personalizada do Microsoft 365 Apps for enterprise.\n\nQuais quatro ações você deve executar em sequência? Para responder, mova as ações apropriadas da lista de ações para a área de resposta e organize-as na ordem correta.",
    "pool": [
      "Execute setup.exe e especifique a opção /packager.",
      "Baixe o Microsoft Office Deployment Tool (ODT) e execute o arquivo executável autoextraível (.exe).",
      "Edite o arquivo de configuração XML.",
      "Execute setup.exe e especifique a opção /download.",
      "Execute setup.exe e especifique a opção /configure."
    ],
    "answer": [
      1,
      2,
      3,
      4
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Fluxo do ODT: baixar e extrair o ODT → editar o XML de configuração → `setup.exe /download` para baixar os binários → `setup.exe /configure` para instalar. O /packager gera pacote App-V, que não é o caso.",
    "details": "**Sequência**\n- **/packager:** gera pacote App-V, não instala o Microsoft 365 Apps.\n- **Ordem:** sem baixar e extrair o ODT não há setup.exe; sem o XML editado, o /download não sabe o que baixar.\n\n**Dica de prova:** Para instalar direto da CDN, pule o /download e use só /configure com o XML (sem SourcePath).",
    "docs": [
      {
        "t": "Add Microsoft 365 Apps to Windows Devices Using Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-365-windows"
      }
    ]
  },
  {
    "id": "Q007",
    "src": 7,
    "domain": 4,
    "skill": "4.2",
    "topic": "Políticas de configuração de aplicativos",
    "type": "single",
    "stem": "Você tem dispositivos inscritos no Microsoft Intune, conforme a tabela a seguir.\n\n| Nome | Plataforma |\n|---|---|\n| Device1 | Windows 10 |\n| Device2 | Windows 11 |\n| Device3 | Android |\n| Device4 | iOS |\n\nA quais dispositivos você pode aplicar políticas de configuração de aplicativos?",
    "options": [
      "Somente Device2",
      "Somente Device1 e Device2",
      "Somente Device3 e Device4",
      "Somente Device2, Device3 e Device4",
      "Device1, Device2, Device3 e Device4"
    ],
    "answer": 2,
    "shuffle": false,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "App configuration policies para **dispositivos gerenciados** existem para Android e iOS/iPadOS. Atenção: desde 2023 há app config para **Windows (Edge via MAM)**, mas ela é para dispositivos **não inscritos**. Como os quatro dispositivos aqui estão inscritos, C continua sendo a resposta mais defensável — mas a questão ficou desatualizada e vale conferir a discussão no ExamTopics.",
    "details": "**Por que não as outras**\n- **Windows inscritos:** app config para Windows existe só via MAM (Edge, não inscritos).\n- **Todos:** dispositivos gerenciados Windows usam perfis de configuração, não app config.",
    "docs": [
      {
        "t": "App Configuration Policies for Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/overview"
      },
      {
        "t": "Add App Configuration Policies for Managed iOS/iPadOS Devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-ios"
      }
    ]
  },
  {
    "id": "Q008",
    "src": 8,
    "domain": 4,
    "skill": "4.2",
    "topic": "Políticas de proteção de aplicativos",
    "type": "hotarea",
    "stem": "Você tem um tenant do Azure AD chamado contoso.com que contém os dispositivos mostrados na tabela a seguir.\n\n| Nome | Sistema operacional |\n|---|---|\n| Device1 | Windows 10 |\n| Device2 | Android 8.0 |\n| Device3 | Android 9 |\n| Device4 | iOS 11.0 |\n| Device5 | iOS 11.4.1 |\n\nTodos os dispositivos contêm um aplicativo chamado App1 e estão inscritos no Microsoft Intune.\n\nVocê precisa impedir que os usuários copiem dados de App1 e os colem em outros aplicativos.\n\nQue tipo de política e quantas políticas você deve criar no Intune? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Tipo de política:",
        "options": [
          "Política de configuração de aplicativos",
          "Política de proteção de aplicativos",
          "Política de Acesso Condicional",
          "Política de conformidade de dispositivos"
        ],
        "answer": 1
      },
      {
        "label": "Número mínimo de políticas:",
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
    "explanation": "Restringir copiar/colar entre apps é função da **app protection policy**, e cada política é por plataforma: Windows, Android e iOS → **3 políticas**. Versões diferentes do mesmo SO não exigem políticas separadas.",
    "details": "**Item a item**\n- **App configuration policy:** configura o app, não protege dados.\n- **Conditional Access:** controla acesso, não copiar/colar.\n- **Compliance policy:** avalia o dispositivo.\n- **1, 2, 4 ou 5 políticas:** uma por plataforma (Windows, Android, iOS); versões não importam.",
    "docs": [
      {
        "t": "App Protection Policies Overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/overview"
      },
      {
        "t": "Create and Deploy App Protection Policies - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/create-policy"
      }
    ]
  },
  {
    "id": "Q009",
    "src": 9,
    "domain": 4,
    "skill": "4.1",
    "topic": "Aplicativos Win32",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos.\n\nVocê planeja implantar dois aplicativos chamados App1 e App2 em todos os dispositivos Windows. App1 deve ser instalado antes de App2.\n\nNo centro de administração do Intune, você cria e implanta dois aplicativos do tipo Aplicativo do Windows (Win32).\n\nVocê precisa garantir que App1 seja instalado antes de App2 em todos os dispositivos.\n\nO que você deve configurar?",
    "options": [
      "as configurações de implantação de App1",
      "um grupo dinâmico de dispositivos",
      "uma regra de detecção",
      "as configurações de implantação de App2"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "A **dependência** é configurada no app que depende do outro: em **App2 > Dependencies** adiciona-se App1. O Intune instala App1 antes.",
    "details": "**Por que não as outras**\n- **App1 deployment:** a dependência é declarada no app dependente (App2).\n- **Dynamic group:** não define ordem de instalação.\n- **Detection rule:** detecta se o app está instalado, mas não ordena.\n\n**Dica de prova:** Dependências de Win32 suportam até 100 apps e cadeias aninhadas; marque \"Automatically install\".",
    "docs": [
      {
        "t": "Gerenciamento de aplicativos Win32 no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/win32"
      },
      {
        "t": "Adicionar um aplicativo de linha de negócios do Windows ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-lob-windows"
      },
      {
        "t": "Adicionar aplicativos da Microsoft Store ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store"
      }
    ]
  },
  {
    "id": "Q010",
    "src": 10,
    "domain": 4,
    "skill": "4.2",
    "topic": "Políticas de configuração de aplicativos",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft Intune.\n\nVocê tem dispositivos inscritos no Intune, conforme a tabela a seguir.\n\n| Nome | Sistema operacional |\n|---|---|\n| Device1 | Android 8.1.0 |\n| Device2 | Android 9 |\n| Device3 | iOS 11.4.1 |\n| Device4 | iOS 12.3.1 |\n| Device5 | iOS 12.3.2 |\n\nUm aplicativo chamado App1 está instalado em cada dispositivo.\n\nQual é o número mínimo de políticas de configuração de aplicativos necessárias para gerenciar App1?",
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
    "explanation": "App configuration policies são criadas **por plataforma**. Uma para Android e uma para iOS/iPadOS → **2**. Versões diferentes do mesmo SO não exigem políticas separadas.",
    "details": "**Por que não as outras**\n- **1:** as políticas são por plataforma (Android ≠ iOS).\n- **3 a 5:** versões diferentes do mesmo SO usam a mesma política.",
    "docs": [
      {
        "t": "App Configuration Policies for Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/overview"
      },
      {
        "t": "Add App Configuration Policies for Managed iOS/iPadOS Devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-ios"
      }
    ]
  },
  {
    "id": "Q011",
    "src": 11,
    "domain": 4,
    "skill": "4.1",
    "topic": "Aplicativos de linha de negócios",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 que contém 100 dispositivos iOS inscritos no Microsoft Intune.\n\nVocê precisa implantar um aplicativo de linha de negócios (LOB) personalizado nos dispositivos usando o Intune.\n\nQual extensão você deve selecionar para o arquivo do pacote do aplicativo?",
    "options": [
      ".intunemac",
      ".ipa",
      ".apk",
      ".appx"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Apps LOB de iOS/iPadOS são pacotes **.ipa**. .apk é Android, .appx é Windows e .intunemac era o formato antigo de macOS.",
    "details": "**Por que não as outras**\n- **.intunemac:** formato antigo de macOS (hoje .pkg/.dmg).\n- **.apk:** Android.\n- **.appx:** Windows.\n\n**Dica de prova:** O .ipa precisa estar assinado com um certificado de distribuição Enterprise ou Ad Hoc.",
    "docs": [
      {
        "t": "Adicionar um aplicativo de linha de negócios do Windows ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-lob-windows"
      },
      {
        "t": "Gerenciamento de aplicativos Win32 no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/win32"
      },
      {
        "t": "Adicionar aplicativos da Microsoft Store ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store"
      }
    ]
  },
  {
    "id": "Q012",
    "src": 12,
    "domain": 1,
    "skill": "1.3",
    "topic": "Acesso Condicional",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém um usuário chamado User1 e um aplicativo web chamado App1.\n\nApp1 deve aceitar somente solicitações de autenticação moderna.\n\nVocê planeja criar uma política de Acesso Condicional chamada CAPolicy1 com as seguintes configurações:\n\n- Atribuições — Usuários ou identidades de carga de trabalho: User1\n- Aplicativos de nuvem ou ações: App1\n- Controles de acesso — Conceder: Bloquear acesso\n\nVocê precisa bloquear somente as solicitações de autenticação herdada para App1.\n\nQual condição você deve adicionar a CAPolicy1?",
    "options": [
      "Filtro de dispositivos",
      "Plataformas de dispositivo",
      "Risco do usuário",
      "Risco de entrada",
      "Aplicativos cliente"
    ],
    "answer": 4,
    "scope": "in",
    "review": "ok",
    "explanation": "A condição **Client apps** separa autenticação moderna (browser, apps móveis e desktop) de **legacy authentication clients** (Exchange ActiveSync e outros). Marcando só os legados com Block, a autenticação moderna continua permitida.",
    "details": "**Por que não as outras**\n- **Filter for devices / device platforms:** filtram o dispositivo, não o protocolo.\n- **User risk / sign-in risk:** tratam de risco.\n\n**Dica de prova:** A Microsoft oferece o template \"Block legacy authentication\"; teste em report-only.",
    "docs": [
      {
        "t": "Use Conditional Access with Microsoft Intune compliance policies - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/conditional-access-integration/overview"
      },
      {
        "t": "How to Require Device Compliance with Conditional Access - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance"
      }
    ]
  },
  {
    "id": "Q013",
    "src": 13,
    "domain": 4,
    "skill": "4.1",
    "topic": "Centro de administração do Microsoft 365 Apps",
    "type": "multi",
    "layout": "panel",
    "panelTitle": "Centro de administração do Microsoft 365 Apps",
    "stem": "Todos os usuários têm aplicativos do Microsoft 365 implantados.\n\nVocê precisa configurar os aplicativos do Microsoft 365 para atender aos seguintes requisitos:\n\n- Habilitar a instalação automática do WebView2 Runtime.\n- Impedir que os usuários enviem comentários.\n\nQuais duas configurações você deve definir no centro de administração do Microsoft 365 Apps? Para responder, selecione as configurações apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "Início",
      "Manutenção › Canal Empresarial Mensal",
      "Personalização › Configuração de dispositivos",
      "Personalização › Gerenciamento de políticas",
      "Personalização › Gerenciamento de novidades",
      "Integridade › Integridade dos aplicativos",
      "Integridade › Status das atualizações de segurança",
      "Integridade › Sincronização do OneDrive",
      "Integridade › Integridade do serviço",
      "Inventário",
      "Saiba mais",
      "Configuração"
    ],
    "answer": [
      2,
      3
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "A instalação automática do WebView2 é uma das **Modern App Settings** em **Device Configuration**. Bloquear o envio de feedback é uma política de nuvem do Office (Cloud Policy), configurada em **Policy Management**.",
    "details": "**Por que não as outras**\n- **Monthly Enterprise / What's New / Health / Inventory / Setup / Home:** não controlam WebView2 nem feedback.\n\n**Dica de prova:** As políticas de nuvem (Cloud Policy) valem para o usuário em qualquer dispositivo onde ele entra no Office.",
    "docs": [
      {
        "t": "Overview of the Microsoft 365 Apps admin center - Microsoft 365 Apps",
        "u": "https://learn.microsoft.com/en-us/microsoft-365-apps/admin-center/overview"
      }
    ]
  },
  {
    "id": "Q014",
    "src": 14,
    "domain": 4,
    "skill": "4.1",
    "topic": "Microsoft 365 Apps",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365.\n\nVocê tem 10 computadores que executam o Windows 10 e estão inscritos no gerenciamento de dispositivos móveis (MDM).\n\nVocê precisa implantar o pacote Microsoft 365 Apps for enterprise em todos os computadores.\n\nO que você deve fazer?",
    "options": [
      "No centro de administração do Microsoft Intune, criar um perfil de dispositivo Windows 10.",
      "No Azure AD, adicionar um registro de aplicativo.",
      "No Azure AD, adicionar um aplicativo empresarial.",
      "No centro de administração do Microsoft Intune, adicionar um aplicativo."
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "No Intune, o Microsoft 365 Apps é adicionado como app (**Apps > Add > Microsoft 365 Apps for Windows 10 and later**) e atribuído aos dispositivos. App registration e enterprise application são objetos de identidade, não de instalação.",
    "details": "**Por que não as outras**\n- **Device profile:** configura o Windows, não instala o Office.\n- **App registration / enterprise app:** objetos de identidade.\n\n**Dica de prova:** No app Microsoft 365 Apps do Intune, escolha a arquitetura, o canal (Current/Monthly/Semi-Annual) e os apps excluídos.",
    "docs": [
      {
        "t": "Add Microsoft 365 Apps to Windows Devices Using Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-365-windows"
      }
    ]
  },
  {
    "id": "Q015",
    "src": 15,
    "domain": 2,
    "skill": "2.4",
    "topic": "Ciclo de vida de dispositivos",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos.\n\nVocê tem um dispositivo Windows 11 chamado Device1, inscrito no Intune. Device1 está offline há 30 dias.\n\nVocê precisa remover Device1 do Intune imediatamente. A solução deve garantir que, se o dispositivo voltar a fazer check-in, todos os aplicativos e dados provisionados pelo Intune sejam removidos. Os aplicativos instalados pelo usuário, os dados pessoais e os aplicativos instalados pelo OEM devem ser mantidos.\n\nO que você deve usar?",
    "options": [
      "uma ação Excluir",
      "uma ação Desativar",
      "uma ação Recomeço",
      "uma ação de redefinição do Autopilot"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "**Delete** tira o dispositivo do Intune na hora, e na próxima vez que ele fizer check-in os dados e apps da empresa são removidos (efeito de Retire). Um **Retire** num dispositivo offline fica pendente até o check-in, então não remove \"imediatamente\". Fresh Start e Autopilot Reset apagam apps do usuário.",
    "details": "**Por que não as outras**\n- **Retire:** fica pendente até o check-in; não remove o objeto \"imediatamente\".\n- **Fresh Start:** reinstala o Windows e remove apps do usuário (pode manter dados).\n- **Autopilot Reset:** limpa tudo, menos a inscrição.\n\n**Dica de prova:** Delete remove o registro do Intune; no próximo check-in, o dispositivo sofre o retire automaticamente.",
    "docs": [
      {
        "t": "Wipe devices with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/wipe"
      },
      {
        "t": "Device Action: Sync - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/sync"
      },
      {
        "t": "Device Action: Restart - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/restart"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/remote-actions/devices-wipe"
    ]
  },
  {
    "id": "Q016",
    "src": 16,
    "domain": 5,
    "skill": "5.2",
    "topic": "Análise de endpoint",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos.\n\nVocê precisa analisar os tempos de inicialização e a frequência de reinicialização dos dispositivos.\n\nO que você deve usar?",
    "options": [
      "Azure Monitor",
      "Intune Data Warehouse",
      "Microsoft Defender for Endpoint",
      "Análise de endpoint"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O relatório **Startup performance** do **Endpoint analytics** mostra tempo de boot/login e frequência de reinicializações.",
    "details": "**Por que não as outras**\n- **Azure Monitor:** plataforma de logs; não traz o relatório pronto de boot.\n- **Intune Data Warehouse:** dados históricos de inventário e compliance.\n- **Defender for Endpoint:** segurança.\n\n**Dica de prova:** O Endpoint analytics exige que os dispositivos enviem dados (perfil de onboarding ou Intune data collection policy).",
    "docs": [
      {
        "t": "Endpoint analytics overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/endpoint-analytics/"
      },
      {
        "t": "Use Remediations to Detect and Fix Support Issues - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/mem/analytics/overview"
    ]
  },
  {
    "id": "Q017",
    "src": 17,
    "domain": 2,
    "skill": "3.2",
    "topic": "Anéis de atualização do Windows",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365 E5.\n\nVocê cria uma nova política de anéis de atualização chamada Policy1, conforme a imagem a seguir.\n\n### Tradução do texto da imagem\n\n**Configurações do anel de atualização — Editar**\n\n| Configuração | Valor |\n|---|---|\n| Atualizações de produtos Microsoft | Permitir |\n| Drivers do Windows | Permitir |\n| Período de adiamento de atualizações de qualidade (dias) | 0 |\n| Período de adiamento de atualizações de recursos (dias) | 30 |\n| Atualizar dispositivos Windows 10 para a versão mais recente do Windows 11 | Não |\n| Período de desinstalação de atualizações de recursos (2 a 60 dias) | 10 |\n| Canal de manutenção | Canal de Disponibilidade Geral |\n\n**Configurações da experiência do usuário**\n\n| Configuração | Valor |\n|---|---|\n| Comportamento de atualização automática | Instalar automaticamente no horário de manutenção |\n| Início do horário ativo | 8h |\n| Fim do horário ativo | 17h |\n| Verificações de reinicialização | Permitir |\n| Opção de pausar atualizações do Windows | Habilitar |\n| Opção de verificar atualizações do Windows | Habilitar |\n| Alterar nível de notificações de atualização | Usar as notificações padrão do Windows Update |\n| Usar configurações de prazo | Permitir |\n| Prazo para atualizações de recursos | 30 |\n| Prazo para atualizações de qualidade | 0 |\n| Período de carência | 0 |\n| Reinicialização automática antes do prazo | Não |\n\nUse as listas suspensas para selecionar a opção que completa cada afirmação com base nas informações apresentadas na imagem.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "As atualizações que contêm correções e melhorias para funcionalidades existentes do Windows [answer choice]",
        "options": [
          "podem ser adiadas indefinidamente",
          "podem ser adiadas por 30 dias",
          "serão instaladas imediatamente"
        ],
        "answer": 2
      },
      {
        "label": "As atualizações que contêm novas funcionalidades do Windows serão instaladas em até [answer choice] após o lançamento",
        "options": [
          "1 dia",
          "30 dias",
          "60 dias"
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
    "details": "**Item a item**\n- **Quality deferidas indefinidamente ou 30 dias:** o adiamento configurado é 0, então instalam imediatamente.\n- **Feature em 1 ou 30 dias:** adiamento de 30 + deadline de 30 = até 60 dias após o lançamento.\n\n**Dica de prova:** O grace period (reinício) soma ainda mais dias depois do deadline.",
    "docs": [
      {
        "t": "Gerenciar políticas de anéis de atualização do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-update-rings"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Gerenciar atualizações de qualidade do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-quality-updates"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/protect/windows-10-update-rings"
    ],
    "exhibits": [
      {
        "src": "img/Q017-1.png",
        "alt": "Configurações do anel de atualização Policy1"
      }
    ]
  },
  {
    "id": "Q018",
    "src": 18,
    "domain": 5,
    "skill": "5.2",
    "topic": "Log Analytics",
    "type": "single",
    "stem": "Você tem computadores que executam o Windows 10 e se conectam a um workspace do Azure Log Analytics. O workspace está configurado para coletar todos os eventos disponíveis dos logs de eventos do Windows.\n\nOs computadores têm os eventos registrados mostrados na tabela a seguir.\n\n| ID do evento | Log | Tipo | Computador |\n|---|---|---|---|\n| 1 | Aplicativo | Êxito | Computer1 |\n| 2 | Sistema | Informação | Computer1 |\n| 3 | Segurança | Êxito na auditoria | Computer2 |\n| 4 | Sistema | Erro | Computer2 |\n\nQuais eventos são coletados no workspace do Log Analytics?",
    "options": [
      "Somente 1",
      "Somente 2 e 3",
      "Somente 1 e 3",
      "Somente 1, 2 e 4",
      "1, 2, 3 e 4"
    ],
    "answer": 3,
    "shuffle": false,
    "scope": "borderline",
    "review": "ok",
    "explanation": "A fonte de dados **Windows event logs** do agente clássico (MMA) coleta Application, System e outros logs, mas **não o Security log** (que exige Microsoft Sentinel/Defender for Cloud). Por isso, 1, 2 e 4. Com o Azure Monitor Agent e DCRs atuais é possível coletar Security, então a questão é do modelo antigo — por isso está como borderline.",
    "details": "**Por que não as outras**\n- **Incluir o evento 3 (Security):** a fonte \"Windows event logs\" do agente clássico não coleta o Security log.\n\n**Dica de prova:** Hoje, com AMA + DCR (ou Sentinel/Defender for Cloud), o Security log é coletado normalmente.",
    "docs": [
      {
        "t": "Encaminhar logs para o Azure Monitor usando o Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/governance/integrate-azure-monitor"
      },
      {
        "t": "Relatórios do Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/overview"
      },
      {
        "t": "Usar APIs do Graph para exportar relatórios do Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/export-graph-apis"
      }
    ]
  },
  {
    "id": "Q019",
    "src": 19,
    "domain": 2,
    "skill": "2.2",
    "topic": "Android Enterprise",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 que contém 10 dispositivos Android Enterprise. Cada dispositivo tem um perfil de trabalho em dispositivo corporativo e está inscrito no Microsoft Intune.\n\nVocê precisa configurar os dispositivos para executar um único aplicativo no modo de quiosque.\n\nQuais configurações você deve modificar no perfil de restrições de dispositivo?",
    "options": [
      "Usuários e contas",
      "Geral",
      "Segurança do sistema",
      "Experiência do dispositivo"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "No perfil de device restrictions para Android Enterprise corporativo, o modo quiosque (single app / multi app) fica em **Device experience**. Na prática, quiosque é para dispositivos **dedicated**; mesmo assim, entre as opções, Device experience é a categoria correta.",
    "details": "**Por que não as outras**\n- **Users and Accounts / General / System security:** não contêm as opções de quiosque.\n\n**Dica de prova:** Para quiosque de verdade, use o perfil **dedicated** (COSU) com o Managed Home Screen.",
    "docs": [
      {
        "t": "Device restriction settings for Android in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-device-restrictions-android-enterprise"
      },
      {
        "t": "Device features and settings in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/overview"
      }
    ]
  },
  {
    "id": "Q020",
    "src": 20,
    "domain": 3,
    "skill": "3.1",
    "topic": "Defender for Endpoint (macOS)",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 que contém 500 dispositivos macOS inscritos no Microsoft Intune.\n\nVocê precisa garantir que possa aplicar políticas de antivírus do Microsoft Defender for Endpoint aos dispositivos macOS. A solução deve minimizar o esforço administrativo.\n\nO que você deve fazer?",
    "options": [
      "Integrar os dispositivos macOS ao portal de conformidade do Microsoft Purview.",
      "No centro de administração do Microsoft Intune, criar uma linha de base de segurança.",
      "Instalar o Defender for Endpoint nos dispositivos macOS.",
      "No centro de administração do Microsoft Intune, criar um perfil de configuração."
    ],
    "answer": 3,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O onboarding do Defender no macOS via Intune é feito com **perfis de configuração** (system extensions, full disk access, network filter e o pacote de onboarding), além do app. O gabarito do dump marca D. Parte da comunidade defende C (instalar o Defender), já que a política de antivírus só tem efeito com o agente instalado — vale conferir a discussão.",
    "details": "**Por que não as outras**\n- **Purview:** compliance, não Defender for Endpoint.\n- **Security baseline:** não faz o onboarding no macOS.\n- **Instalar o Defender manualmente:** mais esforço; o gabarito considera os perfis de configuração do Intune (mais o app).\n\n**Dica de prova:** O onboarding no macOS precisa: system extensions, full disk access, network filter, notificações, o pacote de onboarding e o app (PKG).",
    "docs": [
      {
        "t": "Deploy Microsoft Defender for Endpoint on macOS with Intune - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/mac-install-with-intune"
      },
      {
        "t": "Configure Microsoft Defender for Endpoint with Intune and onboard devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/microsoft-defender/configure-integration"
      },
      {
        "t": "Onboard devices to Microsoft Defender for Endpoint - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/onboarding"
      }
    ]
  },
  {
    "id": "Q021",
    "src": 21,
    "domain": 3,
    "skill": "3.1",
    "topic": "Defender Antivirus e Firewall",
    "type": "multi",
    "stem": "Você tem um tenant do Azure AD e 100 dispositivos Windows 10 ingressados no Azure AD e gerenciados pelo Microsoft Intune.\n\nVocê precisa configurar o Microsoft Defender Firewall e o Microsoft Defender Antivirus nos dispositivos. A solução deve minimizar o esforço administrativo.\n\nQuais duas ações você deve executar? Cada resposta correta apresenta parte da solução.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "Para configurar o Microsoft Defender Antivirus, crie um objeto de Política de Grupo (GPO) e defina as configurações do Windows Defender Antivirus.",
      "Para configurar o Microsoft Defender Firewall, crie um perfil de configuração de dispositivos e defina as configurações de Restrições de dispositivo.",
      "Para configurar o Microsoft Defender Antivirus, crie um perfil de configuração de dispositivos e defina as configurações de Proteção de endpoint.",
      "Para configurar o Microsoft Defender Antivirus, crie um perfil de configuração de dispositivos e defina as configurações de Restrições de dispositivo.",
      "Para configurar o Microsoft Defender Firewall, crie um perfil de configuração de dispositivos e defina as configurações de Proteção de endpoint.",
      "Para configurar o Microsoft Defender Firewall, crie um objeto de Política de Grupo (GPO) e configure o Windows Defender Firewall com Segurança Avançada."
    ],
    "answer": [
      3,
      4
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Nos templates clássicos, o **Defender Antivirus** fica em **Device restrictions** e o **Firewall** em **Endpoint protection**. GPO não se aplica a dispositivos só Entra joined. (Hoje o caminho preferido é Endpoint security > Antivirus/Firewall, mas a questão usa os templates.)",
    "details": "**Por que não as outras**\n- **GPO:** dispositivos só Entra joined não recebem GPO.\n- **Antivírus em Endpoint protection:** nos templates clássicos, o Defender AV fica em Device restrictions.\n- **Firewall em Device restrictions:** o Firewall fica em Endpoint protection.\n\n**Dica de prova:** Hoje use Endpoint security > Antivirus e Firewall (melhor relatório e menos conflitos).",
    "docs": [
      {
        "t": "Manage firewall settings with endpoint security policies in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/firewall"
      },
      {
        "t": "Manage antivirus settings with endpoint security policies in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/antivirus"
      }
    ]
  },
  {
    "id": "Q022",
    "src": 22,
    "domain": 2,
    "skill": "2.2",
    "topic": "Perfis de configuração de dispositivos",
    "type": "single",
    "stem": "Você tem um grupo do Azure AD chamado Group1. Group1 contém dois dispositivos Windows 10 Enterprise chamados Device1 e Device2.\n\nVocê cria um perfil de configuração de dispositivos chamado Profile1 e o atribui a Group1.\n\nVocê precisa garantir que Profile1 se aplique somente a Device1.\n\nO que você deve modificar em Profile1?",
    "options": [
      "Atribuições",
      "Configurações",
      "Escopo (marcas)",
      "Regras de aplicabilidade"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Restringir a um único dispositivo é feito nas **Assignments** (excluir Device2 por grupo ou atribuir a um grupo só com Device1). Applicability rules filtram por edição/versão do SO — os dois são Windows 10 Enterprise, então não diferenciam.",
    "details": "**Por que não as outras**\n- **Settings:** não muda o alvo.\n- **Scope tags:** definem quem administra o perfil.\n- **Applicability rules:** as duas máquinas têm a mesma edição; não as diferenciam.\n\n**Dica de prova:** Assignment filters também resolveriam (incluir só o nome do Device1).",
    "docs": [
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q023",
    "src": 23,
    "domain": 3,
    "skill": "3.1",
    "topic": "Defender for Endpoint",
    "type": "match",
    "stem": "Você tem uma assinatura do Microsoft 365 que inclui o Microsoft Intune.\n\nVocê precisa implementar uma solução do Microsoft Defender for Endpoint que atenda aos seguintes requisitos:\n\n- Impor a conformidade com o Defender for Endpoint usando o Acesso Condicional.\n- Impedir a execução de scripts suspeitos nos dispositivos.\n\nO que você deve configurar? Para responder, arraste os recursos apropriados para os requisitos correspondentes. Cada recurso pode ser usado uma vez, mais de uma vez ou nenhuma vez.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "pool": [
      "Uma política de restrição de dispositivos",
      "Uma linha de base de segurança",
      "Uma regra de redução da superfície de ataque (ASR)",
      "Uma conexão com o Intune"
    ],
    "targets": [
      {
        "label": "Impor a conformidade:",
        "answer": 3
      },
      {
        "label": "Impedir scripts suspeitos:",
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A **conexão Intune ↔ Defender for Endpoint** permite usar o risco de máquina na conformidade e no Conditional Access. Bloquear scripts suspeitos (ofuscados, JS/VBS baixando executáveis) é função das **regras de ASR**.",
    "details": "**Por que cada um:** sem a conexão com o Intune, o risco de máquina do MDE não chega à compliance policy nem ao CA. Scripts ofuscados e downloaders JS/VBS são bloqueados por regras de ASR específicas.\n\n**Dica de prova:** A compliance policy usa \"Require the device to be at or under the machine risk score\".",
    "docs": [
      {
        "t": "Integrate Microsoft Defender for Endpoint with Intune for Device Compliance - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/microsoft-defender/overview"
      },
      {
        "t": "Deploy endpoint detection and response policy with Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/deploy-edr"
      }
    ]
  },
  {
    "id": "Q024",
    "src": 24,
    "domain": 2,
    "skill": "2.2",
    "topic": "Restrições de dispositivo",
    "type": "single",
    "stem": "Sua rede contém um domínio do Active Directory local e um tenant do Azure AD.\n\nO objeto de Política de Grupo (GPO) Default Domain Policy contém as configurações mostradas na tabela a seguir.\n\n| Nome | Valor da GPO |\n|---|---|\n| LockoutBadCount | 0 |\n| MaximumPasswordAge | 42 |\n| MinimumPasswordAge | 1 |\n| MinimumPasswordLength | 7 |\n| PasswordComplexity | True |\n| PasswordHistorySize | 24 |\n\nVocê precisa migrar as configurações existentes da GPO Default Domain Policy para um perfil de configuração de dispositivos.\n\nQual modelo de tipo de perfil de configuração de dispositivos você deve usar?",
    "options": [
      "Modelos Administrativos",
      "Proteção de endpoint",
      "Restrições de dispositivo",
      "Personalizado"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Configurações de senha local (tamanho, complexidade, expiração, histórico) ficam na seção **Password** do template **Device restrictions**. Administrative Templates cobre os ADMX (não inclui a política de senha da conta).",
    "details": "**Por que não as outras**\n- **Administrative Templates:** ADMX; não incluem a política de senha local.\n- **Endpoint protection:** firewall, BitLocker etc.\n- **Custom:** OMA-URI manual; desnecessário.\n\n**Dica de prova:** Em dispositivos Entra joined, a política de senha do Windows Hello/PIN é separada da senha local.",
    "docs": [
      {
        "t": "Restrict devices features using policy in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-device-restrictions"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q025",
    "src": 25,
    "domain": 5,
    "skill": "5.2",
    "topic": "Log Analytics",
    "type": "multi",
    "stem": "Você tem 100 computadores que executam o Windows 10 e se conectam a um workspace do Azure Log Analytics.\n\nQuais três tipos de dados você pode coletar dos computadores usando o Log Analytics? Cada resposta correta apresenta uma solução completa.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "eventos de falha do log de Segurança",
      "a lista de processos e seus tempos de execução",
      "a utilização média do processador",
      "eventos de erro do log do Sistema",
      "logs de aplicativos de terceiros armazenados como arquivos de texto"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "shuffle": false,
    "scope": "borderline",
    "review": "duvidosa",
    "explanation": "O gabarito do dump é B, C e D: processos (via VM insights/Service Map), contadores de desempenho e eventos do System log. O Security log não é coletado pela fonte \"Windows event logs\" do agente clássico. A opção E é controversa, porque logs de texto podem ser coletados como **custom logs** — por isso a questão está marcada como duvidosa e borderline (modelo do agente MMA).",
    "details": "**Por que não as outras**\n- **Security log:** não coletado pelo agente clássico.\n- **Logs de texto:** possíveis como custom logs, mas fora do gabarito do dump (questão duvidosa).\n\n**Dica de prova:** Com AMA + DCR, logs de texto e o Security log são coletados.",
    "docs": [
      {
        "t": "Encaminhar logs para o Azure Monitor usando o Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/governance/integrate-azure-monitor"
      },
      {
        "t": "Relatórios do Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/overview"
      },
      {
        "t": "Usar APIs do Graph para exportar relatórios do Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/export-graph-apis"
      }
    ]
  },
  {
    "id": "Q026",
    "src": 26,
    "domain": 3,
    "skill": "3.1",
    "topic": "Defender for Endpoint",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 E5. A assinatura contém 25 computadores que executam o Windows 11 e estão inscritos no Microsoft Intune.\n\nVocê precisa integrar os dispositivos ao Microsoft Defender for Endpoint.\n\nO que você deve criar no centro de administração do Microsoft Intune?",
    "options": [
      "uma política de redução da superfície de ataque (ASR)",
      "uma linha de base de segurança",
      "uma política de detecção e resposta de endpoint (EDR)",
      "uma política de proteção de conta",
      "uma política de antivírus"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O onboarding em massa pelo Intune é feito com uma política de **Endpoint detection and response (EDR)**, que entrega o pacote de onboarding do conector.",
    "details": "**Por que não as outras**\n- **ASR / baseline / account protection / antivirus:** configuram proteção, mas não fazem o onboarding no MDE.\n\n**Dica de prova:** Antes, habilite a conexão Intune ↔ MDE; aí a política de EDR usa automaticamente o pacote de onboarding do conector.",
    "docs": [
      {
        "t": "Integrate Microsoft Defender for Endpoint with Intune for Device Compliance - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/microsoft-defender/overview"
      },
      {
        "t": "Deploy endpoint detection and response policy with Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/deploy-edr"
      }
    ]
  },
  {
    "id": "Q027",
    "src": 27,
    "domain": 1,
    "skill": "1.2",
    "topic": "Restrições de inscrição",
    "type": "multi",
    "stem": "Sua empresa usa o Microsoft Intune para gerenciar dispositivos.\n\nVocê precisa garantir que somente dispositivos Android que usem perfis de trabalho do Android possam se inscrever no Intune.\n\nQuais duas configurações você deve definir nas restrições de inscrição de dispositivos? Cada resposta correta apresenta parte da solução.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "Em Configurações de plataforma, defina Dispositivos pessoais de Administrador de dispositivo Android como Bloquear.",
      "Em Configurações de plataforma, defina Android Enterprise (perfil de trabalho) como Permitir.",
      "Em Configurações de plataforma, defina Dispositivos pessoais de Administrador de dispositivo Android como Permitir.",
      "Em Configurações de plataforma, defina Administrador de dispositivo Android como Bloquear."
    ],
    "answer": [
      1,
      3
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Permita a plataforma **Android Enterprise (work profile)** e bloqueie a plataforma **Android device administrator** inteira. Bloquear só o \"Personally Owned\" do device administrator ainda deixaria corporativos entrarem por esse método.",
    "details": "**Por que não as outras**\n- **Bloquear só Personally Owned do device admin:** corporativos ainda entrariam pelo device administrator.\n- **Permitir device admin:** contraria o requisito.\n\n**Dica de prova:** O Android device administrator está descontinuado no Intune com GMS (desde dezembro de 2024).",
    "docs": [
      {
        "t": "Overview of enrollment restrictions - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/restrictions"
      },
      {
        "t": "Etapa 5 – Inscrever dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/enroll-devices"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/enrollment/enrollment-restrictions-set"
    ]
  },
  {
    "id": "Q028",
    "src": 28,
    "domain": 2,
    "skill": "2.2",
    "topic": "Quiosque",
    "type": "hotarea",
    "stem": "Você tem o perfil de configuração de dispositivos mostrado na imagem a seguir.\n\n### Tradução do texto da imagem\n\n**Quiosque — Windows 10 e posteriores**\n\nEtapas: Informações básicas; Definições de configuração; Atribuições.\n\nConfigure os dispositivos para executar no modo de quiosque. Antes de selecionar um modo, examine as atribuições de aplicativos no painel Aplicativos Móveis. Os aplicativos que serão executados no modo de quiosque devem estar atribuídos a um dispositivo Windows. Saiba mais sobre o modo de quiosque do Windows.\n\n| Configuração | Valor |\n|---|---|\n| Selecionar um modo de quiosque | Aplicativo único, quiosque de tela inteira |\n| Tipo de entrada do usuário | Entrada automática (Windows 10, versão 1803+) |\n| Tipo de aplicativo | Adicionar navegador Microsoft Edge |\n| URL do quiosque do Edge | https://contoso.com |\n| Tipo de modo de quiosque do Microsoft Edge | Navegação pública (InPrivate) |\n| Atualizar navegador após tempo de inatividade | 5 |\n| Especificar janela de manutenção para reinicializações de aplicativos | Não configurado (opção alternativa: Exigir) |\n| Horário de início da janela de manutenção | MM/DD/YYYY; h:mm:ss A (campos desabilitados) |\n| Recorrência da janela de manutenção | Diariamente (recomendado; campo desabilitado) |\n\nEsse perfil de quiosque exige o Microsoft Edge versão 87 ou posterior com o Windows 10 versão 1909 ou posterior. Saiba mais sobre o modo de quiosque do Microsoft Edge.\n\nUse as listas suspensas para selecionar a opção que completa cada afirmação com base nas informações apresentadas na imagem.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Os usuários [answer choice].",
        "options": [
          "podem acessar qualquer URL",
          "não podem visualizar a barra de endereços no Microsoft Edge",
          "podem acessar somente URLs que incluam contoso.com",
          "podem acessar somente URLs que comecem com https://contoso.com"
        ],
        "answer": 0
      },
      {
        "label": "Os dispositivos Windows 10 e posteriores podem ter [answer choice].",
        "options": [
          "uma única instância do Microsoft Edge com uma única guia",
          "uma única instância do Microsoft Edge com várias guias",
          "várias instâncias do Microsoft Edge com várias guias",
          "várias instâncias do Microsoft Edge, cada uma com uma única guia"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "No modo **Public Browsing (InPrivate)**, o Edge roda em quiosque com navegação **multiaba** e barra de endereços, sem restringir URLs (a Edge Kiosk URL é só a página inicial). Como é **single app**, existe uma única instância do Edge.",
    "details": "**Item a item**\n- **Só URLs com contoso.com:** o Public Browsing não restringe URLs (precisaria da lista de bloqueio).\n- **Sem barra de endereços:** o modo Digital/Interactive signage é que esconde.\n- **Várias instâncias:** single-app kiosk tem uma instância só.\n\n**Dica de prova:** A Kiosk URL é só a página inicial; o reset por inatividade limpa a sessão.",
    "docs": [
      {
        "t": "Kiosk settings for Windows and Holographic devices in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-kiosk"
      },
      {
        "t": "Windows Holographic Business device settings - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-device-restrictions-windows-holographic"
      },
      {
        "t": "Surface Hub Windows 10 Team device restrictions in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-device-restrictions-surface-hub"
      },
      {
        "t": "Deploy OEMConfig profiles to Zebra devices using Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/deploy-oemconfig-zebra-android"
      }
    ],
    "exhibits": [
      {
        "src": "img/Q028-1.png",
        "alt": "Perfil de quiosque: aplicativo único, Edge, navegação pública (InPrivate), URL https://contoso.com"
      }
    ]
  },
  {
    "id": "Q029",
    "src": 29,
    "domain": 2,
    "skill": "3.2",
    "topic": "Otimização de Entrega",
    "type": "hotarea",
    "stem": "Você tem 100 dispositivos Windows 10 inscritos no Microsoft Intune.\n\nVocê precisa configurar os dispositivos para obter atualizações do Windows pela internet e de outros computadores em uma rede local.\n\nQual configuração da Otimização de Entrega você deve definir e que tipo de objeto do Intune deve criar? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Configuração da Otimização de Entrega:",
        "options": [
          "Tipo de otimização de largura de banda",
          "Modo de download",
          "Cache de pares de VPN"
        ],
        "answer": 1
      },
      {
        "label": "Objeto do Intune:",
        "options": [
          "Um perfil de configuração",
          "Políticas de configuração de aplicativos",
          "Atualizações de qualidade do Windows 10 e posteriores",
          "Anéis de atualização do Windows 10 e posteriores"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "**Download mode** define se o dispositivo usa peers (LAN, grupo, internet). O Delivery Optimization é configurado num **perfil de configuração** (template Delivery Optimization ou Settings catalog).",
    "details": "**Item a item**\n- **Bandwidth optimization / VPN peer caching:** não definem a fonte (LAN/internet).\n- **App configuration / quality updates / update rings:** não configuram o Delivery Optimization.\n\n**Dica de prova:** Download mode: HTTP only (0), LAN (1), Group (2), Internet (3), Simple (99), Bypass (100).",
    "docs": [
      {
        "t": "Windows Delivery Optimization settings in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-delivery-optimization-windows"
      },
      {
        "t": "What is Delivery Optimization?",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/do/waas-delivery-optimization"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/configuration/delivery-optimization-windows"
    ]
  },
  {
    "id": "Q030",
    "src": 30,
    "domain": 2,
    "skill": "2.4",
    "topic": "Notificações personalizadas",
    "type": "yesno",
    "stem": "Você tem um tenant do Azure AD que contém os usuários mostrados na tabela a seguir.\n\n| Nome | Membro de |\n|---|---|\n| User1 | Group1 |\n| User2 | Group2 |\n\nVocê tem dispositivos inscritos no Microsoft Intune, conforme a tabela a seguir.\n\n| Nome | Plataforma | Membro de |\n|---|---|---|\n| Device1 | Windows 10 | Group1 |\n| Device2 | Android | Group1 |\n| Device3 | iOS | Group2 |\n\nNo Intune, você cria e envia uma notificação personalizada chamada Notification1 para Group1.\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "User1 recebe Notification1 em Device1.",
      "User2 recebe Notification1 em Device2.",
      "User1 recebe Notification1 em Device3."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Custom notifications são enviadas a **grupos de usuários** e chegam pelo Company Portal / app Intune em **iOS/iPadOS e Android** — não em Windows. User1 está em Group1: não recebe no Device1 (Windows), mas recebe no Device3 (iOS). User2 não está em Group1, então não recebe.",
    "details": "**Item a item**\n- **User1 no Device1 (Windows):** Não. Custom notifications só chegam em iOS/Android.\n- **User2:** Não. Não está no Group1.\n- **User1 no Device3 (iOS):** Sim. A notificação segue o usuário em qualquer dispositivo iOS/Android dele.\n\n**Dica de prova:** A notificação aparece como push do Company Portal; limite de 25 por hora.",
    "docs": [
      {
        "t": "Device Action: Send Custom Notification - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/send-custom-notification"
      },
      {
        "t": "Device Action: Sync - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/sync"
      },
      {
        "t": "Wipe devices with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/wipe"
      },
      {
        "t": "Device Action: Restart - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/restart"
      }
    ]
  },
  {
    "id": "Q031",
    "src": 31,
    "domain": 5,
    "skill": "5.2",
    "topic": "Intune Data Warehouse",
    "type": "single",
    "stem": "Você usa o Microsoft Intune e o Intune Data Warehouse.\n\nVocê precisa criar um relatório de inventário de dispositivos que inclua os dados armazenados no data warehouse.\n\nO que você deve usar para criar o relatório?",
    "options": [
      "o aplicativo Company Portal",
      "a Análise de endpoint",
      "o aplicativo do portal do Azure",
      "o Microsoft Power BI"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O Data Warehouse expõe um feed OData consumido pelo **Power BI** (há inclusive um app pronto do Intune Compliance).",
    "details": "**Por que não as outras**\n- **Company Portal:** app do usuário final.\n- **Endpoint analytics:** relatórios de desempenho.\n- **Azure portal app:** não gera relatórios do Data Warehouse.\n\n**Dica de prova:** O feed OData também pode ser consumido no Excel ou por qualquer cliente OData.",
    "docs": [
      {
        "t": "Use the Intune Data Warehouse - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/developer/data-warehouse/create-reports"
      },
      {
        "t": "Relatórios do Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/overview"
      },
      {
        "t": "Usar APIs do Graph para exportar relatórios do Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/export-graph-apis"
      },
      {
        "t": "Encaminhar logs para o Azure Monitor usando o Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/governance/integrate-azure-monitor"
      }
    ]
  },
  {
    "id": "Q032",
    "src": 32,
    "domain": 1,
    "skill": "1.2",
    "topic": "Inscrição de dispositivos Apple",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 e 25 Apple iPads.\n\nVocê precisa inscrever os iPads no Microsoft Intune usando o método de inscrição do Apple Configurator.\n\nO que você deve fazer primeiro?",
    "options": [
      "Configurar um certificado de push MDM da Apple.",
      "Adicionar sua conta de usuário como gerenciador de inscrição de dispositivos (DEM).",
      "Modificar as restrições de inscrição.",
      "Carregar um arquivo com os identificadores de dispositivo de cada iPad."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Qualquer inscrição de iOS/iPadOS (Apple Configurator, ADE, Company Portal) depende primeiro do **Apple MDM push certificate**. Sem ele o Intune não gerencia nenhum dispositivo Apple.",
    "details": "**Por que não as outras**\n- **DEM:** conta para inscrever muitos dispositivos, mas depende do certificado antes.\n- **Restrições:** vêm depois.\n- **Identificadores:** são usados no Apple Configurator, mas só depois do push certificate.\n\n**Dica de prova:** O certificado vale um ano; renove com o **mesmo Apple ID** para não perder a gestão dos dispositivos.",
    "docs": [
      {
        "t": "Set up automated device enrollment (ADE) for iOS/iPadOS - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-ios"
      },
      {
        "t": "Set up automated device enrollment (ADE) for macOS - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos"
      }
    ]
  },
  {
    "id": "Q033",
    "src": 33,
    "domain": 2,
    "skill": "3.2",
    "topic": "Windows Update for Business",
    "type": "hotarea",
    "stem": "Você tem 100 computadores que executam o Windows 10. Você não tem servidores. Todos os computadores estão ingressados no Azure AD.\n\nOs computadores têm configurações de atualização diferentes, e alguns estão configurados para atualizações manuais.\n\nVocê precisa configurar o Windows Update. A solução deve atender aos seguintes requisitos:\n\n- A configuração deve ser gerenciada de um local central.\n- O tráfego de internet deve ser minimizado.\n- Os custos devem ser minimizados.\n\nComo você deve configurar o Windows Update? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Tecnologia do Windows Update a usar:",
        "options": [
          "Windows Server Update Services (WSUS)",
          "Microsoft Configuration Manager",
          "Windows Update for Business"
        ],
        "answer": 2
      },
      {
        "label": "Gerenciar a configuração usando:",
        "options": [
          "Um objeto de Política de Grupo (GPO)",
          "Microsoft Configuration Manager",
          "Microsoft Intune"
        ],
        "answer": 2
      },
      {
        "label": "Gerenciar o tráfego usando:",
        "options": [
          "Otimização de Entrega",
          "BranchCache",
          "Cache de pares"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Sem servidores e com dispositivos só Entra joined, a combinação é **Windows Update for Business** gerenciado pelo **Intune**, com **Delivery Optimization** para reduzir tráfego de internet (peers na LAN). WSUS, ConfigMgr e GPO exigem infraestrutura on-premises.",
    "details": "**Item a item**\n- **WSUS / ConfigMgr:** exigem servidores on-premises (custo).\n- **GPO:** dispositivos só Entra joined não recebem GPO.\n- **BranchCache / Peer cache:** BranchCache exige configuração on-premises; Peer cache é do ConfigMgr.\n\n**Dica de prova:** WUfB via Intune = update rings + feature/quality/driver update policies.",
    "docs": [
      {
        "t": "Windows Update Management Overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/"
      },
      {
        "t": "Quick guide to Windows as a service",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/update/waas-quick-start"
      }
    ]
  },
  {
    "id": "Q034",
    "src": 34,
    "domain": 2,
    "skill": "3.2",
    "topic": "Otimização de Entrega",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 que contém 150 dispositivos Windows com ingresso híbrido no Azure AD. Todos os dispositivos estão inscritos no Microsoft Intune.\n\nVocê precisa configurar a Otimização de Entrega nos dispositivos para atender aos seguintes requisitos:\n\n- Permitir downloads da internet e de outros computadores na rede local.\n- Limitar o percentual de largura de banda utilizada a 50.\n\nO que você deve usar?",
    "options": [
      "um perfil de configuração",
      "uma configuração de Política de Grupo do Windows Update for Business",
      "uma configuração de Política de Grupo dos Serviços de Rede Ponto a Ponto da Microsoft",
      "um perfil de anel de atualização do Windows 10 e posteriores"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Download mode e limites de banda do Delivery Optimization ficam num **perfil de configuração** (template Delivery Optimization ou Settings catalog).",
    "details": "**Por que não as outras**\n- **GPO de WUfB / Peer-to-Peer Networking:** não são a forma gerenciada pelo Intune, e Peer-to-Peer Networking não é Delivery Optimization.\n- **Update ring:** tem uma opção de Delivery Optimization antiga, mas os limites de banda ficam no perfil próprio.\n\n**Dica de prova:** Limite por porcentagem: \"Maximum foreground/background download bandwidth (percentage)\".",
    "docs": [
      {
        "t": "Windows Delivery Optimization settings in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-delivery-optimization-windows"
      },
      {
        "t": "What is Delivery Optimization?",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/do/waas-delivery-optimization"
      }
    ]
  },
  {
    "id": "Q035",
    "src": 35,
    "domain": 1,
    "skill": "1.3",
    "topic": "Grupos locais",
    "type": "single",
    "stem": "Sua rede contém um domínio do Active Directory chamado contoso.com. O domínio contém um computador chamado Computer1 que executa o Windows 10.\n\nVocê tem os grupos mostrados na tabela a seguir.\n\n| Nome | Tipo | Local |\n|---|---|---|\n| Group1 | Grupo de distribuição universal | Contoso.com |\n| Group2 | Grupo de segurança global | Contoso.com |\n| Group3 | Grupo | Computer1 |\n| Group4 | Grupo | Computer1 |\n\nQuais grupos você pode adicionar a Group4?",
    "options": [
      "Somente Group2",
      "Somente Group1 e Group2",
      "Somente Group2 e Group3",
      "Group1, Group2 e Group3"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Um grupo local pode conter contas e **grupos de segurança do domínio** (como o global Group2), mas não grupos de **distribuição** (Group1) nem **outros grupos locais** (Group3).",
    "details": "**Por que não as outras**\n- **Group1 (distribuição):** grupos de distribuição não têm SID de segurança útil para permissões locais.\n- **Group3 (local):** grupos locais não podem ser aninhados em outro grupo local.\n\n**Dica de prova:** Grupos locais aceitam: usuários locais e do domínio, e grupos globais e universais de segurança do domínio (e domain local do mesmo domínio).",
    "docs": [
      {
        "t": "Manage account protection settings with endpoint security policies in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/account-protection"
      }
    ]
  },
  {
    "id": "Q036",
    "src": 36,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
    "type": "match",
    "stem": "Você tem uma assinatura do Microsoft 365. A assinatura contém computadores que executam o Windows 11 e estão inscritos no Microsoft Intune.\n\nVocê precisa criar uma política de conformidade que atenda aos seguintes requisitos:\n\n- Exigir a Criptografia de Unidade de Disco BitLocker (BitLocker) em cada dispositivo.\n- Exigir uma versão mínima do sistema operacional.\n\nQual configuração da política de conformidade você deve definir para cada requisito? Para responder, arraste as configurações apropriadas para os requisitos correspondentes. Cada configuração pode ser usada uma vez, mais de uma vez ou nenhuma vez.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "pool": [
      "Integridade do dispositivo",
      "Propriedades do dispositivo",
      "Microsoft Defender for Endpoint",
      "Segurança do sistema"
    ],
    "targets": [
      {
        "label": "Exigir BitLocker:",
        "answer": 0
      },
      {
        "label": "Exigir uma versão mínima do sistema operacional:",
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Na política de conformidade do Windows, **Require BitLocker** fica em **Device Health** (avaliado pelo Device Health Attestation), e a versão mínima do SO em **Device Properties**. System Security tem itens como criptografia de armazenamento, firewall e antivírus.",
    "details": "**Item a item**\n- **BitLocker em System Security:** em System Security fica \"Encryption of data storage on device\", não o \"Require BitLocker\".\n- **Versão mínima em Device Health:** a versão do SO fica em Device Properties.\n\n**Dica de prova:** Device Health usa o Health Attestation, que só é reavaliado após reiniciar.",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q037",
    "src": 37,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
    "type": "yesno",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 que usa o Microsoft Intune.\n\nVocê tem os dispositivos Windows 11 mostrados na tabela a seguir.\n\n| Nome | Membro de | Criptografia de Unidade de Disco BitLocker (BitLocker) |\n|---|---|---|\n| Device1 | Group1 | Habilitada |\n| Device2 | Group1, Group3 | Desabilitada |\n| Device3 | Group1, Group2 | Habilitada |\n\nVocê implanta a política de conformidade de dispositivos mostrada na tabela a seguir.\n\n| Configuração | Valor |\n|---|---|\n| Nome | Policy1 |\n| Plataforma | Windows 10 e posteriores |\n| Integridade do dispositivo — Exigir BitLocker | Exigir |\n| Ações para não conformidade | Marcar dispositivo como não conforme — Imediatamente |\n| Marcas de escopo | Default |\n| Grupos incluídos | Group1, Group3 |\n| Grupos excluídos | Group2 |\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "Device1 terá Policy1 atribuída e será marcado como em conformidade.",
      "Device2 terá Policy1 atribuída e será marcado como em conformidade.",
      "Device3 terá Policy1 atribuída e será marcado como em conformidade."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Device1 recebe a política e tem BitLocker → conforme. Device2 recebe a política, mas está sem BitLocker → não conforme. Device3 está em Group2, que é **excluído**; a exclusão vence a inclusão, então a política nem é atribuída.",
    "details": "**Item a item**\n- **Device1:** Sim. Atribuído e com BitLocker.\n- **Device2:** Não. Sem BitLocker.\n- **Device3:** Não. Excluído (Group2); a exclusão vence a inclusão.",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q038",
    "src": 38,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
    "type": "match",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém os dispositivos mostrados na tabela a seguir.\n\n| Nome | Tipo |\n|---|---|\n| Device1 | Windows 10 |\n| Device2 | iOS |\n| Device3 | Android Enterprise |\n\nVocê precisa garantir que somente dispositivos que executem firmware ou builds de sistema operacional confiáveis possam acessar os recursos de rede.\n\nQual configuração de política de conformidade você deve definir para cada dispositivo? Para responder, arraste as configurações apropriadas para os dispositivos correspondentes. Cada configuração pode ser usada uma vez, mais de uma vez ou nenhuma vez.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "pool": [
      "Exigir BitLocker",
      "Impedir que dispositivos com jailbreak tenham acesso corporativo.",
      "Impedir que dispositivos com root tenham acesso corporativo.",
      "Exigir que a Inicialização Segura esteja habilitada no dispositivo."
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
    "explanation": "\"Firmware/build confiável\" no Windows é **Secure Boot** (cadeia de boot íntegra). No iOS, o equivalente é bloquear **jailbreak**; no Android, bloquear **root**. BitLocker é criptografia, não integridade do boot.",
    "details": "**Item a item**\n- **BitLocker para o Device1:** criptografia não garante integridade do boot.\n- **Jailbreak no Android / root no iOS:** cada termo vale para uma plataforma.\n\n**Dica de prova:** No Android Enterprise, também existe \"Play Integrity Verdict\" (antigo SafetyNet) para atestar o dispositivo.",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q039",
    "src": 39,
    "domain": 1,
    "skill": "5.1",
    "topic": "Conformidade personalizada",
    "type": "order",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém 1.000 dispositivos Windows 11 inscritos no Microsoft Intune.\n\nVocê planeja criar e monitorar os resultados de uma política de conformidade usada para validar a versão do BIOS dos dispositivos.\n\nQuais quatro ações você deve executar em sequência? Para responder, mova as ações apropriadas da lista de ações para a área de resposta e organize-as na ordem correta.",
    "pool": [
      "Examinar os resultados no painel de conformidade.",
      "Criar e atribuir uma política de conformidade com as configurações de Segurança do sistema definidas.",
      "Examinar os resultados na pasta de trabalho de informações e relatórios do Acesso Condicional.",
      "Criar um script de descoberta do PowerShell e um arquivo JSON.",
      "Carregar o script do PowerShell no Intune.",
      "Carregar o arquivo JSON no Azure AD.",
      "Criar e atribuir uma política de conformidade personalizada."
    ],
    "answer": [
      3,
      4,
      6,
      0
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "**Custom compliance**: cria-se o script de descoberta (PowerShell) e o JSON com as regras → faz upload do script no Intune (Compliance policies > Scripts) → cria a política de conformidade com Custom Compliance, anexando o script e o JSON → acompanha o resultado nos relatórios de conformidade. O JSON é enviado na própria política, não no Entra ID.",
    "details": "**Sequência**\n- **System Security:** não valida BIOS.\n- **CA Insights workbook:** mostra impacto de CA, não o resultado do script.\n- **Upload do JSON no Entra:** o JSON vai na própria compliance policy do Intune.\n\n**Dica de prova:** O script de descoberta retorna um JSON compacto; as regras comparam os valores (ex.: BiosVersion GreaterEquals).",
    "docs": [
      {
        "t": "Use custom compliance settings in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/custom-settings"
      },
      {
        "t": "Create discovery scripts for custom compliance policy in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-custom-script"
      }
    ]
  },
  {
    "id": "Q040",
    "src": 40,
    "domain": 2,
    "skill": "1.3",
    "topic": "Grupos locais",
    "type": "match",
    "stem": "Você tem um computador que executa o Windows 10 e contém dois usuários locais chamados User1 e User2.\n\nVocê precisa garantir que os usuários possam executar as seguintes ações:\n\n- User1 deve poder ajustar a data e a hora.\n- User2 deve poder limpar os logs do Windows.\n\nA solução deve usar o princípio do menor privilégio.\n\nA qual grupo você deve adicionar cada usuário? Para responder, arraste os grupos apropriados para os usuários correspondentes. Cada grupo pode ser usado uma vez, mais de uma vez ou nenhuma vez.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "pool": [
      "Administradores",
      "Leitores de Log de Eventos",
      "Usuários de Log de Desempenho",
      "Usuários Avançados",
      "Grupo de Contas Gerenciadas pelo Sistema"
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
    "explanation": "Por padrão, o direito \"Change the system time\" é dado a Administrators (e LOCAL SERVICE), e limpar logs exige \"Manage auditing and security log\", também de Administrators. Event Log Readers só **lê** logs, e Power Users no Windows 10 não tem direitos extras. Questão de ambiente local, marcada como duvidosa pela discussão sobre Power Users.",
    "details": "**Item a item**\n- **Event Log Readers:** só lê logs.\n- **Power Users:** grupo legado, sem direitos extras no Windows 10.\n\n**Dica de prova:** Alternativa de menor privilégio: dar só o direito específico (Change the system time / Manage auditing and security log) via política, sem Administrators.",
    "docs": [
      {
        "t": "Manage account protection settings with endpoint security policies in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/account-protection"
      }
    ]
  },
  {
    "id": "Q041",
    "src": 41,
    "domain": 1,
    "skill": "1.1",
    "topic": "Ingresso/registro no Microsoft Entra",
    "type": "hotarea",
    "stem": "Você tem um tenant do Azure AD chamado contoso.com.\n\nVocê tem os dispositivos mostrados na tabela a seguir.\n\n| Nome | Plataforma |\n|---|---|\n| Device1 | Windows 11 |\n| Device2 | Windows 10 |\n| Device3 | iOS |\n| Device4 | Ubuntu Linux |\n\nQuais dispositivos podem ser ingressados no Azure AD e quais podem ser registrados em contoso.com? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Ingressados no Azure AD:",
        "options": [
          "Somente Device1",
          "Somente Device1 e Device2",
          "Somente Device1 e Device3",
          "Somente Device1, Device2 e Device3",
          "Device1, Device2, Device3 e Device4"
        ],
        "answer": 1
      },
      {
        "label": "Registrados em contoso.com:",
        "options": [
          "Somente Device1 e Device2",
          "Somente Device2 e Device3",
          "Somente Device3 e Device4",
          "Somente Device2, Device3 e Device4",
          "Device1, Device2, Device3 e Device4"
        ],
        "answer": 4
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "**Entra join** é só para Windows 10/11 (e Windows Server em VMs Azure). **Entra registration** suporta Windows, iOS/iPadOS, Android, macOS e Ubuntu — os quatro dispositivos.",
    "details": "**Item a item**\n- **Join para iOS / Ubuntu:** Entra join é só para Windows 10/11 (e Server em VM do Azure).\n- **Registro só de alguns:** iOS, Android, macOS e Ubuntu também registram.",
    "docs": [
      {
        "t": "What is device identity in Microsoft Entra ID? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/overview"
      },
      {
        "t": "What is a Microsoft Entra joined device? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/concept-directory-join"
      },
      {
        "t": "What is a Microsoft Entra hybrid joined device? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/concept-hybrid-join"
      }
    ]
  },
  {
    "id": "Q042",
    "src": 42,
    "domain": 1,
    "skill": "1.1",
    "topic": "Ingresso no Microsoft Entra",
    "type": "yesno",
    "stem": "Você tem um tenant do Azure AD chamado contoso.com que contém os usuários mostrados na tabela a seguir.\n\n| Nome | Função |\n|---|---|\n| Admin1@contoso.com | Administrador de Segurança |\n| Admin2@contoso.com | Administrador de Dispositivos de Nuvem |\n| User1@contoso.com | Nenhuma |\n\nVocê tem um computador chamado Computer1 que executa o Windows 10. Computer1 está em um grupo de trabalho e tem os usuários locais mostrados na tabela a seguir.\n\n| Nome | Membro de |\n|---|---|\n| Administrator1 | Operadores de Configuração de Rede |\n| Administrator2 | Usuários Avançados |\n| UserA | Administradores |\n\nUserA ingressa Computer1 no Azure AD usando user1@contoso.com.\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "User1@contoso.com é membro do grupo local Administradores em Computer1.",
      "Admin1@contoso.com pode configurar o firewall e o Microsoft Defender em Computer1.",
      "Admin2@contoso.com pode instalar software em Computer1."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "No Entra join, entram no Administrators local: o **usuário que fez o join** (por padrão), a função **Global Administrator** e a função **Microsoft Entra Joined Device Local Administrator**. Security Administrator e Cloud Device Administrator não viram admins locais.",
    "details": "**Item a item**\n- **User1 (quem fez o join):** Sim. Vira admin local por padrão (a menos que \"Registering user is added as local administrator\" esteja em None).\n- **Admin1 (Security admin):** Não. A função não dá admin local.\n- **Admin2 (Cloud Device admin):** Não. Também não dá admin local.\n\n**Dica de prova:** Use \"Microsoft Entra Joined Device Local Administrator\" ou o Windows LAPS para administração local.",
    "docs": [
      {
        "t": "Plan your Microsoft Entra join deployment - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/device-join-plan"
      },
      {
        "t": "Join Windows 11 Devices to Microsoft Entra ID During OOBE - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/device-join-out-of-box"
      }
    ]
  },
  {
    "id": "Q043",
    "src": 43,
    "domain": 2,
    "skill": "2.2",
    "topic": "Comunicação remota do PowerShell",
    "type": "single",
    "stem": "Sua rede contém um domínio do Active Directory. O domínio contém um usuário chamado Admin1. Todos os computadores executam o Windows 10.\n\nVocê habilita a comunicação remota do Windows PowerShell nos computadores.\n\nVocê precisa garantir que Admin1 possa estabelecer conexões remotas do PowerShell com os computadores. A solução deve usar o princípio do menor privilégio.\n\nA qual grupo você deve adicionar Admin1?",
    "options": [
      "Operadores de Assistência de Controle de Acesso",
      "Usuários da Área de Trabalho Remota",
      "Usuários Avançados",
      "Usuários de Gerenciamento Remoto"
    ],
    "answer": 3,
    "scope": "borderline",
    "review": "ok",
    "explanation": "O grupo local **Remote Management Users** dá acesso ao WinRM (e portanto ao PowerShell remoting) sem privilégios de administrador. Tema de gerenciamento on-premises, marcado como borderline no escopo atual.",
    "details": "**Por que não as outras**\n- **Access Control Assistance Operators:** consulta permissões de recursos remotamente.\n- **Remote Desktop Users:** RDP, não WinRM.\n- **Power Users:** legado.\n\n**Dica de prova:** O endpoint padrão do PowerShell remoting permite Administrators e Remote Management Users.",
    "docs": [
      {
        "t": "Security considerations for PowerShell Remoting using WinRM - PowerShell",
        "u": "https://learn.microsoft.com/en-us/powershell/scripting/security/remoting/winrm-security"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q044",
    "src": 44,
    "domain": 1,
    "skill": "2.1",
    "topic": "Windows Autopilot",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft Intune.\n\nVocê está criando um perfil de implantação do Windows Autopilot chamado Profile1, conforme a imagem a seguir. Profile1 será implantado em dispositivos Windows 10.\n\n### Tradução do texto da imagem\n\n**Criar perfil — PC Windows**\n\nEtapas: Informações básicas; Experiência inicial (OOBE); Atribuições; Revisar + criar.\n\nConfigure a experiência inicial dos dispositivos Autopilot.\n\n| Configuração | Valor selecionado |\n|---|---|\n| Modo de implantação | Controlado pelo usuário |\n| Ingressar no Azure AD como | Ingressado no Azure AD |\n| Termos de Licença de Software Microsoft | Ocultar (opção alternativa: Mostrar) |\n| Configurações de privacidade | Ocultar (opção alternativa: Mostrar) |\n| Ocultar opções de alteração de conta | Ocultar (opção alternativa: Mostrar) |\n| Tipo de conta de usuário | Padrão (opção alternativa: Administrador) |\n| Permitir implantação pré-provisionada | Não (opção alternativa: Sim) |\n| Idioma (região) | Padrão do sistema operacional |\n| Configurar o teclado automaticamente | Sim (opção alternativa: Não) |\n| Aplicar modelo de nome de dispositivo | Não (opção alternativa: Sim) |\n\nMensagens informativas: Informações importantes sobre como ocultar os termos de licença. O valor padrão para a coleta de dados de diagnóstico mudou nos dispositivos que executam o Windows 10 versão 1903 ou posterior, ou o Windows 11.\n\nUse as listas suspensas para selecionar a opção que completa cada afirmação com base nas informações apresentadas na imagem.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Os usuários que implantam um dispositivo usando Profile1 [answer choice].",
        "options": [
          "são impedidos de modificar qualquer configuração da área de trabalho",
          "podem criar usuários locais adicionais no dispositivo",
          "podem modificar as configurações da área de trabalho de todos os usuários do dispositivo",
          "podem modificar as configurações da área de trabalho somente para si mesmos"
        ],
        "answer": 3
      },
      {
        "label": "Os usuários podem configurar [answer choice] durante a implantação.",
        "options": [
          "o nome do computador",
          "as configurações da Cortana",
          "o layout do teclado"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Com **User account type = Standard**, o usuário não é admin local: pode mudar as configurações só do próprio perfil. O dump marca **computer name** no segundo item. Ponto discutível: com o Autopilot e \"Apply device name template = No\" o nome é gerado automaticamente, e o teclado também é configurado automaticamente. Confira a discussão.",
    "details": "**Item a item**\n- **Bloquear tudo / criar usuários / mudar para todos:** usuário Standard altera só o próprio perfil.\n- **Cortana / teclado:** o gabarito considera o nome do computador; a comunidade discute porque o teclado está em automático.\n\n**Dica de prova:** Com \"Apply device name template\", use %SERIAL% ou %RAND:x% para padronizar os nomes.",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ],
    "exhibits": [
      {
        "src": "img/Q044-1.png",
        "alt": "Perfil Autopilot: controlado pelo usuário, ingressado no Azure AD, conta padrão, teclado automático, sem modelo de nome"
      }
    ]
  },
  {
    "id": "Q048",
    "src": 48,
    "domain": 1,
    "skill": "2.1",
    "topic": "Windows Autopilot",
    "type": "yesno",
    "stem": "Você tem um tenant do Azure AD chamado contoso.com que contém os dispositivos mostrados na tabela a seguir.\n\n| Nome | Sistema operacional | Status no Azure AD | Gerenciamento de dispositivos móveis (MDM) |\n|---|---|---|---|\n| Device1 | Windows 11 | Registrado | Nenhum |\n| Device2 | Windows 10 | Ingressado | Nenhum |\n| Device3 | Windows 10 | Ingressado | Microsoft Intune |\n\nContoso.com contém os grupos do Azure AD mostrados na tabela a seguir.\n\n| Nome | Membros |\n|---|---|\n| Group1 | Group2, Device1, Device3 |\n| Group2 | Device2 |\n\nVocê adiciona um perfil de implantação do Windows Autopilot. O perfil está configurado conforme a tabela a seguir.\n\n| Configuração | Valor |\n|---|---|\n| Nome | Profile1 |\n| Converter todos os dispositivos de destino para Autopilot | Sim |\n| Tipo de dispositivo | PC Windows |\n| Modo de implantação | Autoimplantação (versão prévia) |\n| Ingressar no Azure AD como | Ingressado no Azure AD |\n| Idioma (região) | Padrão do sistema operacional |\n| Configurar o teclado automaticamente | Sim |\n| Termos de Licença de Software Microsoft / Configurações de privacidade / Opções de alteração de conta | Ocultar |\n| Tipo de conta de usuário | Padrão |\n| Permitir OOBE White Glove | Não |\n| Aplicar modelo de nome de dispositivo | Não |\n| Grupos incluídos | Group1 |\n| Grupos excluídos | — |\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "Se Device1 iniciar no modo de experiência inicial (OOBE), o dispositivo será implantado usando o Autopilot.",
      "Se Device2 iniciar no modo de experiência inicial (OOBE), o dispositivo será implantado usando o Autopilot.",
      "Se Device3 iniciar no modo de experiência inicial (OOBE), o dispositivo será implantado usando o Autopilot."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A conversão (\"Convert all targeted devices\") só registra no Autopilot dispositivos **gerenciados pelo Intune** que estejam no grupo atribuído. Device1 não está no Intune. Device2 só está no grupo de forma **aninhada** (Group2 dentro de Group1), e grupos aninhados não são considerados na atribuição do Autopilot — além de também não estar no Intune. Só o Device3 é convertido.",
    "details": "**Item a item**\n- **Device1:** Não. Não é gerenciado pelo Intune.\n- **Device2:** Não. Grupos aninhados não contam na atribuição do Autopilot (e ele também não está no Intune).\n- **Device3:** Sim. É gerenciado e membro direto do Group1.\n\n**Dica de prova:** Na prática, use grupos dinâmicos com (device.devicePhysicalIDs -any _ -contains \"[ZTDId]\") para alvos do Autopilot.",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q049",
    "src": 49,
    "domain": 2,
    "skill": "2.2",
    "topic": "Área de Trabalho Remota (GPO)",
    "type": "multi",
    "layout": "panel",
    "panelTitle": "Host da Sessão da Área de Trabalho Remota",
    "stem": "Sua rede contém um domínio do Active Directory. O domínio contém 1.000 computadores que executam o Windows 11.\n\nVocê precisa configurar a Área de Trabalho Remota em todos os computadores. A solução deve atender aos seguintes requisitos:\n\n- Impedir o compartilhamento do conteúdo da área de transferência.\n- Garantir que os usuários se autentiquem usando a Autenticação no Nível da Rede (NLA).\n\nQuais dois nós do Editor de Gerenciamento de Política de Grupo você deve usar? Para responder, selecione os nós apropriados na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "Conexões",
      "Redirecionamento de Dispositivo e Recurso",
      "Licenciamento",
      "Redirecionamento de Impressora",
      "Perfis",
      "Agente de Conexão de Área de Trabalho Remota",
      "Ambiente de Sessão Remota",
      "Segurança",
      "Limites de Tempo de Sessão",
      "Pastas temporárias"
    ],
    "answer": [
      1,
      7
    ],
    "shuffle": false,
    "scope": "borderline",
    "review": "ok",
    "explanation": "\"Do not allow Clipboard redirection\" fica em **Device and Resource Redirection**; \"Require user authentication for remote connections by using NLA\" fica em **Security**. Tema de GPO/RDP, borderline no escopo atual.",
    "details": "**Por que não as outras**\n- **Connections / Licensing / Profiles / Session Time Limits / Temporary folders / Connection Broker / Printer Redirection / Remote Session Environment:** não contêm as duas opções pedidas.\n\n**Dica de prova:** Caminho: Computer Configuration > Administrative Templates > Windows Components > Remote Desktop Services > Remote Desktop Session Host.",
    "docs": [
      {
        "t": "Enable Remote Desktop on your PC",
        "u": "https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/remotepc/remote-desktop-allow-access"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q050",
    "src": 50,
    "domain": 1,
    "skill": "2.1",
    "topic": "Atualização para o Windows 11",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos.\n\nOs dispositivos Windows ingressados no Azure AD se inscrevem automaticamente no Intune.\n\nVocê tem os dispositivos mostrados na tabela a seguir.\n\n| Nome | Sistema operacional | Ingressado no Azure AD | Aplicativos de linha de negócios (LOB) instalados |\n|---|---|---|---|\n| Device1 | Versão de 64 bits do Windows 10 Pro | Sim | Não |\n| Device2 | Versão de 32 bits do Windows 10 Pro | Não | Sim |\n| Device3 | Versão de 64 bits do Windows 10 Pro | Não | Sim |\n\nVocê está se preparando para atualizar os dispositivos para o Windows 11. Todos os dispositivos são compatíveis com o Windows 11.\n\nVocê precisa avaliar o Windows Autopilot e a atualização in-place como métodos de implantação do Windows 11 Pro nos dispositivos, mantendo todas as configurações e aplicativos dos usuários.\n\nQuais dispositivos podem ser atualizados usando cada método? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Windows Autopilot:",
        "options": [
          "Nenhum dos dispositivos",
          "Somente Device1",
          "Somente Device1 e Device3",
          "Device1, Device2 e Device3"
        ],
        "answer": 0
      },
      {
        "label": "Atualização in-place:",
        "options": [
          "Nenhum dos dispositivos",
          "Somente Device1",
          "Somente Device1 e Device3",
          "Device1, Device2 e Device3"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O Autopilot provisiona a partir do OOBE (ou com Autopilot Reset) e **não preserva apps e configurações** do usuário, então não atende. O in-place upgrade preserva tudo, mas o Windows 11 é **só 64 bits**: um Windows 10 de 32 bits (Device2) não pode ir para o Windows 11 por upgrade.",
    "details": "**Item a item**\n- **Autopilot:** não preserva apps e configurações (provisiona do zero ou reseta).\n- **Device2 no upgrade:** Windows 10 32 bits não tem caminho de upgrade para o Windows 11.\n\n**Dica de prova:** O Intune também faz o upgrade via Feature update policy (Windows 11), preservando os dados, desde que o hardware seja compatível.",
    "docs": [
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Requisitos do Windows 11",
        "u": "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements"
      },
      {
        "t": "Ativação de assinatura do Windows",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation"
      }
    ]
  },
  {
    "id": "Q052",
    "src": 52,
    "domain": 1,
    "skill": "2.1",
    "topic": "Página de Status de Inscrição",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos.\n\nVocê usa o Windows Autopilot para implantar o Windows 11 em dispositivos.\n\nUm engenheiro de suporte relata que, quando uma implantação falha, não consegue coletar os logs de implantação do dispositivo afetado.\n\nVocê precisa garantir que os logs possam ser coletados quando uma implantação falhar.\n\nO que você deve configurar?",
    "options": [
      "as configurações de inscrição automática",
      "o perfil de implantação do Windows Autopilot",
      "o perfil da página de status de inscrição (ESP)",
      "o perfil de configuração de dispositivos"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O perfil de **Enrollment Status Page** tem a opção \"Allow users to collect logs about installation errors\", que exibe o botão de coleta de logs quando a implantação falha.",
    "details": "**Por que não as outras**\n- **Automatic enrollment:** define o MDM, não a coleta de logs.\n- **Deployment profile:** OOBE e tipo de join.\n- **Device configuration profile:** não controla a ESP.\n\n**Dica de prova:** Na ESP, também dá para permitir \"Continue anyway\" ou \"Reset device\" em caso de erro.",
    "docs": [
      {
        "t": "Set up the Enrollment Status Page in the admin center copy - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/windows/setup-status-page"
      }
    ]
  },
  {
    "id": "Q053",
    "src": 53,
    "domain": 2,
    "skill": "2.3",
    "topic": "Remote Help",
    "type": "multi",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 que contém um usuário chamado User1 e usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos.\n\nVocê tem um dispositivo chamado Device1, inscrito no Intune.\n\nVocê precisa garantir que User1 possa usar o Remote Help no centro de administração do Intune para Device1.\n\nQuais três ações você deve executar? Cada resposta correta apresenta parte da solução.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "Implantar o aplicativo Remote Help em Device1.",
      "Atribuir a função Operador de Suporte Técnico a User1.",
      "Atribuir a função Administrador do Intune a User1.",
      "Atribuir uma licença do Microsoft 365 E5 a User1.",
      "Executar novamente a integração do dispositivo em Device1.",
      "Atribuir a licença de complemento do Remote Help a User1."
    ],
    "answer": [
      0,
      1,
      5
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O Remote Help exige o **app Remote Help** instalado no dispositivo, uma **função RBAC** com permissão de Remote Help (Help Desk Operator atende com menor privilégio) e a **licença do Remote Help** (add-on ou Intune Suite).",
    "details": "**Por que não as outras**\n- **Intune Administrator:** funciona, mas excede o menor privilégio.\n- **Licença M365 E5:** o E5 não inclui o Remote Help (é add-on ou Intune Suite).\n- **Rerun onboarding:** desnecessário.\n\n**Dica de prova:** O Remote Help precisa ser habilitado no tenant (Tenant administration > Remote Help > Settings).",
    "docs": [
      {
        "t": "Use Remote Help to Assist Users Authenticated by your Organization - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/remote-help/"
      },
      {
        "t": "Plan for Remote Help with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/remote-help/plan"
      }
    ]
  },
  {
    "id": "Q054",
    "src": 54,
    "domain": 1,
    "skill": "2.1",
    "topic": "Atualização para o Windows 11",
    "type": "single",
    "stem": "Você tem um dispositivo compatível com o Windows 11 chamado Device1, que executa a versão de 64 bits do Windows 10 Enterprise e tem o Microsoft Office 2019 instalado.\n\nVocê tem as imagens do Windows 11 Enterprise mostradas na tabela a seguir.\n\n| Nome | Plataforma | Descrição |\n|---|---|---|\n| Image1 | x64 | Imagem personalizada do Windows 11 com o Office 2021 instalado |\n| Image2 | x64 | Imagem padrão do Windows 11 criada pela Microsoft |\n\nQuais imagens podem ser usadas para executar uma atualização in-place de Device1?",
    "options": [
      "Somente Image1",
      "Somente Image2",
      "Image1 e Image2"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O in-place upgrade usa a **mídia original da Microsoft** (setup.exe com o install.wim padrão). Imagens customizadas, com apps já instalados, servem para wipe-and-load, não para upgrade.",
    "details": "**Por que não as outras**\n- **Image1 (customizada):** o upgrade in-place exige a mídia oficial; imagens com apps servem para wipe-and-load.\n\n**Dica de prova:** Comando: setup.exe /auto upgrade /quiet; com o Intune, use Feature update policy.",
    "docs": [
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Requisitos do Windows 11",
        "u": "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements"
      },
      {
        "t": "Ativação de assinatura do Windows",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation"
      }
    ]
  },
  {
    "id": "Q055",
    "src": 55,
    "domain": 1,
    "skill": "2.1",
    "topic": "Planejamento de implantação",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nSua rede contém um domínio do Active Directory Domain Services (AD DS) local, sincronizado com um tenant do Azure AD usando o Azure AD Connect.\n\nVocê usa o Microsoft Intune e o Configuration Manager para gerenciar dispositivos.\n\nVocê precisa recomendar um plano de implantação para novos dispositivos Windows 11. A solução deve atender aos seguintes requisitos:\n\n- Os dispositivos do departamento de marketing devem estar ingressados somente no domínio do AD DS. O departamento de TI instalará aplicativos complexos nos dispositivos durante a preparação, antes de entregá-los aos usuários do departamento de marketing.\n- Os dispositivos do departamento de vendas devem estar ingressados no Azure AD. Os dispositivos serão enviados diretamente pelo fabricante para a casa dos usuários do departamento de vendas.\n- O esforço administrativo deve ser minimizado.\n\nQual método de implantação você deve recomendar para cada departamento? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Vendas:",
        "options": [
          "Configuration Manager",
          "Windows Autopilot com registro automático",
          "Windows Autopilot com registro manual",
          "Windows Autopilot com registro pelo OEM"
        ],
        "answer": 3
      },
      {
        "label": "Marketing:",
        "options": [
          "Configuration Manager",
          "Windows Autopilot com registro automático",
          "Windows Autopilot com registro manual",
          "Windows Autopilot com registro pelo OEM"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Vendas: dispositivos enviados direto do fabricante → **Autopilot com registro pelo OEM** (o fabricante faz o upload dos hashes). Marketing: só domínio AD (sem Entra) e apps complexos na montagem → **Configuration Manager** (task sequence), que o ambiente já usa.",
    "details": "**Item a item**\n- **Autopilot com registro manual / automático para Vendas:** OEM é o menor esforço quando o dispositivo vem direto do fabricante.\n- **Autopilot para Marketing:** o requisito é só AD e apps complexos na montagem, o que o ConfigMgr faz melhor.\n\n**Dica de prova:** O revendedor/CSP também pode registrar os dispositivos (Partner Center).",
    "docs": [
      {
        "t": "Windows deployment scenarios and tools",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-deployment-scenarios-and-tools"
      },
      {
        "t": "Overview of Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/overview"
      },
      {
        "t": "Compare Windows Autopilot device preparation and Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/device-preparation/compare"
      }
    ]
  },
  {
    "id": "Q058",
    "src": 58,
    "domain": 1,
    "skill": "2.1",
    "topic": "Pacotes de provisionamento",
    "type": "single",
    "stem": "Sua empresa adota o Windows 10 Enterprise como padrão para todos os usuários.\n\nAlguns usuários compram seus próprios computadores em uma loja de varejo. Os computadores executam o Windows 10 Pro.\n\nVocê precisa recomendar uma solução para atualizar os computadores para o Windows 10 Enterprise, ingressá-los no Azure AD e instalar vários aplicativos da Microsoft Store. A solução deve atender aos seguintes requisitos:\n\n- Garantir que os aplicativos instalados pelos usuários sejam mantidos.\n- Minimizar a intervenção do usuário.\n\nQual é a melhor recomendação para atingir o objetivo? Mais de uma alternativa pode atingir o objetivo. Selecione a MELHOR resposta.",
    "options": [
      "Windows Autopilot",
      "Microsoft Deployment Toolkit (MDT)",
      "um pacote de provisionamento do Windows Configuration Designer",
      "Windows Deployment Services (WDS)"
    ],
    "answer": 2,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Um **provisioning package** (Windows Configuration Designer) aplica a mudança de edição, faz o Entra join e instala apps **sem reinstalar o Windows**, preservando os apps do usuário. Autopilot, MDT e WDS partem de reinstalação/reset.",
    "details": "**Por que não as outras**\n- **Autopilot / MDT / WDS:** reinstalam ou resetam o Windows e perdem os apps do usuário.\n\n**Dica de prova:** O provisioning package (.ppkg) pode ser aplicado por clique duplo, por USB no OOBE ou por Install-ProvisioningPackage.",
    "docs": [
      {
        "t": "Provisioning packages overview",
        "u": "https://learn.microsoft.com/en-us/windows/configuration/provisioning-packages/provisioning-packages"
      },
      {
        "t": "Overview of Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/overview"
      },
      {
        "t": "Compare Windows Autopilot device preparation and Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/device-preparation/compare"
      }
    ]
  },
  {
    "id": "Q059",
    "src": 59,
    "domain": 1,
    "skill": "1.3",
    "topic": "Windows Hello for Business",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "PIN6"
    },
    "stem": "Sua empresa tem um tenant do Azure AD chamado contoso.com que contém vários dispositivos Windows 10.\n\nQuando novos dispositivos Windows 10 ingressam em contoso.com, os usuários são solicitados a configurar um PIN de quatro dígitos.\n\nVocê precisa garantir que os usuários sejam solicitados a configurar um PIN de seis dígitos ao ingressarem os dispositivos Windows 10 em contoso.com.\n\n**Solução:** no centro de administração do Microsoft Entra, você modifica as Configurações de usuário e as Configurações de dispositivo.\n\nIsso atende ao objetivo?",
    "options": [
      "Sim",
      "Não"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "As configurações de usuário e de dispositivo do Entra não controlam a complexidade do PIN do Windows Hello for Business. Isso é feito no Intune (opções de inscrição do Windows Hello for Business ou política de Account protection).",
    "details": "**Série \"Solution\" (PIN de 6 dígitos no join):** atende **inscrição automática + opções de inscrição do Windows Hello for Business** no Intune. Configurações do Entra e device restrictions não atendem.\n\n**Dica de prova:** Alternativa: política de Account protection (Endpoint security) com o tamanho mínimo do PIN.",
    "docs": [
      {
        "t": "Configure a tenant-wide Windows Hello for Business policy with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/identity-protection/configure-tenant-wide-policy"
      },
      {
        "t": "Visão geral do Windows Hello for Business",
        "u": "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/"
      }
    ]
  },
  {
    "id": "Q060",
    "src": 60,
    "domain": 1,
    "skill": "1.3",
    "topic": "Windows Hello for Business",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "PIN6"
    },
    "stem": "Sua empresa tem um tenant do Azure AD chamado contoso.com que contém vários dispositivos Windows 10.\n\nQuando novos dispositivos Windows 10 ingressam em contoso.com, os usuários são solicitados a configurar um PIN de quatro dígitos.\n\nVocê precisa garantir que os usuários sejam solicitados a configurar um PIN de seis dígitos ao ingressarem os dispositivos Windows 10 em contoso.com.\n\n**Solução:** no centro de administração do Microsoft Entra, você configura a inscrição automática no gerenciamento de dispositivos móveis (MDM). No centro de administração do Microsoft Intune, você cria e atribui um perfil de restrições de dispositivo.\n\nIsso atende ao objetivo?",
    "options": [
      "Sim",
      "Não"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "A inscrição automática é necessária, mas o perfil de **device restrictions** não define o PIN do Windows Hello que é pedido durante o join. O PIN no provisionamento vem das opções de inscrição do Windows Hello for Business.",
    "details": "**Série \"Solution\":** device restrictions não controlam o PIN do Windows Hello no provisionamento.",
    "docs": [
      {
        "t": "Configure a tenant-wide Windows Hello for Business policy with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/identity-protection/configure-tenant-wide-policy"
      },
      {
        "t": "Visão geral do Windows Hello for Business",
        "u": "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/"
      }
    ]
  },
  {
    "id": "Q061",
    "src": 61,
    "domain": 1,
    "skill": "1.3",
    "topic": "Windows Hello for Business",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "PIN6"
    },
    "stem": "Sua empresa tem um tenant do Azure AD chamado contoso.com que contém vários dispositivos Windows 10.\n\nQuando novos dispositivos Windows 10 ingressam em contoso.com, os usuários são solicitados a configurar um PIN de quatro dígitos.\n\nVocê precisa garantir que os usuários sejam solicitados a configurar um PIN de seis dígitos ao ingressarem os dispositivos Windows 10 em contoso.com.\n\n**Solução:** no centro de administração do Microsoft Entra, você configura a inscrição automática no gerenciamento de dispositivos móveis (MDM). No centro de administração do Microsoft Intune, você configura as opções de inscrição do Windows Hello for Business.\n\nIsso atende ao objetivo?",
    "options": [
      "Sim",
      "Não"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Com a inscrição automática, o dispositivo entra no Intune no momento do join, e as **opções de inscrição do Windows Hello for Business** (Devices > Enrollment > Windows Hello for Business) definem o tamanho mínimo do PIN pedido durante o provisionamento.",
    "details": "**Série \"Solution\":** Devices > Windows > Enrollment > Windows Hello for Business → Minimum PIN length = 6. Vale para todos os novos provisionamentos.",
    "docs": [
      {
        "t": "Configure a tenant-wide Windows Hello for Business policy with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/identity-protection/configure-tenant-wide-policy"
      },
      {
        "t": "Visão geral do Windows Hello for Business",
        "u": "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/"
      }
    ]
  },
  {
    "id": "Q062",
    "src": 62,
    "domain": 2,
    "skill": "2.2",
    "topic": "Restrições de dispositivo (iOS)",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO"
    },
    "stem": "Você precisa atender aos requisitos técnicos dos dispositivos iOS.\n\nQual objeto você deve criar no Intune?",
    "options": [
      "um perfil de implantação",
      "uma política de proteção de aplicativos",
      "um perfil de configuração de dispositivos",
      "uma política de conformidade"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Bloquear o envio de diagnóstico/telemetria no iOS é uma configuração de **device restrictions**, ou seja, um **perfil de configuração**.",
    "details": "**Por que não as outras**\n- **Deployment profile:** é do Autopilot (Windows).\n- **App protection:** protege dados em apps.\n- **Compliance:** avalia o estado, não configura.",
    "docs": [
      {
        "t": "Apple device restriction settings in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-device-restrictions-apple"
      },
      {
        "t": "Device features and settings in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/overview"
      }
    ]
  },
  {
    "id": "Q063",
    "src": 63,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
    "type": "yesno",
    "group": {
      "kind": "case",
      "id": "CONTOSO"
    },
    "stem": "Você está avaliando quais dispositivos estão em conformidade.\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "Device1 está em conformidade.",
      "Device3 está em conformidade.",
      "Device4 está em conformidade."
    ],
    "answer": [
      false,
      true,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Device1 (Android, Group1) recebe Policy3, que exige criptografia, e está sem criptografia → não conforme. Device3 (Android, Group2/Group3) recebe Policy1 (Group3), que não exige criptografia → conforme. Device4 (iOS, Group2) recebe Policy2, que não exige nada aplicável → conforme.",
    "details": "**Item a item**\n- **Device1:** Não. A Policy3 exige criptografia, e ele não tem.\n- **Device3:** Sim. A Policy1 não exige criptografia.\n- **Device4:** Sim. A Policy2 não tem requisito violado.",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q064",
    "src": 64,
    "domain": 1,
    "skill": "2.1",
    "topic": "Windows Autopilot",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "CONTOSO"
    },
    "stem": "Você precisa preparar a implantação dos computadores do escritório de Phoenix.\n\nO que você deve fazer primeiro?",
    "options": [
      "Generalizar os computadores e definir as Configurações de dispositivo no centro de administração do Microsoft Entra.",
      "Extrair o número de série de cada computador para um arquivo XML e carregar o arquivo no centro de administração do Microsoft Intune.",
      "Extrair as informações de ID de hardware de cada computador para um arquivo CSV e carregar o arquivo no centro de administração do Microsoft Intune.",
      "Generalizar os computadores e definir as configurações de Mobilidade (MDM e MAM) no centro de administração do Microsoft Entra.",
      "Extrair as informações de número de série de cada computador para um arquivo CSV e carregar o arquivo no centro de administração do Microsoft Intune."
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Os computadores já comprados precisam ser **registrados no Autopilot**: extrair o **hardware hash** (hardware ID) para CSV e importar no Intune. Número de série sozinho não registra o dispositivo.",
    "details": "**Por que não as outras**\n- **Generalizar + Device/Mobility settings:** não registram o dispositivo no Autopilot.\n- **Serial em XML ou CSV:** o import exige o hardware hash (Device Serial Number, Windows Product ID, Hardware Hash).\n\n**Dica de prova:** Script: Install-Script Get-WindowsAutopilotInfo; Get-WindowsAutopilotInfo -OutputFile AutopilotHWID.csv (ou -Online).",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q065",
    "src": 65,
    "domain": 1,
    "skill": "1.2",
    "topic": "Restrições de inscrição",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO"
    },
    "stem": "Qual é o número máximo de dispositivos que User1 e User2 podem inscrever no Intune? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "User1 pode inscrever no máximo:",
        "options": [
          "5 dispositivos",
          "10 dispositivos",
          "15 dispositivos",
          "1.000 dispositivos",
          "Um número ilimitado de dispositivos"
        ],
        "answer": 1
      },
      {
        "label": "User2 pode inscrever no máximo:",
        "options": [
          "5 dispositivos",
          "10 dispositivos",
          "15 dispositivos",
          "1.000 dispositivos",
          "Um número ilimitado de dispositivos"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "User1 está em GroupA → Restriction2 = **10**. A função Intune Administrator não muda o limite. User2 é **device enrollment manager**, e um DEM pode inscrever até **1.000** dispositivos, ignorando as restrições de limite.",
    "details": "**Item a item**\n- **User1 com 5 / 15 / 1.000 / ilimitado:** vale o limite da restrição atribuída ao grupo dele (10); a função Intune Administrator não altera o limite.\n- **User2 com 10 ou ilimitado:** DEM tem limite fixo de 1.000.\n\n**Dica de prova:** Contas DEM não suportam Conditional Access baseado em dispositivo nem Autopilot user-driven.",
    "docs": [
      {
        "t": "Overview of enrollment restrictions - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/restrictions"
      },
      {
        "t": "Etapa 5 – Inscrever dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/enroll-devices"
      }
    ]
  },
  {
    "id": "Q066",
    "src": 66,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "CONTOSO"
    },
    "stem": "A quais dispositivos Policy1 e Policy2 se aplicam? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Policy1:",
        "options": [
          "Somente Device1",
          "Somente Device2",
          "Somente Device3",
          "Somente Device4",
          "Somente Device2 e Device3",
          "Somente Device1 e Device3",
          "Device1, Device2 e Device3"
        ],
        "answer": 2
      },
      {
        "label": "Policy2:",
        "options": [
          "Somente Device1",
          "Somente Device2",
          "Somente Device3",
          "Somente Device4",
          "Somente Device2 e Device3",
          "Somente Device1 e Device3",
          "Device1, Device2 e Device3"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Policy1 é de **Android** e inclui Group3: o único Android em Group3 é Device3 (Device2 está em Group3, mas é iOS). Policy2 é de **iOS**, inclui Group2 e exclui Group3: Device2 é excluído, sobra Device4.",
    "details": "**Item a item**\n- **Policy1 no Device2:** o Device2 é iOS, e a Policy1 é Android.\n- **Policy2 no Device2:** excluído (Group3).\n\n**Dica de prova:** A plataforma da política filtra antes dos grupos.",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q067",
    "src": 67,
    "domain": 2,
    "skill": "2.2",
    "topic": "Comunicação remota do PowerShell",
    "type": "single",
    "stem": "Sua rede contém um domínio do Active Directory chamado contoso.com. O domínio contém dois computadores chamados Computer1 e Computer2 que executam o Windows 10.\n\nEm Computer1, você precisa executar o cmdlet Invoke-Command para executar vários comandos do PowerShell em Computer2.\n\nO que você deve fazer primeiro?",
    "options": [
      "Em Computer2, executar o cmdlet Enable-PSRemoting.",
      "Em Computer2, adicionar Computer1 ao grupo Usuários de Gerenciamento Remoto.",
      "No Active Directory, definir a configuração Confiável para Delegação da conta de computador de Computer2.",
      "Em Computer1, executar o cmdlet New-PSSession."
    ],
    "answer": 0,
    "scope": "borderline",
    "review": "ok",
    "explanation": "No Windows client o PowerShell remoting vem desabilitado; é preciso rodar **Enable-PSRemoting** no computador de destino (Computer2) para configurar o WinRM e o listener.",
    "details": "**Por que não as outras**\n- **Remote Management Users:** dá permissão, mas sem o WinRM habilitado não há conexão.\n- **Trusted for Delegation:** trata de double-hop, não do básico.\n- **New-PSSession no Computer1:** falharia sem o remoting no destino.",
    "docs": [
      {
        "t": "Security considerations for PowerShell Remoting using WinRM - PowerShell",
        "u": "https://learn.microsoft.com/en-us/powershell/scripting/security/remoting/winrm-security"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q068",
    "src": 68,
    "domain": 1,
    "skill": "2.1",
    "topic": "Ativação de assinatura",
    "type": "single",
    "stem": "Você tem um tenant do Azure AD que contém os dispositivos mostrados na tabela a seguir.\n\n| Nome | Sistema operacional | Tipo de ingresso no Azure AD |\n|---|---|---|\n| Device1 | Windows 11 Pro | Ingressado |\n| Device2 | Windows 11 Pro | Registrado |\n| Device3 | Windows 10 Pro | Ingressado |\n| Device4 | Windows 10 Pro | Registrado |\n\nQuais dispositivos podem ser ativados usando a ativação de assinatura?",
    "options": [
      "Somente Device1",
      "Somente Device1 e Device2",
      "Somente Device1 e Device3",
      "Device1, Device2, Device3 e Device4"
    ],
    "answer": 2,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "A **subscription activation** (Pro → Enterprise pela licença do usuário) exige dispositivos **Entra joined** ou **hybrid joined**. Dispositivos apenas registrados não são elevados.",
    "details": "**Por que não as outras**\n- **Dispositivos só registrados:** a subscription activation exige dispositivo Entra joined ou hybrid joined.\n\n**Dica de prova:** Os requisitos de versão (Windows 10 1703+ / Windows 11) e a licença E3/E5 (ou A3/A5) no usuário também precisam ser atendidos.",
    "docs": [
      {
        "t": "Ativação de assinatura do Windows",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Requisitos do Windows 11",
        "u": "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements"
      }
    ]
  },
  {
    "id": "Q072",
    "src": 72,
    "domain": 2,
    "skill": "2.2",
    "topic": "WinRM",
    "type": "single",
    "stem": "Sua rede contém um domínio do Active Directory. O domínio contém um computador chamado Computer1 que executa o Windows 11.\n\nVocê precisa habilitar o serviço Windows Remote Management (WinRM) em Computer1 e definir as seguintes configurações:\n\n- Definir o Tipo de inicialização do serviço WinRM como Automático.\n- Criar um listener que aceite solicitações de qualquer endereço IP.\n- Habilitar uma exceção de firewall para comunicações WS-Management.\n\nQual cmdlet do PowerShell você deve usar?",
    "options": [
      "Connect-WSMan",
      "Enable-PSRemoting",
      "Invoke-WSManAction",
      "Enable-PSSessionConfiguration"
    ],
    "answer": 1,
    "scope": "borderline",
    "review": "ok",
    "explanation": "**Enable-PSRemoting** faz exatamente isso: inicia o WinRM com início automático, cria o listener HTTP em qualquer IP, abre a exceção de firewall e registra as configurações de sessão.",
    "details": "**Por que não as outras**\n- **Connect-WSMan:** conecta a um WinRM remoto; não configura o local.\n- **Invoke-WSManAction:** chama métodos de recursos WMI via WS-Man.\n- **Enable-PSSessionConfiguration:** só reabilita configurações de sessão; não cria o listener nem a exceção de firewall.\n\n**Dica de prova:** Em redes Public, use -SkipNetworkProfileCheck (a regra de firewall fica restrita à sub-rede local).",
    "docs": [
      {
        "t": "Installation and configuration for Windows Remote Management - Win32 apps",
        "u": "https://learn.microsoft.com/en-us/windows/win32/winrm/installation-and-configuration-for-windows-remote-management"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q073",
    "src": 73,
    "domain": 1,
    "skill": "2.1",
    "topic": "Ativação de assinatura",
    "type": "yesno",
    "stem": "Sua rede contém um domínio do Active Directory Domain Services (AD DS) local, sincronizado com um tenant do Azure AD. O tenant contém os usuários mostrados na tabela a seguir.\n\n| Nome | Membro de | Sincronização local |\n|---|---|---|\n| User1 | Group1 | Desabilitada |\n| User2 | Group2 | Habilitada |\n\nVocê atribui licenças do Windows 10/11 Enterprise E5 a Group1 e User2.\n\nVocê implanta os dispositivos mostrados na tabela a seguir.\n\n| Nome | Sistema operacional | Ingressado em |\n|---|---|---|\n| Device1 | Windows 11 Pro | Azure AD |\n| Device2 | Windows 11 Pro | AD DS |\n| Device3 | Windows 10 Pro | Azure AD |\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "Se User1 entrar em Device1, Device1 será atualizado automaticamente para o Windows 11 Enterprise.",
      "Se User2 entrar em Device2, Device2 será atualizado automaticamente para o Windows 11 Enterprise.",
      "Se User2 entrar em Device3, Device3 será atualizado automaticamente para o Windows 11 Enterprise."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A subscription activation eleva a **edição** (Pro → Enterprise), não a **versão**. Device1 é Entra joined e User1 tem licença → vira Windows 11 Enterprise. Device2 está só no AD DS (não é Entra/hybrid joined) → não ativa. Device3 é Windows 10 Pro → vira Windows **10** Enterprise, não 11. (No dump original a tabela repete \"Device2\" na terceira linha; aqui foi corrigido para Device3.)",
    "details": "**Item a item**\n- **Device1 com User1:** Sim. Entra joined + licença via Group1, e Pro → Enterprise acontece.\n- **Device2:** Não. Só AD DS; o dispositivo precisa ser Entra/hybrid joined.\n- **Device3:** Não vira Windows 11. A ativação muda só a edição (Windows 10 Enterprise), não a versão.",
    "docs": [
      {
        "t": "Ativação de assinatura do Windows",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Requisitos do Windows 11",
        "u": "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements"
      }
    ]
  },
  {
    "id": "Q075",
    "src": 75,
    "domain": 1,
    "skill": "2.1",
    "topic": "Requisitos do Windows 11",
    "type": "single",
    "stem": "Você tem um host Hyper-V que contém as máquinas virtuais mostradas na tabela a seguir.\n\n| Nome | Geração | Processadores virtuais | Memória |\n|---|---|---|---|\n| VM1 | 1 | 4 | 16 GB |\n| VM2 | 2 | 1 | 8 GB |\n| VM3 | 2 | 2 | 4 GB |\n\nEm quais máquinas virtuais você pode instalar o Windows 11?",
    "options": [
      "Somente VM1",
      "Somente VM3",
      "Somente VM1 e VM2",
      "Somente VM2 e VM3",
      "VM1, VM2 e VM3"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O Windows 11 exige UEFI/Secure Boot e TPM (só em VM de **geração 2**), pelo menos **2 processadores** e **4 GB** de RAM. VM1 é geração 1 e VM2 tem 1 vCPU; só a VM3 atende.",
    "details": "**Por que não as outras**\n- **VM1 (Geração 1):** sem UEFI/Secure Boot/vTPM.\n- **VM2 (1 vCPU):** o mínimo são 2 núcleos.\n\n**Dica de prova:** No Hyper-V, habilite também o TPM virtual (Security > Enable Trusted Platform Module) na VM de geração 2.",
    "docs": [
      {
        "t": "Requisitos do Windows 11",
        "u": "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Ativação de assinatura do Windows",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation"
      }
    ]
  },
  {
    "id": "Q076",
    "src": 76,
    "domain": 1,
    "skill": "2.1",
    "topic": "Windows Autopilot",
    "type": "yesno",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune e contém os usuários mostrados na tabela a seguir.\n\n| Nome | Membro de | Licença |\n|---|---|---|\n| User1 | Group1 | Nenhuma |\n| User2 | Group1 | Microsoft 365 E3 |\n| User3 | Group2 | Microsoft 365 E5 |\n\nGroup2 foi atribuído na Página de Status de Inscrição.\n\nVocê tem os dispositivos mostrados na tabela a seguir.\n\n| Nome | Sistema operacional | Departamento |\n|---|---|---|\n| Device1 | Windows 10 Pro | Marketing |\n| Device2 | Windows 10 Home | Pesquisa |\n| Device3 | Windows 10 | Marketing |\n\nVocê captura e carrega os IDs de hardware dos dispositivos do departamento de marketing.\n\nVocê configura o Windows Autopilot.\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "User1 pode concluir o processo do Autopilot em Device1.",
      "User2 pode concluir o processo do Autopilot em Device1.",
      "User3 pode visualizar as informações de configuração do dispositivo durante a fase de inscrição de Device1."
    ],
    "answer": [
      false,
      true,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Concluir o Autopilot (Entra join + inscrição automática) exige que o usuário tenha licença do **Intune/Entra Premium** — User1 não tem licença. User2 (M365 E3) consegue. User3 está no grupo atribuído à **Enrollment Status Page**, então vê o progresso da configuração.",
    "details": "**Item a item**\n- **User1 completa:** Não. Sem licença de Intune (e Entra P1 para a inscrição automática).\n- **User2 completa:** Sim. A licença M365 E3 inclui Intune e Entra P1.\n- **User3 vê o progresso:** Sim. Está no grupo atribuído à ESP.\n\n**Dica de prova:** A ESP é atribuída a grupos de usuários ou dispositivos; o perfil Autopilot é atribuído a grupos de dispositivos.",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q077",
    "src": 77,
    "domain": 1,
    "skill": "1.2",
    "topic": "Licenciamento",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém um usuário chamado User1. User1 tem uma licença do Windows 10/11 Enterprise E3 atribuída.\n\nVocê usa o Microsoft Intune Suite para gerenciar dispositivos.\n\nUser1 ativa os seguintes dispositivos:\n\n- Device1: Windows 11 Enterprise\n- Device2: Windows 10 Enterprise\n- Device3: Windows 11 Enterprise\n\nQuantos dispositivos adicionais User1 pode ativar?",
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
    "explanation": "A licença Windows Enterprise E3/E5 por usuário permite ativar em até **5 dispositivos**. Com 3 já ativados, restam **2**.",
    "details": "**Por que não as outras**\n- **3, 7 ou 8:** o limite é de 5 dispositivos por usuário licenciado.\n\n**Dica de prova:** A mesma regra vale para Microsoft 365 Apps (5 PCs/Macs + 5 tablets + 5 telefones).",
    "docs": [
      {
        "t": "Microsoft Intune Licensing Plans and Options - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/licensing"
      },
      {
        "t": "Overview of enrollment restrictions - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/restrictions"
      },
      {
        "t": "Etapa 5 – Inscrever dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/enroll-devices"
      }
    ]
  },
  {
    "id": "Q078",
    "src": 78,
    "domain": 1,
    "skill": "2.1",
    "topic": "Windows Autopilot",
    "type": "order",
    "stem": "Sua empresa tem um computador chamado Computer1 que executa o Windows 10.\n\nComputer1 era usado por um usuário que saiu da empresa.\n\nVocê planeja reutilizar Computer1 e atribuí-lo a um novo usuário.\n\nVocê precisa reimplantar Computer1 usando o Windows Autopilot.\n\nQuais três ações você deve executar em sequência? Para responder, mova as ações apropriadas da lista de ações para a área de resposta e organize-as na ordem correta.",
    "pool": [
      "Carregar o arquivo usando o Microsoft Intune.",
      "Gerar um arquivo CSV que contenha as informações do computador.",
      "Redefinir o computador.",
      "Gerar um arquivo JSON que contenha as informações do computador.",
      "Carregar o arquivo executando azcopy.exe."
    ],
    "answer": [
      1,
      0,
      2
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Extraia o hardware hash para um **CSV** (Get-WindowsAutopilotInfo), **importe no Intune** e então **resete** o computador para que ele passe pelo OOBE com o perfil Autopilot. JSON é o formato do perfil offline, não do registro de hardware.",
    "details": "**Sequência**\n- **JSON:** é o formato do perfil Autopilot offline (AutopilotConfigurationFile.json), não do registro de hardware.\n- **azcopy:** o upload do CSV é feito no Intune (Windows Autopilot devices > Import).\n\n**Dica de prova:** Depois do import, atribua o perfil (grupo) e aguarde o status \"Assigned\" antes do reset.",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q081",
    "src": 81,
    "domain": 4,
    "skill": "4.2",
    "topic": "Políticas de proteção de aplicativos",
    "type": "single",
    "stem": "Sua empresa implementa o Azure AD, o Microsoft 365, o Microsoft Intune e o Azure Information Protection.\n\nA política de segurança da empresa estabelece o seguinte:\n\n- Os dispositivos pessoais não precisam ser inscritos no Intune.\n- Os usuários devem se autenticar usando um PIN antes de acessar dados de email corporativo.\n- Os usuários podem usar seus dispositivos pessoais iOS e Android para acessar serviços de nuvem corporativos.\n- Os usuários devem ser impedidos de copiar dados de email corporativo para um serviço de armazenamento em nuvem diferente do Microsoft OneDrive for Business.\n\nVocê precisa configurar uma solução para impor a política de segurança.\n\nO que você deve criar?",
    "options": [
      "um perfil de configuração de dispositivos no centro de administração do Microsoft Intune",
      "uma política de prevenção contra perda de dados (DLP) no portal de conformidade do Microsoft Purview",
      "uma política de gerenciamento de riscos internos no portal de conformidade do Microsoft Purview",
      "uma política de proteção de aplicativos no centro de administração do Microsoft Intune"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Sem inscrição (MAM-WE), PIN para abrir o app e restrição de \"Save copies of org data\" só para OneDrive/SharePoint são exatamente o que a **app protection policy** faz.",
    "details": "**Por que não as outras**\n- **Device configuration profile:** exige dispositivo inscrito.\n- **DLP do Purview:** protege conteúdo sensível, mas não exige PIN no app nem restringe salvar em outra nuvem de forma nativa.\n- **Insider risk:** trata de comportamento de risco interno.",
    "docs": [
      {
        "t": "App Protection Policies Overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/overview"
      },
      {
        "t": "Create and Deploy App Protection Policies - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/create-policy"
      }
    ]
  },
  {
    "id": "Q082",
    "src": 82,
    "domain": 4,
    "skill": "4.2",
    "topic": "Políticas de configuração de aplicativos",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém 500 dispositivos Android Enterprise.\n\nTodos os dispositivos estão inscritos no Microsoft Intune.\n\nVocê precisa distribuir favoritos para o navegador Chrome nos dispositivos.\n\nO que você deve criar?",
    "options": [
      "uma política de conformidade",
      "um perfil de configuração",
      "uma política de proteção de aplicativos",
      "uma política de configuração de aplicativos"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Configurações específicas de um app (como favoritos do Chrome via managed configurations do Google Play) são entregues por **app configuration policy** para dispositivos gerenciados.",
    "details": "**Por que não as outras**\n- **Compliance:** avalia o estado.\n- **Configuration profile:** configura o sistema, não um app específico.\n- **App protection:** protege dados, não entrega favoritos.\n\n**Dica de prova:** No Android Enterprise, as \"managed configurations\" vêm do Managed Google Play; o Intune as entrega via app configuration policy.",
    "docs": [
      {
        "t": "App Configuration Policies for Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/overview"
      },
      {
        "t": "Add App Configuration Policies for Managed iOS/iPadOS Devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-ios"
      }
    ]
  },
  {
    "id": "Q083",
    "src": 83,
    "domain": 4,
    "skill": "4.1",
    "topic": "Office Deployment Tool",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 e 100 computadores que executam o Windows 10.\n\nVocê precisa implantar o Microsoft Office Professional Plus 2019 nos computadores usando o Microsoft Office Deployment Tool (ODT).\n\nO que você deve usar para criar um arquivo de personalização para o ODT?",
    "options": [
      "o centro de administração do Microsoft 365",
      "o centro de administração do Microsoft Intune",
      "o portal de conformidade do Microsoft Purview",
      "o centro de administração do Microsoft 365 Apps"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O XML do ODT é gerado pela **Office Customization Tool**, disponível no **Microsoft 365 Apps admin center** (config.office.com).",
    "details": "**Por que não as outras**\n- **M365 admin center / Intune / Purview:** não geram o XML do ODT.\n\n**Dica de prova:** A Office Customization Tool também exporta e importa configurações e permite escolher o canal, os idiomas e a remoção de versões MSI.",
    "docs": [
      {
        "t": "Overview of the Office Deployment Tool - Microsoft 365 Apps",
        "u": "https://learn.microsoft.com/en-us/microsoft-365-apps/deploy/overview-office-deployment-tool"
      },
      {
        "t": "Add Microsoft 365 Apps to Windows Devices Using Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-365-windows"
      }
    ]
  },
  {
    "id": "Q084",
    "src": 84,
    "domain": 4,
    "skill": "4.1",
    "topic": "Aplicativos Win32",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém 1.000 dispositivos Windows 11 inscritos no Microsoft Intune.\n\nVocê planeja usar o Intune para implantar um aplicativo chamado App1 que contém vários arquivos de instalação.\n\nO que você deve fazer primeiro?",
    "options": [
      "Preparar o conteúdo de App1 usando o Microsoft Win32 Content Prep Tool.",
      "Criar um pacote de aplicativo Android (APK).",
      "Carregar o conteúdo de App1 no Intune.",
      "Instalar o Microsoft Deployment Toolkit (MDT)."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Apps com vários arquivos de instalação são empacotados como **Win32** com o **Win32 Content Prep Tool**, que gera um único .intunewin com a pasta inteira.",
    "details": "**Por que não as outras**\n- **APK:** Android.\n- **Upload direto:** o Intune exige o .intunewin para Win32.\n- **MDT:** ferramenta de imagem.\n\n**Dica de prova:** Comando: IntuneWinAppUtil.exe -c <pasta> -s setup.exe -o <saída>.",
    "docs": [
      {
        "t": "Gerenciamento de aplicativos Win32 no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/win32"
      },
      {
        "t": "Adicionar um aplicativo de linha de negócios do Windows ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-lob-windows"
      },
      {
        "t": "Adicionar aplicativos da Microsoft Store ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store"
      }
    ]
  },
  {
    "id": "Q085",
    "src": 85,
    "domain": 4,
    "skill": "4.1",
    "topic": "Microsoft 365 Apps",
    "type": "yesno",
    "stem": "Você tem grupos que usam o tipo de associação Dispositivo Dinâmico, conforme a tabela a seguir.\n\n| Nome | Sintaxe |\n|---|---|\n| Group1 | `(device.deviceOwnership -eq \"Company\")` |\n| Group2 | `(device.deviceOwnership -eq \"Personal\")` |\n\nVocê está implantando aplicativos do Microsoft 365.\n\nVocê tem dispositivos inscritos no Microsoft Intune, conforme a tabela a seguir.\n\n| Nome | Propriedade | Plataforma |\n|---|---|---|\n| LT1 | Corporativo | Windows 10 Enterprise x64 |\n| LT2 | Pessoal | Windows 10 Enterprise x64 |\n| LT3 | Corporativo | MacOS Big Sur |\n\nNo centro de administração do Microsoft Intune, você cria um aplicativo do Microsoft 365 Apps conforme a imagem a seguir.\n\n### Tradução do texto da imagem\n\n**Informações do aplicativo**\n\n| Campo | Valor |\n|---|---|\n| Nome | Microsoft 365 Apps for Windows 10 |\n| Descrição | Microsoft 365 Apps for Windows 10 |\n| Publicador | Microsoft |\n| Categoria | Produtividade |\n| Exibir como aplicativo em destaque no Company Portal | Não |\n| URL de informações | https://products.office.com/en-us/explore-office-for-home |\n| URL de privacidade | https://privacy.microsoft.com/en-us/privacystatement |\n| Desenvolvedor | Microsoft |\n| Proprietário | Microsoft |\n| Observações | -- |\n| Logotipo | Office |\n\n**Configuração do pacote de aplicativos — Editar**\n\n| Configuração | Valor |\n|---|---|\n| Aplicativos a instalar como parte do pacote | Access, Excel, OneNote, Outlook, PowerPoint, Publisher, Skype for Business, Teams, Word |\n| Arquitetura | 64 bits |\n| Canal de atualização | Canal Atual |\n| Remover outras versões | Sim |\n| Versão a instalar | Mais recente |\n| Usar ativação de computador compartilhado | Não |\n| Aceitar os Termos de Licença de Software Microsoft em nome dos usuários | Não |\n| Instalar serviço em segundo plano para o Microsoft Search no Bing | Sim |\n| Aplicativos a instalar como parte do pacote (última linha da captura) | 1 idioma selecionado |\n\n**Atribuições — Editar**\n\nModo de grupo; Grupo. Obrigatório — Incluído: Group1. Disponível para dispositivos inscritos (seção recolhida).\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "LT1 terá aplicativos do Microsoft 365 instalados.",
      "LT2 terá aplicativos do Microsoft 365 instalados.",
      "LT3 terá aplicativos do Microsoft 365 instalados."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O app é **Microsoft 365 Apps for Windows 10** e está como Required para Group1 (dispositivos corporativos). LT1 é corporativo e Windows → instala. LT2 é pessoal → não está no grupo. LT3 é corporativo, mas é **macOS**, e o app atribuído é o de Windows.",
    "details": "**Item a item**\n- **LT1:** Sim. Corporativo, Windows, no grupo.\n- **LT2:** Não. Pessoal, fora do Group1.\n- **LT3:** Não. O app atribuído é o de Windows; macOS usa outro tipo de app (Microsoft 365 Apps for macOS).",
    "docs": [
      {
        "t": "Add Microsoft 365 Apps to Windows Devices Using Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-365-windows"
      }
    ],
    "exhibits": [
      {
        "src": "img/Q085-1.png",
        "alt": "Aplicativo Microsoft 365 Apps for Windows 10, 64 bits, Canal Atual, obrigatório para Group1"
      }
    ]
  },
  {
    "id": "Q086",
    "src": 86,
    "domain": 2,
    "skill": "3.2",
    "topic": "Windows Insider",
    "type": "multi",
    "stem": "Você tem uma assinatura do Microsoft 365. Todos os dispositivos executam o Windows 10.\n\nVocê precisa impedir que os usuários inscrevam os dispositivos no Windows Insider Program.\n\nQuais duas configurações você deve definir no centro de administração do Microsoft Intune? Cada resposta correta apresenta uma solução completa.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "um perfil de configuração de dispositivos de restrições de dispositivo",
      "uma política de configuração de aplicativos",
      "uma linha de base de segurança do Windows 10 e posteriores",
      "um perfil de configuração de dispositivos personalizado",
      "um anel de atualização do Windows 10 e posteriores"
    ],
    "answer": [
      3,
      4
    ],
    "shuffle": false,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "A política **System/AllowBuildPreview** pode ir num perfil **custom** (OMA-URI), e o **update ring** tinha a opção de pré-lançamento (Windows Insider) para bloquear. O dump marca D e E. Parte da comunidade aponta que o Device restrictions também já teve a opção \"Insider builds\", por isso a questão está como duvidosa.",
    "details": "**Por que não as outras**\n- **Device restrictions:** já teve \"Insider builds\", mas o gabarito usa custom e update ring.\n- **App configuration / security baseline:** não controlam o Insider.\n\n**Dica de prova:** Hoje use o Settings catalog: \"Allow Build Preview = Not allowed\".",
    "docs": [
      {
        "t": "Managing preview builds across your organization - Windows Insider Program",
        "u": "https://learn.microsoft.com/en-us/windows-insider/business/manage-builds"
      },
      {
        "t": "Gerenciar políticas de anéis de atualização do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-update-rings"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Gerenciar atualizações de qualidade do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-quality-updates"
      }
    ]
  },
  {
    "id": "Q087",
    "src": 87,
    "domain": 5,
    "skill": "5.2",
    "topic": "Análise de endpoint",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 que contém 100 dispositivos Windows 10 inscritos no Microsoft Intune.\n\nVocê planeja usar a Análise de endpoint.\n\nVocê precisa criar métricas de linha de base.\n\nO que você deve fazer primeiro?",
    "options": [
      "Modificar o Limite de regressão da linha de base.",
      "Integrar 10 dispositivos à Análise de endpoint.",
      "Criar um workspace do Log Analytics.",
      "Criar uma pasta de trabalho do Azure Monitor."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O Endpoint analytics só calcula scores e baselines depois que há dados de pelo menos **10 dispositivos** integrados.",
    "details": "**Por que não as outras**\n- **Baseline regression threshold:** só ajusta o alerta de regressão.\n- **Log Analytics / workbook:** o Endpoint analytics não depende deles.\n\n**Dica de prova:** O baseline padrão é \"All organizations (median)\"; você pode criar baselines próprias depois de ter dados.",
    "docs": [
      {
        "t": "Endpoint analytics overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/endpoint-analytics/"
      },
      {
        "t": "Use Remediations to Detect and Fix Support Issues - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations"
      }
    ]
  },
  {
    "id": "Q088",
    "src": 88,
    "domain": 2,
    "skill": "3.2",
    "topic": "Atualizações do Windows",
    "type": "single",
    "stem": "Você instala uma atualização de recursos em um computador que executa o Windows 10.\n\nDe quantos dias você dispõe para reverter a atualização?",
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
    "explanation": "Por padrão o Windows mantém a versão anterior por **10 dias** (é possível estender até 60 com DISM ou com a configuração de uninstall period do update ring).",
    "details": "**Por que não as outras**\n- **5 / 14 / 30:** o padrão é 10 dias (ajustável de 2 a 60 com DISM /Set-OSUninstallWindow ou com a política do update ring).",
    "docs": [
      {
        "t": "Gerenciar políticas de anéis de atualização do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-update-rings"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Gerenciar atualizações de qualidade do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-quality-updates"
      }
    ]
  },
  {
    "id": "Q089",
    "src": 89,
    "domain": 5,
    "skill": "5.2",
    "topic": "Azure Monitor",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft Azure que contém um workspace do Azure Log Analytics.\n\nVocê implanta um novo computador chamado Computer1 que executa o Windows 10. Computer1 está em um grupo de trabalho.\n\nVocê precisa garantir que possa usar o Log Analytics para consultar eventos de Computer1.\n\nO que você deve fazer em Computer1?",
    "options": [
      "Ingressar no Azure AD.",
      "Configurar o Windows Defender Firewall.",
      "Criar uma assinatura de eventos.",
      "Instalar o Azure Monitor Agent."
    ],
    "answer": 0,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O **Azure Monitor Agent** para Windows client (instalador para Windows 10/11) exige que o dispositivo esteja **Entra joined**; por isso o primeiro passo é o join. O gabarito do dump é A, mas muitos marcam D (instalar o agente), já que o agente também é necessário. Confira a discussão antes de confiar nesta.",
    "details": "**Por que não as outras**\n- **Firewall / event subscription:** não fazem o computador mandar dados ao workspace.\n- **Instalar o AMA primeiro:** o instalador do AMA para Windows client exige o dispositivo Entra joined (o gabarito escolhe o join).\n\n**Dica de prova:** Com o Azure Arc, servidores fora do Azure também recebem o AMA; para clientes Windows, use o instalador MSI + monitored object.",
    "docs": [
      {
        "t": "Encaminhar logs para o Azure Monitor usando o Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/governance/integrate-azure-monitor"
      },
      {
        "t": "Relatórios do Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/overview"
      },
      {
        "t": "Usar APIs do Graph para exportar relatórios do Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/export-graph-apis"
      }
    ]
  },
  {
    "id": "Q090",
    "src": 90,
    "domain": 2,
    "skill": "3.2",
    "topic": "Atualizações do iOS",
    "type": "multi",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 e 100 dispositivos iPad não gerenciados.\n\nVocê precisa implantar uma atualização específica do iOS nos dispositivos. Os usuários devem ser impedidos de instalar manualmente uma versão mais recente do iOS.\n\nQuais duas ações você deve executar? Cada resposta correta apresenta parte da solução.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "Criar um perfil de configuração de dispositivos.",
      "Inscrever os dispositivos no Microsoft Intune usando o Intune Company Portal.",
      "Criar uma política de conformidade.",
      "Criar um perfil de provisionamento de aplicativos iOS.",
      "Inscrever os dispositivos no Microsoft Intune usando o Apple Business Manager."
    ],
    "answer": [
      0,
      4
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Controlar a versão do iOS exige dispositivos **supervisionados**, o que vem da inscrição via **Apple Business Manager (ADE)**. A política de atualização / restrição de atualização é então entregue por perfil.",
    "details": "**Por que não as outras**\n- **Company Portal:** inscrição sem supervisão; não permite controlar atualizações do iOS.\n- **Compliance:** só marca a versão mínima.\n- **App provisioning profile:** é para apps LOB.\n\n**Dica de prova:** Hoje as atualizações de iOS são gerenciadas por DDM (declarative device management) no Settings catalog.",
    "docs": [
      {
        "t": "Use Microsoft Intune to manage software updates for supervised iOS/iPadOS devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios"
      },
      {
        "t": "Configure Update Policies for Apple Devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/apple/"
      }
    ]
  },
  {
    "id": "Q091",
    "src": 91,
    "domain": 2,
    "skill": "3.2",
    "topic": "Anéis de atualização do Windows",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que inclui o Microsoft Intune.\n\nVocê tem um anel de atualização chamado UpdateRing1 com as seguintes configurações:\n\n- Comportamento de atualização automática: Instalar e reiniciar automaticamente em um horário agendado\n- Frequência do comportamento automático: Primeira semana do mês\n- Dia de instalação agendada: Terça-feira\n- Horário de instalação agendada: 3h\n\nNo centro de administração do Microsoft Intune, você seleciona Desinstalar para as atualizações de recursos de UpdateRing1.\n\nQuando os dispositivos começarão a remover as atualizações de recursos?",
    "options": [
      "quando um usuário aprovar a desinstalação",
      "assim que a política for recebida",
      "na próxima terça-feira",
      "na primeira terça-feira do próximo mês"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O Uninstall do update ring é aplicado **assim que o dispositivo recebe a política**; não espera a janela de instalação agendada.",
    "details": "**Por que não as outras**\n- **Aprovação do usuário / próxima terça / próximo mês:** o rollback é imediato ao receber a política.\n\n**Dica de prova:** Só funciona dentro do período de uninstall (padrão de 10 dias).",
    "docs": [
      {
        "t": "Gerenciar políticas de anéis de atualização do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-update-rings"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Gerenciar atualizações de qualidade do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-quality-updates"
      }
    ]
  },
  {
    "id": "Q092",
    "src": 92,
    "domain": 2,
    "skill": "2.2",
    "topic": "Coexistência com a Política de Grupo",
    "type": "single",
    "stem": "Você tem uma implantação híbrida do Azure AD que contém 50 dispositivos Windows 10. Todos os dispositivos estão inscritos no Microsoft Intune.\n\nVocê descobre que as configurações de Política de Grupo se sobrepõem às configurações definidas nas políticas do Microsoft Intune.\n\nVocê precisa garantir que as configurações definidas no Microsoft Intune tenham precedência sobre as configurações de Política de Grupo.\n\nO que você deve fazer?",
    "options": [
      "No Editor de Gerenciamento de Política de Grupo, definir as configurações de Configuração do Computador na Default Domain Policy.",
      "No centro de administração do Microsoft Intune, criar um perfil de dispositivo personalizado.",
      "No centro de administração do Microsoft Intune, criar um perfil de dispositivo de Modelos Administrativos.",
      "No Editor de Gerenciamento de Política de Grupo, definir as configurações de Configuração do Usuário na Default Domain Policy."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "A configuração **ControlPolicyConflict/MDMWinsOverGP** é entregue por OMA-URI num **perfil custom** (hoje também existe no Settings catalog). Entre as opções, custom é a correta.",
    "details": "**Por que não as outras**\n- **GPO na Default Domain Policy:** não dá prioridade ao MDM.\n- **Administrative Templates no Intune:** continuariam perdendo para a GPO.\n\n**Dica de prova:** A configuração MDMWinsOverGP não se aplica a todos os CSPs; Administrative Templates (ADMX) não são afetados.",
    "docs": [
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      }
    ]
  },
  {
    "id": "Q093",
    "src": 93,
    "domain": 5,
    "skill": "5.2",
    "topic": "Análise de endpoint",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos.\n\nVocê precisa garantir que o desempenho de inicialização dos dispositivos Windows 11 gerenciados seja capturado e disponibilizado para análise no centro de administração do Intune.\n\nO que você deve configurar?",
    "options": [
      "o Azure Monitor Agent",
      "uma política de conformidade de dispositivos",
      "uma política de Acesso Condicional",
      "uma política de coleta de dados do Intune"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "A coleta de dados do Endpoint analytics para dispositivos gerenciados pelo Intune é ligada pela **Intune data collection policy** (\"Windows health monitoring\").",
    "details": "**Por que não as outras**\n- **Azure Monitor agent:** não alimenta o Endpoint analytics.\n- **Compliance / CA:** não coletam dados de desempenho.\n\n**Dica de prova:** Em Endpoint analytics > Settings, a política \"Intune data collection\" é atribuída a todos ou a grupos.",
    "docs": [
      {
        "t": "Endpoint analytics overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/endpoint-analytics/"
      },
      {
        "t": "Use Remediations to Detect and Fix Support Issues - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations"
      }
    ]
  },
  {
    "id": "Q094",
    "src": 94,
    "domain": 2,
    "skill": "3.2",
    "topic": "Atualizações do iOS",
    "type": "yesno",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 que usa o Microsoft Intune.\n\nOs dispositivos estão inscritos no Intune conforme a tabela a seguir.\n\n| Nome | Plataforma | Inscrito usando |\n|---|---|---|\n| Device1 | iOS | Inscrição Automatizada de Dispositivos da Apple (ADE) |\n| Device2 | iPadOS | Inscrição Automatizada de Dispositivos da Apple (ADE) |\n| Device3 | iPadOS | O aplicativo Company Portal |\n\nOs dispositivos são membros dos grupos mostrados na tabela a seguir.\n\n| Nome | Membros |\n|---|---|\n| Group1 | Device1, Device2, Device3 |\n| Group2 | Device2 |\n\nVocê cria um perfil de atualização do iOS/iPadOS conforme a imagem a seguir.\n\n### Tradução do texto da imagem\n\n**Criar perfil — iOS/iPadOS**\n\nEtapas: Informações básicas; Definições de configuração; Marcas de escopo; Atribuições; Revisar + criar. Resumo.\n\n**Informações básicas:** Nome: Profile1; Descrição: ..\n\n**Configurações da política de atualização**\n\n- Atualização a instalar: Instalar a atualização mais recente do iOS/iPadOS.\n- Tipo de agendamento: Atualizar fora do horário agendado.\n- Fuso horário: UTC ±00.\n\n| Janela de tempo — Dia de início | Hora de início | Dia de término | Hora de término |\n|---|---|---|---|\n| Segunda-feira | 1h | Quarta-feira | 13h |\n| Sexta-feira | 1h | Sábado | 23h |\n\n**Atribuições**\n\n| Grupos incluídos — Grupo | Membros do grupo |\n|---|---|\n| Group1 | 3 dispositivos, 0 usuários |\n\n| Grupos excluídos — Grupo | Membros do grupo |\n|---|---|\n| Group2 | 1 dispositivo, 0 usuários |\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "Se uma atualização do iOS ficar disponível na terça-feira às 5h, ela será instalada automaticamente em Device1 na quarta-feira.",
      "Se uma atualização do iPadOS ficar disponível na quinta-feira às 2h, ela será instalada automaticamente em Device2 na quinta-feira.",
      "Se uma atualização do iPadOS ficar disponível na sexta-feira às 22h, ela será instalada automaticamente em Device3 no domingo."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Com **Update outside of scheduled time**, as janelas listadas são os períodos em que a atualização **não** é instalada. Device1: a atualização sai na terça às 5h, dentro do bloqueio (seg 1h–qua 13h), e é instalada depois das 13h de quarta. Device2 está em Group2, que é **excluído**. Device3 foi inscrito pelo Company Portal, **não é supervisionado**, e políticas de atualização de iOS só valem para dispositivos supervisionados (ADE).",
    "details": "**Item a item**\n- **Device1 na quarta:** Sim. Liberado depois do fim da janela de bloqueio (qua 13h).\n- **Device2:** Não. Grupo excluído.\n- **Device3:** Não. Sem supervisão, a política de atualização não se aplica.",
    "docs": [
      {
        "t": "Use Microsoft Intune to manage software updates for supervised iOS/iPadOS devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios"
      },
      {
        "t": "Configure Update Policies for Apple Devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/apple/"
      }
    ],
    "exhibits": [
      {
        "src": "img/Q094-1.png",
        "alt": "Perfil de atualização iOS: atualização mais recente, fora do horário agendado, janelas de segunda 1h a quarta 13h e de sexta 1h a sábado 23h, inclui Group1 e exclui Group2"
      }
    ]
  },
  {
    "id": "Q095",
    "src": 95,
    "domain": 2,
    "skill": "2.2",
    "topic": "Conjuntos de políticas",
    "type": "single",
    "stem": "Você tem uma implantação do Microsoft Intune que contém os recursos mostrados na tabela a seguir.\n\n| Nome | Tipo | Plataforma |\n|---|---|---|\n| Comply1 | Política de conformidade de dispositivos | Windows 10 e posteriores |\n| Comply2 | Política de conformidade de dispositivos | iOS/iPadOS |\n| CA1 | Política de Acesso Condicional | Não se aplica |\n| Conf1 | Perfil de configuração de dispositivos | Windows 10 e posteriores |\n| Office1 | Política de aplicativos do Office | Não se aplica |\n\nVocê cria um conjunto de políticas chamado Set1 e adiciona Comply1 a Set1.\n\nQuais recursos adicionais você pode adicionar a Set1?",
    "options": [
      "Somente Conf1",
      "Somente Comply2",
      "Somente Comply2 e Conf1",
      "Somente CA1, Conf1 e Office1",
      "Comply2, CA1, Conf1 e Office1"
    ],
    "answer": 2,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Policy sets aceitam apps, políticas de app, perfis de configuração, políticas de conformidade e perfis de inscrição, de **qualquer plataforma** no mesmo set. Políticas de Conditional Access e Office app policies não entram.",
    "details": "**Por que não as outras**\n- **CA1:** políticas de Conditional Access não entram em policy sets.\n- **Office1:** políticas de nuvem do Office ficam fora.\n- **Só uma plataforma:** o set aceita várias plataformas.",
    "docs": [
      {
        "t": "Policy Sets - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/policy-sets"
      },
      {
        "t": "Create assignment filters in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/filters/overview"
      },
      {
        "t": "Assignment Filter Performance Tips for Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/filters/performance-recommendations"
      }
    ]
  },
  {
    "id": "Q096",
    "src": 96,
    "domain": 3,
    "skill": "3.1",
    "topic": "Defender for Endpoint",
    "type": "single",
    "stem": "Você usa o Microsoft Defender for Endpoint para proteger computadores que executam o Windows 10.\n\nVocê precisa avaliar as diferenças entre a configuração do Microsoft Defender for Endpoint e a linha de base de configuração recomendada pela Microsoft.\n\nQual ferramenta você deve usar?",
    "options": [
      "Aplicativo Power BI do Microsoft Defender for Endpoint",
      "Microsoft Secure Score",
      "Análise de endpoint",
      "Portal do Microsoft 365 Defender"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O **Microsoft Secure Score** (Secure Score for Devices) compara a configuração atual com as recomendações da Microsoft e lista as ações de melhoria.",
    "details": "**Por que não as outras**\n- **Power BI app:** relatórios, não comparação com baseline.\n- **Endpoint Analytics:** experiência e desempenho.\n- **M365 Defender portal:** é o portal; a ferramenta é o Secure Score (dentro dele).\n\n**Dica de prova:** O Microsoft Defender Vulnerability Management também tem avaliação de security baselines.",
    "docs": [
      {
        "t": "Integrate Microsoft Defender for Endpoint with Intune for Device Compliance - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/microsoft-defender/overview"
      },
      {
        "t": "Deploy endpoint detection and response policy with Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/deploy-edr"
      }
    ]
  },
  {
    "id": "Q097",
    "src": 97,
    "domain": 3,
    "skill": "3.1",
    "topic": "Defender for Endpoint",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 que contém 1.000 dispositivos Windows 11. Todos os dispositivos estão inscritos no Microsoft Intune.\n\nVocê planeja integrar o Intune ao Microsoft Defender for Endpoint.\n\nVocê precisa estabelecer uma conexão entre os serviços do Intune e do Defender for Endpoint.\n\nQuais configurações você deve definir no centro de administração do Microsoft Intune?",
    "options": [
      "Complementos premium",
      "Conectores e tokens",
      "Inscrição do tenant",
      "Microsoft Tunnel Gateway"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "A conexão Intune ↔ Defender for Endpoint fica em **Tenant administration > Connectors and tokens > Microsoft Defender for Endpoint** (também acessível por Endpoint security).",
    "details": "**Por que não as outras**\n- **Premium add-ons:** licenças do Intune Suite.\n- **Tenant enrollment:** inscrição.\n- **Tunnel Gateway:** VPN.\n\n**Dica de prova:** A conexão precisa ser ligada também no portal do Defender (Settings > Endpoints > Advanced features > Microsoft Intune connection).",
    "docs": [
      {
        "t": "Integrate Microsoft Defender for Endpoint with Intune for Device Compliance - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/microsoft-defender/overview"
      },
      {
        "t": "Deploy endpoint detection and response policy with Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/deploy-edr"
      }
    ]
  },
  {
    "id": "Q098",
    "src": 98,
    "domain": 2,
    "skill": "2.3",
    "topic": "Certificados",
    "type": "order",
    "stem": "Você tem uma assinatura do Microsoft Intune configurada para usar um conector de certificado PFX com uma autoridade de certificação (CA) corporativa local.\n\nVocê precisa usar o Intune para configurar a inscrição automática de dispositivos Android usando certificados de par de chaves públicas (PKCS).\n\nQuais três ações você deve executar em sequência? Para responder, mova as ações apropriadas da lista de ações para a área de resposta e organize-as na ordem correta.",
    "pool": [
      "No centro de administração do Microsoft Intune, configurar as restrições de inscrição.",
      "Na CA corporativa, configurar os gerenciadores de certificados.",
      "Obter o certificado raiz.",
      "No centro de administração do Microsoft Intune, criar um perfil de configuração de certificado confiável.",
      "No centro de administração do Microsoft Intune, criar um perfil de configuração de certificado PKCS."
    ],
    "answer": [
      2,
      3,
      4
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Com o conector já instalado: exporte o **certificado raiz** da CA → crie o perfil de **trusted certificate** para distribuí-lo → crie o perfil **PKCS**, que referencia o perfil de certificado confiável.",
    "details": "**Sequência**\n- **Enrollment restrictions:** sem relação.\n- **Certificate managers na CA:** controla a aprovação de certificados, não é exigido.\n\n**Dica de prova:** O template de certificado na CA precisa permitir a exportação da chave privada para o PKCS, e o conector precisa de permissão no template.",
    "docs": [
      {
        "t": "Types of certificate that are supported by Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/certificates/overview"
      },
      {
        "t": "Microsoft Cloud PKI for Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/cloud-pki/"
      },
      {
        "t": "Configure Microsoft Cloud PKI root and issuing CA for Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/cloud-pki/configure-ca"
      }
    ]
  },
  {
    "id": "Q099",
    "src": 99,
    "domain": 1,
    "skill": "1.1",
    "topic": "Grupos dinâmicos",
    "type": "single",
    "stem": "Sua empresa usa o Microsoft Intune.\n\nMais de 500 dispositivos Android e iOS estão inscritos no tenant do Intune.\n\nVocê planeja implantar novas políticas do Intune. Políticas diferentes serão aplicadas de acordo com a versão do Android ou do iOS instalada no dispositivo.\n\nVocê precisa garantir que as políticas possam ser direcionadas aos dispositivos com base na versão do Android ou do iOS.\n\nO que você deve configurar primeiro?",
    "options": [
      "grupos com regras de associação dinâmica no Azure AD",
      "Categorias de dispositivo no Intune",
      "Identificadores de dispositivo corporativo no Intune",
      "Configurações de dispositivo no Azure AD"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Grupos dinâmicos de dispositivos aceitam regras com **device.deviceOSVersion** e **device.deviceOSType**, o que permite direcionar políticas por versão do sistema.",
    "details": "**Por que não as outras**\n- **Device categories:** escolhidas pelo usuário na inscrição; não refletem a versão.\n- **Corporate identifiers:** marcam ownership.\n- **Device settings do Entra:** limites de join/registro.\n\n**Dica de prova:** Hoje, assignment filters (osVersion) evitam criar muitos grupos dinâmicos.",
    "docs": [
      {
        "t": "Gerenciar regras de grupos de associação dinâmica no Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership"
      },
      {
        "t": "Add groups to organize users and devices for Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/tenant-administration/add-groups"
      }
    ]
  },
  {
    "id": "Q100",
    "src": 100,
    "domain": 3,
    "skill": "3.1",
    "topic": "Proteção contra explorações",
    "type": "match",
    "stem": "Você tem 500 dispositivos Windows 10 inscritos no Microsoft Intune.\n\nVocê planeja usar a Proteção contra explorações no Microsoft Intune para habilitar as seguintes configurações do sistema nos dispositivos:\n\n- Prevenção de Execução de Dados (DEP)\n- Forçar aleatoriedade para imagens (ASLR obrigatório)\n\nVocê precisa configurar um dispositivo Windows 10 que será usado para criar um arquivo de modelo.\n\nQuais áreas de proteção do dispositivo você deve configurar no aplicativo Segurança do Windows antes de criar o arquivo de modelo? Para responder, arraste as áreas de proteção apropriadas para as configurações correspondentes. Cada área de proteção pode ser usada uma vez, mais de uma vez ou nenhuma vez.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "pool": [
      "Proteção de conta",
      "Controle de aplicativos e do navegador",
      "Segurança do dispositivo",
      "Proteção contra vírus e ameaças"
    ],
    "targets": [
      {
        "label": "DEP:",
        "answer": 1
      },
      {
        "label": "ASLR obrigatório:",
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "As configurações de **Exploit protection** (DEP, ASLR etc.) ficam em **App & browser control > Exploit protection settings**. O XML exportado de lá é o que vai para o Intune.",
    "details": "**Por que App & browser control:** Exploit protection fica lá (System settings e Program settings). Exporte com Get-ProcessMitigation -RegistryConfigFilePath ou pelo botão de exportar, e importe o XML no Intune (ASR/Exploit protection).",
    "docs": [
      {
        "t": "Apply mitigations to help prevent attacks through vulnerabilities - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/exploit-protection"
      },
      {
        "t": "Manage attack surface reduction settings with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/attack-surface-reduction"
      },
      {
        "t": "ASR rules reference - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"
      }
    ]
  },
  {
    "id": "Q101",
    "src": 101,
    "domain": 1,
    "skill": "1.1",
    "topic": "Ingresso no Microsoft Entra",
    "type": "single",
    "stem": "Você tem um tenant do Azure AD chamado contoso.com.\n\nVocê tem um computador em grupo de trabalho chamado Computer1 que executa o Windows 11.\n\nVocê precisa adicionar Computer1 a contoso.com.\n\nO que você deve usar?",
    "options": [
      "dsregcmd.exe",
      "Gerenciamento do Computador",
      "netdom.exe",
      "o aplicativo Configurações"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O Entra join de um computador já instalado é feito em **Settings > Accounts > Access work or school > Connect > Join this device to Microsoft Entra ID**. dsregcmd serve para diagnóstico/hybrid, e netdom é para AD DS.",
    "details": "**Por que não as outras**\n- **dsregcmd:** diagnóstico (dsregcmd /status) e operações de hybrid join; não faz o join interativo de workgroup.\n- **Computer Management / netdom:** AD DS.\n\n**Dica de prova:** O join também pode ser feito no OOBE (Autopilot ou manual).",
    "docs": [
      {
        "t": "Plan your Microsoft Entra join deployment - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/device-join-plan"
      },
      {
        "t": "Join Windows 11 Devices to Microsoft Entra ID During OOBE - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/device-join-out-of-box"
      }
    ]
  },
  {
    "id": "Q102",
    "src": 102,
    "domain": 3,
    "skill": "1.3",
    "topic": "Autenticação sem senha",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos Windows 11.\n\nVocê precisa implementar a autenticação sem senha que exija que os usuários usem a correspondência de números.\n\nQual método de autenticação você deve usar?",
    "options": [
      "Microsoft Authenticator",
      "chamadas de voz",
      "chaves de segurança FIDO2",
      "mensagens de texto"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "**Number matching** é um recurso das notificações push do **Microsoft Authenticator**, inclusive no sign-in passwordless pelo telefone.",
    "details": "**Por que não as outras**\n- **Voz / SMS:** não usam number matching e não são passwordless.\n- **FIDO2:** passwordless, mas usa PIN/biometria na chave, não number matching.",
    "docs": [
      {
        "t": "Passkeys (FIDO2) authentication method in Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2"
      },
      {
        "t": "Configure a tenant-wide Windows Hello for Business policy with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/identity-protection/configure-tenant-wide-policy"
      },
      {
        "t": "Visão geral do Windows Hello for Business",
        "u": "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/"
      }
    ]
  },
  {
    "id": "Q103",
    "src": 103,
    "domain": 1,
    "skill": "1.3",
    "topic": "Configurações de política de conformidade",
    "type": "single",
    "stem": "Você usa uma assinatura do Microsoft Intune para gerenciar dispositivos iOS.\n\nVocê configura uma política de conformidade de dispositivos que bloqueia dispositivos iOS com jailbreak.\n\nVocê precisa habilitar a Detecção aprimorada de jailbreak.\n\nO que você deve configurar?",
    "options": [
      "as Configurações de política de conformidade",
      "a política de conformidade de dispositivos",
      "um local de rede",
      "um perfil de configuração"
    ],
    "answer": 0,
    "answer_original": 1,
    "scope": "in",
    "review": "corrigida",
    "explanation": "**Enhanced jailbreak detection** é uma configuração de tenant que fica em **Compliance policy settings** (Endpoint security > Device compliance > Compliance policy settings), junto de \"Mark devices with no compliance policy assigned as\" e do período de validade. A política de conformidade só tem o \"Jailbroken devices: Block\". O dump marcava a política.",
    "details": "**Por que não as outras**\n- **Device compliance policy:** tem só o \"Jailbroken devices: Block\".\n- **Network location / configuration profile:** não ativam a detecção avançada.\n\n**Dica de prova:** A detecção avançada usa os serviços de localização do iOS para fazer check-ins mais frequentes.",
    "docs": [
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      },
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      }
    ]
  },
  {
    "id": "Q104",
    "src": 104,
    "domain": 1,
    "skill": "1.3",
    "topic": "Funções do Entra",
    "type": "match",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém dois usuários chamados User1 e User2.\n\nVocê precisa garantir que os usuários possam executar as seguintes tarefas:\n\n- User1 deve poder criar grupos e gerenciar usuários.\n- User2 deve poder redefinir senhas de usuários sem funções administrativas.\n\nA solução deve usar o princípio do menor privilégio.\n\nQual função você deve atribuir a cada usuário? Para responder, arraste as funções apropriadas para os usuários correspondentes. Cada função pode ser usada uma vez, mais de uma vez ou nenhuma vez.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "pool": [
      "Administrador Global",
      "Administrador de Suporte Técnico",
      "Administrador de Segurança",
      "Administrador de Usuários"
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
    "explanation": "**User Administrator** cria e gerencia usuários e grupos. **Helpdesk Administrator** redefine senhas de usuários não administradores (e de outros Helpdesk Admins). Global Administrator seria excesso de privilégio.",
    "details": "**Item a item**\n- **Global Administrator:** excesso de privilégio.\n- **Groups Administrator:** não gerencia usuários.\n- **Password Administrator:** também redefine senhas, mas é mais restrito que o Helpdesk; o gabarito usa Helpdesk.",
    "docs": [
      {
        "t": "Funções internas do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
      },
      {
        "t": "Role-based access control (RBAC) with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/role-based-access-control/overview"
      },
      {
        "t": "Create a custom role in Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/role-based-access-control/create-custom-role"
      },
      {
        "t": "Windows 365 role-based access",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/role-based-access"
      }
    ]
  },
  {
    "id": "Q105",
    "src": 105,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
    "type": "yesno",
    "stem": "Você tem uma assinatura do Microsoft Intune com as seguintes configurações de política de conformidade de dispositivos:\n\n- Marcar dispositivos sem política de conformidade atribuída como: Em conformidade\n- Período de validade do status de conformidade (dias): 14\n\nEm 1º de janeiro, você inscreve dispositivos Windows 10 no Intune, conforme a tabela a seguir.\n\n| Nome | Criptografia de Unidade de Disco BitLocker (BitLocker) | Firewall | Escopo (marcas) | Membro de |\n|---|---|---|---|---|\n| Device1 | Habilitada | Desativado | Tag1 | Group1 |\n| Device2 | Desabilitada | Ativado | Tag2 | Group1 |\n\nEm 4 de janeiro, você cria as duas políticas de conformidade de dispositivos a seguir:\n\n- Policy1 — Plataforma: Windows 10 e posteriores · Exigir BitLocker: Exigir · Marcar dispositivo como não conforme: 5 dias após a não conformidade · Escopo (marcas): Tag1\n- Policy2 — Plataforma: Windows 10 e posteriores · Firewall: Exigir · Marcar dispositivo como não conforme: Imediatamente · Escopo (marcas): Tag2\n\nEm 5 de janeiro, você atribui Policy1 e Policy2 a Group1.\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "Em 7 de janeiro, Device1 é marcado como em conformidade.",
      "Em 8 de janeiro, Device1 é marcado como em conformidade.",
      "Em 8 de janeiro, Device2 é marcado como em conformidade."
    ],
    "answer": [
      false,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Scope tags não afetam a atribuição: as duas políticas valem para os dois dispositivos. Device1 está com firewall desligado e Policy2 marca como não conforme **imediatamente** → não conforme em 7 e 8 de janeiro. Device2 está sem BitLocker, mas Policy1 dá **5 dias de carência** (até 10 de janeiro); em carência ele ainda conta como conforme, e o firewall está ligado.",
    "details": "**Item a item**\n- **Device1 em 7 ou 8/01:** Não. Firewall desligado e Policy2 marca imediatamente.\n- **Device2 em 8/01:** Sim. Em grace period (5 dias, até 10/01), e o grace period conta como conforme para CA.\n\n**Dica de prova:** Scope tags só limitam a visibilidade para administradores; não excluem dispositivos.",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q106",
    "src": 106,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
    "type": "yesno",
    "stem": "Você tem uma assinatura do Microsoft 365 que inclui o Microsoft Intune.\n\nVocê tem computadores que executam o Windows 11, conforme a tabela a seguir.\n\n| Nome | Status no Azure AD | Intune | Criptografia de Unidade de Disco BitLocker (BitLocker) | Firewall |\n|---|---|---|---|---|\n| Computer1 | Ingressado | Inscrito | Desabilitada | Habilitado |\n| Computer2 | Registrado | Inscrito | Habilitada | Habilitado |\n| Computer3 | Registrado | Não inscrito | Habilitada | Desabilitado |\n\nVocê tem os grupos mostrados na tabela a seguir.\n\n| Nome | Membros |\n|---|---|\n| Group1 | Computer1, Computer2 |\n| Group2 | Computer3 |\n\nVocê cria e atribui as políticas de conformidade mostradas na tabela a seguir.\n\n| Nome | Configuração | Ação para não conformidade | Atribuição |\n|---|---|---|---|\n| Policy1 | Exigir que o BitLocker esteja habilitado no dispositivo. | Marcar dispositivo como não conforme após 10 dias. | Group1 |\n| Policy2 | Exigir que o firewall esteja ativado e monitorando. | Marcar dispositivo como não conforme imediatamente. | Group2 |\n\nNo dia seguinte, você examina o status de conformidade dos computadores.\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "O status de conformidade de Computer1 é Em período de carência.",
      "O status de conformidade de Computer2 é Em conformidade.",
      "O status de conformidade de Computer3 é Não conforme."
    ],
    "answer": [
      true,
      true,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Computer1 está sem BitLocker e a política dá 10 dias → **In grace period**. Computer2 atende → **Compliant**. Computer3 **não está inscrito no Intune**, então a política não é avaliada nele e ele não aparece como Not compliant.",
    "details": "**Item a item**\n- **Computer1:** Sim. In grace period (BitLocker, 10 dias).\n- **Computer2:** Sim. Atende a política.\n- **Computer3:** Não aparece como Not compliant. Não está inscrito, então não há avaliação.\n\n**Dica de prova:** Para o CA, dispositivos não inscritos falham em \"Require device to be marked as compliant\".",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q107",
    "src": 107,
    "domain": 1,
    "skill": "1.3",
    "topic": "Windows Hello for Business",
    "type": "single",
    "group": {
      "kind": "series",
      "id": "PIN6"
    },
    "stem": "Sua empresa tem um tenant do Azure AD chamado contoso.com que contém vários dispositivos Windows 10.\n\nQuando novos dispositivos Windows 10 ingressam em contoso.com, os usuários são solicitados a configurar um PIN de quatro dígitos.\n\nVocê precisa garantir que os usuários sejam solicitados a configurar um PIN de seis dígitos ao ingressarem os dispositivos Windows 10 em contoso.com.\n\n**Solução:** no centro de administração do Microsoft Entra, você configura os Métodos de autenticação.\n\nIsso atende ao objetivo?",
    "options": [
      "Sim",
      "Não"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Authentication methods controla métodos como Authenticator, FIDO2 e SMS. Não define a política de PIN do Windows Hello for Business.",
    "details": "**Série \"Solution\" (PIN de 6 dígitos):** Authentication methods do Entra não controlam o PIN do Windows Hello. Atende: **inscrição automática + opções de inscrição do WHfB** no Intune.",
    "docs": [
      {
        "t": "Configure a tenant-wide Windows Hello for Business policy with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/identity-protection/configure-tenant-wide-policy"
      },
      {
        "t": "Visão geral do Windows Hello for Business",
        "u": "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/"
      }
    ]
  },
  {
    "id": "Q108",
    "src": 108,
    "domain": 1,
    "skill": "1.3",
    "topic": "Notificações de conformidade",
    "type": "single",
    "stem": "Você tem um tenant do Microsoft 365 que contém os objetos mostrados na tabela a seguir.\n\n| Nome | Tipo |\n|---|---|\n| Admin1 | Usuário |\n| Group1 | Grupo do Microsoft 365 |\n| Group2 | Grupo de distribuição |\n| Group3 | Grupo de segurança habilitado para email |\n| Group4 | Grupo de segurança |\n\nVocê está criando uma política de conformidade chamada Compliance1.\n\nQuais objetos você pode especificar em Compliance1 como destinatários adicionais das notificações de não conformidade?",
    "options": [
      "Somente Group3 e Group4",
      "Somente Group3, Group4 e Admin1",
      "Somente Group1, Group2 e Group3",
      "Somente Group1, Group2, Group3 e Group4",
      "Group1, Group2, Group3, Group4 e Admin1"
    ],
    "answer": 2,
    "shuffle": false,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "Destinatários adicionais são escolhidos por **grupo** (não por usuário) e recebem por e-mail, então só fazem sentido grupos com e-mail: Microsoft 365 group, distribution group e mail-enabled security group. Questão marcada como duvidosa porque o seletor do Intune também lista grupos de segurança sem e-mail.",
    "details": "**Por que não as outras**\n- **Admin1 (usuário):** destinatários adicionais são grupos, não usuários avulsos.\n- **Group4 (segurança sem e-mail):** não tem endereço para receber; o gabarito o exclui.\n\n**Dica de prova:** O e-mail usa um message template (Tenant administration > Notifications) e pode incluir o usuário do dispositivo.",
    "docs": [
      {
        "t": "Configure compliance policies with actions for noncompliance in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/configure-noncompliance-actions"
      },
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q109",
    "src": 109,
    "domain": 1,
    "skill": "1.1",
    "topic": "Ingresso no Microsoft Entra",
    "type": "hotarea",
    "stem": "Você tem um tenant do Azure AD chamado contoso.com que contém um usuário chamado User1. User1 tem o nome UPN user1@contoso.com.\n\nVocê ingressa um dispositivo Windows 11 chamado Client1 em contoso.com.\n\nVocê precisa adicionar User1 ao grupo local Administradores de Client1.\n\nComo você deve completar o comando? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Comando: [answer choice] Administrators /add",
        "options": [
          "net accounts",
          "net localgroup",
          "net user"
        ],
        "answer": 1
      },
      {
        "label": "Prefixo da conta: \"[answer choice]\\user1@contoso.com\"",
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
    "explanation": "O comando é `net localgroup Administrators /add \"AzureAD\\user1@contoso.com\"`. Contas do Entra ID são referenciadas localmente com o prefixo **AzureAD\\** seguido do UPN.",
    "details": "**Item a item**\n- **net accounts / net user:** tratam de política de contas e de usuários, não de grupos.\n- **CONTOSO\\ / UPN\\:** o prefixo das contas Entra no Windows é AzureAD\\.\n\n**Dica de prova:** Para gerenciar em escala, use a política Local user group membership (Account protection) no Intune.",
    "docs": [
      {
        "t": "Plan your Microsoft Entra join deployment - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/device-join-plan"
      },
      {
        "t": "Join Windows 11 Devices to Microsoft Entra ID During OOBE - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/device-join-out-of-box"
      }
    ]
  },
  {
    "id": "Q110",
    "src": 110,
    "domain": 1,
    "skill": "1.3",
    "topic": "Funções do Entra",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365.\n\nVocê precisa permitir que um usuário gerencie os Padrões de segurança e crie políticas de Acesso Condicional. A solução deve usar o princípio do menor privilégio.\n\nQual função você deve atribuir ao usuário?",
    "options": [
      "Administrador Global",
      "Administrador de Acesso Condicional",
      "Administrador de Segurança",
      "Administrador do Intune"
    ],
    "answer": 1,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O dump marca **Conditional Access Administrator**. Atenção: a documentação do Entra indica **Security Administrator** como função mínima para habilitar/desabilitar Security defaults, e essa função também gerencia políticas de Conditional Access — por isso parte da comunidade marca C. Confira a discussão.",
    "details": "**Por que não as outras**\n- **Global Administrator:** excesso de privilégio.\n- **Security Administrator:** também gerencia security defaults e CA (a documentação o cita como mínimo para security defaults).\n- **Intune Administrator:** não gerencia CA nem security defaults.",
    "docs": [
      {
        "t": "Funções internas do Microsoft Entra - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"
      },
      {
        "t": "Role-based access control (RBAC) with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/role-based-access-control/overview"
      },
      {
        "t": "Create a custom role in Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/role-based-access-control/create-custom-role"
      },
      {
        "t": "Windows 365 role-based access",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/role-based-access"
      }
    ]
  },
  {
    "id": "Q111",
    "src": 111,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
    "type": "yesno",
    "stem": "No Microsoft Intune, você tem as políticas de conformidade de dispositivos mostradas na tabela a seguir.\n\n| Nome | Tipo | Criptografia | Antimalware do Windows Defender | Marcar dispositivo como não conforme | Atribuída a |\n|---|---|---|---|---|---|\n| Policy1 | Windows 8.1 e posteriores | Exigir | Não se aplica | 5 dias | Group1 |\n| Policy2 | Windows 10 e posteriores | Não configurado | Exigir | 7 dias | Group2 |\n| Policy3 | Windows 10 e posteriores | Exigir | Exigir | 10 dias | Group2 |\n\nAs configurações de política de conformidade do Intune são as seguintes:\n\n| Configuração | Valor |\n|---|---|\n| Marcar dispositivos sem política de conformidade atribuída como | Não conforme |\n| Detecção aprimorada de jailbreak | Desabilitada |\n| Período de validade do status de conformidade (dias) | 30 |\n\nEm 1º de junho, você inscreve dispositivos Windows 10 no Intune, conforme a tabela a seguir.\n\n| Nome | Usa Criptografia de Unidade de Disco BitLocker (BitLocker) | Windows Defender | Membro de |\n|---|---|---|---|\n| Device1 | Não | Habilitado | Group1 |\n| Device2 | Não | Habilitado | Group2 |\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "Em 4 de junho, Device1 é marcado como em conformidade.",
      "Em 6 de junho, Device1 é marcado como em conformidade.",
      "Em 9 de junho, Device2 é marcado como em conformidade."
    ],
    "answer": [
      true,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Device1 recebe Policy1 (exige criptografia, 5 dias de carência): em 4 de junho ainda está em carência (conta como conforme); em 6 de junho já passou o prazo → não conforme. Device2 recebe Policy2 (Defender ok) e Policy3 (criptografia, 10 dias): em 9 de junho ainda está na carência de Policy3 → conforme.",
    "details": "**Item a item**\n- **Device1 em 4/06:** Sim. Em grace period (5 dias).\n- **Device1 em 6/06:** Não. O prazo de 5 dias venceu.\n- **Device2 em 9/06:** Sim. Ainda na carência de 10 dias da Policy3.\n\n**Dica de prova:** O estado In grace period conta como compliant para o Conditional Access.",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q112",
    "src": 112,
    "domain": 3,
    "skill": "1.3",
    "topic": "Proteção de conta",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém um usuário chamado User1 e usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos que executam o Windows 11.\n\nUser1 fornece suporte remoto para 75 dispositivos do departamento de marketing.\n\nVocê precisa adicionar User1 ao grupo Usuários da Área de Trabalho Remota em cada dispositivo do departamento de marketing.\n\nO que você deve configurar?",
    "options": [
      "uma política de configuração de aplicativos",
      "uma política de conformidade de dispositivos",
      "uma política de proteção de conta",
      "um perfil de configuração de dispositivos"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O perfil **Local user group membership** fica em **Endpoint security > Account protection** e permite adicionar/substituir membros de grupos locais como Administrators e Remote Desktop Users.",
    "details": "**Por que não as outras**\n- **App configuration / compliance:** não alteram grupos locais.\n- **Device configuration profile:** também funcionaria via OMA-URI (custom), mas o caminho dedicado é Account protection.\n\n**Dica de prova:** A ação \"Add (Update)\" adiciona membros sem remover os existentes; \"Replace\" substitui todos.",
    "docs": [
      {
        "t": "Configure a tenant-wide Windows Hello for Business policy with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/identity-protection/configure-tenant-wide-policy"
      },
      {
        "t": "Visão geral do Windows Hello for Business",
        "u": "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/"
      }
    ]
  },
  {
    "id": "Q113",
    "src": 113,
    "domain": 1,
    "skill": "1.2",
    "topic": "Inscrição automática",
    "type": "yesno",
    "stem": "Você tem um tenant do Azure AD chamado contoso.com que contém os usuários mostrados na tabela a seguir.\n\n| Nome | Membro de | Licença |\n|---|---|---|\n| User1 | Group1 | Microsoft 365 E5 |\n| User2 | Group2 | Microsoft 365 E5 |\n\nPara contoso.com, as configurações de Mobilidade (MDM e MAM) são as seguintes:\n\n- Escopo de usuário MDM: Group1\n- Escopo de usuário MAM: Group2\n\nVocê compra os dispositivos mostrados na tabela a seguir.\n\n| Nome | Plataforma |\n|---|---|\n| Device1 | Windows 11 |\n| Device2 | Windows 10 |\n| Device3 | Android |\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.",
    "statements": [
      "Se User1 registrar Device1 em contoso.com, Device1 será inscrito automaticamente no Microsoft Intune.",
      "Se User1 ingressar Device2 em contoso.com, Device2 será inscrito automaticamente no Microsoft Intune.",
      "Se User2 registrar Device3 em contoso.com, Device3 será inscrito automaticamente no Microsoft Intune."
    ],
    "answer": [
      false,
      true,
      false
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O **Entra join** de um Windows por um usuário no MDM user scope dispara a inscrição automática → Device2 sim. Android não usa esse mecanismo, e User2 está no escopo **MAM** → não. A primeira afirmação é a polêmica: a documentação indica que, num Windows pessoal, adicionar a conta de trabalho (registro) também pode inscrever no MDM quando o usuário está no MDM scope; o dump marca Não. (No dump, a segunda afirmação misturava Device1 e Device2; aqui foi uniformizada.)",
    "details": "**Item a item**\n- **User1 registra o Device1:** Não, pelo gabarito (registro sem join). A documentação discute inscrição via \"Access work or school\" para usuários no escopo.\n- **User1 faz join do Device2:** Sim. Entra join + MDM user scope = inscrição automática.\n- **User2 registra o Device3 (Android):** Não. Android se inscreve pelo Company Portal, e o User2 está só no escopo MAM.\n\n**Dica de prova:** O MDM user scope tem prioridade sobre o MAM scope quando o usuário está nos dois.",
    "docs": [
      {
        "t": "Enable MDM automatic enrollment for Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/windows/enable-automatic-mdm"
      },
      {
        "t": "Set up automatic enrollment in Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/windows/quickstart-automatic-mdm"
      },
      {
        "t": "Enroll a Windows device automatically using Group Policy",
        "u": "https://learn.microsoft.com/en-us/windows/client-management/enroll-a-windows-10-device-automatically-using-group-policy"
      }
    ]
  },
  {
    "id": "Q114",
    "src": 114,
    "domain": 2,
    "skill": "2.4",
    "topic": "Ciclo de vida de dispositivos",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para implantar e gerenciar dispositivos Windows.\n\nVocê tem 100 dispositivos de usuários que saíram da empresa.\n\nVocê precisa reutilizar os dispositivos para novos usuários, removendo todos os dados e aplicativos instalados pelos usuários anteriores. A solução deve minimizar o esforço administrativo.\n\nO que você deve fazer?",
    "options": [
      "Implantar um novo perfil de configuração nos dispositivos.",
      "Executar uma redefinição do Windows Autopilot nos dispositivos.",
      "Executar uma atualização in-place nos dispositivos.",
      "Executar uma instalação limpa do Windows 11 nos dispositivos."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O **Autopilot Reset** remove apps, dados e configurações pessoais, mantém o vínculo com o Entra ID e o Intune, e devolve o dispositivo pronto para um novo usuário, sem reinstalar a imagem.",
    "details": "**Por que não as outras**\n- **Configuration profile:** não limpa dados.\n- **In-place upgrade:** preserva apps e dados.\n- **Clean install:** mais esforço (imagem, mídia).\n\n**Dica de prova:** O Autopilot Reset exige o Windows RE funcional e o dispositivo Entra joined e gerenciado.",
    "docs": [
      {
        "t": "Wipe devices with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/wipe"
      },
      {
        "t": "Device Action: Sync - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/sync"
      },
      {
        "t": "Device Action: Restart - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/restart"
      }
    ]
  },
  {
    "id": "Q115",
    "src": 115,
    "domain": 1,
    "skill": "2.1",
    "topic": "Windows Autopilot",
    "type": "multi",
    "layout": "panel",
    "panelTitle": "Criar perfil — PC Windows · Experiência inicial (OOBE)",
    "stem": "Você cria um perfil de implantação do Windows Autopilot.\n\nVocê precisa definir as configurações do perfil para atender aos seguintes requisitos:\n\n- Inscrever automaticamente novos dispositivos e provisionar aplicativos do sistema sem exigir a autenticação do usuário final.\n- Incluir o número de série do hardware no nome do computador.\n\nQuais duas configurações você deve definir? Para responder, selecione as configurações apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "Modo de implantação (Controlado pelo usuário)",
      "Ingressar no Azure AD como (Ingressado no Azure AD)",
      "Termos de Licença de Software Microsoft",
      "Configurações de privacidade",
      "Ocultar opções de alteração de conta",
      "Tipo de conta de usuário",
      "Permitir implantação pré-provisionada",
      "Idioma (região)",
      "Configurar o teclado automaticamente",
      "Aplicar modelo de nome de dispositivo"
    ],
    "answer": [
      0,
      9
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Inscrever e provisionar sem autenticação do usuário é o modo **Self-deploying**, configurado em **Deployment mode** (que precisa ser trocado de User-Driven). O número de série no nome vem de **Apply device name template** com a macro `%SERIAL%`.",
    "details": "**Por que não as outras**\n- **Join to Azure AD / termos / privacidade / tipo de conta / teclado / idioma:** não resolvem \"sem autenticação\" nem o nome com o serial.\n- **Allow pre-provisioned:** é o White Glove (técnico + usuário), não o self-deploying.\n\n**Dica de prova:** O self-deploying exige TPM 2.0 com atestação e não suporta hybrid join.",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q116",
    "src": 116,
    "domain": 2,
    "skill": "2.2",
    "topic": "Área de Trabalho Remota",
    "type": "single",
    "stem": "Você tem um computador chamado Computer1 que executa o Windows 11.\n\nUm usuário chamado User1 planeja usar a Área de Trabalho Remota para se conectar a Computer1.\n\nVocê precisa garantir que o dispositivo de User1 seja autenticado antes que a conexão de Área de Trabalho Remota seja estabelecida e a página de entrada apareça.\n\nO que você deve fazer em Computer1?",
    "options": [
      "Ativar a Proteção baseada em reputação",
      "Habilitar a Autenticação no Nível da Rede (NLA)",
      "Ativar a Descoberta de Rede",
      "Configurar o serviço Configuração da Área de Trabalho Remota"
    ],
    "answer": 1,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Com **Network Level Authentication**, a autenticação acontece antes de a sessão RDP ser criada e de a tela de logon aparecer.",
    "details": "**Por que não as outras**\n- **Reputation-based protection:** SmartScreen.\n- **Network Discovery:** descoberta na rede.\n- **Remote Desktop Configuration service:** é um serviço interno, não habilita a pré-autenticação.",
    "docs": [
      {
        "t": "Enable Remote Desktop on your PC",
        "u": "https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/remotepc/remote-desktop-allow-access"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q117",
    "src": 117,
    "domain": 1,
    "skill": "2.1",
    "topic": "Ativação de assinatura",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos.\n\nVocê tem os dispositivos mostrados na tabela a seguir.\n\n| Nome | Sistema operacional | Tipo de ativação |\n|---|---|---|\n| Device1 | Windows 10 Pro for Workstation | Chave |\n| Device2 | Windows 11 Pro | Chave |\n| Device3 | Windows 11 Pro | Assinatura |\n\nQuais dispositivos podem ser alterados para o Windows 11 Enterprise usando a ativação de assinatura?",
    "options": [
      "Somente Device3",
      "Somente Device2 e Device3",
      "Somente Device1 e Device2",
      "Device1, Device2 e Device3"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Subscription activation troca a **edição**, não a versão: Device1 iria para Windows **10** Enterprise. Os dois Windows 11 Pro podem virar Windows 11 Enterprise, independentemente de terem sido ativados por chave ou por assinatura.",
    "details": "**Por que não as outras**\n- **Device1:** viraria Windows 10 Enterprise, não 11 (a ativação troca só a edição).\n- **Só o Device3:** o tipo de ativação atual (chave ou assinatura) não importa.",
    "docs": [
      {
        "t": "Ativação de assinatura do Windows",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Requisitos do Windows 11",
        "u": "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements"
      }
    ]
  },
  {
    "id": "Q118",
    "src": 118,
    "domain": 2,
    "skill": "2.2",
    "topic": "Área de Trabalho Remota",
    "type": "yesno",
    "stem": "Sua rede contém um domínio do Active Directory chamado adatum.com. O domínio contém dois computadores chamados Computer1 e Computer2 que executam o Windows 10. A Área de Trabalho Remota está habilitada em Computer2.\n\nO domínio contém as contas de usuário mostradas na tabela a seguir.\n\n| Nome | Membro de |\n|---|---|\n| User1 | Administradores do Domínio |\n| User2 | Usuários do Domínio |\n| User3 | Usuários do Domínio |\n\nComputer2 contém os grupos locais mostrados na tabela a seguir.\n\n| Nome | Membros |\n|---|---|\n| Group1 | ADATUM\\User2, ADATUM\\User3 |\n| Group2 | ADATUM\\User2 |\n| Group3 | ADATUM\\User3 |\n| Administradores | ADATUM\\Domain Admins, ADATUM\\User3 |\n| Usuários da Área de Trabalho Remota | Group1 |\n\nAs atribuições de direitos de usuário relevantes para Computer2 são mostradas na tabela a seguir.\n\n| Política | Configuração de segurança |\n|---|---|\n| Permitir logon pelos Serviços de Área de Trabalho Remota | Administradores, Usuários da Área de Trabalho Remota |\n| Negar logon pelos Serviços de Área de Trabalho Remota | Group2 |\n| Negar logon local | Group3 |\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "User1 pode estabelecer uma sessão de Área de Trabalho Remota com Computer2.",
      "User2 pode estabelecer uma sessão de Área de Trabalho Remota com Computer2.",
      "User3 pode estabelecer uma sessão de Área de Trabalho Remota com Computer2."
    ],
    "answer": [
      true,
      false,
      true
    ],
    "scope": "borderline",
    "review": "ok",
    "explanation": "User1 é Domain Admin → Administrators → permitido. User2 está em Remote Desktop Users (via Group1), mas também em Group2, que tem **Deny log on through RDS** — o deny vence. User3 tem \"Deny log on **locally**\", que não afeta o RDP, e está em Administrators/Remote Desktop Users → permitido.",
    "details": "**Item a item**\n- **User1:** Sim. Domain Admins pertence a Administrators.\n- **User2:** Não. O Deny log on through RDS (Group2) vence o Allow.\n- **User3:** Sim. O \"Deny log on locally\" não afeta o RDP.\n\n**Dica de prova:** Em direitos de usuário, Deny sempre prevalece sobre Allow.",
    "docs": [
      {
        "t": "Enable Remote Desktop on your PC",
        "u": "https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/remotepc/remote-desktop-allow-access"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q119",
    "src": 119,
    "domain": 2,
    "skill": "2.2",
    "topic": "Área de Trabalho Remota",
    "type": "single",
    "stem": "Você tem dois computadores chamados Computer1 e Computer2 que executam o Windows 10. Computer2 tem a Área de Trabalho Remota habilitada.\n\nDe Computer1, você se conecta a Computer2 usando a Conexão de Área de Trabalho Remota.\n\nVocê precisa garantir que possa acessar as unidades locais de Computer1 dentro da sessão de Área de Trabalho Remota.\n\nO que você deve fazer?",
    "options": [
      "Em Computer2, definir as configurações da Área de Trabalho Remota.",
      "No Windows Defender Firewall de Computer1, permitir a Área de Trabalho Remota.",
      "No Windows Defender Firewall de Computer2, permitir o Compartilhamento de Arquivos e Impressoras.",
      "Em Computer1, definir as configurações da Conexão de Área de Trabalho Remota."
    ],
    "answer": 3,
    "scope": "borderline",
    "review": "ok",
    "explanation": "O redirecionamento de unidades locais é escolhido no **cliente** (mstsc em Computer1): Local Resources > More > Drives.",
    "details": "**Por que não as outras**\n- **Configurar o Computer2:** o redirecionamento é escolhido no cliente (e pode ser bloqueado por política no host).\n- **Firewall do Computer1 / File and Printer Sharing:** o redirecionamento passa dentro do canal RDP.",
    "docs": [
      {
        "t": "Enable Remote Desktop on your PC",
        "u": "https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/remotepc/remote-desktop-allow-access"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q120",
    "src": 120,
    "domain": 1,
    "skill": "2.1",
    "topic": "Métodos de provisionamento",
    "type": "multi",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune.\n\nVocê tem cinco dispositivos novos com Windows 11 Pro.\n\nVocê precisa preparar os dispositivos para uso corporativo. A solução deve atender aos seguintes requisitos:\n\n- Instalar o Windows 11 Enterprise em cada dispositivo.\n- Instalar um pacote Windows Installer (MSI) chamado App1 em cada dispositivo.\n- Adicionar um certificado chamado Certificate1, exigido por App1.\n- Ingressar cada dispositivo no Azure AD.\n\nQuais três opções de provisionamento você pode usar? Cada resposta correta apresenta uma solução completa.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "ativação de assinatura",
      "uma imagem personalizada do Windows",
      "uma atualização in-place",
      "Windows Autopilot",
      "pacotes de provisionamento"
    ],
    "answer": [
      1,
      3,
      4
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Uma **imagem customizada**, o **Windows Autopilot** (com Intune entregando app e certificado) e um **provisioning package** atendem a todos os requisitos sozinhos. Subscription activation só troca a edição, e o in-place upgrade não faz join nem instala app/certificado.",
    "details": "**Por que não as outras**\n- **Subscription activation:** só troca a edição; não instala app nem faz join.\n- **In-place upgrade:** não faz join nem instala app ou certificado.\n\n**Dica de prova:** Autopilot + Intune entregam o MSI (LOB) e o certificado (perfil trusted/PKCS).",
    "docs": [
      {
        "t": "Windows deployment scenarios and tools",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-deployment-scenarios-and-tools"
      },
      {
        "t": "Overview of Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/overview"
      },
      {
        "t": "Compare Windows Autopilot device preparation and Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/device-preparation/compare"
      }
    ]
  },
  {
    "id": "Q123",
    "src": 123,
    "domain": 1,
    "skill": "2.1",
    "topic": "Windows Autopilot",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365.\n\nVocê planeja usar o Windows Autopilot para provisionar 25 dispositivos Windows 11.\n\nVocê precisa definir as configurações da experiência inicial (OOBE).\n\nO que você deve criar no centro de administração do Microsoft Intune?",
    "options": [
      "uma página de status de inscrição (ESP)",
      "um perfil de implantação",
      "uma política de conformidade",
      "um script do PowerShell",
      "um perfil de configuração"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "As telas do OOBE (licença, privacidade, tipo de conta, nome do dispositivo, modo de implantação) são definidas no **Autopilot deployment profile**. A ESP só mostra o progresso de apps e políticas.",
    "details": "**Por que não as outras**\n- **ESP:** mostra o progresso; não define as telas do OOBE.\n- **Compliance / script / configuration profile:** não configuram o OOBE.",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q124",
    "src": 124,
    "domain": 1,
    "skill": "2.1",
    "topic": "Ativação de assinatura",
    "type": "single",
    "stem": "Você tem um tenant do Azure AD que contém os dispositivos mostrados na tabela a seguir.\n\n| Nome | Sistema operacional | Tipo de ingresso no Azure AD |\n|---|---|---|\n| Device1 | Windows 11 Pro | Ingressado |\n| Device2 | Windows 11 Pro | Registrado |\n| Device3 | Windows 10 Pro | Ingressado |\n| Device4 | Windows 10 Pro | Registrado |\n\nVocê compra licenças do Windows 11 Enterprise E5.\n\nQuais dispositivos podem usar a Ativação de Assinatura para atualizar para o Windows 11 Enterprise?",
    "options": [
      "Somente Device1",
      "Somente Device1 e Device2",
      "Somente Device1 e Device3",
      "Device1, Device2, Device3 e Device4"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Precisa ser **Windows 11** Pro (a ativação não muda a versão) e **Entra joined/hybrid joined** (registro não basta). Só o Device1 atende os dois.",
    "details": "**Por que não as outras**\n- **Device3:** Windows 10; a ativação leva para Windows 10 Enterprise.\n- **Device2 / Device4:** só registrados.",
    "docs": [
      {
        "t": "Ativação de assinatura do Windows",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Requisitos do Windows 11",
        "u": "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements"
      }
    ]
  },
  {
    "id": "Q125",
    "src": 125,
    "domain": 4,
    "skill": "4.2",
    "topic": "Políticas de configuração de aplicativos",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune.\n\nVocê adiciona aplicativos ao Intune conforme a tabela a seguir.\n\n| Nome | Tipo de aplicativo |\n|---|---|\n| App1 | Aplicativo da loja Android |\n| App2 | Aplicativo Android de linha de negócios |\n| App3 | Aplicativo do Managed Google Play |\n\nVocê precisa criar uma política de configuração de aplicativos chamada Policy1 para a plataforma Android Enterprise.\n\nQuais aplicativos você pode gerenciar usando Policy1?",
    "options": [
      "Somente App2",
      "Somente App3",
      "Somente App1 e App3",
      "Somente App2 e App3",
      "App1, App2 e App3"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "App configuration policies para **Android Enterprise** (dispositivos gerenciados) usam as managed configurations do Google Play, então só se aplicam a apps do **Managed Google Play**.",
    "details": "**Por que não as outras**\n- **App1 (store app):** no Android Enterprise, apps \"Android store app\" são links para a loja pública, sem managed configuration.\n- **App2 (LOB):** managed configurations exigem Managed Google Play (um LOB pode ser publicado como app privado no MGP).",
    "docs": [
      {
        "t": "App Configuration Policies for Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/overview"
      },
      {
        "t": "Add App Configuration Policies for Managed iOS/iPadOS Devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-ios"
      }
    ]
  },
  {
    "id": "Q126",
    "src": 126,
    "domain": 4,
    "skill": "4.1",
    "topic": "Aplicativos do Android Enterprise",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune.\n\nVocê precisa garantir que possa implantar aplicativos em dispositivos Android Enterprise.\n\nO que você deve fazer primeiro?",
    "options": [
      "Criar um perfil de configuração.",
      "Adicionar um conector de certificado.",
      "Definir as configurações de Gerenciamento de dispositivos de parceiros.",
      "Vincular sua conta do Managed Google Play ao Intune."
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Android Enterprise depende da vinculação da conta **Managed Google Play** ao Intune; é ela que fornece os apps.",
    "details": "**Por que não as outras**\n- **Configuration profile / certificate connector / Partner device management:** não habilitam a distribuição de apps.\n\n**Dica de prova:** A vinculação também é pré-requisito para inscrever qualquer dispositivo Android Enterprise.",
    "docs": [
      {
        "t": "Manage Apple Volume-Purchased Apps - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple"
      },
      {
        "t": "Add and Assign Managed Google Play Apps to Android Enterprise Devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-managed-google-play"
      }
    ]
  },
  {
    "id": "Q127",
    "src": 127,
    "domain": 4,
    "skill": "4.1",
    "topic": "Company Portal",
    "type": "multi",
    "stem": "Você tem um tenant do Microsoft 365 que usa o Microsoft Intune.\n\nVocê usa o aplicativo Company Portal para acessar e instalar aplicativos publicados em dispositivos inscritos.\n\nNo centro de administração do Microsoft Intune, você adiciona um aplicativo da Microsoft Store.\n\nQuais dois tipos de Informações do aplicativo ficam visíveis no Company Portal?\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "URL de privacidade",
      "URL de informações",
      "Desenvolvedor",
      "Proprietário"
    ],
    "answer": [
      0,
      1
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "**Information URL** e **Privacy URL** aparecem para o usuário no Company Portal. Developer e Owner são informativos para administradores no admin center.",
    "details": "**Por que não as outras**\n- **Developer / Owner:** campos informativos para administradores.\n\n**Dica de prova:** Também aparecem para o usuário: Description, Publisher, Category e logo.",
    "docs": [
      {
        "t": "How to Configure the Intune Company Portal Apps, Company Portal Website, and Intune App - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/configure-company-portal"
      },
      {
        "t": "Gerenciamento de aplicativos Win32 no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/win32"
      },
      {
        "t": "Adicionar um aplicativo de linha de negócios do Windows ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-lob-windows"
      },
      {
        "t": "Adicionar aplicativos da Microsoft Store ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store"
      }
    ]
  },
  {
    "id": "Q128",
    "src": 128,
    "domain": 2,
    "skill": "2.2",
    "topic": "Restrições de dispositivo",
    "type": "multi",
    "layout": "panel",
    "panelTitle": "Restrições de dispositivo — Windows 10 e posteriores · Definições de configuração",
    "stem": "Você tem 200 computadores que executam o Windows 10. Os computadores estão ingressados no Azure AD e inscritos no Microsoft Intune.\n\nVocê precisa definir uma imagem personalizada como papel de parede e tela de entrada.\n\nQuais duas configurações você deve definir no perfil de configuração de Restrições de dispositivo? Para responder, selecione as configurações apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "Loja de Aplicativos",
      "Rede celular e conectividade",
      "Nuvem e Armazenamento",
      "Impressora de Nuvem",
      "Painel de Controle e Configurações",
      "Tela",
      "Geral",
      "Experiência da Tela de Bloqueio",
      "Mensagens",
      "Navegador Microsoft Edge",
      "Proxy de rede",
      "Senha",
      "Exceções de privacidade por aplicativo",
      "Personalização",
      "Impressora",
      "Privacidade",
      "Projeção"
    ],
    "answer": [
      7,
      13
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "A imagem da tela de bloqueio/entrada fica em **Locked Screen Experience**, e o papel de parede em **Personalization** (Desktop background picture URL).",
    "details": "**Por que não as outras**\n- **Display / General / Control Panel / Privacy etc.:** não contêm as imagens de fundo.\n\n**Dica de prova:** Os dois exigem URL de imagem acessível (PNG/JPG); essas opções funcionam no Windows Enterprise/Education.",
    "docs": [
      {
        "t": "Restrict devices features using policy in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-device-restrictions"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q129",
    "src": 129,
    "domain": 2,
    "skill": "2.1",
    "topic": "Atualização de edição",
    "type": "single",
    "stem": "Você tem computadores que executam o Windows 11 Pro. Os computadores estão ingressados no Azure AD e inscritos no Microsoft Intune.\n\nVocê precisa atualizar os computadores para o Windows 11 Enterprise.\n\nO que você deve configurar no Intune?",
    "options": [
      "uma política de conformidade de dispositivos",
      "uma regra de limpeza de dispositivos",
      "uma política de inscrição de dispositivos",
      "um perfil de configuração de dispositivos"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O upgrade de edição é feito com um perfil de configuração do tipo **Edition upgrade and mode switch**.",
    "details": "**Por que não as outras**\n- **Compliance / cleanup / enrollment policy:** não trocam a edição.\n\n**Dica de prova:** Com subscription activation e licença E3/E5, o upgrade acontece sozinho; o perfil é útil para chaves MAK/KMS.",
    "docs": [
      {
        "t": "Upgrade Windows editions or switch S mode using Intune policy - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-edition-upgrade-windows"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Requisitos do Windows 11",
        "u": "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements"
      },
      {
        "t": "Ativação de assinatura do Windows",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation"
      }
    ]
  },
  {
    "id": "Q130",
    "src": 130,
    "domain": 3,
    "skill": "3.1",
    "topic": "Acesso controlado a pastas",
    "type": "single",
    "stem": "Você tem computadores que executam o Windows 10 e são gerenciados pelo Microsoft Intune.\n\nOs usuários armazenam seus arquivos em uma pasta chamada D:\\Folder1.\n\nVocê precisa garantir que somente uma lista de aplicativos confiáveis tenha acesso de gravação a D:\\Folder1.\n\nO que você deve configurar no perfil de configuração de dispositivos?",
    "options": [
      "Microsoft Defender Exploit Guard",
      "Microsoft Defender Application Guard",
      "Microsoft Defender SmartScreen",
      "Microsoft Defender Application Control"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "**Controlled folder access** faz parte do **Exploit Guard**: protege pastas e só permite gravação por apps confiáveis/listados.",
    "details": "**Por que não as outras**\n- **Application Guard:** isola a navegação no Edge.\n- **SmartScreen:** reputação de sites e apps.\n- **Application Control:** controla quais apps executam, não quem grava na pasta.",
    "docs": [
      {
        "t": "Protect folders from ransomware with controlled folder access - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/controlled-folder-access-overview"
      },
      {
        "t": "Manage attack surface reduction settings with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/attack-surface-reduction"
      },
      {
        "t": "ASR rules reference - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"
      }
    ]
  },
  {
    "id": "Q131",
    "src": 131,
    "domain": 3,
    "skill": "3.1",
    "topic": "Políticas de segurança de endpoint",
    "type": "multi",
    "layout": "panel",
    "panelTitle": "Segurança de endpoint · Gerenciar",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 que contém 100 dispositivos Windows 10 inscritos no Microsoft Intune.\n\nVocê precisa criar políticas de Segurança de endpoint para atender aos seguintes requisitos:\n\n- Ocultar a área Firewall e proteção de rede no aplicativo Segurança do Windows.\n- Desabilitar o provisionamento do Windows Hello for Business nos dispositivos.\n\nQuais dois tipos de política você deve usar? Para responder, selecione as políticas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "Antivírus",
      "Criptografia de disco",
      "Firewall",
      "Detecção e resposta de endpoint",
      "Redução da superfície de ataque",
      "Proteção de conta",
      "Conformidade de dispositivos",
      "Acesso Condicional"
    ],
    "answer": [
      0,
      5
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "A visibilidade das áreas do app Windows Security é controlada pelo perfil **Windows Security experience**, que fica dentro de **Antivirus**. O Windows Hello for Business é configurado em **Account protection**.",
    "details": "**Por que não as outras**\n- **Firewall:** configura o firewall, mas não esconde a área no app Windows Security.\n- **Disk encryption / EDR / ASR:** outras funções.\n- **Compliance / CA:** não são perfis de Endpoint security para essas opções.",
    "docs": [
      {
        "t": "Endpoint security in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/endpoint-security-policies"
      },
      {
        "t": "Manage antivirus settings with endpoint security policies in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/antivirus"
      }
    ]
  },
  {
    "id": "Q132",
    "src": 132,
    "domain": 5,
    "skill": "5.2",
    "topic": "Análise de endpoint",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém 100 dispositivos inscritos no Microsoft Intune.\n\nVocê precisa analisar os processos de inicialização e a frequência com que cada dispositivo reinicia.\n\nO que você deve usar?",
    "options": [
      "Análise de endpoint",
      "Gerenciamento de Dispositivos",
      "Azure Monitor",
      "Intune Data Warehouse"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "**Endpoint analytics > Startup performance** mostra os processos de inicialização e a frequência de reinícios por dispositivo.",
    "details": "**Por que não as outras**\n- **Device Management / Azure Monitor / Data Warehouse:** não trazem processos de boot e reinícios prontos.",
    "docs": [
      {
        "t": "Endpoint analytics overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/endpoint-analytics/"
      },
      {
        "t": "Use Remediations to Detect and Fix Support Issues - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations"
      }
    ]
  },
  {
    "id": "Q133",
    "src": 133,
    "domain": 3,
    "skill": "3.1",
    "topic": "Políticas de segurança de endpoint",
    "type": "match",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém dispositivos inscritos no Microsoft Intune.\n\nVocê precisa criar políticas de Segurança de endpoint para impor os seguintes requisitos:\n\n- Os computadores que executam o macOS devem ter o FileVault habilitado.\n- Os computadores que executam o Windows 10 devem ter o Microsoft Defender Credential Guard habilitado.\n- Os computadores que executam o Windows 10 devem ter o Microsoft Defender Application Control habilitado.\n\nQual recurso de Segurança de endpoint você deve usar para cada requisito? Para responder, arraste os recursos apropriados para os requisitos correspondentes. Cada recurso pode ser usado uma vez, mais de uma vez ou nenhuma vez.",
    "pool": [
      "Proteção de conta",
      "Redução da superfície de ataque (ASR)",
      "Criptografia de disco",
      "Detecção e resposta de endpoint (EDR)"
    ],
    "targets": [
      {
        "label": "Os computadores que executam o macOS devem ter o FileVault habilitado:",
        "answer": 2
      },
      {
        "label": "Os computadores que executam o Windows 10 devem ter o Microsoft Defender Application Control habilitado:",
        "answer": 1
      },
      {
        "label": "Os computadores que executam o Windows 10 devem ter o Microsoft Defender Credential Guard habilitado:",
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "FileVault → **Disk encryption**. Application Control (WDAC) → **Attack surface reduction** (perfil Application control). Credential Guard → **Account protection**. Observação: em 2024 o Intune ganhou um nó próprio \"App Control for Business\" no Endpoint security; a resposta segue a estrutura da época da questão.",
    "details": "**Item a item**\n- **FileVault em Account protection / ASR:** criptografia de disco fica em Disk encryption.\n- **Credential Guard em ASR:** Credential Guard fica em Account protection.\n- **WDAC em Disk encryption:** o controle de aplicativos ficava em ASR (hoje em App Control for Business).",
    "docs": [
      {
        "t": "Endpoint security in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/endpoint-security-policies"
      },
      {
        "t": "Manage antivirus settings with endpoint security policies in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/antivirus"
      }
    ]
  },
  {
    "id": "Q134",
    "src": 134,
    "domain": 2,
    "skill": "3.2",
    "topic": "Otimização de Entrega",
    "type": "single",
    "stem": "Sua empresa tem 200 computadores que executam o Windows 10. Os computadores são gerenciados pelo Microsoft Intune.\n\nAtualmente, as atualizações do Windows são baixadas sem usar a Otimização de Entrega.\n\nVocê precisa configurar os computadores para usar a Otimização de Entrega.\n\nO que você deve criar no Intune?",
    "options": [
      "uma política de conformidade de dispositivos",
      "um anel de atualização do Windows 10",
      "um perfil de configuração de dispositivos",
      "uma política de proteção de aplicativos"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Delivery Optimization é configurado num **perfil de configuração**. O update ring define quando instalar, não de onde baixar.",
    "details": "**Por que não as outras**\n- **Compliance / app protection:** sem relação com download.\n- **Update ring:** define quando instalar, não de onde baixar (a opção de DO dele é legada).",
    "docs": [
      {
        "t": "Windows Delivery Optimization settings in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-delivery-optimization-windows"
      },
      {
        "t": "What is Delivery Optimization?",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/do/waas-delivery-optimization"
      }
    ]
  },
  {
    "id": "Q135",
    "src": 135,
    "domain": 1,
    "skill": "2.1",
    "topic": "Pacotes de provisionamento",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos.\n\nA inscrição automática no Intune está configurada.\n\nVocê tem 100 dispositivos Windows 11 em um grupo de trabalho.\n\nVocê precisa conectar os dispositivos à rede sem fio corporativa e inscrever 100 novos dispositivos Windows 11 no Intune.\n\nO que você deve usar?",
    "options": [
      "um pacote de provisionamento",
      "um objeto de Política de Grupo (GPO)",
      "inscrição automática no gerenciamento de dispositivos móveis (MDM)",
      "uma política de configuração de dispositivos"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Um **provisioning package** (Windows Configuration Designer) aplica o perfil Wi-Fi e faz o bulk enrollment no Entra/Intune em dispositivos de workgroup, de uma vez só. GPO exige domínio, e a inscrição automática exige que o dispositivo já esteja entrando no Entra.",
    "details": "**Por que não as outras**\n- **GPO:** exige domínio; os dispositivos estão em workgroup.\n- **MDM automatic enrollment:** precisa que o dispositivo faça join no Entra antes.\n- **Device configuration:** só se aplica a dispositivos já inscritos.\n\n**Dica de prova:** O bulk enrollment usa um token de conta de pacote (expira em 180 dias).",
    "docs": [
      {
        "t": "Provisioning packages overview",
        "u": "https://learn.microsoft.com/en-us/windows/configuration/provisioning-packages/provisioning-packages"
      },
      {
        "t": "Overview of Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/overview"
      },
      {
        "t": "Compare Windows Autopilot device preparation and Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/device-preparation/compare"
      }
    ]
  },
  {
    "id": "Q136",
    "src": 136,
    "domain": 1,
    "skill": "1.2",
    "topic": "Propriedade de dispositivos",
    "type": "hotarea",
    "stem": "Você tem um tenant do Microsoft 365 que usa o Microsoft Intune para gerenciar dispositivos pessoais e corporativos. O tenant contém dispositivos Windows 10, conforme a imagem a seguir.\n\n### Tradução do texto da imagem\n\n| Nome | Habilitado | Sistema operacional | Versão | Tipo de ingresso | Proprietário | MDM | Em conformidade |\n|---|---|---|---|---|---|---|---|\n| LON-CL2 | Sim | Windows | 10.0.17763.615 | Registrado no Azure AD | User2 | Microsoft Intune | Sim |\n| LON-CL4 | Sim | Windows | 10.0.17763.107 | Ingressado no Azure AD | User1 | Microsoft Intune | Sim |\n\nComo o Intune classificará cada dispositivo depois que os dispositivos forem inscritos automaticamente no Intune? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Identificado pelo Intune como dispositivo pessoal:",
        "options": [
          "Somente LON-CL2",
          "Somente LON-CL4",
          "LON-CL2 e LON-CL4",
          "Nem LON-CL2 nem LON-CL4"
        ],
        "answer": 0
      },
      {
        "label": "Identificado pelo Intune como dispositivo corporativo:",
        "options": [
          "Somente LON-CL2",
          "Somente LON-CL4",
          "LON-CL2 e LON-CL4",
          "Nem LON-CL2 nem LON-CL4"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Dispositivos Windows **Entra joined** inscritos automaticamente são marcados como **corporativos**. Dispositivos **Entra registered** (conta de trabalho adicionada a um PC pessoal) são marcados como **pessoais**.",
    "details": "**Item a item**\n- **Os dois como pessoal ou corporativo:** o tipo de vínculo define o ownership na inscrição automática.\n\n**Dica de prova:** O ownership pode ser alterado manualmente depois; dispositivos corporativos permitem mais ações (ex.: inventário de apps completo).",
    "docs": [
      {
        "t": "Add corporate identifiers to Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/add-corporate-identifiers"
      },
      {
        "t": "Overview of enrollment restrictions - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/restrictions"
      },
      {
        "t": "Etapa 5 – Inscrever dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/enroll-devices"
      }
    ],
    "exhibits": [
      {
        "src": "img/Q136-1.png",
        "alt": "Lista dos dispositivos LON-CL2 (registrado no Azure AD, User2) e LON-CL4 (ingressado no Azure AD, User1)"
      }
    ]
  },
  {
    "id": "Q137",
    "src": 137,
    "domain": 2,
    "skill": "3.2",
    "topic": "Anéis de atualização do Windows",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos. Todos os dispositivos estão no mesmo fuso horário.\n\nVocê cria uma política de anéis de atualização e a atribui a todos os dispositivos Windows.\n\nEm 1º de novembro, você pausa a política de anéis de atualização.\n\nTodos os dispositivos permanecem online.\n\nSem outras modificações na política, em que data os dispositivos tentarão se atualizar novamente?",
    "options": [
      "1º de dezembro",
      "6 de dezembro",
      "15 de novembro",
      "22 de novembro"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "A pausa de um update ring dura **35 dias**. De 1º de novembro + 35 dias = **6 de dezembro**.",
    "details": "**Por que não as outras**\n- **1/12 / 15/11 / 22/11:** a pausa dura 35 dias corridos a partir do início.\n\n**Dica de prova:** A pausa pode ser estendida uma vez por mais 35 dias; a de feature updates e a de quality updates são separadas.",
    "docs": [
      {
        "t": "Gerenciar políticas de anéis de atualização do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-update-rings"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Gerenciar atualizações de qualidade do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-quality-updates"
      }
    ]
  },
  {
    "id": "Q138",
    "src": 138,
    "domain": 3,
    "skill": "3.1",
    "topic": "Linhas de base de segurança",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 que contém os dispositivos mostrados na tabela a seguir.\n\n| Nome | Sistema operacional | Inscrito no Microsoft Intune |\n|---|---|---|\n| Device1 | Windows 11 | Sim |\n| Device2 | Windows 10 | Sim |\n| Device3 | Android | Sim |\n| Device4 | iOS | Sim |\n\nTodos os dispositivos têm o Microsoft Edge instalado.\n\nNo centro de administração do Microsoft Intune, você cria um perfil de linha de base do Microsoft Edge chamado Edge1.\n\nVocê precisa aplicar Edge1 a todos os dispositivos compatíveis.\n\nA quais dispositivos você deve aplicar Edge1?",
    "options": [
      "Somente Device1",
      "Somente Device1 e Device2",
      "Somente Device1, Device2 e Device3",
      "Somente Device1, Device2 e Device4",
      "Device1, Device2, Device3 e Device4"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Os security baselines do Intune (inclusive o do Microsoft Edge) são só para **Windows 10/11**. No celular, o Edge é configurado com app configuration/app protection policies.",
    "details": "**Por que não as outras**\n- **Android / iOS:** baselines são só Windows; no mobile, use app config/app protection para o Edge.",
    "docs": [
      {
        "t": "Learn about Intune security baselines for Windows devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/security-baselines/overview"
      },
      {
        "t": "Configure security baseline policies in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/security-baselines/configure-baselines"
      }
    ]
  },
  {
    "id": "Q139",
    "src": 139,
    "domain": 2,
    "skill": "3.2",
    "topic": "Anéis de atualização do Windows",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune.\n\nVocê planeja gerenciar as atualizações do Windows usando o Intune.\n\nVocê cria um anel de atualização do Windows 10 e posteriores e define as Configurações da experiência do usuário para o anel conforme a imagem a seguir.\n\n### Tradução do texto da imagem\n\n**Configurações da experiência do usuário**\n\n| Configuração | Valor selecionado |\n|---|---|\n| Comportamento de atualização automática | Instalar automaticamente no horário de manutenção |\n| Início do horário ativo | 8h |\n| Fim do horário ativo | 17h |\n| Verificações de reinicialização | Permitir (opção alternativa: Ignorar) |\n| Opção de pausar atualizações do Windows | Habilitar (opção alternativa: Desabilitar) |\n| Opção de verificar atualizações do Windows | Habilitar (opção alternativa: Desabilitar) |\n| Alterar nível de notificações de atualização | Usar as notificações padrão do Windows Update |\n| Usar configurações de prazo | Permitir (opção alternativa: Não configurado) |\n| Prazo para atualizações de recursos | 5 |\n| Prazo para atualizações de qualidade | 2 |\n| Período de carência | 1 |\n| Reinicialização automática antes do prazo | Não (opção alternativa: Sim) |\n\nUse as listas suspensas para selecionar a opção que completa cada afirmação com base nas informações apresentadas na imagem.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "As reinicializações automáticas são bloqueadas [answer choice].",
        "options": [
          "antes das 8h",
          "entre 8h e 17h",
          "após as 17h"
        ],
        "answer": 1
      },
      {
        "label": "Uma reinicialização será forçada em um dispositivo [answer choice] após o prazo.",
        "options": [
          "1 dia",
          "2 dias",
          "5 dias"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "As **active hours** (8h às 17h) bloqueiam reinicializações automáticas. Depois que o deadline passa, o **grace period** (1 dia) é o tempo extra antes de forçar o reinício.",
    "details": "**Item a item**\n- **Antes das 8 h / depois das 17 h:** fora das active hours o reinício é permitido.\n- **2 ou 5 dias:** o grace period configurado é 1 dia.",
    "docs": [
      {
        "t": "Gerenciar políticas de anéis de atualização do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-update-rings"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Gerenciar atualizações de qualidade do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-quality-updates"
      }
    ],
    "exhibits": [
      {
        "src": "img/Q139-1.png",
        "alt": "Configurações da experiência do usuário: horário ativo de 8h a 17h, prazo de recursos 5, de qualidade 2, carência 1, reinicialização antes do prazo Não"
      }
    ]
  },
  {
    "id": "Q140",
    "src": 140,
    "domain": 5,
    "skill": "5.2",
    "topic": "Relatórios de Acesso Condicional",
    "type": "single",
    "stem": "Você tem um tenant do Microsoft 365.\n\nVocê tem dispositivos inscritos no Microsoft Intune.\n\nVocê atribui uma política de Acesso Condicional chamada Policy1 a um grupo chamado Group1. Policy1 restringe o acesso de dispositivos marcados como não conformes ao Microsoft OneDrive for Business.\n\nVocê precisa identificar quais dispositivos não conformes tentam acessar o OneDrive for Business.\n\nO que você deve fazer?",
    "options": [
      "No centro de administração do Microsoft Entra, examinar a pasta de trabalho de informações e relatórios do Acesso Condicional.",
      "No centro de administração do Microsoft Intune, examinar o relatório Conformidade de dispositivos.",
      "No centro de administração do Microsoft Intune, examinar o relatório Dispositivos não conformes.",
      "No centro de administração do Microsoft Intune, examinar o relatório Conformidade de configurações."
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "Os relatórios do Intune mostram quais dispositivos estão não conformes, mas não as **tentativas de acesso**. O workbook **Conditional Access Insights and Reporting** cruza os logs de sign-in com o resultado das políticas por app e dispositivo.",
    "details": "**Por que não as outras**\n- **Device compliance / Noncompliant devices / Setting compliance:** mostram o estado do dispositivo, não as tentativas de acesso por app.\n\n**Dica de prova:** O workbook exige os sign-in logs no Log Analytics (diagnostic settings).",
    "docs": [
      {
        "t": "Conditional Access insights and reporting workbook - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-insights-reporting"
      },
      {
        "t": "Relatórios do Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/overview"
      },
      {
        "t": "Usar APIs do Graph para exportar relatórios do Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/export-graph-apis"
      },
      {
        "t": "Encaminhar logs para o Azure Monitor usando o Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/governance/integrate-azure-monitor"
      }
    ]
  },
  {
    "id": "Q141",
    "src": 141,
    "domain": 5,
    "skill": "5.2",
    "topic": "Relatórios",
    "type": "hotarea",
    "stem": "Você usa o Microsoft Intune para gerenciar dispositivos Windows 10.\n\nVocê está projetando uma solução de relatórios que fornecerá relatórios sobre o seguinte:\n\n- Tendências das políticas de conformidade\n- Tendências de inscrição de dispositivos e usuários\n- Distribuições por versão de aplicativo e sistema operacional de dispositivos móveis\n\nVocê precisa recomendar uma fonte de dados e uma ferramenta de visualização de dados para o projeto.\n\nO que você deve recomendar? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Fonte de dados:",
        "options": [
          "Logs de auditoria do Azure AD",
          "Logs de auditoria do Microsoft Intune",
          "Azure Synapse Analytics",
          "O Microsoft Intune Data Warehouse"
        ],
        "answer": 3
      },
      {
        "label": "Ferramenta de visualização de dados:",
        "options": [
          "Azure Data Studio",
          "Microsoft Power BI",
          "Centro de administração do Microsoft Intune"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Tendências históricas (compliance, inscrição, versões de app/SO) vêm do **Intune Data Warehouse**, e a visualização é feita no **Power BI**.",
    "details": "**Item a item**\n- **Audit logs (Entra/Intune):** registram alterações administrativas, não tendências de inventário.\n- **Synapse:** não é fonte nativa do Intune.\n- **Azure Data Studio / admin center:** não são a ferramenta de visualização indicada para o Data Warehouse.",
    "docs": [
      {
        "t": "Relatórios do Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/overview"
      },
      {
        "t": "Usar APIs do Graph para exportar relatórios do Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/export-graph-apis"
      },
      {
        "t": "Encaminhar logs para o Azure Monitor usando o Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/governance/integrate-azure-monitor"
      }
    ]
  },
  {
    "id": "Q142",
    "src": 142,
    "domain": 1,
    "skill": "1.2",
    "topic": "Ingresso híbrido / inscrição automática",
    "type": "single",
    "stem": "Sua rede contém um domínio do Active Directory. O domínio contém 2.000 computadores que executam o Windows 10.\n\nVocê implementa o Azure AD híbrido e o Microsoft Intune.\n\nVocê precisa registrar automaticamente todos os computadores existentes no Azure AD e inscrevê-los no Intune. A solução deve minimizar o esforço administrativo.\n\nO que você deve usar?",
    "options": [
      "um registro de endereço de Descoberta Automática",
      "um objeto de Política de Grupo (GPO)",
      "um ponto de conexão de serviço (SCP) de Descoberta Automática",
      "um perfil de implantação do Windows Autopilot"
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "Para computadores existentes no domínio, a GPO **Enable automatic MDM enrollment using default Azure AD credentials** dispara a inscrição no Intune depois do hybrid join. O SCP é configurado pelo Entra Connect para o hybrid join em si, e o Autopilot é para dispositivos novos ou resetados.",
    "details": "**Por que não as outras**\n- **Autodiscover A record / SCP:** o SCP permite o hybrid join; a inscrição em massa vem da GPO.\n- **Autopilot:** para dispositivos novos ou resetados, não para os 2.000 existentes.\n\n**Dica de prova:** A GPO fica em Computer Configuration > Administrative Templates > Windows Components > MDM.",
    "docs": [
      {
        "t": "Enroll a Windows device automatically using Group Policy",
        "u": "https://learn.microsoft.com/en-us/windows/client-management/enroll-a-windows-10-device-automatically-using-group-policy"
      },
      {
        "t": "Enable MDM automatic enrollment for Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/windows/enable-automatic-mdm"
      },
      {
        "t": "Set up automatic enrollment in Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/windows/quickstart-automatic-mdm"
      }
    ]
  },
  {
    "id": "Q143",
    "src": 143,
    "domain": 2,
    "skill": "3.2",
    "topic": "Anéis de atualização do Windows",
    "type": "hotarea",
    "stem": "Você tem dois computadores que executam o Windows 10. Os computadores estão inscritos no Microsoft Intune conforme a tabela a seguir.\n\n| Nome | Membro de |\n|---|---|\n| Computer1 | Group1 |\n| Computer2 | Group1, Group2 |\n\nOs anéis de atualização do Windows 10 estão definidos no Intune conforme a tabela a seguir.\n\n| Nome | Adiamento de atualizações de qualidade (dias) | Atribuído |\n|---|---|---|\n| Ring1 | 3 | Sim |\n| Ring2 | 10 | Sim |\n\nVocê atribui os anéis de atualização conforme a tabela a seguir.\n\n| Nome | Incluir | Excluir |\n|---|---|---|\n| Ring1 | Group1 | Group2 |\n| Ring2 | Group2 | Group1 |\n\nQual é o efeito das configurações em Computer1 e Computer2? Para responder, selecione as opções apropriadas na área de resposta.",
    "slots": [
      {
        "label": "Adiamento de atualizações de qualidade em Computer1:",
        "options": [
          "3 dias",
          "7 dias",
          "10 dias",
          "13 dias",
          "Nenhum efeito"
        ],
        "answer": 0
      },
      {
        "label": "Adiamento de atualizações de qualidade em Computer2:",
        "options": [
          "3 dias",
          "7 dias",
          "10 dias",
          "13 dias",
          "Nenhum efeito"
        ],
        "answer": 4
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Computer1 só está em Group1 → Ring1 (3 dias). Computer2 está nos dois grupos: Ring1 o exclui por Group2 e Ring2 o exclui por Group1. **Exclusão vence inclusão**, então nenhum anel se aplica.",
    "details": "**Item a item**\n- **Computer1 com 7, 10 ou 13 dias:** só o Ring1 (3 dias) se aplica; os adiamentos não se somam.\n- **Computer2 com algum valor:** excluído dos dois anéis.\n\n**Dica de prova:** Evite atribuir anéis conflitantes; um dispositivo deve ter só um update ring.",
    "docs": [
      {
        "t": "Gerenciar políticas de anéis de atualização do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-update-rings"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Gerenciar atualizações de qualidade do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-quality-updates"
      }
    ]
  },
  {
    "id": "Q144",
    "src": 144,
    "domain": 3,
    "skill": "3.1",
    "topic": "Proteção de endpoint",
    "type": "multi",
    "layout": "panel",
    "panelTitle": "Proteção de endpoint — Windows 10 e posteriores · Definições de configuração",
    "stem": "Você tem 200 computadores que executam o Windows 10. Os computadores estão ingressados no Azure AD e inscritos no Microsoft Intune.\n\nVocê precisa configurar um perfil de configuração de dispositivos do Intune para atender aos seguintes requisitos:\n\n- Impedir que aplicativos do Microsoft Office iniciem processos filho.\n- Impedir que os usuários transfiram arquivos por FTP.\n\nQuais duas configurações você deve definir no perfil de configuração de Proteção de endpoint? Para responder, selecione as configurações apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "Microsoft Defender Application Guard",
      "Microsoft Defender Firewall",
      "Microsoft Defender SmartScreen",
      "Criptografia do Windows",
      "Microsoft Defender Exploit Guard",
      "Microsoft Defender Application Control",
      "Microsoft Defender Credential Guard",
      "Microsoft Defender Security Center",
      "Opções de segurança do dispositivo local",
      "Serviços do Xbox"
    ],
    "answer": [
      1,
      4
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "\"Block Office applications from creating child processes\" é uma regra de **Attack Surface Reduction**, que fica em **Microsoft Defender Exploit Guard**. Bloquear FTP (porta 21) é uma regra do **Microsoft Defender Firewall**.",
    "details": "**Por que não as outras**\n- **Application Guard / SmartScreen / Application Control / Credential Guard:** não tratam de processos filhos do Office nem de FTP.\n- **Encryption / Security Center / Local security options / Xbox:** sem relação.\n\n**Dica de prova:** Hoje: Endpoint security > ASR (regras) e Firewall (regras), com relatórios melhores.",
    "docs": [
      {
        "t": "Settings you can manage with Intune Endpoint Protection profiles for Windows devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/ref-endpoint-protection-settings-windows"
      },
      {
        "t": "Manage attack surface reduction settings with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/attack-surface-reduction"
      },
      {
        "t": "ASR rules reference - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"
      }
    ]
  },
  {
    "id": "Q145",
    "src": 145,
    "domain": 2,
    "skill": "2.2",
    "topic": "Perfis de configuração de dispositivos",
    "type": "single",
    "stem": "Você tem os seguintes tipos de dispositivos inscritos no Microsoft Intune:\n\n- Windows 10\n- Android\n- iOS\n\nPara quais tipos de dispositivos você pode criar perfis de VPN no centro de administração do Microsoft Intune?",
    "options": [
      "Somente Windows 10",
      "Somente Windows 10 e Android",
      "Somente Windows 10 e iOS",
      "Somente Android e iOS",
      "Windows 10, Android e iOS"
    ],
    "answer": 4,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Há template de perfil VPN para Windows, Android (Enterprise) e iOS/iPadOS (e também macOS).",
    "details": "**Por que não as outras**\n- **Combinações parciais:** há template de VPN para Windows, Android Enterprise, iOS/iPadOS e macOS.\n\n**Dica de prova:** Tipos de conexão variam por plataforma (ex.: IKEv2 nativo, Cisco Secure Client, Microsoft Tunnel).",
    "docs": [
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q146",
    "src": 146,
    "domain": 2,
    "skill": "2.2",
    "topic": "Perfis de configuração de dispositivos",
    "type": "single",
    "stem": "Você está criando um perfil de configuração de dispositivos no Microsoft Intune.\n\nVocê precisa definir configurações OMA-URI específicas no perfil.\n\nQual modelo de tipo de perfil você deve usar?",
    "options": [
      "Restrições de dispositivo (Windows 10 Team)",
      "Proteção de identidade",
      "Personalizado",
      "Restrições de dispositivo"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "Configurações OMA-URI arbitrárias são entregues pelo template **Custom**.",
    "details": "**Por que não as outras**\n- **Device restrictions (Teams) / Identity protection / Device restrictions:** templates com opções fixas; não aceitam OMA-URI arbitrário.\n\n**Dica de prova:** Prefira o Settings catalog quando a configuração existir nele; o Custom é o último recurso.",
    "docs": [
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q147",
    "src": 147,
    "domain": 2,
    "skill": "2.2",
    "topic": "Conjuntos de políticas",
    "type": "yesno",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune e contém os usuários mostrados na tabela a seguir.\n\n| Nome | Membro de |\n|---|---|\n| User1 | Group1 |\n| User2 | Nenhum |\n| User3 | Nenhum |\n\nVocê cria um conjunto de políticas chamado Set1 com os seguintes conteúdos e atribuições:\n\n| Seção | Conteúdo |\n|---|---|\n| Perfis de configuração de dispositivos | ConfigurationProfile1 — Windows 10 e posteriores — Restrições de dispositivo |\n| Políticas de conformidade de dispositivos | CompliancePolicy1 — Windows 10 e posteriores |\n| Perfis de implantação do Windows Autopilot | Nenhum resultado |\n| Páginas de status de inscrição | Nenhum resultado |\n| Grupos incluídos | Todos os Usuários |\n| Grupos excluídos | Group1 |\n\nVocê inscreve dispositivos no Intune conforme a tabela a seguir.\n\n| Nome | Sistema operacional | Usuário |\n|---|---|---|\n| Device1 | Windows 10 | User1 |\n| Device2 | Windows 11 | User2 |\n| Device3 | Android | User3 |\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "Se User1 entrar em Device1, Device1 terá ConfigurationProfile1 e CompliancePolicy1 atribuídos.",
      "Se User2 entrar em Device2, Device2 terá ConfigurationProfile1 e CompliancePolicy1 atribuídos.",
      "Se User3 entrar em Device3, Device3 terá ConfigurationProfile1 e CompliancePolicy1 atribuídos."
    ],
    "answer": [
      false,
      true,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "User1 está em Group1, que é **excluído** do Set1. User2 está em All Users e o Device2 é Windows 11, compatível com políticas \"Windows 10 and later\". User3 é incluído, mas o Device3 é **Android**, e as duas políticas são de Windows.",
    "details": "**Item a item**\n- **Device1:** Não. O User1 está no Group1 excluído.\n- **Device2:** Sim. Políticas de \"Windows 10 and later\" valem para o Windows 11.\n- **Device3:** Não. Android, e as políticas são de Windows.",
    "docs": [
      {
        "t": "Policy Sets - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/policy-sets"
      },
      {
        "t": "Create assignment filters in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/filters/overview"
      },
      {
        "t": "Assignment Filter Performance Tips for Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/filters/performance-recommendations"
      }
    ]
  },
  {
    "id": "Q148",
    "src": 148,
    "domain": 2,
    "skill": "3.2",
    "topic": "Atualizações do iOS",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém 1.000 dispositivos iOS. Os dispositivos estão inscritos no Microsoft Intune da seguinte maneira:\n\n- Duzentos dispositivos estão inscritos usando o Intune Company Portal.\n- Oitocentos dispositivos estão inscritos usando a Inscrição Automatizada de Dispositivos da Apple (ADE).\n\nVocê cria uma política de atualizações de software do iOS/iPadOS chamada Policy1, configurada para instalar o iOS/iPadOS 15.5.\n\nQuantos dispositivos iOS Policy1 atualizará e o que você deve configurar para garantir que somente o iOS/iPadOS 15.5 seja instalado? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Número de dispositivos:",
        "options": [
          "200",
          "800",
          "1000"
        ],
        "answer": 1
      },
      {
        "label": "Configurar uma:",
        "options": [
          "Política de conformidade",
          "Política de Acesso Condicional",
          "Política de restrição de dispositivos"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Políticas de atualização de iOS só valem para dispositivos **supervisionados** (os 800 via ADE). Para impedir que o usuário instale manualmente uma versão mais nova, use **device restrictions** para adiar a visibilidade das atualizações.",
    "details": "**Item a item**\n- **200 / 1.000:** só os dispositivos supervisionados (ADE) recebem política de atualização.\n- **Compliance / CA:** não impedem a instalação manual de versão mais nova.\n\n**Dica de prova:** A restrição \"Defer software updates\" (até 90 dias) esconde as atualizações do usuário.",
    "docs": [
      {
        "t": "Use Microsoft Intune to manage software updates for supervised iOS/iPadOS devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios"
      },
      {
        "t": "Configure Update Policies for Apple Devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/apple/"
      }
    ]
  },
  {
    "id": "Q149",
    "src": 149,
    "domain": 1,
    "skill": "1.2",
    "topic": "Inscrição automática",
    "type": "yesno",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "Para cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.",
    "statements": [
      "Se User1 ingressar um dispositivo Windows 10 no Azure AD, o dispositivo será inscrito automaticamente no Intune.",
      "Se User2 ingressar um dispositivo Windows 10 no Azure AD, o dispositivo será inscrito automaticamente no Intune.",
      "Se User3 ingressar um dispositivo Windows 10 no Azure AD, o dispositivo será inscrito automaticamente no Intune."
    ],
    "answer": [
      true,
      false,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O MDM user scope é GroupA. User1 está em GroupA → inscreve. User2 está só em GroupB (escopo MAM) → não inscreve em MDM. User3 está em GroupA e GroupB; quando o usuário está nos dois escopos, **o MDM tem precedência** → inscreve.",
    "details": "**Item a item**\n- **User1:** Sim. Está no MDM scope.\n- **User2:** Não. Está só no escopo MAM.\n- **User3:** Sim. Está nos dois; o MDM tem precedência.",
    "docs": [
      {
        "t": "Enable MDM automatic enrollment for Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/windows/enable-automatic-mdm"
      },
      {
        "t": "Set up automatic enrollment in Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/windows/quickstart-automatic-mdm"
      },
      {
        "t": "Enroll a Windows device automatically using Group Policy",
        "u": "https://learn.microsoft.com/en-us/windows/client-management/enroll-a-windows-10-device-automatically-using-group-policy"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/enrollment/windows-enroll"
    ]
  },
  {
    "id": "Q150",
    "src": 150,
    "domain": 1,
    "skill": "2.1",
    "topic": "Ingresso híbrido com Autopilot",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "Você precisa garantir que objetos de computador possam ser criados como parte da implantação do Windows Autopilot. A solução deve atender aos requisitos técnicos.\n\nA quem você deve conceder o direito de criar os objetos de computador?",
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
    "explanation": "O **Intune Connector for Active Directory** está instalado no Server1, e é a conta de computador do servidor do conector que cria os objetos de computador no AD durante o Autopilot hybrid join. A delegação \"Create computer objects\" é dada a ela na OU de destino.",
    "details": "**Por que não as outras**\n- **DC1:** não é quem cria os objetos.\n- **GroupA:** usuários não criam o computador no Autopilot hybrid.\n- **Server2:** o conector não está nele.\n\n**Dica de prova:** Delegue \"Create computer objects\" e \"Delete computer objects\" na OU para a conta de computador do servidor do conector.",
    "docs": [
      {
        "t": "Enrollment for Microsoft Entra hybrid joined devices - Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/windows-autopilot-hybrid"
      },
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q151",
    "src": 151,
    "domain": 2,
    "skill": "2.2",
    "topic": "Perfis de VPN",
    "type": "hotarea",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "Você implementa as alterações planejadas para Connection1 e Connection2.\n\nQuantas conexões VPN haverá para User1 quando ele entrar em Device1 e Device2? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
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
    "explanation": "User1 está em GroupA, então recebe Connection1 (VPN1) e Connection2 (VPN2); os dispositivos em Group1/Group2 também recebem Connection1. Connection1 tem o **mesmo nome** da VPN1 já existente e a substitui. Device1: VPN1 + VPN2 = **2**. Device2: VPN1, VPN3 (que já existia) e VPN2 = **3**. A contagem depende de considerar que o perfil com nome igual sobrescreve a conexão local — por isso está como duvidosa.",
    "details": "**Item a item**\n- **Device1 com 1, 3 ou mais:** a Connection1 substitui a VPN1 de mesmo nome; somam-se só as conexões diferentes.\n- **Device2 com 2, 4 ou 5:** VPN1 (substituída), VPN3 (já existente) e VPN2.",
    "docs": [
      {
        "t": "Add VPN settings to devices in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-vpn"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q152",
    "src": 152,
    "domain": 1,
    "skill": "1.2",
    "topic": "Inscrição",
    "type": "single",
    "group": {
      "kind": "case",
      "id": "ADATUM"
    },
    "stem": "Qual usuário pode inscrever Device6 no Intune?",
    "options": [
      "Somente User4 e User1",
      "Somente User4 e User2",
      "Somente User4, User1 e User2",
      "User1, User2, User3 e User4"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O gabarito do dump é **User4 e User1**. A lógica é que User1 está no MDM user scope (GroupA) e User4 é Global Administrator. Mas o raciocínio é frágil: User3 também está em GroupA (e, estando nos escopos MDM e MAM, o MDM prevalece), e a inscrição manual pelo Company Portal funciona para qualquer usuário licenciado. Trate como duvidosa e confira a discussão.",
    "details": "**Por que não as outras**\n- **Ambígua:** pela documentação, qualquer usuário licenciado pode inscrever pelo Company Portal; o gabarito considera o MDM scope e o Global Admin.\n\n**Dica de prova:** Restrições de plataforma e de limite de dispositivos também podem bloquear a inscrição.",
    "docs": [
      {
        "t": "Overview of enrollment restrictions - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/restrictions"
      },
      {
        "t": "Etapa 5 – Inscrever dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/enroll-devices"
      }
    ]
  },
  {
    "id": "Q153",
    "src": 153,
    "domain": 4,
    "skill": "4.2",
    "topic": "Políticas de proteção de aplicativos",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém 1.000 dispositivos iOS e inclui o Microsoft Intune.\n\nVocê precisa impedir a impressão de dados corporativos de aplicativos gerenciados nos dispositivos.\n\nO que você deve configurar?",
    "options": [
      "uma política de configuração de aplicativos",
      "uma linha de base de segurança",
      "uma política de proteção de aplicativos",
      "um perfil de provisionamento de aplicativos iOS"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "**Printing org data: Block** é uma configuração de transferência de dados da **app protection policy**.",
    "details": "**Por que não as outras**\n- **App configuration:** configura o app, não bloqueia a impressão.\n- **Security baseline:** só Windows.\n- **App provisioning profile:** assina apps LOB de iOS.",
    "docs": [
      {
        "t": "App Protection Policies Overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/overview"
      },
      {
        "t": "Create and Deploy App Protection Policies - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/create-policy"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/apps/app-protection-policy"
    ]
  },
  {
    "id": "Q154",
    "src": 154,
    "domain": 4,
    "skill": "4.1",
    "topic": "Centro de administração do Microsoft 365 Apps",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 que contém os usuários mostrados na tabela a seguir.\n\n| Nome | Função |\n|---|---|\n| Admin1 | Administrador de Aplicativos |\n| Admin2 | Administrador de Aplicativos de Nuvem |\n| Admin3 | Administrador de Aplicativos do Office |\n| Admin4 | Administrador de Segurança |\n\nNo centro de administração do Microsoft 365 Apps, você cria uma personalização do Microsoft Office.\n\nQuais usuários podem baixar o arquivo de personalização do Office no centro de administração?",
    "options": [
      "Somente Admin3",
      "Somente Admin1 e Admin3",
      "Somente Admin3 e Admin4",
      "Somente Admin1, Admin2 e Admin3",
      "Admin1, Admin2, Admin3, Admin4"
    ],
    "answer": 2,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "No Microsoft 365 Apps admin center, as funções que gerenciam customizações e políticas são **Global Administrator, Office Apps Administrator e Security Administrator**. Application/Cloud Application Administrator gerenciam registros de apps no Entra ID, não o Office.",
    "details": "**Por que não as outras**\n- **Admin1 / Admin2:** funções de apps do Entra, sem acesso ao Microsoft 365 Apps admin center.\n\n**Dica de prova:** O Office Apps Administrator também gerencia Cloud Policy e Servicing.",
    "docs": [
      {
        "t": "Overview of the Microsoft 365 Apps admin center - Microsoft 365 Apps",
        "u": "https://learn.microsoft.com/en-us/microsoft-365-apps/admin-center/overview"
      }
    ]
  },
  {
    "id": "Q155",
    "src": 155,
    "domain": 5,
    "skill": "5.2",
    "topic": "Relatórios",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 E5.\n\nVocê precisa baixar um relatório que liste todos os dispositivos que NÃO estão inscritos no Microsoft Intune e têm uma política de proteção de aplicativos atribuída.\n\nO que você deve selecionar no centro de administração do Microsoft Intune?",
    "options": [
      "Relatórios e, em seguida, Conformidade de dispositivos",
      "Aplicativos e, em seguida, Políticas de proteção de aplicativos",
      "Dispositivos e, em seguida, Monitorar",
      "Aplicativos e, em seguida, Monitorar"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Em **Apps > Monitor > App protection status** ficam os relatórios de MAM (App protection report: iOS, Android), que incluem dispositivos não inscritos que receberam política.",
    "details": "**Por que não as outras**\n- **Device compliance:** só dispositivos inscritos.\n- **App protection policies:** lista as políticas, não o relatório de status.\n- **Devices > Monitor:** relatórios de dispositivos inscritos.",
    "docs": [
      {
        "t": "Relatórios do Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/overview"
      },
      {
        "t": "Usar APIs do Graph para exportar relatórios do Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/export-graph-apis"
      },
      {
        "t": "Encaminhar logs para o Azure Monitor usando o Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/governance/integrate-azure-monitor"
      }
    ]
  },
  {
    "id": "Q156",
    "src": 156,
    "domain": 4,
    "skill": "4.1",
    "topic": "Atribuição de aplicativos",
    "type": "single",
    "stem": "Você tem um tenant do Microsoft 365 que contém os objetos mostrados na tabela a seguir.\n\n| Nome | Tipo |\n|---|---|\n| Admin1 | Usuário |\n| Group1 | Grupo do Microsoft 365 |\n| Group2 | Grupo de distribuição |\n| Group3 | Grupo de segurança habilitado para email |\n| Group4 | Grupo de segurança |\n\nNo centro de administração do Microsoft Intune, você está criando um aplicativo do Microsoft 365 Apps chamado App1.\n\nA quais objetos você pode atribuir App1?",
    "options": [
      "Somente Group3 e Group4",
      "Somente Admin1, Group3 e Group4",
      "Somente Group1, Group3 e Group4",
      "Somente Group1, Group2, Group3 e Group4",
      "Admin1, Group1, Group2, Group3 e Group4"
    ],
    "answer": 2,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Atribuições no Intune são feitas a **grupos** (não a usuários individuais), e grupos de **distribuição** não são suportados. Restam o grupo do Microsoft 365, o mail-enabled security e o security group. (No dump, a última linha da tabela repete \"Group3\"; aqui foi corrigida para Group4.)",
    "details": "**Por que não as outras**\n- **Admin1:** o Intune atribui a grupos, não a usuários avulsos.\n- **Group2 (distribuição):** grupos de distribuição não são suportados em atribuições.",
    "docs": [
      {
        "t": "Assign Apps to Groups in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/assign-groups"
      },
      {
        "t": "Gerenciamento de aplicativos Win32 no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/win32"
      },
      {
        "t": "Adicionar um aplicativo de linha de negócios do Windows ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-lob-windows"
      },
      {
        "t": "Adicionar aplicativos da Microsoft Store ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store"
      }
    ]
  },
  {
    "id": "Q157",
    "src": 157,
    "domain": 4,
    "skill": "4.2",
    "topic": "Políticas de proteção de aplicativos",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365 E5.\n\nVocê cria uma política de proteção de aplicativos para dispositivos Android chamada Policy1, conforme a imagem a seguir.\n\n### Tradução do texto da imagem\n\n**Início > Aplicativos > Criar política**\n\nEtapas: Informações básicas; Aplicativos; Proteção de dados; Requisitos de acesso. Menu de mais opções; Fechar.\n\nEscolha como deseja aplicar esta política a aplicativos em diferentes dispositivos. Em seguida, adicione pelo menos um aplicativo.\n\n| Configuração | Valor exibido |\n|---|---|\n| Direcionar para aplicativos em todos os tipos de dispositivo | Sim (opção alternativa: Não) |\n| Tipos de dispositivo | Não gerenciados |\n| Direcionar política para | Todos os Aplicativos |\n\nUse as listas suspensas para selecionar a opção que completa cada afirmação com base nas informações apresentadas na imagem.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Para aplicar Policy1 a um dispositivo Android, você deve [answer choice].",
        "options": [
          "instalar o aplicativo Company Portal no dispositivo",
          "instalar o aplicativo Microsoft Authenticator no dispositivo",
          "integrar o dispositivo ao Microsoft Defender for Endpoint",
          "integrar o dispositivo ao portal de conformidade do Microsoft Purview"
        ],
        "answer": 0
      },
      {
        "label": "Quando Policy1 for atribuída, a política será aplicada a [answer choice].",
        "options": [
          "somente usuários",
          "somente dispositivos",
          "usuários e dispositivos"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "No Android, o **Company Portal** é o broker que aplica as app protection policies (mesmo sem inscrever o dispositivo). App protection policies são atribuídas a **usuários**, nunca a dispositivos.",
    "details": "**Item a item**\n- **Authenticator:** é o broker no iOS (com o Company Portal opcional); no Android, o broker é o Company Portal.\n- **MDE / Purview:** não são necessários para MAM.\n- **Dispositivos / usuários e dispositivos:** app protection é sempre atribuída a usuários.",
    "docs": [
      {
        "t": "App Protection Policies Overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/overview"
      },
      {
        "t": "Create and Deploy App Protection Policies - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/create-policy"
      }
    ],
    "exhibits": [
      {
        "src": "img/Q157-1.png",
        "alt": "Política de proteção de aplicativos Android: direcionar a todos os tipos de dispositivo = Sim; tipos de dispositivo = Não gerenciados; direcionar para = Todos os Aplicativos"
      }
    ]
  },
  {
    "id": "Q158",
    "src": 158,
    "domain": 4,
    "skill": "4.1",
    "topic": "Managed Google Play",
    "type": "multi",
    "stem": "Você tem uma assinatura do Microsoft 365 que inclui o Microsoft Intune.\n\nVocê tem 500 dispositivos Android corporativos inscritos como dispositivos totalmente gerenciados.\n\nVocê precisa preparar um aplicativo chamado App1 para implantação nos dispositivos.\n\nQuais duas ações você deve executar? Cada resposta correta apresenta parte da solução.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "No Intune Company Portal, baixar App1.",
      "Sincronizar App1 com o Intune.",
      "Na loja do Managed Google Play, aprovar App1.",
      "Criar um perfil OEMConfig."
    ],
    "answer": [
      1,
      2
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Para Android Enterprise, o app é **aprovado no Managed Google Play** e depois **sincronizado** com o Intune, que passa a listá-lo para atribuição.",
    "details": "**Por que não as outras**\n- **Baixar do Company Portal:** é a ação do usuário, não a preparação.\n- **OEMConfig:** configura recursos do fabricante (ex.: Samsung, Zebra), não publica apps.\n\n**Dica de prova:** Apps aprovados também podem ser sincronizados automaticamente; a sincronização manual força a atualização.",
    "docs": [
      {
        "t": "Add and Assign Managed Google Play Apps to Android Enterprise Devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-managed-google-play"
      },
      {
        "t": "Manage Apple Volume-Purchased Apps - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple"
      }
    ]
  },
  {
    "id": "Q159",
    "src": 159,
    "domain": 1,
    "skill": "2.1",
    "topic": "Atualização para o Windows 11",
    "type": "single",
    "stem": "Você tem os dispositivos Windows 10 mostrados na tabela a seguir.\n\n| Nome | Sistema operacional | Edição |\n|---|---|---|\n| Device1 | Versão de 64 bits do Windows 10 | Home |\n| Device2 | Versão de 32 bits do Windows 10 | Pro |\n| Device3 | Versão de 64 bits do Windows 10 | Enterprise |\n| Device4 | Versão de 64 bits do Windows 10 | Pro |\n\nVocê planeja atualizar os dispositivos para o Windows 11 Enterprise.\n\nEm quais dispositivos você pode executar uma atualização in-place direta para o Windows 11 Enterprise?",
    "options": [
      "Somente Device3",
      "Somente Device3 e Device4",
      "Somente Device2, Device3 e Device4",
      "Somente Device1, Device3 e Device4",
      "Somente Device1, Device2, Device3 e Device4"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O Windows 11 é só 64 bits (Device2 fica de fora), e não há caminho direto de upgrade de **Home** para **Enterprise** (Device1). Pro e Enterprise de 64 bits podem ir direto para o Windows 11 Enterprise.",
    "details": "**Por que não as outras**\n- **Device1 (Home):** Home não tem caminho direto para Enterprise.\n- **Device2 (32 bits):** o Windows 11 é só 64 bits.\n\n**Dica de prova:** Home → Pro → Enterprise é possível com etapas de mudança de edição, mas não como upgrade direto.",
    "docs": [
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Requisitos do Windows 11",
        "u": "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements"
      },
      {
        "t": "Ativação de assinatura do Windows",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation"
      }
    ]
  },
  {
    "id": "Q160",
    "src": 160,
    "domain": 1,
    "skill": "2.1",
    "topic": "Ativação de assinatura",
    "type": "hotarea",
    "stem": "Sua rede contém um domínio do Active Directory local chamado contoso.com, sincronizado com o Azure AD.\n\nUm usuário chamado User1 usa os dispositivos ingressados no domínio mostrados na tabela a seguir.\n\n| Nome | Sistema operacional |\n|---|---|\n| Device1 | Windows 10 Pro |\n| Device2 | Windows 11 Pro |\n\nNo centro de administração do Microsoft Entra, você atribui uma licença do Windows 11 Enterprise E5 a User1.\n\nVocê precisa identificar o que ocorrerá na próxima vez que User1 entrar nos dispositivos.\n\nO que você deve identificar para cada dispositivo? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Device1:",
        "options": [
          "Será ativado como Windows 11 Enterprise",
          "Não será atualizado para o Windows 11 Enterprise",
          "Executará uma instalação limpa do Windows 11 Enterprise",
          "Executará uma atualização in-place para o Windows 11 Enterprise"
        ],
        "answer": 1
      },
      {
        "label": "Device2:",
        "options": [
          "Será ativado como Windows 11 Enterprise",
          "Não será atualizado para o Windows 11 Enterprise",
          "Executará uma instalação limpa do Windows 11 Enterprise",
          "Executará uma atualização in-place para o Windows 11 Enterprise"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A subscription activation só troca a **edição**: o Windows 10 Pro vira Windows **10** Enterprise e nunca é atualizado para o 11. O Windows 11 Pro é ativado como Windows 11 Enterprise (considerando os dispositivos hybrid joined pela sincronização com o Entra ID).",
    "details": "**Item a item**\n- **Device1 vira Windows 11:** a ativação não muda a versão.\n- **Clean install / in-place upgrade:** a subscription activation só ativa a edição Enterprise, sem instalar nada.",
    "docs": [
      {
        "t": "Ativação de assinatura do Windows",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Requisitos do Windows 11",
        "u": "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements"
      }
    ]
  },
  {
    "id": "Q162",
    "src": 162,
    "domain": 1,
    "skill": "2.1",
    "topic": "Windows Autopilot",
    "type": "match",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune.\n\nVocê planeja usar o Windows Autopilot para provisionar 25 dispositivos Windows 11.\n\nVocê precisa atender aos seguintes requisitos durante o provisionamento dos dispositivos:\n\n- Exibir o progresso das implantações de aplicativos e perfis.\n- Ingressar os dispositivos no Azure AD.\n\nO que você deve configurar para atender a cada requisito? Para responder, arraste as configurações apropriadas para os requisitos correspondentes. Cada configuração pode ser usada uma vez, mais de uma vez ou nenhuma vez.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "pool": [
      "Validação de CNAME",
      "Configurações de Cogerenciamento",
      "Perfis de Implantação",
      "Notificações de inscrição",
      "Página de Status de Inscrição"
    ],
    "targets": [
      {
        "label": "Exibir o progresso das implantações de aplicativos e perfis:",
        "answer": 4
      },
      {
        "label": "Ingressar os dispositivos no Azure AD:",
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A **Enrollment Status Page** mostra o progresso de apps e perfis. O tipo de join (Entra joined ou hybrid) é definido no **Autopilot deployment profile**.",
    "details": "**Item a item**\n- **ESP para join / deployment profile para progresso:** cada um tem uma função; o perfil define OOBE e join, e a ESP acompanha o provisionamento.",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q168",
    "src": 168,
    "domain": 1,
    "skill": "2.1",
    "topic": "Windows Autopilot",
    "type": "hotarea",
    "stem": "Você tem um tenant híbrido do Azure AD.\n\nVocê configura um perfil de implantação do Windows Autopilot conforme a imagem a seguir.\n\n### Tradução do texto da imagem\n\n**Criar perfil — PC Windows**\n\nEtapas: Informações básicas; Experiência inicial (OOBE); Atribuições; Revisar + criar.\n\n| Configuração | Valor selecionado |\n|---|---|\n| Modo de implantação | Controlado pelo usuário |\n| Ingressar no Azure AD como | Ingressado no Azure AD |\n| Termos de Licença de Software Microsoft | Ocultar (opção alternativa: Mostrar) |\n| Configurações de privacidade | Ocultar (opção alternativa: Mostrar) |\n| Ocultar opções de alteração de conta | Ocultar (opção alternativa: Mostrar) |\n| Tipo de conta de usuário | Padrão (opção alternativa: Administrador) |\n| Permitir implantação pré-provisionada | Não (opção alternativa: Sim) |\n| Idioma (região) | Padrão do sistema operacional |\n| Configurar o teclado automaticamente | Sim (opção alternativa: Não) |\n| Aplicar modelo de nome de dispositivo | Não (opção alternativa: Sim) |\n\nMensagens informativas: Informações importantes sobre como ocultar os termos de licença. O valor padrão para a coleta de dados de diagnóstico mudou nos dispositivos que executam o Windows 10 versão 1903 ou posterior, ou o Windows 11.\n\nUse as listas suspensas para selecionar a opção que completa cada afirmação com base nas informações apresentadas na imagem.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Para aplicar o perfil a um novo computador, primeiro você deve [answer choice].",
        "options": [
          "ingressar o dispositivo no Azure AD",
          "inscrever o dispositivo no Microsoft Intune",
          "importar um arquivo CSV para o Windows Autopilot"
        ],
        "answer": 2
      },
      {
        "label": "Quando o perfil do Windows Autopilot for aplicado a um computador, esse computador ficará [answer choice].",
        "options": [
          "somente ingressado no Azure AD",
          "somente registrado no Azure AD",
          "somente ingressado no Active Directory",
          "ingressado no Active Directory e registrado no Azure AD"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Um computador novo precisa primeiro ser **registrado no Autopilot** (importar o CSV com o hardware hash). O perfil está como **Azure AD joined**, então o computador fica só Entra joined, mesmo com o tenant híbrido.",
    "details": "**Item a item**\n- **Join / enroll antes:** o dispositivo novo só recebe o perfil depois de registrado no Autopilot.\n- **Registrado / AD only / AD + registro:** o perfil diz Azure AD joined.",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ],
    "exhibits": [
      {
        "src": "img/Q168-1.png",
        "alt": "Perfil Autopilot: controlado pelo usuário, ingressado no Azure AD, conta padrão"
      }
    ]
  },
  {
    "id": "Q169",
    "src": 169,
    "domain": 2,
    "skill": "3.2",
    "topic": "Edições e manutenção do Windows",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos.\n\nVocê planeja criar configurações de dispositivos Windows 11 para os departamentos de marketing e pesquisa. A solução deve atender aos seguintes requisitos:\n\n- Os dispositivos do departamento de marketing devem oferecer suporte ao Windows Update for Business.\n- Os dispositivos do departamento de pesquisa devem ter suporte a versões de atualização de recursos por até 36 meses após o lançamento.\n\nQual é a edição mínima do Windows 11 necessária para cada departamento? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
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
        "label": "Pesquisa:",
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
    "explanation": "O **Windows Update for Business** funciona a partir do **Pro**. As versões de feature update do Windows 11 têm 24 meses de suporte no Pro e **36 meses no Enterprise/Education** (lançamento anual do segundo semestre).",
    "details": "**Item a item**\n- **Marketing com Enterprise / Workstations:** o Pro já suporta WUfB (mínimo).\n- **Research com Pro:** 24 meses; 36 meses só no Enterprise/Education.",
    "docs": [
      {
        "t": "Overview of Windows as a service",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/update/waas-overview"
      },
      {
        "t": "Windows Update Management Overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/"
      },
      {
        "t": "Quick guide to Windows as a service",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/update/waas-quick-start"
      }
    ]
  },
  {
    "id": "Q170",
    "src": 170,
    "domain": 1,
    "skill": "2.1",
    "topic": "Windows Autopilot",
    "type": "single",
    "stem": "Você tem um tenant do Azure AD chamado contoso.com.\n\nVocê planeja usar o Windows Autopilot para configurar os dispositivos Windows 10 mostrados na tabela a seguir.\n\n| Nome | Memória | TPM |\n|---|---|---|\n| Device1 | 16 GB | Nenhum |\n| Device2 | 8 GB | Versão 1.2 |\n| Device3 | 4 GB | Versão 2.0 |\n\nQuais dispositivos podem ser configurados usando o modo de autoimplantação do Windows Autopilot?",
    "options": [
      "Somente Device2",
      "Somente Device3",
      "Somente Device1 e Device3",
      "Device1, Device2 e Device3"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O modo **self-deploying** usa o TPM para atestar o dispositivo e autenticar sem usuário, então exige **TPM 2.0**. A memória não é critério.",
    "details": "**Por que não as outras**\n- **Device1 (sem TPM) / Device2 (TPM 1.2):** o self-deploying exige TPM 2.0 com atestação.\n\n**Dica de prova:** O pre-provisioning (White Glove) também exige TPM 2.0.",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q171",
    "src": 171,
    "domain": 1,
    "skill": "2.1",
    "topic": "Ingresso híbrido com Autopilot",
    "type": "hotarea",
    "stem": "Sua rede contém um domínio do Active Directory Domain Services (AD DS) local, sincronizado com um tenant do Azure AD.\n\nVocê tem uma assinatura do Microsoft 365.\n\nVocê planeja usar o Windows Autopilot para implantar novos dispositivos Windows.\n\nVocê planeja criar um perfil de implantação.\n\nVocê precisa garantir que a implantação atenda aos seguintes requisitos:\n\n- Os dispositivos devem ser ingressados no AD DS independentemente do local em que estiverem sendo usados.\n- Os usuários do departamento de marketing devem ter um aplicativo de linha de negócios (LOB) instalado durante a implantação.\n\nA solução deve minimizar o esforço administrativo.\n\nO que você deve fazer para cada requisito? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Os dispositivos devem ser ingressados no AD DS independentemente do local de uso:",
        "options": [
          "Implantar a VPN Always On.",
          "Instalar o conector do Intune para Active Directory.",
          "Modificar o perfil de implantação do Autopilot.",
          "Editar as configurações de Cogerenciamento no Intune."
        ],
        "answer": 1
      },
      {
        "label": "Os usuários do departamento de marketing devem ter um aplicativo LOB instalado durante a implantação:",
        "options": [
          "Modificar o perfil de implantação do Autopilot.",
          "Criar uma implantação de aplicativo do Microsoft Intune.",
          "Criar um perfil de configuração de dispositivos no Intune."
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O join ao AD DS pelo Autopilot (hybrid join) exige o **Intune Connector for Active Directory**, que cria o objeto de computador no domínio. O app LOB é entregue por uma **atribuição de app do Intune** (bloqueante na ESP). Ponto de discussão: \"regardless of working location\" sugere também a opção **Skip AD connectivity check** no perfil, que exige VPN — parte da comunidade marca \"Modify the Autopilot deployment profile\".",
    "details": "**Item a item**\n- **Always On VPN:** ajuda, mas não cria o objeto de computador.\n- **Co-management:** é para ConfigMgr + Intune.\n- **Configuration profile para o app:** apps são entregues por atribuição de app, não por perfil.\n\n**Dica de prova:** Para dispositivos remotos, o perfil precisa de \"Skip AD connectivity check\" e uma VPN que conecte antes do logon.",
    "docs": [
      {
        "t": "Enrollment for Microsoft Entra hybrid joined devices - Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/windows-autopilot-hybrid"
      },
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q172",
    "src": 172,
    "domain": 2,
    "skill": "2.2",
    "topic": "WinRM (GPO)",
    "type": "multi",
    "stem": "Você tem 200 computadores que executam o Windows 10 e estão ingressados em um domínio do Active Directory.\n\nVocê precisa habilitar o Windows Remote Management (WinRM) em todos os computadores usando a Política de Grupo.\n\nQuais três ações você deve executar? Cada resposta correta apresenta parte da solução.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "Habilitar a configuração Permitir acesso ao Shell Remoto.",
      "Habilitar a configuração Permitir gerenciamento de servidor remoto por meio do WinRM.",
      "Definir o Tipo de Inicialização do serviço Windows Remote Management (WS-Management) como Automático.",
      "Habilitar a configuração Windows Defender Firewall: Permitir exceções de entrada da Área de Trabalho Remota.",
      "Definir o Tipo de Inicialização do serviço Registro Remoto como Automático.",
      "Habilitar a configuração Windows Defender Firewall: Permitir exceção de entrada de administração remota."
    ],
    "answer": [
      1,
      2,
      5
    ],
    "shuffle": false,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Via GPO são três peças: habilitar o **listener** (Allow remote server management through WinRM), colocar o **serviço WinRM** em automático e liberar o **firewall** para administração remota.",
    "details": "**Por que não as outras**\n- **Allow Remote Shell:** só controla o WinRS; não habilita o listener.\n- **Exceção do Remote Desktop:** é RDP, não WinRM.\n- **Remote Registry:** sem relação.\n\n**Dica de prova:** Os três itens equivalem ao que o Enable-PSRemoting faz localmente.",
    "docs": [
      {
        "t": "Installation and configuration for Windows Remote Management - Win32 apps",
        "u": "https://learn.microsoft.com/en-us/windows/win32/winrm/installation-and-configuration-for-windows-remote-management"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q173",
    "src": 173,
    "domain": 1,
    "skill": "2.1",
    "topic": "Ativação de assinatura",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 Business Standard e 100 dispositivos Windows 10 Pro.\n\nVocê compra uma assinatura do Microsoft 365 E5.\n\nVocê precisa atualizar os dispositivos Windows 10 Pro para o Windows 10 Enterprise. A solução deve minimizar o esforço administrativo.\n\nQual método de atualização você deve usar?",
    "options": [
      "Windows Autopilot",
      "uma implantação lite-touch do Microsoft Deployment Toolkit (MDT)",
      "Ativação de Assinatura",
      "uma atualização in-place usando a mídia de instalação do Windows"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O M365 E5 inclui Windows Enterprise E5. A **subscription activation** eleva Pro → Enterprise no login do usuário licenciado, sem reinstalar nada.",
    "details": "**Por que não as outras**\n- **Autopilot:** reprovisiona; é mais esforço.\n- **MDT / in-place com mídia:** reinstalam ou atualizam, sem necessidade.\n\n**Dica de prova:** Os dispositivos precisam ser Entra joined ou hybrid joined para a ativação.",
    "docs": [
      {
        "t": "Ativação de assinatura do Windows",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Requisitos do Windows 11",
        "u": "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements"
      }
    ]
  },
  {
    "id": "Q174",
    "src": 174,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
    "type": "yesno",
    "stem": "Você tem dispositivos sem root inscritos no Microsoft Intune, conforme a tabela a seguir.\n\n| Nome | Plataforma | Endereço IP |\n|---|---|---|\n| Device1 | Windows | 192.168.10.35 |\n| Device2 | Android | 10.10.10.40 |\n| Device3 | Android | 192.168.10.10 |\n\nOs dispositivos são membros de um grupo chamado Group1.\n\nNo Intune, você cria um local de conformidade de dispositivos com as seguintes configurações:\n\n- Nome: Network1\n- Intervalo IPv4: 192.168.0.0/16\n\nNo Intune, você cria uma política de conformidade de dispositivos para a plataforma Android. A política tem as seguintes configurações:\n\n- Nome: Policy1\n- Integridade do dispositivo: Dispositivos com root: Bloquear\n- Locais: Local: Network1\n- Marcar dispositivo como não conforme: Imediatamente\n- Atribuído: Group1\n\nA política de conformidade de dispositivos do Intune tem as seguintes configurações:\n\n- Marcar dispositivos sem política de conformidade atribuída como: Em conformidade\n- Detecção aprimorada de jailbreak: Habilitada\n- Período de validade do status de conformidade (dias): 20\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "Device1 é marcado como em conformidade.",
      "Device2 é marcado como em conformidade.",
      "Device3 é marcado como em conformidade."
    ],
    "answer": [
      true,
      false,
      true
    ],
    "scope": "borderline",
    "review": "ok",
    "explanation": "Device1 é Windows e não recebe a política de Android; sem política, conta como **Compliant**. Device2 está fora da faixa 192.168.0.0/16 → não conforme imediatamente. Device3 está dentro da faixa e não tem root → conforme. Borderline porque locations só funcionam no Android device administrator, já descontinuado.",
    "details": "**Item a item**\n- **Device1 (Windows):** Sim. Sem política aplicável, o tenant marca como Compliant.\n- **Device2:** Não. Fora da location exigida.\n- **Device3:** Sim. Na location e sem root.\n\n**Dica de prova:** Locations e device administrator estão descontinuados; questão do modelo antigo.",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q175",
    "src": 175,
    "domain": 1,
    "skill": "1.1",
    "topic": "Registro no Microsoft Entra",
    "type": "single",
    "stem": "Você precisa implementar o gerenciamento de dispositivos móveis (MDM) para dispositivos pessoais que executam o Windows 11. A solução deve atender aos seguintes requisitos:\n\n- Garantir que você possa gerenciar os dispositivos pessoais usando o Microsoft Intune.\n- Garantir que os usuários possam acessar os dados da empresa de forma transparente em seus dispositivos pessoais.\n- Garantir que os usuários só possam entrar nos dispositivos pessoais usando suas contas pessoais.\n\nO que você deve usar para adicionar os dispositivos ao Azure AD?",
    "options": [
      "Registro no Azure AD",
      "Ingresso híbrido no Azure AD",
      "Ingresso no Azure AD"
    ],
    "answer": 0,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "Em dispositivos pessoais (BYOD), o usuário continua entrando com a **conta pessoal** e adiciona a conta de trabalho, o que faz o **Entra registration** (com inscrição no MDM). No Entra join, o logon passa a ser com a conta corporativa.",
    "details": "**Por que não as outras**\n- **Hybrid join:** exige domínio AD.\n- **Entra joined:** o logon passaria a ser com a conta corporativa, o que contraria o requisito.\n\n**Dica de prova:** Com \"Allow my organization to manage my device\" na adição da conta, o dispositivo se inscreve no Intune como pessoal.",
    "docs": [
      {
        "t": "What are Microsoft Entra registered devices? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/concept-device-registration"
      }
    ]
  },
  {
    "id": "Q176",
    "src": 176,
    "domain": 3,
    "skill": "1.3",
    "topic": "Acesso Condicional e conformidade",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365.\n\nTodos os computadores estão inscritos no Microsoft Intune.\n\nVocê tem os requisitos de negócios para proteger o ambiente Windows 11 mostrados na tabela a seguir.\n\n| Requisito | Detalhe |\n|---|---|\n| Requirement1 | Garantir que o Microsoft Exchange Online possa ser acessado somente de locais conhecidos. |\n| Requirement2 | Bloquear um dispositivo com uma pontuação de risco alta do Microsoft Defender for Endpoint. |\n\nO que você deve implementar para atender a cada requisito? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Requirement1:",
        "options": [
          "Uma política de Acesso Condicional",
          "Uma política de conformidade de dispositivos",
          "Um perfil de configuração de dispositivos"
        ],
        "answer": 0
      },
      {
        "label": "Requirement2:",
        "options": [
          "Uma política de Acesso Condicional",
          "Uma política de conformidade de dispositivos",
          "Um perfil de configuração de dispositivos"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Restringir acesso a um app por localização (named locations) é **Conditional Access**. Reagir ao risco de máquina do Defender (Require the device to be at or under the machine risk score, com ação de não conformidade como bloqueio remoto) é feito na **compliance policy**.",
    "details": "**Item a item**\n- **Compliance / configuration para o Requirement1:** localização de acesso a um app é condição de CA.\n- **CA / configuration para o Requirement2:** o risco do MDE entra na compliance policy; o CA usa o resultado.",
    "docs": [
      {
        "t": "Use Conditional Access with Microsoft Intune compliance policies - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/conditional-access-integration/overview"
      },
      {
        "t": "How to Require Device Compliance with Conditional Access - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance"
      }
    ]
  },
  {
    "id": "Q177",
    "src": 177,
    "domain": 2,
    "skill": "1.3",
    "topic": "RBAC do Intune",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém dois grupos de segurança chamados Group1 e Group2. O Microsoft 365 usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos.\n\nVocê precisa atribuir funções no Intune para atender aos seguintes requisitos:\n\n- Os membros de Group1 devem gerenciar funções e atribuições do Intune.\n- Os membros de Group2 devem atribuir aplicativos e políticas existentes a usuários e dispositivos.\n\nA solução deve seguir o princípio do menor privilégio.\n\nQual função você deve atribuir a cada grupo? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Group1:",
        "options": [
          "Operador de Suporte Técnico",
          "Administrador de Funções do Intune",
          "Administrador de Serviço do Intune",
          "Gerenciador de Políticas e Perfis"
        ],
        "answer": 1
      },
      {
        "label": "Group2:",
        "options": [
          "Operador de Suporte Técnico",
          "Administrador de Funções do Intune",
          "Administrador de Serviço do Intune",
          "Gerenciador de Políticas e Perfis"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "**Intune Role Administrator** gerencia funções personalizadas e atribuições de RBAC. Pela documentação, o **Help Desk Operator** \"executa tarefas remotas e pode atribuir apps ou políticas existentes a usuários e dispositivos\", sem criar novos — o mínimo exigido. Intune Service Administrator é uma função do Entra com acesso total.",
    "details": "**Item a item**\n- **Help Desk Operator para o Group1:** não gerencia funções.\n- **Intune Service Administrator:** Entra role com acesso total; excesso.\n- **Policy and Profile Manager para o Group2:** cria e gerencia políticas (mais do que atribuir).\n\n**Dica de prova:** Funções do Intune podem ter escopo por scope tags e grupos (assignments).",
    "docs": [
      {
        "t": "Role-based access control (RBAC) with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/role-based-access-control/overview"
      },
      {
        "t": "Create a custom role in Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/role-based-access-control/create-custom-role"
      },
      {
        "t": "Windows 365 role-based access",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/role-based-access"
      }
    ]
  },
  {
    "id": "Q178",
    "src": 178,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
    "type": "yesno",
    "stem": "Você tem dispositivos inscritos no Microsoft Intune, conforme a tabela a seguir.\n\n| Nome | Plataforma | Criptografia | Inicialização Segura | Membro de |\n|---|---|---|---|---|\n| Device1 | Windows 10 | Sim | Não | Group1 |\n| Device2 | Windows 10 | Não | Sim | Group2 |\n| Device3 | Android | Não | Não se aplica | Group3 |\n\nO Intune inclui as políticas de conformidade de dispositivos mostradas na tabela a seguir.\n\n| Nome | Plataforma | Criptografia | Inicialização Segura |\n|---|---|---|---|\n| Policy1 | Windows 10 | Não configurado | Não configurado |\n| Policy2 | Windows 10 | Não configurado | Obrigatório |\n| Policy3 | Windows 10 | Obrigatório | Obrigatório |\n| Policy4 | Android | Não configurado | Não se aplica |\n\nAs políticas de conformidade de dispositivos têm as atribuições mostradas na tabela a seguir.\n\n| Nome | Atribuída a |\n|---|---|\n| Policy1 | Group1 |\n| Policy2 | Group1, Group2 |\n| Policy3 | Group3 |\n| Policy4 | Group3 |\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "Device1 é marcado como em conformidade.",
      "Device2 é marcado como em conformidade.",
      "Device3 é marcado como em conformidade."
    ],
    "answer": [
      false,
      true,
      true
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Device1 recebe Policy2, que exige Secure Boot, e não tem → não conforme. Device2 recebe Policy2 e tem Secure Boot → conforme. Device3 é Android: Policy3 é de Windows e não se aplica; Policy4 não exige nada → conforme.",
    "details": "**Item a item**\n- **Device1:** Não. A Policy2 exige Secure Boot.\n- **Device2:** Sim. Tem Secure Boot.\n- **Device3 (Android):** Sim. Só a Policy4 se aplica, e ela não exige nada.",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q179",
    "src": 179,
    "domain": 3,
    "skill": "1.3",
    "topic": "Acesso Condicional e conformidade",
    "type": "yesno",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém um usuário chamado User1. A assinatura contém dispositivos inscritos no Microsoft Intune, conforme a tabela a seguir.\n\n| Nome | Plataforma | Membro de | Descrição |\n|---|---|---|---|\n| Device1 | Windows 11 | Group1 | A criptografia de disco não está configurada. |\n| Device2 | Windows 10 | Group2 | A criptografia de disco está configurada. |\n| Device3 | Android | Group3 | O armazenamento local do dispositivo não está criptografado. |\n\nO Microsoft Edge está disponível em todos os dispositivos.\n\nO Intune tem as políticas de conformidade de dispositivos mostradas na tabela a seguir.\n\n| Nome | Plataforma | Configuração | Aplicada a |\n|---|---|---|---|\n| Compliance1 | Windows 10 e posteriores | Exigir criptografia do armazenamento de dados no dispositivo | Group2 |\n| Compliance2 | Android Enterprise | Exigir criptografia do armazenamento de dados no dispositivo | Group3 |\n\nAs configurações de política de conformidade são as seguintes: Marcar dispositivos sem política de conformidade atribuída como: **Em conformidade** · Detecção aprimorada de jailbreak: Desabilitada · Período de validade do status de conformidade (dias): 30.\n\nVocê cria a seguinte política de Acesso Condicional:\n\n- Nome: Policy1\n- Atribuições — Usuários e grupos: User1 · Aplicativos de nuvem ou ações: Office 365 SharePoint Online\n- Controles de acesso — Conceder: Exigir que o dispositivo seja marcado como em conformidade\n- Habilitar política: Ativado\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "User1 pode acessar o Microsoft SharePoint Online de Device1 usando o Microsoft Edge.",
      "User1 pode acessar o Microsoft SharePoint Online de Device2 usando o Microsoft Edge.",
      "User1 pode acessar o Microsoft SharePoint Online de Device3 usando o Microsoft Edge."
    ],
    "answer": [
      true,
      true,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Device1 não tem política atribuída e o tenant marca esses dispositivos como **Compliant** → acessa. Device2 tem criptografia, como Compliance1 exige → acessa. Device3 não tem armazenamento criptografado e falha em Compliance2 → bloqueado pelo CA.",
    "details": "**Item a item**\n- **Device1:** Sim. Sem política atribuída, e o tenant marca como Compliant.\n- **Device2:** Sim. Atende a Compliance1.\n- **Device3:** Não. Sem criptografia, falha na Compliance2, e o CA bloqueia.\n\n**Dica de prova:** Para o CA reconhecer o dispositivo no Edge, entre no perfil do Edge com a conta de trabalho (ou use a extensão no Chrome).",
    "docs": [
      {
        "t": "Use Conditional Access with Microsoft Intune compliance policies - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/conditional-access-integration/overview"
      },
      {
        "t": "How to Require Device Compliance with Conditional Access - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance"
      }
    ]
  },
  {
    "id": "Q180",
    "src": 180,
    "domain": 1,
    "skill": "1.1",
    "topic": "Ingresso no Microsoft Entra",
    "type": "single",
    "stem": "Você tem um tenant do Azure AD chamado contoso.com.\n\nVocê precisa garantir que os usuários não sejam adicionados automaticamente ao grupo local Administradores ao ingressarem seus dispositivos Windows 11 em contoso.com.\n\nO que você deve configurar?",
    "options": [
      "Windows Autopilot",
      "pacotes de provisionamento para Windows",
      "Padrões de segurança no Azure AD",
      "Configurações de dispositivo no Azure AD"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Em **Entra ID > Devices > Device settings** está a opção \"Registering user is added as local administrator on the device during Microsoft Entra join\". Definindo como None, o usuário deixa de virar admin local.",
    "details": "**Por que não as outras**\n- **Autopilot:** tem a opção \"User account type = Standard\", mas a pergunta é sobre o join manual.\n- **Provisioning packages:** não mudam o comportamento do join.\n- **Security defaults:** sem relação.\n\n**Dica de prova:** A mesma tela define \"Additional local administrators on all Microsoft Entra joined devices\".",
    "docs": [
      {
        "t": "Plan your Microsoft Entra join deployment - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/device-join-plan"
      },
      {
        "t": "Join Windows 11 Devices to Microsoft Entra ID During OOBE - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/device-join-out-of-box"
      }
    ]
  },
  {
    "id": "Q181",
    "src": 181,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
    "type": "single",
    "stem": "Sua empresa tem dispositivos inscritos no Microsoft Intune, conforme a tabela a seguir.\n\n| Nome | Plataforma |\n|---|---|\n| Device1 | Windows 10 |\n| Device2 | Administrador de dispositivo Android |\n| Device3 | iOS |\n\nNo centro de administração do Microsoft Intune, você define a rede da empresa como um local chamado Location1.\n\nQuais dispositivos podem usar políticas de conformidade baseadas em local de rede?",
    "options": [
      "Somente Device1",
      "Somente Device2",
      "Somente Device1 e Device2",
      "Somente Device2 e Device3",
      "Device1, Device2 e Device3"
    ],
    "answer": 1,
    "answer_original": 4,
    "shuffle": false,
    "scope": "borderline",
    "review": "corrigida",
    "explanation": "A regra de **Locations** (localização de rede) em políticas de conformidade é suportada apenas para **Android device administrator**. O dump marcava os três dispositivos. Como o Android device administrator está descontinuado, a questão ficou como borderline.",
    "details": "**Por que não as outras**\n- **Windows / iOS:** compliance por localização de rede nunca foi suportada nessas plataformas.\n\n**Dica de prova:** Para restringir por rede no Windows, use o CA com named locations ou o compliant network do Global Secure Access.",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q182",
    "src": 182,
    "domain": 5,
    "skill": "5.2",
    "topic": "Azure Monitor",
    "type": "single",
    "stem": "Você tem uma assinatura do Azure.\n\nVocê tem um dispositivo Windows 11 local chamado Device1.\n\nVocê planeja monitorar Device1 usando o Azure Monitor.\n\nVocê cria uma regra de coleta de dados (DCR) chamada DCR1 na assinatura.\n\nA que você deve associar DCR1?",
    "options": [
      "Azure Network Watcher",
      "Device1",
      "um workspace do Log Analytics",
      "um Objeto Monitorado"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "Para clientes Windows com o Azure Monitor Agent (instalador de cliente), a DCR é associada a um **Monitored Object** criado no tenant, que representa os dispositivos Entra joined. VMs do Azure/Arc é que recebem a DCR diretamente.",
    "details": "**Por que não as outras**\n- **Network Watcher / workspace:** a DCR aponta para o workspace (destino), mas a associação é com o recurso monitorado.\n- **Device1:** clientes Windows fora do Azure não são recursos ARM; por isso existe o Monitored Object.",
    "docs": [
      {
        "t": "Encaminhar logs para o Azure Monitor usando o Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/governance/integrate-azure-monitor"
      },
      {
        "t": "Set Up the Azure Monitor Agent on Windows Client Devices - Azure Monitor",
        "u": "https://learn.microsoft.com/en-us/azure/azure-monitor/agents/azure-monitor-agent-windows-client"
      },
      {
        "t": "Relatórios do Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/overview"
      },
      {
        "t": "Usar APIs do Graph para exportar relatórios do Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/export-graph-apis"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/azure/azure-monitor/agents/azure-monitor-agent-windows-client"
    ]
  },
  {
    "id": "Q183",
    "src": 183,
    "domain": 2,
    "skill": "3.2",
    "topic": "Anéis de atualização do Windows",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos.\n\nVocê precisa configurar um anel de atualização que atenda aos seguintes requisitos:\n\n- Correções e melhorias nas funcionalidades existentes do Windows podem ser adiadas por 14 dias, mas serão instaladas automaticamente sete dias após essa data.\n- A instalação de novos recursos do Windows pode ser adiada por 90 dias, mas ocorrerá automaticamente 10 dias após essa data.\n- Os dispositivos devem reiniciar automaticamente três dias após a instalação de uma atualização.\n\nComo você deve configurar o anel de atualização? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Período de adiamento de atualizações de recursos (dias):",
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
        "label": "Período de adiamento de atualizações de qualidade (dias):",
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
        "label": "Prazo para atualizações de recursos:",
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
        "label": "Período de carência:",
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
    "explanation": "Feature deferral = **90**, quality deferral = **14**, deadline de feature = **10** (contado depois que a atualização é oferecida) e **grace period = 3** dias para o reinício automático. O deadline de quality (7) não estava entre os campos pedidos.",
    "details": "**Item a item**\n- **Feature deferral 14 / quality 90:** valores trocados.\n- **Deadline de feature 7 / 14:** o requisito diz 10 dias depois do adiamento.\n- **Grace period 7 / 10:** o reinício automático é 3 dias após a instalação.",
    "docs": [
      {
        "t": "Gerenciar políticas de anéis de atualização do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-update-rings"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Gerenciar atualizações de qualidade do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-quality-updates"
      }
    ]
  },
  {
    "id": "Q184",
    "src": 184,
    "domain": 3,
    "skill": "3.1",
    "topic": "Defender for Endpoint",
    "type": "multi",
    "layout": "panel",
    "panelTitle": "Microsoft 365 Defender",
    "stem": "Você tem uma assinatura do Microsoft 365 E5.\n\nVocê precisa analisar e implementar a integração de dispositivos ao Microsoft 365 Defender. A solução deve atender aos seguintes requisitos:\n\n- Visualizar os dispositivos integrados que têm a versão do Microsoft Edge baseada em Chromium instalada.\n- Baixar um pacote de integração para um dispositivo Windows 11.\n- Minimizar o esforço administrativo.\n\nQuais duas configurações você deve usar no portal do Microsoft 365 Defender? Para responder, selecione as configurações apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "options": [
      "Ativos › Dispositivos",
      "Ativos › Identidades",
      "Gerenciamento de vulnerabilidades › Painel",
      "Gerenciamento de vulnerabilidades › Recomendações",
      "Gerenciamento de vulnerabilidades › Correção",
      "Gerenciamento de vulnerabilidades › Inventários",
      "Gerenciamento de vulnerabilidades › Pontos fracos",
      "Gerenciamento de vulnerabilidades › Linha do tempo de eventos",
      "Gerenciamento de configuração",
      "Relatórios",
      "Auditoria",
      "Integridade",
      "Permissões e funções",
      "Configurações"
    ],
    "answer": [
      0,
      13
    ],
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O inventário **Devices** mostra os dispositivos integrados e permite filtrar pelo software instalado. O pacote de onboarding é baixado em **Settings > Endpoints > Onboarding**.",
    "details": "**Por que não as outras**\n- **Identities:** contas, não dispositivos.\n- **Vulnerability management (várias):** inventário de software fica em Inventories, mas para \"dispositivos integrados com o Edge\" o gabarito usa Devices.\n- **Reports / Audit / Health / Permissions / Configuration management:** não baixam o pacote de onboarding.",
    "docs": [
      {
        "t": "Integrate Microsoft Defender for Endpoint with Intune for Device Compliance - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/microsoft-defender/overview"
      },
      {
        "t": "Deploy endpoint detection and response policy with Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/deploy-edr"
      }
    ]
  },
  {
    "id": "Q185",
    "src": 185,
    "domain": 3,
    "skill": "3.1",
    "topic": "Proteção contra adulteração",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém 500 computadores que executam o Windows 11. Os computadores estão ingressados no Azure AD e inscritos no Microsoft Intune.\n\nVocê planeja gerenciar o Microsoft Defender Antivirus nos computadores.\n\nVocê precisa impedir que os usuários desabilitem o Microsoft Defender Antivirus.\n\nO que você deve fazer?",
    "options": [
      "No centro de administração do Microsoft Intune, criar uma linha de base de segurança.",
      "No portal do Microsoft 365 Defender, habilitar a proteção contra adulteração.",
      "No centro de administração do Microsoft Intune, criar uma política de proteção de conta.",
      "No centro de administração do Microsoft Intune, criar uma política de detecção e resposta de endpoint (EDR)."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O **tamper protection** impede que usuários (inclusive admins locais) desliguem o Defender Antivirus. Pode ser ligado para o tenant inteiro no **portal do Defender** (Settings > Endpoints > Advanced features) ou por política de Antivirus no Intune — entre as opções desta questão, B é a correta.",
    "details": "**Por que não as outras**\n- **Security baseline:** configura muitas coisas, mas não impede desligar o Defender (sem tamper protection).\n- **Account protection / EDR:** outras funções.\n\n**Dica de prova:** O tamper protection também protege exclusões (quando gerenciado pelo Intune) e configurações de proteção em tempo real.",
    "docs": [
      {
        "t": "Tamper protection overview - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/tamper-protection-overview"
      },
      {
        "t": "Manage antivirus settings with endpoint security policies in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/antivirus"
      }
    ]
  },
  {
    "id": "Q186",
    "src": 186,
    "domain": 5,
    "skill": "5.2",
    "topic": "Azure Monitor",
    "type": "hotarea",
    "stem": "Você tem 1.000 computadores que executam o Windows 10 e são membros de um domínio do Active Directory.\n\nVocê precisa capturar os logs de eventos dos computadores e enviá-los para o Azure.\n\nO que você deve fazer? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Serviço do Azure a provisionar:",
        "options": [
          "Uma conta do Azure Storage",
          "Azure Cosmos DB",
          "Azure SQL Database",
          "Log Analytics"
        ],
        "answer": 3
      },
      {
        "label": "Ação a executar nos computadores:",
        "options": [
          "Criar uma assinatura iniciada pelo coletor",
          "Instalar o Azure Monitor Agent",
          "Inscrever no Microsoft Intune",
          "Registrar no Azure AD"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Logs de eventos vão para um **workspace do Log Analytics**, coletados pelo **Azure Monitor Agent** nos computadores, com regras de coleta (DCR) definindo quais logs enviar.",
    "details": "**Item a item**\n- **Storage / Cosmos DB / SQL:** não são o destino nativo de eventos do Windows.\n- **Collector-initiated subscription:** é o WEF (on-premises).\n- **Intune / registro no Entra:** não coletam logs (o Entra join é pré-requisito do AMA client).\n\n**Dica de prova:** Para computadores de domínio fora do Azure, o caminho comum é o Azure Arc + AMA.",
    "docs": [
      {
        "t": "Encaminhar logs para o Azure Monitor usando o Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/governance/integrate-azure-monitor"
      },
      {
        "t": "Relatórios do Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/overview"
      },
      {
        "t": "Usar APIs do Graph para exportar relatórios do Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/export-graph-apis"
      }
    ]
  },
  {
    "id": "Q187",
    "src": 187,
    "domain": 2,
    "skill": "3.2",
    "topic": "Atualizações de recursos",
    "type": "single",
    "stem": "Você tem um computador chamado Computer5 com o Windows 10 instalado.\n\nVocê cria um script do Windows PowerShell chamado config.ps1.\n\nVocê precisa garantir que config.ps1 seja executado após a instalação de atualizações de recursos em Computer5.\n\nQual arquivo você deve modificar em Computer5?",
    "options": [
      "LiteTouch.wsf",
      "SetupConfig.ini",
      "Unattend.bat",
      "Unattend.xml"
    ],
    "answer": 1,
    "scope": "borderline",
    "review": "ok",
    "explanation": "O **SetupConfig.ini** (em %SystemDrive%\\Users\\Default\\AppData\\Local\\Microsoft\\Windows\\WSUS) passa parâmetros ao setup das feature updates, como `PostOOBE=` com o script a executar depois da atualização.",
    "details": "**Por que não as outras**\n- **LiteTouch.wsf:** é do MDT.\n- **Unattend.bat / Unattend.xml:** usados na instalação limpa, não no setup de feature updates.\n\n**Dica de prova:** O SetupConfig.ini também aceita outros parâmetros do setup (ex.: /DynamicUpdate Disable).",
    "docs": [
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Gerenciar políticas de anéis de atualização do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-update-rings"
      },
      {
        "t": "Gerenciar atualizações de qualidade do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-quality-updates"
      }
    ]
  },
  {
    "id": "Q188",
    "src": 188,
    "domain": 2,
    "skill": "2.3",
    "topic": "Certificados",
    "type": "hotarea",
    "stem": "Você tem um tenant do Microsoft 365 e uma autoridade de certificação (CA) interna.\n\nVocê precisa usar o Microsoft Intune para implantar o certificado da CA raiz em dispositivos gerenciados.\n\nQual tipo de política do Intune e modelo de tipo de perfil você deve usar? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Tipo de política:",
        "options": [
          "Política de configuração de aplicativos",
          "Política de proteção de aplicativos",
          "Política de conformidade",
          "Perfil de configuração"
        ],
        "answer": 3
      },
      {
        "label": "Modelo de tipo de perfil:",
        "options": [
          "Certificado de par de chaves públicas (PKCS) importado",
          "Certificado de par de chaves públicas (PKCS)",
          "Certificado do Protocolo SCEP",
          "Certificado confiável"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A CA raiz é distribuída por um **perfil de configuração** do tipo **Trusted certificate**. Os perfis PKCS e SCEP emitem certificados de usuário/dispositivo e dependem desse perfil de raiz.",
    "details": "**Item a item**\n- **App config / app protection / compliance:** não distribuem certificados.\n- **PKCS imported / PKCS / SCEP:** emitem certificados finais e dependem do perfil de raiz.",
    "docs": [
      {
        "t": "Types of certificate that are supported by Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/certificates/overview"
      },
      {
        "t": "Microsoft Cloud PKI for Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/cloud-pki/"
      },
      {
        "t": "Configure Microsoft Cloud PKI root and issuing CA for Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/cloud-pki/configure-ca"
      }
    ]
  },
  {
    "id": "Q189",
    "src": 189,
    "domain": 3,
    "skill": "3.1",
    "topic": "Grupos de dispositivos do Defender",
    "type": "hotarea",
    "stem": "Sua empresa usa o Microsoft Defender for Endpoint. O Microsoft Defender for Endpoint inclui os grupos de dispositivos mostrados na tabela a seguir.\n\n| Classificação | Nome | Membros |\n|---|---|---|\n| 1 | Group1 | Marca igual a demo e sistema operacional entre Windows 10 |\n| 2 | Group2 | Marca igual a demo |\n| 3 | Group3 | Domínio igual a adatum.com |\n| 4 | Group4 | Domínio igual a adatum.com e sistema operacional entre Windows 10 |\n| 5 | Group5 | Nome começa com COMP |\n| Última | Dispositivos não agrupados (padrão) | Não se aplica |\n\nVocê integra ao Microsoft Defender for Endpoint um computador com as seguintes propriedades:\n\n- Nome: computer1\n- Domínio: adatum.com\n- Sistema operacional: Windows10 64-bit (Build 17134)\n\nQual é o efeito da configuração do Microsoft Defender for Endpoint? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Computer1 será membro de:",
        "options": [
          "Somente Group3",
          "Somente Group4",
          "Somente Group5",
          "Somente Group3, Group4 e Group5"
        ],
        "answer": 0
      },
      {
        "label": "Se você adicionar a marca demo a Computer1, Computer1 será membro de:",
        "options": [
          "Somente Group1",
          "Somente Group2",
          "Somente Group1 e Group2",
          "Group1, Group2, Group3, Group4 e Group5"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "No Defender for Endpoint, um dispositivo entra **só no primeiro grupo** (pelo rank) cujas regras ele atende. Sem tag, a primeira correspondência é Group3 (domínio). Com a tag demo e Windows 10, a primeira é Group1.",
    "details": "**Item a item**\n- **Group4 ou Group5 sem tag:** o computador entra só no primeiro grupo (rank) que corresponder.\n- **Vários grupos com tag:** idem; a regra do Group1 (tag demo + Windows 10) tem o menor rank.",
    "docs": [
      {
        "t": "Create and manage device groups in Microsoft Defender for Endpoint - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/machine-groups"
      },
      {
        "t": "Integrate Microsoft Defender for Endpoint with Intune for Device Compliance - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/microsoft-defender/overview"
      },
      {
        "t": "Deploy endpoint detection and response policy with Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/deploy-edr"
      }
    ]
  },
  {
    "id": "Q190",
    "src": 190,
    "domain": 5,
    "skill": "5.2",
    "topic": "Relatórios",
    "type": "single",
    "stem": "Você gerencia 1.000 dispositivos usando o Microsoft Intune.\n\nVocê examina o relatório Tendências de conformidade de dispositivos.\n\nPor quanto tempo o relatório exibirá dados de tendências?",
    "options": [
      "30 dias",
      "60 dias",
      "90 dias",
      "365 dias"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O relatório **Device compliance trends** mostra os últimos **60 dias**.",
    "details": "**Por que não as outras**\n- **30 / 90 / 365 dias:** o relatório de tendência mostra 60 dias.\n\n**Dica de prova:** Para histórico maior, use o Data Warehouse ou exporte os relatórios (Graph).",
    "docs": [
      {
        "t": "Relatórios do Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/overview"
      },
      {
        "t": "Usar APIs do Graph para exportar relatórios do Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/export-graph-apis"
      },
      {
        "t": "Encaminhar logs para o Azure Monitor usando o Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/governance/integrate-azure-monitor"
      }
    ]
  },
  {
    "id": "Q191",
    "src": 191,
    "domain": 2,
    "skill": "3.2",
    "topic": "Atualizações do iOS",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 E5 que contém 100 dispositivos iOS inscritos no Microsoft Intune.\n\nVocê precisa garantir que as notificações de atualizações do iOS sejam adiadas por 30 dias após o lançamento das atualizações.\n\nO que você deve criar?",
    "options": [
      "um perfil de provisionamento de aplicativos iOS",
      "um perfil de configuração de dispositivos baseado nos modelos de Recursos do dispositivo",
      "uma política de atualização para iOS/iPadOS",
      "um perfil de configuração de dispositivos baseado no modelo de Restrições de dispositivo"
    ],
    "answer": 3,
    "scope": "in",
    "review": "ok",
    "explanation": "O adiamento da **visibilidade** de atualizações (\"Defer software updates\", até 90 dias) fica no perfil de **Device restrictions** para dispositivos supervisionados. A update policy de iOS instala versões, não adia a notificação.",
    "details": "**Por que não as outras**\n- **App provisioning profile:** é para apps LOB.\n- **Device features:** AirPrint, Home screen etc.\n- **Update policy:** instala versões; não adia notificações.",
    "docs": [
      {
        "t": "Use Microsoft Intune to manage software updates for supervised iOS/iPadOS devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios"
      },
      {
        "t": "Configure Update Policies for Apple Devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/apple/"
      }
    ]
  },
  {
    "id": "Q192",
    "src": 192,
    "domain": 2,
    "skill": "2.2",
    "topic": "Perfis de configuração de dispositivos",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Intune e contém 100 dispositivos Windows 10.\n\nVocê precisa criar perfis de configuração do Intune para executar as seguintes ações nos dispositivos:\n\n- Implantar um layout personalizado do menu Iniciar.\n- Renomear a conta local Administrador.\n\nQual modelo de tipo de perfil você deve usar para cada ação? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Implantar um layout personalizado do menu Iniciar:",
        "options": [
          "Otimização de entrega",
          "Restrição de dispositivos",
          "Proteção de endpoint",
          "Proteção de identidade"
        ],
        "answer": 1
      },
      {
        "label": "Renomear a conta local Administrador:",
        "options": [
          "Otimização de entrega",
          "Restrição de dispositivos",
          "Proteção de endpoint",
          "Proteção de identidade"
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
    "explanation": "O layout do Menu Iniciar fica em **Device restrictions > Start**. Renomear a conta Administrator local fica em **Endpoint protection > Local device security options > Accounts**. Identity protection só cobre o Windows Hello for Business. O dump marcava Identity protection na segunda.",
    "details": "**Item a item**\n- **Start layout em Endpoint protection / Identity protection:** o layout do Iniciar fica em Device restrictions.\n- **Renomear o Administrator em Device restriction / Identity protection:** fica em Endpoint protection > Local device security options.\n- **Delivery optimization:** sem relação.",
    "docs": [
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q193",
    "src": 193,
    "domain": 1,
    "skill": "1.2",
    "topic": "Métodos de inscrição",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365.\n\nVocê planeja habilitar a inscrição no Microsoft Intune para os seguintes tipos de dispositivos:\n\n- Dispositivos Windows 11 existentes, gerenciados pelo Configuration Manager\n- Dispositivos iOS pessoais\n\nA solução deve minimizar o impacto para os usuários.\n\nQual método de inscrição você deve usar para cada tipo de dispositivo? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Dispositivos Windows 11 gerenciados pelo Configuration Manager:",
        "options": [
          "Cogerenciamento",
          "Inscrição de usuário",
          "Windows Autopilot"
        ],
        "answer": 0
      },
      {
        "label": "Dispositivos iOS pessoais:",
        "options": [
          "Apple Configurator",
          "Inscrição Automatizada de Dispositivos (ADE)",
          "Inscrição de usuário"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Dispositivos já gerenciados pelo ConfigMgr entram no Intune pelo **co-management**, sem reinstalação. Para iOS pessoal, a **User enrollment** (Account Driven User Enrollment) separa dados pessoais e corporativos. ADE e Apple Configurator são para dispositivos corporativos.",
    "details": "**Item a item**\n- **User enrollment para o Windows:** não se aplica ao Windows.\n- **Autopilot:** reprovisiona; mais disruptivo.\n- **ADE / Apple Configurator para iOS pessoal:** são para dispositivos corporativos (supervisão).",
    "docs": [
      {
        "t": "Etapa 5 – Inscrever dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/enroll-devices"
      },
      {
        "t": "Overview of enrollment restrictions - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/restrictions"
      }
    ]
  },
  {
    "id": "Q194",
    "src": 194,
    "domain": 2,
    "skill": "2.2",
    "topic": "Coexistência com a Política de Grupo",
    "type": "single",
    "stem": "Você tem um dispositivo Windows 10 chamado Device1, ingressado no Active Directory e inscrito no Microsoft Intune.\n\nDevice1 é gerenciado pela Política de Grupo e pelo Intune.\n\nVocê precisa garantir que as configurações do Intune tenham precedência sobre as configurações de Política de Grupo.\n\nO que você deve configurar?",
    "options": [
      "um perfil de configuração de dispositivos",
      "uma política de conformidade de dispositivos",
      "um perfil de Linha de Base de Segurança MDM",
      "um objeto de Política de Grupo (GPO)"
    ],
    "answer": 0,
    "scope": "in",
    "review": "ok",
    "explanation": "A política **ControlPolicyConflict/MDMWinsOverGP** é entregue num **perfil de configuração** (Settings catalog ou custom OMA-URI). Veja também a Q92, que cobre o mesmo tema.",
    "details": "**Por que não as outras**\n- **Compliance:** avalia, não configura.\n- **Security baseline:** não inclui o MDMWinsOverGP.\n- **GPO:** o objetivo é a prioridade do MDM.",
    "docs": [
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      }
    ]
  },
  {
    "id": "Q195",
    "src": 195,
    "domain": 1,
    "skill": "1.2",
    "topic": "Inscrição automática",
    "type": "yesno",
    "stem": "Você tem uma assinatura do Azure AD Premium P2 que contém os usuários mostrados na tabela a seguir.\n\n| Nome | Membro de | Licença atribuída |\n|---|---|---|\n| User1 | Group1 | Enterprise Mobility + Security E5 |\n| User2 | Group2 | Enterprise Mobility + Security E5 |\n\nVocê compra os dispositivos mostrados na tabela a seguir.\n\n| Nome | Tipo |\n|---|---|\n| Device1 | Windows 10 |\n| Device2 | Android |\n\nVocê configura a inscrição automática no gerenciamento de dispositivos móveis (MDM) e no gerenciamento de aplicativos móveis (MAM) usando as seguintes configurações:\n\n- Escopo de usuário MDM: Group1\n- Escopo de usuário MAM: Group2\n\nPara cada afirmação a seguir, selecione Sim se ela for verdadeira. Caso contrário, selecione Não.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "statements": [
      "User1 pode inscrever Device1 no Intune usando a inscrição automática.",
      "User1 pode inscrever Device2 no Intune usando a inscrição automática.",
      "User2 pode inscrever Device1 no Intune usando a inscrição automática."
    ],
    "answer": [
      true,
      false,
      false
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "A inscrição automática pelo MDM user scope é um mecanismo do **Windows** (no Entra join/registro). User1 está no MDM scope → Device1 sim. Android não usa esse recurso. User2 está só no MAM scope → não inscreve em MDM.",
    "details": "**Item a item**\n- **User1 no Device1:** Sim. Windows + MDM scope.\n- **User1 no Device2:** Não. A inscrição automática por escopo é para Windows; Android usa o Company Portal.\n- **User2 no Device1:** Não. Está só no escopo MAM.",
    "docs": [
      {
        "t": "Enable MDM automatic enrollment for Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/windows/enable-automatic-mdm"
      },
      {
        "t": "Set up automatic enrollment in Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/windows/quickstart-automatic-mdm"
      },
      {
        "t": "Enroll a Windows device automatically using Group Policy",
        "u": "https://learn.microsoft.com/en-us/windows/client-management/enroll-a-windows-10-device-automatically-using-group-policy"
      }
    ]
  },
  {
    "id": "Q196",
    "src": 196,
    "domain": 3,
    "skill": "3.1",
    "topic": "Redução da superfície de ataque",
    "type": "hotarea",
    "stem": "Você tem um perfil de Linha de Base de Segurança MDM com as seguintes configurações de redução da superfície de ataque:\n\n| Configuração | Valor |\n|---|---|\n| Impedir que aplicativos do Office injetem código em outros processos | Desabilitar |\n| Impedir que aplicativos do Office criem conteúdo executável | Modo de auditoria |\n| Impedir que todos os aplicativos do Office criem processos filho | Modo de auditoria |\n| Bloquear chamadas de API Win32 de macros do Office | Desabilitar |\n| Bloquear a execução de scripts potencialmente ofuscados (js/vbs/ps) | Desabilitar |\n\nVocê tem um perfil ASR de Segurança de Endpoint com as seguintes regras de redução da superfície de ataque:\n\n| Regra | Valor |\n|---|---|\n| Bloquear o roubo de credenciais do subsistema da autoridade de segurança local do Windows (lsass.exe) | Modo de auditoria |\n| Impedir que o Adobe Reader crie processos filho | Modo de auditoria |\n| Impedir que aplicativos do Office injetem código em outros processos | Modo de auditoria |\n| Impedir que aplicativos do Office criem conteúdo executável | Modo de auditoria |\n| Impedir que todos os aplicativos do Office criem processos filho | Modo de auditoria |\n| Bloquear chamadas de API Win32 de macros do Office | Modo de auditoria |\n\nVocê planeja implantar os dois perfis em dispositivos inscritos no Microsoft Intune.\n\nVocê precisa identificar como as seguintes configurações serão definidas nos dispositivos:\n\n- Impedir que aplicativos do Office criem conteúdo executável\n- Bloquear chamadas de API Win32 de macros do Office\n\nAtualmente, as configurações estão desabilitadas localmente em cada dispositivo.\n\nQuais são as configurações efetivas nos dispositivos? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Impedir que aplicativos do Office criem conteúdo executável:",
        "options": [
          "Modo de auditoria",
          "Bloquear",
          "Desabilitar",
          "Avisar"
        ],
        "answer": 0
      },
      {
        "label": "Bloquear chamadas de API Win32 de macros do Office:",
        "options": [
          "Modo de auditoria",
          "Bloquear",
          "Desabilitar",
          "Avisar"
        ],
        "answer": 2
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Quando dois perfis definem o **mesmo valor**, ele é aplicado (Audit mode). Quando definem **valores diferentes** (Disable × Audit), há **conflito** e nenhum dos dois é aplicado; o dispositivo mantém a configuração local, que é Disabled.",
    "details": "**Item a item**\n- **Block / Warn:** nenhum perfil define esses valores.\n- **Office executável = Disable:** os dois perfis concordam em Audit.\n- **Win32 API = Audit:** há conflito; nenhum valor do Intune é aplicado e fica o local (Disabled).\n\n**Dica de prova:** Conflitos aparecem no relatório do perfil como \"Conflict\"; resolva consolidando as regras numa política só.",
    "docs": [
      {
        "t": "Manage attack surface reduction settings with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/attack-surface-reduction"
      },
      {
        "t": "ASR rules reference - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"
      }
    ]
  },
  {
    "id": "Q197",
    "src": 197,
    "domain": 2,
    "skill": "2.2",
    "topic": "Modelos Administrativos",
    "type": "order",
    "stem": "Você tem um domínio do Active Directory local, sincronizado com um tenant do Azure AD.\n\nO tenant contém computadores que executam o Windows 10. Os computadores têm ingresso híbrido no Azure AD e estão inscritos no Microsoft Intune. As configurações do Microsoft Office nos computadores são definidas por um objeto de Política de Grupo (GPO).\n\nVocê precisa migrar a GPO para o Intune.\n\nQuais três ações você deve executar em sequência? Para responder, mova as ações apropriadas da lista de ações para a área de resposta e organize-as na ordem correta.",
    "pool": [
      "Atribuir a política.",
      "Criar uma política de conformidade.",
      "Definir uma marca de escopo para a política.",
      "Importar um arquivo ADMX.",
      "Criar um perfil de configuração.",
      "Definir as configurações de Modelos Administrativos.",
      "Atribuir o perfil."
    ],
    "answer": [
      4,
      5,
      6
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "As configurações do Office já vêm nos **Administrative Templates** embutidos no Intune: crie o **perfil de configuração** (Templates > Administrative Templates ou Settings catalog), configure as opções equivalentes às da GPO e **atribua o perfil**. Importar ADMX só é necessário para templates de terceiros.",
    "details": "**Sequência**\n- **Compliance policy / scope tag / assign the policy:** não fazem parte da migração de configuração.\n- **Import ADMX:** só para templates de terceiros; os do Office já existem no Intune.\n\n**Dica de prova:** O Group Policy analytics do Intune importa o XML da GPO e mostra o que é suportado em MDM.",
    "docs": [
      {
        "t": "Use ADMX templates on Windows devices in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-admx-templates-windows"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q199",
    "src": 199,
    "domain": 3,
    "skill": "1.3",
    "topic": "Proteção de conta",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft 365 que contém um usuário chamado User1 e usa o Microsoft Intune Suite.\n\nVocê usa o Microsoft Intune para gerenciar dispositivos que executam o Windows 11.\n\nVocê precisa remover User1 do grupo local Administradores em todos os dispositivos inscritos.\n\nO que você deve configurar?",
    "options": [
      "uma política de conformidade de dispositivos",
      "uma política de proteção de conta",
      "uma política de configuração de aplicativos"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O perfil **Local user group membership** (Endpoint security > Account protection) pode remover membros do grupo Administrators local (ação Remove ou Replace).",
    "details": "**Por que não as outras**\n- **Compliance / app config:** não alteram grupos locais.\n\n**Dica de prova:** Use a ação \"Remove (Update)\" para tirar só o User1, sem substituir o grupo inteiro.",
    "docs": [
      {
        "t": "Configure a tenant-wide Windows Hello for Business policy with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/identity-protection/configure-tenant-wide-policy"
      },
      {
        "t": "Visão geral do Windows Hello for Business",
        "u": "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/"
      }
    ]
  },
  {
    "id": "Q200",
    "src": 200,
    "domain": 2,
    "skill": "2.4",
    "topic": "Redefinição do Autopilot",
    "type": "hotarea",
    "stem": "Você tem computadores que executam o Windows 10 e são configurados usando o Windows Autopilot.\n\nUm usuário executa as seguintes tarefas em um computador chamado Computer1:\n\n- Cria uma conexão VPN com a rede corporativa.\n- Instala um aplicativo da Microsoft Store chamado App1.\n- Conecta-se a uma rede Wi-Fi.\n\nVocê executa uma redefinição do Windows Autopilot em Computer1.\n\nQual será o estado do computador quando o usuário entrar? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "A conexão Wi-Fi será:",
        "options": [
          "Removida",
          "Mantida, e a frase secreta será mantida",
          "Mantida, mas a frase secreta será redefinida"
        ],
        "answer": 1
      },
      {
        "label": "App1 será:",
        "options": [
          "Reinstalado na entrada",
          "Removido",
          "Mantido"
        ],
        "answer": 1
      },
      {
        "label": "A conexão VPN será:",
        "options": [
          "Removida",
          "Mantida, e as credenciais serão armazenadas em cache",
          "Mantida, mas as credenciais serão redefinidas"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O Autopilot Reset remove arquivos, apps e configurações pessoais, mas **preserva as conexões Wi-Fi** (com a senha), o vínculo com o Entra ID e o Intune, para o dispositivo voltar à rede. O app instalado pelo usuário e a VPN que ele criou são removidos.",
    "details": "**Item a item**\n- **Wi-Fi removido:** o Autopilot Reset preserva o Wi-Fi para o dispositivo voltar à rede.\n- **App1 reinstalado/retido:** apps do usuário são removidos; só os atribuídos pelo Intune voltam depois.\n- **VPN mantida:** configurações pessoais são removidas.",
    "docs": [
      {
        "t": "Windows Autopilot Reset",
        "u": "https://learn.microsoft.com/en-us/autopilot/windows-autopilot-reset"
      },
      {
        "t": "Device Action: Sync - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/sync"
      },
      {
        "t": "Wipe devices with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/wipe"
      },
      {
        "t": "Device Action: Restart - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/restart"
      }
    ]
  },
  {
    "id": "Q202",
    "src": 202,
    "domain": 2,
    "skill": "2.2",
    "topic": "Comunicação remota do PowerShell",
    "type": "single",
    "stem": "Você tem um computador em grupo de trabalho chamado Client1 que executa o Windows 11 e se conecta a uma rede pública.\n\nVocê precisa habilitar a comunicação remota do PowerShell em Client1. A solução deve garantir que conexões remotas do PowerShell sejam aceitas somente da sub-rede local.\n\nQual comando do PowerShell você deve executar?",
    "options": [
      "Set-PSSessionConfiguration –AccessMode Local",
      "Enable-PSRemoting –SkipNetworkProfileCheck",
      "Enable-PSRemoting –Force",
      "Set-NetFirewallRule –Name \"WINRM-HTTP-In-TCP-PUBLIC\" –RemoteAddress Any"
    ],
    "answer": 1,
    "scope": "borderline",
    "review": "ok",
    "explanation": "Em rede **pública**, o Enable-PSRemoting falha por padrão. Com **-SkipNetworkProfileCheck**, ele habilita o remoting e cria a regra de firewall do perfil público restrita à **sub-rede local**. Com `-AccessMode Local` só seriam aceitas sessões do próprio computador.",
    "details": "**Por que não as outras**\n- **Set-PSSessionConfiguration -AccessMode Local:** aceitaria só sessões locais.\n- **Enable-PSRemoting -Force:** em rede pública ainda falha na checagem de perfil.\n- **Set-NetFirewallRule ... Any:** abriria para qualquer origem.",
    "docs": [
      {
        "t": "Security considerations for PowerShell Remoting using WinRM - PowerShell",
        "u": "https://learn.microsoft.com/en-us/powershell/scripting/security/remoting/winrm-security"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q203",
    "src": 203,
    "domain": 3,
    "skill": "1.3",
    "topic": "Autenticação sem senha",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365.\n\nVocê precisa habilitar a autenticação sem senha para todos os usuários. A solução deve atender aos seguintes requisitos:\n\n- Os usuários do departamento de pesquisa não podem usar dispositivos móveis e devem se autenticar em dispositivos Linux não gerenciados usando um método alternativo.\n- Para acessar serviços, os usuários do departamento de vendas devem se autenticar usando seus telefones celulares.\n- O esforço administrativo deve ser minimizado.\n\nQual método de autenticação você deve usar para cada departamento? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Vendas:",
        "options": [
          "Chaves de segurança FIDO2",
          "Microsoft Authenticator",
          "Passe de Acesso Temporário",
          "Windows Hello for Business"
        ],
        "answer": 1
      },
      {
        "label": "Pesquisa:",
        "options": [
          "Chaves de segurança FIDO2",
          "Microsoft Authenticator",
          "Passe de Acesso Temporário",
          "Windows Hello for Business"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Passwordless pelo celular é o **Microsoft Authenticator**. Sem celular e em Linux não gerenciado (o Windows Hello for Business é só para Windows), a alternativa passwordless é a **chave de segurança FIDO2**. O Temporary Access Pass é temporário, para onboarding e recuperação.",
    "details": "**Item a item**\n- **WHfB para Research:** só Windows.\n- **TAP:** temporário, para onboarding e recuperação.\n- **FIDO2 para Sales:** o requisito é \"pelo celular\".",
    "docs": [
      {
        "t": "Passkeys (FIDO2) authentication method in Microsoft Entra ID - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2"
      },
      {
        "t": "Configure a tenant-wide Windows Hello for Business policy with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/identity-protection/configure-tenant-wide-policy"
      },
      {
        "t": "Visão geral do Windows Hello for Business",
        "u": "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/"
      }
    ]
  },
  {
    "id": "Q204",
    "src": 204,
    "domain": 4,
    "skill": "4.2",
    "topic": "Políticas de proteção de aplicativos",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365.\n\nOs usuários têm dispositivos iOS que não estão inscritos no Microsoft Intune.\n\nVocê cria uma política de proteção de aplicativos para o Microsoft Outlook conforme a imagem.\n\n### Tradução do texto da imagem\n\n**Criar política**\n\nEtapas visíveis: Informações básicas; Aplicativos; Proteção de dados; Requisitos de acesso; Inicialização condicional.\n\nEscolha como deseja aplicar esta política a aplicativos em diferentes dispositivos. Em seguida, adicione pelo menos um aplicativo.\n\n| Configuração | Valor selecionado |\n|---|---|\n| Direcionar para aplicativos em todos os tipos de dispositivo | Não (opção alternativa: Sim) |\n| Tipos de dispositivo | Não gerenciados |\n\nAplicativos públicos: Microsoft Outlook. Controle: Remover. Link: Selecionar aplicativos públicos.\n\nAplicativos personalizados: Nenhum aplicativo personalizado selecionado. Controle: Remover. Link: Selecionar aplicativos personalizados.\n\nBotões: Anterior; Avançar.\n\nVocê precisa configurar a política para atender aos seguintes requisitos:\n\n- Impedir que os usuários usem o aplicativo Outlook se a versão do sistema operacional for inferior a 12.0.0.\n- Exigir que os usuários usem uma senha alfanumérica para acessar o aplicativo Outlook.\n\nO que você deve configurar na política de proteção de aplicativos para cada requisito? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Impedir o uso do Outlook se a versão do sistema operacional for inferior a 12.0.0:",
        "options": [
          "Requisitos de acesso",
          "Inicialização condicional",
          "Proteção de dados",
          "Escopo"
        ],
        "answer": 1
      },
      {
        "label": "Exigir uma senha alfanumérica para acessar o Outlook:",
        "options": [
          "Requisitos de acesso",
          "Inicialização condicional",
          "Proteção de dados",
          "Escopo"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Versão mínima do SO (Min OS version com ação Block access) fica em **Conditional launch**. O PIN do app e o tipo (numérico ou passcode) ficam em **Access requirements**.",
    "details": "**Item a item**\n- **Data protection:** transferência de dados.\n- **Scope:** não existe como seção de configuração da política.\n- **Access requirements para versão / conditional launch para PIN:** invertidos.",
    "docs": [
      {
        "t": "App Protection Policies Overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/overview"
      },
      {
        "t": "Create and Deploy App Protection Policies - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/create-policy"
      }
    ],
    "exhibits": [
      {
        "src": "img/Q204-1.png",
        "alt": "Política de proteção de aplicativos: tipos de dispositivo = Não gerenciados; aplicativos públicos = Microsoft Outlook"
      }
    ]
  },
  {
    "id": "Q205",
    "src": 205,
    "domain": 5,
    "skill": "3.2",
    "topic": "Relatórios de atualizações do Windows",
    "type": "single",
    "stem": "Você gerencia 1.000 computadores que executam o Windows 10. Todos os computadores estão inscritos no Microsoft Intune. Você gerencia as configurações de canal de manutenção dos computadores usando o Intune.\n\nVocê precisa analisar o status de manutenção de um computador.\n\nO que você deve fazer?",
    "options": [
      "Em Configuração de dispositivos – Perfis, visualizar o status do dispositivo.",
      "Em Atualizações de software, visualizar o Estado de implantação por anel de atualização.",
      "Em Atualizações de software, visualizar os logs de auditoria.",
      "Em Conformidade de dispositivos, visualizar a conformidade do dispositivo."
    ],
    "answer": 1,
    "scope": "in",
    "review": "ok",
    "explanation": "O status de cada dispositivo em relação ao update ring aparece em **Software updates > Per update ring deployment state** (hoje, Devices > Windows updates > Update rings > device status).",
    "details": "**Por que não as outras**\n- **Configuration profiles:** perfis, não o update ring.\n- **Audit logs:** alterações administrativas.\n- **Device compliance:** conformidade.\n\n**Dica de prova:** Os relatórios do Windows Update for Business (Windows Autopatch reports) dão mais detalhe por dispositivo.",
    "docs": [
      {
        "t": "Reports for Windows Feature Update Policies - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/monitor-feature-updates"
      },
      {
        "t": "Reports for Windows Quality Update Policies - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/monitor-quality-updates"
      }
    ]
  },
  {
    "id": "Q206",
    "src": 206,
    "domain": 3,
    "skill": "3.1",
    "topic": "Exploit Guard",
    "type": "hotarea",
    "stem": "Sua rede contém um domínio do Active Directory. O Active Directory é sincronizado com o Azure AD.\n\nHá 500 computadores ingressados no domínio do Active Directory que executam o Windows 10 e estão inscritos no Microsoft Intune.\n\nVocê planeja implementar o Microsoft Defender Exploit Guard.\n\nVocê precisa criar uma política personalizada do Microsoft Defender Exploit Guard e distribuí-la a todos os computadores.\n\nO que você deve fazer? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Ferramenta para definir as configurações:",
        "options": [
          "Portal de conformidade do Microsoft Purview",
          "Aplicativo Segurança do Windows",
          "Centro de administração do Microsoft Intune"
        ],
        "answer": 2
      },
      {
        "label": "Método de distribuição:",
        "options": [
          "Uma política do Azure",
          "Um perfil de configuração de Proteção de Endpoint",
          "Uma política de conformidade de dispositivos do Intune",
          "Um perfil de configuração de restrições de dispositivo"
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O Exploit Guard é distribuído por um perfil **Endpoint protection**. O dump marca o **Intune admin center** como ferramenta. Ponto de discussão: para a parte de **Exploit protection**, o XML customizado é gerado no **Windows Security app** de um dispositivo de referência (veja a Q100) e depois importado no Intune; por isso parte da comunidade marca Windows Security app.",
    "details": "**Item a item**\n- **Purview:** compliance.\n- **Azure Policy:** recursos do Azure.\n- **Compliance policy / device restrictions:** não distribuem o Exploit Guard.\n\n**Dica de prova:** Hoje: Endpoint security > ASR (Exploit protection) com o XML importado.",
    "docs": [
      {
        "t": "Apply mitigations to help prevent attacks through vulnerabilities - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/exploit-protection"
      },
      {
        "t": "Manage attack surface reduction settings with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/attack-surface-reduction"
      },
      {
        "t": "ASR rules reference - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"
      }
    ]
  },
  {
    "id": "Q207",
    "src": 207,
    "domain": 1,
    "skill": "1.2",
    "topic": "DNS de inscrição",
    "type": "single",
    "stem": "Você tem uma assinatura do Microsoft Intune associada a um tenant do Azure AD chamado contoso.com.\n\nOs usuários usam um dos três sufixos a seguir ao entrar no tenant: us.contoso.com, eu.contoso.com ou contoso.com.\n\nVocê precisa garantir que os usuários NÃO precisem especificar a URL de inscrição no gerenciamento de dispositivos móveis (MDM) como parte do processo de inscrição. A solução deve minimizar o número de alterações.\n\nQuais registros DNS são necessários?",
    "options": [
      "somente um registro TXT",
      "três registros CNAME",
      "três registros TXT",
      "somente um registro CNAME"
    ],
    "answer": 1,
    "shuffle": false,
    "scope": "in",
    "review": "ok",
    "explanation": "O registro **CNAME EnterpriseEnrollment** aponta para enterpriseenrollment-s.manage.microsoft.com e precisa existir para **cada sufixo de UPN** usado na inscrição: três domínios, três CNAMEs.",
    "details": "**Por que não as outras**\n- **1 CNAME:** cada sufixo de UPN precisa do próprio registro.\n- **TXT:** a descoberta usa CNAME, não TXT.\n\n**Dica de prova:** Registros: EnterpriseEnrollment.<sufixo> → enterpriseenrollment-s.manage.microsoft.com (e EnterpriseRegistration → enterpriseregistration.windows.net).",
    "docs": [
      {
        "t": "Enable MDM automatic enrollment for Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/windows/enable-automatic-mdm"
      },
      {
        "t": "Set up automatic enrollment in Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/windows/quickstart-automatic-mdm"
      },
      {
        "t": "Enroll a Windows device automatically using Group Policy",
        "u": "https://learn.microsoft.com/en-us/windows/client-management/enroll-a-windows-10-device-automatically-using-group-policy"
      }
    ]
  },
  {
    "id": "Q208",
    "src": 208,
    "domain": 1,
    "skill": "1.2",
    "topic": "Configurações de inscrição",
    "type": "hotarea",
    "stem": "Você tem uma assinatura do Microsoft 365.\n\nVocê planeja inscrever no Microsoft Intune dispositivos com as plataformas e versões mostradas na tabela a seguir.\n\n| Plataforma | Versão |\n|---|---|\n| Android | 8, 9 |\n| iOS | 11, 12 |\n\nVocê precisa configurar a inscrição de dispositivos para atender aos seguintes requisitos:\n\n- Garantir que somente dispositivos com plataformas e versões aprovadas possam se inscrever no Microsoft Intune.\n- Garantir que os dispositivos sejam adicionados a grupos do Azure AD com base em uma seleção feita pelos usuários durante a inscrição.\n\nQual configuração de inscrição de dispositivos você deve definir para cada requisito? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Garantir que somente dispositivos com plataformas e versões aprovadas possam se inscrever no Microsoft Intune:",
        "options": [
          "Inscrição do Android",
          "Inscrição da Apple",
          "Identificadores de dispositivo corporativo",
          "Categorias de dispositivo",
          "Restrições de inscrição",
          "Inscrição do Windows"
        ],
        "answer": 4
      },
      {
        "label": "Garantir que os dispositivos sejam adicionados a grupos do Azure AD com base em uma seleção feita pelos usuários durante a inscrição:",
        "options": [
          "Inscrição do Android",
          "Inscrição da Apple",
          "Identificadores de dispositivo corporativo",
          "Categorias de dispositivo",
          "Restrições de inscrição",
          "Inscrição do Windows"
        ],
        "answer": 3
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "As **enrollment restrictions** (device platform restrictions) definem plataformas e versões mínimas/máximas permitidas. As **device categories** fazem o usuário escolher uma categoria no Company Portal, e grupos dinâmicos (`device.deviceCategory`) colocam o dispositivo no grupo certo.",
    "details": "**Item a item**\n- **Corporate identifiers:** marcam ownership.\n- **Android/Apple/Windows enrollment:** configuram os métodos de inscrição, não restringem versões nem grupos.\n\n**Dica de prova:** Restrições de plataforma também podem bloquear dispositivos pessoais (personally owned).",
    "docs": [
      {
        "t": "Overview of enrollment restrictions - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/restrictions"
      },
      {
        "t": "Etapa 5 – Inscrever dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/enroll-devices"
      }
    ]
  },
  {
    "id": "Q209",
    "src": 209,
    "domain": 3,
    "skill": "3.1",
    "topic": "Criptografia de disco",
    "type": "hotarea",
    "stem": "Você tem um tenant do Microsoft 365 que usa o Microsoft Intune e contém os dispositivos mostrados na tabela a seguir.\n\n| Nome | Plataforma |\n|---|---|\n| Device1 | Windows 10 |\n| Device2 | macOS |\n\nNa Segurança de endpoint do Microsoft Intune, você precisa configurar uma política de criptografia de disco para cada dispositivo.\n\nQual tipo de criptografia você deve usar para cada dispositivo e qual função de controle de acesso baseado em função (RBAC) do Intune deve usar para gerenciar as chaves de criptografia? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Device1:",
        "options": [
          "FileVault",
          "Cryptsetup",
          "Sistema de Arquivos com Criptografia (EFS)",
          "Criptografia de Unidade de Disco BitLocker (BitLocker)"
        ],
        "answer": 3
      },
      {
        "label": "Device2:",
        "options": [
          "FileVault",
          "Cryptsetup",
          "Sistema de Arquivos com Criptografia (EFS)",
          "Criptografia de Unidade de Disco BitLocker (BitLocker)"
        ],
        "answer": 0
      },
      {
        "label": "Função RBAC:",
        "options": [
          "Operador de Suporte Técnico",
          "Gerenciador de Aplicativos",
          "Administrador de Funções do Intune",
          "Gerenciador de Políticas e Perfis"
        ],
        "answer": 0
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Windows usa **BitLocker** e macOS usa **FileVault**. Entre as funções listadas, o **Help Desk Operator** tem as permissões de tarefas remotas para rotacionar chaves de recuperação (BitLocker/FileVault) e consultá-las para dar suporte.",
    "details": "**Item a item**\n- **Cryptsetup / EFS:** não são os mecanismos de disco inteiro gerenciados pelo Intune.\n- **Application Manager / Policy and Profile Manager / Intune Role Administrator:** não são o mínimo para rotacionar e consultar chaves.\n\n**Dica de prova:** Ver chaves de recuperação do BitLocker exige a permissão \"Read BitLocker keys\" (Remote tasks).",
    "docs": [
      {
        "t": "Encrypt Windows devices with BitLocker using Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/encrypt-bitlocker-windows"
      },
      {
        "t": "View report details for encryption status of devices managed with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/monitor-encryption"
      },
      {
        "t": "Microsoft Intune endpoint security disk encryption policy - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/disk-encryption"
      }
    ]
  },
  {
    "id": "Q210",
    "src": 210,
    "domain": 5,
    "skill": "5.2",
    "topic": "Log Analytics",
    "type": "order",
    "stem": "Sua empresa tem um tenant do Microsoft 365 E5.\n\nTodos os dispositivos da empresa estão inscritos no Microsoft Intune.\n\nVocê precisa criar relatórios avançados usando consultas e visualizações personalizadas a partir de dados brutos do Microsoft Intune.\n\nQuais três ações você deve executar em sequência? Para responder, mova as ações apropriadas da lista de ações para a área de resposta e organize-as na ordem correta.",
    "pool": [
      "Criar um site do Microsoft SharePoint Online.",
      "Comprar uma assinatura do Azure.",
      "Adicionar configurações de diagnóstico.",
      "Instalar o Microsoft Power BI Desktop.",
      "Criar um workspace do Log Analytics.",
      "Adicionar um conector de certificado ao Microsoft Intune."
    ],
    "answer": [
      1,
      4,
      2
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "Para enviar logs do Intune para consultas KQL: é preciso uma **assinatura Azure**, depois um **workspace do Log Analytics**, e por fim **Diagnostic settings** no Intune apontando para o workspace.",
    "details": "**Sequência**\n- **SharePoint site / certificate connector:** sem relação.\n- **Power BI Desktop:** visualização opcional; a pergunta é sobre os dados brutos com KQL.\n\n**Dica de prova:** Em Intune > Tenant administration > Diagnostic settings, escolha AuditLogs, OperationalLogs, DeviceComplianceOrg e Devices.",
    "docs": [
      {
        "t": "Encaminhar logs para o Azure Monitor usando o Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/governance/integrate-azure-monitor"
      },
      {
        "t": "Relatórios do Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/overview"
      },
      {
        "t": "Usar APIs do Graph para exportar relatórios do Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/export-graph-apis"
      }
    ]
  },
  {
    "id": "Q211",
    "src": 211,
    "domain": 3,
    "skill": "3.1",
    "topic": "Integração ao Defender for Endpoint",
    "type": "match",
    "stem": "Você tem uma assinatura do Microsoft 365 que usa o Microsoft Defender for Endpoint.\n\nVocê planeja integrar os seguintes tipos de dispositivos ao Defender for Endpoint:\n\n- macOS\n- Linux Server\n\nO que você deve usar para integrar cada dispositivo? Para responder, arraste as ferramentas apropriadas para os tipos de dispositivo correspondentes. Cada ferramenta pode ser usada uma vez, mais de uma vez ou nenhuma vez.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "pool": [
      "Ansible",
      "Política de Grupo",
      "Microsoft Intune",
      "Scripts de Infraestrutura de Área de Trabalho Virtual (VDI)"
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
    "explanation": "macOS é integrado via **Intune** (ou outro MDM / script local). Para Linux, os métodos documentados são script manual, Puppet, **Ansible** e Chef. Group Policy e scripts VDI são só para Windows.",
    "details": "**Item a item**\n- **Group Policy / scripts VDI para macOS ou Linux:** são métodos só de Windows.\n\n**Dica de prova:** Para macOS também servem JAMF, outro MDM ou script local; para Linux, script, Puppet, Ansible ou Chef.",
    "docs": [
      {
        "t": "Configure Microsoft Defender for Endpoint with Intune and onboard devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/microsoft-defender/configure-integration"
      },
      {
        "t": "Onboard devices to Microsoft Defender for Endpoint - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/onboarding"
      }
    ]
  },
  {
    "id": "Q212",
    "src": 212,
    "domain": 2,
    "skill": "2.2",
    "topic": "Quiosque",
    "type": "single",
    "stem": "Você tem um dispositivo Windows 10 chamado Computer1, inscrito no Microsoft Intune.\n\nVocê precisa configurar Computer1 como uma estação de trabalho pública que executará um único aplicativo de atendimento ao cliente em tela inteira.\n\nQual modelo de tipo de perfil de configuração você deve usar no centro de administração do Microsoft Intune?",
    "options": [
      "Dispositivo compartilhado com vários usuários",
      "Restrições de dispositivo",
      "Quiosque",
      "Proteção de endpoint"
    ],
    "answer": 2,
    "scope": "in",
    "review": "ok",
    "explanation": "O template **Kiosk** (single-app, full-screen) atende exatamente a esse cenário.",
    "details": "**Por que não as outras**\n- **Shared multi-user device:** PCs compartilhados com várias contas, sem app único em tela cheia.\n- **Device restrictions / Endpoint protection:** não criam o quiosque.\n\n**Dica de prova:** O Kiosk single-app aceita app UWP, Edge ou um app Win32 (com Assigned Access).",
    "docs": [
      {
        "t": "Kiosk settings for Windows and Holographic devices in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-kiosk"
      },
      {
        "t": "Windows Holographic Business device settings - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-device-restrictions-windows-holographic"
      },
      {
        "t": "Surface Hub Windows 10 Team device restrictions in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-device-restrictions-surface-hub"
      },
      {
        "t": "Deploy OEMConfig profiles to Zebra devices using Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/deploy-oemconfig-zebra-android"
      }
    ]
  },
  {
    "id": "Q213",
    "src": 213,
    "domain": 2,
    "skill": "2.2",
    "topic": "Conjuntos de políticas",
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
    "explanation": "Basta **adicionar Policy1 ao conteúdo do Set1** (editar o policy set). Assim, quem recebe o Set1 recebe todos os objetos dele juntos.",
    "details": "**Por que não as outras**\n- **Assignments do Policy1:** atribuições separadas podem divergir das do set.\n- **Configurações do Policy1:** não vinculam ao set.\n- **Assignments do Set1:** definem quem recebe, mas o Policy1 precisa estar dentro do set.",
    "docs": [
      {
        "t": "Policy Sets - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/policy-sets"
      },
      {
        "t": "Create assignment filters in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/filters/overview"
      },
      {
        "t": "Assignment Filter Performance Tips for Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/filters/performance-recommendations"
      }
    ]
  },
  {
    "id": "Q214",
    "src": 214,
    "domain": 2,
    "skill": "3.2",
    "topic": "Otimização de Entrega",
    "type": "hotarea",
    "stem": "Sua rede contém um domínio do Active Directory local que contém os locais mostrados na tabela a seguir.\n\n| Nome | Endereço IP interno | Endereço IP público de conversão de endereços de rede (NAT) | Site do Active Directory |\n|---|---|---|---|\n| Location1 | 10.10.0.0/16 | 131.107.15.0/24 | Site1 |\n| Location2 | 10.20.0.0/16 | 131.107.16.0/24 | Site1 |\n| Location3 | 172.16.0.0/16 | 131.107.196.0/24 | Site2 |\n\nNo Microsoft Intune, você inscreve os dispositivos Windows 10 mostrados na tabela a seguir.\n\n| Nome | Endereço IP |\n|---|---|\n| Device1 | 10.10.0.50 |\n| Device2 | 10.20.1.150 |\n| Device3 | 10.10.1.155 |\n| Device4 | 172.16.0.30 |\n\nVocê tem um perfil de configuração de dispositivos de Otimização de Entrega aplicado a todos os dispositivos. O perfil está configurado conforme a imagem a seguir.\n\n### Tradução do texto da imagem\n\n**Otimização de Entrega — Windows 10 e posteriores**\n\nEtapas: Informações básicas; Definições de configuração; Atribuições.\n\nSe você já configurou e implantou o modo de download da Otimização de Entrega nos anéis de atualização do Windows 10, antes de começar, acesse Atualizações de software — Anéis de atualização do Windows 10 e migre as configurações existentes. Saiba mais.\n\n| Configuração | Valor |\n|---|---|\n| Modo de download | HTTP combinado com emparelhamento entre pares de um grupo privado (2) |\n| Restringir seleção de pares | Máscara de sub-rede |\n| Origem do ID do grupo | Site do AD |\n\nBotões: Anterior; Avançar.\n\nDe quais dispositivos Device1 e Device2 podem obter atualizações? Para responder, selecione as opções apropriadas na área de resposta.\n\nOBSERVAÇÃO: cada seleção correta vale um ponto.",
    "slots": [
      {
        "label": "Device1:",
        "options": [
          "Pode obter atualizações somente de Device3.",
          "Não pode obter atualizações de nenhum dispositivo.",
          "Pode obter atualizações somente de Device1 e Device3.",
          "Pode obter atualizações de Device1, Device3 e Device4."
        ],
        "answer": 0
      },
      {
        "label": "Device2:",
        "options": [
          "Pode obter atualizações somente de Device3.",
          "Não pode obter atualizações de nenhum dispositivo.",
          "Pode obter atualizações somente de Device1 e Device3.",
          "Pode obter atualizações de Device1, Device3 e Device4."
        ],
        "answer": 1
      }
    ],
    "scope": "in",
    "review": "ok",
    "explanation": "O modo **Group (2)** agrupa os peers pelo **AD site** (Site1: Device1, Device2 e Device3), e **Restrict Peer Selection = Subnet mask** limita os peers à mesma sub-rede. Device1 e Device3 estão em 10.10.0.0/16 e trocam conteúdo entre si. Device2 (10.20.x) está no mesmo site, mas em outra sub-rede, então não tem peers.",
    "details": "**Item a item**\n- **Device1 também do Device4:** o Device4 está em outra sub-rede e outro site.\n- **Device2 de algum peer:** com restrição por sub-rede, ele não tem peers na 10.20.x.\n\n**Dica de prova:** Group (2) usa o AD site ou o domínio por padrão; o Group ID permite definir grupos personalizados.",
    "docs": [
      {
        "t": "Windows Delivery Optimization settings in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-delivery-optimization-windows"
      },
      {
        "t": "What is Delivery Optimization?",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/do/waas-delivery-optimization"
      }
    ],
    "exhibits": [
      {
        "src": "img/Q214-1.png",
        "alt": "Otimização de Entrega: modo de download = HTTP com emparelhamento em grupo privado (2); restringir seleção de pares = máscara de sub-rede; origem do ID do grupo = site do AD"
      }
    ]
  },
  {
    "id": "Q215",
    "src": 215,
    "domain": 2,
    "skill": "2.2",
    "topic": "Perfis de configuração de dispositivos",
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
    "explanation": "O link de redefinição de senha na tela de logon é habilitado por um **perfil de configuração** (Authentication/AllowAadPasswordReset, via Settings catalog ou custom). O SSPR em si é habilitado no Entra ID.",
    "details": "**Por que não as outras**\n- **Enrollment / CA / compliance:** não habilitam o link de reset na tela de logon.\n\n**Dica de prova:** O link exige SSPR habilitado no Entra para os usuários e Windows 10 1803+.",
    "docs": [
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q216",
    "src": 216,
    "domain": 5,
    "skill": "5.2",
    "topic": "Análise de endpoint",
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
    "explanation": "Startup score e App reliability são do **Endpoint analytics**, e baselines/scores exigem dados de no mínimo **10 dispositivos**.",
    "details": "**Item a item**\n- **Workloads / Log Analytics / Security baselines:** não calculam os scores do Endpoint analytics.\n- **1 / 5 / 25:** o mínimo para scores e baselines é 10 dispositivos.",
    "docs": [
      {
        "t": "Endpoint analytics overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/endpoint-analytics/"
      },
      {
        "t": "Use Remediations to Detect and Fix Support Issues - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations"
      }
    ]
  },
  {
    "id": "Q217",
    "src": 217,
    "domain": 5,
    "skill": "5.2",
    "topic": "Análise de endpoint",
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
    "explanation": "O Endpoint analytics coleta dados de desempenho só de **Windows 10/11** (Pro, Enterprise, Education).",
    "details": "**Por que não as outras**\n- **Android / iOS:** o Endpoint analytics só coleta de Windows.\n\n**Dica de prova:** As edições Home não são suportadas.",
    "docs": [
      {
        "t": "Endpoint analytics overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/endpoint-analytics/"
      },
      {
        "t": "Use Remediations to Detect and Fix Support Issues - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations"
      }
    ]
  },
  {
    "id": "Q218",
    "src": 218,
    "domain": 3,
    "skill": "3.1",
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
    "explanation": "O dump marca D, excluindo o \"Mac OS X\". Hoje o Defender for Endpoint suporta Windows, **macOS** (a versão atual e as duas anteriores), Linux, Android e iOS. A interpretação do dump é que \"Mac OS X\" (10.x) é uma versão antiga, fora do suporte. Se a prova disser apenas \"macOS\", a resposta seria todos os quatro.",
    "details": "**Por que não as outras**\n- **Todos os quatro:** o gabarito considera \"Mac OS X\" (10.x) fora do suporte.\n\n**Dica de prova:** Hoje o MDE suporta as três últimas versões do macOS, Linux, Android, iOS e Windows Server.",
    "docs": [
      {
        "t": "Integrate Microsoft Defender for Endpoint with Intune for Device Compliance - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/microsoft-defender/overview"
      },
      {
        "t": "Deploy endpoint detection and response policy with Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/deploy-edr"
      }
    ]
  },
  {
    "id": "Q219",
    "src": 219,
    "domain": 4,
    "skill": "4.2",
    "topic": "Acesso Condicional (MAM)",
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
    "explanation": "Uma política de **Conditional Access** com o controle **Require app protection policy** (antes, \"Require approved client app\") só libera acesso de apps que suportam MAM.",
    "details": "**Por que não as outras**\n- **App configuration:** configura apps.\n- **Configuration profile / compliance:** exigem inscrição; o cenário é MAM.\n\n**Dica de prova:** Hoje use \"Require app protection policy\" (o \"Require approved client app\" foi aposentado).",
    "docs": [
      {
        "t": "Use app-based Conditional Access policies with Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/conditional-access-integration/app-based-policies"
      },
      {
        "t": "How to Require Device Compliance with Conditional Access - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance"
      }
    ]
  },
  {
    "id": "Q220",
    "src": 220,
    "domain": 4,
    "skill": "4.1",
    "topic": "Atribuição de aplicativos",
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
    "explanation": "Um app próprio (LOB) é **adicionado ao Intune** e atribuído como Available ao grupo do departamento de finanças, aparecendo só para eles no Company Portal. Publicar nas lojas o deixaria público.",
    "details": "**Por que não as outras**\n- **Registrar no Entra:** é para autenticação, não para distribuição.\n- **Lojas públicas:** qualquer um baixaria.\n- **MDT:** implantação de imagem Windows.\n\n**Dica de prova:** Para Android Enterprise, publique como app privado do Managed Google Play e atribua ao grupo dinâmico de finanças.",
    "docs": [
      {
        "t": "Assign Apps to Groups in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/assign-groups"
      },
      {
        "t": "Gerenciamento de aplicativos Win32 no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/win32"
      },
      {
        "t": "Adicionar um aplicativo de linha de negócios do Windows ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-lob-windows"
      },
      {
        "t": "Adicionar aplicativos da Microsoft Store ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store"
      }
    ]
  },
  {
    "id": "Q221",
    "src": 221,
    "domain": 4,
    "skill": "4.2",
    "topic": "Gerenciamento do Microsoft Edge",
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
    "explanation": "No Windows, o Edge é configurado por **perfil de configuração** (Administrative Templates/Settings catalog). No Android e no iOS, o Edge é um app gerenciado configurado por **app configuration policy**.",
    "details": "**Item a item**\n- **App configuration no Windows:** no Windows inscrito, o Edge é configurado por perfis (ADMX).\n- **Configuration profile no mobile:** no Android e iOS, o Edge é configurado por app configuration (managed apps ou managed devices).",
    "docs": [
      {
        "t": "Manage Microsoft Edge on iOS and Android With Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/configure-edge-ios-android"
      },
      {
        "t": "App Configuration Policies for Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/overview"
      },
      {
        "t": "Add App Configuration Policies for Managed iOS/iPadOS Devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-ios"
      }
    ]
  },
  {
    "id": "Q222",
    "src": 222,
    "domain": 4,
    "skill": "4.1",
    "topic": "Políticas para aplicativos do Office",
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
    "explanation": "As políticas para apps do Office (Cloud Policy) consideram **grupos aninhados**, e a de **prioridade 0 vence**. Os três usuários são membros (diretos ou aninhados) de Group1, então recebem Policy1 → .ods para todos.",
    "details": "**Item a item**\n- **User1 com .ods:** Sim. Policy1 (prioridade 0, Group1).\n- **User2 com .xlsb:** Não. Também está no Group1 (aninhado), e a Policy1 vence.\n- **User3 com .xlsx:** Não. Recebe a Policy1 (.ods).\n\n**Dica de prova:** Diferente do Intune, as Office Cloud Policies resolvem conflito por prioridade e consideram grupos aninhados.",
    "docs": [
      {
        "t": "Overview of Cloud Policy service for Microsoft 365 - Microsoft 365 Apps",
        "u": "https://learn.microsoft.com/en-us/microsoft-365-apps/admin-center/overview-cloud-policy"
      },
      {
        "t": "Use ADMX templates on Windows devices in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-admx-templates-windows"
      }
    ]
  },
  {
    "id": "Q223",
    "src": 223,
    "domain": 4,
    "skill": "4.1",
    "topic": "Aplicativos Win32",
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
    "explanation": "O **Win32 Content Prep Tool** (IntuneWinAppUtil.exe) empacota a pasta inteira do instalador em um único arquivo **.intunewin**.",
    "details": "**Item a item**\n- **DISM / App-V Sequencer / winget:** não geram o .intunewin.\n- **.apk / .appv / .ipa:** formatos de outras plataformas ou tecnologias.",
    "docs": [
      {
        "t": "Gerenciamento de aplicativos Win32 no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/win32"
      },
      {
        "t": "Adicionar um aplicativo de linha de negócios do Windows ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-lob-windows"
      },
      {
        "t": "Adicionar aplicativos da Microsoft Store ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store"
      }
    ]
  },
  {
    "id": "Q224",
    "src": 224,
    "domain": 1,
    "skill": "1.3",
    "topic": "Configurações de política de conformidade",
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
    "explanation": "Em **Compliance policy settings**, mude \"Mark devices with no compliance policy assigned as\" para **Not compliant**.",
    "details": "**Por que não as outras**\n- **CA settings / diagnostic settings:** não mudam o padrão de dispositivos sem política.\n- **Ações de não conformidade da Policy1:** só valem para quem recebe a Policy1.",
    "docs": [
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      },
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      }
    ]
  },
  {
    "id": "Q225",
    "src": 225,
    "domain": 1,
    "skill": "2.1",
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
    "explanation": "O registro no Autopilot é feito no **Intune admin center** (Devices > Windows > Enrollment > Devices), importando o CSV com **número de série e hardware hash**. KMS e WDS são distratores.",
    "details": "**Item a item**\n- **Entra admin center:** não importa hashes do Autopilot.\n- **VAMT / WDS:** distratores (ativação e imagem).\n- **MAC + nome / chave de volume:** não identificam o dispositivo para o Autopilot.",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q226",
    "src": 226,
    "domain": 1,
    "skill": "2.1",
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
    "explanation": "O modo **user-driven** pede que o usuário entre com a conta no OOBE, e a **inscrição automática** faz o dispositivo entrar no Intune nesse momento. Self-deploying não pede login de usuário.",
    "details": "**Por que não as outras**\n- **Provisioning package / unattend.xml:** não usam o login do usuário no OOBE para inscrever.\n- **Self-deploying:** não pede login.\n\n**Dica de prova:** O user-driven também precisa do perfil atribuído e de licença Intune para o usuário.",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q227",
    "src": 227,
    "domain": 1,
    "skill": "2.1",
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
    "explanation": "A regra dinâmica `(device.devicePhysicalIDs -any (_ -startsWith \"[ZTDId]\"))` captura todos os dispositivos registrados no Autopilot. Depois, basta atribuir o perfil de implantação a esse grupo.",
    "details": "**Por que não as outras**\n- **Regra por operatingSystem:** pegaria todos os Windows, não só os do Autopilot.\n- **Join no Entra / GPO / join no AD:** não atribuem o perfil.\n\n**Dica de prova:** Variante por order ID: device.devicePhysicalIds -any _ -eq \"[OrderID]:Lote1\".",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q232",
    "src": 232,
    "domain": 2,
    "skill": "2.2",
    "topic": "Área de Trabalho Remota",
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
    "explanation": "`net localgroup \"Remote Desktop Users\" /add \"AzureAD\\User1@Contoso.com\"` — o grupo local que dá acesso RDP e a conta do Entra ID com o prefixo **AzureAD\\** + UPN.",
    "details": "**Item a item**\n- **\"Device Owners\":** não é um grupo local padrão.\n- **\"Contoso\\User1\" / \"User1@Contoso.com\":** contas do Entra exigem o prefixo AzureAD\\.\n\n**Dica de prova:** Em escala, use Account protection > Local user group membership (Remote Desktop Users).",
    "docs": [
      {
        "t": "Enable Remote Desktop on your PC",
        "u": "https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/remotepc/remote-desktop-allow-access"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q233",
    "src": 233,
    "domain": 1,
    "skill": "2.1",
    "topic": "Requisitos e licenciamento do Windows 11",
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
    "explanation": "O Windows 11 exige **TPM 2.0**, 4 GB de RAM e 64 GB de armazenamento. Device1 tem TPM 1.2 → não. Device2 atende exatamente o mínimo → não precisa de hardware. **Office 365 E5 + EMS E5 não incluem licença do Windows** (o Microsoft 365 E3/E5 inclui) → User3 precisa de licença adicional.",
    "details": "**Item a item**\n- **Device1:** Não. TPM 1.2.\n- **Device2:** Não precisa de hardware. Atende o mínimo exatamente.\n- **User3:** Sim. Precisa de licença; O365 E5 + EMS E5 não incluem Windows Enterprise.",
    "docs": [
      {
        "t": "Requisitos do Windows 11",
        "u": "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Ativação de assinatura do Windows",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation"
      }
    ]
  },
  {
    "id": "Q234",
    "src": 234,
    "domain": 2,
    "skill": "2.2",
    "topic": "Comunicação remota do PowerShell",
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
    "explanation": "Os computadores de **destino** precisam ter o remoting habilitado com **Enable-PSRemoting** (WinRM, listener e firewall). Enable-MMAgent trata do Memory Manager, nada a ver com remoting.",
    "details": "**Por que não as outras**\n- **Enable-MMAgent:** Memory Manager.\n- **Allow Remote Shell Access:** controla o WinRS, mas não habilita o WinRM.\n- **Turn on Script Execution:** política de execução local.",
    "docs": [
      {
        "t": "Security considerations for PowerShell Remoting using WinRM - PowerShell",
        "u": "https://learn.microsoft.com/en-us/powershell/scripting/security/remoting/winrm-security"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q235",
    "src": 235,
    "domain": 1,
    "skill": "2.1",
    "topic": "Página de Status de Inscrição",
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
    "explanation": "A **Enrollment Status Page** mostra o progresso e, com \"Block device use until all apps and profiles are installed\", impede o uso até concluir.",
    "details": "**Por que não as outras**\n- **App configuration / app protection:** sem relação com o provisionamento.\n- **Platform restriction:** bloqueia plataformas na inscrição.",
    "docs": [
      {
        "t": "Set up the Enrollment Status Page in the admin center copy - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/windows/setup-status-page"
      }
    ]
  },
  {
    "id": "Q236",
    "src": 236,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
    "type": "multi",
    "layout": "panel",
    "panelTitle": "Windows 10/11 compliance policy · Compliance settings",
    "stem": "You have a Microsoft 365 subscription. The subscription contains 1,000 computers that run Windows 11 and are enrolled in Microsoft Intune.\n\nYou plan to create a compliance policy that has the following options enabled:\n\n- Require Secure Boot to be enabled on the device.\n- Require the device to be at or under the machine risk score.\n\nWhich two Compliance settings should you configure? To answer, select the appropriate settings in the answer area.\n\nNOTE: Each correct selection is worth one point.",
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
    "explanation": "**Require Secure Boot** fica em **Device Health** (atestado pelo Device Health Attestation). O risco de máquina fica na seção **Microsoft Defender for Endpoint**.",
    "details": "**Por que não as outras**\n- **Custom / Properties / ConfigMgr compliance / System Security:** não contêm Secure Boot nem o risco do MDE.\n\n**Dica de prova:** O risco de máquina exige a conexão Intune ↔ MDE habilitada.",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q237",
    "src": 237,
    "domain": 1,
    "skill": "1.1",
    "topic": "Ingresso híbrido",
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
    "explanation": "O estado **Pending** significa que o objeto foi sincronizado, mas o dispositivo ainda não concluiu o registro. Isso acontece no logon do usuário com **comunicação com um DC** (linha de visada), e o dispositivo precisa ler o SCP e se registrar.",
    "details": "**Por que não as outras**\n- **Ativação / licença / quality updates:** não concluem o registro do hybrid join.\n\n**Dica de prova:** dsregcmd /status mostra o estado; o evento 304/305 no log User Device Registration ajuda no diagnóstico.",
    "docs": [
      {
        "t": "Configure Microsoft Entra hybrid join - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/how-to-hybrid-join"
      },
      {
        "t": "What is device identity in Microsoft Entra ID? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/overview"
      },
      {
        "t": "What is a Microsoft Entra joined device? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/concept-directory-join"
      },
      {
        "t": "What is a Microsoft Entra hybrid joined device? - Microsoft Entra ID",
        "u": "https://learn.microsoft.com/en-us/entra/identity/devices/concept-hybrid-join"
      }
    ]
  },
  {
    "id": "Q238",
    "src": 238,
    "domain": 2,
    "skill": "3.2",
    "topic": "Atualizações para todas as plataformas",
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
    "explanation": "O Intune gerencia atualizações de **Windows** (rings, feature/quality), **iOS/iPadOS** e **macOS** (políticas de atualização) e **Android** (system update policy em Android Enterprise corporativo, além de FOTA da Samsung).",
    "details": "**Por que não as outras**\n- **Combinações parciais:** o Intune gerencia atualizações das quatro plataformas, cada uma com a sua política.",
    "docs": [
      {
        "t": "Windows Update Management Overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/"
      },
      {
        "t": "Quick guide to Windows as a service",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/update/waas-quick-start"
      }
    ]
  },
  {
    "id": "Q239",
    "src": 239,
    "domain": 2,
    "skill": "2.3",
    "topic": "Certificados (SCEP)",
    "type": "single",
    "stem": "You have 500 computers that run Windows 10. The computers are joined to Azure AD and enrolled in Microsoft Intune.\n\nYou plan to distribute certificates to the computers by using Simple Certificate Enrollment Protocol (SCEP).\n\nYou have the servers shown in the following table.\n\n| Name | Configuration |\n|---|---|\n| Server1 | Domain controller |\n| Server2 | Root certification authority (CA) |\n| Server3 | Subordinate certification authority (CA) |\n| Server4 | Network Device Enrollment Service (NDES) |\n\nNDES issues certificates from the subordinate CA.\n\nYou are configuring a SCEP certificate device configuration profile. The profile has the Root Certificate field still empty.\n\nYou need to complete the SCEP profile.\n\nOn which server is the required root certificate located?",
    "options": [
      "Server1",
      "Server2",
      "Server3",
      "Server4"
    ],
    "answer": 1,
    "answer_original": 2,
    "shuffle": false,
    "scope": "in",
    "review": "duvidosa",
    "explanation": "O campo **Root Certificate** do perfil SCEP aponta para o perfil de **trusted certificate** da **CA raiz** da cadeia — que está no **Server2**. O dump marca Server3 (a CA emissora); há quem defenda que o perfil deve apontar para a CA que emite, mas a documentação fala em certificado da CA raiz. Confira a discussão.",
    "details": "**Por que não as outras**\n- **Server1 (DC) / Server4 (NDES):** não são a raiz da cadeia.\n- **Server3 (sub CA):** o gabarito do dump marca, mas o campo pede o certificado raiz confiável.\n\n**Dica de prova:** Distribua a raiz e as intermediárias como trusted certificates; o perfil SCEP referencia o da raiz.",
    "docs": [
      {
        "t": "Configure infrastructure to support SCEP certificate profiles with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/fundamentals/certificates/scep-infrastructure"
      },
      {
        "t": "Microsoft Cloud PKI for Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/cloud-pki/"
      },
      {
        "t": "Configure Microsoft Cloud PKI root and issuing CA for Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/cloud-pki/configure-ca"
      }
    ]
  },
  {
    "id": "Q240",
    "src": 240,
    "domain": 1,
    "skill": "1.3",
    "topic": "Check-in de conformidade",
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
    "explanation": "Depois da inscrição, o **Windows** faz check-in a cada 3 minutos por 15 minutos, depois a cada 15 minutos por 2 horas, e então a cada ~8 horas. **iOS/iPadOS** (e macOS) fazem a cada 15 minutos por 1 hora e depois a cada ~8 horas.",
    "details": "**Item a item**\n- **Windows a cada 5 min / iOS como Windows:** os intervalos são diferentes por plataforma (Windows: 3 min no início; iOS: 15 min).",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q241",
    "src": 241,
    "domain": 1,
    "skill": "1.3",
    "topic": "Políticas de conformidade",
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
    "explanation": "Device1 está só em Group2 (excluído), fica **sem política**, e o tenant marca esses dispositivos como **Not Compliant**. Device2 está sem BitLocker; em 2 de agosto ele está **In grace period** (3 dias), e o dump considera que isso não é \"compliant\". Em 6 de agosto (1º + 5 dias) a ação de **retire** é executada. Atenção: nas Q105 e Q111 o dump trata dispositivos em carência como conformes. Essa inconsistência entre questões é o motivo de esta estar como duvidosa.",
    "details": "**Item a item**\n- **Device1 em 4/08:** Não. Sem política, e o tenant marca como Not compliant.\n- **Device2 em 2/08:** Não, pelo gabarito (In grace period não é \"compliant\").\n- **Device2 retirado em 6/08:** Sim. A ação de retire acontece 5 dias após a não conformidade.\n\n**Dica de prova:** Inconsistência entre questões: em outras, o grace period conta como compliant (para CA ele conta).",
    "docs": [
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q242",
    "src": 242,
    "domain": 3,
    "skill": "2.2",
    "topic": "Restrições de dispositivo",
    "type": "multi",
    "layout": "panel",
    "panelTitle": "Device restrictions — Windows 10 and later",
    "stem": "You have 100 computers that run Windows 10. The computers are joined to Azure AD and enrolled in Microsoft Intune.\n\nYou need to configure the following device restrictions:\n\n- Block users from browsing to suspicious websites.\n- Scan all scripts loaded into Microsoft Edge.\n\nWhich two settings should you configure in the Device restrictions configuration profile? To answer, select the appropriate settings in the answer area.\n\nNOTE: Each correct selection is worth one point.",
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
    "explanation": "O bloqueio de sites suspeitos é feito pelo **Microsoft Defender SmartScreen**. \"Scan scripts that are loaded into Microsoft web browsers\" é uma opção do **Microsoft Defender Antivirus** dentro do perfil de Device restrictions.",
    "details": "**Por que não as outras**\n- **Edge Browser:** configurações do Edge legado.\n- **Network proxy / Privacy / Search / Start etc.:** não bloqueiam sites suspeitos nem escaneiam scripts.",
    "docs": [
      {
        "t": "Restrict devices features using policy in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-device-restrictions"
      },
      {
        "t": "Configurar perfis de configuração de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/create-device-profile"
      },
      {
        "t": "Importar modelos ADMX personalizados e de parceiros de terceiros no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/import-custom-admx-templates"
      },
      {
        "t": "Usar o Microsoft Intune para importar e analisar políticas de grupo - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/import-group-policy-analytics"
      }
    ]
  },
  {
    "id": "Q243",
    "src": 243,
    "domain": 2,
    "skill": "2.4",
    "topic": "Ciclo de vida de dispositivos",
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
    "explanation": "Dispositivos iOS em **User Enrollment** não suportam Wipe, só Retire. A opção \"Retain enrollment state and user account\" do Wipe existe apenas para **Windows**.",
    "details": "**Item a item**\n- **Wipe no Device4:** iOS em User Enrollment não suporta wipe.\n- **Reter a inscrição em Android/iOS:** a opção \"Retain enrollment state\" existe só no Windows.",
    "docs": [
      {
        "t": "Wipe devices with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/wipe"
      },
      {
        "t": "Device Action: Sync - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/sync"
      },
      {
        "t": "Device Action: Restart - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/actions/restart"
      }
    ]
  },
  {
    "id": "Q244",
    "src": 244,
    "domain": 1,
    "skill": "2.1",
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
    "explanation": "Device1 não está no Intune, então a conversão não o registra no Autopilot. Device2 está em Group2, **excluído**. Device3 já é Autopilot e está no grupo do perfil. Atenção: a terceira afirmação diz \"restart\" — um simples reinício não dispara o Autopilot; o gabarito \"Sim\" só faz sentido se a intenção era \"reset\". Por isso a questão está como duvidosa.",
    "details": "**Item a item**\n- **Device1:** Não. Não está no Intune, então não é convertido.\n- **Device2:** Não. Excluído (Group2).\n- **Device3:** Sim, pelo gabarito (com reset; um simples restart não dispara o Autopilot).",
    "docs": [
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ]
  },
  {
    "id": "Q246",
    "src": 246,
    "domain": 4,
    "skill": "4.2",
    "topic": "Políticas de configuração de aplicativos",
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
    "explanation": "App configuration policies para Android Enterprise gerenciado se aplicam a apps do **Managed Google Play** e a **Android Enterprise system apps** (apps de sistema habilitados pelo Intune).",
    "details": "**Por que não as outras**\n- **Web link / Android store app / built-in:** não suportam managed configurations.\n\n**Dica de prova:** As Android Enterprise system apps são apps pré-instalados habilitados pelo Intune em dispositivos dedicados ou fully managed.",
    "docs": [
      {
        "t": "App Configuration Policies for Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/overview"
      },
      {
        "t": "Add App Configuration Policies for Managed iOS/iPadOS Devices - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-ios"
      }
    ]
  },
  {
    "id": "Q247",
    "src": 247,
    "domain": 4,
    "skill": "4.1",
    "topic": "Plataformas de implantação de aplicativos",
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
    "explanation": "O Intune implanta apps em Windows, Android, iOS/iPadOS e macOS. Para **Linux** (Ubuntu), o Intune oferece só conformidade e scripts, sem implantação de apps.",
    "details": "**Por que não as outras**\n- **Device4 (Ubuntu):** o Intune não implanta apps em Linux (só compliance e scripts).\n- **Combinações sem Android ou iOS:** as duas plataformas recebem apps.",
    "docs": [
      {
        "t": "Add Apps to Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/"
      },
      {
        "t": "Gerenciamento de aplicativos Win32 no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/win32"
      },
      {
        "t": "Adicionar um aplicativo de linha de negócios do Windows ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-lob-windows"
      },
      {
        "t": "Adicionar aplicativos da Microsoft Store ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store"
      }
    ]
  },
  {
    "id": "Q248",
    "src": 248,
    "domain": 4,
    "skill": "4.1",
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
    "explanation": "O dump marca Sim nas três: App1 está com \"Shows in Company Portal\" ativado; Word (Required para o usuário) e Excel (Required para o dispositivo) são instalados. **Ponto de discussão:** a documentação diz que, com várias atribuições de Microsoft 365 Apps para o mesmo dispositivo, só a **primeira** é aplicada e as demais falham — o que levaria a Excel = Não. Confira a discussão.",
    "details": "**Item a item**\n- **Excel instalado:** o gabarito diz Sim, mas a documentação indica que só a primeira atribuição de M365 Apps vale por dispositivo.\n\n**Dica de prova:** Na prática, use um único app Microsoft 365 Apps com todos os apps necessários por dispositivo.",
    "docs": [
      {
        "t": "Add Microsoft 365 Apps to Windows Devices Using Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-365-windows"
      }
    ]
  },
  {
    "id": "Q249",
    "src": 249,
    "domain": 5,
    "skill": "5.2",
    "topic": "Análise de endpoint",
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
    "explanation": "O **Endpoint analytics** (no **Intune admin center**, em Reports) tem a visão de Startup performance por modelo de dispositivo.",
    "details": "**Item a item**\n- **Compliance policies / Device diagnostics:** não medem tempo de boot por modelo.\n- **M365 Apps admin center / Entra:** o Endpoint analytics fica no Intune admin center.",
    "docs": [
      {
        "t": "Endpoint analytics overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/endpoint-analytics/"
      },
      {
        "t": "Use Remediations to Detect and Fix Support Issues - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations"
      }
    ]
  },
  {
    "id": "Q250",
    "src": 250,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "Para alcançar as VMs da VNet1 é preciso uma **Azure network connection** para essa VNet. Como a VNet1 **não tem conexão com o on-premises**, o Cloud PC não alcança um DC, então o join precisa ser **Microsoft Entra Join** (o hybrid join exige linha de visada para o AD DS). Licença **Enterprise** (Frontline é por turno, com acesso restrito). O dump marcava Hybrid Join.",
    "details": "**Item a item**\n- **Hybrid join:** exige linha de visada para um DC (VNet com conectividade on-premises).\n- **Rede hospedada pela Microsoft:** não alcança a VNet1.\n- **Frontline:** acesso por turno, com limite de sessões simultâneas.",
    "docs": [
      {
        "t": "Create provisioning policies for Windows 365",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/create-provisioning-policy"
      },
      {
        "t": "Azure network connection overview",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/azure-network-connections"
      },
      {
        "t": "Device images in Windows 365",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/device-images"
      }
    ]
  },
  {
    "id": "Q252",
    "src": 252,
    "domain": 1,
    "skill": "2.1",
    "topic": "Requisitos do Windows 11",
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
    "explanation": "Requisitos do Windows 11: geração 2 (UEFI/Secure Boot), **vTPM**, pelo menos **2 processadores** e 4 GB de RAM. VM1 é geração 1 sem TPM; VM3 tem 1 vCPU. Só a VM2 atende.",
    "details": "**Por que não as outras**\n- **VM1:** Geração 1, sem TPM.\n- **VM3:** 1 vCPU.\n\n**Dica de prova:** O Windows 11 também exige processador de uma lista suportada; em VMs, conta a configuração virtual.",
    "docs": [
      {
        "t": "Requisitos do Windows 11",
        "u": "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Ativação de assinatura do Windows",
        "u": "https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation"
      }
    ]
  },
  {
    "id": "Q253",
    "src": 253,
    "domain": 4,
    "skill": "4.2",
    "topic": "Políticas de proteção de aplicativos",
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
    "explanation": "\"Restrict cut, copy, and paste between other apps\" é uma configuração de transferência de dados da **app protection policy**.",
    "details": "**Por que não as outras**\n- **App configuration:** configura o app.\n- **App provisioning profile:** assinatura de apps.\n- **Policies for Office apps:** políticas de nuvem do Office (configurações), não DLP entre apps.",
    "docs": [
      {
        "t": "App Protection Policies Overview - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/overview"
      },
      {
        "t": "Create and Deploy App Protection Policies - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/protection/create-policy"
      }
    ]
  },
  {
    "id": "Q254",
    "src": 254,
    "domain": 5,
    "skill": "5.2",
    "topic": "Relatórios",
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
    "explanation": "O relatório **Device actions** (Devices > Monitor) lista as ações remotas (wipe, retire, delete…) com quem iniciou e o status.",
    "details": "**Por que não as outras**\n- **Noncompliant devices / assignment status / health attestation:** não registram ações remotas.\n\n**Dica de prova:** O Audit log do Intune também mostra quem iniciou cada ação.",
    "docs": [
      {
        "t": "Relatórios do Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/overview"
      },
      {
        "t": "Usar APIs do Graph para exportar relatórios do Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/export-graph-apis"
      },
      {
        "t": "Encaminhar logs para o Azure Monitor usando o Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/governance/integrate-azure-monitor"
      }
    ]
  },
  {
    "id": "Q255",
    "src": 255,
    "domain": 2,
    "skill": "3.2",
    "topic": "Anéis de atualização do Windows",
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
    "explanation": "Atualizações mensais (quality) são controladas por **update rings**: um anel de teste sem adiamento e um anel de produção com adiamento de 15 dias.",
    "details": "**Por que não as outras**\n- **Configuration profile / security baseline:** não controlam atualizações mensais.\n- **Feature update policy:** trata de versões do Windows, não das quality updates mensais.\n\n**Dica de prova:** Alternativa moderna: Windows Autopatch, com anéis de teste/primeiro/rápido/amplo.",
    "docs": [
      {
        "t": "Gerenciar políticas de anéis de atualização do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-update-rings"
      },
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Gerenciar atualizações de qualidade do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-quality-updates"
      }
    ]
  },
  {
    "id": "Q256",
    "src": 256,
    "domain": 5,
    "skill": "5.2",
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
    "explanation": "Os eventos vão para um **workspace do Log Analytics**, onde é possível criar alertas de log com KQL. Nos computadores, instale o **Azure Monitor Agent**.",
    "details": "**Item a item**\n- **Event Hub / SQL / Storage:** não permitem alertas de log com KQL nativamente.\n- **Event Collector / event subscription:** são WEF (on-premises).\n\n**Dica de prova:** Crie uma DCR com XPath dos eventos e associe ao Monitored Object (clientes Windows).",
    "docs": [
      {
        "t": "Encaminhar logs para o Azure Monitor usando o Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/governance/integrate-azure-monitor"
      },
      {
        "t": "Relatórios do Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/overview"
      },
      {
        "t": "Usar APIs do Graph para exportar relatórios do Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-management/reports/export-graph-apis"
      }
    ]
  },
  {
    "id": "Q257",
    "src": 257,
    "domain": 3,
    "skill": "3.1",
    "topic": "Proteção contra adulteração",
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
    "explanation": "O **tamper protection** impede a desativação do Defender; ele pode ser ligado para o tenant no **portal do Defender** (ou por política de Antivirus no Intune, como na Q267).",
    "details": "**Por que não as outras**\n- **ASR / account protection:** não impedem desligar o Defender.\n- **CA:** reage ao acesso; não protege o agente.",
    "docs": [
      {
        "t": "Tamper protection overview - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/tamper-protection-overview"
      },
      {
        "t": "Manage antivirus settings with endpoint security policies in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/antivirus"
      }
    ]
  },
  {
    "id": "Q258",
    "src": 258,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "A imagem precisa virar uma **managed image no Azure**, e o Azure só aceita discos **VHD de tamanho fixo** — VHDX não é suportado. O disco já é fixo, de 64 GB e geração 2 (o que o Windows 365 exige), então o que falta é converter para **VHD**. O dump marcava \"Dynamically expanding\", que seria inclusive um passo na direção errada.",
    "details": "**Por que não as outras**\n- **Dynamically expanding:** o Azure exige disco de tamanho fixo.\n- **Geração 1:** o Windows 365 exige Geração 2.\n- **Aumentar o disco:** 64 GB já atende.\n\n**Dica de prova:** Comando: Convert-VHD -Path VM1.vhdx -DestinationPath VM1.vhd -VHDType Fixed; depois, sysprep /generalize /oobe.",
    "docs": [
      {
        "t": "Create provisioning policies for Windows 365",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/create-provisioning-policy"
      },
      {
        "t": "Azure network connection overview",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/azure-network-connections"
      },
      {
        "t": "Device images in Windows 365",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/device-images"
      }
    ]
  },
  {
    "id": "Q259",
    "src": 259,
    "domain": 1,
    "skill": "2.1",
    "topic": "Ingresso híbrido com Autopilot",
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
    "details": "**Item a item**\n- **Enroll / exportar hash no Server1:** o servidor só hospeda o conector.\n- **Delegar no Admin1 / Server1 como recurso:** a permissão de criar computadores é delegada na OU de destino.",
    "docs": [
      {
        "t": "Enrollment for Microsoft Entra hybrid joined devices - Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/windows-autopilot-hybrid"
      },
      {
        "t": "Visão geral do ingresso no Microsoft Entra controlado pelo usuário com o Windows Autopilot no Intune",
        "u": "https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow"
      },
      {
        "t": "Registrar dispositivos manualmente no Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/add-devices"
      },
      {
        "t": "Modo controlado pelo usuário do Windows Autopilot",
        "u": "https://learn.microsoft.com/en-us/autopilot/user-driven"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/autopilot/windows-autopilot-hybrid"
    ]
  },
  {
    "id": "Q260",
    "src": 260,
    "domain": 2,
    "skill": "2.1",
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
    "details": "**Por que não as outras**\n- **Provisioning policy primeiro:** ela precisa de uma ANC para hybrid join.\n- **Configuration profile / custom image:** opcionais.",
    "docs": [
      {
        "t": "Create Azure network connections for Windows 365",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/create-azure-network-connection"
      },
      {
        "t": "Create provisioning policies for Windows 365",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/create-provisioning-policy"
      },
      {
        "t": "Azure network connection overview",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/azure-network-connections"
      },
      {
        "t": "Device images in Windows 365",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/device-images"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/windows-365/enterprise/create-azure-network-connection"
    ]
  },
  {
    "id": "Q261",
    "src": 261,
    "domain": 2,
    "skill": "2.1",
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
    "explanation": "Para hybrid join a VNet precisa **resolver e alcançar o DC**. Só a VNet1 tem conectividade com o on-premises (GW1 + CN1) e DNS apontando para dc1.contoso.com. A VNet3 tem gateway, mas sem conexão e com Azure DNS.",
    "details": "**Por que não as outras**\n- **VNet2:** sem gateway e com Azure DNS; não resolve nem alcança o DC.\n- **VNet3:** tem gateway, mas não está conectada e usa Azure DNS.",
    "docs": [
      {
        "t": "Create provisioning policies for Windows 365",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/create-provisioning-policy"
      },
      {
        "t": "Azure network connection overview",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/azure-network-connections"
      },
      {
        "t": "Device images in Windows 365",
        "u": "https://learn.microsoft.com/en-us/windows-365/enterprise/device-images"
      }
    ]
  },
  {
    "id": "Q262",
    "src": 262,
    "domain": 1,
    "skill": "1.3",
    "topic": "Notificações de conformidade",
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
    "explanation": "O e-mail ao usuário e aos admins é uma **ação de não conformidade** (Send email to end user + additional recipients) que usa um **notification message template**. A verificação \"Up-to-date security provider\" fica na política de conformidade. O dump coloca a política primeiro e o template depois. Na prática o template precisa existir antes de ser escolhido na ação, por isso a questão está como duvidosa quanto à ordem.",
    "details": "**Sequência**\n- **CA / ASR / custom notification:** não enviam e-mail por não conformidade.\n\n**Dica de prova:** Na prática, crie o template de notificação antes e selecione-o na ação \"Send email to end user\".",
    "docs": [
      {
        "t": "Configure compliance policies with actions for noncompliance in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/configure-noncompliance-actions"
      },
      {
        "t": "Políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/overview"
      },
      {
        "t": "Criar políticas de conformidade de dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/create-policy"
      },
      {
        "t": "Configurações de conformidade do Windows no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-windows-settings"
      }
    ]
  },
  {
    "id": "Q263",
    "src": 263,
    "domain": 2,
    "skill": "2.2",
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
    "explanation": "O dump marca **Identity protection** para o Windows Hello e **Endpoint protection** para o SmartScreen. Ponto de discussão: o Surface Hub roda Windows 10 **Team**, e os templates de Identity/Endpoint protection são para Windows 10 desktop; o perfil **Device restrictions (Windows 10 Team)** tem opções próprias. Confira a discussão.",
    "details": "**Item a item**\n- **Device restrictions (Windows 10 Team):** tem opções do Surface Hub; o gabarito usa Identity/Endpoint protection.\n- **Defender for Endpoint (desktop) / health monitoring:** não configuram WHfB nem SmartScreen.",
    "docs": [
      {
        "t": "Manage Surface Hub with an MDM provider - Surface Hub",
        "u": "https://learn.microsoft.com/en-us/surface-hub/manage-settings-with-mdm-for-surface-hub"
      },
      {
        "t": "Windows Holographic Business device settings - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-device-restrictions-windows-holographic"
      },
      {
        "t": "Surface Hub Windows 10 Team device restrictions in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-device-restrictions-surface-hub"
      },
      {
        "t": "Deploy OEMConfig profiles to Zebra devices using Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/templates/deploy-oemconfig-zebra-android"
      }
    ]
  },
  {
    "id": "Q264",
    "src": 264,
    "domain": 2,
    "skill": "3.2",
    "topic": "Atualizações de recursos",
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
    "explanation": "Todos estão em Group2 (Windows). Device1 tem extensionAttribute1 = Test → está em Group3, **excluído**. Device3 está em Group1, **excluído**. Só o Device2 recebe a atualização.",
    "details": "**Item a item**\n- **Device1:** Não. Excluído via Group3 (atributo Test).\n- **Device2:** Sim. Só no Group2.\n- **Device3:** Não. Excluído via Group1.",
    "docs": [
      {
        "t": "Gerenciar atualizações de recursos do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates"
      },
      {
        "t": "Gerenciar políticas de anéis de atualização do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-update-rings"
      },
      {
        "t": "Gerenciar atualizações de qualidade do Windows - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-quality-updates"
      }
    ]
  },
  {
    "id": "Q265",
    "src": 265,
    "domain": 1,
    "skill": "1.2",
    "topic": "Restrições de inscrição",
    "type": "multi",
    "layout": "panel",
    "panelTitle": "Edit restriction — Device type restriction · Platform settings",
    "stem": "You have a Microsoft 365 E5 subscription that uses Microsoft Intune.\n\nYou need to ensure that users can only enroll devices that meet the following requirements:\n\n- Android devices that support the use of work profiles.\n- iOS devices that run iOS 11.0 or later.\n\nThe current device type restriction allows Android Enterprise (work profile), Android device administrator and iOS/iPadOS, with no version limits.\n\nWhich two restrictions should you modify? To answer, select the restrictions in the answer area.\n\nNOTE: Each correct selection is worth one point.",
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
    "explanation": "Para aceitar só Android com work profile, **bloqueie a plataforma Android device administrator** (o Android Enterprise já está permitido). Para iOS 11.0 ou superior, defina a **versão mínima** do iOS/iPadOS como 11.0.",
    "details": "**Por que não as outras**\n- **Android Enterprise / iOS Platform:** já estão permitidas.\n- **Versões do Android Enterprise / device admin:** o requisito de Android é o tipo, não a versão.\n- **macOS / Windows:** fora do escopo.",
    "docs": [
      {
        "t": "Overview of enrollment restrictions - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/restrictions"
      },
      {
        "t": "Etapa 5 – Inscrever dispositivos no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-enrollment/enroll-devices"
      }
    ]
  },
  {
    "id": "Q266",
    "src": 266,
    "domain": 3,
    "skill": "1.3",
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
    "details": "**Por que não as outras**\n- **Configuration profile:** possível via Settings catalog/OMA-URI, mas o caminho dedicado é Account protection.\n- **App protection / compliance:** sem relação.\n\n**Dica de prova:** O LAPS no Entra exige habilitar \"Enable Microsoft Entra Local Administrator Password Solution\" em Device settings.",
    "docs": [
      {
        "t": "Overview of Windows LAPS with Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/laps/overview"
      },
      {
        "t": "Deploy Intune policies to manage Windows LAPS - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-security/laps/deploy-policy"
      },
      {
        "t": "Windows LAPS Overview: Manage Admin Passwords",
        "u": "https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-overview"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/protect/windows-laps-overview"
    ]
  },
  {
    "id": "Q267",
    "src": 267,
    "domain": 3,
    "skill": "3.1",
    "topic": "Proteção contra adulteração",
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
    "explanation": "**Tamper protection** é habilitado pela política de **Antivirus** (perfil Windows Security experience) no Endpoint security. Compliance e Conditional Access só reagem; não impedem que o usuário desligue o Defender.",
    "details": "**Por que não as outras**\n- **Security baseline:** pode conter tamper protection em versões recentes, mas o gabarito usa a política de Antivirus.\n- **CA / compliance:** não impedem a desativação.",
    "docs": [
      {
        "t": "Tamper protection overview - Microsoft Defender for Endpoint",
        "u": "https://learn.microsoft.com/en-us/defender-endpoint/tamper-protection-overview"
      },
      {
        "t": "Manage antivirus settings with endpoint security policies in Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/antivirus"
      }
    ]
  },
  {
    "id": "Q268",
    "src": 268,
    "domain": 4,
    "skill": "4.1",
    "topic": "Aplicativos de linha de negócios",
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
    "explanation": "Um .apk próprio carregado no Intune é um app **line-of-business**. (Para Android Enterprise, o recomendado seria publicar como app privado no Managed Google Play, mas a questão pede o tipo para um arquivo APK.)",
    "details": "**Por que não as outras**\n- **Built-in / Android store / web link:** não aceitam o upload de APK.\n- **Managed Google Play:** recomendado como app privado, mas o tipo \"arquivo APK\" é LOB (só no device administrator legado).",
    "docs": [
      {
        "t": "Adicionar um aplicativo de linha de negócios do Windows ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-lob-windows"
      },
      {
        "t": "Gerenciamento de aplicativos Win32 no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/win32"
      },
      {
        "t": "Adicionar aplicativos da Microsoft Store ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store"
      }
    ]
  },
  {
    "id": "Q269",
    "src": 269,
    "domain": 4,
    "skill": "4.1",
    "topic": "Aplicativos Win32",
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
    "details": "**Por que não as outras**\n- **App configuration:** não empacota.\n- **M365 Apps admin center:** Office.\n- **Azure Blob:** o Intune hospeda o conteúdo.",
    "docs": [
      {
        "t": "Gerenciamento de aplicativos Win32 no Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/win32"
      },
      {
        "t": "Prepare a Win32 App to Be Uploaded to Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/create-win32-package"
      },
      {
        "t": "Adicionar um aplicativo de linha de negócios do Windows ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-lob-windows"
      },
      {
        "t": "Adicionar aplicativos da Microsoft Store ao Microsoft Intune - Microsoft Intune",
        "u": "https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store"
      }
    ],
    "refs": [
      "https://learn.microsoft.com/en-us/mem/intune/apps/apps-win32-prepare"
    ]
  }
]);
