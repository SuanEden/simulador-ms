DET = {
"Q604": """VNET1 só para uma :: a VNET1 tem peering direto com as duas.
VNET2 para a VNET3 :: exigiria peering direto, ou hub com NVA/gateway e UDRs; peering não é transitivo.
! Hub-spoke: o spoke fala com outro spoke via NVA ou Azure Firewall no hub (com UDR), ou com o Azure Virtual Network Manager (conectividade mesh).""",
"Q610": """**Série "Solution" (bloquear 8080 em todo NSG novo):** só uma **Azure Policy customizada** (modify/append/deny na regra do NSG) atende. Lock, desregistrar provider e política built-in não atendem.
! Lock protege contra exclusão ou alteração do recurso; não adiciona configuração.""",
"Q612": """Mudar a prioridade da regra RDP :: a regra RDP já é avaliada antes do DenyAllInBound.
Anexar outra NIC :: a NIC já foi adicionada; o problema é a VM desligada.
Excluir DenyAllInBound :: regras padrão não podem ser excluídas e não são o problema.
! Adicionar ou remover NICs exige a VM desalocada; depois de alterar, é preciso iniciá-la.""",
"Q614": """Conditional forwarder na VM1 :: ajuda a resolver outros domínios, mas VNET2 e VNET3 nem alcançam a VM1.
Service endpoints :: dão acesso a serviços PaaS, não conectividade entre VNets.
! Alternativa moderna: Azure DNS Private Resolver no hub, com peering das spokes.""",
"Q616": """NSG1 limita a VM1 :: Não. As regras visam a sub-rede da VM2.
NSG1 se aplica à VM2 :: Sim. O destino das regras é 172.16.2.0/24.
Mesma VNet :: Não, pelo gabarito (as sub-redes indicam VNets distintas, conectadas por peering).
! Connection troubleshoot mostra o salto e o NSG que bloqueou; next hop mostra a rota usada.""",
"Q618": """Address space do local network gateway :: altera o roteamento da VPN, não filtra RDP da internet.
Remover os IPs públicos :: quebraria o acesso dos usuários à porta 443.
Address space da Subnet1 :: não tem relação com filtragem.
! Melhor ainda: tire o RDP público e use Azure Bastion ou JIT.""",
"Q620": """Propriedades do ASG1 :: o ASG não lista membros; quem entra no grupo é a NIC.
Propriedades do NSG1 :: o NSG referencia o ASG nas regras, mas não associa VMs a ele.
! Todas as NICs de um ASG precisam estar na mesma VNet. Um NSG pode usar ASGs como origem e destino.""",
"Q624": """vNET6 com vNET1 / vNET2 / todas :: os peerings estão Disconnected, sem tráfego.
Service endpoint / subnet / address space :: não reconectam o peering.
! "Disconnected" = o outro lado foi excluído. "Initiated" = só um lado criado. "Connected" = os dois lados criados.""",
"Q628": """NSG antes do backend pool :: não é exigência para criar o pool.
IP privado estático :: não é necessário para o backend.
Remover IP público para conectar :: já foi feito no passo anterior.
! O Standard LB e o IP público Standard são "secure by default": sem NSG com allow, o tráfego é negado.""",
"Q630": """North Europe / West Europe :: não há VNet nessas regiões; a NIC precisa de uma sub-rede da mesma região.
! A NIC pode ficar em qualquer RG, mas tem de estar na região da VNet e da VM em que será usada.""",
"Q632": """Sufixo DNS na VM1 :: não faz a internet conhecer a zona.
SRV em contoso.com :: zona privada, não ligada a adatum.com.
IAM do link1 :: o link1 é da zona privada; não tem relação com a resolução pública.
! O resolvedor do Azure (168.63.129.16) segue a delegação pública, que só existe depois de configurar o NS no registrador.""",
"Q634": """Next hop :: mostra a rota, não qual regra bloqueia.
Packet capture :: captura pacotes; não aponta a regra.
Security group view :: lista as regras efetivas, mas não testa um pacote específico.
NSG flow logs / Traffic Analytics :: dados históricos, não um teste de conectividade.
! IP flow verify informa a regra exata (nome do NSG e da regra) que permitiu ou negou.""",
"Q636": """VM1 com 193.77.134.10 :: Sim. A NIC não tem DNS próprio e herda o da VNet.
VM2 com 193.77.134.10 :: Não. A NIC dela define 192.168.10.15, que tem precedência.
VM3 com 192.168.10.15 :: Sim. Mesmo motivo.
! Mudanças de DNS na VNet só valem para a VM após renovar o DHCP ou reiniciá-la.""",
"Q640": """**Série "Solution" (VM1 e VM2 no backend do Standard LB):** atende quando **nenhuma VM tem IP público Basic**: remover o IP Basic da VM2, ou pôr IP público **Standard** nas duas. IP Basic na VM1, ou só parar a VM2, não resolvem.
! Os IPs públicos Basic foram aposentados em 30/09/2025; hoje só existe o Standard.""",
"Q642": """**Série "Solution":** parar a VM não remove o IP Basic da NIC dela. A VM2 continua incompatível.""",
"Q644": """**Série "Solution":** IP público Standard nas duas VMs é compatível com o Standard LB. Também funcionaria só remover o IP Basic da VM2.""",
"Q648": """Protocolo da Rule4 :: não altera o deny da Rule2.
Excluir a Rule1 :: não libera o 443.
Regra nova com prioridade 501 :: o deny da Rule2 (500) é avaliado antes.
! Prioridades vão de 100 a 4096; o número menor vence e a primeira regra que casa encerra a avaliação.""",
"Q650": """**Série "Solution":** Microsoft.ClassicNetwork é o modelo clássico (ASM). NSGs do ARM ficam em Microsoft.Network. Desregistrar não cria regras.""",
"Q652": """S2S entre VNET1 e VNET2 :: Sim. Uma conexão VNet-to-VNet via VPN gateway é possível.
Peering VNET1-VNET2 :: Sim. Global peering, com espaços sem sobreposição.
Peering VNET1-VNETA :: Sim. Assinaturas diferentes e outra região não impedem, e os espaços não se sobrepõem.
! Peering entre tenants também é possível, com permissões nos dois lados.""",
"Q656": """**Série "Solution" (443 de 131.107.100.50 falha):** as regras efetivas já permitem esse IP com prioridade 100. Excluir o bloqueio ou mexer na prioridade não muda nada; o problema está fora do NSG (app, probe, firewall do SO).
! Confirme com IP flow verify: se o resultado for "Allow", investigue a VM (serviço escutando, firewall do Windows) e o health probe.""",
"Q658": """**Série "Solution":** a regra de allow já está no topo (100). Investigue o serviço na VM2, o firewall do SO e o health probe do LB.""",
"Q660": """**Série "Solution":** não há built-in que injete "deny 8080 entre VNets". É preciso uma **definição customizada** (modify/append ou deny).""",
"Q664": """**Série "Solution":** sem IP público Basic em nenhuma VM, as duas entram no backend do Standard LB. Atende.""",
"Q666": """**Série "Solution":** custom policy atribuída à assinatura atende e vale para todos os RGs.
! O efeito **append** só adiciona a regra se o NSG for criado sem ela; **deny** recusa NSGs sem a regra; **modify** pode corrigir os existentes com remediação.""",
"Q668": """IP flow verify :: verifica allow/deny de um pacote; não mede latência.
Connection troubleshoot :: teste pontual (mostra latência só daquele teste); não dá média contínua.
NSG flow logs :: registram fluxos, sem RTT.
! O Connection monitor guarda o histórico de RTT e de % de falhas no Log Analytics e permite alertar sobre eles.""",
"Q674": """vm1.core.windows.net / vm1.azure.com :: domínios que não são usados pelo DNS interno do Azure.
vm1.westeurope.cloudapp.azure.com :: é o rótulo DNS do **IP público**, não do privado.
! O sufixo interno é <id>.internal.cloudapp.net (ou <id>.xx.internal.cloudapp.net) e só resolve dentro da mesma VNet.""",
"Q680": """VM5 registrada :: Não. A VNet1 não é VNet de registro.
VM5 resolve vm9.adatum.com :: Não. A VNet1 não tem link com a zona.
VM6 resolve :: Sim. A VNet2 está vinculada (com registro).
! Para resolver sem registrar, crie um link de **resolução** (auto registration desligado) para a VNet1.""",
"Q682": """Auto registration no Link2 :: Sim. A VNET2 ainda não registra em nenhuma zona.
Link da VNET1 com a Zone3 :: Sim. A zona privada é global, e links só de resolução são ilimitados (até o limite de links por zona).
VNET2 com registro na Zone1 :: Sim. Uma zona pode ter várias VNets de registro (a limitação é a VNet registrar em só uma zona).""",
"Q684": """AzureFirewallSubnet / LAN01 / RemoteAccessSubnet :: o Bastion só é implantado numa sub-rede com o nome exato AzureBastionSubnet.
/29 ou /30 :: pequenas demais (o mínimo é /26 na documentação atual; /27 era o antigo).
! O SKU Developer não precisa da AzureBastionSubnet; os SKUs Basic, Standard e Premium precisam.""",
}
