import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';
import CalendarPage from './pages/CalendarPage';
import CalendarDatePage from './pages/CalendarDatePage';
import PageNotFoundError from './components/PageNotFoundError/PageNotFoundError';
import SuggestEventPage from './pages/SuggestEventPage';
import SuggestArticlePage from './pages/SuggestArticlePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="profile/:username" element={<ProfilePage />} />

            <Route path="calendar" element={<CalendarPage />} />
            <Route path="calendar/:month" element={<CalendarDatePage />} />
            <Route path="calendar/:month/:day" element={<CalendarDatePage />} />

            <Route path="event/suggest" element={<SuggestEventPage />} />
            <Route path="article/suggest" element={<SuggestArticlePage />} />

            <Route path="*" element={<PageNotFoundError />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
