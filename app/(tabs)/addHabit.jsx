import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const frequencies = ['daily', 'weekly', 'monthly'];

const AddHabitScreen = () => {
  return (
    <SafeAreaView>
      <View className="flex-1 min-h-screen justify-center p-4">
        <Text className="text-center text-3xl mb-4 font-bold">Add Habit</Text>

        <Text className="mb-2 text-lg">Title</Text>
        <TextInput
          autoCapitalize="none"
          inputMode="text"
          placeholder="title"
          className="p-4 border border-blue-400 rounded-lg bg-white"
        />

        <Text className="mt-4 mb-2 text-lg">Description</Text>
        <TextInput
          multiline
          autoCapitalize="none"
          inputMode="text"
          placeholder="description"
          className="p-4 border border-blue-400 rounded-lg bg-white h-32"
          textAlignVertical="top"
        />
      </View>
    </SafeAreaView>
  );
};

export default AddHabitScreen;
