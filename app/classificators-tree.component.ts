import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
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

  tabs:[{
    type: string;
    title:string;
    selected: boolean;
  }] = [
    {
      type: 'okpd',
      title: 'ОКПД',
      selected: false
    },
    {
      type: 'okpd2',
      title: 'ОКПД2',
      selected: false
    },
    {
      type: 'tnved',
      title: 'ТНВЭД',
      selected: false
    }
  ];

  classificatorTree:ClassificatorTreeModel;
  activeTabIndex:number = 0;
  routeParams:RouteParams;

  constructor(private route:ActivatedRoute, private router:Router, private okpdService:OkpdService) {
    this.route.params.subscribe(params => {
      this.routeParams = params as RouteParams;
    });
  }

  get selectedType() {
    let selectedTab = this.tabs.find(t => t.selected);
    return selectedTab ? selectedTab.type : null;
  }

  set selectedType(code:string) {
   // console.log('selectedType:' + code);
    let needLoad = null;
    this.tabs.forEach(t => {
      if (t.type == code) {
        if (!t.selected) needLoad = t.type;
        t.selected = true;
      } else {
        t.selected = false;
      }
      if (needLoad) {
        this.classificatorTree = new ClassificatorTreeModel(needLoad);
        const rootId = this.routeParams.code ? this.routeParams.code : needLoad;
        this.loadTree(rootId).catch(err => console.error('Error in classificator load', err));
      }
    });
  }

  ngOnInit():void {
   // console.log('ngOnInit', this.routeParams);
    this.selectedType = this.routeParams.type ? this.routeParams.type : 'okpd';
  }

  onSelectChange(tab:any) {
   // console.log('>>>>>>', tab);
    this.activeTabIndex = tab.index;
    this.selectedType = this.tabs[tab.index].type;
    this.router.navigate([`/tree/${this.selectedType}`]);
  }

  onNodeClick(nodeId:string) {
    //console.log('ROOT:onNodeClick:' + nodeId);
    this.loadTree(nodeId).then(node => {
      if (node.level == this.maxLevel) {
        this.classificatorTree.detail(node);
      }
    }).catch(err => console.error('Error in classificator load', err));

  }

  loadTree(nodeId:string):Promise<Tree> {
    let node = this.classificatorTree.treeBy(nodeId);
    if (node == null) {
      //console.log('>>nodeId:' + nodeId);
      return this.treeClassificatorBy(nodeId).then(classificatorTree => {
        const parentId = classificatorTree[0].parentCode ? classificatorTree[0].parentCode : this.selectedType;
        //  console.log('>>parentId:', parentId);
        return this.loadTree(parentId).then(tree => fillNodes(tree, classificatorTree));
      })
    }
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
        throw new Error(`Type ${this.selectedType} don't support`);
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
  type:string;
  code:string;
}
