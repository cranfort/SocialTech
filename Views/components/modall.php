
<div id="modalRol" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="title"></h5>
                <button class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    
                </button> 
            </div>
            <form id="formularioHoras" autocomplete="off">
                <input type ="hidden" id="id" name ="id_usuario" >
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <label for="nombreRol">Rol</label>
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="material-icons">draw</i>
                                </span>
                                <input class="form-control" type="text" name="nombreRol" id ="nombreRol" placeholder="Ingrese aquí...." required>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label for="precioRol">Precio</label>

                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="material-icons">payments</i>
                            </span>                                     
                            <input class="form-control" type="number" name="precioRol" id ="precioRol" placeholder="Ingrese aquí...." required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-primary"  type="submit">
                        <i class="material-icons">save</i>
                        Guardar
                    </button>
                    <button class="btn btn-outline-danger" data-bs-dismiss="modal" type="button">
                        <i class="material-icons">cancel</i>
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
<div id="modalContrato" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="titleC"></h5>
                <button class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    
                </button> 
            </div>
            <form id="formularioContrato" autocomplete="off">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <label for="nombreContrato">contrato</label>
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="material-icons">draw</i>
                                </span>
                                <input class="form-control" type="text" name="nombreContrato" id ="nombreContrato" placeholder="Ingrese aquí...." required>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label for="precioContrato">Precio</label>

                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="material-icons">payments</i>
                            </span>                                     
                            <input class="form-control" type="number" name="precioContrato" id ="precioContrato" placeholder="Ingrese aquí...." required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-primary"  type="submit">
                        <i class="material-icons">save</i>
                        Guardar
                    </button>
                    <button class="btn btn-outline-danger" data-bs-dismiss="modal" type="button">
                        <i class="material-icons">cancel</i>
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>


