import { query } from "./graph";
import { generatePassword, replaceUmlaute, sendUserCreationMessage } from "./util";

export async function getAllUsers():Promise<Array<{[key:string]:any}>> {
    const users = await query("/users?$filter=userType eq 'Member'");
    return users;
}

export async function getUser(userId:string):Promise<Array<{[key:string]:any}>> {
    const user = await query("/users/"+userId);
    return user;
}

export async function getUsersByCampus(campusId:string):Promise<Array<{[key:string]:any}>> {
    const user = await query("/users/"+campusId);
    return user;
}

export async function createUser(firstName:string, lastName:string,alternateMail:string, campusId:string) {
    let mailLastName = lastName;
    const password = generatePassword();
    const mailAdress = replaceUmlaute(firstName)+"."+replaceUmlaute(mailLastName) + "@campus-community.org";
    if (mailLastName.indexOf(" ") >= 0) mailLastName = mailLastName.substr(0,mailLastName.indexOf(" "));

    const userPayload = {
        accountEnabled: true,
        displayName: firstName + " " + lastName,
        mailNickname: firstName + "." + mailLastName,
        userPrincipalName: mailAdress,
        passwordProfile: {
            forceChangePasswordNextSignIn: true,
            forceChangePasswordNextSignInWithMfa: false,
            password: password
        }
    }
    const user = await query("/users", "POST", undefined, userPayload);

    //TODO Include in campus
    //TODO Assign office license

    await sendUserCreationMessage(firstName,password,mailAdress,alternateMail);
    return user;
}