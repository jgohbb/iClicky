import React, { Component } from "react";
import NavBar from "./components/Navbar";
import MemoryCard from "./components/Cards";
import starWarsList from "./starWarsList.json";

const footerStyle = {
  "background-color": "rgba(204, 28, 28, 0.698)",
  color: "whitesmoke ",
  height: "60px",
  bottom: "0"
};

class App extends Component {
  state = {
    // Setting this.state.starWarsList
    starWarsList,
    clickedIds: [],
    score: 0,
    topScore: 0,
    message: "Click an image to begin!",
    animate: "animated swing"
  };

  handleClickPicture = id => {
    let shuffledArray = this.handleShuffleArray(starWarsList);
    this.setState({ starWarsList: shuffledArray });

    //Check if the image is clicked twice
    if (this.state.clickedIds.includes(id)) {
      console.log("Game Over reset values ");
      this.setState({
        clickedIds: [],
        score: 0,
        message: "You guessed wrong...use the FORCE and try again. "
      });
      return;
    } else {
      this.setState({
        clickedIds: this.state.clickedIds.concat([id]),
        score: this.state.score + 1,
        message: "You guessed right...the FORCE is strong with this one."
      });
      console.log("Score", this.state.score);
      console.log("TopScore", this.state.topScore);

      if (this.state.score + 1 === 15) {
        this.handleShuffleArray(starWarsList);
        this.setState({ starWarsList: shuffledArray });

        //Reset Game
        this.setState({
          topScore: this.state.score + 1,
          message: "Well done my Padawan! Click on any image to restart game.",
          score: 0,
          clickedIds: []
        });
      }
      // set topscore
      else if (this.state.score + 1 > this.state.topScore) {
        this.setState({ topScore: this.state.score + 1 });
      }
    }
  };
  //shuffle pictures when clicked
  handleShuffleArray = starWarsList => {
    for (let i = starWarsList.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [starWarsList[i], starWarsList[j]] = [starWarsList[j], starWarsList[i]]; // swap elements
    }
    return starWarsList;
  };

  render() {
    return (
      <div>
        <NavBar
          score={this.state.score}
          topScore={this.state.topScore}
          message={this.state.message}
        />

        <div
          id="game-background"
          className="container-fluid p-2 col-9 justify-content-center"
        >
          <h3 className="text-center text-danger">
            Do not click the same image twice!
          </h3>

          {this.state.starWarsList.map(character => (
            <MemoryCard
              id={character.id}
              key={character.id}
              name={character.name}
              image={character.image}
              clickPicture={this.handleClickPicture}
              animate={!this.state.score && this.state.topScore}
            />
          ))}
        </div>
        <footer style={footerStyle}>
          <center className="p-3">
            <a
              href="https://github.com/jgohbb/iClicky"
              className="text-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repo{" "}
            </a>
          </center>
        </footer>
      </div>
    );
  }
}

export default App;
