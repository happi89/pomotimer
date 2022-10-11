import { createStyles, Header, Group, Button, ActionIcon } from '@mantine/core';
import Link from 'next/link';
import ProfileButton from '../components/ProfileButton';
import Modal from '../components/Modal';
import {
	Cog6ToothIcon,
	ChartPieIcon,
	UserIcon,
} from '@heroicons/react/24/solid';
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
}));

export default function Navbar() {
	const matches = useMediaQuery('(min-width: 576px)');
	const { classes } = useStyles();
	const { data: session } = useSession();

	return (
		<Header height='xl' mb='xl'>
			<Group className={classes.header} position='apart' spacing={36}>
				<Link href='/'>
					<h2>PomoTimer</h2>
				</Link>

				<Group spacing='xs'>
					<Modal
						title='Report'
						openButton='Report'
						leftIcon={<ChartPieIcon width={18} />}>
						<p>Reports</p>
					</Modal>

					<Modal
						title='Timer Settings'
						openButton='Settings'
						closeButton='Save'
						leftIcon={<Cog6ToothIcon width={18} />}>
						<p>hello</p>
					</Modal>

					{session ? (
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
							sx={(theme) => ({
								backgroundColor:
									theme.colorScheme === 'dark'
										? theme.colors.dark[6]
										: theme.colors.gray[0],
								color:
									theme.colorScheme === 'dark'
										? theme.colors.yellow[4]
										: theme.colors.blue[6],
							})}>
							<UserIcon width={20} />
						</ActionIcon>
					)}
					<ToggleTheme />
				</Group>
			</Group>
		</Header>
	);
}
