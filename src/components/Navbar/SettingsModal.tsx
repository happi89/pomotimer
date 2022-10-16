import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Button, Grid, NumberInput, Modal } from '@mantine/core';
import { useTimerStore } from '../../pages';
import shallow from 'zustand/shallow';
import { useState } from 'react';

export default function SettingsModal({ matches }: { matches: boolean }) {
	const [open, setOpen] = useState(false);
	const { pomodoro, short, long } = useTimerStore(
		(state) => ({
			pomodoro: state.pomodoro,
			short: state.short,
			long: state.long,
		}),
		shallow
	);

	const { changePomodoro, changeShort, changeLong } = useTimerStore(
		(state) => ({
			changePomodoro: state.changePomodoro,
			changeShort: state.changeShort,
			changeLong: state.changeLong,
		}),
		shallow
	);

	const inputs = [
		{
			label: 'Pomodoro',
			value: pomodoro,
			onChange: changePomodoro,
		},
		{
			label: 'Short Break',
			value: short,
			onChange: changeShort,
		},
		{
			label: 'Long Break',
			value: long,
			onChange: changeLong,
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
					<Button ml='auto' mt='md' mr='xs' onClick={() => setOpen(false)}>
						CLOSE
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
