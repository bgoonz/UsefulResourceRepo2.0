export interface ITreeNode {
    path: string;
    mode: string;
    type: string;
    sha: string;
    size: number;
    url: string;
    children: Array<ITreeNode>;
    name: string;
}
