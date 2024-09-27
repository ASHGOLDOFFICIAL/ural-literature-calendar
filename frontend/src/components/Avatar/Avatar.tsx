import './Avatar.css';

interface AvatarProps {
  className?: string;
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ className, src }) => {
  return (
    <div className={`Avatar ${className}`}>
      <img className="Avatar__image" src={src} alt="" />
    </div>
  );
};

export default Avatar;
