import Ajv from "ajv";

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        title: {type: "string"},
        source: {
            type: "object",
            properties: {
                name: {type: "string"},
                url: {type: "string"}
            },
            required: ["name", "url"],
            additionalProperties: false
        },
        years: {
            type: "array",
            items: {type: "integer"}
        },
        countries: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {type: "string"},
                    highlight: {type: "boolean"},
                    color: {type: "string"},
                    data: {
                        type: "array",
                        items: {type: "number"}
                    }
                },
                required: ["name", "highlight", "color", "data"],
                additionalProperties: false
            }
        }
    },
    required: ["title", "source", "years", "countries"],
    additionalProperties: false
}

export const validateGlobalInternetUsage = ajv.compile(schema);
