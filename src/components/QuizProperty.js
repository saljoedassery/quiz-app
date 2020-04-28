import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import alertIcon from "../images/alert.svg";
import { Link } from "react-router-dom";

class QuizProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "General Knowledge",
      difficulty: "easy",
    };

    this.categoryMap = {
      "General Knowledge": "9",
      Books: "10",
      Film: "11",
      Music: "12",
      "Musicals and Theatres": "13",
      Television: "14",
      "Video Games": "15",
      "Board Games": "16",
      "Science and Nature": "17",
      Computers: "18",
      Mathematics: "19",
      Mythology: "20",
      Sports: "21",
      Geography: "22",
      History: "23",
      Politics: "24",
      Art: "25",
      Celebrities: "26",
      Animals: "27",
      Vehicles: "28",
      Comics: "29",
      Gadgets: "30",
      "Japanese Anime and Manga": "31",
      "Cartoon and Animations": "32",
    };
  }

  categoryHandle = (event) => {
    this.setState({ category: event });
  };

  difficultyHandle = (event) => {
    this.setState({ difficulty: event });
  };

  render() {
    return (
      <div className="quiz-property">
        <div className="category-div">
          <label htmlFor="dropdown-variants-Primary">Select category</label>
          <DropdownButton
            key="Primary"
            id="dropdown-variants-Primary"
            variant="primary"
            title={this.state.category}
          >
            {Object.keys(this.categoryMap).map((category, key) => (
              <Dropdown.Item
                eventKey={category}
                onSelect={this.categoryHandle}
                key={key}
              >
                {category}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>

        <div className="difficulty-div">
          <label htmlFor="dropdown-variants-Primary">
            Select difficulty level
          </label>
          <DropdownButton
            key="Primary"
            id="dropdown-variants-Primary"
            variant="primary"
            title={this.state.difficulty}
          >
            <Dropdown.Item eventKey="easy" onSelect={this.difficultyHandle}>
              Easy
            </Dropdown.Item>
            <Dropdown.Item eventKey="medium" onSelect={this.difficultyHandle}>
              Medium
            </Dropdown.Item>
            <Dropdown.Item eventKey="hard" onSelect={this.difficultyHandle}>
              Hard
            </Dropdown.Item>
          </DropdownButton>
        </div>

        <div className="button-div">
          <Link
            to={{
              pathname: "/quiz-app/play",
              properties: {
                category: this.categoryMap[this.state.category],
                difficulty: this.state.difficulty,
                tryAgain: false,
              },
            }}
            className="start-quiz-button-link"
          >
            <Button variant="outline-primary">Start Quiz</Button>
          </Link>

          <p className="start-instructions">
            <img
              src={alertIcon}
              alt="notification icon"
              className="alert-icon"
            />
            Quiz starts immediately after you press the start button. Read the
            instructions carefully before clicking the start button.
          </p>
        </div>
      </div>
    );
  }
}

export default QuizProperty;
