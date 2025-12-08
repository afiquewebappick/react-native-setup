import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { databases, DATABASE_ID, HABITS_COLLECTION_ID } from '@/lib/appwrite';
import { Ionicons } from '@expo/vector-icons';

const FREQUENCIES = ['daily', 'weekly', 'monthly'];

const UpdateHabitScreen = () => {
  const router = useRouter();
  const { id, title, description, frequency } = useLocalSearchParams();

  const [habitTitle, setHabitTitle] = useState(title || '');
  const [habitDescription, setHabitDescription] = useState(description || '');
  const [habitFrequency, setHabitFrequency] = useState(frequency || 'daily');
  const [loading, setLoading] = useState(false);

  const handleUpdateHabit = async () => {
    try {
      setLoading(true);

      await databases.updateDocument(DATABASE_ID, HABITS_COLLECTION_ID, id, {
        title: habitTitle,
        description: habitDescription,
        frequency: habitFrequency,
      });

      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Update Habit',
          headerBackTitleVisible: false,
          headerBackTitle: '',
          headerLeft: () => (
            <Pressable onPress={() => router.back()} className="ml-2">
              <Ionicons name="arrow-back" size={24} color="#4a3aff" />
            </Pressable>
          ),
        }}
      />

      <View className="p-5">
        <Text className="text-center text-3xl mb-6 font-extrabold text-[#4a3aff]">
          Update Habit
        </Text>

        {/* Card Container */}
        <View className="bg-white p-5 rounded-2xl shadow-md mb-5">
          {/* Title */}
          <Text className="text-gray-600 mb-1 font-medium">Title</Text>
          <TextInput
            value={habitTitle}
            onChangeText={setHabitTitle}
            placeholder="Enter habit title"
            className="bg-gray-100 p-3 rounded-xl mb-4 text-gray-900"
          />

          {/* Description */}
          <Text className="text-gray-600 mb-1 font-medium">Description</Text>
          <TextInput
            value={habitDescription}
            onChangeText={setHabitDescription}
            placeholder="Enter description"
            multiline
            className="bg-gray-100 p-3 rounded-xl mb-4 text-gray-900 h-24"
          />

          {/* Frequency */}
          <Text className="text-gray-600 mb-2 font-medium">Frequency</Text>

          <View className="flex-row gap-x-2">
            {FREQUENCIES.map((freq) => (
              <Pressable
                key={freq}
                onPress={() => setHabitFrequency(freq)}
                className={`px-4 py-2 rounded-xl border ${
                  habitFrequency === freq
                    ? 'bg-[#4a3aff] border-blue-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                <Text
                  className={`font-medium ${
                    habitFrequency === freq ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Submit Button */}
        <Pressable
          onPress={handleUpdateHabit}
          className="bg-[#4a3aff] py-4 rounded-2xl shadow-md mt-4"
        >
          <Text className="text-center text-white font-semibold text-lg">
            {loading ? 'Updating...' : 'Save Changes'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default UpdateHabitScreen;
