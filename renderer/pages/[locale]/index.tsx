import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";

import { Container } from "@mantine/core";

import DefaultLayout from "@/components/layouts/Default";
import PageHeader from "@/components/content/PageHeader";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout withNavbarOpen>
      <Container fluid>
        <PageHeader title={t("routes.home")}>
          {t("home.description")}
        </PageHeader>
      </Container>
    </DefaultLayout>
  );
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };
