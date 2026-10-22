DET = {
"Q278": """1, 2 ou 4 :: LRS = 3 cópias síncronas no mesmo datacenter (ZRS = 3 cópias em 3 zonas; GRS = 6 cópias no total).
Performance / Account kind / Replication :: não reduzem o custo de armazenar dados pouco acessados.""",
"Q279": """appendBlob / pageBlob :: imagens são block blobs; page blobs são discos.
container1/* :: o wildcard não é sintaxe de prefixMatch.
finance (sem o container) :: o prefixo precisa começar pelo nome do container.
! O relatório de inventário (CSV ou Parquet) é gravado num container de destino configurado na política.""",
"Q280": """Service :: amplia o escopo para todo o serviço Blob.
Write / Delete / Add / Create :: excedem "enumerar e baixar".
List :: é o que permite enumerar. O gabarito do dump a omite, mas sem List não há listagem; se a prova pedir 3, pense em Container + List + Read (service SAS de container).
! Um **service SAS** no nível do container com permissões r + l é a forma mais limpa de "listar e baixar só do container1".""",
"Q281": """File1 em Cool em 6/6 :: Não. A Rule1 o arquivou no 3º dia.
File2 em Cool em 7/6 :: Sim. A Rule2 o moveu no 5º dia.
File2 em Archive em 16/6 :: Não. A exclusão em 10 dias vem antes.""",
"Q282": """Usuários só sem licença :: usuários podem ser excluídos com licença direta ou herdada; a licença volta para o pool.
Grupos com licença (Group1, Group3) :: o Entra bloqueia a exclusão de grupos com licença atribuída. Remova a licença do grupo antes.
! Usuário excluído fica 30 dias em "Deleted users" e pode ser restaurado com as licenças.""",
"Q283": """Data protection :: soft delete e versionamento; não tratam da rota de rede.
Public network access :: restringe origens, mas o acesso continua pelo endpoint público.
SAS :: autorização, não rede.
! Com private endpoint, crie a zona privatelink.blob.core.windows.net (ou use a integração com Private DNS) para o nome resolver o IP privado.""",
"Q284": """User1 (Reader) :: Não. Reader não tem dataActions e não lista chaves.
User2 (Storage Account Contributor) :: Não. Ele leria via listKeys, mas o acesso por chave está desabilitado.
User3 com a chave :: Não. allowSharedKeyAccess = false bloqueia chave e SAS assinado com chave.
! Com shared key desabilitado, só o Entra ID funciona; dê Storage Blob/File Data Reader ou Contributor.""",
"Q488": """Caso 1 = 1, 3, 4 ou 5 :: só os 5 minutos finais passam de 85%; uma ação de +1 a partir de 1 instância dá 2.
Caso 2 = 1, 2, 3 ou 5 :: depois de chegar a 5, os 9 minutos abaixo de 25% permitem só um scale-in (5 min de janela + 5 de cooldown), então ficam 4.
! Autoscale usa a estatística configurada (Max ou Average) sobre a janela de duração, e o cooldown começa após cada ação.""",
"Q490": """Arquivos no C: :: ficam no disco de SO gerenciado, que é persistente.
Proteção de tela / papel de parede :: ficam no perfil do usuário, no C:.
! O disco temporário também é apagado em resize, desalocação e manutenção com mudança de host. Nunca guarde dados ali (o pagefile é o uso ideal).""",
"Q492": """Memória / processador :: definidos pelo tamanho da VM no Azure, não pelo VHD.
Placas de rede :: o Azure cria a NIC; a configuração local não importa.
Integration Services :: pode ser preparado, mas o bloqueio é o formato VHDX.
! Requisitos: VHD fixo, tamanho alinhado a 1 MB, Geração 1 ou 2 conforme o caso, e sysprep para imagem generalizada. Convert-VHD -VHDType Fixed resolve.""",
"Q494": """Tamanho em 0, 1 ou 2 VMs :: com a política Automatic, a mudança do modelo vai para todas as instâncias ao mesmo tempo, com downtime.
Imagem em 0, 2 ou 4 VMs :: o automatic OS image upgrade usa lotes de até 20% (mínimo 1).
! Upgrade policy **Rolling** aplica as mudanças do modelo em lotes, com health probe/extensão de health.""",
"Q498": """Redeploy :: em App Service não existe "redeploy" que restaure a versão anterior; demoraria mais.
Clone :: cria outro app; não reverte o atual.
Restaurar backup :: funciona, mas é mais lento e sobrescreve conteúdo.
! O swap também carrega as configurações marcadas como "slot setting", que ficam presas ao slot.""",
"Q500": """Arquivos só na VM1 ou numa VM nova :: o script de File Recovery roda em qualquer máquina com SO compatível e acesso à internet.
VM para a VM2 ou outro computador :: a restauração de VM cria uma VM nova ou substitui os discos da VM1; não restaura sobre outra VM existente.""",
"Q502": """VM parada :: o backup de VM desligada é suportado (crash-consistent).
Disco não gerenciado :: também é suportado.
Vault indisponível :: geraria erro, não warning.
! Status do Pre-Check: Passed, Warning (pode falhar) e Critical (vai falhar). Conectividade de saída e o VM Agent são as causas comuns.""",
"Q504": """**Série "Solution" (trocar de host):** mudar de RG ou de assinatura não move a VM fisicamente. Só **Redeploy** (ou a manutenção self-service) atende.""",
"Q506": """FD 0, 1, 2 ou 4 :: o máximo em East US é 3. Use menos só se a região tiver 2.
UD 10 :: válido, mas não é o máximo.
UD 25 a 50 :: acima do limite de 20.
! Com managed disks, o FD do availability set também alinha os clusters de storage dos discos.""",
"Q508": """**Série "Solution" (alerta de eventos):** atende quando há **workspace + coleta do System log + agente na VM + alerta de log** (com o agente instalado manualmente ou como extensão). Não atende com storage como fonte ou com event subscription.
! A consulta seria Event | where EventLog == "System" and EventLevelName == "Error" | summarize count() by bin(TimeGenerated, 1h), com limite > 2.""",
"Q510": """9:15 com 2 :: a regra já disparou às 9:10 (10 min acima de 75%).
9:15 com 4 ou 5 :: o próximo disparo precisa de outra janela completa mais o cooldown.
11:00 com 2 a 4 :: em 60 minutos a redução acontece várias vezes, até chegar ao mínimo de 1.""",
"Q512": """Só uma região :: não há restrição de região para planos Linux entre essas.
! A antiga limitação (Windows e Linux no mesmo RG e região) foi removida na maioria dos cenários.""",
"Q516": """New-AzVm :: cria a VM sem template.
New-AzResource :: cria um recurso genérico por JSON de propriedades, não um template ARM completo.
New-AzTemplateSpec :: publica o template como template spec; não implanta.
-Tag / -GroupName / -Subscription :: não definem o RG de destino da implantação.
! CLI: az deployment group create -g RG1 --template-file vm.json.""",
"Q520": """**Série "Solution":** a extensão de VM é a forma padrão de instalar o agente em VMs do Azure, e atende. Hoje: AMA (AzureMonitorWindowsAgent) + DCR.""",
"Q522": """**Série "Solution":** workspace + coleta do log System + agente + alerta de log = atende.""",
"Q524": """Windows Server Backup :: o MARS não depende dele, e ele não lê o vault.
MARS na VM1 :: a VM1 já tem o agente; a restauração acontece na VM2.
! Na VM2: registre no mesmo vault com as credenciais e use Recover Data > Another server, informando a passphrase de criptografia da VM1.""",
"Q526": """copyIndex como propriedade :: copyIndex() é uma função usada dentro do loop, não a declaração.
dependsOn :: define ordem de implantação, não repetição.
"[copy" :: copy é um elemento, não uma função de expressão.
! Copy de propriedade: { "name": "dataDisks", "count": N, "input": { "lun": "[copyIndex('dataDisks')]" … } }.""",
"Q528": """**Série "Solution" (NIC2 para a VM1):** vale qualquer RG, desde que a NIC fique na **mesma região** da VM e da VNet (West US). RG1/West US e RG2/West US atendem; Central US, não.""",
"Q530": """**Série "Solution":** Central US ≠ West US. NIC, VM e VNet precisam estar na mesma região.""",
"Q532": """**Série "Solution":** RG2 + West US atende. A NIC pode ficar em outro RG, mas a VM precisa estar desalocada para anexar a nova NIC.""",
"Q534": """New-AzResource :: cria um recurso só, sem template.
New-AzResourceGroupDeployment :: exige um RG existente como escopo e não cria RGs.
New-AzTenantDeployment :: escopo do tenant (ex.: management groups); excessivo.
! Escopos: RG → New-AzResourceGroupDeployment; assinatura → New-AzDeployment (New-AzSubscriptionDeployment); MG → New-AzManagementGroupDeployment; tenant → New-AzTenantDeployment.""",
"Q536": """Backup vault / Recovery Services vault :: o backup customizado do App Service grava num storage account seu.
Resource group :: já existe junto com o app.
Backup policy / lock / WebJob :: não excluem pastas do backup.
! Além do backup customizado (com storage seu), existe o backup automático da plataforma; o _backup.filter vale para o backup customizado.""",
}
