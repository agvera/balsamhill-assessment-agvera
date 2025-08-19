# Project Description:
This is an end-to-end Playwright test suite for validating the e-commerce workflow on Balsam Hill's website.
The test includes automation of the following:
- Search for product
- Product customization
- Verification of product pricing consistency across search results, product page and cart total
- Verification of correct cart count


## Pre-requisite:
- Install nodejs here: https://nodejs.org/en/download
  - Verify installation in your terminal or command prompt
    - ```node -v```
    - ```npm -v``` 
- For Windows install git https://git-scm.com/downloads/win
  - Verify git installation in your command prompt
    - ```git --version```
 
## Clone the repository and Installing Dependencies
- Clone the repository, in your terminal or command prompt type
  - ```git clone https://github.com/agvera/balsamhill-assessment-agvera.git```
- Then change to the project directory
  - ```cd balsamhill-assessment-agvera```
- Install project dependencies
  - ```npm install```
- Install Playwright browser and required dependencies
  - ```npx playwright install --with-deps```
 
## Running the tests:
- Run test using Chromium:
  - ```npm run chrome```
- Run test using all browser projects
  - ```npm run all-browsers```

## Viewing Reports:
- Playwright built-in reporter:
  - ```npm run report```
- Allure reporter:
  - Compile the report
    - ```npm run compile-report```
  - Open the report
    - ```npm run open-report```
        
