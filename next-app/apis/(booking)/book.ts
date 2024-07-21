import { useMutation } from "react-query";

import { post } from "@apis/common";

export const TERAKOYA_TYPE = {
  /**カフェ塾テラコヤ(池袋) */
  HIGH_IKE: 1,
  /**オンラインテラコヤ(多摩) */
  ONLINE_TAMA: 2,
  /**テラコヤ中等部(池袋) */
  MID_IKE: 3,
  /**テラコヤ中等部(渋谷) */
  MID_SHIBU: 4,
  /**ひばりヶ丘校 */
  HIBARI: 5,
  /**神田校 */
  KANDA: 6,
} as const;
/**テラコヤ種別 (terakoya_type) - required */
export type TERAKOYA_TYPE = (typeof TERAKOYA_TYPE)[keyof typeof TERAKOYA_TYPE];

export const ARRIVAL_TIME = {
  /**17:00前 */
  BEFORE_1700: 1,
  /**17:00~17:30 */
  FROM_1700_TO_1730: 2,
  /**17:30~18:00 */
  FROM_1730_TO_1800: 3,
  /**18:00以降 */
  AFTER_1800: 4,
} as const;
/**到着予定時間帯 (arrival_time) - required */
export type ARRIVAL_TIME = (typeof ARRIVAL_TIME)[keyof typeof ARRIVAL_TIME];

export const GRADE = {
  /**高校1年生 */
  HIGH_1: 1,
  /**高校2年生 */
  HIGH_2: 2,
  /**高校3年生 */
  HIGH_3: 3,
  /**中学1年生 */
  MID_1: 11,
  /**中学2年生 */
  MID_2: 12,
  /**中学3年生 */
  MID_3: 13,
  /**その他 */
  OTHER: 0,
} as const;
/**学年 (grade) - required */
export type GRADE = (typeof GRADE)[keyof typeof GRADE];

export const TERAKOYA_EXPERIENCE = {
  /**今回が初回 */
  FIRST_TIME: 1,
  /**過去に参加したことがある */
  DONE: 2,
} as const;
/**テラコヤ参加経験 (terakoya_experience) - required */
export type TERAKOYA_EXPERIENCE =
  (typeof TERAKOYA_EXPERIENCE)[keyof typeof TERAKOYA_EXPERIENCE];

export const STUDY_SUBJECT = {
  /**英語 */
  ENG: 1,
  /**国語 */
  JPN: 2,
  /**数学 */
  MAT: 3,
  /**社会 */
  SOC: 4,
  /**理科 */
  SCI: 5,
  /**推薦型入試対策（志望理由書・面接など） */
  AO_ENTRANCE: 6,
  /**大学説明会 */
  ORIENTATION: 7,
  /**キャリア説明会 */
  CAREER: 8,
  /**英検 */
  EIKEN: 9,
  /**その他 */
  OTHER: 0,
} as const;
/**勉強したい科目 (study_subject) - required */
export type STUDY_SUBJECT = (typeof STUDY_SUBJECT)[keyof typeof STUDY_SUBJECT];

export const STUDY_STYLE = {
  /**黙々と静かに勉強したい */
  SILENT: 1,
  /**分からない点があったらスタッフに質問したい */
  ASK: 2,
  /**友達と話しながら楽しく勉強したい */
  TALKING: 3,
  /**1人では難しいのでスタッフ付きっ切りで勉強を教えて欲しい */
  WITH: 4,
  /**勉強も教えて欲しいけどスタッフの話を聞いたり、相談したい。 */
  CONSULT: 5,
  /**その他 */
  OTHER: 0,
  /**未選択 (ex: TERAKOYA_TYPE と TERAKOYA_EXPERIENCE の選択によっては未選択状態のままの項目を含んだ予約情報がリクエストされる) */
  NULL: -1,
} as const;
/**勉強スタイル (study_style) */
export type STUDY_STYLE = (typeof STUDY_STYLE)[keyof typeof STUDY_STYLE];

export const COURSE_CHOICE = {
  /**まだ決めていない */
  TBD: 1,
  /**文系 */
  LIBERAL_ARTS: 2,
  /**理系 */
  SCIENCE: 3,
  /**その他 */
  OTHER: 0,
  /**未選択 (ex: TERAKOYA_TYPE と TERAKOYA_EXPERIENCE の選択によっては未選択状態のままの項目を含んだ予約情報がリクエストされる) */
  NULL: -1,
} as const;
/**文理選択 (course_choice) */
export type COURSE_CHOICE = (typeof COURSE_CHOICE)[keyof typeof COURSE_CHOICE];

export const HOW_TO_KNOW_TERAKOYA = {
  /**HP */
  HP: 1,
  /**Instagram */
  INSTAGRAM: 2,
  /**Facebook */
  FACEBOOK: 3,
  /**Twitter */
  TWITTER: 4,
  /**知人の紹介 */
  INTRODUCE: 5,
  /**ポスター、ビラ */
  LEAFLET: 6,
  /**その他 */
  OTHER: 0,
  /**未選択 (ex: TERAKOYA_TYPE と TERAKOYA_EXPERIENCE の選択によっては未選択状態のままの項目を含んだ予約情報がリクエストされる) */
  NULL: -1,
} as const;
/**テラコヤを知ったきっかけ (how_to_know_terakoya) */
export type HOW_TO_KNOW_TERAKOYA =
  (typeof HOW_TO_KNOW_TERAKOYA)[keyof typeof HOW_TO_KNOW_TERAKOYA];

export type RequestBody = {
  name: string;
  email: string;
  terakoya_type: TERAKOYA_TYPE;
  attendance_date_list: Array<string>;
  arrival_time: ARRIVAL_TIME;
  grade: GRADE;
  terakoya_experience: TERAKOYA_EXPERIENCE;
  study_subject: STUDY_SUBJECT;
  study_subject_detail: string;
  study_style: STUDY_STYLE;
  school_name: string;
  first_choice_school: string;
  course_choice: COURSE_CHOICE;
  future_free: string;
  like_thing_free: string;
  how_to_know_terakoya: HOW_TO_KNOW_TERAKOYA;
  remarks: string;
};

export const usePostBooking = () =>
  useMutation((body: RequestBody) => post("/book", body));
