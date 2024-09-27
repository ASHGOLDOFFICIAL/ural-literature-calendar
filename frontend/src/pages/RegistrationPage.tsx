import { useState, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';
import Block from '../components/Block/Block';
import Button from '../components/Button/Button';
import Message, { makeCreateMessage, MessageModel } from '../components/Message/Message';
import './FormPage.css';

const RegistrationPage: React.FC = () => {
  const [message, setMessage] = useState<MessageModel>();
  const { user, signUp } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  const createMessage = makeCreateMessage(setMessage);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    createMessage();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get('password') !== formData.get('password2')) {
      createMessage('error', 'Пароли должны совпадать...');
      return;
    }

    const status = await signUp(
      formData.get('email') as string,
      formData.get('username') as string,
      formData.get('password') as string
    );

    if (status === 'success') {
      createMessage('success', 'Регистрация прошла успешно...');
    } else {
      createMessage('error', 'Регистрация не прошла успешно...');
    }
  }

  return (
    <Block title="Регистрация">
      <Message {...message} />
      <form method="POST" onSubmit={handleSubmit} className="Form">
        <input
          className="Form__input"
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Электронная почта..."
        />
        <input
          className="Form__input"
          required
          type="text"
          name="username"
          minLength={6}
          autoComplete="username"
          placeholder="Имя пользователя..."
        />
        <input
          className="Form__input"
          required
          type="password"
          name="password"
          minLength={8}
          autoComplete="new-password"
          placeholder="Пароль..."
        />
        <input
          className="Form__input"
          required
          type="password"
          name="password2"
          minLength={8}
          autoComplete="new-password"
          placeholder="Повторите пароль..."
        />
        <Button>Регистрация</Button>
      </form>
      <p>
        Уже есть аккаунт? <Link to="/login">Войти!</Link>
      </p>
    </Block>
  );
};

export default RegistrationPage;
