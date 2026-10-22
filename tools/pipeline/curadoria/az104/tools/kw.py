import json,re,collections
q=json.load(open('/home/claude/az104/work/qs.json')); u=json.load(open('/home/claude/az104/work/uniq.json'))['uniq']
cat=json.load(open('/home/claude/az104/work/cat.json'))
KW={'aadconnect':r'Azure AD Connect|AD Connect|directory synchroni|on-premises Active Directory|Active Directory domain|pass-through auth|password hash sync|federat',
 'mfa/ca':r'Multi-Factor|MFA|conditional access|Identity Protection|Privileged Identity|PIM\b|access review',
 'device':r'Azure AD join|device settings|joined device|Intune|Windows 10 device',
 'aks':r'Kubernetes|AKS|kubectl|az aks',
 'vpn/er':r'VPN|ExpressRoute|virtual network gateway|local network gateway|Virtual WAN|site-to-site|point-to-site|Site-to-Site|Point-to-Site',
 'appgw/tm/fd':r'Application Gateway|application gateway|Traffic Manager|Front Door|WAF',
 'firewall':r'Azure Firewall',
 'filesync':r'File Sync|Storage Sync|sync group|server endpoint',
 'importexport':r'Import/Export|Data Box|WAImportExport',
 'asr-onprem':r'Hyper-V|VMware|on-premises.*Site Recovery|Azure Migrate|migrate',
 'updmgmt':r'Update Management|Automation account|runbook|Desired State|DSC',
 'logicapp/func':r'logic app|Logic App|Azure Functions|function app',
 'blueprint':r'Blueprint|blueprint',
 'mma':r'Log Analytics agent|Microsoft Monitoring Agent|MMA\b|OMS',
 'classic':r'classic|Classic|cloud service',
 'aadds':r'Domain Services|AD DS',
 'cosmos/sql':r'Cosmos|SQL Database|SQL Server|Data Lake',
 'adminunit/domain':r'administrative unit|custom domain name',
 'batch/other':r'Azure Batch|Service Fabric|Event Grid|Event Hub|Service Bus|Azure Monitor for containers|Windows Admin Center|Azure Arc|Arc-enabled',
 'sspr':r'self-service password reset|SSPR',
 'b2b':r'guest|external user|B2B',
}
hits=collections.defaultdict(list)
for n in u:
    s=' '.join(q[str(n)]['stem'])
    if 807<=n<=847: s=s[-1500:]
    for k,p in KW.items():
        if re.search(p,s): hits[k].append(n)
for k,v in hits.items(): print(k,len(v),v)
