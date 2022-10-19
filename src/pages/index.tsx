/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Timer from '../components/Timer/Timer';
import type { NextPage } from 'next';
import { Center, Container, Loader } from '@mantine/core';
import Navbar from '../components/Navbar/Navbar';
import create from 'zustand';
import Tasks from '../components/Tasks/Tasks';
import { useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';

interface Time {
	pomodoro: number;
	short: number;
	long: number;
}

interface TimerState {
	pomodoro: number;
	short: number;
	long: number;
	time: Time;
	changePomodoro: (newValue: number) => void;
	changeShort: (newValue: number) => void;
	changeLong: (newValue: number) => void;
	changeTime: (newValue: Time) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useTimerStore = create<TimerState>()((set, get) => ({
	pomodoro: 25,
	short: 5,
	long: 10,
	time: {
		pomodoro: 25,
		short: 5,
		long: 10,
	},

	changePomodoro: (newValue) => {
		set({ pomodoro: newValue });
	},

	changeShort: (newValue) => {
		set({ short: newValue });
	},

	changeLong: (newValue) => {
		set({ long: newValue });
	},

	changeTime: (newValue) => {
		set({ time: newValue });
	},
}));

const Home: NextPage = () => {
	const { data: session } = useSession();
	const time = trpc.time.getTime.useQuery({ userId: session?.user?.id || '' });

	if (time.isLoading)
		return (
			<Center
				style={{
					height: '100vh',
					width: '100vw',
				}}>
				<Loader size='lg' />
			</Center>
		);

	if (time?.data?.pomodoro) {
		useTimerStore.setState({ time: time?.data });
		// useTimerStore.setState({ pomodoro: time!.data!.pomodoro });
		// useTimerStore.setState({ short: time!.data!.short });
		// useTimerStore.setState({ long: time!.data!.long });
	}
	console.log(time.data);

	return (
		<>
			<Center>
				<Container size='xl' px='sm'>
					<Navbar />
					<Timer />
					<Tasks />
				</Container>
			</Center>
		</>
	);
};

export default Home;
