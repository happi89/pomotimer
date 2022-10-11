import type { NextPage } from 'next';
import Head from 'next/head';
import {
	Center,
	Container,
	Paper,
	PaperProps,
	Title,
	Text,
	Stack,
} from '@mantine/core';
import Navbar from '../components/Navbar';

const Home: NextPage = (props: PaperProps) => {
	return (
		<>
			<Head>
				<title>Create T3 App</title>
				<meta name='description' content='Generated by create-t3-app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Center>
				<Container size='sm' px='sm'>
					<Navbar />
					<Paper radius='sm' p='xl' shadow='xs' withBorder {...props}>
						<Stack align='center'>
							<Title
								order={1}
								sx={{
									fontSize: '4rem',
								}}>
								25:00
							</Title>
							<Text>Hello</Text>
						</Stack>
					</Paper>
				</Container>
			</Center>
		</>
	);
};

export default Home;