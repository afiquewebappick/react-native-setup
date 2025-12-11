import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useAuth from '../../hooks/useAuth'

const CustomDrawer = ({ navigation }) => {
  const { signOut, user } = useAuth();

  const handleUpdateProfile = () => {
    // Navigate to profile update screen
    navigation.navigate('UpdateProfile'); // Adjust route name as needed
    navigation.closeDrawer();
  };

  const handleSignOut = () => {
    navigation.closeDrawer();
    signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu</Text>
      </View>

      <View style={styles.menuItems}>
        <Pressable style={styles.menuItem} onPress={handleUpdateProfile}>
          <Ionicons name="person-outline" size={24} color="#6200ee" />
          <Text style={styles.menuText}>Update Profile</Text>
        </Pressable>

        <Pressable style={styles.menuItem} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={24} color="#6200ee" />
          <Text style={styles.menuText}>Sign Out</Text>
        </Pressable>
      </View>

      {user && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>Logged in as:</Text>
          <Text style={styles.emailText}>{user.email}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItems: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 15,
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
  emailText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});

export default CustomDrawer;