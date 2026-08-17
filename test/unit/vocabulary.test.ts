import assert from "node:assert";
import { describe, it } from "node:test";
import { ACP } from "@solid/object/vocabulary";

describe("vocabulary export", () => {
  it("exports ACP IRIs from @solid/object/vocabulary", () => {
    assert.equal(
      ACP.AccessControlResource,
      "http://www.w3.org/ns/solid/acp#AccessControlResource",
    );
    assert.equal(ACP.mode, "http://www.w3.org/ns/solid/acp#mode");
  });
});
