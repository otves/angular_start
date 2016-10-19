import { Tree} from './tree';

export class ClassificatorTreeModel {

  detailed:string;

  tree:Tree;

  cachedTree:Tree;

  constructor(private rootId:string) {
    this.tree = new Tree();
    this.tree.id = rootId;
    this.cachedTree = this.tree;
    this.detailed = null;
  }

  detail(node:Tree) {
    this.detailed = node.id;
    this.tree = node;
  }

  get treePath():Tree[] {
    let node = this.tree;
    const path:Tree[] = [];
    while (node.parent != null) {
      path.push(node.parent);
      node = node.parent;
    }
    return path.reverse();
  }

  treeBy(rootId:string):Tree {
    if (rootId == this.rootId) {
      return this.cachedTree;
    }
    return this.cachedTree.subTree(rootId);
  }

}
