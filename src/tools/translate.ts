import axios from "axios";
import { errorHandling } from "../Interface";

export interface TranslateResponse {
    translatedText: string;
}

export async function translate(query: string = "", lang: string): Promise<TranslateResponse | errorHandling> {
    return new Promise(async (resolve, reject) => {
        if (!query.trim()) {
            return reject({ error: true, message: "Query tidak boleh kosong" });
        }

        const url = new URL("https://translate.googleapis.com/translate_a/single");
        url.searchParams.append("client", "gtx");
        url.searchParams.append("sl", "auto");
        url.searchParams.append("dt", "t");
        url.searchParams.append("tl", lang);
        url.searchParams.append("q", query);

        try {
            const response = await axios.get(url.href);
            if (response.status !== 200) {
                return reject({ error: true, message: `Request gagal dengan status ${response.status}` });
            }

            const data = response.data;
            if (data && data[0]) {
                resolve({ translatedText: data[0].map((arr: any[]) => arr[0]).join(" ") });
            } else {
                reject({ error: true, message: "Gagal mendapatkan hasil terjemahan" });
            }
        } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : String(error);
            reject({ error: true, message: `Terjadi kesalahan: ${errMsg}` });
        }
    });
}
