const { chromium } = require('playwright');

(async () => {
  // 启动浏览器
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 1. 访问你的 GitHub Pages 页面
  console.log('正在访问页面...');
  await page.goto('https://baotoand878-blip.github.io/posthogtest/'); 

  // 2. 等待 2 秒，确保 PostHog 加载完成
  await page.waitForTimeout(2000);

  // 3. 模拟点击按钮 (假设你的按钮文字是 "点我")
  // 如果你有多个按钮，可以多写几行不同的点击
  console.log('正在点击按钮...');
  await page.click('text=绿色按钮'); 

  // 4. 再等 1 秒，确保数据发给 PostHog
  await page.waitForTimeout(1000);

  await browser.close();
  console.log('测试完成！数据已发送。');
})();
