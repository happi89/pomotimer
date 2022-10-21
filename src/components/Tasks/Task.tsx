import { PencilSquareIcon } from '@heroicons/react/24/outline';
import {
	UnstyledButton,
	Divider,
	Group,
	Text,
	Collapse,
	Checkbox,
} from '@mantine/core';
import { Task } from '@prisma/client';
import { useState } from 'react';
import { AddTaskForm } from './AddTaskForm';
import { trpc } from '../../utils/trpc';

export function Task({
	task,
	tasksLength,
}: {
	task: Omit<Task, 'userId' | 'createdAt'>;
	tasksLength: number;
}) {
	const [open, setOpen] = useState(false);
	const [checked, setChecked] = useState(task?.done || false);

	const ctx = trpc.useContext();
	const done = trpc.time.done.useMutation({
		onMutate: () => {
			ctx.time.getTasks.cancel();
			const prevTask = ctx.time.getTasks.getData();
			ctx.time.getTasks.setData(prevTask);
		},
		onSettled: () => {
			ctx.time.getTasks.invalidate();
		},
	});

	return (
		<>
			<Group p='xs' position='apart'>
				<Group>
					<Checkbox
						size='lg'
						radius='md'
						checked={checked}
						onChange={({ currentTarget }) => {
							setChecked(currentTarget.checked);
							done.mutate({
								taskId: task.id,
								done: !checked,
							});
						}}
					/>
					<Text size='lg' weight={700}>
						{task.task}
					</Text>
				</Group>
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
