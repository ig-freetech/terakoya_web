import * as t from "io-ts";

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
  /**未設定 */
  t.literal(-1),
]);
export type GRADE = t.TypeOf<typeof GRADE>;

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

const AUTHORITY = t.union([
  /**管理者 */
  t.literal(1),
  /**一般ユーザー */
  t.literal(0),
]);
type AUTHORITY = t.TypeOf<typeof AUTHORITY>;

const UserCommonProperties = t.type({
  uuid: t.string,
  name: t.string,
  nickname: t.string,
  grade: GRADE,
  course_choice: COURSE_CHOICE,
  like_thing: t.string,
  // optional
  // t.null is not proper because the field in JSON response is not null but undefined
  user_profile_img_url: t.union([t.string, t.undefined]),
});

export const User = t.intersection([
  UserCommonProperties,
  t.type({
    sk: t.string,
    email: t.string,
    school: t.string,
    staff_in_charge: t.array(t.string),
    future_path: t.string,
    how_to_know_terakoya: HOW_TO_KNOW_TERAKOYA,
    number_of_attendances: t.number,
    attendance_rate: t.number,
    is_admin: AUTHORITY,
    created_at_iso: t.string,
    updated_at_iso: t.string,
  }),
]);
export type User = t.TypeOf<typeof User>;

export const UserProfile = UserCommonProperties;
export type UserProfile = t.TypeOf<typeof UserProfile>;

/**Query keys */
export const USER_QUERY_KEY = "user";
export const USER_PROFILE_QUERY_KEY = "user_profile";
