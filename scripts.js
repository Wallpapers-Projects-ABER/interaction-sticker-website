var view_width = window.innerWidth;
c_w = view_width/1920;
window.onload = function()
{
c_w = view_width/1920;
}

$(window).resize(function()
{
c_w = view_width/1920;
})
//image_values
var imgs_obj = [], imgs_clicked = [], imgs_num = -1, direction = 0, n_dir = 1, t_dir = 0, can_place = false, remover_activated = -1, already_exists_background = false;
var background_img = -4, random_bg_n = -4;
var random_sticker = ["chinanako","sakana","chisato1","chisato2","deto","takina1"];//["ame","aqua","calli","chinanako","sakana","chisato1","chisato2","deto","takina1"];
var random_sticker_2 = ["elaina1","elaina2","elaina3","elaina4"];


//set values for css
var resizing0 = 14*c_w;
document.documentElement.style.setProperty("--text_size",resizing0+"px")

var resizing1 = 20*c_w;
document.documentElement.style.setProperty("--text_box_size",resizing1+"px")

document.documentElement.style.setProperty("--page_height",window.innerHeight+"px")
var resizing2 = -210*c_w;
var resizing3 = -130*c_w;
document.documentElement.style.setProperty("--file_uploader_pos",resizing2+"px")
document.documentElement.style.setProperty("--file_uploader_text_pos",resizing3+"px")

//sticker image selector text animation
document.querySelector(".file_selector").addEventListener("mouseover",function()
{
document.querySelector(".selector_text").style.color = "#ff5647";
document.querySelector(".selector_text").style.background= "white";
document.querySelector(".selector_text").style.transition = "width 0.6s";
document.querySelector(".selector_text").style.width = "320px";
})

document.querySelector(".file_selector").addEventListener("mouseleave",function()
{
document.querySelector(".selector_text").style.color = "black";
document.querySelector(".selector_text").style.background = "none";
document.querySelector(".selector_text").style.transition = "width 0s";
document.querySelector(".selector_text").style.width = "0px";
})

document.querySelector(".file_selector").addEventListener("click",function()
{
document.querySelector(".selector_text").style.color = "black";
document.querySelector(".selector_text").style.background = "none";
document.querySelector(".selector_text").style.transition = "width 0s";
document.querySelector(".selector_text").style.width = "0px";
})

//custom bg selector text animation
document.querySelector(".bg_file_selector").addEventListener("mouseover",function()
{
document.querySelector(".bg_selector_text").style.color = "#ff5647";
document.querySelector(".bg_selector_text").style.background= "white";
document.querySelector(".bg_selector_text").style.transition = "width 0.6s";
document.querySelector(".bg_selector_text").style.width = "320px";
})

document.querySelector(".bg_file_selector").addEventListener("mouseleave",function()
{
document.querySelector(".bg_selector_text").style.color = "black";
document.querySelector(".bg_selector_text").style.background = "none";
document.querySelector(".bg_selector_text").style.transition = "width 0s";
document.querySelector(".bg_selector_text").style.width = "0px";
})

document.querySelector(".bg_file_selector").addEventListener("click",function()
{
document.querySelector(".bg_selector_text").style.color = "black";
document.querySelector(".bg_selector_text").style.background = "none";
document.querySelector(".bg_selector_text").style.transition = "width 0s";
document.querySelector(".bg_selector_text").style.width = "0px";
})



//remover text animation
document.querySelector(".remover").addEventListener("mouseover",function()
{
    if (remover_activated == -1)
    {
    document.querySelector(".remover").style.color = "#ff5647";
    document.querySelector(".remover").style.background= "white";
    document.querySelector(".remover").style.transition = "width 0.6s";
    document.querySelector(".remover").style.width = "320px";
    }
})

document.querySelector(".remover").addEventListener("mouseleave",function()
{
    if (remover_activated == -1)
    {
    document.querySelector(".remover").style.color = "black";
    document.querySelector(".remover").style.background = "none";
    document.querySelector(".remover").style.transition = "width 0s";
    document.querySelector(".remover").style.width = "0px";
    }
})

document.querySelector(".remover").addEventListener("click",function()
{
remover_activated *= -1;
    if (remover_activated == -1)
    {
    document.querySelector(".remover").style.color = "black";
    }
    else
    {
    document.querySelector(".remover").style.transition = "color 0s";
    document.querySelector(".remover").style.color = "white";
    setTimeout(remover_active_anime,100);
    }
document.querySelector(".remover").style.background = "none";
document.querySelector(".remover").style.transition = "width 0s";
document.querySelector(".remover").style.width = "0px";
})



//random sticker text animation
document.querySelector(".random_sticker").addEventListener("mouseover",function()
{
document.querySelector(".random_sticker").style.color = "#ff5647";
document.querySelector(".random_sticker").style.background= "white";
document.querySelector(".random_sticker").style.transition = "width 0.6s";
document.querySelector(".random_sticker").style.width = "320px";
})

document.querySelector(".random_sticker").addEventListener("mouseleave",function()
{
document.querySelector(".random_sticker").style.color = "black";
document.querySelector(".random_sticker").style.background = "none";
document.querySelector(".random_sticker").style.transition = "width 0s";
document.querySelector(".random_sticker").style.width = "0px";
})






//random background text animation
document.querySelector(".random_background").addEventListener("mouseover",function()
{
document.querySelector(".random_background").style.color = "#ff5647";
document.querySelector(".random_background").style.background= "white";
document.querySelector(".random_background").style.transition = "width 0.6s";
document.querySelector(".random_background").style.width = "320px";
})

document.querySelector(".random_background").addEventListener("mouseleave",function()
{
document.querySelector(".random_background").style.color = "black";
document.querySelector(".random_background").style.background = "none";
document.querySelector(".random_background").style.transition = "width 0s";
document.querySelector(".random_background").style.width = "0px";
})

document.querySelector(".random_background").addEventListener("click",function()
{
    if (already_exists_background == true)
    {
    background_img.remove();
    }

var random_bg = (Math.random()*5 | 0);
if (random_bg == 0)
{
random_bg = 4;
}
random_bg_n = random_bg;
console.log("random_bg"+random_bg);

background_img = document.createElement("video");
background_img.src = "videos/wallpaper_background"+random_bg+".mp4"
background_img.autoplay = true;
background_img.controls = false;
background_img.loop = true;
background_img.style.width = view_width+"px";
background_img.style.zIndex = 1;
background_img.style.position = "absolute";
background_img.style.top = 0;
background_img.style.left = 0;
background_img.draggable = false;
background_img.style.display = "block";
background_img.style.opacity = "1";
$("input").after(background_img);

already_exists_background = true;
})

//check file selected and upload automatically
function check_file()
{
var file_value = document.getElementById("file_selector").value;
    if (file_value != "")
    {
    clearTimeout(check_file_timer);
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
    }
    else
    {
    var check_bg_file_timer = setTimeout(check_bg_file,300);
    }
}

//add image sticker
$("input").change(function(e)
{
var input_file = document.getElementById("file_selector").value;
var input_file_bg = document.getElementById("bg_file_selector").value;
console.log("input");
    for(var i = 0; i < e.originalEvent.srcElement.files.length; i++) 
    {
    var file = e.originalEvent.srcElement.files[i];
    }
    
var reader = new FileReader();
    reader.onloadend = function() 
    {
        if (input_file != "")
        {
        imgs_obj[imgs_num].src = reader.result;
        }
        else
        {
        background_img.src = reader.result;
        }
    }
reader.readAsDataURL(file);
console.log("file"+reader.result);
    //sticker
    if (input_file != "")
    {
    imgs_num ++;
    imgs_obj[imgs_num] = document.createElement("img");
    imgs_obj[imgs_num].style.cursor = "pointer";
    imgs_obj[imgs_num].style.width = "200px";
    imgs_obj[imgs_num].style.position = "absolute";
    imgs_obj[imgs_num].style.display = "block";
    imgs_obj[imgs_num].style.opacity = "0.4";
    imgs_obj[imgs_num].style.transition = "transform 0.1s";
    imgs_obj[imgs_num].style.zIndex = imgs_num+10;
    imgs_obj[imgs_num].draggable = false;
    get_mouse_dir(imgs_num);
    setTimeout(placalble_now,100);
    //var check_click2 = setTimeout(interacting_now,300)
    imgs_clicked[imgs_num] = 1;
    $("input").after(imgs_obj[imgs_num]);
    }
    else
    {
        if (already_exists_background == true)
        {
        background_img.remove();
        }
    
        if (input_file_bg.includes(".mp4") || input_file_bg.includes(".avi"))
        {
        background_img = document.createElement("video");
        background_img.autoplay = true;
        background_img.controls = false;
        background_img.loop = true;
        console.log("video");
        }
        else
        {
        background_img = document.createElement("img");
        }
    background_img.style.width = view_width+"px";
    background_img.style.zIndex = 1;
    background_img.style.position = "absolute";
    background_img.style.top = 0;
    background_img.style.left = 0;
    background_img.draggable = false;
    background_img.style.display = "block";
    background_img.style.opacity = "1";
    $("input").after(background_img);
    }
document.getElementById("file_selector").value = "";
document.getElementById("bg_file_selector").value = "";
already_exists_background = true;
})




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
        imgs_obj[ii].style.left = mouse_x-100+"px";
        imgs_obj[ii].style.top = mouse_y-100+"px";
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
            //click interaction
            imgs_obj[ii].addEventListener("click",sticker_interaction);
            imgs_obj[ii].param1 = ii;
            }
        console.log("clicked"+random_value);
        }
    }
})

function sticking_anime_1(ii)
{
imgs_obj[ii].style.transition = "opacity 1s";
imgs_obj[ii].style.opacity = 1;
}

function remover_active_anime()
{
document.querySelector(".remover").style.transition = "color 0.2s";
document.querySelector(".remover").style.color = "#ff004c";
}

function placalble_now()
{
can_place = true;
}

//play sfx easter egg
function sticker_interaction(evt)
{
var ii = evt.currentTarget.param1;
console.log("angle"+direction);

    if (remover_activated == 1)
    {
    console.log("clicked remove");
    imgs_obj[ii].remove();
    }
    else
    {
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
}


document.querySelector(".random_sticker").addEventListener("click",function()
{
document.querySelector(".random_sticker").style.color = "black";


imgs_num ++;
imgs_obj[imgs_num] = document.createElement("img");
imgs_obj[imgs_num].style.cursor = "pointer";
imgs_obj[imgs_num].style.width = "200px";
imgs_obj[imgs_num].style.position = "absolute";
imgs_obj[imgs_num].style.display = "block";
imgs_obj[imgs_num].style.opacity = "0.4";
imgs_obj[imgs_num].style.transition = "transform 0.1s";
imgs_obj[imgs_num].style.zIndex = imgs_num+10;
imgs_obj[imgs_num].style.left = "-999px";
imgs_obj[imgs_num].draggable = false;
setTimeout(get_mouse_dir,100,imgs_num);
can_place = false;
setTimeout(placalble_now,100);
imgs_clicked[imgs_num] = 1;
if (random_bg_n == 2 || random_bg_n == 4)
{
var random_value = Math.floor(Math.random()*random_sticker_2.length | 0);
imgs_obj[imgs_num].src = "imgs/"+random_sticker_2[random_value]+".png";
}
else
{
var random_value = Math.floor(Math.random()*random_sticker.length | 0);
imgs_obj[imgs_num].src = "imgs/"+random_sticker[random_value]+".png";
}
$("input").after(imgs_obj[imgs_num]);
})