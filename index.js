const request = require('request');
const express= require('express');
const fs = require('fs');
const cheerio = require('cheerio');
var url;
var title, release, rating;
var json={title: "",release: "",rating: "",image:""};
var og={title:"",type:"",image:"",url:"",description:"",imageHeight:"",imageWidth:"",audio:"",siteName:"",locale:"",localeAlternate:"",video:"",rating:"",year:""}
const app=express()
app.use(express.json());

//Post request to get url
app.post('/scrape',(req,res)=>{

  url=req.body.url;
  res.send("done");
})


//get request to parse url to obtain data
app.get('/scrape',(req,res)=>{

  request(url,function(error,response,html){
    var $=cheerio.load(html);

    title = $('meta[property="og:title"]').attr('content')

    if(title){og.title=title}
    
    
    else{$(".TitleBlock__TitleContainer-sc-1nlhx7j-1").filter(function(){
      var data=$(this);
      title=data.children().eq(1).text();
 
      og.title=title;
    })}
    
    type = $('meta[property="og:type"]').attr('content')
    if(type){og.type=type}

    image = $('meta[property="og:image"]').attr('content')
    if(image){og.image=image}


    else{image=$(".ipc-image").attr('src')
    json.image=image;}

    url = $('meta[property="og:url"]').attr('content')
    if(url){og.url=url}

    description = $('meta[property="og:description"]').attr('content')
    if(description){og.description=description}

    imageHeight = $('meta[property="og:image:height"]').attr('content')
    if(imageHeight){og.imageHeight=imageHeight}

    imageWidth = $('meta[property="og:image:width"]').attr('content')
    if(imageWidth){og.imageWidth=imageWidth}

    audio = $('meta[property="og:audio"]').attr('content')
    if(audio){og.audio=audio}

    siteName = $('meta[property="og:site_name"]').attr('content')
    if(siteName){og.siteName=siteName}

    locale = $('meta[property="og:locale"]').attr('content')
    if(locale){og.siteName=locale}

    localeAlternate = $('meta[property="og:locale:alternate"]').attr('content')
    if(localeAlternate){og.localeAlternate=localeAlternate}

    video = $('meta[property="og:video"]').attr('content')
    if(video){og.video=video}


    rating=$(".AggregateRatingButton__RatingScore-sc-1ll29m0-1").text();
    og.rating=rating;
  
 
    year=$(".ipc-inline-list.ipc-inline-list--show-dividers.TitleBlockMetaData__MetaDataList-sc-12ein40-0.dxizHm.baseAlt").filter(function(){
      var dat=$(this)
      year=dat.children().eq(1).text();
   
      og.year=year;
      

    })

    //write the data into a new file called output.json
    fs.writeFile("output.json",JSON.stringify(og,null,4),function(err){
      console.log("done");
    })
    ;
  
   
    
  })

})


//port
app.listen(5000,function(){
  console.log("Listening on port 5000");
})



