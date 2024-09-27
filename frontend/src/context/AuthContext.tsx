import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileModel } from '../utils/models';

type fetchStatus = 'success' | 'error';

interface AuthContextType {
  user: ProfileModel;
  signUp: (email: string, username: string, password: string) => Promise<fetchStatus>;
  login: (email: string, password: string) => Promise<fetchStatus>;
  logout: () => void;
  getProfile: (username: string) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const navigate = useNavigate();

  const signUp = async (email: string, username: string, password: string) => {
    const response = await fetch(`/api/registration?format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password
      }),
      credentials: 'include'
    });
    const data = await response.json();

    if (response.status === 201) {
      return 'success';
    } else {
      console.log(response)
      return 'error';
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`/api/login?format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
      credentials: 'include'
    });
    const data = await response.json();

    if (response.status === 200) {
      getProfile(data.username);
      return 'success';
    } else {
      console.log(response);
      return 'error';
    }
  };

  const logout = async () => {
    await fetch(`/api/logout?format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const updateToken = async () => {
    const response = await fetch(`/api/token?format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    console.log(response);

    if (response.status !== 200) {
      logout();
    }
    if (loading) {
      setLoading(false);
    }
  };

  const getProfile = async (username: string) => {
    const response = await fetch(`/api/profiles/${username}?format=json`);
    const data = await response.json();

    if (response.status === 200) {
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    const fourMinutes = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (user) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, []);

  const contextData = {
    user,
    signUp,
    login,
    logout,
    getProfile
  };

  return <AuthContext.Provider value={contextData}>{!loading && children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
