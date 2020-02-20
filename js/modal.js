// Get DOM Elements
const modal = document.querySelector('#my-modal');
const closeBtn = document.querySelector('.close');

// Events
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  $(".slideshow-container").html("");  
  $("#variation-container").html("");        
  $("#size-container").html("");        
  modal.style.display = 'block';   
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    closeModal();
  }
}

function showProduct(productid, prodid) {
    $.ajax({
        url: 'data/product.json',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data) {
           $(data.data).each(function(index,value) {  
               let pid = productid.substr(0,6);
               let variant = prodid;
               
               if (pid === value.id) {    
                       $(value.variants).each(function(i,v) {   
                            if (v.product_id === variant) {                        

                        $(value.image_groups[0]).each(function(idx,val) {  
                       $(val.images).each(function(i,v) {   
                            $(".slideshow-container").append('<div class="mySlides fade"><img src=' + v.link + ' style="width:100%"></div>'); 
                        });           
   
                   });             
                                
                   
                   $(value.image_groups[0]).each(function(idx,val) {  
                       $(val.images).each(function(i,v) {   
                            $(".slideshow-container").append('<div class="mySlides fade"><img src=' + v.link + ' style="width:100%"></div>'); 
                        });           
   
                   });
                   
                   $(value.image_groups[1]).each(function(idx,val) {  
                       $(val.images).each(function(i,v) {   
                            $("#variation-container").append('<div><img src=' + v.link + ' style="width:12%; padding: 4px; border:1px solid"></div>'); 
                        });          
                   }); 
                   
                   $(value.variation_attributes[1]).each(function(idx,val) {  
                       $(val.values).each(function(i,v) {  
                           $("#size-container").append('<div class="item">'+v.value+'</div>'); 
                        });          
   
                   });                    
                   
//                    document.getElementById('pid').innerHTML = value.id;
                    document.getElementById('pname').innerHTML = value.name;
                   
                    const formatCurrency = (num, currency = value.currency, locale = 'en-UK') =>
                        new Intl.NumberFormat(locale, { style: 'currency', currency }).format(num);                   
                    document.getElementById('pprice').innerHTML = formatCurrency(value.price);                   
                   
                    $(".slideshow-container").append('<a class="prev" onclick="plusSlides(-1)">&#10094;</a>');
                    $(".slideshow-container").append('<a class="next" onclick="plusSlides(1)">&#10095;</a>');
                    showSlides(1);                             
                            }
                        });           

        
               }                               
           });  
        }
    }); 
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";                
  }

  slides[slideIndex-1].style.display = "block"; 
    console.log(slideIndex-1);
}
