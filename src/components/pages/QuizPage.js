import { useState, useEffect } from "react";
import Quiz from "../reuseables/Quiz"

export default function QuizPage() {

  const [quizes, setQuizes] = useState([]);

  const [answers, setAnswers] = useState({
    answer0: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  });

  const [results, setResults] = useState({
    ckecked: false,
    score: 0,
  });

  const [retry, setRetry] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getQuiz = async () => {

      setLoading(true)

      try {
        const req = await fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple");
        const quizData = await req.json();
        const formattedQuizes = shuffleArray(quizData);
        setQuizes(formattedQuizes);

      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
      setLoading(false)
    }
    getQuiz()
  }, [retry]);


  //Shufle the array for change the order of the correct answer
  const shuffleArray = (quizData) => {
    return quizData.results.map((quiz) => {
      const allAnswers = quiz.incorrect_answers.slice();
      allAnswers.push(quiz.correct_answer);

      for (let i = allAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
      }
      return {
        question: quiz.question,
        answer: quiz.correct_answer,
        allAnswers: allAnswers,
      };
    });
  }

  //handle user inputs
  const handleAnswersInputs = (e) => {
    const { name, value } = e.target;

    setAnswers((prevAnswers) => {
      return {
        ...prevAnswers,
        [name]: value,
      };
    });
  };

  //handle check answer event
  const checkAnswers = (e) => {
    e.preventDefault();

    let score = 0;

    for (let i = 0; i < quizes.length; i++) {
      const correctAnswer = quizes[i].answer;
      const givenAnswer = answers[`answer${i}`];

      if (correctAnswer === givenAnswer) {
        score++;
      }
    }

    setResults(() => {
      return {
        ckecked: true,
        score: score,
      }
    })
  }

  //handle play again event
  const playAgain = () => {
    setResults(() => {
      return {
        ckecked: false,
        score: 0,
      }
    })
    setRetry((prevState) => !prevState)
  }

  //handle styles
  const displayResults = (questionIndex, answer) => {
    if (results.ckecked) {
      if (quizes[questionIndex].answer === answer) {
        return { backgroundColor: "rgb(140, 206, 156)" }
      } else if (answers[`answer${questionIndex}`] === answer) {
        return { backgroundColor: "rgba(255, 73, 73, 0.5)", color: "rgb(41, 41, 41)"}
      }
    } else {
      if (answers[`answer${questionIndex}`] === answer) {
        return { backgroundColor: "rgb(113, 93, 244)", color: "white" }
      }
    }
    return {};
  };

  //genarate quiz components
  const showQuiz = () => {
    return quizes.map((quiz, questionIndex) => (
        <Quiz 
          key={questionIndex} 
          data={[quiz, questionIndex, results, answers, displayResults, handleAnswersInputs]}
        />
    ));
  };

  return (
    <div className="quiz--container">
    {loading ? (
        <div>Loading...</div>
      ):(
        <div>
          <form>
            {showQuiz()}
            {!results.ckecked && (
              <button className="btn" onClick={checkAnswers}>Check Answers</button>
              )}
          </form>
          <div className="results">
            {results.ckecked && <h2>Your Score is {results.score}/5</h2>}
            {results.ckecked && <button className="btn retry" onClick={playAgain}>New Quiz</button>}
          </div>
        </div>
      )
    }
  </div>
)}
