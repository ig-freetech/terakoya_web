// npm i io-ts fp-ts becaise fp-ts is a peer dependency of io-ts
// https://github.com/gcanti/io-ts#installation
import t from "io-ts";
// https://github.com/gillchristian/io-ts-reporters
import reporter from "io-ts-reporters";

// Validation fails when fields is missing but passes when there are extra fields.
// https://qiita.com/fukky21/items/421f41baf3ebc4016d3c
export const BasicResponseData = t.type({
  message: t.string,
  status_code: t.number,
});

// export const convertWithAdditonalProps = <T extends t.Mixed>(
//   data: unknown,
//   additionalProps: t.Type<T>
// ): t.TypeOf<typeof BasicResponseData & T> => {
//   const validator = t.intersection([BasicResponseData, additionalProps]);
//   const result = validator.decode(data);
//   if (result._tag === "Left") {
//     // report() returns an array of error messages when the validation fails.
//     throw new Error(reporter.report(result).join("\n"));
//   }
//   return result.right;
// };

// convertWithAdditonalProps is now a curried function.
// It first takes the `additionalProps`, then returns a new function that takes the `data`.
export const convertWithAdditonalProps = <AdditionalProps extends t.Mixed>(
  additionalProps: AdditionalProps
) => {
  const validator = t.intersection([BasicResponseData, additionalProps]);
  return (data: unknown) => {
    const result = validator.decode(data);
    console.log(result);
    if (result._tag === "Left") {
      throw new Error(reporter.report(result).join("\n"));
    }
    // Now we also reflect the type of `additionalProps` in the return type of this function
    return result.right as t.TypeOf<typeof BasicResponseData & AdditionalProps>;
  };
};

export const convert = <T extends t.Mixed>(data: unknown): t.TypeOf<T> => {
  const result = BasicResponseData.decode(data);
  if (result._tag === "Left") {
    throw new Error(reporter.report(result).join("\n"));
  }
  return result;
};
