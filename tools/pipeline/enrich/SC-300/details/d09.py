DET = {
"Q281": """Access review :: revisa, mas não concede nem expira acesso.
Lifecycle workflow :: automatiza joiner/mover/leaver, não acessos temporários a sites.
Conditional Access :: controla a forma de acesso, não concede permissão ao site.
! Na política do pacote: "For users in your directory" → specific groups (Group1) e expiração de 90 dias.""",
"Q282": """Usuário do Entra :: exigiria senha e MFA; não é identidade de workload.
Service principal :: exige gerenciar segredo ou certificado.
System-assigned :: uma por app; mais atribuições para gerenciar.
Domain Services / SAS / certificados :: não são o controle de acesso baseado em identidade com menor esforço.
! Uma user-assigned pode ser associada a vários App Services e receber Storage Blob Data Contributor em cada conta.""",
"Q283": """Owner na Sub1 :: excessivo.
Account Reader no DB1 :: lê só metadados da conta, não os dados.
Reader no RG1 :: plano de controle, sem dados.
! O Cosmos DB tem RBAC próprio de plano de dados (Built-in Data Reader/Contributor), atribuído via az cosmosdb sql role assignment.""",
"Q284": """Data protection :: soft delete e versionamento.
SAS / access keys :: segredos; não usam a managed identity.
File share settings :: configuram o share, não dão acesso à identidade.""",
"Q285": """IAM do Vault1 :: daria acesso a todos os segredos.
Identity settings do Automation1 :: a identidade já está habilitada; falta a permissão.
Run as accounts :: aposentadas e baseadas em certificado.
! Atribuição no escopo de um único segredo só funciona no modelo de permissões Azure RBAC (não em access policies).""",
"Q288": """Key Vault :: não é usado pela CBA do Entra.
Auto-enrollment :: distribui certificados, mas a confiança no Entra vem antes.
Windows Hello for Business :: outro método.
! Depois: habilite o método Certificate-based authentication, configure as regras de binding (UPN/SKI) e defina se é de fator único ou múltiplo.""",
"Q290": """Global Secure Access :: acesso à rede (SSE).
Permissions Management :: gerencia permissões em multicloud (CIEM), e foi descontinuado.
Verified ID :: credenciais verificáveis.
! O "Discovery and insights" do PIM mostra contas com funções permanentes e sugere a conversão para elegível.""",
"Q293": """Access policies :: não são gerenciáveis pelo PIM.
Secrets Officer para o User2 :: daria também escrita.
Key Vault Administrator / Contributor :: amplos demais (Contributor nem lê segredos no modelo RBAC).""",
"Q296": """Só WebApp1 / sem VM1 ou storage1 :: VMs, App Service e storage (para CMK, por exemplo) suportam user-assigned em qualquer região.
! A identidade user-assigned é um recurso regional, mas o uso dela atravessa regiões.""",
"Q297": """Group2 (dinâmico) / Group4 (sincronizado) :: o PIM for Groups exige associação atribuída e grupo de nuvem.
! PIM for Groups permite tornar membership ou ownership elegíveis, inclusive para grupos role-assignable.""",
"Q299": """User1 (já guest) :: usa o método de resgate existente.
User3 (membro) :: não é externo.
! Domínios com Entra ID recebem o login do próprio Entra, não OTP.""",
"Q300": """Usuário do Entra :: não é identidade de recurso.
User-assigned :: o login do Entra na VM depende da system-assigned (a extensão a usa).
Automation account :: não é um tipo de identidade.
! Usuários precisam de Virtual Machine Administrator/User Login no escopo da VM.""",
"Q301": """Set-WindowsProductKey :: chave do Windows.
Update-MgGroup / Update-MgUser :: não removem licenças.
! Exemplo: Set-MgUserLicense -UserId $id -RemoveLicenses @($skuIdE3) -AddLicenses @().""",
"Q302": """Administrative units / Identity Governance :: não gerenciam licenças.
Update-MgUser :: não altera licenças.""",
"Q303": """User1 :: Sim. Está incluído, com risco alto (≥ Medium).
User2 :: Não. Está só no grupo excluído.
User3 :: Não. A exclusão prevalece sobre a inclusão.
! Exclusões vencem sempre, em CA e nas políticas do ID Protection.""",
"Q304": """Reader / Contributor / Virtual Machine Contributor :: funções de plano de controle não suportam condições ABAC (exceto as condições de delegação do RBAC Administrator).
! As condições ABAC atuam em ações de dados de Blob e Queue (ex.: tags de índice e nome do container).""",
"Q305": """App1 com managed identity :: o app registrado já tem service principal; a identidade dele é essa.
App2 com system-assigned :: cada VM teria a própria identidade (não seria "uma só").
Usuário ou grupo do Entra :: não são identidades de workload.""",
"Q306": """M365 Apps admin center / Defender / Purview :: não controlam consentimento de apps.
! O consentimento de usuários também pode ser desabilitado no Entra (Enterprise apps > Consent and permissions > User consent settings).""",
"Q307": """Application permissions :: dariam acesso a todos os calendários, sem usuário; excede.
Funções RBAC :: são do Azure, não do Graph.
! Calendars.ReadWrite delegada: o app age em nome do usuário logado, e o usuário pode consentir.""",
"Q311": """Sign-in risk policy :: ID Protection.
Access review :: governança.
Admin consent :: consentimento de apps.
! O CAE é habilitado por padrão; a política de CA serve para customizar (strict location) ou desabilitar.""",
"Q317": """Security Administrator com escopo de AU :: não é suportado; só funções de gestão de usuários, grupos e dispositivos têm escopo de AU.
User Administrator só na AU1 ou só no tenant :: os dois escopos são possíveis.
! Funções com escopo de AU: User, Groups, Helpdesk, Password, Authentication, License, Printer, Cloud Device administrator, entre outras.""",
"Q318": """Authenticator / SMS :: o requisito "sem senha" + MFA fora de banda aponta para métodos passwordless suportados no fluxo do az ssh.
Windows Hello :: só em Windows.
! O login do Entra em Linux usa az ssh vm com certificados de curta duração; os métodos aceitos dependem do CA.""",
"Q319": """Scheduling :: define frequência e duração.
General :: nome e descrição.
Reviewers :: quem revisa.
! Em "Upon completion": Auto apply = On; "If reviewers don't respond" = Remove access.""",
"Q329": """Conditions :: condições de aplicação.
Session :: controles de sessão.
Target resources :: apps alvo.
! Os termos aparecem como opção no Grant depois de criados em Terms of use.""",
"Q330": """Resource access settings :: tratam de templates e VMs no modelo de access policy.
Permissions model :: o novo cofre já usa RBAC por padrão.
User-assigned :: a VM já tem a system-assigned.
! A função é Key Vault Secrets User no Vault1 (ou no segredo).""",
"Q332": """User1 vê "Stay signed in" :: Não. "Never persistent" suprime o prompt.
User2 / User3 a cada 2 h :: Não. Estão no Group2, excluído da Policy2.
! A sign-in frequency vale para apps cliente e navegador; a sessão persistente só afeta o navegador.""",
"Q333": """User1 em VM ou App :: usuários do Entra não são identidades de recurso.
Managed1 no App1 :: já é a system-assigned da VM1 e não pode ser reaproveitada.
! Um recurso pode ter uma system-assigned e várias user-assigned.""",
"Q342": """Admin1 redefine a senha do Admin2 em 15/11 :: Sim. O Admin2 só é elegível (sem função ativa).
Admin2 administra o Exchange em 15/10 :: Não. É elegível; precisa ativar no PIM.
Admin3 redefine a senha do Admin1 em 1/09 :: Sim. User Administrator pode redefinir a de outro User Administrator.""",
"Q344": """User accounts :: exigem senha e MFA, o que não é próprio de VMs.
Storage Service Encryption :: criptografia em repouso, não guarda segredos de API.
System-assigned :: uma por VM, o que exige mais atribuições (o gabarito prefere user-assigned compartilhada).""",
"Q345": """Automation1 lê o Vault1 :: Não. A Identity1 só tem acesso no RG2.
Identity2 no Automation2 :: Sim. Acesso na Sub1 inteira.
VM1 :: Sim. A Identity3 tem acesso no RG1, onde fica o Vault1.""",
"Q346": """Client secret / certificado :: precisam de rotação e não somem com a conta.
User-assigned :: sobrevive à exclusão da conta (e suas permissões também).""",
"Q348": """User1 :: Não. Membro de grupo aninhado; o escopo por grupo não é recursivo.
User2 :: Sim. Membro direto do Group2.
User3 :: Sim. Atribuído diretamente ao escopo.""",
"Q349": """Update-MgDomain / Update-MgDomainFederationConfiguration :: domínio e federação.
Update-MgPolicyPermissionGrantPolicyExclude :: consentimento de apps.""",
"Q350": """Ambígua :: o gabarito considera User1 e User3 (usuários sem o app). O User2 é o aprovador.
! O self-service de apps tende a ser substituído por access packages (entitlement management).""",
"Q351": """Identity Governance Administrator :: revisões de grupos e apps, não de funções do Entra.
User Access Administrator :: Azure RBAC.
User Administrator :: não gerencia funções privilegiadas.""",
"Q352": """Excluir Admin4 :: o template exclui quem cria a política (Admin4) e pode nascer em report-only. O gabarito do dump ignora isso.
! Na prova atual, considere: template = All users incluídos, o criador excluído, estado report-only até você ligar.""",
}
