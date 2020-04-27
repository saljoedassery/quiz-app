import React from "react";

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
            Total questions attented: <span>20</span>
          </p>
          <p>
            Correct answers: <span>10</span>
          </p>
          <p>
            Incorrect answers: <span>10</span>
          </p>
          <p>
            Total points: <span>20</span>
          </p>
        </div>

        <div className="inspiration-div">
         
          {/* <p>You are doing great!! </p>
          <p>try with other categories or difficulty level.</p>

          <p>Do a bit more work to bridge these knowledge gap and try again</p> */}

          <p>Focus on the question and try get the answeres as quickly as possible.</p>

        </div>

        <div className="new-game-button-div">
          <button className="try-again-button">Try Again</button>
          <button className="home-button">
            <i className="fas fa-home"></i>
          </button>
        </div>
      </div>
    );
  }
}
export default Result;
