import { z } from "zod";

export const authSchema = z.object({
  sheetName: z.string().min(1, "Sheet name is required"),
  sheetUrl: z.string().refine(
    (url) => {
      try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname === "docs.google.com";
      } catch (error) {
        return false;
      }
    },
    {
      message: "Debe ser una URL válida de docs.google.com",
    },
  ),
});
export type AuthValues = z.infer<typeof authSchema>;
