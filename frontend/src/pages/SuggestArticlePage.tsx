import { useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';
import Message, { MessageModel, makeCreateMessage } from '../components/Message/Message';
import AutoGrowingTextarea from '../components/AutoGrowingTextarea/AutoGrowingTextarea';
import Block from '../components/Block/Block';
import Button from '../components/Button/Button';
import './FormPage.css';

async function sendArticle(title: string, body: string, date: string) {
  const response = await fetch(`/api/pending-articles?format=json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      body: body,
      date: date
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

const SuggestArticlePage: React.FC = () => {
  const [message, setMessage] = useState<MessageModel>();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const createMessage = makeCreateMessage(setMessage);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    createMessage();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const status = await sendArticle(
      formData.get('title') as string,
      formData.get('body') as string,
      formData.get('date') as string
    );

    if (status === 'success') {
      createMessage('success', 'Статья успешно отправлена!');
    } else if (status === 'error') {
      createMessage('error', 'Ошибка...');
    }
  }

  return (
    <Block title="Предложите статью">
      <Message {...message} />
      <form method="POST" onSubmit={handleSubmit} className="Form">
        <input className="Form__input" required type="text" name="title" placeholder="Название статьи..." />
        <AutoGrowingTextarea
          className="Form__input"
          required
          name="body"
          minLength={150}
          placeholder="Текст статьи..."
        />
        <input className="Form__input" required type="date" name="date" placeholder="Дата статьи..." />
        <Button>Отправить</Button>
      </form>
    </Block>
  );
};

export default SuggestArticlePage;
