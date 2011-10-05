(function($) {

	$(document).ready(function(){
	  
		//objects available on document.ready
		var $heartCta  = $('#heart_cta'),
            $formDiv = $('#heart_form');
                    
		//form objects appended to $formDiv
		var $textArea = $('<textarea></textarea>'),
            $counter = $('<span></span>'),
            $submitBtn = $('<input type="submit" />'),
            $text = $('<p>What do you heart?</p>'); 	//will this text change?

        /*
			  
		Basic functions of our (future) plug-in...
			  
		When a user clicks the "What do you heart?" element -
		append and display our "heartForm" div
			  
		 */
	  
		//click "heartCta",
		//append the form,
		//replace anchor w/ static text
		//set counter to 140
		//set focus to textarea
		$heartCta.click(function(){
		  
			$heartCta.replaceWith($text);    
			
            $formDiv.append($textArea, $counter, $submitBtn).fadeIn();
			
            $counter.html('140');
                        
            $textArea.focus();
		  
			return false;
	       
		});
		
		//'enabled' $submitBtn on first keyup, 'disabled' otherwise, add and remove css classes (visual state)
		//subtract from $counter w/ each character keyup
		$textArea.keyup(function(){
                   
			// var count =  140 - $textArea.val().length;

			// $counter.html( count );
                  
			console.log('Handler for .keyup() called.');
		 
			//setInterval( function() {
			//	console.log( 140 - parseInt($(this).val().length) );
			//}, 1000 );
		 
		});
	  
		//$submitBtn.click(function(){
		  //ajax time
		//});
  
	});
	
})(jQuery);