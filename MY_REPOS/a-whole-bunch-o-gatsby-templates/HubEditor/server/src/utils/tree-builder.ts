import * as path from 'path';

export function buildTree(files: Array<any>) {
    files = files.reduce(function (tree, f, index) {
        const dir = path.dirname(f.path);
        const fileName = path.basename(f.path);

        if (tree[dir]) {
            tree[dir].children.push(f);
        } else {
            tree[dir] = { implied: true, children: [f] };
        }

        if (tree[f.path]) {
            f.children = tree[f.path].children;
        } else {
            f.children = [];
        }

        f.name = fileName;
        f.text = fileName;
        f.id = index;

        return (tree[f.path] = f), tree;
    }, {});

    return Object.keys(files)
        .reduce(function (tree, f: any) {
            if (files[f].implied) {
                return tree.concat(files[f].children);
            }

            return tree;
        }, [])
        .sort((a: any, b: any) => +(b.type > a.type));
}
