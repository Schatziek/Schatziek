document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quiz");

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Clear previous error messages
      clearErrors();

      // Validate form fields
      const isValid = validateForm();

      if (isValid) {
          // Show success message
          document.getElementById("successMessage").innerText = "Thank you for submitting the quiz!";
          document.getElementById("successMessage").style.display = "block";
          answerCheck("radio", "question1", ["electraheart"], "q1Answer", "Electra Heart");
          answerCheck("radio", "question3", ["gossipgirl"], "q3Answer", "Gossip Girl");
          answerCheck("checkbox", "question2", ["ReadyourMind", "Thumbs", "Espresso"], "q2Answer", "Read your Mind, Thumbs and Espresso");
          answerCheck("checkbox", "question4", ["Dancingonmyown", "Hangwithme"], "q4Answer", "Dancing on my own and Hang with me.");
          answerCheck("text", "question5", ["Eternal Sunshine"], "q5Answer", "Eternal Sunshine");

          showFinalScore(5);
          isCorrect = 0;


          //isCheckoxAnswerCorrect();
      }
  });
function validateForm() {
      let isValid = true;

      // Validate First Name
      const firstName = document.getElementById("firstName").value.trim();
      if (!/^[a-zA-Z]+$/.test(firstName)) {
          showError("firstNameError", "First name is required and should contain only letters.");
          isValid = false;
      }

      // Validate Last Name
      const lastName = document.getElementById("lastName").value.trim();
      if (!/^[a-zA-Z]+$/.test(lastName)) {
          showError("lastNameError", "Last name is required and should contain only letters.");
          isValid = false;
      }

      // Validate Email
      const email = document.getElementById("email").value.trim();
      if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)) {
          showError("emailError", "Please enter a valid email address.");
          isValid = false;
      }

      // Validate required radio button question
      if (!document.querySelector('input[name="question1"]:checked')) {
          showError("q1Error", "Please select an option for question 1.");
          isValid = false;
      }

      // Validate at least one checkbox is selected for required question
      const checkedLanguages = document.querySelectorAll('input[name="question2"]:checked');
      if (checkedLanguages.length === 0) {
        showError("q2Error", "Please select at least one option for question 2.");
          isValid = false;
      }

      return isValid;
  }
function showError(elementId, message) {
      const errorElement = document.getElementById(elementId);
      errorElement.innerText = message;
      errorElement.style.display = "block";
  }

  function clearErrors() {
      const errorMessages = document.querySelectorAll(".error-message");
      errorMessages.forEach(function (errorMessage) {
          errorMessage.style.display = "none";
          errorMessage.innerText = "";
      });
      document.getElementById("successMessage").style.display = "none";
  }

    
 let isCorrect = 0;
  function answerCheck(questionType, questionName, correctAnswers, answerElementId, answerFacit) {
    //let isCorrect = false;
    //const q1CorrectAnswer = "electraheart"; // Correct answer value

    //const q1AnswerValue = q1SelectedOption.value.trim();
   

    if (questionType === "radio") {
      const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
      if (selectedOption) {
        const selectedValue = selectedOption.value.trim().toLowerCase();
        if (selectedValue === correctAnswers[0].toLowerCase()) {
          showAnswer(answerElementId, "Correct answer!");
          isCorrect++;
        } else {
          showAnswer(answerElementId, `Wrong, the correct answer is ${answerFacit}`);
        }
      } 
    } else if (questionType === "checkbox") {

        const checkedCheckboxes = Array.from(document.querySelectorAll(`input[name="${questionName}"]:checked`)).map(checkbox => checkbox.value.toLowerCase());

        if (checkedCheckboxes.length !== correctAnswers.length) {
          return showAnswer(answerElementId, `Wrong, the correct answers are ${answerFacit}`);
        }

        const allCorrect = checkedCheckboxes.every(answer => correctAnswers.map(a => a.toLowerCase()).includes(answer));

        if (allCorrect) {
          showAnswer(answerElementId, "Correct!");
          isCorrect++;
        } else {
          showAnswer(answerElementId, `Wrong, the correct answers are ${answerFacit}`)
        }

      } else if (questionType === "text") {
        const textInput = document.querySelector(`input[name="${questionName}"]`).value.trim().toLowerCase();
        if (textInput === correctAnswers[0].toLowerCase()) {
            showAnswer(answerElementId, "Correct answer!");
            isCorrect++;
        } else {
            showAnswer(answerElementId, `Wrong, the correct answer is ${answerFacit}`);
        }
    }

    /*if (isCorrect) {
      correctCount++;
    }*/

    /*
      if (q1AnswerValue === q1CorrectAnswer) {
        showAnswer("q1Answer", "Correct answer!");

      } else {
        showAnswer("q1Answer", "Wrong, correct answer is Electra Heart");
      }
        */

    //const q2CorrectAnswer = "electraheart"; // Correct answer value
    //const q2SelectedOption = document.querySelector('input[name="question1"]:checked'); // Find the checked radio button
    //const q2AnswerValue = q1SelectedOption.value.trim();  


  }

  /*
  function isCheckboxAnswerCorrect() {
    const q2CorrectAnswers = ['ReadyourMind', 'Thumbs', 'Espresso'];
    //const checkedCheckboxes = [];

    const checkedCheckboxes = Array.from(document.querySelectorAll('input[name="question2"]:checked'))
    .map(checkbox => checkbox.value.toLowerCase());
    */
    /*
    document.querySelectorAll('input[name="question2"]:checked').forEach(checkbox => {
      checkedCheckboxes.push(checkbox.value.toLowerCase());
    });
    */
/*
    if (checkedCheckboxes.length !== q2CorrectAnswers.length) {
      return showAnswer("q2Answer", "Wrong, the correct answers are Read your Mind, Thumbs and Espresso.")
    }

    const allCorrect = checkedCheckboxes.every(answer => q2CorrectAnswers.map(a => a.toLowerCase()).includes(answer));

    if (allCorrect) {
      showAnswer("q2Answer", "Correct!");
    } else {
      showAnswer("q2Answer", "Wrong, the correct answers are Read your Mind, Thumbs and Espresso.")
    }
*/
    /*
    for (let i = 0; i < checkedCheckboxes.length; i++) {
      if (checkedCheckboxes[i] !== q2CorrectAnswers[i].toLowerCase()) {
        showAnswer("q2Answer", "Wrong, the correct answers are Read your Mind, Thumbs and Espresso.")
      } 

    }      
    return showAnswer("q2Answer", "Correct!");
    */
 // }
  

  function showAnswer(elementId, message) {
    const answerElement = document.getElementById(elementId);
    answerElement.innerText = message;
    answerElement.style.display = "block";
  }

  function showFinalScore(totalQuestions) {
    const scoreElement = document.getElementById("finalScore");
    scoreElement.innerText = `You got ${isCorrect} out of ${totalQuestions} correct!`;
    scoreElement.style.display = "block";
  }
  /*
  function answerCheck() {
    const electraheart = document.getElementById(".electraheart");

    const question1 = document.getElementById("#question1").value.trim();
    if (question1 === electraheart) {
        showAnswer("q1Answer", "correct answer!");
    } else {
      showAnswer("q1Answer", "Wrong, correct answer is Electra Heart");  
    }
  }

  function showAnswer(elementId, message) {
    const answerElement = document.getElementById(elementId);
    answerElement.innerText = message;
    answerElement.style.display = "block";
  }*/
});
