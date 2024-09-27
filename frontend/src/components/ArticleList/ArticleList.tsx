import { useState, useEffect } from 'react';
import { ArticleModel } from '../../utils/models';
import Article from '../Article/Article';

interface ArticleListProps {
  month: number;
  day?: number;
}

const ArticleList: React.FC<ArticleListProps> = ({ month, day }) => {
  const [articleData, setArticleData] = useState<ArticleModel[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchArticles = async () => {
      const response = await fetch(`/api/articles?format=json&month=${month}&day=${day || ''}`, { signal });
      const data = await response.json();
      setArticleData(data);
      return () => {
        controller.abort();
      };
    };

    fetchArticles();

    return () => controller.abort();
  }, []);

  return (
    <>
      {articleData.map((article) => (
        <Article key={article.id} {...article} />
      ))}
    </>
  );
};

export default ArticleList;
