import axios, { AxiosError } from "axios";
import { errorHandling } from "../Interface";

export interface FacebookResponse {
    url: string;
    duration_ms: number;
    sd: string;
    hd: string;
    title: string;
    thumbnail: string;
}

export async function facebookdl(videoUrl: string, cookie?: string, useragent?: string) {
    return new Promise<FacebookResponse | errorHandling>((resolve, reject) => {
        const headers = {
            "sec-fetch-user": "?1",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-site": "none",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "cache-control": "max-age=0",
            authority: "www.facebook.com",
            "upgrade-insecure-requests": "1",
            "accept-language": "en-GB,en;q=0.9,tr-TR;q=0.8,tr;q=0.7,en-US;q=0.6",
            "sec-ch-ua": '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            "user-agent": useragent || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            cookie: cookie || "sb=Rn8BYQvCEb2fpMQZjsd6L382; datr=Rn8BYbyhXgw9RlOvmsosmVNT;",
        };

        const parseString = (string: string) => JSON.parse(`{"text": "${string}"}`).text;

        if (!videoUrl || !videoUrl.trim()) return reject({ error: "Please specify the Facebook URL" });
        if (["facebook.com", "fb.watch"].every((domain) => !videoUrl.includes(domain))) return reject({ error: "Please enter a valid Facebook URL" });

        axios.get(videoUrl, { headers })
            .then(({ data }) => {
                try {
                    data = data.replace(/&quot;/g, '"').replace(/&amp;/g, "&");
                    const sdMatch = data.match(/"browser_native_sd_url":"(.*?)"/) ||
                        data.match(/"playable_url":"(.*?)"/) ||
                        data.match(/sd_src\s*:\s*"([^"]*)"/) ||
                        data.match(/(?<="src":")[^"]*(https:\/\/[^"]*)/);
                    const hdMatch = data.match(/"browser_native_hd_url":"(.*?)"/) ||
                        data.match(/"playable_url_quality_hd":"(.*?)"/) ||
                        data.match(/hd_src\s*:\s*"([^"]*)"/);
                    const titleMatch = data.match(/<meta\sname="description"\scontent="(.*?)"/);
                    const thumbMatch = data.match(/"preferred_thumbnail":{"image":{"uri":"(.*?)"/);
                    const durationMatch = data.match(/"playable_duration_in_ms":[0-9]+/gm);
                    
                    if (!durationMatch) throw new Error("Duration not found in response data");

                    if (sdMatch && sdMatch[1]) {
                        const result: FacebookResponse = {
                            url: videoUrl,
                            duration_ms: Number(durationMatch[0].split(":")[1]),
                            sd: parseString(sdMatch[1]),
                            hd: hdMatch && hdMatch[1] ? parseString(hdMatch[1]) : "",
                            title: titleMatch && titleMatch[1] ? parseString(titleMatch[1]) : data.match(/<title>(.*?)<\/title>/)?.[1] ?? "",
                            thumbnail: thumbMatch && thumbMatch[1] ? parseString(thumbMatch[1]) : "",
                        };
                        resolve(result);
                    } else {
                        reject({ error: "Unable to fetch video information at this time. Please try again" });
                    }
                } catch (error: unknown) {
                    const errMsg = error instanceof Error ? error.message : String(error);
                    reject({ error: `Error parsing video data: ${errMsg}` });
                }
            })
            .catch((error: unknown) => {
                const errMsg = error instanceof Error ? error.message : String(error);
                reject({ error: `Unable to fetch video information. Axios Error: ${errMsg}` });
            });
    });
}
