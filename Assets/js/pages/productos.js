const frm = document.querySelector('#formulario'); 
const btnNuevo = document.querySelector('#btnNuevo');
const title = document.querySelector('#title');
const nombre = document.querySelector('#nombre');
const modalRegistro = document.querySelector("#modalRegistro");
const myModal = new bootstrap.Modal(modalRegistro);

const btnModalCorreo = document.querySelector('#cambiarFiltro');
const frmCorreo = document.querySelector('#formu');

const myModal2 = new bootstrap.Modal(document.querySelector("#filtroCambiar"));
let tblEstudiantes;

const opcion1 = document.querySelector('#opcion1');
const observaciones = document.querySelector('#observaciones');
const mensaje = document.querySelector('#mensaje');
    

document.addEventListener('DOMContentLoaded', function () {
    //CARGAR DATOS CON DATATABLE
    tblEstudiantes = $('#tblEstudiantes').DataTable({
        ajax: {
            url: base_url + 'estudiantes/listar',
            dataSrc: ''
        },
        columns: [ 
            { data: 'acciones' },
            { data: 'id' },
            { data: 'nombres' },
            { data: 'correo' },
            { data: 'numero' },
            { data: 'opcion1' },
            { data: 'opcion2' },
            { data: 'edad' },
            { data: 'observaciones' },
            { data: 'rol' },
            { data: 'fecha' },
        ],
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json'
        },
        responsive: true,
        order: [[1, 'desc']]
    });

    btnNuevo.addEventListener('click', function (){
        title.textContent = 'NUEVO ESTUDIANTE';
        frm.id_estudiante.value = '';
        frm.reset();
        myModal.show();
    })
    btnModalCorreo.addEventListener('click', function(){
        frmCorreo.reset();
        myModal2.show();
    })

    frmCorreo.addEventListener('submit', function(e){
        e.preventDefault();
        
        if (frmCorreo.opcion1.value == '' || frmCorreo.observaciones.value == '' || frmCorreo.mensaje.value == '' || frmCorreo.archivos.files.length === 0) {
            AlertaPersonalizada('warning', 'TODOS LOS CAMPOS SON REQUERIDOS');
        } else {
            var formData = new FormData(frmCorreo);
    
            $.ajax({
                type: 'POST', 
                url: base_url + 'principal/correoMensaje', //aqui tengo un phpmailer para enviar un correo electronico y quiero enviar tambien el archivo
                data: formData,
                processData: false,  
                contentType: false,  
                success: function (response) {
                    alert("todo bien");
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    });

    // frmCorreo.addEventListener('submit', function(e){
    //     e.preventDefault();
    //     if (frmCorreo.opcion1.value == '' || frmCorreo.observaciones.value == '' || frmCorreo.mensaje.value == '' || frmCorreo.archivos.value == '') {
    //         AlertaPersonalizada('warning', 'TODOS LOS CAMPOS SON REQUERIDOS');
    //     } else {
    //         // const data = new FormData(frmCorreo);
    //         // const http = new XMLHttpRequest();

    //         // const url = base_url + 'principal/correoMensaje' ;

    //         // http.open("POST", url, true);
    //         // console.log(data);
    //         // http.send(data);

    //         // http.onreadystatechange = function () {

    //         //     if (this.readyState == 4 && this.status == 200) {
    //         //         console.log(this.responseText);
    //         //         // const res = JSON.parse(this.responseText);
    //         //         // AlertaPersonalizada(res.tipo, res.mensaje);
    //         //         // if (res.tipo == 'success') {
    //         //         //     frmCorreo.reset();
    //         //         //     myModal2.hide();
    //         //         // }
    //         //     }

    //         // };
    //         alert(base_url);
    //         $.ajax({
    //             type: 'GET',
    //             url: base_url + 'principal/correoMensaje', // Ajusta la URL según tu estructura
    //             data: {
    //               opcion1: $("#opcion1").val(),
    //               observaciones: $("#observaciones").val(),
    //               mensaje: $("#mensaje").val(),
    //               archivos: $("#archivos").val()
    //             },
    //             success: function (response) {
    //               // Manejar la respuesta del servidor si es necesario
    //               alert("todo bien");
    //             },
    //             error: function (error) {
    //               // Manejar errores si es necesario
    //               console.error(error);
    //             }
    //           });


    //     }
    // })


    //REGISTRAR Estudiante
    frm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (frm.nombre.value == '' || frm.apellido.value == '' || frm.correo.value == ''
            || frm.numero.value == '' || frm.opcion1.value == ''
            || frm.opcion2.value == '' || frm.edad.value == ''
            || frm.observaciones.value == '' || frm.rol.value == '') {
            AlertaPersonalizada('warning', 'TODOS LOS CAMPOS SON REQUERIDOS');
        } else {
            const data = new FormData(frm);
            const http = new XMLHttpRequest();

            const url = base_url + 'estudiantes/registrar';

            http.open("POST", url, true);

            http.send(data);

            http.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    const res = JSON.parse(this.responseText);
                    AlertaPersonalizada(res.tipo, res.mensaje);
                    if (res.tipo == 'success') {
                        frm.reset();
                        myModal.hide();
                        tblEstudiantes.ajax.reload();
                    }
                }

            };


        }

    })
    formulario.addEventListener('submit', function(e){
        e.preventDefault();
        if (observaciones.value == '' ) {
            AlertaPersonalizada('warning', 'TODOS LOS CAMPOS SON REQUERIDOS');
        } else {
            if (observaciones.value == observaciones.value) {
                AlertaPersonalizada('warning', 'YA CUENTAS CON ESTA OPCIÓN');
            } else {
                const data = new FormData(formulario);
                const http = new XMLHttpRequest();
                const url = base_url + 'estudiantes/cambiarFiltro';
                http.open("POST", url, true);
                http.send(data);
                http.onreadystatechange = function () {

                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        AlertaPersonalizada(res.tipo, res.mensaje);
                        if (res.tipo == 'success') {
                            setTimeout(() => {
                                window.location = base_url;
                            }, 1500);
                        }
                    }

                };
                
            }
            
            
        }
    })


})
function enviarCorreo() {
    const opcion1Seleccionada = opcion1.value;
    const observacionesSeleccionadas = observaciones.value;
    const mensajeTexto = mensaje.value;
    const http = new XMLHttpRequest();
    const url = base_url + 'estudiantes/enviarCorreo';
    const params = `opcion1=${opcion1Seleccionada}&observaciones=${observacionesSeleccionadas}&mensaje=${mensajeTexto}`;
    http.open("GET", `${url}?${params}`, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            AlertaPersonalizada(res.tipo, res.mensaje);
            if (res.tipo == 'success') {
                myModal2.hide();
            }
        }
    };
}

function eliminar(id) {
    const url = base_url + 'estudiantes/delete/' + id;
    eliminarRegistro('¿ESTA SEGURO DE ELIMINAR?', 'EL ESTUDIANTE NO SE ELIMINARÁ DE FORMA PERMANENTE', 'SI ELIMINAR', url, tblEstudiantes);
}
function editar(id) {
    const http = new XMLHttpRequest();

    const url = base_url + 'estudiantes/editar/' + id;

    http.open("GET", url, true);

    http.send();

    http.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            
            const res = JSON.parse(this.responseText);

            title.textContent='EDITAR ESTUDIANTE';
            frm.id_estudiante.value = res.id;
            frm.nombre.value = res.nombre;
            frm.apellido.value = res.apellido;
            frm.correo.value = res.correo;
            frm.numero.value = res.numero;
            frm.opcion1.value = res.opcion1;
            frm.opcion2.value = res.opcion2;
            frm.edad.value = res.edad;
            frm.observaciones.value = res.observaciones;
            frm.rol.value = res.rol;
            myModal.show();
            tblEstudiantes.ajax.reload();
        }
    };  
}