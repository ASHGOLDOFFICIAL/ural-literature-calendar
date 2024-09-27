import Block from '../Block/Block';

const PageNotFoundError: React.FC = () => {
  return (
    <Block title="Ошибка 404">
      <p>Страница не найдена</p>
    </Block>
  );
};

export default PageNotFoundError;
