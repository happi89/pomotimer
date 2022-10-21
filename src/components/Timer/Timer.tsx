import TimerTabs from './TimerTabs';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Paper, Stack, Tabs, TabsValue, Text } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { useInterval } from '@mantine/hooks';
import Head from 'next/head';
import { useTimerStore } from '../../pages';

export function TimerComponent() {
	const time = useTimerStore((state) => state.time);
	const [isPaused, setIsPaused] = useState(true);
	const [activeTab, setActiveTab] = useState<string | null>('pomodoro');
	const [secondsLeft, setSecondsLeft] = useState(0);

	const secondsLeftRef = useRef(secondsLeft);
	const isPausedRef = useRef(isPaused);

	const times = [
		{
			label: 'pomodoro',
			minuteValue: time?.pomodoro,
		},
		{
			label: 'short',
			minuteValue: time?.short,
		},
		{
			label: 'long',
			minuteValue: time?.long,
		},
	];

	const interval = useInterval(() => {
		if (isPausedRef.current) {
			return;
		}
		if (secondsLeftRef.current === 0) {
			return setActiveTab('short');
		}

		secondsLeftRef.current--;
		setSecondsLeft(secondsLeftRef.current);
	}, 1000);

	useEffect(() => {
		const tab = times.find((t) => t.label === activeTab);
		// if (tab!.minuteValue * 60 < 1 && Notification.permission === 'granted') {
		// 	new Notification('time is up');
		// }
		secondsLeftRef.current = tab!.minuteValue * 60;
		setSecondsLeft(secondsLeftRef.current);
		interval.start();
		return interval.stop;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab, time]);

	const switchPaused = () => {
		setIsPaused(!isPaused);
		isPausedRef.current = !isPaused;
	};

	const onTabChange = (value: TabsValue) => {
		if (
			!isPausedRef.current &&
			window.confirm(
				'The timer is still running, are you sure you want to switch?'
			)
		) {
			switchPaused();
		}
		setActiveTab(value);
	};

	return (
		<>
			<Head>
				<title>
					{`${Math.floor(secondsLeft / 60)}:${
						secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60
					}`}
				</title>
			</Head>
			<Paper radius='sm' p='xl' shadow='xs' withBorder>
				<Stack align='center'>
					<Tabs
						keepMounted={false}
						value={activeTab}
						onTabChange={(value) => {
							onTabChange(value);
						}}>
						<Tabs.List mb='sm'>
							<Tabs.Tab value='pomodoro'>Pomodoro</Tabs.Tab>
							<Tabs.Tab value='short'>Short Break</Tabs.Tab>
							<Tabs.Tab value='long'>Long Break</Tabs.Tab>
						</Tabs.List>

						{times.map((t, i) => {
							return (
								<TimerTabs
									t={t}
									key={i}
									secondsLeft={secondsLeft}
									isPaused={isPaused}
									switchPaused={switchPaused}
								/>
							);
						})}
						<Text align='center' size='lg' mt='md' weight={700}>
							{activeTab === 'pomodoro' ? 'Time to Focus!' : 'Time for Break!'}
						</Text>
					</Tabs>
				</Stack>
			</Paper>
		</>
	);
}
const Timer = React.memo(TimerComponent);
export default Timer;
