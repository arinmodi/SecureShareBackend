const admin = require("firebase-admin")

module.exports =  (path) => {
    const serviceAccount = require(path);

	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	});
}