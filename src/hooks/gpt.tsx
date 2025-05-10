import axios from "axios";

// Make sure to load the API key from your environment variables
const API_KEY = "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";

export const sendMessageToChatGPT = async (messages: any[]) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4", // Or your preferred model
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error sending message to ChatGPT:", error);
    return "Sorry, there was an error. Please try again.";
  }
};
