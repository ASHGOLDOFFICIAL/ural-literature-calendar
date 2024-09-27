import { useEffect, useState } from 'react';
import { EventModel } from '../../utils/models';
import { months } from '../../utils/utils';
import Block from '../Block/Block';
import Loading from '../Loading';
import './EventBlock.css';

interface EventBlockProps {
  blockTitle?: string;
  month: number;
  day?: number;
}

function getEventDateAsText(date: string, fullDate = false) {
  const [year, month, day] = date.split('-');

  if (fullDate) {
    return `${+day} ${months[+month - 1].rus.genetive} ${+year}`;
  } else {
    return String(+year);
  }
}

const EventBlock: React.FC<EventBlockProps> = ({ blockTitle, month, day }) => {
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState<EventModel[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchEvents = async () => {
      const response = await fetch(`/api/events?format=json&month=${month}&day=${day || ''}`, { signal });
      const data = await response.json();
      setEventData(data);
      setLoading(false);
    };

    fetchEvents();

    return () => controller.abort();
  }, [month, day]);

  if (!blockTitle) {
    if (day) {
      blockTitle = `${day} ${months[+month - 1].rus.genetive}`;
    } else {
      blockTitle = months[+month - 1].rus.nominative;
    }
  }

  if (loading) {
    return (
      <Block title={blockTitle}>
        <Loading />
      </Block>
    );
  }

  return (
    <Block title={blockTitle}>
      {eventData.length ? (
        eventData.map((event) => (
          <div className="EventList__event">
            <time dateTime={event.date}>{getEventDateAsText(event.date, !Boolean(day))}</time> — {event.description}
          </div>
        ))
      ) : (
        <p>Ничего не нашлось...</p>
      )}
    </Block>
  );
};

export default EventBlock;
