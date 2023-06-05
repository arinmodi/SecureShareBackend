const { db } = require("../../config/firebase")
const { ref, deleteObject } = require('firebase/storage');
const { storage } = require('../../config/firebase');

/*
    Controller For Delete Expired File : Delete File data from firestore and then
    using download url delete it from storage for expired one

    expired file : whose expiry value is same as today date

    Step 1 : Firestore Doc Filtering
    Step 2 : For each delete it from fiestore and store the it's path in the array
    Step 3 : For each path in the array delete it from storage
*/
module.exports = async (req, res, next) => {
    try {
    // collection ref
    const collectionRef = db.collection('files');

    //todays date
    const date = new Date()

    const formattedDate = formatData(date.getDate()) + "-" + formatData(date.getMonth() + 1) 
    + "-" + date.getFullYear();

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