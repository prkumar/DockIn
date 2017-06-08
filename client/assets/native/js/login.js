var isEmployee = null;
// with Button named asVisitorButton
$(function() {
   $('#asVisitorButton').click(function (event) {
       isEmployee = false;
       console.log("isEmployee: "+isEmployee);
       var elem = document.getElementById("loginAs");
       elem.value = "Visitor";

   });
});

// with Button named asEmployeeButton
$(function() {
   $('#asEmployeeButton').click(function (event) {
       isEmployee = true;
       console.log("isEmployee: "+isEmployee);
       var elem = document.getElementById("loginAs");
       elem.value = "Employee";
   });
});

// with Button named loginButton
$(function() {
   $('#loginButton').click(function (event) {
       var userData = grabUserData();
       //alert(userData);
       event.preventDefault();
       if(isEmployee == null)
          errorlog.innerHTML="Please select who to login as.";
       ajaxPostUser('/api/employees/login', userData);

   });
});


// with Button named signin-bt
$(function() {
   $('#logoutButton').click(function() {
       localStorage.removeItem('userState');
       localStorage.removeItem('currentUser');
       localStorage.removeItem('currentCompany');
   });
});

//Ajax function to create a POST request to server
function ajaxPostUser(url, data){
   $.ajax({
       type: "POST",
       url: url,
       data: data,
       dataType: 'json',
       success: function(response){
           console.log(response);
           if(response.role == 'a_admin'){
             localStorage.setItem('userState' , 2);
             location.href = '/admin-dashboard.html'
           }
           else{
             localStorage.setItem('userState' , 1);
             localStorage.setItem('currentUser', JSON.stringify(response));
             ajaxGetCompanyInfo('/api/companies/' + response.company_id);
             if(isEmployee == true){
                location.href = '/visitors-employee-view.html';
            }
            else if(isEmployee == false){
                location.href = '/visitors.html';
            }
         }
       },
       error: function() {

           window.onerror=handleError();
           event.preventDefault();
           //location.href = '/login.html';
        }
   });
}
// ex) company_id : 56e8a51293a19986040e93fe
//Ajax function to create a POST request to server
function ajaxGetCompanyInfo(url){
   $.ajax({
       type: "GET",
       url: url,
       data: $('#response').serialize(),
       async: false,
       dataType: 'json',
       success: function(response){
           console.log(response);
           //alert(response.name);
           localStorage.setItem('currentCompany', JSON.stringify(response));
       }
   });
}

//Grab user data from form
function grabUserData(){
   var user = {};
   user.email = $('#username').val();
   user.password = $('#password').val();
   return user;
}



function handleError()
{
   errorlog.innerHTML="Not Valid Username and Password, please type valid one.";
   return true;
}
