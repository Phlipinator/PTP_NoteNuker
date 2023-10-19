import { useState, useEffect } from 'react';
import './Quiz.css';
import { getScores, TScore } from './api/getScores';
import { createImageText } from './api/createImageText';



function App() {
  const [scores] = useState<TScore[]> ([]);
  const [Name] = useState('');
  const [Point] = useState('');
  const [sortType, setSortType] = useState<"N-asc" | "N-desc" | undefined>("N-asc");


  // async function handleGetDevice(e: React.FormEvent) {
  //   e.preventDefault();
  //   fetchDevices();
  // }
  //
  // async function fetchDevices() {
  //   const newDevices = await getScores(sortType);
  // }
  //
  //
  // useEffect(() => {
  //   fetchDevices();
  // },  []);


  return (

      <div className='quiz-container flex_row'>
        <div className='quiz'>
          <div><h1 className={"text_stroke"}>Quiz of the Day</h1></div>
          <div className={"quiz_question"}>
            Pretending to be banks, the IRS or some other organization and sending you an email or a letter asking for personal information is called __________.
          </div>
          <div>
            <div className={"option"}>A. surfing</div>
            <div className={"option"}>B. fishing</div>
            <div className={"option"}>C. phishing</div>
            <div className={"option"}>D. sailing</div>
          </div>
          <div>
            <a href="/past-quizzes">Past Quizzes</a>
          </div>
        </div>
        <div className='leaderboard'>
          <div><h1>Leaderboard</h1></div>
          <div className={"ranking"}>
            <div className={"rank_tag first3 flex_row"}>
              <div className={"rank"}>1</div>
              <div className={"flex1 name"}>Worms Jenkins</div>
              <div className={"score"}>125P</div>
            </div>
            <div className={"rank_tag first3 flex_row"}>
              <div className={"rank"}>2</div>
              <div className={"flex1 name"}>Boxelder Wigglesworth</div>
              <div className={"score"}>120P</div>
            </div>
            <div className={"rank_tag first3 flex_row"}>
              <div className={"rank"}>3</div>
              <div className={"flex1 name"}>Huckleberry Nettles</div>
              <div className={"score"}>118P</div>
            </div>
            <div className={"rank_tag flex_row"}>
              <div className={"rank"}>4</div>
              <div className={"flex1 name"}>Joe Pottin Soil Olivetti</div>
              <div className={"score"}>115P</div>
            </div>
            <div className={"rank_tag flex_row"}>
              <div className={"rank"}>5</div>
              <div className={"flex1 name"}>Zoowee Blubberworth</div>
              <div className={"score"}>100P</div>
            </div>
            <div className={"rank_tag flex_row"}>
              <div className={"rank"}>6</div>
              <div className={"flex1 name"}>Flufffy Gloomkins</div>
              <div className={"score"}>94P</div>
            </div>
            <div className={"rank_tag flex_row"}>
              <div className={"rank"}>7</div>
              <div className={"flex1 name"}>Buritt Noseface</div>
              <div className={"score"}>82P</div>
            </div>
          </div>
        </div>
      </div>

  )
}

export default App  //for main.tsx .
