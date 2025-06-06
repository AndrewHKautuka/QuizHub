import { Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import type { Tables } from "database.types";

interface QuizCardProps {
	quiz: Tables<"Quiz">;
	questionsCount: number;
};

export default function AdminQuizCard(props: QuizCardProps) {
	const onClick = () => {
		
	};
	
	return (
		<Grid>
			<Card raised>
					<CardContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
						<Typography variant="body2">
							{props.quiz.description}
						</Typography>
					</CardContent>
				{/* </CardActionArea> */}
			</Card>
		</Grid>
	);
}