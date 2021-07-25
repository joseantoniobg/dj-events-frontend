import { DateTime } from "luxon";

export const getDateAsStringDDMMYYYY = (date: FormDataEvent): string => {
  const dt = DateTime.fromISO(date);
  return dt.toFormat("dd/MM/yyyy");
};
