import { useState } from 'react'
import Button from './components/button.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const log = console.log;

function App() {
    const [loc, setLoc] = useState('');
    const [fetchedData, setFetchedData] = useState('{"result":true, "count":42}')
    async function getData(location) {
        location = loc;
        const url = await fetch(`http://api.weatherapi.com/v1/current.json?key=b86be9f2d5d24cd3a8081721231507&q=${location}`, {mode: 'cors'});
        const data = await url.json();
        await log(data)
        await setFetchedData(JSON.stringify(data));
    }
    const data = JSON.parse(fetchedData);

    const displayTemp = () => { 
        if (data.current == undefined) {
            return ''
        } else {
            return `The temperature is ${data.current.temp_c} degrees.`
        }
    }
    async function buttonGoVroom() {
        await setLoc('Belgrade')
        await getData()
    }

    return (
        <>
        <Button style="btn" className="test" value="Change Location" onBtnClick={() => buttonGoVroom()}/>
        <div>{loc}</div>
        <div>{displayTemp()}</div>
        </>
    )
}

export default App
