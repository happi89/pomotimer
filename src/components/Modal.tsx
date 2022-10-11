import { Box, Button, Divider, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { closeAllModals, openModal } from '@mantine/modals';
import ThemeIcon from './ThemeIcon';

type Props = {
	title: string;
	openButton?: string | React.ReactNode;
	closeButton?: string;
	children: React.ReactNode;
	leftIcon: React.ReactNode;
};

export default function Modal({
	title,
	openButton,
	children,
	closeButton,
	leftIcon,
}: Props) {
	const matches = useMediaQuery('(min-width: 576px)');

	return (
		<>
			{matches ? (
				<Group position='center'>
					<Button
						leftIcon={leftIcon}
						onClick={() => {
							openModal({
								title,
								children: (
									<>
										<Divider />
										{children}
										{closeButton && (
											<Box
												sx={{
													width: '100%',
													display: 'flex',
													justifyContent: 'end',
												}}>
												<Button uppercase onClick={() => closeAllModals()}>
													{closeButton}
												</Button>
											</Box>
										)}
									</>
								),
							});
						}}>
						{openButton}
					</Button>
				</Group>
			) : (
				<ThemeIcon icon={openButton} />
			)}
		</>
	);
}
