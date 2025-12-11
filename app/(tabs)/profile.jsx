import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useAuth from '@/hooks/useAuth';

const Profile = () => {
  const { user, signOut } = useAuth();

  const handleUpdateProfile = () => {
    // TODO: Navigate to update profile screen or show modal
    Alert.alert('Update Profile', 'Profile update feature coming soon!');
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', onPress: signOut, style: 'destructive' },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <Text className="text-3xl font-bold mt-2 mb-6">Profile</Text>

        {/* User Info Card */}
        <View className="bg-gray-100 rounded-xl p-6 mb-6">
          <View className="items-center mb-4">
            <View className="bg-purple-600 w-20 h-20 rounded-full items-center justify-center mb-3">
              <Text className="text-white text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase() ||
                  user?.email?.charAt(0).toUpperCase() ||
                  'U'}
              </Text>
            </View>
            <Text className="text-xl font-bold text-gray-800">
              {user?.name || 'User'}
            </Text>
            <Text className="text-gray-600 mt-1">{user?.email}</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View className="bg-white rounded-xl border border-gray-200">
          <Pressable
            className="flex-row items-center p-4 border-b border-gray-200"
            onPress={handleUpdateProfile}
          >
            <View className="bg-purple-100 p-2 rounded-lg mr-3">
              <Ionicons name="person-outline" size={24} color="#6200ee" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">
                Update Profile
              </Text>
              <Text className="text-sm text-gray-500">
                Edit your name and details
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </Pressable>

          <Pressable
            className="flex-row items-center p-4 border-b border-gray-200"
            onPress={() =>
              Alert.alert('Settings', 'Settings feature coming soon!')
            }
          >
            <View className="bg-blue-100 p-2 rounded-lg mr-3">
              <Ionicons name="settings-outline" size={24} color="#2563eb" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">
                Settings
              </Text>
              <Text className="text-sm text-gray-500">
                App preferences and notifications
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </Pressable>

          <Pressable
            className="flex-row items-center p-4 border-b border-gray-200"
            onPress={() => Alert.alert('Help', 'Help feature coming soon!')}
          >
            <View className="bg-green-100 p-2 rounded-lg mr-3">
              <Ionicons name="help-circle-outline" size={24} color="#16a34a" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">
                Help & Support
              </Text>
              <Text className="text-sm text-gray-500">
                Get help and contact us
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </Pressable>

          <Pressable
            className="flex-row items-center p-4"
            onPress={handleSignOut}
          >
            <View className="bg-red-100 p-2 rounded-lg mr-3">
              <Ionicons name="log-out-outline" size={24} color="#dc2626" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-red-600">
                Sign Out
              </Text>
              <Text className="text-sm text-gray-500">
                Sign out of your account
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </Pressable>
        </View>

        {/* App Info */}
        <View className="mt-8 items-center">
          <Text className="text-gray-500 text-sm">Habit Tracker</Text>
          <Text className="text-gray-400 text-xs mt-1">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
