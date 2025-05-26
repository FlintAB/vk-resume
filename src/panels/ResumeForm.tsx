import React, { FC, useEffect, useState } from "react";
import { IUserProps } from "../types/FetchedUser";
import { IResumeData } from "../types/ResumeForm";
import { Button, FormItem, FormLayoutGroup, Group, Headline, IconButton, Input, Panel, PanelHeader, Select, Spacing, Textarea } from "@vkontakte/vkui";
import { TemplateOptions } from "../constants/TemplateOptions";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { formateDate } from "../utils/formateDate";
import { Icon24AddOutline, Icon28DeleteOutline } from "@vkontakte/icons";
import { TArrayFieldValue } from "../types/ArrayFieldValue";
import { IEducation } from "../types/Education";
import { IExperiance } from "../types/Experiance";

export const ResumeForm: FC<IUserProps> = ({fetchedUser}) => {
   const router = useRouteNavigator();
   const [data, setData] = useState<IResumeData>({
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
   });

   useEffect(() => {
      if (fetchedUser){
         setData((prev) => ({
            ...prev,
            name: `${fetchedUser.first_name} ${fetchedUser.last_name}`,
            birthDate: fetchedUser.bdate ? formateDate(fetchedUser.bdate) : '',
            city: fetchedUser.city?.title || '',
         }));
      }
   }, [fetchedUser]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, field: keyof IResumeData) => {
      setData ({...data, [field]: e.target.value});
   };

   const handleArrFieldChange = (field: 'education' | 'experience' | 'portfolio', index: number, value: TArrayFieldValue) => {
      setData((prev) => {
         const updatedArr = [...prev[field]];
         if (field === 'portfolio') {
            updatedArr[index] = value as string;
         } else {
            updatedArr[index] = {
               ...(updatedArr[index] as IEducation | IExperiance),
               ...(value as object)};
         }
         return {...prev, [field]: updatedArr};
      });
   };

   const addArrField = (field: 'education' | 'experience' | 'portfolio') => {
      setData((prev) => ({
         ...prev,
         [field]: field === 'portfolio' ? [...prev.portfolio, ''] : field === 'education' ? [...prev.education, {title: '', details: ''}] : [...prev.experience, {company: '', details: ''}]
      }));
   };

   const removeArrField = (field: 'education' | 'experience' | 'portfolio', index: number) => {
      setData((prev) => ({
         ...prev,
         [field]: prev[field].filter((_, i) => i !== index)
      }));
   }

   return (
      <Panel id="form">
         <PanelHeader>CV Form</PanelHeader>
         <Group style={{padding: '16px'}}>
            <Headline weight="2" style={{color: '#000000'}}>Создайте ваше резюме</Headline>
            <Spacing size={16}/>
            <FormItem top="Шаблон резюме">
               <Select value={data.template} onChange={(e) => handleInputChange(e, 'template')} options={[...TemplateOptions]}/>
            </FormItem>
            <FormLayoutGroup>

               <FormItem top='Имя & Фамилия'>
                  <Input value={data.name} placeholder="Иван Иванов" onChange={(e) => handleInputChange(e, 'name')}/>
               </FormItem>

               <FormItem top='Дата рождения'>
                  <Input value={data.birthDate} placeholder="ДД.ММ.ГГГГ" onChange={(e) => handleInputChange(e, 'birthDate')}/>
               </FormItem>

               <FormItem top='Город'>
                  <Input value={data.city} placeholder="Москва" onChange={(e) => handleInputChange(e, 'city')}/>
               </FormItem>

               <FormItem top='Желаемая должность'>
                  <Input value={data.position} placeholder="Frontend-разработчик" onChange={(e) => handleInputChange(e, 'position')}/>
               </FormItem>

               <FormItem top='Навыки'>
                  <Input value={data.skills} placeholder="TypeScript, Ответственный, Английский язык" onChange={(e) => handleInputChange(e, 'skills')}/>
               </FormItem>

               <FormItem top='Образование'>
                  {data.education.map((entry, index) => (
                     <FormLayoutGroup key={index} style={{marginBottom:'12px'}}>
                        <FormItem top={'Учебное заведение'}>
                           <Input value={entry.title} placeholder="НИТУ МИСИС" onChange={(e) => handleArrFieldChange('education', index, {title: e.target.value})} />
                        </FormItem>
                        <FormItem top={'Детали'}>
                           <Textarea value={entry.details} placeholder="Факультет | Специализация | XXXX-XXXX" onChange={(e) => handleArrFieldChange('education', index, {details: e.target.value})} />
                        </FormItem>
                        {data.education.length > 1 && (
                           <IconButton onClick={() => removeArrField('education', index)}>
                              <Icon28DeleteOutline/>
                           </IconButton>
                        )}
                     </FormLayoutGroup>
                  ))}
                  <Button mode="tertiary" onClick={() => addArrField('education')} before={<Icon24AddOutline/>} />
               </FormItem>

               <FormItem top='Опыт работы'>
                  {data.experience.map((entry, index) => (
                     <FormLayoutGroup key={index} style={{marginBottom:'12px'}}>
                        <FormItem top={'Компания'}>
                           <Input value={entry.company} placeholder="ООО Ромашка" onChange={(e) => handleArrFieldChange('experience', index, {company: e.target.value})} />
                        </FormItem>
                        <FormItem top={'Детали'}>
                           <Textarea value={entry.details} placeholder="Должность | Обязанности | Достижения" onChange={(e) => handleArrFieldChange('experience', index, {details: e.target.value})} />
                        </FormItem>
                        {data.experience.length > 1 && (
                           <IconButton onClick={() => removeArrField('experience', index)}>
                              <Icon28DeleteOutline/>
                           </IconButton>
                        )}
                     </FormLayoutGroup>
                  ))}
                  <Button mode="tertiary" onClick={() => addArrField('experience')} before={<Icon24AddOutline/>} />
               </FormItem>

               <FormItem top='О себе'>
                  <Textarea value={data.about} placeholder="Краткое описание ваших целей и интересов" onChange={(e) => handleInputChange(e, 'about')}/>
               </FormItem>

               <FormItem top='Ссылки на портфолио'>
                  {data.portfolio.map((link, index) => (
                     <FormLayoutGroup key={index} style={{marginBottom: '12px'}}>
                        <FormItem top={'Ссылка'}>
                           <Input value={link} placeholder="https://" onChange={(e) => handleArrFieldChange('portfolio', index, e.target.value)}/>
                        </FormItem>
                        {data.portfolio.length > 1 && (
                           <IconButton onClick={() => removeArrField('portfolio', index)}>
                              <Icon28DeleteOutline/>
                           </IconButton>
                        )}
                     </FormLayoutGroup>
                  ))}
                  <Button mode="tertiary" onClick={() => addArrField('portfolio')} before={<Icon24AddOutline/>}/>
               </FormItem>

            </FormLayoutGroup>
            <Spacing size={24}/>
            <Button size="s" mode="primary" onClick={() => console.log(data)}>
               Сохранить
            </Button>
            <Button size="s" mode="primary" onClick={() => router.back()}>
               Вернуться назад
            </Button>
         </Group>
      </Panel>
   )
}