// PAGE FUNCTIONS
//handle action
$('.page-signin_link').click( function(e){
    e.preventDefault();
	$('.page-formSignUp').hide();
	$('.page-formSignIn').show();
	$('.page-signUpBlock').css('display','block');
	$('.page-signInBlock').css('display','none');
});
$('.page-signup_link').click( function(e){
    e.preventDefault();
	$('.page-formSignUp').show();
	$('.page-formSignIn').hide();
	$('.page-signInBlock').css('display','block');
	$('.page-signUpBlock').css('display','none');
});
