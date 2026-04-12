import { DatasetWrapper } from "@rdfjs/wrapper"
import { Authorization } from "./Authorization.js"
import { ACL } from "../vocabulary/mod.js"

/**
 * Represents an ACL Resource according to the Web Access Control specification.
 *
 * @see https://solidproject.org/TR/wac#acl-resource-representation
 */
class AclResource extends DatasetWrapper {
    /**
     * Gets all authorizations from the ACL Resource.
     *
     * @return {Iterable<Authorization>} Authorizations, any of which could permit an attempted access.
     */
    get authorizations(): Iterable<Authorization> {
        return this.instancesOf(ACL.Authorization, Authorization)
    }
}
