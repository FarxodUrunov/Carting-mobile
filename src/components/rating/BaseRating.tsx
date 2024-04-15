import { View, Text } from "react-native";
import React from "react";

export default function BaseRating({ rating }: { rating: number }) {
  const normalizedRating = Math.min(5, Math.max(0, rating));

  // Calculate the number of filled stars
  const filledStars = Math.floor(normalizedRating);

  // Create an array of star elements
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Text
      key={index}
      className="text-2xl"
      style={{ color: index < filledStars ? "#F79009" : "#D0D5DD" }}
    >
      {index < filledStars ? <Text> &#9733;</Text> : <Text>&#9734;</Text>}
    </Text>
  ));

  return <View className="flex-row">{stars}</View>;
}
