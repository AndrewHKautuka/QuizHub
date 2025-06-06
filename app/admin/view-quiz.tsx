import { Box, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import type { Tables } from "database.types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "~/config/supabaseClient";

export interface Question extends Tables<"Question"> {
	choices: Tables<"Choice">[];
}

export interface Quiz extends Tables<"Quiz"> {
	questions: Question[];
}

export default function ViewQuizPage() {
	const { quizId } = useParams();
	const navigate = useNavigate();
	
	const [quiz, setQuiz] = useState<Quiz | undefined>();
	
	const onMount = async () => {
		if (quizId === undefined) {
			navigate("/admin");
			return;
		}
		
		const { data, error } = await supabase.from("Quiz").select().eq("quiz_id", quizId).single();
		
		if (error || data === null) {
			navigate("/admin");
			return;
		}
		
		setQuiz({ ...data, questions: await loadQuestions(data) });
	};
	
	const loadQuestions = async (quiz: Tables<"Quiz">): Promise<Question[]> => {
		const { data, error } = await supabase.from("Question").select().eq("quiz_id", quiz.quiz_id);
		
		if (error || data === null) {
			return [];
		}
		
		const questions = data.map(async (question) => ({...question, choices: await loadChoices(question)}));
		
		return await Promise.all(questions);
	};
	
	const loadChoices = async (question: Tables<"Question">) => {
		const { data, error } = await supabase.from("Choice").select().eq("quiz_id", question.quiz_id).eq("question_no", question.question_no);
		
		if (error || data === null) {
			return [];
		}
		
		return data;
	};
	
	useEffect(() => {
		onMount();
	}, []);
	
	return (
		<Box className="MainContentBody" sx={{ alignItems: "center" }}>
			{quiz === undefined ? (
				<Typography variant="h6">Loading</Typography>
			) : (
				<Container sx={{ marginTop: 4 }}>
					<Paper className="min-w-fit w-200" sx={{ padding: 4 }}>
						<Stack gap={2} divider={<Divider />}>
							<Typography variant="h4">{quiz.title}</Typography>
							
							<Stack gap={2}>
								<Box>
									<Typography variant="h6">Description</Typography>
									<Typography variant="body1">{quiz.description}</Typography>
								</Box>
								
								<Box>
									<Typography variant="h5">Questions</Typography>
									<Stack gap={3}>
										{quiz.questions.map((question) => (
											<Stack key={question.question_no} gap={2}>
												<Box>
													<Typography variant="h6">Question {question.question_no + 1}</Typography>
													<Typography variant="body1">{question.text}</Typography>
												</Box>
												
												<Stack gap={2}>
													{question.choices.map((choice) => (
														<Paper className={`QuestionChoice-root ${choice.is_correct ? "QuestionChoice-correct" : "QuestionChoice-incorrect"}`} sx={{ padding: 2 }}>
															<Typography variant="body1">{choice.text}</Typography>
														</Paper>
													))}
												</Stack>
											</Stack>
										))}
									</Stack>
								</Box>
							</Stack>
						</Stack>
					</Paper>
				</Container>
			)}
		</Box>
	)
}