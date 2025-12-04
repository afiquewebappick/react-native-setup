import useAuth from '@/hooks/useAuth';
// import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';

const Home = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView>
      <View className="flex-1 min-h-screen justify-center items-center bg-[#f5f5f5]">
        <Text className="text-3xl font-bold" style={styles.text}>
          Home
        </Text>

        <Pressable className='flex-row gap-x-2 items-center mt-2' onPress={signOut}>
          <Entypo name="log-out" size={24} color='#6200ee' />
          <Text className="text-[#6200ee] text-2xl">Sign Out</Text>
        </Pressable>
        {/* <Link href="/login" className="text-3xl text-blue-800 font-bold">
        {' '}
        Login
      </Link> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'green',
  },
});

export default Home;
