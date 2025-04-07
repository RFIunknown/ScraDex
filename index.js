(async () => { 
    try {
        const { instagramdl, sfiledl, facebookdl, twitterdl, gdrivedl, teraboxdl, threadsdl, snackvideodl } = require("@RFIunknown/ScraDex"); // Import dari module ScraDex
        const data = await snackvideodl("https://sck.io/p/xP9sDodV");
        console.log(data); // Output JSON
    } catch (error) {
        console.error("Error fetching:", error.message);
    }
})();
