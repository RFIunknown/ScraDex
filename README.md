<div align="center">
  <img src="https://i.supa.codes/THXJN8"/>
</div>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

# ScraDex

ScraDex adalah sebuah kumpulan berbagai macam scraper yang mencakup downloader, berita, stalk, game, dan berbagai fitur lainnya yang dirancang untuk mempermudah pengambilan data dari berbagai sumber. Proyek ini dikembangkan dengan tujuan menyediakan alat yang efisien dan mudah digunakan untuk berbagai kebutuhan scraping, mulai dari mengunduh konten dari platform media sosial hingga mendapatkan informasi terbaru dari situs berita. Semua ini adalah hasil kerja paksa dari ChatGPT yang telah berkontribusi dalam penyusunan dan pengoptimalan kode untuk memastikan fungsionalitas yang maksimal.

<p align="center">
  <img width="" src="https://img.shields.io/github/repo-size/RFIunknown/ScraDex?color=green&label=Repo%20Size&style=for-the-badge&logo=appveyor">
</p>

## Features

| Feature      | Status |
|-------------|--------|
| Games       | ✅     |
| Downloader  | ✅     |
| Tools       | ✅     |
| Fitur Laiinya       | OwTeiWei    |

## Installation

Install Hanya Dari GitHub dulu

```bash
npm install github:RFIunknown/ScraDex
```

## Contoh Penggunaan

### Downloader
<details>
<summary>Contoh Penggunaan Scraper Downloader</summary>

```js
// Import Module, Sesuaikan Saja
import {
  facebookdl,
  gdrivedl,
  instagramdl,
  sfiledl,
  snackvideodl,
  teraboxdl,
  theradsdl,
  tiktokdl,
  twitterdl
} from '@RFIunknown/Scradex';

(async () => {
  try {
    // Download video dari Facebook
    const data = await facebookdl("link");
    console.log(data);
  } catch (error) {
    console.error("Error fetching Facebook Download:", error.message);
  }

  try {
    // Download file dari Google Drive
    const data = await gdrivedl("link");
    console.log(data);
  } catch (error) {
    console.error("Error fetching Google Drive Download:", error.message);
  }
})();
```
</details>

### Games
<details>
<summary>Contoh Penggunaan Scraper Games</summary>

```js
// Import Module, Sesuaikan Saja
import {
    asahotak,
    caklontong,
    family100,
    siapakahaku,
    susunkata,
    tebakgambar,
    tebakkata,
    tebaktebakan,
    tekateki
} from '@RFIunknown/Scradex';

(async () => {
  try {
    // Game Asah Otak
    const data = await asahotak();
    console.log(data);
  } catch (error) {
    console.error("Error fetching Asah Otak:", error.message);
  }
})();
```
</details>

### Tools
<details>
<summary>Contoh Penggunaan Scraper Tools</summary>

```js
// Import Module, Sesuaikan Saja
import {
    detiknews,
    githubstalk,
    translate
} from '@RFIunknown/Scradex';

(async () => {
  try {
    // Mendapatkan berita dari Detik News
    const data = await detiknews("Tahun Baru");
    console.log(data);
  } catch (error) {
    console.error("Error fetching Detik News:", error.message);
  }
    try {
    // Mendapatkan berita dari Detik News
    const data = await translate("Hello World!", "id");
    console.log(data);
  } catch (error) {
    console.error("Error fetching Detik News:", error.message);
  }
})();
```
</details>

## Kontributor

| [![xct007](https://github.com/xct007.png?size=100)](https://github.com/xct007) | [![BochilTeam](https://github.com/BochilTeam.png?size=100)](https://github.com/BochilTeam) | [![RFIunknown](https://github.com/RFIunknown.png?size=100)](https://github.com/RFIunknown) |
|----|----|----|
| [xct007](https://github.com/xct007) | [BochilTeam](https://github.com/BochilTeam) | [RFIunknown](https://github.com/RFIunknown) |
| Inspirasi | Database Game | Pengembang Ulang |

