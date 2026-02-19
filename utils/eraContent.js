import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validateEraContent = ajv.compile({
    type: "object",
    required: ["title", "period", "slug", "intro", "milestones", "sources"],
    additionalProperties: false,
    properties: {
        title:  { type: "string", minLength: 1 },
        period: { type: "string", minLength: 1 },
        slug:   { type: "string", pattern: "^[a-z0-9-]+$" },
        intro:  { type: "string", minLength: 1 },
        milestones: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                required: ["year", "event", "detail", "source_ids", "image_url", "image_alt", "image_credit"],
                additionalProperties: false,
                properties: {
                    year:         { type: "integer", minimum: 1900, maximum: 2100 },
                    event:        { type: "string", minLength: 1 },
                    detail:       { type: "string", minLength: 1 },
                    source_ids:   { type: "array", minItems: 1, uniqueItems: true, items: { type: "integer", minimum: 1 } },
                    image_url:    { type: "string", format: "uri" },
                    image_alt:    { type: "string", minLength: 1 },
                    image_credit: { type: "string", minLength: 1 },
                },
            },
        },
        sources: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                required: ["id", "citation"],
                additionalProperties: false,
                properties: {
                    id:       { type: "integer", minimum: 1 },
                    citation: { type: "string", minLength: 1 },
                },
            },
        },
    },
});

export { validateEraContent };