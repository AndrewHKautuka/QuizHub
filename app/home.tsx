import { Box, Typography } from '@mui/material';
import type { Route } from './+types/home';

export default function HomePage() {
	return (
		<Box>
			<Typography variant='h4'>Welcome to QuizHub!</Typography>
		</Box>
	);
}

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Quiz Hub" },
		{ name: "A quiz managemnet system", content: "Welcome to QuizHub!" },
	];
}