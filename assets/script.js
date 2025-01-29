//Variables
var call_form_ = document.querySelector("#formContainer form");
var call_formData = new FormData(call_form_);
var call_params = "";
let startBtn = document.querySelector("#start");
let qContainer = document.querySelector("#questions");
let btnContainer = document.querySelector(".btnContainer");
let CSA = document.querySelector(".CSA")
let counter = 0;
let PreSurveyQs = [
  "Which Call Managment Softwares Have You Used In The Past? ",
  "In the past ow have you handled calls and group communication in your previous employments?",
  "What industry trends have you seen/heard of for call management and group communication:",
  "What are Major Improvement Points When Ensuring Customer Satisfaction",
  "What are Major Improvement Points to Improve Interal Company Communication",
  "What are Major Improvement Points to Improve When Dealing with Delivery/Driver Issues",
  "What are Over All Improvements that need to be made in the Customer Relations Management Processes",
  "How dificult is it for you take a call, Why is it difficult?",
  "What do you do to actively help keep the system afloat",
  "What apps do you use when receiving a call and for what?",
  "What would you change about the Design proposed for Our CRM",
  "What would you add to the Interface proposed",
  "Do you belive AI will replace customer servive Agents before 2030?",
  "What do you do if a Customer Wants an Update on His Order",
  "What do you do if a Customer if Complaining about a drivers delay",
  "What Protocol do you follow when you get a Call from a caller wanting to make a phone purchase?",
  "What do you do if a Customer calls and has a broken bed out of Warranty ",
  "What do you do if a Caller ask if we recieve Humana Insurance ",
  "What do you do if a Caller is asking about Specific Details for a Chair and asking for a Quote",
  "What to tell a customer is calling to complain about the wrong RPI part being sent",
];

//functions
let call_trigger = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data, // body data type must match "Content-Type" header
  });

  return response; // parses JSON response into native JavaScript objects
};
let startSurvey = (qArray) => {
  qContainer.innerHTML += `<textarea id="answers"></textarea>`;
  document.getElementById("prompt").innerHTML = `${qArray[counter]}`;
  btnContainer.innerHTML = `<span id="next" class="btn">Next</span>`;
  document.getElementById("next").addEventListener("click", () => {
    counter += 1
    call_params += `Q${counter}=A${counter}${document.getElementById("answers").value}&`;
    if(qArray.length > counter){
      document.getElementById("prompt").innerHTML = `${qArray[counter]}`;
      document.getElementById("answers").value = ""
    }else if(qArray.length === counter){
      btnContainer.innerHTML = `<button type="submit" id="send" class="btn">Send</button>`;
    }
  });
};

//Triggers
CSA.addEventListener("change", () => {
  startBtn.classList.remove("hide") 
  document.getElementById("prompt").classList.remove("hide") 
  CSA.classList.add("hide") 
  call_params += `${CSA.name}=${CSA.value}&`;
});
document.getElementById("start").addEventListener("click", (e) => {
  startSurvey(PreSurveyQs);
});

call_form_.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("this is the data retreived", call_params);
  call_trigger("https://hooks.airtable.com/workflows/v1/genericWebhook/appELJwYYus7qLt4Q/wflhTzGFUO7eSYJGP/wtrqw3NFGafD3XkUT", JSON.stringify(call_params)).then((data) => {
    alert("Answers have been sent");
    console.log(data);
  });
});



