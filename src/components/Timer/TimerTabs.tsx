import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { Tabs, Stack, Title, Button } from '@mantine/core';
import React from 'react';

interface Props {
	t: { label: string; minuteValue: number };
	secondsLeft: number;
	isPaused: boolean;
	switchPaused: () => void;
}

function TimerTabsComponent({ t, secondsLeft, isPaused, switchPaused }: Props) {
	return (
		<Tabs.Panel value={t.label} pt='xs'>
			<Stack align='center'>
				<Title
					order={1}
					sx={{
						fontSize: '4rem',
					}}>
					{Math.floor(secondsLeft / 60)}:
					{secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60}
				</Title>
				<Button
					size='xl'
					rightIcon={
						isPaused ? <PlayIcon width={24} /> : <PauseIcon width={24} />
					}
					onClick={switchPaused}>
					{isPaused ? 'START' : 'STOP'}
				</Button>
			</Stack>
		</Tabs.Panel>
	);
}

const TimerTabs = React.memo(TimerTabsComponent);
export default TimerTabs;
