import { IEducation } from "./Education";
import { IExperiance } from "./Experiance";

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