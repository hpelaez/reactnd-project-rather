import { GET_QUESTIONS, ADD_QUESTION } from "../actions/questions";
import { SAVE_ANSWER_EVERYWHERE } from "../actions/shared";

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_ANSWER_EVERYWHERE:
      const { authedUser, qid, answer } = action;

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat(authedUser),
          },
        },
      };
    case ADD_QUESTION:
      const { question } = action;

      return {
        ...state,
        [question.id]: question,
      };
    default:
      return state;
  }
}
