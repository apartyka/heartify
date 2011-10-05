(function($) {

	$(document).ready(function(){
	  
            var $anchor  = $('.heart_cta'),
                $text = $('<p>What do you heart?</p>'),
                $parentDiv = $($anchor.parent()), //dunno if we want to use this...
                $formDiv = $('<div></div>', { 'css' : { 'display' : 'none' } });
                     
            //form objects
            var $textArea = $('<textarea></textarea>'),
                $counter = $('<span></span>'),
                $submitBtn = $('<input type="submit" />');

            /*
            
            Initial click function of our (future) plug-in...
              - click $anchor,
              - replace anchor w/ $text
              - insert $formDiv after $text,
              - append form objects to $formDiv
              - set counter to 140
              - set $submitBtn to disabled, addClass of 'disabled'
              - set focus to textarea

            */
          
            $anchor.click(function(){
                  
                $anchor.replaceWith($text);   

                $formDiv.insertAfter($text).append($textArea, $counter, $submitBtn).fadeIn();
 
                $counter.html('140');
                        
                $textArea.focus();
              
                $submitBtn.attr('disabled', 'disabled'); //addClass disabled
		  
                return false;
	       
             });

 
             /*
             
             Keyup function of our (future) plug-in...
               - remove 'disabled' attribute on $submitBtn after first keyup
               - add and remove css classes (visual state)
               - subtract from $counter w/ each character keyup
              
             */
          
             $textArea.keyup(function(){
                   
                 var count =  140 - $textArea.val().length;
                 
                 if (count === 140 || count < 0) {
                   $submitBtn.attr('disabled', 'disabled');
                 }
                 else {
                   $submitBtn.removeAttr('disabled'); //addClass here too
                 }
                 
                 $counter.html( count );
                 
                 console.log( count );
		 
              });
	  
              
              //$submitBtn.click(function(){
		  //ajax time
              //});

	});
	
})(jQuery);