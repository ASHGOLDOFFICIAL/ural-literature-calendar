import { useContext } from 'react';
import useAuth from '../context/AuthContext';
import Avatar from './Avatar/Avatar';
import InitialsAvatar from './InitialsAvatar/InitialsAvatar';
import './ProfileSidebarLink.css';

const ProfileSidebarLink: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="profile-link">
      {user.avatar ? (
        <Avatar className="profile-link__avatar-thumb" src={user.avatar} />
      ) : (
        <InitialsAvatar
          className="profile-link__avatar-thumb"
          id={user.id}
          username={user.username}
          firstName={user.first_name}
          lastName={user.last_name}
        />
      )}
      <div className="profile-link__info">
        <span className="profile-link__username">{user.username}</span>
      </div>
    </div>
  );
};

export default ProfileSidebarLink;
