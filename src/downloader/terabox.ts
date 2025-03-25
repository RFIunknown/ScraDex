import axios from "axios";

type TeraboxResponse = {
  status: "success";
  video_url: string;
};

type ErrorHandling = {
  status: "error";
  message: string;
  error?: string;
};

export async function teraboxdl(url: string): Promise<TeraboxResponse | ErrorHandling> {
  return new Promise<TeraboxResponse | ErrorHandling>(async (resolve, reject) => {
    try {
      const apiUrl = `https://teraboxdownloaderonline.com/api/download-m3u8?terabox_link=${encodeURIComponent(url)}`;
      const headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36",
        "Referer": `https://teraboxdownloaderonline.com/player?url=${encodeURIComponent(url)}`,
      };

      const response = await axios.get(apiUrl, { headers });
      const match = response.data.match(/#EXTINF:\d+,\s*(https[^\s]+)/);

      if (match && match[1]) {
        resolve({ status: "success", video_url: match[1] });
      } else {
        resolve({ status: "error", message: "Video URL tidak ditemukan." });
      }
    } catch (error) {
      resolve({
        status: "error",
        message: "Terjadi kesalahan saat mengambil data.",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
}
