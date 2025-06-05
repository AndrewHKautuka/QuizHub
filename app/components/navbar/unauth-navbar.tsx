import { Button, Divider, Stack } from "@mui/material";
import { useNavigate, type To } from "react-router";
import NavBarBase from "./navbar-base";

export default function UnAuthNavBar() {
	const navigate = useNavigate();
	
	const handleNav = (to: To) => {
		navigate(to);
	};
	
	return (
		<NavBarBase rhsButtons={(
			<Stack direction={"row"} divider={<Divider orientation="vertical" flexItem />} spacing={2}>
				<Button onClick={() => handleNav("log-in")} color="primary" variant="contained">Login</Button>
				<Button onClick={() => handleNav("sign-up")} color="secondary" variant="text">Sign Up</Button>
			</Stack>
		)} />
	);
}