import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// localeDetection por defecto = true → detecta Accept-Language en la primera
// visita (D4) y persiste con cookie NEXT_LOCALE. La elección manual del switcher
// fija la misma cookie y prevalece.
export default createMiddleware(routing);

export const config = {
  // Excluye api, _next, /analisis y /soluciones/servicios-b2b (redirects en
  // next.config; se excluyen para que next-intl no intercepte antes en el
  // worker de next-on-pages) y cualquier ruta con extensión (og.png, favicon...).
  matcher: ['/((?!api|_next|_vercel|analisis|soluciones/servicios-b2b|.*\\..*).*)']
};
