import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Classificator, ClassificatorTree } from 'app/classificator';
import { Tree } from './tree';
import { ClassificatorTreeModel } from './classificator-tree';
import { TreeViewComponent } from './tree-veiw.component';

@Component({
  moduleId: module.id,
  selector: 'classificator-tree',
  templateUrl: 'classificator-tree.html'
})
export class ClassificatorTreeComponent {

  @Input() type:string;

  @Output() nodeClick:EventEmitter<string> = new EventEmitter<string>();

  @Input() model:ClassificatorTreeModel;

  onNodeClick(nodeId:string) {
    this.nodeClick.emit(nodeId);
  }

}


