import { z } from "zod";

export const authSchema = z.object({
  sheetName: z.string().min(1, "Sheet name is required"),
  sheetUrl: z.string().refine(
    (url) => {
      try {
        const parsedUrl = new URL(url);
        const isGoogleDocs = parsedUrl.hostname === "docs.google.com";
        const isSpreadsheetUrl =
          /\/spreadsheets\/d\/e\/2PACX-[\w-]+\/pub\?output=tsv$/.test(
            parsedUrl.pathname + parsedUrl.search,
          );
        return isGoogleDocs && isSpreadsheetUrl;
      } catch (error) {
        return false;
      }
    },
    {
      message: "Debe ser una URL válida",
    },
  ),
});
export type AuthValues = z.infer<typeof authSchema>;
