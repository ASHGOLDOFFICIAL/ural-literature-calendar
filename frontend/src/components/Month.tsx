import { Link } from 'react-router-dom';
import { getWeekday } from '../utils/weekday';
import './Month.css';

interface MonthProps {
  className?: string;
  name: string;
  num: number;
  display_name: string;
  length: number;
}

const Month: React.FC<MonthProps> = ({ className, name, num, display_name, length }) => {
  const shortWeekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  const weekday = getWeekday(new Date().getFullYear(), num, 1);

  let emptyItems = [];
  for (let _ = 1; _ < weekday; _++) {
    emptyItems.push(true);
  }
  let monthDays = [];
  for (let i = 1; i <= length; i++) {
    monthDays.push(i);
  }

  return (
    <div className={`Month ${className}`}>
      <h2 className="Month__name">
        <Link to={`/calendar/${name}`}>{display_name}</Link>
      </h2>
      <div className="Month__grid">
        {shortWeekdays.map((weekday) => (
          <div className="Month__item--weekday">{weekday}</div>
        ))}
        {emptyItems.map(() => (
          <div className="Month__items--empty"></div>
        ))}
        {monthDays.map((day) => (
          <div className="Month__item">
            <Link to={`/calendar/${name}/${day}`}>{day}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Month;
