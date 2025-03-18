import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import { Stack } from "@mantine/core";
import SettingsLayout from "@/components/layouts/SettingsLayout";

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <SettingsLayout route="/">
      <Stack>{t("routes.settings")}</Stack>
    </SettingsLayout>
  );
};

export default SettingsPage;

export const getStaticProps = makeStaticProperties(["common", "settings"]);

export { getStaticPaths };
