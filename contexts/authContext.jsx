import { createContext, useEffect, useState } from 'react';
import { account } from '../lib/appwrite';
import { ID } from 'react-native-appwrite';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email, password) => {
    try {
      await account.create({
        userId: ID.unique(),
        email: email,
        password: password,
      });
      // Sign in after successful signup
      await signIn(email, password);
    } catch (error) {
      console.error('SignUp error:', error);
      throw error; // Re-throw to handle in UI
    }
  };

  const signIn = async (email, password) => {
    try {
      await account.createEmailPasswordSession({
        email: email,
        password: password,
      });
      // Get user info after successful sign in
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      console.error('SignIn error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession({
        sessionId: 'current'
      });
      setUser(null);
    } catch (error) {
      console.error('SignOut error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        // User not logged in
        console.log(error)
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, []);

  const authInfo = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };
  
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;