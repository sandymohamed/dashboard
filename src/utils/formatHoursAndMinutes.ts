import { format } from "date-fns";
import { ar } from "date-fns/locale";

const formatHoursAndMinutes = (dateString: string) => {
  return format(new Date(dateString), "hh:mm a", {
    locale: ar,
  })
};

export default formatHoursAndMinutes;