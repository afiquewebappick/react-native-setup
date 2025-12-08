import { View, Text } from 'react-native';
import React, { useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import { databases, DATABASE_ID, HABITS_COLLECTION_ID } from '@/lib/appwrite';

const HabitCard = ({ habit, handleDelete }) => {
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

  const handleRenderRightActions = () => (
    <View className="flex-1 bg-green-400 justify-center items-end mt-6 rounded-2xl p-5">
      <AntDesign name="check-circle" size={24} color="white" />
    </View>
  );

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

        swipeableRefs.current[habit.$id]?.close();
      }}
    >
      <View className="mt-6">
        <View className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100">
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
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default HabitCard;
