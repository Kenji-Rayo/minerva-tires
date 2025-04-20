$(document).ready(function () {
    $('.login-form').on('submit', function (e) {
      e.preventDefault(); // ✅ Prevent traditional form submission
  
      $.ajax({
        type: 'POST',
        url: 'register-process.php',
        data: $(this).serialize(),
        success: function (response) {
          if (response.trim() === 'Success') {
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'Your account has been created.',
            }).then(() => {
                // 🔥 REDIRECT after alert is closed
                window.location.href = 'login-admin.html';
            });
            $('.login-form')[0].reset();           // 🔥 reset the form
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text: response.trim(),
            });
          }
        },
        error: function () {
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Something went wrong. Please try again.',
          });
        }
      });
    });
  });
  