const fs=require('fs')
const path=require('path')
const helpModuleObj=require('./commands/help')
const treeModuleObj=require('./commands/tree')
const organizeModuleObj=require('./commands/organize')

// let input=process.argv[2]
// console.log(input)

let inputArr=process.argv.slice(2)
//console.log(inputArr)


let command=inputArr[0]



switch(command){
    case 'tree':
        treeModuleObj.treeFnKey(inputArr[1])
        break;
    
    case 'organize':
        organizeModuleObj.organizeFnKey(inputArr[1])
        break;
    
    case 'help':
        helpModuleObj.helpFnKey()
        break;
    
    default :
        console.log("Please enter a valid command ")
        break;
}






