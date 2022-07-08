import dayjs, { Dayjs } from "dayjs";
import ja from "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.locale(ja);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const TUESDAY = 2; // Sunday: 0 - Saturday: 6
export const SATURDAY = 6;

const START_TIME = 17; // テラコヤ開始時刻
const FORWARD_NEXT_WEEK = 7;
const GET_COUNT = 3; // 直近３日

// 参加希望日に表示しない日程のリスト
const EXCLUDE_DATE_LIST: Array<Dayjs> = [
  dayjs("2022-08-13"),
  dayjs("2022-08-16"),
];

const isBeforeDay = (day: number, getTargetDay: number) => day < getTargetDay;

const isBeforeENDTime = (todayHour: number) => {
  return todayHour < START_TIME;
};

const formatDate = (datetime: Dayjs): string => datetime.format("MM/DD (ddd)");

const getThreeDayList = (
  startDatetime: Dayjs,
  getCount: number = GET_COUNT
): Array<string> => {
  let tuesdayList: Array<string> = [];
  for (let i = 0; i < getCount; i++) {
    const nextWeekDateTime = startDatetime.add(FORWARD_NEXT_WEEK * i, "day");
    if (
      EXCLUDE_DATE_LIST.some(
        (excludeDate) => excludeDate.diff(nextWeekDateTime, "day") === 0
      )
    ) {
      continue;
    }
    const formattedTuesday = formatDate(nextWeekDateTime);
    tuesdayList.push(formattedTuesday);
  }
  return tuesdayList;
};

const getForwardDatePeriod = (day: number, getTargetDay: number) =>
  isBeforeDay(day, getTargetDay)
    ? getTargetDay - day
    : FORWARD_NEXT_WEEK - (day - getTargetDay);

const forwardDate = (today: Dayjs, getTargetDay: number): Dayjs =>
  today.add(getForwardDatePeriod(today.day(), getTargetDay), "day");

export const getNextThreeDayList = (
  getTargetDay: number,
  today: Dayjs = dayjs().tz("Asia/Tokyo")
): Array<string> => {
  return getThreeDayList(
    today.day() === getTargetDay
      ? isBeforeENDTime(today.hour())
        ? today
        : today.add(7, "day") // 翌週の対象曜日を最初の開催日に設定
      : forwardDate(today, getTargetDay) // 次の対象曜日を最初の開催日に設定
  );
};
