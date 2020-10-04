import Language from './Language';
import RequestHandler from './RequestHandler';
import { TreeItem } from './types';
export default class Client {
    readonly requestHandler: RequestHandler;
    languages: {
        [key: string]: Language | undefined;
    };
    all?: TreeItem[];
    urls?: string[];
    constructor(authorization?: string);
    init(): Promise<this>;
    get languageProxy(): {
        [key: string]: Language | undefined;
    };
    fetchAll(): Promise<TreeItem[]>;
    fetchAllNames(): Promise<string[]>;
    fetchAllURLs(): Promise<string[]>;
    search(str: string): Promise<string[]>;
}
