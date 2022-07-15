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

  const country = req?.geo.country;
  url.pathname = `/${country}${nextUrl.pathname}`;
  return NextResponse.redirect(url);
}
