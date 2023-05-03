import express from "express";
import {deleteUserById, getUserById, getUsers} from "../db/user";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users).end();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const deletedUser = await deleteUserById(id);
        return res.status(200).json(deletedUser).end();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const {username} = req.body;
        if (!username) {
            return res.sendStatus(400);
        }

        const updatedUser = await getUserById(id);
        updatedUser.username = username;
        await updatedUser.save();

        return res.status(200).json(updatedUser).end();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}