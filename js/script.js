(function($) {

	$(document).ready(function(){
	  
            var $anchor  = $('.cta'),
                $labelText = $('<p>What do you heart?</p>'),
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
            	
            	$anchor.hide();
            	
            	$formDiv.appendTo($anchor.parent());

                $formDiv.append($labelText, $textArea, $counter, $submitBtn).fadeIn();
 
                $counter.html(140);
                
                $textArea.val('').focus();
              
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
               - ajax call to submit the textArea.val() to a results <div>
               - detach form elements, restore $anchor to its original visual state
              
             */
              
              $submitBtn.click(function(e) {
            	 
            	 $.ajax({ 
	        		 type: 'POST',
	        		 url: 'index.html',
	        		 datatype: 'html',
	        		 //data: data,
	        		 success: function() { 
	        			 
	        			 //on success, write data to a new html element that is appended to <div class="result />
	        			 var data = $textArea.val();
	        			 var $resultDiv = $('.result');
	        			 
	        			 $resultDiv.html(function() {
	        				
	        				 var html = $('<p>' + data + '</p>');
	        				    
	        				 html.appendTo(this);
	        				    
	        			});

	        			 
	        			//console.log(data);
	        			//this is what we were doin before...
	        			//$resultDiv.html(data); 
	        			 
	        			$formDiv.detach().css( { 'display' : 'none' } );
	            		 
	        			$anchor.fadeIn();
	            		    
	        			//console.log( "Ajax call complete.");
	        		 }
	        	 });
            	  
            	 e.preventDefault();
            	 
            	 //console.log('submit click!');
            	 
              });

	});
	
})(jQuery);