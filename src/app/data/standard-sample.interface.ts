import {MetrologicalCharacteristicInfo} from './equipment.interface';

export interface StandardReagentInfo extends AbstractReagent {
  standardTypeId: string;
  information: string;
  characteristics: StandardMetrologicalCharacteristic[];
  consumable: boolean;
}

export interface AbstractReagent {
  id: string;
  name: string;
  number: string;
  purpose: string;
  producer: string;
  termsOfUse: string;
  expirationDate: string;
  produceDate: string;
  initialQuantity: number;
  unit: string;
  expenditures: ExpenditureInfo[];
  remains: number;
  purityTypeId: string;
  purityValue: number;
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
