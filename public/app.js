/**
*
* NoClickDelay
* http://cubiq.org/
*
*/
function NoClickDelay(el) {
  this.element = el;
  if( window.Touch ) this.element.addEventListener('touchstart', this, false);
}

NoClickDelay.prototype = {
  handleEvent: function(e) {
    switch(e.type) {
      case 'touchstart': this.onTouchStart(e); break;
      case 'touchmove': this.onTouchMove(e); break;
      case 'touchend': this.onTouchEnd(e); break;
    }
  },

  onTouchStart: function(e) {
    e.preventDefault();
    this.moved = false;

    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
  },

  onTouchMove: function(e) {
    this.moved = true;
  },

  onTouchEnd: function(e) {
    this.element.removeEventListener('touchmove', this, false);
    this.element.removeEventListener('touchend', this, false);

    if( !this.moved ) {
      var theTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;

      var theEvent = document.createEvent('MouseEvents');
      theEvent.initEvent('click', true, true);
      theTarget.dispatchEvent(theEvent);
    }
  }
};

window.scrollTo(0,0);

if (
  ("standalone" in window.navigator) &&
  window.navigator.standalone
  ){
  $('body').addClass('web-app');
}
$(document).ready(function() {
  $('.beard').click(function() {
    $(this).addClass('counted');
    var $input = $('input', $(this));
    var value = parseInt($input.val()) + 1;
    $input.val(value);
    $('.count', $(this)).html(value);
  }).each(function(i, el) {
    new NoClickDelay(el);
  });
  $('.reset').click(function() {
    $(this).parents('.beard').removeClass('counted');
    $(this).siblings('.count').html('');
    $(this).siblings('input').val(0);
    return false;
  });
});

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(function(position) {
    $('#latitude').val(position.coords.latitude);
    $('#longitude').val(position.coords.longitude);
  });
}
