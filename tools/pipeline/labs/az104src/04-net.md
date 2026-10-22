=== L21 | VNets, sub-redes, NICs e peering | A | 60
questions: Q032,Q1133,Q580,Q528,Q530,Q532,Q630,Q1152,Q554,Q702,Q564,Q604,Q833,Q624,Q1142,Q1143,Q1116,Q652,Q155,Q170,Q171,Q172,Q185
predict: Q604
## overview
Testa a base de rede: espaço de endereços, sub-redes, NICs, IPs públicos e peering.

- O Azure reserva **5 IPs** por sub-rede (Q1133); IP fora do espaço = adicionar address space, dentro = adicionar sub-rede (Q580).
- NIC na **mesma região** da VNet e da VM; o RG não importa (Q528–Q532, Q630); IP público vai na NIC ou no LB (Q1152, Q032).
- VM não troca de VNet: recriar a partir do disco (Q155, Q170–Q172, Q185).
- Peering: sem sobreposição; **não transitivo**; global e entre tenants, não entre nuvens soberanas; tráfego pelo backbone (Q554, Q702, Q604, Q833, Q1142, Q1143, Q1116, Q652).
- Status **Disconnected** = recriar; alterar address space de VNet emparelhada + sync (Q624, Q564).

## steps
### 1. Três VNets em hub-and-spoke
```bash
az group create -n rg-az104-l21 -l $LOC -o none
az network vnet create -g rg-az104-l21 -n vnet1 -l $LOC  --address-prefix 10.21.0.0/16 --subnet-name s1 --subnet-prefix 10.21.1.0/24 -o none
az network vnet create -g rg-az104-l21 -n vnet2 -l $LOC  --address-prefix 10.22.0.0/16 --subnet-name s1 --subnet-prefix 10.22.1.0/24 -o none
az network vnet create -g rg-az104-l21 -n vnet3 -l $LOC2 --address-prefix 10.23.0.0/16 --subnet-name s1 --subnet-prefix 10.23.1.0/24 -o none
az network vnet create -g rg-az104-l21 -n vnet4 -l $LOC  --address-prefix 10.21.0.0/17 -o none   # sobreposta à vnet1
for v in 1 2 3; do vm_teste rg-az104-l21 vm$v vnet$v s1 Ubuntu2204; done
```

### 2. Peering vnet1 ↔ vnet2 ↔ vnet3 (vnet2 no meio)
@ Azure: vnet2 > Settings > Peerings > + Add — crie os dois lados com vnet1 e depois com vnet3 (global).

### 3. NIC e IP público
```bash
az network nic create -g rg-az104-l21 -n nic-extra -l $LOC2 --vnet-name vnet1 --subnet s1   # região errada
az network public-ip create -g rg-az104-l21 -n ip1 --sku Standard -o none
```

## test
1. Peering vnet1 ↔ vnet4.
2. Da vm1: `ping` vm2 e vm3 (Run command).
3. Exclua o peering do lado da vnet3 e veja o status no lado da vnet2.
4. Adicione 10.31.0.0/16 à vnet1 com o peering ativo e use **Sync** no peering.
5. Crie a NIC do passo 3 e associe ip1 a uma VM, a uma NIC e à VNet.
6. Numa sub-rede /29, veja quantos IPs ficam livres.

## evidence
- Peerings: **Peering status** (Connected / Disconnected) e **Peering sync status**.
- Effective routes da NIC da vm1: rotas **VNet peering**.

## expected
| Teste | Resultado |
|---|---|
| Espaços sobrepostos | Peering negado (Q554, Q702) |
| vm1 → vm2 | OK; vm1 → vm3 não (não transitivo) (Q604, Q833) |
| Lado remoto excluído | Disconnected; recriar (Q624) |
| Address space novo | Aceito com sync do peering (Q564) |
| NIC em outra região | Erro (Q630) |
| /29 | 3 IPs utilizáveis (8 − 5) (Q1133) |

## variations
- **Q170–Q185:** tente mudar a NIC da vm1 para a vnet2: o portal só oferece sub-redes da mesma VNet.
- **Q1143:** peering com uma VNet do Azure Government ou China não é possível.

## breakit
Tente criar a sub-rede 10.21.1.0/24 duas vezes na mesma VNet: conflito de endereço.

## cleanup
`az group delete -n rg-az104-l21 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview
- https://learn.microsoft.com/en-us/azure/virtual-network/update-virtual-network-peering-address-space
- https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-network-interface

=== L22 | NSG e application security groups | A | 60
questions: Q033,Q582,Q574,Q576,Q578,Q720,Q596,Q618,Q898,Q648,Q706,Q198,Q731,Q791,Q841,Q839,Q837,Q562,Q209,Q801,Q620,Q656,Q658,Q696,Q1001
predict: Q731
## overview
Testa a avaliação de regras de NSG.

- NSG na sub-rede **e** na NIC: entrada passa pelo da sub-rede e depois pelo da NIC; saída, na ordem inversa; os dois precisam permitir (Q731, Q578).
- Prioridade menor vence; regras padrão (AllowVnetInBound, AllowAzureLoadBalancerInBound, DenyAllInBound) (Q648, Q198, Q574, Q720).
- NSG é **stateful**: a resposta de uma conexão permitida não é bloqueada (Q841).
- Um NSG serve várias sub-redes/NICs da mesma região (Q033, Q582, Q562); sem associação, não faz nada (Q596).
- **Service tags** (AzureKeyVault, Storage, AzureCloud) e **ASGs** associados às NICs (Q209, Q801, Q620).
- Porta de **destino** × origem; saída × entrada (Q898, Q706, Q618).

## steps
### 1. Rede e VMs
```bash
az group create -n rg-az104-l22 -l $LOC -o none
az network vnet create -g rg-az104-l22 -n vnet1 --address-prefix 10.40.0.0/16 --subnet-name s1 --subnet-prefix 10.40.1.0/24 -o none
az network vnet subnet create -g rg-az104-l22 --vnet-name vnet1 -n s2 --address-prefix 10.40.2.0/24 -o none
vm_teste rg-az104-l22 vm1 vnet1 s1
vm_teste rg-az104-l22 vm2 vnet1 s2
az network nsg create -g rg-az104-l22 -n nsg-s2 -o none
az network nsg create -g rg-az104-l22 -n nsg-vm2 -o none
az network vnet subnet update -g rg-az104-l22 --vnet-name vnet1 -n s2 --nsg nsg-s2 -o none
az network nic update -g rg-az104-l22 -n vm2VMNic --network-security-group nsg-vm2 -o none
```

### 2. Regras
```bash
# Bloqueia RDP vindo da s1 na NIC da vm2
az network nsg rule create -g rg-az104-l22 --nsg-name nsg-vm2 -n deny-rdp-s1 --priority 200 \
  --source-address-prefixes 10.40.1.0/24 --destination-port-ranges 3389 --access Deny --protocol Tcp
# Bloqueia ping de saída da s2
az network nsg rule create -g rg-az104-l22 --nsg-name nsg-s2 -n deny-ping-out --priority 111 --direction Outbound \
  --protocol Icmp --source-address-prefixes VirtualNetwork --destination-address-prefixes '*' --access Deny
```

### 3. ASG e service tag
@ Azure: Application security groups > Create **asg-web**; associe a NIC da vm1 (NIC > Application security groups).
Regra de saída no nsg-s2: destino **Service Tag = AzureKeyVault**, 443, Allow, prioridade 300; e Deny Internet 400.

## test
1. Libere ICMP no firewall do Windows das duas VMs (veja o ENV). Da vm1: `Test-NetConnection 10.40.2.4 -Port 3389` e `ping 10.40.2.4`.
2. Da vm2: `ping 10.40.1.4`; `Test-NetConnection <seu-vault>.vault.azure.net -Port 443` e `Test-NetConnection www.bing.com -Port 443`.
3. @ Azure: vm2 > Networking > **Effective security rules** (dos dois NSGs).
4. Network Watcher > **IP flow verify** para 10.40.1.4 → 10.40.2.4:3389.

## evidence
- Effective security rules mostrando NSG da sub-rede e da NIC.
- IP flow verify: **Access denied** + nome da regra.

## expected
| Teste | Resultado |
|---|---|
| RDP vm1 → vm2 | Bloqueado pela regra da NIC (Q731) |
| Ping da vm2 | Bloqueado pela regra de saída 111; uma regra Allow 110 da vm2 para a vm1 libera (Q706) |
| Key Vault × internet | Service tag liberada, internet negada (Q209, Q801) |
| Resposta de conexão permitida | Não é bloqueada (stateful) (Q841) |

## variations
- **Q582:** um único NSG com regras por IP de destino atende sub-redes diferentes.
- **Q656 / Q658 / Q696 / Q1001:** com a regra Allow de prioridade 100 já presente, mudanças no NSG não resolvem: o problema está fora dele.
- **Q562:** tente associar o nsg-s2 a uma sub-rede de outra região.

## breakit
Crie uma regra Allow 3389 com prioridade 4097: o portal rejeita (máximo 4096).

## cleanup
`az group delete -n rg-az104-l22 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- https://learn.microsoft.com/en-us/azure/virtual-network/network-security-group-how-it-works
- https://learn.microsoft.com/en-us/azure/virtual-network/service-tags-overview

=== L23 | Rotas definidas pelo usuário e NVA | B | 60
questions: Q1140,Q1141,Q733,Q900,Q716
predict: Q733
## overview
Testa route tables com uma VM fazendo papel de roteador.

- Route table associada a **sub-redes** da mesma região (Q1140).
- Next hop **Virtual appliance** exige IP; a NIC do NVA precisa de **IP forwarding** (Q1141, Q733).
- NVA desligado = tráfego descartado (Q733); forçar saída por firewall com 0.0.0.0/0 (Q900); rota na GatewaySubnet (Q716).

## steps
### 1. Rede com três sub-redes
```bash
az group create -n rg-az104-l23 -l $LOC -o none
az network vnet create -g rg-az104-l23 -n vnet1 --address-prefix 10.0.0.0/16 --subnet-name s1 --subnet-prefix 10.0.1.0/24 -o none
az network vnet subnet create -g rg-az104-l23 --vnet-name vnet1 -n s2 --address-prefix 10.0.2.0/24 -o none
az network vnet subnet create -g rg-az104-l23 --vnet-name vnet1 -n s3 --address-prefix 10.0.3.0/24 -o none
for i in 1 2 3; do vm_teste rg-az104-l23 vm$i vnet1 s$i Ubuntu2204; done
az network nic update -g rg-az104-l23 -n vm3VMNic --ip-forwarding true -o none
```
Na vm3 (Run command): `sudo sysctl -w net.ipv4.ip_forward=1`

### 2. Route table
```bash
NVA=$(az vm list-ip-addresses -g rg-az104-l23 -n vm3 --query [0].virtualMachine.network.privateIpAddresses[0] -o tsv)
az network route-table create -g rg-az104-l23 -n rt1 -o none
az network route-table route create -g rg-az104-l23 --route-table-name rt1 -n para-s1 --address-prefix 10.0.1.0/24 --next-hop-type VirtualAppliance --next-hop-ip-address $NVA -o none
az network route-table route create -g rg-az104-l23 --route-table-name rt1 -n para-s2 --address-prefix 10.0.2.0/24 --next-hop-type VirtualAppliance --next-hop-ip-address $NVA -o none
for s in s1 s2; do az network vnet subnet update -g rg-az104-l23 --vnet-name vnet1 -n $s --route-table rt1 -o none; done
```

## test
1. Da vm1: `tracepath -n 10.0.2.4` (o primeiro salto é a vm3).
2. Network Watcher > **Next hop** da vm1 para 10.0.2.4.
3. Pare a vm3 e repita o ping vm1 → vm2.
4. Tente associar a rt1 a uma NIC ou a uma sub-rede de outra região.

## evidence
- vm1 > Networking > Effective routes: origem **User**, next hop VirtualAppliance.

## expected
| Teste | Resultado |
|---|---|
| Next hop | VirtualAppliance 10.0.3.4 (Q733) |
| NVA desligado | Sem conectividade entre s1 e s2 (Q733) |
| Associação | Só sub-redes da mesma região (Q1140) |

## variations
- **Q900:** rota 0.0.0.0/0 → IP privado de um firewall para forçar a saída.
- **Q716:** com VPN gateway, a route table vai na **GatewaySubnet** com o prefixo da VNet.

## breakit
Desligue o IP forwarding da NIC da vm3: os pacotes chegam ao NVA e são descartados.

## cleanup
`az group delete -n rg-az104-l23 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview
- https://learn.microsoft.com/en-us/azure/network-watcher/next-hop-overview

=== L24 | Azure DNS: zonas públicas, privadas e DNS customizado | A | 60
questions: Q080,Q083,Q586,Q632,Q704,Q550,Q560,Q592,Q680,Q682,Q727,Q614,Q636,Q674,Q700,Q726,Q1045,Q886
predict: Q700
## overview
Testa a resolução de nomes no Azure.

- Zona **pública**: delegação no registrador (NS) e de subdomínio (registro NS na zona pai); importação de arquivo de zona pela **CLI** (Q080, Q083, Q586, Q632).
- Zona **privada**: virtual network links, **auto registration** (só registro A de IP privado, uma zona de registro por VNet, zonas são globais) (Q550, Q560, Q592, Q680, Q682, Q727).
- Só nomes com registro A/CNAME válido resolvem (Q704); reverso do DNS do Azure = `<vm>.internal.cloudapp.net` (Q674).
- DNS da **NIC** sobrepõe o da VNet; VNet com DNS customizado **não** consulta zonas privadas, a menos que o servidor encaminhe para 168.63.129.16 (Q636, Q614, Q700, Q726, Q1045).
- DC no Azure: IP estático na NIC e VNet com DNS customizado apontando para ele (Q886).

## steps
### 1. Rede e VMs
```bash
az group create -n rg-az104-l24 -l $LOC -o none
az network vnet create -g rg-az104-l24 -n vnet1 --address-prefix 10.24.0.0/16 --subnet-name s1 --subnet-prefix 10.24.1.0/24 -o none
az network vnet create -g rg-az104-l24 -n vnet2 --address-prefix 10.25.0.0/16 --subnet-name s1 --subnet-prefix 10.25.1.0/24 -o none
vm_teste rg-az104-l24 vm1 vnet1 s1 Ubuntu2204
vm_teste rg-az104-l24 vm2 vnet2 s1 Ubuntu2204
```

### 2. Zona privada
```bash
az network private-dns zone create -g rg-az104-l24 -n contoso.lab -o none
az network private-dns link vnet create -g rg-az104-l24 -z contoso.lab -n link-vnet1 -v vnet1 --registration-enabled true -o none
az network private-dns link vnet create -g rg-az104-l24 -z contoso.lab -n link-vnet2 -v vnet2 --registration-enabled false -o none
az network private-dns record-set a add-record -g rg-az104-l24 -z contoso.lab -n app -a 10.24.1.100 -o none
az network private-dns record-set cname set-record -g rg-az104-l24 -z contoso.lab -n web -c app.contoso.lab -o none
```

### 3. Zona pública e delegação
```bash
az network dns zone create -g rg-az104-l24 -n <seu-dominio> -o none
az network dns zone create -g rg-az104-l24 -n pesquisa.<seu-dominio> -o none
az network dns record-set ns add-record -g rg-az104-l24 -z <seu-dominio> -n pesquisa -d <ns1 da zona filha> -o none
az network dns zone import -g rg-az104-l24 -n <seu-dominio> -f zona.txt
```

### 4. DNS customizado
@ Azure: vnet2 > Settings > DNS servers > **Custom** — IP da vm1 (sem servidor DNS instalado, para ver a falha). Depois, só na NIC da vm2: DNS servers > **Inherit from virtual network**.

## test
1. Da vm1: `nslookup vm2.contoso.lab`, `nslookup vm1.contoso.lab`, `nslookup web.contoso.lab`, `nslookup 10.24.1.4`.
2. Da vm2 antes e depois do passo 4: `nslookup app.contoso.lab`.
3. Veja os registros criados automaticamente na zona.
4. `nslookup -type=NS <seu-dominio>` antes e depois de mudar os NS no registrador.

## evidence
- Zona privada > Recordsets: **Auto registered = True**.
- `resolvectl status` na VM (servidor 168.63.129.16 × customizado).

## expected
| Teste | Resultado |
|---|---|
| vm1 registrada | A com IP privado (Q550) |
| vm2 (link sem registro) | Resolve, mas não se registra (Q680) |
| Reverso | vm1.internal.cloudapp.net (Q674) |
| VNet com DNS customizado | Para de ver a zona privada (Q700, Q1045) |
| Zona pública | Só resolve na internet depois dos NS no registrador (Q632) |

## variations
- **Q682:** tente um segundo link com auto registration da vnet1 para outra zona: uma VNet só tem uma zona de registro.
- **Q886:** VM de DC: Windows em DHCP, IP estático na NIC do Azure, e o DNS da VNet apontando para ela.

## breakit
Crie um CNAME apontando para um nome inexistente e pingue o CNAME: a resolução falha.

## cleanup
`az group delete -n rg-az104-l24 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/dns/private-dns-autoregistration
- https://learn.microsoft.com/en-us/azure/dns/dns-delegate-domain-azure-dns
- https://learn.microsoft.com/en-us/azure/dns/dns-import-export
- https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-name-resolution-for-vms-and-role-instances

=== L25 | Azure Load Balancer | B | 75
questions: Q028,Q029,Q030,Q572,Q548,Q588,Q722,Q640,Q642,Q644,Q664,Q692,Q628,Q712,Q894,Q556,Q066,Q542
predict: Q644
## overview
Testa o Load Balancer Standard (o Basic foi aposentado em 2025).

- Componentes: frontend, **backend pool**, **health probe**, regra; inbound NAT rule para uma VM (Q722, Q588, Q548).
- Standard LB: IP público **Standard**; VMs sem IP público ou com IP Standard; **fechado por padrão** (precisa de NSG) (Q712, Q640–Q664, Q628, Q692).
- **Session persistence** Client IP / Client IP and protocol (Q572).
- **Floating IP** + probe TCP para o listener do SQL AG; HA ports para NVAs (Q028–Q030, Q556).
- ILB × Application Gateway (WAF para SQL injection) (Q066, Q542).

## steps
### 1. VMs com IIS
```bash
az group create -n rg-az104-l25 -l $LOC -o none
az network vnet create -g rg-az104-l25 -n vnet1 --address-prefix 10.25.0.0/16 --subnet-name s1 --subnet-prefix 10.25.1.0/24 -o none
az network nsg create -g rg-az104-l25 -n nsg-web -o none
az network nsg rule create -g rg-az104-l25 --nsg-name nsg-web -n http --priority 100 --destination-port-ranges 80 --access Allow --protocol Tcp -o none
az network vnet subnet update -g rg-az104-l25 --vnet-name vnet1 -n s1 --nsg nsg-web -o none
for i in 1 2; do
  vm_teste rg-az104-l25 web$i vnet1 s1
  az vm run-command invoke -g rg-az104-l25 -n web$i --command-id RunPowerShellScript \
    --scripts "Install-WindowsFeature Web-Server; Set-Content C:\inetpub\wwwroot\iisstart.htm \$env:COMPUTERNAME" -o none
done
```

### 2. Load balancer
```bash
az network public-ip create -g rg-az104-l25 -n lb-ip --sku Standard -o none
az network lb create -g rg-az104-l25 -n lb1 --sku Standard --public-ip-address lb-ip --frontend-ip-name fe1 --backend-pool-name pool1 -o none
az network lb probe create -g rg-az104-l25 --lb-name lb1 -n http --protocol Http --port 80 --path / -o none
az network lb rule create -g rg-az104-l25 --lb-name lb1 -n r80 --protocol Tcp --frontend-port 80 --backend-port 80 \
  --frontend-ip-name fe1 --backend-pool-name pool1 --probe-name http -o none
for i in 1 2; do az network nic ip-config address-pool add -g rg-az104-l25 --nic-name web${i}VMNic --ip-config-name ipconfigweb$i --lb-name lb1 --address-pool pool1 -o none; done
```

### 3. Inbound NAT rule
@ Azure: lb1 > Settings > Inbound NAT rules > + Add — porta 50001 → web1:3389 (libere 3389 no NSG só para o seu IP).

## test
1. Abra http://<lb-ip> várias vezes (atualize com Ctrl+F5) e veja web1/web2 alternando.
2. Session persistence = **Client IP** e repita.
3. Pare o IIS na web1 e veja o probe tirá-la do pool.
4. Associe um IP público **Basic** à web2 (ou tente criá-lo) e tente mantê-la no pool.
5. Tire o NSG da sub-rede: o LB para de responder.

## evidence
- lb1 > Monitoring > Insights / Metrics: **Health Probe Status** e **Data Path Availability**.

## expected
| Teste | Resultado |
|---|---|
| Sem persistência | Distribui entre as duas |
| Client IP | Mesmo servidor para o mesmo cliente (Q572) |
| Probe falhando | VM sai do balanceamento |
| IP Basic na VM | Incompatível com Standard LB (Q640, Q664) |
| Sem NSG permitindo | Tráfego bloqueado (Q628) |
| NAT 50001 | RDP só para a web1 (Q588) |

## variations
- **Q548:** duas regras NAT na mesma porta 3389 exigem **frontends diferentes**.
- **Q028–Q030:** ILB para SQL AG: probe TCP (ex.: 59999), regra 1433 com **Floating IP** e Session persistence None.

## breakit
Aponte o probe para /naoexiste: todas as VMs ficam "unhealthy" e o LB para de responder.

## cleanup
`az group delete -n rg-az104-l25 --yes --no-wait`

## refs
- https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview
- https://learn.microsoft.com/en-us/azure/load-balancer/distribution-mode-concepts
- https://learn.microsoft.com/en-us/azure/load-balancer/backend-pool-management
- https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-floating-ip

=== L26 | Azure Bastion | C | 45
questions: Q927,Q1038,Q974,Q884,Q1099,Q950,Q1036,Q1050,Q684,Q965
predict: Q1050
## overview
Testa o acesso RDP/SSH sem IP público.

- Sub-rede **AzureBastionSubnet** (/26 ou maior); IP público **Standard estático** (Q684, Q974, Q1099).
- Alcança VMs da VNet e de VNets **emparelhadas** (inclusive global), mas peering não é transitivo (Q1036, Q1050, Q927).
- **Basic**: só pelo portal; **Standard**: cliente nativo (`az network bastion rdp/ssh`), upload/download, host scaling (Q1038, Q950, Q965, Q1099).
- NSG: 443 de entrada na sub-rede do Bastion; 3389/22 nas VMs a partir dela (Q884).

## prereqs
- Classe C pelo custo: o Bastion Standard cobra por hora. Faça o lab de uma vez e apague. O **Developer** (gratuito) só atende a VNet dele.

## steps
### 1. Rede (reaproveite o L21 ou crie)
```bash
az group create -n rg-az104-l26 -l $LOC -o none
az network vnet create -g rg-az104-l26 -n vnet1 --address-prefix 10.26.0.0/16 --subnet-name s1 --subnet-prefix 10.26.1.0/24 -o none
az network vnet subnet create -g rg-az104-l26 --vnet-name vnet1 -n AzureBastionSubnet --address-prefix 10.26.255.0/26 -o none
vm_teste rg-az104-l26 vm1 vnet1 s1
```

### 2. Bastion Basic
@ Azure: vm1 > Connect > Bastion > Deploy Bastion (ou Bastions > Create, Tier **Basic**).

### 3. Upgrade e cliente nativo
@ Azure: (bastion) > Settings > Configuration — Tier **Standard**, marque **Native client support** e **IP-based connection**.

```bash
az network bastion rdp -g rg-az104-l26 -n <bastion> --target-resource-id $(az vm show -g rg-az104-l26 -n vm1 --query id -o tsv)
```

## test
1. Conecte pelo portal com o Basic; tente o `az network bastion rdp`.
2. Depois do upgrade: cliente nativo, upload de arquivo e **Instance count** (host scaling).
3. Emparelhe a vnet1 com outra VNet e conecte numa VM de lá; depois numa VNet emparelhada só com a segunda.

## expected
| Teste | Resultado |
|---|---|
| Cliente nativo no Basic | Não disponível (Q1038, Q965) |
| VNet emparelhada | Conecta; segunda VNet atrás da primeira não (Q1050) |
| Escala | Instance count só no Standard (Q950) |

## breakit
Crie a sub-rede com /27 ou outro nome: o portal não aceita para o Bastion.

## cleanup
Apague o Bastion primeiro (cobra por hora) e depois o RG.

## refs
- https://learn.microsoft.com/en-us/azure/bastion/configuration-settings
- https://learn.microsoft.com/en-us/azure/bastion/vnet-peering
- https://learn.microsoft.com/en-us/azure/bastion/native-client
