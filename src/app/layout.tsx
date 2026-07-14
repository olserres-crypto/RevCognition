import type {ReactNode} from "react";

// El <html>/<body> vive ahora en app/[locale]/layout.tsx. Este root layout
// solo pasa children (Next requiere un root layout).
export default function RootLayout({children}: {children: ReactNode}) {
  return children;
}
