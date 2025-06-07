export type TArrayFieldValue = 
   | {title?: string; details?: string}
   | {company?: string; details?: string}
   | string;


export interface IEducation {
   title: string;
   details: string;
}

export interface IExperiance {
   company: string;
   details: string;
}

export interface IResumeData {
   name: string;
   birthDate: string;
   city: string;
   position: string;
   skills: string;
   education: IEducation[];
   experience: IExperiance[];
   about: string;
   portfolio: string[];
   template: string;
}