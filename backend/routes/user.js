const express = require('express');
const zod = require('zod');
const { user, bank } = require('../db.js');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET="hellohibyebye";
const authMiddleware = require('../middleware.js');

// Signup
const userschema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(6),
    firstName:zod.string().min(3),
    lastName:zod.string().min(3)
})
router.post('/signup', async (req, res) => {
    const reciedData = req.body;

    const { success } = userschema.safeParse(reciedData);
    if (!success) {
        return res.status(411).json({
            msg: 'provide valid user credentials',
        });
    }

    const { username, password, firstName, lastName } = reciedData;

    const founduser = await user.findOne({ username: username });
    if (founduser) {
        return res.status(411).json({
            msg: 'email already taken',
        });
    }

    const randomnumber = 1 + 1000 * Math.random();
    const newuser = await user.create(reciedData);
    const token = jwt.sign({ userid: newuser._id }, JWT_SECRET);
    await bank.create({
        userid: newuser._id,
        balance: randomnumber,
    });

    res.status(200).json({
        msg: 'new user created',
        token: token,
    });
});

// Signin
const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});
router.post('/signin', async (req, res) => {
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: 'invalid credentials',
        });
    }

    const foundUser = await user.findOne({ username: req.body.username, password: req.body.password });
    if (foundUser) {
        const token = jwt.sign({ userid: foundUser._id }, JWT_SECRET);
        return res.json({
            token: token,
        });
    } else {
        return res.status(411).json({
            msg: 'Error while logging in',
        });
    }
});

// Update
const updateSchema = zod.object({
    password: zod.string().min(6).optional(),
    lastName: zod.string().optional(),
    firstName: zod.string().optional(),
});
router.put('/', authMiddleware, async (req, res) => { // Added authMiddleware
    const userid = req.userId;
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: 'password is very small / invalid credentials',
        });
    }
    await user.updateOne({ _id: userid }, { $set: req.body });

    res.status(200).json({
        msg: 'user updated successfully',
    });
});

// Get all users based on some query (partial query)
router.get('/bulk',authMiddleware, async (req, res) => { // Added authMiddleware
    const activeUser=req.userId;
    const filter = req.query.filter || '';
    const usersfound = await user.find({
        $or: [
            { firstName: { $regex: filter, $options: 'i' } }, // Added $options for case insensitive search
            { lastName: { $regex: filter, $options: 'i' } },
        ],
    });
    res.json({
        users: usersfound.filter((value)=> value._id.toString() !== activeUser).map((value) => ({
            username: value.username,
            firstName: value.firstName,
            lastName: value.lastName,
            _id: value._id,
        })),
    });
});

router.get("/me", authMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        const activeUser = await user.findOne({ _id: userId }).select('-password');
        const account=await bank.findOne({userid:userId});

        if (activeUser) {
            console.log(activeUser);
            res.json({
                user:activeUser,
                account:account
            });
        } else {
            res.status(404).json({
                msg: "No such user exists"
            });
        }
    } catch (e) {
        res.status(500).json({
            msg: "An error occurred",
            error: e.message
        });
    }
});


module.exports = router; // Corrected module export
