import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Menu, UnstyledButton } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useTimerStore } from '../../pages';
import { trpc } from '../../utils/trpc';

export function TasksMenu() {
	const { data: session } = useSession();
	const ctx = trpc.useContext();
	const delteTasks = trpc.time.deleteTasks.useMutation({
		onSuccess: () => ctx.time.getTasks.invalidate(),
	});

	return (
		<Menu transition='pop-top-right' position='bottom-end' width={220}>
			<Menu.Target>
				<UnstyledButton>
					<EllipsisVerticalIcon width={28} />
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item
					icon={<TrashIcon width={16} />}
					onClick={() => {
						const tasks = useTimerStore.getState().tasks;
						useTimerStore.setState({
							tasks: tasks.filter((t) => (t.done ? t : false)),
						});
						if (session) {
							delteTasks.mutate({
								userId: String(session?.user?.id),
								done: true,
							});
						}
					}}>
					Clear finished tasks
				</Menu.Item>
				<Menu.Item
					icon={<TrashIcon width={16} />}
					onClick={() => {
						useTimerStore.setState({ tasks: [] });
						if (session) {
							delteTasks.mutate({
								userId: String(session?.user?.id),
								done: false,
							});
						}
					}}>
					Delete All Tasks
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
