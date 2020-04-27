import React from "react";
import QuizPlay from "./QuizPlay";
import Result from "./Result";

class PlayArea extends React.Component {
  render() {
    return (
      <div className="play-area">
        <QuizPlay category={this.props.category} difficulty={this.props.difficulty}/>
        <Result />
      </div>
    );
  }
}
export default PlayArea;
