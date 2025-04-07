import axios from "axios";
import { errorHandling } from "../Interface";

interface ThreadsResponse {
  success: boolean;
  download_url?: string;
  message?: string;
  error?: any;
}

export async function threadsdl(url: string): Promise<ThreadsResponse | errorHandling> {
  return new Promise<ThreadsResponse | errorHandling>(async (resolve, reject) => {
    try {
      const apiUrl = `https://snapthreads.net/api/download?url=${encodeURIComponent(url)}`;
      
      const response = await axios.get(apiUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36",
          "Referer": "https://snapthreads.net/id",
          "Accept": "/",
          "X-Requested-With": "XMLHttpRequest"
        }
      });

      if (response.data && response.data.directLink) {
        resolve({
          success: true,
          download_url: response.data.directLink
        });
      } else {
        reject({
          success: false,
          message: "Gagal mengambil link download.",
          error: response.data
        });
      }
    } catch (error: any) {
      console.error("Error:", error.response ? error.response.data : error.message);
      reject({
        success: false,
        message: "Terjadi kesalahan dalam mengambil data.",
        error: error.response ? error.response.data : error.message
      });
    }
  });
}
