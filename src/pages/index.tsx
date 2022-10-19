/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Timer from '../components/Timer/Timer';
import type { NextPage } from 'next';
import { Center, Container, Loader } from '@mantine/core';
import Navbar from '../components/Navbar/Navbar';
import create from 'zustand';
import Tasks from '../components/Tasks/Tasks';
import { useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import { Task } from '@prisma/client';

interface Time {
	pomodoro: number;
	short: number;
	long: number;
}

interface TimerState {
	time: Time;
	tasks: Task[];
	changeTime: (newValue: Time) => void;
	addTasks: (tasks: Task[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useTimerStore = create<TimerState>()((set, get) => ({
	time: {
		pomodoro: 25,
		short: 5,
		long: 10,
	},

	tasks: [],

	changeTime: (newValue: Time) => {
		set({ time: newValue });
	},

	addTasks: (tasks: Task[]) => {
		set({ tasks: tasks });
	},
}));

const Home: NextPage = () => {
	const { data: session } = useSession();
	const time = trpc.time.getTime.useQuery({ userId: session?.user?.id || '' });
	const tasks = trpc.time.getTasks.useQuery({
		userId: session?.user?.id || '',
	});

	if (time.isLoading || tasks.isLoading)
		return (
			<Center
				style={{
					height: '100vh',
					width: '100vw',
				}}>
				<Loader size='lg' />
			</Center>
		);

	if (session?.user && time?.data?.pomodoro && tasks.data) {
		useTimerStore.setState({ time: time?.data });
		useTimerStore.setState({ tasks: tasks?.data });
	}

	const state = useTimerStore.getState();
	console.log(state.tasks);

	return (
		<Center>
			<Container size='xl' px='sm'>
				<Navbar />
				<Timer />
				<Tasks />
			</Container>
		</Center>
	);
};

export default Home;
