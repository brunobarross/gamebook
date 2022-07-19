import React, { useContext } from 'react';
import { AuthGoogleContext } from '../../Contexts/AuthGoogle';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { signInGoogle, signed, user } = useContext(AuthGoogleContext);

  async function loginGoogle() {
    await signInGoogle();
  }

  if (!signed) {
    return (
      <div className="flex justify-center items-center h-full min-h-screen">
        <button
          className="bg-primary-pure text-white py-2 px-4 rounded-[4px]"
          onClick={loginGoogle}
        >
          Logar com Google
        </button>
      </div>
    );
  } else {
    return <Navigate to="/home" />;
  }
};

export default Login;
