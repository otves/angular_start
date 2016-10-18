import { Component, Input} from '@angular/core';
import { OnInit } from '@angular/core';
import { OkpdService } from 'app/okpd.service';
import { Classificator, ClassificatorTree } from 'app/classificator';
import { TreeModel, TreeNodeModel } from './tree.model';
import { TreeViewComponent } from './tree-veiw.component';


@Component({
  moduleId: module.id,
  selector: 'classificator-tree',
  templateUrl: 'classificator-tree.html'
})
export class ClassificatorTreeComponent implements OnInit {

  @Input() type:string;

  model: Model;

  constructor(private okpdService:OkpdService) {
  }

  detailRoot(rootCode:string) {

  }

  ngOnInit():void {
    this.model = new Model();
    this.loadNodes(null);
  }

  loadNodes(rootId:string) {
    this.treeClassificatorBy(rootId).then(classificators => {
      let treeModel = this.model.treeBy(rootId);
      fillNodes(treeModel, classificators);
    });
  }


  treeClassificatorBy(rootId:string):Promise<ClassificatorTree> {
    switch (this.type) {
      case 'okpd':
        return this.okpdService.okpdTreeBy(rootId);
      case 'okpd2':
        return this.okpdService.okpd2TreeBy(rootId);
      case 'tnved':
        return this.okpdService.tnvedTreeBy(rootId);
      default:
        throw new Error(`Type ${this.type} don't support`);
    }
  }

}

function fillNodes(model:TreeModel, classificatorTree:ClassificatorTree) {
  if (classificatorTree == null) return model;
  model.nodes = [];
  for (let classificator of classificatorTree) {
    const node = new TreeNodeModel();
    node.name = classificator.name;
    node.id = classificator.code;
    node.parentId = classificator.parentCode;
    node.notes = classificator.notes;
    node.hasNodes = classificator.hasChildren;
    model.nodes.push(node);
  }
}

 class Model {

   tree: TreeModel;
   cachedTree: TreeModel;
   treePath:string[];

   constructor() {
     this.tree = new TreeModel();
     this.tree.id = null;
     this.cachedTree = this.tree;
   }

   treeBy(code:string):TreeModel {
     if (code == null) {
       return this.tree;
     }
     for (let node of  this.cachedTree.nodes) {
       if (node.id == code) return node;
     }
   }

}
