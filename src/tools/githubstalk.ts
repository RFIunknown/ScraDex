import axios from "axios";
import { errorHandling } from "../Interface"; 

interface GithubUser {
    username: string;
    nickname: string | null;
    bio: string | null;
    id: number;
    nodeId: string;
    profile_pic: string;
    url: string;
    type: string;
    admin: boolean;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    public_repo: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

export async function githubStalk(user: string): Promise<GithubUser | errorHandling> {
    return new Promise(async (resolve) => {
        try {
            const { data } = await axios.get(`https://api.github.com/users/${user}`);

            const result: GithubUser = {
                username: data.login,
                nickname: data.name,
                bio: data.bio,
                id: data.id,
                nodeId: data.node_id,
                profile_pic: data.avatar_url,
                url: data.html_url,
                type: data.type,
                admin: data.site_admin,
                company: data.company,
                blog: data.blog,
                location: data.location,
                email: data.email,
                public_repo: data.public_repos,
                public_gists: data.public_gists,
                followers: data.followers,
                following: data.following,
                created_at: data.created_at,
                updated_at: data.updated_at
            };

            resolve(result);
        } catch (error: any) {
            resolve({
                error: true,
                message: "Terjadi kesalahan saat mengambil data pengguna GitHub.",
            });
        }
    });
}