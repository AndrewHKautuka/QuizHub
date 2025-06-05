import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavBarBase from "./navbar-base";

export default function DasboardNavBar() {
	return (
		<NavBarBase lhsButtons={(
			<IconButton size='large' edge='start' aria-label='menu' sx={{ mr: 2 }}>
				<MenuIcon />
			</IconButton>
		)} />
	);
}