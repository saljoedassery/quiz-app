import React from "react";
import { Link } from "react-router-dom";

class Result extends React.Component {
  render() {
    return (
      <div className="result">
        <div className="counts">
          <div className="question-count">
            <p className="count-text">20</p>
            <p className="indication-text">Questions</p>
          </div>

          <div className="point-count">
            <p className="count-text">60</p>
            <p className="indication-text">Points</p>
          </div>

          <div className="time-count">
            <p className="count-text">2</p>
            <p className="indication-text">Minutes</p>
          </div>
        </div>

        <div className="statitics">
          <h2>Quiz Result</h2>
          <p>
            Total questions attented:{" "}
            <span>{this.props.totalQuestionsAttended}</span>
          </p>
          <p>
            Correct answers: <span>{this.props.correctAnswers}</span>
          </p>
          <p>
            Incorrect answers: <span>{this.props.incorrectAnswers}</span>
          </p>
          <p>
            Total points: <span>{this.props.totalPoints}</span>
          </p>
        </div>

        <div className="inspiration-div">
          <p>
            Focus on the question and try get the answeres as quickly as
            possible.
          </p>
        </div>

        <div className="new-game-button-div">
          <Link
            to={{
              pathname: "/play",
              properties: {
                category: this.props.category,
                difficulty: this.props.difficulty,
                tryAgain: !this.props.tryAgain,
              },
            }}
          >
            <button className="try-again-button">Try Again</button>
          </Link>
          <Link to="/">
            <button className="home-button">
              <i className="fas fa-home"></i>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
export default Result;
