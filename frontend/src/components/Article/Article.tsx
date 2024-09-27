import { ArticleModel } from '../../utils/models';
import Block from '../Block/Block';
import './Article.css'

const Article: React.FC<ArticleModel> = ({ title, body, imageUrl, date }) => {
  const paragraphs = body.split('\n');

  return (
    <Block title={title} article>
        {paragraphs.map((paragraph, i) => (
          <p className="Article__p" key={i}>{paragraph}</p>
        ))}
    </Block>
  );
};

export default Article;
