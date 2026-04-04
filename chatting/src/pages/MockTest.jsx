import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, RotateCcw, Award, Languages } from 'lucide-react';
const questionsDB = {
    test1: [
        // --- Test 1: Web & IT Basics (50 Questions) ---
        { qEn: "What is the full form of HTML?", qHi: "HTML का फुल फॉर्म क्या है?", optionsEn: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "None"], optionsHi: ["हाइपर टेक्स्ट मार्कअप लैंग्वेज", "हाई टेक्स्ट मार्कअप लैंग्वेज", "हाइपर टैबुलर मार्कअप लैंग्वेज", "कोई नहीं"], correct: 0 },
        { qEn: "Which tag is used for the largest heading?", qHi: "सबसे बड़ी हेडिंग के लिए कौन सा टैग है?", optionsEn: ["<h6>", "<h1>", "<head>", "<big>"], optionsHi: ["<h6>", "<h1>", "<head>", "<big>"], correct: 1 },
        { qEn: "CSS stands for?", qHi: "CSS का क्या अर्थ है?", optionsEn: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Color Style Sheets"], optionsHi: ["क्रिएटिव स्टाइल शीट्स", "कैस्केडिंग स्टाइल शीट्स", "कंप्यूटर स्टाइल शीट्स", "कलर स्टाइल शीट्स"], correct: 1 },
        { qEn: "How to make a list with numbers?", qHi: "नंबर वाली लिस्ट बनाने के लिए कौन सा टैग है?", optionsEn: ["<ul>", "<ol>", "<dl>", "<list>"], optionsHi: ["<ul>", "<ol>", "<dl>", "<list>"], correct: 1 },
        { qEn: "Which tag is used for a line break?", qHi: "लाइन ब्रेक के लिए कौन सा टैग उपयोग किया जाता है?", optionsEn: ["<lb>", "<break>", "<br>", "<hr>"], optionsHi: ["<lb>", "<break>", "<br>", "<hr>"], correct: 2 },
        { qEn: "What is the brain of the computer?", qHi: "कंप्यूटर का मस्तिष्क किसे कहा जाता है?", optionsEn: ["RAM", "CPU", "Hard Disk", "Monitor"], optionsHi: ["रैम", "सीपीयू", "हार्ड डिस्क", "मॉनिटर"], correct: 1 },
        { qEn: "1 MB is equal to?", qHi: "1 MB किसके बराबर है?", optionsEn: ["1000 KB", "1024 KB", "1024 GB", "1000 Bytes"], optionsHi: ["1000 KB", "1024 KB", "1024 GB", "1000 Bytes"], correct: 1 },
        { qEn: "Who is the founder of Microsoft?", qHi: "माइक्रोसॉफ्ट के संस्थापक कौन हैं?", optionsEn: ["Steve Jobs", "Mark Zuckerberg", "Bill Gates", "Elon Musk"], optionsHi: ["स्टीव जॉब्स", "मार्क जुकरबर्ग", "बिल गेट्स", "एलोन मस्क"], correct: 2 },
        { qEn: "Which is a permanent memory?", qHi: "स्थायी मेमोरी कौन सी है?", optionsEn: ["RAM", "ROM", "Cache", "Buffer"], optionsHi: ["रैम", "रोम", "कैश", "बफर"], correct: 1 },
        { qEn: "Short-cut for Copy?", qHi: "कॉपी करने का शॉर्टकट क्या है?", optionsEn: ["Ctrl+V", "Ctrl+C", "Ctrl+X", "Ctrl+Z"], optionsHi: ["Ctrl+V", "Ctrl+C", "Ctrl+X", "Ctrl+Z"], correct: 1 },
        { qEn: "WWW stands for?", qHi: "WWW का फुल फॉर्म?", optionsEn: ["World Wide Web", "World Whole Web", "Web World Wide", "World Wide Website"], optionsHi: ["वर्ल्ड वाइड वेब", "वर्ल्ड होल वेब", "वेब वर्ल्ड वाइड", "वर्ल्ड वाइड वेबसाइट"], correct: 0 },
        { qEn: "Which language is used for styling?", qHi: "स्टाइलिंग के लिए कौन सी भाषा है?", optionsEn: ["HTML", "CSS", "PHP", "XML"], optionsHi: ["HTML", "CSS", "PHP", "XML"], correct: 1 },
        { qEn: "Which is an Input Device?", qHi: "इनपुट डिवाइस कौन सा है?", optionsEn: ["Monitor", "Printer", "Keyboard", "Speaker"], optionsHi: ["मॉनिटर", "प्रिंटर", "कीबोर्ड", "स्पीकर"], correct: 2 },
        { qEn: "JavaScript is a ____ language.", qHi: "जावास्क्रिप्ट एक ____ भाषा है।", optionsEn: ["Static", "Scripting", "Low-level", "Machine"], optionsHi: ["स्टेटिक", "स्क्रिप्टिंग", "लो-लेवल", "मशीन"], correct: 1 },
        { qEn: "Short-cut for Save?", qHi: "सेव करने का शॉर्टकट?", optionsEn: ["Ctrl+S", "Ctrl+A", "Ctrl+P", "Alt+S"], optionsHi: ["Ctrl+S", "Ctrl+A", "Ctrl+P", "Alt+S"], correct: 0 },
        { qEn: "Which is not an OS?", qHi: "कौन सा ऑपरेटिंग सिस्टम नहीं है?", optionsEn: ["Windows", "Linux", "Oracle", "macOS"], optionsHi: ["विंडोज", "लिनक्स", "ओरेकल", "मैक ओएस"], correct: 2 },
        { qEn: "Full form of RAM?", qHi: "RAM का फुल फॉर्म?", optionsEn: ["Read Access Memory", "Random Access Memory", "Run Access Memory", "None"], optionsHi: ["रीड एक्सेस मेमोरी", "रैंडम एक्सेस मेमोरी", "रन एक्सेस मेमोरी", "कोई नहीं"], correct: 1 },
        { qEn: "Internal CSS is written in?", qHi: "इंटरनल CSS किसमें लिखी जाती है?", optionsEn: ["<css>", "<script>", "<style>", "<link>"], optionsHi: ["<css>", "<script>", "<style>", "<link>"], correct: 2 },
        { qEn: "HTTP stands for?", qHi: "HTTP का पूर्ण रूप क्या है?", optionsEn: ["HyperText Transfer Protocol", "HyperText Total Protocol", "High Protocol", "None"], optionsHi: ["हाइपरटेक्स्ट ट्रांसफर प्रोटोकॉल", "हाइपरटेक्स्ट टोटल प्रोटोकॉल", "हाई प्रोटोकॉल", "कोई नहीं"], correct: 0 },
        { qEn: "Which tag is used for an image?", qHi: "इमेज के लिए कौन सा टैग है?", optionsEn: ["<picture>", "<img>", "<src>", "<href>"], optionsHi: ["<picture>", "<img>", "<src>", "<href>"], correct: 1 },
        { qEn: "Extension of HTML file?", qHi: "HTML फाइल का एक्सटेंशन?", optionsEn: [".ht", ".html", ".xml", ".js"], optionsHi: [".ht", ".html", ".xml", ".js"], correct: 1 },
        { qEn: "Father of Computer?", qHi: "कंप्यूटर के पिता?", optionsEn: ["Charles Babbage", "Newton", "Einstein", "Bill Gates"], optionsHi: ["चार्ल्स बैबेज", "न्यूटन", "आइंस्टीन", "बिल गेट्स"], correct: 0 },
        { qEn: "Social media example?", qHi: "सोशल मीडिया का उदाहरण?", optionsEn: ["Google", "Facebook", "Amazon", "Flipkart"], optionsHi: ["गूगल", "फेसबुक", "अमेज़न", "फ्लिपकार्ट"], correct: 1 },
        { qEn: "Default port for HTTP?", qHi: "HTTP का डिफॉल्ट पोर्ट क्या है?", optionsEn: ["21", "80", "443", "8080"], optionsHi: ["21", "80", "443", "8080"], correct: 1 },
        { qEn: "Which property is for text color?", qHi: "टेक्स्ट कलर के लिए कौन सी प्रॉपर्टी है?", optionsEn: ["font-color", "color", "text-style", "bg-color"], optionsHi: ["font-color", "color", "text-style", "bg-color"], correct: 1 },
        { qEn: "Shortcut for Paste?", qHi: "पेस्ट करने का शॉर्टकट?", optionsEn: ["Ctrl+P", "Ctrl+V", "Ctrl+S", "Ctrl+A"], optionsHi: ["Ctrl+P", "Ctrl+V", "Ctrl+S", "Ctrl+A"], correct: 1 },
        { qEn: "Smallest unit of data?", qHi: "डेटा की सबसे छोटी इकाई?", optionsEn: ["Bit", "Byte", "KB", "MB"], optionsHi: ["बिट", "बाइट", "KB", "MB"], correct: 0 },
        { qEn: "Which tag is for a table?", qHi: "टेबल के लिए कौन सा टैग है?", optionsEn: ["<tab>", "<table>", "<tr>", "<td>"], optionsHi: ["<tab>", "<table>", "<tr>", "<td>"], correct: 1 },
        { qEn: "Correct HTML for a hyperlink?", qHi: "हाइपरलिंक के लिए सही HTML?", optionsEn: ["<a>", "<link>", "<href>", "<url>"], optionsHi: ["<a>", "<link>", "<href>", "<url>"], correct: 0 },
        { qEn: "How to add background color?", qHi: "बैकग्राउंड कलर कैसे जोड़ें?", optionsEn: ["<body bg='red'>", "<body style='background-color:red;'>", "<background>red</background>", "None"], optionsHi: ["<body bg='red'>", "<body style='background-color:red;'>", "<background>red</background>", "कोई नहीं"], correct: 1 },
        { qEn: "Which is a Browser?", qHi: "इनमें से कौन सा ब्राउज़र है?", optionsEn: ["Chrome", "Windows", "Office", "Java"], optionsHi: ["क्रोम", "विंडोज", "ऑफिस", "जावा"], correct: 0 },
        { qEn: "1024 GB = ?", qHi: "1024 GB = ?", optionsEn: ["1 MB", "1 TB", "1 PB", "1 KB"], optionsHi: ["1 MB", "1 TB", "1 PB", "1 KB"], correct: 1 },
        { qEn: "Shortcut for Undo?", qHi: "Undo का शॉर्टकट?", optionsEn: ["Ctrl+U", "Ctrl+Y", "Ctrl+Z", "Ctrl+X"], optionsHi: ["Ctrl+U", "Ctrl+Y", "Ctrl+Z", "Ctrl+X"], correct: 2 },
        { qEn: "Which tag for bold text?", qHi: "बोल्ड टेक्स्ट के लिए टैग?", optionsEn: ["<bold>", "<b>", "<bb>", "<stronger>"], optionsHi: ["<bold>", "<b>", "<bb>", "<stronger>"], correct: 1 },
        { qEn: "CSS for external file?", qHi: "एक्सटर्नल फाइल के लिए CSS?", optionsEn: ["<link>", "<style>", "<script>", "<meta>"], optionsHi: ["<link>", "<style>", "<script>", "<meta>"], correct: 0 },
        { qEn: "Full form of URL?", qHi: "URL का फुल फॉर्म?", optionsEn: ["Uniform Resource Locator", "Universal Resource Link", "Uniform Road Link", "None"], optionsHi: ["यूनिफॉर्म रिसोर्स लोकेटर", "यूनिवर्सल रिसोर्स लिंक", "यूनिफॉर्म रोड लिंक", "कोई नहीं"], correct: 0 },
        { qEn: "Which is not an input device?", qHi: "कौन सा इनपुट डिवाइस नहीं है?", optionsEn: ["Mouse", "Printer", "Keyboard", "Scanner"], optionsHi: ["माउस", "प्रिंटर", "कीबोर्ड", "स्कैनर"], correct: 1 },
        { qEn: "Shortcut to select all?", qHi: "सब कुछ सेलेक्ट करने का शॉर्टकट?", optionsEn: ["Ctrl+S", "Ctrl+A", "Ctrl+X", "Ctrl+V"], optionsHi: ["Ctrl+S", "Ctrl+A", "Ctrl+X", "Ctrl+V"], correct: 1 },
        { qEn: "Which is a Search Engine?", qHi: "सर्च इंजन कौन सा है?", optionsEn: ["Google", "Facebook", "Amazon", "WhatsApp"], optionsHi: ["गूगल", "फेसबुक", "अमेज़न", "व्हाट्सएप"], correct: 0 },
        { qEn: "HTML is a ____ language.", qHi: "HTML एक ____ भाषा है।", optionsEn: ["Programming", "Markup", "Machine", "Scripting"], optionsHi: ["प्रोग्रामिंग", "मार्कअप", "मशीन", "स्क्रिप्टिंग"], correct: 1 },
        { qEn: "Shortcut for Refresh?", qHi: "रिफ्रेश करने का शॉर्टकट?", optionsEn: ["F1", "F5", "F2", "F12"], optionsHi: ["F1", "F5", "F2", "F12"], correct: 1 },
        { qEn: "Full form of PDF?", qHi: "PDF का फुल फॉर्म?", optionsEn: ["Portable Document Format", "Printed Data File", "Personal Document File", "None"], optionsHi: ["पोर्टेबल डॉक्यूमेंट फॉर्मेट", "प्रिंटेड डेटा फाइल", "पर्सनल डॉक्यूमेंट फाइल", "कोई नहीं"], correct: 0 },
        { qEn: "Which tag for title?", qHi: "टाइटल के लिए कौन सा टैग है?", optionsEn: ["<head>", "<title>", "<meta>", "<body>"], optionsHi: ["<head>", "<title>", "<meta>", "<body>"], correct: 1 },
        { qEn: "Temporary memory?", qHi: "अस्थायी मेमोरी?", optionsEn: ["RAM", "ROM", "SSD", "HDD"], optionsHi: ["रैम", "रोम", "SSD", "HDD"], correct: 0 },
        { qEn: "Extension of CSS file?", qHi: "CSS फाइल का एक्सटेंशन?", optionsEn: [".cs", ".css", ".style", ".html"], optionsHi: [".cs", ".css", ".style", ".html"], correct: 1 },
        { qEn: "Which is a storage device?", qHi: "स्टोरेज डिवाइस कौन सा है?", optionsEn: ["HDD", "Mouse", "Keyboard", "Monitor"], optionsHi: ["HDD", "माउस", "कीबोर्ड", "मॉनिटर"], correct: 0 },
        { qEn: "First page of website?", qHi: "वेबसाइट का पहला पेज?", optionsEn: ["Home Page", "First Page", "Front Page", "Main Page"], optionsHi: ["होम पेज", "फर्स्ट पेज", "फ्रंट पेज", "मेन पेज"], correct: 0 },
        { qEn: "Shortcut for New File?", qHi: "नई फाइल का शॉर्टकट?", optionsEn: ["Ctrl+M", "Ctrl+N", "Ctrl+O", "Ctrl+F"], optionsHi: ["Ctrl+M", "Ctrl+N", "Ctrl+O", "Ctrl+F"], correct: 1 },
        { qEn: "Binary code uses?", qHi: "बाइनरी कोड क्या उपयोग करता है?", optionsEn: ["0 and 1", "1 to 9", "A to Z", "None"], optionsHi: ["0 और 1", "1 से 9", "A से Z", "कोई नहीं"], correct: 0 },
        { qEn: "Full form of CPU?", qHi: "CPU का फुल फॉर्म?", optionsEn: ["Central Processing Unit", "Central Power Unit", "Computer Processing Unit", "None"], optionsHi: ["सेंट्रल प्रोसेसिंग यूनिट", "सेंट्रल पावर यूनिट", "कंप्यूटर प्रोसेसिंग यूनिट", "कोई नहीं"], correct: 0 }
    ],
    test2: [
        // --- Test 2: C & Python Programming (50 Questions) ---
        { qEn: "Who developed C Language?", qHi: "C भाषा को किसने बनाया?", optionsEn: ["Dennis Ritchie", "Guido van Rossum", "James Gosling", "Babbage"], optionsHi: ["डेनिस रिची", "गाइडो वैन रोसुम", "जेम्स गोस्लिंग", "बैबेज"], correct: 0 },
        { qEn: "Python is ____ language.", qHi: "पायथन ____ भाषा है।", optionsEn: ["Compiled", "Interpreted", "Low level", "None"], optionsHi: ["कंपाइल्ड", "इंटरप्रिटेड", "लो लेवल", "कोई नहीं"], correct: 1 },
        { qEn: "Function to take input in C?", qHi: "C में इनपुट लेने वाला फंक्शन?", optionsEn: ["printf", "scanf", "gets", "input"], optionsHi: ["printf", "scanf", "gets", "input"], correct: 1 },
        { qEn: "Comment in Python starts with?", qHi: "पायथन में कमेंट किससे शुरू होता है?", optionsEn: ["//", "/*", "#", "--"], optionsHi: ["//", "/*", "#", "--"], correct: 2 },
        { qEn: "Who created Python?", qHi: "पायथन किसने बनाई?", optionsEn: ["Guido van Rossum", "Dennis Ritchie", "Elon Musk", "Ken Thompson"], optionsHi: ["गाइडो वैन रोसुम", "डेनिस रिची", "एलोन मस्क", "केन थॉमसन"], correct: 0 },
        { qEn: "Which data type is for decimals in C?", qHi: "C में दशमलव के लिए डेटा टाइप?", optionsEn: ["int", "char", "float", "long"], optionsHi: ["int", "char", "float", "long"], correct: 2 },
        { qEn: "Python extension?", qHi: "पायथन फाइल का एक्सटेंशन?", optionsEn: [".py", ".python", ".txt", ".p"], optionsHi: [".py", ".python", ".txt", ".p"], correct: 0 },
        { qEn: "How to define function in Python?", qHi: "पायथन में फंक्शन कैसे डिफाइन करते हैं?", optionsEn: ["def", "function", "void", "define"], optionsHi: ["def", "function", "void", "define"], correct: 0 },
        { qEn: "Array index starts from?", qHi: "एरे इंडेक्स कहाँ से शुरू होता है?", optionsEn: ["1", "0", "-1", "Any"], optionsHi: ["1", "0", "-1", "कोई भी"], correct: 1 },
        { qEn: "In C, string ends with?", qHi: "C में स्ट्रिंग किस पर खत्म होती है?", optionsEn: ["\\n", "\\0", "\\t", "\\s"], optionsHi: ["\\n", "\\0", "\\t", "\\s"], correct: 1 },
        { qEn: "Which bracket for Python list?", qHi: "पायथन लिस्ट के लिए कौन सा ब्रैकेट?", optionsEn: ["()", "{}", "[]", "<>"], optionsHi: ["()", "{}", "[]", "<>"], correct: 2 },
        { qEn: "Python dictionary uses?", qHi: "पायथन डिक्शनरी क्या उपयोग करती है?", optionsEn: ["[]", "{}", "()", "None"], optionsHi: ["[]", "{}", "()", "कोई नहीं"], correct: 1 },
        { qEn: "C is a ____ language.", qHi: "C एक ____ भाषा है।", optionsEn: ["High", "Middle", "Low", "None"], optionsHi: ["हाई", "मिडल", "लो", "कोई नहीं"], correct: 1 },
        { qEn: "Range(5) gives?", qHi: "Range(5) क्या देता है?", optionsEn: ["0-5", "1-5", "0-4", "1-4"], optionsHi: ["0-5", "1-5", "0-4", "1-4"], correct: 2 },
        { qEn: "Print function in Python?", qHi: "पायथन में प्रिंट फंक्शन?", optionsEn: ["printf", "print", "echo", "cout"], optionsHi: ["printf", "print", "echo", "cout"], correct: 1 },
        { qEn: "Main function in C returns?", qHi: "C में main क्या रिटर्न करता है?", optionsEn: ["int", "void", "float", "char"], optionsHi: ["int", "void", "float", "char"], correct: 0 },
        { qEn: "Mutable data type in Python?", qHi: "पायथन में म्यूटेबल डेटा टाइप?", optionsEn: ["Tuple", "String", "List", "Int"], optionsHi: ["टुपल", "स्ट्रिंग", "लिस्ट", "Int"], correct: 2 },
        { qEn: "Size of char in C?", qHi: "C में char का साइज?", optionsEn: ["1 Byte", "2 Bytes", "4 Bytes", "None"], optionsHi: ["1 बाइट", "2 बाइट्स", "4 बाइट्स", "कोई नहीं"], correct: 0 },
        { qEn: "Symbol for power in Python?", qHi: "पायथन में पावर का सिंबल?", optionsEn: ["^", "**", "*", "//"], optionsHi: ["^", "**", "*", "//"], correct: 1 },
        { qEn: "Which is not a loop in C?", qHi: "C में कौन सा लूप नहीं है?", optionsEn: ["for", "while", "do-while", "foreach"], optionsHi: ["for", "while", "do-while", "foreach"], correct: 3 },
        { qEn: "Python release year?", qHi: "पायथन किस साल रिलीज हुई?", optionsEn: ["1989", "1991", "1995", "2000"], optionsHi: ["1989", "1991", "1995", "2000"], correct: 1 },
        { qEn: "Operator for remainder?", qHi: "शेषफल के लिए ऑपरेटर?", optionsEn: ["/", "%", "&", "#"], optionsHi: ["/", "%", "&", "#"], correct: 1 },
        { qEn: "Variable name can start with?", qHi: "वेरिएबल का नाम किससे शुरू हो सकता है?", optionsEn: ["Number", "Underscore", "Space", "Symbol"], optionsHi: ["नंबर", "अंडरस्कोर", "स्पेस", "सिंबल"], correct: 1 },
        { qEn: "Python Tuple is enclosed in?", qHi: "पायथन टुपल किसमें बंद होता है?", optionsEn: ["()", "[]", "{}", "<>"], optionsHi: ["()", "[]", "{}", "<>"], correct: 0 },
        { qEn: "Keyword to define class in C++?", qHi: "C++ में क्लास के लिए कीवर्ड?", optionsEn: ["class", "struct", "obj", "define"], optionsHi: ["class", "struct", "obj", "define"], correct: 0 },
        { qEn: "Float size in C?", qHi: "C में float का साइज?", optionsEn: ["2 Bytes", "4 Bytes", "8 Bytes", "1 Byte"], optionsHi: ["2 बाइट्स", "4 बाइट्स", "8 बाइट्स", "1 बाइट"], correct: 1 },
        { qEn: "Python for loop works on?", qHi: "पायथन for लूप किस पर काम करता है?", optionsEn: ["Iterables", "Numbers", "Strings", "All"], optionsHi: ["इटरेबल्स", "नंबर", "स्ट्रिंग", "सभी"], correct: 3 },
        { qEn: "scanf use for?", qHi: "scanf का उपयोग?", optionsEn: ["Output", "Input", "Delete", "Add"], optionsHi: ["आउटपुट", "इनपुट", "डिलीट", "ऐड"], correct: 1 },
        { qEn: "Python is case sensitive?", qHi: "क्या पायथन केस सेंसिटिव है?", optionsEn: ["Yes", "No", "Maybe", "None"], optionsHi: ["हाँ", "नहीं", "शायद", "कोई नहीं"], correct: 0 },
        { qEn: "Header file for printf?", qHi: "printf के लिए हेडर फाइल?", optionsEn: ["conio.h", "stdio.h", "math.h", "string.h"], optionsHi: ["conio.h", "stdio.h", "math.h", "string.h"], correct: 1 },
        { qEn: "Keyword to exit loop?", qHi: "लूप से बाहर निकलने का कीवर्ड?", optionsEn: ["exit", "stop", "break", "return"], optionsHi: ["exit", "stop", "break", "return"], correct: 2 },
        { qEn: "Python indentation is?", qHi: "पायथन इंडेंटेशन क्या है?", optionsEn: ["Required", "Optional", "Ignored", "None"], optionsHi: ["जरूरी", "वैकल्पिक", "अनदेखा", "कोई नहीं"], correct: 0 },
        { qEn: "Logical AND in C?", qHi: "C में लॉजिकल AND?", optionsEn: ["&", "&&", "||", "!"], optionsHi: ["&", "&&", "||", "!"], correct: 1 },
        { qEn: "Python set uses?", qHi: "पायथन सेट (set) क्या उपयोग करता है?", optionsEn: ["[]", "()", "{}", "<>"], optionsHi: ["[]", "()", "{}", "<>"], correct: 2 },
        { qEn: "Function to find length of string in Python?", qHi: "पायथन में स्ट्रिंग की लंबाई?", optionsEn: ["length()", "len()", "size()", "count()"], optionsHi: ["length()", "len()", "size()", "count()"], correct: 1 },
        { qEn: "C comments?", qHi: "C में कमेंट?", optionsEn: ["//", "/* */", "Both", "None"], optionsHi: ["//", "/* */", "दोनों", "कोई नहीं"], correct: 2 },
        { qEn: "Python input returns?", qHi: "पायथन input() क्या लौटाता है?", optionsEn: ["Int", "Float", "String", "List"], optionsHi: ["Int", "Float", "String", "List"], correct: 2 },
        { qEn: "Memory for double in C?", qHi: "C में double के लिए मेमोरी?", optionsEn: ["4 Bytes", "8 Bytes", "10 Bytes", "16 Bytes"], optionsHi: ["4 बाइट्स", "8 बाइट्स", "10 बाइट्स", "16 बाइट्स"], correct: 1 },
        { qEn: "Is C Object Oriented?", qHi: "क्या C ऑब्जेक्ट ओरिएंटेड है?", optionsEn: ["Yes", "No", "Partially", "None"], optionsHi: ["हाँ", "नहीं", "आंशिक रूप से", "कोई नहीं"], correct: 1 },
        { qEn: "Python list add method?", qHi: "पायथन लिस्ट में जोड़ने का मेथड?", optionsEn: ["add()", "insert()", "append()", "plus()"], optionsHi: ["add()", "insert()", "append()", "plus()"], correct: 2 },
        { qEn: "C program entry point?", qHi: "C प्रोग्राम कहाँ से शुरू होता है?", optionsEn: ["Start", "main()", "void()", "include"], optionsHi: ["Start", "main()", "void()", "include"], correct: 1 },
        { qEn: "Check type in Python?", qHi: "पायथन में टाइप चेक करने के लिए?", optionsEn: ["check()", "type()", "kind()", "is()"], optionsHi: ["check()", "type()", "kind()", "is()"], correct: 1 },
        { qEn: "Recursive function calls?", qHi: "रिकर्सिव फंक्शन किसे कॉल करता है?", optionsEn: ["Others", "Itself", "Main", "None"], optionsHi: ["दूसरों को", "खुद को", "Main", "कोई नहीं"], correct: 1 },
        { qEn: "Python string is immutable?", qHi: "क्या पायथन स्ट्रिंग इम्म्यूटेबल है?", optionsEn: ["Yes", "No", "Maybe", "None"], optionsHi: ["हाँ", "नहीं", "शायद", "कोई नहीं"], correct: 0 },
        { qEn: "Return keyword used in?", qHi: "Return कीवर्ड कहाँ उपयोग होता है?", optionsEn: ["Loops", "Functions", "Classes", "Variables"], optionsHi: ["लूप", "फंक्शन", "क्लास", "वेरिएबल"], correct: 1 },
        { qEn: "Binary search works on?", qHi: "बाइनरी सर्च किस पर काम करती है?", optionsEn: ["Sorted array", "Unsorted array", "Linked list", "None"], optionsHi: ["सॉर्टेड एरे", "अनसॉर्टेड एरे", "लिंक्ड लिस्ट", "कोई नहीं"], correct: 0 },
        { qEn: "C variable type for character?", qHi: "C में कैरेक्टर के लिए टाइप?", optionsEn: ["string", "char", "text", "chr"], optionsHi: ["string", "char", "text", "chr"], correct: 1 },
        { qEn: "Python 'if' ends with?", qHi: "पायथन 'if' किसके साथ खत्म होता है?", optionsEn: [";", ".", ":", "None"], optionsHi: [";", ".", ":", "कोई नहीं"], correct: 2 },
        { qEn: "Maximum value of bit?", qHi: "बिट की अधिकतम वैल्यू?", optionsEn: ["1", "0", "9", "255"], optionsHi: ["1", "0", "9", "255"], correct: 0 },
        { qEn: "Who is the 'father of Python'?", qHi: "पायथन के पिता कौन हैं?", optionsEn: ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Babbage"], optionsHi: ["गाइडो वैन रोसुम", "डेनिस रिची", "जेम्स गोस्लिंग", "बैबेज"], correct: 0 }
    ],

    test3: [
        { qEn: "Which of the following is the smallest unit of data in a computer?", qHi: "कंप्यूटर में डेटा की सबसे छोटी इकाई कौन सी है?", optionsEn: ["Bit", "Byte", "Nibble", "KB"], optionsHi: ["बिट", "बाइट", "निबल", "KB"], correct: 0 },
        { qEn: "What is the shortcut key for 'Save As' in MS Office?", qHi: "MS Office में 'Save As' के लिए शॉर्टकट कुंजी क्या है?", optionsEn: ["F12", "F1", "Ctrl + S", "Ctrl + Shift + S"], optionsHi: ["F12", "F1", "Ctrl + S", "Ctrl + Shift + S"], correct: 0 },
        { qEn: "In LibreOffice Calc, what is the shortcut key to insert a function?", qHi: "LibreOffice Calc में फंक्शन इन्सर्ट करने की शॉर्टकट कुंजी क्या है?", optionsEn: ["Ctrl + F2", "Ctrl + F1", "F2", "Shift + F2"], optionsHi: ["Ctrl + F2", "Ctrl + F1", "F2", "Shift + F2"], correct: 0 },
        { qEn: "Which language is used for creating web pages?", qHi: "वेब पेज बनाने के लिए किस भाषा का उपयोग किया जाता है?", optionsEn: ["HTTP", "HTML", "FTP", "URL"], optionsHi: ["HTTP", "HTML", "FTP", "URL"], correct: 1 },
        { qEn: "What is the full form of UPI?", qHi: "UPI का फुल फॉर्म क्या है?", optionsEn: ["Unified Payments Interface", "Unique Payments Interface", "Union Payments Interface", "None"], optionsHi: ["यूनिफाइड पेमेंट्स इंटरफेस", "यूनिक पेमेंट्स इंटरफेस", "यूनियन पेमेंट्स इंटरफेस", "कोई नहीं"], correct: 0 },
        { qEn: "Which memory is non-volatile?", qHi: "कौन सी मेमोरी नॉन-वोलाटाइल (स्थायी) है?", optionsEn: ["RAM", "ROM", "Cache", "L1 Cache"], optionsHi: ["रैम (RAM)", "रोम (ROM)", "कैश", "L1 कैश"], correct: 1 },
        { qEn: "What is the shortcut key for Print Preview?", qHi: "प्रिंट प्रीव्यू के लिए शॉर्टकट कुंजी क्या है?", optionsEn: ["Ctrl + P", "Ctrl + Shift + O", "Ctrl + F2", "Alt + P"], optionsHi: ["Ctrl + P", "Ctrl + Shift + O", "Ctrl + F2", "Alt + P"], correct: 1 },
        { qEn: "The process of starting a computer is known as?", qHi: "कंप्यूटर शुरू करने की प्रक्रिया को क्या कहा जाता है?", optionsEn: ["Starting", "Loading", "Booting", "Processing"], optionsHi: ["स्टार्टिंग", "लोडिंग", "बूटिंग", "प्रोसेसिंग"], correct: 2 },
        { qEn: "Full form of ASCII?", qHi: "ASCII का फुल फॉर्म क्या है?", optionsEn: ["American Standard Code for Information Interchange", "African Standard Code for Information Interchange", "American Status Code for Information Interchange", "None"], optionsHi: ["American Standard Code for Information Interchange", "African Standard Code for Information Interchange", "American Status Code for Information Interchange", "कोई नहीं"], correct: 0 },
        { qEn: "Which of the following is an Operating System?", qHi: "इनमें से कौन सा ऑपरेटिंग सिस्टम है?", optionsEn: ["Google", "Windows", "MS Word", "Tally"], optionsHi: ["गूगल", "विंडोज", "एमएस वर्ड", "टैली"], correct: 1 },
        { qEn: "What is the maximum zoom percentage in LibreOffice Writer?", qHi: "LibreOffice Writer में अधिकतम ज़ूम प्रतिशत कितना है?", optionsEn: ["400%", "500%", "600%", "3000%"], optionsHi: ["400%", "500%", "600%", "3000%"], correct: 2 },
        { qEn: "What is the shortcut to select the entire row in Excel?", qHi: "Excel में पूरी रो (Row) को सेलेक्ट करने का शॉर्टकट क्या है?", optionsEn: ["Ctrl + Space", "Shift + Space", "Ctrl + A", "Alt + Space"], optionsHi: ["Ctrl + Space", "Shift + Space", "Ctrl + A", "Alt + Space"], correct: 1 },
        { qEn: "Which symbol is used before a formula in Excel/Calc?", qHi: "Excel/Calc में फॉर्मूला से पहले किस चिन्ह का उपयोग किया जाता है?", optionsEn: ["+", "@", "=", "#"], optionsHi: ["+", "@", "=", "#"], correct: 2 },
        { qEn: "What is the full form of QR Code?", qHi: "QR Code का फुल फॉर्म क्या है?", optionsEn: ["Quick Response Code", "Quality Response Code", "Quick Record Code", "Quality Record Code"], optionsHi: ["Quick Response Code", "Quality Response Code", "Quick Record Code", "Quality Record Code"], correct: 0 },
        { qEn: "Which is the first browser?", qHi: "पहला ब्राउज़र कौन सा है?", optionsEn: ["Chrome", "Mosaic", "WorldWideWeb", "Netscape"], optionsHi: ["क्रोम", "मोज़ेक", "WorldWideWeb", "नेटस्केप"], correct: 2 },
        { qEn: "Shortcut for 'Permanent Delete' a file?", qHi: "फाइल को 'हमेशा के लिए डिलीट' करने का शॉर्टकट?", optionsEn: ["Delete", "Ctrl + Delete", "Shift + Delete", "Alt + Delete"], optionsHi: ["Delete", "Ctrl + Delete", "Shift + Delete", "Alt + Delete"], correct: 2 },
        { qEn: "Full form of NEFT?", qHi: "NEFT का फुल फॉर्म क्या है?", optionsEn: ["National Electronic Funds Transfer", "Net Electronic Funds Transfer", "National Efficient Funds Transfer", "None"], optionsHi: ["National Electronic Funds Transfer", "Net Electronic Funds Transfer", "National Efficient Funds Transfer", "कोई नहीं"], correct: 0 },
        { qEn: "What is the shortcut to insert a Hyperlink?", qHi: "हाइपरलिंक इन्सर्ट करने का शॉर्टकट क्या है?", optionsEn: ["Ctrl + H", "Ctrl + K", "Ctrl + L", "Ctrl + M"], optionsHi: ["Ctrl + H", "Ctrl + K", "Ctrl + L", "Ctrl + M"], correct: 1 },
        { qEn: "Which social media is used for professional networking?", qHi: "प्रोफेशनल नेटवर्किंग के लिए कौन सा सोशल मीडिया उपयोग किया जाता है?", optionsEn: ["Facebook", "LinkedIn", "Instagram", "Snapchat"], optionsHi: ["फेसबुक", "लिंक्डइन", "इंस्टाग्राम", "स्नैपचैट"], correct: 1 },
        { qEn: "Full form of IoT?", qHi: "IoT का फुल फॉर्म क्या है?", optionsEn: ["Internet of Things", "Information of Things", "Interaction of Things", "Internet of Tasks"], optionsHi: ["Internet of Things", "Information of Things", "Interaction of Things", "Internet of Tasks"], correct: 0 },
        { qEn: "What is the default file extension of MS Word 2019?", qHi: "MS Word 2019 का डिफॉल्ट फाइल एक्सटेंशन क्या है?", optionsEn: [".doc", ".docx", ".txt", ".rtf"], optionsHi: [".doc", ".docx", ".txt", ".rtf"], correct: 1 },
        { qEn: "Who is the inventor of E-mail?", qHi: "ई-मेल के आविष्कारक कौन हैं?", optionsEn: ["Ray Tomlinson", "Tim Berners Lee", "Charles Babbage", "Vint Cerf"], optionsHi: ["रे टॉमलिंसन", "टिम बर्नर्स ली", "चार्ल्स बैबेज", "विंट सर्फ"], correct: 0 },
        { qEn: "Which topology uses a central hub?", qHi: "किस टोपोलॉजी में सेंट्रल हब का उपयोग किया जाता है?", optionsEn: ["Bus", "Ring", "Star", "Mesh"], optionsHi: ["बस", "रिंग", "स्टार", "मेश"], correct: 2 },
        { qEn: "What is the shortcut for 'Paste Special'?", qHi: "'Paste Special' के लिए शॉर्टकट क्या है?", optionsEn: ["Ctrl + V", "Ctrl + Shift + V", "Alt + V", "Ctrl + Alt + V"], optionsHi: ["Ctrl + V", "Ctrl + Shift + V", "Alt + V", "Ctrl + Alt + V"], correct: 1 },
        { qEn: "Full form of GUI?", qHi: "GUI का फुल फॉर्म क्या है?", optionsEn: ["Graphical User Interface", "Global User Interface", "General User Interface", "None"], optionsHi: ["Graphical User Interface", "Global User Interface", "General User Interface", "कोई नहीं"], correct: 0 },
        { qEn: "How many columns are there in LibreOffice Calc?", qHi: "LibreOffice Calc में कुल कितने कॉलम होते हैं?", optionsEn: ["1024", "16384", "256", "512"], optionsHi: ["1024", "16384", "256", "512"], correct: 0 },
        { qEn: "Shortcut key to close the current window in Windows?", qHi: "विंडोज में करंट विंडो बंद करने का शॉर्टकट?", optionsEn: ["Alt + F4", "Ctrl + F4", "Shift + F4", "Alt + C"], optionsHi: ["Alt + F4", "Ctrl + F4", "Shift + F4", "Alt + C"], correct: 0 },
        { qEn: "What is the full form of PDF?", qHi: "PDF का फुल फॉर्म क्या है?", optionsEn: ["Portable Document Format", "Print Document File", "Personal Document Format", "None"], optionsHi: ["Portable Document Format", "Print Document File", "Personal Document Format", "कोई नहीं"], correct: 0 },
        { qEn: "Which device is used to connect a computer to the internet?", qHi: "कंप्यूटर को इंटरनेट से जोड़ने के लिए किस डिवाइस का उपयोग होता है?", optionsEn: ["Modem", "Printer", "Monitor", "CPU"], optionsHi: ["मोडेम", "प्रिंटर", "मॉनिटर", "सीपीयू"], correct: 0 },
        { qEn: "Shortcut for Header and Footer in LibreOffice Writer?", qHi: "LibreOffice Writer में हेडर और फुटर के लिए शॉर्टकट?", optionsEn: ["Alt + I", "Ctrl + I", "Alt + H", "No direct shortcut"], optionsHi: ["Alt + I", "Ctrl + I", "Alt + H", "कोई डायरेक्ट शॉर्टकट नहीं"], correct: 3 },
        { qEn: "What is the maximum number of rows in Excel?", qHi: "Excel में अधिकतम रोज़ (Rows) की संख्या कितनी है?", optionsEn: ["10,48,576", "65,536", "1,00,000", "5,24,288"], optionsHi: ["10,48,576", "65,536", "1,00,000", "5,24,288"], correct: 0 },
        { qEn: "Full form of OSS?", qHi: "OSS का फुल फॉर्म क्या है?", optionsEn: ["Open Source Software", "Original Source Software", "Open System Software", "None"], optionsHi: ["Open Source Software", "Original Source Software", "Open System Software", "कोई नहीं"], correct: 0 },
        { qEn: "Shortcut for subscript in LibreOffice Writer?", qHi: "LibreOffice Writer में सबस्क्रिप्ट के लिए शॉर्टकट?", optionsEn: ["Ctrl + Shift + B", "Ctrl + Shift + P", "Ctrl + B", "Ctrl + P"], optionsHi: ["Ctrl + Shift + B", "Ctrl + Shift + P", "Ctrl + B", "Ctrl + P"], correct: 0 },
        { qEn: "Who is known as the father of Artificial Intelligence?", qHi: "आर्टिफिशियल इंटेलिजेंस का जनक किसे माना जाता है?", optionsEn: ["John McCarthy", "Alan Turing", "Charles Babbage", "Bill Gates"], optionsHi: ["जॉन मैकार्थी", "एलन ट्यूरिंग", "चार्ल्स बैबेज", "बिल गेट्स"], correct: 0 },
        { qEn: "What is the full form of BHIM?", qHi: "BHIM का फुल फॉर्म क्या है?", optionsEn: ["Bharat Interface for Money", "Bharat Item for Money", "Bharat Interface for Mobile", "None"], optionsHi: ["Bharat Interface for Money", "Bharat Item for Money", "Bharat Interface for Mobile", "कोई नहीं"], correct: 0 },
        { qEn: "Which key is used to refresh the desktop?", qHi: "डेस्कटॉप रिफ्रेश करने के लिए किस कुंजी का उपयोग होता है?", optionsEn: ["F1", "F2", "F5", "F12"], optionsHi: ["F1", "F2", "F5", "F12"], correct: 2 },
        { qEn: "Shortcut to insert Date in Excel?", qHi: "Excel में डेट इन्सर्ट करने का शॉर्टकट क्या है?", optionsEn: ["Ctrl + ;", "Ctrl + Shift + :", "Alt + D", "Ctrl + D"], optionsHi: ["Ctrl + ;", "Ctrl + Shift + :", "Alt + D", "Ctrl + D"], correct: 0 },
        { qEn: "Full form of MODEM?", qHi: "MODEM का फुल फॉर्म क्या है?", optionsEn: ["Modulator-Demodulator", "Model-Demodel", "Mode-Demode", "None"], optionsHi: ["Modulator-Demodulator", "Model-Demodel", "Mode-Demode", "कोई नहीं"], correct: 0 },
        { qEn: "Which software is used for Accounting?", qHi: "अकाउंटिंग के लिए किस सॉफ्टवेयर का उपयोग किया जाता है?", optionsEn: ["MS Word", "Tally", "Photoshop", "Chrome"], optionsHi: ["एमएस वर्ड", "टैली", "फोटोशॉप", "क्रोम"], correct: 1 },
        { qEn: "Shortcut for New Slide in PowerPoint?", qHi: "PowerPoint में नई स्लाइड के लिए शॉर्टकट क्या है?", optionsEn: ["Ctrl + N", "Ctrl + M", "Ctrl + S", "Ctrl + O"], optionsHi: ["Ctrl + N", "Ctrl + M", "Ctrl + S", "Ctrl + O"], correct: 1 },
        { qEn: "Full form of PAN?", qHi: "PAN (Card) का फुल फॉर्म क्या है?", optionsEn: ["Permanent Account Number", "Personal Account Number", "Private Account Number", "None"], optionsHi: ["Permanent Account Number", "Personal Account Number", "Private Account Number", "कोई नहीं"], correct: 0 },
        { qEn: "Which memory is temporary?", qHi: "कौन सी मेमोरी अस्थायी है?", optionsEn: ["RAM", "ROM", "HDD", "SSD"], optionsHi: ["रैम (RAM)", "रोम (ROM)", "HDD", "SSD"], correct: 0 },
        { qEn: "Shortcut to create a new folder?", qHi: "नया फोल्डर बनाने का शॉर्टकट क्या है?", optionsEn: ["Ctrl + N", "Ctrl + Shift + N", "Alt + N", "Shift + N"], optionsHi: ["Ctrl + N", "Ctrl + Shift + N", "Alt + N", "Shift + N"], correct: 1 },
        { qEn: "Full form of VIRUS?", qHi: "VIRUS का फुल फॉर्म क्या है?", optionsEn: ["Vital Information Resources Under Siege", "Vital Information Record Under Siege", "Very Important Resources Under Siege", "None"], optionsHi: ["Vital Information Resources Under Siege", "Vital Information Record Under Siege", "Very Important Resources Under Siege", "कोई नहीं"], correct: 0 },
        { qEn: "Which extension is used for Excel files?", qHi: "Excel फाइलों के लिए कौन सा एक्सटेंशन उपयोग होता है?", optionsEn: [".xlsx", ".docx", ".pptx", ".txt"], optionsHi: [".xlsx", ".docx", ".pptx", ".txt"], correct: 0 },
        { qEn: "Shortcut to Open File Explorer?", qHi: "फाइल एक्सप्लोरर खोलने का शॉर्टकट?", optionsEn: ["Win + E", "Win + F", "Win + D", "Win + R"], optionsHi: ["Win + E", "Win + F", "Win + D", "Win + R"], correct: 0 },
        { qEn: "Full form of URL?", qHi: "URL का फुल फॉर्म क्या है?", optionsEn: ["Uniform Resource Locator", "Universal Resource Locator", "Uniform Resource Link", "None"], optionsHi: ["Uniform Resource Locator", "Universal Resource Locator", "Uniform Resource Link", "कोई नहीं"], correct: 0 },
        { qEn: "What is the binary of decimal 5?", qHi: "डेसिमल 5 का बाइनरी क्या है?", optionsEn: ["101", "110", "111", "100"], optionsHi: ["101", "110", "111", "100"], correct: 0 },
        { qEn: "Shortcut for Task Manager?", qHi: "टास्क मैनेजर का शॉर्टकट क्या है?", optionsEn: ["Ctrl + Shift + Esc", "Ctrl + Alt + Del", "Both A & B", "None"], optionsHi: ["Ctrl + Shift + Esc", "Ctrl + Alt + Del", "दोनों A और B", "कोई नहीं"], correct: 2 },
        { qEn: "Full form of SMS?", qHi: "SMS का फुल फॉर्म क्या है?", optionsEn: ["Short Message Service", "Small Message Service", "Simple Message Service", "None"], optionsHi: ["Short Message Service", "Small Message Service", "Simple Message Service", "कोई नहीं"], correct: 0 }
    ],


};

// नोट: ऊपर मैंने 10-10 सवालों का उदाहरण दिया है, लेकिन डेटाबेस में आप 50-50 तक बढ़ा सकते हैं।
// बाकी का कोड (Logic, UI, Styles) पहले जैसा ही रहेगा।

const MockTest = () => {
    const navigate = useNavigate();
    const [testType, setTestType] = useState('test1');
    const [lang, setLang] = useState('en');
    const [page, setPage] = useState('selection');
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(45 * 60);

    const questions = questionsDB[testType];

    useEffect(() => {
        if (page !== 'quiz') return;
        if (timeLeft <= 0) { setPage('result'); return; }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, page]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach((q, idx) => {
            if (answers[idx] === q.correct) correct++;
        });
        return Math.round((correct / questions.length) * 100);
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.topControls}>
                <button style={styles.backBtn} onClick={() => navigate(-1)}><ArrowLeft size={18} /> {lang === 'en' ? "Back" : "पीछे"}</button>
                <button style={styles.langBtn} onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}>
                    <Languages size={18} /> {lang === 'en' ? "Hindi" : "English"}
                </button>
            </div>

            <div style={styles.container}>
                {page === 'selection' && (
                    <div style={styles.resultBox}>
                        <h2 style={{ color: '#333' }}>🎯 {lang === 'en' ? "Choose Your Test" : "अपना टेस्ट चुनें"}</h2>
                        <div style={styles.selectionGrid}>
                            <div style={styles.testCard} onClick={() => { setTestType('test1'); setPage('quiz'); setCurrentIdx(0); setAnswers({}); }}>
                                <h3>Mock Test 1</h3>
                                <p>Web & IT Basics</p>
                                <button style={styles.btnPrimary}>{lang === 'en' ? "Start" : "शुरू करें"}</button>
                            </div>
                            <div style={styles.testCard} onClick={() => { setTestType('test2'); setPage('quiz'); setCurrentIdx(0); setAnswers({}); }}>
                                <h3>Mock Test 2</h3>
                                <p>C & Python Advanced</p>
                                <button style={styles.btnPrimary}>{lang === 'en' ? "Start" : "शुरू करें"}</button>
                            </div>
                            <div style={styles.testCard} onClick={() => { setTestType('test3'); setPage('quiz'); setCurrentIdx(0); setAnswers({}); setTimeLeft(45 * 60); }}>
                                <h3>Mock Test 3</h3>
                                <p>O Level (M1-R5)</p>
                                <button style={styles.btnPrimary}>{lang === 'en' ? "Start" : "शुरू करें"}</button>
                            </div>

                            {/* Mock Test 4 - ADCA */}
                            <div style={styles.testCard} onClick={() => { setTestType('test4'); setPage('quiz'); setCurrentIdx(0); setAnswers({}); setTimeLeft(60 * 60); }}>
                                <h3>Mock Test 4</h3>
                                <p>ADCA Full Course</p>
                                <button style={styles.btnPrimary}>{lang === 'en' ? "Start" : "शुरू करें"}</button>
                            </div>
                        </div>
                    </div>
                )}

                {page === 'quiz' && (
                    <div style={{ animation: 'fadeIn 0.5s' }}>
                        <div style={styles.header}>
                            <h1 style={{ color: 'white' }}>🖥️ {testType === 'test1' ? "Test 1" : "Test 2"}</h1>
                            <div style={styles.timerBox}>⏳ {formatTime(timeLeft)}</div>
                        </div>

                        <div style={styles.card}>
                            <span style={styles.qNum}>{currentIdx + 1} / {questions.length}</span>
                            <h2 style={styles.qText}>{lang === 'en' ? questions[currentIdx].qEn : questions[currentIdx].qHi}</h2>
                            <div style={styles.optionsList}>
                                {(lang === 'en' ? questions[currentIdx].optionsEn : questions[currentIdx].optionsHi).map((opt, i) => (
                                    <div
                                        key={i}
                                        style={answers[currentIdx] === i ? styles.optionSelected : styles.option}
                                        onClick={() => setAnswers({ ...answers, [currentIdx]: i })}
                                    >
                                        <b>{String.fromCharCode(65 + i)}.</b> {opt}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={styles.btnGroup}>
                            <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(c => c - 1)} style={styles.btnSecondary}>{lang === 'en' ? "Previous" : "पिछला"}</button>
                            {currentIdx < questions.length - 1 ? (
                                <button onClick={() => setCurrentIdx(c => c + 1)} style={styles.btnPrimary}>{lang === 'en' ? "Next" : "अगला"}</button>
                            ) : (
                                <button onClick={() => setPage('result')} style={styles.btnSuccess}>{lang === 'en' ? "Submit" : "जमा करें"}</button>
                            )}
                        </div>
                    </div>
                )}

                {page === 'result' && (
                    <div style={styles.resultBox}>
                        <Award size={60} color="#764ba2" />
                        <h2 style={{ color: '#333' }}>{lang === 'en' ? "Your Result" : "आपका परिणाम"}</h2>
                        <div style={{ ...styles.scoreCircle, background: calculateScore() >= 50 ? '#38ef7d' : '#ff6b6b' }}>
                            {calculateScore()}%
                        </div>
                        <button onClick={() => setPage('selection')} style={styles.btnPrimary}>
                            <RotateCcw size={18} /> {lang === 'en' ? "Go Home" : "मुख्य पृष्ठ"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// (CSS Styles वही रहेंगे जो पिछले कोड में दिए थे)
const styles = {
    wrapper: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', padding: '80px 20px', fontFamily: 'sans-serif' },
    topControls: { position: 'fixed', top: '20px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', zIndex: 1000 },
    backBtn: { background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid white', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
    langBtn: { background: '#e91e63', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' },
    container: { maxWidth: '700px', margin: '20px auto' },
    header: { textAlign: 'center', marginBottom: '20px' },
    timerBox: { fontSize: '20px', color: '#ff4d4d', background: 'white', padding: '5px 20px', borderRadius: '20px', display: 'inline-block', fontWeight: 'bold' },
    card: { background: 'white', color: '#333', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', position: 'relative' },
    qNum: { position: 'absolute', top: '15px', right: '15px', background: '#f0f0f0', padding: '5px 12px', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold' },
    qText: { fontSize: '20px', marginBottom: '25px', color: '#1a1a2e' },
    optionsList: { display: 'flex', flexDirection: 'column', gap: '12px' },
    option: { padding: '15px', border: '1px solid #ddd', borderRadius: '12px', cursor: 'pointer' },
    optionSelected: { padding: '15px', border: '2px solid #e91e63', background: '#fff0f5', borderRadius: '12px', fontWeight: 'bold' },
    btnGroup: { marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' },
    btnPrimary: { background: '#e91e63', color: 'white', padding: '12px 35px', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' },
    btnSuccess: { background: '#38ef7d', color: 'white', padding: '12px 35px', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' },
    btnSecondary: { background: '#555', color: 'white', padding: '12px 35px', border: 'none', borderRadius: '25px', cursor: 'pointer' },
    resultBox: { background: 'white', padding: '50px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' },
    selectionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' },
    testCard: { border: '1px solid #ddd', padding: '30px', borderRadius: '15px', cursor: 'pointer', transition: '0.3s', color: '#333' },
    scoreCircle: { width: '120px', height: '120px', borderRadius: '50%', margin: '20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: 'white', fontWeight: 'bold' }
};

export default MockTest;