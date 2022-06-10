export type TSetHospitalById = (hospitalData: IHospital) => void;
export type TDeleteHospitalById = (id: number) => void;
export type THospitalId = number;
export interface IHospital {
  id: number;
  hospitalName: string;
  streetLine1: string;
  streetLine2: string;
  city: string;
  state: string;
  zip: string;
  contactPerson: string;
  contactCellphone: string;
}