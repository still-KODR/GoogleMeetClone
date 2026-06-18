import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { verifyAuth } from '../store/slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(verifyAuth());
    }
  }, [status, dispatch]);

  if (status === 'idle' || status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Error: unauth</h1>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;