import React, {useContext} from 'react';
import AuthContext from './context/AuthContext';

function Home() {
  const { authUser, setAuthUser } = useContext(AuthContext);
  return (
    <div>
      {authUser ? <h1>Dobrodosli {authUser.email}</h1> : <h1>Dobrodosli</h1>}
    </div>
  );
}

export default Home;