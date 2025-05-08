$(document).ready(function() {
    $('#contactForm').on('submit', function(e) {
      e.preventDefault(); // Prevent page reload
  
      $.ajax({
        type: 'POST',
        url: 'contact_process.php',
        data: $(this).serialize(),
        success: function(response) {
          const res = response.trim().toLowerCase();  // normalize response galing to kay gpt sana tama
  
          if (res === 'failed') {
            Swal.fire({
              icon: 'error',
              title: 'Message sending Failed!',
              text: 'Not sent',
            });
          } else if (res === 'success') {
            $('#contactForm')[0].reset();  // auto clear para walanang refresh-2x
            Swal.fire({
              icon: 'success',
              title: 'Message Sent Successfully',
              text: 'Sent',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'An unexpected error occurred. Please try again.',
            });
          }
        },
        error: function() {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'There was an issue sending your message. Please try again.',
          });
        }
      });
    });
  });
  