import { Box, Button, Divider, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { emailPattern, fieldRequired, maxEmailLength, maxPasswordLength, minPasswordLength } from "./validation";

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
		setError,
	} = useForm<FormInput>({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			accountType: "student"
		},
	});
	
	const onSubmit = handleSubmit(data => {
		if(data.password !== data.confirmPassword){
			setError("confirmPassword", { message: "A different password has been entered" });
			return;
		}
		
		console.log(data);
	});
	
	return (
		<Stack gap={isSubmitting ? 20 : 4}>
			<Typography variant="h4">Sign Up</Typography>
			<form onSubmit={onSubmit} autoCapitalize="off" autoComplete="off">
				<Stack gap={4} divider={<Divider />}>
					<Stack gap={4}>
						<Grid container spacing={2}>
							<Controller
								name="email"
								rules={{ required: fieldRequired, pattern: emailPattern, maxLength: maxEmailLength }}
								control={control}
								render={({ field }) => (
									<TextField label="Email" {...field} error={errors.email !== undefined} helperText={errors.email?.message} variant="outlined" />
								)}
							/>
							
							<Controller
								name="password"
								rules={{ required: fieldRequired, minLength: minPasswordLength, maxLength: maxPasswordLength }}
								control={control}
								render={({ field }) => (
									<TextField label="Password" {...field} error={errors.password !== undefined} helperText={errors.password?.message} type="password" variant="outlined" />
								)}
							/>
							
							<Controller
								name="confirmPassword"
								rules={{ required: fieldRequired, minLength: minPasswordLength, maxLength: maxPasswordLength }}
								control={control}
								render={({ field }) => (
									<TextField label="Confirm Password" {...field} error={errors.confirmPassword !== undefined} helperText={errors.confirmPassword?.message} type="password" variant="outlined" />
								)}
							/>
						</Grid>
						
						<Box>
							<FormLabel id="signup-account-type-label">Account Type:</FormLabel>
							<Controller name="accountType" defaultValue="student" control={control} render={({ field }) => (
								<RadioGroup {...field} row aria-labelledby="signup-account-type-label">
									<FormControlLabel value="student" control={<Radio />} label="Student"/>
									<FormControlLabel value="admin" control={<Radio />} label="Admin" />
								</RadioGroup>
							)} />
						</Box>
					</Stack>
					
					<Box>
						<Button color="primary" variant="contained" type="submit">Sign Up</Button>
					</Box>
				</Stack>
			</form>
		</Stack>
	);
}