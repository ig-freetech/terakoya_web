export const TERAKOYA_TYPE_LIST = {
  highschool: "カフェ塾テラコヤ(池袋)",
  juniorHighschool: "テラコヤ中等部(池袋/渋谷)",
  online: "オンラインテラコヤ(多摩)",
} as const;
export type TerakoyaTypes =
  typeof TERAKOYA_TYPE_LIST[keyof typeof TERAKOYA_TYPE_LIST];
