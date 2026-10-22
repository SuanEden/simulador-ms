# Ajustes de documentação: refs do dump fora de contexto e docs específicos por tópico
BADREF = [
    "Azure updates", "Reset your Microsoft work or school account password using security info",
    "Add an on-premises application for remote access through application proxy",
    "Invite users with Microsoft Entra B2B collaboration - Power Platform",
    "Quickstart: Create and assign a user account", "New-AzureADMSInvitation",
]
TX = {
"Usuários convidados": ["entra/external-id/reset-redemption-status", "powershell/module/microsoft.graph.identity.signins/new-mginvitation"],
"Global Secure Access": ["entra/global-secure-access/how-to-install-windows-client", "entra/global-secure-access/how-to-compliant-network"],
"Global Secure Access — filtragem web": ["entra/global-secure-access/how-to-configure-web-content-filtering"],
"Smart lockout": ["entra/identity/authentication/howto-password-smart-lockout"],
"Self-service sign-up": ["entra/identity/users/directory-self-service-signup"],
"Login do Entra em VMs": ["entra/identity/devices/howto-vm-sign-in-azure-ad-windows"],
"Defender for Cloud Apps": ["defender-cloud-apps/session-policy-aad", "defender-cloud-apps/control-cloud-apps-with-policies"],
"Custom security attributes": ["entra/fundamentals/custom-security-attributes-manage"],
"Licenciamento": ["entra/identity/users/licensing-groups-assign", "powershell/module/microsoft.graph.users.actions/set-mguserlicense"],
"Quem pode redefinir senhas": ["entra/identity/role-based-access-control/privileged-roles-permissions#who-can-reset-passwords"],
"SSPR para administradores": ["entra/identity/authentication/concept-sspr-policy#administrator-reset-policy-differences"],
"Microsoft Sentinel": ["azure/sentinel/fusion"],
"Relatórios": ["entra/identity/monitoring-health/concept-usage-insights-report"],
"Identity Secure Score": ["entra/identity/monitoring-health/concept-identity-secure-score#who-can-use-the-identity-secure-score"],
}
