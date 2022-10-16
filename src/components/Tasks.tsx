import React, { useState } from 'react';
import {
	Stack,
	Title,
	Divider,
	Group,
	Button,
	Text,
	Modal,
} from '@mantine/core';
import {
	EllipsisVerticalIcon,
	PlusCircleIcon,
} from '@heroicons/react/24/solid';

const Task = () => {
	const [opened, setOpened] = useState(false);
	return (
		<Stack mt='xl'>
			<Group position='apart' align='center'>
				<Title>Tasks</Title>
				<EllipsisVerticalIcon width={28} />
			</Group>
			<Divider size='md' />

			<AddTaskModal opened={opened} setOpened={setOpened} />

			<Button
				size='xl'
				leftIcon={<PlusCircleIcon width={24} />}
				onClick={() => setOpened(true)}>
				<Text size='xl'>Add Task</Text>
			</Button>
		</Stack>
	);
};

interface ModalProps {
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTaskModal = ({ opened, setOpened }: ModalProps) => (
	<Modal title='Add Task' opened={opened} onClose={() => setOpened(false)}>
		<Divider size='md' />
		<p>hello</p>
		<Button fullWidth onClick={() => setOpened(false)}>
			Add
		</Button>
	</Modal>
);

export default React.memo(Task);
