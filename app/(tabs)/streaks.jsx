import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { databases, DATABASE_ID, HABITS_COLLECTION_ID } from '@/lib/appwrite';
import { Query } from 'react-native-appwrite';
import useAuth from '@/hooks/useAuth';
import { useFocusEffect } from '@react-navigation/native';

const StreaksScreen = () => {
  const { user } = useAuth();
  const [lastCompletedHabits, setLastCompletedHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // const [isCompleted, setIsCompleted] = useState(false);

  const fetchHabits = useCallback(async () => {
    try {
        setLoading(true);
      const res = await databases.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [Query.equal('user_id', user?.$id ?? '')]
      );

      const habits = res.documents;
      const lastCompleted = [];
      const now = new Date();
      habits.map((habit) => {
        if (habit.streak_count !== 0) {
          if (habit.frequency === 'daily') {
            const twentyFourHoursAgo = new Date(
              now.getTime() - 24 * 60 * 60 * 1000
            );
            if (new Date(habit.last_completed) >= twentyFourHoursAgo) {
              lastCompleted.push({
                title: habit.title,
                description: habit.description,
                last_completed: new Date(
                  habit.last_completed
                ).toLocaleDateString(),
              });
            }
          }

          if (habit.frequency === 'weekly') {
            const twentyFourHoursAgo = new Date(
              now.getTime() - 7 * 24 * 60 * 60 * 1000
            );
            if (new Date(habit.last_completed) >= twentyFourHoursAgo) {
              lastCompleted.push({
                title: habit.title,
                description: habit.description,
                last_completed: new Date(
                  habit.last_completed
                ).toLocaleDateString(),
              });
            }
          }

          if (habit.frequency === 'monthly') {
            const twentyFourHoursAgo = new Date(
              now.getTime() - 30 * 24 * 60 * 60 * 1000
            );
            if (new Date(habit.last_completed) >= twentyFourHoursAgo) {
              lastCompleted.push({
                title: habit.title,
                description: habit.description,
                last_completed: new Date(
                  habit.last_completed
                ).toLocaleDateString(),
              });
            }
          }
        }
      });
      setLastCompletedHabits(lastCompleted)
    //   console.log(lastCompletedHabits);
    } catch (error) {
      console.log(error);
    } finally {
        setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [fetchHabits])
  );

  const onRefresh = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    await fetchHabits();
    setRefreshing(false);
    setLoading(false);
  }, [fetchHabits]);

  return (
    <SafeAreaView className="p-4 bg-white flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="p-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6200ee']} // Android
            tintColor="#6200ee" // iOS
          />
        }
      >
        <View>
          <Text className="text-3xl font-bold">Habits</Text>
        </View>

        {loading && lastCompletedHabits.length === 0 && (
          <View
            className='mt-20 text-center'
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        )}

        {!loading && lastCompletedHabits.length === 0 ? (
          <View className="mt-20 p-10 bg-gray-400">
            <Text className="text-center text-xl">No streak habits</Text>
          </View>
        ) : (
          lastCompletedHabits.map((habit, i) => (
            <View key={i} className="mt-6">
              <View
                className={`bg-white shadow-lg rounded-2xl p-5 border border-gray-100`}
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-gray-500 text-sm">
                    {habit.last_completed}
                  </Text>

                </View>

                <Text className="text-xl font-semibold text-gray-900 mb-1">
                  {habit.title}
                </Text>

                <Text className="text-gray-600 mb-4">{habit.description}</Text>

                <View className="flex-row justify-between mt-2">
                  <Text className="text-green-700 font-medium">
                    🔥 {habit.streak_count} day streak
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StreaksScreen;
