import { Box, Button, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { emailPattern, fieldRequired, maxEmailLength, maxPasswordLength, minPasswordLength } from "./validation";

interface FormInput {
	email: string,
	password: string
}

export default function LogIn() {
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<FormInput>({
		defaultValues: {
			email: "",
			password: ""
		},
	});
	
	const onSubmit = handleSubmit(data => {
		console.log(data);
	});
	
	return (
		<Stack gap={4}>
			<Typography variant="h4">Log In</Typography>
			<form onSubmit={onSubmit} autoComplete="off">
				<Stack gap={4} divider={<Divider />}>
					<Stack gap={2}>
						<Grid container spacing={2}>
							<Controller
								name="email"
								rules={{ required: fieldRequired, pattern: emailPattern, maxLength: maxEmailLength }}
								control={control}
								render={({ field }) => (
									<TextField label="Email" {...field} error={errors.email !== undefined} helperText={errors.email?.message} variant="outlined" required />
								)}
							/>
							
							<Controller
								name="password"
								rules={{ required: fieldRequired, minLength: minPasswordLength, maxLength: maxPasswordLength }}
								control={control}
								render={({ field }) => (
									<TextField label="Password" {...field} error={errors.password !== undefined} helperText={errors.password?.message} type="password" variant="outlined" required />
								)}
							/>
						</Grid>
					</Stack>
					
					<Box>
						<Button color="primary" variant="contained" type="submit">Log In</Button>
					</Box>
				</Stack>
			</form>
		</Stack>
	);
}