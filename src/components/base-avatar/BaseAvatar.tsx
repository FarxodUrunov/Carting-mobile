import React, { ReactNode } from 'react'
import { Image, View } from 'react-native'

type Size = 'sm' | 'md' | 'lg' | 'xl'
type Variant = 'circle' | 'square'

interface BaseAvatarProps {
  alt?: string
  children?: ReactNode
  size?: Size
  source: any
  variant?: Variant
}

const sizeOfAvatar = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
}

const BaseAvatar = ({
  alt = 'avatar',
  children,
  source,
  size = 'md',
  variant = 'circle',
}: BaseAvatarProps) => {
  return (
    <View className="gap-2 items-center flex-row">
      <Image
        source={source}
        alt={alt}
        className={`${sizeOfAvatar[size]} ${variant === 'circle' ? 'rounded-full' : 'rounded'}`}
      />
      {children}
    </View>
  )
}

export default BaseAvatar
