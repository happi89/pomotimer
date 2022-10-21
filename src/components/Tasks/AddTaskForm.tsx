import React, { useRef, useState } from 'react';
import {
	Group,
	Button,
	Text,
	TextInput,
	ActionIcon,
	NumberInput,
	NumberInputHandlers,
	Autocomplete,
	Anchor,
	Collapse,
} from '@mantine/core';
import { useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';
import { useId, useInputState } from '@mantine/hooks';
import { Task } from '@prisma/client';
import { useTimerStore } from '../../pages';

interface Props {
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	task?: Task;
}

export const AddTaskForm = ({ opened, setOpened, task }: Props) => {
	const setTasks = useTimerStore((state) => state.addTask);
	const [open, setOpen] = useState(false);
	const uuid = useId();

	const pomodorosRef = useRef<NumberInputHandlers>(null);
	const [pomodoros, setPomodoros] = useState(task ? task.pomodoros : 1);
	const [taskName, setTaskName] = useInputState(task ? task.task : '');
	const [project, setProject] = useInputState(
		task?.project ? task.project : ''
	);

	const { data: session } = useSession();
	const ctx = trpc.useContext();
	const addTask = trpc.time.upsertTask.useMutation({
		onMutate: () => {
			ctx.time.getTasks.cancel();
			const optmisticUpdate = ctx.time.getTasks.getData();
			ctx.time.getTasks.setData(optmisticUpdate);
		},
		onSettled: () => {
			ctx.time.getTasks.invalidate();
		},
	});

	return (
		<>
			<TextInput
				my='lg'
				placeholder='What are you working on?'
				value={taskName}
				onChange={setTaskName}
			/>
			<Group position='apart' align='center' mb='lg'>
				<Text weight={900}>Est Pomodoros</Text>
				<Group spacing={5}>
					<ActionIcon
						size={42}
						variant='default'
						onClick={() => pomodorosRef?.current?.decrement()}>
						–
					</ActionIcon>

					<NumberInput
						hideControls
						value={pomodoros}
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						onChange={(val) => setPomodoros(val!)}
						handlersRef={pomodorosRef}
						min={1}
						styles={{ input: { width: 54, textAlign: 'center', height: 42 } }}
					/>

					<ActionIcon
						size={42}
						variant='default'
						onClick={() => pomodorosRef?.current?.increment()}>
						+
					</ActionIcon>
				</Group>
			</Group>

			<Anchor type='button' component='button' onClick={() => setOpen(!open)}>
				+ Add Project
			</Anchor>

			<Collapse in={open}>
				<Autocomplete
					placeholder='Project'
					data={[]}
					value={project}
					onChange={setProject}
				/>
			</Collapse>

			<Group position='right' mt='lg'>
				<Button
					color='gray'
					onClick={() => {
						setTaskName('');
						setPomodoros(1);
						setProject('');
						setOpened(!opened);
					}}>
					Close
				</Button>
				<Button
					onClick={() => {
						const newTask = {
							id: task ? task?.id : uuid,
							task: taskName,
							pomodoros: pomodoros,
							project: project,
							done: false,
						};

						setTasks(newTask);

						if (session) {
							addTask.mutate(newTask);
						}

						setTaskName('');
						setPomodoros(1);
						setProject('');
						setOpened(!opened);
					}}>
					{task ? 'Save' : 'Add'}
				</Button>
			</Group>
		</>
	);
};
