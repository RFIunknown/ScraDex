(async () => { 
    try {
        const { twitter, gdrive } = require("ScraDex"); // Import dari module ScraDex
        const data = await gdrive("https://drive.google.com/file/d/1gaESnr00uRO14DDexwEczgxe_gmerPfN/view?usp=drivesdk");
        console.log(data); // Output JSON
    } catch (error) {
        console.error("Error fetching:", error.message);
    }
})();
