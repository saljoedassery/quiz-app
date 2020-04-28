import React from "react";
import Header from "./Header";
import PlayArea from "./PlayArea";
import StartQuiz from "./StartQuiz";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startQuiz: false,
    };
    this.category = "";
    this.difficulty = "";
  }

  startQuiz = (category, difficulty) => {
    this.category = category;
    this.difficulty = difficulty;
    this.setState({ startQuiz: true });
  };

  render() {
    return (
      <>
        <Header />
        <div className="main">
          <Router>
            <Switch>
              <Route exact path="/" component={StartQuiz} />
              <Route exact path="/quiz-app" component={StartQuiz} />
              <Route path="/quiz-app/play" component={PlayArea} />
            </Switch>
          </Router>
        </div>
      </>
    );
  }
}
export default MainComponent;
