// UNDERGROUND TUBE LINE //////////////////////////////////////////////////////////////////////////////////////////////////

    if(data[stationName].otherTransport === false){
      console.log("number of tube lines " + data[stationName].AssociatedTubeLines);
    }else{
      getTransportImages(data[stationName].otherTransport,"#additional-Icons");
    }

    function getTransportImages(transport,transportTypeId){
      for(var i = 0; i < data[stationName].otherTransport.length; i++ ){
          var transportSrc = transport[i];
          var transportImg = $("<img/>");
            transportImg.attr("src",transportSrc);
            $(transportTypeId).append(transportImg);
            transportImg.addClass( "transportStyle");
            transportImg.addClass('transportImg'+ i);
          }
      }
  // UNDERGROUND TUBE LINE //////////////////////////////////////////////////////////////////////////////////////////////////
