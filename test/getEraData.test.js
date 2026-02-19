import { describe, it, expect } from "@jest/globals";
import { getEraData } from "../data/eras/index.js";

describe("getEraData", () => {
    it("should return valid data for 'foundation' era", async () => {
        const data = await getEraData("foundation");
        expect(data).toBeDefined();
        expect(data.foundation).toBeDefined();
        expect(data.foundation.title).toBe("Foundation Era");
        expect(data.foundation.slug).toBe("foundation");
        expect(data.foundation.milestones.length).toBeGreaterThan(0);
        expect(data.foundation.sources.length).toBeGreaterThan(0);
    });

    it("should return valid data for 'wireless' era", async () => {
        const data = await getEraData("wireless");
        expect(data).toBeDefined();
        expect(data.wireless).toBeDefined();
        expect(data.wireless.title).toBeDefined();
        expect(data.wireless.milestones.length).toBeGreaterThan(0);
    });

    it("should return valid data for 'smart-nation' era", async () => {
        const data = await getEraData("smart-nation");
        expect(data).toBeDefined();
        expect(data["smart-nation"]).toBeDefined();
        expect(data["smart-nation"].title).toBeDefined();
        expect(data["smart-nation"].milestones.length).toBeGreaterThan(0);
    });

    it("should return undefined for an invalid era", async () => {
        const data = await getEraData("nonexistent");
        expect(data).toBeUndefined();
    });

    it("should return data that passes AJV schema validation", async () => {
        const data = await getEraData("foundation");
        expect(data).toBeDefined();
        expect(data.foundation.period).toBeDefined();
        expect(data.foundation.intro).toBeDefined();

        // Check milestone structure
        const milestone = data.foundation.milestones[0];
        expect(milestone.year).toEqual(expect.any(Number));
        expect(milestone.event).toEqual(expect.any(String));
        expect(milestone.detail).toEqual(expect.any(String));
        expect(milestone.source_ids).toEqual(expect.any(Array));
        expect(milestone.image_url).toEqual(expect.any(String));
        expect(milestone.image_alt).toEqual(expect.any(String));
        expect(milestone.image_credit).toEqual(expect.any(String));

        // Check source structure
        const source = data.foundation.sources[0];
        expect(source.id).toEqual(expect.any(Number));
        expect(source.citation).toEqual(expect.any(String));
    });
});