import React, { useState } from 'react';
import {
	Stack,
	Title,
	Divider,
	Group,
	Button,
	Text,
	Menu,
	UnstyledButton,
	Collapse,
} from '@mantine/core';
import {
	EllipsisVerticalIcon,
	PlusCircleIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import { AddTaskModal } from './AddTaskForm';

const Tasks = () => {
	const [opened, setOpened] = useState(false);
	return (
		<Stack mt='xl'>
			<Group position='apart' align='center'>
				<Title>Tasks</Title>
				<Menu transition='pop-top-right' position='bottom-end' width={220}>
					<Menu.Target>
						<UnstyledButton>
							<EllipsisVerticalIcon width={28} />
						</UnstyledButton>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item icon={<TrashIcon width={16} />}>
							Clear finished tasks
						</Menu.Item>
						<Menu.Item icon={<TrashIcon width={16} />}>
							Delete All Tasks
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Group>
			<Divider size='md' />

			<Collapse in={opened} transitionDuration={50}>
				<AddTaskModal opened={opened} setOpened={setOpened} />
			</Collapse>

			{opened || (
				<Button
					size='xl'
					leftIcon={<PlusCircleIcon width={24} />}
					onClick={() => setOpened(true)}>
					<Text size='xl'>Add Task</Text>
				</Button>
			)}
		</Stack>
	);
};

export default React.memo(Tasks);
