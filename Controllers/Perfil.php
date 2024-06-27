<?php

//Load Composer's autoloader
require 'vendor/autoload.php';
class Perfil extends Controller
{
    public function __construct() {
        parent::__construct();
        session_start();
    }
    public function index()
    {
        $data['title'] = 'Perfil';
        $data['script'] = 'perfil.js';
        $this-> views ->getView('perfil', 'login', $data);
    }
    
}


