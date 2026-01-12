import {MetrologicalCharacteristicInfo} from './equipment.interface';

export interface StandardReagentInfo extends Reagent {
  standardTypeId: string;
  information: string;
  characteristics: StandardMetrologicalCharacteristic[];
  consumable: boolean;
}

export interface Reagent extends AbstractReagent {
  number: string;
  purpose: string;
  producer: string;
  termsOfUse: string;
  produceDate: string;
  initialQuantity: number;
  unit: string;
  expenditures: ExpenditureInfo[];
  remains: number;
  purityTypeId: string;
  purityValue: number;
  chemicalSolutionName: string;
}

export interface ExpenditureInfo {
  id: string;
  useDate: string;
  quantity: number;
  description: string;
}

export interface StandardMetrologicalCharacteristic extends MetrologicalCharacteristicInfo {
  uncertainty: string;
  unitUncertainty: string;
}

export interface ChemicalSolutionInfo extends AbstractReagent {
  description: string;
  dishes: string;
  termsOfUse: string;
  unit: string;
  createdSolution: string;
  initialQuantity: number;
  remains: number;
  canUse: boolean;
  conditions: string;
}

export interface AbstractReagent {
  id: string;
  name: string;
  canUse: boolean;
  expirationDate: string;
}


