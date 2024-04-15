// RadioButton.tsx

import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

interface RadioButtonProps {
  label: string
  selected: boolean
  onSelect: () => void
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, selected, onSelect }) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      className={`p-2 items-center justify-center rounded ${
        selected ? 'bg-lime-600' : 'bg-gray-100'
      }`}
    >
      <Text className={`text-base ${selected ? 'text-white' : 'text-gray-900'}`}>{label}</Text>
    </TouchableOpacity>
  )
}

export default RadioButton
