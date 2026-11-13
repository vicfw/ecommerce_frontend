const { isTagVersionStale } = require("./cache-handler");

describe("isTagVersionStale", () => {
  it("returns false when versions match", () => {
    expect(
      isTagVersionStale({ products: "3", "product:a": "1" }, {
        products: "3",
        "product:a": "1",
      })
    ).toBe(false);
  });

  it("returns true when a tag was bumped", () => {
    expect(
      isTagVersionStale({ products: "3" }, { products: "4" })
    ).toBe(true);
  });

  it("treats missing current version as 0", () => {
    expect(isTagVersionStale({ products: "1" }, {})).toBe(true);
    expect(isTagVersionStale({ products: "0" }, {})).toBe(false);
  });
});
