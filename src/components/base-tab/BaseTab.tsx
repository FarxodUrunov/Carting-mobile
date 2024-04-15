import React, { ReactNode, useState } from 'react'
import { Pressable, Text, View } from 'react-native'

type TabItemType = { id: number; name: string; children: ReactNode }

type BaseTabProps = TabItemType[]

const BaseTab = ({ items }: { items: BaseTabProps }) => {
  const [activeId, setActiveId] = useState(items[0].id)

  const handleHasBorder = (item: TabItemType) => {
    return (
      item.id !== items[items.length - 1].id && activeId !== item.id && activeId !== item.id + 1
    )
  }

  const handleActiveChildren = (id: number) => {
    const children = items.find((item) => item.id === id)?.children || <Text>sa</Text>

    return children
  }

  return (
    <View>
      <View className="flex-row justify-between p-0.5 bg-gray-200 rounded-lg">
        {items.map((item) => (
          <Pressable key={item.id} onPress={() => setActiveId(item.id)} className="relative flex-1">
            <Text
              className={`'text-gray-900 text-xs text-center px-2 py-[3px] rounded-lg ' ${
                activeId === item.id ? 'bg-white shadow' : ''
              }`}
            >
              {item.name}
            </Text>
            {handleHasBorder(item) ? (
              <View className="h-1/2 w-px mt-2 opacity-30 bg-gray-500 absolute right-0 top"></View>
            ) : null}
          </Pressable>
        ))}
      </View>

      <View className="pt-4">{handleActiveChildren(activeId)}</View>
    </View>
  )
}

export default BaseTab
