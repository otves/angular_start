import { Component, Input,  Output, EventEmitter} from '@angular/core';
import { OnInit } from '@angular/core';
import { OkpdService } from 'app/okpd.service';
import { ClassificatorTree } from 'app/classificator-tree';
import { Classificator } from 'app/classificator';


@Component({
  moduleId: module.id,
  selector: 'classificator-tree',
  templateUrl: 'classificator-tree.html',
  viewProviders: [OkpdService]
})
export class ClassificatorTreeComponent implements OnInit {

  private currentModel:ClassificatorTreeModel;
  @Output() currentModelChange:EventEmitter<ClassificatorTreeModel> = new EventEmitter<ClassificatorTreeModel>();

  @Input() set model(model:ClassificatorTreeModel) {
    if (model instanceof ClassificatorTreeModel) {
      this.currentModel = model;
    } else {
      this.currentModel = treeModel(model);
    }
    this.currentModelChange.emit(this.currentModel);
  }

  get model():ClassificatorTreeModel {
    return this.currentModel;
  }

  constructor(private okpdService:OkpdService) {
  }


  ngOnInit():void {
    if (this.model == null) {
      this.okpdService.treeBy(null).then(classificators => {
        console.log('>>>>init:', classificators);
        this.model = treeModel(classificators);
      });
    }
  }


  expand(classificatorModel:ClassificatorModel) {
    console.log('>>>>expand:', classificatorModel.code);
    if (classificatorModel.expanded) {
      classificatorModel.expanded = false;
      return
    }
    this.okpdService.treeBy(classificatorModel.code).then(classificators => {
      console.log('>>>>3:', classificators);
      classificatorModel.name = classificatorModel.name;
      classificatorModel.classificator.children = classificators;
      classificatorModel.expanded = true;
    });
  }

}

class ClassificatorTreeModel {
  items:ClassificatorModel[] = [];
}

class ClassificatorModel {
  expanded:boolean;
  code:string;
  parentCode:string;
  name:string;
  notes:string;
  hasChildren:boolean;

  constructor(public classificator:Classificator) {
    this.name = classificator.name;
    this.code = classificator.code;
    this.parentCode = classificator.parentCode;
    this.notes = classificator.notes;
    this.hasChildren = classificator.hasChildren;
  }

}

function treeModel(classificatorTree:ClassificatorTree):ClassificatorTreeModel {
  console.log('>>>>treeModel:');
  if (classificatorTree == null) return null;
  let model = new ClassificatorTreeModel();
  for (let classificator of classificatorTree) {
    model.items.push(new ClassificatorModel(classificator));
  }
  return model;
}
