import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDB(){
    try {
        await databases.get(db);
        console.log("database connection");
        
    } catch (error) {
        try {
            await databases.create(db,db);
            console.log("database created");
            // creating collections
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection()
            ])
            console.log("collection created");
            console.log("databasee connected");
            
        } catch (error) {

            console.log("error creating databases or collections");
            
        }

    }

    return databases;
}