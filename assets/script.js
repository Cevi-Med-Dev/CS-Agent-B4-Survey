//Variables
var call_form_ = document.querySelector("#formContainer form");
var call_formData = new FormData(call_form_);
var call_params = "";
let startBtn = document.querySelector("#start");
let qContainer = document.querySelector("#questions");
let btnContainer = document.querySelector(".btnContainer");
let CSA = document.querySelector(".CSA");
let qPix = document.querySelector("#qPix");
let title = document.querySelector("#title");
let counter = 0;
let PreSurveyQs = [
  "What call management software have you used?",
  "How have you managed calls and group communication in past roles?", //1.jpg
  "What trends have you noticed in call management and group communication?",
  "What areas need improvement for customer satisfaction?",
  "What areas need improvement for internal communication?",
  "What improvements are needed to address delivery/driver issues?",
  "What overall improvements should be made to CRM processes?",
  "How difficult is it to handle a call, and why? ",
  "How do you contribute day to day to fulfill our customers needs?",
  "What apps do you use when taking calls, and what purpose do they serve?",
  "What changes would you make to the CRM design?",
  "What would you add to the CRM interface?",
  "Will AI replace customer service agents by 2030?",
  "What do you do when a customer asks for an order update?",
  "How do you respond to a customer complaining about a driver delay?",
  "What do you do when a customer wants to make a phone purchase?",
  "How do you handle a call about a broken bed out of warranty?",
  "What do you do if a customer asks about Humana insurance?",
  "What do you do when a customer asks for a chair quote?",
  "How do you respond to a customer complaining about the wrong RPI part?"
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
  qContainer.innerHTML += `<progress id="progressBar" value="${counter}" max=${qArray.length}> 0 </progress><br><textarea id="answers"></textarea>`;
  document.getElementById("prompt").innerHTML = `${qArray[counter]}`;
  btnContainer.innerHTML = `<span id="next" class="btn">Next</span>`;

  document.getElementById("next").addEventListener("click", () => {
    counter += 1;
    console.log(
      "counter : ",
      counter,
      "qArray length",
      qArray.length,
      "# b4 last ? : ",
      qArray.length - 1 === counter
    );
    qPix.src = `./assets/img/${counter}.jpg`;
    document.getElementById("progressBar").value = counter;
    call_params += `Q${counter}=${document.getElementById("answers").value}&`;
    if (qArray.length - 1 === counter) {
      btnContainer.innerHTML = `<button type="submit" id="send" class="btn">Send</button>`;
    } else if (qArray.length > counter) {
      document.getElementById("prompt").innerHTML = `${qArray[counter]}`;
      document.getElementById("answers").value = "";
    }
  });
};

//Triggers
CSA.addEventListener("change", () => {
  startBtn.classList.remove("hide");
  document.getElementById("prompt").classList.remove("hide");
  CSA.classList.add("hide");
  call_params += `${CSA.name}=${CSA.value}&`;
});
document.getElementById("start").addEventListener("click", (e) => {
  qPix.classList.remove("hide");
  title.classList.add("hide");
  startSurvey(PreSurveyQs);
});

call_form_.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("this is the data retreived", call_params);
  call_trigger(
    "https://hooks.airtable.com/workflows/v1/genericWebhook/appELJwYYus7qLt4Q/wflhTzGFUO7eSYJGP/wtrqw3NFGafD3XkUT",
    JSON.stringify(call_params)
  ).then((data) => {
    alert("Answers have been sent");
    location.reload();
  });
});
