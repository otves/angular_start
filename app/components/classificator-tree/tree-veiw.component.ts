import { Component, Input,  Output, EventEmitter} from '@angular/core';
import { Tree } from './tree';

@Component({
  moduleId: module.id,
  selector: 'tree-view',
  templateUrl: 'tree-view.html'
})
export class TreeViewComponent {

  @Input() model:Tree;

  @Output() nodeClick:EventEmitter<string> = new EventEmitter<string>();

  onNodeClick(nodeId:string) {
    console.log('onNodeClick:' + nodeId);
    this.nodeClick.emit(nodeId);
  }

  expand(treeNode:Tree) {
    treeNode.expanded = !treeNode.expanded;
    this.onNodeClick(treeNode.id);
  }

}
