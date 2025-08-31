import Head from "next/head";
import { useRouter } from "next/router";

export interface IProps {
  pageUrl?: string;
  statusCode?: number;
  message?: string;
  description?: string;
}

export function ErrorPage(props: IProps) {
  const {
    statusCode,
    message: title = "Page Not Found!",
    description,
    pageUrl,
  } = props;
  const { asPath } = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={pageUrl || asPath} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={pageUrl} />
      </Head>
      <div>
        Error - {statusCode} : {title} {description}
        <br />
        Please try again
      </div>
    </>
  );
}
