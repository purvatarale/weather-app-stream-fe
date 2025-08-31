import { ErrorPage } from "@/layout";

export default function Custom404() {
  return <ErrorPage message="Internal Server Error" statusCode={500} />;
}
