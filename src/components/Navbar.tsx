import SettingsModal from './SettingsModal';
import {
	createStyles,
	Header,
	Group,
	Button,
	ActionIcon,
	Modal,
} from '@mantine/core';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import { ChartPieIcon, UserIcon } from '@heroicons/react/24/solid';
import ToggleTheme from './ToggleTheme';
import { useSession } from 'next-auth/react';
import { NextLink } from '@mantine/next';
import { useMediaQuery } from '@mantine/hooks';
import React, { useState } from 'react';

const useStyles = createStyles((theme) => ({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
	},
	theme: {
		backgroundColor: theme.colors.blue[8],
		color: theme.colors.white,
	},
}));

export function NavbarComponent() {
	const [open, setOpen] = useState(false);
	const matches = useMediaQuery('(min-width: 600px)');
	const { classes } = useStyles();

	return (
		<Header height='xl' mb='xl' px='sm'>
			<Group className={classes.header} position='apart' spacing={36}>
				<Link href='/'>
					<h2>{matches ? 'PomoTimer' : 'PT'}</h2>
				</Link>

				<Group spacing={matches ? 'xs' : 'xl'}>
					<Modal opened={open} title='Report' onClose={() => setOpen(false)}>
						<p>Reports</p>
					</Modal>
					<Button
						leftIcon={matches && <ChartPieIcon width={20} />}
						onClick={() => setOpen(true)}>
						{matches ? 'Report' : <ChartPieIcon width={20} />}
					</Button>

					<SettingsModal matches={matches} />

					<Profile matches={matches} />

					<ToggleTheme />
				</Group>
			</Group>
		</Header>
	);
}

const Profile = ({ matches }: { matches: boolean }) => {
	const { data: session } = useSession();
	const { classes } = useStyles();

	return session ? (
		<ProfileDropdown />
	) : matches ? (
		<Button
			leftIcon={<UserIcon width={18} />}
			component={NextLink}
			href='/login'
			className={classes.theme}>
			Login
		</Button>
	) : (
		<ActionIcon
			component={NextLink}
			size='lg'
			href='/login'
			className={classes.theme}>
			<UserIcon width={20} color='white' />
		</ActionIcon>
	);
};

const Navbar = React.memo(NavbarComponent);
export default Navbar;
