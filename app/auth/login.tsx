import { Box, Button, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

interface FormInput {
	email: string,
	password: string
}

export default function LogIn() {
	const {
			handleSubmit,
			control,
			formState: { errors, isSubmitting },
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
								<Controller name="email" control={control} render={({ field }) => <TextField {...field} label="Email" variant="outlined" required />} />
								<Controller name="password" control={control} render={({ field }) => <TextField {...field} label="Password" type="password" variant="outlined" required />} />
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