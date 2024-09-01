import { parseISO, format } from 'date-fns';
import { ar } from 'date-fns/locale';

const formatFullArabicDate = (isoDateString: string): string => {
  const date = parseISO(isoDateString);
  
  const formattedDate = format(date, "EEEE'، 'd MMMM'، الساعة 'h:mm a", {
    locale: ar,
  });

  // Replace AM/PM with Arabic equivalents
  return formattedDate;
};

export default formatFullArabicDate;