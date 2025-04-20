
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
                            // Show SweetAlert
                            if (response == 'Failed') {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Message sending Failed!',
                                    text: 'not sent',
                                });
                            } else if (response == 'Success') {
                                $('#contactForm').trigger("reset");
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Messsage Sent Successfuly',
                                    text: 'sent',
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error!',
                                    text: 'An error occurred during the process. Please try again.',
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