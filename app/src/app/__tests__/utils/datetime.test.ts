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
  test("formatDate - Success", () => {
    const expected = formatDate(dayjs("2022-07-28"));
    expect(expected).toBe("07/28 (木)");
  });
  test("formatDate - Failed", () => {
    const expected = formatDate(dayjs("2022-05-8"));
    expect(expected).toBe("05/08 (日)");
  });
});
