import axios from "axios";
import qs from "qs";
import { errorHandling } from "../Interface";

export interface TiktokResponse {
    video_url: string;
    music_url: string;
    cover: string;
    author: {
        nickname: string;
        avatar: string;
    };
    stats: {
        play: number;
        like: number;
        comment: number;
        share: number;
        download: number;
    };
}

export async function tiktokdl(url: string) {
    return new Promise<TiktokResponse | errorHandling>(async (resolve, reject) => {
        let retries = 0;
        const maxRetries = 10;
        const retryDelay = 4000;

        while (retries < maxRetries) {
            try {
                const response = await axios.get(`https://tikwm.com/api/?url=${url}`);
                if (response.data?.data) {
                    resolve({
                        video_url: response.data.data.play,
                        music_url: response.data.data.music,
                        cover: response.data.data.cover,
                        author: {
                            nickname: response.data.data.author.nickname,
                            avatar: response.data.data.author.avatar,
                        },
                        stats: {
                            play: response.data.data.play_count,
                            like: response.data.data.digg_count,
                            comment: response.data.data.comment_count,
                            share: response.data.data.share_count,
                            download: response.data.data.download_count,
                        },
                    });
                    return; // Berhentiin looping
                } else {
                    throw new Error(response.data?.msg || "Unexpected API response");
                }
            } catch (error: any) {
                console.error(`Attempt ${retries + 1} failed: ${error.message}`);
                retries++;
                if (retries < maxRetries) {
                    await new Promise((resolve) => setTimeout(resolve, retryDelay));
                } else {
                    reject({ message: "Max retries reached. Download failed." } as errorHandling);
                }
            }
        }
    });
}