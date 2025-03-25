import axios from "axios";
import * as cheerio from "cheerio";
import { errorHandling } from "../Interface";

export interface SnackVideoResponse {
  status: boolean;
  code: number;
  result?: {
    title: string;
    thumbnailUrl: string;
    uploadDate: string;
    contentUrl: string;
    likes: number;
    commentCount: number;
  };
  error?: boolean;
  message?: string;
}

export async function snackvideodl(url: string): Promise<SnackVideoResponse | errorHandling> {
  return new Promise<SnackVideoResponse | errorHandling>(async (resolve, reject) => {
    if (!url.startsWith("https://www.snackvideo.com")) {
      return reject({ error: true, message: "URL tidak valid! Masukkan link SnackVideo yang benar." });
    }

    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        },
        timeout: 10000,
      });

      if (!response || !response.data) {
        return reject({ error: true, message: "Gagal mengambil halaman SnackVideo." });
      }

      const html = response.data;
      const $ = cheerio.load(html);
      const scripts: string[] = [];

      $("script").each((_, script) => {
        scripts.push($(script).html() || "");
      });


      if (scripts.length < 6) {
        return reject({ error: true, message: "Data video tidak ditemukan, mungkin struktur halaman berubah." });
      }

      let scriptData = scripts[5] || "";
      scriptData = scriptData.replace(/window\.__NUXT__\s*=\s*\{.*?\};?/, "");

      console.log("Cleaned Script Data:", scriptData);

      const getData = (key: string, endChar: string = '",') => {
        const match = scriptData.match(new RegExp(`${key}:"(.*?)${endChar}`));
        return match ? match[1] : "";
      };

      const getJsonData = (key: string) => {
        const match = scriptData.match(new RegExp(`${key}:(\\{.*?\\}|\\[.*?\\]|".*?")`));
        if (match) {
          try {
            return JSON.parse(match[1]); 
          } catch {
            return match[1]; 
          }
        }
        return "";
      };

      // Ekstraksi data
      const result = {
        title: getData("name"),
        thumbnailUrl: getJsonData("thumbnailUrl"),
        uploadDate: getData("uploadDate"),
        contentUrl: decodeUnicode(getData("contentUrl")),
        likes: parseInt(($('meta[data-hid="description"]').attr("content") || "0").split(" Like")[0]) || 0,
        commentCount: parseInt(getData("commentCount", ",")) || 0,
      };

      return resolve({ status: true, code: 200, result });
    } catch (error: unknown) {
      return reject(handleError(error));
    }
  });
}

function handleError(error: unknown): errorHandling {
  let message = "Terjadi kesalahan tidak diketahui.";

  if (axios.isAxiosError(error)) {
    message = error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return { error: true, message };
}

function decodeUnicode(str: string): string {
  return str.replace(/\\u(\w{4})/g, (match, group) => String.fromCharCode(parseInt(group, 16)));
}
