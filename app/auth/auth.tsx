import { Box, Container, Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

type TabOption = "sign-up" | "log-in";

export default function AuthPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const pathParts = location.pathname.split('/');
	const lastPart = pathParts[pathParts.length - 1];
	
	const [value, setValue] = useState<TabOption>(lastPart as TabOption);
	
	const handleChange = (event: React.SyntheticEvent, newValue: TabOption) => {
		setValue(newValue);
		navigate(`../${newValue}`);
	};
	
	return (
		<Box className="MainContentBody">
			<Container sx={{ marginTop: 8 }}>
				<Paper sx={{ padding: 4 }}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
						<Tabs value={value} onChange={handleChange}>
							<Tab label="Sign Up" value={"sign-up"} />
							<Tab label="Log In" value={"log-in"} />
						</Tabs>
					</Box>
					<Outlet />
				</Paper>
			</Container>
		</Box>
	);
}