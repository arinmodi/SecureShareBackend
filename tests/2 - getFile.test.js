const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../index")
const fs = require("fs")

chai.use(chaiHttp)

const { expect } = chai;

/*
    Testing File Upload Feature
*/
describe("Testing Get File Feature : ", () => {

    let searchKey = ""

    it ("1. Test Upload File Post API at /upload/file", (done) => {
        const pathToAssetFile = "D:/Personal Projects/SecureFileTransfer/SecureFileTransferBackend/assets/demo.jpg"

        chai
            .request(server)
            .post("/upload/file")
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field("expiry", "05-05-1965")
            .field("iv", "dfcv56jbsvsmfjdv==")
            .attach("file", fs.readFileSync(pathToAssetFile), "demo.jpg").end((err, response) => {
                if (err) {
                    console.log(err)
                } else {
                    expect(response.status).to.be.equal(200)
                    expect(response.body.searchKey.length).to.be.equal(20)
                    expect(response.body.expiry).to.be.equal("05-05-1965")
                    searchKey = response.body.searchKey
                    done()
                }
            })
    })

    it ("2. Test Get File Get API at /get/file", (done) => {
        chai
            .request(server)
            .get("/get/file?searchKey="+searchKey)
            .then((result) => {
                expect(result.status).to.be.equal(200)
                expect(result.body).to.have.property("expiry")
                expect(result.body).to.have.property("iv")
                expect(result.body).to.have.property("name")
                expect(result.body).to.have.property("path")
                expect(result.body).to.have.property("url")
                done()
            }).catch((error) => {
                console.log(error)
            })
    })

})