function showTime(){
    const date=new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}

// UC3 Make AJAX call using promise to read json
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
function makeAJAXCall(methodType, url,async = true, data = null) 
{
    return new Promise(function(resolve,reject)
    {
        let xhr = new XMLHttpRequest();
        xhr.open(methodType,url,async);
        if(data !=null)
        {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }
        else
        {
            xhr.send();
        }

        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === 4) 
            {
                if (xhr.status === 200 || xhr.status === 201)
                {
                    resolve(xhr.responseText);
                } 
                else if (xhr.status >= 400) 
                {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                     });
                }
            }
        }
    });
}

let getURL = "http://localhost:3000/employees";
makeAJAXCall("GET",getURL,true)
.then(responsetext => 
        console.log("Get User Data at: " + showTime() + " data: " +responsetext))
.catch(err => console.log("Get Error statustext : "+ err.statusText +" status : "+err.status))

const deleteURL = "http://localhost:3000/employees/3";

makeAJAXCall("DELETE", deleteURL, true)
.then(responsetext => 
    console.log("Deleted User Data at: " + showTime() + " data: " +responsetext))
.catch(err => console.log("Delete Error statustext : "+ err.statusText +" status : "+err.status))

const postURL = "http://localhost:3000/employees";
const emplData = {name: "kavya",salary: "5000"};
makeAJAXCall("POST", postURL, true, emplData)
.then(responsetext => 
    console.log("Posted User Data at: " + showTime() + " data: " +responsetext))
.catch(err => console.log("Post Error statustext : "+ err.statusText +" status : "+err.status))