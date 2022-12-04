import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import Monthly from './Monthly';
import StatsBar from './StatsBar';
import Years from './Years';

interface Props {
	data: any
	curYear: string
	setCurYear: Function
	years: string[]
	setCurData: Function
	curData: any
	curMonth: string
	setCurMonth: Function
	months: string[]
	setMonths: Function
}

function Dashboard({
	data,
	curYear,
	setCurYear,
	years,
	setCurData,
	curData,
	curMonth,
	setCurMonth,
	months,
	setMonths,
}: Props) {
	const handleChangeYear = (e: SelectChangeEvent) => {
		setCurYear(e.target.value)
		setCurData(data[e.target.value])
		setMonths(Object.keys(data[e.target.value]).sort())
		setCurMonth(Object.keys(data[e.target.value]).sort()[0])
	}
	const handleChangeMonth = (e: SelectChangeEvent) => {
		setCurMonth(e.target.value)
	}

	return (
		<Box p={5}>
			<Grid container spacing={2}>
				<Grid container item xs={1} direction="column" spacing={2}>
					<Grid item container>
						<FormControl fullWidth>
							<InputLabel id="year-select">Year</InputLabel>
							<Select
								labelId="year-select"
								label="Year"
								value={curYear}
								onChange={handleChangeYear}
							>
								{years.map((year) => (
									<MenuItem value={year}>{year}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item container>
						<FormControl fullWidth>
							<InputLabel id="month-select">Month</InputLabel>
							<Select
								labelId="month-select"
								label="Month"
								value={curMonth}
								onChange={handleChangeMonth}
							>
								{months.map((month) => (
									<MenuItem value={month}>{month.slice(3)}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<Grid container item xs={11}>
					<Grid item container direction="column" spacing={2}>
						<Grid item>
							<StatsBar
								distance={curData[curMonth]["totalDistance"]}
								emissions={curData[curMonth]["totalEmissions"]}
							/>
						</Grid>
						<Grid item>
							<Monthly data={curData[curMonth]} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Dashboard
