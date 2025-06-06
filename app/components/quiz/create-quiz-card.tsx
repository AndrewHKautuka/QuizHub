import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

export default function CreateQuizCard() {
	const navigate = useNavigate();
	
	const onClick = () => {
		navigate("/admin/quiz/new");
	};
	
	return (
		<Grid>
			<Card raised>
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