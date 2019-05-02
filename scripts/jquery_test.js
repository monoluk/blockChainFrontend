/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let $title2 = $("#title2");



$("#title2-button").click(function(){    
if($title2.css("color")==="rgb(255, 255, 0)")
{$title2.css("color", "black");}
else
{$title2.css("color", "yellow");}
});

$("#title3-button").click(function(){
    $(".open-sign-image").animate({left:'700px', opacity:'0'});
});



