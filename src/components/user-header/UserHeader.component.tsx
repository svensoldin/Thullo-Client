import * as React from "react";
import axios from "axios";
import { useAuthDispatch, logout } from "../../context/index";

// Components
import UserDropdown from "../user-dropdown/UserDropdown.component";
import Avatar from "@material-ui/core/Avatar";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import "./UserHeader.styles.css";

type Props = {
	name: string;
	token: string | null;
};

const url = `${process.env.REACT_APP_SERVER_URL}/users/profile`;

const UserHeader = ({ name, token }: Props) => {
	const [userPictureURL, setUserPictureURL] = React.useState<
		string | undefined
	>();
	// Fetching the user's profile picture to put it in the avatar
	React.useEffect(() => {
		const getPicture = async () => {
			try {
				const res = await axios.post(url, {
					headers: { "x-auth-token": token },
					responseType: "blob",
				});
				const pictureURL = URL.createObjectURL(res);
				setUserPictureURL(pictureURL);
			} catch (err) {
				console.error(err);
			}
		};
		getPicture();
	});

	// Showing/hiding the popper when the user clicks on the header
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [
		anchorElement,
		setAnchorElement,
	] = React.useState<HTMLElement | null>();

	const dispatch = useAuthDispatch();
	const handleLogout = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		// Call the logout function with dispatch as an arg
		logout(dispatch);
		setIsMenuOpen(false);
	};
	return (
		<ClickAwayListener onClickAway={() => setIsMenuOpen(false)}>
			<div className="user-header">
				<Avatar
					src={userPictureURL}
					className="avatar"
					alt={name}
					aria-haspopup="true"
					onClick={(e: any) => {
						setAnchorElement(e.target);
						setIsMenuOpen(!isMenuOpen);
					}}
				>
					{name.split("")[0]}
				</Avatar>
				<Popper open={isMenuOpen} anchorEl={anchorElement}>
					<UserDropdown handleLogout={handleLogout} />
				</Popper>
			</div>
		</ClickAwayListener>
	);
};

export default UserHeader;
