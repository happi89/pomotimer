import SettingsModal from './SettingsModal';
import { createStyles, Header, Group, Button, ActionIcon } from '@mantine/core';
import Link from 'next/link';
import ProfileButton from '../components/ProfileButton';
import Modal from '../components/Modal';
import { ChartPieIcon, UserIcon } from '@heroicons/react/24/solid';
import ToggleTheme from './ToggleTheme';
import { useSession } from 'next-auth/react';
import { NextLink } from '@mantine/next';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
	},
	modal: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},
	theme: {
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[6]
				: theme.colors.gray[0],
		color:
			theme.colorScheme === 'dark'
				? theme.colors.yellow[4]
				: theme.colors.blue[6],
	},
}));

export default function Navbar() {
	const matches = useMediaQuery('(min-width: 576px)');
	const { classes } = useStyles();
	const { data: session } = useSession();

	const profile = () => {
		return session ? (
			<ProfileButton />
		) : matches ? (
			<Button
				leftIcon={<UserIcon width={18} />}
				component={NextLink}
				href='/login'>
				Login
			</Button>
		) : (
			<ActionIcon
				component={NextLink}
				size='lg'
				href='/login'
				className={classes.theme}>
				<UserIcon width={20} />
			</ActionIcon>
		);
	};

	return (
		<Header height='xl' mb='xl' px='sm'>
			<Group className={classes.header} position='apart' spacing={36}>
				<Link href='/'>
					<h2>PomoTimer</h2>
				</Link>

				<Group spacing={matches ? 'xs' : 'xl'}>
					<Modal
						title='Report'
						openButton={matches ? 'Report' : <ChartPieIcon width={20} />}
						leftIcon={<ChartPieIcon width={18} />}>
						<p>Reports</p>
					</Modal>

					<SettingsModal matches={matches} />

					{profile()}

					<ToggleTheme />
				</Group>
			</Group>
		</Header>
	);
}
