import { Box, Button, Divider, Group } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';

type Props = {
	title: string;
	openButton: string;
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
	return (
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
	);
}
