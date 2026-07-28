import { DataFactory, Parser, Store } from "n3";
import assert from "node:assert";
import { describe, it } from "node:test";
import { ContainerDataset } from "@solid/object";

describe("ContainerDataset", () => {
    const emptyContainerRDF = `
    @prefix dc: <http://purl.org/dc/terms/>.
    @prefix ldp: <http://www.w3.org/ns/ldp#>.
    @prefix posix: <http://www.w3.org/ns/posix/stat#>.
    @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
    <> a ldp:Container, ldp:BasicContainer, ldp:Resource;
        dc:modified "2026-07-23T10:41:12.846Z"^^xsd:dateTime;
        posix:mtime 1784803272.
    `;

    const nonEmptyContainerRDF = `
    @prefix ldp: <http://www.w3.org/ns/ldp#>.
    <https://pod.example/container/>
        a ldp:Container;
        ldp:contains <https://pod.example/container/file.txt> .
    <https://pod.example/container/file.txt>
        a ldp:Resource .
    `;

    it("resolves an empty container via rdf:type when ldp:contains is absent", () => {
        const store = new Store();
        const parser = new Parser({ baseIRI: "https://pod.example/empty/" });
        store.addQuads(parser.parse(emptyContainerRDF));
        const dataset = new ContainerDataset(store, DataFactory);
        const container = dataset.container;
        assert.ok(container !== undefined);
        assert.equal(container.id, "https://pod.example/empty/");
        assert.equal(container.contains.size, 0);
    });

    it("still resolves a non-empty container via ldp:contains", () => {
        const store = new Store();
        store.addQuads(new Parser().parse(nonEmptyContainerRDF));
        const dataset = new ContainerDataset(store, DataFactory);
        const container = dataset.container;
        assert.ok(container !== undefined);
        assert.equal(container.id, "https://pod.example/container/");
        assert.equal(container.contains.size, 1);
        assert.equal(
            container.contains.values().next().value?.id,
            "https://pod.example/container/file.txt",
        );
    });
});
