import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Button, Grid, NumberInput } from '@mantine/core';
import Modal from './Modal';
import { useTimerStore } from '../pages';
import shallow from 'zustand/shallow';
import { closeAllModals } from '@mantine/modals';

export default function SettingsModal({ matches }: { matches: boolean }) {
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
			name: 'pomodoro',
			value: pomodoro,
			onChange: changePomodoro,
			defaultValue: pomodoro,
		},
		{
			label: 'Short Break',
			name: 'short',
			value: short,
			onChange: changeShort,
			defaultValue: short,
		},
		{
			label: 'Long Break',
			name: 'long',
			value: long,
			onChange: changeLong,
			defaultValue: long,
		},
	];

	return (
		<Modal
			title='Timer Settings'
			openButton={matches ? 'Settings' : <Cog6ToothIcon width={20} />}
			leftIcon={<Cog6ToothIcon width={18} />}>
			<h4>Time (minutes)</h4>
			<form onSubmit={() => console.log('')}>
				<Grid mb='xl'>
					{inputs.map((input, i) => {
						return (
							<Grid.Col span={4} key={i}>
								<NumberInput
									label={input.label}
									min={1}
									stepHoldDelay={500}
									stepHoldInterval={100}
									defaultValue={input.defaultValue}
									value={input.value}
									onChange={(value) =>
										input.onChange(value || input.defaultValue)
									}
								/>
							</Grid.Col>
						);
					})}
					<Button ml='auto' mt='md' mr='xs' onClick={() => closeAllModals()}>
						SAVE
					</Button>
				</Grid>
			</form>
		</Modal>
	);
}
