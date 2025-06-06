import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function CreateQuizCard() {
	const onClick = () => {
		
	};
	
	return (
		<Grid>
			<Card>
				<CardActionArea onClick={onClick} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, }}>
					<CardContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
						<AddIcon fontSize="large" />
						<Typography>
							Create New Quiz
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
}