import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { tips } from "@/server/db/schema";

export const tipRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ amount: z.number(), startTime: z.date(), endTime: z.date() }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tips).values({
        amount: input.amount.toString(),
        startTime: input.startTime,
        endTime: input.endTime,
        createdById: ctx.session.user.id,
      });
    }),
});
