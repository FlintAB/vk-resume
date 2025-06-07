import jsPDF from "jspdf";
import { IResumeData } from "../types/Types";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from 'file-saver';


export const exportToPDF = (element: HTMLElement, filename: string) => {
      if (!element) {
         console.error('Элемент для экспорта в PDF не найден');
         return;
      }
      const pdf = new jsPDF();
      pdf.html(element, {
         callback: () => pdf.save(`${filename}_resume.pdf`),
         x: 10,
         y: 10,
      });
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
};