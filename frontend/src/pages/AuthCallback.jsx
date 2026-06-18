import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { verifyAuth } from '../store/slices/authSlice';

const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAuth()).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/login?error=auth_failed', { replace: true });
      }
    });
  }, []);

  return <p>Signing you in...</p>;
};

export default AuthCallback;