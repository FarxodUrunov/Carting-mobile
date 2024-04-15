export const FormatPhone = (phoneNumber: string | null) => {
  if (phoneNumber) {
    // Format the phone number
    const formattedPhoneNumber =
      "+" +
      phoneNumber?.slice(0, 3) + // Country code
      " " +
      phoneNumber?.slice(3, 5) + // Area code
      " " +
      phoneNumber?.slice(5, 8) + // First part of the number
      " " +
      phoneNumber?.slice(8, 10) + // Second part of the number
      " " +
      phoneNumber?.slice(10, 12); // Third part of the number
    return formattedPhoneNumber;
  }
  return "+9989XXXXXXXX";
};
