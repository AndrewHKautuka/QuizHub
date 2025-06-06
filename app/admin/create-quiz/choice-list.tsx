import { Controller, useFieldArray, type UseFormReturn } from "react-hook-form";
import { Box, Button, IconButton, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { fieldRequired, maxChoiceLength, quizFieldPattern } from "../validation";
import { defaultChoice, type FormInput } from "./page";

interface ChoicesListProps {
	useForm: UseFormReturn<FormInput, any, FormInput>;
	parentIndex: number;
}

export default function ChoicesList(props: ChoicesListProps) {
	const {
		control,
		formState: { errors },
		getValues,
	} = props.useForm;
	
	const { fields, append, remove } = useFieldArray({
		control,
		name: `questions.${props.parentIndex}.choices`,
	});
	
	return (
		<Controller
			name={`questions.${props.parentIndex}.correctChoice`}
			control={control}
			render={(field) => (
			<RadioGroup {...field} defaultValue={getValues().questions[props.parentIndex].correctChoice}>
				<Stack gap={2}>
					{fields.map((field, index) => (
						<Stack key={field.id} gap={2}>
							<Stack direction="row" gap={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
								<Stack direction="row" gap={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
									<Radio value={index} />
									
									<Typography variant="body1">
										{`${index + 1}.`}
									</Typography>
								</Stack>
								
								<Controller
									name={`questions.${props.parentIndex}.choices.${index}.text` as const}
									control={control}
									rules={{ required: fieldRequired, pattern: quizFieldPattern, maxLength: maxChoiceLength }}
									render={({ field }) => (
										<TextField
											{...field}
											label="Choice Text"
											disabled={getValues().questions[props.parentIndex].type === "true/false"}
											error={errors.questions?.[props.parentIndex]?.choices?.[index]?.text !== undefined}
											helperText={errors.questions?.[props.parentIndex]?.choices?.[index]?.text?.message}
										/>
									)}
								/>
								
								{fields.length <= 2 ? <Box /> : (
									<IconButton onClick={() => remove(index)}>
										<DeleteIcon />
									</IconButton>
								)}
							</Stack>
						</Stack>
					))}
					
					{getValues().questions[props.parentIndex].type === "true/false" ? <></> : (
						<Box>
							<Button color="secondary" variant="outlined" startIcon={<AddIcon />} onClick={() => append(defaultChoice)}>
								Add New Choice
							</Button>
						</Box>
					)}
				</Stack>
			</RadioGroup>
		)}/>
	);
}