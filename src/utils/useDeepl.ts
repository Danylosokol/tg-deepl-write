const puppeteer = require("puppeteer-core");

const useDeepl = async (text: string): Promise<string> => {
  const browser = await puppeteer.connect({
		browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSELESS}`,
	});
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
			{ timeout: 100000 },
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
    console.log("closing browser...");
		await browser.close();
    return result;
	}
};

export default useDeepl;
