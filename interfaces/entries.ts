
export interface entryInterface {
    amount: number;
    description: string;
    name: string;
    user: string;
    active: boolean;
    updateAt: Date;
    createdAt: Date;
    _id: string;
}

export interface getEntriesResponse {
    status: string;
    success: boolean;
    entries: [entryInterface];
}

export interface getEntryResponse {
    status: string;
    success: boolean;
    entry: entryInterface;
}
