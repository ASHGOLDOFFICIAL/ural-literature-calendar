import { months } from '../utils/utils';
import Month from '../components/Month';
import './CalendarPage.css';

const CalendarPage: React.FC = () => {
  return (
    <div className="calendar">
      {months.map((month, i) => (
        <Month
          className="calendar__block"
          key={i}
          name={month.name}
          num={months.indexOf(month) + 1}
          display_name={month.rus.nominative}
          length={month.length}
        />
      ))}
    </div>
  );
};

export default CalendarPage;
