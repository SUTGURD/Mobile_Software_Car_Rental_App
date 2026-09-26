import { router } from 'expo-router';
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
  designSpacing,
  touchTargets,
} from '@/constants/theme';

export default function LoginScreen() {
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
                placeholder="email@adress.com"
                placeholderTextColor={designColours.textMuted}
                style={styles.input}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                accessibilityLabel="Password"
                autoComplete="current-password"
                placeholder="************"
                placeholderTextColor={designColours.textMuted}
                secureTextEntry
                style={styles.input}
              />
            </View>
            </View>

            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
              ]}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>

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
    padding: designSpacing.md,
  },
  panel: {
    backgroundColor: designColours.secondary,
    borderRadius: 18,
    flex: 1,
    padding: designSpacing.md,
  },
  intro: {
    alignItems: 'center',
    backgroundColor: designColours.background,
    borderRadius: 18,
    padding: designSpacing.sm,
  },
  heading: {
    color: designColours.primary,
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: designColours.secondary,
    fontSize: 14,
    marginTop: designSpacing.xs,
    paddingBottom: designSpacing.sm,
    textAlign: 'center',
  },
  form: {
    backgroundColor: designColours.card,
    borderRadius: 18,
    gap: designSpacing.xs,
    padding: designSpacing.md,
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
    paddingHorizontal: designSpacing.md,
  },
  button: {
    alignItems: 'center',
    backgroundColor: designColours.primary,
    borderRadius: 14,
    justifyContent: 'center',
    marginTop: designSpacing.md,
    minHeight: touchTargets.minimumHeight,
    paddingHorizontal: designSpacing.md,
  },
  buttonText: {
    color: designColours.card,
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
