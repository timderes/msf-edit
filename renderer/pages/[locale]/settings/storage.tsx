import SettingsLayout from "@/components/layouts/SettingsLayout";
import {
  Button,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import { useTranslation } from "next-i18next";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import deleteAllProfilesFromDatabase from "@/lib/db/profiles/deleteAllProfiles";
import { useRouter } from "next/router";
import formatLocalizedRoute from "utils/navigation/formatLocalizedRoute";
import { useLocalStorage } from "@mantine/hooks";
import SharedConfirmModalProps from "utils/modals/sharedConfirmModalProps";

// TODO: Lazy code here. Refactor later
const storagePage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();
  const theme = useMantineTheme();
  const router = useRouter();

  const [, , removeColorScheme] = useLocalStorage({
    key: "mantine-color-scheme-value",
  });

  const handleResetApp = () => {
    modals.openConfirmModal({
      title: t("settings:storage.modals.confirmResetAppTitle"),
      children: (
        <Text size="sm">
          {t("settings:storage.modals.confirmResetAppText")}
        </Text>
      ),

      labels: { confirm: t("confirm"), cancel: t("cancel") },
      onConfirm: () => {
        window.ipc.removeAppSettings();
        removeColorScheme();
        void deleteAllProfilesFromDatabase();

        notifications.show({
          title: t("settings:storage.notifications.successResetAppTitle"),
          message: t("settings:storage.notifications.successResetAppText"),
        });

        void router.push(
          formatLocalizedRoute({
            locale,
            route: "/",
          })
        );
      },
      ...SharedConfirmModalProps,
    });
  };

  return (
    <SettingsLayout route="storage">
      <Stack>
        <Title>{t("settings:storage.title")}</Title>
        <Text>{t("settings:storage.text")}</Text>
        <Paper
          p="lg"
          withBorder
          style={{
            borderColor: theme.colors.red[7],
          }}
        >
          <Stack>
            <Title fz="h3">{t("settings:storage.dangerZoneTitle")}</Title>
            <Text>{t("settings:storage.dangerZoneText")}</Text>
            <Button
              color="red"
              variant="filled"
              onClick={() => handleResetApp()}
            >
              {t("settings:storage.dangerZone.btn.label.resetApp")}
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </SettingsLayout>
  );
};

export default storagePage;

export const getStaticProps = makeStaticProperties(["common", "settings"]);

export { getStaticPaths };
