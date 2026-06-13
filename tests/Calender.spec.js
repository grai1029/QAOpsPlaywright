const {test,expect} = require("@playwright/test");
test('@Web Calendar validations', async({page})=>
{
 
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click(); // Click on Calendar
    await page.locator(".react-calendar__navigation__label").click(); // Click on Year Tab
    await page.locator(".react-calendar__navigation__label").click(); // Click on Year Tab
    await page.getByText(year).click(); // Click on Year 2027
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    //above returns 12 months.n(5) equivalent to 6
    await page.locator("//abbr[text()='"+date+"']").click();
 
    const inputs =  page.locator('.react-date-picker__inputGroup__input') // returns 3 elements that is month, day, year
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue(); // grabs input value i.e date
        expect(value).toEqual(expectedList[i]); // compares input value with expected vale
 
    }
 
})