import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer id="root__footer" className="footer">
      <div className="container">
        <p className="footer__info">Литературный календарь Урала</p>
        <p className="footer__copyright">&copy; 2023 Андрей Шаат</p>
      </div>
    </footer>
  );
}

export default Footer
