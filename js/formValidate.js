
// check for correct input fields used regExp
// check all symbol, except letter, digit or space if found returned error
// and length no more 36 symbols
function checkInput(str, input) {
  if(str.match(/[^\s\w]/gi) || str.match(/\s{2,}/gi) || str == " " || str == null || str == undefined || str.length > 36){
    input.css('background', '#ff5555');
    $('.next-step').attr('disabled', 'disabled');
  }else{
    input.css('background', '#dbab26');
    $('.next-step').removeAttr('disabled');
};
}

// listening event input name and title fields and give params to verify
(function () {
  $('input[name=name], input[name=title]').on('keyup', function(){
    checkInput($(this).val(), $(this));
  });
})();

// function
function sendData() {
  $( '.next-step' ).on('click', function () {  // get click on button next-step for submit
      // here don't use .serialize because I wanna get only fields which we can look and also
      // take name country which user check
        let name = $( 'input[name=name]' ).val(),
            title = $( 'input[name=title]' ).val(),
            thumblr = $( '#here:checked' ).val(),
            countries = document.getElementById('countries'),
            country =countries.options[countries.selectedIndex].text ;
// below we else check all field that haven't 'null' zero spaces and switch 'on'
        if(thumblr === 'on' && countries.value != null &&
         name != '' && title != ''){ // if all correct we call send function
          var state = { 'user name' : name, 'title' : title, 'country code' : countries.value, 'country' : country };
          blankPage(state);
        }else{
          return ;
        }
    });
}
sendData();

function blankPage(arg){
  // below create list where put data
      var  ul = document.createElement('ul');
      ul.style.cssText = `font-size : 1.5em; padding : 40px; list-style-type : none`;
      for(key in arg){
        var li = document.createElement('li');
        li.innerHTML = key + ' - ' + arg[key];
        ul.appendChild(li);
      }
// send data to *.php file
  $.post('/', arg)
    .done( function (data) {
    if(data.err){ // if error show it in console
      console.log(data.err);
    }else{ // if success, open blank page and put here data
      var win = window.open('about:blank', "Data");
      win.document.body.appendChild(ul);
    }
  });
};