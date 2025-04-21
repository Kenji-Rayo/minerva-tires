$(document).ready(function () {
    $('#adminLoginForm').on('submit', function (e) {
      e.preventDefault();
  
      const $btn = $(this).find('.login-btn');
      $btn.prop('disabled', true).text('Logging in...');
  
      $.ajax({
        type: 'POST',
        url: 'adminlogin_process.php',
        data: $(this).serialize(),
        success: function (response) {
          const res = response.trim().toLowerCase();
  
          if (res === 'success') {
            Swal.fire({ icon: 'success', title: 'Login Successful!', showConfirmButton: false, timer: 1200 })
              .then(() => window.location.href = '../dashboard/admin.html');
          } else {
            Swal.fire({ icon: 'error', title: 'Login Failed!', text: 'Invalid email or password.' });
          }
        },
        error: function () {
          Swal.fire({ icon: 'error', title: 'Error', text: 'Request failed. Try again.' });
        },
        complete: function () {
          $btn.prop('disabled', false).text('Login');
        }
      });
    });
  });
  