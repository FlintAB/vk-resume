import jsPDF from "jspdf";
import { IResumeData } from "../types/Types";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from 'file-saver';
import html2canvas from "html2canvas";


export const exportToPDF = async(element: HTMLElement | null, filename: string): Promise<void> => {
   if (!element) {
      console.error('Элемент для экспорта в PDF не найден');
      return Promise.reject(new Error('Элемент не найден'));
   }
   try {
      const canvas = await html2canvas(element, {
         scale: 2,
         useCORS: true,
         logging: false,
         backgroundColor: null,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
         unit: 'mm',
         format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

      while (heightLeft > pageHeight) {
         position -= pageHeight;
         heightLeft -= pageHeight;
         pdf.addPage();
         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      }

      pdf.save(`${filename}_resume.pdf`);
      return Promise.resolve();
   } catch (error) {
      console.error('Ошибка экспорта в PDF:', error);
      return Promise.reject(error);
   }
};

export const exportToWord = async (resume: IResumeData, filename: string) => {
   try {
   const doc = new Document({
      sections: [
         {
            properties: {},
            children: [
               new Paragraph({ children: [new TextRun({ text: resume.name, bold: true, size: 32 })] }),

               new Paragraph({ children: [new TextRun({ text: resume.position })] }),

               new Paragraph({ children: [new TextRun(`${resume.birthDate}, ${resume.city}`)] }),

               new Paragraph({ children: [] }),

               new Paragraph({ children: [new TextRun({ text: 'Навыки', bold: true, size: 24 })] }),

               new Paragraph({ children: [new TextRun({ text: resume.skills })] }),

               new Paragraph({ children: [] }),

               new Paragraph({ children: [new TextRun({ text: 'Образование', bold: true, size: 24 })] }),

               ...resume.education.map((university) => new Paragraph({ children: [
                  new TextRun({ text: university.title, bold: true }),
                  new TextRun(`\n${university.details}`), 
               ] })),

               new Paragraph({ children: [] }),

               new Paragraph({ children: [new TextRun({ text: 'Опыт работы', bold: true, size: 24 })] }),

               ...resume.experience.map((exp) => new Paragraph({ children: [
                  new TextRun({ text: exp.company, bold: true }),
                  new TextRun(`\n${exp.details}`), 
               ] })),

               new Paragraph({ children: [] }),

               new Paragraph({ children: [new TextRun({ text: 'О себе', bold: true, size: 24 })] }),

               new Paragraph({ children: [new TextRun(resume.about)] }),

               new Paragraph({ children: [] }),

               new Paragraph({ children: [new TextRun( { text: 'Портфолио', bold: true, size: 24 })] }),

               ...resume.portfolio.map((link) => new Paragraph({ children: [new TextRun(link)] }), ),
            ],
         },
      ],
   });

   const blob = await Packer.toBlob(doc);
   saveAs(blob, `${filename}_resume.docx`);
   } catch (error) {
      console.error('Ошибка при экспорте документа в формате DOCX:', error);
   }
};

export const exportToText = (resume: IResumeData, filename: string) => {
try {
   const content = `${resume.name}
${resume.position}
${resume.birthDate} ${resume.city}

Навыки: ${resume.skills}

Образование:
${resume.education.map((university) => `${university.title}\n${university.details}`).join('\n')}

Опыт работы:
${resume.experience.map((exp) => `${exp.company}\n${exp.details}`).join('\n')}

О себе: ${resume.about}

Портфолио:
${resume.portfolio.join('\n')}`;

   const blob = new Blob([content], { type: 'text/plain' });
   saveAs(blob, `${filename}_resume.txt`);
} catch (error) {
   console.error('Ошибка при экспорте документа в формате TXT:', error);
}
};