import type { Route } from "./+types/page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Page() {
  return <h1>Welcome to React Router v7!</h1>
}
