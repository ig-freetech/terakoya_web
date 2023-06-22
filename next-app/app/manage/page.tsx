"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Collapse,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Link from "next/link";
import React from "react";

import { BookingItem } from "@apis/(booking)/types";
import { BasicPaper } from "@components/elements/paper";
import { ISO_FORMAT, TODAY_JST } from "@utils/datetime";

import { useManage, TERAKOYA_TYPE } from "./hook";

// Next.js can't export anything other than Page Component. So, object like ARRIVAL_TIME cant't be exported.

/**到着予定時間帯 (arrival_time) - required */
const ARRIVAL_TIME = {
  0: "その他",
  1: "17:00前",
  2: "17:00~17:30",
  3: "17:30~18:00",
  4: "18:00以降",
};

/**学年 (grade) - required */
const GRADE = {
  1: "高校1年生",
  2: "高校2年生",
  3: "高校3年生",
  11: "中学1年生",
  12: "中学2年生",
  13: "中学3年生",
  0: "その他",
};

/**テラコヤ参加経験 (terakoya_experience) - required */
const TERAKOYA_EXPERIENCE = {
  1: "今回が初回",
  2: "過去に参加したことがある",
  0: "その他",
};

/**勉強したい科目 (study_subject) - required */
const STUDY_SUBJECT = {
  1: "英語",
  2: "国語",
  3: "数学",
  4: "社会",
  5: "理科",
  6: "推薦型入試対策（志望理由書・面接など）",
  7: "大学説明会",
  8: "キャリア説明会",
  9: "英検",
  0: "その他",
};

/**勉強スタイル (study_style) */
const STUDY_STYLE = {
  "-1": "-",
  1: "黙々と静かに勉強したい",
  2: "分からない点があったらスタッフに質問したい",
  3: "友達と話しながら楽しく勉強したい",
  4: "1人では難しいのでスタッフ付きっ切りで勉強を教えて欲しい",
  5: "勉強も教えて欲しいけどスタッフの話を聞いたり、相談したい。",
  0: "その他",
};

/**文理選択 (course_choice) */
const COURSE_CHOICE = {
  "-1": "-",
  1: "まだ決めていない",
  2: "文系",
  3: "理系",
  0: "その他",
};

export default function Page() {
  const { bookingItemList, setTargetDate, onSelect } = useManage();

  return (
    <BasicPaper>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Link href="/">
          {/* https://mui.com/material-ui/react-typography/ */}
          <Typography variant="subtitle1">ホームへ戻る</Typography>
        </Link>
        <Typography variant="h5" color="GrayText">
          予約情報一覧
        </Typography>
        {/* https://mui.com/x/react-date-pickers/getting-started/ */}
        {/* https://mui.com/x/react-date-pickers/date-picker/ */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            defaultValue={TODAY_JST}
            onChange={(date) => {
              if (date != null) {
                setTargetDate(date.format(ISO_FORMAT));
              }
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box>
        {/* https://mui.com/material-ui/react-table/#sticky-header */}
        <Table stickyHeader sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>参加日</TableCell>
              <TableCell>名前</TableCell>
              <TableCell>参加希望</TableCell>
              <TableCell>学年</TableCell>
              <TableCell>備考</TableCell>
              <TableCell>拠点</TableCell>
              <TableCell>リマインドメール送信済み</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingItemList?.map((item, i) => (
              <AccordionTableRow key={i} item={item} onSelect={onSelect} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </BasicPaper>
  );
}

type AccordionTableRowProps = {
  item: BookingItem;
  onSelect: (place: number, item: BookingItem) => void;
};
const AccordionTableRow = (props: AccordionTableRowProps) => {
  const { item, onSelect } = props;
  const [expanded, setExpanded] = React.useState(false);
  return (
    <>
      <TableRow sx={{ borderBottom: "unset" }}>
        <TableCell>
          <IconButton size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{item.date}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{TERAKOYA_TYPE[item.terakoya_type]}</TableCell>
        <TableCell>{GRADE[item.grade]}</TableCell>
        <TableCell>{item.remarks}</TableCell>
        <TableCell>
          <Select
            value={item.place}
            onChange={(e) => onSelect(Number(e.target.value), item)}
          >
            <MenuItem value={0}>未設定</MenuItem>
            <MenuItem value={1}>サンシャインシティ</MenuItem>
            <MenuItem value={2}>良品計画本社</MenuItem>
            <MenuItem value={3}>DIORAMA CAFE</MenuItem>
            <MenuItem value={4}>キャリア・マム</MenuItem>
            <MenuItem value={5}>キカガク</MenuItem>
          </Select>
        </TableCell>
        <TableCell>
          <Box textAlign="center">{item.is_reminded ? "済" : "未"}</Box>
        </TableCell>
      </TableRow>
      <TableRow>
        {/* https://v4.mui.com/ja/components/tables/ */}
        <TableCell colSpan={8} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={expanded}>
            <Table size="small" sx={{ tableLayout: "fixed", m: 1 }}>
              <TableHead>
                <TableRow>
                  <TableCell>メールアドレス</TableCell>
                  <TableCell>到着予定時間帯</TableCell>
                  <TableCell>参加経験</TableCell>
                  <TableCell>科目</TableCell>
                  <TableCell>科目内容</TableCell>
                  <TableCell>勉強の仕方</TableCell>
                  <TableCell>在籍している学校</TableCell>
                  <TableCell>文理選択</TableCell>
                  <TableCell>将来の夢・志望大学</TableCell>
                  <TableCell>好きなもの(こと)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {/* https://github.com/mui/material-ui/issues/2076 */}
                  <TableCell sx={{ wordWrap: "break-word" }}>
                    {item.email}
                  </TableCell>
                  <TableCell>{ARRIVAL_TIME[item.arrival_time]}</TableCell>
                  <TableCell>
                    {TERAKOYA_EXPERIENCE[item.terakoya_experience]}
                  </TableCell>
                  <TableCell>{STUDY_SUBJECT[item.study_subject]}</TableCell>
                  <TableCell>{item.study_subject_detail}</TableCell>
                  <TableCell>{STUDY_STYLE[item.study_style]}</TableCell>
                  <TableCell>{item.school_name}</TableCell>
                  <TableCell>{COURSE_CHOICE[item.course_choice]}</TableCell>
                  <TableCell>{item.future_free}</TableCell>
                  <TableCell>{item.like_thing_free}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
