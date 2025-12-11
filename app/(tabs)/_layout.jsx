import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          borderTopWidth: 0,
          paddingTop: 10,
          paddingLeft: 10,
          paddingEnd: 10,
          shadowOpacity: 0,
          backgroundColor: '#f5f5f5',
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today's Habit",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calculator" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addHabit"
        options={{
          title: 'Add Habit',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          title: 'Streaks',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="line-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
