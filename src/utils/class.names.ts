/**
 * Returns a string of class names based on the provided object of class names and their corresponding boolean values.
 * @param classes - An object containing class names as keys and boolean values indicating whether the class should be included.
 * @returns A string of class names separated by a space.
 */
export function classNames(classes: Record<string, boolean>) {
  const toBeClasses = Object.keys(classes).map((key) =>
    classes[key] ? key : ""
  );
  return toBeClasses.join(" ");
}
