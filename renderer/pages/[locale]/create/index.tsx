import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";

import { Container } from "@mantine/core";

import DefaultLayout from "@/components/layouts/Default";
import PageHeader from "@/components/content/PageHeader";
import Link from "next/link";
import formatLocalizedRoute from "utils/navigation/formatLocalizedRoute";
import { createArticleRoute } from "utils/content/navbarRoutes";

const IndexPage = () => {
    const { t, i18n: {
        language: locale
    } } = useTranslation();

    return (
        <DefaultLayout withNavbarOpen>
            <Container fluid>
                <PageHeader title={t("routes.create")}>
                    <Link href={formatLocalizedRoute({
                        locale,
                        route: createArticleRoute.route
                    })}>{t("create.article")}</Link>
                </PageHeader>
            </Container>
        </DefaultLayout>
    );
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };
