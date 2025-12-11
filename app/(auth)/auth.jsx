import { useState } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import useAuth from '../../hooks/useAuth';
import { Stack, useRouter } from 'expo-router';
import habitImg from '../../assets/habitImg.jpg';

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [hidePass, SetHidePass] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp, signIn } = useAuth();
  const router = useRouter();

  const handleSwitchMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleTogglePassword = () => {
    SetHidePass(!hidePass);
  };

  const handleAuth = async () => {
    if (!email || !password) {
      setError('Please fill all field');
      return;
    }

    if (isSignUp && !name) {
      setError('Please fill all field');
      return;
    }

    if (password.length < 8) {
      setError('Password must be 8 characters long');
      return;
    }

    setError('');

    if (isSignUp) {
      await signUp(name, email, password);
      router.replace('/');
    } else {
      try {
        await signIn(email, password);
        router.replace('/');
      } catch (error) {
        console.log(error);
        setError('Invalid credential!');
      }
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          title: isSignUp ? 'Sign Up' : 'Sign In',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-[#f5f5f5]"
      >
        <View className="flex-1 p-4 justify-center gap-y-3">
          <View className="flex justify-center items-center">
            <Image
              className="object-cover w-full h-[250px] rounded-md"
              source={habitImg}
            />
          </View>

          <Text className="text-center text-4xl font-bold mb-4 text-blue-800">
            {isSignUp
              ? 'Create Account to Get Started'
              : 'Welcome Back to Habit Tracker'}
          </Text>

          {isSignUp && (
            <TextInput
              autoCapitalize="none"
              inputMode="text"
              onChangeText={setName}
              placeholder="Your Name"
              className="p-4 border border-blue-400 rounded-lg bg-white"
            />
          )}

          <TextInput
            autoCapitalize="none"
            inputMode="email"
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="example@email.com"
            className="p-4 border border-blue-400 rounded-lg bg-white"
          />

          <View className="relative">
            <TextInput
              placeholder="Your password"
              onChangeText={setPassword}
              secureTextEntry={hidePass}
              className="p-4 border border-blue-400 rounded-lg bg-white"
            />

            <Pressable
              className="absolute right-4 top-4"
              onPress={handleTogglePassword}
            >
              {hidePass ? (
                <Entypo name="eye" size={20} color="black" />
              ) : (
                <Entypo name="eye-with-line" size={20} color="black" />
              )}
            </Pressable>
          </View>

          {error && <Text className="text-red-400 my-2">{error}</Text>}

          <Pressable
            onPress={handleAuth}
            className="bg-blue-700 p-4 rounded-lg mt-2"
          >
            <Text className="text-white text-center text-lg font-semibold">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Text>
          </Pressable>

          <Pressable onPress={handleSwitchMode}>
            <Text className="text-blue-700 text-center mt-3">
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default AuthScreen;
