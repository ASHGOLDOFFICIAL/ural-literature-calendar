import { useState, useContext, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';
import Message, { MessageModel, makeCreateMessage } from '../components/Message/Message';
import Block from '../components/Block/Block';
import Button from '../components/Button/Button';
import './FormPage.css';

const LoginPage: React.FC = () => {
  const [message, setMessage] = useState<MessageModel>();
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  const createMessage = makeCreateMessage(setMessage);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    createMessage();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const status = await login(formData.get('email') as string, formData.get('password') as string);

    if (status === 'success') {
      return <Navigate to="/" />;
    } else {
      createMessage('error', 'Ошибка при входе...');
    }
  }

  return (
    <Block title="Вход">
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
          type="password"
          name="password"
          minLength={8}
          autoComplete="current-password"
          placeholder="Пароль..."
        />
        <Button>Войти</Button>
      </form>
      <p>
        Нет аккаунта? <Link to="/registration">Зарегистрироваться!</Link>
      </p>
    </Block>
  );
};

export default LoginPage;
