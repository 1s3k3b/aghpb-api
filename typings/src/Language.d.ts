import Client from './Client';
import { TreeItem } from './types';
export default class Language {
    readonly client: Client;
    readonly raw: TreeItem;
    cache?: TreeItem[];
    constructor(client: Client, raw: TreeItem);
    fetchRawImages(): Promise<TreeItem[]>;
    fetchImageNames(): Promise<string[]>;
    fetchImages(): Promise<string[]>;
    search(str: string): Promise<string[]>;
}
