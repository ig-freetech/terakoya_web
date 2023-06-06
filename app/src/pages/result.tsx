import Link from "next/link";

const SUCCESS_RESULT_TEXTS = [
  "【予約完了】",
  "予約処理が完了しました。",
  "ご登録頂いたメールアドレス宛てに予約完了メールも送信しましたのでご確認下さい。",
  "メールが届かない場合は",
  "npoterakoya2021@gmail.com",
  "からのメールを受け取れるよう受信設定を行なって下さい。",
];

type ResultProps = {
  texts: Array<string>;
};
const Result: React.FC<ResultProps> = (props) => {
  const { texts } = props;
  return (
    <div className="result">
      <div className="content">
        {SUCCESS_RESULT_TEXTS.map((text) => (
          <p>{text}</p>
        ))}
        <Link className="link" href="/">
          ホームへ
        </Link>
      </div>
    </div>
  );
};
export default Result;
