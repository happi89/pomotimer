import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { UnstyledButton, Divider, Group, Text, Collapse } from '@mantine/core';
import { Task } from '@prisma/client';
import { useState } from 'react';
import { AddTaskForm } from './AddTaskForm';

export function Task({
	task,
	tasksLength,
}: {
	task: Task;
	tasksLength: number;
}) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Group p='xs' position='apart'>
				<Text size='lg' weight={700}>
					{task.task}
				</Text>
				<UnstyledButton>
					<PencilSquareIcon onClick={() => setOpen(!open)} width={20} />
				</UnstyledButton>
			</Group>
			{tasksLength > 1 && <Divider />}
			<Collapse in={open} transitionDuration={100}>
				<AddTaskForm opened={open} setOpened={setOpen} task={task} />
			</Collapse>
		</>
	);
}
