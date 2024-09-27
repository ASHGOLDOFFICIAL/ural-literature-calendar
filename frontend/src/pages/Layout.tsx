import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer';
import './Layout.css';

const Layout: React.FC = () => {
  const [menuShown, setMenuShown] = useState(false);
  let location = useLocation();

  useEffect(() => {
    if (menuShown) {
      setMenuShown(false);
    }
  }, [location]);

  const openMenu = () => {
    setMenuShown((prevState) => !prevState);
  };

  return (
    <>
      <Header buttonOpened={menuShown} openMenu={openMenu} />
      <div id="root__middle" className={`container ${menuShown && '--lock'}`}>
        <Sidebar isShown={menuShown} />
        <main id="main-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
