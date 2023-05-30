import * as trpc from '@trpc/server';
import type { inferProcedureOutput } from '@trpc/server';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export interface ChatMessage {
  id: string;
  user: string;
  message1: string;
}

const messages: ChatMessage[] = [
  { id: uuidv4(), user: 'User1', message1: 'This is my the first message!' },
  { id: uuidv4(), user: 'User2', message1: 'Hello there 🎉' },
];

export const appRouter = trpc
  .router()
  .query('greetings', {
    resolve() {
      return {
        message: 'Greetings from /trpc/greetings :)',
      };
    },
  })
  .query('getMessages', {
    input: z.number().optional(),
    resolve({ input }) {
      return messages.slice(-(input || 0));
    },
  })
  .mutation('addMessage', {
    input: z.object({
      user: z.string(),
      message1: z.string(),
    }),
    resolve({ input }) {
      const newMessage: ChatMessage = {
        id: uuidv4(),
        ...input,
      };
      messages.push(newMessage);
      return input;
    },
  });

export type AppRouter = typeof appRouter;

// HELPER TYPES FOR CLIENT:
export type TQuery = keyof AppRouter['_def']['queries'];

export type TMutation = keyof AppRouter['_def']['mutations'];

export type InferMutationOutput<TRouteKey extends TMutation> =
  inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>;