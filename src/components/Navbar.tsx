import { createStyles, Header, Container, Group } from '@mantine/core';
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

const useStyles = createStyles(() => ({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
	},
}));

export default function Navbar() {
	const { classes } = useStyles();
	const { data: session } = useSession();

	return (
		<Header height={60} mb={60} mt={10}>
			<Container className={classes.header}>
				<Link href='/'>
					<h2>PomoTimer</h2>
				</Link>
				<Group>
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
					) : (
						<Modal
							title='Login'
							openButton='Login'
							leftIcon={<UserIcon width={18} />}>
							<p>hello</p>
						</Modal>
					)}

					<ToggleTheme />
				</Group>
			</Container>
		</Header>
	);
}
