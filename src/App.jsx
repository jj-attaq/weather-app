import { useState } from 'react'
import Button from './components/button.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const log = console.log;

function App() {
    const [fetchedData, setFetchedData] = useState('{"result":true, "count":42}')
    async function getData() {
        const url = await fetch(`http://api.weatherapi.com/v1/current.json?key=b86be9f2d5d24cd3a8081721231507&q=${loc}`, {mode: 'cors'});
        const data = await url.json();
        log(data)
        await setFetchedData(JSON.stringify(data));
    }
    const data = JSON.parse(fetchedData);
    const [loc, setLoc] = useState('');

    const displayTemp = () => { 
            if (data.current == undefined) {
                return 'error'
            } else {
                data.current.temp_c;
            }
        }
    return (
        <>
        <Button style="btn" className="test" value="Change Location" onBtnClick={() => {
            setLoc(prompt())
            getData()
        }}/>
        <div>{loc}</div>
        <div>{displayTemp()}</div>
        </>
    )
}

export default App
