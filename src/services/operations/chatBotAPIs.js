import { apiConnector } from "../apiConnector";

import { chatbotEndponts } from "../apis";

const { CHATBOT_API } = chatbotEndponts;

// function to send user message to chat bot and returns chatbot response
export async function sendMessageToBot(content) {
    let result = "";

    try {
        // call API
        const response = await apiConnector(
            "POST",
            CHATBOT_API,
            {content},
        );

        // console.log("SEND MESSAGE TO CHATBOT API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't send message");
        }

        // set chatbot response to result
        if(response?.data?.data?.response?.candidates[0]?.content?.parts[0]?.text) {
            result = response?.data?.data?.response?.candidates[0]?.content?.parts[0]?.text;
        } else {
            result = "Something went wrong! Please try again later";
        }

    } catch(err) {
        // console.error("SEND MESSAGE TO CHATBOT API error...", err);
        // console.log("error message...", err.message);

        result = "Something went wrong! Please try again later";
    }

    // return result
    return result;
}