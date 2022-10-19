import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Button, Grid, NumberInput, Modal } from '@mantine/core';
import { useTimerStore } from '../../pages';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';

export default function SettingsModal({ matches }: { matches: boolean }) {
	const { data: session } = useSession();
	const [open, setOpen] = useState(false);
	const state = useTimerStore();

	const [pomodoroState, setPomodoroState] = useState(state.time.pomodoro);
	const [shortState, setShortState] = useState(state.time.short);
	const [longState, setLongState] = useState(state.time.long);

	const changeTime = trpc.time.upsertTime.useMutation({
		onMutate: () => {
			state.changeTime({
				pomodoro: pomodoroState,
				short: shortState,
				long: longState,
			});
			// state.changePomodoro(pomodoroState);
			// state.changeShort(shortState);
			// state.changeLong(longState);
		},
	});

	const inputs = [
		{
			label: 'Pomodoro',
			value: state.time.pomodoro,
			onChange: setPomodoroState,
		},
		{
			label: 'Short Break',
			value: state.time.short,
			onChange: setShortState,
		},
		{
			label: 'Long Break',
			value: state.time.long,
			onChange: setLongState,
		},
	];

	return (
		<>
			<Modal
				title='Timer Settings'
				opened={open}
				onClose={() => setOpen(false)}>
				<h4>Time (minutes)</h4>
				<Grid mb='xl'>
					{inputs.map((input, i) => {
						return (
							<Grid.Col span={4} key={i}>
								<NumberInput
									label={input.label}
									min={1}
									stepHoldDelay={500}
									stepHoldInterval={100}
									value={input.value}
									onChange={(value) =>
										// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
										input.onChange(value!)
									}
								/>
							</Grid.Col>
						);
					})}
					<Button
						uppercase
						ml='auto'
						mt='md'
						mr='xs'
						onClick={() => {
							if (session) {
								changeTime.mutate({
									// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
									userId: session!.user!.id,
									pomodoro: pomodoroState,
									short: shortState,
									long: longState,
								});
							}
							setOpen(false);
						}}>
						Save
					</Button>
				</Grid>
			</Modal>
			<Button
				leftIcon={matches && <Cog6ToothIcon width={18} />}
				onClick={() => setOpen(true)}>
				{matches ? 'Settings' : <Cog6ToothIcon width={20} />}
			</Button>
		</>
	);
}
