export type SectionType = 'exchange' | 'messages' | 'groups' | 'sfmbook' | 'sfmpay' | 'sfmarket' | 'sfmrealestate';

export interface Section {
  id: SectionType;
  label: string;
  icon?: string;
}