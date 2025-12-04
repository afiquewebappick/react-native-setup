import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

const useAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};
export default useAuth;
