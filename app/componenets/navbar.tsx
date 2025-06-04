import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
	return (
		<AppBar position='static'>
			<Toolbar>
				<IconButton size='large' edge='start' aria-label='menu' sx={{ mr: 2 }}>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' sx={{ flexGrow: 1 }}>
					QuizHub
				</Typography>
			</Toolbar>
		</AppBar>
	);
}