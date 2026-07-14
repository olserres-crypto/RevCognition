import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// localeDetection por defecto = true → detecta Accept-Language en la primera
// visita (D4) y persiste con cookie NEXT_LOCALE. La elección manual del switcher
// fija la misma cookie y prevalece.
export default createMiddleware(routing);

export const config = {
  // Excluye api, _next, /analisis (redirect en next.config) y cualquier ruta
  // con extensión (og.png, favicon, etc.).
  matcher: ['/((?!api|_next|_vercel|analisis|.*\\..*).*)']
};
