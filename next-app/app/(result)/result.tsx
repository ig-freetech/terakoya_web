import Link from "next/link";

import styles from "@styles/result.module.scss";

type ResultProps = {
  texts: Array<string>;
};
const Result: React.FC<ResultProps> = (props) => {
  const { texts } = props;
  return (
    <div className={styles.result}>
      <div className={styles.content}>
        {texts.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        <Link className={styles.link} href="/">
          ホームへ
        </Link>
      </div>
    </div>
  );
};
export default Result;
