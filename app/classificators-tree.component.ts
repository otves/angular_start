import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { OkpdService } from 'app/okpd.service';
import { ClassificatorTreeComponent } from './components/classificator-tree/classificator-tree.component';
import { ClassificatorTreeModel } from './components/classificator-tree/classificator-tree';
import { Tree } from './components/classificator-tree/tree';
import { Classificator, ClassificatorTree } from 'app/classificator';


@Component({
  moduleId: module.id,
  selector: 'classificators-tree',
  templateUrl: 'classificators-tree.html'
})
export class ClassificatorsTreeComponent implements OnInit {

  private maxLevel:number = 3;

  tabs: [{
    type: string;
    title:string;
  }] = [
    {
      type: 'okpd',
      title: 'ОКПД'
    },
    {
      type: 'okpd2',
      title: 'ОКПД2'
    },
    {
      type: 'tnved',
      title: 'ТНВЭД'
    }
  ];

  selectedType:string;
  classificatorTree: ClassificatorTreeModel;
  activeTabIndex: number = 0;


  constructor(private route:ActivatedRoute, private okpdService:OkpdService) {
    this.route.params.subscribe(params => {
     const routeParams = params as RouteParams;
      console.log('route:ClassificatorsTreeComponent:', routeParams);
      if(routeParams) {
        this.selectedType = routeParams.type ? routeParams.type : 'okpd';
        //if(routeParams.code) {
        //  this.loadTree(nodeId).then(node => {
        //    this.classificatorTree.detail(node);
        //  });
        //}
      }
    });
  }

  ngOnInit():void {
    console.log('ngOnInit');
    console.log('ROOT:root:' + this.route.snapshot.queryParams['root']);
    console.log('routet:', this.route);
    this.classificatorTree = new ClassificatorTreeModel(this.selectedType);
    this.loadTree(this.selectedType).
    catch(err => console.error('Error in classificator load', err));
  }

  onSelectChange(tab:any) {
    console.log('>>>>>>', tab.index);
    this.activeTabIndex = tab.index;
  }

  onNodeClick(nodeId:string) {
    console.log('ROOT:onNodeClick:' + nodeId);
    this.loadTree(nodeId).then(node => {
      if (node.level == this.maxLevel) {
        this.classificatorTree.detail(node);
      }
    }).
    catch(err => console.error('Error in classificator load', err));

  }

  loadTree(nodeId:string):Promise<Tree> {
    let node = this.classificatorTree.treeBy(nodeId);
    if (node.nodes == null) {
      return this.treeClassificatorBy(nodeId).then(classificators => {
        let tree = this.classificatorTree.treeBy(nodeId);
        return fillNodes(tree, classificators);
      })
    } else {
      return Promise.resolve(node);
    }
  }


  treeClassificatorBy(rootId:string):Promise<ClassificatorTree> {
    const nodeId = (this.selectedType == rootId) ? null : rootId;
    switch (this.selectedType) {
      case 'okpd':
        return this.okpdService.okpdTreeBy(nodeId);
      case 'okpd2':
        return this.okpdService.okpd2TreeBy(nodeId);
      case 'tnved':
        return this.okpdService.tnvedTreeBy(nodeId);
      default:
        throw new Error(`Type ${this.type} don't support`);
    }
  }

}

function fillNodes(model:Tree, classificatorTree:ClassificatorTree) {
  if (classificatorTree == null) return model;
  model.nodes = [];
  for (let classificator of classificatorTree) {
    const node = new Tree();
    node.name = classificator.name;
    node.id = classificator.code;
    node.parentId = classificator.parentCode;
    node.notes = classificator.notes;
    node.hasNodes = classificator.hasChildren;
    model.nodes.push(node);
  }
  return model;
}

class RouteParams {
  type: string;
  code: string;
}
