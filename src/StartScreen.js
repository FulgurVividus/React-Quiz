function StartScreen({ numQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to React Quiz !</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui">Let's Start</button>
    </div>
  );
}

export default StartScreen;
