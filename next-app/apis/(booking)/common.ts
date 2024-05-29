import * as t from "io-ts";

import {
  GRADE,
  COURSE_CHOICE,
  HOW_TO_KNOW_TERAKOYA,
} from "@apis/(user)/common";

export const TERAKOYA_TYPE = t.union([
  /**カフェ塾テラコヤ(池袋) */
  t.literal(1),
  /**オンラインテラコヤ(多摩) */
  t.literal(2),
  /**テラコヤ中等部(池袋) */
  t.literal(3),
  /**テラコヤ中等部(渋谷) */
  t.literal(4),
  /**ひばりヶ丘校 */
  t.literal(5),
]);
export type TERAKOYA_TYPE = t.TypeOf<typeof TERAKOYA_TYPE>;

export const PLACE = t.union([
  /**サンシャインシティ */
  t.literal(1),
  /**良品計画本社 */
  t.literal(2),
  /**テラコヤ事務所（ベースキャンプ） */
  t.literal(3),
  /**キャリア・マム */
  t.literal(4),
  /**キカガク */
  t.literal(5),
  /**ひばりヶ丘校 */
  t.literal(6),
  /**未設定 */
  t.literal(0),
]);
export type PLACE = t.TypeOf<typeof PLACE>;

export const ARRIVAL_TIME = t.union([
  /**17:00前 */
  t.literal(1),
  /**17:00~17:30 */
  t.literal(2),
  /**17:30~18:00 */
  t.literal(3),
  /**18:00以降 */
  t.literal(4),
]);
export type ARRIVAL_TIME = t.TypeOf<typeof ARRIVAL_TIME>;

export const TERAKOYA_EXPERIENCE = t.union([
  /**今回が初回 */
  t.literal(1),
  /**過去に参加したことがある */
  t.literal(2),
]);
export type TERAKOYA_EXPERIENCE = t.TypeOf<typeof TERAKOYA_EXPERIENCE>;

export const STUDY_SUBJECT = t.union([
  /**英語 */
  t.literal(1),
  /**国語 */
  t.literal(2),
  /**数学 */
  t.literal(3),
  /**社会 */
  t.literal(4),
  /**理科 */
  t.literal(5),
  /**推薦型入試対策（志望理由書・面接など） */
  t.literal(6),
  /**大学説明会 */
  t.literal(7),
  /**キャリア説明会 */
  t.literal(8),
  /**英検 */
  t.literal(9),
  /**その他 */
  t.literal(0),
]);
export type STUDY_SUBJECT = t.TypeOf<typeof STUDY_SUBJECT>;

export const STUDY_STYLE = t.union([
  /**黙々と静かに勉強したい */
  t.literal(1),
  /**分からない点があったらスタッフに質問したい */
  t.literal(2),
  /**友達と話しながら楽しく勉強したい */
  t.literal(3),
  /**1人では難しいのでスタッフ付きっ切りで勉強を教えて欲しい */
  t.literal(4),
  /**勉強も教えて欲しいけどスタッフの話を聞いたり、相談したい */
  t.literal(5),
  /**その他 */
  t.literal(0),
  /**未選択 */
  t.literal(-1),
]);
export type STUDY_STYLE = t.TypeOf<typeof STUDY_STYLE>;

export const IS_REMINDED = t.union([
  /**未送信 */
  t.literal(0),
  /**送信済み */
  t.literal(1),
]);
export type IS_REMINDED = t.TypeOf<typeof IS_REMINDED>;

export const BookingItem = t.type({
  date: t.string,
  sk: t.string,
  email: t.string,
  terakoya_type: TERAKOYA_TYPE,
  place: PLACE,
  name: t.string,
  grade: GRADE,
  arrival_time: ARRIVAL_TIME,
  terakoya_experience: TERAKOYA_EXPERIENCE,
  study_subject: STUDY_SUBJECT,
  study_subject_detail: t.string,
  study_style: STUDY_STYLE,
  school_name: t.string,
  first_choice_school: t.string,
  course_choice: COURSE_CHOICE,
  future_free: t.string,
  like_thing_free: t.string,
  how_to_know_terakoya: HOW_TO_KNOW_TERAKOYA,
  remarks: t.string,
  is_reminded: IS_REMINDED,
  timestamp: t.number,
  // There's records that timestamp_iso is undefined in dynamodb.
  // https://snyk.io/advisor/npm-package/io-ts/functions/io-ts.undefined
  timestamp_iso: t.union([t.string, t.undefined]),
  date_unix_time: t.number,
  uid: t.string,
});

export type BookingItem = t.TypeOf<typeof BookingItem>;

/**Query keys */
export const BOOKING_LIST_QUERY_KEY = "booking-list";
export const BOOKING_EXCLUDED_DATES_QUERY_KEY = "booking-excluded-dates";
