import { PlayIcon } from '@heroicons/react/24/solid';
import { Paper, Stack, Tabs, Title, Button, PaperProps } from '@mantine/core';
import { useTimerStore } from '../pages';
import shallow from 'zustand/shallow';
import React, { useEffect, useRef, useState } from 'react';
import { useInterval } from '@mantine/hooks';

export function TimerComponent(props: PaperProps) {
	const { pomodoro, short, long } = useTimerStore(
		(state) => ({
			pomodoro: state.pomodoro,
			short: state.short,
			long: state.long,
		}),
		shallow
	);

	const [secondsLeft, setSecondsLeft] = useState(0);
	const secondsLeftRef = useRef(secondsLeft);

	const interval = useInterval(() => {
		secondsLeftRef.current--;
		setSecondsLeft(secondsLeftRef.current);
	}, 1000);

	useEffect(() => {
		secondsLeftRef.current = pomodoro * 60;
		setSecondsLeft(secondsLeftRef.current);
		interval.start();
		return interval.stop;
	}, []);

	const time = [
		{
			label: 'pomodoro',
			minuteValue: pomodoro,
		},
		{
			label: 'short',
			minuteValue: short,
		},
		{
			label: 'long',
			minuteValue: long,
		},
	];

	return (
		<Paper radius='sm' p='xl' shadow='xs' withBorder {...props}>
			<Stack align='center'>
				<Tabs defaultValue='pomodoro' variant='outline'>
					<Tabs.List>
						<Tabs.Tab value='pomodoro'>Pomodoro</Tabs.Tab>
						<Tabs.Tab value='short'>Short Break</Tabs.Tab>
						<Tabs.Tab value='long'>Long Break</Tabs.Tab>
					</Tabs.List>

					{time.map((t, i) => {
						return (
							<Tabs.Panel value={t.label} pt='xs' key={i}>
								<Stack align='center'>
									<Title
										order={1}
										sx={{
											fontSize: '4rem',
										}}>
										{t.minuteValue}:
										{secondsLeft % 60 < 10
											? `0${secondsLeft % 60}`
											: secondsLeft % 60}
									</Title>
									<Button size='xl' rightIcon={<PlayIcon width={24} />}>
										START
									</Button>
								</Stack>
							</Tabs.Panel>
						);
					})}
				</Tabs>
			</Stack>
		</Paper>
	);
}
const Timer = React.memo(TimerComponent);
export default Timer;
