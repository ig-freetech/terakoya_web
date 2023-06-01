import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  fetchExcludedDates,
  updateExcludedDates,
  UpdateExcludedDatesRequestBody,
} from "@apis/excluded-dates";

const validationSchema = yup.object().shape({
  dates: yup.array().of(
    yup
      .string()
      .matches(/\d{4}-\d{2}-\d{2}/, "Date must be in the format 'YYYY-MM-DD'")
      .required("Required")
  ),
});

export const useSettingExcludedDates = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<UpdateExcludedDatesRequestBody>({
    resolver: yupResolver(validationSchema),
    defaultValues: { dates: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    // Only never type can be assigned to the name property (never type).
    // https://typescriptbook.jp/reference/statements/never
    name: "dates" as never,
  });

  const onAddDateTextBox = () => append("");
  const onDeleteDateTextBox = (index: number) => remove(index);

  const _fetch = () =>
    fetchExcludedDates()
      .then((res) => {
        setValue("dates", res.data.dates);
      })
      .catch((_) => {
        navigate("/error");
      });

  useEffect(() => {
    setIsLoading(true);
    _fetch().finally(() => {
      setIsLoading(false);
    });
  }, []);

  const _updateDates = (dates: Array<string>) => {
    setIsLoading(true);
    updateExcludedDates({ dates: dates })
      .then((_) => {
        alert("更新しました");
        _fetch();
      })
      .catch((_) => {
        alert("更新に失敗しました");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onUpdate = handleSubmit((inputs) => {
    _updateDates(inputs.dates);
  });

  const helperText = (index: number) =>
    errors.dates && errors.dates[index] ? errors.dates[index].message : null;

  const hasError = (index: number) =>
    Boolean(errors.dates && errors.dates[index]);

  return {
    isLoading,
    onUpdate,
    onAddDateTextBox,
    onDeleteDateTextBox,
    control,
    fields,
    hasError,
    helperText,
  };
};
