DET = {
"Q1105": """Mail-enabled security group / distribution group / Microsoft 365 group :: são objetos do Entra/Exchange. Até poderiam receber o e-mail, mas a regra de alerta só notifica por meio de um action group.
! No action group, use a notificação "Email/SMS message/Push/Voice" com os dois endereços, ou "Email Azure Resource Manager Role".""",
"Q1110": """WebApp1 → VM2 :: Sim. A VNet integration dá saída para a VNet1, e o peering leva à VM2.
NSG1 controla a entrada do WebApp1 :: Não. A integração é só de saída; a entrada no app passa pelos access restrictions ou por um private endpoint.
WebApp2 (ASE) → VM1 :: Sim. O ASE vive na sub-rede da VNet emparelhada.""",
"Q1114": """root / admin / administrator :: o usuário do admin user é sempre o nome do registry.
! O admin user é desabilitado por padrão e não é recomendado; prefira tokens com escopo, managed identity ou service principal com AcrPull.""",
"Q1116": """Private endpoint :: dá acesso privado a serviços PaaS, não liga VNets.
ExpressRoute :: liga on-premises ao Azure.
Route table :: muda o próximo salto, mas não conecta VNets sem peering ou gateway.
! Tráfego entre regiões do Azure sempre fica no backbone da Microsoft, mesmo por VPN; o peering é a resposta mais direta.""",
"Q1120": """Memory / CPU :: não habilitam a rede privada.
Networking type :: é justamente a opção bloqueada; a causa é o SO.
SKU :: Standard já suporta VNet; Confidential não muda isso.
! O suporte a VNet para containers Windows no ACI chegou depois; a resposta de prova clássica é trocar para Linux.""",
"Q1122": """User1 redimensiona a VM1 :: Sim. Contributor no MG2 é herdado até a VM1.
User2 cria storage no RG1 :: Não. A função está no **recurso** storage1, não no RG.
User3 atribui Owner no RG3 :: Sim. User Access Administrator na raiz é herdado em todo lugar.""",
"Q1124": """Grupos Assigned :: exigiriam adicionar cada usuário à mão.
ARM template :: não cria usuários do Entra.
Script PowerShell :: funcionaria, mas com mais esforço que grupos dinâmicos.
XML :: o Bulk create do portal usa CSV.
! A regra seria user.department -eq "Vendas"; a associação pode levar alguns minutos.""",
"Q1125": """Backup vault / Recovery Services vault :: protegem dados, não giram chaves.
Redundância :: replicação, sem relação com chaves.
Lifecycle management :: gerencia tiers e exclusão de blobs.
! Alternativa sem Key Vault: Key expiration policy (lembrete) + script ou Automation para regenerar. O ideal é eliminar o uso de chaves (Entra ID).""",
"Q1126": """User1 (só nuvem) em share1 :: Não. O AD DS autentica só identidades que existem no AD.
User2 em share2 :: Sim. A permissão padrão de share cobre usuários autenticados.
share3 (contoso2025) :: Não. Essa conta não tem acesso por identidade configurado.
! Para identidades só de nuvem, use **Entra Kerberos** em clientes Entra-joined (e híbridos).""",
"Q1127": """CMK :: criptografia em repouso, não assinatura de imagem.
Connected registry :: réplica on-premises/edge do ACR.
Token :: autenticação com escopo de repositório; não assina.
! O Docker Content Trust (DCT) no ACR está sendo aposentado; o caminho atual é o Notation/Notary Project com Key Vault.""",
"Q1128": """ACR Tasks só no Premium :: Tasks existe em Basic, Standard e Premium.
Private endpoints em Basic/Standard :: Private Link, geo-replication e firewall de rede são exclusivos do Premium.""",
"Q1131": """Só ACI :: o ACI não escala sozinho (só manualmente ou via orquestração externa).
Opções com ACI :: pelo mesmo motivo.
! O Container Apps escala por HTTP, filas e CPU via KEDA, inclusive até zero réplicas.""",
"Q1132": """az acr build :: compila e envia na nuvem; aqui a imagem já existe localmente.
az container create / docker create :: criam containers, não registries.
docker pull :: baixa, não envia.
! Sequência: az acr create → az acr login -n reg → docker tag image1 reg.azurecr.io/image1:v1 → docker push.""",
"Q1133": """24 / 25 :: não correspondem a nenhuma conta de sub-rede.
128 :: ignora os 5 endereços reservados (rede, gateway .1, DNS .2 e .3, broadcast).
251 :: seria uma /24 inteira.
! Fórmula: 2^(32−prefixo) − 5. O Azure aceita sub-redes até /29 (3 IPs utilizáveis).""",
"Q1134": """User1 :: o modo Selected aceita grupos, não usuários avulsos.
Group2 :: o gabarito considera só o grupo de segurança Group1 (grupos Microsoft 365 também são aceitos na documentação atual; leia o tipo na tabela).
! Para habilitar para todos, use "All".""",
"Q1135": """User1 (no AD, sem sincronizar) :: Sim. A permissão padrão para usuários autenticados vale para quem autentica no AD DS, mesmo sem sincronizar.
User2 :: Sim. Tem SMB Share Reader.
User3 (só nuvem) :: Não. Não existe no AD DS.
! A permissão padrão no nível do share é a forma de dar acesso a identidades do AD que não estão no Entra.""",
"Q1136": """**Série "Solution" (erro ao implantar imagem do ACR):** sem a mensagem de erro, a série é ambígua. Na prática, o ACI precisa de credenciais para o registry: admin user, service principal ou managed identity com **AcrPull**.
! Dedicated data endpoints e private endpoints são de rede; só ajudam se o erro for de firewall.""",
"Q1137": """**Série "Solution":** dedicated data endpoint muda os FQDNs de dados (para regras de firewall do cliente). Não autoriza o ACI.""",
"Q1138": """**Série "Solution":** com private endpoint, o ACI precisaria estar na VNet, e o acesso público poderia ser bloqueado; não resolve a autorização.""",
"Q1139": """Overview / IAM / Access keys / Identity / Encryption :: não mudam o tier nem habilitam o endpoint.
Connected registries :: é outro recurso (registry on-premises).
Geo-replications :: também é Premium, mas não é o que se pede.
! Upgrade de tier é feito em Properties (ou Overview > Update) e é imediato, sem downtime.""",
"Q1140": """VNet1 / NIC1 :: route tables só se associam a sub-redes.
! Uma route table pode ser associada a várias sub-redes da mesma região e assinatura; cada sub-rede tem no máximo uma.""",
"Q1141": """Internet / Virtual network gateway / Virtual network :: o próximo salto é implícito; não se informa IP.
! Também existe o next hop "None", que descarta o tráfego (blackhole).""",
"Q1142": """Só VNet2 ou parciais :: peering funciona entre regiões, assinaturas e tenants (com permissão nos dois lados), desde que não haja sobreposição.
! Entre tenants, o usuário precisa de Network Contributor nas duas VNets (ou ser convidado no outro tenant).""",
"Q1143": """**Por que todos são Não:** Azure público, Azure Government e Azure China (21Vianet) são nuvens separadas, sem peering entre si. Para conectar, use VPN ou ExpressRoute.""",
"Q1144": """Private endpoint :: atende só redes privadas; o home office ainda precisaria de VPN, o que dá mais esforço.
Internet routing :: preferência de rota, não acesso.
IAM :: autorização, não filtro de rede.
! O IP do home office precisa ser **público** e de fora da região do storage.""",
"Q1145": """Sufixo :: o formato pede o atributo antes do nome (prefixo).
String :: inseriria um texto fixo, não o departamento do usuário.
Company branding :: personaliza a tela de login.
! A naming policy vale para grupos Microsoft 365 criados por usuários (Outlook, Teams…); administradores com certas funções ficam isentos.""",
"Q1146": """storage2 (RA-GRS) :: a conversão iria para RA-GZRS.
storage3 (BlobStorage) :: tipo legado sem ZRS.
! Mudar a redundância em GPv2 é feito em Redundancy no portal; LRS↔ZRS faz uma conversão (migração em segundo plano).""",
"Q1147": """**Série "Solution" (listar e regenerar chaves):** Reader and Data Access só **lista**; regenerar exige a ação regenerateKey. Atendem **Storage Account Key Operator Service Role**, Storage Account Contributor e Contributor.""",
"Q1148": """**Série "Solution":** Storage Account Key Operator Service Role é a função de menor privilégio que tem listKeys e regenerateKey.""",
"Q1149": """**Série "Solution":** Encryption Scope Contributor só gerencia encryption scopes, sem acesso a chaves.""",
"Q1150": """**Série "Solution":** sem o erro, é ambígua; o gabarito marca Não. Para o ACI puxar a imagem, ele precisa de credenciais, e o admin user dá uma credencial, mas não é a solução recomendada.""",
"Q1151": """Proximity placement group :: restringe ainda mais o posicionamento; não ajuda.
Converter para managed (aligned) :: trata do alinhamento de discos, não da disponibilidade de tamanho.
Desligar outras VMs (pelo SO) :: VM desligada pelo SO continua alocada.
! Em availability set, para mudar para um tamanho fora do cluster, desaloque **todas** as VMs do set, redimensione e inicie.""",
"Q1152": """VM1 :: o IP público é associado à NIC da VM, não à VM.
VPN1 :: o gateway exige o IP na criação; não é associado depois como recurso avulso (e exige SKU/zona específicos).
VNet1 :: VNets não têm IP público.
! Também aceitam IP público: Application Gateway, Azure Firewall, Bastion e NAT gateway.""",
"Q1153": """VM1 :: Sim. A Subnet1 tem service endpoint e a regra de VNet a libera.
VM2 com IP público na lista :: Não. IP rules não se aplicam a clientes na mesma região do storage (o tráfego usa IP privado).
VM3 precisa usar IP privado :: Não. O cliente usa o endpoint público do storage; o service endpoint só muda a identidade da origem.
! Para clientes na mesma região, use regras de VNet (service endpoint) ou private endpoint, nunca IP rules.""",
}
