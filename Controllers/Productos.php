<?php
class Productos extends Controller
{
    private $id_usuario, $correo;
    public function __construct() {
        parent::__construct();
        session_start();
        ###Validar Sesion
    }
    public function index(){
        $data['title'] = 'Productos';
        $data['script'] = 'productos.js';
        $this -> views -> getView('productos ', 'index', $data);
    }
    
    public function wishlist(){
        $data['title'] = 'Lista de deseados';
        $data['script'] = 'productos.js';
        $this -> views -> getView('productos ', 'wishlist', $data);
    }
    
    public function comparar() {  
        $data['title'] = 'Comparar productos';
        $this ->views->getView('productos', 'compare', $data);
    }

    
    
}   