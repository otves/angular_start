export class TreeModel {
  nodes:TreeNodeModel[];
  id:string;
  level: number;

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
