import Block from '../components/Block/Block';
import EventBlock from '../components/EventBlock/EventBlock';

const HomePage: React.FC = () => {
  const today = new Date();

  return (
    <>
      <Block title="Добро пожаловать!">Добро пожаловать на сайт "Литературный календарь Урала".</Block>
      <EventBlock blockTitle="Сегодня" month={today.getMonth() + 1} day={today.getDate()} />
    </>
  );
};

export default HomePage;
