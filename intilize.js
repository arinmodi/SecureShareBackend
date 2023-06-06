const admin = require("firebase-admin")

module.exports =  () => {
    const serviceAccount = require("./secret/key.json");

	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	});
}