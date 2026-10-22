FIX = {
"Q833": {"answer": 1, "explanation": "VM1 (VNET1) e VM4 (VNET3) estão em VNets que **não estão emparelhadas entre si** (as duas só se emparelham com a VNET2, e peering não é transitivo). O menor esforço é **criar o peering VNET1 ↔ VNET3**. O dump marcava \"atribuir 10.0.1.5 à VM4\", que não faz sentido."},
"Q781": {"slots": {"1": {"options": ["| extend", "| join", "| print", "| project"], "answer": 3}}},
"Q761": {"explanation": "Contas com **funções administrativas** (Security administrator, Billing administrator etc.) seguem a política fixa de administrador: **dois métodos, sem perguntas de segurança**. O User1 (Reports reader, que não está na lista de funções da política de administrador) segue a política configurada, com 3 perguntas. O dump marcava Sim para o BillAdmin1."},
}
DET = {
"Q761": """SecAdmin1 / BillAdmin1 com perguntas :: Não. Funções administrativas usam a política de administrador (dois métodos fortes, como app, SMS ou e-mail), sem perguntas de segurança.
User1 com a pergunta do pet :: Sim. Usuário comum segue a política do tenant (3 perguntas no registro e 3 no reset, entre as 3 definidas).
! A política de administrador não pode ser alterada e vale mesmo com o SSPR desabilitado para usuários.""",
"Q763": """**Série "Solution" (usuários no tenant novo):** só o **User1**, criador e Global Admin do novo tenant, atende. Funções no tenant antigo ou na assinatura não valem lá.""",
"Q767": """Uma, seis ou 24 vezes :: com a granularidade automática de 6 h no intervalo de 30 dias, são 4 pontos por dia.
Scale down :: com CPU perto de 100%, reduziria o desempenho.
Scale out :: adiciona instâncias; ajuda se o app escalar horizontalmente, mas o gabarito pede instância maior (scale up) para CPU saturada.
! A granularidade do gráfico de métricas muda com o intervalo; ajuste-a em "Time granularity" para ver picos.""",
"Q769": """Restore VM :: restaura a VM inteira; mais lento que recuperar dois arquivos.
Mount a VHD :: o script já monta os volumes do ponto de recuperação via iSCSI.
AzCopy :: os volumes aparecem como unidades locais; basta copiar.
! Ressalva da prova: para VM Linux, o script precisa rodar numa máquina Linux compatível. Para Windows, numa máquina Windows.""",
"Q771": """Blob container / file share / storage account :: o Azure Backup de VM guarda os dados no vault (storage gerenciado pelo serviço).
Batch job / batch schedule :: são do Azure Batch.
Recovery plan :: é do Site Recovery (ordem de failover).
! A política default (DefaultPolicy) faz backup diário com retenção de 30 dias. Ajuste o horário para 01:00.""",
"Q773": """Virtual machine extension :: não é recurso alvo de alertas.
Virtual machine :: alertas de log também podem ter a VM como escopo, mas a consulta roda nos dados do workspace; o gabarito pede o workspace.
Metric alert :: é um tipo de regra, não um recurso alvo.
! Eventos do Windows não viram métricas da plataforma; por isso o alerta é de log (KQL).""",
"Q775": """Cost Analysis :: mostra gastos, mas não aponta discos órfãos.
Mudar a configuração do Advisor :: só ajusta regras e limites.
Storage Explorer :: lista discos, mas não indica quais estão sem anexo nem recomenda exclusão.
! Também dá para filtrar Disks por "Disk state = Unattached" no portal ou usar o Azure Resource Graph.""",
"Q777": """Workbook :: visualiza dados existentes; não cria logs.
Service Health alert :: avisa sobre incidentes da plataforma, não sobre erros do seu app.
Application Logging :: grava só o que o código escreve (trace); os detalhes HTTP vêm do web server log.
! Também ajuda o **Detailed error messages** e o **Failed request tracing** para os 500. O Log stream mostra em tempo real.""",
"Q781": """Heartbeat / NetworkMonitoring / Perf :: não registram operações nem eventos da assinatura.
extend / join / print :: extend cria colunas, join combina tabelas e print gera uma linha avulsa. Para escolher colunas, use project.
! Exemplo: AzureActivity | where Level == "Error" | project TimeGenerated, OperationNameValue, _ResourceId.""",
"Q783": """Desalocar a VM :: não é necessário para o Replace existing (o serviço para a VM).
Excluir a VM :: aumenta a indisponibilidade e perde a configuração.
Create new :: gera uma VM nova (outro IP e NIC), com mais trabalho e mais tempo fora.
! Pontos fora da retenção de snapshot (5 dias) vêm do vault (tier padrão) e são mais lentos que o Instant Restore, mas funcionam.""",
"Q785": """storage1 / DB1 como fonte :: recursos PaaS enviam logs por diagnostic settings, não por DCR do agente.
Workspace como fonte :: é destino, não fonte.
storage1 / DB1 como destino :: DCRs de agente enviam para workspaces do Log Analytics ou para Azure Monitor Metrics.
! DCRs também alimentam tabelas customizadas pela Logs Ingestion API.""",
"Q787": """Owner da VM1 só com o User3 :: o User1 também herda Owner da assinatura.
User4 como Owner da VM1 :: Contributor no RG1 não é Owner.
User2 criar VM no RG1 :: o User2 é Owner do RG2, não do RG1.
User3 criar VM no RG1 :: Owner só da VM1 não permite criar recursos no RG.""",
"Q789": """Atribuir Role1 a outros :: Não. Microsoft.Authorization/*/Write está em NotActions.
Implantar VMs :: Sim. Tem compute, discos, NIC e subnets/join/action.
IP estático :: Sim. networkInterfaces/* permite alterar a configuração de IP da NIC.
! Leia as funções customizadas como: Actions − NotActions = permissões efetivas.""",
"Q791": """VM1 acessa o storage1 :: Sim. Storage_Access (145) vem antes do Block_Internet (150).
VM2 → VM1 por HTTPS :: Sim. O deny de entrada só cobre a origem Internet; o tráfego da VNet entra pela AllowVnetInBound.
Regras valem para toda a VNET1 :: Não. O NSG está associado a uma sub-rede só.
! A service tag "Storage" pode ser regional (Storage.EastUS) para restringir ainda mais.""",
"Q795": """User1 entra na VM1 :: Não. O acesso dele é na Sub2, e a VM1 está na Sub1.
User2 gerencia discos e snapshots da VM1 / VM3 :: Não. O escopo é o MG2, e Virtual Machine Contributor não inclui snapshots.
! Logins com Entra ID: Virtual Machine Administrator Login (admin) ou Virtual Machine User Login (usuário comum).""",
"Q797": """Application Insights Profiler :: perfila desempenho de código.
Access reviews :: revisão periódica de acessos, não monitoramento de atividade.
Activity log filters :: o filtro do portal é por assinatura e com retenção de 90 dias; não centraliza.
! Use diagnostic settings na assinatura (Activity log) → workspace central. Com Azure Policy, dá para padronizar em todas as assinaturas.""",
"Q799": """Recovery Services vault :: o backup de discos gerenciados avulsos usa o Backup vault.
Configurar managed identity :: o Backup vault já tem identidade system-assigned; o passo é dar as permissões a ela.
! Permissões: Disk Backup Reader no disco e Disk Snapshot Contributor no RG onde ficam os snapshots.""",
"Q801": """Application security group :: representa NICs suas, não serviços do Azure.
IP addresses :: os IPs do portal mudam; manter a lista à mão é inviável.
Any :: bloquearia toda a internet.
! Regra de saída com destino AzurePortal (ou AzureCloud, mais amplo), Deny, prioridade antes da AllowInternetOutBound.""",
"Q811": """1 ou 2 vaults :: os vaults são regionais, e há recursos em 3 regiões.
4 ou 7 vaults :: VM e file share da mesma região cabem no mesmo vault.
1 a 5 políticas :: as políticas são por vault e por tipo de workload (VM ≠ Azure Files).""",
"Q813": """Diagnostic settings :: enviam logs e métricas da plataforma, não contadores do SO convidado.
Azure SQL database :: não tem relação com o alerta.
! Hoje: Azure Monitor Agent + DCR coletando `LogicalDisk(*)/% Free Space` → alerta de log, ou métrica de convidado via DCR (Azure Monitor Metrics).""",
"Q815": """Contributor (RG1 ou Sub1) :: não gerencia políticas, porque Microsoft.Authorization/* está em NotActions.
Security Admin :: gerencia políticas de segurança do Defender, mas é amplo e não é o recomendado aqui.
! Resource Policy Contributor = criar e atribuir definições, iniciativas e exemptions, sem outros acessos.""",
"Q817": """Hierarchical namespace :: é recurso de blob (ADLS Gen2), não de file share.
Mudar storage1/4 para GPv2 :: não habilita identidade no storage2.
SAS :: não é RBAC e não funciona com SMB.
! A fonte de identidade do Azure Files é por **conta**; todas as shares dela usam a mesma.""",
"Q819": """Recovery plan :: é do Site Recovery.
Azure Backup Server (MABS) :: é para workloads on-premises.
Backup policy :: é criada dentro do vault, que precisa existir antes.""",
"Q821": """Chave + mapear unidade :: mapear funciona com Azure Files (SMB), não com blob.
Import/Export :: envio de discos físicos; o requisito é pela internet.
SAS + mapear unidade :: SAS não monta unidade SMB.
! AzCopy também atende e é mais rápido para volumes grandes.""",
"Q823": """Blob :: Sim. Blueprints em archive e discos não gerenciados (page blobs).
Table / File :: Não. Nenhum requisito do caso pede esses serviços.""",
"Q825": """container1 em storage1 (GPv1) :: sem tiers.
container1 em storage4 (FileStorage) :: sem blobs.
share1 em BlobStorage / FileStorage :: BlobStorage não tem Files; FileStorage é Premium (sem tier Cool).
! Os tiers de Azure Files Standard são Transaction optimized, Hot e Cool, e só existem em GPv2.""",
"Q827": """BlobStorage / BlockBlobStorage :: são válidos para object replication só em pares do mesmo tipo; o gabarito pede GPv2 para casar com o storage2.
GPv1 :: não suporta object replication.
Outros destinos :: precisam ser GPv2 com versionamento; o storage2 é o compatível.""",
"Q829": """storage1 / storage3 / storage4 :: estão em regiões diferentes da VM5 (East US). O storage dos flow logs precisa estar na mesma região.
! A retenção máxima configurável no flow log é de 365 dias; depois disso, use lifecycle management.""",
"Q831": """Diagram da VNet :: mostra a topologia, não testa regras.
Diagnostic settings :: enviam logs; não testam um fluxo.
Traffic Manager :: balanceamento DNS, sem relação com NSG.
Advisor :: recomendações gerais; não diagnostica um fluxo.
! IP flow verify: VM3, direção Outbound, TCP, IP e porta remotos (8080). O resultado mostra Allow/Deny e o nome da regra.""",
"Q833": """NSG nas duas VMs :: o NSG só filtra; não cria conectividade entre VNets.
IP 10.0.1.5 na VM4 :: trocar o IP não conecta VNets sem peering.
UDR VNET1 → VNET3 :: a UDR precisaria de um next hop (NVA na VNET2 com forwarding); sem peering direto, mais esforço.
! Peering não é transitivo: VNET1↔VNET2 e VNET2↔VNET3 não ligam VNET1↔VNET3.""",
}
