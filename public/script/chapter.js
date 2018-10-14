
     
      $('.summernote').summernote({
        placeholder: 'Comment',
        toolbar:[['style', ['bold', 'italic', 'underline', 'clear']]],
        tabsize: 2,
         height: 100,
        width:500
      });
     $('.summernote1').summernote({
       
        toolbar:[['style', ['bold', 'italic', 'underline', 'clear']]],
        tabsize: 2,
        height: 100,
        width:500
      });
     
     
     $('.deletecommentForm').one('submit', function(e) {
    e.preventDefault();
      swal({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  type: 'warning',
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, cancel!',
  confirmButtonColor: '#FF1919',
  cancelButtonColor: '##8CD4F5',
  showCancelButton: true,
  
}).then((result) => {
   
  if (result.value) {
      $(this).submit();
    swal(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  } else if (
    result.dismiss === "cancel" ||result.dismiss === "overlay"
  ) {
       location.reload(true);
      
      $(this).find('button').blur();
    swal(
      'Cancelled',
      'Your comment  is safe :)',
      'error'
    )
     
  }
})
    
});
       
  $('#commentshow').on('click','.commentEdit', function(){
      $(this).parent().siblings('.edit-item-form').toggle();
      $(this).parent().siblings('.replycommentForm').hide();
  })
  
  $('#commentshow').on('click','.commentReply', function(){
      $(this).parent().siblings('.replycommentForm').toggle();
      $(this).parent().siblings('.edit-item-form').hide();
  })

$(".newcommentButton").click(function(){
    $("#new_comment").toggle();
    $(".newcommentButton").blur();
});
   


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav1() {
    document.getElementById("mySidenav1").style.width = "250px";
    //document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav1() {
    document.getElementById("mySidenav1").style.width = "0";
    //document.getElementById("main").style.marginLeft = "0";
}


$(document).ready(function(){
     
     var mode1,localData,local;
     local=localStorage.getItem('mode');
     if(!local){
         local=localStorage.getItem('mode');
          mode1=$('#night').text().toString()
          $('#ChapterMode').css("background-color", "#fff");
        $('#ChapterMode').css("color", "#000");
         $('body').css("background-color", "#f2f2f2");
        $('body').css("color", "#000");
        $("#authorThought").css("background-color", "#e9ecef");
      localStorage.setItem("mode", "Night Mode");
     }
     

     
      localData=localStorage.getItem('mode');
      if(localData)
      {
          if(localData=="Day Mode")
        {
             $('#night').text("Day Mode")
            $('#ChapterMode').css("background-color", "#1f2129");
        $('#ChapterMode').css("color", "#83848f");
            
        $('body').css("background-color", "#13151b");
        $('body').css("color", "#83848f");
        $('#authorThought').css("background-color", "#3e3f44");
       
        }
       else if(localData=="Night Mode")
        {
            $('#night').text("Night Mode")
         $('#ChapterMode').css("background-color", "#fff");
        $('#ChapterMode').css("color", "#000");
         $('body').css("background-color", "#f2f2f2");
        $('body').css("color", "#000");
        $('#authorThought').css("background-color", "#e9ecef");
        
        }
          
      }
      
      
    
    
  $('#night').click(function(){
      
   
      
    if(localData=="Night Mode")
        {
            
            localStorage.setItem("mode", "Day Mode");
            localData=localStorage.getItem('mode');
        $('#ChapterMode').css("background-color", "#1f2129");
        $('#ChapterMode').css("color", "#83848f");
        $('body').css("background-color", "#13151b");
        $('body').css("color", "#83848f");
        $('#authorThought').css("background-color", "#3e3f44");
       
        $('#night').text(localData)
        
        }
       else if(localData=="Day Mode")
        {
           localStorage.setItem("mode", "Night Mode");
          localData=localStorage.getItem('mode');
         $('#ChapterMode').css("background-color", "#fff");
        $('#ChapterMode').css("color", "#000");
         $('body').css("background-color", "#f2f2f2");
        $('body').css("color", "#000");
        $('#authorThought').css("background-color", "#e9ecef");
        $('#night').text(localData)
        }
        
    })
        
  });
;



        setTimeout(function(){
            $('#Error').fadeOut('fast');
            $('#Success').fadeOut('fast');
        },5000)
 
        
        $(document).ready(function(){
        
        
        var local,font;
        local=localStorage.getItem("size");
       
        if(!local)
        {
             font=$('.chapterPage p').css('font-size');
            localStorage.setItem("size", font);
            $('.chapterPage p').attr('style', 'font-size: font !important');
        }
         local=localStorage.getItem("size")
         if(local)
        {
             font=localStorage.getItem("size");
             if(font=="14px")
            $('.chapterPage p').attr('style', 'font-size: 14px !important');
            if(font=="16px")
            $('.chapterPage p').attr('style', 'font-size: 16px !important');
            if(font=="18px")
            $('.chapterPage p').attr('style', 'font-size: 18px !important');
            if(font=="20px")
            $('.chapterPage p').attr('style', 'font-size: 20px !important');
            if(font=="24px")
            $('.chapterPage p').attr('style', 'font-size: 24px !important');
            if(font=="28px")
            $('.chapterPage p').attr('style', 'font-size: 28px !important');
            if(font=="32px")
            $('.chapterPage p').attr('style', 'font-size: 32px !important');
            if(font=="36px")
            $('.chapterPage p').attr('style', 'font-size: 36px !important');
        }
        
        
        $("#fontIncrease").click(function(){
            if(font=="14px")
            {
            $('.chapterPage p').attr('style', 'font-size: 16px !important');
            font=$('.chapterPage p').css('font-size');
           
            }
           else if(font=="16px")
            {
            $('.chapterPage p').attr('style', 'font-size: 18px !important');
            font=$('.chapterPage p').css('font-size');
            
            }
            else if(font=="18px")
            {
            $('.chapterPage p').attr('style', 'font-size: 20px !important');
            font=$('.chapterPage p').css('font-size');
          
            }
           else if(font=="20px")
            {
            $('.chapterPage p').attr('style', 'font-size: 24px !important');
            font=$('.chapterPage p').css('font-size');
         
            }
           else if(font=="24px")
            {
            $('.chapterPage p').attr('style', 'font-size: 28px !important');
            font=$('.chapterPage p').css('font-size');
            
            }
           else if(font=="28px")
            {
            $('.chapterPage p').attr('style', 'font-size: 32px !important');
            font=$('.chapterPage p').css('font-size');
            
            }
           else if(font=="32px")
            {
            $('.chapterPage p').attr('style', 'font-size: 36px !important');
            font=$('.chapterPage p').css('font-size');
            
            }
            localStorage.setItem("size", font);
        })
            
            
            $("#fontDecrease").click(function(){
            if(font=="14px")
            {
            $('.chapterPage p').attr('style', 'font-size: 14px !important');
            font=$('.chapterPage p').css('font-size');
           
            }
           else if(font=="16px")
            {
            $('.chapterPage p').attr('style', 'font-size: 14px !important');
            font=$('.chapterPage p').css('font-size');
            
            }
            else if(font=="18px")
            {
            $('.chapterPage p').attr('style', 'font-size: 16px !important');
            font=$('.chapterPage p').css('font-size');
          
            }
           else if(font=="20px")
            {
            $('.chapterPage p').attr('style', 'font-size: 18px !important');
            font=$('.chapterPage p').css('font-size');
         
            }
           else if(font=="24px")
            {
            $('.chapterPage p').attr('style', 'font-size: 20px !important');
            font=$('.chapterPage p').css('font-size');
            
            }
           else if(font=="28px")
            {
            $('.chapterPage p').attr('style', 'font-size: 24px !important');
            font=$('.chapterPage p').css('font-size');
            
            }
           else if(font=="32px")
            {
            $('.chapterPage p').attr('style', 'font-size: 28px !important');
            font=$('.chapterPage p').css('font-size');
            
            }
            else if(font=="36px")
            {
            $('.chapterPage p').attr('style', 'font-size: 32px !important');
            font=$('.chapterPage p').css('font-size');
            
            }
            localStorage.setItem("size", font);
        })
        
        
        $("#fontOriginal").click(function(){
            $('.chapterPage p').attr('style', 'font-size: 18px !important');
            font=$('.chapterPage p').css('font-size');
           localStorage.setItem("size", font);
            
        })
        
        })
        
   