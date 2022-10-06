import mongoose from "mongoose"

export let connDB = async () => {
    return await mongoose.connect(process.env.DBURI).then((result) => {
        console.log(`connected to DB`);
        // console.log(result);
    }).catch((err) => {
        console.log(`failed to connect ${err}`);
    })
}