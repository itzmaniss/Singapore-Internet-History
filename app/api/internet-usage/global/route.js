import { NextResponse } from "next/server";
import globalInternetUsageData from "@/data/internet_usage_by_country.json";
import { validateGlobalInternetUsage } from "@/utils/index";

export async function GET() {
    const validData = validateGlobalInternetUsage(globalInternetUsageData);
    if (validData) {
        return NextResponse.json(globalInternetUsageData);
    } else{
        console.error(validateGlobalInternetUsage.errors);
        return NextResponse.json({error: "Invalid Data"}, {status: 500});
    }
}