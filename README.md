Campus Schema:

Stored as a schema extension
Registered per user (extmncd1xlv_mccUserSettings) -> {
    campusId: string
}
Registered per group (ext5xtebhdf_mccGroupSettings) -> {
    leadId: string
    parentId: string
}
Campus Lead -> Owner
Why parent id? Very flexible hierarchy (Could be only campus, campus-hub or campus-hub-community)