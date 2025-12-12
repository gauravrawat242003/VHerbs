const { getAIResponse } = require("../utils/genAI");

exports.chatBot = async (req, res) => {
    try {
        // get user prompt
        const {content} = req.body;
        if(!content) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        const chatBotResponse = await getAIResponse(content);

        return res.status(200).json({
            success: true,
            message: "Response successfully sent to user",
            data: chatBotResponse,
        });
    } catch(err) {
        console.error("chat bot Handler error...",err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}