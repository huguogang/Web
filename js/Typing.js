// TODO:
//  3. add catalog of drills (e.g. English Week 1 vocabulary)
//  4. add default drill concept
/// 5. visualize result: percent correct vs percent wrong
// Tree view (select parent will cascade all children)
//    * Latin
//    * Chinese
//    * Spanish
//       * 1st grade
//          * week 1
// All selected tests will be blended
// Show number of test words as badge for each test catalog
$(document).ready(function () {
  var TEST_BLEND = [// "Latin/Unit1/Stage1",
    "Latin/Unit1/Stage2",
    // "Latin/Unit1/Stage3",
    // "Latin/Unit1/Stage4",
    // "Latin/Unit1/Stage5",
    "Latin/Unit1/Stage6",
    "Latin/Conjugation"];
  var MAX_TEST_SIZE = 50;

  var console = console || window.console || { log: function () { } };
  
  // Wrong guess over the threshold is considered wrong, and we will
  // move on to the next test word.
  var MISS_THRESHOLD = 3;

  var currentTestSet;
  // Index of the current test in currentTestSet
  var currentTestSetIndex = 0;
  // struct: "test", "answer"
  var currentTest;

  var currentAnswer;
  
  // Total misses for the current test, up to MISS_THRESHOLD
  // retries are allowed until the test is declared a mistake
  var currentMiss = 0;

  var totalCorrect = 0;
  var totalWrong = 0;
  var totalGuesses = 0;

  var state = "";

  var setCurrentAnswer = function (word) {
    currentAnswer = word;
    $("#currentAnswer").text(currentAnswer);
  };

  var setCurrentTest = function (test) {
    currentTest = test;
    $("#currentTest").text(test.test);
  };

  var ready = function () {
    $("#alert").hide();

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
    $("#currentTest").addClass("label-info");

    makeTestBlend();

    currentTestSetIndex = 0;

    nextTest();
  };

  var makeTestBlend = function () {
    var tests = [];
    _.each(TEST_BLEND, function (testName) {
      tests = tests.concat(TypingData[testName]);
    });

    currentTestSet = _.chain(TEST_BLEND)
      .map(function (testName) {
        return TypingData[testName];
      })
      .flatten()
      .shuffle()
      .first(MAX_TEST_SIZE)
      .value();

    console.log(currentTestSet);
  };

  var nextTest = function () {
    setCurrentAnswer("");
    currentMiss = 0;

    if (currentTestSetIndex >= currentTestSet.length) {
      finish();
    }
    else {
      setCurrentTest(currentTestSet[currentTestSetIndex]);
      currentTestSetIndex++;
    }
  };

  var hint = function (answer) {
    $("#currentAnswer").text(answer).addClass("label-danger");
    state = "hint";
  };

  var exitHint = function () {
    $("#currentAnswer").text("").removeClass("label-danger");
    state = "";
    nextTest();
  };

  var processAnswer = function () {
    if (currentAnswer) {
      totalGuesses++;

      if (_.contains(currentTest.answers, currentAnswer)) {
        // Got it right
        totalCorrect++;

        updateProgress();
        nextTest();
      }
      else {
        if (currentMiss >= MISS_THRESHOLD - 1) {
          // Too many wrong guesses
          totalWrong++;

          updateProgress();
          // nextTest();
          hint(currentTest.answers[0]);
        }
        else {
          currentMiss++;
          setCurrentAnswer("");
        }
      }
    }
    else {
      // get a free pass, if there is no answer yet
      $("#currentAnswer").text("Start typing your answer followed by ENTER");
    }
  };

  var updateProgress = function () {
    var total = currentTestSet.length;
    var percentCorrect = Math.ceil((totalCorrect / total) * 100);
    var percentWrong = Math.ceil((totalWrong / total) * 100);
    
    // Math.ceil may cause them adds up more than 100%, the rendering will
    // have some problem
    if (percentCorrect + percentWrong > 100) {
      percentWrong = 100 - percentCorrect;
    }

    $("#correctBar").width("" + percentCorrect + "%");
    $("#wrongBar").width("" + percentWrong + "%");
  };
  
  // Main entry point
  var start = function () {
    setCurrentAnswer("");
    ready();
  };

  var finish = function () {
    state = "finished";

    var percentCorrect = Math.ceil((totalCorrect / currentTestSet.length) * 100);
    if (percentCorrect > 70) {
      $("#resultMessage").text("Good job. You got " + percentCorrect + "% correct!");
      $("#alert").addClass("alert-success").show();
    }
    else {
      $("#resultMessage").text("You got " + percentCorrect + "% correct!");
      $("#alert").addClass("alert-danger").show();
    }
  };

  $(document).keydown(function (event) {
    console.log(event.which);
    if (event.which === 8) { //backspace
      if (currentAnswer.length > 0) {
        setCurrentAnswer(currentAnswer.substring(0, currentAnswer.length - 1));
      }
      // backspace should not navigate away!
      event.preventDefault();
    }
  });

  $(document).keypress(function (event) {
    var asciiMatcher = /[a-zA-Z]/;
    var char = String.fromCharCode(event.which);

    if (state == "finished") {
      return;
    }
    else if (state == "hint") {
      exitHint();
      return;
    }

    if (char == "\r") {
      processAnswer();
    }
    else if (asciiMatcher.test(char) || char == " ") {
      setCurrentAnswer(currentAnswer + char);
    }
    else {
      return;
    }
  });

  start();
});
