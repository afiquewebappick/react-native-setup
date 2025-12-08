import { View, Text, Pressable } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  databases,
  DATABASE_ID,
  HABITS_COLLECTION_ID,
  COMPLETIONS_COLLECTION_ID,
} from '@/lib/appwrite';
import useAuth from '@/hooks/useAuth';
import { ID, Query } from 'react-native-appwrite';
import { useRouter } from 'expo-router';

const HabitCard = ({ habit, handleDelete, handleUpdate }) => {
  const { user } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const router = useRouter();
  const swipeableRefs = useRef({});
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const handleRenderLeftActions = () => (
    <View className="flex-1 bg-red-400 justify-center items-start mt-6 rounded-2xl p-5">
      <AntDesign name="delete" size={24} color="white" />
    </View>
  );

  const handlerDeleteHabit = async (id) => {
    // console.log(id);
    try {
      await databases.deleteDocument(DATABASE_ID, HABITS_COLLECTION_ID, id);

      // console.log('Habit deleted successfully');

      if (handleDelete) {
        handleDelete(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerCompleteHabit = async (id) => {
    if (!user) return;
    // console.log(id);
    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [
          Query.equal('user_id', user?.$id ?? ''),
          Query.equal('$id', habit?.$id ?? ''),
        ]
      );
      const s_cnt = res.documents[0].streak_count;
      if (s_cnt !== 0) {
        const l_cmp = res.documents[0].last_completed;
        const last = new Date(l_cmp);
        const now = new Date();
        if (res.documents[0].frequency === 'daily') {
          const twentyFourHoursAgo = new Date(
            now.getTime() - 24 * 60 * 60 * 1000
          );
          if (last >= twentyFourHoursAgo) return;
        } else if (res.documents[0].frequency === 'weekly') {
          const sevenDaysAgo = new Date(
            now.getTime() - 7 * 24 * 60 * 60 * 1000
          );
          if (last >= sevenDaysAgo) return;
        } else if (res.documents[0].frequency === 'monthly') {
          const thirtyDaysAgo = new Date(
            now.getTime() - 30 * 24 * 60 * 60 * 1000
          );
          if (last >= thirtyDaysAgo) return;
        }
      }
      // console.log(res.documents[0].last_completed);
      // console.log(res.documents[0].frequency);

      // console.log(res.documents[0].streak_count);
      const currentDate = new Date().toISOString();
      // const compareDate;
      const data = {
        habit_id: id,
        user_id: user.$id,
        completed_at: currentDate,
      };
      await databases.createDocument(
        DATABASE_ID,
        COMPLETIONS_COLLECTION_ID,
        ID.unique(),
        data
      );

      // Updated habit collection

      const updatedData = {
        streak_count: habit.streak_count + 1,
        last_completed: currentDate,
      };
      await databases.updateDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        id,
        updatedData
      );

      handleUpdate({
        ...habit,
        ...updatedData,
      });

      // console.log('Habit deleted successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleRenderRightActions = () => (
    <View className="flex-1 bg-green-400 justify-center items-end mt-6 rounded-2xl p-5">
      {isCompleted ? (
        <Text className="text-white font-semibold">Completed</Text>
      ) : (
        <AntDesign name="check-circle" size={24} color="white" />
      )}
    </View>
  );

  useEffect(() => {
    if (habit.frequency === 'daily' && habit.streak_count !== 0) {
      const last = new Date(habit.last_completed);
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      if (last >= twentyFourHoursAgo) {
        setIsCompleted(true);
      }
    } else if (habit.frequency === 'weekly' && habit.streak_count !== 0) {
      const last = new Date(habit.last_completed);
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      if (last >= sevenDaysAgo) {
        setIsCompleted(true);
      }
    } else if (habit.frequency === 'monthly' && habit.streak_count !== 0) {
      const last = new Date(habit.last_completed);
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      if (last >= thirtyDaysAgo) {
        setIsCompleted(true);
      }
    }
  }, [habit]);

  return (
    <Swipeable
      ref={(ref) => {
        swipeableRefs.current[habit.$id] = ref;
      }}
      renderLeftActions={handleRenderLeftActions}
      renderRightActions={handleRenderRightActions}
      onSwipeableOpen={(direction) => {
        if (direction === 'left') {
          handlerDeleteHabit(habit.$id);
        }
        if (direction === 'right') {
          handlerCompleteHabit(habit.$id);
        }

        swipeableRefs.current[habit.$id]?.close();
      }}
    >
      <View className="mt-6">
        <View
          className={`bg-white shadow-lg rounded-2xl p-5 border border-gray-100 ${isCompleted ? 'opacity-60' : 'opacity-100'}`}
        >
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-500 text-sm">
              {new Date(habit.$createdAt).toLocaleString('en-US', options)}
            </Text>

            <Text className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {habit.frequency.charAt(0).toUpperCase() +
                habit.frequency.slice(1)}
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

            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/updateHabit',
                  params: {
                    id: habit.$id,
                    title: habit.title,
                    description: habit.description,
                    frequency: habit.frequency,
                  },
                })
              }
              className="px-3 py-1 bg-yellow-400 rounded-lg"
            >
              <Text className="text-white font-semibold">Update</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default HabitCard;
