import React, { useEffect, useState } from "react";

function Word(props) {
    const { text, active, correct } = props;
    console.log(correct)
    if (correct === true) {
        return <span className=" text-green-600">{text} </span>
    }
    if (correct === false) {
        return <span className=" text-red-600">{text} </span>
    }

    if (active) return <span style={{ fontWeight: "bold" }}>{text} </span>

    return <span >{text} </span>

}
Word = React.memo(Word)

function Timer(props){

    const [time,setTime]=useState(0)
    useEffect(()=>{
        if (props.start){
            setInterval(() => {
                setTime(t=>t+1)
            }, 1000);
        }
    },[props.start])
    return <div>
        Time elapsed: {time || 0} 
    </div>

}

function Pratice() {
    const getsentence = "Mahendra Singh Dhoni is an Indian professional cricketer. He was captain of the Indian national team in limited-overs formats from 2007 to 2017 and in Test cricket from 2008 to 2014. Dhoni is widely considered one of the greatest cricket captains, wicket-keeper-batsman and finishers in the history of cricket.";
    const sentence = getsentence.split(' ')
    const [index, setindex] = useState(0)
    const [startTime,setStartTimer]=useState(false)
    const [word, setword] = useState('')
    const [correctWord, setCorrectWord] = useState([])
    const inputChange = (temp) => {
        setStartTimer(true)
        if (temp.endsWith(' ')) {
            setCorrectWord(data => {
                const newwords = [...data]
                let w = x.trim()
                newwords[index] = w === sentence[index]
                console.log(correctWord, index, w, temp, sentence[index])
                return newwords
            })
            const a = temp.split(' ')
            const x = a[a.length - 2]
            setindex(a => a + 1)

        } else {
            setword(temp.trim())
        }
    }


    return (
        <div>
            <div className=" text-lg w-4/5 mx-auto">
                <Timer start={startTime}/>

                <p>
                    {sentence.map((word, i) => {
                        return <Word
                            text={word}
                            active={i === index}
                            correct={correctWord[i]}
                        />
                    })}
                </p>
                <textarea onChange={(x) => { inputChange(x.target.value) }} className=" bg-[#363537] outline-none max-h-32 border-b-2 w-full border-white" />
            </div>
        </div>
    );
}

export default Pratice;