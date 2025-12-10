import { Stack, useRouter, useSegments } from 'expo-router';
import '../global.css';
import { useEffect } from 'react';
import AuthProvider from '../contexts/authContext';
import useAuth from '../hooks/useAuth';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { useColorScheme } from 'react-native';

const RouteGuard = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  // const [isAuth] = useState(false);
  // const [isMounted, setIsMounted] = useState(false);
  const segment = useSegments();

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  useEffect(() => {
    // if (!isMounted) return;
    const isAuthGroup = segment[0] === '/auth';

    if (!user && !isAuthGroup && !loading) {
      router.replace('/auth');
    } else if (user && isAuthGroup && !loading) {
      router.replace('/');
    }
  }, [router, segment, loading, user]);

  return <>{children}</>;
};

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  // console.log(colorScheme);
  // colorScheme = 'dark';
  // console.log(colorScheme);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RouteGuard>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <Toast />
        </RouteGuard>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
