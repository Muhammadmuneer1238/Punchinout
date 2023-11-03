const { response } = require('express');
const userModel = require('../model/userModel');

module.exports = {
    punchIn: async (data) => {
        console.log("data", data)
        let username = data.username
        let checked = data.checked
        console.log("check statut", checked)

        let completedWork = await userModel.findOne({ $and: [{ username: username }, { checked: true }] });
        console.log("User to punch in")
        return new Promise((resolve, reject) => {
            if (!completedWork) {

                const user = new userModel({
                    username: data.username,
                    tasks: data.task,
                    punchInTime: new Date(),
                    checked: true
                });

                user.save()
                resolve({ status: true })

            } else {
                resolve({ status: false })
            }

        });
    },


    punchOut: async (data) => {
        let username = data.username;
        console.log('Username:', username);
        let formData = data.formData;
        let tasks = formData.split('&').map(item => item.split('=')[1]);
      
        return new Promise(async (resolve, reject) => {
          console.log('Username:', username);
          console.log('Tasks:', tasks);
      
          var foundUser = await userModel.findOne({ username: username, checked: true });
          console.log("Found user", foundUser);
      
          if (foundUser) {
            console.log("Found user with checked status true");
      
            const punchOutTime = new Date();
            const updatedData = {
              $push: { completed: tasks },
              $set: { punchOutTime, checked: false }
            };
      
            const updateResult = await userModel.updateOne({ _id: foundUser._id }, updatedData);
            console.log("Document updated:", updateResult);
      
            resolve({ response: 'Punch out successful' });
          } else {
            console.log("User not found with checked status true to punch out");
            resolve({ response: 'User not found or not checked in' });
          }
        });
      }
      ,

    punchoutPage: async (data) => {
        let user = data
        console.log("HELPER DATA.NAME", data)

        return new Promise(async (resolve, reject) => {
            await userModel.findOne({ $and: [{ username: user }, { checked: true }] }).then((userFound) => {
                if (userFound) {
                    console.log("userFound", userFound)
                    resolve({ user: userFound, status: true });

                } else {
                    resolve({ status: false })//Hmmmm.......Code for the user not found situation 






                }
            })

        })
    },

    userDetails: () => {
        return new Promise(async (resolve, reject) => {

            let data = await userModel.find()
            console.log("Data from fin()",data)

            const result = data.map((document) => {

                const punchInTime = new Date(document.punchInTime);
                const punchOutTime = new Date(document.punchOutTime);

                if (isNaN(punchInTime) || isNaN(punchOutTime)) {
                    return 'Checked In';
                }

                const timeDifferenceInMilliseconds = punchOutTime - punchInTime;
                const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifferenceInMilliseconds / (1000 * 60)) % 60);
                const seconds = Math.floor((timeDifferenceInMilliseconds / 1000) % 60);

                const timeDiff = `${hours}:${minutes}:${seconds}s`;

                return timeDiff;
            });


            console.log("Resut frm helper ",result)
            resolve({result,data});
        })

    }
};
