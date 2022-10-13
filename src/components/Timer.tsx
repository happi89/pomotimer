/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import {
	Paper,
	Stack,
	Tabs,
	Title,
	Button,
	PaperProps,
	TabsValue,
} from '@mantine/core';
import { useTimerStore } from '../pages';
import shallow from 'zustand/shallow';
import React, { useEffect, useRef, useState } from 'react';
import { useInterval } from '@mantine/hooks';

export function TimerComponent(props: PaperProps) {
	const [isPaused, setIsPaused] = useState(true);
	const [activeTab, setActiveTab] = useState<string | null>('pomodoro');
	const [secondsLeft, setSecondsLeft] = useState(0);

	const secondsLeftRef = useRef(secondsLeft);
	const isPausedRef = useRef(isPaused);

	const { pomodoro, short, long } = useTimerStore(
		(state) => ({
			pomodoro: state.pomodoro,
			short: state.short,
			long: state.long,
		}),
		shallow
	);

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
		const tab = time.find((t) => t.label === activeTab);
		secondsLeftRef.current = tab!.minuteValue * 60;
		setSecondsLeft(secondsLeftRef.current);
		interval.start();
		return interval.stop;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

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
		<Paper radius='sm' p='xl' shadow='xs' withBorder {...props}>
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

					{time.map((t, i) => {
						return (
							<Tabs.Panel value={t.label} pt='xs' key={i}>
								<Stack align='center'>
									<Title
										order={1}
										sx={{
											fontSize: '4rem',
										}}>
										{Math.floor(secondsLeft / 60)}:
										{secondsLeft % 60 < 10
											? `0${secondsLeft % 60}`
											: secondsLeft % 60}
									</Title>
									<Button
										size='xl'
										rightIcon={
											isPaused ? (
												<PlayIcon width={24} />
											) : (
												<PauseIcon width={24} />
											)
										}
										onClick={switchPaused}>
										{isPaused ? 'START' : 'STOP'}
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
