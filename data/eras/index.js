import { validateEraContent } from "@/utils";

export async function getEraData(era) {
    const eraFile = {
        "foundation": () => import("./foundation.json"),
        "wireless": () => import("./wireless.json"),
        "smart-nation": () => import("./smart-nation.json")
    }

    if (eraFile[era]) {
        try {
            const data = await eraFile[era]();
            const valid = validateEraContent(data.default);
            if (!valid) {
                console.error(
                    `Invalid data for era: ${era}, error:`, JSON.stringify(validateEraContent.errors, null, 2)
                );

                throw new Error(
                    `${validateEraContent.errors}`
                )
            }
            return data.default;
        }
        catch (error) {
            console.error(`Error loading data for ${era}: `, error);
        }
    }
}