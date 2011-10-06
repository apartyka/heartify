

// place any jQuery/helper plugins in here, instead of separate, slower script files.

(function($) {
	
	console.log('preplugin');
	
	$.fn.heartify = function(options) {
	    
		//default settings
		var defaults = {
			
			cssClass: {
				enabled: 'enabled',
				disabled: 'disabled'
			},
			
            attr: {
            	enabled: 'enabled',
            	disabled: 'disabled'
            },
            counter: 140
		};
		
		options = $.extend({}, defaults, options);
		
		return this.each(function() {
		    
		
			console.log('execute!');
			
			//reference the object we want to find and call heartify on
			//in this case, an anchor within a <div> w/ class='heartify'
			//var anchor = function() {
		    //    return $('<div>').find("a").attr("class", cta);
		    //};
		    
			
			var text = '<p>What do you heart?</p>'; //leave this as a jquery object, or as a string?
            
            
		    
            var $labelText = $("<p>What do you heart?</p>"),
            	$textArea = $('<textarea></textarea>'),
            	$counter = $('<span></span>'),
            	$submitBtn = $('<input type="submit" />'),
            	$formDiv = $('<div style="display: none;"></div>');
			
			var $anchor = $(this);
            
			
			
            
			$anchor.click(function(e){
				
				
				//show our form
				// $anchor.replaceWith(text);
                
				//$anchor.parent().append($formDiv);
				
				
				$formDiv.appendTo($anchor.parent());
				
				$anchor.hide();
                $formDiv.append($labelText, $textArea, $counter, $submitBtn).fadeIn();
 
                $counter.html(140);
                
                $textArea.focus();
              
                $submitBtn.attr('disabled', 'disabled').addClass('disabled');
		  
                e.preventDefault();
                //return false;
				
                console.log('click?');
                window.formDiv = $formDiv;
                
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
                
                 
			});
			
			
			
			console.log(this instanceof jQuery);
			console.log($(this) instanceof jQuery);
			//console.log($(this).attr('class'));
		    
		});
	    
	};
	
	$(document).ready(function(){
		
		console.log('pre-execute plugin');
		$('.cta').heartify();
		console.log('post-execute plugin');
		
	});
	
})(jQuery);