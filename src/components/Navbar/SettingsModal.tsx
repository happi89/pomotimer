import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Button, Grid, NumberInput, Modal } from '@mantine/core';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';
import { Time } from '@prisma/client';

interface Props {
	matches: boolean;
	time: Pick<Time, 'pomodoro' | 'short' | 'long'>;
}

export default function SettingsModal({ matches, time }: Props) {
	const { data: session } = useSession();
	const [open, setOpen] = useState(false);

	const [pomodoroState, setPomodoroState] = useState(time?.pomodoro);
	const [shortState, setShortState] = useState(time?.short);
	const [longState, setLongState] = useState(time?.long);

	// const ctx = trpc.useContext();
	const changeTime = trpc.time.upsertTime.useMutation({
		// // When mutate is called:
		// onMutate: async (newTodo) => {
		// 	ctx.time.getTime.invalidate()
		// 	const previousTime = ctx.time.getTime.getData
		// 	// ctx.time.getTime.setData((old) => {newTime})
		// 	// queryClient.setQueryData('todos', (old) => [...old, newTodo]);
		// 	// Return a context object with the snapshotted value
		// 	return { previousTime };
		// },
		// // If the mutation fails, use the context returned from onMutate to roll back
		// onError: (err, newTodo, context) => {
		// 	queryClient.setQueryData('todos', context.previousTodos);
		// },
		// // Always refetch after error or success:
		// onSettled: () => {
		// 	queryClient.invalidateQueries('todos');
		// },
	});

	const inputs = [
		{
			label: 'Pomodoro',
			value: time.pomodoro,
			onChange: setPomodoroState,
		},
		{
			label: 'Short Break',
			value: time.short,
			onChange: setShortState,
		},
		{
			label: 'Long Break',
			value: time.long,
			onChange: setLongState,
		},
	];

	return (
		<>
			<Modal
				title='Timer Settings'
				opened={open}
				onClose={() => setOpen(false)}>
				<h4>Time (minutes)</h4>
				<Grid mb='xl'>
					{inputs.map((input, i) => {
						return (
							<Grid.Col span={4} key={i}>
								<NumberInput
									label={input.label}
									min={1}
									stepHoldDelay={500}
									stepHoldInterval={100}
									value={input.value}
									onChange={(value) =>
										// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
										input.onChange(value!)
									}
								/>
							</Grid.Col>
						);
					})}
					<Button
						uppercase
						ml='auto'
						mt='md'
						mr='xs'
						onClick={() => {
							if (session) {
								changeTime.mutate({
									// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
									userId: session!.user!.id,
									pomodoro: pomodoroState,
									short: shortState,
									long: longState,
								});
							}
							setOpen(false);
						}}>
						Save
					</Button>
				</Grid>
			</Modal>
			<Button
				leftIcon={matches && <Cog6ToothIcon width={18} />}
				onClick={() => setOpen(true)}>
				{matches ? 'Settings' : <Cog6ToothIcon width={20} />}
			</Button>
		</>
	);
}
