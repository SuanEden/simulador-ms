DET = {
"Q096": """Owner na raiz :: também gerencia todos os recursos; excede o pedido (só atribuições).
Novo management group :: as assinaturas atuais e novas não caem nele automaticamente; exigiria movê-las, o que dá mais esforço.
! Assinaturas novas entram no **default management group**, que por padrão é o Tenant Root Group (configurável em Hierarchy settings).""",
"Q097": """Atribuir em VM1 :: o portal não oferece um recurso individual como escopo de atribuição.
Excluir o Tenant Root Group :: a exclusão precisa estar abaixo do escopo atribuído; não dá para excluir o próprio topo.
! Para "isentar" um recurso específico com motivo e validade, use **Policy exemptions** (Waiver ou Mitigated).""",
"Q098": """**Série "Solution" (usuários no tenant novo):** só o **User1**, que criou o tenant, é Global Administrator lá. User2 (Global Admin do tenant antigo), User3 (User Admin) e User4 (Owner da assinatura) não têm acesso.
! Cada tenant do Entra é isolado: funções não atravessam tenants. Os outros só entram por convite (B2B) ou com conta criada no novo tenant.""",
"Q099": """**Série "Solution":** Owner de assinatura é uma função do Azure RBAC e não dá poder no diretório, nem no tenant atual nem no novo.""",
"Q100": """**Série "Solution":** o User administrator de contoso.onmicrosoft.com não tem escopo em external.contoso.onmicrosoft.com.""",
"Q101": """Duas funções novas :: duplica a manutenção sem necessidade.
Nova função para Sub1 com Sub2 nos escopos :: funcionaria, mas cria uma função a mais em vez de editar a existente.
Sub1 nos escopos + nova função para Sub2 :: também duplica.
! Uma função customizada pode ter vários assignableScopes (assinaturas, RGs ou um management group).""",
"Q102": """Atribuir funções a User2 :: exige Owner, User Access Administrator ou RBAC Administrator.
Modificar o firewall :: escrita no plano de controle (Contributor/Storage Account Contributor).
Ver file shares :: Storage Blob Data * só cobre blobs; arquivos exigem Storage File Data * ou a chave.
! Plano de controle (actions) ≠ plano de dados (dataActions). Reader não lê blobs pelo Entra ID.""",
"Q104": """BlobStorage para Table :: a conta legada BlobStorage só tem blobs (block e append).
Blob só em algumas contas :: GPv1, GPv2 e BlobStorage oferecem blob.
! Na prática, sempre use GPv2. GPv1 e BlobStorage são legados, com aposentadoria anunciada.""",
"Q106": """Access keys :: segredo com acesso total e sem expiração; viola "minimizar segredos".
Advanced security :: é o Defender for Storage, não concede acesso.
IAM para o App2 :: a atribuição de função não expira sozinha (sem PIM), então não atende o prazo de 30 dias.
! Prefira **user delegation SAS** (assinada com credenciais do Entra) a SAS de conta assinada com a chave.""",
"Q107": """FileStorage :: só Premium Files.
Storage (GPv1) :: sem tiers de acesso de blob.
Standard_LRS :: não sobrevive a desastre regional.
Standard_RAGRS :: atende, mas custa mais e o requisito não pede leitura na secundária.
Premium_LRS :: sem tier archive e sem replicação geográfica.""",
"Q109": """Mover VNET1 para RG2 :: Não. O move gera uma escrita no destino, que a política nega.
VM1 desalocada :: Não. Políticas de deny não alteram recursos existentes, só os marcam como não conformes.
Modificar VNET2 :: Não. Atualizar um tipo de recurso proibido também passa pela avaliação e é negado.
! Deny avalia criação e atualização (PUT/PATCH); não age sobre recursos existentes que não são tocados.""",
"Q112": r"""**Formato:** `\\<conta>.file.core.windows.net\<share>`. Para montar: `net use Z: \\contosostorage.file.core.windows.net\data /user:localhost\contosostorage <chave>`.
! A porta TCP 445 precisa estar liberada de saída (muitos ISPs bloqueiam). Se não estiver, use VPN ou Azure File Sync.""",
"Q113": """sync / copy :: copiam dados; não criam o container.
dfs :: endpoint do Data Lake Gen2. queue, table e file são outros serviços. "images" não existe.
! Para enviar o VHD depois: azcopy copy disco.vhd 'https://…blob.core.windows.net/vmimages/disco.vhd?<SAS>' --blob-type PageBlob.""",
"Q115": """10.2.9.0/24 "always" ou "during a backup" :: só as sub-redes listadas (com service endpoint) e os IPs liberados acessam; não existe exceção temporária.
Backup "during a backup" :: sem a exceção **Allow trusted Microsoft services**, o Azure Backup não passa pelo firewall em momento nenhum.
! Ao restringir o storage, marque a exceção de serviços confiáveis se usar Backup, Site Recovery ou Monitor.""",
"Q117": """storage1 :: GPv1 Premium não converte para ZRS.
storage3 :: Premium com RA-GRS não é uma combinação de conversão para ZRS.
storage4 :: conta BlobStorage não suporta ZRS; precisaria virar GPv2 antes.
! Hoje a conversão LRS↔ZRS também pode ser **solicitada pelo portal** (Redundancy), sem abrir chamado.""",
"Q118": """Allow trusted Microsoft services :: libera serviços do Azure em geral; não é necessário e amplia o acesso.
Adicionar VNet1 / service endpoint :: a VM usa os discos pela plataforma (host), não pela rede da VNet; liberar a VNet só ampliaria o acesso.
! Regras de IP no firewall do storage aceitam só IPs públicos; para acesso a partir da VNet usam-se service endpoints ou private endpoints.""",
"Q120": """GRS / RA-GRS :: replicação assíncrona para outra região.
LRS :: síncrono, mas dentro de um único datacenter.
Blob storage / GPv1 :: tipos legados que não suportam ZRS.
! Para zona + região juntos: GZRS ou RA-GZRS.""",
}
