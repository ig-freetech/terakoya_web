import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { BookingItem } from "@apis/(booking)/types";
import { getBookingList } from "@apis/(booking)/bookList";
import { editBookingPlace } from "@apis/(booking)/bookEditPlace";
import { TODAY_JST, ISO_FORMAT } from "@utils/datetime";
import { toast } from "react-hot-toast";
import { PLACE } from "@apis/(booking)/types";

/**テラコヤ種別 (terakoya_type) */
export const TERAKOYA_TYPE = {
  "-1": "-",
  1: "カフェ塾テラコヤ(池袋)",
  2: "オンラインテラコヤ(多摩)",
  3: "テラコヤ中等部(池袋)",
  4: "テラコヤ中等部(渋谷)",
  0: "その他",
} as const;

export const useManage = () => {
  const [bookingItemList, setBookingItemList] = useState<Array<BookingItem>>(
    []
  );

  useEffect(() => {
    onGetBookingList(TODAY_JST.format(ISO_FORMAT));
  }, []);

  const onGetBookingList = (targetDate: string) =>
    getBookingList(targetDate)
      .then((body) => {
        toast.success(`予約情報を取得しました (${body.item_list.length}件)`);
        setBookingItemList(body.item_list);
      })
      .catch((err: AxiosError) => {
        toast.error(`予約情報の取得に失敗しました\n\n${err.message}`);
      });

  const _onUpdatePlace = (item: BookingItem) =>
    editBookingPlace(item)
      .then((_) => {
        // Multi Line + Emoji Toast
        // https://react-hot-toast.com/
        toast(
          `
        下記の予約情報の拠点を更新しました。\n
        予約日: ${item.date}\n
        生徒: ${item.name}\n
        参加希望: ${TERAKOYA_TYPE[item.terakoya_type]}
        `,
          { icon: "✅" }
        );
      })
      .catch((err: AxiosError) => {
        toast.error(`拠点の更新に失敗しました: ${err.message}`);
      });

  const onSelect = (place: number, item: BookingItem) => {
    _onUpdatePlace({ ...item, place: place as PLACE });
    setBookingItemList(
      bookingItemList.map((v) =>
        v.date === item.date &&
        v.email == item.email &&
        v.terakoya_type == item.terakoya_type
          ? { ...v, place: place as PLACE }
          : v
      )
    );
  };

  return {
    bookingItemList,
    onGetBookingList,
    onSelect,
  };
};
