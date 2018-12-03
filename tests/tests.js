const fs = require('fs')
const test_config_file = '/tmp/pasteblink_test_config.json'

describe('integration tests', function () {
  this.timeout('15s')
  let page_1, page_2, controller_page;
  let incognitoContext;

  before (async function () {
    page_1 = await browser.newPage();
    page_2 = await browser.newPage();
    incognitoContext = await browser.createIncognitoBrowserContext();
    controller_page = await incognitoContext.newPage();
    let test_config = JSON.parse(
      fs.readFileSync(test_config_file, 'utf8'))
    await page_1.goto(test_config.server_address);
    await page_2.goto(test_config.server_address);
  });

  after (async function () {
    await page_1.close();
  })

  it('should have the correct page title', async function () {
    this.timeout('2s')
    this.slow('0.3s')
    expect(await page_1.title()).to.eql('pasteblink-frontend');
  });

  it('should pair 2 users together', async function() {
    this.timeout('5s')
    this.slow('2.5s')
    let QR_URL_SELECTOR = "#qr_url"

    await page_1.waitFor(QR_URL_SELECTOR)
    let page_1_qr_url = await page_1.$eval(QR_URL_SELECTOR, div => div.innerText);

    await page_2.waitFor(QR_URL_SELECTOR)
    let page_2_qr_url = await page_2.$eval(QR_URL_SELECTOR, div => div.innerText);

    await controller_page.goto(page_1_qr_url)
    await controller_page.goto(page_2_qr_url)

    let HEADING_SELECTOR = "#server_message > h1"
    await page_1.waitFor(HEADING_SELECTOR)
    heading = await page_1.$eval(HEADING_SELECTOR, heading => heading.innerText);

    expect(heading).to.eql("In active session!")
  })

  it('should pass messages between paired clients', async function() {
    this.timeout('10s')
    this.slow('5s')
    let TEXT_AREA_SELECTOR = "#pastearea"
    let SEND_BUTTON_SELECTOR = "button#sendbutton"
    let CLIPS_SELECTOR = "#clips > *"

    await page_1.bringToFront()
    await page_1.waitFor(TEXT_AREA_SELECTOR)
    await page_1.type(TEXT_AREA_SELECTOR, "hello")
    await page_1.waitFor(SEND_BUTTON_SELECTOR)
    await page_1.click(SEND_BUTTON_SELECTOR)

    await page_2.bringToFront()
    await page_2.waitFor(CLIPS_SELECTOR)
    let clips = await page_2.$$(CLIPS_SELECTOR)
    let firstClip = await clips[0].$eval(".message_text", elem => elem.innerText)
    expect(firstClip).to.eql('hello')
  })
})
