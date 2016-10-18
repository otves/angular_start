import { Component, Input} from '@angular/core';
import { OnInit } from '@angular/core';
import { OkpdService } from 'app/okpd.service';
import { Classificator, ClassificatorTree } from 'app/classificator';
import { TreeModel } from './tree.model';
import { TreeViewComponent } from './tree-veiw.component';
import Promise = require("../../../node_modules/any-promise/index");


@Component({
  moduleId: module.id,
  selector: 'classificator-tree',
  templateUrl: 'classificator-tree.html'
})
export class ClassificatorTreeComponent implements OnInit {

  private maxLevel:number = 3;

  @Input() type:string;

  model:Model;

  constructor(private okpdService:OkpdService) {
  }

  onNodeClick(nodeId:string) {
    console.log('ROOT:onNodeClick:' + nodeId);

    let node = this.model.treeBy(nodeId);
    if (node.nodes == null) {
      this.loadNodes(nodeId).then(node => {
        if (node.level == this.maxLevel) {
          this.model.detail(node);
        }
      });
    }
  }

  ngOnInit():void {
    this.model = new Model();
    this.loadNodes(null);
  }

  loadNodes(rootId:string):Promise<TreeModel> {
    return this.treeClassificatorBy(rootId).then(classificators => {
      let treeModel = this.model.treeBy(rootId);
      return fillNodes(treeModel, classificators);
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
    const node = new TreeModel();
    node.name = classificator.name;
    node.id = classificator.code;
    node.parentId = classificator.parentCode;
    node.notes = classificator.notes;
    node.hasNodes = classificator.hasChildren;
    model.nodes.push(node);
  }
  return model;
}

class Model {

  detailed:string;

  tree:TreeModel;
  cachedTree:TreeModel;

  constructor(private rootId:string) {
    this.tree = new TreeModel();
    this.tree.id = rootId;
    this.tree.name = this.type;
    this.cachedTree = this.tree;
    this.detailed = null;
  }

  detail(node:TreeModel) {
    this.detailed = node.id;
    this.tree = node;
  }

  get treePath(): TreeModel[] {
    let node = this.tree;
    const path: TreeModel[] = [];
    while (node.parent != null) {
      path.push(node.parent);
      node = node.parent;
    }
    return path.reverse();
  }

  treeBy(rootId:string):TreeModel {
    console.log('treeBy:' + rootId);
    if (rootId == this.rootId) {
      return this.cachedTree;
    }
    return this.findNodeIn(rootId, this.cachedTree);
  }

  findNodeIn(rootId:string, tree:TreeModel, level:number = 0):TreeModel {
    console.log('findNodeIn:' + rootId + ', tree:', tree);
    tree.level = level;
    if (rootId == tree.id) {
      return tree;
    }
    if (tree.nodes == null) {
      return null;
    }
    for (let subTree of tree.nodes) {
      subTree.parent = tree;
      let node = this.findNodeIn(rootId, subTree, level + 1);
      if (node != null) {
        return node;
      }
    }
    return null;
  }

}
