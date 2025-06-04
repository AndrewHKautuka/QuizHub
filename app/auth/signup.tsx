import { Box, Button, Divider, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

type AccountType = "student" | "admin";

interface FormInput {
	email: string,
	password: string,
	confirmPassword: string,
	accountType: AccountType
}

export default function SignUp() {
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<FormInput>({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			accountType: "student"
		},
	});
	
	const onSubmit = handleSubmit(data => {
		console.log(data);
	});
	
	return (
		<Stack gap={4}>
			<Typography variant="h4">Sign Up</Typography>
			<form onSubmit={onSubmit} autoComplete="off">
				<Stack gap={4} divider={<Divider />}>
					<Stack gap={2}>
						<Grid container spacing={2}>
							<Controller name="email" control={control} render={({ field }) => <TextField {...field} label="Email" variant="outlined" required />} />
							<Controller name="password" control={control} render={({ field }) => <TextField {...field} label="Password" type="password" variant="outlined" required />} />
							<Controller name="confirmPassword" control={control} render={({ field }) => <TextField {...field} label="Confirm Password" type="password" variant="outlined" required />} />
						</Grid>
						
						<FormLabel id="signup-account-type-label">Account Type:</FormLabel>
						<Controller name="accountType" defaultValue="student" control={control} render={({ field }) => (
							<RadioGroup {...field} row aria-labelledby="signup-account-type-label">
								<FormControlLabel value="student" control={<Radio />} label="Student"/>
								<FormControlLabel value="admin" control={<Radio />} label="Admin" />
							</RadioGroup>
						)}/>
					</Stack>
					
					<Box>
						<Button color="primary" variant="contained" type="submit">Sign Up</Button>
					</Box>
				</Stack>
			</form>
		</Stack>
	);
}