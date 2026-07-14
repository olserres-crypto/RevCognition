import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // `no-html-link-for-pages` derives its "known internal page" regexes by
      // walking app/. Since Task 1 (i18n) introduced the dynamic app/[locale]/
      // segment, the rule now also emits a catch-all pattern for that dynamic
      // route (`^/((?!.+?\..+?).*?)$`) which matches ANY single-segment path
      // without a dot — so it false-positives on every remaining hardcoded
      // <a href="/producto/">-style internal link, even though those links
      // pre-date this migration and are unrelated to it. Sections still using
      // plain <a> for internal nav are migrated to next-intl's <Link> in
      // later i18n tasks (3-13), which resolves this properly. Disabling here
      // rather than papering over with per-line eslint-disable comments.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
