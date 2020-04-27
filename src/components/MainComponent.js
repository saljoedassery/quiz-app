// Shows sidebar and PlayArea side by side
import React from "react";
import Header from "./Header";
import PlayArea from "./PlayArea";
import StartQuiz from "./StartQuiz";

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
    let component;

    if (this.state.startQuiz) {
      component = (
        <PlayArea category={this.category} difficulty={this.difficulty} />
      );
    } else
      component = (
        <StartQuiz
          startQuiz={(category, difficulty) =>
            this.startQuiz(category, difficulty)
          }
        />
      );

    return (
      <>
        <Header />
        <div className="main">{component}</div>
      </>
    );
  }
}
export default MainComponent;
