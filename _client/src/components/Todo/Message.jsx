import React from "react";

const Message = () => {
  const userName = sessionStorage.getItem("loggedInUserName") || "Guest";
  const hours = new Date().getHours();

  if (hours >= 0 && hours < 12) {
    return `Hello Good Morning, ${userName}!`;
  } else if (hours >= 12 && hours < 17) {
    return `Hello Good Afternoon, ${userName}!`;
  } else if (hours >= 17 && hours < 21) {
    return `Hello Good Evening, ${userName}!`;
  } else {
    return `Hello Good Night, ${userName}!`;
  }
};

export default Message;
