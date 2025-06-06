import { Controller, useFieldArray, type UseFormReturn } from "react-hook-form";
import { Box, Button, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { fieldRequired, maxQuestionLength, quizFieldPattern } from "../validation";
import { defaultChoice, defaultQuestion, type FormInput } from "./page";
import ChoicesList from "./choice-list";

interface QuestionsListProps {
	useForm: UseFormReturn<FormInput, any, FormInput>;
}

export default function QuestionsList(props: QuestionsListProps) {
	const {
		control,
		formState: { errors },
		setValue,
	} = props.useForm;
	
	const { fields, append, remove } = useFieldArray({
		control,
		name: "questions",
	});
	
	return (
		<>
			<Stack gap={2}>
				{fields.map((questionField, index) => (
					<Paper key={questionField.id}>
						<Stack gap={2}>
							<Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
								<Typography variant="h6">
									{`Question #${index + 1}`}
								</Typography>
								<IconButton sx={{ ml: 2 }} onClick={() => remove(index)}>
									<DeleteIcon />
								</IconButton>
							</Stack>
							
							<Controller
								name={`questions.${index}.text` as const}
								control={control}
								rules={{ required: fieldRequired, pattern: quizFieldPattern, maxLength: maxQuestionLength }}
								render={({ field }) => (
									<TextField
										{...field}
										label="Question Text"
										error={errors.questions?.[index]?.text !== undefined}
										helperText={errors.questions?.[index]?.text?.message}
									/>
								)}
							/>
							
							<Box>
								<Controller name={`questions.${index}.type`} defaultValue={"multiple-choice"} control={control} render={({ field }) => (
									<RadioGroup {...field} row onChange={(e) => {
										field.onChange(e);
										if (e.target.value === "multiple-choice") {
											setValue(`questions.${index}.choices`, [ defaultChoice, defaultChoice ]);
										}
										if (e.target.value === "true/false") {
											setValue(`questions.${index}.choices`, [ { text: "true", isCorrect: true }, { text: "false", isCorrect: false } ]);
										}
									}}>
										<FormControlLabel value={"multiple-choice"} control={<Radio />} label="Multiple-Choice"/>
										<FormControlLabel value={"true/false"} control={<Radio />} label="True/False" />
									</RadioGroup>
								)} />
							</Box>
							
							<ChoicesList useForm={props.useForm} parentIndex={index} />
						</Stack>
					</Paper>
				))}
			</Stack>
			
			<Box>
				<Button color="secondary" variant="outlined" startIcon={<AddIcon />} onClick={() => append(defaultQuestion)}>
					Add New Question
				</Button>
			</Box>
		</>
	);
}