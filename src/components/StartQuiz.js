import React from "react";
import QuizProperty from "./QuizProperty";
import Instructions from "./Instructions";

class StartQuiz extends React.Component {
  render() {
    return (
      <div className="start-quiz">
        <QuizProperty />
        <Instructions />
      </div>
    );
  }
}
export default StartQuiz;
