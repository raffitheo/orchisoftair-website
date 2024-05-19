export interface Content {
    link?: string;
    type: string;
    value?: string;
    values?: Array<Content>;
}

export default interface Page {
    content: Array<Content>;
    creationDate: Date;
    title: string;
}
