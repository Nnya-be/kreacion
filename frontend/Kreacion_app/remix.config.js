/** @type {import('@remix-run/dev').AppConfig} */
export default {
  serverBuildTarget: "node-cjs",
  ignoredRouteFiles: ["**/.*"],
  
  // Enable Tailwind and PostCSS
  tailwind: true,
  postcss: true,
  
  // Other configuration settings...
};
