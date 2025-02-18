const chatbotTrigger = document.querySelector(".chatbot-trigger");
const chatbotOverlay = document.querySelector(".chatbot-overlay");
const closeBtn = document.getElementById("closeBtn");
const chatbotContent = document.getElementById("chatbotContent");
const welcomeMessage = document.getElementById("welcomeMessage");
const helpMessage = document.getElementById("helpMessage");

const sendButton = document.getElementById("sendButton");
const voiceButton = document.getElementById("voiceButton");
const userInput = document.getElementById("userInput");

let currentLanguage = "en";
let currentCategory = null;
let isConversationMode = false;

const translations = {
  en: {
    welcome: "Welcome To TechSarthi",
    help: "How Can I Help You?",
    categories: {
      Admissions: "Admissions",
      Courses: "Courses",
      Fees: "Fees",
      Cutoffs: "Cutoffs",
    },
    questions: {
      Admissions: [
        { key: "How to apply?", text: "How to apply?" },
        { key: "Application deadline?", text: "Application deadline?" },
        { key: "Required documents?", text: "Required documents?" },
      ],
      Courses: [
        { key: "Available programs?", text: "Available programs?" },
        { key: "Course duration?", text: "Course duration?" },
        { key: "Eligibility criteria?", text: "Eligibility criteria?" },
      ],
      Fees: [
        { key: "Tuition fees?", text: "Tuition fees?" },
        { key: "Payment methods?", text: "Payment methods?" },
        {
          key: "Scholarships available?",
          text: "Scholarships available?",
        },
      ],
      Cutoffs: [
        { key: "Previous year cutoffs?", text: "Previous year cutoffs?" },
        { key: "Expected cutoffs?", text: "Expected cutoffs?" },
        {
          key: "Cutoff calculation method?",
          text: "Cutoff calculation method?",
        },
      ],
    },
    // answers: {
    //     "How to apply?":
    //         "You can apply online through our official website or visit our admission office.",
    //     "Application deadline?":
    //         "The application deadline for this year is September 30, 2024.",
    //     "Required documents?":
    //         "You need to submit your academic transcripts, ID proof, and passport-size photographs.",
    //     "Available programs?":
    //         "We offer various engineering and technical programs. Please visit our website for a complete list.",
    //     "Course duration?":
    //         "Most of our undergraduate programs are 4 years long, while postgraduate programs are 2 years long.",
    //     "Eligibility criteria?":
    //         "Eligibility varies by program. Generally, you need to have completed 10+2 with Science subjects for undergraduate programs.",
    //     "Tuition fees?":
    //         "Tuition fees vary by program. Please check our fee structure on the official website.",
    //     "Payment methods?":
    //         "We accept online payments, bank transfers, and demand drafts.",
    //     "Scholarships available?":
    //         "Yes, we offer merit-based and need-based scholarships. Please contact our scholarship cell for more information.",
    //     "Previous year cutoffs?":
    //         "Cutoffs vary by program. For example, Computer Science had a cutoff of 95% last year.",
    //     "Expected cutoffs?":
    //         "Expected cutoffs are subject to change. Please check our website for the most up-to-date information.",
    //     "Cutoff calculation method?":
    //         "Cutoffs are calculated based on entrance exam scores and academic performance.",
    // },
    other: "Other",
    backToCategories: "Back to Categories",
    knowMore: "Know More",
    yes: "Yes",
    no: "No",
    queryResolved: "Is Your Query Resolved?",
    thankYou:
      "Thanks for reaching out! Glad I could help.\nFeel free to reach out anytime!",
    sorry: "Sorry for the inconvenience.",
    contactInfo:
      "For further assistance, please contact our support team at support@bvucoep.edu.in or call +91 1234567890.",
    anythingElse: "Is there anything else I can help you with?",
    language: "Change Language",
  },
  hi: {
    welcome: "TechSarthi में आपका स्वागत है",
    help: "मैं आपकी कैसे मदद कर सकता हूं?",
    categories: {
      Admissions: "प्रवेश",
      Courses: "पाठ्यक्रम",
      Fees: "शुल्क",
      Cutoffs: "कट-ऑफ",
    },
    questions: {
      Admissions: [
        { key: "How to apply?", text: "आवेदन कैसे करें?" },
        { key: "Application deadline?", text: "आवेदन की अंतिम तिथि?" },
        { key: "Required documents?", text: "आवश्यक दस्तावेज़?" },
      ],
      Courses: [
        { key: "Available programs?", text: "उपलब्ध कार्यक्रम?" },
        { key: "Course duration?", text: "पाठ्यक्रम की अवधि?" },
        { key: "Eligibility criteria?", text: "पात्रता मानदंड?" },
      ],
      Fees: [
        { key: "Tuition fees?", text: "शिक्षण शुल्क?" },
        { key: "Payment methods?", text: "भुगतान के तरीके?" },
        {
          key: "Scholarships available?",
          text: "उपलब्ध छात्रवृत्तियां?",
        },
      ],
      Cutoffs: [
        { key: "Previous year cutoffs?", text: "पिछले साल के कट-ऑफ?" },
        { key: "Expected cutoffs?", text: "अपेक्षित कट-ऑफ?" },
        { key: "Cutoff calculation method?", text: "कट-ऑफ गणना विधि?" },
      ],
    },
    answers: {
      "आवेदन कैसे करें?":
        "आप हमारी आधिकारिक वेबसाइट के माध्यम से ऑनलाइन आवेदन कर सकते हैं या हमारे प्रवेश कार्यालय पर जा सकते हैं।",
      "आवेदन की अंतिम तिथि?":
        "इस वर्ष के लिए आवेदन की अंतिम तिथि 30 सितंबर, 2024 है।",
      "आवश्यक दस्तावेज़?":
        "आपको अपने शैक्षणिक प्रमाणपत्र, पहचान प्रमाण और पासपोर्ट आकार की तस्वीरें जमा करनी होंगी।",
      "उपलब्ध कार्यक्रम?":
        "हम विभिन्न इंजीनियरिंग और तकनीकी कार्यक्रम प्रदान करते हैं। कृपया पूरी सूची के लिए हमारी वेबसाइट देखें।",
      "पाठ्यक्रम की अवधि?":
        "हमारे अधिकांश स्नातक कार्यक्रम 4 साल के होते हैं, जबकि स्नातकोत्तर कार्यक्रम 2 साल के होते हैं।",
      "पात्रता मानदंड?":
        "पात्रता कार्यक्रम के अनुसार भिन्न होती है। सामान्यतः, स्नातक कार्यक्रमों के लिए आपको विज्ञान विषयों के साथ 10+2 पूरा किया होना चाहिए।",
      "शिक्षण शुल्क?":
        "शिक्षण शुल्क कार्यक्रम के अनुसार भिन्न होता है। कृपया आधिकारिक वेबसाइट पर हमारी शुल्क संरचना देखें।",
      "भुगतान के तरीके?":
        "हम ऑनलाइन भुगतान, बैंक ट्रांसफर और डिमांड ड्राफ्ट स्वीकार करते हैं।",
      "उपलब्ध छात्रवृत्तियां?":
        "हां, हम मेरिट-आधारित और आवश्यकता-आधारित छात्रवृत्तियां प्रदान करते हैं। अधिक जानकारी के लिए कृपया हमारे छात्रवृत्ति प्रकोष्ठ से संपर्क करें।",
      "पिछले साल के कट-ऑफ?":
        "कट-ऑफ कार्यक्रम के अनुसार भिन्न होते हैं। उदाहरण के लिए, पिछले साल कंप्यूटर साइंस का कट-ऑफ 95% था।",
      "अपेक्षित कट-ऑफ?":
        "अपेक्षित कट-ऑफ परिवर्तन के अधीन हैं। कृपया नवीनतम जानकारी के लिए हमारी वेबसाइट देखें।",
      "कट-ऑफ गणना विधि?":
        "कट-ऑफ की गणना प्रवेश परीक्षा के अंकों और शैक्षणिक प्रदर्शन के आधार पर की जाती है।",
    },
    other: "अन्य",
    backToCategories: "श्रेणियों पर वापस जाएं",
    knowMore: "और जानें",
    yes: "हां",
    no: "नहीं",
    queryResolved: "क्या आपका प्रश्न हल हो गया?",
    thankYou:
      "संपर्क करने के लिए धन्यवाद! खुशी है कि मैं मदद कर सका।\nकभी भी संपर्क करने में संकोच न करें!",
    sorry: "असुविधा के लिए खेद है।",
    contactInfo:
      "अधिक सहायता के लिए, कृपया हमारी सहायता टीम से support@bvucoep.edu.in पर संपर्क करें या +91 1234567890 पर कॉल करें।",
    anythingElse: "क्या कोई और चीज है जिसमें मैं आपकी मदद कर सकता हूं?",
    language: "भाषा बदलें",
  },
};

function logError(functionName, error) {
  console.error(`Error in ${functionName}:`, error);
  appendMessage(
    `An error occurred in ${functionName}. Please try again or contact support.`,
    "error-message"
  );
}

function appendMessage(message, className) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.classList.add("chat-message", className);
  chatbotContent.appendChild(messageElement);
  chatbotContent.scrollTop = chatbotContent.scrollHeight;
}

function createButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("btn");
  button.addEventListener("click", onClick);
  return button;
}


function updateLanguage(lang) {
  try {
    if (!translations.hasOwnProperty(lang)) {
      throw new Error(`Translations not found for language: ${lang}`);
    }
    currentLanguage = lang;
    welcomeMessage.textContent = translations[currentLanguage].welcome;
    helpMessage.textContent = translations[currentLanguage].help;
    showCategories();

    // Update input placeholder
    userInput.placeholder =
      currentLanguage === "hi" ? "हिंदी में टाइप करें...." : "Type your query here....";

    // Update voice recognition language
    if (recognition) {
      recognition.lang = currentLanguage === "hi" ? "hi-IN" : "en-US";
    }
  } catch (error) {
    logError("updateLanguage", error);
    currentLanguage = "en";
  }
}

function createLanguageDropdown() {
  const languageSelector = document.createElement("div");
  languageSelector.classList.add("language-selector");
  const select = document.createElement("select");
  select.innerHTML = `<option value="en">English</option>
                <option value="hi">हिंदी</option>`;
  select.value = currentLanguage;

  select.addEventListener("change", (e) => updateLanguage(e.target.value));
  const label = document.createElement("label");
  label.textContent = "Choose Language / भाषा चुनें: ";
  label.appendChild(select);
  languageSelector.appendChild(label);
  return languageSelector;
}

function showCategories() {
  chatbotContent.innerHTML = "";
  chatbotContent.appendChild(createLanguageDropdown());

  const categories = translations[currentLanguage].categories;

  Object.entries(categories).forEach(([key, value]) => {
    chatbotContent.appendChild(createButton(value, () => showQuestions(key)));
  });

  chatbotContent.appendChild(
    createButton(translations[currentLanguage].other, () =>
      showContactInfo(true)
    )
  );
}

function showQuestions(category) {
  if (isConversationMode) return;

  try {
    currentCategory = category;
    chatbotContent.innerHTML = "";
    chatbotContent.appendChild(createLanguageDropdown());

    const categoryQuestions = translations[currentLanguage].questions[category];

    categoryQuestions.forEach(({ key, text }) => {
      console.log({ key, text });

      chatbotContent.appendChild(
        createButton(text, () => showAnswer(key, text))
      );
    });

    chatbotContent.appendChild(
      createButton(
        translations[currentLanguage].backToCategories,
        showCategories
      )
    );
  } catch (error) {
    logError("showQuestions", error);
    chatbotContent.appendChild(
      createButton(
        translations[currentLanguage].backToCategories,
        showCategories
      )
    );
  }
}

function showTypingIndicator() {
  const typingIndicator = document.createElement("div");
  typingIndicator.classList.add(
    "chat-message",
    "bot-message",
    "typing-indicator"
  );
  typingIndicator.innerHTML = "<span></span><span></span><span></span>";
  chatbotContent.appendChild(typingIndicator);
  chatbotContent.scrollTop = chatbotContent.scrollHeight;
  return typingIndicator;
}

function removeTypingIndicator(indicator) {
  if (indicator && indicator.parentNode) {
    indicator.parentNode.removeChild(indicator);
  }
}

async function showAnswer(questionKey, hiQuestion = "") {
  try {
    chatbotContent.innerHTML = "";
    chatbotContent.appendChild(createLanguageDropdown());

    const categoryQuestions =
      translations[currentLanguage].questions[currentCategory];
    const questionObj = categoryQuestions.find((q) => q.key === questionKey);

    if (!questionObj) {
      throw new Error(`Question not found for key: ${questionKey}`);
    }

    appendMessage(questionObj.text, "user-message");

    const typingIndicator = showTypingIndicator();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    removeTypingIndicator(typingIndicator);

    let answer;
    if (currentLanguage == "en") {
      answer = await fetchChatbotResponse(questionObj.text);
    } else {
      answer = translations[currentLanguage]?.answers[hiQuestion];
      console.log({ currentLanguage }, { questionKey });
    }

    if (!answer) {
      throw new Error(`No answer found for question key: ${questionKey}`);
    }

    appendMessage(answer, "bot-message");
    askSatisfaction();
  } catch (error) {
    logError("showAnswer", error);
    chatbotContent.appendChild(
      createButton(
        translations[currentLanguage].backToCategories,
        showCategories
      )
    );
  }
}


function askSatisfaction() {
  appendMessage(translations[currentLanguage].queryResolved, "bot-message");
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("satisfaction-buttons");
  buttonContainer.appendChild(
    createButton(translations[currentLanguage].yes, handleSatisfied)
  );
  buttonContainer.appendChild(
    createButton(translations[currentLanguage].no, () => showContactInfo(false))
  );
  chatbotContent.appendChild(buttonContainer);
}

function handleSatisfied() {
  chatbotContent.innerHTML = "";
  appendMessage(translations[currentLanguage].thankYou, "bot-message");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("satisfaction-buttons");
  buttonContainer.appendChild(
    createButton(translations[currentLanguage].knowMore, () =>
      currentCategory ? showQuestions(currentCategory) : showCategories()
    )
  );
  buttonContainer.appendChild(
    createButton(translations[currentLanguage].backToCategories, showCategories)
  );
  chatbotContent.appendChild(buttonContainer);
}

function showContactInfo(fromOther = false) {
  chatbotContent.innerHTML = "";
  chatbotContent.appendChild(createLanguageDropdown());

  if (!fromOther) {
    appendMessage(translations[currentLanguage].sorry, "bot-message");
  }

  appendMessage(translations[currentLanguage].contactInfo, "bot-message");

  if (fromOther) {
    appendMessage(translations[currentLanguage].anythingElse, "bot-message");
  }
  chatbotContent.appendChild(
    createButton(translations[currentLanguage].backToCategories, showCategories)
  );
}

function handleVoiceInput() {
  toggleVoiceRecognition();
}

// function to remove the "Listening..." message
function removeListeningMessage() {
  const messages = chatbotContent.getElementsByClassName("bot-message");
  const lastMessage = messages[messages.length - 1];
  if (
    lastMessage &&
    (lastMessage.textContent === "Listening..." ||
      lastMessage.textContent === "सुन रहा हूं...")
  ) {
    chatbotContent.removeChild(lastMessage);
  }
}

async function handleUserInput() {
  const message = userInput.value.trim();
  if (message) {
    if (!isConversationMode) {
      isConversationMode = true;
      chatbotContent.innerHTML = "";
      appendMessage("Hello! How can I assist you today?", "bot-message");
    }
    appendMessage(message, "user-message");
    userInput.value = "";

    const typingIndicator = showTypingIndicator();
    try {
      let response;
      // Check if the message is a custom one (you can expand this list as needed)
      if (
        message.toLowerCase().includes("hello") ||
        message.toLowerCase().includes("hi")
      ) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
        response = "Hello! How can I help you today?";
      } else {
        response = await fetchChatbotResponse(message);
      }
      removeTypingIndicator(typingIndicator);
      appendMessage(response, "bot-message");

      // Add query resolution message and satisfaction buttons
      askSatisfaction();
    } catch (error) {
      removeTypingIndicator(typingIndicator);
      appendMessage(
        "I'm sorry, I couldn't process your request at the moment. Please try again later.",
        "bot-message error-message"
      );
      console.error("Error processing message:", error);
    }
  }
}

async function fetchChatbotResponse(query) {
  const response = await fetch("http://127.0.0.1:8000/chatbot/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: query }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.response;
}

let recognition = null;
let isListening = false;

function initSpeechRecognition() {
  try {
    // Check for browser support
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      throw new Error("Speech recognition not supported in this browser");
    }

    // Initialize speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    // Configure recognition settings
    recognition.continuous = false;
    recognition.interimResults = false;

    // Handle recognition results
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      userInput.value = transcript;
      removeListeningMessage();
      handleUserInput();
    };

    // Handle recognition errors
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      isListening = false;
      updateVoiceButtonState();
      removeListeningMessage();

      const errorMessages = {
        "no-speech": "No speech was detected. Please try again.",
        "audio-capture":
          "No microphone was found. Please check your microphone settings.",
        "not-allowed":
          "Microphone access was denied. Please allow microphone access in your browser settings.",
        network: "Network error occurred. Please check your connection.",
        aborted: "Speech input was aborted.",
        default: "An error occurred with speech recognition. Please try again.",
      };

      appendMessage(
        errorMessages[event.error] || errorMessages.default,
        "bot-message error-message"
      );
    };

    // Handle recognition end
    recognition.onend = () => {
      isListening = false;
      updateVoiceButtonState();
      removeListeningMessage();
    };

    // Handle recognition start
    recognition.onstart = () => {
      isListening = true;
      updateVoiceButtonState();
      appendMessage(
        currentLanguage === "hi" ? "सुन रहा हूं..." : "Listening...",
        "bot-message"
      );
    };
  } catch (error) {
    console.error("Error initializing speech recognition:", error);
    voiceButton.style.display = "none"; // Hide voice button if not supported
    appendMessage(
      "Speech recognition is not supported in your browser. Please use text input instead.",
      "bot-message error-message"
    );
  }
}

function updateVoiceButtonState() {
  if (!voiceButton) return;

  voiceButton.classList.toggle("listening", isListening);

  // Update button appearance and aria-label
  if (isListening) {
    voiceButton.classList.add("active");
    voiceButton.setAttribute(
      "aria-label",
      currentLanguage === "hi" ? "आवाज़ इनपुट बंद करें" : "Stop voice input"
    );
  } else {
    voiceButton.classList.remove("active");
    voiceButton.setAttribute(
      "aria-label",
      currentLanguage === "hi" ? "आवाज़ इनपुत शुरू करें" : "Start voice input"
    );
  }
}

function toggleVoiceRecognition() {
  try {
    if (!recognition) {
      initSpeechRecognition();
    }

    if (!recognition) {
      return; // Exit if initialization failed
    }

    if (isListening) {
      recognition.stop();
    } else {
      // Check if the browser supports the selected language
      const language = currentLanguage === "hi" ? "hi-IN" : "en-US";
      recognition.lang = language;

      // Request microphone permission explicitly
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          recognition.start();
        })
        .catch((err) => {
          console.error("Microphone permission error:", err);
          appendMessage(
            "Please allow microphone access to use voice input.",
            "bot-message error-message"
          );
          isListening = false;
          updateVoiceButtonState();
        });
    }
  } catch (error) {
    console.error("Error in toggleVoiceRecognition:", error);
    appendMessage(
      "An error occurred with voice input. Please try again or use text input.",
      "bot-message error-message"
    );
    isListening = false;
    updateVoiceButtonState();
  }
}




chatbotTrigger.addEventListener("click", () => {
  try {
    chatbotOverlay.style.display = "block";
    setTimeout(() => chatbotOverlay.classList.add("show"), 10);
    isConversationMode ? handleUserInput() : showCategories();
  } catch (error) {
    logError("chatbotTrigger", error);
    chatbotOverlay.style.display = "block";
    chatbotOverlay.classList.add("show");
    appendMessage(
      `An error occurred while loading the chatbot. Error: ${error.message}`,
      "error-message"
    );
  }
});

closeBtn.addEventListener("click", () => {
  chatbotOverlay.classList.remove("show");
  setTimeout(() => (chatbotOverlay.style.display = "none"), 300);
});

sendButton.addEventListener("click", handleUserInput);
voiceButton.addEventListener("click", handleVoiceInput);

userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleUserInput();
  }
});

// Initialize voice button event listener
document.addEventListener('DOMContentLoaded', () => {
    if (voiceButton) {
        voiceButton.addEventListener('click', handleVoiceInput);
    }
});

window.onerror = function (message, source, lineno, colno, error) {
  console.error("Global error:", {
    message,
    source,
    lineno,
    colno,
    error,
  });
  appendMessage(
    "An unexpected error occurred. Please try again later.",
    "error-message"
  );
  return true;
};

updateLanguage(currentLanguage);
