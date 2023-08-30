import useDeepl from "../utils/useDeepl";

const replyToMessage = async (ctx: any, messageId: string, string: string) =>
	ctx.reply(string, {
		reply_to_message_id: messageId,
	});

const deepl = async () => async (ctx: any) => {
	const messageId = ctx.message.message_id;
  await replyToMessage(ctx, messageId, `I am improving your text, please wait...`);
  const improvementResult: string = await useDeepl(ctx.message.text);
	await replyToMessage(ctx, messageId, `${improvementResult}`);
};

export { deepl };
