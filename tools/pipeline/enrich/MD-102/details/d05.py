DET = {
"Q143": """Computer1 com 7, 10 ou 13 dias :: só o Ring1 (3 dias) se aplica; os adiamentos não se somam.
Computer2 com algum valor :: excluído dos dois anéis.
! Evite atribuir anéis conflitantes; um dispositivo deve ter só um update ring.""",
"Q144": """Application Guard / SmartScreen / Application Control / Credential Guard :: não tratam de processos filhos do Office nem de FTP.
Encryption / Security Center / Local security options / Xbox :: sem relação.
! Hoje: Endpoint security > ASR (regras) e Firewall (regras), com relatórios melhores.""",
"Q145": """Combinações parciais :: há template de VPN para Windows, Android Enterprise, iOS/iPadOS e macOS.
! Tipos de conexão variam por plataforma (ex.: IKEv2 nativo, Cisco Secure Client, Microsoft Tunnel).""",
"Q146": """Device restrictions (Teams) / Identity protection / Device restrictions :: templates com opções fixas; não aceitam OMA-URI arbitrário.
! Prefira o Settings catalog quando a configuração existir nele; o Custom é o último recurso.""",
"Q147": """Device1 :: Não. O User1 está no Group1 excluído.
Device2 :: Sim. Políticas de "Windows 10 and later" valem para o Windows 11.
Device3 :: Não. Android, e as políticas são de Windows.""",
"Q148": """200 / 1.000 :: só os dispositivos supervisionados (ADE) recebem política de atualização.
Compliance / CA :: não impedem a instalação manual de versão mais nova.
! A restrição "Defer software updates" (até 90 dias) esconde as atualizações do usuário.""",
"Q149": """User1 :: Sim. Está no MDM scope.
User2 :: Não. Está só no escopo MAM.
User3 :: Sim. Está nos dois; o MDM tem precedência.""",
"Q150": """DC1 :: não é quem cria os objetos.
GroupA :: usuários não criam o computador no Autopilot hybrid.
Server2 :: o conector não está nele.
! Delegue "Create computer objects" e "Delete computer objects" na OU para a conta de computador do servidor do conector.""",
"Q151": """Device1 com 1, 3 ou mais :: a Connection1 substitui a VPN1 de mesmo nome; somam-se só as conexões diferentes.
Device2 com 2, 4 ou 5 :: VPN1 (substituída), VPN3 (já existente) e VPN2.""",
"Q152": """Ambígua :: pela documentação, qualquer usuário licenciado pode inscrever pelo Company Portal; o gabarito considera o MDM scope e o Global Admin.
! Restrições de plataforma e de limite de dispositivos também podem bloquear a inscrição.""",
"Q153": """App configuration :: configura o app, não bloqueia a impressão.
Security baseline :: só Windows.
App provisioning profile :: assina apps LOB de iOS.""",
"Q154": """Admin1 / Admin2 :: funções de apps do Entra, sem acesso ao Microsoft 365 Apps admin center.
! O Office Apps Administrator também gerencia Cloud Policy e Servicing.""",
"Q155": """Device compliance :: só dispositivos inscritos.
App protection policies :: lista as políticas, não o relatório de status.
Devices > Monitor :: relatórios de dispositivos inscritos.""",
"Q156": """Admin1 :: o Intune atribui a grupos, não a usuários avulsos.
Group2 (distribuição) :: grupos de distribuição não são suportados em atribuições.""",
"Q157": """Authenticator :: é o broker no iOS (com o Company Portal opcional); no Android, o broker é o Company Portal.
MDE / Purview :: não são necessários para MAM.
Dispositivos / usuários e dispositivos :: app protection é sempre atribuída a usuários.""",
"Q158": """Baixar do Company Portal :: é a ação do usuário, não a preparação.
OEMConfig :: configura recursos do fabricante (ex.: Samsung, Zebra), não publica apps.
! Apps aprovados também podem ser sincronizados automaticamente; a sincronização manual força a atualização.""",
"Q159": """Device1 (Home) :: Home não tem caminho direto para Enterprise.
Device2 (32 bits) :: o Windows 11 é só 64 bits.
! Home → Pro → Enterprise é possível com etapas de mudança de edição, mas não como upgrade direto.""",
"Q160": """Device1 vira Windows 11 :: a ativação não muda a versão.
Clean install / in-place upgrade :: a subscription activation só ativa a edição Enterprise, sem instalar nada.""",
"Q162": """ESP para join / deployment profile para progresso :: cada um tem uma função; o perfil define OOBE e join, e a ESP acompanha o provisionamento.""",
"Q168": """Join / enroll antes :: o dispositivo novo só recebe o perfil depois de registrado no Autopilot.
Registrado / AD only / AD + registro :: o perfil diz Azure AD joined.""",
"Q169": """Marketing com Enterprise / Workstations :: o Pro já suporta WUfB (mínimo).
Research com Pro :: 24 meses; 36 meses só no Enterprise/Education.""",
"Q170": """Device1 (sem TPM) / Device2 (TPM 1.2) :: o self-deploying exige TPM 2.0 com atestação.
! O pre-provisioning (White Glove) também exige TPM 2.0.""",
"Q171": """Always On VPN :: ajuda, mas não cria o objeto de computador.
Co-management :: é para ConfigMgr + Intune.
Configuration profile para o app :: apps são entregues por atribuição de app, não por perfil.
! Para dispositivos remotos, o perfil precisa de "Skip AD connectivity check" e uma VPN que conecte antes do logon.""",
"Q172": """Allow Remote Shell :: só controla o WinRS; não habilita o listener.
Exceção do Remote Desktop :: é RDP, não WinRM.
Remote Registry :: sem relação.
! Os três itens equivalem ao que o Enable-PSRemoting faz localmente.""",
"Q173": """Autopilot :: reprovisiona; é mais esforço.
MDT / in-place com mídia :: reinstalam ou atualizam, sem necessidade.
! Os dispositivos precisam ser Entra joined ou hybrid joined para a ativação.""",
"Q174": """Device1 (Windows) :: Sim. Sem política aplicável, o tenant marca como Compliant.
Device2 :: Não. Fora da location exigida.
Device3 :: Sim. Na location e sem root.
! Locations e device administrator estão descontinuados; questão do modelo antigo.""",
"Q175": """Hybrid join :: exige domínio AD.
Entra joined :: o logon passaria a ser com a conta corporativa, o que contraria o requisito.
! Com "Allow my organization to manage my device" na adição da conta, o dispositivo se inscreve no Intune como pessoal.""",
"Q176": """Compliance / configuration para o Requirement1 :: localização de acesso a um app é condição de CA.
CA / configuration para o Requirement2 :: o risco do MDE entra na compliance policy; o CA usa o resultado.""",
"Q177": """Help Desk Operator para o Group1 :: não gerencia funções.
Intune Service Administrator :: Entra role com acesso total; excesso.
Policy and Profile Manager para o Group2 :: cria e gerencia políticas (mais do que atribuir).
! Funções do Intune podem ter escopo por scope tags e grupos (assignments).""",
"Q178": """Device1 :: Não. A Policy2 exige Secure Boot.
Device2 :: Sim. Tem Secure Boot.
Device3 (Android) :: Sim. Só a Policy4 se aplica, e ela não exige nada.""",
}
