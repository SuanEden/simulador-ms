DET = {
"Q066": """Public load balancer :: o tráfego chega pela VPN (endereços privados); um frontend público exporia o app na internet sem necessidade.
CDN :: cacheia conteúdo estático na borda; não distribui conexões entre VMs.
Traffic Manager :: balanceia por DNS entre endpoints públicos/regionais; não serve para tráfego privado dentro da VNet.
! Application Gateway com **frontend IP privado** também atende tráfego que entra por VPN.""",
"Q067": """Monitor :: mostra métricas, mas não aponta sozinho quais VMs reduzir.
Metrics :: exigiria analisar VM por VM; não é "rápido".
Customer insights :: não é um blade de otimização do Azure.
! O Advisor considera CPU e rede abaixo do limite (padrão 5%) por 7 dias; o limite é ajustável nas configurações do Advisor.""",
"Q069": """Custom domain :: não tem relação com convidar contas Microsoft externas.
Identity provider :: contas Microsoft (outlook.com) já são suportadas nativamente no B2B.
Security administrator :: não dá permissão de convite; o User administrator já pode convidar se as configurações permitirem.
! Confira também a allow/deny list de domínios e as cross-tenant access settings, que também bloqueiam convites.""",
"Q070": """Owner da assinatura + Conditional Access :: CA não dá acesso ao root management group.
Owner da assinatura + Access management :: o toggle "Access management for Azure resources" só aparece para Global Administrator.
Novo management group :: ser dono de um MG filho não permite atribuir política no Tenant Root Group.
! Depois de elevar, o Global Admin vira User Access Administrator no escopo "/". Remova a elevação ao terminar.""",
"Q071": """User1 :: Group1 (cidade começa com "m"). Fica fora do Group2 porque o departamento é Human resources, e fora do Group3, que é atribuído e sem membros.
User2 :: Group1 (Melbourne) e Group2 (Marketing).
! Regras dinâmicas avaliam atributos do usuário (city, department…); licença não é critério, a menos que a regra use assignedPlans.""",
"Q072": """JobTitle de User2 :: atributo sincronizado do AD, com o AD on-premises como fonte de autoridade; edite on-premises e espere o próximo ciclo de sync.
UsageLocation :: atributo só de nuvem, editável para usuários sincronizados, de nuvem e convidados.
! Para usuários sincronizados, o portal mostra os campos de origem on-premises desabilitados.""",
"Q073": """**Série "Solution" (habilitar Traffic Analytics):** atendem **Owner**, **Contributor** e **Network Contributor**. Reader e Traffic Manager Contributor não atendem.
! Traffic Analytics também exige um workspace do Log Analytics e flow logs (de VNet; os de NSG estão sendo aposentados).""",
"Q074": """**Série "Solution":** Owner atende. Também atendem Contributor e Network Contributor; Reader e Traffic Manager Contributor, não.""",
"Q075": """**Série "Solution":** Reader só lê. Configurar flow logs e Traffic Analytics exige escrita em Network Watcher, na storage e no workspace.
! A documentação antiga citava Reader porque misturava "ver" com "habilitar". Na prova atual, Reader = Não.""",
"Q076": """Owner :: cobre tudo, mas também atribui funções; viola o menor privilégio.
Virtual Machine Contributor :: gerencia VMs, mas não as VNets (só associa a VM a uma VNet existente).
Virtual Machine Administrator Login :: data action de login na VM; não implanta nada.
! Network Contributor + Virtual Machine Contributor seria ainda mais restrito, mas a combinação não está nas opções.""",
"Q077": """Admin1 adicionar Admin2 como Owner :: Sim. O toggle de elevação dá User Access Administrator na raiz.
Admin3 adicionar Admin2 :: Sim. O Admin3 é Owner da assinatura.
Admin2 criar RG :: Não. Global Admin no Entra não dá acesso a recursos do Azure sem elevação ou atribuição.
! Funções do Entra (diretório) e funções do Azure RBAC (recursos) são sistemas separados.""",
"Q078": """IAM do RG1 primeiro :: só dá para escolher a VM como principal depois que a identidade dela existe.
IAM da VM1 :: controla quem gerencia a VM, não o que a VM acessa.
Policies do RG1 :: Azure Policy não concede acesso.
! Sequência: Identity > System assigned = On → RG1 > Access control > Add role assignment > Managed identity → VM1.""",
"Q079": """Mudar o tipo do lock :: ReadOnly também bloqueia exclusão; é preciso **remover** o lock.
Desligar a VM1 :: VM desligada ou ligada não muda nada na exclusão do RG.
Só apagar os dados do vault :: falta remover o lock do VNET1.
! Em vaults com soft delete, os itens excluídos ficam 14 dias e continuam bloqueando a exclusão do vault.""",
"Q080": """PTR :: DNS reverso; não delega.
Modificar o SOA :: o SOA descreve a zona atual; não delega subdomínios.
A *.research :: wildcard resolve nomes, mas não delega a autoridade.
! No Azure, crie a zona filha (research.adatum.com) e copie os 4 name servers dela para o NS "research" da zona pai.""",
"Q081": """Add an Azure AD tenant :: o tenant já existe; o domínio é acrescentado a ele.
Configure company branding :: só personaliza a tela de login.
Create an Azure DNS zone :: o DNS público está no registrador; não é preciso hospedá-lo no Azure.
! Só depois da verificação o domínio pode ser definido como primário e usado no UPN.""",
"Q083": """Criar NS na zona do Azure :: a zona já tem os NS dela; o que falta é a delegação no registrador.
SOA no registrador :: o registrador só guarda a delegação (NS), não o SOA.
Criar SOA :: o Azure DNS cria o SOA automaticamente.
! Teste com nslookup -type=NS contoso.com; depois da propagação, a resposta deve listar ns1-0x.azure-dns.com/.net/.org/.info.""",
"Q084": """User1 (sincronizado) :: Sim. É identidade híbrida, autenticável pelo AD DS.
Computer1 :: Não. Contas de computador não sincronizam como principais atribuíveis para funções de share.
User2 (só nuvem) :: Sim, a atribuição é aceita no IAM, mas ele não autentica no share via AD DS.
! Com AD DS, as permissões de share (RBAC) se somam às ACLs NTFS (Windows ACLs) no nível de arquivo.""",
"Q085": """Security Admin :: gerencia o Defender for Cloud e as políticas de segurança, não sub-redes.
Network Contributor atribuindo funções :: não tem Microsoft.Authorization/roleAssignments/write.
! Só Owner, User Access Administrator e Role Based Access Control Administrator atribuem funções.""",
"Q086": """Locks em management groups :: não são suportados (nem no Tenant Root Group).
Tags em management groups :: o gabarito considera tags só em assinatura, resource group e recurso.
! Lock na assinatura ou no RG é herdado por todos os recursos abaixo.""",
"Q087": """Usage location / display name :: não identificam o usuário de forma única; o modelo de Bulk delete pede só o UPN.
! Baixe sempre o modelo CSV do próprio portal; as duas primeiras linhas (versão e cabeçalho) não podem ser removidas.""",
"Q088": """RG1 só com Tag2:IT :: Sim. A definição "Append a tag…to resources" não avalia resource groups (há uma versão separada para RGs).
Storage1 com as quatro tags :: Não. Tag1 (da assinatura) e Tag2 (do RG) não são herdadas; fica Tag3:value1 + Tag4:value4.
VNET1 :: Não. Está excluído da política e fica só com Tag3:value2.
! Append só altera recursos criados ou atualizados depois da atribuição.""",
"Q089": """**Série "Solution":** Traffic Manager Contributor gerencia perfis DNS do Traffic Manager. Para Traffic Analytics: Owner, Contributor ou Network Contributor.""",
"Q090": """Funções do Entra sem escopo :: o User administrator global gerenciaria todos os usuários do tenant.
Access packages :: dão acesso a recursos (grupos, apps, sites), não delegam administração.
Funções do Azure :: atuam em recursos do Azure, não em usuários do Entra.
! Administrative units exigem Entra ID P1 para os administradores delegados; a AU pode ter associação dinâmica.""",
"Q091": """**Série "Solution":** Logic App Contributor no RG Dev atende com menor privilégio. Logic App Operator e DevTest Labs User não atendem.""",
"Q092": """Excluir LB1 / criar NAT rule :: User Access Administrator não gerencia o recurso; só atribui acesso.
Modificar regras do LB / implantar AKS :: Virtual Machine Contributor não gerencia load balancer nem AKS.
! Funções de "gestão de acesso" e de "gestão do recurso" são independentes. Owner = as duas.""",
"Q093": """Contributor no RG1 :: gerencia recursos, mas não atribui funções.
Contributor / Network Contributor no VNet1 :: mesmo problema, sem roleAssignments/write.
! Se aparecer User Access Administrator ou RBAC Administrator no VNet1, essas são opções de menor privilégio que o Owner.""",
"Q094": """actions / notActions :: permissões de plano de controle (gerenciar a VM), não login.
notDataActions :: exclui data actions; não concede.
roletype :: não é seção de permissões.
! As funções built-in são **Virtual Machine Administrator Login** e **Virtual Machine User Login**; a VM precisa da extensão AADLoginForWindows/Linux.""",
"Q095": """Permissões de share pelo Explorer :: as permissões de share são RBAC no Azure; pelo Explorer se definem ACLs NTFS, e só depois de existir a identidade.
Montar o share :: montar com a chave não habilita a autenticação por identidade.
Private endpoint :: é rede, não identidade.
! Ordem: habilitar a fonte de identidade (AD DS / Entra Kerberos) → função de share → ACLs NTFS → montar com credencial de domínio.""",
}
