<?php

//Load Composer's autoloader
require 'vendor/autoload.php';
class Principal extends Controller
{
    public function __construct() {
        parent::__construct();
        session_start();
    }
    public function index()
    {
        $data['title'] = 'SocialTech - Multipurpose eCommerce';
        $this-> views ->getView('principal', 'index', $data);
    }
    
}


