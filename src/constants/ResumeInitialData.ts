import { IResumeData } from "../types/Types";

export const initialData: IResumeData = {
         name: '',
         birthDate: '',
         city: '',
         position: '',
         skills: '',
         education: [{title: '', details: ''}],
         experience: [{company: '', details: ''}],
         about: '',
         portfolio: [''],
         template: 'minimal'
}