import {RoomInfo} from './recources.interface';

export interface OrganizationInfo {
  id: string;
  logoUrl: string;
  fullName: string;
  shortName: string;
  legalFormId: string;
  inn: string;
  ogrn: string;
  registrationAddress: string;
  actualAddress: string;
  bankName: string;
  bik: string;
  correspondentAccount: string;
  settlementAccount: string;
  taxationSystemId: string;
  isVatExempt: boolean;
  nameHeadOfOrganization: string;
  positionOfOrganization: string;
  contacts: ContactInfo[];
  parts: PartInfo[];
}

export interface PartInfo {
  id: string;
  name: string;
  organizationTypeId: string;
  registrationNumber: string;
  accreditationLink: string;
  headOfPart: string;
  headPosition: string;
  organizationId: string;
  addresses: RoomInfo[];
  contacts: ContactInfo[];
}

export interface ContactInfo {
  id: string;
  contactTypeId: string;
  value: string;
  userId: string;
}

export interface EducationInfo {
  id: string;
  organizationName: string;
  userId: string;
  endDate: string;
  startDate: string;
  specialization: string;
  documentNumber?: string | null;
  documentIssueDate?: string | null;
  educationTypeId: string;
  educationDocumentTypeId: string;
}

export interface PersonInfo {
  id: string;
  avatarUrl: string;
  firstName: string;
  middleName: string | null | undefined;
  lastName: string;
  snils: string;
  birthPlace?: string;
  birthDate: string;
  educations: EducationInfo[];
  works: WorkResponsibilityInfo[];
  contacts: ContactInfo[];
}

export interface WorkResponsibilityInfo {
  id: string;
  measurementTypeIds: string[];
  userId: string;
  startDate: string;
  endDate?: string | null;
  position: string;
  organizationName: string;
}

