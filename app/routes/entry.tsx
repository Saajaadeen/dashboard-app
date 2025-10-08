import type { Route } from "./+types/entry";
import Login from './authentication/login';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "" },
    { name: "", content: "" },
  ];
}

export default function Entry() {
  return (
    <Login />
  );
}

