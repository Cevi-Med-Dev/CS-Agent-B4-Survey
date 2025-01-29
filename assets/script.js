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
  "Which call management software have you used in the past?",
  "How have you handled calls and group communication in your previous roles?",
  "What industry trends have you observed or heard about related to call management and group communication?",
  "What are the key areas for improvement when ensuring customer satisfaction?",
  "What are the main areas for improvement in internal company communication?",
  "What are the major areas for improvement when addressing delivery or driver issues?",
  "What overall improvements need to be made in the customer relations management processes?",
  "How difficult is it for you to take a call, and why?",
  "What actions do you take to actively support the system's functionality?",
  "What apps do you use when receiving a call, and for what purposes?",
  "What changes would you make to the proposed design for our CRM?",
  "What would you add to the proposed interface?",
  "Do you believe AI will replace customer service agents before 2030?",
  "What do you do when a customer asks for an update on their order?",
  "How do you respond when a customer complains about a driver’s delay?",
  "What protocol do you follow when you receive a call from a customer wanting to make a phone purchase?",
  "How do you handle a situation when a customer calls about a broken bed that is out of warranty?",
  "What do you do if a customer asks whether we accept Humana insurance?",
  "What do you do when a customer inquires about specific details for a chair and asks for a quote?",
  "How do you respond when a customer complains about receiving the wrong RPI part?"
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
    call_params += `Q${counter}=${document.getElementById("answers").value}&`;
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



