import { PlayIcon } from '@heroicons/react/24/solid';
import { Paper, Stack, Tabs, Title, Button, PaperProps } from '@mantine/core';
import { useTimerStore } from '../pages';

export default function Timer(props: PaperProps) {
	const { pomodoro, short, long } = useTimerStore((state) => state.time);
	console.log(pomodoro, short, long, 'timer values');
	return (
		<Paper radius='sm' p='xl' shadow='xs' withBorder {...props}>
			<Stack align='center'>
				<Tabs defaultValue='pomodoro' variant='outline'>
					<Tabs.List>
						<Tabs.Tab value='pomodoro'>Pomodoro</Tabs.Tab>
						<Tabs.Tab value='short-break'>Short Break</Tabs.Tab>
						<Tabs.Tab value='long-break'>Long Break</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value='pomodoro' pt='xs'>
						<Stack align='center'>
							<Title
								order={1}
								sx={{
									fontSize: '4rem',
								}}>
								{pomodoro}:00
							</Title>
							<Button size='xl' rightIcon={<PlayIcon width={24} />}>
								START
							</Button>
						</Stack>
					</Tabs.Panel>

					<Tabs.Panel value='short-break' pt='xs'>
						<Stack align='center'>
							<Title
								order={1}
								sx={{
									fontSize: '4rem',
								}}>
								{short}:00
							</Title>
							<Button size='xl' rightIcon={<PlayIcon width={24} />}>
								START
							</Button>
						</Stack>
					</Tabs.Panel>

					<Tabs.Panel value='long-break' pt='xs'>
						<Stack align='center'>
							<Title
								order={1}
								sx={{
									fontSize: '4rem',
								}}>
								{long}:00
							</Title>
							<Button size='xl' rightIcon={<PlayIcon width={24} />}>
								START
							</Button>
						</Stack>
					</Tabs.Panel>
				</Tabs>
			</Stack>
		</Paper>
	);
}
