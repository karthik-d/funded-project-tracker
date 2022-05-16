const { MongoClient } = require('mongodb');

async function main() {
	/**
	 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
	 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
	 */

	var password = "cchZf36i4TBv6GlK";
	const uri = "mongodb+srv://fpt_root:" + password + "@fpt-cluster-j2k2.f81v7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


	const client = new MongoClient(uri);

	try {
		// Connect to the MongoDB cluster
		await client.connect();
		console.log("connected successfully");
		// Make the appropriate DB calls
		//await  listDatabases(client);

	} catch (e) {
		console.error(e);
	} finally {

		await client.close();
	}
}

main().catch(console.error);