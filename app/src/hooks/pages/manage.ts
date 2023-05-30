import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { BookingItem, getBookingList } from "@apis/bookList";
import { editBookingPlace } from "@apis/bookEditPlace";
import { TODAY_JST, ISO_FORMAT } from "@utils/datetime";

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
  const navigate = useNavigate();
  const [bookingItemList, setBookingItemList] = useState<Array<BookingItem>>(
    []
  );

  useEffect(() => {
    onGetBookingList(TODAY_JST.format(ISO_FORMAT));
  }, []);

  const onGetBookingList = (targetDate: string) =>
    getBookingList(targetDate)
      .then((v) => setBookingItemList(v.data.item_list))
      .catch((err: AxiosError) => {
        navigate("/error");
      });

  const _onUpdatePlace = (item: BookingItem) =>
    editBookingPlace(item)
      .then((v) => {
        // alert(`
        // 下記の予約情報の拠点を更新しました。
        // 予約日: ${item.date}
        // 生徒: ${item.name}
        // 参加希望: ${TERAKOYA_TYPE[item.terakoya_type]}
        // `);
      })
      .catch((err: AxiosError) => {
        navigate("/error");
      });

  const onSelect = (place: number, item: BookingItem) => {
    _onUpdatePlace({ ...item, place });
    setBookingItemList(
      bookingItemList.map((v) =>
        v.date === item.date &&
        v.email == item.email &&
        v.terakoya_type == item.terakoya_type
          ? { ...v, place }
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
