export interface Client {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  birthDate: string;
  phone: string;
  status: 'В залі' | 'Відсутній';
  startDate?: string;
  endDate?: string;
  hasLocker: boolean;
  lockerNumber?: number;
  hasTrainer: boolean;
  isTrainer: boolean;
  hasTrainerPackage?: boolean; 
}
