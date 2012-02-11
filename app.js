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

$(document).ready(function() {
  window.scrollTo(0,0);
  //var theTap = document.getElementById('one');
  $('.beard').each(function(i, el) {
    new NoClickDelay(el);
  });

  $('.beard').click(function() {
    $(this).addClass('counted');
    var $count = $('.count', $(this));
    var value = parseInt($count.html());
    if (isNaN(value)) {
      value = 0;
    }
    $count.html(value + 1);
  });
  $('.reset').click(function() {
    $(this).parent().parent().removeClass('counted');
    $(this).siblings('.count').html('');
    return false;
  });
  $('.submit').click(function() {
    $('.beard').removeClass('counted');
    $('.count').html('');
  });
});
