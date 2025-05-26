export const formateDate = (date: string): string => {
   if (!date) {
      return '';
   }
   const [day, month, year] = date.split('.');
   const paddedDay = day.padStart(2, '0');
   const paddedMonth = month.padStart(2, '0');
   return `${paddedDay}.${paddedMonth}.${year}`;
}