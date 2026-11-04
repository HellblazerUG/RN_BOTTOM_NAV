//npx expo install react-native-safe-area-context

import { Button, Dimensions, Image, Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    setStatusBarStyle(styleId === STYLES.length ? STYLES[0] : STYLES[styleId]);
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    setStatusBarTransition(transition === TRANSITIONS.length ? TRANSITIONS[0] : TRANSITIONS[transition]);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <Text style={styles.textStyle}>
          StatusBar Visibility:{'\n'}
          {hidden ? 'Hidden' : 'Visible'}
        </Text>
        <Text style={styles.textStyle}>
          StatusBar Style:{'\n'}
          {statusBarStyle}
        </Text>
        {Platform.OS === 'ios' ? (
          <Text style={styles.textStyle}>
            StatusBar Transition:{'\n'}
            {statusBarTransition}
          </Text>
        ) : null}
        <View style={styles.buttonsContainer}>
          <Button title="Toggle StatusBar" onPress={changeStatusBarVisibility} />
          <Button title="Change StatusBar Style" onPress={changeStatusBarStyle} />
          {Platform.OS === 'ios' ? (
            <Button title="Change StatusBar Transition" onPress={changeStatusBarTransition} />
          ) : null}
        </View>

        <View style={styles.content}>
          <Text>Counter App</Text>
          <View style={styles.view1}>
            <Text>Test</Text>
          </View>
          <Image
            source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/083/933/835/small/beautiful-and-inspiring-picture-detailing-a-bright-hot-air-balloon-over-river-pure-cozy-perfect-for-creatives-moods-stock-image-free-photo.jpeg' }}
            style={styles.img}
          />
          <Image source={require('./assets/icon.png')} style={styles.img2} />
          <Text>
            {Platform.OS === 'android' ? 'You are using Android' : 'You are using iOS'}
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  buttonsContainer: {
    padding: 10,
  },
  view1: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
  img: {
    width: width,
    height: height * 0.2,
  },
  img2: {
    width: 50,
    height: 50,
  },
});
