import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";

import {
    Button,
    Drawer,
    ScrollArea,
    Stack,
    TagsInput,
    Text,
    TextInput,
} from "@mantine/core";
import { RichTextEditor, Link, RichTextEditorLabels } from "@mantine/tiptap";
import { DateTimePicker } from "@mantine/dates";

import DefaultLayout, { headerHeight } from "@/components/layouts/Default";

import { useEditor, BubbleMenu } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Markdown } from "tiptap-markdown";

import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import { IconDeviceFloppy } from "@tabler/icons-react";

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
            Markdown,
        ],
        immediatelyRender: false,
        content:
            "<h1>Neuer Artikel</h1> <p>Beginnen Sie, indem Sie diesen Text oder die Überschrift bearbeiten...</p>",
    });
    const [opened, { open, close }] = useDisclosure(false);

    const LABELS: Partial<RichTextEditorLabels> = {
        alignCenterControlLabel: t("editor:alignCenterControlLabel"),
        alignJustifyControlLabel: t("editor:alignJustifyControlLabel"),
        alignLeftControlLabel: t("editor:alignLeftControlLabel"),
        alignRightControlLabel: t("editor:alignRightControlLabel"),
        blockquoteControlLabel: t("editor:blockquoteControlLabel"),
        boldControlLabel: t("editor:boldControlLabel"),
        bulletListControlLabel: t("editor:bulletListControlLabel"),
        clearFormattingControlLabel: t("editor:clearFormattingControlLabel"),
        codeBlockControlLabel: t("editor:codeBlockControlLabel"),
        codeControlLabel: t("editor:codeControlLabel"),
        colorPickerControlLabel: t("editor:colorPickerControlLabel"),
        colorPickerSave: t("editor:colorPickerSave"),
        h1ControlLabel: t("editor:h1ControlLabel"),
        h2ControlLabel: t("editor:h2ControlLabel"),
        h3ControlLabel: t("editor:h3ControlLabel"),
        h4ControlLabel: t("editor:h4ControlLabel"),
        h5ControlLabel: t("editor:h5ControlLabel"),
        h6ControlLabel: t("editor:h6ControlLabel"),
        highlightControlLabel: t("editor:highlightControlLabel"),
        hrControlLabel: t("editor:hrControlLabel"),
        italicControlLabel: t("editor:italicControlLabel"),
        linkControlLabel: t("editor:linkControlLabel"),
        linkEditorExternalLink: t("editor:linkEditorExternalLink"),
        linkEditorInputLabel: t("editor:linkEditorInputLabel"),
        linkEditorInputPlaceholder: t("editor:linkEditorInputPlaceholder"),
        linkEditorSave: t("editor:linkEditorSave"),
        orderedListControlLabel: t("editor:orderedListControlLabel"),
        redoControlLabel: t("editor:redoControlLabel"),
        strikeControlLabel: t("editor:strikeControlLabel"),
        subscriptControlLabel: t("editor:subscriptControlLabel"),
        superscriptControlLabel: t("editor:superscriptControlLabel"),
        tasksControlLabel: t("editor:tasksControlLabel"),
        tasksLiftLabel: t("editor:tasksLiftLabel"),
        tasksSinkLabel: t("editor:tasksSinkLabel"),
        underlineControlLabel: t("editor:underlineControlLabel"),
        undoControlLabel: t("editor:undoControlLabel"),
        unlinkControlLabel: t("editor:unlinkControlLabel"),
        unsetColorControlLabel: t("editor:unsetColorControlLabel"),
    };

    const markdownOutput = editor?.storage.markdown.getMarkdown();

    const articleFrontmatter = useForm<ArticleFrontmatter>({
        initialValues: {
            release: "", // eg. 2009-02-02T00:00:00.000Z
            author: "",
            location: "",
            category: "Verein",
            tags: [],
            slug: "", // eg. moderne-karts-fuer-die-msf-jugend
            title: "",
        },
        onValuesChange: (values) => {
            values.slug = values.title.toLowerCase().replace(/\s+/g, "-");
        },
    });

    console.info("Markdown Output", markdownOutput);
    console.info("Article Frontmatter", articleFrontmatter.values);

    // Auto-save every 60 seconds to localStorage
    useEffect(() => {
        const saveInterval = setInterval(() => {
            const articleData = {
                frontmatter: articleFrontmatter.getValues(),
                content: JSON.stringify(editor?.getJSON()),
            };

            localStorage.setItem("autoSaveArticleData", JSON.stringify(articleData));
            showNotification({
                autoClose: 20000, // 20 seconds
                icon: <IconDeviceFloppy />,
                "title": t("editor:autoSaveNotification.title"),
                "message": t("editor:autoSaveNotification.message", {
                    SAVE_INTERVAL_SECONDS: 60
                }),

            })
        }, 60000); // 60 seconds

        return () => clearInterval(saveInterval); // Cleanup interval on unmount
    }, []);

    return (
        <DefaultLayout withNavbarOpen={false}>
            <Drawer
                opened={opened}
                scrollAreaComponent={ScrollArea.Autosize}
                onClose={close}
                title={t("editor:drawerFrontmatterTitle")}
                position="right"
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                withCloseButton={false}
                closeOnClickOutside={false}
            >
                <Stack>
                    <Text fz="xs">{t("editor:drawerFrontmatterHelpText")}</Text>
                    <TextInput
                        data-autofocus
                        label={t("editor:frontmatterTitle")}
                        description={t("editor:frontmatterTitle.description")}
                        key={articleFrontmatter.key("title")}
                        {...articleFrontmatter.getInputProps("title")}
                        withAsterisk
                    />
                    <TextInput
                        label={t("editor:frontmatterAuthor")}
                        description={t("editor:frontmatterAuthor.description")}
                        key={articleFrontmatter.key("author")}
                        {...articleFrontmatter.getInputProps("author")}
                        withAsterisk
                    />
                    <TextInput
                        label={t("editor:frontmatterLocation")}
                        description={t("editor:frontmatterLocation.description")}
                        key={articleFrontmatter.key("location")}
                        {...articleFrontmatter.getInputProps("location")}
                        withAsterisk
                    />
                    <DateTimePicker
                        valueFormat="YYYY-MM-DDTHH:mm:ss.SSS"
                        label={t("editor:frontmatterRelease")}
                        description={t("editor:frontmatterRelease.description")}
                        key={articleFrontmatter.key("release")}
                        {...articleFrontmatter.getInputProps("release")}
                        withAsterisk
                    />
                    <TagsInput
                        label={t("editor:frontmatterTags")}
                        description={t("editor:frontmatterTags.description")}
                        key={articleFrontmatter.key("tags")}
                        {...articleFrontmatter.getInputProps("tags")}
                        withAsterisk
                    />
                    <Button onClick={close}>{t("confirm")}</Button>
                </Stack>
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
                    <RichTextEditor.ControlsGroup w="100%">
                        <Button onClick={open}>{t("editor:openDrawerFrontmatter")}</Button>
                        <Button>{t("editor:saveArticle")}</Button>
                        <Button>{t("editor:saveArticleDraft")}</Button>
                        <Button>{t("editor:publishArticle")}</Button>
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
