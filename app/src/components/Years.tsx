import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

interface Props {
	curYear: String
	setCurYear: Function
	years: String[]
}

function Years({ curYear, setCurYear, years }: Props) {
	return (
		<Stack spacing={2}>
			{years.map((x) => (
				<Button variant="contained" onClick={() => setCurYear(x)}>
					{x}
				</Button>
			))}
		</Stack>
	)
}

export default Years
