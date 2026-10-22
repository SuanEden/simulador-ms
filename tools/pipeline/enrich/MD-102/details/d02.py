DET = {
"Q033": """WSUS / ConfigMgr :: exigem servidores on-premises (custo).
GPO :: dispositivos só Entra joined não recebem GPO.
BranchCache / Peer cache :: BranchCache exige configuração on-premises; Peer cache é do ConfigMgr.
! WUfB via Intune = update rings + feature/quality/driver update policies.""",
"Q034": """GPO de WUfB / Peer-to-Peer Networking :: não são a forma gerenciada pelo Intune, e Peer-to-Peer Networking não é Delivery Optimization.
Update ring :: tem uma opção de Delivery Optimization antiga, mas os limites de banda ficam no perfil próprio.
! Limite por porcentagem: "Maximum foreground/background download bandwidth (percentage)".""",
"Q035": """Group1 (distribuição) :: grupos de distribuição não têm SID de segurança útil para permissões locais.
Group3 (local) :: grupos locais não podem ser aninhados em outro grupo local.
! Grupos locais aceitam: usuários locais e do domínio, e grupos globais e universais de segurança do domínio (e domain local do mesmo domínio).""",
"Q036": """BitLocker em System Security :: em System Security fica "Encryption of data storage on device", não o "Require BitLocker".
Versão mínima em Device Health :: a versão do SO fica em Device Properties.
! Device Health usa o Health Attestation, que só é reavaliado após reiniciar.""",
"Q037": """Device1 :: Sim. Atribuído e com BitLocker.
Device2 :: Não. Sem BitLocker.
Device3 :: Não. Excluído (Group2); a exclusão vence a inclusão.""",
"Q038": """BitLocker para o Device1 :: criptografia não garante integridade do boot.
Jailbreak no Android / root no iOS :: cada termo vale para uma plataforma.
! No Android Enterprise, também existe "Play Integrity Verdict" (antigo SafetyNet) para atestar o dispositivo.""",
"Q039": """System Security :: não valida BIOS.
CA Insights workbook :: mostra impacto de CA, não o resultado do script.
Upload do JSON no Entra :: o JSON vai na própria compliance policy do Intune.
! O script de descoberta retorna um JSON compacto; as regras comparam os valores (ex.: BiosVersion GreaterEquals).""",
"Q040": """Event Log Readers :: só lê logs.
Power Users :: grupo legado, sem direitos extras no Windows 10.
! Alternativa de menor privilégio: dar só o direito específico (Change the system time / Manage auditing and security log) via política, sem Administrators.""",
"Q041": """Join para iOS / Ubuntu :: Entra join é só para Windows 10/11 (e Server em VM do Azure).
Registro só de alguns :: iOS, Android, macOS e Ubuntu também registram.""",
"Q042": """User1 (quem fez o join) :: Sim. Vira admin local por padrão (a menos que "Registering user is added as local administrator" esteja em None).
Admin1 (Security admin) :: Não. A função não dá admin local.
Admin2 (Cloud Device admin) :: Não. Também não dá admin local.
! Use "Microsoft Entra Joined Device Local Administrator" ou o Windows LAPS para administração local.""",
"Q043": """Access Control Assistance Operators :: consulta permissões de recursos remotamente.
Remote Desktop Users :: RDP, não WinRM.
Power Users :: legado.
! O endpoint padrão do PowerShell remoting permite Administrators e Remote Management Users.""",
"Q044": """Bloquear tudo / criar usuários / mudar para todos :: usuário Standard altera só o próprio perfil.
Cortana / teclado :: o gabarito considera o nome do computador; a comunidade discute porque o teclado está em automático.
! Com "Apply device name template", use %SERIAL% ou %RAND:x% para padronizar os nomes.""",
"Q048": """Device1 :: Não. Não é gerenciado pelo Intune.
Device2 :: Não. Grupos aninhados não contam na atribuição do Autopilot (e ele também não está no Intune).
Device3 :: Sim. É gerenciado e membro direto do Group1.
! Na prática, use grupos dinâmicos com (device.devicePhysicalIDs -any _ -contains "[ZTDId]") para alvos do Autopilot.""",
"Q049": """Connections / Licensing / Profiles / Session Time Limits / Temporary folders / Connection Broker / Printer Redirection / Remote Session Environment :: não contêm as duas opções pedidas.
! Caminho: Computer Configuration > Administrative Templates > Windows Components > Remote Desktop Services > Remote Desktop Session Host.""",
"Q050": """Autopilot :: não preserva apps e configurações (provisiona do zero ou reseta).
Device2 no upgrade :: Windows 10 32 bits não tem caminho de upgrade para o Windows 11.
! O Intune também faz o upgrade via Feature update policy (Windows 11), preservando os dados, desde que o hardware seja compatível.""",
"Q052": """Automatic enrollment :: define o MDM, não a coleta de logs.
Deployment profile :: OOBE e tipo de join.
Device configuration profile :: não controla a ESP.
! Na ESP, também dá para permitir "Continue anyway" ou "Reset device" em caso de erro.""",
"Q053": """Intune Administrator :: funciona, mas excede o menor privilégio.
Licença M365 E5 :: o E5 não inclui o Remote Help (é add-on ou Intune Suite).
Rerun onboarding :: desnecessário.
! O Remote Help precisa ser habilitado no tenant (Tenant administration > Remote Help > Settings).""",
"Q054": """Image1 (customizada) :: o upgrade in-place exige a mídia oficial; imagens com apps servem para wipe-and-load.
! Comando: setup.exe /auto upgrade /quiet; com o Intune, use Feature update policy.""",
"Q055": """Autopilot com registro manual / automático para Vendas :: OEM é o menor esforço quando o dispositivo vem direto do fabricante.
Autopilot para Marketing :: o requisito é só AD e apps complexos na montagem, o que o ConfigMgr faz melhor.
! O revendedor/CSP também pode registrar os dispositivos (Partner Center).""",
"Q058": """Autopilot / MDT / WDS :: reinstalam ou resetam o Windows e perdem os apps do usuário.
! O provisioning package (.ppkg) pode ser aplicado por clique duplo, por USB no OOBE ou por Install-ProvisioningPackage.""",
"Q059": """**Série "Solution" (PIN de 6 dígitos no join):** atende **inscrição automática + opções de inscrição do Windows Hello for Business** no Intune. Configurações do Entra e device restrictions não atendem.
! Alternativa: política de Account protection (Endpoint security) com o tamanho mínimo do PIN.""",
"Q060": """**Série "Solution":** device restrictions não controlam o PIN do Windows Hello no provisionamento.""",
"Q061": """**Série "Solution":** Devices > Windows > Enrollment > Windows Hello for Business → Minimum PIN length = 6. Vale para todos os novos provisionamentos.""",
"Q062": """Deployment profile :: é do Autopilot (Windows).
App protection :: protege dados em apps.
Compliance :: avalia o estado, não configura.""",
"Q063": """Device1 :: Não. A Policy3 exige criptografia, e ele não tem.
Device3 :: Sim. A Policy1 não exige criptografia.
Device4 :: Sim. A Policy2 não tem requisito violado.""",
"Q064": """Generalizar + Device/Mobility settings :: não registram o dispositivo no Autopilot.
Serial em XML ou CSV :: o import exige o hardware hash (Device Serial Number, Windows Product ID, Hardware Hash).
! Script: Install-Script Get-WindowsAutopilotInfo; Get-WindowsAutopilotInfo -OutputFile AutopilotHWID.csv (ou -Online).""",
"Q065": """User1 com 5 / 15 / 1.000 / ilimitado :: vale o limite da restrição atribuída ao grupo dele (10); a função Intune Administrator não altera o limite.
User2 com 10 ou ilimitado :: DEM tem limite fixo de 1.000.
! Contas DEM não suportam Conditional Access baseado em dispositivo nem Autopilot user-driven.""",
"Q066": """Policy1 no Device2 :: o Device2 é iOS, e a Policy1 é Android.
Policy2 no Device2 :: excluído (Group3).
! A plataforma da política filtra antes dos grupos.""",
"Q067": """Remote Management Users :: dá permissão, mas sem o WinRM habilitado não há conexão.
Trusted for Delegation :: trata de double-hop, não do básico.
New-PSSession no Computer1 :: falharia sem o remoting no destino.""",
}
