import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';

export const generateHtmlTemplate = (data) => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</head>

<body>
    <h1>Customer Data</h1>
    <table>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
        </tr>
        ${data.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
        </tr>
        `).join('')}
    </table>
</body>

</html>`
}


const tableData = [
    { name: 'John Doe', email: 'johndoe@example.com', phone: '1234567890' },
    { name: 'Jane Smith', email: 'janesmith@example.com', phone: '0987654321' },
    { name: 'Alice Johnson', email: 'alicej@example.com', phone: '1122334455' },
];


export const handleDownload = async () => {
  

    try {
        const htmlString = generateHtmlTemplate(tableData);

        const options = {
            html: htmlString,
            fileName: 'customer_data',
            directory: 'Documents',
        };

        const pdf = await RNHTMLtoPDF.convert(options);

        const downloadPath = `${RNFS.DownloadDirectoryPath}/customer_data.pdf`;
        await RNFS.moveFile(pdf.filePath, downloadPath);

        Alert.alert('Success', `PDF downloaded successfully to ${downloadPath}`);
    } catch (error) {
        Alert.alert('Error', 'Failed to download PDF');
        console.error(error);
    }
};