import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from './components/button.jsx'
import './App.css'

const log = console.log;

function App() {
    const [loc, setLoc] = useState('');
    const [fetchedData, setFetchedData] = useState([])
    const form  = useForm({
        defaultValues: {
            scale: "C"
        },
        mode: "onChange"
    });

    const { register, handleSubmit, formState:{errors} } = form;
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
            const temp = form.watch().scale ==='C' ? addKey(fetchedData[0].current.temp_c) : addKey(fetchedData[0].current.temp_f);
            const condition = addKey(fetchedData[0].current.condition.text)
            log([temp, condition])
            return [temp, condition];
        }
    }
    const onSubmit = (data) => {
        setLoc(data.changeLoc)
        log(data.changeLoc)
    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="changeLoc">Enter Location: </label>
        <input id="changeLoc" name="changeLoc" {...register("changeLoc", {required: true})} />
        <div></div>
        
        <input {...register("scale")} id="celsius" type="radio" value="C" />
        <label htmlFor="celsius"> Celsius</label> 
        <div></div>
        <input {...register("scale")} id="fahrenheit" type="radio" value="F" />
        <label htmlFor="fahrenheit"> Fahrenheit</label> 
        </form>
        <div>{loc}</div>
        <div>{displayData().map(el => {
            return (
                <li key={el.id}>{
                    el.dataPoint
                }</li>
            )
        })}</div>
        <footer>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a>

</footer>
        </>
    )
}
//    <Button style="btn" className="test" value="Change Location" onBtnClick={() => setLoc(prompt())}/>

export default App
