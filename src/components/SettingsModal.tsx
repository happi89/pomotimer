import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Button, Grid, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Modal from './Modal';
import { useTimerStore } from '../pages';
import { closeAllModals } from '@mantine/modals';
import { useState } from 'react';

export default function SettingsModal({ matches }: { matches: boolean }) {
	const { pomodoro, short, long } = useTimerStore((state) => state.time);
	const changeTimer = useTimerStore((state) => state.changeTimer);
	// const form = useForm({
	// 	initialValues: {
	// 		pomodoro: pomodoro,
	// 		short: short,
	// 		long: long,
	// 	},
	// });

	const inputs = [
		{
			label: 'Pomodoro',
			name: 'pomodoro',
			value: pomodoro,
			defaultValue: pomodoro,
		},
		{
			label: 'Short Break',
			name: 'short',
			value: short,
			defaultValue: short,
		},
		{
			label: 'Long Break',
			name: 'long',
			value: long,
			defaultValue: long,
		},
	];

	// console.log(form.values, 'form values');
	// form.onSubmit((values) => {
	// 	console.log(values, 'onsubmit values');
	// 	// closeAllModals();
	// });

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
									onChange={(value) => changeTimer(value || input.defaultValue)}
									// {...form.getInputProps(input.name)}
								/>
							</Grid.Col>
						);
					})}
					<Button type='submit' ml='auto' mt='md' mr='xs'>
						SAVE
					</Button>
				</Grid>
			</form>
		</Modal>
	);
}
