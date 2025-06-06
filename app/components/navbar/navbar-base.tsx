import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";

interface NavBarProps {
	lhsContent?: React.ReactNode;
	rhsContent?: React.ReactNode;
}

export default function NavBarBase(props: NavBarProps) {
	return (
		<AppBar position="static">
			<Toolbar>
				<Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", flexGrow: 1 }}>
					{ props.lhsContent ?? <Box></Box> }
					<Typography variant='h6' align="center">
						QuizHub
					</Typography>
					{ props.rhsContent ?? <Box></Box>  }
				</Stack>
			</Toolbar>
		</AppBar>
	);
}