/* Data Parameterization – Requirement Hints
1. Externalize application credentials using .env file to avoid hardcoding sensitive data.
2. Maintain test input data (Create Lead details) in createLead.csv to support multiple test
executions with different datasets.
3. Store update/edit test data separately in editLead.json to validate data modification scenarios.
4. Implement dynamic test execution by looping through CSV records so the same test runs for
multiple data sets automatically.
Test Execution Steps
5. Launch browser and navigate to application URL from environment variable.
6. Enter username and password from environment file.
7. Click Login button.
8. Click on 'CRM/SFA' link.
9. Navigate to 'Leads' section.
10. Click on 'Create Lead'.
11. Enter Company Name from CSV data.
12. Enter First Name from CSV data.
13. Enter Last Name from CSV data.
14. Click Create button.
15. Click Edit button on created Lead page.
16. Update Company Name from JSON file.
17. Update First Name from JSON file.
18. Update Last Name from JSON file.
19. Click Update button */

import test from '@playwright/test'
import dotenv from 'dotenv'
import {parse} from 'csv-parse/sync'
import fs from 'fs'
import editLead from '../../HelperLogin/editLead.json'

//const environment = process.env.envFile||'QA'||'Credentials'
const value = dotenv.config({path:'HelperLogin/Data.env'})
const readValue:any[] = parse (fs.readFileSync("HelperLogin/CreateLead.csv"),{
    columns:true,
    skip_empty_lines:true,
})

for (let data of readValue){

test ("E2E Data Para", async({page})=>{
    let url = process.env.Data_Url as string
    let user = process.env.Data_Username as string
    let pass = process.env.Data_Password as string

    await page.goto(url)
    await page.locator("#username").fill(user)
    await page.locator("#password").fill(pass)
    await page.locator(".decorativeSubmit").click()
    await page.locator("//a[contains(text(),'CRM')]").click()
    await page.locator("//a[text()='Leads']").click()
    await page.locator("//a[text()='Create Lead']").click()
    await page.locator("//input[@id='createLeadForm_companyName']").fill(data.companyName)
    await page.locator("#createLeadForm_firstName").fill(data.firstName)
    await page.locator("#createLeadForm_lastName").fill(data.lastName)
    await page.locator("//input[@name='submitButton']").click()
    await page.locator("//a[text()='Edit']").click()
    await page.locator("#updateLeadForm_companyName").fill(editLead.editcompanyName)
    await page.locator("#updateLeadForm_firstName").fill(editLead.editfirstName)
    await page.locator("#updateLeadForm_lastName").fill(editLead.editlastName)
    await page.locator("(//input[@name='submitButton'])[1]").click()
})

}