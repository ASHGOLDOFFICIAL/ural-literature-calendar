import { ChangeEvent, TextareaHTMLAttributes } from 'react';

interface AutoGrowingTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: number;
}

const AutoGrowingTextarea: React.FC<AutoGrowingTextareaProps> = ({ ...props }) => {
  const resize = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let contentHeight = event.target.scrollHeight;
    event.target.style.height = contentHeight + 'px';
  };
  return <textarea {...props} onInput={resize}></textarea>;
};

export default AutoGrowingTextarea;
