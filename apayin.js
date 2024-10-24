/**
 * @file apayin.js
 * @description A utility script to extract and export payment transaction details 
 *              from the Amazon India Payment History page as an HTML file.
 *
 * @version 1.0.0
 * @date 2024-10-24
 * @author Nikhil - @dishapatel010
 *
 * @usage
 * 1. Ensure the Amazon Pay India History Exporter extension is installed in your browser.
 * 2. Navigate to the Amazon India Payment History page: 
 *    https://www.amazon.in/pay/history
 * 3. Scroll down to load all transactions until the last transaction you want to export is visible.
 * 4. Click on the "Export Payment History" button provided by the extension.
 * 5. The script will automatically extract the payment history and prompt you to download it as an HTML file.
 *
 * @note 
 * Ensure that you are logged into your Amazon account to access the payment history.
 * This script is intended for personal use only.
 * 
 * @changelog
 * - v1.0.0 - Initial release.
 * - Grouping Transactions by Month
 * - Extension Support by @AgarwalKritik
 */

// Function to create an export button on the page
function createExportButton() {
    const button = document.createElement('button');
    button.innerText = 'Export Payment History';
    button.style.position = 'fixed'; // Fixed position to stay in view while scrolling
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.padding = '10px';
    button.style.backgroundColor = '#232f3e'; // Amazon Gray
    button.style.color = '#ffffff'; // White text color
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.zIndex = 1000; // Ensure it appears above other content

    document.body.appendChild(button);

    button.addEventListener('click', exportPaymentDetailsAsHTML);
}

// Function to extract and export payment transaction details as an HTML file
function exportPaymentDetailsAsHTML() {
    const transactionElements = document.querySelectorAll('.a-expander-container');

    if (transactionElements.length === 0) {
        console.log("No transactions found.");
        return;
    }

    // Create an HTML structure for the exported data
    let htmlContent = `
        <html>
            <head>
                <title>Payment Transaction Details</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    tr:hover { background-color: #f1f1f1; } /* Hover effect */
                    .received { background-color: #d4edda; } /* Light green for "Received from" */
                    .paid { background-color: #f8d7da; } /* Light reddish-brown for Paid to */
                    .gift-paid { background-color: #ffcccb; } /* Light red-yellow mix for Paid to (Gift Cards) */
                    .gift-received { background-color: #d4f0c2; } /* Light green-yellow mix for Received from (Gift Cards) */
                    .white-row { background-color: #ffffff; } /* White background for N/A transactions */
                    .strikethrough { text-decoration: line-through; } /* Strike-through style */
                    h2 { margin-top: 20px; } /* Month title style */
                    @media screen and (max-width: 600px) {
                        table, thead, tbody, th, td, tr { display: block; }
                        th { position: absolute; left: -9999px; }
                        td { border: none; position: relative; padding-left: 50%; }
                        td:before { content: attr(data-label); position: absolute; left: 15px; font-weight: bold; }
                    }
                    footer { 
                        margin-top: 20px; 
                        padding: 10px; 
                        text-align: center; 
                        font-size: 12px; 
                        color: #666; 
                        border-top: 1px solid #ddd; 
                    }
                </style>
            </head>
            <body>
                <h1>Payment Transaction Details</h1>`;

    // Object to hold transactions by month
    const transactionsByMonth = {};

    // Loop through each transaction element
    transactionElements.forEach(transaction => {
        const dateTimeElement = transaction.querySelector('.payment-details-desktop + .a-size-base');
        if (!dateTimeElement) return; // Skip if there's no date

        const dateTimeText = dateTimeElement.innerText;
        const date = new Date(dateTimeText);
        const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

        // Initialize array for this month if it doesn't exist
        if (!transactionsByMonth[monthYear]) {
            transactionsByMonth[monthYear] = [];
        }

        // Collect transaction details
        const paidToElement = transaction.querySelector('.pad-header-text .a-size-medium');
        const paymentMethodElement = transaction.querySelector('.payment-details-desktop .a-size-base.a-color-tertiary');

        // Capture both normal and strikethrough amounts
        const normalAmountElement = transaction.querySelector('.a-size-medium.a-color-price, .a-size-medium.a-color-attainable');
        const struckThroughAmountElement = transaction.querySelector('.a-size-medium.a-color-tertiary.a-text-strike, .a-size-medium.a-color-attainable');

        let paidTo = paidToElement ? paidToElement.innerText : 'N/A';
        let amount = normalAmountElement ? normalAmountElement.innerText : 'N/A';
        let isStruckThrough = struckThroughAmountElement ? struckThroughAmountElement.innerText : null;

        // If the amount is received and it has a '+' sign, do not strike through
        if (isStruckThrough) {
            if (isStruckThrough.includes('+')) {
                amount = isStruckThrough; // Use the received amount directly
            } else {
                amount = `<span class="strikethrough">${isStruckThrough}</span>`; // Strikethrough if applicable
            }
        } else {
            amount = amount !== 'N/A' ? amount : 'N/A'; // Default to N/A if nothing is found
        }

        // Determine transaction type based on the amount's sign
        let transactionType;
        if (amount.startsWith('-')) {
            transactionType = "Paid to";  // Negative amount means a payment
        } else if (amount.startsWith('+')) {
            transactionType = "Received from"; // Positive amount means received
        } else {
            transactionType = "N/A"; // If neither sign is present
        }

        // UPI ID, Paid Using, Reference ID
        const miniDetails = transaction.querySelector('.miniDetailsPage-desktop');
        const upiIdElement = miniDetails ? miniDetails.querySelector('.pad-mini-details-text .a-size-base.a-color-base:nth-of-type(1)') : null;
        const paidUsingElement = miniDetails ? miniDetails.querySelector('.pad-mini-details-text:nth-of-type(2) .a-size-base.a-color-base') : null;

        // Find the Reference ID by checking for both "Bank Reference ID" and "UPI Reference ID"
        let referenceId = 'N/A';
        const referenceLabels = miniDetails ? miniDetails.querySelectorAll('.a-size-base.a-color-tertiary') : [];

        referenceLabels.forEach(label => {
            let labelText = label.innerText.trim();
            if (labelText === "Bank Reference ID:" || labelText === "UPI Reference ID:") {
                const refIdElement = label.closest('.a-row.pad-mini-details-text').querySelector('.a-size-base.a-color-base');
                if (refIdElement) {
                    referenceId = refIdElement.innerText.trim();
                }
            }
        });

        let upiId = upiIdElement ? upiIdElement.innerText : 'N/A';
        let paidUsing = paidUsingElement ? paidUsingElement.innerText : 'N/A';

        // Determine row class based on transaction type and UPI ID
        let rowClass = "";
        if (transactionType === "N/A") {
            rowClass = "white-row"; // White background for N/A transactions
        } else if (upiId.includes("Gift Cards")) {
            if (transactionType === "Paid to") {
                rowClass = "gift-paid"; // Light red-yellow mix for "Paid to Gift Cards"
            } else if (transactionType === "Received from") {
                rowClass = "gift-received"; // Light green-yellow mix for "Received from Gift Cards"
            }
        } else {
            // Default background colors if not Gift Cards
            rowClass = transactionType === "Received from" ? "received" : "paid";
        }

        // Append transaction to the month array
        transactionsByMonth[monthYear].push(`
            <tr class="${rowClass}">
                <td>${transactionType}</td>
                <td>${paidTo}</td>
                <td>${paymentMethodElement ? paymentMethodElement.innerText : 'N/A'}</td>
                <td>${dateTimeText}</td>
                <td>${amount}</td>
                <td>${upiId}</td>
                <td>${paidUsing}</td>
                <td>${referenceId}</td>
            </tr>`);
    });

    // Append transactions for each month to the HTML content
    for (const month in transactionsByMonth) {
        htmlContent += `<h2>${month}</h2><table><tr>
                <th>Transaction Type</th>
                <th>Paid To / Received From</th>
                <th>Payment Method</th>
                <th>Date & Time</th>
                <th>Amount</th>
                <th>Payee UPI ID</th>
                <th>Paid Using</th>
                <th>Reference ID</th>
            </tr>`;
        transactionsByMonth[month].forEach(transactionRow => {
            htmlContent += transactionRow;
        });
        htmlContent += `</table>`;
    }

    // Add footer to the HTML content
    htmlContent += `
            <footer>
                <p>Exported on: ${new Date().toLocaleString()}</p>
                <p>AmazonPayHistoryIN - <a href="https://github.com/dishapatel010/AmazonPayHistoryIN" target="_blank">@dishapatel010</a></p>
            </footer>
        </body>
    </html>`;

    // Create a Blob from the HTML content and trigger a download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "payment_details.html");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the file
    URL.revokeObjectURL(url); // Release the URL object
}

// Initialize the export button when the script loads
createExportButton();
