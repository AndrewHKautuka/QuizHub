import { Box, Grid } from "@mui/material";
import CreateQuizCard from "~/components/quiz/create-quiz-card";

export default function Home() {
	return (
		<Box>
			<Grid container>
				<CreateQuizCard />
			</Grid>
		</Box>
	);
}