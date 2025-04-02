import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";

import { Button, Drawer, ScrollArea } from "@mantine/core";
import { RichTextEditor, Link } from "@mantine/tiptap";

import DefaultLayout, { headerHeight } from "@/components/layouts/Default";

import { useEditor, BubbleMenu } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Markdown } from "tiptap-markdown"

import { useDisclosure } from "@mantine/hooks";

const CreateArticlePage = () => {
    const { t } = useTranslation();
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Markdown
        ],
        immediatelyRender: false,
        content:
            "<h1>Neuer Artikel</h1> <p>Beginnen Sie, indem Sie diesen Text oder die Überschrift bearbeiten...</p>",
    });
    const [opened, { open, close }] = useDisclosure(false);

    const markdownOutput = editor?.storage.markdown.getMarkdown();

    return (
        <DefaultLayout withNavbarOpen={false}>
            <Drawer
                opened={opened}
                scrollAreaComponent={ScrollArea.Autosize}
                onClose={close}
                title={t("editor:metaDrawerTitle")}
                position="right"
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            >
                {/* Drawer content */}
            </Drawer>
            <RichTextEditor
                editor={editor}
                variant="subtle"
                style={{
                    borderRadius: 0,
                }}
            >
                {editor && (
                    <BubbleMenu editor={editor}>
                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Bold />
                            <RichTextEditor.Italic />
                            <RichTextEditor.Underline />
                            <RichTextEditor.Strikethrough />
                            <RichTextEditor.ClearFormatting />
                        </RichTextEditor.ControlsGroup>
                    </BubbleMenu>
                )}
                <RichTextEditor.Toolbar sticky stickyOffset={headerHeight}>
                    <RichTextEditor.ControlsGroup
                        display="block"
                        style={{ width: "100%" }}
                    >
                        <Button onClick={open}>{t("editor:showMetaDrawer")}</Button>
                    </RichTextEditor.ControlsGroup>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
            </RichTextEditor>
        </DefaultLayout>
    );
};

export default CreateArticlePage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };
