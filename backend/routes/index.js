const express=require("express");
const bankrouter=require("./account.js")
const userRouter=require("./user.js")
const router=express.Router()



router.use("/user",userRouter);

router.use("/account",bankrouter);



module.exports=router;