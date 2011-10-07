(function($) {

	$(document).ready(function(){
	  
            var $anchor  = $('.cta'),
                $text = $('<p>What do you heart?</p>'),
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
              - append form objects to $formDiv, fadeIn
              - set counter to 140 (int)
              - set focus to textarea
              - set $submitBtn attr to disabled, addClass disabled

            */
          
            $anchor.click(function(){
                  
                $anchor.replaceWith($text); 
                
                $formDiv.insertAfter($text).append($textArea, $counter, $submitBtn).fadeIn();
 
                $counter.html(140);
                
                $textArea.focus();
              
                $submitBtn.attr('disabled', 'disabled').addClass('disabled');
		  
                return false;
	       
             });

 
             /*
             
             Keyup function of our (future) plug-in...
               - If count is equal to 140 or less than 0 - remove enabled attr, add disabled attr, remove enabled class, add disabled class
               	 Else, remove disabled attr, add enabled attr, remove disabled class, add enabled class
               - If count is less than 0, add disabled class to $counter
                 Else remove disabled class
               - subtract from $counter w/ each character keyup
              
             */
          
             $textArea.keyup(function(){
                   
                 var count =  140 - $textArea.val().length;
                 
                 if (count === 140 || count < 0) {
                   $submitBtn.removeAttr('enabled').attr('disabled', 'disabled').removeClass('enabled').addClass('disabled');
                 }
                 else {
                   $submitBtn.removeAttr('disabled').attr('enabled', 'enabled').removeClass('disabled').addClass('enabled');
                 }
                 
                 if (count < 0) {
                	 $counter.addClass('disabled');
                 }
                 else {
                	 $counter.removeClass('disabled');
                 }
                 
                 $counter.html(count);
                 
              });

             
             /*
             
             Submit click function of our (future) plug-in...
               - ajax stuff
               - remove form elements, restore $anchor to its original visual state
              
             */
              
              /*$submitBtn.click(function(){
             	
            	 //ajax stuff here
            	  
            	 $formDiv.remove();
            	 $text.replaceWith($anchor);
            	 
            	 return false;
            	 
              });
              */

	});
	
})(jQuery);