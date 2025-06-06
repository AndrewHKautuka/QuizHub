import { useEffect, useState, type ReactNode } from "react";
import { Box, Divider, Drawer, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import NavBarBase from "./navbar-base";

interface DasboardNavBar {
	onRegisterDrawerOpenCallback: (callback: (newOpen: boolean) => void) => void;
	drawerList: ReactNode;
}

export default function DasboardNavBar(props: DasboardNavBar) {
	const [open, setOpen] = useState(false);
	
	useEffect(() => {
		props.onRegisterDrawerOpenCallback(setOpen);
	}, [props.onRegisterDrawerOpenCallback]);
	
	return (
		<>
			<NavBarBase lhsContent={(
				<IconButton size='large' edge='start' aria-label='menu' sx={{ mr: 2 }} onClick={() => setOpen(!open)}>
					<MenuIcon />
				</IconButton>
			)} />
			<Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
				<DrawerHeader close={() => setOpen(false)} />
				<Box role="presentation" sx={{ flexGrow: 1 }}>
					{ props.drawerList }
				</Box>
			</Drawer>
		</>
	);
}

interface DrawerHeaderProps {
	close: () => void;
}

function DrawerHeader(props: DrawerHeaderProps) {
	return (
		<Box sx={{ paddingX: 3, marginBottom: 2 }}>
			<Stack className="DrawerHeader-root" direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="h6">
					Dashboard
				</Typography>
				<IconButton size='large' edge="end" onClick={props.close}>
					<ChevronLeftIcon />
				</IconButton>
			</Stack>
			<Divider variant="middle" />
		</Box>
	);
}