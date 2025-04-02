import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";

import { Button, Drawer, ScrollArea } from "@mantine/core";
import { RichTextEditor, Link, RichTextEditorLabels } from "@mantine/tiptap";

import DefaultLayout, { headerHeight } from "@/components/layouts/Default";

import { useEditor, BubbleMenu } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
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
            Markdown
        ],
        immediatelyRender: false,
        content:
            "<h1>Neuer Artikel</h1> <p>Beginnen Sie, indem Sie diesen Text oder die Überschrift bearbeiten...</p>",
    });
    const [opened, { open, close }] = useDisclosure(false);

    const LABELS: Partial<RichTextEditorLabels> = {
        "alignCenterControlLabel": t("editor:alignCenterControlLabel"),
        "alignJustifyControlLabel": t("editor:alignJustifyControlLabel"),
        "alignLeftControlLabel": t("editor:alignLeftControlLabel"),
        "alignRightControlLabel": t("editor:alignRightControlLabel"),
        "blockquoteControlLabel": t("editor:blockquoteControlLabel"),
        "boldControlLabel": t("editor:boldControlLabel"),
        "bulletListControlLabel": t("editor:bulletListControlLabel"),
        "clearFormattingControlLabel": t("editor:clearFormattingControlLabel"),
        "codeBlockControlLabel": t("editor:codeBlockControlLabel"),
        "codeControlLabel": t("editor:codeControlLabel"),
        "colorPickerControlLabel": t("editor:colorPickerControlLabel"),
        "colorPickerSave": t("editor:colorPickerSave"),
        "h1ControlLabel": t("editor:h1ControlLabel"),
        "h2ControlLabel": t("editor:h2ControlLabel"),
        "h3ControlLabel": t("editor:h3ControlLabel"),
        "h4ControlLabel": t("editor:h4ControlLabel"),
        "h5ControlLabel": t("editor:h5ControlLabel"),
        "h6ControlLabel": t("editor:h6ControlLabel"),
        "highlightControlLabel": t("editor:highlightControlLabel"),
        "hrControlLabel": t("editor:hrControlLabel"),
        "italicControlLabel": t("editor:italicControlLabel"),
        "linkControlLabel": t("editor:linkControlLabel"),
        "linkEditorExternalLink": t("editor:linkEditorExternalLink"),
        "linkEditorInputLabel": t("editor:linkEditorInputLabel"),
        "linkEditorInputPlaceholder": t("editor:linkEditorInputPlaceholder"),
        "linkEditorSave": t("editor:linkEditorSave"),
        "orderedListControlLabel": t("editor:orderedListControlLabel"),
        "redoControlLabel": t("editor:redoControlLabel"),
        "strikeControlLabel": t("editor:strikeControlLabel"),
        "subscriptControlLabel": t("editor:subscriptControlLabel"),
        "superscriptControlLabel": t("editor:superscriptControlLabel"),
        "tasksControlLabel": t("editor:tasksControlLabel"),
        "tasksLiftLabel": t("editor:tasksLiftLabel"),
        "tasksSinkLabel": t("editor:tasksSinkLabel"),
        "underlineControlLabel": t("editor:underlineControlLabel"),
        "undoControlLabel": t("editor:undoControlLabel"),
        "unlinkControlLabel": t("editor:unlinkControlLabel"),
        "unsetColorControlLabel": t("editor:unsetColorControlLabel"),
    }

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
                labels={LABELS}
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

export const getStaticProps = makeStaticProperties(["common", "editor"]);

export { getStaticPaths };
