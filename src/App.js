import React, {useEffect, useState} from 'react'
import raw from './fileTxt/fb71d972'
import './App.css'

function App() {
    const [file, setFile] = useState('')
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        const fileReader = new FileReader()
        fileReader.readAsText(e.target.files[0], 'UTF-8')
        fileReader.onload = e => {
            setFile(e.target.result)
        }
    }

    const handleClick = async () => {
        setLoading(true);
        setTimeout(() => {
            Task();
            setLoading(false);
        })
    }

    const Task = () => {
        const startTime = new Date().toLocaleTimeString()
        console.log(startTime)
        let sum = 0
        let median = 0
        let length_of_max_increasing_sequence = 0
        let length_of_current_increasing_sequence = 0
        let length_of_max_decreasing_sequence = 0
        let length_of_current_decreasing_sequence = 0
        let numbers_str = file.split('\n')
        numbers_str.pop()
        let max = Number(numbers_str[0])
        let min = Number(numbers_str[0])

        numbers_str.forEach((num, idx) => {
            if (Number(num) > Number(numbers_str[idx + 1])) {
                if (length_of_max_decreasing_sequence < length_of_current_decreasing_sequence) {
                    length_of_max_decreasing_sequence = length_of_current_decreasing_sequence
                }
                length_of_current_decreasing_sequence = 0
                length_of_current_increasing_sequence++
            }
            if (Number(num) < Number(numbers_str[idx + 1])) {
                if (length_of_max_increasing_sequence < length_of_current_increasing_sequence) {
                    length_of_max_increasing_sequence = length_of_current_increasing_sequence
                }
                length_of_current_increasing_sequence = 0
                length_of_current_decreasing_sequence++
            }
            if (Number(num) > max) {
                max = num
            }
            if (Number(num) < min) {
                min = num
            }
            sum += Number(num)
        })
        let center = sum / numbers_str.length
        console.log(numbers_str)
        numbers_str.sort(function (a, b) {
            return a - b
        })
        if (numbers_str.length % 2 == 0) {
            median = ((Number(numbers_str[numbers_str.length / 2]) + Number(numbers_str[numbers_str.length / 2 - 1])) / 2)
        } else {
            median = (numbers_str[Math.floor(numbers_str.length / 2)])
        }
        console.log(max)
        console.log(min)
        console.log(center)
        console.log(median)
        console.log(length_of_max_increasing_sequence)
        console.log(length_of_max_decreasing_sequence)
        const endTime = new Date().toLocaleTimeString()
        setResult({
            max,
            min,
            center,
            median,
            length_of_max_increasing_sequence,
            length_of_max_decreasing_sequence,
            endTime,
            startTime
        })
        console.log(endTime)

    }
    return (
        <div>
            <p>
                Upload here the file with numbers:  <input type="file" onChange={handleChange}/>
            </p>

            {file && !loading && <button onClick={handleClick}>Start</button>}
            {loading && 'Loading.... Please wait, it may take some time'}
            {
                result && <div>
                    <p>Max: {result.max}</p>
                    <p>Min: {result.min}</p>
                    <p>Center arithmetic: {result.center}</p>
                    <p>Median: {result.median}</p>
                    <p>max increasing sequence: {result.length_of_max_increasing_sequence}</p>
                    <p>max decreasing sequence: {result.length_of_max_decreasing_sequence}</p>
                    <p>Start time: {result.startTime}</p>
                    <p>End time: {result.endTime}</p>
                </div>
            }
        </div>)
}

export default App
