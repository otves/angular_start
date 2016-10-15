export interface Classificator {
  code: string;
  parentCode: string;
  name: string;
  notes?: string;
  hasChildren:boolean;
  children?:Classificator[];
}
