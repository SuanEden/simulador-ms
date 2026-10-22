DET = {
"Q538": """Publish-AzVMDscConfiguration :: só publica o pacote DSC no storage; sozinho não aplica nada nas instâncias.
Application Insights :: monitora aplicações; não instala software.
Endpoint Manager (Intune) :: gerencia dispositivos de usuários, não instâncias de scale set.
! Atualize o modelo do scale set com a extensão. Instâncias existentes só recebem a mudança conforme a upgrade policy.""",
"Q540": """"Extensions" / "Microsoft.Compute/VirtualMachines" :: o tipo completo do recurso filho é Microsoft.Compute/virtualMachines/extensions.
"Settings" :: fica visível na definição e no portal; não é lugar de senha.
"Statuses" :: é saída (instance view), não entrada.
! JsonADDomainExtension: settings = Name, OUPath, User, Restart, Options (3); protectedSettings = Password.""",
"Q542": """Application Gateway Standard/WAF para o tráfego interno :: funcionaria, mas é mais caro e desnecessário entre camadas (L4 basta).
NSG :: filtra portas, mas não inspeciona SQL injection nem balanceia.
Public load balancer :: expõe na internet; a camada de negócio é interna.
! WAF também existe no Azure Front Door. Para "SQL injection/XSS", pense em WAF (OWASP).""",
"Q548": """Load balancing rule :: distribui no pool; não mapeia RDP para uma VM específica.
Health probe / backend pool :: não resolvem o conflito de porta 3389 duplicada no mesmo frontend.
! Alternativa sem novo IP: portas diferentes no frontend (ex.: 50001 → VM1:3389 e 50002 → VM2:3389). O requisito aqui exige a porta 3389 nos dois.""",
"Q550": """Só IP público / IP público e privado :: zonas privadas registram apenas IPs privados.
None para a VM com sufixo diferente :: o sufixo DNS configurado no Windows não interfere no auto registration.
! Uma VNet pode ter auto registration ligado em **apenas uma** zona privada (mas pode ser vinculada para resolução em várias).""",
"Q552": """Event Grid :: roteia eventos de recursos; não guarda dados para consulta interativa.
Storage account :: guarda os flow logs, mas não permite consulta interativa no portal (KQL).
Diagnóstico no ILB1 :: o LB Basic não tem logs de conexão por IP; as métricas do Standard também não listam IPs de clientes.
Diagnóstico nas VMs :: não captura o fluxo de rede do NSG.
! Hoje: VNet flow logs → Traffic Analytics → workspace (os NSG flow logs estão sendo aposentados).""",
"Q554": """VNet2 :: o espaço dela (10.11.0.0/17) se sobrepõe ao da VNet1 (10.11.0.0/16).
Só VNet2 / VNet2 e VNet3 :: a VNet4, em outra região, aceita global peering.
! Antes de qualquer peering, confira a sobreposição de address spaces; não dá para emparelhar VNets que se sobrepõem.""",
"Q556": """Basic load balancer :: não tem HA ports nem SLA; está aposentado.
HA ports com Floating IP desabilitado :: o gabarito considera o Floating IP necessário porque os dois serviços usam o mesmo backend com IPs diferentes.
Um backend pool só :: o gabarito usa dois pools (um por serviço/regra).
! HA ports = regra com protocolo All e porta 0, que balanceia todas as portas TCP/UDP; só existe em LB interno Standard.""",
"Q560": """VM1 / VM2 (VNET2 com auto registration) :: Sim. Todas as VMs da VNet vinculada são registradas, seja qual for o sufixo DNS do Windows.
VM3 em adatum.com :: Não. Zonas públicas não têm auto registration nem virtual network links.""",
"Q562": """VNet1 / VNet2 :: estão em outra região.
Todas :: o NSG é um recurso regional.
! O RG não importa; a assinatura e a região sim. NICs também precisam estar na mesma região do NSG.""",
"Q564": """Remover ou recriar a VNet1 :: destrutivo e desnecessário.
Gateway transit :: compartilha o gateway de VPN via peering; não tem relação com address space.
! Hoje: adicione o espaço no VNet1 emparelhado e clique em **Sync** no peering do lado remoto, sem removê-lo.""",
"Q566": """storage1 para RG2 :: Sim. Storage account suporta move.
NIC1 para RG2 :: Sim. Entre RGs da mesma assinatura, recursos dependentes não precisam ir juntos (o portal avisa).
IP2 muda de região :: Não. O move de RG nunca muda a região.
! Para trocar de assinatura, VM, NIC, discos e IP público precisam ir juntos (o IP público Basic com SKU específica tem restrições).""",
"Q568": """Internal load balancer :: balanceia VMs, mas não dá ao App Service acesso à VNet.
Peering :: conecta VNets entre si; o web app não está em nenhuma VNet.
Application Gateway :: atende tráfego de **entrada** para o app, não de saída do app para a VM.
! VNet integration = saída do app para a VNet. Private endpoint = entrada privada no app.""",
"Q570": """Conectar na VM1 :: com a VM desalocada, não há como conectar.
Snapshot :: não é pré-requisito.
DNS name :: não tem relação com extensões.
! Extensões só são instaladas com a VM em execução (VM Agent em Ready). Isso vale para DSC, Custom Script e AMA.""",
"Q572": """Floating IP (habilitado ou desabilitado) :: trata de DSR (o IP do frontend chega à VM), não de afinidade.
Session persistence None :: é o padrão (hash de 5 tuplas), que espalha as requisições.
! Client IP = hash de 2 tuplas (IP de origem e de destino); Client IP and protocol = 3 tuplas.""",
"Q574": """**Série "Solution" (RDP para a VM1):** com NSG na sub-rede e na NIC, o tráfego precisa passar **nos dois**. Atendem: regra TCP 3389 no NSG-Subnet1 **e** remover o NSG-VM1, ou regra TCP 3389 nos dois NSGs. Não atende liberar só UDP.
! Use o **IP flow verify** ou as **effective security rules** do Network Watcher para ver qual NSG bloqueia.""",
"Q576": """**Série "Solution":** o RDP usa TCP 3389 (o UDP é opcional, para desempenho). Sem TCP liberado nos dois NSGs não há conexão.""",
"Q578": """**Série "Solution":** regra TCP 3389 no NSG da sub-rede **e** no da NIC atende. A tag VirtualNetwork como destino inclui o IP privado da VM, que é o alvo após o NAT do IP público.""",
"Q580": """Adicionar NIC para 192.168.1.0/24 :: a NIC precisa de uma sub-rede, e a sub-rede de um address space que ainda não existe.
Adicionar só sub-rede para 192.168.1.0/24 :: a sub-rede precisa estar dentro de um address space da VNet.
Adicionar address space para 10.2.1.0/24 :: o espaço 10.2.0.0/16 já cobre esse intervalo.
Excluir sub-rede ou espaço :: desnecessário e destrutivo.
! Ordem: address space → sub-rede → NIC/VM. Para 192.168.1.0/24 serão necessários os dois primeiros passos.""",
"Q582": """3, 4 ou 12 NSGs :: um único NSG pode ser associado a todas as sub-redes, com regras por IP de destino.
! Na prática, NSGs separados por camada facilitam a manutenção, mas a pergunta é o **mínimo**.""",
"Q584": """Template ARM :: o deny também vale para implantações via template.
Sub-rede nova :: não resolve o bloqueio da VM.
Remover virtualNetworks da política :: a VNET1 já existe; não é preciso criar outra.
! A política bloqueia **criar e alterar** VNets. Se conectar a VM exigisse alterar a VNet (ex.: nova sub-rede), virtualNetworks também precisaria sair.""",
"Q586": """Azure PowerShell :: não tem cmdlet de importação de arquivo de zona.
Portal :: recriaria os 1.000 registros à mão.
DNS Manager :: gerencia o DNS do Windows, não o Azure DNS.
! Exporte com dnscmd Server1 /ZoneExport adatum.com adatum.com.txt e importe com az network dns zone import -g RG -n adatum.com -f adatum.com.txt.""",
"Q588": """Novo LB para a VM3 :: desnecessário; o mesmo LB faz NAT.
Frontend IP :: o frontend já existe.
Load balancing rule :: distribuiria o RDP para o pool inteiro.
! Inbound NAT rules agora também suportam um intervalo de portas de frontend mapeado para um backend pool (portas por instância).""",
"Q592": """Adatum.com / zonas públicas :: zonas públicas não se vinculam a VNets nem recebem registro automático.
! O sufixo DNS do Windows (Adatum.com) não define em qual zona a VM se registra; quem define é o link com auto registration.""",
"Q596": """Desassociar de uma NIC :: o NSG não está associado a nada.
Alterar a regra inbound Port_80 :: o problema é saída (navegação), não entrada.
Alterar a DenyWebSites :: a regra já está correta; só falta associar o NSG.
! Effective security rules da NIC mostram se algum NSG está realmente aplicado.""",
"Q600": """OS disk type :: HDD, SSD e Premium suportam zona; o tipo não impede.
Size :: os tamanhos comuns suportam zonas na região.
Image :: a imagem não restringe zonas.
! Discos não gerenciados (VHD em storage account) não suportam zonas nem são recomendados; estão sendo aposentados.""",
"Q602": """Só um RG :: no modo Flexible, a VM pode ficar em qualquer RG da mesma assinatura.
Central US / East US :: a VM precisa estar na mesma região do scale set.
! No Flexible, não dá para adicionar uma VM já existente: ela entra no scale set no momento da criação (parâmetro virtualMachineScaleSet).""",
}
