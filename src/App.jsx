import { useState, useEffect } from 'react'
import Button from './components/button.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const log = console.log;

function App() {
    const [loc, setLoc] = useState('');
    const [fetchedData, setFetchedData] = useState([])
    useEffect(() => {
        if (loc === '') {
            return
        } else if (loc !== '') {
            fetch(`http://api.weatherapi.com/v1/current.json?key=b86be9f2d5d24cd3a8081721231507&q=${loc}`, {mode: 'cors'})
                .then(response => response.json())
                .then(json => {
                    setFetchedData([json]);
                    log(json);
                })
        }
    }, [loc]);

    const displayTemp = () => { 
        if (fetchedData[0] === undefined) {
            log('oops')
            return ''
        } else {
            return `The temperature is ${fetchedData[0].current.temp_c} degrees.`
        }
    }

    return (
        <>
        <Button style="btn" className="test" value="Change Location" onBtnClick={() => setLoc(prompt())}/>
        <div>{loc}</div>
        <div>{displayTemp()}</div>
        </>
    )
}

export default App
