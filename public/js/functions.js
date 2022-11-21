function saveUser() {

    $username = $('#username').val();
    $name = $('#first_name').val();
    $email = $('#email').val();
    $password = $('#password').val();
    $confirmPassword = $('#confirm_password').val();

    if ($('#terms_and_conditions').is(':checked')) {
        $.ajaxSetup({
            headers:
                { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });

        $.ajax({
            type: "POST",
            url: '/register',
            data: { username: $username, name: $name, email: $email, password: $password, confirmPassword: $confirmPassword },
            success: function (response) {
                console.log(response);
                $('#register_form').hide()
                $('#register_form').removeClass("show");
                $('#continue_req').show();
                $('#continue_req').addClass("show");
            },
            error: function (response) {
                console.log(response.responseText)
                toastr.error(response.responseText, 'Error!');
            }
        });
    } else {
        toastr["error"]("You need to agree to terms and conditions!", "Error!");
    }
}

function continueRegistration() {
    $('#continue_req').hide();
    $('#continue_req').removeClass("show");
    $('#additional_info').show();
    $('#additional_info').addClass("show");


}

function saveAdditionalInformation() {

    $address1 = $('#address_1').val();
    $address2 = $('#address_2').val();
    $city = $('#city').val();
    $postal_code = $('#postal_code').val();
    $phone = $('#phone').val();
    $bonus_code = $('#bonus_code').val();
    $country=$('#country').val();

    $.ajaxSetup({
        headers:
            { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
    });

    $.ajax({
        type: "POST",
        url: '/address',
        data: { address1: $address1, address2: $address2, country:$country, city: $city, postal_code: $postal_code, phone_num: $phone, bonus_code: $bonus_code},
        success: function (response) {
            $('#additional_info').hide();
            $('#additional_info').removeClass("show");
            $('#thank_you').show();
            $('#thank_you').addClass("show");
        },
        error: function (response) {
            console.log(response.responseText)
            toastr.error(response.responseText, 'Error!');
        }
    });

}

