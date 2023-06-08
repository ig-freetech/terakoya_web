import dayjs, { Dayjs } from "dayjs";
import ja from "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// https://cpoint-lab.co.jp/article/202108/20763/
import { isHoliday } from "japanese-holidays";

dayjs.locale(ja);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const TODAY_JST = dayjs().tz("Asia/Tokyo");

const ONE_WEEK_DAYS = 7;

export const ISO_FORMAT = "YYYY-MM-DD";

export const getNextSameDayDateList = (
  startingPointDate: Dayjs,
  count: number,
  excludeDateList: Array<string> = []
) => {
  const dateList = [];
  for (let i = 0; i < count; i++) {
    const nextWeekDate = startingPointDate.add(ONE_WEEK_DAYS * i, "day");
    if (
      // Exclude the date if it is in the excludeDateList or it is a holiday
      excludeDateList.some(
        (exDate) => dayjs(exDate).diff(nextWeekDate, "day") == 0
      ) ||
      Boolean(isHoliday(nextWeekDate.toDate(), true))
    ) {
      continue;
    }
    dateList.push(nextWeekDate);
  }
  return dateList;
};

/**
 * @param date day of the week
 * @param targetDay target next day
 * @param thresholdHour threshold hour to move forward a date
 * @returns target date dayjs object
 */
export const getNextTargetDayDate = (
  date: Dayjs,
  targetDay: number,
  thresholdHour: number
) =>
  date.day() == targetDay
    ? date.hour() < thresholdHour
      ? date
      : date.add(ONE_WEEK_DAYS, "day")
    : date.add(calcDiffDays(date.day(), targetDay), "day");

/**
 * @param dateDay day of the week
 * @param targetDay target next day of the week
 * @returns differential days between the day and the next targetDay
 */
export const calcDiffDays = (dateDay: number, targetDay: number) =>
  dateDay < targetDay
    ? targetDay - dateDay
    : ONE_WEEK_DAYS - (dateDay - targetDay);

export const __local__ = {
  getNextSameDayDateList,
  getNextTargetDayDate,
  calcDiffDays,
};
