import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Button, Grid, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Modal from './Modal';
import { useTimerStore } from '../pages';
import { closeAllModals } from '@mantine/modals';

export default function SettingsModal({ matches }: { matches: boolean }) {
	const { pomodoro, short, long } = useTimerStore((state) => state.time);
	const changeTimer = useTimerStore((state) => state.changeTimer);
	const form = useForm({
		initialValues: {
			pomodoro: pomodoro,
			short: short,
			long: long,
		},
	});

	const inputs = [
		{
			label: 'Pomodoro',
			name: 'pomodoro',
		},
		{
			label: 'Short Break',
			name: 'short',
		},
		{
			label: 'Long Break',
			name: 'long',
		},
	];

	console.log(form.values, 'form values');

	return (
		<Modal
			title='Timer Settings'
			openButton={matches ? 'Settings' : <Cog6ToothIcon width={20} />}
			leftIcon={<Cog6ToothIcon width={18} />}>
			<h4>Time (minutes)</h4>
			<form
				onSubmit={form.onSubmit((values) => {
					console.log(values, 'onsubmit values');
					// closeAllModals();
				})}>
				<Grid mb='xl'>
					{inputs.map((input, i) => {
						return (
							<Grid.Col span={4} key={i}>
								<NumberInput
									label={input.label}
									min={1}
									stepHoldDelay={500}
									stepHoldInterval={100}
									{...form.getInputProps(input.name)}
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
