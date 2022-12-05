import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import Box from '@mui/material/Box';

const fileTypes = ["ZIP"]

interface Props {
	setLoaded: Function
	setData: Function
	setFailed: Function
	setYears: Function
	setCurYear: Function
	setCurData: Function
	setCurMonth: Function
	setMonths: Function
}

function Upload({
	setLoaded,
	setData,
	setFailed,
	setYears,
	setCurYear,
	setCurData,
	setCurMonth,
	setMonths,
}: Props) {
	const handleChange = async (file: any) => {
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
	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<FileUploader handleChange={handleChange} name="file" types={fileTypes} />
		</Box>
	)
}

export default Upload
