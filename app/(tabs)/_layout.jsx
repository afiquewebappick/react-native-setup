import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6200ee', // blue-600
        tabBarInactiveTintColor: '#666666', // gray-500
        tabBarStyle: {
          borderTopWidth: 0,
          shadowOpacity: 0,
          backgroundColor: '#f5f5f5',
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today's Habit",
          headerShown: false,
          // tabBarIcon: ({ color, focused }) => {
          //   return focused ? (
          //     <FontAwesome name="home" size={24} color={color} />
          //   ) : (
          //     <Ionicons name="home-outline" size={24} color="black" />
          //   );
          // },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calculator" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          title: 'Streaks',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="chart-line" size={size} color={color} />
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
    </Tabs>
  );
}
