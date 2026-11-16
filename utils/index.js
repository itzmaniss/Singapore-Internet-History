// re-export all Ajv validators from one place
import { validateGlobalInternetUsage } from "./internetUsageGlobal.js";
import { validateSingaporeInternetUsage } from "./internetUsageSingapore.js";
import {validateEraContent } from "./eraContent.js";

export {
    validateGlobalInternetUsage,
    validateSingaporeInternetUsage,
    validateEraContent
}