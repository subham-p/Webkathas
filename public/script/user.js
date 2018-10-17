$(document).ready(function(){
        
         $(function () {
    $("#writingStyle").rateYo({
      halfStar: true,
      starWidth: "15",
      readOnly: true
  })
      $("#grammarScore").rateYo({
      halfStar: true,
      starWidth: "15",
      readOnly: true
  })
      $("#storyDevelopment").rateYo({
      halfStar: true,
      starWidth: "15",
      readOnly: true
  })
      $("#characterDesign").rateYo({
      halfStar: true,
      starWidth: "15",
      readOnly: true
  })
      $("#worldBackground").rateYo({
      halfStar: true,
      starWidth: "15",
      readOnly: true
  })
  })
   
   
    $(document).ready(function(){     
        
        $('#library').hover(function(){
    $('#library .list-group-item').toggleClass("hvr-underline-reveal");
       
});

$('#comment').hover(function(){
             $('#comment .list-group-item').toggleClass("hvr-underline-reveal");
});
$('#reviews').hover(function(){
             $('#reviews .list-group-item').toggleClass("hvr-underline-reveal ");
});
$('#profSettings').hover(function(){
             $('#profSettings .list-group-item').toggleClass("hvr-underline-reveal ");
});
        
        
        
        
        
        
        
        
        $('#library .list-group-item').css({"background":"wheat","color":"black"});
         $('#library').click(function(){
            $('.comment').hide();
             $('.reviews').hide();
       $('.library').show();
        $('.profSettings').hide();
         $('#library .list-group-item').css({"background":"wheat","color":"black"});
       $('#comment .list-group-item').css({"background":"black","color":"wheat"});
       $('#profSettings .list-group-item').css({"background":"black","color":"wheat"});
       $('#reviews .list-group-item').css({"background":"black","color":"wheat"});
});

$('#comment').click(function(){
          $('.comment').show();
             $('.reviews').hide();
       $('.library').hide();
        $('.profSettings').hide();
         $('#library .list-group-item').css({"background":"black","color":"wheat"});
       $('#comment .list-group-item').css({"background":"wheat","color":"black"});
       $('#profSettings .list-group-item').css({"background":"black","color":"wheat"});
       $('#reviews .list-group-item').css({"background":"black","color":"wheat"});

});

$('#reviews').click(function(){
          $('.reviews').show();
             $('.comment').hide();
       $('.library').hide();
        $('.profSettings').hide();
        $('#library .list-group-item').css({"background":"black","color":"wheat"});
       $('#comment .list-group-item').css({"background":"black","color":"wheat"});
       $('#profSettings .list-group-item').css({"background":"black","color":"wheat"});
       $('#reviews .list-group-item').css({"background":"wheat","color":"black"});
});  

$('#profSettings').click(function(){
          $('.profSettings').show();
           $('.reviews').hide();
             $('.comment').hide();
       $('.library').hide();
         $('#library .list-group-item').css({"background":"black","color":"wheat"});
       $('#comment .list-group-item').css({"background":"black","color":"wheat"});
       $('#profSettings .list-group-item').css({"background":"wheat","color":"black"});
       $('#reviews .list-group-item').css({"background":"black","color":"wheat"});
  
    }); 
    }); 
});