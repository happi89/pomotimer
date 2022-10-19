// src/server/trpc/router/index.ts
import { t } from '../trpc';
import { TimeRouter } from './timeRouter';
import { authRouter } from './auth';

export const appRouter = t.router({
	time: TimeRouter,
	auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
