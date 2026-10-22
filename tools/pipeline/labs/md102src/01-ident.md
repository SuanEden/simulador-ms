=== L01 | Ingresso no Entra e administradores locais | A | 40
questions: Q042,Q101,Q109,Q180,Q232,Q041,Q175
predict: Q042
## overview
Mostra quem vira administrador local quando um Windows entra no Entra ID (Entra join) e a diferença entre **join** e **registro**.

- Quem vira admin local: o usuário que fez o join, a função Global Administrator e a função *Microsoft Entra Joined Device Local Administrator*. Security Administrator e Cloud Device Administrator **não** viram.
- Como desligar a promoção automática do usuário que faz o join (Q180).
- Como adicionar uma conta do Entra a um grupo local com o prefixo `AzureAD\` (Q109 e Q232).
- Entra join × Entra registered: quem pode o quê (Q041 e Q175).

## prereqs
- W11-LAB01 no checkpoint **01-Limpa** (workgroup, usuário local).
- user01 (sem função), adm-sec (função **Security Administrator**) e adm-cda (função **Cloud Device Administrator**).
- Para atribuir as funções: @ Entra: Entra ID > Roles & admins > Roles & admins > (função) > Add assignments

## steps
### 1. Confira as configurações de dispositivo do tenant
@ Entra: Entra ID > Devices > Overview > Device settings

Anote o valor atual e deixe assim para o teste:
- **Users may join devices to Microsoft Entra**: All
- **Registering user is added as local administrator on the device during Microsoft Entra join**: All
- **Global administrator role is added as local administrator on the device during Microsoft Entra join**: Yes

### 2. Faça o Entra join com o user01
1. Na W11-LAB01: @ Windows: Settings > Accounts > Access work or school > Connect
2. Clique em **Join this device to Microsoft Entra ID** (o link pequeno no rodapé da janela, não o botão principal).
3. Entre com user01@camposlab.online, confirme a organização e conclua.
4. Faça logoff e entre como **user01** (Other user > user01@camposlab.online).

### 3. Veja quem está no grupo Administrators
```powershell
net localgroup Administrators
whoami /groups | findstr /i "S-1-12-1"
```
As funções do Entra aparecem como SIDs `S-1-12-1-...` (Global Administrator e Microsoft Entra Joined Device Local Administrator). O user01 aparece como `AzureAD\user01...`.

### 4. Adicione outra conta do Entra por linha de comando
Em um prompt elevado (como user01, que é admin):
```powershell
net localgroup Administrators /add "AzureAD\user02@camposlab.online"
net localgroup "Remote Desktop Users" /add "AzureAD\user03@camposlab.online"
```

## test
1. Faça logoff e entre como **adm-sec**. Tente abrir um PowerShell como administrador: o UAC deve pedir credencial de administrador.
2. Repita com **adm-cda**: mesmo resultado.
3. Entre como **user02** (adicionado no passo 4): ele deve abrir o prompt elevado sem pedir senha.
4. Teste da Q180: em @ Entra: Entra ID > Devices > Overview > Device settings, mude **Registering user is added as local administrator...** para **None**. Restaure o checkpoint 01-Limpa, faça o join de novo com user01 e rode `net localgroup Administrators`: o user01 não aparece.
5. Registro × join (Q175): restaure o checkpoint, entre com o usuário **local** e, em Access work or school > **Connect**, use o botão principal com user04 (sem clicar em "Join this device"). O dispositivo fica **registrado**: você continua entrando com a conta local e acessa os recursos da empresa pelo navegador e pelos apps.

## evidence
- `dsregcmd /status`: **AzureAdJoined : YES** no join; **WorkplaceJoined : YES** no registro.
- @ Entra: Entra ID > Devices > All devices — coluna **Join type**: *Microsoft Entra joined* × *Microsoft Entra registered*.
- `net localgroup Administrators` e `whoami /groups`.

## expected
| Conta | Admin local? | Por quê |
|---|---|---|
| user01 (fez o join) | Sim | "Registering user is added as local administrator" = All |
| adm-sec (Security Administrator) | Não | A função não é adicionada ao grupo local |
| adm-cda (Cloud Device Administrator) | Não | Gerencia dispositivos no Entra, mas não vira admin local |
| user02 (adicionado com net localgroup) | Sim | `AzureAD\UPN` é a forma de referenciar contas do Entra localmente |

Com a configuração em **None**, o user01 deixa de ser admin no próximo join (Q180). No registro, o login continua com a conta pessoal/local (Q175).

## variations
- **Q109 e Q232:** troque o prefixo por `CONTOSO\` ou `user02@...` sem prefixo e veja o erro "There is no such global user or group".
- **Q041:** registre um celular (Authenticator ou Company Portal) e veja que ele aparece como *registered*. Entra join só existe para Windows.
- Atribua a função **Microsoft Entra Joined Device Local Administrator** ao user04 (@ Entra: Entra ID > Devices > Overview > Device settings > Manage Additional local administrators on all Microsoft Entra joined devices). Entre com user04 na W11-LAB01: ele é admin (pode levar até 4 horas ou exigir novo logon para o token refletir).

## breakit
Em Device settings, mude **Users may join devices to Microsoft Entra** para **Selected** sem ninguém na lista e tente o join com user01. A tela final mostra que a organização não permite o join.

## cleanup
- Volte as configurações de Device settings aos valores anotados no passo 1.
- @ Entra: Entra ID > Devices > All devices — apague o dispositivo W11-LAB01.
- Restaure o checkpoint 01-Limpa.

## refs
- https://learn.microsoft.com/en-us/entra/identity/devices/assign-local-admin
- https://learn.microsoft.com/en-us/entra/identity/devices/device-join-plan

=== L02 | Inscrição automática no Intune (escopos de usuário MDM e MAM) | A | 45
questions: Q113,Q149,Q195,Q136,Q152
predict: Q149
## overview
Testa quando um Windows entra **sozinho** no Intune ao fazer join ou registro, e como o Intune classifica o dispositivo (corporativo ou pessoal).

- **MDM user scope** define quem inscreve automaticamente. **MAM/WIP user scope** não inscreve no MDM.
- Usuário nos dois escopos: o MDM vence em dispositivo corporativo (Q149).
- Entra joined → **Corporate**. Registrado (conta de trabalho em PC pessoal) → **Personal** (Q136).
- A Q113 é duvidosa no banco: este lab tira a dúvida no seu tenant.

## prereqs
- W11-LAB01 e W11-LAB02 no checkpoint **01-Limpa**.
- Grupos de usuários: **MD102-L02-MDM** (user01, user03) e **MD102-L02-MAM** (user02, user03).

## steps
### 1. Configure os escopos
@ Intune: Devices > Device onboarding > Enrollment > Windows > Automatic Enrollment

- **MDM user scope**: Some → MD102-L02-MDM
- **Windows Information Protection (WIP) user scope** (o antigo "MAM user scope"): Some → MD102-L02-MAM
- Deixe as URLs (terms of use, discovery, compliance) nos valores padrão e salve.

? O mesmo blade aparece no Entra em Entra ID > Mobility (MDM and WIP) > Microsoft Intune. É a mesma configuração.

### 2. Faça os joins
1. W11-LAB01: Entra join com **user01** (como no L01).
2. W11-LAB02: Entra join com **user02**.
3. Restaure a W11-LAB02 e faça o join com **user03**.

## test
1. Para cada join, abra Settings > Accounts > Access work or school > (conta) > **Info**. Se o botão Info existe e mostra "Managed by camposlab", o dispositivo está no MDM.
2. Teste de registro (Q136 e Q113): restaure a W11-LAB02, entre com o usuário **local**, vá em Access work or school > **Connect** (botão principal) com **user01**. Veja se o dispositivo aparece no Intune e com qual propriedade.
3. Repita o registro com **user02**: ele está só no escopo WIP.

## evidence
- @ Intune: Devices > All devices — colunas **Ownership** (Corporate/Personal), **Managed by** e **Primary user UPN**.
- Event Viewer > Applications and Services Logs > Microsoft > Windows > DeviceManagement-Enterprise-Diagnostics-Provider > Admin: eventos de "MDM Enroll: Succeeded" ou falha.
- `dsregcmd /status`: na seção de diagnóstico, os campos **MdmUrl** e **MdmComplianceUrl** só aparecem preenchidos quando a inscrição automática foi oferecida.

## expected
| Cenário | Entra | Intune |
|---|---|---|
| Join com user01 (MDM scope) | Joined | Inscrito, **Corporate** |
| Join com user02 (só WIP) | Joined | **Não** inscrito |
| Join com user03 (MDM + WIP) | Joined | Inscrito (MDM vence no corporativo) |
| Registro com user01 | Registered | Inscrito como **Personal** (a anotar: é a afirmação polêmica da Q113) |
| Registro com user02 | Registered | Não inscrito no MDM |

Anote o resultado do registro com user01. Ele define qual leitura da Q113 vale no seu tenant.

## variations
- **Q195:** Android não usa esse mecanismo. A inscrição automática por MDM user scope é coisa do Windows.
- Mude o MDM user scope para **All** e repita o join com user02: agora ele inscreve.
- Mude a propriedade de um dispositivo à mão: @ Intune: Devices > All devices > (dispositivo) > Properties > **Device ownership**.

## breakit
Coloque o MDM user scope em **None** e faça o join com user01. O Entra join funciona, mas o dispositivo não entra no Intune. Esse é o sintoma clássico de "join ok, mas nada de política chega".

## cleanup
- Volte o MDM user scope para o valor original do seu tenant (se for usar os outros labs, **All** ou um grupo com os usuários de teste).
- Apague os dispositivos de teste no Intune e no Entra; restaure os checkpoints.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enroll
- https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enrollment-methods

=== L03 | Restrições de inscrição, limites, DEM e categorias | A | 45
questions: Q027,Q065,Q265,Q208,Q207
predict: Q065
## overview
Testa as travas na entrada do Intune: quantos dispositivos cada usuário pode inscrever, quais plataformas são aceitas e como fazer o usuário escolher uma **categoria** que coloca o dispositivo no grupo certo.

- **Device limit restriction** por grupo de usuários, com prioridade.
- **Device enrollment manager (DEM)** ignora o limite e inscreve até 1.000 dispositivos (Q065).
- **Device platform restriction**: bloquear plataforma, versão ou dispositivo pessoal (Q027, Q265, Q208).
- **Device categories** + grupo dinâmico `device.deviceCategory` (Q208).
- Registro DNS **EnterpriseEnrollment** por sufixo de UPN (Q207).

## prereqs
- W11-LAB01, W11-LAB02 e W11-LAB03 no checkpoint 01-Limpa.
- Grupo **MD102-L03-Limite** com user04.
- MDM user scope incluindo user04 e user05 (L02).

## steps
### 1. Limite de dispositivos
@ Intune: Devices > Device onboarding > Enrollment > Device limit restriction > Create restriction

- Nome: MD102-L03-Limite1 · Device limit: **1** · Atribuição: MD102-L03-Limite
- Confira a **prioridade** na lista: a restrição de prioridade 1 vence a "All users" (Default).

### 2. Device enrollment manager
@ Intune: Devices > Device onboarding > Enrollment > Device enrollment managers > Add

- Adicione **user05**.

### 3. Restrição de plataforma
@ Intune: Devices > Device onboarding > Enrollment > Device platform restriction > (aba Windows) > Create restriction

- Nome: MD102-L03-SemPessoal · Windows (MDM): Allow · **Personally owned devices: Block** · Atribua a MD102-L03-Limite.

### 4. Categorias de dispositivo
@ Intune: Devices > Organize devices > Device categories > Create device category

- Crie **MD102-Vendas** e **MD102-TI**.
- Grupo dinâmico de dispositivos **MD102-L03-Cat-Vendas**:

@ Entra: Entra ID > Groups > All groups > New group

```text
Membership type: Dynamic Device
(device.deviceCategory -eq "MD102-Vendas")
```

## test
1. **Limite:** faça o join da W11-LAB01 com user04 (ok). Faça o join da W11-LAB02 com user04: o join no Entra conclui, mas a inscrição no Intune falha por limite.
2. **DEM:** com user05, inscreva duas VMs em sequência usando Settings > Accounts > Access work or school > **Enroll only in device management**. As duas entram, mesmo com um limite de 1 em vigor para ele.
3. **Pessoal bloqueado:** na W11-LAB03, com usuário local, adicione a conta do user04 (registro). A inscrição é recusada porque o dispositivo é pessoal.
4. **Categoria:** instale o Company Portal (L24) num dispositivo inscrito e abra o app. Ele pede a categoria; escolha MD102-Vendas. Confira se o dispositivo entra no grupo MD102-L03-Cat-Vendas.

## evidence
- @ Intune: Devices > Monitor > **Enrollment failures** (motivo da recusa por limite ou plataforma).
- Detalhes do dispositivo: **Device category**.
- Membros do grupo dinâmico (pode levar alguns minutos para recalcular).

## expected
- Limite 1: o segundo dispositivo do user04 não entra no Intune (Q065: o usuário respeita o limite do grupo dele).
- DEM: o user05 ignora o limite e pode chegar a 1.000 dispositivos (Q065).
- Pessoal bloqueado: o registro do user04 não inscreve.
- Categoria: o dispositivo cai no grupo dinâmico certo (Q208).

## variations
- **Q027 e Q265:** na aba **Android** da restrição de plataforma, veja que dá para bloquear o **Android device administrator** inteiro e permitir só o Android Enterprise (work profile). Na aba **iOS/iPadOS**, veja o campo de versão mínima (Q265: min 11.0). Não precisa de celular para enxergar onde ficam.
- **Q207:** se você controla o DNS público do camposlab.online, crie `enterpriseenrollment.camposlab.online` CNAME `enterpriseenrollment-s.manage.microsoft.com` e teste com `Resolve-DnsName enterpriseenrollment.camposlab.online`. Um registro por sufixo de UPN.

## breakit
Dê prioridade 1 a uma restrição com **Device limit: 15** para "All users" e prioridade 2 à de limite 1. Veja qual vale para o user04: a de menor número de prioridade que inclui o usuário.

## cleanup
- Apague MD102-L03-* (restrições, categorias, grupo) e remova o user05 dos DEMs.
- Apague os dispositivos de teste; restaure os checkpoints.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/enrollment/enrollment-restrictions-set
- https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-manager-enroll
- https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-group-mapping

=== L04 | Ingresso híbrido, inscrição por GPO e cogerenciamento com o MECM | B | 120
questions: Q142,Q237,Q193,Q055
predict: Q142
## overview
Usa o seu MECM para testar os dois caminhos de levar um computador **do domínio** para o Intune:

- **GPO** "Enable automatic MDM enrollment using default Azure AD credentials" (Q142), depois do hybrid join.
- **Co-management** pelo Cloud Attach do MECM (Q193), com troca de **workloads** entre MECM e Intune.
- O estado **Pending** do hybrid join e por que ele depende de linha de visada com o DC (Q237).

## prereqs
- Entra Connect no LLK85SH20053 sincronizando a OU dos computadores LLK85SH20061 e LLK85SH20062.
- Os dois clientes com o agente do MECM saudável (site LAB).
- user01 e user02 sincronizados do lab.local ou existentes no tenant com licença E5 (os usuários do domínio precisam estar sincronizados e licenciados para a inscrição por credencial de usuário).
- MDM user scope incluindo esses usuários (L02).

## steps
### 1. Configure o hybrid join no Entra Connect
No LLK85SH20053, abra o **Microsoft Entra Connect**:
1. **Configure** > **Configure device options** > Next.
2. Entre com um Global Administrator do tenant.
3. **Configure Microsoft Entra hybrid join** > marque **Windows 10 or later domain-joined devices**.
4. **SCP configuration**: floresta lab.local, Authentication Service **Microsoft Entra ID**, credencial de Enterprise Admin > Configure.

Confira o SCP criado:
```powershell
$scp = "CN=62a0ff2e-97b9-4513-943f-0d221bd30080,CN=Device Registration Configuration,CN=Services," + (Get-ADRootDSE).configurationNamingContext
Get-ADObject $scp -Properties keywords | Select -ExpandProperty keywords
```

### 2. Faça o hybrid join dos clientes
Nos dois clientes, depois de um ciclo de sincronização do Entra Connect (`Start-ADSyncSyncCycle -PolicyType Delta` no servidor do Connect):
1. Reinicie e entre com um usuário do domínio.
2. Ou force: @ Windows: Task Scheduler > Microsoft > Windows > Workplace Join > Automatic-Device-Join > Run
3. Rode `dsregcmd /status` até ver **AzureAdJoined : YES** e **DomainJoined : YES**.

### 3. Caminho A — GPO (no LLK85SH20062)
No DC, crie a GPO **MD102-L04-AutoMDM** e vincule à OU do LLK85SH20062:

@ GPO: Computer Configuration > Policies > Administrative Templates > Windows Components > MDM > Enable automatic MDM enrollment using default Azure AD credentials

Valor: **Enabled** · Credential type: **User Credential**

No cliente: `gpupdate /force`, faça logoff e logon com o usuário do domínio.

### 4. Caminho B — Co-management (no LLK85SH20061)
1. No MECM, crie a coleção de dispositivos **MD102-L04-Pilot** com o LLK85SH20061.
2. @ MECM: Administration > Overview > Cloud Services > Cloud Attach > Configure Cloud Attach
3. **Onboarding**: Azure public cloud > Sign In com um Global Administrator.
4. **Enablement**: Automatic enrollment in Intune = **Pilot** · Intune Auto Enrollment = MD102-L04-Pilot.
5. Conclua o assistente.
6. Depois de habilitar, abra as propriedades do objeto de co-management (Cloud Attach > **CoMgmtSettingsProd** > Properties):
   - Aba **Workloads**: Compliance policies → **Pilot Intune**.
   - Aba **Staging**: pilot collection de Compliance policies = MD102-L04-Pilot.
7. No cliente: Machine Policy Retrieval & Evaluation Cycle.

## test
1. Espere a inscrição (no co-management ela é aleatorizada e pode levar algumas horas; no lab costuma ser rápida após o ciclo de política).
2. No Intune, confira os dois dispositivos.
3. Crie a política de conformidade do L16 (ou qualquer uma simples, como firewall obrigatório) e atribua aos dois.
4. Veja o status de conformidade de cada um e compare com a posição do workload.
5. Volte o workload de Compliance policies para **Configuration Manager** e sincronize de novo.

## evidence
- @ Intune: Devices > All devices — **Managed by**: *Co-managed* (LLK85SH20061) e *Intune* (LLK85SH20062); **Join type**: *Microsoft Entra hybrid joined*.
- Cliente: `C:\Windows\CCM\Logs\CoManagementHandler.log` (procure as linhas de habilitação do co-management e dos workloads).
- GPO: Task Scheduler > Microsoft > Windows > **EnterpriseMgmt** (a tarefa criada pela inscrição) e o log DeviceManagement-Enterprise-Diagnostics-Provider > Admin.
- MECM: Monitoring > Overview > **Cloud Attach** (painel de co-management).

## expected
- Os dois clientes ficam hybrid joined e inscritos no Intune: um pela GPO, outro pelo co-management.
- Com o workload **Pilot Intune**, a conformidade do LLK85SH20061 vem do Intune. Com o workload no **Configuration Manager**, o Intune mostra que a conformidade é avaliada pelo ConfigMgr (*See ConfigMgr*).
- Q193: para um Windows já gerenciado pelo MECM, o caminho com menor impacto é o co-management.

## variations
- **Q055:** compare os caminhos de provisionamento. Para máquinas que só existem no AD (sem Entra) e precisam de apps complexos na montagem, o MECM com task sequence continua sendo a resposta.
- Mova outros workloads (Windows Update policies, Endpoint Protection) para Pilot Intune e veja o efeito no cliente.

## breakit
- **Q237:** num cliente ainda não registrado, desconecte a rede da VM logo depois da sincronização do Entra Connect. O objeto aparece no Entra como **Pending** e fica assim até o dispositivo, com acesso a um DC, concluir o registro no logon do usuário.
- Tire a OU do LLK85SH20062 do escopo de sincronização do Entra Connect: o dispositivo some do Entra e o hybrid join não completa.

## cleanup
- Workloads de volta para Configuration Manager; Automatic enrollment = None, se não for manter.
- Desvincule a GPO MD102-L04-AutoMDM.
- Opcional: retire os dispositivos do Intune (eles continuam hybrid joined).

## refs
- https://learn.microsoft.com/en-us/entra/identity/devices/how-to-hybrid-join
- https://learn.microsoft.com/en-us/windows/client-management/enroll-a-windows-10-device-automatically-using-group-policy
- https://learn.microsoft.com/en-us/intune/configmgr/comanage/how-to-enable
- https://learn.microsoft.com/en-us/intune/configmgr/comanage/how-to-switch-workloads

=== L05 | Ativação de assinatura e atualização de edição | B | 60
questions: Q068,Q073,Q117,Q124,Q160,Q173,Q129,Q169,Q233,Q077
predict: Q073
## overview
Testa como a licença do usuário transforma um Windows **Pro** em **Enterprise** sem reinstalar nada, e os limites disso.

- Muda a **edição** (Pro → Enterprise), nunca a **versão** (10 continua 10).
- Só funciona em dispositivo **Entra joined** ou **hybrid joined**. Registrado não vale (Q068, Q124).
- O usuário precisa de licença que inclua o Windows Enterprise (o Microsoft 365 E5 inclui).
- O perfil **Edition upgrade and mode switch** do Intune faz a troca por chave (Q129).

## prereqs
- Uma VM **Windows 11 Pro ativada** (chave da sua assinatura Visual Studio ou licença digital). Sem ativação, o step-up não acontece.
- Opcional: uma VM **Windows 10 Pro** 64 bits ativada.
- user01 com Microsoft 365 E5.

## steps
### 1. Veja o estado inicial
```powershell
Get-WindowsEdition -Online
(Get-CimInstance Win32_OperatingSystem).Caption
slmgr /dlv
```

### 2. Faça o Entra join com o user01
Como no L01. Depois do join, entre como user01.

### 3. Teste o caso "registrado"
Em outra VM Pro (ou restaurando o checkpoint), só **registre** o dispositivo (Access work or school > Connect com user01, sem join) e entre com a conta local.

### 4. Perfil de upgrade de edição (alternativa por chave)
@ Intune: Devices > Manage devices > Configuration > Create > New policy > Windows 10 and later > Templates > Edition upgrade and mode switch

- Edition to upgrade to: **Windows 10/11 Enterprise**
- Product key: a chave do seu contrato. Para só ver a troca de edição no lab, dá para usar a chave genérica pública de KMS do Enterprise (`NPPR9-FWDCX-D2C8J-H872K-2YT43`). A edição muda, mas o Windows fica sem ativação até achar um KMS.

## test
1. Na VM joined, depois do logon do user01, abra Settings > System > **Activation**. Espere alguns minutos e faça logoff/logon se não mudar.
2. Na VM só registrada, confira a edição.
3. Se tiver a VM Windows 10 Pro, faça o join com user01 e veja para qual edição ela vai.

## evidence
- Settings > System > Activation: edição e a linha de assinatura ativa.
- `Get-WindowsEdition -Online` (**Enterprise** depois do step-up).
- @ Intune: Devices > All devices > (dispositivo) > Hardware — sistema operacional e SKU.

## expected
| Dispositivo | Resultado |
|---|---|
| Windows 11 Pro, Entra joined, user01 com E5 | Windows 11 **Enterprise** |
| Windows 11 Pro, só registrado | Continua **Pro** |
| Windows 10 Pro, Entra joined | Windows **10** Enterprise (não vira 11) |

## variations
- **Q233:** licenças Office 365 E5 + EMS E5 **não** incluem o Windows; Microsoft 365 E3/E5 incluem. Se tiver um usuário com só Office 365 E5, faça o logon e veja que a edição não muda.
- **Q077:** a licença Windows Enterprise por usuário permite ativar em até 5 dispositivos.
- **Q169:** compare no portal de lifecycle: feature updates do Windows 11 têm 24 meses no Pro e 36 meses no Enterprise (versão H2).

## breakit
Remova a licença E5 do user01 e faça logon de novo depois de algumas horas. A ativação de assinatura deixa de ser renovada e o dispositivo volta para Pro quando a assinatura vence; não é imediato.

## cleanup
- Devolva a licença ao user01; apague o perfil MD102-L05-*.
- Restaure os checkpoints.

## refs
- https://learn.microsoft.com/en-us/windows/deployment/windows-subscription-activation
- https://learn.microsoft.com/en-us/intune/intune-service/configuration/edition-upgrade-windows-settings

=== L06 | Pacote de provisionamento (Windows Configuration Designer) | B | 60
questions: Q135,Q058,Q120
predict: Q135
## overview
Testa a inscrição **em massa** de PCs de workgroup com um arquivo .ppkg: Entra join + Intune + Wi-Fi/apps, sem Autopilot e sem reinstalar.

- O Windows Configuration Designer gera um **bulk token** (cria uma conta `package_<GUID>` no tenant).
- O pacote pode trocar a edição, configurar rede e instalar apps (Q058, Q120).

## prereqs
- W11-LAB02 no checkpoint 01-Limpa.
- **Windows Configuration Designer** (Microsoft Store) numa máquina sua.
- Entra: **Users may join devices to Microsoft Entra** = All (ou incluindo o usuário package_ depois que ele for criado).
- MDM user scope = All (ou um grupo que inclua o usuário package_).

## steps
1. Abra o Windows Configuration Designer > **Provision desktop devices**. Nome do projeto: MD102-L06.
2. **Set up device**: Device name `MD102-%RAND:4%` · desmarque "Remove pre-installed software".
3. **Set up network**: no Hyper-V use rede cabeada (desligue o Wi-Fi). Em notebook físico, informe SSID e senha (é o que a Q135 cobra).
4. **Account Management**: **Enroll into Microsoft Entra ID** · Bulk Token Expiry (até 180 dias) · **Get Bulk Token** e entre com um admin.
5. **Add applications** (opcional) e **Add certificates** (opcional, ex.: a raiz da sua PKI de lab).
6. **Finish** > **Create**. Copie o `.ppkg` gerado.

## test
1. Na W11-LAB02 (já no Windows), dê dois cliques no .ppkg e confirme. Ou, em PowerShell elevado:
```powershell
Install-ProvisioningPackage -PackagePath C:\Temp\MD102-L06.ppkg -QuietInstall
```
2. Outra forma: com a VM em OOBE, conecte um disco/pendrive com o .ppkg na raiz; o OOBE detecta e oferece aplicar.
3. Reinicie e verifique o join e a inscrição.

## evidence
- `dsregcmd /status` (AzureAdJoined : YES).
- @ Intune: Devices > All devices — dispositivo com nome MD102-xxxx, **sem usuário primário** (inscrição em massa é sem afinidade).
- Settings > Accounts > Access work or school > **Add or remove a provisioning package** (pacotes aplicados).
- Event Viewer > Applications and Services Logs > Microsoft > Windows > **Provisioning-Diagnostics-Provider** > Admin.
- @ Entra: Entra ID > Users — a conta **package_<GUID>** criada pelo token.

## expected
O PC de workgroup vira Entra joined e inscrito no Intune com um único arquivo, sem reinstalação. É o que a Q135 pede (Wi-Fi + inscrição em massa).

## variations
- **Q058 (borderline):** em **Switch to advanced editor** > Runtime settings > EditionUpgrade, informe uma chave Enterprise: o pacote também troca a edição.
- **Q120:** compare com Autopilot (L09) e imagem customizada: os três atendem a "Enterprise + apps + certificado", cada um com um custo diferente.

## breakit
Apague a conta package_ no Entra (ou use um pacote com token vencido) e aplique em outra VM. O join falha.

## cleanup
- Apague os dispositivos de teste no Intune e no Entra **antes** de apagar a conta package_.
- Restaure o checkpoint.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-bulk-enroll
- https://learn.microsoft.com/en-us/windows/configuration/provisioning-packages/provisioning-create-package

=== L07 | Lógica de atribuição: grupos, exclusões, filtros, marcas de escopo e conjuntos de políticas | A | 50
questions: Q143,Q004,Q022,Q099,Q037,Q147,Q095,Q213,Q264
predict: Q143
## overview
Reproduz a lógica que mais aparece nas questões: **quem recebe** uma política.

- **Exclusão vence inclusão** (Q143, Q037, Q264).
- Restringir uma política a um dispositivo se faz nas **Assignments**, não em applicability rules (Q022).
- **Scope tags** não mudam quem recebe; só quem administra (Q004).
- **Filtros** refinam a atribuição sem criar grupos.
- **Policy sets** agrupam objetos de várias plataformas e não aceitam Conditional Access (Q095, Q147, Q213).
- Grupos dinâmicos por versão de SO (Q099).

## prereqs
- W11-LAB01 e W11-LAB02 inscritos no Intune (L02).
- Grupos de dispositivos **MD102-L07-G1** (W11-LAB01 e W11-LAB02) e **MD102-L07-G2** (só W11-LAB02).

## steps
### 1. Reproduza a Q143 com dois update rings
@ Intune: Devices > Windows > Manage updates > Windows updates > Update rings > Create profile

- **MD102-L07-Ring1**: Quality update deferral period = **3** · Include **G1** · Exclude **G2**
- **MD102-L07-Ring2**: Quality update deferral period = **5** · Include **G2** · Exclude **G1**

### 2. Scope tag
@ Intune: Tenant administration > Roles > Scope tags > Create

- Crie **MD102-L07-Tag** e aplique ao Ring1 (Properties > Scope tags). Não mude as atribuições.

### 3. Filtro
@ Intune: Tenant administration > Assignment filters > Create

```text
Nome: MD102-L07-SoLab02  ·  Platform: Windows 10 and later
(device.deviceName -eq "W11-LAB02")
```

Crie um perfil simples do Settings catalog (ex.: **MD102-L07-Perfil**, Experience > Allow Cortana = Block) atribuído a **All devices** com o filtro em modo **Include**.

### 4. Policy set
@ Intune: Devices > Organize devices > Policy sets > Create

- Adicione o Ring1, o perfil do passo 3 e uma política de conformidade qualquer. Tente adicionar uma política de Conditional Access: ela não aparece como opção.

## test
1. Sincronize as duas VMs.
2. Leia o adiamento aplicado em cada uma:
```powershell
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\PolicyManager\current\device\Update" |
  Select DeferQualityUpdatesPeriodInDays
```
3. Veja quem recebeu o perfil com filtro.

## evidence
- No ring: **Device status** / **Device assignment status**.
- Em cada dispositivo: @ Intune: Devices > All devices > (dispositivo) > **Device configuration** — lista de perfis e estado.
- No perfil com filtro: o dispositivo excluído pelo filtro aparece como **Not applicable**.

## expected
| VM | Ring1 | Ring2 | Adiamento |
|---|---|---|---|
| W11-LAB01 (só G1) | Aplica | — | **3 dias** |
| W11-LAB02 (G1 e G2) | Excluída por G2 | Excluída por G1 | **Nenhum** (sem valor no registro) |

- A scope tag não muda nada na aplicação (Q004).
- O perfil com filtro chega só à W11-LAB02.
- O policy set não aceita Conditional Access (Q095).

## variations
- **Q099:** grupo dinâmico de dispositivos com `(device.deviceOSVersion -startsWith "10.0.26")` para pegar só o Windows 11 24H2/25H2.
- **Q147:** atribua o policy set a "All users" excluindo um grupo de usuários e entre com usuários diferentes.
- Misturar grupo de **usuários** e grupo de **dispositivos** entre include e exclude não é avaliado como você espera. Teste incluindo G1 (dispositivos) e excluindo MD102-L02-MDM (usuários).

## breakit
Use **applicability rules** (edição do SO) para tentar separar as duas VMs. Como as duas têm a mesma edição, não separa: é exatamente o distrator da Q022.

## cleanup
Apague MD102-L07-* (rings, perfil, filtro, scope tag, policy set, grupos).

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-profile-assign
- https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/filters
- https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/policy-sets

=== L08 | RBAC do Intune, marcas de escopo e funções do Entra | A | 45
questions: Q177,Q104,Q110,Q209,Q154
predict: Q177
## overview
Testa quem pode fazer o quê com o **menor privilégio**.

- Intune: **Help Desk Operator** (tarefas remotas, atribuir o que já existe) × **Intune Role Administrator** (gerencia funções e atribuições) (Q177).
- Help Desk Operator pode **rotacionar a chave do BitLocker** (Q209).
- Scope tags limitando o que cada admin enxerga.
- Entra: User Administrator × Helpdesk Administrator (Q104) e quem liga/desliga **Security defaults** (Q110, duvidosa no banco).

## prereqs
- adm-helpdesk e adm-roleadmin (sem funções).
- Dois dispositivos inscritos, um com a scope tag **MD102-L08-SP**.

## steps
### 1. Scope tag nos dispositivos
@ Intune: Tenant administration > Roles > Scope tags > Create

- **MD102-L08-SP** · Assignments: um grupo de dispositivos com a W11-LAB01.

### 2. Help Desk Operator com escopo
@ Intune: Tenant administration > Roles > All roles > Help Desk Operator > Assignments > Assign

- Members: grupo **MD102-L08-HD** (adm-helpdesk) · Scope groups: All devices · Scope tags: **MD102-L08-SP**.

### 3. Intune Role Administrator
@ Intune: Tenant administration > Roles > All roles > Intune Role Administrator > Assignments > Assign

- Members: grupo com adm-roleadmin.

### 4. Funções do Entra para o teste da Q110
@ Entra: Entra ID > Roles & admins > Roles & admins > Conditional Access Administrator > Add assignments

- Atribua ao **adm-sec** (troque a função dele do L01, ou use outro usuário).

## test
1. Numa janela InPrivate, entre no Intune como **adm-helpdesk**:
   - Abra All devices: só aparece a W11-LAB01 (scope tag).
   - Tente **Sync**, **Restart** e **BitLocker key rotation** nela.
   - Tente criar uma política de conformidade: o botão Create fica indisponível.
2. Entre como **adm-roleadmin** e crie uma função personalizada (Tenant administration > Roles > All roles > Create).
3. **Q110:** entre no Entra como adm-sec (Conditional Access Administrator) e vá em @ Entra: Entra ID > Overview > Properties > **Manage security defaults**. Anote se ele consegue alterar. Depois troque a função por **Security Administrator** e repita.
4. **Q104:** dê **Helpdesk Administrator** a um usuário e tente redefinir a senha de um usuário comum e de um admin.

## evidence
- O que aparece habilitado ou desabilitado no portal para cada conta.
- @ Intune: Tenant administration > Audit logs (quem executou cada ação).
- @ Entra: Entra ID > Monitoring & health > Audit logs.

## expected
- Help Desk Operator: executa ações remotas (inclusive rotação da chave do BitLocker) só nos dispositivos com a scope tag dele; não cria políticas.
- Intune Role Administrator: cria funções e atribuições, mas não opera dispositivos.
- Helpdesk Administrator redefine senha de não administradores; User Administrator cria e gerencia usuários e grupos.
- Q110: anote quem conseguiu alterar o Security defaults. A documentação aponta **Security Administrator** como mínimo; o dump marca Conditional Access Administrator.

## variations
- **Q154:** com o adm-sec como Security Administrator, abra https://config.office.com e veja se ele gerencia Policy Management. Repita com Office Apps Administrator.
- Tire a scope tag da W11-LAB01 e veja o adm-helpdesk perder o acesso a ela.

## breakit
Atribua ao Help Desk Operator um **Scope group** que não contém a W11-LAB01, mantendo a scope tag. O dispositivo aparece na lista, mas as ações falham ou ficam indisponíveis: scope tag define o que se **vê**; scope group define **sobre quem** se age.

## cleanup
Remova as atribuições e a scope tag; tire as funções do Entra dadas no lab.

## refs
- https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/role-based-access-control
- https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/scope-tags
- https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference
