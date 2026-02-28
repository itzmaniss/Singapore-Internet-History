import { describe, it, expect } from "@jest/globals";
import {
    validateEraContent,
    validateGlobalInternetUsage,
    validateSingaporeInternetUsage,
} from "../utils/index.js";

describe("validateEraContent", () => {
    const validEra = {
        title: "Test Era",
        period: "2000 – 2010",
        slug: "test-era",
        intro: "An introductory paragraph.",
        milestones: [
            {
                year: 2000,
                event: "Something happened",
                summary: "A brief summary of what happened.",
                detail: "Details about what happened.",
                source_ids: [1],
                image_url: "/images/test.webp",
                image_alt: "A test image",
                image_credit: "Test Author, CC BY 4.0",
            },
        ],
        sources: [{ id: 1, citation: "Author. Title. Publisher, 2000." }],
    };

    it("should accept valid era data", () => {
        expect(validateEraContent(validEra)).toBe(true);
    });

    it("should reject era data missing required fields", () => {
        const { title, ...noTitle } = validEra;
        expect(validateEraContent(noTitle)).toBe(false);

        const { milestones, ...noMilestones } = validEra;
        expect(validateEraContent(noMilestones)).toBe(false);

        const { sources, ...noSources } = validEra;
        expect(validateEraContent(noSources)).toBe(false);
    });

    it("should reject era data with empty milestones array", () => {
        expect(validateEraContent({ ...validEra, milestones: [] })).toBe(false);
    });

    it("should reject era data with invalid slug format", () => {
        expect(validateEraContent({ ...validEra, slug: "Bad Slug!" })).toBe(false);
        expect(validateEraContent({ ...validEra, slug: "UPPER" })).toBe(false);
    });

    it("should reject era data with additional properties", () => {
        expect(validateEraContent({ ...validEra, extra: "nope" })).toBe(false);
    });

    it("should reject milestone with year out of range", () => {
        const badYear = {
            ...validEra,
            milestones: [{ ...validEra.milestones[0], year: 1800 }],
        };
        expect(validateEraContent(badYear)).toBe(false);
    });

    it("should reject milestone missing summary", () => {
        const { summary, ...noSummary } = validEra.milestones[0];
        const bad = { ...validEra, milestones: [noSummary] };
        expect(validateEraContent(bad)).toBe(false);
    });

    it("should reject milestone missing source_ids", () => {
        const { source_ids, ...noSourceIds } = validEra.milestones[0];
        const bad = { ...validEra, milestones: [noSourceIds] };
        expect(validateEraContent(bad)).toBe(false);
    });

    it("should reject milestone with empty source_ids", () => {
        const bad = {
            ...validEra,
            milestones: [{ ...validEra.milestones[0], source_ids: [] }],
        };
        expect(validateEraContent(bad)).toBe(false);
    });

    it("should reject milestone with duplicate source_ids", () => {
        const bad = {
            ...validEra,
            milestones: [{ ...validEra.milestones[0], source_ids: [1, 1] }],
        };
        expect(validateEraContent(bad)).toBe(false);
    });
});

describe("validateSingaporeInternetUsage", () => {
    const validSg = {
        title: "Internet Penetration in Singapore",
        subtitle: "Percentage of population",
        description: "Usage rates.",
        unit: "percentage",
        sources: [{ name: "Data.gov.sg", url: "https://data.gov.sg" }],
        data: [
            { year: 2000, percentage: 36.0 },
            { year: 2001, percentage: 43.0 },
        ],
    };

    it("should accept valid Singapore data", () => {
        expect(validateSingaporeInternetUsage(validSg)).toBe(true);
    });

    it("should reject data missing title", () => {
        const { title, ...noTitle } = validSg;
        expect(validateSingaporeInternetUsage(noTitle)).toBe(false);
    });

    it("should reject data missing the data array", () => {
        const { data, ...noData } = validSg;
        expect(validateSingaporeInternetUsage(noData)).toBe(false);
    });

    it("should reject data entries missing year", () => {
        const bad = { ...validSg, data: [{ percentage: 50.0 }] };
        expect(validateSingaporeInternetUsage(bad)).toBe(false);
    });

    it("should reject data entries missing percentage", () => {
        const bad = { ...validSg, data: [{ year: 2020 }] };
        expect(validateSingaporeInternetUsage(bad)).toBe(false);
    });

    it("should reject additional properties on data entries", () => {
        const bad = {
            ...validSg,
            data: [{ year: 2020, percentage: 90.0, extra: true }],
        };
        expect(validateSingaporeInternetUsage(bad)).toBe(false);
    });
});

describe("validateGlobalInternetUsage", () => {
    const validGlobal = {
        title: "Internet Usage by Country",
        source: { name: "World Bank", url: "https://worldbank.org" },
        years: [2000, 2001, 2002],
        countries: [
            {
                name: "Singapore",
                highlight: true,
                color: "#DC143C",
                data: [36.0, 43.0, 47.0],
            },
        ],
    };

    it("should accept valid global data", () => {
        expect(validateGlobalInternetUsage(validGlobal)).toBe(true);
    });

    it("should reject data missing required fields", () => {
        const { title, ...noTitle } = validGlobal;
        expect(validateGlobalInternetUsage(noTitle)).toBe(false);

        const { countries, ...noCountries } = validGlobal;
        expect(validateGlobalInternetUsage(noCountries)).toBe(false);

        const { years, ...noYears } = validGlobal;
        expect(validateGlobalInternetUsage(noYears)).toBe(false);
    });

    it("should reject country missing required fields", () => {
        const bad = {
            ...validGlobal,
            countries: [{ name: "Test", highlight: true, color: "#000" }],
        };
        expect(validateGlobalInternetUsage(bad)).toBe(false);
    });

    it("should reject additional properties on country", () => {
        const bad = {
            ...validGlobal,
            countries: [{ ...validGlobal.countries[0], extra: "nope" }],
        };
        expect(validateGlobalInternetUsage(bad)).toBe(false);
    });

    it("should reject source missing url", () => {
        const bad = { ...validGlobal, source: { name: "Test" } };
        expect(validateGlobalInternetUsage(bad)).toBe(false);
    });
});
