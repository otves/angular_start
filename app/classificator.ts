export interface Classificator {
  code: string;
  parentCode: string;
  name: string;
  notes?: string;
  hasChildren:boolean;
  children?:Classificator[];
}

export interface ClassificatorTree extends Array<Classificator> {
  name: string;
}

export interface ClassificatorUnited {
  okpd?: Classificator;
  okpd2?: Classificator;
  tnved?: Classificator;
}
