import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Menu, UnstyledButton } from '@mantine/core';

export function TasksMenu() {
	return (
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
				<Menu.Item icon={<TrashIcon width={16} />}>Delete All Tasks</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
