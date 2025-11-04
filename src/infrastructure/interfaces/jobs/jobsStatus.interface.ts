


export interface JobsInterfaceStatus {
    data: JobsInterfaceStatusData[];

}

export interface JobsInterfaceStatusData {
  id: string;
  title: string;
  department_name: string;
  department_profile: string;
  created_at: Date;
  description: string;
  updated_at: Date;
  published_at?: Date;
  archived_at?: Date;
  applies_until: Date | string; // porque usas "no está especificado"
  status: string;
  salary_min: SalaryM;
  salary_max: SalaryM;
  slots: number;
  candidates: number;
  location: Location;

}


export interface SalaryM {
    amount: number;
    currency: string;
}


export interface Location {
  country: string;
  state: string;
 
}




