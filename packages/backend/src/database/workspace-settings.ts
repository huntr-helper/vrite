import { Collection, Db, ObjectId } from "mongodb";
import { z } from "zod";
import { UnderscoreID, zodId } from "#lib/mongo";

const prettierConfig = z
  .object({
    printWidth: z.number(),
    tabWidth: z.number(),
    useTabs: z.boolean(),
    semi: z.boolean(),
    singleQuote: z.boolean(),
    jsxSingleQuote: z.boolean(),
    trailingComma: z.enum(["none", "es5", "all"]),
    bracketSpacing: z.boolean(),
    bracketSameLine: z.boolean(),
    jsxBracketSameLine: z.boolean(),
    rangeStart: z.number(),
    rangeEnd: z.number(),
    proseWrap: z.enum(["always", "never", "preserve"]),
    arrowParens: z.enum(["avoid", "always"]),
    htmlWhitespaceSensitivity: z.enum(["css", "strict", "ignore"]),
    endOfLine: z.enum(["auto", "lf", "crlf", "cr"]),
    quoteProps: z.enum(["as-needed", "consistent", "preserve"]),
    vueIndentScriptAndStyle: z.boolean(),
    embeddedLanguageFormatting: z.enum(["auto", "off"]),
    singleAttributePerLine: z.boolean()
  })
  .partial();
const metadataField = z.enum(["slug", "canonical-link", "date", "tags", "members", "filename"]);
const metadataSettings = z
  .object({
    canonicalLinkPattern: z.string(),
    enabledFields: z.array(metadataField).optional()
  })
  .partial();
const wrapper = z.object({
  label: z.string().min(1).max(50),
  key: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[a-z0-9_]*$/),
  extension: z.boolean().optional()
});
const marks = [
  "bold",
  "italic",
  "strike",
  "code",
  "link",
  "highlight",
  "subscript",
  "superscript"
] as const;
const blocks = [
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6",
  "bulletList",
  "orderedList",
  "taskList",
  "blockquote",
  "codeBlock",
  "horizontalRule",
  "image",
  "table",
  "wrapper"
] as const;
const embeds = ["codepen", "codesandbox", "youtube"] as const;
const workspaceSettings = z.object({
  id: zodId(),
  prettierConfig: z.string(),
  metadata: metadataSettings.optional(),
  marks: z.array(z.enum(marks)),
  blocks: z.array(z.enum(blocks)),
  embeds: z.array(z.enum(embeds)),
  wrappers: z.array(wrapper).optional()
});

interface Wrapper extends z.infer<typeof wrapper> {}
interface WorkspaceSettings<ID extends string | ObjectId = string>
  extends Omit<z.infer<typeof workspaceSettings>, "id" | "wrappers"> {
  id: ID;
  wrappers?: Wrapper[];
}
interface FullWorkspaceSettings<ID extends string | ObjectId = string>
  extends WorkspaceSettings<ID> {
  workspaceId: ID;
}
interface MetadataSettings extends z.infer<typeof metadataSettings> {}

type MetadataField = z.infer<typeof metadataField>;

const getWorkspaceSettingsCollection = (
  db: Db
): Collection<UnderscoreID<FullWorkspaceSettings<ObjectId>>> => {
  return db.collection("workspace-settings");
};

export {
  prettierConfig,
  marks,
  blocks,
  embeds,
  workspaceSettings,
  metadataSettings,
  wrapper,
  getWorkspaceSettingsCollection
};
export type { MetadataField, MetadataSettings, WorkspaceSettings, FullWorkspaceSettings, Wrapper };
