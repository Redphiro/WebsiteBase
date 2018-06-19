<?php

/*
 * PHP Main Stuff
 * TriForce - Matías Silva
 *
 * This file calls the main PHP utilities and sets the main template ones
 * also you can extend the functions below with your own ones
 * 
 */

//Get the PHP utilities file
require_once('resources/php/utilities.php');

//Call the main class
class php extends utilities\php 
{ 
	//Main header data
	public static function get_html_data($type)
    {
		switch($type){
			case 'lang': 
				return get_bloginfo('language'); 
				break;
			case 'charset': 
				return get_option('blog_charset'); 
				break;
			case 'title': 
				return get_option('blogname'); 
				break;
			case 'description': 
				return get_option('blogdescription'); 
				break;
			case 'keywords': 
				return get_option('blogkeywords'); 
				break;
			case 'author': 
				return get_option('blogauthor'); 
				break;
			case 'mobile-capable': 
				return 'yes'; 
				break;
			case 'viewport': 
				return 'width=device-width, initial-scale=1, user-scalable=no'; 
				break;
			case 'nav-color': 
				return get_option('blognavcolor'); 
				break;
			case 'nav-color-apple': 
				return get_option('blognavcolorapple'); 
				break;
			default: break;
		}
	}
	
	//Get extra code section
	public static $section_code = array();

	public static function section($name, $type)
	{
		if(!isset(self::$section_code[$name])){
			self::$section_code[$name] = null; 
		}
		if($type == 'start'){
			return ob_start();
		}
		elseif($type == 'end'){
			return self::$section_code[$name] .= ob_get_clean();
		}
		elseif($type == 'get'){
			return self::$section_code[$name];
		}
	}
	
	//Get main CSS & JS files
	public static function get_template($type, $get = null)
    {
		$url = get_bloginfo('template_url');
		$append = $get != null ? $get : '';
		$route = $type == 'css' ? 'css/style' : 'js/app';
		$ext = $type == 'css' ? '.css' : '.js';
		$file = $url.'/'.$route;
		
		if(php::is_localhost())
		{
			if(file_exists($route.$ext))
			{
				unlink($route.$ext);
			}
			echo $file.'.php'.$append;
		}
		else
		{
			if(isset($_GET['rebuild']))
			{
				if(file_exists($route.$ext))
				{
					if(strcmp(php::get_page_code($file.'.php'.$append), file_get_contents($route.$ext)) !== 0)
					{
						unlink($route.$ext);
					}
					header('Location: '.$url);
				}
			}
			if(!file_exists($route.$ext))
			{
				file_put_contents($route.$ext, php::get_page_code($file.'.php'.$append));
			}
			echo $file.$ext;
		}
	}
}

/*
 * Custom Stuff
 * 
 * You can set-up custom stuff or add more functions
 * More resources in http://php.net/manual
 * 
 */
