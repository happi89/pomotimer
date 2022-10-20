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
	getTasks: t.procedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.task.findMany({
				where: {
					userId: input.userId,
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
					long: input.long,
				},
				create: {
					userId: input.userId,
					pomodoro: input.pomodoro,
					short: input.short,
					long: input.short,
				},
			});
		}),
	upsertTask: t.procedure
		.input(
			z.object({
				id: z.string(),
				task: z.string(),
				pomodoros: z.number(),
				project: z.string().nullable(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.task.upsert({
				where: {
					id: input.id,
				},
				create: {
					userId: String(ctx?.session?.user?.id),
					pomodoros: input.pomodoros,
					task: input.task,
					project: input.project,
				},
				update: {
					task: input.task,
					pomodoros: input.pomodoros,
					project: input.project,
				},
			});
		}),
	deleteTasks: t.procedure
		.input(
			z.object({
				userId: z.string(),
				done: z.boolean(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.task.deleteMany({
				where: {
					userId: input.userId,
					done: input.done,
				},
			});
		}),
});
