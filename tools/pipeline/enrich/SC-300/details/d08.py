DET = {
"Q241": """Aprovação automática para o User1 :: Não. O único aprovador é ele mesmo, e ninguém aprova a própria solicitação.
User1 aprova a Role2 :: Não. A Role2 não exige aprovação.
Justificativa ao aprovar :: Sim. O PIM pede justificativa do aprovador.
! Defina pelo menos dois aprovadores para evitar solicitações travadas.""",
"Q242": """Admin1 / Admin3 / Admin4 :: pela tabela, não têm Application Administrator (ou têm funções mais amplas, como Global).
Cloud Application Administrator para o conector :: essa função não gerencia o Application Proxy.
Application/Cloud Application Administrator ou Global para o User1 :: mais amplos que o necessário para registrar.
! O conector é registrado no tenant com as credenciais de quem instala.""",
"Q243": """User1 incluindo o User2 :: o User2 é Global Reader, e o Password Administrator não redefine senha de Global Reader.
User4 com User1/User2 :: administradores com escopo de AU não gerenciam usuários que têm funções atribuídas.
! A tabela "Who can reset passwords" na documentação de funções privilegiadas define exatamente quem cada função atinge.""",
"Q244": """Defender for Cloud Apps / M365 admin center / Defender portal :: não fazem a ativação de funções do PIM.
! Atalho: My roles (https://aka.ms/myroles) ou PIM > My roles > Eligible assignments > Activate.""",
"Q245": """Sign-in logs :: exigiriam filtrar e calcular a taxa à mão.
Access reviews / audit logs :: não mostram estatísticas de login.
! Usage & insights também mostra o uso de métodos de autenticação e a atividade de service principals.""",
"Q246": """Management group / resource group :: escopos do Azure RBAC, não de usuários do Entra.
Microsoft 365 group :: não delimita a administração.
! Depois de criar a AU, atribua User administrator com escopo nela (e use associação dinâmica por department -eq "Marketing").""",
"Q247": """Security / Privileged Role / External Identity Provider administrator :: não gerenciam access packages.
User administrator :: o gabarito antigo marca, mas o correto hoje é Identity Governance administrator (ou papéis do catálogo).
! Papéis do catálogo: Catalog owner, Catalog reader, Access package manager e Access package assignment manager.""",
"Q248": """extend / project / print :: não agregam contagem.
render no primeiro / summarize no segundo :: summarize agrega e render desenha.
! Exemplo completo: SigninLogs | where ResultType == 0 | summarize login_count = count() by Identity | render columnchart.""",
"Q249": """CA / access policy :: exigiriam rotear todo o tráfego pelo proxy; mais esforço.
App configuration do Intune :: configura apps móveis.
! Marcar como unsanctioned também permite gerar um script de bloqueio para firewalls ou proxies, ou bloquear via integração com o Defender for Endpoint.""",
"Q250": """Azure resources :: funções do Azure RBAC.
Privileged access groups :: PIM for Groups.
Review access :: access reviews.""",
"Q251": """-ne :: pegaria quem **tem** departamento.
-match / -notIn :: comparam padrões ou listas, não vazio.
"" / $null / "null" :: a sintaxe das regras usa null sem aspas nem $.""",
"Q254": """SMS / voz / e-mail OTP :: não são habilitados pelos security defaults (que usam o Authenticator).
! Os security defaults também bloqueiam autenticação legada e exigem MFA para administradores em todo login.""",
"Q255": """User1 no Device1 :: Não. Dispositivo não registrado não tem atributos, então o filtro de exclusão não casa e o bloqueio se aplica.
User2 no Device2 :: Sim. A CAPolicy2 exige MFA, e ele a cumpre.
User3 no Device3 :: Sim. O dispositivo registrado casa com o filtro e fica fora do bloqueio.
! Em filtros de dispositivo, "exclude" com operador positivo **aplica** a política a dispositivos sem atributos.""",
"Q256": """User1 (Device1 joined, mas não conforme) :: o SharePoint considera gerenciado só o conforme ou hybrid joined.
User3 (dispositivo desconhecido) :: acesso limitado (web-only).
Combinações com User1/User3 :: não têm dispositivo gerenciado.""",
"Q257": """Excluir o Package1 :: access packages não impedem os security defaults.
Authentication Administrator na Au1 :: não habilita security defaults (exige Security admin, CA admin ou Global).
Identity Governance :: sem relação.""",
"Q258": """**Por que esses cmdlets:** Get-AzVM retorna o objeto da VM para o Update-AzVM habilitar a identidade. Get-AzADServicePrincipal acha o service principal com o nome da VM, que é o que entra no grupo.
! Hoje, para adicionar ao grupo: New-MgGroupMember -GroupId $g.Id -DirectoryObjectId $sp.Id.""",
"Q259": """Executable name / bundle ID / package name :: identificam apps desktop ou mobile (iOS/Android), não web.
! Em ASP.NET Core, o padrão do redirect é https://<host>/signin-oidc.""",
"Q261": """Anomaly detection do MDCA :: detecta comportamento; não cria um processo de aprovação.
App connector :: integra apps ao MDCA.
Access review :: revisa acessos existentes.
! Combine com permission classifications para permitir só consentimentos de baixo impacto.""",
"Q262": """MDCA portal / M365 admin / Entra / Purview :: a integração do app governance fica no portal unificado do Defender.""",
"Q263": """App-enforced restrictions :: são para SharePoint/Exchange, não roteiam pelo proxy do MDCA.
Token configuration / API permission :: configuram o app registration, não o controle de sessão.""",
"Q264": """Policy set / app configuration do Intune :: dispositivos e apps móveis.
Application Proxy :: o App1 roda no Azure (não é on-premises).""",
"Q265": """**Série "Solution" (monitorar OAuth no MDCA):** atende o conector com **Microsoft 365, Google Workspace ou Salesforce**. Azure, AWS e GitHub não atendem.""",
"Q266": """**Série "Solution":** o conector do Azure traz atividades do Azure, não apps OAuth.""",
"Q267": """**Série "Solution":** o conector da AWS traz auditoria e postura (CSPM), não OAuth.""",
"Q268": """Require app protection policy :: é do Intune MAM, não roteia pelo MDCA.
Cloud Application Administrator :: não é necessária para o MDCA.
Cloud App Security Administrator :: o Security Administrator já tem acesso total.""",
"Q269": """Update-MgOrganization / Update-MgDomain :: alteram propriedades do tenant ou do domínio.
Workbook :: só funciona depois que os dados chegam ao workspace.""",
"Q271": """User1 (Global) / User2 (User admin) :: funções isentas da naming policy.
User3 isolado / User2 incluído :: o Groups administrator **não** é isento; a isenção vale para Global, User administrator e algumas outras.
! A naming policy exige Entra ID P1 para os usuários afetados.""",
"Q272": """Designar revisores primeiro :: os revisores são definidos na mesma configuração, ao habilitar as solicitações.
Conceder admin consent direto :: resolve o App1, mas não cria o processo de solicitação (e exige privilégio maior).
CA :: não habilita o pedido de consentimento.""",
"Q274": """Cloud App Security Administrator :: gerencia o MDCA.
Cloud Application / Application Administrator :: registram, mas gerenciam todos os apps; não são o menor privilégio.""",
"Q275": """Owner para a VM3 :: a VM3 não tem identidade system-assigned (usa só a Managed1).
Owner só para Managed1 :: user-assigned e system-assigned habilitadas são todas principals válidas.
Managed2 só para algumas VMs :: user-assigned atravessa regiões.""",
"Q276": """Cloud app catalog :: avalia apps em geral, não os descobertos no seu ambiente (o gabarito prefere a consulta de apps descobertos).
OAuth policy :: apps conectados por OAuth.
Snapshot report :: análise pontual de logs enviados manualmente.""",
"Q277": """Admin1 / Admin2 :: funções clássicas (Account/Service Administrator, Co-Administrator) não são gerenciadas pelo PIM.
! Migre administradores clássicos para Azure RBAC (Owner) e, então, para o PIM.""",
"Q278": """Excluir algum app :: todos estão dentro dos 30 dias de soft delete em 16/04.
Restaurar users/groups e self-service :: essas configurações são do service principal, que é recriado e perde atribuições.
! Restaurar o app registration (Deleted applications) traz o mesmo appId e as credenciais.""",
"Q279": """**Série "Solution":** o conector do GitHub não oferece o recurso de OAuth apps.""",
"Q280": """Só Global ou só funções do Entra :: o PIM também gerencia funções de recursos do Azure (Security Contributor) e grupos.
Account Administrator :: função clássica, sem suporte no PIM.""",
}
