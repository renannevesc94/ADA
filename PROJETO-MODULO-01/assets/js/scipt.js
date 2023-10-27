(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  document.getElementById("meuForm").addEventListener("submit", function (event) {
    if (!this.checkValidity()) {
        event.preventDefault(); // Impede o envio do formulário se a validação falhar
    } else {
        // Abre o modal se a validação estiver OK
        let myModal = new bootstrap.Modal(document.getElementById("modal-submit"), {
            backdrop: 'static',
            keyboard: false
        });
        myModal.show();
    }
});