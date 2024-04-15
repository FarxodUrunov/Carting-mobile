import React, { useRef, useEffect } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";

const GrabberJumpAnimation = () => {
  const translateY = useRef(new Animated.Value(0)).current;
  const startJumpAnimation = () => {
    const firstJump = Animated.timing(translateY, {
      toValue: -10,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    });

    const secondJump = Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    });

    // Create an infinite loop
    const infiniteLoop = Animated.loop(
      Animated.sequence([firstJump, secondJump])
    );

    infiniteLoop.start();
  };

  useEffect(() => {
    startJumpAnimation();

    // Cleanup animation on component unmount
    return () => {
      translateY.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {/* Your grabber component (e.g., a ball) goes here */}
        <View className="dark:rgba(252,252,253,0.7) rgba(0,0,0,0.3)" />
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -32,
    marginBottom: 32,
  },
  grabber: {
    width: 40,
    height: 5,
    borderRadius: 25,
  },
});

export default GrabberJumpAnimation;
