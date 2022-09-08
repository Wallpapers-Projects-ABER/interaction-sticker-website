 c_w = window.innerWidth/1920;
window.onload = function()
{
c_w = window.innerWidth/1920;
}

$(window).resize(function()
{
c_w = window.innerWidth/1920;
})
//image_values
var imgs_obj = [];
var imgs_clicked = [];
var imgs_num = -1;
var direction = 0;
var n_dir = 1;
var t_dir = 0;
var can_place = false;
var remover_activated = -1;
var random_sticker = ["chinanako","sakana","chisato1","chisato2","deto","takina1"];//["ame","aqua","calli","chinanako","sakana","chisato1","chisato2","deto","takina1"];



//set values for css
var resizing1 = 14*c_w;
document.documentElement.style.setProperty("--text_size",resizing1+"px")

var resizing2 = -210*c_w;
var resizing3 = -130*c_w;
document.documentElement.style.setProperty("--file_uploader_pos",resizing2+"px")
document.documentElement.style.setProperty("--file_uploader_text_pos",resizing3+"px")

//sticker image selector text animation
document.querySelector(".file_selector").addEventListener("mouseover",function()
{
document.querySelector(".selector_text").style.color = "#ee406b";
})

document.querySelector(".file_selector").addEventListener("mouseleave",function()
{
document.querySelector(".selector_text").style.color = "white";
})

document.querySelector(".file_selector").addEventListener("click",function()
{
document.querySelector(".selector_text").style.color = "white";
})

//custom bg selector text animation
document.querySelector(".bg_file_selector").addEventListener("mouseover",function()
{
document.querySelector(".bg_selector_text").style.color = "#ee406b";
})

document.querySelector(".bg_file_selector").addEventListener("mouseleave",function()
{
document.querySelector(".bg_selector_text").style.color = "white";
})

document.querySelector(".bg_file_selector").addEventListener("click",function()
{
document.querySelector(".bg_selector_text").style.color = "white";
})



//remover text animation
document.querySelector(".remover").addEventListener("mouseover",function()
{
    if (remover_activated == -1)
    {
    document.querySelector(".remover").style.color = "#ee406b";
    }
})

document.querySelector(".remover").addEventListener("mouseleave",function()
{
    if (remover_activated == -1)
    {
    document.querySelector(".remover").style.color = "white";
    }
})

document.querySelector(".remover").addEventListener("click",function()
{
remover_activated *= -1;
    if (remover_activated == -1)
    {
    document.querySelector(".remover").style.color = "white";
    document.querySelector(".remover").style.opacity = 0.7;
    }
    else
    {
    document.querySelector(".remover").style.transition = "color 0s";
    document.querySelector(".remover").style.color = "white";
    document.querySelector(".remover").style.opacity = 1;
    setTimeout(remover_active_anime,100);
    }
})



//random sticker text animation
document.querySelector(".random_sticker").addEventListener("mouseover",function()
{
document.querySelector(".random_sticker").style.color = "#ee406b";
})

document.querySelector(".random_sticker").addEventListener("mouseleave",function()
{
document.querySelector(".random_sticker").style.color = "white";
})

//check file selected and upload automatically
function check_file()
{
var file_value = document.getElementById("file_selector").value;
    if (file_value != "")
    {
    clearTimeout(check_file_timer);
    document.getElementById("file_selector").value = "";
    }
    else
    {
    var check_file_timer = setTimeout(check_file,300);
    }
}

//check bg file selected and upload automatically
function check_bg_file()
{
var bg_file_value = document.getElementById("bg_file_selector").value;
    if (bg_file_value != "")
    {
    clearTimeout(check_bg_file_timer);
    document.getElementById("bg_file_selector").value = "";
    }
    else
    {
    var check_bg_file_timer = setTimeout(check_bg_file,300);
    }
}

//add image sticker
$("input").change(function(e) 
{
    for(var i = 0; i < e.originalEvent.srcElement.files.length; i++) 
    {
    var file = e.originalEvent.srcElement.files[i];
    }
imgs_num ++;
imgs_obj[imgs_num] = document.createElement("img");
imgs_obj[imgs_num].style.cursor = "pointer";
imgs_obj[imgs_num].style.width = "340px";
imgs_obj[imgs_num].style.position = "absolute";
imgs_obj[imgs_num].style.display = "block";
imgs_obj[imgs_num].style.opacity = "0.4";
imgs_obj[imgs_num].style.transition = "transform 0.1s";
imgs_obj[imgs_num].style.zIndex = imgs_num;
imgs_obj[imgs_num].draggable = false;
get_mouse_dir(imgs_num);
setTimeout(placalble_now,100);
//var check_click2 = setTimeout(interacting_now,300)
imgs_clicked[imgs_num] = 1;

var reader = new FileReader();
    reader.onloadend = function() 
    {
    imgs_obj[imgs_num].src = reader.result;
    }
reader.readAsDataURL(file);
$("input").after(imgs_obj[imgs_num]);
});


function get_mouse_dir(ii)
{
    if (t_dir > 90 || t_dir < -90)
    {
    n_dir *= -1;
    }

t_dir += n_dir;
direction += (t_dir - direction)*0.1
imgs_obj[ii].style.transform = "rotate("+direction+"deg)";
var auto_dir = setTimeout(get_mouse_dir,10,ii);

    addEventListener("click",function()
    {
    direction = 0;
    clearTimeout(auto_dir);
    })
}

//interact with stickers
addEventListener("mousemove",function()
{
mouse_x = event.clientX;
mouse_y = event.clientY;
    for(var ii = 0; ii <= imgs_num; ii++)
    {
        if (imgs_clicked[ii] == 1)
        {
        imgs_obj[ii].style.left = mouse_x-150+"px";
        imgs_obj[ii].style.top = mouse_y-150+"px";
        }
    }
})

addEventListener("click",function()
{
    if (can_place == true)
    {
        for(var ii = 0; ii <= imgs_num; ii++)
        {
            if (imgs_clicked[ii] == 1)
            {
            imgs_obj[ii].style.opacity = 0;
            imgs_clicked[ii] = 0;
            var random_value = Math.floor(Math.random()*3 | 1);
            var audio = new Audio("sfx/sticker sfx_"+random_value+".mp3");
            audio.pitchShift = false;
            audio.volume = 0.2;
            audio.play();
            setTimeout(sticking_anime_1,300,ii);
            }
            else
            {
                //remover
                if (remover_activated == 1)
                {
                imgs_obj[ii].addEventListener("click",remove_sticker)
                imgs_obj[ii].param1 = ii;
                }
                else
                {
                //play sfx
                imgs_obj[ii].addEventListener("click",play_sfx);
                imgs_obj[ii].param2 = ii;
                }
            }
        console.log("clicked"+random_value);
        }
    }
})

function remove_sticker(parameter)
{
console.log("clicked remove");
var k = parameter.currentTarget.param2;
imgs_obj[k].remove();
}

function sticking_anime_1(ii)
{
imgs_obj[ii].style.transition = "opacity 1s";
imgs_obj[ii].style.opacity = 1;
}

function remover_active_anime()
{
document.querySelector(".remover").style.transition = "color 0.2s";
document.querySelector(".remover").style.color = "#ff0040";
}

function placalble_now()
{
can_place = true;
}

//play sfx easter egg
function play_sfx(evt)
{
var ii = evt.currentTarget.param1;
console.log("angle"+direction);
var target_src = imgs_obj[ii].src;

    //check image file name and play sfx
    if (target_src.includes("sakana"))
    {
    var audio = new Audio("sfx/sakana.mp3");
    audio.pitchShift = false;
    audio.volume = 0.2;
    audio.play();
    }
    
    if (target_src.includes("chinanako"))
    {
    var audio = new Audio("sfx/chinanako.mp3");
    audio.pitchShift = false;
    audio.volume = 0.2;
    audio.play();
    }
}


document.querySelector(".random_sticker").addEventListener("click",function()
{
document.querySelector(".random_sticker").style.color = "white";

var random_value = Math.floor(Math.random()*random_sticker.length | 0);
imgs_num ++;
imgs_obj[imgs_num] = document.createElement("img");
imgs_obj[imgs_num].style.cursor = "pointer";
imgs_obj[imgs_num].style.width = "340px";
imgs_obj[imgs_num].style.position = "absolute";
imgs_obj[imgs_num].style.display = "block";
imgs_obj[imgs_num].style.opacity = "0.4";
imgs_obj[imgs_num].style.transition = "transform 0.1s";
imgs_obj[imgs_num].style.zIndex = imgs_num;
imgs_obj[imgs_num].style.left = "-999px";
imgs_obj[imgs_num].draggable = false;
setTimeout(get_mouse_dir,100,imgs_num);
can_place = false;
setTimeout(placalble_now,100);
imgs_clicked[imgs_num] = 1;
imgs_obj[imgs_num].src = "imgs/"+random_sticker[random_value]+".png";
$("input").after(imgs_obj[imgs_num]);
})