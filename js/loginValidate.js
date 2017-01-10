function getTimeZone() {
    var nome = "";
    var time = new Date().toTimeString().split(" ");
    for (var i = 2; i < time.length; i++) {
        if (i != time.length + 1 && i > 2) {
            nome += " ";
        }
        nome += time[i];
    }
    nome = nome.replace("(", "").replace(")", "");
    return nome;
};

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validLogin(){
    var email = $('#email').val();
    var password = $('#password').val();
    var error = false;
    if(email == "" || !validateEmail(email)){
        error = true;
        $('#email')[0].style.backgroundColor = '#912d2c';
    } else {
        $('#email')[0].style.backgroundColor = '';
    }
    if(password == ""){
        error = true;
        $('#password')[0].style.backgroundColor = '#912d2c';
    } else {
        $('#password')[0].style.backgroundColor = '';
    }

    if(!error){
        login(email, password)
    }

}

function login(email, password){
  $.post('/login', {email: email, password: password})
    .done(function(data){
      if(data.err){
        console.log(data.err);
        $('#email')[0].style.backgroundColor = '#912d2c';
        $('#password')[0].style.backgroundColor = '#912d2c';
      }else {
        localStorage.setItem('username', email);
        window.location.href = '/';
      }
    })
    .fail(function(err){
      // TODO: if not able to connect to the backend API.
    });
};
