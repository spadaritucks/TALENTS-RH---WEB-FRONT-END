import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const token = req.cookies.get("token")?.value;

  // Se não estiver autenticado, redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Aplicar apenas em rotas protegidas
export const config = {
    matcher: ["/admin/painel/:path*", "/candidato/painel/:path*", "/headhunter/painel/:path*","/empresa/painel/:path*"], // Rotas protegidas
};