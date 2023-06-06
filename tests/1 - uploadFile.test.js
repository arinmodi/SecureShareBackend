const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../index")
const fs = require("fs")
const intilize = require("../intilize")

before(intilize)

chai.use(chaiHttp)

const { expect } = chai;
/*
    Testing File Upload Feature
*/
describe("Testing Uplad File Feature : ", () => {

    it ("1. Test Upload File Post API at upload/file", (done) => {
        // your path to the file
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
                    done()
                } else {
                    expect(response.status).to.be.equal(200)
                    expect(response.body.searchKey.length).to.be.equal(20)
                    expect(response.body.expiry).to.be.equal("05-05-1965")
                    done()
                }
            })
    })

})