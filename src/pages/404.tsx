import { ErrorPage } from "@/layout";

export default function Custom404() {
  return <ErrorPage message="Page Not Found!" statusCode={404} />;
}
