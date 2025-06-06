import { Box, Grid, Typography } from "@mui/material";
import type { Tables } from "database.types";
import { useEffect, useState } from "react";
import AdminQuizCard from "~/components/quiz/admin-quiz-card";
import CreateQuizCard from "~/components/quiz/create-quiz-card";
import { supabase } from "~/config/supabaseClient";

interface Quiz extends Tables<"Quiz"> {
	questionsCount: number;
}

export default function Home() {
	const [quizzes, setQuizzes] = useState<Quiz[]>([]);
	const [error, setError] = useState<Error>();
	
	const onMount = async () => {
		const { data, error } = await supabase.from("Quiz").select();
		
		if (error) {
			setError(error);
		}
		
		if (data) {
			const loadPromises: Promise<Quiz | undefined>[] = data.map((row) => loadQuiz(row));
			const maybeQuizzes = await Promise.all(loadPromises);
			const quizzes: Quiz[] = maybeQuizzes.filter((maybeQuiz) => maybeQuiz !== undefined);
			
			setQuizzes(quizzes);
		}
	};
	
	const loadQuiz = async (quiz: Tables<"Quiz">): Promise<Quiz | undefined> => {
		const { count, error } = await supabase.from("Question").select('*', { count: "exact", head: true }).eq("quiz_id", quiz.quiz_id);
		
		if (error) {
			setError(error);
		}
		
		if (count !== null) {
			return { ...quiz, questionsCount: count };
		}
		
		return undefined;
	};
	
	useEffect(() => {
		onMount();
	}, []);
	
	return (
		<Box className="MainContentBody">
			{error === undefined ? (
				<Typography className="font-semibold pb-4" variant="body1">
					There {quizzes.length === 0 ? "are no quizzes" : (quizzes.length === 1 ? "is 1 quiz" : `are ${quizzes.length} quizzes`)} available.
				</Typography>
			) : (
				<Typography variant="body1" sx={{ color: "red" }}> Error: {error.message}</Typography>
			)}
			<Grid container gap={2}>
				{error === undefined ? (quizzes.map((quiz) => <AdminQuizCard key={quiz.quiz_id} quiz={quiz} questionsCount={quiz.questionsCount} />)) : <></>}
				<CreateQuizCard />
			</Grid>
		</Box>
	);
}