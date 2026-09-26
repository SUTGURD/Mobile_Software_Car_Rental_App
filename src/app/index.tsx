import { router } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NavigationBar } from '@/app/_layout';

function CarIllustration() {
  return (
    <View
      accessibilityLabel="Illustration of a green rental car"
      accessible
      style={styles.carIllustration}>
      <View style={styles.carRoof}>
        <View style={styles.carWindow} />
      </View>
      <View style={styles.carBody} />
      <View style={[styles.wheel, styles.frontWheel]}>
        <View style={styles.wheelCentre} />
      </View>
      <View style={[styles.wheel, styles.rearWheel]}>
        <View style={styles.wheelCentre} />
      </View>
    </View>
  );
}

function HomeButton({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}>
      <Text style={styles.actionButtonText}>{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.upperPanel}>
        <Text style={styles.title}>CAR RENTAL NAME</Text>
        <View style={styles.illustrationPanel}>
          <CarIllustration />
        </View>
        <View style={styles.actions}>
          <HomeButton label="LOGIN" />
          <HomeButton
            label="BROWSE CARS"
            onPress={() =>
              router.push('/list' as Parameters<typeof router.push>[0])
            }
          />
        </View>
      </View>
      <View style={styles.middlePanel} />
      <View style={styles.lowerPanel} />
      <NavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#D5DDED',
    flex: 1,
  },
  upperPanel: {
    alignItems: 'center',
    backgroundColor: '#6399BF',
    flex: 4.3,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 18,
    textAlign: 'center',
  },
  illustrationPanel: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    height: 176,
    justifyContent: 'center',
    marginBottom: 20,
    maxWidth: 420,
    width: '100%',
  },
  carIllustration: {
    height: 132,
    maxWidth: 340,
    position: 'relative',
    width: '88%',
  },
  carRoof: {
    backgroundColor: '#B5E619',
    borderColor: '#050505',
    borderTopLeftRadius: 54,
    borderTopRightRadius: 48,
    borderWidth: 6,
    height: 82,
    position: 'absolute',
    right: '9%',
    top: 0,
    width: '47%',
    zIndex: 1,
  },
  carWindow: {
    backgroundColor: '#8A8A8A',
    borderColor: '#050505',
    borderRadius: 22,
    borderWidth: 4,
    height: 44,
    marginLeft: 12,
    marginTop: 10,
    width: '72%',
  },
  carBody: {
    backgroundColor: '#B5E619',
    borderColor: '#050505',
    borderRadius: 36,
    borderWidth: 6,
    bottom: 20,
    height: 70,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  wheel: {
    alignItems: 'center',
    backgroundColor: '#050505',
    borderRadius: 25,
    bottom: 0,
    height: 48,
    justifyContent: 'center',
    position: 'absolute',
    width: 48,
    zIndex: 2,
  },
  frontWheel: {
    left: '14%',
  },
  rearWheel: {
    right: '14%',
  },
  wheelCentre: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 22,
    width: 22,
  },
  actions: {
    alignItems: 'center',
    gap: 20,
    maxWidth: 360,
    width: '88%',
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#466173',
    borderRadius: 14,
    justifyContent: 'center',
    minHeight: 80,
    paddingHorizontal: 12,
    width: '100%',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
  middlePanel: {
    backgroundColor: '#B6D3E7',
    flex: 1,
  },
  lowerPanel: {
    backgroundColor: '#D5DDED',
    flex: 0.8,
  },
});
