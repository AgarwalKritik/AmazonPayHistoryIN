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

## Usage

1. Go to the [Amazon India Payment History](https://www.amazon.in/pay/history) page.
2. **Load All Transactions**: Scroll down the page to load all your transactions. Amazon initially displays only a portion of your payment history, so make sure to scroll until all transactions you want to export are visible.
3. Open your browser's Developer Tools (press `F12` or `Ctrl+Shift+I`).
4. Navigate to the **Console** tab.
5. Copy the contents of the `apayin.js` file and paste it into the console.
6. Press `Enter` to run the script.
7. If transactions are found, an HTML file will be automatically downloaded to your device.

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