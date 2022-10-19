import { TasksMenu } from './TasksMenu';
import React, { useState } from 'react';
import {
	Stack,
	Title,
	Divider,
	Group,
	Button,
	Text,
	Collapse,
} from '@mantine/core';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { AddTaskForm } from './AddTaskForm';
import { useTimerStore } from '../../pages';

const Tasks = () => {
	const [opened, setOpened] = useState(false);
	const tasks = useTimerStore((state) => state.tasks);
	return (
		<Stack mt='xl'>
			<Group position='apart' align='center'>
				<Title>Tasks</Title>
				<TasksMenu />
			</Group>
			<Divider size='md' mb='sm' />

			{tasks?.map((t, i) => {
				return <Text key={i}>{t.task}</Text>;
			})}

			<Collapse in={opened} transitionDuration={100}>
				<AddTaskForm opened={opened} setOpened={setOpened} />
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
