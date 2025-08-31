import type { AppProps } from "next/app";
import "./global.css"; // make sure you have a globals.css for Tailwind

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen w-screen bg-white text-gray-900">
      <Component {...pageProps} />
    </div>
  );
}
