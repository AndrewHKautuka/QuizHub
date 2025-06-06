import { Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import type { Tables } from "database.types";

interface QuizCardProps {
	quiz: Tables<"Quiz">
	questions: Tables<"Question">[]
};

export default function AdminQuizCard(props: QuizCardProps) {
	const onClick = () => {
		
	};
	
	return (
		<Grid>
			<Card>
				<CardHeader title={props.quiz.title} subheader={`${props.questions.length} questions`} />
				{/* <CardActionArea onClick={onClick} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, }}> */}
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