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

  private model:TreeModel;
  constructor(private okpdService:OkpdService) {
  }

  ngOnInit():void {
    this.model = new TreeModel();
    this.model.id = null;
    this.loadNodes(null);
  }

  loadNodes(rootId:string) {
    this.okpdService.treeBy(rootId).then(classificators => {
      let treeModel = this.treeModelBy(rootId);
      fillNodes(treeModel, classificators);
    });
  }

  treeModelBy(code:string):TreeModel {
    if (code == null) {
      return this.model;
    }
    for (let node of  this.model.nodes) {
      if (node.id == code) return node;
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
