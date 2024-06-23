const express = require('express');
const router = express.Router();
const { user, bank } = require('../db.js');
const authMiddleware = require('../middleware');
const mongoose = require('mongoose');

// Get balance
router.get('/balance', authMiddleware, async (req, res) => {
    const userid = req.userid;
    try {
        const account = await bank.findOne({ userid: userid });
        if (account) {
            return res.json({
                msg: 'Your balance is as follows',
                balance: account.balance,
            });
        }
        return res.status(411).json({
            msg: 'No such user exists',
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal server error',
            error: error.message,
        });
    }
});

// Transfer money
router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const from = req.userId;
    const to = req.body.to;
    const amount = req.body.amount;
    console.log(from)

    try {
        const accountfrom = await bank.findOne({ userid: from }).session(session);
        console.log(accountfrom)
        const accountto = await bank.findOne({ userid: to }).session(session);

        if (!accountto || amount > accountfrom.balance) {
            await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    msg: 'Insufficient balance',
                });
                
        }
        if (!accountfrom) {
            await session.abortTransaction();
            session.endSession();
            return res.status(411).json({
                msg: 'No such users found',
            });
                
        }
         
            await bank.updateOne({ userid: from }, { $inc: { balance: -amount } }).session(session);
            await bank.updateOne({ userid: to }, { $inc: { balance: amount } }).session(session);

            await session.commitTransaction();
            session.endSession();
            return res.json({
                msg: 'Transaction successful',
            });
        }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({
            msg: 'Internal server error',
            error: error.message,
        });
    }
});

module.exports = router;
