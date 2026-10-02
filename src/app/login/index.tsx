import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  designColours,
  designSizing,
  touchTargets,
} from '@/constants/theme';
import { useAuth } from '@/components/useAuth';
import { NavigationBar } from '@/app/_layout';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      const authenticated = await login(email, password);
      if (authenticated) {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/');
        }
      } else {
        setErrorMessage('Email or password is incorrect.');
      }
    } catch {
      setErrorMessage('Unable to verify your account. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.panel}>
            <View style={styles.intro}>
              <Text style={styles.heading}>Login</Text>
              <Text style={styles.subtitle}>Enter account details to login</Text>

              <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  accessibilityLabel="Email"
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="email@adress.com"
                  placeholderTextColor={designColours.textMuted}
                  style={styles.input}
                  value={email}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                  accessibilityLabel="Password"
                  autoComplete="current-password"
                  onChangeText={setPassword}
                  placeholder="************"
                  placeholderTextColor={designColours.textMuted}
                  secureTextEntry
                  style={styles.input}
                  value={password}
                />
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={handleLogin}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
              ]}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            {errorMessage ? (
              <Text accessibilityRole="alert" style={styles.errorMessage}>
                {errorMessage}
              </Text>
            ) : null}

            <Pressable
              accessibilityRole="button"
              onPress={() => router.replace('/')}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
              ]}>
              <Text style={styles.buttonText}>Back to Home</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <NavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: designColours.background,
    flex: 1,
  },
  keyboardArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: designSizing.md,
  },
  panel: {
    backgroundColor: designColours.secondary,
    borderRadius: 18,
    flex: 1,
    padding: designSizing.md,
  },
  intro: {
    alignItems: 'center',
    backgroundColor: designColours.background,
    borderRadius: 18,
    padding: designSizing.sm,
  },
  heading: {
    color: designColours.primary,
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: designColours.secondary,
    fontSize: 14,
    marginTop: designSizing.xs,
    paddingBottom: designSizing.sm,
    textAlign: 'center',
  },
  form: {
    backgroundColor: designColours.card,
    borderRadius: 18,
    gap: designSizing.xs,
    padding: designSizing.md,
  },
  label: {
    color: designColours.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: designColours.card,
    borderColor: designColours.background,
    borderRadius: 12,
    borderWidth: 1,
    color: designColours.text,
    fontSize: 16,
    minHeight: touchTargets.minimumHeight,
    paddingHorizontal: designSizing.md,
  },
  button: {
    alignItems: 'center',
    backgroundColor: designColours.primary,
    borderRadius: 14,
    justifyContent: 'center',
    marginTop: designSizing.md,
    minHeight: touchTargets.minimumHeight,
    paddingHorizontal: designSizing.md,
  },
  buttonText: {
    color: designColours.card,
    fontSize: 14,
    fontWeight: '700',
  },
  errorMessage: {
    color: designColours.card,
    fontSize: 14,
    marginTop: designSizing.sm,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
