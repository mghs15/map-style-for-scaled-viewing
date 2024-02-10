const fs = require('fs');

const style = require('./temp.json');

const layers = style.layers;

const scale = 2;

const scaleInterpolateStyle = (expression, arr=[], scale) => {
  if(Array.isArray(expression) && expression[0] != "interpolate"){
    expression.forEach( expressionElement => {
      arr.push(scaleInterpolateStyle(expressionElement, [], scale));
    });
    return arr;
  }else if(Array.isArray(expression) && expression[0] == "interpolate"){
    
    //const expname = expression[0];
    //const interpolation = expression[1];
    //const input = expression[2];
    
    for(let i = 3; i < expression.length; i = i + 2){
      expression[i+1] = ["*", scale, expression[i+1]];
    }
    
    return expression;
    
  }else if(Array.isArray(expression) && expression[0] == "step"){
    
    for(let i = 3; i < expression.length; i = i + 2){
      expression[i] = ["*", scale, expression[i]];
    }
    
    return expression;
    
  }else{
    return expression;
  }
}

const isKeywordUsed = (expression, keyword) => {
  let _count = 0;
  if(Array.isArray(expression)){
    expression.forEach( expressionElement => {
      _count += isKeywordUsed(expressionElement, keyword);
    });
  }else{
    if(expression == keyword) _count += 1;
  }
  return _count;
}

switchConvertOperation = (expression, scale) => {
  
  console.log("--------------------------------");
  console.log(expression);
  
  const count = isKeywordUsed(expression, "interpolate") + isKeywordUsed(expression, "step");
  console.log(`<<<${count}>>>`);
  
  if(count > 0){
    return scaleInterpolateStyle(expression, [], scale);
  }else{
    return ["*", scale, expression];
  }
  
}


//テキスト形式を配列へ
layers.forEach( layer => {
  
  if(layer.paint){
    for( name in layer.paint){
      if(name.match("width")){
        const info = layer.paint[name];
        layer.paint[name] = switchConvertOperation(info, scale);
      }
      if(name.match("radius")){
        const info = layer.paint[name];
        layer.paint[name] = switchConvertOperation(info, scale);
      }
      
      if(name.match("opacity")){
        const info = layer.paint[name];
        const count = isKeywordUsed(info, "interpolate") + isKeywordUsed(info, "step");
        if(count > 0) layer.paint[name] = 1;
      }
      
    }
  }
  
  if(layer.layout){
    for( name in layer.layout){
      if(name.match("size")){
        const info = layer.layout[name];
        layer.layout[name] = switchConvertOperation(info, scale);
      }
    }
  }
  
});

const resstring = JSON.stringify(style);
fs.writeFileSync(`./docs/style.json`, resstring);

