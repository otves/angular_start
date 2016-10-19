export class Tree {
  level: number;
  expanded:boolean;
  parentId:string;
  parent: Tree;
  id:string;
  name:string;
  notes:string;
  hasNodes:boolean;
  nodes:Tree[];

  subTree(nodeId:string, tree:Tree = this, level:number = 0):Tree {
    console.log('subTree:' + nodeId + ', tree:', tree);
    tree.level = level;
    if (nodeId == tree.id) {
      return tree;
    }
    if (tree.nodes == null) {
      return null;
    }
    for (let subTree of tree.nodes) {
      subTree.parent = tree;
      let node = this.subTree(nodeId, subTree, level + 1);
      if (node != null) {
        return node;
      }
    }
    return null;
  }
}
