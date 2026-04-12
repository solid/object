export const ACL = {
    /**
     * Allows access to a class of append operations on a resource, e.g., to add information, but not remove, information on HTTP POST, PATCH requests.
     *
     * @see https://solidproject.org/TR/wac#acl-mode-append
     */
    Append: "http://www.w3.org/ns/auth/acl#Append",

    /**
     * Allows access to any authenticated agent.
     *
     * @see https://solidproject.org/TR/wac#acl-agentclass-authenticated-agent
     */
    AuthenticatedAgent: "http://www.w3.org/ns/auth/acl#AuthenticatedAgent",

    Authorization: "http://www.w3.org/ns/auth/acl#Authorization",

    accessTo: "http://www.w3.org/ns/auth/acl#accessTo",

    agent: "http://www.w3.org/ns/auth/acl#agent",

    agentClass: "http://www.w3.org/ns/auth/acl#agentClass",

    agentGroup: "http://www.w3.org/ns/auth/acl#agentGroup",

    /**
     * Allows access to a class of read and write operations on an ACL resource associated with a resource.
     *
     * @see https://solidproject.org/TR/wac#acl-mode-control
     */
    Control: "http://www.w3.org/ns/auth/acl#Control",

    default: "http://www.w3.org/ns/auth/acl#default",

    mode: "http://www.w3.org/ns/auth/acl#mode",

    origin: "http://www.w3.org/ns/auth/acl#origin",

    /**
     * Allows access to a class of read operations on a resource, e.g., to view the contents of a resource on HTTP GET requests.
     *
     * @see https://solidproject.org/TR/wac#acl-mode-read
     */
    Read: "http://www.w3.org/ns/auth/acl#Read",

    /**
     * Allows access to a class of write operations on a resource, e.g., to create, delete or modify resources on HTTP PUT, POST, PATCH, DELETE requests.
     *
     * @see https://solidproject.org/TR/wac#acl-mode-write
     */
    Write: "http://www.w3.org/ns/auth/acl#Write",
} as const;
