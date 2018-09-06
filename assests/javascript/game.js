//function to chose character
$(document).ready(function() {
    
    $(".card").on("click", function(){
        
        
        $( ".card" ).clone().appendTo( ".container_1" );
        $(this).parent();
        $(this).parent().remove();
        $(this).animate({
            "float":"left"
        }, "fast"); 
       
        

        

        
    })




});


//character stays in row1
//all other chaarcters go to row2 and backround color changes to red
//" your character" moves from below to above