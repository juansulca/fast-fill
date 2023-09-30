import { id } from "./id";

const userIdKey = 'userId';

export const getOrCreateUserId = () => {
  let userId = getUserId();

  if (userId) return userId;

  userId = id();
  sessionStorage.setItem(userIdKey, userId);

  return userId;
};

export const getUserId = () => sessionStorage.getItem(userIdKey);
