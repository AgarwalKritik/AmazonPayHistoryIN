# Amazon India Payment Details Exporter

The **Amazon India Payment Details Exporter** is a JavaScript utility that extracts payment transaction details from the [Amazon India Payment History](https://www.amazon.in/pay/history) page. The extracted details are exported as an HTML file for easy viewing and sharing.

## Features

- Extracts key transaction details, including:
  - Transaction type (Paid To / Received From)
  - Paid To / Received From entities
  - Payment method
  - Date and time of the transaction
  - Transaction amount (with handling for strikethrough amounts)
  - Payee UPI ID
  - Payment method used
  - Reference ID
- Generates an HTML file containing the transaction data.
- Responsive design for better viewing on different devices.

## Setup

First of all clone this repository using
```git clone https://github.com/AgarwalKritik/AmazonPayHistoryIN.git```

OR download it as zip file directly

### _Google Chrome_
1. Launch the Google Chrome browser.
2. Access Extensions Page:
  2.1 Click on the three vertical dots (menu) in the upper right corner.
  2.2 Go to More Tools > Extensions.
3. Enable Developer Mode: In the upper right corner of the Extensions page, toggle the Developer mode switch to ON.
4. Load Unpacked Extension:
  4.1 Click on the Load unpacked button.
  4.2 Navigate to the folder where your extension files (like manifest.json, popup.html, etc.) are located.
  4.3 Select the folder and click Open.
5. Your extension should now appear in the list of installed extensions. You can click on the icon to test it.

 ------
 
### _Mozilla Firefox_
1. Launch the Mozilla Firefox browser.
2. Access Add-ons Manager:
  2.1 Click on the three horizontal lines (menu) in the upper right corner.
  2.2 Select Add-ons and Themes.
3. Enable Debugging:
  3.1 In the Add-ons Manager, click on the gear icon (⚙️) in the top right corner.
  3.2 Select Debug Add-ons.
4. Load Temporary Add-on:
  4.1 Click on the Load Temporary Add-on button.
  4.2 Navigate to the folder where your extension files are located.
  4.3 Select any file (e.g., manifest.json) and click Open.
5. Your extension will now be loaded temporarily, and you can test it directly from the browser.

## Usage

1. Go to the [Amazon India Payment History](https://www.amazon.in/pay/history) page.
2. **Load All Transactions**: Scroll down the page to load all your transactions. Amazon initially displays only a portion of your payment history, so make sure to scroll until all transactions you want to export are visible.
3. Click on "Export Payment History" button appearing at the bottom right corner of the webpage.
4. If transactions are found, an HTML file will be automatically downloaded to your device.

## Sample Output

The exported HTML file will contain a table formatted as shown below:

| Transaction Type   | Paid To / Received From | Payment Method    | Date & Time          | Amount | Payee UPI ID   | Paid Using       | Reference ID    |
|---------------------|------------------------|--------------------|----------------------|--------|-----------------|------------------|------------------|
| Paid to             | Amazon Gift Card       | Credit Card        | 2024-10-01 10:30 AM  | -₹500  | N/A             | Wallet             | Bank Reference ID: 123456 |
| Received from       | John Doe               | UPI                | 2024-10-02 12:00 PM  | +₹1000 | john@upi        | UPI              | UPI Reference ID: 789012 |
| Paid to (Gift Card) | Amazon Gift Card       | Gift Card          | 2024-10-05 03:15 PM  | -₹200  | N/A             | Gift Card        | Bank Reference ID: 345678 |
| Received from (Gift Card) | Jane Smith     | UPI                | 2024-10-10 09:45 AM  | +₹300  | jane@upi        | UPI              | UPI Reference ID: 901234 |
| N/A                 | N/A                    | N/A                | N/A                  | N/A    | N/A             | N/A              | N/A              |

## Made with ❤️ for India

This project was created with love for India, aiming to make managing your Amazon India payment history easier and more accessible. I hope this tool serves you well in your financial tracking journey!
