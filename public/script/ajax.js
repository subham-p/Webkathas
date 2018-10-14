// window.onload = function() {
// //   $('#new_comment').submit(function(e){
// //     e.preventDefault();
// //     var newcomment=$(this).serialize();
// //     var formAction= $(this).attr('action');
// //     var editAction= $('.edit-item-form').attr('action');
// //     var deleteAction= $('.deletecommentForm').attr('action');
   
   
  
// //     $.post(formAction,newcomment,function(data){
// //         var dat= data;
        
// //         $('#commentshow').append(
// //             `
// //             <div class="commentSection" >
// //           <strong> ${data.author.username}</strong>
// //           <p> ${data.text}</p>

           
// //          <div class="pull-right">
// //                  <button  class="btn btn-warning commentEdit" >
// //               Edit
// //               </button>
// //         <form class="deletecommentForm" name="myForm" action=${deleteAction} method="POST">
// //             <button class="btn btn-danger"  onclick="deleteForm()">Delete</button>
// //         </form>
// //             </div> 
// //              <form  action =${editAction} method="POST" class="edit-item-form">
     
// //          <div class="form-group">
// //             <label>Text</label>
// //             <textarea class="form-control" id="summernote1" type="text" name="comment[text]" value="${data.text}">${data.text}</textarea>
// //         </div>
// //             <button class="btn btn-lg btn-primary btn-block ">Edit</button>
// //     </form>
            
// //         </div>
// //             </div>
// //             `
// //             )
// //             $('#new_comment').find('.form-control').val('')
// //     });
// //   });
   
//   $('#commentshow').on('click','.commentEdit', function(){
//       $(this).parent().siblings('.edit-item-form').toggle();
//   })
   

// // $('#commentshow').on('submit','.edit-item-form', function(e){
// //     e.preventDefault();
  
// //      var newcomment=$(this).serialize();
// //       var commentEdit=$('#commentEdit').attr('name');
// //      var formAction= $(this).attr('action');
// //       var deleteAction= $('.deletecommentForm').attr('action');
      
// //      $originalItem=$(this).parent('.commentSection');
// //      $.ajax({
// //          url:formAction,
// //          data:newcomment,
// //          type:'PUT',
// //          originalItem:$originalItem,
// //          success: function(data){
// //              this.originalItem.html(`
// //              <strong>${ data.author.username}</strong>
// //           <p>${ data.text}</p>
// //             <div class="pull-right">
// //                  <button  class="btn btn-warning commentEdit" >
// //               Edit
// //               </button>
// //         <form class="deletecommentForm" name="myForm" action=${deleteAction} method="POST">
// //             <button class="btn btn-danger"  >Delete</button>
// //         </form>
// //             </div> 
// //              <form  action =${formAction} method="POST" class="edit-item-form">
     
// //          <div class="form-group">
// //             <label>Text</label>
// //             <textarea class="form-control summernote1" type="text" name="comment[text]" value="${data.text}">${data.text}/textarea>
// //         </div>
// //             <button class="btn btn-lg btn-primary btn-block ">Edit</button>
// //     </form>
            
// //         </div>
        
// //              `)
// //          }
// //      });
// // });





  
// }
