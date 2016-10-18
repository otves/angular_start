import { Component, Input,  Output, EventEmitter} from '@angular/core';
import { OkpdService } from 'app/okpd.service';
import { TreeModel } from './tree.model';

@Component({
  moduleId: module.id,
  selector: 'tree-view',
  templateUrl: 'tree-view.html'
})
export class TreeViewComponent {

  @Input() model:TreeModel;

  @Output() nodeClick:EventEmitter<string> = new EventEmitter<string>();

  onNodeClick(nodeId:string) {
    console.log('onNodeClick:' + nodeId);
    this.nodeClick.emit(nodeId);
  }


  expand(treeNode:TreeModel) {
    treeNode.expanded = !treeNode.expanded;
    this.onNodeClick(treeNode.id);
  }

}
