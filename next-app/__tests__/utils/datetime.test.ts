import dayjs from "dayjs";
import { __local__ } from "@utils/datetime";

const { calcDiffDays, getNextSameDayDateList, getNextTargetDayDate } =
  __local__;

describe("datetime.ts", () => {
  const TUESUDAY = 2;
  const SATURDAY = 6;
  describe("getNextSameDayDateList", () => {
    test("count: 3", () => {
      const startingPointDate = dayjs("2023-01-31"); // Tuesday
      expect(getNextSameDayDateList(startingPointDate, 3)).toEqual([
        dayjs("2023-01-31"),
        dayjs("2023-02-07"),
        dayjs("2023-02-14"),
      ]);
    });

    test("count: 5", () => {
      const startingPointDate = dayjs("2023-02-04"); // Saturday
      expect(getNextSameDayDateList(startingPointDate, 5)).toEqual([
        dayjs("2023-02-04"),
        // dayjs("2023-02-11"), // holiday
        dayjs("2023-02-18"),
        dayjs("2023-02-25"),
        dayjs("2023-03-04"),
      ]);
    });
    describe("With exclude date list", () => {
      const startingPointDate = dayjs("2023-01-31"); // Tuesday
      const EXCLUDE_DATE_LIST: Array<string> = ["2023-02-07"];
      expect(
        getNextSameDayDateList(startingPointDate, 3, EXCLUDE_DATE_LIST)
      ).toEqual([dayjs("2023-01-31"), dayjs("2023-02-14")]);
    });

    describe("Exclude holidays", () => {
      const startingPointDate = dayjs("2023-03-21"); // Tuesday of holiday
      const EXCLUDE_DATE_LIST: Array<string> = [];
      expect(
        getNextSameDayDateList(startingPointDate, 3, EXCLUDE_DATE_LIST)
      ).toEqual([dayjs("2023-03-28"), dayjs("2023-04-04")]);
    });
  });

  describe("calcDiffDays", () => {
    describe("Tuesday", () => {
      test("Sameday", () => {
        const today = dayjs("2023-01-31"); // Tuesday
        expect(calcDiffDays(today.day(), TUESUDAY)).toBe(7);
      });

      test("Beforeday", () => {
        const today = dayjs("2023-01-30"); // Monday
        expect(calcDiffDays(today.day(), TUESUDAY)).toBe(1);
      });

      test("Afterday", () => {
        const today = dayjs("2023-02-01"); // Wednesday
        expect(calcDiffDays(today.day(), TUESUDAY)).toBe(6);
      });
    });

    describe("Saturday", () => {
      test("Sameday", () => {
        const today = dayjs("2023-02-04"); // Saturday
        expect(calcDiffDays(today.day(), SATURDAY)).toBe(7);
      });

      test("Beforeday", () => {
        const today = dayjs("2023-01-30"); // Monday
        expect(calcDiffDays(today.day(), SATURDAY)).toBe(5);
      });

      // the day after saturday(6) doesn't exist because it's max number
      test("Afterdate", () => {
        const today = dayjs("2023-02-06"); // Monday
        expect(calcDiffDays(today.day(), SATURDAY)).toBe(5);
      });
    });
  });
  describe("attendance_date_list", () => {
    const TERAKOYA_START_TIME = 17;
    test("No exclude list", () => {
      const today = dayjs("2023-02-02"); // Thursday
      // 2023-02-07
      const startingPointDate = getNextTargetDayDate(
        today,
        TUESUDAY,
        TERAKOYA_START_TIME
      );
      expect(getNextSameDayDateList(startingPointDate, 3)).toEqual([
        dayjs("2023-02-07"),
        dayjs("2023-02-14"),
        dayjs("2023-02-21"),
      ]);
    });

    test("With exclude list", () => {
      const today = dayjs("2023-02-02"); // Thursday
      // 2023-02-07
      const startingPointDate = getNextTargetDayDate(
        today,
        TUESUDAY,
        TERAKOYA_START_TIME
      );
      const EXCLUDE_DATE_LIST: Array<string> = ["2023-02-07", "2023-02-21"];
      expect(
        getNextSameDayDateList(startingPointDate, 3, EXCLUDE_DATE_LIST)
      ).toEqual([dayjs("2023-02-14")]);
    });
  });
});
