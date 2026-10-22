DET = {
"Q169": """**Série "Solution" (revisão deve ir ao gerente de cada departamento):** só **preencher o Manager** dos usuários atende. Revisões separadas por função, Members (self) e gerentes como fallback não atendem.
! Fallback reviewers recebem as revisões de usuários **sem** gerente definido.""",
"Q170": """**Série "Solution":** com Reviewers = Managers, a revisão segue o atributo manager do usuário. Preenchido (no Entra ou sincronizado do AD), cada gerente recebe a sua equipe.""",
"Q171": """**Série "Solution":** Members (self) tira o gerente do processo, e o requisito é que o gerente revise.""",
"Q172": """PIM para o Global Admin de emergência :: a ativação depende do próprio Entra e de aprovação; pode falhar na crise.
CA por local :: se a rede corporativa cair, a conta fica inacessível.
CA exigindo MFA :: o MFA pode ser justamente o serviço com falha (a recomendação atual é exigir FIDO2/passkey para break-glass, mas o gabarito é monitorar).
! Crie alertas no Log Analytics para logins e alterações nas contas de emergência e teste-as periodicamente.""",
"Q173": """Access packages :: definem o acesso, não o ciclo de vida global dos externos.
Terms of use / access reviews settings :: não removem convidados após expirar.
! A remoção só vale para externos que entraram por access package e perderam a última atribuição.""",
"Q174": """14 dias :: não é um período de retenção do Entra.
90 / 365 dias :: exigem enviar para Log Analytics ou storage.
! Retenção no portal: Free = 7 dias; P1/P2 = 30 dias (audit e sign-in).""",
"Q175": """Combinações sem App1 :: atribuições de enterprise apps também são revisáveis.
Só Group1 / só funções :: as access reviews cobrem os quatro tipos.
! Revisões de funções do Entra e do Azure são criadas pelo PIM.""",
"Q176": """Sign-ins (CSV/JSON) :: registram logins, não alterações em políticas.
Audit logs em CSV :: também contém a mudança; o gabarito prefere JSON, que preserva a estrutura (modifiedProperties) para o SIEM.
! Para integração contínua com SIEM, use diagnostic settings → Event Hub.""",
"Q177": """**Série "Solution":** um fallback reviewer só recebe a revisão de quem não tem manager, e com vários gerentes como fallback todos receberiam tudo.""",
"Q178": """Identity1 (service principal / managed identity) :: não pode ativar funções; só recebe atribuição ativa.
Só User1 :: guests também podem ser elegíveis.
! Grupos role-assignable também podem ser elegíveis (ou usar PIM for Groups).""",
"Q179": """User1 em 5/02 :: Não. A instância de janeiro terminou em 29/01, e a próxima só começaria em 15/02, quando a série termina.
User2 em 25/01 :: Sim. Revisões ativas permitem mudar a resposta até o fim.
User3 (owner) :: Não. Os revisores são os próprios membros (self).""",
"Q180": """Assignment / CA / external collaboration para liberar :: a política do access package é que define quem pode solicitar (organização conectada).
Policy / assignment / CA para bloquear litwareinc.com :: a deny list de domínios em External collaboration impede o convite desse domínio.
! Organizações conectadas podem conter vários domínios; o filtro por domínio é feito fora do pacote.""",
"Q181": """Notify settings do ID Protection :: e-mails para admins.
Playbook :: automação de resposta (vem depois do incidente).
Diagnostic settings do Entra :: enviam logs (inclusive RiskyUsers), mas a geração de incidentes vem das regras e do conector.
! Hoje, os alertas do ID Protection chegam ao Sentinel pelo conector Microsoft Defender XDR.""",
"Q182": """**Série "Solution" (trocar o destinatário dos alertas):** só **mudar o action group** atende. Funções do Entra, diagnostic settings e DCR não definem destinatários.""",
"Q183": """**Série "Solution":** diagnostic settings definem para onde os logs vão; o e-mail de alerta vem do action group da regra.""",
"Q184": """**Série "Solution":** DCR define coleta de agentes (VMs). Os destinatários do alerta continuam no action group.""",
"Q185": """Set-AzureADTenantDetail :: altera propriedades do tenant; sem relação com logs.
Workbook :: precisa dos dados no workspace antes.
Get-AzureADAuditDirectoryLogs :: consulta pontual; não integra com o Azure Monitor.
! Selecione as categorias AuditLogs, SignInLogs, NonInteractiveUserSignInLogs etc. no diagnostic setting.""",
"Q186": """User1 com MFA na ativação :: Sim. A opção está habilitada.
User2 aprova :: Não. Aprovação não exigida.
User2 e User3 editam a atribuição :: Não. Privileged Authentication Administrator não gerencia funções; isso exige Privileged Role Administrator ou Global Administrator.""",
"Q187": """App registration / administrative unit :: não fazem parte do entitlement management.
Catálogo :: o General já existe; o gabarito considera o access package como primeiro passo (a comunidade se divide).
! Boa prática: um catálogo por projeto/área, com catalog owners delegados.""",
"Q188": """**Série "Solution":** o action group define e-mail, SMS e outras ações. Trocar o destinatário ali atende.""",
"Q189": """User1 removido do Group1 :: Não. A revisão é do Group3, e o User1 é membro indireto (via Group1).
User2 removido do Group3 :: Não. Não é membro direto, e grupos sincronizados do AD não têm membros alterados pela revisão.
User3 removido do Group2 :: Não. Não é membro.
! Access reviews só aplicam remoção em grupos gerenciados na nuvem.""",
"Q190": """Conditional Access :: não remove acessos inativos.
Compliance policy :: Intune.
Revisão de grupo de guests :: o acesso é ao App1 (atribuição de app), não a um grupo.
! Ative "No sign-in within 30 days" como recomendação + auto-apply + "If reviewers don't respond = Take recommendations".""",
"Q191": """525 :: os guests não exigem licença por usuário no modelo MAU.
1 para o Group1 :: na auto-revisão, cada membro interno revisor precisa de licença.
100 / 295 / 395 no Group2 :: só o dono revisor (interno) precisa de licença.""",
"Q192": """Guest1 em 5/05 :: Não. Removido 30 dias após perder a última atribuição; ter uma função de diretório não impede.
Guest2 :: Não. Mesmo motivo.
Guest3 :: Sim. Foi convidado fora do access package, e a regra não se aplica a ele.
! A configuração vale para "external users brought in by entitlement management".""",
"Q193": """Sign-in logs :: logins, não aceites de termos.
Usage and Insights :: uso de apps e métodos.
Provisioning logs :: SCIM.
! No portal: Terms of use > selecionar Terms1 > Accepted / Declined.""",
"Q194": """User1 (owner) :: com "Users review their own access", o owner não revisa os outros.
User2 :: cada um revisa a si mesmo.
! Guests B2B comuns podem fazer a autorrevisão; usuários B2B direct connect (canais compartilhados) não.""",
"Q195": """User1 ativo automaticamente :: Não. A atribuição dele é elegível e exige ativação com aprovação.
Só User3 aprova o User2 :: Sim. O aprovador não pode aprovar a própria solicitação.
User1 até 04:00 :: Não. A ativação é cortada no fim da atribuição elegível.""",
"Q196": """Auto apply :: já está habilitado (pelo exhibit).
Ação para guests negados / notificações / lembretes / recomendações / justificativa :: não removem quem não responde.
! "If reviewers don't respond" aceita: No change, Remove access, Approve access, Take recommendations.""",
"Q197": """Distribution group :: não recebe licença.
OU :: AD on-premises; não licencia no Entra.
Administrative unit :: delimita o escopo de administração, não atribui licença.
! A regra dinâmica pode usar companyName -eq "ADatum" ou o domínio do UPN.""",
"Q198": """Set-ADSyncScheduler :: muda o intervalo do ciclo.
Start-ADSyncSyncCycle :: força um ciclo, mas a OU continua fora do escopo.
Change user sign-in :: altera PHS/PTA/federação.
! Depois de mudar a filtragem por OU, o assistente roda um Full sync automaticamente.""",
"Q201": """Domain filtering :: escolhe domínios e OUs, não atributos.
Optional features :: habilita writeback, PHS etc. (inclui o checkbox de directory extensions, mas a página que escolhe o atributo é Directory Extensions).
Grupo atribuído ou com aninhados :: não automatiza; grupos aninhados não herdam licença.
! O atributo aparece no Entra como extension_<appId>_LWLicenses e pode ser usado na regra dinâmica.""",
"Q202": """Password Protection :: bane senhas fracas; não detecta vazamento.
Authentication method policy :: define métodos permitidos.
Federação com PingFederate :: não sincroniza hashes.
! O PHS pode ficar habilitado como "recurso secundário" mesmo com federação ou PTA; também serve de fallback de login.""",
}
