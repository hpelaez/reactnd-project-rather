export const GET_USERS = "GET_USERS";
export const SAVE_QUESTION_TO_USER = "SAVE_QUESTION_TO_USER";

export function getUsers(users) {
  return {
    type: GET_USERS,
    users,
  };
}

export function saveQuestionToUser({ id, author }) {
  return {
    type: SAVE_QUESTION_TO_USER,
    id,
    author,
  };
}
