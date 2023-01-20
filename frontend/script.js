const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');
const close_color = document.getElementById('close_color');
const color = document.getElementById('color');
const color_option = document.getElementById('product-choose-color');
const product_addon = document.getElementById('product-addon');
const addon = document.getElementById('addon');
const choose_type = document.getElementById('ctypes');
const close_addon = document.getElementById('close_addon');

// const Server = "http://15.207.71.90:3001";
const Server = "http://127.0.0.1:3001";

localStorage.removeItem("addons");
localStorage.removeItem("colors");
// var cart_value;
var addon_value;

if(bar){
    bar.addEventListener('click', ()=>{
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click', ()=>{
        nav.classList.remove('active');
    })
}


if(color){
    color.addEventListener('click', ()=>{
        color_option.style.display = 'block';
        // print("yes");
    })
}

if(close_color){
    close_color.addEventListener('click', ()=>{
        color_option.style.display = "none";
    })
}


if(addon){
    addon.addEventListener('click', ()=>{
        
    })
    
}

function addon2(){
    product_addon.style.display = 'block';
    var cart_value = parseInt(document.getElementsByClassName("price")[0].innerHTML);
    document.getElementById("cart_value").innerHTML = cart_value;
    console.log(cart_value);
    document.getElementById("rupee").innerHTML = cart_value;
}

function addon3(){
    product_addon.style.display = 'block';
    var cart_value = parseInt(document.getElementsByClassName("price")[0].innerHTML);
    document.getElementById("cart_value").innerHTML = cart_value;
    console.log(cart_value);
    document.getElementById("rupee").innerHTML = cart_value;
}

if(close_addon){
    close_addon.addEventListener('click', ()=>{
        product_addon.style.display = "none";
    })
}

function add_value(temp){
    let checkbox = document.getElementsByClassName("checkbox")[temp];
         if (checkbox.checked) {
            var cart_value = parseInt(document.getElementById("rupee").innerHTML);
            addon_value = parseInt(document.getElementsByClassName("addon_value")[temp].innerHTML);
            var total = cart_value + addon_value;
            document.getElementById("rupee").innerHTML = total;
            var addons = JSON.parse(localStorage.getItem("addons"));
            console.log(addons);
            if(addons == null)
            {
                localStorage.setItem('addons', JSON.stringify([checkbox.name]));
            }
            else{
                addons.push(checkbox.name);
                localStorage.setItem('addons', JSON.stringify(addons));
            }
         } else {
            var cart_value = parseInt(document.getElementById("rupee").innerHTML);
            addon_value = parseInt(document.getElementsByClassName("addon_value")[temp].innerHTML);
            total = cart_value-addon_value;
            document.getElementById("rupee").innerHTML = total;
            var addons = JSON.parse(localStorage.getItem("addons"));
            var i = checkEqual(addons,checkbox.name);
            addons.splice(i,1);
            localStorage.setItem('addons', JSON.stringify(addons));
         }
}

function checkEqual(arr, value){
    for(var i = 0; i < arr.length; i++){
        if(arr[i]== value){
            console.log(i);
            return i;
        }
    }
}


function change_style(temp){
    var c = document.getElementsByClassName("product-color-number")[temp];
    var flag = c.getAttribute('value');

    var color_name = document.getElementsByClassName("color_name")[temp].innerHTML;
    if(flag == 0){
        var c = document.getElementsByClassName("product-color-number")[temp];
        c.style.border = "1px solid green";
        c.setAttribute('value' , "1");

        var colors = JSON.parse(localStorage.getItem("colors"));
            console.log(colors);
            if(colors == null)
            {
                localStorage.setItem('colors', JSON.stringify([color_name]));
            }
            else{
                colors.push(color_name);
                localStorage.setItem('colors', JSON.stringify(colors));
            }
    }
    else{
        c.style.border = "none";
        c.setAttribute('value' , "0");
        var colors = JSON.parse(localStorage.getItem("colors"));
        var i = checkEqual(colors,color_name);
        colors.splice(i,1);
        localStorage.setItem('colors', JSON.stringify(colors));
    }
}



function addTo_cart(){
    data = {
        name: document.getElementById('product_name').innerHTML,
        price: document.getElementById("rupee").innerHTML,
        addons: localStorage.getItem("addons"),
        colors: localStorage.getItem("colors")
    };

    localStorage.removeItem("colors","addons");
    // localStorage.removeItem("");
    localStorage.setItem("data",JSON.stringify(data));
    window.location.href="../cart.html";
}
set_value();

function set_value(){
    var product_i=localStorage.getItem("product_id");
    var Server2 = Server + "/getProductDetail";
    var data={
        Product_id :product_i
    };

  axios
    .post(Server2, data)
    .then((res) => {
        console.log(res.data);
        var result=res.data[0];
        if(res.data[0].brand=="Small_Gift"){
            var buttons=document.getElementById("cart-button")
            buttons.innerHTML+=`<button type="button" onclick="addon3()" class="product-options" id="ctypes">
            <span>choose types</span> <i class="fa-sharp fa-solid fa-angle-down"></i>
          </button>`
        }
        else    if(res.data[0].brand=="Big_Gift"){
            var buttons=document.getElementById("cart-button")
            buttons.innerHTML+=`<button type="button" onclick="" class="product-options" id="ctypes">
            <span>Special Products</span> <i class="fa-sharp fa-solid fa-angle-down"></i>
          </button>
          <button type="button" onclick="addon3()" class="product-options" id="ctypes">
            <span>choose types</span> <i class="fa-sharp fa-solid fa-angle-down"></i>
          </button>`
        }
        document.getElementById("product_name").innerHTML=result.name;
        document.getElementById("brand_name").innerHTML=result.brand;
        for (let i = 0; i < 3; i++) {
            document.getElementsByClassName("strike-through")[i].innerHTML=parseInt(result.price)+50;            
        }
        for (let i = 0; i < 4; i++) {
            document.getElementsByClassName("price")[i].innerHTML=result.price;           
        }
        document.getElementById("cart_value_before").innerHTML=result.price;
        document.getElementById("strike").innerHTML=parseInt(result.price)+50;
        // document.getElementById("cart_value").innerHTML = result.price;
        // document.getElementById("rupee").innerHTML = result.price;
        localStorage.setItem("product")


    })
    .catch((err) => {
      console.log(err);
    });
}



