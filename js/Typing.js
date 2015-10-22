$(document).ready(function () {
  // Wrong guess over the threshold is considered wrong, and we will
  // move on to the next test word.
  var MISS_THRESHOLD = 3;

  var currentAnswer;
  // struct: "latin", "answer"
  var currentTest;
  var currentDictionalIndex = 0;
  // Total miss o
  var currentMiss = 0;

  var totalCorrect = 0;
  var totalWrong = 0;
  var totalGuesses = 0;

  var testData = TypingData.Latin2Eng;

  var setCurrentAnswer = function (word) {
    currentAnswer = word;
    $("#currentAnswer").text(currentAnswer);
  };

  var setCurrentTest = function (test) {
    currentTest = test;
    $("#currentTest").text(test.test);
  };

  var ready = function () {
    $("#currentTest").addClass("label-danger");
    setCurrentTest({ "test": "Ready ..." });
    setTimeout(set, 1000);
  };

  var set = function () {
    $("#currentTest").removeClass("label-danger");
    $("#currentTest").addClass("label-warning");
    setCurrentTest({ "test": "Set ..." });
    setTimeout(go, 1000);
  };

  var go = function () {
    $("#currentTest").removeClass("label-warning");
    $("#currentTest").addClass("label-success");
    setCurrentTest({ "test": "Go ..." });
    setTimeout(startTest, 1000);
  };

  var startTest = function () {
    $("#currentTest").removeClass("label-success");
    $("#currentTest").addClass("label-primary");

    nextTest();
  };

  var nextTest = function () {
    setCurrentAnswer("");
    currentMiss = 0;
    
    // TODO: random pick test
    currentDictionalIndex++;
    currentDictionalIndex = currentDictionalIndex % testData.length;

    setCurrentTest(testData[currentDictionalIndex]);
  };

  var processAnswer = function () {
    if (currentAnswer) {
      totalGuesses++;

      if (_.contains(currentTest.answers, currentAnswer)) {
        // Got it right
        totalCorrect++;

        nextTest();
      }
      else {
        if (currentMiss >= MISS_THRESHOLD - 1) {
          // Too many wrong guesses
          totalWrong++;
          nextTest();
        }
        else {
          currentMiss++;
          setCurrentAnswer("");
        }
      }
    }
    else {
      // get a free pass, if there is no answer yet
      $("#currentAnswer").text("Start typing your answer");
    }

    $("#correctBadge").text(totalCorrect);
    $("#wrongBadge").text(totalWrong);
    $("#totalBadge").text(totalGuesses);
  };
  
  // Main entry point
  var start = function () {
    setCurrentAnswer("");
    ready();
  };

  $(document).keydown(function (event) {
    console.log(event.which);
    if (event.which === 8) {
      if (currentAnswer.length > 0) {
        setCurrentAnswer(currentAnswer.substring(0, currentAnswer.length - 1));
      }
      // backspace should not navigate away!
      event.preventDefault();
    }
  });

  $(document).keypress(function (event) {
    var spaceMatcher = /\s/;
    var asciiMatcher = /[a-zA-Z]/;
    var char = String.fromCharCode(event.which);
    if (spaceMatcher.test(char)) {
      processAnswer();
    }
    else if (asciiMatcher.test(char)) {
      setCurrentAnswer(currentAnswer + char);
    }
    else {
      return;
    }
  });

  start();
});