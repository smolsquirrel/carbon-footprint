import './App.css';

import { useState } from 'react';

import Dashboard from './components/Dashboard';
import Upload from './components/Upload';

function App() {
	const [data, setData] = useState({})
	const [loaded, setLoaded] = useState(false)
	const [failed, setFailed] = useState(false)
	const [years, setYears] = useState([])
	const [months, setMonths] = useState([])
	const [curYear, setCurYear] = useState("")
	const [curMonth, setCurMonth] = useState("")
	const [curData, setCurData] = useState({})
	// console.log(curData)
	// console.log(curMonth)
	return (
		<>
			{loaded ? (
				<Dashboard
					data={data}
					curYear={curYear}
					setCurYear={setCurYear}
					years={years}
					setCurData={setCurData}
					curData={curData}
					curMonth={curMonth}
					setCurMonth={setCurMonth}
					months={months}
					setMonths={setMonths}
				/>
			) : (
				<Upload
					setLoaded={setLoaded}
					setData={setData}
					setFailed={setFailed}
					setYears={setYears}
					setCurYear={setCurYear}
					setCurMonth={setCurMonth}
					setCurData={setCurData}
					setMonths={setMonths}
				/>
			)}
		</>
	)
}

export default App
