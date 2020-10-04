export interface Tree {
    sha: string;
    url: string;
    tree: TreeItem[];
    truncated: boolean;
}
export interface TreeItem {
    path: string;
    mode: string;
    type: string;
    sha: string;
    url: string;
}
