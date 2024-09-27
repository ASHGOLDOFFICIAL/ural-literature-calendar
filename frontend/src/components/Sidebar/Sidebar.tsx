import { Link } from 'react-router-dom';
import useAuth from '../../context/AuthContext';
import ProfileSidebarLink from '../ProfileSidebarLink';
import './Sidebar.css';

interface SidebarProps {
  isShown: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isShown }) => {
  const { user, logout } = useAuth();

  return (
    <nav className={`Sidebar${isShown ? ' --open' : ''}`}>
      <ul className="Sidebar__block">
        {user ? (
          <>
            <li className="Sidebar__item">
              <Link to={`/profile/${user.username}`} className="Sidebar__link--profile">
                <ProfileSidebarLink />
              </Link>
            </li>
            <li className="Sidebar__item">
              <span className="Sidebar__link" onClick={logout}>
                Выйти
              </span>
            </li>
          </>
        ) : (
          <>
            <li className="Sidebar__item">
              <Link to="/login" className="Sidebar__link">
                Войти
              </Link>
            </li>
            <li className="Sidebar__item">
              <Link to="/registration" className="Sidebar__link">
                Регистрация
              </Link>
            </li>
          </>
        )}
      </ul>
      <ul className="Sidebar__block">
        <li className="Sidebar__item">
          <Link to="/" className="Sidebar__link">
            Домашняя страница
          </Link>
        </li>
        <li className="Sidebar__item">
          <Link to="/calendar" className="Sidebar__link">
            Календарь
          </Link>
        </li>
      </ul>
      {user && (
        <ul className="Sidebar__block">
          <li className="Sidebar__item">
            <Link to="/event/suggest" className="Sidebar__link">
              Предложить событие
            </Link>
          </li>
          <li className="Sidebar__item">
            <Link to="/article/suggest" className="Sidebar__link">
              Предложить статью
            </Link>
          </li>
        </ul>
      )}
      {user?.is_staff ? (
        <ul className="Sidebar__block">
          <li className="Sidebar__item">
            <a href={`/admin`} className="Sidebar__link">
              Админ-панель
            </a>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

export default Sidebar;
