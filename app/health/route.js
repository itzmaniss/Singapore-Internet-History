import { NextResponse } from "next/server";

// Pre-render this route at build time so the health check avoids hitting the server
export const dynamic = "force-static";

// GET /health — used by Docker healthcheck to verify the container is running
export async function GET () {
    return NextResponse.json(
        {message: "Healthy"},
        {status: 200}
    );
}