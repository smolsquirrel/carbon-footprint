import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import Grid from '@mui/material/Grid';

ChartJS.register(ArcElement, Tooltip, Legend)
interface Props {
	data: any
}

function Monthly({ data }: Props) {
	const monthlyEm: any = {}
	console.log(data)
	monthlyEm["labels"] = Object.keys(data["totalEmissionsPerType"])
	monthlyEm["datasets"] = [
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
	console.log(monthlyEm)
	return <div>{<Doughnut data={monthlyEm} />}</div>
}

export default Monthly
