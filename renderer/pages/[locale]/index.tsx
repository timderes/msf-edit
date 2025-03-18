import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import DefaultLayout from "@/components/layouts/Default";
import { Container } from "@mantine/core";

import { useTranslation } from "next-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout withNavbarOpen>
      <Container fluid>Index</Container>
    </DefaultLayout>
  );
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };
