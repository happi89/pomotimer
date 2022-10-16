import { Group, useMantineColorScheme, ActionIcon } from '@mantine/core';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function ToggleTheme() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<Group position='center' my='xl'>
			<ActionIcon
				onClick={() => toggleColorScheme()}
				size='lg'
				sx={(theme) => ({
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[6]
							: theme.colors.gray[0],
					color:
						theme.colorScheme === 'dark'
							? theme.colors.yellow[4]
							: theme.colors.blue[6],
				})}>
				{colorScheme === 'dark' ? (
					<SunIcon width={20} />
				) : (
					<MoonIcon width={20} />
				)}
			</ActionIcon>
		</Group>
	);
}
