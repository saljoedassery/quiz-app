import React from "react";
import QuizPlay from "./QuizPlay";
import Result from "./Result";
import { Redirect } from "react-router-dom";

class PlayArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalQuestionsAttended: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      totalPoints: 0,
    };
    this.category = "";
    this.difficulty = "";
  }

  findResult = (totalQuestions, correct) => {
    var totalPoints = correct * 3 - (totalQuestions - correct);
    this.setState({
      totalQuestionsAttended: totalQuestions,
      correctAnswers: correct,
      incorrectAnswers: totalQuestions - correct,
      totalPoints: totalPoints,
    });
  };

  render() {
    let component;
    if (this.props.location.properties === undefined)
      component = <Redirect to="/" />;
    else
      component = (
        <div className="play-area">
          <QuizPlay
            category={this.props.location.properties.category}
            difficulty={this.props.location.properties.difficulty}
            tryAgain={this.props.location.properties.tryAgain}
            findResult={(totalQuestions, correct) =>
              this.findResult(totalQuestions, correct)
            }
          />
          <Result
            totalQuestionsAttended={this.state.totalQuestionsAttended}
            correctAnswers={this.state.correctAnswers}
            incorrectAnswers={this.state.incorrectAnswers}
            totalPoints={this.state.totalPoints}
            category={this.props.location.properties.category}
            difficulty={this.props.location.properties.difficulty}
            tryAgain={this.props.location.properties.tryAgain}
          />
        </div>
      );
    return <>{component}</>;
  }
}
export default PlayArea;
