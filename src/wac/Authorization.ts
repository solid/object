import {
    NamedNodeAs,
    NamedNodeFrom,
    OptionalAs,
    OptionalFrom,
    SetFrom,
    TermAs,
    TermFrom,
    TermWrapper
} from "@rdfjs/wrapper"
import { ACL, FOAF, RDF } from "../vocabulary/mod.js"
import { Group } from "./Group.js"

/**
 * Represents an Authorization according to the Web Access Control specification.
 *
 * Authorization is the most fundamental unit of access control describing access permissions granting to agents the ability to perform operations on resources.
 *
 * @see https://solidproject.org/TR/wac#authorization-rule
 */

export class Authorization extends TermWrapper {
    //#region Data

    //#region Access Objects

    /**
     * Denotes the resource to which access is being granted.
     *
     * @see https://solidproject.org/TR/wac#acl-accessto
     */
    get accessTo(): string | undefined {
        return OptionalFrom.subjectPredicate(this, ACL.accessTo, NamedNodeAs.string)
    }

    set accessTo(value: string | undefined) {
        OptionalAs.object(this, ACL.accessTo, value, NamedNodeFrom.string)
    }

    /**
     * Denotes the container resource whose Authorization can be applied to a resource lower in the collection hierarchy.
     *
     * @see https://solidproject.org/TR/wac#acl-default
     */
    get default(): string | undefined {
        return OptionalFrom.subjectPredicate(this, ACL.default, NamedNodeAs.string)
    }

    set default(value: string | undefined) {
        OptionalAs.object(this, ACL.default, value, NamedNodeFrom.string)
    }

    //#endregion

    //#region Access Modes

    /**
     * Denotes a class of operations that the agents can perform on a resource.
     *
     * @see https://solidproject.org/TR/wac#acl-mode
     */
    get mode(): Set<string> {
        return SetFrom.subjectPredicate(this, ACL.mode, NamedNodeAs.string, NamedNodeFrom.string)
    }

    //#endregion

    //#region Access Subjects

    /**
     * Denotes an agent being given the access permission.
     *
     * @see https://solidproject.org/TR/wac#acl-agent
     */
    get agent(): Set<string> {
        return SetFrom.subjectPredicate(this, ACL.agent, NamedNodeAs.string, NamedNodeFrom.string)
    }

    /**
     * Denotes a class of agents being given the access permission.
     *
     * @see https://solidproject.org/TR/wac#acl-agentclass
     */
    get agentClass(): Set<string> {
        return SetFrom.subjectPredicate(this, ACL.agentClass, NamedNodeAs.string, NamedNodeFrom.string)
    }

    /**
     * Denotes a group of agents being given the access permission.
     *
     * @see https://solidproject.org/TR/wac#acl-agentgroup
     */
    get agentGroup(): Group | undefined {
        return OptionalFrom.subjectPredicate(this, ACL.agentGroup, TermAs.instance(Group))
    }

    set agentGroup(value: Group | undefined) {
        OptionalAs.object(this, ACL.agentGroup, value, TermFrom.instance)
    }

    /**
     * Denotes the origin of an HTTP request that is being given the access permission.
     *
     * @see https://solidproject.org/TR/wac#acl-origin
     */
    get origin(): Set<string> {
        return SetFrom.subjectPredicate(this, ACL.origin, NamedNodeAs.string, NamedNodeFrom.string)
    }

    //#endregion

    get type(): Set<string> {
        return SetFrom.subjectPredicate(this, RDF.type, NamedNodeAs.string, NamedNodeFrom.string)
    }

    //#endregion

    //#region Computed

    /**
     * @see https://solidproject.org/TR/wac#authorization-conformance
     */
    get conforms(): boolean {
        if (!this.type.has(ACL.Authorization)) {
            return false
        }

        if (this.accessTo === undefined || this.default === undefined) {
            return false
        }

        if (this.mode.size === 0) {
            return false
        }

        if (this.agent.size === 0 && (this.agentGroup == undefined || this.agentGroup.hasMember.size === 0) && this.agentClass.size === 0 && this.origin.size === 0) {
            return false
        }

        return true
    }

    get accessibleToAny(): boolean {
        return this.agentClass.has(FOAF.Agent)
    }

    set accessibleToAny(value: boolean) {
        this.overwrite(this.agentClass, FOAF.Agent, value)
    }

    get accessibleToAuthenticated(): boolean {
        return this.agentClass.has(ACL.AuthenticatedAgent)
    }

    set accessibleToAuthenticated(value: boolean) {
        this.overwrite(this.agentClass, ACL.AuthenticatedAgent, value)
    }

    get canRead(): boolean {
        return this.mode.has(ACL.Read)
    }

    set canRead(value: boolean) {
        this.overwrite(this.mode, ACL.Read, value)
    }

    get canWrite(): boolean {
        return this.mode.has(ACL.Write)
    }

    set canWrite(value: boolean) {
        this.overwrite(this.mode, ACL.Write, value)
    }

    get canAppend(): boolean {
        return this.mode.has(ACL.Append)
    }

    set canAppend(value: boolean) {
        this.overwrite(this.mode, ACL.Append, value)
    }

    get canCreate(): boolean {
        return this.canWrite || this.canAppend
    }

    get canUpdate(): boolean {
        return this.canCreate
    }

    get canDelete(): boolean {
        return this.canWrite
    }

    set canDelete(value: boolean) {
        this.canWrite = value
    }

    get canReadWriteAcl(): boolean {
        return this.mode.has(ACL.Control)
    }

    set canReadWriteAcl(value: boolean) {
        this.overwrite(this.mode, ACL.Control, value)
    }

    //#endregion

    //#region Utilities

    private overwrite(set: Set<string>, object: string, value: boolean) {
        set.delete(object)

        if (!value) {
            return
        }

        set.add(object)
    }

    //#endregion
}
