module.exports = {
	config: {
		name: 'mayra',
		version: '2.5.4',
		author: 'Deku', // credits owner of this api
		role: 2,
		countDown: 120,
		category: 'Ai',
		shortDescription: {
			en: '[👑] Mayra Ai  pro',
		},
		guide: {
			en: '{pn} [prompt]',
		},
	},

	onStart: async function ({ api, event, args }) {
	 
// normal code ↓
   
    const axios = require("axios");
		let prompt = args.join(" "),
			uid = event.senderID,
			url;
		if (!prompt) return api.sendMessage(`1▪︎ #mayra [Question] 
-Ex: #Mayra Salut ! 

 2▪︎ #mayra [répondre une photo] [questions]
 -Ex: #mayra Faites cet exercice`, event.threadID);
		api.sendTypingIndicator(event.threadID);
		try {
api.setMessageReaction("⏳", event.messageID, (err) => console.log(err), true);
			const geminiApi = `https://gemini-api.replit.app`;
			if (event.type == "message_reply") {
				if (event.messageReply.attachments[0]?.type == "photo") {
					url = encodeURIComponent(event.messageReply.attachments[0].url);
					const res = (await axios.get(`${geminiApi}/gemini?prompt=${prompt}&url=${url}&uid=${uid}`)).data;
					return api.sendMessage(res.gemini, event.threadID);
				} else {
					return api.sendMessage('Please reply to an image.', event.threadID);
				}
			}
			const response = (await axios.get(`${geminiApi}/gemini?prompt=${prompt}&uid=${uid}`)).data;
api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
			return api.sendMessage(response.gemini, event.threadID);
		} catch (error) {
			console.error(error);
			return api.sendMessage('❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that\'s causing the problem, and it might resolve on retrying.', event.threadID);
		}
	}
};
