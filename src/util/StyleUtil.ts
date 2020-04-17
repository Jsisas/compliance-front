export function concatStyles(...str: string[]){
    let classNames: string = "";
    str.forEach((style: string, index: number) => {
        if(index === str.length-1){
            classNames = classNames.concat(style)
        }else{
            classNames = classNames.concat(style).concat(" ")
        }
    })
    console.log(classNames);
    return classNames;
}