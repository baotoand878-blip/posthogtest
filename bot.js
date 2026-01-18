


const { chromium } = require('playwright');

(async () => {
  // 模拟 10 次访问
  for (let i = 0; i < 10; i++) {
    const browser = await chromium.launch();
    
    // 关键：每次创建一个全新的上下文（模拟新用户、清空 Cookie）
    const context = await browser.newContext(); 
    const page = await context.newPage();

    await page.goto('https://baotoand878-blip.github.io/posthogtest/');
    
    // 等待 PostHog 分流逻辑执行
    await page.waitForTimeout(3000); 

    // 检查机器人看到了哪个按钮并打印出来
    const isGreenVisible = await page.isVisible('.btn-green');
    const isBlueVisible = await page.isVisible('.btn-blue');
    
    console.log(`访客 ${i} 看到的按钮是: ${isGreenVisible ? '绿色' : '蓝色'}`);

    // 模拟点击
    if (isGreenVisible) await page.click('text=绿色按钮');
    if (isBlueVisible) await page.click('text=蓝色按钮');

    await page.waitForTimeout(2000);
    await browser.close();
  }
})();
