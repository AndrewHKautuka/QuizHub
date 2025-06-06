import { Controller, useForm } from "react-hook-form";
import { Box, Button, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { fieldRequired, maxDescLength, maxTitleLength, quizFieldPattern } from "../validation";
import type { choice, question } from "~/model/quiz";
import { supabase } from "~/config/supabaseClient";
import type { Tables } from "database.types";
import QuestionsList from "./questions-list";

export interface FormInput {
	title: string;
	description: string;
	questions: question[];
}

export const defaultChoice: choice = {
	text: "",
	isCorrect: false,
};

export const defaultQuestion: question = {
	text: "",
	type: "multiple-choice",
	correctChoice: 0,
	choices: [
		defaultChoice,
		defaultChoice,
	],
};

export default function CreateQuizPage() {
	const FormHook = useForm<FormInput>({
		defaultValues: {
			title: "",
			description: "",
			questions: [
				defaultQuestion,
			],
		},
	});
	
	const {
		handleSubmit,
		control,
		formState: { errors, },
		setError,
	} = FormHook;
	
	const insertQuiz = async (formData: FormInput) => {
		const { title, description } = formData;
		const { data, error } = await supabase.from("Quiz").insert({ title, description }).eq("title", title).select();
		
		if (error) {
			setError("title", error);
		}
		
		if (data) {
			await insertQuestions(formData, data[0]);
		}
	}
	
	const insertQuestions = async (formData: FormInput, quizData: Tables<"Quiz">) => {
		const { questions } = formData;
		const { quiz_id } = quizData;
		
		for (let i = 0; i < questions.length; i++) {
			const question = questions[i];
			const { data, error } = await supabase.from("Question").insert({ quiz_id: quiz_id, question_no: i, text: question.text }).eq("quiz_id", quiz_id).eq("question_no", i).select();
			
			if (error) {
				setError(`questions.${i}.text`, error);
			}
			
			if (data) {
				await insertChoices(formData, data[0]);
			}
		}
	}
	
	const insertChoices = async (formData: FormInput, questionData: Tables<"Question">) => {
		const { choices, correctChoice } = formData.questions[questionData.question_no];
		const { quiz_id, question_no } = questionData;
		
		for (let i = 0; i < choices.length; i++) {
			const choice = choices[i];
			const { error } = await supabase.from("Choice").insert({ quiz_id: quiz_id, question_no: question_no, choice_no: i, text: choice.text, is_correct: (correctChoice === i) }).eq("quiz_id", quiz_id).eq("question_no", question_no).eq("choice_no", i).select();
			
			if (error) {
				setError(`questions.${question_no}.choices.${i}.text`, error);
			}
		}
	}
	
	const onSubmit = handleSubmit(formData => {
		insertQuiz(formData);
	});
	
	return (
		<Box className="MainContentBody">
			<Paper className="PaperFormBox">
				<Stack gap={4} sx={{ alignItems: "center" }}>
					<Typography variant="h4">Create New Quiz</Typography>
					<form onSubmit={onSubmit} autoComplete="off">
						<Stack gap={4} divider={<Divider />}>
							<Stack gap={2}>
								<Controller
									name="title"
									rules={{ required: fieldRequired, pattern: quizFieldPattern, maxLength: maxTitleLength }}
									control={control}
									render={({ field }) => (
										<TextField className="PaperFormBoxTopLevelTextField" label="Title" {...field} error={errors.title !== undefined} helperText={errors.title?.message} variant="outlined" required />
									)}
								/>
								
								<Controller
									name="description"
									rules={{ pattern: quizFieldPattern, maxLength: maxDescLength }}
									control={control}
									render={({ field }) => (
										<TextField className="PaperFormBoxTopLevelTextField" label="Description" {...field} error={errors.description !== undefined} helperText={errors.description?.message} type="text" variant="outlined" />
									)}
								/>
								
								<QuestionsList useForm={FormHook} />
							</Stack>
							
							<Box>
								<Button color="primary" variant="contained" type="submit">Create Quiz</Button>
							</Box>
						</Stack>
					</form>
				</Stack>
			</Paper>
		</Box>
	);
}