
            // JavaScript to handle form submission using AJAX
            $(document).ready(function() {
                $('#contactForm').on('submit', function(e) {
                    e.preventDefault(); // Prevent the form from submitting traditionally
    
                    // Send the form data via AJAX
                    $.ajax({
                        type: 'POST',
                        url: 'contact_process.php',
                        data: $(this).serialize(),
                        success: function(response) {
                            // Show SweetAlert based on the PHP response
                            if (response == 'Failed') {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Monggoloid kaba?!',
                                    text: 'not saved',
                                });
                            } else if (response == 'Success') {
                                $('#contactForm').trigger("reset");
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Sign Up Successful',
                                    text: 'saved',
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error!',
                                    text: 'An error occurred during sign up. Please try again.',
                                });
                            }
                        },
                        error: function() {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error!',
                                text: 'There was an issue with your request. Please try again.',
                            });
                        }
                    });
                });
            });