import axios from "axios";
import { errorHandling } from "../Interface";

interface GDriveResponse {
  success: true;
  download: string;
  fileName: string;
  fileSize: string;
  mimetype: string;
  extension: string;
  modified: string;
}

export async function gdrivedl(url: string): Promise<GDriveResponse | errorHandling> {
  try {
    // Validasi URL Google Drive
    const match = url.match(/\/?id=([^&]+)/i) || url.match(/\/d\/([^/]+)/);
    if (!match) return { error: true, message: "URL Google Drive tidak valid." };

    const fileId = match[1];
    const apiUrl = `https://drive.google.com/uc?id=${fileId}&authuser=0&export=download`;

    const { data } = await axios.post(apiUrl, null, {
      headers: {
        "accept-encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        origin: "https://drive.google.com",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/65.0.3325.181 Safari/537.36",
        "x-client-data": "CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=",
        "x-drive-first-party": "DriveWebUi",
        "x-json-requested": "true",
      },
    });

    const parsedData = JSON.parse(data.slice(4));
    if (!parsedData.downloadUrl) return { error: true, message: "Gagal mendapatkan URL unduhan." };

    const headResponse = await axios.head(parsedData.downloadUrl);
    const fileSize = `${(parsedData.sizeBytes / (1024 * 1024)).toFixed(2)} MB`;
    const mimetype = headResponse.headers["content-type"];
    const modified = headResponse.headers["last-modified"];
    const extension = parsedData.fileName.split(".").pop();

    return {
      success: true,
      download: parsedData.downloadUrl,
      fileName: parsedData.fileName,
      fileSize,
      mimetype,
      extension: extension || "unknown",
      modified,
    };

  } catch (error: any) {
    return { error: true, message: error.message || "Terjadi kesalahan saat mengambil data." };
  }
}