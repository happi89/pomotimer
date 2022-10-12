import { useForm } from '@mantine/form';
import { signIn, useSession } from 'next-auth/react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';

import {
	TextInput,
	PasswordInput,
	Text,
	Paper,
	Group,
	PaperProps,
	Button,
	Divider,
	Stack,
	Center,
	UnstyledButton,
} from '@mantine/core';
import { NextLink } from '@mantine/next';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

export default function Login(props: PaperProps) {
	const { data: session } = useSession();
	const router = useRouter();
	const form = useForm({
		initialValues: {
			username: 'john-doe',
			password: '123456',
		},

		validate: {
			password: (val) =>
				val.length <= 5
					? 'Password should include at least 6 characters'
					: null,
		},
	});

	if (session) {
		router.push('/');
	}

	return (
		<Paper radius='sm' p='xl' shadow='md' withBorder {...props}>
			<Text size='xl' weight={500} mb='xl'>
				Welcome to PomoTimer, Login with
			</Text>
			<Group grow mb='md' mt='md'>
				<Button
					onClick={() =>
						signIn('google', { callbackUrl: `${window.location.origin}/` })
					}>
					Google
				</Button>
			</Group>
			<Divider
				label='Or continue with DEMO Login'
				labelPosition='center'
				my='xl'
			/>
			<form
				onSubmit={form.onSubmit(async () => {
					const { username, password } = form.values;
					const res = await signIn('john-doe', {
						username,
						password,
						callbackUrl: `${window.location.origin}/`,
					});
					if (res?.error)
						showNotification({ message: res?.error, color: 'red' });
					if (res?.url) router.push('/');
				})}>
				<Stack>
					<TextInput
						required
						label='Username'
						placeholder='Your Username'
						value={form.values.username}
						onChange={(event) =>
							form.setFieldValue('username', event.currentTarget.value)
						}
					/>

					<PasswordInput
						required
						label='Password'
						placeholder='Your password'
						value={form.values.password}
						onChange={(event) =>
							form.setFieldValue('password', event.currentTarget.value)
						}
						error={
							form.errors.password &&
							'Password should include at least 6 characters'
						}
					/>
				</Stack>

				<Group position='apart' mt='lg'>
					<Center inline>
						<ArrowLongLeftIcon width={16} />
						<UnstyledButton component={NextLink} href='/' ml={5}>
							Back
						</UnstyledButton>
					</Center>
					<Button uppercase type='submit'>
						Login
					</Button>
				</Group>
			</form>
		</Paper>
	);
}
