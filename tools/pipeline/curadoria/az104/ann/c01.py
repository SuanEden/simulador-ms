A=[]
def Q(n,d,t,e,**k): A.append(dict(n=n,d=d,t=t,e=e,**k))
def H(n,d,t,e,**k): A.append(dict(n=n,d=d,t=t,e=e,**k))
D=H
CM=("case","CONTOSO_MFG"); CC=("case","CONTOSO_CONSULT"); LW=("case","LITWARE")
# Contoso (manufatura)
H(807,1,"Configurações de dispositivo","Device settings/Entra join não fazem parte da AZ-104 atual.", s="out", g=CM)
Q(809,1,"Service administrator","O papel clássico de Service Administrator foi aposentado em 2024.", s="out", g=CM)
Q(819,5,"Backup das VMs do App1","Para proteger as VMs com Azure Backup, o primeiro passo é criar o **Recovery Services vault**; depois vêm a política e a habilitação do backup.", g=CM)
Q(821,2,"Copiar arquivos para Blob","Requisito: copiar pela **internet** para **Blob storage**. O **Azure Storage Explorer** faz upload para containers de blob. Mapear unidade com File Explorer só funciona com **Azure Files**, e Import/Export é envio de discos físicos.", g=CM)
H(823,2,"Requisitos de storage","Os blueprints vão para **Blob storage** (archive), e os discos não gerenciados das VMs também são page blobs. Nada nos requisitos pede Table nem Azure Files.",
  yn=("Contoso requires a storage account that supports Blob storage.","Contoso requires a storage account that supports Azure Table storage.","Contoso requires a storage account that supports Azure File Storage."), ans="YNN", g=CM)
H(837,4,"Arquitetura do App1","Arquitetura N camadas: **uma VNet** com **três sub-redes** (web, middle tier, SQL). NSGs por sub-rede minimizam as portas abertas entre as camadas.",
  slots=[("Number of virtual networks:","1|2|3",0),("Number of subnets per virtual network:","1|2|3",2)], g=CM)
Q(839,4,"NSG para o App1","Os usuários só acessam o front-end por HTTPS: regra de **entrada** 443 vinda da Internet, associada **apenas à sub-rede dos web servers**. As outras camadas não devem ficar expostas.", g=CM)
# Contoso (consultoria)
H(811,5,"Vaults e políticas de backup","Os vaults são **regionais**. VMs e file shares estão em **West US, Central US e East US**: **3 vaults**. Cada vault precisa de uma política para **VM** e outra para **file share**: **6 políticas**.",
  slots=[("Recovery Services vaults:","1|2|3|4|7",2),("Backup policies:","1|2|3|4|5|6",5)], g=CC)
D(813,5,"Alerta de espaço livre em disco","Espaço livre no C: é contador de desempenho do SO convidado: crie um **Log Analytics workspace**, **colete os contadores de desempenho do Windows** (hoje via Azure Monitor Agent + DCR) e crie a **alert rule** (log). O dump trazia uma sequência sem sentido (alerta, SQL Database, workspace).",
  order=(["Create a Log Analytics workspace.","Configure the Diagnostic settings.","Create an alert rule.","Collect Windows performance counters from the Log Analytics agents.","Create an Azure SQL database."],[0,3,2]), ans_orig=[2,4,0], r="corrigida", g=CC)
H(815,1,"Azure Policy — funções","Criar definições de política/iniciativa com menor privilégio: **Resource Policy Contributor** no escopo onde a definição é salva (**Sub1**). Atribuir iniciativas no RG2: **Resource Policy Contributor no RG2**.",
  slots=[("User1:","Contributor for RG1|Contributor for Sub1|Security Admin for RG1|Resource Policy Contributor for Sub1",3),
         ("User4:","Contributor for RG2|Contributor for Sub1|Security Admin for Sub1|Resource Policy Contributor for RG2",3)], g=CC)
Q(817,2,"Azure Files — acesso por identidade","Funções RBAC nas file shares exigem **acesso por identidade** habilitado. storage1 e storage4 já usam Entra Domain Services; o **storage2** está desabilitado. Habilite-o.", g=CC)
H(825,2,"Tiers de container e share","Container com tier **Cool**: só contas com tiers de blob, **storage2 (GPv2)** e **storage3 (BlobStorage)**. File share no tier **Cool** (Azure Files Standard): só **GPv2**, ou seja, **storage2**.",
  slots=[("container1:","storage2 only|storage2 and storage3 only|storage1, storage2, and storage3 only|storage2, storage3, and storage4 only|storage1, storage2, storage3, and storage4",1),
         ("share1:","storage2 only|storage4 only|storage2 and storage4 only|storage1, storage2, and storage4 only|storage1, storage2, storage3, and storage4",0)], g=CC)
H(827,2,"Object replication","\"Replicação para o Blob service\" = **object replication**, que exige **StorageV2** (ou premium block blob) na origem e no destino, com versionamento. Entre as contas existentes, o destino compatível é o **storage2**.",
  slots=[("Account kind:","BlobStorage|BlockBlobStorage|Storage (general purpose v1)|StorageV2 (general purpose v2)",3),("Destination:","Storage1|Storage2|Storage3|Storage4",1)], g=CC)
Q(829,4,"Flow logs — storage","O storage account dos flow logs precisa estar **na mesma região** do NSG/VM monitorada. A VM5 está em **East US**: só o **storage2** (East US) serve, e a retenção de 8 meses se configura no flow log (ou com lifecycle). O dump marcava storage3, que está em East US 2.", a="B", g=CC)
H(841,4,"NSGs do cenário","NSG1 (NIC da VM1) só tem regras de **entrada**. NSG2 (Subnet2) só tem regras de **saída**. VM1 → VM2 (RDP): a saída da VM1 é livre, a entrada na Subnet2 cai na AllowVnetInBound, e o retorno é stateful: **permitido**. VM2 → VM3 (ping): a saída cai na AllowVnetOutBound (VNets emparelhadas): **permitido**. VM2 → VM3 (RDP): NSG2 **nega 3389 de saída**. O dump marcava Não/Sim/Não.",
  yn=("From VM1, you can establish a Remote Desktop session to VM2.","From VM2, you can ping VM3.","From VM2, you can establish a Remote Desktop session to VM3."), ans="YYN", ans_orig="NYN", r="corrigida", g=CC)
Q(843,4,"Basic Load Balancer","O SKU Basic do Load Balancer foi aposentado em 30/09/2025.", s="out", g=CC)
Q(833,4,"Peering não transitivo","VM1 (VNET1) e VM4 (VNET3) estão em VNets que **não estão emparelhadas entre si** (as duas só se emparelham com a VNET2, e peering não é transitivo). Crie o **peering VNET1 ↔ VNET3**. O dump marcava \"atribuir 10.0.1.5 à VM4\", que não faz sentido. Esta questão pertence ao cenário Contoso (consultoria).", a="D", g=CC)
# Litware
Q(831,5,"IP flow verify","Para saber se um **NSG** bloqueia a conexão de saída da VM3 na TCP 8080, use o **IP flow verify** do Network Watcher: ele aponta a regra que permite ou nega o pacote.", g=LW)
H(835,4,"VPN S2S","Gateways de VPN saíram do Skills Measured da AZ-104.", s="out", g=LW)
H(845,1,"Função customizada a partir de Reader","Exporte a definição da função Reader como JSON para usá-la como base: **Get-AzRoleDefinition -Name \"Reader\" | ConvertTo-Json**. Depois edite e crie com New-AzRoleDefinition -InputFile.",
  slots=[("Cmdlet:","Find-RoleCapability|Get-AzureADDirectoryRole|Get-AzRoleDefinition|Get-AzResourceProvider",2),("-Name \"Reader\" |","ConvertFrom-Json|ConvertFrom-String|ConvertTo-Json|ConvertTo-Xml",2)], g=LW)
Q(847,1,"MFA — Conditional Access","Conditional Access/MFA não faz parte da AZ-104 atual.", s="out", g=LW)
