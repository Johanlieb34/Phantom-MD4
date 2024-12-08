const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZURpU29sZ29naGhiZmlWTVluVnB4MmlRZ1FTZ2E3azNLazFPSFVYR2Yxaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUG8rYUhLWWdweW11c0tSTFpBNkxoNWNiMGp6Ky9vVkFHL25qN3RhWlZnYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLSENoQkZPd1hvWTFZalZ6MHRiS3NvRVBPTlI1d0pyQVdhdzQ2Q2FPR25BPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkK0lxV3FGV0ROUE55R2pmNEVwQVpvd0FZSUN0RzA4TzlwTU5kQVZYcEJNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1CMm5uQ2JUK0xYWHBKNFd1c1J0VzhGNGNsS3AzSWNBTTcyRWR3bFNoVTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9FYWRFdE45N2p2MXNzR1A1Z3cvbUltUElsNUp2U3NCWm94T0tlOXZOSEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOExsd2VzVEtqeG95Tzk4V0hGc3ZUYnBWNUMrNVpMdjdaS2tTY2FGRUsxST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRERrdGVqRHBmcThVRzVyTFZ4NTJmaUZwRUllRUhrbEVsQlArM1AyOGVIdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBDWklSZmhPMktnNXRpNjBtSXNCOW4wZTNNR1ppS1dOeHZFWUJnZUZIeFlCSDlGbXRSQzRMQThBWUxMOVYzcnhTSGlTUndHYVdZMzBBM1FPRmgzOWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjU0LCJhZHZTZWNyZXRLZXkiOiIzMzRnTUpKc1FYM3Ywd3BQWFJ6ZExLQ3hYM0I0R1JPbW1xMVFtTHRpem9ZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJhWVI1TC1JNVFNMnFsZUJXMzEwSjhRIiwicGhvbmVJZCI6IjI4NThlY2NjLWVjMzctNGQ5Ny05OWEzLTJjZWVlZWRlZTA3YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4TkpNVUJlTnBRa2NwWEhyVHFDWVhjT0M1LzQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidzFkenRrb3Fqay9GcE9rekROR0NSem13WkpZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkhOUTk3QVRBIiwibWUiOnsiaWQiOiIyMzQ5MTM0NDU3NTA5OjUxQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKcW5oNkVDRUlPVjJMb0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIrSnVBb2Q3WGJHL3NkT2FlQkJacXZnMHc0T3FKUEFWUm9ZV0YvM2dvSzF3PSIsImFjY291bnRTaWduYXR1cmUiOiIxSXNhT3Bpc2FnWFRiQ0x5OEZvR1p4K0dUcnpOM09lazRoSTlTR0V4OVh3bUtVTVV4NnI5d21zQkx1N0lQWFNjUC8zamdFM0ZnQzdDbFlOL2pyVWFCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRDQyR0pNV3F1SGd4ZFA4YmxlU0VoSHJJVWlUc2dYMzhFR2o5WFRWNy9EeVByRXRub2JzNTlvZDJFS3lOUzR6ZDczblRVbjVmMWh0ZGxuc1FhZVA3akE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTM0NDU3NTA5OjUxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZpYmdLSGUxMnh2N0hUbW5nUVdhcjROTU9EcWlUd0ZVYUdGaGY5NEtDdGMifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzM2OTIwNDksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQjNFIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Phantom",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27748255848",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Phantom-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/uuye39.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
