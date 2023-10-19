import './PastQuizzes.css';


function App() {
  return (

      <div className='App-container'>
        <div className='past-quiz-container flex_col'>
          <div><h1>Past Quizzes</h1></div>
          <div className={"past-quizzes flex1 flex_col"}>
            <div className={"past-quiz-block"}>
              <div className={"past-date"}>October 10, 2023</div>
              <div className={"quiz_question"}>Pretending to be banks, the IRS or some other organization and sending you an email or a letter asking for personal information is called __________.</div>
              <div className={"past-options flex_row"}>
                <div>A. surfing</div>
                <div>B. fishing</div>
                <div className={"correct"}>C. phishing</div>
                <div>D. sailing</div>
              </div>
            </div>
            <div className={"past-quiz-block"}>
              <div className={"past-date"}>October 9, 2023</div>
              <div className={"quiz_question"}>Cyber criminals only target large companies. Is it correct?</div>
              <div className={"past-options flex_row"}>
                <div className={"correct"}>A. Yes</div>
                <div>A. No</div>
              </div>
            </div>
            <div className={"past-quiz-block"}>
              <div className={"past-date"}>October 6, 2023</div>
              <div className={"quiz_question"}>If you fall for a phishing scam, what should you do to limit the damage?</div>
              <div className={"past-options flex_row"}>
                <div>A. Delete the phishing email.</div>
                <div>B. Unplug the computer. This will get rid of any malware.</div>
                <div className={"correct"}>C. Change any compromised passwords.</div>
              </div>
            </div>
            <div className={"past-quiz-block"}>
              <div className={"past-date"}>October 10, 2023</div>
              <div className={"quiz_question"}>Which of these answers describes the best way to protect against tech support scams?</div>
              <div className={"past-options flex_row"}>
                <div>A. Use a unique password for each account.</div>
                <div>B. Scan your computer for any unknown software.</div>
                <div className={"wrong"}>C. Hang up on callers who say your computer has problems.</div>
                <div className={"correction"}>D. All of the above.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default App  //for main.tsx .
