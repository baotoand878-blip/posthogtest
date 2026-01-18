const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('正在访问页面...');
  // 等待网络进入空闲状态
  await page.goto('https://xn--6qqv7i14ofosyrb.github.io', { waitUntil: 'networkidle' }); 

  console.log('正在点击按钮...');
  await page.click('text=绿色按钮'); 

  // ✨ 关键修改：点击后多等 5-10 秒，给 PostHog 留出发送数据的时间
  console.log('等待数据上传...');
  await page.waitForTimeout(10000); 

  await browser.close();
  console.log('测试完成！');
})();
