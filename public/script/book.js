
    /* Javascript */
 
//Make sure that the dom is ready
$(document).ready(function(){
$(function () {
    
    
 var rating=[];
 
 var averageRating;
 var totalrating=0;
 
    
  $(function () {
     
  $("#writingStyle").rateYo({
      halfStar: true,
      starWidth: "25"
  }).on("rateyo.set", function (e, data) {
  
  rating.splice(0, 1,data.rating);

    
    $("#RwritingStyle").val(data.rating)
    $(this).parent().find('.result').text('rating :'+ data.rating);
  
  totalrating = rating.reduce(function(total, element) {
                return total + element;
              });
              averageRating= totalrating/rating.length;
                 $("#RtotalScore").val(averageRating)
                  $('#total').text('rating :'+ averageRating.toFixed(2));
                  

 
  });
  
  });
  
  $(function () {
  
    $("#grammarScore").rateYo({
      halfStar: true,
      starWidth: "25"
  }).on("rateyo.set", function (e, data) {
    rating.splice(1, 1,data.rating);
    $('#RgrammarScore').val(data.rating)
    $(this).parent().find('.result').text('rating :'+ data.rating);
    
     totalrating = rating.reduce(function(total, element) {
                return total + element;
              });
              averageRating= totalrating/rating.length;
              $("#RtotalScore").val(averageRating)
                  $('#total').text('rating :'+ averageRating.toFixed(2));
  });
  });
  
  $(function () {
    $("#storyDevelopment").rateYo({
      halfStar: true,
      starWidth: "25"
  }).on("rateyo.set", function (e, data) {
    rating.splice(2, 1,data.rating);
    $('#RstoryDevelopment').val(data.rating)
    $(this).parent().find('.result').text('rating :'+ data.rating);
    
     totalrating = rating.reduce(function(total, element) {
                return total + element;
              });
              averageRating= totalrating/rating.length;
              $("#RtotalScore").val(averageRating)
                  $('#total').text('rating :'+ averageRating.toFixed(2));
  });
  });
    $(function () {
    $("#characterDesign").rateYo({
      halfStar: true,
      starWidth: "25"
  }).on("rateyo.set", function (e, data) {
    rating.splice(3, 1,data.rating);
    $('#RcharacterDesign').val(data.rating)
    $(this).parent().find('.result').text('rating :'+ data.rating);
    
     totalrating = rating.reduce(function(total, element) {
                return total + element;
              });
              averageRating= totalrating/rating.length;
              $("#RtotalScore").val(averageRating)
                  $('#total').text('rating :'+ averageRating.toFixed(2));
  });
  });
    $(function () {
    $("#worldBackground").rateYo({
      halfStar: true,
      starWidth: "25"
  }).on("rateyo.set", function (e, data) {
    rating.splice(4, 1,data.rating);
    $('#RworldBackground').val(data.rating)
    $(this).parent().find('.result').text('rating :'+ data.rating);
    
     totalrating = rating.reduce(function(total, element) {
                return total + element;
              });
              averageRating= totalrating/rating.length;
             $("#RtotalScore").val(averageRating)
                  $('#total').text('rating :'+ averageRating.toFixed(2));
  });
  });
  
  $(function () {
    $(".userRating").rateYo({
      halfStar: true,
      starWidth: "15",
      readOnly: true
  })
  })
  
  $(function () {
    $("#usersTotalRating").rateYo({
      halfStar: true,
      starWidth: "25",
      readOnly: true
  })
  })
  
});
 










$(function() {
    $('form > input').keyup(function() {

        var empty = false;
        $('form > input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
             $('.btn').css({background:'red'})
            $('#register').attr('disabled', 'disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
        } else {
             $('.btn').css({background:'red'})
            $('#register').removeAttr('disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
        }
    });
})





$('.summernote').summernote({
  placeholder: 'Write Your Reveiew here...',
  height: 300,                 // set editor height
  minHeight: null,             // set minimum height of editor
  maxHeight: null,             // set maximum height of editor
  focus: true                  // set focus to editable area after initializing summernote
});
    
    $(document).ready(function(){

        var size=$('body').width();
        if(size<900){
            $('.horizontalLine').hide();
        }
        



$('#Synopsis').hover(function(){
    $('this').addClass("hvr-underline-reveal");
       
});

$('#Index').hover(function(){
             $(this).toggleClass("hvr-underline-reveal");
              $('#Synopsis').toggleClass("hvr-underline-reveal");
       
});



$('#Synopsis').click(function(){
    
            $('.synopsis').show();
       $('.index').hide();
        $('#Synopsis').toggleClass("hvr-underline-reveal");
        $('#Index').toggleClass("hvr-underline-reveal");
});


        $('#Index').click(function(){
            $('.synopsis').hide();
       $('.index').show();
        
        $('#Synopsis').toggleClass("hvr-underline-reveal");
        $('#Index').toggleClass("hvr-underline-reveal");
});
       });
   
    
    
});