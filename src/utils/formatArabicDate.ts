import { format } from "date-fns";
import { ar } from "date-fns/locale";

const formatArabicDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "d MMMM", { locale: ar });
};

export default formatArabicDate