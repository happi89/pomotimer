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
import { Task } from '@prisma/client';
import { Task as TastItem } from './Task';

const Tasks = ({ tasks }: { tasks?: Task[] }) => {
	const [opened, setOpened] = useState(false);
	return (
		<Stack mt='xl'>
			<Group position='apart' align='center'>
				<Title>Tasks</Title>
				<TasksMenu />
			</Group>
			<Divider size='md' mb='sm' />

			{tasks?.map((t, i) => {
				return <TastItem task={t} key={i} tasksLength={tasks?.length} />;
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
