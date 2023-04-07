import styles from "./Calender.module.css";
import { TiMediaPlayReverse, TiMediaPlay } from "react-icons/ti";
import { getNewDateObj } from "../../utils/getNewDateObj";
import { useRecoilState } from "recoil";
import { SelectedDayState } from "../../recoil/selectedDay";

//https://velog.io/@cyheum/React-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%97%86%EC%9D%B4-%EB%8B%AC%EB%A0%A5%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4-%EB%B3%B4%EC%9E%90
export function getMonthDate(newDate) {
  const doMonth = getNewDateObj(
    new Date(newDate.year, newDate.month - 1, 1)
  );

  const prevMonthLastDate = getNewDateObj(
    new Date(doMonth.year, doMonth.month - 1, 0)
  );
  const startDate =
    prevMonthLastDate.day === 0
      ? prevMonthLastDate
      : prevMonthLastDate.day === 6
        ? doMonth
        : getNewDateObj(
          new Date(doMonth.year, doMonth.month - 1, -prevMonthLastDate.day)
        );
  let monthDate = [];
  for (let i = 0; i < 42; i++) {
    monthDate.push(
      getNewDateObj(
        new Date(startDate.year, startDate.month - 1, startDate.date + i)
      )
    );
  }

  const week1 = monthDate.slice(0, 7);
  const week2 = monthDate.slice(7, 14);
  const week3 = monthDate.slice(14, 21);
  const week4 = monthDate.slice(21, 28);
  const week5 = monthDate.slice(28, 35);
  const week6 = monthDate.slice(35);

  const week4LastDate = week4[week4.length - 1];
  const week5LastDate = week5[week5.length - 1];
  const lastDate = new Date(doMonth.year, doMonth.month, 0);
  const isLastWeek4 =
    week4LastDate.month !== doMonth.month ||
    !(week4LastDate.date < lastDate.getDate());
  const isLastWeek5 =
    week5LastDate.month !== doMonth.month ||
    !(week5LastDate.date < lastDate.getDate());
  const dateArr = [week1, week2, week3, week4];

  return {
    year: doMonth.year,
    month: doMonth.month,
    date: isLastWeek4
      ? dateArr
      : isLastWeek5
        ? [...dateArr, week5]
        : [...dateArr, week5, week6],
  };
}

function Calender() {
  const [selectedDate, setSelectedDate] = useRecoilState(SelectedDayState);
  const days = getMonthDate(selectedDate);

  const onLeft = () => {
    if (selectedDate.month === 0) {
      setSelectedDate(getNewDateObj(new Date(selectedDate.year - 1, 11, 1)));
    } else {
      setSelectedDate(getNewDateObj(new Date(selectedDate.year, selectedDate.month - 2, 1)));
    }
  }
  const onRight = () => {
    if (selectedDate.month === 11) {
      setSelectedDate(getNewDateObj(new Date(selectedDate.year + 1, 0, 1)));
    } else {
      setSelectedDate(getNewDateObj(new Date(selectedDate.year, selectedDate.month, 1)));
    }
  }
  const onChangeDate = (year, month, date) => {
    setSelectedDate(getNewDateObj(new Date(year,month-1,date)));
  }

  return <div className={styles.calender__wrapper}>
    <div className={styles.month__wrapper}>
      <button onClick={onLeft}><TiMediaPlayReverse size={16} /></button>
      <h4>{days.month}월&nbsp;{days.year}</h4>
      <button onClick={onRight}><TiMediaPlay size={16} /></button>
    </div>
    <div className={styles.day__wrapper}>
      {["일", "월", "화", "수", "목", "금", "토"].map((day) => <div key={day}>{day}</div>)}
    </div>
    <div className={styles.date__wrapper}>
      {days.date?.map((item, index) => (<div className={styles.week__wrapper} key={index}>
        {item?.map((day,index) => (day.year === selectedDate.year && day.month === selectedDate.month && day.date === selectedDate.date) ?
              <div onClick={()=>onChangeDate(day.year,day.month,day.date)} className={styles.date__selected} key={index}>{day.date}</div> 
              : <div onClick={()=>onChangeDate(day.year,day.month,day.date)} className={styles.date} key={index}>{day.date}</div>
        )}
      </div>))}
    </div>
  </div>
}

export default Calender;
