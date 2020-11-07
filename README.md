Campus Schema:

Stored as a schema extension
Registered per user -> {
    campusId: string
}
Registered per group -> {
    leadId: string
    parentId: string
}
Why parent id? Very flexible hierarchy (Could be only campus, campus-hub or campus-hub-community)