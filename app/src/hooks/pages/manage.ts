import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { RequestBody } from "@apis/book";
import { getBookingList } from "@apis/bookList";

export const useManage = () => {
  const navigate = useNavigate();
  const [bookingItemList, setBookingItemList] = useState<
    Array<RequestBody & { date: string; place: number }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const onGetBookingList = (targetDate: string) =>
    getBookingList(targetDate)
      .then((v) => setBookingItemList(v.data.item_list))
      .catch((err: AxiosError) => {
        navigate("/error");
      });

  return {
    isLoading,
    bookingItemList,
    onGetBookingList,
  };
};
