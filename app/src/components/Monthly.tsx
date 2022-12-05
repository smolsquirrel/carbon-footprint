import {
    ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement,
    PointElement, Tooltip
} from 'chart.js';
import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement
)
interface Props {
	data: any
}

const backgroundColor = [
	"rgba(255, 99, 132, 0.2)",
	"rgba(54, 162, 235, 0.2)",
	"rgba(255, 206, 86, 0.2)",
	"rgba(75, 192, 192, 0.2)",
	"rgba(153, 102, 255, 0.2)",
	"rgba(255, 159, 64, 0.2)",
]
const borderColor = [
	"rgba(255, 99, 132, 1)",
	"rgba(54, 162, 235, 1)",
	"rgba(255, 206, 86, 1)",
	"rgba(75, 192, 192, 1)",
	"rgba(153, 102, 255, 1)",
	"rgba(255, 159, 64, 1)",
]

function Monthly({ data }: Props) {
	const monthlyEmPie: any = {}
	console.log(data)
	monthlyEmPie["labels"] = Object.keys(data["totalEmissionsPerType"])
	monthlyEmPie["datasets"] = [
		{
			labels: "kg of CO2",
			data: Object.values(data["totalEmissionsPerType"]),
			backgroundColor: [
				"rgba(255, 99, 132, 0.2)",
				"rgba(54, 162, 235, 0.2)",
				"rgba(255, 206, 86, 0.2)",
				"rgba(75, 192, 192, 0.2)",
				"rgba(153, 102, 255, 0.2)",
				"rgba(255, 159, 64, 0.2)",
			],
			borderColor: [
				"rgba(255, 99, 132, 1)",
				"rgba(54, 162, 235, 1)",
				"rgba(255, 206, 86, 1)",
				"rgba(75, 192, 192, 1)",
				"rgba(153, 102, 255, 1)",
				"rgba(255, 159, 64, 1)",
			],
			borderWidth: 1,
		},
	]
	const emPerType: any = {}
	const monthlyEmLine: any = {}
	const allTypes = Object.keys(data["totalEmissionsPerType"])
	monthlyEmLine["labels"] = Object.keys(data["totalEmissionsPerType"])
	for (const day in data["days"]) {
		const x = data["days"][day]
		const y = x["totalEmissionsPerType"]
		for (const type of allTypes) {
			if (!(type in emPerType)) {
				emPerType[type] = []
			}
			if (type in y) {
				emPerType[type].push(y[type])
			} else {
				emPerType[type].push(0)
			}
		}
	}
	monthlyEmLine["labels"] = Object.keys(data["days"])
	monthlyEmLine["datasets"] = []
	let c = 0
	for (const type in emPerType) {
		const x: any = {}
		x["label"] = type
		x["data"] = emPerType[type]
		x["borderColor"] = borderColor[c]
		x["backgroundColor"] = backgroundColor[c]
		c++
		monthlyEmLine["datasets"].push(x)
	}
	console.log(monthlyEmPie)
	console.log(monthlyEmLine)
	const Lineoptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
		},
	}
	return (
		<Grid container spacing={5} direction="column" justifyContent="center" alignItems="center">
			<Grid container item direction="column">
				<Grid item>
					<Typography>asd</Typography>
				</Grid>
				<Grid container item spacing={5}>
					<Grid item xs={6}>
						<Doughnut data={monthlyEmPie} />
					</Grid>
					<Grid item xs={6}>
						<Line options={Lineoptions} data={monthlyEmLine} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Monthly
