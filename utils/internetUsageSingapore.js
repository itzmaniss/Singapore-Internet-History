import Ajv from "ajv";

const ajv = new Ajv();

const schema = {
    type: "object", 
    properties: {
        title: {"type": "string"},
        subtitle: {"type": "string"},
        description: {"type": "string"},
        unit: {"type": "string"},
        sources: {"type": "array", 
            items: {
                type: "object",
                properties: {
                    name: {"type": "string"},
                    url: {"type": "string"}
                },
            }
        },
        data: {"type" : "array", items: {
            type: "object",
            properties: {
                year: {type: "integer"},
                percentage: {type: "number"}
                },
                required: ["year", "percentage"],
                additionalProperties: false    
            }
        },
    },
    required: ["title", "data"],
    additionalProperties: false
}

export const validateSingaporeInternetUsage = ajv.compile(schema);
