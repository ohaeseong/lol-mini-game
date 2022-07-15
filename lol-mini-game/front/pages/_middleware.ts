import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const { nextUrl, headers, cookies } = req;

  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  const url = nextUrl.clone();

  const language =
    headers
      .get('accept-language')
      ?.split(',')?.[0]
      .split('-')?.[0]
      .toLowerCase() || 'en';

  if (nextUrl.locale !== 'default') {
    return undefined;
  }

  if (cookies.NEXT_LOCALE && nextUrl.locale === 'default') {
    url.pathname = `/${cookies.NEXT_LOCALE}${nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }

  if (language === 'ko') {
    url.pathname = `/ko${nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }
}
