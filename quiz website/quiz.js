(function() 
 {
  var allQuestions = [{
    question: "For breakfast, I had ___ egg on a slice of toast.",
    options: ["a", "an", "the"],
    answer: 1
  }, {
    question: "You could say my brother has ___ healthy appetite.",
    options: ["a", "an", "the"],
    answer: 0
  }, {
    question: "My aunt lives in ___ United States of America.",
    options: ["a", "an", "the"],
    answer: 2
  },{
    question: "She was holding ___ umbrella even though it wasn't raining.",
    options: ["a", "an", "the"],
    answer: 1
  }, {
    question: "The course had proved to be ___ useless waste of time.",
    options: ["a", "an", "the"],
    answer: 0
  },{
    question: "I've been waiting for ___ hour.",
    options: ["a", "an", "the"],
    answer: 1
  },{
    question: "Do you have ___ user licence?",
    options: ["a", "an", "the"],
    answer: 0
  },{
    question: "Have you fed ___ cat yet?",
    options: ["a", "an", "the"],
    answer: 2
  },{
    question: "Salma had ___ MA in mathematics.",
    options: ["a", "an", "the"],
    answer: 1
  },{
    question: "Did you hear that Rick has joined ___ navy?",
    options: ["a", "an", "the"],
    answer: 2
    }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        return score;
  }
})();