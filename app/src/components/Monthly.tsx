import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip,
} from "chart.js"
import { Doughnut, Line } from "react-chartjs-2"

import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Filler
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
	const totEm = data["totalEmissions"]
	const totD = data["totalDistance"]
	const monthlyEmPie: any = {}
	monthlyEmPie["labels"] = Object.keys(data["totalEmissionsPerType"])
	monthlyEmPie["datasets"] = [
		{
			labels: "kg of CO2",
			data: Object.values(data["totalEmissionsPerType"]).map(
				(x: any) => (parseFloat(x) * 100) / totEm
			),
			backgroundColor: backgroundColor,
			borderColor: borderColor,
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
				emPerType[type].push((parseFloat(y[type]) / 1000).toFixed(2))
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
		x["fill"] = true
		c++
		monthlyEmLine["datasets"].push(x)
	}
	const Lineoptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
		},
	}

	const monthlyDPie: any = {}
	monthlyDPie["labels"] = Object.keys(data["totalDistancePerType"])
	monthlyDPie["datasets"] = [
		{
			labels: "kg of CO2",
			data: Object.values(data["totalDistancePerType"]).map(
				(x: any) => (parseFloat(x) * 100) / totD
			),
			backgroundColor: backgroundColor,
			borderColor: borderColor,
			borderWidth: 1,
		},
	]

	const DPerType: any = {}
	const monthlyDLine: any = {}
	monthlyDLine["labels"] = Object.keys(data["totalDistancePerType"])
	for (const day in data["days"]) {
		const x = data["days"][day]
		const y = x["totalDistancePerType"]
		for (const type of allTypes) {
			if (!(type in DPerType)) {
				DPerType[type] = []
			}
			if (type in y) {
				DPerType[type].push((parseFloat(y[type]) / 1000).toFixed(2))
			} else {
				DPerType[type].push(0)
			}
		}
	}
	monthlyDLine["labels"] = Object.keys(data["days"])
	monthlyDLine["datasets"] = []
	c = 0
	for (const type in emPerType) {
		const x: any = {}
		x["label"] = type
		x["data"] = DPerType[type]
		x["borderColor"] = borderColor[c]
		x["backgroundColor"] = backgroundColor[c]
		x["fill"] = true
		c++
		monthlyDLine["datasets"].push(x)
	}

	return (
		<Grid container spacing={5} direction="column" justifyContent="center" alignItems="center">
			<Grid container item direction="column" spacing={3}>
				<Grid item>
					<Typography variant="h4">Monthly Statistics</Typography>
				</Grid>
				<Grid container item spacing={4} alignItems="center" justifyContent="center">
					<Grid item xs={4}>
						<Typography variant="h5">Emission proportions by type</Typography>
						<Doughnut data={monthlyEmPie} />
					</Grid>
					<Grid item xs={7}>
						<Typography variant="h5">CO2 emissions by type (kg)</Typography>
						<Line options={Lineoptions} data={monthlyEmLine} />
					</Grid>
				</Grid>
				<Grid container item spacing={4} alignItems="center" justifyContent="center">
					<Grid item xs={4}>
						<Typography variant="h5">Travelled distance proportions by type</Typography>
						<Doughnut data={monthlyDPie} />
					</Grid>
					<Grid item xs={7}>
						<Typography variant="h5">Travelled distance by type (km)</Typography>
						<Line options={Lineoptions} data={monthlyDLine} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Monthly
