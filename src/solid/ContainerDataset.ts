import { DatasetWrapper } from "@rdfjs/wrapper"
import { Container } from "./Container.js"
import { LDP } from "../vocabulary/mod.js"

export class ContainerDataset extends DatasetWrapper {

    get container(): Container | undefined {
        // Return the first container in the dataset
        for (const s of this.subjectsOf(LDP.contains, Container)) {
            return s
        }

        // Empty containers have no ldp:contains; resolving via rdf:type instead.
        for (const s of this.instancesOf(LDP.Container, Container)) {
            return s
        }

        for (const s of this.instancesOf(LDP.BasicContainer, Container)) {
            return s
        }

        return
    }
}
