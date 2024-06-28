<?php
class Empresas extends Controller
{
    public function __construct() {
        parent::__construct();
        session_start();
    }
    public function index()
    {
        $data['title'] = 'Empresas';
        $this-> views ->getView('empresas', 'index', $data);
    }
    
}