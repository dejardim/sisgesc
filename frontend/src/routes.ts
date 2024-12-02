import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("pages/HomePage/page.tsx"),
    route("test", "pages/TestPage/page.tsx"),
] satisfies RouteConfig;
