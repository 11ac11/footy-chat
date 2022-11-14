import React from 'react';

const UserContext = React.createContext({
  user: {
    email: '',
    password: '',
    name: '',
    position: '',
    side: '',
    foot: '',
    nationality: '',
    team: '',
    games_played: 0,
  },
  userEmail: '',
  setIsAuthenticated: () => {},
});

export default UserContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const context = {
    user,
    setUser,
    userEmail,
    setUserEmail,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
