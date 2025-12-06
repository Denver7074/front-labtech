export interface PersonInfo {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  snils?: string | null;
  birthPlace?: string | null;
  birthDate: string;
  educations: EducationInfo[];
  works: WorkResponsibilityInfo[];
  contacts: ContactInfo[];
}

export interface EducationInfo {
  organizationName: string;
  userId: string;
  endDate: string;
  startDate: string;
  specialization: string;
  documentNumber?: string | null;
  documentIssueDate?: string | null;
  educationTypeId: string;
}

export interface WorkResponsibilityInfo {
  measurementTypeIds: string[];
  userId: string;
  startDate: string;
  endDate?: string | null;
  position: string;
  organizationName: string;
}

export interface ContactInfo {
  contactTypeId: string;
  value: string;
  userId: string;
}
