import React from "react";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.optionIndex = ["A", "B", "C", "D"];
    this.state = {
      optionsClass: ["", "", "", ""],
      choiceClass: ["", "", "", ""],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.markedOption !== this.props.markedOption) {
      var optionsClass = ["", "", "", ""];
      if (this.props.markedOption !== undefined)
        optionsClass[this.props.markedOption] = "click";
      this.setState({ optionsClass: optionsClass });
    }
    if (
      (prevProps.question !== this.props.question &&
        this.props.quizFinished === true) ||
      prevProps.quizFinished !== this.props.quizFinished
    ) {
      var choiceClass = ["", "", "", ""];
      choiceClass[this.props.markedOption] = "incorrect-choice";
      choiceClass[this.props.correctAnswer] = "correct-choice";
      this.setState({ choiceClass: choiceClass });
    }
  }

  renderHTML = (rawHTML) =>
    React.createElement("span", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });

  markAnswer = (index, optionIndex) => {
    var optionsClass = ["", "", "", ""];
    optionsClass[optionIndex] = "click";
    this.setState({ optionsClass: optionsClass });
    this.props.markAnswer(index, optionIndex);
  };

  render() {
    console.log();
    return (
      <div className="question">
        <p className="question-text">{this.renderHTML(this.props.question)}</p>
        {this.props.options.map((option, index) => (
          <div
            className={`option-div ${this.state.choiceClass[index]}`}
            key={index}
          >
            <label className={`choice ${this.state.optionsClass[index]}`}>
              {this.renderHTML(option)}
              <input
                type="radio"
                name="radio"
                onClick={() =>
                  this.markAnswer(this.props.questionNumber, index)
                }
              />
              <span className="checkmark">{this.optionIndex[index]}</span>
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default Question;
