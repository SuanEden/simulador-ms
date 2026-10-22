DET = {
"Q686": """**Série "Solution" (inspecionar todo o tráfego VM1 → VM2 por 3 h):** só o **packet capture** atende. Connection monitor, Data Collector Set e métricas Network In/Out não capturam o conteúdo.
! O packet capture usa a extensão Network Watcher Agent na VM, grava um .cap no storage ou localmente, e tem limites de tamanho e de tempo (até 5 h).""",
"Q688": """**Série "Solution":** o connection monitor testa alcance e latência com sondas sintéticas; não inspeciona os pacotes reais.""",
"Q690": """**Série "Solution":** o DCS do Performance Monitor coleta contadores. Para pacotes no SO existe pktmon/netsh trace, mas a resposta da prova é o **packet capture** do Network Watcher.""",
"Q692": """Remover o nsg1 :: o NSG já permite 443; removê-lo não é pré-requisito (e no Standard LB a VM precisa de NSG permitindo o tráfego).
Availability set :: não é exigido para o backend de um Standard LB.
! O backend do Standard LB aceita qualquer VM ou scale set da mesma VNet.""",
"Q694": """**Série "Solution":** métricas Network In/Out mostram só bytes agregados; não permitem inspecionar o tráfego.""",
"Q696": """**Série "Solution" (443 falha mesmo com allow):** acrescentar um deny só piora; o NSG já permite. O problema está no app ou no SO.""",
"Q700": """Server2 → host2 = 131.107.50.50 :: Não. O Server1 é autoritativo para contoso.com e não tem host2 (NXDOMAIN).
Server2 → host1 :: Sim. O registro existe no Server1.
Server3 → host2 :: Não. A VNET2 usa DNS customizado, então a zona privada vinculada não é consultada.
! Para usar a zona privada com DNS customizado, o servidor precisa encaminhar para 168.63.129.16 (ou para o DNS Private Resolver).""",
"Q702": """Gateway subnet :: só é necessária para VPN/ExpressRoute.
Sub-redes nas duas VNets :: não resolve a sobreposição.
Service endpoint :: não tem relação com peering.
! O address space só pode ser alterado se nenhuma sub-rede em uso conflitar; com a VNet vazia, é simples.""",
"Q704": """comp1 (TXT) :: não tem IP.
comp3 (CNAME → comp1) :: o alvo não tem registro A.
comp4 (PTR) :: é resolução reversa (IP → nome).
! Ping exige um nome que resolva para A/AAAA (diretamente ou via CNAME que termine num A).""",
"Q706": """Inbound :: a entrada já é permitida pelo AllowVnetInBound; o bloqueio está na saída.
Origem/destino Any ou /28 :: amplos demais para o menor privilégio.
Prioridade 111 ou 112 :: não passa à frente da DENY_PING (111).
! A Windows Firewall da VM2 também bloqueia ICMP por padrão; libere-a se o ping continuar falhando.""",
"Q712": """IP1 / IP2 :: IPs Basic não são aceitos no frontend de um Standard LB.
! O SKU do IP público precisa ser igual ao do load balancer. Standard é sempre estático e zone-redundant por padrão.""",
"Q716": """10.0.1.0/24 :: cobre só a Subnet1 (onde está o NVA); o requisito é toda a VNet.
10.0.254.0/24 :: é a própria GatewaySubnet.
Next hop Virtual network / Virtual network gateway :: não passariam pela VM1.
Associar à Subnet0 / Subnet1-2 :: controla o tráfego que **sai** delas, não o que entra pelo gateway.
! Também é preciso habilitar IP forwarding na NIC da VM1 (e roteamento no SO). Não associe à GatewaySubnet uma rota 0.0.0.0/0 para um NVA.""",
"Q720": """Internet → VM1 :: Não. O NSG1 tem só as regras padrão, e a DenyAllInBound bloqueia a internet.
Internet → VM2 :: Sim. A Subnet2 não tem NSG, e o NSG2 da NIC permite 3389 de Any.
VM1 → VM2 :: Sim. A saída da VM1 é liberada por AllowVnetOutBound, e a entrada na VM2 pelo NSG2.""",
"Q722": """Frontend IP :: já criado com o LB (é obrigatório na criação).
Inbound NAT rule :: serve para porta específica → VM; não é pré-requisito da regra de balanceamento.
Virtual network :: as VMs já estão numa VNet.
! Ordem prática: backend pool → health probe → load balancing rule (frontend + porta + backend + probe).""",
"Q726": """VM1 → server1 = 131.107.3.3 :: Sim. A VNET1 usa o DNS do Azure e está vinculada à zona privada.
VM2 → server1 = 131.107.3.3 :: Não. A VM2 usa o DNS customizado 192.168.0.5, que responde .2.3.
VM3 → server2 = 131.107.2.4 :: Sim. Vem do DNS customizado.
! O vínculo da zona privada só tem efeito se a VNet usar o DNS do Azure (ou se o DNS customizado encaminhar para 168.63.129.16).""",
"Q727": """vm1 em contoso.com (pública) :: Não. Zonas públicas não têm auto registration, e RBAC para VMs não cria registros.
vm1 / vm2 em fabrikam.com :: Sim. A zona privada com link e auto registration registra os IPs privados.
! Registros automáticos só existem com o IP privado; são removidos quando a VM é excluída.""",
"Q731": """VM2 → VM1:1433 :: Não. O NSG2 na NIC da VM1 nega a origem 10.10.2.5.
VM1 → VM2:1433 :: Sim. A Subnet2 não tem NSG, e a saída da VM1 é liberada pelo padrão.
VM2 → VM3:1433 :: Sim. Mesma sub-rede, sem NSG.
! Entrada: o NSG da sub-rede é avaliado primeiro e depois o da NIC. Saída: o da NIC primeiro e depois o da sub-rede. É preciso allow nos dois.""",
"Q733": """VM3 → VM1 :: Sim. A VM3 está ligada e roteia.
VM2 → VM1 com a VM3 desligada :: Não. A UDR continua apontando para o IP da VM3, e o tráfego é descartado.
VM1 → VM2 :: Sim. Passa pela VM3 ligada.
! Para alta disponibilidade de NVAs, use um par de NVAs atrás de um LB interno com HA ports e aponte a UDR para o IP do LB.""",
"Q741": """Excluir VMs desligadas por auto-shutdown :: o backup funciona com a VM desligada (crash-consistent).
Excluir Windows 10 / Ubuntu :: Windows cliente 64-bit e distros endossadas são suportados.
! Se o auto-shutdown coincidir com o horário do backup, ele ainda roda; só a consistência muda.""",
"Q743": """Storage account :: o Recovery Services vault tem storage próprio.
Extensões das VMs :: o Azure Backup instala a extensão ao habilitar o backup.
Nova política :: não resolve a região diferente.
! Um vault por região (e assinatura) que tenha VMs a proteger.""",
"Q745": """1 a 3 regras :: cada sinal de activity log precisa da própria regra; métricas diferentes, com destinatários diferentes, também.
1, 2 ou 4 action groups :: um action group por conjunto distinto de destinatários; os conjuntos repetidos são reaproveitados.
! Um action group pode ser usado por várias regras, e uma regra pode chamar vários action groups.""",
"Q747": """Incluir Principal1/Principal2 :: service principals e managed identities não têm caixa de correio para receber o e-mail.
Só User1 :: a regra antiga mandava só para atribuições diretas. Hoje membros de grupo atribuído também recebem.
! A atribuição precisa estar no escopo da **assinatura** para o e-mail por ARM role valer.""",
"Q749": """5 ou 8 em 8/1 :: conte os diários (5 dias de retenção) mais o mensal do dia 2; o semanal de domingo coincide com um diário.
5, 17 ou 19 em 15/1 :: 5 diários + semanal (4/1) + mensal (2/1) + anual (9/1) = 8.
! Um mesmo ponto de recuperação vale para várias retenções (diária, semanal…); só conta uma vez.""",
"Q753": """Tamanho da VM :: o Replace existing mantém a configuração atual da VM, inclusive o tamanho.
Disco de dados novo :: continua anexado; o Replace existing troca os discos que estavam no backup.
Senha :: também volta à do backup (fica no disco do SO), mas o gabarito destaca o arquivo como a mudança a refazer.
! O Replace existing cria um snapshot dos discos atuais antes de substituí-los, o que permite reverter.""",
"Q755": """User2 só com perguntas :: Não. São exigidos 2 métodos, e as perguntas de segurança não podem ser os dois (ao menos um precisa ser outro método).
User1 pelo app :: Não. O User1 não está no Group2, e o SSPR está em "Selected".
User3 (User administrator) configurar perguntas :: Não. É necessário Authentication Policy Administrator ou Global Administrator.
! Administradores sempre usam a política de SSPR de administrador (2 métodos, sem perguntas de segurança).""",
"Q759": """App1 com um backup :: Não. Retenção 0 = manter indefinidamente; ficam todos os backups diários.
Backup do slot de teste do App2 :: Não. Só o slot de produção foi configurado.
Restaurar backup de produção no slot de teste :: Sim. É permitido restaurar em outro slot ou em outro app.
! Backups customizados têm limite de tamanho (10 GB de app + banco). Para mais, use o backup automático ou outra estratégia.""",
}
