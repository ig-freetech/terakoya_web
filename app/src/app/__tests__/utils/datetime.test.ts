import { __local__ } from "@utils/datetime";

const {
  dayjs,
  formatDate,
  forwardDate,
  getForwardDatePeriod,
  getNextThreeDayList,
  getThreeDayList,
  isBeforeDay,
  isBeforeENDTime,
} = __local__;

describe("utils/datetime.ts", () => {
  test("formatDate - 2022-07-28", () => {
    const expected = formatDate(dayjs("2022-07-28"));
    expect(expected).toBe("07/28 (木)");
  });
  test("formatDate - 20220508", () => {
    const expected = formatDate(dayjs("20220508"));
    expect(expected).toBe("05/08 (日)");
  });
});
