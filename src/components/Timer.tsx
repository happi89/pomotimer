import { PlayIcon } from '@heroicons/react/24/solid';
import { Paper, Stack, Tabs, Title, Button, PaperProps } from '@mantine/core';
import { useTimerStore } from '../pages';
import shallow from 'zustand/shallow';

export default function Timer(props: PaperProps) {
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
			value: pomodoro,
		},
		{
			label: 'short',
			value: short,
		},
		{
			label: 'long',
			value: long,
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
										{t.value}:00
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
