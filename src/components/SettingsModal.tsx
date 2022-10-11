import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Grid, NumberInput } from '@mantine/core';
import { useRef } from 'react';
import Modal from './Modal';

export default function SettingsModal({ matches }: { matches: boolean }) {
	const pomoRef = useRef<HTMLInputElement>(null);
	const shortRef = useRef<HTMLInputElement>(null);
	const longRef = useRef<HTMLInputElement>(null);

	const inputs = [
		{
			label: 'Pomodoro',
			ref: pomoRef,
			defaultValue: 25,
		},
		{
			label: 'Short Break',
			ref: shortRef,
			defaultValue: 5,
		},
		{
			label: 'Long Break',
			ref: longRef,
			defaultValue: 10,
		},
	];

	return (
		<Modal
			title='Timer Settings'
			openButton={matches ? 'Settings' : <Cog6ToothIcon width={20} />}
			closeButton='Save'
			leftIcon={<Cog6ToothIcon width={18} />}>
			<h4>Time (minutes)</h4>
			<Grid mb='xl'>
				{inputs.map((input, i) => {
					return (
						<Grid.Col span={4} key={i}>
							<NumberInput
								label={input.label}
								defaultValue={input.defaultValue}
								ref={input.ref}
								min={1}
								stepHoldDelay={500}
								stepHoldInterval={100}
							/>
						</Grid.Col>
					);
				})}
			</Grid>
		</Modal>
	);
}
