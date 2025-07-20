import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";

import {
  Button,
  Card,
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import DefaultLayout from "@/components/layouts/Default";
import PageHeader from "@/components/content/PageHeader";
import { APP_NAME } from "utils/constants";
import { IconArticle, IconCalendar } from "@tabler/icons-react";
import { useRouter } from "next/router";
import formatLocalizedRoute from "utils/navigation/formatLocalizedRoute";

// TODO: Refactor cards into a separate component
const IndexPage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();
  const router = useRouter();
  const defaultAuthorName = "Tim"; // TODO: Replace with actual user data

  return (
    <DefaultLayout withNavbarOpen>
      <Container fluid my="xs">
        <PageHeader
          title={t("welcomeTitle", {
            FIRST_NAME: defaultAuthorName,
          })}
        >
          {t("welcomeText", {
            APP_NAME,
          })}
        </PageHeader>
        <Divider
          tt="uppercase"
          label={<Text>{t("routes.create")}</Text>}
          labelPosition="left"
          my="lg"
        />
        <SimpleGrid
          cols={{
            base: 2,
          }}
        >
          <Card>
            <IconArticle
              size={96}
              opacity={0.1225}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <Stack gap="lg">
              <div>
                <Title fz="h2">{t("createArticle")}</Title>
                <Text opacity={0.7}>{t("createArticleDesc")}</Text>
              </div>
              <Button
                onClick={() =>
                  void router.push(
                    formatLocalizedRoute({
                      locale,
                      route: "/create/article",
                    })
                  )
                }
                w="fit-content"
              >
                {t("createArticleCTA")}
              </Button>
            </Stack>
          </Card>
          <Card>
            <IconCalendar
              size={96}
              opacity={0.1225}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <Stack gap="lg">
              <div>
                <Title fz="h2">{t("createEvent")}</Title>
                <Text opacity={0.7}>{t("createEventDesc")}</Text>
              </div>
              <Button
                disabled
                onClick={() =>
                  void router.push(
                    formatLocalizedRoute({
                      locale,
                      route: "/create/event",
                    })
                  )
                }
                w="fit-content"
              >
                {t("createEventCTA")}
              </Button>
            </Stack>
          </Card>
        </SimpleGrid>
      </Container>
    </DefaultLayout>
  );
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };
