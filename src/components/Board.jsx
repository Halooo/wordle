import words from "../data/words.json";
import dictionary from "../data/dictionary.json";
import { useState } from "react";
import "./board.css";
import Keyboard from "./Keyboard";

const rand = Math.floor(Math.random() * words.length);
const target = words[rand].toLowerCase();
const tarArr = Array.from(target);
const GUESS_LIMIT = target.length + 1;

export default function Board(props) {
  const [inputVal, setInputVal] = useState("");
  const emptyState = Array.apply(null, Array(GUESS_LIMIT)).map(() => {
    return " ".repeat(target.length);
  });
  const [guess, setGuess] = useState(emptyState);
  const [n, setN] = useState(0);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState("");
  let keyboardData = {};

  const handleAlert = (txt) => {
    setAlertText(txt);
    setIsAlertVisible(true);
    const id = setTimeout(() => {
      setIsAlertVisible(false);
      clearTimeout(id);
    }, 3000);
  };

  const gameBoard = guess.map((g, gidx) => {
    const guessArray = Array.from(g);
    const answerCpy = [...tarArr];
    const markGreenArr = guessArray.map((i, idx) => {
      if (answerCpy[idx] === i) {
        answerCpy[idx] = " ";
        keyboardData[i] = "green";
        return [i, "green"];
      } else if (i === " ") {
        return [i, "untouched"];
      } else {
        if (!keyboardData.hasOwnProperty(i)) {
          keyboardData[i] = "grey";
        }
        return [i, "grey"];
      }
    });

    const markYellowArr = markGreenArr.map((i, idx) => {
      const found = answerCpy.findIndex((a) => {
        return a === i[0];
      });
      if (i[1] !== "green" && found !== -1) {
        answerCpy[found] = " ";
        if (keyboardData[i[0]] !== "green") {
          keyboardData[i[0]] = "yellow";
        }
        return [i[0], "yellow"];
      }
      return i;
    });

    return (
      <div key={`${g}_${gidx}`} className="row">
        {markYellowArr.map((data, idx) => {
          return (
            <div key={`${data[0]}_${idx}`} className={`box ${data[1]}`}>
              {data[0]}
            </div>
          );
        })}
      </div>
    );
  });

  const handleSubmit = () => {
    const inputNormalized = inputVal.toLowerCase();
    if (inputNormalized.length !== target.length) {
      handleAlert(
        `Input ${inputNormalized.length} not matching word length ${target.length}`
      );
    } else if (dictionary[inputNormalized] !== 1) {
      handleAlert("Not in the word list");
    } else {
      if (inputNormalized === target) {
        handleAlert("Congrats, you got the word!");
        setDisabledSubmit(true);
      }
      if (n + 1 === GUESS_LIMIT) {
        guess[n] = Array.from(inputNormalized);
        setGuess(guess);
        setDisabledSubmit(true);
      } else {
        guess[n] = Array.from(inputNormalized);
        setGuess(guess);
      }
      setN(n + 1);
    }
    setInputVal("");
  };

  return (
    <>
      <div className="board">
        {isAlertVisible && (
          <div className="alert-container">
            <div className="alert-inner">{alertText}</div>
          </div>
        )}
        <div className="fixed">{n === GUESS_LIMIT && target}</div>
        {gameBoard}
      </div>
      <div>
        <input
          disabled={disabledSubmit}
          value={inputVal}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
        />
        <button disabled={disabledSubmit} onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <Keyboard data={keyboardData}></Keyboard>
    </>
  );
}
