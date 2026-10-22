DET = {
"Q159": """Automation account :: com DSC funcionaria, mas não é o par pedido (script + extensionProfile).
Azure Policy :: audita ou impõe configuração; não instala o IIS no provisionamento.
Criar scale set pelo portal :: é manual e não faz parte da automação do template.
! As extensões no extensionProfile rodam em toda instância nova, inclusive nas criadas pelo autoscale.""",
"Q162": """Escolher West US na implantação :: o parâmetro de location não é usado pelo recurso, que tem o valor fixo.
Alterar a variável :: o recurso também não referencia a variável.
! Boa prática: "location": "[parameters('location')]" com defaultValue "[resourceGroup().location]".""",
"Q163": """Application settings :: configuração do app; não habilita slots.
Custom domain :: não tem relação com slots.
Scale out :: aumenta instâncias, mas mantém o tier; slots dependem do tier (scale up).
! Limites: Standard = 5 slots, Premium = 20, Isolated = 20. Free, Shared e Basic não têm slots.""",
"Q164": """Scale set com 10 ou 12 instâncias :: sem domínios configurados, a manutenção da plataforma não garante 8 de pé (o gabarito prefere o availability set com 10 UDs).
3 FDs e 1 UD :: com 1 update domain, todas as VMs reiniciariam juntas.
! Com N VMs em N UDs (até 20), a manutenção derruba no máximo 1 VM por vez.""",
"Q165": """**Série "Solution":** event subscription (Event Grid) reage a eventos do Azure Resource Manager, não ao Event Log dentro do SO. Use **AMA + DCR → Log Analytics → alerta de log**.""",
"Q166": """**Série "Solution" (sair do host imediatamente):** só **Redeploy** atende. Mover de assinatura e habilitar Update Management não trocam o host.
! Redeploy perde o conteúdo do disco temporário (D: no Windows) e pode mudar o IP público dinâmico.""",
"Q167": """**Série "Solution":** Redeploy desliga a VM, move para um novo host e liga de novo. Outras opções para manutenção: **Maintenance > Start maintenance** (self-service) ou uma Maintenance Configuration.""",
"Q168": """**Série "Solution":** Update Management (hoje **Azure Update Manager**) aplica patches do SO convidado; não tem relação com o host físico.""",
"Q169": """Connection string :: configuração de banco do app.
Certificado :: só é necessário para HTTPS, depois que o domínio existe (ou use o certificado gerenciado gratuito).
Parar o app :: desnecessário.
! Além do CNAME/A, o App Service pede o TXT asuid.<sub> com o Custom Domain Verification ID.""",
"Q170": """**Série "Solution" (VM1 para a VNET2):** a VNET2 está em **outra região**, e NIC, VM e VNet precisam estar na mesma região. Só **excluir e recriar a VM** atende.
! Para levar a VM entre regiões, use Azure Resource Mover ou Site Recovery, ou recrie a VM a partir de um snapshot copiado.""",
"Q171": """**Série "Solution":** recriar a VM é o caminho. Para manter os dados, crie snapshots dos discos, copie-os para a região da VNET2 e crie a VM a partir deles.""",
"Q172": """**Série "Solution":** todas as NICs de uma VM ficam na mesma VNet. Mesmo desligada, a VM não aceita uma NIC de outra VNet nem de outra região.""",
"Q173": """VM3 :: Sim. 18 + 1 = 19 ≤ 20.
VM4 / VM5 :: Não. Estouram a cota **Total Regional vCPUs**, mesmo que a cota da família permitisse.
! VM parada e **desalocada** ainda conta na cota. Para liberar a cota, exclua a VM ou peça aumento em Quotas.""",
"Q174": """7 / 10 / 14 na manutenção :: as UDs reiniciam uma de cada vez; com 14 VMs em 10 UDs, a maior UD tem 2 VMs.
2 / 10 / 14 no rack :: as VMs são divididas entre 2 fault domains (7 e 7); a falha de um rack derruba um FD inteiro.""",
"Q176": """Application Gateway (1 ou 5) / Traffic Manager :: são opcionais; o pré-requisito é o plano.
10 App Service plans :: funcionaria, mas multiplica o custo.
! Você paga pelo plano (instâncias), não pelo número de apps; muitos apps no mesmo plano dividem CPU e memória.""",
"Q177": """Não conectar / só Windows :: o IP é público, e o cliente acessa por HTTP de qualquer SO.
Reinício manual / reimplantar :: OnFailure reinicia automaticamente quando o processo sai com erro.
! restartPolicy: Always (padrão), OnFailure ou Never.""",
"Q178": """Desired State Configuration / Puppet Agent :: extensões são instaladas com a VM em execução.
Disco de 500 GB :: discos de dados são anexados a quente.
! Redimensionar sempre reinicia a VM. Se o tamanho não estiver no cluster atual, é preciso desalocar antes.""",
"Q179": """Implantar direto em prod :: os usuários veriam a atualização antes do teste.
Parar prod / parar test :: não ajuda a testar nem a publicar.
! "Swap with preview" aplica as configurações do destino e permite validar antes de concluir a troca.""",
"Q180": """Habilitar o Network Watcher manualmente :: hoje ele é criado automaticamente quando há uma VNet na região (o gabarito considera feito).
Connection monitor :: testa conectividade; não registra todas as tentativas de conexão.
Provedor "MicrosoftLogAnalytics" :: não existe com esse nome; o provedor exigido é Microsoft.Insights.
! O NSG flow log não pode ser criado desde junho de 2025 (aposentadoria em 2027). Use **VNet flow logs**.""",
"Q181": """5 VMs avulsas (zonas ou tamanho) :: mais lento e manual.
Modo VM (Flexible) :: em versões antigas exigia criar as VMs separadamente; o gabarito escolhe o modo Uniform (ScaleSetVM).
! Hoje o modo **Flexible** é o padrão e o recomendado para cargas novas: mistura tamanhos e suporta zonas e availability sets.""",
"Q182": """1 plano :: um plano não roda Windows e Linux ao mesmo tempo.
3 ou 4 planos :: apps do mesmo SO e região podem dividir o plano.
! .NET Framework (4.x) = Windows. Ruby = Linux. .NET Core/.NET 8, PHP, Node e Python rodam nos dois.""",
"Q183": """VMs desligadas :: budget não desliga nada sozinho; seria preciso uma automação no action group (runbook ou Logic App).
Dois ou três e-mails :: só o limite de 50% é atingido pelo custo do RG1; o VM2 está fora do escopo.
! Budgets avaliam o custo real ou previsto (forecast); os alertas podem levar algumas horas para disparar.""",
"Q184": """**Série "Solution" (data e hora de criação no RG1):** Programmatic deployment e Resource providers **não** servem. **RG1 > Deployments** mostra cada implantação com data e hora (o Activity Log também, por 90 dias).""",
"Q185": """**Série "Solution":** uma NIC criada na VNET2 fica na região da VNET2, e a VM1 não pode usar NIC de outra região. Recriar a VM é o caminho.""",
"Q187": """RG2 (ReadOnly) :: Não. O move escreve no RG de destino, e ReadOnly bloqueia qualquer escrita.
RG3 (Delete lock) :: Sim. O lock Delete só bloqueia exclusão.
RG4 :: Sim. Sem lock, e App Service suporta move entre assinaturas (o plano vai junto).
! Locks no RG de origem também contam: ReadOnly na origem impede tirar recursos de lá.""",
"Q188": """RG1 com tag2 :: a definição para recursos não avalia resource groups.
storage1 sem tag2 :: o storage foi criado depois da atribuição, então o append adiciona tag2.
storage1 com tag1 :: tags do RG não são herdadas.""",
"Q189": """0, 4 ou 6 e-mails :: o limite de e-mail (100/h por endereço) não é atingido com 60 alertas.
60 SMS :: o limite é 1 SMS a cada 5 minutos por número.
! Chamadas de voz têm o mesmo limite do SMS: 1 a cada 5 minutos por número.""",
"Q190": """VM1 só / VM1 e VM3 :: VMs de outro resource group (VMA, VMC) também podem usar o vault, desde que estejam na mesma região.
Todas :: VM2 e VMB estão em outra região.
! Para outra região, crie um vault nela. Cross Region Restore só se aplica à restauração, não à proteção.""",
"Q193": """Proximity1 / Proximity3 :: estão em outras regiões; o PPG define a proximidade dentro de um datacenter da mesma região.
! O PPG reduz a latência entre VMs, mas limita a disponibilidade de tamanhos; combine com zonas com cuidado.""",
"Q194": """**Série "Solution":** Resource providers só lista os namespaces registrados. Para data e hora de criação: **RG1 > Deployments** ou o Activity Log.""",
}
