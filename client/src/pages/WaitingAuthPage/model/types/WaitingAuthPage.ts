export interface WaitingAuthPage {
    code: string;
    service: string;
}

export interface WaitingAuthPageSchema {
    data?: WaitingAuthPage;
    isLoading: boolean;
    error?: string;
}
