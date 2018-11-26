const fs = require('fs')
const test_config_file = '/tmp/pasteblink_test_config.json'

describe('sample test', function () {
  this.timeout(5000)
  let page_1, page_2, controller_page;

  before (async function () {
    page_1 = await browser.newPage();
    page_2 = await browser.newPage();
    let test_config = JSON.parse(
      fs.readFileSync(test_config_file, 'utf8'))
    await page_1.goto(test_config.server_address);
  });

  after (async function () {
    await page_1.close();
  })

  it('should have the correct page title', async function () {
    expect(await page_1.title()).to.eql('pasteblink-frontend');
  });

  it('should display the userid when ws server sends it', async function() {
    let HEADING_SELECTOR = "#server_message > h1"
    await page_1.waitFor(HEADING_SELECTOR)
    heading = await page_1.$eval(HEADING_SELECTOR, heading => heading.innerText);

    expect(heading).to.match(/Welcome! your client_id\: [0-9]+/)
  })
})
