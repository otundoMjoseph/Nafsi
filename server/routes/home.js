import {Router} from 'express'
const router = Router();


router.get("api/home", (request, response)=>{
    console.log(request.headers.cookies);
    console.log(request.cookies);
    console.log(reuest.signedCookies.hello && request.signedCookies.hello === "world")
    // return response.send([id: 123, name: "Welcome home"]);

    return response 
    .status()
    .send({msg: "Sorry. u need the right cookie"})
})

export default router