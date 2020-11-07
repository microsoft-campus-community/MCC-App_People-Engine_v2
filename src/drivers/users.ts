import { getCampus, getCampusLead } from "./campus";
import { query } from "./graph";
import { generatePassword, normalize, sendUserCreationMessage } from "./util";

export async function getAllUsers():Promise<{[key:string]:any}> {
    const usersObj = await query("/users?$filter=userType eq 'Member'");
    const users:Array<any> = usersObj.value;
    const promiseArray:Array<Promise<any>> = [];
    users.forEach(user => {
        promiseArray.push(getUser(user.id));
    });
    return (await Promise.all(promiseArray));
}

export async function getUser(userId:string):Promise<{[key:string]:any}> {
    const user = await query("/users/"+userId+"?$select=accountEnabled,city,hireDate,displayName,id,jobTitle,mail,location");
    if((await isLead(userId))) user.isLead = true;
    if(userId === "30c3a150-c940-4248-ac1b-f41134db49a9") user.isAdmin = true;
    return user;
}
export async function getUserCampus(userId:string) {
    const user = await query("/users/"+userId+"?$select=extmncd1xlv_mccUserSettings");
    if(!user.extmncd1xlv_mccUserSettings) return "";
    else {
        return (await getCampus(user.extmncd1xlv_mccUserSettings.campusId));
    }
}

export async function getUsersByCampus(campusId:string):Promise<{[key:string]:any}> {
    const user = await query("/users?$filter=extmncd1xlv_mccUserSettings/campusId eq '"+campusId+"'");
    return user;
}

export async function createUser(firstName:string, lastName:string,alternateMail:string, campusId:string) {
    let mailFirstName = normalize(firstName);
    let mailLastName = normalize(lastName);
    const password = generatePassword();
    const mailAdress = mailFirstName+"."+mailLastName + "@campus-community.org";
    const usersCampus = await getCampus(campusId);
    const campusLead = await getCampusLead(campusId);
    const userPayload = {
        //Office Licenses, 
        accountEnabled: true,
        department: usersCampus.displayName,
        usageLocation: "DE",
        jobTitle: "Member",
        officeLocation: usersCampus.displayName.substr(usersCampus.displayName.indexOf(" ") + 1, usersCampus.displayName.length),
        displayName: firstName + " " + lastName,
        mailNickname: mailFirstName + "." + mailLastName,
        userPrincipalName: mailAdress,
        passwordProfile: {
            forceChangePasswordNextSignIn: true,
            forceChangePasswordNextSignInWithMfa: false,
            password: password
        },
        extmncd1xlv_mccUserSettings:
        {
            campusId: campusId
        }
    }
    const user = await query("/users", "POST", undefined, userPayload);
    await assignManager(user.id,campusLead.id);
    await assignLicense(user.id);
    //TODO Assign office license

    await sendUserCreationMessage(campusLead.displayName,campusLead.mail,password,mailAdress,alternateMail);
    return user;
}

export async function deleteUser(userId:string) {
    const user = await query("/users/"+userId, "DELETE");
}

async function isLead(userId:string) {
    const hits = await query("groups?$select=id&$filter=ext5xtebhdf_mccGroupSettings/leadId eq '"+userId+"'");
    if(hits.value.length > 0) return true;
    return false;
}

async function assignManager(userId:string, managerId:string) {
    await query("/users/"+userId+"/manager/$ref", "PUT", undefined, {"@odata.id":"https://graph.microsoft.com/v1.0/users/"+managerId});
}
async function assignLicense(userId:string) {
    await query("/users/"+userId+"/assignLicense", "POST", undefined, {
        "addLicenses": [
            {
                "skuId": "314c4481-f395-4525-be8b-2ec4bb1e9d91"
            }
        ],
        "removeLicenses": []
    })
}