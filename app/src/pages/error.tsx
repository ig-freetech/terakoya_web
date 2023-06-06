import Link from "next/link";

const ERROR_RESULT_TEXTS = [
  "【エラー】",
  "エラーが発生しました。",
  "最初からやり直して下さい。",
  "エラーが続く場合はテラコヤ公式LINEからご連絡下さい。",
];

type ResultProps = {
  texts: Array<string>;
};
const Result: React.FC<ResultProps> = (props) => {
  const { texts } = props;
  return (
    <div className="result">
      <div className="content">
        {ERROR_RESULT_TEXTS.map((text) => (
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
