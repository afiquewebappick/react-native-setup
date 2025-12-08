import useAuth from '@/hooks/useAuth';
// import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';
import { useCallback, useState } from 'react';
import { databases, DATABASE_ID, HABITS_COLLECTION_ID } from '@/lib/appwrite';
import { Query } from 'react-native-appwrite';
import HabitCard from '../../components/HabitCard/HabitCard';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchHabits = async () => {
        try {
          const res = await databases.listDocuments(
            DATABASE_ID,
            HABITS_COLLECTION_ID,
            [Query.equal('user_id', user?.$id ?? '')]
          );
          // console.log(res.documents);
          setHabits(res.documents);
        } catch (error) {
          console.error(error);
        }
      };

      fetchHabits();
    }, [user])
  );

  const handleDelete = (habitId) => {
    setHabits(habits.filter((h) => h.$id !== habitId));
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} className="p-4">
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-3xl font-bold">Today&apos; Habit</Text>

          <Pressable
            className="flex-row gap-x-2 items-center"
            onPress={signOut}
          >
            <Entypo name="log-out" size={18} color="#6200ee" />
            <Text className="text-[#6200ee] text-xl">Sign Out</Text>
          </Pressable>
        </View>

        {habits.length === 0 ? (
          <View className="mt-20 p-10 bg-gray-400">
            <Text className="text-center text-xl">No habits added yet</Text>
          </View>
        ) : (
          habits.map((habit, i) => (
            <HabitCard key={i} habit={habit} handleDelete={handleDelete}></HabitCard>
          ))
        )}

        {/* <View className="flex-1 min-h-screen justify-center items-center bg-[#f5f5f5]">
        <Text className="text-3xl font-bold" style={styles.text}>
          Home
        </Text>

        <Link href="/login" className="text-3xl text-blue-800 font-bold">
        {' '}
        Login
      </Link>
      </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'green',
  },
});

export default Home;
