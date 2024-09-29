export default function Quiz(props) {


    const [quiz, questionIndex, results, answers, displayResults, handleAnswersInputs] = props.data;

    console.log(quiz);

    return (
        <fieldset key={questionIndex}>
        <legend>{quiz.question}</legend>
        {quiz.allAnswers.map((answer, answerIndex) => {
          return (
            <div
              key={answerIndex}
              
              className="answers"
            >
              <input
                disabled={results.ckecked}
                type="radio"
                name={`answer${questionIndex}`}
                id={`option-${questionIndex}-${answerIndex}`}
                value={answer}
                checked={answers[`answer${questionIndex}`] === answer}
                onChange={handleAnswersInputs}
              />
              <label 
              style={displayResults(questionIndex, answer)}
              htmlFor={`option-${questionIndex}-${answerIndex}`}>
                {answer}
              </label>
            </div>
          );
        })}
      </fieldset>
    )
}