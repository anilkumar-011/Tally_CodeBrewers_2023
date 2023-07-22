import React, { useEffect, useState } from "react";
import axios from "axios"
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
var globaltime=0
function Word(props) {
    const { text, active, correct } = props;
    if (correct === true) {
        return <span className=" text-green-400">{text} </span>
    }
    if (correct === false) {
        return <span className=" text-rose-600">{text} </span>
    }

    if (active) return <span className=" font-bold text-red-400 text-xl">{text} </span>

    return <span >{text} </span>

}
Word = React.memo(Word)

const Timer = (props) => {
    const { start, index, correctCount,gameEnd } = props
    const [time, setTime] = useState(0)
    useEffect(() => {
        if (start && !gameEnd) {
            setInterval(() => {
                setTime(t => t + 1)
            }, 1000);
        }
    }, [start])
    return       <div className=" flex justify-around">
        <div>Time elapsed: {time || 0}</div>
        <div>Accuracy: {(((correctCount / index)) * 100 || 0).toFixed(2)} %</div>
        <div>WPM: {(Math.floor(((index / time).toFixed(2)) * 60) || 0).toFixed(2)}</div>
    </div>

}

function Compete() {
    // const getsentence = "Mahendra Singh Dhoni is an Indian professional cricketer. He was captain of the Indian national team in limited-overs formats from 2007 to 2017 and in Test cricket from 2008 to 2014. Dhoni is widely considered one of the greatest cricket captains, wicket-keeper-batsman and finishers in the history of cricket.";
    const [sentence, setSentence] = useState([])
    const [index, setindex] = useState(0)
    const [startTime, setStartTimer] = useState(false)
    const [word, setword] = useState('')
    const [correctWord, setCorrectWord] = useState([])
    const [gameStart, setGameStart] = useState(false)
    const [game, setGame] = useState({ 'time': null, 'level': '' })
    const [correctCount, setCorrectCount] = useState(0)
    const [room,setRoom]=useState({
        room:'',
        username:''
    })
    const [gameEnd,setGameEnd]=useState(false)


    const processinput = (temp) => {
        setStartTimer(true)
        if (temp.endsWith(' ')) {
            setCorrectWord(data => {
                const newwords = [...data]
                let w = x.trim()
                newwords[index] = w === sentence[index]
                if (w === sentence[index]) setCorrectCount(a => a + 1)
                return newwords
            })
            const a = temp.split(' ')
            const x = a[a.length - 2]
            setindex(a => a + 1)
            if (index === sentence.length ) {
                setGameStart(false)
                setGameEnd(true)
                console.log('done bro')
            }
        } else {
            setword(temp.trim())
        }
    }

    const update = (x) => {
        setGame((a) => ({ ...a, [x.target.name]: x.target.value }))
    }
    const startGame = async () => {
        try {
            setGameStart(true)
            console.log(gameStart)
            const words = await axios.get("http://localhost:8080/start", { params: game })
            setSentence(words.data)
        }
        catch (err) {

        }
    }


    const Gameplay = () => {
        return (
            <div>
                <div className=" text-lg mx-auto">
                    <div className=" my-5 text-lg font-semibold text-yellow-400">
                        <Timer start={startTime} index={index} correctCount={correctCount} gameEnd={gameEnd}/>
                    </div>

                    <p>
                        {sentence.map((word, i) => {
                            return <Word
                                text={word}
                                active={i === index}
                                correct={correctWord[i]}
                            />
                        })}
                    </p>
                    <textarea onChange={(x) => { processinput(x.target.value) }} className=" bg-[#363537] outline-none max-h-32 border-b-2 w-full border-white" />
                </div>
            </div>
        )
    }

    const Results = () => {
        if (gameEnd){
            const t=''
            const res={
                time:t,
                accuracy:(((correctCount / index)) * 100 || 0).toFixed(2),
                wpm:(Math.floor(((index /t ).toFixed(2)) * 60) || 0).toFixed(2)
            }
            console.log(res,room)
            socket.emit("Game done",{res,room})
        }
        return (
            <div>
                <div className=" flex justify-center gap-[30%] font-mono text-green-600 h-min my-[15%]">
                    <p className=" text-3xl px-5 rounded-2xl p-4">Accuracy: <div className=" text-7xl">{(correctCount / index).toFixed(2) * 100 || 0} %</div></p>
                    <p className=" text-3xl px-5 rounded-2xl p-4">WPM: <div className=" text-7xl">{(index / game.time) * 60 || 0}</div></p>
                </div>
            </div>
        )
    }
    
    const multi= async()=>{
        try{
            console.log(room)
            socket.emit(room.room);
        }catch(err){
            console.log(err)
        }

    }

    

    const multiupdate=(x)=>{
        setRoom((a)=>({...a,[x.target.name]:x.target.value}))
    }

    return (
        <div className=" bg-black pt-[5%]">
            {/* game room connect */}
            <div className=" w-4/5 mx-auto flex gap-10 border-2 border-red-400 p-5 justify-around  h-min rounded-full">
                <div className=" flex gap-3">
                    <p>Room ID:</p>
                    <input onChange={multiupdate} name="room" className=" bg-gray-800 border-2 rounded-xl text-white border-red-400 px-2 outline-none"></input>
                </div>
                <div className=" flex gap-3">
                    <p>UserName:</p>
                    <input onChange={multiupdate} name="username" className=" bg-gray-800 border-2 rounded-xl text-white border-red-400 px-2 outline-none"></input>
                </div>

                <button onClick={multi} className=" bg-green-500 rounded-full px-5 py-1">Connect </button>
            </div>


            {/* input for game */}
            <div className=" flex gap-10 w-4/5 mx-auto h-min">
                <div className=" flex gap-10 border-2 border-red-400 p-5 justify-around mt-[5%] h-min rounded-full">
                    <p className=" font-bold text-red-400">Select Time</p>
                    <form className=" flex gap-5">
                        <div>
                            <input onChange={update} type="radio" id="html" name="time" value={60} />
                            <label for="html">60 seconds</label>
                        </div>
                        <div>
                            <input onChange={update} type="radio" id="css" name="time" value={120} />
                            <label for="css">120 seconds</label>
                        </div>
                    </form>
                </div>

                <div className=" flex gap-10 border-2 border-red-400 p-5 justify-around mt-[5%] h-min rounded-full">
                    <p className=" font-bold text-red-400">Select words</p>
                    <form className=" flex gap-10">
                        <div>
                            <input onChange={update} type="radio" id="html" name="level" value="easy" />
                            <label for="html">Easy</label>
                        </div>
                        <div>
                            <input onChange={update} type="radio" id="css" name="level" value="medium" />
                            <label for="css">Medium</label>
                        </div>
                        <div>
                            <input onChange={update} type="radio" id="javascript" name="level" value="hard" />
                            <label for="javascript">Hard</label>
                        </div>
                    </form>
                </div>

                <button onClick={startGame} className=" p-5 px-10 rounded-3xl bg-red-600 text-white mt-[5%] h-min my-auto">Start</button>
            </div>
            {/* game */}
            <div className=" my-10 w-4/5 mx-auto">
                {gameStart ? Gameplay() : Results()}
            </div>

        </div>
    )
}

export default Compete;