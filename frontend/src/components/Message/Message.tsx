import './Message.css';

export interface MessageModel {
  type?: 'success' | 'error';
  body?: string;
}

export const makeCreateMessage = (setMessage: React.Dispatch<MessageModel>) => {
  return (type: MessageModel['type'] = undefined, body: MessageModel['body'] = undefined) => {
    setMessage({
      type: type,
      body: body
    });
  };
};

const Message: React.FC<MessageModel> = ({ type, body }) => {
  if (type !== undefined) {
    return <div className={`Message--${type}`}>{body}</div>;
  }
  return null;
};

export default Message;
