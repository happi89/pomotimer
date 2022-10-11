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
	Anchor,
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
			username: '',
			password: '',
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
				<Button onClick={() => signIn('google').then(() => router.push('/'))}>
					Google
				</Button>
			</Group>
			<Divider label='Or continue with email' labelPosition='center' my='xl' />
			<form
				onSubmit={form.onSubmit(() => {
					const { username, password } = form.values;
					signIn('john-doe', { redirect: false, username, password }).then(
						(res) => {
							res?.ok
								? router.push('/')
								: showNotification({
										title: 'ERROR',
										message:
											res?.status === 401
												? 'Invalid Credentials'
												: 'Server Error',
										color: 'red',
								  });
						}
					);
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
					<Anchor color='dimmed' size='sm'>
						<Center inline>
							<ArrowLongLeftIcon width={16} />
							<UnstyledButton component={NextLink} href='/' ml={5}>
								Back
							</UnstyledButton>
						</Center>
					</Anchor>
					<Button uppercase type='submit'>
						Login
					</Button>
				</Group>
			</form>
		</Paper>
	);
}
