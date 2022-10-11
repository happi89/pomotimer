// src/pages/_app.tsx
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core';
import Head from 'next/head';
import { ModalsProvider } from '@mantine/modals';
import { useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'mantine-color-scheme',
		defaultValue: 'light',
		getInitialValueInEffect: true,
	});

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<>
			<Head>
				<title>Pomo Timer</title>
			</Head>
			<SessionProvider session={session}>
				<ColorSchemeProvider
					colorScheme={colorScheme}
					toggleColorScheme={toggleColorScheme}>
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						theme={{ colorScheme }}>
						<ModalsProvider>
							<NotificationsProvider position='top-right' zIndex={2077}>
								<Component {...pageProps} />
							</NotificationsProvider>
						</ModalsProvider>
					</MantineProvider>
				</ColorSchemeProvider>
			</SessionProvider>
		</>
	);
};

export default trpc.withTRPC(MyApp);
