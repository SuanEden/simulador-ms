DET = {
"Q195": """**Série "Solution":** Automation script, hoje **Export template**, gera o template do estado atual e não mostra datas. Só **Deployments** (e o Activity Log) mostram data e hora.""",
"Q196": """**Série "Solution":** Deployments é a resposta. Também mostra a correlação, a duração e as operações de cada recurso implantado.""",
"Q197": """HDInsight :: cluster de big data (Hadoop/Spark); não é ferramenta de monitoramento de VM.
AzurePerformanceDiagnostics :: diagnóstico pontual de desempenho em VMs **Windows**.
Analysis Services :: modelagem de dados (BI).
! O LAD e o agente do Log Analytics estão aposentados ou em fim de vida. Em questões novas: **Azure Monitor Agent + DCR** (métricas de convidado e syslog).""",
"Q198": """Só DNS / web e DNS (com a Rule2) :: a Rule2 (prioridade 100, Deny 50–60) bloqueia a 53 antes da Rule1.
Nenhum acesso :: a porta 80 está fora do Deny e cai no Allow da Rule1.
Sem a Rule2, só web :: a Rule1 (50–500) passa a liberar a 53 também.
! As regras são avaliadas por prioridade (número menor primeiro), e a primeira que casar decide.""",
"Q199": """Mesma zona :: a perda daquele datacenter derruba as três VMs.
Availability set (um ou vários) :: distribui VMs entre racks de um mesmo datacenter, não entre datacenters.
! Zonas = SLA de 99,99% para 2 ou mais VMs; availability set = 99,95%.""",
"Q201": """Performance Diagnostics :: só coleta diagnóstico.
Scale set :: escala horizontal, e o app não aceita várias instâncias ativas.
Cota de vCPU :: é pré-requisito em alguns casos, mas não aumenta a CPU da VM.
DSC :: configura o SO, não o hardware.
! Redimensionar reinicia a VM; agende a mudança antes da janela do relatório.""",
"Q202": """Deployment Center :: CI/CD do App Service, não de VMs.
New-AzConfigurationAssignment :: atribui configurações de manutenção (Maintenance Configuration), não instala software.
Intune :: gerencia dispositivos de usuários, não servidores em scale set.
! Custom Script Extension também resolveria. O que importa é que a configuração fique no **modelo** do scale set.""",
"Q205": """Owner :: excede o menor privilégio.
Credenciais FTPS (app ou usuário) :: são credenciais de publicação do App Service, não do Entra ID.
! Desabilitar a "basic authentication" de FTP/WebDeploy força a publicação somente com Entra ID.""",
"Q206": """**Série "Solution" (500 convidados):** **Bulk invite** é o recurso certo. **Bulk create** cria membros e não convidados. O CSV precisa de *Email address to invite* e *Redirection url*.
! Pelo PowerShell: Import-Csv + New-MgInvitation -InvitedUserEmailAddress … -InviteRedirectUrl … -SendInvitationMessage.""",
"Q207": """Role3 só de built-ins :: o Azure RBAC também permite clonar funções customizadas (Role1).
Role4 de built-ins do Entra :: as funções built-in do Entra não podem ser clonadas no portal; só as customizadas.
! Funções customizadas do Entra exigem P1 e só aceitam permissões de alguns recursos (ex.: app registrations).""",
"Q208": """User1 com Reader :: Reader não lê dados do storage (nem lista as chaves).
User1 com Storage Blob Data Reader :: também atenderia blobs, mas o gabarito usa Reader and Data Access, que cobre todos os serviços via chave.
User2 com Contributor / Storage Account Contributor :: não atribuem funções.
! Se as opções incluíssem User Access Administrator ou RBAC Administrator, seriam o menor privilégio para o User2.""",
"Q209": """Application security group :: agrupa NICs de VMs, não representa os IPs do Key Vault.
IP address range :: exige manter a lista de IPs à mão.
! A service tag regional (AzureKeyVault.EastUS) é ainda mais restrita. Outra opção: private endpoint, que dispensa regra de internet.""",
"Q210": """Só User4 :: o User1 é membro direto do Group1 e herda a licença.
User2 / User3 :: estão em grupos aninhados, e o licenciamento por grupo não propaga para grupos aninhados.
! O licenciamento por grupo também não aceita grupos com associação dinâmica de dispositivos.""",
"Q212": """File1 em Cool em 6/6 :: a Rule1 (prefixo container1) arquiva no dia 3, então ele está em Archive.
File2 em Cool em 1/6 :: no dia do upload ele está no tier padrão (Hot).
File2 em Archive em 16/6 :: a exclusão em 10 dias acontece antes, então ele já foi apagado.
! Quando várias ações casam no mesmo dia, vence a mais barata: delete > archive > cool.""",
"Q213": """Rollback após 7 dias :: o restorePolicy de 6 dias limita o point-in-time restore a 6 dias.
Só usuários de East US :: a região do storage não restringe clientes; o firewall está em Allow.
3 cópias :: Sim. LRS = 3 réplicas síncronas.
! O point-in-time restore exige versionamento, change feed e soft delete, este último com retenção maior que a janela de restore.""",
"Q215": """enableAutoTierToHotFromCool :: volta blobs para Hot quando acessados (exige o tracking de último acesso).
tierToCool :: não é o tier mais barato.
blobIndexMatch :: filtra por tags de índice do blob, não por container.
blobTypes :: filtro obrigatório (blockBlob), mas não limita o container.""",
"Q216": """Replication policy :: é do Site Recovery, não do backup.
LRS :: fica num só datacenter; não atende "três zonas".
! A redundância do vault (LRS, ZRS ou GRS) só pode ser alterada **antes** de proteger o primeiro item.""",
"Q218": """Task1 (criar a storage account) :: o Storage Explorer não cria contas; isso é feito pelo portal, CLI ou PowerShell.
! O Storage Explorer também gerencia filas, discos gerenciados (upload/download de VHD) e ADLS Gen2.""",
"Q219": """Access keys / SAS :: dariam escrita, mas sem identidade do Entra e sem menor privilégio; o pedido é para o usuário User1.
Data protection / Object replication :: soft delete e versionamento; não fazem failover.
Networking :: firewall; não dá permissão de dados.
! O failover iniciado pelo cliente converte a conta em LRS na nova primária; reconfigure a geo-redundância depois.""",
"Q220": """Chaves EC (P-384/P-521) :: o Azure Storage não usa curvas elípticas para envelopar a chave de dados.
Só RSA 4096 :: 2048 e 3072 também são aceitas.
! O Key Vault precisa de soft delete e purge protection, e a identidade da conta precisa de acesso à chave (Key Vault Crypto Service Encryption User).""",
"Q222": """Group2 dentro do Group1 :: Não. Grupos role-assignable não aceitam grupos aninhados.
Group3 dentro do Group1 :: Não, pelo mesmo motivo.
Owner direto no Group3 :: Sim. Azure RBAC aceita atribuir a qualquer grupo de segurança, e o User3 herda.
! "Microsoft Entra roles can be assigned to the group" só pode ser definido na criação do grupo.""",
"Q223": """key1 com permissão parcial :: a chave da conta ignora RBAC e dá acesso total.
SAS1 com container1 ou folder1 :: o SAS de conta só tem o serviço Table marcado.
! As funções RBAC do User1 só valem se ele se autenticar com o Entra ID, e não é o caso com chave ou SAS.""",
"Q224": """Stored access policies :: o máximo é 5 por container; com 2 já criadas, cabem 3.
Imutabilidade :: uma time-based retention por container e legal holds. O gabarito considera mais 1.
! Revogar um SAS ligado a uma stored access policy é só editar ou excluir a política. SAS ad hoc só se revoga girando a chave.""",
"Q226": """Cool / Archive / Hot :: no dia 7, várias regras casam ao mesmo tempo e o lifecycle aplica a ação mais barata, que é delete.""",
"Q227": """Lifecycle só em algumas contas :: GPv2, BlobStorage e Premium block blob suportam.
Archive em storage com ZRS :: Archive não é suportado em contas ZRS, GZRS ou RA-GZRS, nem em Premium.
! Para usar Archive com resiliência de zona, não há opção: use LRS, GRS ou RA-GRS.""",
"Q229": """Application Gateway :: balanceador web; não leva tráfego privado até o storage.
NSG :: filtra, mas não muda o caminho do tráfego.
Virtual WAN :: hub de conectividade; não dá IP privado ao storage.
! Service endpoints também usam o backbone, mas mantêm o IP público do storage. Private endpoint é a resposta de "IP privado".""",
"Q230": """Criar storage no RG1 :: Sim. Storage Account Contributor herdado no RG1.
DNS da NIC :: Não. A permissão está no NSG, e a NIC é outro recurso.
Regra de entrada no NSG1 :: Sim. Contributor no NSG1.
! Associar um NSG a uma NIC exige permissão nos dois recursos (join action no NSG + write na NIC).""",
"Q232": """daysAfterCreationGreaterThan :: conta desde a criação, não desde a última atualização.
daysAfterLastAccessTimeGreaterThan :: exige o tracking de último acesso e mede leitura, não atualização.
AppendBlob / PageBlob :: tiers não se aplicam (append só aceita delete).""",
}
