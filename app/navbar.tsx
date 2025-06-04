import { AppBar, Button, Divider, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, type To } from "react-router";

export default function NavBar() {
	const navigate = useNavigate();
	
	const handleNav = (to: To) => {
		console.log(to);
		navigate(to);
	};
	
	return (
		<AppBar position='static'>
			<Toolbar>
				<IconButton size='large' edge='start' aria-label='menu' sx={{ mr: 2 }}>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' sx={{ flexGrow: 1 }}>
					QuizHub
				</Typography>
				
				<Stack direction={"row"} divider={<Divider orientation="vertical" flexItem />} spacing={2}>
					<Button onClick={() => handleNav("log-in")} color="primary" variant="contained">Login</Button>
					<Button onClick={() => handleNav("sign-up")} color="secondary" variant="text">Sign Up</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	);
}