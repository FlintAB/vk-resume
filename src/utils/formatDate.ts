export const formatDate = (date: string): string => {
   if (!date) {
      return '';
   }

   const parts = date.split('.');
   if (parts.length !== 3) {
      return date;
   }

   const [day, month, year] = parts;

   if (!day || !month || !year) {
      return date;
   }

   const paddedDay = day.padStart(2, '0');
   const paddedMonth = month.padStart(2, '0');
   return `${paddedDay}.${paddedMonth}.${year}`;
}