export class TreeModel {
  nodes:TreeNodeModel[];
  id:string;

}

export class TreeNodeModel extends TreeModel {
  expanded:boolean;
  parentId:string;
  id:string;
  name:string;
  notes:string;
  hasNodes:boolean;
  nodes:TreeNodeModel[];
}
