"use server";
import { Account, Avatars, Client, Databases, Storage } from "node-appwrite"
import { appwriteConfig } from "./config"
import { cookies } from "next/headers";

//node-appwrite
export const createSessionClient = async () => {
    const client = new Client()
        .setEndpoint(appwriteConfig.endpointUrl)
        .setProject(appwriteConfig.projectId);
    
    const session = (await cookies()).get('appwrite-session');
    //check 
    if(!session || !(session.value)) throw new Error("no session is available");
    //if success
    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);

        },
        get databases() {
            return new Databases(client);
        },
    };
};

export const createAdminClient = async () => {
    const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);



return {
    get account() {
        return new Account(client);

    },
    get databases() {
        return new Databases(client);
    },
    get storage() {
        return new Storage(client);
    },
    get Avatars() {
        return new Avatars(client);
    }
};
}