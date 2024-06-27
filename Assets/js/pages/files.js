const btnUpload = document.querySelector('#btnUpload');
const btnNuevaCarpeta = document.querySelector("#btnNuevaCarpeta");
const modalFile = document.querySelector("#modalFile");
const myModal = new bootstrap.Modal(modalFile);

const modalCarpeta = document.querySelector("#modalCarpeta");
const myModal1 = new bootstrap.Modal(modalCarpeta);
const frmCarpeta = document.querySelector('#frmCarpeta');

const btnSubirArchivo = document.querySelector('#btnSubirArchivo');
const file = document.querySelector('#file');

const modalCompartir = document.querySelector("#modalCompartir");
const myModal2 = new bootstrap.Modal(modalCompartir);
const id_carpeta = document.querySelector('#id_carpeta');

const carpetas = document.querySelectorAll('.carpetas');
const btnSubir = document.querySelector('#btnSubir');
//Ver ARCHIVOS Carpetas
const btnVer = document.querySelector('#btnVer');

//COMPARTIR ARCHIVOS 
const compartir = document.querySelectorAll('.compartir');
const modalUsuarios = document.querySelector("#modalUsuarios");
const myModalUser = new bootstrap.Modal(modalUsuarios);
const frmCompartir = document.querySelector('#frmCompartir');
const usuarios = document.querySelector('#usuarios');


const btnCompartir = document.querySelector('#btnCompartir');
const container_archivos = document.querySelector('#container_archivos');
const btnVerDetalle = document.querySelector('#btnVerDetalle');
const content_acordeon = document.querySelector('#accordionFlushExample');

//ELIMINAR ARCHIVOS 
const eliminar = document.querySelectorAll('.eliminar');

let container_progress = document.querySelector('#container_progress');



document.addEventListener('DOMContentLoaded', function () {
    btnUpload.addEventListener('click', function () {
        myModal.show();
    })

    btnNuevaCarpeta.addEventListener('click', function () {
        myModal.hide();
        myModal1.show();
    })

    frmCarpeta.addEventListener('submit', function (e) {
        e.preventDefault();
        if (frmCarpeta.nombre.value == '') {
            AlertaPersonalizada('warning', 'EL NOMBRE ES REQUERIDO');

        } else {
            const data = new FormData(frmCarpeta);
            const http = new XMLHttpRequest();
            const url = base_url + 'admin/crearcarpeta';
            http.open("POST", url, true);
            http.send(data);
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    AlertaPersonalizada(res.tipo, res.mensaje);
                    if (res.tipo == 'success') {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    }
                }
            };
        }
    })

    //SUBIR ARCHIVOS
    btnSubirArchivo.addEventListener('click', function () {
        myModal.hide();
        file.click();
    })

    file.addEventListener('change', function (e) {
        console.log(e.target.files[0]);
        const data = new FormData();
        data.append('id_carpeta', id_carpeta.value);
        data.append('file', e.target.files[0]);
        const http = new XMLHttpRequest();
        const url = base_url + 'admin/subirarchivo';
        http.upload.addEventListener('progress', function(e){
        let porcentaje = (e.loaded / e.total) * 100;
        container_progress.innerHTML = `<div class="progress">
        <div class="progress-bar" role="progressbar" style="width: ${porcentaje.toFixed(0)}%;" aria-valuenow="${porcentaje.toFixed(0)}" aria-valuemin="0" aria-valuemax="100">${porcentaje.toFixed(0)}%</div>
        </div>`;
        
        })
        http.addEventListener('load', function(){
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        })
        http.open("POST", url, true);
        http.send(data);
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                const res = JSON.parse(this.responseText);
                AlertaPersonalizada(res.tipo, res.mensaje);
                
            }
        };

    })

    carpetas.forEach(carpeta => {
        carpeta.addEventListener('click', function (e) {
            id_carpeta.value = e.target.id;
            myModal2.show();
        })

    })
    //SUBIR ARCHIVO 
    btnSubir.addEventListener('click', function () {
        myModal2.hide();
        file.click();
    })

    btnVer.addEventListener('click', function () {
        window.location = base_url + 'admin/ver/' + id_carpeta.value;
    })

    $(".js-states").select2({
        theme: 'bootstrap-5',
        placeholder: 'Ingrese el correo',
        maximumSelectionLength: 2,
        minimumInputLength: 2,
        dropdownParent: $('#modalUsuarios'),
        ajax: {
            url: base_url + 'archivos/getUsuarios',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data) {
                return {
                    results: data
                };
            },
            cache: true
        },
    });


    compartir.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            compartirArchivo(e.target.id);
        })
    });

    frmCompartir.addEventListener('submit', function (e) {
        e.preventDefault();
        if (usuarios.value == '') {
            AlertaPersonalizada('warning', 'TODOS LOS CAMPOS SON REQUERIDOS');
        } else {
            const data = new FormData(frmCompartir);
            const http = new XMLHttpRequest();
            const url = base_url + 'archivos/compartir';
            http.open("POST", url, true);
            http.send(data);
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    const res = JSON.parse(this.responseText);
                    AlertaPersonalizada(res.tipo, res.mensaje);
                    if (res.tipo == 'success') {
                        $('.js-states').val(null).trigger('change');
                        myModalUser.hide();
                    }
                }
            };
        }
    })

    // Compartir Archivos x carpeta
    btnCompartir.addEventListener('click', function () {
        verArchivos();
    })

    //Ver Detalle Compartido
    btnVerDetalle.addEventListener('click', function(){
        window.location = base_url + 'admin/verdetalle/' + id_carpeta.value;
    })

    //ELIMINAR ARCHIVO RECIENTE  
    eliminar.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            let id = e.target.getAttribute('data-id');
            const url = base_url + 'archivos/eliminar/' + id;
            eliminarRegistro('¿ESTA SEGURO DE ELIMINAR?', 'EL ARCHIVO SE ELIMINARÁ DE FORMA PERMANENTE EN 30 DÍAS', 'SI ELIMINAR', url, null);

        })
    });


})
function compartirArchivo(id) {
    const http = new XMLHttpRequest();
    const url = base_url + 'archivos/buscarCarpeta/' + id;
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            id_carpeta.value = res.id_carpeta;
            content_acordeon.classList.add('d-none');
            container_archivos.innerHTML = `<input type="hidden"  value = "${res.id}" name="archivos[]"></div>`;
            myModalUser.show();
        }
    };
}

function verArchivos() {
    const http = new XMLHttpRequest();
    const url = base_url + 'archivos/verArchivos/' + id_carpeta.value;
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            let html = '';
            if (res.length > 0) {
                content_acordeon.classList.remove('d-none');
                res.forEach(archivo => {
                    html += `<div class="form-check">
                        <input class="form-check-input" type="checkbox" value="${archivo.id}"
                        name="archivos[]" id="flexCheckDefault_${archivo.id}">
                        <label class="form-check-label" for="flexCheckDefault_${archivo.id}">
                            ${archivo.nombre}
                        </label>
                    </div>`;
                });
                //cargarDetalle(id_carpeta.value);
            } else {
                html =`<div class="alert alert-custom alert-indicator-right indicator-warning" role="alert">
                    <div class="alert-content">
                        <span class="alert-title">Warning!</span>
                        <span class="alert-text">Carpeta Vacía</span>
                    </div>
                </div>`;
            }
            container_archivos.innerHTML = html;
            myModal2.hide();
            myModalUser.show();
        }
    };
}
