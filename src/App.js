import { useState } from 'react'

import QuizPage from './components/pages/QuizPage'
import LandingPage from './components/pages/LandingPage'

function App() {

  const [startQuiz, setStartQuiz] = useState(false)

  const startQuizHanddler = () => {
    setStartQuiz(prevState => !prevState)
  }

  return (
    <div className="App">
      {!startQuiz && <LandingPage startQuizHanddler={startQuizHanddler}/>}
      {startQuiz && <QuizPage />}
    </div>
  );
}

export default App;
