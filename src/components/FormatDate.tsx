export const FormatDate = (date: any, type?: "primary" | "secondary") => {
  if (type === "primary") {
    var timestampStr = date;
    var timestamp = new Date(timestampStr);

    var formattedTimestamp =
      ("0" + timestamp.getDate()).slice(-2) +
      "." +
      ("0" + (timestamp.getMonth() + 1)).slice(-2) +
      "." +
      timestamp.getFullYear() +
      " " +
      ("0" + timestamp.getHours()).slice(-2) +
      ":" +
      ("0" + timestamp.getMinutes()).slice(-2);

    return formattedTimestamp;
  } else {
    const dateString = date;

    // Create a Date object from the string
    const dateObject = new Date(dateString);

    // Format the date using toLocaleString with options
    const formattedDate = dateObject.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      // year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    return formattedDate;
  }
};
