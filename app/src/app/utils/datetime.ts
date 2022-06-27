import dayjs, { Dayjs } from "dayjs";
import ja from "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.locale(ja);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const TUESDAY = 2; // Sunday: 0 - Saturday: 6
const START_TIME = 17; // テラコヤ開始時刻
const FORWARD_NEXT_WEEK = 7;
const GET_COUNT = 3; // 直近３日間

const isTuesday = (day: number) => {
  return day === TUESDAY;
};
const isBeforeTuesday = (day: number) => day < TUESDAY;

const isBeforeENDTime = (todayHour: number) => {
  return todayHour < START_TIME;
};

const formatDate = (datetime: Dayjs): string => datetime.format("M/D (ddd)");

const getTuesdayList = (
  startDatetime: Dayjs,
  getCount: number = GET_COUNT
): Array<string> => {
  let tuesdayList: Array<string> = [];
  for (let i = 0; i < getCount; i++) {
    const formattedTuesday = formatDate(
      startDatetime.add(FORWARD_NEXT_WEEK * i, "day")
    );
    tuesdayList.push(formattedTuesday);
  }
  return tuesdayList;
};

const getForwardDatePeriod = (day: number) =>
  isBeforeTuesday(day) ? TUESDAY - day : FORWARD_NEXT_WEEK - (day - TUESDAY);

const forwardDate = (today: Dayjs): Dayjs =>
  today.add(getForwardDatePeriod(today.day()), "day");

export const getNextTuesdayList = (
  today: Dayjs = dayjs().tz("Asia/Tokyo")
): Array<string> => {
  return getTuesdayList(
    isTuesday(today.day())
      ? isBeforeENDTime(today.hour())
        ? today
        : today.add(7, "day") // 翌週の火曜日を最初の開催日に設定
      : forwardDate(today) // 次の火曜日を最初の開催日に設定
  );
};
