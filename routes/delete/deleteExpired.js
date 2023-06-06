const admin = require("firebase-admin")
const { ref, deleteObject } = require('firebase/storage');
const { storage } = require('../../config/firebase');

require("dotenv").config()

/*
    Controller For Delete Expired File : Delete File data from firestore and then
    using download url delete it from storage for expired one

    expired file : whose expiry value is same as today date

    Step 1 : Firestore Doc Filtering
    Step 2 : For each delete it from fiestore and store the it's path in the array
    Step 3 : For each path in the array delete it from storage

    Note : 
    For Debug and Production Mode, we are comparing today's date
    For Test mode, we are comparig with 05-05-1965
*/
module.exports = async (req, res, next) => {
    try {

        const db = admin.firestore()

        // collection ref
        const collectionRef = db.collection('files');

        //todays date
        const date = new Date()

        let formattedDate = formatData(date.getDate()) + "-" + formatData(date.getMonth() + 1) 
        + "-" + date.getFullYear();

        console.log(process.env.NODE_ENV)

        if (process.env.NODE_ENV === "TEST") {
            console.log("true")
            formattedDate = "05-05-1965"
        }

        console.log(formattedDate)


        // Step 1 : filter the docs and get the docs
        const docRef = collectionRef.where("expiry", "==", formattedDate)
        const result = await docRef.get()

        // Step 2 : Delete each doc and pushing paths to urls array
        let urls = []

        result.forEach(async (element) => {
            const data = element.data();

            // psuh path to the array
            urls.push(data.path)

            // delete the doc
            await collectionRef.doc(element.id).delete()
        });

        if (urls.length == 0) {
            return res.status(200).send({
                message : "No Expired Files Found"
            })
        }

        // Step 3 : Delete form stoarge

        urls.forEach(async (path) => {
            // storage ref
            const storageRef = ref(storage, path);

            // deleting storage ref
            await deleteObject(storageRef)
        })

        console.log("Delete Count : " + urls.length)

        return res.status(200).send({
            count : urls.length
        })

    } catch(error) {
        console.log(error)
        return res.status(400).send({
            message : "UnExpected Error"
        })
    }
}

// used for HH and MM fromate in the date
const formatData = (input) => {
    if (input > 9) {
      return input;
    } else return `0${input}`;
};