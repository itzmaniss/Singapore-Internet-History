# Bugs Caught & Fixed

## Bug 1: Incorrect property access in `getEraData` tests

**File:** `test/getEraData.test.js`

**Description:**
The `getEraData()` function returns the era object directly (e.g. `{ title, period, slug, milestones, ... }`), but the tests were accessing the data as if it was nested under a key matching the era slug. For example, the test for the foundation era called `data.foundation.title` instead of `data.title`, causing all assertions after that line to fail with `Cannot read properties of undefined`.

**Affected tests:**

- `should return valid data for 'foundation' era` — accessed `data.foundation`
- `should return valid data for 'wireless' era` — accessed `data.wireless`
- `should return valid data for 'smart-nation' era` — accessed `data["smart-nation"]`
- `should return data that passes AJV schema validation` — accessed `data.foundation.period`, `data.foundation.milestones`, `data.foundation.sources`

**Root cause:**
The tests assumed `getEraData("foundation")` returned `{ foundation: { title: "...", ... } }`, but the actual return value from `data/eras/index.js` is `data.default` — the raw JSON object `{ title: "...", ... }` without any wrapping key.

**Fix:**
Replaced all nested property accesses with direct access on the returned object:

```js
// Before (broken)
const data = await getEraData("foundation");
expect(data.foundation.title).toBe("Foundation Era");

// After (fixed)
const data = await getEraData("foundation");
expect(data.title).toBe("Foundation Era");
```

---

## Bug 2: `years` array had one extra entry with no corresponding data

**File:** `data/internet_usage_by_country.json`

**Description:**
The `years` array contained 36 entries (1990–2025), but every country's `data` array only had 35 entries (1990–2024). This meant the last year (2025) had no corresponding data point for any of the 11 countries, creating a mismatch that would cause the chart to plot incorrectly for the final year.

**How it was caught:**
The new `dataIntegrity.test.js` test `"every country should have exactly as many data points as there are years"` iterated over all countries and asserted `country.data.length === years.length`. All 11 countries failed this assertion (35 !== 36).

**Root cause:**
The year 2025 was included in the `years` array, likely as a placeholder for future data, but no country had a data value for 2025. The title already correctly stated "1990-2024", confirming 2025 was unintentional.

**Fix:**
Removed `2025` from the `years` array so it matches the 35 data points each country provides:

```json
// Before
"years": [1990, 1991, ..., 2024, 2025]

// After
"years": [1990, 1991, ..., 2024]
```
