DET = {
"Q068": """Dispositivos só registrados :: a subscription activation exige dispositivo Entra joined ou hybrid joined.
! Os requisitos de versão (Windows 10 1703+ / Windows 11) e a licença E3/E5 (ou A3/A5) no usuário também precisam ser atendidos.""",
"Q072": """Connect-WSMan :: conecta a um WinRM remoto; não configura o local.
Invoke-WSManAction :: chama métodos de recursos WMI via WS-Man.
Enable-PSSessionConfiguration :: só reabilita configurações de sessão; não cria o listener nem a exceção de firewall.
! Em redes Public, use -SkipNetworkProfileCheck (a regra de firewall fica restrita à sub-rede local).""",
"Q073": """Device1 com User1 :: Sim. Entra joined + licença via Group1, e Pro → Enterprise acontece.
Device2 :: Não. Só AD DS; o dispositivo precisa ser Entra/hybrid joined.
Device3 :: Não vira Windows 11. A ativação muda só a edição (Windows 10 Enterprise), não a versão.""",
"Q075": """VM1 (Geração 1) :: sem UEFI/Secure Boot/vTPM.
VM2 (1 vCPU) :: o mínimo são 2 núcleos.
! No Hyper-V, habilite também o TPM virtual (Security > Enable Trusted Platform Module) na VM de geração 2.""",
"Q076": """User1 completa :: Não. Sem licença de Intune (e Entra P1 para a inscrição automática).
User2 completa :: Sim. A licença M365 E3 inclui Intune e Entra P1.
User3 vê o progresso :: Sim. Está no grupo atribuído à ESP.
! A ESP é atribuída a grupos de usuários ou dispositivos; o perfil Autopilot é atribuído a grupos de dispositivos.""",
"Q077": """3, 7 ou 8 :: o limite é de 5 dispositivos por usuário licenciado.
! A mesma regra vale para Microsoft 365 Apps (5 PCs/Macs + 5 tablets + 5 telefones).""",
"Q078": """JSON :: é o formato do perfil Autopilot offline (AutopilotConfigurationFile.json), não do registro de hardware.
azcopy :: o upload do CSV é feito no Intune (Windows Autopilot devices > Import).
! Depois do import, atribua o perfil (grupo) e aguarde o status "Assigned" antes do reset.""",
"Q081": """Device configuration profile :: exige dispositivo inscrito.
DLP do Purview :: protege conteúdo sensível, mas não exige PIN no app nem restringe salvar em outra nuvem de forma nativa.
Insider risk :: trata de comportamento de risco interno.""",
"Q082": """Compliance :: avalia o estado.
Configuration profile :: configura o sistema, não um app específico.
App protection :: protege dados, não entrega favoritos.
! No Android Enterprise, as "managed configurations" vêm do Managed Google Play; o Intune as entrega via app configuration policy.""",
"Q083": """M365 admin center / Intune / Purview :: não geram o XML do ODT.
! A Office Customization Tool também exporta e importa configurações e permite escolher o canal, os idiomas e a remoção de versões MSI.""",
"Q084": """APK :: Android.
Upload direto :: o Intune exige o .intunewin para Win32.
MDT :: ferramenta de imagem.
! Comando: IntuneWinAppUtil.exe -c <pasta> -s setup.exe -o <saída>.""",
"Q085": """LT1 :: Sim. Corporativo, Windows, no grupo.
LT2 :: Não. Pessoal, fora do Group1.
LT3 :: Não. O app atribuído é o de Windows; macOS usa outro tipo de app (Microsoft 365 Apps for macOS).""",
"Q086": """Device restrictions :: já teve "Insider builds", mas o gabarito usa custom e update ring.
App configuration / security baseline :: não controlam o Insider.
! Hoje use o Settings catalog: "Allow Build Preview = Not allowed".""",
"Q087": """Baseline regression threshold :: só ajusta o alerta de regressão.
Log Analytics / workbook :: o Endpoint analytics não depende deles.
! O baseline padrão é "All organizations (median)"; você pode criar baselines próprias depois de ter dados.""",
"Q088": """5 / 14 / 30 :: o padrão é 10 dias (ajustável de 2 a 60 com DISM /Set-OSUninstallWindow ou com a política do update ring).""",
"Q089": """Firewall / event subscription :: não fazem o computador mandar dados ao workspace.
Instalar o AMA primeiro :: o instalador do AMA para Windows client exige o dispositivo Entra joined (o gabarito escolhe o join).
! Com o Azure Arc, servidores fora do Azure também recebem o AMA; para clientes Windows, use o instalador MSI + monitored object.""",
"Q090": """Company Portal :: inscrição sem supervisão; não permite controlar atualizações do iOS.
Compliance :: só marca a versão mínima.
App provisioning profile :: é para apps LOB.
! Hoje as atualizações de iOS são gerenciadas por DDM (declarative device management) no Settings catalog.""",
"Q091": """Aprovação do usuário / próxima terça / próximo mês :: o rollback é imediato ao receber a política.
! Só funciona dentro do período de uninstall (padrão de 10 dias).""",
"Q092": """GPO na Default Domain Policy :: não dá prioridade ao MDM.
Administrative Templates no Intune :: continuariam perdendo para a GPO.
! A configuração MDMWinsOverGP não se aplica a todos os CSPs; Administrative Templates (ADMX) não são afetados.""",
"Q093": """Azure Monitor agent :: não alimenta o Endpoint analytics.
Compliance / CA :: não coletam dados de desempenho.
! Em Endpoint analytics > Settings, a política "Intune data collection" é atribuída a todos ou a grupos.""",
"Q094": """Device1 na quarta :: Sim. Liberado depois do fim da janela de bloqueio (qua 13h).
Device2 :: Não. Grupo excluído.
Device3 :: Não. Sem supervisão, a política de atualização não se aplica.""",
"Q095": """CA1 :: políticas de Conditional Access não entram em policy sets.
Office1 :: políticas de nuvem do Office ficam fora.
Só uma plataforma :: o set aceita várias plataformas.""",
"Q096": """Power BI app :: relatórios, não comparação com baseline.
Endpoint Analytics :: experiência e desempenho.
M365 Defender portal :: é o portal; a ferramenta é o Secure Score (dentro dele).
! O Microsoft Defender Vulnerability Management também tem avaliação de security baselines.""",
"Q097": """Premium add-ons :: licenças do Intune Suite.
Tenant enrollment :: inscrição.
Tunnel Gateway :: VPN.
! A conexão precisa ser ligada também no portal do Defender (Settings > Endpoints > Advanced features > Microsoft Intune connection).""",
"Q098": """Enrollment restrictions :: sem relação.
Certificate managers na CA :: controla a aprovação de certificados, não é exigido.
! O template de certificado na CA precisa permitir a exportação da chave privada para o PKCS, e o conector precisa de permissão no template.""",
"Q099": """Device categories :: escolhidas pelo usuário na inscrição; não refletem a versão.
Corporate identifiers :: marcam ownership.
Device settings do Entra :: limites de join/registro.
! Hoje, assignment filters (osVersion) evitam criar muitos grupos dinâmicos.""",
"Q100": """**Por que App & browser control:** Exploit protection fica lá (System settings e Program settings). Exporte com Get-ProcessMitigation -RegistryConfigFilePath ou pelo botão de exportar, e importe o XML no Intune (ASR/Exploit protection).""",
"Q101": """dsregcmd :: diagnóstico (dsregcmd /status) e operações de hybrid join; não faz o join interativo de workgroup.
Computer Management / netdom :: AD DS.
! O join também pode ser feito no OOBE (Autopilot ou manual).""",
"Q102": """Voz / SMS :: não usam number matching e não são passwordless.
FIDO2 :: passwordless, mas usa PIN/biometria na chave, não number matching.""",
"Q103": """Device compliance policy :: tem só o "Jailbroken devices: Block".
Network location / configuration profile :: não ativam a detecção avançada.
! A detecção avançada usa os serviços de localização do iOS para fazer check-ins mais frequentes.""",
"Q104": """Global Administrator :: excesso de privilégio.
Groups Administrator :: não gerencia usuários.
Password Administrator :: também redefine senhas, mas é mais restrito que o Helpdesk; o gabarito usa Helpdesk.""",
"Q105": """Device1 em 7 ou 8/01 :: Não. Firewall desligado e Policy2 marca imediatamente.
Device2 em 8/01 :: Sim. Em grace period (5 dias, até 10/01), e o grace period conta como conforme para CA.
! Scope tags só limitam a visibilidade para administradores; não excluem dispositivos.""",
"Q106": """Computer1 :: Sim. In grace period (BitLocker, 10 dias).
Computer2 :: Sim. Atende a política.
Computer3 :: Não aparece como Not compliant. Não está inscrito, então não há avaliação.
! Para o CA, dispositivos não inscritos falham em "Require device to be marked as compliant".""",
"Q107": """**Série "Solution" (PIN de 6 dígitos):** Authentication methods do Entra não controlam o PIN do Windows Hello. Atende: **inscrição automática + opções de inscrição do WHfB** no Intune.""",
}
