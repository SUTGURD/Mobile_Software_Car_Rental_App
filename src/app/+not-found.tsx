import { Redirect } from 'expo-router';

export default function NotFoundScreen() {
  return <Redirect href={'/error' as Parameters<typeof Redirect>[0]['href']} />;
}
