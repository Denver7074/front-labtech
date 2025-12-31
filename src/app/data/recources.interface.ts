export interface RoomInfo {
  id: string;
  purpose: string;
  address: string;
  typeRoom: string;
  square: string;
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
}

export interface MeasurementEquipmentInfo extends AbstractEquipment{
  registrationNumber: string;
  attestations: EquipmentAttestationInfo[];
  characteristics: MetrologicalCharacteristicInfo[];
}

export interface StandardEquipmentInfo {
  id: string;
  standardTypeId: string;
  name: string;
  number: string;
  purpose: string;
  producer: string;
  information: string;
  termsOfUse: string;
  expirationDate: string;
  produceDate: string;
  characteristics: StandardMetrologicalCharacteristic[];
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

export interface StandardMetrologicalCharacteristic extends MetrologicalCharacteristicInfo {
  uncertainty: string;
  unitUncertainty: string;
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
  produceYear: string;
  yearOfCommissioning: string;
  produceNumber: string;
  uniqueNumber: string;
  location: string;
  contract: ContractInfo;
}

