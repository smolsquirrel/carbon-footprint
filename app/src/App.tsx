import './App.css';

import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Dashboard from './components/Dashboard';
import Upload from './components/Upload';

function App() {
	const [data, setData] = useState({})
	const [loaded, setLoaded] = useState(false)

	const [years, setYears] = useState([])
	const [months, setMonths] = useState([])
	const [curYear, setCurYear] = useState("")
	const [curMonth, setCurMonth] = useState("")
	const [curData, setCurData] = useState({})

	// console.log(curData)
	// console.log(curMonth)
	return (
		<Box>
			<AppBar position="static">
				<Toolbar>
					<Typography
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Pass on the gas!
					</Typography>
				</Toolbar>
			</AppBar>
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
					setYears={setYears}
					setCurYear={setCurYear}
					setCurMonth={setCurMonth}
					setCurData={setCurData}
					setMonths={setMonths}
				/>
			)}
		</Box>
	)
}

export default App
