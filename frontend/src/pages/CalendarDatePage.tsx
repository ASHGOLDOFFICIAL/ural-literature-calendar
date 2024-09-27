import { Link, useParams } from 'react-router-dom';
import { Month, months } from '../utils/utils';
import EventBlock from '../components/EventBlock/EventBlock';
import ArticleList from '../components/ArticleList/ArticleList';
import PageNotFoundError from '../components/PageNotFoundError/PageNotFoundError';

const CalendarDatePage: React.FC = () => {
  const params = useParams();

  // Check if given month exists.
  let month: number;
  try {
    month = Month[params.month as keyof typeof Month];
  } catch (e) {
    return <PageNotFoundError />;
  }

  // Check if given day is within given month.
  let day: number | undefined;
  if (params.day) {
    if (1 <= +params.day && +params.day <= months[month - 1].length) {
      day = +params.day;
    } else {
      return <PageNotFoundError />;
    }
  }

  return (
    <>
      <EventBlock month={month} day={day} />
      <ArticleList month={month} day={day} />
    </>
  );
};

export default CalendarDatePage;
