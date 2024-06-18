import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export const Oauth = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async (response) => {
    try {
      console.log(response)
      const googleResponse = await axios.post('http://localhost:4000/api/v.0.0/oauth/callback', {
        data:{"accessToken":response.credential}
      });
      console.log(googleResponse.data)
      navigate('http://localhost:3000/user',{state:googleResponse.data})
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_BASILCLIENTID}>
      <div>
        {error && <p>{error}</p>}
        <GoogleLogin
          onSuccess={handleGoogleSignIn}
          onFailure={() => setError('Google sign-in failed')}
        />
      </div>
    </GoogleOAuthProvider>
  );
};
