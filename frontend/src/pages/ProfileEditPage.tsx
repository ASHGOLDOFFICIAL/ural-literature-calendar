import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';
import Message, { makeCreateMessage, MessageModel } from '../components/Message/Message';
import AvatarList from '../components/AvatarList';
import Button from '../components/Button/Button';
import './FormPage.css';

const ProfileEditPage: React.FC = () => {
  const [message, setMessage] = useState<MessageModel>();
  const { user, getProfile } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const createMessage = makeCreateMessage(setMessage);

  async function updateProfile(event: React.FormEvent<HTMLFormElement>) {
    createMessage();
    event.preventDefault();

    const formData = new FormData(event.currentTarget)

    const response = await fetch(`/api/userinfo?format=json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      credentials: 'include'
    });

    const data = await response.json();

    if (response.status === 200) {
      createMessage('success', 'Данные успешно обновлены!');
      getProfile(formData.get('username') as string);
    } else if (response.status === 400 && data.username[0] === 'This field may not be blank.') {
      createMessage('error', 'Имя пользователя не может быть пустым...');
    }
  };

  return (
    <div className="block">
      <h2 className="block__title">Редактировать профиль</h2>
      <Message {...message} />
      <h3 className="block__subtitle">Персональные данные</h3>
      <form method="PATCH" className="form" onSubmit={updateProfile}>
        <input
          className="form__input"
          type="text"
          name="username"
          minLength={6}
          defaultValue={user.username}
          autoComplete="username"
          placeholder="Имя пользователя..."
        />
        <input
          className="form__input"
          type="text"
          name="first_name"
          defaultValue={user.first_name}
          autoComplete="given-name"
          placeholder="Имя..."
        />
        <input
          className="form__input"
          type="text"
          name="last_name"
          defaultValue={user.last_name}
          autoComplete="family-name"
          placeholder="Фамилия..."
        />
        <input
          className="form__input"
          type="date"
          name="birthdate"
          defaultValue={user.birthdate}
          autoComplete="bday"
          placeholder="Дата рождения..."
        />
        <Button>Сохранить</Button>
      </form>
      <h3 className="block__subtitle">Кастомизация</h3>
      <AvatarList />
    </div>
  );
};

export default ProfileEditPage;
