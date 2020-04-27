import React from "react";

class Instructions extends React.Component {
  render() {
    return (
      <div className="instructions">
        <h2>Read the instructions carefully before starting the quiz</h2>
        <ul>
          <li>
            There are 20 questions in each quiz and 2 minute time to answer it
          </li>
          <li>
            You can finish the quiz before the time is up by clicking the finish
            quiz button at the top
          </li>
          <li>
            Each right answer carries 3 point and each incorrect answer carries
            -1 point
          </li>
          <li>Unattended questions carry zero point</li>
          <li>Quiz finishes automatically when the time is up</li>
          <li>
            Once you mark any question it cannot be unmarked, you can mark any
            other answer but cannot leave that question unattented
          </li>
          <li>
            Even if you finish the test before the time is up, point calculation will
            be based only on the correct and incorrect answers only. Time is not
            a factor in the calculation of points
          </li>
        </ul>
      </div>
    );
  }
}
export default Instructions;
