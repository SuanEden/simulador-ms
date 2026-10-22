=== L09 | Windows Autopilot controlado pelo usuário com Página de Status de Inscrição | B | 120
questions: Q162,Q064,Q078,Q123,Q168,Q225,Q226,Q227,Q052,Q235,Q076,Q044
predict: Q162
## overview
Faz um Autopilot completo numa VM: registrar o hardware, criar o perfil, a ESP e provisionar pelo OOBE.

- Registrar = **hardware hash** em CSV importado no Intune (Q064, Q078, Q225).
- O **deployment profile** define o OOBE e o tipo de join (Q123, Q162, Q168).
- A **Enrollment Status Page** mostra o progresso, bloqueia o uso e permite coletar logs (Q052, Q162, Q235).
- **User-driven** + inscrição automática = usuário entra no OOBE e o dispositivo já cai no Intune (Q226).
- Grupo dinâmico com **ZTDId** pega todos os dispositivos do Autopilot (Q227).

## prereqs
- W11-LAB03 no checkpoint **00-OOBE** (Gen2, vTPM, memória estática, rede com internet).
- MDM user scope incluindo user01 (L02).
- user01 com licença (Q076: sem licença do Intune o usuário não conclui).

## steps
### 1. Capture o hardware hash
Na tela do OOBE da W11-LAB03, aperte **Shift+F10** e rode:
```powershell
PowerShell.exe -ExecutionPolicy Bypass
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
New-Item -Type Directory -Path C:\HWID -Force | Out-Null; Set-Location C:\HWID
$env:Path += ";C:\Program Files\WindowsPowerShell\Scripts"
Install-Script -Name Get-WindowsAutopilotInfo -Force
Get-WindowsAutopilotInfo -OutputFile AutopilotHWID.csv -GroupTag MD102
```
Copie o CSV para fora da VM (ou use `Get-WindowsAutopilotInfo -Online -GroupTag MD102`, que envia direto com uma conta Intune Administrator). Desligue a VM e tire o checkpoint **00-OOBE-hash**.

### 2. Importe no Intune
@ Intune: Devices > Windows > Enrollment > Windows Autopilot > Devices > Import

- Selecione o CSV > Import. Depois **Sync** e **Refresh** até o dispositivo aparecer.

! Não abra o CSV no Excel para "conferir": salvar pelo Excel quebra o arquivo.

### 3. Grupo dinâmico do Autopilot
@ Entra: Entra ID > Groups > All groups > New group

```text
MD102-L09-Autopilot · Security · Dynamic Device
(device.devicePhysicalIds -any (_ -eq "[OrderID]:MD102"))
```
Para pegar **todos** os dispositivos do Autopilot (Q227), a regra seria `(device.devicePhysicalIDs -any (_ -startsWith "[ZTDId]"))`.

### 4. Deployment profile
@ Intune: Devices > Windows > Enrollment > Windows Autopilot > Deployment profiles > Create profile > Windows PC

- Nome: MD102-L09-UserDriven · Convert all targeted devices to Autopilot: **No**
- Deployment mode: **User-Driven** · Join to Microsoft Entra ID as: **Microsoft Entra joined**
- Microsoft Software License Terms: Hide · Privacy settings: Hide · Hide change account options: Hide
- User account type: **Standard** · Allow pre-provisioned deployment: No
- Language (Region): Operating system default · Automatically configure keyboard: Yes
- Apply device name template: **Yes** · `MD102-%SERIAL%` (máximo 15 caracteres; o serial do Hyper-V é longo e é truncado)
- Assignments: **MD102-L09-Autopilot**

### 5. Enrollment Status Page
@ Intune: Devices > Windows > Enrollment > Enrollment Status Page > Create

- Show app and profile configuration progress: **Yes**
- Show an error when installation takes longer than: 60
- Turn on log collection and diagnostics page for end users: **Yes** (Q052)
- Block device use until all apps and profiles are installed: **Yes** (Q235)
- Allow users to reset device if installation error occurs: Yes
- Block device use until required apps are installed: **Selected** → escolha o app do L24 se já existir
- Assignments: MD102-L09-Autopilot

### 6. Espere o perfil ser atribuído
Na lista de dispositivos do Autopilot, a coluna **Profile status** precisa estar **Assigned** antes de ligar a VM. Pode levar de 15 minutos a algumas horas.

## test
1. Restaure o checkpoint **00-OOBE-hash** e ligue a VM.
2. O OOBE pula as telas escondidas e mostra a página de login da organização.
3. Entre com **user01**. Acompanhe a ESP: *Device preparation* → *Device setup* → *Account setup*.
4. Ao terminar, confira o nome do computador, o tipo de conta (user01 é **standard**) e a inscrição.

## evidence
- @ Intune: Devices > Windows > Enrollment > Windows Autopilot > Devices — Profile status e o dispositivo associado.
- @ Intune: Devices > Monitor > **Autopilot deployments** (relatório de implantações).
- No cliente: Event Viewer > Applications and Services Logs > Microsoft > Windows > **ModernDeployment-Diagnostics-Provider** > Autopilot.
- `mdmdiagnosticstool.exe -area Autopilot -cab C:\Temp\autopilot.cab`.

## expected
- Nome no padrão MD102-<serial>, Entra joined, inscrito no Intune, user01 **sem** direitos de administrador local (User account type = Standard, Q044).
- A ESP mostra o progresso e segura o usuário até os apps marcados terminarem.

## variations
- **Q076:** tire a licença E5 de um usuário e tente o OOBE com ele: o processo para na inscrição.
- **Q078:** para "reaproveitar" um PC já usado, o caminho é o mesmo: CSV → import → reset.
- **Q168:** mude o perfil para *Microsoft Entra hybrid joined* sem o conector do L11 e veja a implantação falhar.
- Coloque a ESP atribuída a um grupo de **usuários** e veja que ela só aparece na fase de conta.

## breakit
Ligue a VM antes do Profile status ficar **Assigned**. O OOBE segue o fluxo normal do Windows (sem a página da organização). É o erro mais comum de laboratório.

## cleanup
- Apague o dispositivo **primeiro** em All devices (Intune), depois em Windows Autopilot > Devices, e por fim no Entra.
- Mantenha o perfil e a ESP se for fazer o L10 e o L11.

## refs
- https://learn.microsoft.com/en-us/autopilot/add-devices
- https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/azure-ad-join-workflow
- https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enrollment-status

=== L10 | Autopilot para dispositivos existentes, autoimplantação e redefinição do Autopilot | B | 90
questions: Q048,Q002,Q244,Q115,Q170,Q200,Q114
predict: Q048
## overview
Testa três pontos do Autopilot que as questões exploram:

- **Convert all targeted devices to Autopilot**: só converte dispositivos **corporativos e gerenciados pelo Intune** que estejam no grupo atribuído **diretamente** (grupos aninhados não contam) (Q048, Q002, Q244).
- **Self-deploying** exige **TPM 2.0 físico** com atestação; não funciona em VM (Q115, Q170).
- **Autopilot Reset** apaga apps e dados do usuário, mas mantém Entra join, Intune e Wi-Fi (Q200, Q114).

## prereqs
- Uma VM já Entra joined e inscrita no Intune (do L02) que **não** passou pelo Autopilot.
- Notebook físico LLK85SH20068 para o teste de self-deploying (opcional).
- Perfil e ESP do L09.

## steps
### 1. Conversão de dispositivo existente
1. Crie o grupo de dispositivos **MD102-L10-Converter** e coloque a VM do L02.
2. Crie também **MD102-L10-Pai** e coloque o grupo MD102-L10-Converter **dentro** dele (aninhado).
3. Crie um perfil **MD102-L10-Convert** igual ao do L09, mas com **Convert all targeted devices to Autopilot = Yes**, atribuído a **MD102-L10-Pai**.
4. Espere algumas horas e veja se a VM aparece em Windows Autopilot > Devices.
5. Mude a atribuição para **MD102-L10-Converter** (direto) e espere de novo.

### 2. Self-deploying
Crie o perfil **MD102-L10-SelfDeploy**: Deployment mode **Self-Deploying**, Apply device name template `SD-%SERIAL%`. Atribua a um grupo com uma VM registrada (L09) e, se puder, com o notebook físico.

### 3. Autopilot Reset
1. Na VM do L09 (Autopilot, Entra joined, Intune), entre como user01 e:
   - instale um app da Microsoft Store;
   - crie uma conexão VPN em Settings > Network & internet > VPN > Add VPN;
   - salve um arquivo em Documents.
2. Confirme que o Windows RE está ativo: `reagentc /info` (Windows RE status: **Enabled**).
3. @ Intune: Devices > All devices > (dispositivo) > ... > **Autopilot Reset**

? Para o reset **local** (Ctrl+Win+R na tela de bloqueio), a política *Credential Providers > Disable Automatic Re Deployment Credentials* precisa estar **Disabled** (Settings catalog).

## test
1. Conversão: anote em qual das duas atribuições (aninhada ou direta) o dispositivo apareceu no Autopilot.
2. Self-deploying: reset a VM e veja o OOBE. Depois, faça o mesmo no notebook físico.
3. Autopilot Reset: depois do reset, entre de novo e confira o app, a VPN e o arquivo.

## evidence
- Windows Autopilot > Devices (dispositivo convertido aparece com o perfil).
- Event Viewer > ModernDeployment-Diagnostics-Provider > Autopilot (erros de atestação de TPM no self-deploying).
- @ Intune: Devices > Monitor > **Device actions** (Autopilot Reset).

## expected
| Teste | Resultado |
|---|---|
| Conversão via grupo aninhado | Não converte |
| Conversão via grupo direto | Converte (pode levar até 48 h) |
| Self-deploying em VM | Falha na atestação de TPM |
| Self-deploying no notebook (TPM 2.0) | Provisiona sem pedir usuário |
| Autopilot Reset | App da Store e VPN removidos; dados do usuário apagados; continua Entra joined e no Intune; Wi-Fi mantido (teste no notebook) |

## variations
- **Q002:** tente converter um dispositivo **pessoal** (registrado, do L02): não converte.
- **Q244:** um simples reinício não dispara o Autopilot; é preciso reset/OOBE.
- **Q170:** self-deploying exige TPM 2.0. Memória não é critério.

## breakit
Desabilite o Windows RE (`reagentc /disable`) e peça um Autopilot Reset remoto. A ação falha porque depende do WinRE.

## cleanup
- `reagentc /enable` se desligou.
- Apague os perfis MD102-L10-* e os grupos; restaure as VMs.

## refs
- https://learn.microsoft.com/en-us/autopilot/existing-devices
- https://learn.microsoft.com/en-us/autopilot/self-deploying
- https://learn.microsoft.com/en-us/autopilot/windows-autopilot-reset

=== L11 | Autopilot com ingresso híbrido (Intune Connector for Active Directory) | B | 120
questions: Q259,Q150,Q171
predict: Q259
## overview
Testa o Autopilot que coloca o computador **no domínio lab.local** além do Entra.

- Exige o **Intune Connector for Active Directory** num servidor do domínio (Q150, Q171, Q259).
- O conector cria o objeto de computador numa **OU** onde tem permissão delegada (Q259).
- Exige um perfil **Domain Join** e um deployment profile com *Microsoft Entra hybrid joined*.

! A Microsoft recomenda Entra join para implantações novas. O hybrid join pelo Autopilot continua cobrado na prova, mas é o cenário legado.

## prereqs
- Hybrid join configurado (L04: Entra Connect + SCP).
- Servidor membro do domínio para o conector (ex.: LLK85SH20053), Windows Server 2016 ou superior.
- OU **MD102-Autopilot** em lab.local, dentro do escopo do Entra Connect.
- VM W11-LAB03 registrada no Autopilot (L09) com rede na VLAN 134 (precisa enxergar o DC no OOBE).

## steps
### 1. Instale o conector
@ Intune: Devices > Windows > Enrollment > Intune Connector for Active Directory > Add

- Baixe o instalador, rode no servidor e entre com um Intune Administrator.

! A versão atual do conector (lançada em 2025) roda com uma **Managed Service Account** criada na instalação, e é essa conta que recebe a delegação na OU. Na versão antiga, a das questões, a permissão ia para a **conta de computador** do servidor do conector (Q150). Siga a documentação da versão que você instalar.

### 2. Delegue a OU
No DC: Active Directory Users and Computers > OU MD102-Autopilot > **Delegate Control** > a conta do conector > **Create a custom task** > Computer objects > **Create selected objects in this folder** e **Delete selected objects in this folder** > Full Control.

### 3. Perfil Domain Join
@ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > Domain Join

- Computer name prefix: `MD102H` · Domain name: `lab.local` · Organizational unit: `OU=MD102-Autopilot,DC=lab,DC=local`
- Assignments: MD102-L09-Autopilot

### 4. Deployment profile híbrido
Crie **MD102-L11-Hybrid**: User-Driven · Join to Microsoft Entra ID as **Microsoft Entra hybrid joined** · Skip AD connectivity check: **No** (a VM está na rede do DC). Atribua ao grupo do Autopilot e tire o perfil do L09 desse grupo.

## test
1. Espere o Profile status mostrar o perfil híbrido.
2. Restaure a VM no checkpoint 00-OOBE-hash e ligue.
3. No OOBE, entre com user01. O computador reinicia uma vez durante a ESP (é o join ao domínio).
4. Na tela de login, entre com um usuário **do domínio** (LAB\...).

## evidence
- No DC: o objeto **MD102H...** criado na OU MD102-Autopilot.
- No servidor do conector: Event Viewer > Applications and Services Logs > Microsoft > Intune > **ODJConnectorService** (pedidos de Offline Domain Join).
- `dsregcmd /status`: **DomainJoined : YES** e, depois da sincronização do Entra Connect, **AzureAdJoined : YES**.

## expected
O computador é criado na OU delegada, entra no domínio e vira hybrid joined. Sem o conector ou sem a delegação na OU, a implantação falha no join ao domínio (Q259: instale o conector no Server1 e delegue em OU1).

## variations
- **Q171:** "entrar no domínio de qualquer lugar" exige VPN no OOBE ou **Skip AD connectivity check = Yes** com um cliente de VPN que conecte antes do logon. Sem isso, o primeiro logon do domínio falha fora da rede.
- Mude o prefixo e a OU do perfil Domain Join e veja onde o objeto é criado.

## breakit
Remova a delegação da OU e repita a implantação. O ODJConnectorService registra erro de acesso negado e a ESP falha.

## cleanup
- Apague o computador da OU e do Intune/Entra/Autopilot.
- Desinstale o conector se não for manter; apague o perfil Domain Join e o MD102-L11-Hybrid.

## refs
- https://learn.microsoft.com/en-us/autopilot/windows-autopilot-hybrid
- https://learn.microsoft.com/en-us/autopilot/tutorial/user-driven/hybrid-azure-ad-join-intune-connector

=== L12 | Ações remotas: Desativar, Apagar, Excluir e Recomeço | A | 60
questions: Q015,Q243,Q254,Q114
predict: Q015
## overview
Compara as ações remotas de fim de ciclo do dispositivo, lado a lado, no mesmo cenário.

- **Delete** remove o dispositivo do Intune **na hora**; se ele voltar a fazer check-in, os dados e apps da empresa são removidos (Q015).
- **Retire** num dispositivo **desligado** fica pendente até o próximo check-in.
- **Wipe** com "Retain enrollment state and user account" só existe no Windows (Q243).
- O relatório **Device actions** mostra quem fez o quê (Q254).

## prereqs
- Três VMs inscritas (W11-LAB01, 02 e 03), com um checkpoint **"12-Antes"** em cada uma.
- Em cada VM: um perfil de configuração aplicado (ex.: o do L07), um app do Intune (L24, se já tiver) e um arquivo pessoal em Documents.

## steps
1. **Delete com dispositivo desligado:** desligue a W11-LAB01. @ Intune: Devices > All devices > W11-LAB01 > **Delete**.
2. **Retire com dispositivo desligado:** desligue a W11-LAB02. Mesmo caminho > **Retire**.
3. **Wipe:** com a W11-LAB03 ligada > **Wipe** e marque **Retain enrollment state and user account**.
4. Ligue a W11-LAB01 e a W11-LAB02 e espere alguns minutos.

## test
Preencha a tabela abaixo enquanto observa:

| | Some do Intune quando? | Perfil MDM removido? | App do Intune | Arquivo pessoal | Ainda Entra joined? |
|---|---|---|---|---|---|
| Delete (offline) | | | | | |
| Retire (offline) | | | | | |
| Wipe (retain) | | | | | |
| Fresh Start (variação) | | | | | |

## evidence
- @ Intune: Devices > Monitor > **Device actions** (ação, quem disparou, status: Pending/Complete).
- Settings > Accounts > Access work or school (a conta continua? o botão Info continua?).
- `dsregcmd /status`.

## expected
- **Delete:** o registro some do Intune na hora; quando a VM liga e tenta check-in, a gestão da empresa é removida.
- **Retire:** fica **Pending** em Device actions enquanto a VM está desligada; conclui no check-in. Os dados pessoais ficam.
- **Wipe com retain:** o Windows é reinstalado/limpo e volta já inscrito e com a conta do usuário.
- Q015: para tirar **imediatamente** do Intune um dispositivo offline há 30 dias, garantindo a limpeza se ele voltar, a resposta é **Delete**.

## variations
- **Fresh Start** (W11-LAB03 restaurada): marque *Retain user data*. Ele remove os apps (inclusive os do fabricante) e mantém os arquivos do usuário.
- **Q114:** compare com o **Autopilot Reset** (L10), a ação certa para reaproveitar PCs para outro usuário com pouco esforço.
- **Q243:** veja no menu de ações de um iPhone em User Enrollment que não existe Wipe, só Retire.

## breakit
Dispare um Wipe **sem** marcar retain numa VM sem Windows RE (`reagentc /disable`). A ação fica pendente/falha porque o reset depende do WinRE.

## cleanup
Restaure os checkpoints "12-Antes" e apague os registros que sobraram no Intune e no Entra.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/remote-actions/devices-wipe
- https://learn.microsoft.com/en-us/intune/intune-service/remote-actions/device-fresh-start

=== L13 | Perfis de configuração: Catálogo de Configurações, modelos, OMA-URI, conflitos e GPO | A | 60
questions: Q192,Q146,Q024,Q128,Q215,Q197,Q092,Q194,Q196,Q022,Q242,Q145,Q151
predict: Q192
## overview
Testa onde cada configuração mora e o que acontece quando duas fontes dizem coisas diferentes.

- Templates clássicos: **Device restrictions** (senha, Start, personalização) e **Endpoint protection** (renomear o Administrator local) (Q192, Q024, Q128).
- **Custom (OMA-URI)** para o que não tem template (Q146), incluindo o **MDMWinsOverGP** (Q092, Q194).
- **Conflito**: dois perfis com valores diferentes para a mesma configuração → nenhum é aplicado (Q196).
- **Group Policy analytics** para levar GPO para o Intune (Q197).
- Link de redefinição de senha na tela de logon (Q215).

## prereqs
- W11-LAB01 inscrita (só nuvem).
- LLK85SH20062 hybrid joined e inscrita (L04), para o teste de GPO × MDM.

## steps
### 1. Renomear o Administrator local (Q192)
@ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > Endpoint protection

- Local device security options > Accounts > **Rename administrator account**: `LabAdmin` · Atribua à W11-LAB01.

### 2. Device restrictions (Q024, Q128)
Templates > **Device restrictions**:
- Password: Password = Require · Minimum password length = 10
- Personalization: Desktop background picture URL = uma URL de imagem .jpg (só Enterprise/Education)
- Locked Screen Experience: Locked screen picture URL

### 3. OMA-URI: MDM vence a GPO (Q092, Q194)
Templates > **Custom** > Add:
```text
Name:      MDMWinsOverGP
OMA-URI:   ./Device/Vendor/MSFT/Policy/Config/ControlPolicyConflict/MDMWinsOverGP
Data type: Integer
Value:     1
```
Para o teste, crie também uma **GPO** para o LLK85SH20062 com **Allow Use of Camera** = Disabled:

@ GPO: Computer Configuration > Policies > Administrative Templates > Windows Components > Camera > Allow Use of Camera

E um perfil do **Settings catalog** com Camera > **Allow Camera** = Allowed.

### 4. Conflito (Q196)
Crie dois perfis do Settings catalog para a W11-LAB01 com a mesma configuração e valores diferentes (ex.: Experience > Allow Cortana = Allow num, Block no outro).

### 5. SSPR na tela de logon (Q215)
Settings catalog > Authentication > **Allow Aad Password Reset** = Allow.

### 6. Group Policy analytics (Q197)
No DC:
```powershell
Get-GPOReport -Name "Default Domain Policy" -ReportType Xml -Path C:\Temp\DDP.xml
```
@ Intune: Devices > Manage devices > Group Policy analytics > Import → selecione o XML.

## test
1. W11-LAB01: `Get-LocalUser` deve mostrar **LabAdmin** no lugar de Administrator.
2. LLK85SH20062 **sem** o perfil MDMWinsOverGP: Settings > Privacy & security > Camera mostra o acesso bloqueado (GPO venceu). Atribua o MDMWinsOverGP, sincronize e confira de novo.
3. Abra o perfil de conflito no portal e veja o status por configuração.
4. Bloqueie a tela da W11-LAB01: aparece o link **Reset password**.

## evidence
- Por perfil: Device and user check-in status > **Per setting status**.
- Settings > Accounts > Access work or school > Info > **Create report** (MDMDiagReport.html, seção de políticas).
- Registro: `HKLM\SOFTWARE\Microsoft\PolicyManager\current\device\`.
- GPO: `gpresult /h C:\Temp\gp.html`.

## expected
- Administrator renomeado para LabAdmin pelo perfil **Endpoint protection** (não Identity protection).
- Com GPO e MDM brigando, a GPO vence até o MDMWinsOverGP ser aplicado; depois, vale o MDM.
- No conflito, o status é **Conflict** e nenhum dos dois valores é aplicado.
- O Group Policy analytics mostra a porcentagem de configurações com suporte no MDM e permite migrar para o Settings catalog.

## variations
- **Q022:** tente separar duas VMs iguais usando **Applicability rules** (edição do SO): não separa; é preciso mexer nas Assignments.
- **Q197:** procure no Settings catalog as configurações do Office (Microsoft Office 2016 (Machine)/(User)) que a GPO usava.
- **Q242:** no template Device restrictions, veja as seções **Microsoft Defender SmartScreen** (bloquear sites suspeitos) e **Microsoft Defender Antivirus** (scan de scripts carregados no navegador).
- **Q145 e Q151 (VPN):** na W11-LAB01, crie à mão uma VPN chamada **VPN1** (Settings > Network & internet > VPN). Depois crie o perfil @ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > VPN com Connection name **VPN1** e outro com **VPN2**. A VPN do Intune com o mesmo nome **substitui** a manual; a VPN2 é somada. O template VPN existe também para Android Enterprise, iOS/iPadOS e macOS.

## breakit
Coloque o valor do OMA-URI como **String** em vez de Integer. O perfil fica com erro (Remediation failed / tipo inválido) no relatório por configuração.

## cleanup
Apague os perfis MD102-L13-* e a GPO de teste; restaure a W11-LAB01 (para desfazer o rename).

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/configuration/custom-settings-windows-10
- https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-controlpolicyconflict
- https://learn.microsoft.com/en-us/intune/intune-service/configuration/group-policy-analytics

=== L14 | Windows Update for Business: anéis, pausa, desinstalação e atualizações de recursos | A | 60
questions: Q137,Q017,Q091,Q139,Q183,Q255,Q264,Q205,Q088,Q086,Q033,Q050,Q054,Q159,Q075,Q252,Q187
predict: Q137
## overview
Testa o controle de atualizações do Windows pelo Intune.

- **Update rings**: adiamento, deadline e grace period, active hours (Q017, Q139, Q183, Q255).
- **Pausa** dura 35 dias (Q137). **Uninstall** é aplicado assim que o dispositivo recebe a política (Q091).
- **Feature updates policy** para levar a uma versão específica, inclusive Windows 10 → 11 (Q264, Q050).
- Reversão de feature update: 10 dias por padrão (Q088).
- Bloquear o Windows Insider (Q086).

## prereqs
- W11-LAB01 inscrita. Opcional: uma VM **Windows 10** 64 bits inscrita para o feature update.
- Para feature updates: @ Intune: Tenant administration > Connectors and tokens > **Windows data** → *Enable features that require Windows diagnostic data in processor configuration* = On, e marque a atestação de licença.

## steps
### 1. Update ring
@ Intune: Devices > Windows > Manage updates > Windows updates > Update rings > Create profile

- Nome: MD102-L14-Ring
- Quality update deferral: **0** · Feature update deferral: **30**
- Feature update uninstall period: **10**
- Automatic update behavior: Auto install at maintenance time · Active hours: **8 → 17**
- Deadline for quality updates: 2 · Deadline for feature updates: 7 · Grace period: **1**
- Atribua à W11-LAB01.

### 2. Pausa
Abra o ring > **Pause** > Quality updates. Anote a data de expiração exibida.

### 3. Feature update (Q264)
@ Intune: Devices > Windows > Manage updates > Windows updates > Feature updates > Create profile

- Versão: a mais recente do Windows 11 disponível · Rollout: Make update available as soon as possible
- Atribua à VM Windows 10 (ou a um grupo que exclua a W11-LAB01, para repetir a lógica de exclusão da Q264).

### 4. Bloquear Insider (Q086)
Settings catalog > System > **Allow Build Preview** = Not allowed.

## test
1. Na W11-LAB01, abra Settings > Windows Update > Advanced options > **Configured update policies** e confira os valores do ring.
2. Confira no portal a data de expiração da pausa: 35 dias depois de hoje.
3. Na VM Windows 10, acompanhe o feature update em Settings > Windows Update.
4. Depois do upgrade, rode:
```powershell
DISM /Online /Get-OSUninstallWindow
```

## evidence
- Ring > **Device status** e **Per setting status**.
- @ Intune: Reports > Windows updates > **Windows Feature Update Report**.
- Registro: `HKLM\SOFTWARE\Microsoft\PolicyManager\current\device\Update` (DeferQualityUpdatesPeriodInDays, PauseQualityUpdatesStartTime, ActiveHoursStart/End).

## expected
- Pausa iniciada hoje expira em **hoje + 35 dias** (Q137: 1º/11 → 6/12).
- Quality deferral 0 + deadline: instala logo; feature com deferral 30 + deadline 30 → até 60 dias do lançamento (Q017).
- O Windows 10 vai para a versão do Windows 11 escolhida, se o hardware atender (TPM 2.0, 64 bits). Windows 10 de 32 bits não vai (Q050, Q159).
- `Get-OSUninstallWindow` mostra **10** dias (Q088).

## variations
- **Q091:** use **Uninstall** de quality update no ring: o dispositivo remove a atualização assim que recebe a política, sem esperar a janela de manutenção.
- **Q054:** o in-place upgrade usa a mídia original da Microsoft; imagem customizada é para wipe-and-load (você já fez isso no MECM).
- **Q205:** o status do ring por dispositivo é o "Per update ring deployment state" das questões antigas.
- **Q075 e Q252:** antes do feature update, veja @ Intune: Reports > Windows updates > Reports > **Windows feature update device readiness report**: ele aponta quem não atende os requisitos do Windows 11 (TPM 2.0, 4 GB de RAM, 64 GB, CPU suportada).
- **Q187 (borderline):** para rodar um script depois de um feature update, use o `SetupConfig.ini` em `%SystemDrive%\Users\Default\AppData\Local\Microsoft\Windows\WSUS` com `PostOOBE=`.

## breakit
Crie dois rings para a mesma VM com adiamentos diferentes. O dispositivo mostra conflito nas configurações em disputa.

## cleanup
Resume (despause), apague MD102-L14-* e restaure as VMs se o feature update não for desejado.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-10-update-rings
- https://learn.microsoft.com/en-us/intune/intune-service/protect/windows-10-feature-updates
- https://learn.microsoft.com/en-us/windows/deployment/update/waas-wu-settings

=== L15 | Otimização de Entrega | A | 45
questions: Q214,Q029,Q034,Q134,Q033
predict: Q214
## overview
Testa de onde o Windows baixa o conteúdo: só internet, LAN, grupo ou peers.

- Delivery Optimization é configurado num **perfil de configuração**, não no update ring (Q029, Q034, Q134).
- **Download mode** Group (2) agrupa por AD site/ID de grupo; **Restrict peer selection = Subnet mask** limita à mesma sub-rede (Q214).
- Sem servidores, a combinação é WUfB + Intune + Delivery Optimization (Q033).

## prereqs
- Duas VMs inscritas na mesma sub-rede (VLAN 134). Se puder, uma terceira em outra sub-rede.
- Um conteúdo grande distribuído pelo Intune (ex.: o Microsoft 365 Apps do L25 ou um Win32 grande do L24).

## steps
@ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > Delivery Optimization

- Nome: MD102-L15-DO
- Download mode: **HTTP blended with peering across private group (2)**
- Group ID source: **Subnet** (as VMs só nuvem não têm AD site)
- Restrict peer selection: **Subnet mask**
- Minimum content file size for peer caching (MB): **1** (para o teste pegar arquivos menores)
- Atribua às VMs.

## test
1. Instale o conteúdo grande na primeira VM e espere terminar.
2. Instale na segunda VM.
3. Na segunda VM:
```powershell
Get-DeliveryOptimizationStatus | Select FileId, BytesFromPeers, BytesFromHttp, Status
Get-DeliveryOptimizationPerfSnap
```

## evidence
- Settings > Windows Update > Advanced options > Delivery Optimization > **Activity monitor** ("From PCs on your local network").
- As saídas de `Get-DeliveryOptimizationStatus` e `Get-DeliveryOptimizationPerfSnap`.

## expected
A segunda VM puxa parte do conteúdo da primeira (BytesFromPeers > 0). A VM em outra sub-rede não usa peers, por causa do Restrict peer selection (Q214).

## variations
- Mude o Download mode para **HTTP only (0)**: BytesFromPeers volta a zero.
- **Q214:** com o Group ID source por **AD site** (nas máquinas do domínio), máquinas do mesmo site e de sub-redes diferentes só trocam conteúdo se a restrição por sub-rede estiver desligada.

## breakit
Deixe o Minimum content file size no padrão e use um conteúdo pequeno: não há peering, e parece que o DO "não funciona".

## cleanup
Apague o perfil MD102-L15-DO.

## refs
- https://learn.microsoft.com/en-us/windows/deployment/do/waas-delivery-optimization-reference
- https://learn.microsoft.com/en-us/intune/intune-service/configuration/delivery-optimization-windows
