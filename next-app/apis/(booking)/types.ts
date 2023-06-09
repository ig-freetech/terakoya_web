import * as t from "io-ts";

export const TERAKOYA_TYPE = t.union([
  /**カフェ塾テラコヤ(池袋) */
  t.literal(1),
  /**オンラインテラコヤ(多摩) */
  t.literal(2),
  /**テラコヤ中等部(池袋) */
  t.literal(3),
  /**テラコヤ中等部(渋谷) */
  t.literal(4),
]);
export type TERAKOYA_TYPE = t.TypeOf<typeof TERAKOYA_TYPE>;

export const PLACE = t.union([
  /**サンシャインシティ */
  t.literal(1),
  /**良品計画本社 */
  t.literal(2),
  /**DIORAMA CAFE */
  t.literal(3),
  /**キャリア・マム */
  t.literal(4),
  /**キカガク */
  t.literal(5),
  /**未設定 */
  t.literal(0),
]);
export type PLACE = t.TypeOf<typeof PLACE>;

export const GRADE = t.union([
  /**高校1年生 */
  t.literal(1),
  /**高校2年生 */
  t.literal(2),
  /**高校3年生 */
  t.literal(3),
  /**中学1年生 */
  t.literal(11),
  /**中学2年生 */
  t.literal(12),
  /**中学3年生 */
  t.literal(13),
  /**その他 */
  t.literal(0),
]);
export type GRADE = t.TypeOf<typeof GRADE>;

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

export const COURSE_CHOICE = t.union([
  /**まだ決めていない */
  t.literal(1),
  /**文系 */
  t.literal(2),
  /**理系 */
  t.literal(3),
  /**その他 */
  t.literal(0),
  /**未選択 */
  t.literal(-1),
]);
export type COURSE_CHOICE = t.TypeOf<typeof COURSE_CHOICE>;

export const HOW_TO_KNOW_TERAKOYA = t.union([
  /**HP */
  t.literal(1),
  /**Instagram */
  t.literal(2),
  /**Facebook */
  t.literal(3),
  /**Twitter */
  t.literal(4),
  /**知人の紹介 */
  t.literal(5),
  /**ポスター・ビラ */
  t.literal(6),
  /**その他 */
  t.literal(0),
  /**未選択 */
  t.literal(-1),
]);
export type HOW_TO_KNOW_TERAKOYA = t.TypeOf<typeof HOW_TO_KNOW_TERAKOYA>;

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
  timestamp_iso: t.string,
  date_unix_time: t.number,
  uid: t.string,
});

export type BookingItem = t.TypeOf<typeof BookingItem>;
