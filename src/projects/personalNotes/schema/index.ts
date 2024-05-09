import { z } from "zod";

export const getReq = {
  query: z.object({
    content: z.string().optional(),
  }),
};

export const getByIdReq = {
  params: z.object({
    id: z.string(),
  }),
};

export const postReq = {
  body: z.object({
    title: z.string(),
    body: z.string().optional(),
    archived: z.boolean(),
  }),
};

export const removeReq = getByIdReq;

export const changeReq = {
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    title: z.string(),
    body: z.string().optional(),
    archived: z.boolean(),
  }),
};
