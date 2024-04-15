import * as SecureStore from "expo-secure-store";
import { useReducer, useEffect, useCallback } from "react";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

/**
 * Custom hook that provides an asynchronous state.
 * @template T The type of the state value.
 * @param initialValue The initial value of the state.
 * @returns A tuple containing the state value and a function to update the state.
 */
function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

/**
 * Sets a value in the storage asynchronously.
 * If the value is null, the corresponding key will be deleted from the storage.
 * @param key - The key to set in the storage.
 * @param value - The value to set in the storage. If null, the key will be deleted.
 */
export async function setStorageItemAsync(key: string, value: string | null) {
  if (value == null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

/**
 * Custom hook that provides a state and a setter function for storing and retrieving data from storage.
 * @param key - The key used to store and retrieve the data.
 * @returns A tuple containing the state and the setter function.
 */
export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => {
      setState(value);
    });
  }, [key]);

  // Set
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}

/**
 * Removes one or more items from the storage asynchronously.
 * @param key - The key or an array of keys of the items to be removed.
 */
export async function removeStorageItemAsync(key: string | string[]) {
  if (Array.isArray(key)) {
    await Promise.all(key.map((k) => SecureStore.deleteItemAsync(k)));
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}
