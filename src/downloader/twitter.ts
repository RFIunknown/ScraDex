import axios from "axios";
import { errorHandling } from "../Interface";

interface TwitterResponse {
    success: boolean;
    result?: {
        username: string | null;
        statusId: string | null;
        text: string | null;
        thumbnail: string | null;
        downloadLinks: string;
    };
    message?: string;
}

const isValidTwitterUrl = (url: string): boolean => {
    return /^https?:\/\/(www\.)?(x|twitter)\.com\/.+/i.test(url);
};

export async function twitterdl(link: string): Promise<TwitterResponse | errorHandling> {
    return new Promise(async (resolve) => {
        if (!isValidTwitterUrl(link)) {
            return resolve({ error: true, message: "URL tidak valid. Harap masukkan URL dari Twitter/X." });
        }

        try {
            const apiUrl = "https://www.twitterdown.com/api/parse";
            const headers = {
                "Content-Type": "application/json",
                "User-Agent":
                    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/134.0.0.0 Mobile Safari/537.36",
                "Referer": `https://www.twitterdown.com/${link.split("/").slice(-2).join("/")}`,
            };
            const postData = { url: link };
            const response = await axios.post(apiUrl, postData, { headers });

            if (!response.data || !response.data.resolutions) {
                return resolve({ error: true, message: "Gagal mengambil data dari Twitter" });
            }

            const { thumbnail, text, username, statusId, resolutions } = response.data;
            const downloadLinks = resolutions
                .map((media: { quality: string; resolution: string; url: string }) => `${media.quality} (${media.resolution}):\n${media.url}`)
                .join("\n\n");

            resolve({
                success: true,
                result: { username, statusId, text, thumbnail, downloadLinks },
            });

        } catch (error: any) {
            resolve({ error: true, message: error.message || "Terjadi kesalahan saat memproses permintaan." });
        }
    });
}
