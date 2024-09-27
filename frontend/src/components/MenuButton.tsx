import './MenuButton.css'

interface Props {
  isOpened: boolean;
  openMenu: () => void;
}

const MenuButton: React.FC<Props> = ({ isOpened, openMenu }) => {
  return (
    <button
      type="button"
      className={`menu-button${isOpened ? ' --open' : ''}`}
      onClick={openMenu}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

export default MenuButton
