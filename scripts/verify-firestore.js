
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local to avoid dependencies
function loadEnv() {
    try {
        const envPath = path.join(__dirname, '..', '.env.local');
        const content = fs.readFileSync(envPath, 'utf8');
        const env = {};
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                let value = match[2].trim();
                if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                env[match[1].trim()] = value;
            }
        });
        return env;
    } catch (e) {
        console.error('Could not read .env.local', e);
        return {};
    }
}

const env = loadEnv();
const projectId = env.FIREBASE_PROJECT_ID;
const clientEmail = env.FIREBASE_CLIENT_EMAIL;
let privateKey = env.FIREBASE_PRIVATE_KEY;

const databaseId = env.FIREBASE_DATABASE_ID;

console.log('--- Firestore Verification Script ---');
console.log(`Project ID: ${projectId}`);
console.log(`Client Email: ${clientEmail}`);
if (databaseId) console.log(`Database ID: ${databaseId}`);

if (!projectId || !clientEmail || !privateKey) {
    console.error('ERROR: Missing credentials in .env.local');
    process.exit(1);
}

// Handle newlines
privateKey = privateKey.replace(/\\n/g, '\n');

try {
    const config = {
        credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
        })
    };

    if (databaseId) {
        config.databaseURL = `https://${databaseId}.firebaseio.com`;
    }

    console.log('Initializing with config:', JSON.stringify(config, (k, v) => k === 'privateKey' || k === 'credential' ? '[HIDDEN]' : v, 2));

    const { getFirestore } = require('firebase-admin/firestore');

    admin.initializeApp(config);

    const db = databaseId ? getFirestore(admin.app(), databaseId) : getFirestore();
    console.log('Attempting to list collections...');

    db.listCollections()
        .then(collections => {
            console.log('SUCCESS: Connected to Firestore!');
            console.log(`Found ${collections.length} collections.`);
            collections.forEach(col => console.log(` - ${col.id}`));
            process.exit(0);
        })
        .catch(error => {
            console.error('FAILED: Could not connect to Firestore.');
            console.error('Error Code:', error.code);
            console.error('Error Message:', error.message);
            if (error.code === 5) {
                console.error('\nNOTE: Error 5 (NOT_FOUND) usually means:');
                console.error('1. The Project ID "verolinkr" does not exist.');
                console.error('2. The Firestore Database has not been created in the Firebase Console.');
                console.error('3. The Firestore API is not enabled in Google Cloud Console.');
            }
            process.exit(1);
        });

} catch (error) {
    console.error('Initialization Error:', error);
    process.exit(1);
}
