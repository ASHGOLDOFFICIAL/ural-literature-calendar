import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileModel } from '../utils/models';
import Loading from '../components/Loading';
import PageNotFoundError from '../components/PageNotFoundError/PageNotFoundError';
import Avatar from '../components/Avatar/Avatar';
import InitialsAvatar from '../components/InitialsAvatar/InitialsAvatar';
import Block from '../components/Block/Block';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileModel | undefined>();
  const { username } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProfile = async () => {
      const response = await fetch(`/api/profiles/${username}?format=json`, {
        signal
      });

      const data = await response.json();
      setProfileData(data);
      setLoading(false);

      return () => controller.abort();
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <Block>
        <Loading />
      </Block>
    );
  } else if (!profileData?.username) {
    return <PageNotFoundError />;
  }

  return (
    <Block>
      <div className="profile">
        <div className="profile__info-block">
          {profileData.avatar ? (
            <Avatar className="profile__avatar" src={profileData.avatar} />
          ) : (
            <InitialsAvatar
              className="profile__avatar"
              id={profileData.id}
              username={profileData.username}
              firstName={profileData.first_name}
              lastName={profileData.last_name}
            />
          )}
          <div className="profile__info">
            <div className="profile__name">
              <span>
                {profileData.first_name} {profileData.last_name}
              </span>
            </div>
            <div className="profile__username">
              <span>{profileData.username}</span>
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
};

export default ProfilePage;
