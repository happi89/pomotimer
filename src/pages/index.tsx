/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Timer from '../components/Timer/Timer';
import type { NextPage } from 'next';
import { Center, Container, Loader } from '@mantine/core';
import Navbar from '../components/Navbar/Navbar';
import Tasks from '../components/Tasks/Tasks';
import { useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Task } from '@prisma/client';
import { useLocalStorage } from '@mantine/hooks';

interface Time {
	pomodoro: number;
	short: number;
	long: number;
}

interface TimerState {
	time: Time;
	tasks: Omit<Task, 'userId'>[];
	changeTime: (newValue: Time) => void;
	addTask: (task: Omit<Task, 'userId'>) => void;
}

export const useTimerStore = create<TimerState>()(
	subscribeWithSelector((set, get) => ({
		time: {
			pomodoro: 25,
			short: 5,
			long: 10,
		},

		tasks: [],

		changeTime: (newValue) => {
			set({ time: newValue });
		},

		addTask: (newTask) => {
			const tasks = get().tasks;
			const exits = tasks.find((t) => t.id === newTask.id);
			if (exits) {
				set((state) => ({
					tasks: state.tasks.map((t) =>
						t.id === exits.id ? (t = newTask) : t
					),
				}));
			} else {
				set((state) => ({
					tasks: [...state.tasks, newTask],
				}));
			}
		},
	}))
);

const Home: NextPage = () => {
	const { data: session } = useSession();
	const time = trpc.time.getTime.useQuery({ userId: session?.user?.id || '' });
	const tasks = trpc.time.getTasks.useQuery({
		userId: session?.user?.id || '',
	});

	const [timerStorage, setTimerStorage] = useLocalStorage({
		key: 'time',
		defaultValue: useTimerStore.getState().time,
	});

	const [tasksStorage, setTasksStorage] = useLocalStorage({
		key: 'tasks',
		defaultValue: useTimerStore.getState().tasks,
	});

	useTimerStore.subscribe(
		(state) => state.time,
		(time) => setTimerStorage(time),
	);

	useTimerStore.subscribe(
		(state) => state.tasks,
		(tasks) => setTasksStorage(tasks),
	);

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

	if (time?.data) {
		useTimerStore.setState({ time: time?.data });
		useTimerStore.setState({ tasks: tasks?.data });
	} else {
		useTimerStore.setState({ time: timerStorage });
		useTimerStore.setState({ tasks: tasksStorage });
	}

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
