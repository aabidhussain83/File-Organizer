const path=require('path')
const fs=require('fs')




let types={
    video:['mp4','mkv'],
    audio:['mp3','wav','aif'],
    image:['jpeg','png','gif'],
    archives:['zip','rar','iso'],
    documents:['pdf','txt','xlsx','odp','docx'],
    app:['exe','pkg']
}


function organizeFn(dirPath){
    // console.log('Organize Function Implemented')
 
    let destPath;
 
    if(dirPath==undefined){
       console.log("Please enter a Directory Path")
       return;
    }
    else{
        let doesExist = fs.existsSync(dirPath)
        //console.log(doesExist)
 
        if(doesExist==true){
            //2. create a organized file directory
 
            destPath=path.join(dirPath,'organized_files')
 
            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath)
            }
            else{
                console.log("The Folder Already Exists")
            }
        }else{
            console.log("Please enter a valid Path ");
        }
    }
 
   organizeHelper(dirPath,destPath);
 }
 
 
 function organizeHelper(src,dest){
 
     let childNames=fs.readdirSync(src);    //return as array
     //console.log(childNames);
 
     for(let i=0;i<childNames.length;i++){
         let childAddress=path.join(src,childNames[i])
         let isFile=fs.lstatSync(childAddress).isFile()          //checking whether child is file 
 
         if(isFile==true){
             let fileCategory=getCategory(childNames[i])
            // console.log(childNames[i] +" belongs to "+ fileCategory)
 
            sendFile(childAddress,dest,fileCategory)
 
         }
     }
 
 }
 
 function getCategory(name){
     let ext=path.extname(name)
     //console.log(ext)
 
     ext=ext.slice(1)
 
     for(type in types){
         let cTypeArr=types[type]
        // console.log(cTypeArr)
 
         for(let i=0;i<cTypeArr.length;i++){
             if(ext==cTypeArr[i])
                return type
         }
 
     }
 
     return "others"
 
 }
 
 
 function sendFile(srcFilePath,dest,fileCategory){
     let catPath=path.join(dest,fileCategory)
 
     if(fs.existsSync(catPath)==false){
         fs.mkdirSync(catPath)
     }
 
     let fileName=path.basename(srcFilePath)
     let destFilePath=path.join(catPath,fileName)
 
     fs.copyFileSync(srcFilePath,destFilePath)
 
     console.log(fileName+" copied to "+destFilePath)
 
     fs.unlinkSync(srcFilePath)
 
 
 }


 module.exports={
     organizeFnKey:organizeFn
 }