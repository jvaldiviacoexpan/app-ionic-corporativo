/* eslint-disable @typescript-eslint/naming-convention */
export class GetTokenModel {
    client_id:     string;
    client_secret: string;
    audience:      string;
    grant_type:    string;
}

export interface AppMetadata {
    roles: string[];
}
