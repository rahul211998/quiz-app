import './App.css';
import Questions from "./Questions.json";
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [queresPage, setQueresPage] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    let interval;
    if (timer > 0 && !queresPage) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      next();
    }
    return () => clearInterval(interval);
  }, [timer, queresPage]);

  useEffect(() => {
    setTimer(10); // Reset timer on question change
  }, [count]);

  const next = () => {
    if (count < Questions.length - 1) {
      setCount(count + 1);
      // console.log("sp",count)
      setSelectedOption(answers[count + 1] || '');
      // setSelectedOption('');
      // console.log("sp",count)
      // console.log("sp",selectedOption)
    } else {
      setQueresPage(true);
    }
  };

  const previous = () => {
    if (count > 0) {
      console.log("is",count)
      setCount(count - 1);
      setSelectedOption(answers[count - 1] || '');
    }
  };

  const optchange = (value) => {
    setSelectedOption(value);
    // console.log("is ",selectedOption)
    const newAnswers = [...answers];
    newAnswers[count] = value;
    setAnswers(newAnswers);
    // console.log("is",answers)

    if (value === Questions[count].correctAnswer) {
      setTotal(total + 1);
    }
  };

  const reStart = () => {
    setCount(0);
    setTotal(0);
    setQueresPage(false);
    setAnswers([]);
    setSelectedOption('');
    setTimer(10);
  };

  const reset = () => {
    setSelectedOption('');
    const newAnswers = [...answers];
    newAnswers[count] = '';
    setAnswers(newAnswers);
  };

  return (
    <div className="App">
      <div className='App1'>
        <h1 className='h1'>Quiz Test</h1>
        {queresPage ? (
          <div className='divf'>
            <div className='scorTitle'>
              <h3>Total Score</h3>
              <p>{total} / {Questions.length}</p>
            </div>
            <div className='divq'>
              <ul>
                {Questions.map((q, i) => (
                  <li key={i}>
                    {q.question} <br />
                    selected answer: {answers[i] ? <span>{answers[i]}</span> : <span>"no answer"</span>} <br />
                    correct answer: <span>{q.correctAnswer}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button className='restart' onClick={reStart}>Restart</button>
            </div>
          </div>
        ) : (
          <div className='divs'>
            <section className='sec'>
              <div className='sec-div'>
              <h4>Question {count + 1}</h4>
              <p>{Questions[count].question}</p>
              </div>
              {/* <h4>Question {count + 1}</h4> */}
              {/* <p>{Questions[count].question}</p> */}
              <div className='child-div'>
                {Questions[count].options.map((option, i) => (
                  <label className='label' key={i}>
                    <input
                      className='inputs'
                      type="radio"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => optchange(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </section>
            <div className='buttoncls'>
              <button onClick={previous}>Previous</button>
              <button onClick={next}>Next</button>
              <button onClick={reset}>Reset</button>
            </div>
            <div>
              <p>Timer: {timer}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
