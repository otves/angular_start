import { Component, Input,  Output, EventEmitter} from '@angular/core';
import { OnInit } from '@angular/core';
import { OkpdService } from 'app/okpd.service';
import { TreeModel, TreeNodeModel } from './tree.model';

@Component({
  moduleId: module.id,
  selector: 'tree-view',
  templateUrl: 'tree-view.html'
})
export class TreeViewComponent implements OnInit {

  @Input() model:TreeModel;

  @Output() initRoot:EventEmitter<string> = new EventEmitter<string>();

  loadNodes(code:string) {
      this.initRoot.emit(code);
  }

  ngOnInit():void {
    this.loadNodes(this.model.id);
  }

  expand(treeNode:TreeNodeModel) {
    treeNode.expanded = !treeNode.expanded;
  }

}
