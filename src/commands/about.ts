import { author, homepage, name} from "../../package.json";

const debug = require("debug")("bot:about_command");

const about = () => (ctx: any) => {
	const message = `*${name}*\n${author}\n${homepage}`;
	debug(`Triggered "about" command with message \n${message}`);

	return ctx.replyWithMarkdown(message);
};

export { about };
