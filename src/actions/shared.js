import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utils/_DATA";
import { getUsers, saveQuestionToUser } from "./users";
import { getQuestions, addQuestion } from "./questions";

export const SAVE_ANSWER_EVERYWHERE = "SAVE_ANSWER_EVERYWHERE";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
    });
  };
}

export function saveAnswerEverywhere(authedUser, qid, answer) {
  return {
    type: SAVE_ANSWER_EVERYWHERE,
    authedUser,
    qid,
    answer,
  };
}

export function saveAnswer(authedUser, qid, answer) {
  return _saveQuestionAnswer({ authedUser, qid, answer });
}

export function handleAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    return saveAnswer(authedUser, qid, answer).then((question) => {
      dispatch(saveAnswerEverywhere(authedUser, qid, answer));
    });
  };
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function handleQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        dispatch(addQuestion(question));
        dispatch(saveQuestionToUser(question));
      }
    );
  };
}
