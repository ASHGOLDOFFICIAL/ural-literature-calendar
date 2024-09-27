import MenuButton from './MenuButton';
import './Header.css';

interface HeaderProps {
  buttonOpened: boolean;
  openMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ buttonOpened, openMenu }) => {
  return (
    <header id="root__header" className="header">
      <div className="container">
        <div id="js-button__menu" className="header__menu-button">
          <MenuButton isOpened={buttonOpened} openMenu={openMenu} />
        </div>
        <a href="#main-content" className="Header__to-content">
          К содержанию
        </a>
        <div className="header__logo">
          <span>
            Литературный <br />
            календарь Урала
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
