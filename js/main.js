

$.ajax({
    url: 'data/recommendations.json',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function(data) {
        // display 4 random items from list of 25 objects in json file
        for (i = 1; i <= 4; i++) {
           var hitsRandom = Math.floor(Math.random() * data.hits.length)                
           $(data.hits[hitsRandom]).each(function(index,value) {    
               // In order to always display 4 random items, check if image link is undefined and roll back counter by 1
               if (typeof value.image !== 'undefined') { 
                   $(value.image).each(function(idx,val) {                        
                       let productid = value.product_id;
                        const formatCurrency = (num, currency = value.currency, locale = 'en-UK') =>
                        new Intl.NumberFormat(locale, { style: 'currency', currency }).format(num);                       
                       $("#recommend_container").append('<div class="box"><img id="image0' + i + '" onclick="openModal();showProduct(`'+ productid +'`,`'+ productid +'`)" src=' + val.link + '><h5>' + value.product_name + '</h5><p>'  + formatCurrency(value.price) + '</p></div>');           
                   });
               } else {
                   i--;                           
               }
           });                                     
        }                            
    }
}); 

