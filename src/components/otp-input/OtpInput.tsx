import { ChangeEvent, FocusEvent, KeyboardEvent, useMemo, useState } from 'react'
import { TextInput, View } from 'react-native'
const RE_DIGIT = new RegExp(/^\d+$/)

type Props = {
  value: string
  onChange: (value: string) => void
  dataTest?: string
  size?: 'sm' | 'md'
}

const valueLength = 4

export function OtpInput({ value, onChange, dataTest = 'base-otp-test', size = 'md' }: Props) {
  const [isFilled, setIsFilled] = useState(false)
  const valueItems = useMemo(() => {
    const valueArray = value.split('')

    const items: Array<string> = []

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i]

      if (RE_DIGIT.test(char)) {
        items.push(char)
      } else {
        items.push('')
      }
    }

    return items
  }, [value])

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null

    if (nextElementSibling) {
      nextElementSibling.focus()
    }
  }
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null

    if (previousElementSibling) {
      previousElementSibling.focus()
    }
  }
  const inputOnChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = e.target
    let targetValue = target.value.trim()
    const isTargetValueDigit = RE_DIGIT.test(targetValue)

    if (!isTargetValueDigit && targetValue !== '') {
      return
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null

    // only delete digit if next input element has no value
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return
    }

    targetValue = isTargetValueDigit ? targetValue : ' '

    const targetValueLength = targetValue.length

    if (targetValueLength === 1) {
      const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1)

      onChange(newValue)

      if (!isTargetValueDigit) {
        return
      }

      if (newValue.length === 4) {
        setIsFilled(true)
      }

      focusToNextInput(target)
    } else if (targetValueLength === valueLength) {
      onChange(targetValue)
      target.blur()
    }
  }

  const inputOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e
    const target = e.target as HTMLInputElement

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault()
      return focusToNextInput(target)
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault()
      return focusToPrevInput(target)
    }

    const targetValue = target.value

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length)

    if (e.key !== 'Backspace' || targetValue !== '') {
      return
    }

    focusToPrevInput(target)
  }

  const inputOnFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { target } = e

    // keep focusing back until previous input
    // element has value
    const prevInputEl = target.previousElementSibling as HTMLInputElement | null

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus()
    }

    target.setSelectionRange(0, target.value.length)
  }

  return (
    <View className="mx-auto flex h-max w-max flex-row gap-x-5">
      {valueItems.map((digit, idx) => (
        <TextInput
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className={`${digit === '' && isFilled && '!border-red-500'} ${
            size === 'sm' ? 'h-[72px] w-[72px]' : 'h-28 w-28'
          }  rounded-lg border  border-neutral-300 bg-white text-center text-2xl outline-none ring-0 focus:ring-0`}
          value={digit}
          onChange={(e: any) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
          data-testid={dataTest}
        />
      ))}
    </View>
  )
}
