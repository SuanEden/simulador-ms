DET = {
"Q837": """2 ou 3 VNets :: separar camadas em VNets exigiria peering, sem ganho de segurança sobre sub-redes com NSG.
1 ou 2 sub-redes :: misturaria camadas e dificultaria isolar as portas entre web, app e dados.
! O padrão de prova para N camadas é uma VNet, uma sub-rede por camada e um NSG por sub-rede.""",
"Q839": """Regra de saída :: os usuários iniciam a conexão, então a regra é de entrada; a resposta já sai pelo estado da sessão.
NSG em todas as sub-redes :: abriria 443 da internet também para as camadas de negócio e de dados.
! NSGs são stateful: liberar a entrada já permite o retorno da resposta.""",
"Q841": """VM1 → VM2 (RDP) :: Sim. Não há deny de saída na VM1, e a entrada na Subnet2 é liberada pelo padrão AllowVnetInBound.
VM2 → VM3 (ping) :: Sim. A saída cai na AllowVnetOutBound (VNets emparelhadas contam como VirtualNetwork).
VM2 → VM3 (RDP) :: Não. O NSG2 nega 3389 de saída.""",
"Q845": """Find-RoleCapability :: é do JEA (PowerShell), não do Azure RBAC.
Get-AzureADDirectoryRole :: funções do Entra (diretório), e o módulo AzureAD foi aposentado.
Get-AzResourceProvider :: lista provedores, não definições de função.
ConvertFrom-Json / ConvertFrom-String / ConvertTo-Xml :: o arquivo de entrada de New-AzRoleDefinition é JSON gerado com ConvertTo-Json.
! No JSON exportado, remova o Id, mude Name/IsCustom e ajuste AssignableScopes antes de criar.""",
"Q870": """4 recursos :: Sim. O RG1 + 3 storage accounts do loop copy.
West US :: Não. Os recursos usam resourceGroup().location, que é Central US.
Prefixo 0 :: Sim. copyIndex() começa em 0 (sem offset).
! copyIndex(1) começa em 1; útil para nomes como vm1, vm2…""",
"Q873": """-Name :: nome da implantação, não o RG de destino.
-QueryString / -Tag :: não definem o escopo.
All / Incremental :: All não existe. Incremental mantém os recursos que não estão no template.
! Complete apaga recursos do RG que não estão no template. Use what-if (-WhatIf) antes.""",
"Q875": """1, 3, 4 ou 5 instâncias :: a primeira ação acontece aos 10 min; aos 15, ainda está em cooldown.
1, 5 ou 10 minutos :: o gabarito considera cooldown (5) + nova janela (10) = 15 min.
! O cooldown é contado a partir da ação; depois dele, o autoscale reavalia a janela de duração.""",
"Q877": """TestSubnet1 :: o ASR não escolhe pela faixa de IP.
RecoverySubnetA/B :: vêm depois de DemoSubnet1 em ordem alfabética.
! Para controlar a sub-rede, configure o "test failover network"/target subnet nas propriedades de rede da VM replicada.""",
"Q884": """22 :: SSH do Bastion para VMs Linux, liberado na sub-rede das VMs (origem AzureBastionSubnet), não do usuário.
389 :: LDAP, sem relação.
8080 :: não é usada pelo Bastion.
! As regras exigidas no NSG da AzureBastionSubnet incluem 443 de entrada da Internet e do GatewayManager, e 22/3389 de saída para a VirtualNetwork.""",
"Q886": """Usar 10.0.1.3 :: os endereços .0 a .3 de cada sub-rede são reservados.
Usar 10.0.2.1 / 192.168.2.1 :: fora da Subnet1.
DNS padrão do Azure :: não conhece as zonas e os SRV do AD.
Private/public DNS zone :: não aceitam o registro dinâmico (DDNS) do AD.
! Depois de promover o DC, defina a VNet para usar o IP do DC como DNS e reinicie as VMs membro.""",
"Q892": """1 monitor :: um connection monitor é regional e precisa de origens na região dele.
3 ou 4 :: só há VMs de origem em duas regiões.
! Cada connection monitor pode ter vários test groups; o limite é por região e assinatura.""",
"Q894": """Sub-rede VNET1/netname :: Não. "netname" é o nome da variável; o valor é APP1.
Só no RG da VNET1 :: Sim. resourceId sem RG resolve no RG da implantação.
sku como parâmetro :: Não. Variáveis não podem ser sobrescritas na implantação.
! Para referenciar uma VNet de outro RG, use resourceId('outroRG', 'Microsoft.Network/virtualNetworks/subnets', 'VNET1', 'APP1').""",
"Q896": """Private endpoints :: dão acesso privado a partir da VNet, não da internet.
Firewall rules :: restringem origens; não mudam a rota.
Load balancing :: não se aplica ao endpoint do storage.
! Microsoft network routing (padrão) entra no POP mais próximo do usuário. Internet routing entra perto da região do storage e é mais barato.""",
"Q898": """Bastion :: facilita o RDP; não bloqueia tráfego entre VMs.
Porta de **origem** 3389 :: o RDP usa 3389 como destino; a origem é uma porta efêmera.
Regra inbound de origem 3389 na sub-rede :: mesmo erro, e afetaria a sub-rede inteira.
! Também resolveria uma regra inbound no NIC da VM2 negando destino 3389 com origem = IP da VM1.""",
"Q900": """Hybrid Connection Manager :: é para App Service Hybrid Connections.
Premium no ASP1 :: não muda o roteamento da VNET1.
Network Watcher :: diagnóstico, não roteamento.
! Associe a route table às sub-redes de trabalho, nunca à AzureFirewallSubnet.""",
"Q902": """storage1 / storage3 :: outra região ou Premium; aumentam o custo (egress entre regiões ou SSD).
storage4 (FileStorage) :: não tem blobs.
! O storage account precisa estar na mesma assinatura do app; com firewall, o app precisa acessar via VNet integration ou com exceções.""",
"Q904": """Só Alert2 para o User1 :: anexar o disco altera a VM1 (write), que está dentro do escopo do RG1 também.
Nenhum / só um para o User2 :: a tag foi aplicada no RG1 **e** na VM1.
! Alertas de activity log filtram por escopo, categoria (Administrative) e, opcionalmente, operação e status.""",
"Q907": """1 endpoint :: o Microsoft.Storage não cobre o Entra ID.
3 ou 5 :: um endpoint por **serviço** basta (storage1 e storage2 usam o mesmo); VNet ↔ VNet não usa service endpoint.
! Service endpoints são por sub-rede e por serviço; private endpoints são por recurso.""",
"Q909": """A records :: www normalmente usa CNAME; o A seria para o domínio raiz, junto com o TXT asuid.
CNAME asuid :: a verificação exige TXT, não CNAME.
TXT www com o host do app :: o TXT de verificação se chama asuid.www e contém o ID, não o hostname.
! O Custom Domain Verification ID aparece em App > Custom domains e é único por assinatura.""",
"Q911": """Connection Monitor :: testa conectividade; não detecta tráfego malicioso.
Data collection endpoints :: servem para a ingestão do AMA/Logs API, não para tráfego de rede.
Private link :: acesso privado a serviços; não gera dados de tráfego.
! Fluxo: flow logs → Traffic Analytics (workspace) → Network Insights/alertas sobre IPs maliciosos.""",
"Q913": """Alert1 listado em 11/08 :: Sim. O alerta dispara e aparece no portal; só a notificação é suprimida.
E-mail em 12/08 :: Não. Está dentro da janela de supressão.
E-mail em 15/08 :: Sim. A supressão terminou em 13/08.
! As alert processing rules também podem **adicionar** action groups a muitas regras de uma vez.""",
"Q924": """Instâncias Windows :: o ACI não suporta grupos com vários containers Windows.
Combinações com Windows :: um container group tem um único SO.
! Containers de um mesmo grupo compartilham IP, rede (localhost), volumes e ciclo de vida, como um pod.""",
"Q927": """contoso.com (Entra Domain Services) :: o Bastion não acessa serviços gerenciados.
App1 (web app) :: o acesso é HTTP(S) direto; o Bastion só faz RDP/SSH para VMs.
! O Bastion também alcança VMs em VNets emparelhadas (SKUs Basic e superiores).""",
"Q931": """Operational backup :: protege blobs na própria conta (point-in-time), não cria cópia em outra região.
GRS :: replica para a região **par** (North Europe → West Europe), não para East US.
Lifecycle rule :: move tiers e exclui; não copia.
! Object replication é assíncrono e exige versionamento nas duas contas e change feed na origem.""",
"Q933": """WAD :: extensão legada; envia a storage/Event Hubs e não atende vários workspaces com DCR.
Windows VM agent :: é o agente da plataforma (provisionamento/extensões), não coleta logs.
! Uma DCR pode ter vários destinos; associe a mesma DCR às 100 VMs (Azure Policy facilita).""",
"Q935": """Application security group :: agrupa NICs para regras de NSG.
Grupo dinâmico de dispositivos :: Entra ID, sem relação com alertas.
Application group :: é do Azure Virtual Desktop.
! O action group pode chamar Azure Function, Logic App, webhook, Automation runbook, ITSM, e-mail, SMS e voz.""",
"Q937": """DCR :: define coleta de dados do agente; não gera topologia.
Network Watcher :: oferece diagnósticos (a topologia avulsa existe), mas o painel com métricas e topologia é o Network Insights.
Log Analytics :: consulta dados; não oferece painel de topologia pronto.
! Network Insights fica em Azure Monitor > Insights > Networks.""",
"Q939": """Virtual Network Manager :: gerencia conectividade e regras de segurança em escala; não diagnostica um fluxo.
Network Insights :: painel geral de saúde.
Effective security rules :: lista as regras da NIC, mas não testa a conexão na porta 33000 de ponta a ponta.
! Combine os dois: IP flow verify para o NSG da origem e do destino; connection troubleshoot para ver o caminho completo.""",
"Q950": """Redimensionar a sub-rede :: a /26 já suporta host scaling.
Host scaling :: só existe no Standard ou superior; o upgrade vem primeiro.
NSG :: não aumenta a capacidade.
! Cada instância de scale unit suporta cerca de 20 RDP ou 40 SSH concorrentes; 100 SSH pedem pelo menos 3 instâncias.""",
"Q954": """Microsoft 365 group :: não é um destino de alerta do Azure Monitor.
Log Analytics workspace :: o alerta de activity log não precisa de workspace.
Data collection endpoint / ASG :: não têm relação.
! Sinal: "Delete management locks" (Microsoft.Authorization/locks/delete).""",
}
