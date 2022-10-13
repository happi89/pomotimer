import React from 'react';
import { Stack, Title, Divider, Group, Button, Text } from '@mantine/core';
import {
	EllipsisVerticalIcon,
	PlusCircleIcon,
} from '@heroicons/react/24/solid';

const Task = () => {
	return (
		<Stack mt='xl'>
			<Group position='apart' align='center'>
				<Title>Tasks</Title>
				<EllipsisVerticalIcon width={28} />
			</Group>
			<Divider size='md' />
			<Button size='xl' leftIcon={<PlusCircleIcon width={24} />}>
				<Text size='xl'>Add Task</Text>
			</Button>
		</Stack>
	);
};

export default React.memo(Task);
