import './Block.css';

interface BlockProps {
  title?: string;
  article?: boolean;
  children: React.ReactNode;
}

const Block: React.FC<BlockProps> = ({ title, article=false, children }) => {
  if (article) {
    return (
      <article className="Block">
        {title && <h2 className="Block__title">{title}</h2>}
        {children}
      </article>
    );
  }
  return (
    <section className="Block">
      {title && <h2 className="Block__title">{title}</h2>}
      {children}
    </section>
  );
};

export default Block;
