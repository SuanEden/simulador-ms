=== L27 | Azure Monitor: métricas, logs, KQL e alertas | B | 90
questions: Q036,Q062,Q781,Q797,Q1069,Q773,Q154,Q165,Q508,Q520,Q522,Q813,Q933,Q785,Q1071,Q1077,Q1057,Q197,Q935,Q1105,Q747,Q189,Q745,Q954,Q904,Q913,Q982,Q052
predict: Q745
## overview
Testa a coleta e a análise de dados no Azure Monitor e a cadeia alerta → action group.

- **Métricas** (Metrics) × **logs** (Log Analytics, KQL); Activity log da assinatura enviado ao workspace (Q036, Q797, Q781).
- KQL: `search in (Event) "error"`, `Event | where ...`, `AzureActivity | project ...` (Q062, Q781).
- **Diagnostic settings** de recursos → workspace para consultar (Q1069).
- **Azure Monitor Agent** + **DCR**: eventos (filtro **XPath**), contadores, logs do IIS (exige **DCE**), vários workspaces; AMPLS para tráfego privado (Q933, Q785, Q1071, Q1077, Q1057, Q813, Q154–Q522, Q197).
- Alerta de log usa o workspace; alerta de activity log = escopo + condição + action group; uma regra por sinal (Q773, Q954, Q904, Q745).
- **Action groups**: e-mail, SMS (1 a cada 5 min), função, ITSM; e-mail por ARM role (Q935, Q1105, Q189, Q747, Q052).
- **Alert processing rules** suprimem notificações; estado do alerta (New/Acknowledged/Closed) (Q913, Q982).

## steps
### 1. Workspace e VM
```bash
az group create -n rg-az104-l27 -l $LOC -o none
az monitor log-analytics workspace create -g rg-az104-l27 -n az104-l27-law -o none
az network vnet create -g rg-az104-l27 -n vnet1 --address-prefix 10.27.0.0/16 --subnet-name s1 --subnet-prefix 10.27.1.0/24 -o none
vm_teste rg-az104-l27 vm1 vnet1 s1
```

### 2. DCR com eventos e contadores
@ Azure: Monitor > Settings > Data Collection Rules > + Create — recurso: vm1 (instala o AMA); fontes:

- **Windows Event Logs** > Custom: `System!*[System[(Level=1 or Level=2 or EventID=1001)]]`
- **Performance Counters** > `\LogicalDisk(C:)\Free Megabytes`
- Destino: az104-l27-law.

### 3. Activity log da assinatura
@ Azure: Monitor > Activity log > Export Activity Logs > + Add diagnostic setting — categorias Administrative, Policy; destino az104-l27-law.

### 4. Action group e alertas
@ Azure: Monitor > Alerts > Action groups > + Create — **ag-l27**: e-mail para você e **Email Azure Resource Manager Role** = Monitoring Reader.

- Alerta de **log**: `Event | where EventLevelName == "Error" | where Computer startswith "vm1"`, mais de 2 em 1 h.
- Alerta de **métrica**: CPU > 80% da vm1.
- Alerta de **activity log**: *Delete Management Locks* na assinatura.

### 5. Alert processing rule
@ Azure: Monitor > Alerts > Alert processing rules > + Create — escopo Sub-Lab, **Suppress notifications**, janela de 1 hora a partir de agora.

## test
1. Na vm1 (Run command): `eventcreate /T ERROR /ID 1001 /L SYSTEM /D "teste lab"` três vezes.
2. Rode as consultas abaixo no workspace.
3. Crie e apague um lock; veja o alerta disparar sem e-mail (supressão ativa) e depois com e-mail.
4. Mude o estado de um alerta fechado para New.

```kusto
search in (Event) "error"
Event | where EventID == 1001 | project TimeGenerated, Computer, RenderedDescription
AzureActivity | where Level == "Critical" or OperationNameValue contains "locks" | project TimeGenerated, OperationNameValue, _ResourceId
Perf | where CounterName == "Free Megabytes" | summarize avg(CounterValue) by bin(TimeGenerated, 5m)
```

## evidence
- Monitor > Alerts: alerta **Fired** com Notification suppressed.
- Workspace > Tables: Event, Perf, AzureActivity.

## expected
| Teste | Resultado |
|---|---|
| Eventos 1001 | Chegam pelo filtro XPath (Q1071) |
| Alerta de log | Recurso de destino: o workspace (Q773) |
| Supressão | Alerta aparece; notificação não (Q913) |
| ARM role | E-mail para usuários e grupos da função (Q747) |
| Estado do alerta | Pode voltar de Closed para New (Q982) |

## variations
- **Q1077:** colete logs do IIS: a DCR pede um **data collection endpoint**.
- **Q933:** uma DCR por workspace, ou dois destinos na mesma DCR.
- **Q745:** monte as regras e action groups da questão (sinais e destinatários diferentes).

## breakit
Tire a VM da DCR (Resources > Delete): os dados param de chegar, mas o agente continua instalado.

## cleanup
Apague as regras de alerta, a alert processing rule, a diagnostic setting da assinatura e o RG.

## refs
- https://learn.microsoft.com/en-us/azure/azure-monitor/agents/data-collection-rule-azure-monitor-agent
- https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups
- https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-processing-rules
- https://learn.microsoft.com/en-us/azure/azure-monitor/logs/get-started-queries

=== L28 | Network Watcher, flow logs e Traffic Analytics | B | 75
questions: Q634,Q939,Q616,Q831,Q668,Q688,Q686,Q690,Q694,Q892,Q1073,Q180,Q829,Q911,Q937,Q1075,Q1103,Q073,Q074,Q075,Q089,Q552
predict: Q688
## overview
Testa as ferramentas de diagnóstico de rede.

- **IP flow verify** (qual regra bloqueia), **Next hop**, **Connection troubleshoot** (teste pontual), **Connection monitor** (latência/RTT ao longo do tempo; regional; agente AMA para on-premises) (Q634, Q939, Q616, Q831, Q668, Q892, Q1073).
- **Packet capture** inspeciona o tráfego; métricas e Connection monitor não (Q686, Q688, Q690, Q694).
- **Flow logs** (VNet flow logs; NSG flow logs em aposentadoria) em storage **da mesma região**; **Traffic Analytics** com Log Analytics; Network Insights (Q180, Q829, Q911, Q937, Q1075, Q1103, Q552).
- Habilitar Traffic Analytics: Owner, Contributor ou Network Contributor (Q073–Q075, Q089).

## steps
### 1. Duas VMs Linux
```bash
az group create -n rg-az104-l28 -l $LOC -o none
az network vnet create -g rg-az104-l28 -n vnet1 --address-prefix 10.28.0.0/16 --subnet-name s1 --subnet-prefix 10.28.1.0/24 -o none
for i in 1 2; do vm_teste rg-az104-l28 vm$i vnet1 s1 Ubuntu2204; done
for i in 1 2; do az vm extension set -g rg-az104-l28 --vm-name vm$i -n NetworkWatcherAgentLinux --publisher Microsoft.Azure.NetworkWatcher -o none; done
az network nsg create -g rg-az104-l28 -n nsg1 -o none
az network nsg rule create -g rg-az104-l28 --nsg-name nsg1 -n deny8080 --priority 100 --destination-port-ranges 8080 --access Deny --protocol Tcp -o none
az network vnet subnet update -g rg-az104-l28 --vnet-name vnet1 -n s1 --nsg nsg1 -o none
```

### 2. Ferramentas pontuais
@ Azure: Network Watcher > Network diagnostic tools > **IP flow verify** (vm1 → vm2:8080), **Next hop**, **Connection troubleshoot**.

### 3. Connection monitor
@ Azure: Network Watcher > Monitoring > Connection monitor > + Create — origem vm1, destino vm2 TCP 22, frequência 30 s.

### 4. Packet capture
@ Azure: Network Watcher > Network diagnostic tools > Packet capture > + Add — vm1, filtro para o IP da vm2, duração 10 min, destino storage account.

### 5. Flow logs e Traffic Analytics
```bash
ST=az104l28st$RANDOM; az storage account create -g rg-az104-l28 -n $ST --sku Standard_LRS -l $LOC -o none
az monitor log-analytics workspace create -g rg-az104-l28 -n az104-l28-law -o none
az network watcher flow-log create -g rg-az104-l28 -n fl-vnet1 -l $LOC --vnet vnet1 --storage-account $ST \
  --retention 30 --traffic-analytics true --workspace az104-l28-law --interval 10
```

## test
1. IP flow verify e Connection troubleshoot de vm1 para vm2 nas portas 22 e 8080.
2. Veja o RTT no Connection monitor.
3. Baixe o .cap do packet capture e abra no Wireshark.
4. Crie um flow log com um storage de **outra região**.
5. Depois de ~1 h, abra Traffic Analytics e Network Insights.

## evidence
- IP flow verify: **Access denied** + regra `deny8080`.
- Connection monitor: Round-trip time (ms) e % de checks com falha.

## expected
| Teste | Resultado |
|---|---|
| Qual regra bloqueia | IP flow verify (Q634) |
| Teste pontual de conexão | Connection troubleshoot (Q634, Q939) |
| RTT ao longo do tempo | Connection monitor (Q668) |
| Conteúdo do tráfego | Só o packet capture (Q686, Q688) |
| Storage de outra região | Não aceito para flow logs (Q829) |

## variations
- **Q073–Q089:** tente habilitar Traffic Analytics com um usuário **Reader**: sem permissão de escrita, falha.
- **Q1073:** para um servidor on-premises no Connection monitor, instale o **Azure Monitor Agent** via Azure Arc.

## breakit
Remova a extensão Network Watcher da vm1: o Connection monitor e o packet capture passam a falhar para ela.

## cleanup
Pare o packet capture e o connection monitor; apague o flow log e o RG.

## refs
- https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-overview
- https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-overview
- https://learn.microsoft.com/en-us/azure/network-watcher/traffic-analytics
- https://learn.microsoft.com/en-us/azure/network-watcher/connection-monitor-overview

=== L29 | Azure Backup de VMs | B | 90
questions: Q037,Q741,Q190,Q743,Q771,Q1055,Q1053,Q749,Q216,Q502,Q034,Q035,Q500,Q753,Q783,Q769,Q136,Q122,Q055,Q819,Q999
predict: Q749
## overview
Testa o ciclo completo de backup de VMs no Recovery Services vault.

- Vault na **mesma região** das VMs; uma VM por vault; VMs ligadas ou desligadas (Q190, Q743, Q037, Q741, Q136).
- Redundância do vault (LRS/GRS/**ZRS**) antes do primeiro item protegido (Q216).
- Políticas Standard × **Enhanced** (Trusted launch); retenção diária/semanal/mensal/anual (Q1055, Q1053, Q749, Q771).
- Restore: **Create new**, **Replace existing** (troca os discos), restore de discos; **File Recovery** por script em qualquer máquina compatível (Q034, Q035, Q500, Q753, Q783, Q769).
- Pre-Check (agente desatualizado = Warning) (Q502); excluir vault: parar backup e apagar dados (Q122, Q055); **MUA** com Resource Guard (Q999); Q819.

## steps
### 1. Vault e VM
```bash
az group create -n rg-az104-l29 -l $LOC -o none
az backup vault create -g rg-az104-l29 -n az104-l29-rsv -l $LOC -o none
az backup vault backup-properties set -g rg-az104-l29 -n az104-l29-rsv --backup-storage-redundancy ZoneRedundant -o none
az network vnet create -g rg-az104-l29 -n vnet1 --address-prefix 10.29.0.0/16 --subnet-name s1 --subnet-prefix 10.29.1.0/24 -o none
vm_teste rg-az104-l29 vm1 vnet1 s1
```

### 2. Política e proteção
@ Azure: az104-l29-rsv > Manage > Backup policies > + Add > Azure Virtual Machine — **Enhanced**, diário 01:00, retenção diária 5 dias, semanal domingo 20 semanas, mensal dia 2, anual 9 de janeiro.

@ Azure: vm1 > Operations > Backup — vault az104-l29-rsv, política acima > **Backup now**.

### 3. Restore
Depois do primeiro ponto:

- @ Azure: vm1 > Backup > **File Recovery** — baixe o script e rode em outra VM Windows.
- @ Azure: vm1 > Backup > **Restore VM** — Create new (outra VM) e, em outro teste, **Replace existing**.

## test
1. Crie um arquivo na vm1 depois do backup, redimensione a VM e adicione um disco; faça **Replace existing**.
2. Tente proteger a vm1 em um segundo vault.
3. Tente excluir o vault com o item protegido.
4. Tente mudar a redundância do vault depois do primeiro backup.
5. Monte a tabela de pontos de recuperação esperados para 8 e 15 de janeiro (Q749) e confira com a política.

## evidence
- Vault > Backup items > (vm1) > Restore points (Snapshot / Snapshot and Vault).
- Vault > Backup jobs.

## expected
| Teste | Resultado |
|---|---|
| Replace existing | Discos voltam; tamanho e disco novo continuam; arquivo novo some (Q753) |
| Segundo vault | Bloqueado até parar o backup no primeiro (Q136) |
| Excluir vault | Bloqueado até parar o backup e apagar os dados (Q122) |
| Redundância após o 1º backup | Não muda (Q216) |
| File Recovery | Script roda em outra máquina compatível (Q034, Q500) |

## variations
- **Q999:** crie um **Resource Guard** (de preferência em outra assinatura) e associe ao vault para MUA.
- **Q190 / Q743:** crie uma VM em West US e procure o vault de East US na tela de Backup da VM.

## breakit
Desligue e desaloque a vm1 e rode o Backup now: o backup funciona (crash-consistent).

## cleanup
```bash
az backup protection disable -g rg-az104-l29 -v az104-l29-rsv -c vm1 -i vm1 --backup-management-type AzureIaasVM --delete-backup-data true --yes
az group delete -n rg-az104-l29 --yes --no-wait
```
! Se o soft delete estiver ativo, os dados ficam 14 dias em soft delete e o vault só é apagado depois.

## refs
- https://learn.microsoft.com/en-us/azure/backup/backup-azure-arm-vms-prepare
- https://learn.microsoft.com/en-us/azure/backup/backup-azure-arm-restore-vms
- https://learn.microsoft.com/en-us/azure/backup/backup-azure-restore-files-from-vm
- https://learn.microsoft.com/en-us/azure/backup/multi-user-authorization

=== L30 | Backup vault, Azure Files, MARS e Site Recovery | B | 90
questions: Q1059,Q799,Q524,Q877,Q123,Q811,Q133
predict: Q1059
## overview
Testa o que fica em cada vault e o failover com Site Recovery.

- **Recovery Services vault**: VMs, Azure Files, SQL/SAP em VM, MARS; **Backup vault**: discos, blobs, PostgreSQL (Q1059, Q123).
- Backup de **disco** no Backup vault com permissões para a managed identity do vault (Q799).
- Vaults por região e políticas por tipo de item (Q811); relatórios via diagnostic settings (storage na mesma região, workspace em qualquer uma) (Q133).
- **MARS**: arquivos e pastas; restaurar em outro servidor com o agente instalado e registrado (Q524).
- **Site Recovery**: replicação entre regiões, test failover e mapeamento de sub-rede (Q877).

## steps
### 1. Backup vault e disco
```bash
az group create -n rg-az104-l30 -l $LOC -o none
az dataprotection backup-vault create -g rg-az104-l30 --vault-name az104-l30-bv -l $LOC \
  --storage-settings datastore-type=VaultStore type=LocallyRedundant --type SystemAssigned -o none
az disk create -g rg-az104-l30 -n disco-teste --size-gb 8 -o none
```
@ Azure: az104-l30-bv > + Backup > Azure Disks — escolha o disco; o portal mostra as permissões que faltam (**Disk Backup Reader** no disco, **Disk Snapshot Contributor** no RG de snapshots). Clique em **Assign missing roles**.

### 2. Azure Files no Recovery Services vault
@ Azure: (vault do L29 ou novo) > + Backup > Azure Files — escolha um share do L13/L10.

### 3. MARS (opcional)
@ Azure: (vault) > + Backup > On-Premises > Files and folders — baixe o agente e as credenciais do vault, instale em um servidor do lab, faça backup de uma pasta e restaure em **outro** servidor (Recover Data > Another server).

### 4. Site Recovery
@ Azure: (vm do L29) > Operations > **Disaster recovery** — região de destino West US; deixe o portal criar a VNet de destino. Depois de replicar: @ Azure: (vault de destino) > Replicated items > (vm) > **Test failover**, escolhendo uma VNet de teste com várias sub-redes.

## test
1. Tente proteger um blob no Recovery Services vault e um share no Backup vault.
2. Tire o Disk Snapshot Contributor da identidade do vault e rode o backup do disco.
3. Veja em qual sub-rede a VM de teste foi criada no test failover.

## expected
| Teste | Resultado |
|---|---|
| Blob | Só no Backup vault; share só no Recovery Services vault (Q1059) |
| Sem permissão na identidade | Backup do disco falha (Q799) |
| Test failover | Sub-rede com o mesmo nome da origem, ou a primeira em ordem alfabética (Q877) |

## cleanup
Faça **Cleanup test failover**, desabilite a replicação, pare os backups com exclusão de dados e apague os RGs (inclusive o RG "-asr" de destino).

## refs
- https://learn.microsoft.com/en-us/azure/backup/backup-vault-overview
- https://learn.microsoft.com/en-us/azure/backup/backup-managed-disks
- https://learn.microsoft.com/en-us/azure/backup/backup-azure-restore-windows-server
- https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-enable-replication
