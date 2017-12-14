

$(document).ready(function () {
    $('#edit_profile_form').on('submit', function (event) {
        event.preventDefault();
        if ($('#user_new_password').val() != '') {
            if ($('#user_new_password').val() != $('#user_re_enter_password').val()) {
                setTimeout(function () {
                    $('#error_password').html('<br><label class="alert alert-danger">Password Not Match</label>').fadeIn(1000).delay(1000).fadeOut(3000);
                });
                return false;
            }
            else {
                $('#error_password').html('');
            }
        }
        $('#edit_prfile').attr('disabled', 'disabled');
        var form_data = $(this).serialize();
        $('#user_re_enter_password').attr('required', false);
        $.ajax({
            url: "edit_profile.php",
            method: "POST",
            data: form_data,
            success: function (data) {
                $('#edit_prfile').attr('disabled', false);
                $('#user_new_password').val('');
                $('#user_re_enter_password').val('');
                setTimeout(function () {
                    $('#message').html(data).fadeIn(1000).delay(1000).fadeOut(3000);
                });

            }
        })
    });
});