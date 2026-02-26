import { describe, it, expect } from "@jest/globals";
import { getEraData } from "../data/eras/index.js";
import globalData from "../data/internet_usage_by_country.json";
import sgData from "../data/internet_usage_in_sg.json";

const ERA_SLUGS = ["foundation", "wireless", "smart-nation"];

describe("Era data integrity", () => {
    it.each(ERA_SLUGS)(
        "%s milestones should be in chronological order",
        async (slug) => {
            const data = await getEraData(slug);
            const years = data.milestones.map((m) => m.year);
            const sorted = [...years].sort((a, b) => a - b);
            expect(years).toEqual(sorted);
        }
    );

    it.each(ERA_SLUGS)(
        "%s milestone source_ids should all reference existing sources",
        async (slug) => {
            const data = await getEraData(slug);
            const sourceIds = new Set(data.sources.map((s) => s.id));
            for (const milestone of data.milestones) {
                for (const id of milestone.source_ids) {
                    expect(sourceIds.has(id)).toBe(true);
                }
            }
        }
    );

    it.each(ERA_SLUGS)(
        "%s source ids should be unique",
        async (slug) => {
            const data = await getEraData(slug);
            const ids = data.sources.map((s) => s.id);
            expect(ids.length).toBe(new Set(ids).size);
        }
    );

    it.each(ERA_SLUGS)(
        "%s image_url values should start with /images/",
        async (slug) => {
            const data = await getEraData(slug);
            for (const milestone of data.milestones) {
                expect(milestone.image_url).toMatch(/^\/images\//);
            }
        }
    );

    it.each(ERA_SLUGS)(
        "%s slug should match the requested slug",
        async (slug) => {
            const data = await getEraData(slug);
            expect(data.slug).toBe(slug);
        }
    );
});

describe("Singapore internet usage data integrity", () => {
    it("should have consecutive years with no gaps", () => {
        const years = sgData.data.map((d) => d.year);
        for (let i = 1; i < years.length; i++) {
            expect(years[i]).toBe(years[i - 1] + 1);
        }
    });

    it("should have percentage values between 0 and 100", () => {
        for (const entry of sgData.data) {
            expect(entry.percentage).toBeGreaterThanOrEqual(0);
            expect(entry.percentage).toBeLessThanOrEqual(100);
        }
    });

    it("should have at least 10 years of data", () => {
        expect(sgData.data.length).toBeGreaterThanOrEqual(10);
    });

    it("should have a title and at least one source", () => {
        expect(sgData.title).toBeDefined();
        expect(sgData.sources.length).toBeGreaterThanOrEqual(1);
    });
});

describe("Global internet usage data integrity", () => {
    it("every country should have exactly as many data points as there are years", () => {
        const yearCount = globalData.years.length;
        for (const country of globalData.countries) {
            expect(country.data.length).toBe(yearCount);
        }
    });

    it("years should be in ascending order", () => {
        const years = globalData.years;
        for (let i = 1; i < years.length; i++) {
            expect(years[i]).toBeGreaterThan(years[i - 1]);
        }
    });

    it("should have exactly one highlighted country (Singapore)", () => {
        const highlighted = globalData.countries.filter((c) => c.highlight);
        expect(highlighted.length).toBe(1);
        expect(highlighted[0].name).toBe("Singapore");
    });

    it("all data values should be between 0 and 100", () => {
        for (const country of globalData.countries) {
            for (const val of country.data) {
                expect(val).toBeGreaterThanOrEqual(0);
                expect(val).toBeLessThanOrEqual(100);
            }
        }
    });

    it("every country should have a valid hex color", () => {
        for (const country of globalData.countries) {
            expect(country.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
        }
    });

    it("should have at least 5 countries for meaningful comparison", () => {
        expect(globalData.countries.length).toBeGreaterThanOrEqual(5);
    });
});
