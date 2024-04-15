import { useState } from 'react'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native'
import { spacing, viewportWidth } from '_utils/viewport'

interface CarouselProps<T> {
  data: T[]
  renderItem: any
  showPagination?: boolean
  className?: string
}

export const Carousel = <T,>({
  data,
  renderItem,
  showPagination = true,
  className,
}: CarouselProps<T>) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const itemSize = Math.floor(viewportWidth * 0.8)
  const fullItemSize = itemSize + spacing // Item size including the space

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.x
    const index = Math.floor(offset / fullItemSize)
    setActiveIndex(index)
  }

  return (
    <>
      <FlatList
        className={className}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={(renderItemProps) => (
          <View
            style={{
              paddingLeft: spacing * 0.5,
              paddingRight: spacing * 0.5,
            }}
          >
            {renderItem(renderItemProps)}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
      />
      {showPagination && (
        <View className="flex-row justify-center mt-4">
          {data.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: activeIndex === index ? '#3a3a3a' : '#ccc',
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
      )}
    </>
  )
}
