const fs = require('fs')
const test_config_file = '/tmp/pasteblink_test_config.json'

describe('sample test', function () {
  this.timeout(15000)
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
    this.slow(300)
    expect(await page_1.title()).to.eql('pasteblink-frontend');
  });

  it('should display the userid when ws server sends it', async function() {
    this.slow(1000)
    let HEADING_SELECTOR = "#server_message > h1"
    await page_1.waitFor(HEADING_SELECTOR)
    heading = await page_1.$eval(HEADING_SELECTOR, heading => heading.innerText);

    expect(heading).to.match(/Welcome! your client_id\: [0-9]+/)
  })

  it('should pair 2 users together', async function() {
    this.slow(2500)
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
})
