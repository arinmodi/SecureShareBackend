const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../index")
const fs = require("fs")

chai.use(chaiHttp)

const { expect } = chai;

/*
    Testing File Upload Feature
*/
describe("Testing Delete Expired File Feature : ", () => {

    let searchKey = ""

    it ("1. Test Upload File Post API at /upload/file", (done) => {
        const pathToAssetFile = process.env.IMAGE_FILE_PATH

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

    it ("2. Test Delete Expired File Post API at /delete/expired", (done) => {
        chai
            .request(server)
            .post("/delete/expired")
            .then((result) => {
                expect(result.status).to.be.equal(200)
                expect(result.body.message).to.be.equal(undefined)
                done()
            }).catch((error) => {
                console.log(error)
            })
    })

})