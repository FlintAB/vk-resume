import { FC, useRef, useState } from "react";
import { IUserProps } from "../types/Props";
import { useLocation, useRouteNavigator } from "@vkontakte/vk-mini-apps-router/dist/hooks/hooks";
import { IResumeData } from "../types/Types";
import { initialData } from "../constants/ResumeInitialData";
import { themeColor } from "../constants/themeColors";
import { Button, ButtonGroup, Div, Group, Headline, Panel, PanelHeader, PanelHeaderBack, Spacing, Text, Title } from "@vkontakte/vkui";
import { exportToPDF, exportToText, exportToWord } from "../utils";
import { showErrorSnackBar, showSuccessSnackBar } from "../utils/snackBar";

export const ResumePreview: FC<IUserProps> = ({ appearance }) => {
   const routeNavigator = useRouteNavigator();
   const location = useLocation();
   const locationState = location.state as { data?: IResumeData } | null;
   const data: IResumeData = locationState?.data || initialData;
   const { primaryText, secondaryText } = themeColor[appearance];
   const resumeRef = useRef<HTMLDivElement>(null);
   const [snackBar, setSnackBar] = useState<React.ReactElement | null>(null);

   const handleExportPDF = () => {
      if (!data.name) {
         showErrorSnackBar({ message: 'Укажите имя для файла', setSnackBar, appearance });
         return;
      }
      if (resumeRef.current) {
         try {
            exportToPDF(resumeRef.current, data.name);
            showSuccessSnackBar({ message: 'PDF успешно сохранён', setSnackBar, appearance });
         } catch (error) {
            showErrorSnackBar({ message: 'Ошибка при сохранении в PDF', setSnackBar, appearance });
         }
      } else {
         showErrorSnackBar({ message: 'Ошибка: резюме не найдено', setSnackBar, appearance });
      }
   }

   const handleExportWord = () => {
      if (!data.name) {
         showErrorSnackBar({ message: 'Укажите имя для файла', setSnackBar, appearance });
         return;
      }
      if (resumeRef.current) {
         try {
            exportToWord(data, data.name);
            showSuccessSnackBar({ message: 'DOCX успешно сохранён', setSnackBar, appearance });
         } catch (error) {
            showErrorSnackBar({ message: 'Ошибка при сохранении в DOCX', setSnackBar, appearance });
         }
      } else {
         showErrorSnackBar({ message: 'Ошибка: резюме не найдено', setSnackBar, appearance });
      }
   }

   const handleExportText = () => {
      if (!data.name) {
         showErrorSnackBar({ message: 'Укажите имя для файла', setSnackBar, appearance });
         return;
      }
      if (resumeRef.current) {
         try {
            exportToText(data, data.name);
            showSuccessSnackBar({ message: 'TXT успешно сохранён', setSnackBar, appearance });
         } catch (error) {
            showErrorSnackBar({ message: 'Ошибка при сохранении в TXT', setSnackBar, appearance });
         }
      } else {
         showErrorSnackBar({ message: 'Ошибка: резюме не найдено', setSnackBar, appearance });
      }
   }

   return (
      <Panel id='preview'>

         <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()}/>}>Предпросмотр резюме</PanelHeader>

         <Group style={{padding: '16px'}}>

            <Headline weight="2" style={{ color: primaryText }}>Ваше резюме</Headline>

            <Spacing size={16}/>

            <Div getRootRef={resumeRef} style={{ padding: '20px'}}>

               <Title level="1" style={{  color: primaryText, marginBottom: '8px'}}>{data.name}</Title>

               <Text style={{ color: secondaryText, marginBottom: '16px' }}>{data.position}</Text>

               <Text style={{ color: secondaryText, marginBottom: '16px' }}>{data.birthDate}, {data.city}</Text>

               <Title level="2" style={{ color: primaryText, marginBottom: '8px' }}>Навыки</Title>

               <Text style={{ color: secondaryText, marginBottom: '16px' }}>{data.skills}</Text>

               <Title level="2" style={{ color: primaryText, marginBottom: '8px' }}>Образование</Title>

               {data.education?.length > 0 && data.education.map((university, index) => (
                  <Div key={index}>
                     <Text style={{ color: primaryText, fontWeight: 'bold' }}>{university.title}</Text>
                     <Text style={{ color: primaryText }}>{university.details}</Text>
                  </Div>
               ))}

               <Title level="2" style={{ color: primaryText, marginBottom: '8px' }}>Опыт работы</Title>

               {data.experience?.length > 0 && data.experience.map((exp, index) => (
                  <Div key={index}>
                     <Text style={{ color: primaryText, fontWeight: 'bold' }}>{exp.company}</Text>
                     <Text style={{ color: primaryText }}>{exp.details}</Text>
                  </Div>
               ))}

               <Title level="2" style={{ color: primaryText, marginBottom: '8px' }}>О себе</Title>

               <Text style={{ color: secondaryText, marginBottom: '16px' }}>{data.about}</Text>

               <Title level="2" style={{ color: primaryText, marginBottom: '8px' }}>Портфолио</Title>

               {data.portfolio?.filter(link => link.trim()).map((link, index) => (
                  <Text key={index} style={{ color: primaryText }}>{link}</Text>
                  )) || <Text style={{ color: secondaryText }}>Портфолио не указано</Text>}

            </Div>

            <Spacing size={24}/>

            <ButtonGroup  mode="horizontal" align="center" gap="m">

               <Button size="s" mode="primary" appearance="positive" onClick={handleExportPDF}>
                  Скачать PDF
               </Button>

               <Button size="s" mode="primary" appearance="positive" onClick={handleExportWord}>
                  Скачать DOCX
               </Button>

               <Button size="s" mode="primary" appearance="positive" onClick={handleExportText}>
                  Скачать TXT
               </Button>

            </ButtonGroup>
               {snackBar}
         </Group>
      </Panel>
   )
}