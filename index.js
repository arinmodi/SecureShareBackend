const chalk = require("chalk");
const fs = require("fs");
const http = require("http");
const https = require("https");

require("dotenv").config();
const app = require("./app");
const intilize = require("./intilize");

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (Number.isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}

const port = normalizePort(process.env.PORT);
app.set("port", port);

const server = http.createServer(app);

// download service account file from provided url
const downloadFile = () => {
	const path = "./secret/key.json";
	const url = process.env.FIREBASE_SERVICE_FILE

	if (process.env.NODE_ENV === "TEST") return;

	if (fs.existsSync(path) == false) { 
		const file = fs.createWriteStream(path);

		// Determine whether to use http or https module based on the URL protocol
		const client = url.startsWith('https') ? https : http;
	
		client.get(url, (response) => {
		response.pipe(file);
	
		file.on('finish', () => {
			file.close(() => {
			console.log('File downloaded successfully!');
			intilize()
			});
		});
		}).on('error', (err) => {
			fs.unlink(path, () => {
				console.error('Error while downloading file:', err);
			});
		});
	} else {
		intilize()
	}
} 

function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

	switch (error.code) {
		case "EACCES":
			console.error(`${bind} requires elevated privileges`);
			break;
		case "EADDRINUSE":
			console.error(`${bind} is already in use`);
			break;
	};

	throw error;
}

function onListening() {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

	console.log(chalk.green(
		`Server running in ${process.env.ENV || "development"} mode on ${bind}`
	));
	console.log(chalk.green(
		`Backend Available At http://localhost:` + addr.port
	));
}

downloadFile()

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

module.exports = app;