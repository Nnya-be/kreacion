import {
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  // useCatch
} from "@remix-run/react";
import { LiveReload, Meta } from "@remix-run/react";
import { LinksFunction } from "@remix-run/react"; // Make sure this import exists

import styles from "./tailwind.css"

// If cssBundleHref is defined somewhere in your project, import or define it.
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  // ...(typeof cssBundleHref !== 'undefined' ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Render LiveReload conditionally */}
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
