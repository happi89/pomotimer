import { Button, Menu, Divider, Text } from '@mantine/core';
import {
	TrashIcon,
	ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ButtonMenu() {
	const { data: session } = useSession();

	return (
		<Menu transition='pop-top-right' position='bottom-end' width={220}>
			<Menu.Target>
				<Button leftIcon={<UserIcon width={18} />}>
					{session?.user?.name}
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item icon={<UserIcon width={18} />}>
					<Link href='/profile'>
						<Text>Profile</Text>
					</Link>
				</Menu.Item>

				<Menu.Item
					icon={<ArrowRightOnRectangleIcon width={18} />}
					onClick={() => signOut()}>
					Logout
				</Menu.Item>

				<Divider my='xs' />

				<Menu.Item
					icon={<TrashIcon width={16} />}
					onClick={() =>
						window.confirm(
							'Are you sure you want to delete your account? This operation can not be undone.'
						)
					}>
					Delete Account
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
