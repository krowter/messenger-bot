require("dotenv").config();
import request from "request";

export const callSendAPI = (sender_id, response) => {
  const request_body = {
    recipient: {
      id: sender_id,
    },
    message: response,
  };

  request(
    {
      uri: process.env.FACEBOOK_API_URL,
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err) => {
      if (err) {
        console.error("Error when sending message:" + err);
      }
    }
  );
};
