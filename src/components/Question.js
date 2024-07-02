import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  // console.log(question);
  const { questions, currentIndex } = useQuiz();
  const question = questions.at(currentIndex);

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
