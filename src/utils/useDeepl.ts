const puppeteer = require("puppeteer-core");
const chrome = require("chrome-aws-lambda");

const useDeepl = async (text: string): Promise<string> => {
  const options =
		process.env.DEV === "false"
			? {
					args: chrome.args,
					executablePath: await chrome.executablePath,
					headless: chrome.headless,
			  }
			: { executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" };
	const browser = await puppeteer.launch(options);
	const page = await browser.newPage();
  let result: string = "";
	try {
		await page.goto("https://www.deepl.com/write");
		await page.click(
			"#panelTranslateText > div > div.lmt__sides_wrapper > section.lmt__side_container.lmt__side_container--source > div.lmt__textarea_container > div.lmt__inner_textarea_container > d-textarea",
		);
		await page.type(
			"#panelTranslateText > div > div.lmt__sides_wrapper > section.lmt__side_container.lmt__side_container--source > div.lmt__textarea_container > div.lmt__inner_textarea_container > d-textarea",
			text,
		);
		await page.waitForSelector(
			"#panelTranslateText > div > div.lmt__sides_wrapper > section.lmt__side_container.lmt__side_container--target > div.lmt__textarea_container.lmt__raise_alternatives_placement > div.lmt__inner_textarea_container > d-textarea",
			{ timeout: 10000 },
		);
		result = await page.$eval(
			"#panelTranslateText > div > div.lmt__sides_wrapper > section.lmt__side_container.lmt__side_container--target > div.lmt__textarea_container.lmt__raise_alternatives_placement > div.lmt__inner_textarea_container > d-textarea",
      (textarea: HTMLTextAreaElement)  => textarea.value,
		);
    console.log("result of the Deepl scraping..");
    console.log(result);
		return result;
	} catch (error) {
		console.error("Error:", error);
    result = `Error: ${error}`;
	} finally {
		await browser.close();
    return result;
	}
};

export default useDeepl;
