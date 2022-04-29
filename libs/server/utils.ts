import { set } from "date-fns";
import { startHour } from "./constants";

export const getCanStartTime = () =>
  new Date(set(new Date(), { hours: startHour, minutes: 0 }));

export const getCurDateInServer = (date: string | number) => {
  const timeZoneOffset = new Date(date).getTimezoneOffset();
  const curTime = new Date(date).getTime() - timeZoneOffset * 1000 * 60;
  return new Date(curTime);
};
