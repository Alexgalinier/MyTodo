<?php

class Helper 
{
    private static $images = null;
    private static $imagesBase64 = null;
    
    public static function init() 
    {
        if (static::$images === null) {
            static::$images = array(
                "url('images/bg.png')",
                'src="images/delete_32x32.png"',
                'src="images/delete_16x16.png"',
                'src="images/edit.png"',
                'images/checkbox_checked.png',
                'images/checkbox_unchecked.png'
            );

            static::$imagesBase64 = array(
                'url(data:image/png;base64,'.base64_encode(file_get_contents(__DIR__.'/images/bg.png')).')',
                'src="data:image/png;base64,'.base64_encode(file_get_contents(__DIR__.'/images/delete_32x32.png')).'"',
                'src="data:image/png;base64,'.base64_encode(file_get_contents(__DIR__.'/images/delete_16x16.png')).'"',
                'src="data:image/png;base64,'.base64_encode(file_get_contents(__DIR__.'/images/edit.png')).'"',
                'data:image/png;base64,'.base64_encode(file_get_contents(__DIR__.'/images/checkbox_checked.png')),
                'data:image/png;base64,'.base64_encode(file_get_contents(__DIR__.'/images/checkbox_unchecked.png'))
            );
        }
    }

    public static function getCss() 
    {
        static::init();
        $cssFilesContent = file_get_contents(__DIR__.'/css/styles.css');
        $cssFilesContent = str_replace(static::$images, static::$imagesBase64, $cssFilesContent);

        echo '
            <style>
                '.$cssFilesContent.'
            </style>
            ';
    }

    public static function getJS() 
    {
        static::init();
        $jsFilesContent = static::concatFiles(__DIR__.'/js/*.js');
        $jsFilesContent = str_replace(static::$images, static::$imagesBase64, $jsFilesContent);   
        
        echo '
            <script>
                '.$jsFilesContent.'
            </script>
            ';
    }

    private static function concatFiles($filesPattern)
    {
        $concatFiles = '';
        foreach (glob($filesPattern) as $filename) {
            $concatFiles .= file_get_contents($filename);
        }

        return $concatFiles;
    }
}


