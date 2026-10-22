DET = {
"Q234": """Group1 vê as functions :: Sim. Reader no MG1 é herdado pelas assinaturas, RGs e recursos abaixo.
User1 atribui Owner no RG1 :: Sim. User Access Administrator herdado do MG1.
User1 cria RG e VM :: Não. Virtual Machine Contributor não tem Microsoft.Resources/subscriptions/resourceGroups/write.
! Funções atribuídas no management group valem para todas as assinaturas membro, inclusive as futuras.""",
"Q235": """Security profile :: ajusta protocolos e criptografia do SMB, não habilita identidade.
Default to Azure AD authorization :: muda o padrão do portal para blobs/filas; não habilita o SMB com identidade.
IAM do share1 :: a função pode ser atribuída, mas não terá efeito sem a fonte de identidade habilitada; não é o primeiro passo.""",
"Q238": """Standard (LRS ou ZRS) :: o SMB Multichannel não está disponível em shares Standard.
Premium GRS :: Premium Files não oferece GRS (só LRS e ZRS).
! O Multichannel melhora o throughput com várias conexões TCP; precisa ser habilitado na conta e suportado no cliente (Windows).""",
"Q240": """Só containers :: filas também suportam condições.
File shares / tables :: ainda não suportam condições de atribuição (ABAC).
! Condições comuns: filtrar por nome do container, caminho do blob ou blob index tags.""",
"Q243": """Atribuir Defender for Cloud Apps Discovery ao User1 :: Sim. Um plano desligado no grupo pode ser atribuído direto ao usuário.
Remover a P2 herdada do User1 :: Não. Licença herdada só sai removendo o usuário do grupo (ou a licença do grupo).
User2 com P2 :: Não. Grupos aninhados não herdam licença.
! O usuário pode ter a mesma licença direta **e** herdada; nesse caso, ela consome uma unidade só.""",
"Q244": """Endpoint type / Location / Network connectivity / Performance :: não mudam o custo de saída de rede. O routing tier muda (Internet routing é mais barato que Microsoft routing).
Infrastructure encryption / CMK para tabelas e filas / Premium :: só podem ser definidos na criação da conta.
! O tipo de chave (Microsoft-managed ↔ customer-managed) pode ser trocado a qualquer momento em Encryption.""",
"Q245": """AES / 3DES :: como CMK, o Storage aceita só chaves RSA (ou RSA-HSM), que envelopam a chave AES-256 interna de dados.
8192 bits :: acima do máximo suportado pelo Key Vault e pelo Storage.""",
"Q247": """**Série "Solution" (500 convidados):** New-MgUser cria **membros**. Atende: **New-MgInvitation** em script ou **Bulk invite** no portal.""",
"Q248": """**Série "Solution":** New-MgInvitation cria o objeto guest e, opcionalmente, envia o e-mail (-SendInvitationMessage). É a forma programática do Bulk invite.""",
"Q249": """Stored access policy :: só define permissão e validade de SAS; não filtra blobs por tag.
JIT VM access :: recurso do Defender for Cloud para portas de VM.
SAS :: dá acesso a um container ou blob, sem critério de tag.
! A condição usa @Resource[Microsoft.Storage/storageAccounts/blobServices/containers/blobs/tags:Projeto] StringEquals 'X'.""",
"Q250": """File shares / tables / queues :: encryption scopes são só do Blob storage (container ou blob).
! O scope pode ser o padrão do container e pode ser imposto a todos os blobs dele (sem override por blob).""",
"Q254": """Delete :: apagaria o usuário e o acesso dele.
Reset password :: convidado não tem senha no seu tenant.
Revoke sessions :: só invalida tokens; não troca a identidade de login.
Identities :: só exibe as identidades; não troca a de login do B2B.
! Reset redemption status mantém o objectId, os grupos e o acesso do convidado; só pede novo resgate.""",
"Q255": """Storage Account Contributor / Contributor :: plano de controle (gerenciam a conta, listam chaves); não são funções de dados.
Reader and Data Access :: lê as chaves (acesso total via chave); não é menor privilégio nem RBAC de dados.
! O "Workspace1" aqui usa a managed identity dele como principal da atribuição.""",
"Q257": """Group2 / Group4 :: grupos com securityEnabled = false (ex.: listas de distribuição) não recebem licença.
Só Group1 :: o grupo Microsoft 365 com securityEnabled = true também é aceito.
! Grupos sincronizados do AD também podem receber licença.""",
"Q258": """device.managementType / device.organizationalUnit :: atributos de dispositivo; o grupo é de usuários.
user.usageLocation :: é o país de uso de licença, não o departamento.
-or :: incluiria todo o Marketing ou toda a França.
-in / -match :: -in exige uma lista e -match exige regex; para valor exato, -eq.
! Grupos Microsoft 365 também aceitam associação dinâmica (exige P1).""",
"Q259": """Restrict non-admin users from creating tenants :: impede criar tenants, não service principals.
Users can create security groups :: trata de grupos.
Guest user access restrictions :: trata de convidados.
LinkedIn / Show keep user signed in :: não tratam de apps nem do portal.
! "Restrict access to Microsoft Entra admin center" não bloqueia PowerShell nem Graph; só o portal.""",
"Q260": """User1 lê blob2 / blob3 :: Não. A condição permite leitura só em cont1.
User2 lê blob1 :: Sim. A Condition2 só restringe escrita; leitura segue a função Blob Data Owner.
! Na condição, cada ação (read, write…) tem sua própria regra; ações sem regra seguem a função.""",
"Q261": """virtualNetworks/delete ou /write :: cobrem só uma ação; "todas as ações" = /*.
storageAccounts/* :: daria também escrita e listKeys (acesso aos dados); excede.
blob/read :: é uma dataAction (dados do blob), não a configuração da conta.
! listKeys/action está sob storageAccounts/*, por isso o wildcard no storage é perigoso.""",
"Q263": """Premium SSD LRS / Standard SSD :: LRS não sobrevive à queda de um datacenter, e Standard tem latência maior.
Cache Read/Write :: escritas em cache no host podem se perder se o host falhar.
Cache None :: seguro, mas Read-only melhora a latência de leitura sem risco de perda.
! Disco ZRS pode ser anexado a uma VM em qualquer zona da região; disco compartilhado ZRS permite failover entre zonas.""",
"Q264": """Azure Virtual Machines for deployment :: serve para a VM obter certificados do vault, não para o ADE.
Secret :: o ADE grava o próprio segredo (BEK); o que você cria é a chave KEK.
Rotation policy :: opcional; não é pré-requisito.
! Comando: Set-AzVMDiskEncryptionExtension … -KeyEncryptionKeyUrl <kek> -KeyEncryptionKeyVaultId <vault>. O vault precisa estar na mesma região da VM.""",
"Q265": """Customer-managed keys (SSE) :: criptografa no storage; o VHD baixado sai descriptografado.
Confidential disk encryption :: só para VMs confidenciais (tamanhos específicos).
Encryption at host :: também é do lado do servidor; o download sai descriptografado.
! O ADE será aposentado em 15/09/2028. A Microsoft recomenda migrar para encryption at host, mas este requisito específico (VHD baixado continua criptografado) só o ADE atende.""",
"Q266": """Service / Container :: permitiriam operações no serviço ou no container, além de blobs individuais.
List :: permite enumerar nomes; o requisito é baixar por nome conhecido.
Write / Delete / Add / Create :: excedem "só download".
! "Securely" também implica Allowed protocols = HTTPS only.""",
"Q268": """Três RGs :: Não. São 4: o loop copy (2) + 2 recursos individuais.
RGroup5 :: Não. O nome usa length(obj1) = 4, então é RGroup4.
Todos em East US :: Sim. O parâmetro/variável de location resolve para eastus, mesmo com -Location westus (que é só onde fica o registro da implantação).
! Em New-AzDeployment (escopo de assinatura), -Location é a região dos metadados da implantação, não dos recursos.""",
"Q269": """Access policy :: sozinha não concede acesso; só define parâmetros para SAS ligados a ela.
CDN :: entrega conteúdo público em cache; não controla permissões.
Access keys :: acesso total, não só leitura.
! Para permitir HTTP, o storage precisa estar com "Secure transfer required" desabilitado.""",
"Q270": """ZRS :: não replica para outra região.
Hot :: custa mais para dados pouco acessados.
! O hierarchical namespace só pode ser habilitado na criação (ou com a migração para ADLS Gen2, que é irreversível).""",
"Q272": """Application Proxy :: publica apps web on-premises para usuários externos.
NSG :: filtra, mas não muda a rota.
Azure Firewall :: inspeciona tráfego; não faz o storage ser alcançado pelo backbone.
! Service endpoint: o storage continua com IP público, mas aceita a sub-rede como origem (regra de VNet no firewall do storage).""",
"Q275": """Snapshot para Cool :: Não. As ações estão em "version", e snapshots têm o próprio bloco "snapshot".
Versão no container2 :: Não. O prefixMatch limita a regra ao container1.
Versão reidratada volta ao Archive em 30 dias :: Não. A regra usa daysAfterLastTierChangeGreaterThan para evitar o pingue-pongue.
! baseBlob (versão atual), version (versões anteriores) e snapshot são tratados separadamente.""",
"Q276": """storage1 (GPv1) :: precisa virar GPv2 antes.
storage3 (RA-GRS) :: a conversão seria para RA-GZRS, não para ZRS.
storage4 (BlobStorage) :: tipo legado sem ZRS.""",
"Q277": """Device4 (Android/iOS) :: o Storage Explorer é um app desktop (Electron) só para Windows, macOS e Linux.
! Alternativa sem instalar: o **Storage browser** no portal do Azure.""",
}
