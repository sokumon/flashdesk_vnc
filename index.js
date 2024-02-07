function hide_and_close(el){
    el.classList.toggle("active");
    var chatWindow = document.getElementById("chat_window");
    if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
        chatWindow.style.display = "flex"; // Set display property to "block" to make the chat window visible
    } else {
        chatWindow.style.display = "none"; // Set display property to "none" to hide the chat window
    }


}


let global_base_url = window.location.protocol +"//" + window.location.hostname;
console.log(global_base_url)
function createchatElement(id,text) {
    // Create the div element
    let chat_section = document.getElementById("chat_section");
    var divElement = document.createElement("div");
    divElement.setAttribute("id", id);

    // Create the img element
    var imgElement = document.createElement("img");
    imgElement.setAttribute("class", "round image");
    imgElement.setAttribute("width", "30");
    imgElement.setAttribute("height", "30");
    imgElement.setAttribute("avatar", "Flash Desk");
    imgElement.setAttribute("src",document.getElementsByClassName("round")[0].src);

    // Create the p element
    var pElement = document.createElement("p");
    pElement.setAttribute("class", "text");
    pElement.textContent = text;
    

    // Append the img and p elements to the div element
    divElement.appendChild(imgElement);
    divElement.appendChild(pElement);

    // Append the div element to the document body (or any other element you want)
    chat_section.appendChild(divElement);
}

// Call the function to create the elements
// createchatElement('bot',);
// setInterval(function() {createchatElement('bot',"gm");}, 1000);

function sendMessage() {
    var userActions = document.getElementById("user_actions");
    var promptInput = document.getElementById("prompt");

    // Get the user input
    var userInput = promptInput.value.trim();

    if (userInput !== "") {
        // Create a new user div
        var userDiv = document.createElement("div");
        userDiv.setAttribute("id", "user");
        
        // Create the img element for the user
        var imgElement = document.createElement("img");
        imgElement.setAttribute("class", "round image");
        imgElement.setAttribute("width", "30");
        imgElement.setAttribute("height", "30");
        imgElement.setAttribute("avatar", "Admin");
        imgElement.setAttribute("src",document.getElementsByClassName("round")[1].src);

        // Create the p element for the user message
        var pElement = document.createElement("p");
        pElement.setAttribute("class", "text");
        pElement.textContent = userInput;

        // Append the img and p elements to the user div
        userDiv.appendChild(imgElement);
        userDiv.appendChild(pElement);

        // Append the user div to the chat section
        document.getElementById("chat_section").appendChild(userDiv);

        fetch_info(promptInput.value)

        // Clear the input field
        promptInput.value = "";

        // Scroll the chat section to the bottom to show the latest message
        document.getElementById("chat_section").scrollTop = document.getElementById("chat_section").scrollHeight;

        
    }
}


async function fetchCollections(user_prompt) {
    try {
        const baseUrl = `${global_base_url}`;
        const route = "/api/v1/documents";

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGFta3Vsa2FybnM5QGdtYWlsLmNvbSJ9.aq0BeMizC4_EdwWT2ZxsYd7t0bS77S1vzafz6Zzvo24");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(`${baseUrl}${route}`, requestOptions);
        const result = await response.json();


        fetchDatafromdoc(result[0].collection_name,user_prompt,user_prompt.length);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function fetchDatafromdoc(id, query, k) {
    try {
        // Construct the base URL from parameters
        const baseUrl = `${global_base_url}/rag/api/v1/query/${id}`;

        // Construct the full URL with parameters
        const url = new URL(baseUrl);
        url.searchParams.append("query", query);
        url.searchParams.append("k", k);

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Accept-Language", "en-US,en;q=0.9");
        // ... (other headers)

        // Append the Bearer token to the Authorization header
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGFta3Vsa2FybnM5QGdtYWlsLmNvbSJ9.aq0BeMizC4_EdwWT2ZxsYd7t0bS77S1vzafz6Zzvo24");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        const response = await fetch(url.toString(), requestOptions);
        const result = await response.json();

        fetchChatwords(result.documents[0][0],query)
    } catch (error) {
        console.error('Error:', error);
        console.log(error.stack)
    }
}

function countWords(str) {
    // Remove leading and trailing whitespaces
    const trimmedStr = str.trim();
    
    // Split the string into an array of words
    const words = trimmedStr.split(/\s+/);

    // Filter out empty strings (caused by multiple spaces)
    const nonEmptyWords = words.filter(word => word !== '');

    // Return the count of non-empty words
    return nonEmptyWords.length;
}


async function fetchChatwords(content,query) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "*/*");
        myHeaders.append("Accept-Language", "en-US,en;q=0.9");
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGFta3Vsa2FybnM5QGdtYWlsLmNvbSJ9.aq0BeMizC4_EdwWT2ZxsYd7t0bS77S1vzafz6Zzvo24");
        myHeaders.append("Connection", "keep-alive");
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Cookie", "sid=f6200a60ddef34f6fec3255fd9fbe09fa719ebbb104d0fc0fafaab78; system_user=yes; full_name=Administrator; user_id=Administrator; user_image=");
        // myHeaders.append("DNT", "1");
        // myHeaders.append("Origin", "http://localhost:3000");
        // myHeaders.append("Referer", "http://localhost:3000/");
        // myHeaders.append("Sec-Fetch-Dest", "empty");
        // myHeaders.append("Sec-Fetch-Mode", "cors");
        // myHeaders.append("Sec-Fetch-Site", "same-origin");
        // myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
        // myHeaders.append("sec-ch-ua", "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"");
        // myHeaders.append("sec-ch-ua-mobile", "?0");
        // myHeaders.append("sec-ch-ua-platform", "\"Windows\"");

        // const content = "Your dynamic content here";
        // const query = "Your query here";

        // Constructing dynamic content
        const dynamicContent = `Use the following context as your learned knowledge, inside <context></context> XML tags.\n\t<context>\n\t${content}\nQuery is ${query}`;

        var raw = JSON.stringify({
            "model": "llama2:latest",
            "messages": [
                {
                    "role": "user",
                    "content": dynamicContent,
                    "images": []
                },
                {
                    "role": "assistant",
                    "content": ""
                }
            ],
            "options": {}
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        console.log("Starting to fetch")
        const response = await fetch(`${global_base_url}/ollama/api/chat`, requestOptions);
        const result = await response.text();
        console.log("Fetch done ")
        console.log(result);
        const formattedJson = fixJsonString(result);
        const concatenatedResult = concatenateContent(JSON.parse(formattedJson));
        createchatElement('bot',concatenatedResult);
    } catch (error) {
        console.error('Error:', error);
    }
}


function fixJsonString(jsonString) {
    try {
        // Split the input string into an array of individual JSON strings
        const jsonStrings = jsonString.match(/(\{[^{}]*\})/g);

        // Check if there are valid JSON strings
        if (!jsonStrings) {
            throw new Error('Invalid input format. No valid JSON strings found.');
        }

        // Parse each JSON string and create an array
        const jsonArray = jsonStrings.map(jsonStr => JSON.parse(jsonStr));

        // Convert the array to a valid JSON array string
        const jsonResult = JSON.stringify(jsonArray);

        return jsonResult;
    } catch (error) {
        console.error('Error:', error.message);
        return null; // Return null in case of an error
    }
}

function concatenateContent(jsonArray) {
    try {
        // Check if jsonArray is an array
        if (!Array.isArray(jsonArray)) {
            throw new Error('Input should be an array of objects.');
        }

        // Initialize an empty string to store concatenated content
        let resultString = '';

        // Loop over the array and append the "content" field to the resultString
        for (const obj of jsonArray) {
            // Check if the object has the "content" field
            if (obj && obj.content) {
                resultString += obj.content;
            }
        }

        return resultString;
    } catch (error) {
        console.error('Error:', error.message);
        return null; // Return null in case of an error
    }
}

async function fetch_info(query){
    try {
        const baseUrl = `${global_base_url}`;
        const route = ":8000/api/method/flashdesk.api.ai.process_pdfs.fetch_answer";

        console.log(`${baseUrl}${route}`)
        // const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Accept","application/json")

        // var raw = JSON.stringify({
        //     "query": query
        // });
          
        // const requestOptions = {
        //     method: 'POST',
        //     body: raw,
        // };

        var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "query" : query
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${baseUrl}${route}`, requestOptions)
  .then(response => response.json())
  .then(result => createchatElement("bot",result.message))
  .catch(error => console.log('error', error));


     
    } catch (error) {
        console.error('Error:', error);
    }
}