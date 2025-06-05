import { AppBar, Toolbar, Typography } from "@mui/material";

interface NavBarProps {
	lhsButtons?: React.ReactNode;
	rhsButtons?: React.ReactNode;
}

export default function NavBarBase(props: NavBarProps) {
	return (
		<AppBar position='static'>
			<Toolbar>
				{ props.lhsButtons }
				<Typography variant='h6' sx={{ flexGrow: 1 }}>
					QuizHub
				</Typography>
				{ props.rhsButtons }
			</Toolbar>
		</AppBar>
	);
}