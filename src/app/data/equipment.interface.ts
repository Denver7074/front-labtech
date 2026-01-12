export interface RoomInfo {
  id: string;
  purpose: string;
  address: string;
  typeRoom: string;
  square: number;
  contract: ContractInfo;
  parameterTypeIds: string[];
  equipmentTypeIds: string[];
}

export interface AdditionalEquipmentInfo extends AbstractEquipment{
  purpose: string;
}

export interface TestEquipmentInfo extends AbstractEquipment{
  measurementType: string;
  measurementGroup: string;
  attestations: EquipmentAttestationInfo[];
  characteristics: MetrologicalCharacteristicInfo[];
  maintenances: MaintenanceInfo[];
}

export interface MeasurementEquipmentInfo extends AbstractEquipment{
  registrationNumber: string;
  attestations: EquipmentAttestationInfo[];
  characteristics: MetrologicalCharacteristicInfo[];
}



export interface ContractInfo {
  id: string;
  contractNumber: string;
  contractDate: string;
  endAt: string;
  isOwn: boolean;
}

export interface EquipmentAttestationInfo {
  id: string;
  isSuccess: boolean;
  attestationNumber: string;
  endAt: string;
  startAt: string;
}



export interface MetrologicalCharacteristicInfo {
  id: string;
  name: string;
  value: string;
  unit: string;
}

export const roomTypeMap = new Map([
  ['SPECIAL', 'Специальное'],
  ['ADAPTATIONS', 'Приспособленное']
]);

interface AbstractEquipment {
  id: string;
  name: string;
  producer: string;
  produceYear: number;
  yearOfCommissioning: number;
  produceNumber: string;
  uniqueNumber: string;
  location: string;
  contract: ContractInfo;
}

export interface MaintenanceInfo {
  id: string;
  typeName: string;
  description: string;
  frequency: string;
  interval: number;
}

export const frequencyTypeMap = new Map<string, string>([
  ['WEEKLY', 'Еженедельно'],
  ['MONTHLY', 'Ежемесячно'],
  ['YEARLY', 'Ежегодно'],
  ['ON_DEMAND', 'По требованию']
]);
