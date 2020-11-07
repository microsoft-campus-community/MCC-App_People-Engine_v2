import { query } from "./graph";
import { getUser } from "./users";

export async function getCampus(campusId:string) {
    return (await query("/groups/"+campusId));
}
export async function getAllCampus() {
    return (await query("/groups?$filter=startsWith(displayName,'Campus')&$select=id,displayName,"));
}
export async function getCampusLead(campusId:string) {
    const leadId = await query("/groups/"+campusId + "?$select=ext5xtebhdf_mccGroupSettings");
    return (await getUser(leadId.ext5xtebhdf_mccGroupSettings.leadId))
}