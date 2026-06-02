// Guest mode is fully supported — /app/* pages handle auth state inline.
// No redirect enforced; API endpoints return 401 for unauthenticated requests.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
