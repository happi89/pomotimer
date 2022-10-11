import { ActionIcon } from '@mantine/core';

interface Props {
	icon: React.ReactNode;
}

const ThemeIcon = (props: Props) => {
	return (
		<ActionIcon
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
			{props.icon}
		</ActionIcon>
	);
};

export default ThemeIcon;
