export class TreeModel {
  level: number;
  expanded:boolean;
  parentId:string;
  parent: TreeModel;
  id:string;
  name:string;
  notes:string;
  hasNodes:boolean;
  nodes:TreeModel[];
}
