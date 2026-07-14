import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // `no-html-link-for-pages` derives its "known internal page" regexes by
    // walking app/. Since Task 1 (i18n) introduced the dynamic app/[locale]/
    // segment, the rule now also emits a catch-all pattern for that dynamic
    // route (`^/((?!.+?\..+?).*?)$`) which matches ANY single-segment path
    // without a dot — so it false-positives on every remaining hardcoded
    // <a href="/producto/">-style internal link, even though those links
    // pre-date this migration and are unrelated to it. Scoped to only the
    // three files that still use plain <a> for internal nav; they are
    // migrated to next-intl's <Link> in later i18n tasks (3-13), at which
    // point this override should be removed.
    files: [
      "src/components/sections/FeaturesGrid.tsx",
      "src/components/sections/Footer.tsx",
      "src/components/sections/UseCases.tsx",
    ],
    rules: {
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
