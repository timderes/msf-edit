import { IconHome, IconPencil, IconSettings } from "@tabler/icons-react";

/**
 * `navbarRoutes` defines the routes for the application's navigation bar.
 *
 * Note: The `label` values are keys used for looking up translated strings in
 * the app's localization files.
 */
const navbarRoutes = [
  {
    icon: <IconHome />,
    label: "routes.home",
    route: "/",
  },
  {
    icon: <IconPencil />,
    label: "routes.create",
    route: "/create",
  },
  {
    icon: <IconSettings />,
    label: "routes.settings",
    route: "/settings",
  },
];

export default navbarRoutes;
