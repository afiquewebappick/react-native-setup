import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../../hooks/useAuth';
import {
  databases,
  DATABASE_ID,
  HABITS_COLLECTION_ID,
} from '../../lib/appwrite';
import { ID } from 'react-native-appwrite';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

const frequencies = ['daily', 'weekly', 'monthly'];

const AddHabitScreen = () => {
  const [frequency, setFrequency] = useState('daily');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useAuth();

  // console.log(frequency)

  const handleAddHabit = async () => {
    if (!user) return;

    try {
      const data = {
        user_id: user.$id,
        title,
        description,
        frequency,
        streak_count: 0,
        last_completed: new Date().toISOString(),
        // createdAt: new Date().toISOString(),
      };

      // console.log(data);
      await databases.createDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        ID.unique(),
        data
      );
      Toast.show({
        type: 'success',
        text1: 'Habit added!',
        text2: 'Your habit was created successfully',
      });

      // 🔥 Reset form values
      setTitle('');
      setDescription('');
      setFrequency('daily');

      // console.log('Habit created:', result);
      router.back();
    } catch (error) {
      // console.error('Error creating habit:', error);
      throw error;
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View className="flex-1 min-h-screen p-6">
            <Text className="text-center text-3xl mb-6 font-extrabold text-[#4a3aff]">
              Add New Habit
            </Text>

            <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <Text className="mb-2 text-base font-semibold text-gray-700">
                Habit Title
              </Text>
              <TextInput
                value={title}
                placeholder="e.g. Read 20 minutes"
                className="p-4 border border-gray-300 rounded-xl bg-gray-100 focus:border-[#4a3aff]"
                onChangeText={setTitle}
              />

              <Text className="mt-5 mb-2 text-base font-semibold text-gray-700">
                Description
              </Text>
              <TextInput
                value={description}
                multiline
                placeholder="Why is this habit important?"
                textAlignVertical="top"
                className="p-4 border border-gray-300 rounded-xl bg-gray-100 h-32 focus:border-[#4a3aff]"
                onChangeText={setDescription}
              />

              <Text className="mt-5 mb-2 text-base font-semibold text-gray-700">
                Frequency
              </Text>
              <View className="flex-row bg-gray-200 rounded-2xl overflow-hidden">
                {frequencies.map((f, i) => (
                  <Pressable
                    key={i}
                    onPress={() => setFrequency(f)}
                    className={`flex-1 py-3 ${
                      frequency === f ? 'bg-[#4a3aff]' : 'bg-transparent'
                    }`}
                  >
                    <Text
                      className={`text-center text-base font-semibold ${
                        frequency === f ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {f.toUpperCase()}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Pressable
                onPress={handleAddHabit}
                disabled={!title || !description}
                className={`mt-6 rounded-xl p-4 shadow-md ${
                  !title || !description
                    ? 'bg-gray-400'
                    : 'bg-[#4a3aff] active:bg-[#3929d0]'
                }`}
              >
                <Text className="text-center text-lg text-white font-semibold">
                  Add Habit
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddHabitScreen;
