DET = {
"Q122": """Excluir os dados primeiro :: o portal exige parar a proteção antes (Stop backup > Delete backup data); a exclusão de dados faz parte dessa mesma ação.
Propriedades de disaster recovery :: tratam do Site Recovery, não do backup.
Locks das VMs :: não impedem excluir o vault.
! Com soft delete, os itens ficam 14 dias em estado "soft deleted" e continuam bloqueando a exclusão do vault.""",
"Q123": """Vault1 com share1/SQL1/blob1 :: o share1 está em outra região. SQL Database (PaaS) tem backup automático próprio, e blobs usam o **Backup vault**.
Vault2 com storage1 inteiro ou blob1 :: o Recovery Services vault protege file shares, não a conta toda nem os blobs.
! Recovery Services vault = VMs, Azure Files, SQL/SAP HANA em VM e MARS. Backup vault = blobs, discos, PostgreSQL e AKS.""",
"Q125": """1, 2 ou 4 cópias :: LRS mantém sempre 3 réplicas síncronas no mesmo datacenter.
Performance / Account kind / Replication :: não reduzem o custo de dados pouco acessados; quem faz isso é o access tier (Hot → Cool/Cold).
! O tier padrão da conta só aceita Hot, Cool ou Cold; Archive é definido por blob.""",
"Q126": """Table / Queue :: o AzCopy v10 não suporta (tabelas exigiam a versão 7.x legada).
! O AzCopy também copia entre contas (serviço a serviço) e de S3/Google Cloud Storage para blob.""",
"Q127": """Access keys :: o AzCopy não recebe a chave diretamente; usa login do Entra (azcopy login) ou SAS na URL.
Files só com Entra ID :: o suporte a Entra ID em Files no AzCopy é recente e limitado; o gabarito considera só SAS.
! Para blob com Entra ID, a identidade precisa de uma função de dados (ex.: Storage Blob Data Contributor), não só Contributor.""",
"Q128": """Blob storage :: o ACI não monta containers de blob como volume.
Queue / Table :: não são sistemas de arquivos.
! Volumes do ACI: Azure Files, emptyDir, gitRepo (preterido) e secret. Montar Azure Files só funciona em containers Linux.""",
"Q129": """Um update domain :: as duas VMs reiniciariam juntas na manutenção.
Fault domains (1 ou 2) :: protegem contra falha de hardware/rack, não contra manutenção planejada.
! "Planned maintenance" → update domains; "rack/power failure" → fault domains.""",
"Q133": """Storage em outra região :: o diagnostic setting exige storage account na mesma região do recurso monitorado.
Só o Analytics3 :: o destino Log Analytics pode estar em qualquer região.
! Event Hubs, como o storage, também precisa estar na mesma região do recurso.""",
"Q134": """Premium file share em GPv2/GPv1 :: shares Premium (SSD) só em contas FileStorage. GPv2 tem shares Standard (transaction optimized, hot, cool).
Archive em GPv1 (contoso102) :: GPv1 não tem access tiers.
Archive em FileStorage :: a conta não tem blobs.""",
"Q135": """IP 193.77.134.1 :: fora do intervalo permitido no SAS (…134.10 a …134.50), então **sem acesso**.
net use com SAS :: o SMB autentica com a chave da conta ou identidade (AD DS / Entra Kerberos); SAS só vale em REST/HTTPS.
! O SAS também falha fora do período Start/Expiry e com protocolo diferente do permitido (HTTPS only).""",
"Q136": """Backup no RSV2 direto :: a VM2 aparece como já protegida e não pode ser escolhida.
Disaster recovery > Replication :: é o Site Recovery, não o backup.
Exportar o job :: não libera a VM.
! Ao parar, escolha **Retain** (mantém os pontos antigos no RSV1) ou **Delete** backup data.""",
"Q137": """Nova storage account :: obrigaria copiar os dados; mais esforço e custo.
Object replication :: copia blobs para outra conta, não muda a redundância; e GPv1 não suporta.
Mudar a replicação direto :: a GPv1 não oferece ZRS.
! O upgrade GPv1 → GPv2 é imediato, sem downtime e irreversível; revise o custo de transações.""",
"Q138": """Só storage1 / storage1 e storage2 :: deixa de fora a BlockBlobStorage (Premium), que também suporta lifecycle.
storage4 (FileStorage) :: não tem blobs para gerenciar.
! Políticas de lifecycle rodam uma vez por dia; a primeira execução pode levar até 24 h.""",
"Q139": """80 / 443 :: HTTP(S) servem a REST/portal/Storage Explorer, não para mapear unidade.
3389 :: porta do RDP.
! Teste com Test-NetConnection <conta>.file.core.windows.net -Port 445.""",
"Q141": """Acesso pelo IP 131.107.103.10 :: Sim. defaultAction Allow libera qualquer origem.
Blob em Archive :: Sim. StorageV2 permite tier por blob.
Global Admin acessar share com credenciais do Entra :: Não. Exige identity-based auth (AD DS, Entra DS ou Entra Kerberos) e função de share; Global Admin não tem acesso a dados automaticamente.""",
"Q142": """Só Device1 / combinações parciais :: o AzCopy v10 tem binário para Windows, Linux e macOS.
! Não precisa instalar: basta baixar e executar o binário.""",
"Q143": """Access tier :: muda custo/latência, não impede alteração.
IAM :: quem tem permissão de escrita ainda alteraria os blobs; RBAC não garante WORM.
Access level :: nível de acesso anônimo (Private, Blob, Container).
! A política pode ficar **unlocked** (testes) ou **locked** (conformidade, irreversível). Também existe legal hold, sem prazo.""",
"Q144": """Dep1File1 :: Não. Foi para Archive (Rule1) e exige reidratação (horas) antes de ler.
File2 / File3 :: Sim. Estão em Cool, que é online e permite leitura.
! As regras contam dias desde a **última modificação** (ou último acesso, se o tracking estiver ligado).""",
"Q145": """Storage Account Contributor / Contributor :: plano de controle amplo (inclui as chaves); excede o necessário.
Storage Blob Data Reader :: só lê, não faz upload.
! No portal, mude o método de autenticação para "Microsoft Entra user account"; sem permissão de listar chaves, o portal já usa o Entra.""",
"Q146": """FileStorage :: object replication é só para block blobs.
File share / Table / Queue :: object replication só replica containers de blob.
! Requisitos: versionamento nas duas contas, change feed na origem e mesmo tipo de conta (GPv2 com GPv2, Premium block blob com Premium block blob).""",
"Q147": """Só a URL :: não é um comando.
azcopy sync com --snapshot :: --snapshot não é opção do sync. Além disso, o sync só cria a primeira cópia; serve para manter em sincronia.
az storage blob copy start-batch :: copia de blob para blob, não de pasta local.
! O destino precisa de autorização: SAS na URL ou azcopy login.""",
"Q148": """Replication :: Premium block blob aceita LRS ou ZRS, então a ZRS já serve.
Access tier :: Premium não tem tier hot/cool, mas a opção a mudar primeiro é Performance.
Hierarchical namespace :: compatível com Premium block blob; não bloqueia.
! Premium = Block blobs, File shares (FileStorage) ou Page blobs.""",
"Q149": """Entra ID na origem ou no destino :: o gabarito considera SAS nos dois lados para a cópia blob → Files.
Access key :: o AzCopy não aceita a chave diretamente.
! Cópia serviço a serviço (S2S) não passa pela máquina local; a largura de banda é a do Azure.""",
"Q150": """SAS :: delega acesso; não define chave de criptografia.
TLS mínimo :: protege dados em trânsito, não em repouso.
Rotacionar access keys :: chaves de acesso não são chaves de criptografia de dados.
! O encryption scope pode usar chave gerenciada pela Microsoft ou pelo cliente (Key Vault). Dá para impor o scope a todo o container.""",
"Q154": """**Série "Solution" (alerta de eventos do System log):** o caminho é **Log Analytics workspace + coleta de eventos (AMA + DCR) + alerta de log** com consulta KQL (Event | where EventLevelName == "Error"), contagem > 2 em 1 h. Storage como fonte não funciona.
! O MMA (Log Analytics agent) foi aposentado em agosto de 2024; em questões novas, a resposta é Azure Monitor Agent + Data Collection Rule.""",
"Q155": """Desanexar ou mover a NIC :: uma NIC não troca de VNet, e a VM precisa sempre de pelo menos uma NIC.
Mover a VM1 para o RG2 :: mudar de RG não muda a VNet.
Criar NIC no RG2 e anexar :: a NIC nova precisaria estar na VNet2, e a VM não pode ter NICs em VNets diferentes.
! Ao excluir a VM, os discos ficam (a menos que se marque "delete with VM"). Crie a VM nova com "Attach existing OS disk".""",
"Q156": """Storage account + access policy :: senha em arquivo de storage não é cofre de segredos.
Recovery Services vault :: guarda backups, não segredos.
Identity Protection + Azure Policy :: nada a ver com segredos de template.
! O parâmetro do template deve ser do tipo **securestring**. No arquivo de parâmetros, use "reference": { "keyVault": { "id": … }, "secretName": … }.""",
"Q157": """ASP2 para o WebApp1 :: está em outra região; o app sempre fica na região do plano.
ASP3 para o WebApp2 :: ASP.NET 4.x (Framework) só roda em plano Windows.
! O SO do plano é escolhido na criação e não muda depois.""",
"Q158": """85% → 10 ou 20 VMs :: cada disparo da regra soma só +2 (com cooldown entre ações).
25% → 4 VMs :: a regra de redução pede −4, mas o mínimo de 2 limita.
50% :: não atinge o limite de nenhuma das duas regras, então nada acontece.
! Autoscale sempre respeita min/max; a contagem inicial é o "default".""",
}
