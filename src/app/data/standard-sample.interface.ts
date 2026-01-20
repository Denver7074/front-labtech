import {ContractInfo, MetrologicalCharacteristicInfo} from './equipment.interface';

export interface StandardReagentInfo extends Reagent {
  standardTypeId: string;
  characteristics: StandardMetrologicalCharacteristic[];
  consumable: boolean;
}

export interface Reagent extends ChemicalSolutionInfo {
  number: string;
  producer: string;
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

export interface ChemicalSolutionInfo {
  id: string;
  name: string;
  canUse: boolean;
  expirationDate: string;
  produceDate: string;
  initialQuantity: number;
  remains: number;
  unit: string;
  termsOfUse: string;
  regulatoryDocuments: string[];
  purpose: string;
  information: string;
  expenditures: ExpenditureInfo[];
  contract: ContractInfo;
  type: string;
  organizationPartId: string;
  actDebiting: ActDebitingInfo;
  solutionComponents: SolutionComponentInfo[];
}

export interface ActDebitingInfo {
  id: string;
  dateDebit: string;
  description: string;
  purpose: string;
}

export interface SolutionComponentInfo {
  id: string;
  value: number;
  reagentId: string;
  type: string;
}

export const reagentTypeMap = new Map([
  ['CONTROLLED_SUBSTANCE', 'precursors'],
  ['CHEMICAL_SOLUTION', 'chemical-solutions'],
  ['REAGENT', 'reagents'],
  ['STANDARD_TYPE', 'standard-samples']
]);

