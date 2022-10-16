import React, { useRef, useState } from 'react';
import {
	Divider,
	Group,
	Button,
	Text,
	Modal,
	TextInput,
	ActionIcon,
	NumberInput,
	NumberInputHandlers,
	Autocomplete,
	Anchor,
	Collapse,
} from '@mantine/core';

interface ModalProps {
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AddTaskModal = ({ opened, setOpened }: ModalProps) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(0);
	const handlers = useRef<NumberInputHandlers>();

	return (
		<Modal title='Add Task' opened={opened} onClose={() => setOpened(false)}>
			<Divider size='md' />
			<TextInput my='lg' placeholder='What are you working on?' />

			<Group position='apart' align='center' mb='lg'>
				<Text weight={900}>Est Pomodoros</Text>
				<Group spacing={5}>
					<ActionIcon
						size={42}
						variant='default'
						onClick={() => handlers?.current?.decrement()}>
						–
					</ActionIcon>

					<NumberInput
						hideControls
						value={value}
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						onChange={(val) => setValue(val!)}
						handlersRef={handlers}
						min={1}
						styles={{ input: { width: 54, textAlign: 'center', height: 42 } }}
					/>

					<ActionIcon
						size={42}
						variant='default'
						onClick={() => handlers?.current?.increment()}>
						+
					</ActionIcon>
				</Group>
			</Group>

			<Anchor type='button' component='button' onClick={() => setOpen(!open)}>
				+ Add Project
			</Anchor>

			<Collapse in={open}>
				<Autocomplete placeholder='Project' data={[]} />
			</Collapse>

			<Group position='right' mt='lg'>
				<Button onClick={() => setOpened(false)}>Add</Button>
			</Group>
		</Modal>
	);
};
