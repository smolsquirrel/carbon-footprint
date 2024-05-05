import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

interface Props {
	distance: string
	emissions: string
}

function StatsBar({ distance, emissions }: Props) {
	return (
		<Grid container alignItems="center" spacing={2}>
			<Grid item xs={6}>
				<Card>
					<CardContent>
						<Grid container direction="column">
							<Grid item>
								<Typography
									sx={{ typography: { xs: "h4", md: "h3" } }}
									align="left"
								>
									<Box sx={{ fontWeight: "medium" }}>
										{(parseInt(distance) / 1000).toFixed(2)} km
									</Box>
								</Typography>
							</Grid>
							<Grid item>
								<Typography
									sx={{ typography: { xs: "h6", sm: "h5" } }}
									align="left"
								>
									Total distance travelled
								</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={6}>
				<Card>
					<CardContent>
						<Grid container direction="column">
							<Grid item>
								<Typography
									sx={{ typography: { xs: "h4", md: "h3" } }}
									align="left"
								>
									<Box sx={{ fontWeight: "medium" }}>
										{(parseInt(emissions) / 1000).toFixed(2)} kg
									</Box>
								</Typography>
							</Grid>
							<Grid item>
								<Typography
									sx={{ typography: { xs: "h6", sm: "h5" } }}
									align="left"
								>
									Total CO2 emissions
								</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	)
}

export default StatsBar
