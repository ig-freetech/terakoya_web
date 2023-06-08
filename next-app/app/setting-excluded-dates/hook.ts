import { useEffect, useState } from "react";
// Import useRouter from "next/navigation" instead of "next/router" in Next.js v13.
// https://zenn.dev/masaya0521/articles/5bb95c5ac593b9
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
// yupResolver is required for resolving validationSchema created with yup.
// https://www.npmjs.com/package/@hookform/resolvers
// https://github.com/react-hook-form/resolvers#yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  fetchExcludedDates,
  updateExcludedDates,
  UpdateExcludedDatesRequestBody,
} from "@apis/excluded-dates";

// When yup.object().shape({}) is used, the schema will accept only the fields specified. The presence of additional fields not defined in the schema will result in a validation error.
// On the other hand, when yup.object({}) is used, the schema will accept any fields not defined in the schema.
const validationSchema = yup.object().shape({
  // Key must match the name of the property in the form to enable validation.
  // Type definition examples: https://www.npmjs.com/package/yup
  dates: yup.array().of(
    // yup.array().of(yupType) is used to validate the each array field.
    // https://www.npmjs.com/package/yup#arrayoftype-schema-this
    yup
      .string()
      // The message of the second argument can be obtained by errors.<propName>.message when a validation error occurs.
      .matches(/\d{4}-\d{2}-\d{2}/, "Date must be in the format 'YYYY-MM-DD'")
      // The message is displayed when the value is empty.
      .required("Required")
  ),
});

export const useSettingExcludedDates = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    // control is an object that contains methods for registering components, validation, and accessing form values.
    // control works as a bridge between external controlled components (ex: MUI) and react-hook-form with <Controller />.
    control,
    // formState is an object that contains the status of the form.
    // formState.errors is an object that comprehensively contains the validation result of the properties and error messages.
    formState: { errors },
    setValue,
  } = useForm<UpdateExcludedDatesRequestBody>({
    // react-hook-form performs validation internally based on the schema created with yup or zod.
    // resolver works as a bridge between external validation schema such as yup and react-hook-form to validate data.
    // https://www.react-hook-form.com/api/useform/#resolver
    resolver: yupResolver(validationSchema),
    // https://codesandbox.io/s/react-hook-form-usefieldarray-ssugn
    defaultValues: {
      dates: [],
    },
  });

  // fields is binded to the input element in the form specified by the name property.
  const { fields, append, remove } = useFieldArray({
    // control is required unless using FormContext
    // https://www.react-hook-form.com/api/usefieldarray/
    control,
    // Only never type can be assigned to the name property (never type).
    // https://typescriptbook.jp/reference/statements/never
    // Specify the name of the array property in the form to be handled by useFieldArray.
    // https://www.react-hook-form.com/api/usefieldarray/#props
    name: "dates" as never,
  });

  // append(value) is a function to append data to the fields array.
  // https://www.react-hook-form.com/api/usefieldarray
  const onAddDateTextBox = () => append(""); // Add as value is an empty string.

  // remove(index) is a function to remove the field at the specified index from the fields array.
  const onDeleteDateTextBox = (index: number) => remove(index);

  const _fetch = () =>
    fetchExcludedDates().then((body) => {
      setValue("dates", body.dates);
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
        _fetch();
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

  // errors.<propName> is an object that contains the validation result of the property (if not, it is undefined).
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
