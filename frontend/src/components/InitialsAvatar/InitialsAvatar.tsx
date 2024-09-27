import './InitialsAvatar.css'

const GRADIENTS_NAMES = ['ash', 'aubergine', 'blush', 'cherry', 'crystal-clear', 'juicy-orange', 'mirage', 'mojito', 'namn', 'skyline', 'sulphur']

function getInitials(username: string, firstName: string, lastName: string
) {
  if (firstName && lastName) {
    return firstName.charAt(0) + lastName.charAt(0)
  } else {
    return username.slice(0, 2)
  }
}

function getGragientName(id: number) {
  return GRADIENTS_NAMES[id % GRADIENTS_NAMES.length]
}

interface InitialsAvatarProps {
  className: string,
  id: number,
  username: string,
  firstName: string,
  lastName: string,
}

const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ className, id, username, firstName='', lastName='' }) => {
  return (
    <svg
      role='img'
      aria-label='Аватар, содержащий инициалы пользователя'
      className={`InitialsAvatar InitialsAvatar--${getGragientName(id)} ${className}`}
      viewBox='0 0 32 32'
    >
      <text className='InitialsAvatar__text' x='50%' y='50%'>
        {getInitials(username, firstName, lastName)}
      </text>
    </svg>
  )
};

export default InitialsAvatar;
