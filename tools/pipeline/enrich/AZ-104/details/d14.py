DET = {
"Q965": """Kerberos no Bastion :: opcional; não habilita o cliente nativo.
JIT na VM1 :: trata de portas públicas da VM; o Bastion não precisa dele.
mstsc.exe direto :: sem IP público, o mstsc sozinho não alcança a VM; o az network bastion rdp abre o túnel e chama o mstsc.
! Para usar o cliente nativo, o usuário precisa de Reader na VM, na NIC e no Bastion.""",
"Q972": """reference :: retorna o estado de runtime do recurso (propriedades); não serve para declarar dependência por id.
union :: combina objetos ou arrays.
Array / Image / vmId :: a propriedade correta é imageReference (ou image.id para imagem customizada dentro de imageReference).
! O dependsOn aceita o nome simples do recurso no mesmo template, mas resourceId evita ambiguidade.""",
"Q974": """IP2 (tier Global) :: o Bastion exige tier Regional.
IPs Basic, dinâmicos ou IPv6 :: só IPv4 Standard estático.
! O IP público precisa estar na mesma região do Bastion.""",
"Q980": """Sem a VNet1 :: no move entre assinaturas, a VNet da NIC precisa ir junto (com todos os recursos dependentes dela).
Com o storage1 :: não é dependência da VM (a menos que houvesse discos não gerenciados nele).
! Use "Validate move" (POST validateMoveResources) antes; o portal lista os dependentes que faltam.""",
"Q982": """Não pode ser alterado / só uma opção :: o user response é livre entre New, Acknowledged e Closed, nos dois sentidos.
! O monitor condition (Fired/Resolved) é definido pelo sistema; o user response é manual.""",
"Q989": """Free / Shared / Basic :: não têm autoscale. Basic chega a 3 instâncias manuais, e Free/Shared não aceitam escala.
A / AAAA / PTR :: o A aponta o domínio raiz, mas a **verificação** de posse é feita pelo TXT asuid.
! O mínimo para custom domain com TLS (SNI) é Basic; para autoscale e slots, Standard.""",
"Q999": """Administrative unit :: restringe a administração do Entra, não operações do vault.
Managed identity :: não protege operações críticas.
Função customizada :: não implementa a aprovação por outro usuário.
! Operações críticas (desabilitar soft delete, reduzir retenção…) exigem a permissão no Resource Guard, de preferência via PIM, com outro aprovador.""",
"Q1001": """**Série "Solution" (443 falha mesmo com allow):** a AllowAzureLoadBalancerInBound padrão já libera o probe. Uma regra nova com prioridade 150 é redundante. Investigue o app, o firewall do SO e o health probe.""",
"Q1022": """VM1 (Gen2) :: Não. A definição é Gen1 (V1), e a geração precisa casar.
VM2 / VM3 (Gen1) :: Sim. Recomendações de vCPU e memória não são impostas, e a região da origem não impede.
! A definição também fixa o SO (Windows/Linux), o estado (Generalized/Specialized) e o tipo de segurança (Trusted launch).""",
"Q1024": """1 plano :: um plano não roda Windows e Linux ao mesmo tempo.
3 ou 4 :: apps do mesmo SO e região podem compartilhar o plano.""",
"Q1026": """RG0 em East US :: Sim. A location vem do template (eastus).
4 RGs :: Sim. O loop copy com count 4 gera RG0 a RG3.
RG3 em West US :: Não. O -Location westus só define onde ficam os metadados da implantação.""",
"Q1028": """2 :: a regra dispara com 80% de memória, acima do limite de 70%.
3 ou 4 :: em 30 min há tempo para três ações (15 min + cooldowns curtos), até o máximo de 5.
! Autoscale nunca ultrapassa o Maximum configurado nem o limite do tier (Standard 10, Premium 30).""",
"Q1030": """Image1 (Windows) no Container Apps :: o Container Apps só roda Linux.
Image2 (Linux) só em parte :: os três serviços rodam Linux.
! O App Service roda containers Windows nos planos Premium v3 (Windows Containers) e containers Linux em planos Linux.""",
"Q1032": """Managed identity no App1 :: é o caminho no modelo RBAC; com access policy, o principal exigido é o Microsoft Azure App Service.
Mudar o KV1 para RBAC :: também funcionaria, mas não é o "primeiro passo" esperado.
Access policy para o User1 :: o usuário importa, mas quem lê o segredo depois é o principal do App Service.
! No modelo RBAC, dê **Key Vault Secrets User** ao principal Microsoft Azure App Service (ou à identidade do app).""",
"Q1034": """/16 / /23 / /24 :: maiores que o necessário (o /23 era o mínimo do ambiente Consumption-only legado).
/28 :: abaixo do mínimo de /27 do ambiente com workload profiles.
! A sub-rede do ambiente precisa ser **dedicada** e delegada a Microsoft.App/environments.""",
"Q1036": """3, 9 ou 10 :: o Bastion alcança VNets emparelhadas, inclusive em outras regiões (global peering).
! O Bastion não alcança VNets conectadas só por VPN/hub transitivo; precisa de peering direto com a VNet do Bastion.""",
"Q1038": """mstsc via Bastion Basic :: Não. O cliente nativo exige Standard (ou Premium).
Portal SSH para a VM2 :: Sim. A VNet2 está emparelhada com a VNet1.
Portal para a VM3 :: Não. A VNet3 só se emparelha com a VNet2, e peering não é transitivo.""",
"Q1040": """Policy1 na Subnet3 :: Sim. Mesma região da política (South Central US).
VNet2 restrita a storage1 e storage2 :: Não. Sem política aplicada, não há restrição.
VNet3 só storage2 :: Sim, pelo gabarito. O endpoint e a política filtram para a conta acessível na região.
! Service endpoint policies só suportam Azure Storage e precisam estar na região da VNet.""",
"Q1043": """Rede privada :: em VNet não há DNS name label público.
Nova sub-rede :: é para o modo privado.
SKU confidential :: trata de isolamento de hardware, não de DNS.
! Opções de reuso: Unsecure, Tenant, Subscription, ResourceGroup e NoReuse; elas evitam o "takeover" do nome.""",
"Q1045": """VM1 resolve server1 :: Não. A VNET1 usa o DNS do Azure, que não conhece a zona contoso.com hospedada na VM4.
VM2 → 131.107.3.3 :: Sim. Usa o DNS customizado com a zona.
VM3 → server2 = 131.107.2.4 :: Não. No DNS customizado, server2 = 131.107.3.4.
! Variantes desta questão trocam as VNets ligadas a zonas privadas. Confira sempre qual DNS cada VNet usa.""",
"Q1047": """**Por que essa ordem:** cada recurso depende do anterior: a NIC precisa da sub-rede da VNet, a VM precisa da NIC, e a extensão precisa da VM existente.
! No template, isso se expressa com dependsOn; o ARM paraleliza o que não tem dependência.""",
"Q1050": """Só VM1 :: a VNet2 está emparelhada com a VNet1, e o Bastion alcança VNets emparelhadas.
Com VM3 :: a VNet3 não tem peering direto com a VNet1.""",
"Q1053": """1/3 com 30 dias, 10 semanas ou 36 meses :: o ponto coincide com o anual, e vale a maior retenção (10 anos).
1/11 com 30 dias, 10 semanas ou 10 anos :: é o ponto mensal (dia 1) e não é o anual, então valem 36 meses.
! Quando um ponto é diário, semanal, mensal e anual ao mesmo tempo, ele fica pela maior retenção.""",
"Q1055": """VM1 com Policy1 (Standard) :: Sim. A política Standard suporta VMs com ADE.
VM2 com Policy3 :: Não. A Policy3 é de Backup vault, que não protege VMs.
VM2 com Policy2 (Enhanced) :: Sim. Trusted launch exige a política Enhanced.
! A política Enhanced permite vários backups por dia (a cada 4 h) e é obrigatória para Trusted launch e discos Premium SSD v2/Ultra.""",
"Q1057": """DCR :: define o que coletar, não o caminho de rede.
Workspace :: já pode existir; o isolamento de rede vem do AMPLS.
Private endpoint primeiro :: o private endpoint do Azure Monitor é criado **para** um AMPLS.
! O AMPLS afeta o DNS de toda a VNet (e das que compartilham DNS); planeje para não quebrar outros workspaces.""",
"Q1059": """cont1 no Recovery Services vault :: blobs usam Backup vault (operacional ou vaulted).
share1 no Backup vault :: Azure Files usa Recovery Services vault.
Não pode ser protegido :: os dois são suportados, cada um no seu vault.""",
"Q1067": """VNET1 / IP1 / NSG1 :: são dependências da NIC, não diretas da VM.
! Listar dependências indiretas no dependsOn da VM não quebra nada, mas a resposta mínima é a NIC.""",
"Q1069": """Storage account :: arquivamento barato, sem consulta KQL.
Event Hub :: streaming para SIEMs ou ferramentas externas.
! Para SQL, o "Database Watcher" ou o SQL Insights complementam; na AZ-104, a resposta é o workspace.""",
"Q1071": """SQL / KQL :: KQL até é usado em transformações da DCR (transformKql), mas o filtro de eventos na origem é XPath.
! XPath: System!*[System[(EventID=1001)]]; teste antes com Get-WinEvent -FilterXPath.""",
"Q1073": """Arc agent sozinho :: é o pré-requisito para gerenciar o servidor, mas o Connection Monitor usa o AMA.
Network Watcher Agent :: só para VMs do Azure.
Log Analytics agent :: aposentado.
! Na prática: Arc no DC1 → extensão AMA → endpoint no Connection Monitor.""",
"Q1075": """Diagnostic settings da VM / do NSG :: não geram dados de fluxo para o Traffic Analytics.
Insights da VM :: é o VM Insights (desempenho e dependências), não o Traffic Analytics.
! Os NSG flow logs não podem mais ser criados (a partir de 30/06/2025); hoje habilite VNet flow logs na VNet1.""",
"Q1077": """AMPLS / private endpoint :: isolamento de rede, opcional.
Diagnostic settings :: são para logs da plataforma, não arquivos de log do SO.
VM insights :: desempenho e dependências, não IIS.
! Logs de texto e do IIS na DCR exigem DCE na mesma região; o AMA lê os arquivos W3C.""",
"Q1089": """New-AzManagementGroupDeployment / New-AzTenantDeployment :: escopos acima do necessário.
New-AzResourceGroupDeployment :: exige um RG existente e não cria RGs.""",
"Q1093": """VM no RG1 :: Sim. O lock CanNotDelete só bloqueia exclusão.
VM no RG2 :: Não. ReadOnly bloqueia criar e alterar recursos.
Criar RG3 manualmente :: Sim. Locks de RG não afetam outros RGs da assinatura.
! ReadOnly também bloqueia operações POST "inofensivas", como listar chaves de storage.""",
"Q1095": """Proximity2 / Proximity3 :: estão em outras regiões.
! Em outras versões desta questão, o PPG correto muda; confira a região do VMSS na tabela.""",
"Q1099": """/24 :: maior que o necessário.
/28 / /29 :: abaixo do mínimo /26.
IP Basic (estático ou dinâmico) :: o Bastion exige IP Standard estático.
! Upload e download de arquivos só funcionam com o cliente nativo (Standard/Premium); host scaling vai de 2 a 50 instâncias.""",
"Q1101": """VM1 → contoso102 :: Não. A policy só permite contoso101 via endpoint.
VM2 → contoso101 :: Sim. A Subnet2 não tem endpoint nem policy, e o acesso público continua liberado.
VM2 com IP privado para o Entra :: Não. Service endpoints não dão IP privado, e o Entra não usa endpoint.
! Mesmo com service endpoint, o destino continua com IP público; o que muda é a identidade da origem e a rota pelo backbone.""",
"Q1103": """Workbook :: visualização opcional; não é pré-requisito.
Sentinel :: consome dados, mas não é necessário.
DCR :: é usada pelo AMA, não pelos flow logs.
! O storage dos flow logs precisa estar na mesma região das VNets ou NSGs monitorados.""",
}
