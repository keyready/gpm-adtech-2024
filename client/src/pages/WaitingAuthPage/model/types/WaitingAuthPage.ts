export interface WaitingAuthPage {
    code: string;
}

export interface WaitingAuthPageSchema {
    data?: WaitingAuthPage;
    isLoading: boolean;
    error?: string;
}
