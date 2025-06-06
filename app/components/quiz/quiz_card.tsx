import { Card, CardActionArea, CardContent, Grid } from "@mui/material";
import type { quiz } from "~/model/quiz";

interface QuizCardProps {
	quiz: quiz
};

export default function QuizCard(props: QuizCardProps) {
	const onClick = () => {
		
	};
	
	return (
		<Grid>
			<Card>
				<CardActionArea onClick={onClick} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, }}>
					<CardContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
						
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
}