import { t } from '../trpc';
import { z } from 'zod';

export const TimeRouter = t.router({
	getTime: t.procedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.time.findUnique({
				where: {
					userId: input.userId,
				},
				select: {
					pomodoro: true,
					short: true,
					long: true,
				},
			});
		}),
	upsertTime: t.procedure
		.input(
			z.object({
				userId: z.string(),
				pomodoro: z.number(),
				short: z.number(),
				long: z.number(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.time.upsert({
				where: { userId: input.userId },
				update: {
					pomodoro: input.pomodoro,
					short: input.short,
					long: input.short,
				},
				create: {
					userId: input.userId,
					pomodoro: input.pomodoro,
					short: input.short,
					long: input.short,
				},
			});
		}),
});
