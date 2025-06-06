import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate, type To } from "react-router";
import DasboardNavBar from "~/components/navbar/dashboard-navbar";

export default function Dashboard() {
	const [drawerOpenCallback, setDrawerOpenCallback] = useState<((newOpen: boolean) => void) | null>(null);
	
	const registerDrawerOpenCallback = (drawerOpenCallback: (newOpen: boolean) => void) => {
		setDrawerOpenCallback(() => drawerOpenCallback);
	};
	
	return (
		<>
			<DasboardNavBar onRegisterDrawerOpenCallback={registerDrawerOpenCallback} drawerList={<DrawerList onNavigate={() => {
				if (drawerOpenCallback) {
					drawerOpenCallback(false);
				}
			}} />} />
			<Outlet />
		</>
	);
}

interface button {
	text: string;
	to: To;
}

const buttons: button[] = [
	{ text: "Home", to: "." },
	{ text: "Create New Quiz", to: "quiz/new" }
];

interface DrawerListProps {
	onNavigate: () => void;
};

function DrawerList(props: DrawerListProps) {
	const navigate = useNavigate();
	
	const handleNavigate = (to: To) => {
		props.onNavigate();
		navigate(`admin/${to}`);
	};
	
	return (
		<List>
			{buttons.map((button) => (
				<ListItem key={button.text} disablePadding>
					<ListItemButton onClick={() => handleNavigate(button.to)}>
						<ListItemText primary={button.text} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
}