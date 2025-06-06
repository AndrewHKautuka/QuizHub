import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Grid, Stack, Typography } from "@mui/material";
import type { Tables } from "database.types";
import { useNavigate } from "react-router";

interface QuizCardProps {
	quiz: Tables<"Quiz">;
	questionsCount: number;
};

export default function AdminQuizCard(props: QuizCardProps) {
	const navigate = useNavigate();
	
	const onClickView = () => {
		navigate(`/admin/quiz/${props.quiz.quiz_id}`);
	};
	
	return (
		<Grid>
			<Card raised>
				<Stack className="h-full" sx={{ justifyContent: "space-between", padding: 1 }}>
					<CardHeader title={props.quiz.title} subheader={props.questionsCount === 1 ? "1 question" : `${props.questionsCount} questions`} />
					
					<CardContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
						<Typography variant="body2">
							{props.quiz.description}
						</Typography>
					</CardContent>
					
					<CardActions>
						<Stack className="w-full" direction="row" gap={2} sx={{ justifyContent: "space-between" }}>
							<Button variant="outlined" color="primary" onClick={onClickView}>View</Button>
							<Button variant="text" color="secondary">Edit</Button>
						</Stack>
					</CardActions>
				</Stack>
			</Card>
		</Grid>
	);
}