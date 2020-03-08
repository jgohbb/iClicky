import React, { Component } from "react";
import NavBar from "./components/Navbar";
import MemoryCard from "./components/Cards";
import starWarsList from "./starWarsList.json";

const footStyle = {
  "background-color": "rgba(204, 28, 28, 0.698)",
  color: "whitesmoke ",
  height: "60px",
  bottom: "0"
};

class App extends Component {
  state = {
    // Setting this.state.starWarsList to the avengers json array
    starWarsList,
    clickedAvengerIds: [],
    score: 0,
    topScore: 0,
    message: "Click an image to begin!",
    animate: "animated swing"
  };

  //Main logic for the GAME score & reshuffling pictures
  handleClickPicture = id => {
    // Arrange the pictures in a random manner
    let shuffledArray = this.handleShuffleArray(starWarsList);
    this.setState({ starWarsList: shuffledArray });

    //Check if the image is clicked twice
    if (this.state.clickedAvengerIds.includes(id)) {
      // this.state.message = 'You guessed incorrectly! ';
      console.log("Game Over reset values ");
      this.setState({
        clickedAvengerIds: [],
        score: 0,
        message: "You guessed incorrectly! "
      });
      return;
    } else {
      //Update the state with updated values
      this.setState({
        //Add clicked picture to the array
        clickedAvengerIds: this.state.clickedAvengerIds.concat([id]),
        //Increment Score
        score: this.state.score + 1,
        // topScore: this.state.score + 1,
        //Display Message
        message: "You guessed it correctly"
      });
      console.log("Score", this.state.score);
      console.log("TopScore", this.state.topScore);

      //scorer is 12 you win th game
      if (this.state.score + 1 === 15) {
        // Shuffle Array.
        this.handleShuffleArray(starWarsList);
        this.setState({ starWarsList: shuffledArray });

        //Reset th Game & values
        this.setState({
          topScore: this.state.score + 1,
          message: "Well done my Padawan! Click on any imae to restart game.",
          //Reset the Game
          score: 0,
          clickedAvengerIds: []
          // message: "Click an image to begin!"
        });
      }
      // set topscore = score if score>topscore.
      else if (this.state.score + 1 > this.state.topScore) {
        this.setState({ topScore: this.state.score + 1 });
      }
    }
  };
  //Function to shuffle opictures when clicked
  handleShuffleArray = starWarsList => {
    for (let i = starWarsList.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [starWarsList[i], starWarsList[j]] = [starWarsList[j], starWarsList[i]]; // swap elements
    }
    return starWarsList;
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
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
            Try not to click the same image twice!
          </h3>
          {/* Loop through all the items in the static list  */}
          {this.state.starWarsList.map(avenger => (
            <MemoryCard
              id={avenger.id}
              key={avenger.id}
              name={avenger.name}
              image={avenger.image}
              // onclick call the handle event to calculate score & shuffle array
              clickPicture={this.handleClickPicture}
              animate={!this.state.score && this.state.topScore}
            />
          ))}
        </div>
        <footer style={footStyle}>
          <center className="p-3">
            <a
              href="https://github.com/NVK2016/React-Clicky-Game"
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
