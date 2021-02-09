let express=require('express');
// let bodyparser = require('body-parser')
let app=express();
let fetch=require('node-fetch');
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.urlencoded())
app.use(express.json())

app.get("/admin",async(req,res)=>{
    // let response = await fetch("https://hyrefeed-backend-dev.herokuapp.com/user/allUsers");
    // let userData = await response.json();
    let userData={};
    res.render('user.ejs',{users:userData});
});
app.get("/admin/payment", async(req, res)=>{
    let clientDetails = [
        {
        date : "2021-02-08",
        type : "basic",
        clientName : "Arunit",
        qty : 5,
        amount : 2000,
        netAmount : 5000
    },
    {
        date : "2021-02-06",
        type : "premium",
        clientName : "Yash",
        qty : 5,
        amount : 2000,
        netAmount : 5000
    },
    {
        date : "2021-02-04",
        type : "basic",
        clientName : "arunit",
        qty : 5,
        amount : 2000,
        netAmount : 5000
    },
    {
        date : "2021-02-02",
        type : "premium",
        clientName : "nishu",
        qty : 5,
        amount : 2000,
        netAmount : 6000
    }]
    res.render("payment.ejs", {clientDetails : clientDetails});
});

app.get("/admin/organization", async(req, res)=>{
    res.render("organization.ejs");
})

app.get("/admin/createAccount",async(req,res)=>{
    res.render('createAccount.ejs');
});
app.get("/admin/reset",async(req,res)=>{
    res.render("resetPassword.ejs");
});
app.get("/admin/forgot",async(req,res)=>{
    res.render("forgotPassword.ejs");
});
app.get("/admin/user",async(req,res)=>{
    res.render('getUser.ejs');
});
app.get("/admin/application",async(req,res)=>{
    res.render('application.ejs');
});

app.get("/admin/getjob",async (req,res)=>{
    res.render("getjob.ejs");
})
app.get("/admin/addjob",async (req,res)=>{
    res.render("addjob.ejs");
});
app.get("/admin/editjob",async(req,res)=>{
    res.render("editjob.ejs")
});
app.get("/admin/login",async(req,res)=>{
    res.render("login.ejs");
})
app.get("/admin/addusers",async(req,res)=>{
    let jobs = await fetch("http://hyrefeed-backend-dev.herokuapp.com/admin/jobs/all")
    let set = new Set()
    for( let i = 0; i< jobs.jobs.length; i++) {
        set.add(jobs.jobs[i].organization)
    }
    let users = await fetch("http://hyrefeed-backend-dev.herokuapp.com/admin/users/all")
    res.render("adduser.ejs",{users: users.users , jobs: jobs.jobs , companies : set});
});
app.get("/admin/recruiter",async(req,res)=>{
    let response = await fetch("http://hyrefeed-backend-dev.herokuapp.com/admin/jobs/all")
    let jobs = await response.json();
    console.log(jobs)
    res.render("recruiter.ejs",{ jobs : jobs.jobs });
});
app.get("/admin/jobdetails/:id",async(req,res)=>{
    let response = await fetch("http://hyrefeed-backend-dev.herokuapp.com/admin/jobs/"+req.params.id)
    let resp = await response.json()
    let jobdesc = resp.job
    console.log(jobdesc)
    res.render("jobdetails.ejs",{ job : jobdesc});
});
app.get("/admin/setquestion/:id",async(req,res)=>{

    
    // console.log(req)
    var jobID = req.params.id
    let jobVideos = await fetch("http://localhost:5000/admin/jobs/"+jobID+"/allVideos")
    jobVideos = await jobVideos.json()
    jobVideos = jobVideos.jobVideos
    // console.log(jobVideos)
    // if(req.query){
    //     console.log(req.query)
    // }
    let response = await fetch("http://hyrefeed-backend-dev.herokuapp.com/admin/jobs/"+jobID)
    let resp = await response.json()
    let jobdesc = resp.job
    // console.log("jobdesc:",jobdesc)
    res.render("setquestions.ejs",{jobdesc : jobdesc, jobVideos:jobVideos });
});
app.post("/admin/postquestion/:id",async(req,res)=>{
    // console.log(req)
    var jobID = req.params.id
    var body = req.body
    let resp_body ={}
    let type = {
        "mcq":1,
        "subjective":2,
        "end":4,
        "audio":3
    }
    // console.log("body: ",body)
    if (body) {
        // console.log(body)
        let arr = []
        for(let i = 0; i < body.option.length; i++){
            if(body.option[i]){
                arr.push(
                    {
                        "answer":body.option[i],
                        "isEnd": "false",
                        "nextVideo":0
                    }
                )
            }
        }
        if (body.expectedAnswer){
            arr.push(
                {
                    "answer":body.expectedAnswer,
                    "isEnd":false,
                    "nextVideo":0
                }
            )
        }
        let response = await fetch("http://localhost:5000/admin/jobs/"+jobID+"/addVideo")
        let resp = await response.json()
        // console.log(resp)
        if(resp.success){
            // console.log("jobVideo: ",resp.jobVideo)
            resp_body.id = resp.jobVideo.id
            // console.log("resp_body: ",resp_body)
            // let form_data = new FormData()
            
            let update_jobVideo = await fetch("http://localhost:5000/admin/jobs/"+jobID+"/setVideo",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  mode: 'cors',
                credentials: "include",
                body: JSON.stringify({
                        name: body.question_topic,
                        question : body.question,
                        mcqOptions : arr,
                        expectedAnswer : body.expectedAnswer,//mcqOptions
                        questionType :  type[body.question_type],
                        id: resp.jobVideo.id
                })
            })
            update_jobVideo = await update_jobVideo.json()
            console.log(update_jobVideo)
        }

    }
    res.redirect("/admin/setquestion/"+jobID)
});
app.post("/admin/savenextquestions/:id",async(req,res)=>{
    console.log(req.body.jobVideoNew)
    res.redirect("/admin/setquestion/"+req.params.id)
})
app.get("/admin/videopresenter",async(req,res)=>{
    res.render("videopresenter.ejs");
});
app.get("/admin/viewquestion",async(req,res)=>{
    res.render("getquestion.ejs");
});
app.get("/admin/videopresenter2",async(req,res)=>{
    res.render("videopresenter2.ejs");
});
app.get("/admin/videoeditor",async(req,res)=>{
    res.render("videoeditor.ejs");
});
app.get("/admin/videoeditor2",async(req,res)=>{
    res.render("videoeditor2.ejs");
});
app.get("/admin/screening",async(req,res)=>{
    res.render("screening.ejs");
});
app.get("/admin/screening2",async(req,res)=>{
    res.render("screening2.ejs");
});

app.get("/admin/userinfo",async(req,res)=>{
    res.render("moreInfo.ejs");
});
app.get("/admin/draft",async(req,res)=>{
    res.render("draft.ejs");
});
app.post("/admin/invite", async(req,res)=>{
    try{
        console.log(req.body)

    }catch(error){
        res.status(error.statusCode || 500).send({ success: false, message: error.message});
    }
})
app.listen(process.env.PORT || 8000,()=>{
    console.log("server started on port 8000");
});
