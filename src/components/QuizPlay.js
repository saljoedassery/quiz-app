import React from "react";
import Question from "./Question";
import rightArrow from "../images/next.svg";
import leftArrow from "../images/back.svg";
import Loader from "react-loader";

class QuizPlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeQuestion: 0,
      questions: [],
      markedOptionsIndex: new Array(20),
      questionStats: new Array(20),
      minsLeft: "2",
      secondsLeft: "00",
      quizFinished: false,
      actionsButtonStat: false,
      loading: false,
    };
    this.correctOptions = [];
    this.optionsList = [];
    this.timer = null;
  }

  fetchData = () => {
    let url = `https://opentdb.com/api.php?amount=20&type=multiple&category=${this.props.category}&difficulty=${this.props.difficulty}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //set the first question status to active
        var questionStats = this.state.questionStats;
        questionStats[0] = "active-question";

        //store the correct answers
        data.results.forEach((question) => {
          var options = this.getOptions(question);
          this.optionsList.push(options);
          this.correctOptions.push(options.indexOf(question.correct_answer));
        });
        this.setState({
          questions: data.results,
          questionStats: questionStats,
          loading: true,
        });
        this.timer = setInterval(this.tick, 1000);
      })
      .catch((error) =>
        console.log("Error occurred while fetching questions", error)
      );
  };

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tryAgain !== this.props.tryAgain){
      this.setState({
        activeQuestion: 0,
        questions: [],
        markedOptionsIndex: new Array(20),
        questionStats: new Array(20),
        minsLeft: "2",
        secondsLeft: "00",
        quizFinished: false,
        actionsButtonStat: false,
        loading: false,
      });
      this.correctOptions = [];
      this.optionsList = [];
      clearInterval(this.timer)
      this.fetchData();
    } 
  }

  shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  getOptions = (question) => {
    var options = question.incorrect_answers;
    options = options.concat([question.correct_answer]);
    options = this.shuffle(options);
    return options;
  };

  changeQuestionStat = (nextQuestionIndex) => {
    var questionStats = this.state.questionStats;
    if (questionStats[this.state.activeQuestion] === "active-question")
      questionStats[this.state.activeQuestion] = undefined;
    if (questionStats[nextQuestionIndex] === undefined)
      questionStats[nextQuestionIndex] = "active-question";

    this.setState({
      activeQuestion: nextQuestionIndex,
      questionStats: questionStats,
    });
  };

  nextQuestion = () => {
    if (this.state.questions.length - 1 !== this.state.activeQuestion) {
      this.changeQuestionStat(this.state.activeQuestion + 1);
    }
  };

  prevQuestion = () => {
    if (this.state.activeQuestion !== 0) {
      this.changeQuestionStat(this.state.activeQuestion - 1);
    }
  };

  gotToQuestion = (index) => {
    this.changeQuestionStat(index);
  };

  markAnswer = (index, optionIndex) => {
    var markedOptionsIndex = this.state.markedOptionsIndex;
    markedOptionsIndex[index] = optionIndex;

    var questionStats = this.state.questionStats;
    questionStats[index] = "marked-question";
    this.setState({
      markedOptionsIndex: markedOptionsIndex,
      questionStats: questionStats,
    });
  };

  reviewQuestion = () => {
    var questionStats = this.state.questionStats;
    questionStats[this.state.activeQuestion] = "review-question";
    this.setState({
      questionStats: questionStats,
    });
  };

  tick = () => {
    var secondsLeft = parseInt(this.state.secondsLeft);
    var minsLeft = parseInt(this.state.minsLeft);
    if (secondsLeft === 0) {
      if (minsLeft === 0) this.finishQuiz();
      else {
        minsLeft = minsLeft - 1;
        secondsLeft = 59;
      }
    } else {
      secondsLeft = (secondsLeft - 1).toString();
      if (secondsLeft.length === 1) secondsLeft = "0" + secondsLeft;
    }
    this.setState({ minsLeft: minsLeft, secondsLeft: secondsLeft });
  };

  finishQuiz = () => {
    clearInterval(this.timer);
    var questionStats = this.state.questionStats;
    var totalQuestionsAttended = 0;
    var totalCorrectAnswers = 0;

    //mark attended question correct or incorrect
    for (var i = 0; i < 20; i++) {
      if (this.correctOptions[i] === this.state.markedOptionsIndex[i]) {
        questionStats[i] = "correct-question";
        totalCorrectAnswers += 1;
      } else if (
        this.correctOptions[i] !== this.state.markedOptionsIndex[i] &&
        this.state.markedOptionsIndex[i] !== undefined
      ) {
        questionStats[i] = "incorrect-question";
        totalQuestionsAttended += 1;
      }
    }
    this.setState({
      questionStats: questionStats,
      quizFinished: true,
      actionsButtonStat: true,
    });

    this.props.findResult(
      totalQuestionsAttended + totalCorrectAnswers,
      totalCorrectAnswers
    );
  };

  render() {
    const buttons = [];
    for (let i = 1; i <= 20; i++) {
      buttons.push(
        <button
          key={i}
          value={i}
          onClick={(event) => this.gotToQuestion(event.target.value - 1)}
          className={`${this.state.questionStats[i - 1]}`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="quiz-play">
        <div className="question-navigation-area">{buttons}</div>

        <div className="question-marking-indication">
          <div className="answered-div">
            <div className="rectangle"></div>
            <p>Answered</p>
          </div>

          <div className="review-div">
            <div className="rectangle"></div>
            <p>Review</p>
          </div>

          <div className="correct-div">
            <div className="rectangle"></div>
            <p>Correct</p>
          </div>

          <div className="incorrect-div">
            <div className="rectangle"></div>
            <p>Incorrect</p>
          </div>

          <div className="active-div">
            <div className="rectangle"></div>
            <p>Active</p>
          </div>

          <div className="unattended-div">
            <div className="rectangle"></div>
            <p>Not answered</p>
          </div>
        </div>

        <div className="action-button-div">
          <button
            className="review-button"
            onClick={this.reviewQuestion}
            disabled={this.state.actionsButtonStat}
          >
            Mark question for Review
          </button>
          <button
            className="finish-button"
            onClick={this.finishQuiz}
            disabled={this.state.actionsButtonStat}
          >
            Finish Quiz
          </button>
        </div>

        <div className="question-detail-div">
          <p className="question-number">
            Question {this.state.activeQuestion + 1} of 20
          </p>
          <p className="total-time">
            0{this.state.minsLeft}:{this.state.secondsLeft}s
          </p>
        </div>

        <hr />

        <Loader loaded={this.state.loading}>
          {this.state.questions.length > 0 && (
            <Question
              question={
                this.state.questions[this.state.activeQuestion].question
              }
              options={this.optionsList[this.state.activeQuestion]}
              questionNumber={this.state.activeQuestion}
              markAnswer={(index, optionIndex) =>
                this.markAnswer(index, optionIndex)
              }
              markedOption={
                this.state.markedOptionsIndex[this.state.activeQuestion]
              }
              correctAnswer={this.correctOptions[this.state.activeQuestion]}
              quizFinished={this.state.quizFinished}
            />
          )}
        </Loader>

        <div className="question-navigation-div">
          <div className="prev-button-div">
            <button className="prev-button" onClick={this.prevQuestion}>
              <img src={leftArrow} alt="previous icon" />
              Previous
            </button>
          </div>

          <div className="next-button-div">
            <button className="next-button" onClick={this.nextQuestion}>
              Next
              <img src={rightArrow} alt="next icon" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default QuizPlay;
