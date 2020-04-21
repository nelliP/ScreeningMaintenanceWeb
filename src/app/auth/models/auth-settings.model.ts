export class AuthSettings {
    authority?: string;
    client_id?: string;
    response_type?: string;
    scope?: string;
    redirect_uri?: string;
    post_logout_redirect_uri?: string;

    prompt?: string;
    display?: string;
    max_age?: number;
    ui_locales?: string;
    acr_values?: string;

    filterProtocolClaims?: boolean;
    loadUserInfo?: boolean;
    clockSkew?: number;

    silent_redirect_uri?: any;
    silentRequestTimeout?: any;
    automaticSilentRenew?: boolean;
    includeIdTokenInSilentRenew?: boolean;
    
    monitorSession?: boolean;
    checkSessionInterval?: number;
    revokeAccessTokenOnSignout?: any;
    accessTokenExpiringNotificationTime?: number;
}