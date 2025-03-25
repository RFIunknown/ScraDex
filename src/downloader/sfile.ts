import axios from "axios";
import * as cheerio from "cheerio";
import { errorHandling } from "../Interface";

// Interface untuk response SFile scraper
export interface SFileResponse {
    metadata: {
        filename: string;
        mimetype: string;
        uploaded: string;
        download: string;
        author: string;
    };
    download: Buffer;
}

export async function sfiledl(url: string) {
    return new Promise<SFileResponse | errorHandling>(async (resolve, reject) => {
        try {
            const headers: Record<string, string> = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
                Referer: url,
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
            };

            const { data: info, headers: responseHeaders } = await axios.get(url, { headers });
            const cookies = responseHeaders["set-cookie"]?.map((cookie) => cookie.split(";")[0]).join("; ") || "";
            headers["Cookie"] = cookies;

            const $ = cheerio.load(info);
            let result: SFileResponse = {
                metadata: {
                    filename: $(".file-content img").attr("alt") || "",
                    mimetype: $(".list").eq(0).text().trim().split("-")[1]?.trim() || "",
                    uploaded: $(".list").eq(2).text().trim().split(":")[1]?.trim() || "",
                    download: $(".list").eq(3).text().trim().split(":")[1]?.trim() || "",
                    author: $(".list").eq(1).find("a").text().trim() || "",
                },
                download: Buffer.alloc(0),
            };

            const downloadUrl = $("#download").attr("href") || "";
            if (!downloadUrl) {
                return reject({ message: "Failed to find download link." } as errorHandling);
            }

            headers.Referer = downloadUrl;
            const { data: process } = await axios.get(downloadUrl, { headers });
            const $2 = cheerio.load(process);

            const key = $2("#download").attr("onclick")?.split("'+'")[1]?.split("';")[0] || "";
            if (!key) {
                return reject({ message: "Failed to retrieve download key." } as errorHandling);
            }

            const { data: buffer } = await axios.get(`${downloadUrl}&k=${key}`, {
                headers,
                responseType: "arraybuffer"
            });

            result.download = buffer;
            resolve(result);
        } catch (error: any) {
            return reject({ message: error.message } as errorHandling);
        }
    });
}