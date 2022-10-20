/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Timer from '../components/Timer/Timer';
import type { NextPage } from 'next';
import { Center, Container, Loader } from '@mantine/core';
import Navbar from '../components/Navbar/Navbar';
import Tasks from '../components/Tasks/Tasks';
import { useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
	const { data: session } = useSession();
	const time = trpc.time.getTime.useQuery({ userId: session?.user?.id || '' });
	const tasks = trpc.time.getTasks.useQuery({
		userId: session?.user?.id || '',
	});

	if (time.isLoading || tasks.isLoading || !time.data)
		return (
			<Center
				style={{
					height: '100vh',
					width: '100vw',
				}}>
				<Loader size='lg' />
			</Center>
		);

	return (
		<Center>
			<Container size='xl' px='sm'>
				<Navbar time={time.data} />
				<Timer />
				<Tasks />
			</Container>
		</Center>
	);
};

export default Home;
