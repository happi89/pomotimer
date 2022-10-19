import Timer from '../components/Timer/Timer';
import type { NextPage } from 'next';
import { Center, Container } from '@mantine/core';
import Navbar from '../components/Navbar/Navbar';
import create from 'zustand';
import Tasks from '../components/Tasks/Tasks';

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
