import { format, parse } from "date-fns";

export const formatDate = (date?: Date) => {
  if(!date) return null
  return format(date, "dd/MM/yyyy");
};

export const parseDate = (date:string | null) => {
  if(!date) return undefined
  const formatStr = "dd/MM/yyyy";
  const referenceDate = new Date();
  return parse(date, formatStr, referenceDate);
}
