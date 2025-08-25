# Playwright setup and commands

-npm init playwright@latest
-npx playwright test  
-npx playwright show-report
-npx playwright test example.spec.ts
-npx playwright test -g "has title" --project=chromium
-npx playwright test --project=chromium
-npx playwright test --project=chromium --headed
-npx playwright test --project=chromium --trace on
-npx playwright test --project=chromium --debug
-npx playwright test --ui
-docker build -t mern-jobify-test .
-docker-compose up --build

# Playwright more login test commands

-await page.getByRole('textbox', { name: 'email' }).click()
-await page.getByLabel('Email').fill(testuser);
-await page.getByLabel('Password').fill(testPassword);
-await page.locator('#email').click();
