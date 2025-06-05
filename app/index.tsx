import { Box, Typography } from '@mui/material';
import type { Route } from './+types';
import UnAuthNavBar from './components/navbar/unauth-navbar';

export default function LandingPage() {
	return (
		<>
			<UnAuthNavBar />
			<Box>
				<Typography variant='h4'>Welcome to QuizHub!</Typography>
			</Box>
		</>
	);
}

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Quiz Hub" },
		{ name: "A quiz managemnet system", content: "Welcome to QuizHub!" },
	];
}