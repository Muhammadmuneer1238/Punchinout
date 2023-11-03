
const { response } = require('express');
const { punchIn, punchOut, punchoutPage, userDetails } = require('../helper/userHelper')
module.exports = {
    indexedDB: (req, res) => {
        res.render('index');
  
    },
    punchinDb: (req, res) => {

        let formData = req.body;

        if (formData && formData.username != '') {
            console.log("formdata", formData);

            punchIn(formData)
                .then((data) => {
                    console.log("Response from punchIn:", data);
                    res.json(data);
               })
                .catch((error) => {
                    console.error("Error from punchIn:", error);
                    res.status(500).json({ error: "An error occurred while processing the request." });
                });
        } else {
            res.redirect('/');
        } 

    },
    punchoutDb: (req, res) => {
        let formData = req.body.username

        punchoutPage(formData).then((data) => {
            let UserStatus = data.status
            console.log("UserStatus", UserStatus);
            if (UserStatus == false) {

                console.log("usernotFound status", UserStatus);
                res.render('punchout', { UserStatus })

            } else {

                let username = data.user.username
                let tasks = data.user.tasks
                console.log("Tasks for page array", tasks, UserStatus)
                res.render('punchout', { username, tasks, UserStatus })
            }

        })

    },
    userInfo: (req, res) => {

        let PunchOutForm = req.body
        console.log("Detail to userInfo", PunchOutForm)
        punchOut(PunchOutForm).then((response) => {
            res.json({ response })

        })

    },
    detailPage: (req, res) => {
        userDetails().then((activity) => {
            let activities = activity.data
            let time = activity.result

            console.log("time period ", activity)
            console.log("data", activities)
            console.log("result", time)
            res.render('details', { activities, time })
        })

    }

} 
