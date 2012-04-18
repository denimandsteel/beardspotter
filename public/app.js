/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * https://github.com/carhartl/jquery-cookie
 */
(function(a){a.cookie=function(b,c,d){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(c))||c===null||c===undefined)){d=a.extend({},d);if(c===null||c===undefined){d.expires=-1}if(typeof d.expires==="number"){var e=d.expires,f=d.expires=new Date;f.setDate(f.getDate()+e)}c=String(c);return document.cookie=[encodeURIComponent(b),"=",d.raw?c:encodeURIComponent(c),d.expires?"; expires="+d.expires.toUTCString():"",d.path?"; path="+d.path:"",d.domain?"; domain="+d.domain:"",d.secure?"; secure":""].join("")}d=c||{};var g=d.raw?function(a){return a}:decodeURIComponent;var h=document.cookie.split("; ");for(var i=0,j;j=h[i]&&h[i].split("=");i++){if(g(j[0])===b)return g(j[1]||"")}return null}})(jQuery);

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

//window.scrollTo(0,0);

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

  var nickname = $.cookie('nickname') || null;
  if (nickname !== null) {
    $('#nickname').val(nickname);
  }

  $('#submit-beards').click(function() {
    if($('#nickname').val() == '') {
      $('#beards').hide();
      $('#identity').show();
      $('#nickname').focus();
      return false;
    }
  });
  $('#submit-name').click(function() {
    $.cookie('nickname', $('#nickname').val(), { expires: 90, path: '/' });
    return true;
  });
});

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(function(position) {
    $('#latitude').val(position.coords.latitude);
    $('#longitude').val(position.coords.longitude);
  });
}
