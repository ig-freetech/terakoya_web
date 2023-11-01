import Result from "@app/(result)/result";

const SUCCESS_RESULT_TEXTS = [
  "確認メールを送信しました。",
  "メール内のリンクをクリックして本登録を完了してください。",
  "※本登録が完了するまでサインインできません。",
  "※メールが届かない場合は、迷惑メールフォルダをご確認ください。",
];

export default function Page() {
  return (
    <Result
      caption="アカウント仮登録完了"
      texts={SUCCESS_RESULT_TEXTS}
      mode="success"
    />
  );
}
