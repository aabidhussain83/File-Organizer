const path=require('path')
const fs=require('fs')



function treeFn(dirPath){
    if(dirPath==undefined){
        console.log("Enter a path")
    }
    else{
        let doesExist=fs.existsSync(dirPath)
        if(doesExist==false){
            console.log("Path is not correct")
        } 
        else{
            treeHelper(dirPath,"")
        }
    }


}

function treeHelper(targetPath,indent){
    let isFile=fs.lstatSync(targetPath).isFile()

    if(isFile==true){
        let fileName=path.basename(targetPath)
        console.log(indent+"├──"+fileName)
    }
    else{
        let dirName=path.basename(targetPath)
        console.log(indent+"└──"+dirName)

        let children=fs.readdirSync(targetPath)

        for(let i=0;i<children.length;i++){
           let childPath=path.join(targetPath,children[i])
            treeHelper(childPath,indent+'\t')
        }
    }
}


module.exports={
    treeFnKey:treeFn
}