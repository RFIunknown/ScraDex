import axios from "axios";
import * as cheerio from "cheerio"; 
import { errorHandling } from "../Interface";

interface NewsResult {
    media: string;
    title: string;
    url: string;
    description: string;
}

export async function detiknews(query: string): Promise<NewsResult[] | errorHandling> {
    return new Promise(async (resolve) => {
        if (!query) return resolve({ error: true, message: "Masukkan kata kunci untuk mencari berita." });

        try {
            const searchUrl = `https://www.detik.com/search/searchall?query=${encodeURIComponent(query)}`;
            const { data } = await axios.get(searchUrl);
            const $ = cheerio.load(data);

            let results: NewsResult[] = [];

            $(".media__text").each((_, el) => {
                const media = $(el).find("h2").text().trim() || "Detik News";
                const title = $(el).find("a").text().trim();
                const url = $(el).find("a").attr("href") || "";
                const description = $(el).find(".media__desc").text().trim() || "Tidak ada deskripsi.";

                if (title && url) {
                    results.push({ media, title, url, description });
                }
            });

            if (results.length === 0) {
                return resolve({ error: true, message: "Tidak ditemukan berita untuk kata kunci tersebut." });
            }

            resolve(results.slice(0, 10)); // Hanya ambil 10 hasil teratas
        } catch (error: any) {
            resolve({ error: true, message: error.message || "Terjadi kesalahan saat mengambil data." });
        }
    });
}
