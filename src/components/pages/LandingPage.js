export default function LandingPage(props) {

    return(
        <div className="landing--container">
            <h1>Quizzical</h1>
            <h3>We've got all the quizzes you love to binge !</h3>
            <button className="btn--start-quiz " onClick={props.startQuizHanddler}>Start a Quiz</button>
        </div>
    )
}