import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine';

const commonEngine = new CommonEngine();

// Netlify Edge Function Handler für Angular SSR
export async function netlifyCommonEngineHandler(
  request: Request,
  context: unknown
): Promise<Response> {
  // Beispiel für eigene API-Route:
  // const pathname = new URL(request.url).pathname;
  // if (pathname === '/api/hello') {
  //   return Response.json({ message: 'Hello from the API' });
  // }

  return render(commonEngine);
}
