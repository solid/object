export const FOAF = {
  isPrimaryTopicOf: "http://xmlns.com/foaf/0.1/isPrimaryTopicOf",
  primaryTopic: "http://xmlns.com/foaf/0.1/primaryTopic",
  name: "http://xmlns.com/foaf/0.1/name",
  email: "http://xmlns.com/foaf/0.1/email",
  homepage: "http://xmlns.com/foaf/0.1/homepage",
  knows: "http://xmlns.com/foaf/0.1/knows",

  /**
   * @remarks [When used in WAC](https://solidproject.org/TR/wac#acl-agentclass-foaf-agent), allows access to any agent, i.e., the public.
   */
  Agent: "http://xmlns.com/foaf/0.1/Agent",
} as const;
