import { useState, FormEvent } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import useAuth from '../context/AuthContext';
import Message, { MessageModel, makeCreateMessage } from '../components/Message/Message';
import Block from '../components/Block/Block';
import Button from '../components/Button/Button';
import AutoGrowingTextarea from '../components/AutoGrowingTextarea/AutoGrowingTextarea';
import './FormPage.css';

async function sendEvent(date: string, description: string) {
  const response = await fetch(`/api/pending-events?format=json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      date: date,
      description: description
    }),
    credentials: 'include'
  });

  if (response.ok) {
    return 'success';
  } else {
    console.log(response);
    return 'error';
  }
}

const SuggestEventPage: React.FC = () => {
  const [message, setMessage] = useState<MessageModel>();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const createMessage = makeCreateMessage(setMessage);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    createMessage();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const status = await sendEvent(formData.get('date') as string, formData.get('description') as string);

    if (status === 'success') {
      createMessage('success', 'Событие успешно отправлено!');
    } else if (status === 'error') {
      createMessage('error', 'Ошибка...');
    }
  }

  return (
    <Block title="Предложите событие">
      <Message {...message} />
      <form method="POST" onSubmit={handleSubmit} className="Form">
        <input className="Form__input" required type="date" name="date" placeholder="Дата события..." />
        <AutoGrowingTextarea
          className="Form__input"
          required
          name="description"
          minLength={50}
          placeholder="Описание события..."
        />
        <Button>Отправить</Button>
      </form>
    </Block>
  );
};

export default SuggestEventPage;
