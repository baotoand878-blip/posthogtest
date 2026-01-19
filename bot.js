


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
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    console.log("随机到的数字是:", randomNumber);
      if (randomNumber >= 8) {
         // 模拟点击
    if (isGreenVisible) await page.click('.btn-green');
       
    } else {
         // 模拟点击
    if (isBlueVisible) await page.click('.btn-blue');
       
    }



    await page.waitForTimeout(7000);
    await browser.close();
  }
})();
