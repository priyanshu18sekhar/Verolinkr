const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers, null, 2)}`);

    const coop = res.headers['cross-origin-opener-policy'];
    console.log('\n--- CHECK RESULT ---');
    if (coop === 'same-origin-allow-popups') {
        console.log('✅ PASS: Cross-Origin-Opener-Policy is "same-origin-allow-popups"');
    } else if (coop === 'unsafe-none') {
        console.log('⚠️  WARN: Cross-Origin-Opener-Policy is "unsafe-none" (This usually works but same-origin-allow-popups is preferred)');
    } else {
        console.log(`❌ FAIL: Cross-Origin-Opener-Policy is "${coop}". Expected "same-origin-allow-popups" or "unsafe-none".`);
    }
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.end();
