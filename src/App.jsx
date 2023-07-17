import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from './components/button.jsx'
import './App.css'

const log = console.log;

function App() {
    const [loc, setLoc] = useState('');
    const [fetchedData, setFetchedData] = useState([])
    const { register, handleSubmit, formState:{errors} } = useForm();
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

    const displayData = () => { 
        if (fetchedData[0] === undefined) {
            return [];
        } else {
            function addKey(dataPoint) {
                const key = () => {
                    return btoa(`${dataPoint}`)
                }
                const id = key(dataPoint)
                return {
                    id,
                    dataPoint
                }
            }
            const temp = addKey(fetchedData[0].current.temp_c)
            const condition = addKey(fetchedData[0].current.condition.text)
            log([temp, condition])
            return [temp, condition]
        }
    }
    const onSubmit = (data) => {
        setLoc(data.changeLoc)
        log(data.changeLoc)
    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>Enter Location: </label>
        <input name="changeLoc" {...register("changeLoc", {required: true})} />
        <div></div>
        <input {...register("Temperature Scale")} type="radio" value="C" />
        <input {...register("Temperature Scale")} type="radio" value="F" />
        </form>
        <div>{loc}</div>
        <div>{displayData().map(el => {
            return (
                <li key={el.id}>{
                    el.dataPoint
                }</li>
            )
        })}</div>
        </>
    )
}
//    <Button style="btn" className="test" value="Change Location" onBtnClick={() => setLoc(prompt())}/>

export default App
