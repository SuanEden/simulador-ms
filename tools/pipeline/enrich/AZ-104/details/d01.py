DET = {
"Q001": """Management groups :: agrupam assinaturas para aplicar Policy/RBAC em escala; não rotulam VMs dentro de um RG.
Um resource group por departamento :: reorganiza o ciclo de vida e as permissões só para identificar o dono; dá trabalho e não resolve recursos compartilhados.
Modificar configurações da VM :: nenhuma configuração da VM guarda metadados organizacionais.
! Tags não são herdadas do resource group; para herdar, use a Azure Policy "Inherit a tag from the resource group".""",
"Q005": """New-AzureRmVm :: módulo AzureRM, aposentado. Mesmo o New-AzVM só aplicaria a CA com custom data/extensão, e a questão pede o comando que aceita cloud-init direto.
New-AzVM :: cria a VM, mas o caminho documentado para cloud-init em Linux é az vm create --custom-data.
Create-AzVM :: cmdlet que não existe.
! Custom data/cloud-init só roda no primeiro boot. Para configurar depois, use a Custom Script Extension.""",
"Q012": """GRS :: replica para a região par, mas a secundária só pode ser lida depois de um failover.
ZRS :: três zonas de uma única região; não atende "locais geográficos separados".
LRS :: três cópias em um único datacenter.
! "Ler na secundária" sempre aponta para RA-GRS ou RA-GZRS.""",
"Q013": """**Série "Solution":** só o blade do **Resource group** (Deployments) mostra o template de uma implantação com vários recursos. VM e Container não guardam histórico de implantação.
! Em Deployments também dá para reimplantar e ver os parâmetros usados. "Export template" do RG gera o estado atual, que é diferente do template original.""",
"Q014": """**Série "Solution":** **Resource group > Settings > Deployments** abre cada implantação, com **Template**, **Parameters** e **Inputs**. É a resposta certa da série; VM e Container não servem.
! Implantações no escopo da assinatura aparecem em Subscription > Deployments.""",
"Q015": """**Série "Solution":** o container de blob só guarda dados. Revisar o template usado = **Resource group > Deployments**.""",
"Q016": """Parar apenas uma VM :: as outras continuam alocadas e prendem o availability set ao cluster atual, que não tem o novo tamanho.
Parar duas VMs :: mesmo motivo; basta uma VM ligada para o conjunto ficar no cluster atual.
Remover a VM do availability set :: não é possível; a associação ao availability set só é definida na criação da VM.
! Antes, confira se o tamanho está disponível no cluster atual (lista de tamanhos com a VM ligada). Se estiver, dá para redimensionar sem parar as outras.""",
"Q017": """Parar a VM de origem :: desnecessário; discos de dados suportam hot detach.
Parar a VM de destino :: anexar disco de dados também é feito a quente.
Excluir a VM :: destrutivo e desnecessário.
! Disco de SO não pode ser desanexado com a VM ligada; isso vale só para discos de dados.""",
"Q018": """10 / 30 :: o máximo de fault domains por availability set é 2 ou 3, conforme a região.
Min Value :: menos fault domains significa mais VMs afetadas pela mesma falha de rack.
! Fault domain = rack (energia/rede); update domain = grupo reiniciado junto na manutenção.""",
"Q019": """10 :: é válido, mas não é o máximo; deixa mais VMs reiniciando ao mesmo tempo.
30 / 40 :: acima do limite de 20 update domains.
! Padrão: 5 UDs e 2 FDs (3 em muitas regiões). Com mais VMs que UDs, as VMs são distribuídas em rodízio.""",
"Q020": """Storage account :: guardar a senha em blob a deixaria legível; storage não é um cofre de segredos.
Identity Protection :: trata risco de entrada de usuários; não guarda segredos.
Azure Policy / backup policy :: não armazenam nem protegem a senha usada no template.
! O Key Vault precisa da opção **enabledForTemplateDeployment**. Quem implanta precisa de **Microsoft.KeyVault/vaults/deploy/action** (ex.: Key Vault Contributor ou uma função customizada).""",
"Q022": """Add-AzVM :: não existe para upload (VMs são criadas com New-AzVM).
Add-AzImage :: não existe; a imagem é criada com New-AzImageConfig + New-AzImage a partir do VHD enviado.
Add-AzImageDataDisk :: só acrescenta um disco de dados a uma configuração de imagem.
! O VHD precisa ser de tamanho fixo (não dinâmico) e alinhado em MB. Add-AzVhd converte o VHDX automaticamente.""",
"Q028": """**Série "Solution" (listener do Always On):** só **Floating IP habilitado** atende. O probe precisa ser **TCP** numa porta dedicada (ex.: 59999), não HTTP na 1433, e a persistência fica em **None**.
! A regra do LB usa a porta do listener (1433) como frontend e backend, com Floating IP. O probe usa outra porta, que só responde no nó primário.""",
"Q029": """**Série "Solution":** Session persistence Client IP não é requisito do listener; o necessário é **Floating IP** na regra e um probe **TCP** dedicado.
! Hoje, em VMs com SQL em uma única sub-rede, a Microsoft recomenda usar **multi-subnet** ou **DNN** no lugar do load balancer.""",
"Q030": """**Série "Solution":** Floating IP (Direct Server Return) é obrigatório porque o IP do listener está configurado no cluster e só o nó primário responde a ele.
! Probe HTTP na 1433 e Client IP aparecem como distratores na mesma série.""",
"Q032": """10 / 20 / 40 :: uma NIC já carrega o IP privado e o IP público associado. NICs extras só servem para separar tráfego em sub-redes diferentes.
! O número máximo de NICs depende do tamanho da VM. Toda VM precisa de pelo menos uma.""",
"Q033": """2, 3 ou 4 NSGs :: regras idênticas não justificam mais de um NSG; um NSG associado à sub-rede (ou reaproveitado em todas as NICs) basta.
! Um NSG pode ser associado a várias sub-redes e NICs, desde que estejam na mesma região.""",
"Q034": """Somente na VM infectada :: o script de File Recovery roda em qualquer máquina com SO compatível e internet até o Azure.
Somente em uma VM nova :: não é exigido; serve qualquer máquina, inclusive on-premises.
Não é possível recuperar :: os pontos de recuperação ficam no vault (e no snapshot do Instant Restore) e não são afetados pelo ransomware da VM.
! Os volumes ficam montados por 12 horas; depois, desmonte e feche a sessão no portal.""",
"Q035": """Excluir a VM infectada antes :: não é necessário; pode-se restaurar como nova VM ou substituir os discos.
Restaurar em qualquer VM da assinatura :: não existe; as opções são Create new (VM ou discos) e Replace existing.
Restaurar em dispositivo Windows on-premises :: o backup de VM do Azure não restaura para on-premises.
! Replace existing troca os discos da mesma VM e guarda os discos antigos; útil para manter a configuração e o IP.""",
"Q036": """Traffic Analytics :: analisa fluxos de rede dos flow logs, não métricas de desempenho.
Activity Log :: registra operações de plano de controle (quem criou ou parou o quê), não desempenho.
Advisor :: dá recomendações, não investiga métricas em tempo real.
! Métricas são numéricas e quase em tempo real (Metrics explorer). Logs são consultados com KQL no Log Analytics.""",
"Q037": """#nohead
**Por que todas valem:** o backup de VM é feito no nível do disco (snapshot), então não depende de a VM estar ligada. VM desligada gera ponto **crash-consistent**; VM ligada gera ponto **application-consistent** no Windows (VSS) ou **file-consistent** no Linux.
! Windows cliente 64-bit e distros Linux endossadas (Debian, Ubuntu, RHEL…) são suportados. SO 32-bit não é.""",
"Q039": """**Série "Solution" (500 convidados):** Bulk create cria **membros** (UPN do tenant), não convidados. O certo é **Users > Bulk operations > Bulk invite** (CSV com e-mail e redirect URL) ou **New-MgInvitation** em loop no PowerShell.
! Bulk invite envia o convite por e-mail; o convidado aparece com UserType = Guest até resgatar o convite.""",
"Q041": """Contributor no LB :: funciona, mas é mais amplo que o necessário.
Owner no LB :: dá também gerência de acesso; viola o menor privilégio.
Network Contributor no RG1 :: dá acesso a todos os recursos de rede do RG, não só ao LB.
! Na AZ-104, "menor privilégio" = função mais específica no menor escopo que resolve.""",
"Q043": """Security group (atribuído ou dinâmico) :: a política de expiração só se aplica a grupos Microsoft 365.
Grupo de segurança Dynamic Device :: nem expira nem serve para dar acesso de usuários ao SharePoint.
! O dono recebe aviso 30, 15 e 1 dia antes de expirar. Grupo com atividade (Outlook, SharePoint, Teams) é renovado automaticamente.""",
"Q045": """Criar VNet na Subscription1 :: Não. O *Not allowed resource types* (virtualNetworks) aplicado no Tenant Root Group é herdado por todas as assinaturas.
Criar VM na Subscription2 :: Não. Com *Allowed resource types* = virtualNetworks no MG12, todo o resto é negado.
Mover a Subscription1 para o MG11 :: Sim. A política não bloqueia mover assinaturas entre management groups; é preciso permissão nos MGs de origem e destino.
! Políticas são herdadas de cima para baixo e o deny vence; escopos-filhos não conseguem "liberar" o que o pai nega.""",
"Q046": """Bloqueia SQL em toda a assinatura :: ignora as Exclusions da atribuição.
Bloqueia só no ContosoRG1 :: é o inverso; o RG excluído é o único liberado.
Permite em qualquer RG :: a política nega em todos os RGs fora da exclusão.
! Exclusions ficam na **atribuição**; exemptions são um recurso separado, com motivo e validade.""",
"Q047": """VNET1 recebe Label :: o efeito só age em criação/atualização. Recursos existentes só recebem a tag com **tarefa de remediação** (efeito modify).
VNET recebe RGroup: RG6 :: tags do resource group não são herdadas.
! Para herdar a tag do RG, use a política "Inherit a tag from the resource group" (modify) e faça remediação nos recursos existentes.""",
"Q048": """Excluir o RVAULT1 :: o Recovery Services vault pode ser movido entre assinaturas (com as restrições da documentação).
Só a VM e o disco :: storage account e VNet também suportam move.
Só o vault :: VMs, discos, storage e VNets também são movíveis.
! Recursos dependentes precisam ir juntos (VM + NIC + discos + VNet), e o move não muda a região.""",
"Q049": """Set-AzApiManagementSubscription :: cuida de assinaturas do API Management, não dos termos do Marketplace.
Registrar o provider Microsoft.Marketplace :: o erro é de termos legais, não de provider.
Billing administrator :: função de cobrança; não aceita os termos da imagem para a assinatura.
! Alternativas: Get-AzMarketplaceTerms … | Set-AzMarketplaceTerms -Accept, ou az vm image terms accept --urn.""",
"Q050": """Licenses :: atribuir licença não dá função administrativa.
Groups :: entrar num grupo só dá função se o grupo for role-assignable e tiver a função; aqui o caminho direto é Assigned roles.
! Funções podem ser atribuídas a grupos se o grupo for criado com "Microsoft Entra roles can be assigned to the group" = Yes.""",
"Q051": """Convidar para um grupo :: a associação só ajuda se o grupo tiver a licença (licenciamento por grupo); só convidar não licencia.
Adicionar enterprise application :: não tem relação com licença P2.
Directory role :: função administrativa não é licença.
! O usuário precisa de **Usage location** preenchido antes de receber licença.""",
"Q052": """Automation runbook :: poderia chamar APIs, mas não é a integração nativa nem o primeiro passo.
Function app :: código customizado; desnecessário com o ITSMC.
Notification :: e-mail/SMS do action group não cria incidente no Service Manager.
! Ordem: ITSMC (conexão com o SCSM) → action group com ação ITSM → regra de alerta de métrica (Available Memory < 10%).""",
"Q054": """User1 (Cloud device administrator) adicionar Device2 ao Group1 :: Não. A função gerencia dispositivos (habilitar, desabilitar, BitLocker), não associação de grupos.
User2 (dono do Group1) adicionar Device1 :: Sim. Dono de grupo atribuído gerencia membros, inclusive dispositivos.
User2 adicionar ao Group2 :: Não. Grupo dinâmico não aceita membros manuais.
! Grupos dinâmicos são de usuários **ou** de dispositivos, nunca mistos.""",
"Q055": """Excluir VM1 / parar VM1 / excluir sa001 :: nenhum desses recursos impede a exclusão; o bloqueio é o vault com item protegido.
! Com soft delete, os dados de backup ficam retidos 14 dias. Para excluir o vault antes disso, desabilite o soft delete e exclua os itens em soft delete.""",
"Q056": """Remover Reader/Security Reader :: tirar permissões não dá direito de atribuir funções.
Network Contributor (VNet1 ou RG1) :: gerencia rede, mas não tem Microsoft.Authorization/roleAssignments/write.
! Hoje existe também o **Role Based Access Control Administrator**, que atribui funções com condições (ex.: só Reader). É a opção de menor privilégio em questões novas.""",
"Q057": """NSEC / RRSIG :: registros de DNSSEC.
PTR :: DNS reverso.
! TXT (MS=msXXXXXXXX) é o padrão; MX é a alternativa quando o provedor DNS não aceita TXT. A verificação só sai depois da propagação.""",
"Q058": """**Série "Solution" (criar logic apps no RG Dev):** DevTest Labs User e Logic App Operator **não** criam logic apps. **Contributor no Dev** (ou Logic App Contributor) atende.
! Logic App Operator = ler, habilitar, desabilitar e ver execuções. Logic App Contributor = criar e gerenciar.""",
"Q059": """**Série "Solution":** Logic App Operator não tem permissão de escrita. Funções que criam: Logic App Contributor, Contributor e Owner.""",
"Q060": """**Série "Solution":** Contributor no RG Dev atende, no escopo certo. Atribuir na assinatura também funcionaria, mas daria acesso além do Dev.
! Contributor não atribui funções (para isso: Owner, User Access Administrator ou RBAC Administrator).""",
"Q061": """Tag em cada resource group :: os recursos de um departamento estão espalhados em vários RGs, e as tags do RG não chegam aos recursos.
Resource costs de cada RG :: mostra o custo por RG, não por departamento.
! Cost analysis permite agrupar e filtrar por tag; os custos só refletem as tags a partir de quando foram aplicadas.""",
"Q062": """Get-Event … :: sintaxe de PowerShell, não KQL.
select * from … :: sintaxe SQL.
… where EventType -eq "error" :: -eq é PowerShell; em KQL o operador é ==.
! Em KQL, tudo começa pela tabela ou por search, encadeado com |. Na tabela Event, o campo é EventLevelName == "Error".""",
"Q063": """Conectar ao VNET1 :: Sim. As VMs e o VNET1 estão na mesma região, e as zonas não restringem a VNet, que abrange toda a região.
Perda de um datacenter :: Sim. As VMs estão em zonas diferentes.
Perda da região :: Não. Para isso é preciso outra região (ex.: Site Recovery).""",
"Q064": """App Service plan muda para North Europe :: mover de RG nunca muda a região do recurso.
Policy1 continua valendo :: a política do RG de origem deixa de se aplicar; vale a do RG de destino.
! A localização do RG é só onde ficam os metadados dele; os recursos podem estar em outras regiões.""",
"Q065": """assignableScopes "/" :: escopo raiz; só para funções que valem no tenant todo (e exige privilégio elevado).
.../resourceGroups :: não é um escopo válido.
Microsoft.Resources/* :: bloquearia a gestão de deployments e de RGs, não as permissões de acesso.
Microsoft.Security/* :: trata do Defender for Cloud.
! Actions = "*" com NotActions = Microsoft.Authorization/* é a definição da função Contributor.""",
}
