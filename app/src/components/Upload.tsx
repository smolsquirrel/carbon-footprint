import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const fileTypes = ["ZIP"]

interface Props {
	setLoaded: Function
	setData: Function
	setYears: Function
	setCurYear: Function
	setCurData: Function
	setCurMonth: Function
	setMonths: Function
}

function Upload({
	setLoaded,
	setData,
	setYears,
	setCurYear,
	setCurData,
	setCurMonth,
	setMonths,
}: Props) {
	const [failed, setFailed] = useState(false)
	const handleChange = async (file: any) => {
		setLoading(true)
		setData({})
		setLoaded(false)
		var data = new FormData()
		data.append("file", file)
		const r = await fetch("https://climate-mvuv.onrender.com/getEmissions", {
			method: "POST",
			body: data,
		})
		const d = await r.json()
		if (Object.keys(d).length === 0) {
			setFailed(true)
			setLoading(true)
			return
		}
		setYears(Object.keys(d))
		const cy = Object.keys(d)[Object.keys(d).length - 1]
		setCurYear(cy)

		setMonths(Object.keys(d[cy]).sort())
		setCurMonth(Object.keys(d[cy]).sort()[0])

		setData(d)
		setCurData(d[cy])

		setLoaded(true)
	}
	const [loading, setLoading] = useState(false)
	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				spacing={2}
			>
				{loading ? (
					<Grid
						item
						container
						direction="column"
						justifyContent="center"
						alignItems="center"
					>
						<Grid item>
							<Typography>Processing...May take up to 30 seconds</Typography>
						</Grid>
						<Grid item>
							<CircularProgress />
						</Grid>
					</Grid>
				) : (
					<></>
				)}
				{failed ? (
					<Typography>Something went wrong. Please try another file.</Typography>
				) : (
					<></>
				)}
				<Grid item>
					<Button
						href="https://takeout.google.com/settings/takeout/custom/location_history"
						target="_blank"
						variant="contained"
					>
						Get Your File
					</Button>
				</Grid>
				<Grid item>
					<FileUploader handleChange={handleChange} name="file" types={fileTypes} />
				</Grid>
			</Grid>
		</Box>
	)
}

export default Upload
