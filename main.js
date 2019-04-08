
var panel = $("#quiz-area");
var countStartNumber = 30;

// here is our questions
var questions = [{
  question: "How many suns is Luke watching set in this shot?",
  answers: ["1", "2", "3", "4"],
  correctAnswer: "2",
  image: "https://i.pinimg.com/originals/7d/3f/04/7d3f04500329ab17c061d7b0e4ca9f60.gif"


}, {
  question: "What species is Jabba?",
  answers: ["Ithorian", "Hutt", "Jawa", "Jenet"],
  correctAnswer: "Hutt",
  image: "https://www.speakgif.com/wp-content/uploads/2015/11/star-wars-death-star-animated-gif.gif"
}, {
  question: "What is the name of this base?",
  answers: ["Solo Base", "Skywalker Base", "Space Base", "Starkiller Base"],
  correctAnswer: "Starkiller Base",
  image: "https://media1.tenor.com/images/1374275cbd1274e54cf956bb65de3115/tenor.gif?itemid=10597313"
}, {
  question: "Which order brought about the death of the Jedi?",
  answers: ["Order 66", "Order 55", "Order 77", "Order 88"],
  correctAnswer: "Order 66",
  image: "https://media.giphy.com/media/3o7abB06u9bNzA8lu8/giphy.gif"
}
  , {
  question: "Who played Princess Leia?",
  answers: ["Gillian Anderson", "Carrie Fisher", "Linda Hamilton", "Sigourney Weaver"],
  correctAnswer: "Carrie Fisher",
  image: "https://media.giphy.com/media/VR8Sgeow2n0Q0/giphy.gif"
}
  , {
  question: "Who are the only two characters who appear in every Star Wars movie?",
  answers: ["C-3PO and R2-D2", "Luke and Leia", "Han and Chewbacca", "Darth vader and Palpatine"],
  correctAnswer: "C-3PO and R2-D2",
  image:"https://i.pinimg.com/originals/3b/8c/19/3b8c19c2455c8949f018467a08d55a1c.gif"
}
  , {
  question: "On which planet do we first meet Rey in The Force Awakens?",
  answers: ["Jakku", "Farlax", "Tatoonie", "Dantoonie"],
  correctAnswer: "Jakku",
  image: "https://i.imgur.com/jA2Jmvl.gif"
}
  , {
  question: "Which furry species lives on the forest moon of Endor?",
  answers: ["Ewoks", "Jawas", "Wookiees", "Hutts"],
  correctAnswer: "Ewoks",
  image: "https://media.giphy.com/media/DtrguqHYeHJv2/giphy.gif"
}];

var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    panel.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});