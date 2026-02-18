import { NextResponse } from "next/server";
import singaporeInternetUsageData from "@/data/internet_usage_in_sg.json";
import { validateSingaporeInternetUsage } from "@/utils/index";

export async function GET() {
    const validData = validateSingaporeInternetUsage(singaporeInternetUsageData);
    if (validData) {
        return NextResponse.json(singaporeInternetUsageData);
    } else{
        console.error(validateSingaporeInternetUsage.errors);
        return NextResponse.json({error: "Invalid Data"}, {status: 500});
    }
}