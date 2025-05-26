import React, { FC, useEffect, useState } from "react";
import { IUserProps } from "../types/FetchedUser";
import { IResumeData } from "../types/ResumeForm";
import { Button, FormItem, FormLayoutGroup, Group, Headline, Input, Panel, PanelHeader, Select, Spacing, Textarea } from "@vkontakte/vkui";
import { TemplateOptions } from "../constants/TemplateOptions";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { formateDate } from "../utils/formateDate";

export const ResumeForm: FC<IUserProps> = ({fetchedUser}) => {
   const router = useRouteNavigator();
   const [data, setData] = useState<IResumeData>({
      name: '',
      birthDate: '',
      city: '',
      position: '',
      skills: '',
      education: '',
      experience: '',
      about: '',
      portfolio: '',
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
                  <Textarea value={data.education} placeholder="НИТУ МИСИС, Факультет ИТКН, 2024-2026" onChange={(e) => handleInputChange(e, 'education')}/>
               </FormItem>

               <FormItem top='Опыт работы'>
                  <Textarea value={data.experience} placeholder="Компания, должность, xxxx-xxxx" onChange={(e) => handleInputChange(e, 'experience')}/>
               </FormItem>

               <FormItem top='О себе'>
                  <Textarea value={data.about} placeholder="Краткое описание ваших целей и интересов" onChange={(e) => handleInputChange(e, 'about')}/>
               </FormItem>

               <FormItem top='Ссылки на портфолио'>
                  <Input value={data.portfolio} placeholder="https://" onChange={(e) => handleInputChange(e, 'portfolio')}/>
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