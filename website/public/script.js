
// Setting up tfjs with the model we downloaded
tf.loadLayersModel('Js_Model/model.json')
    .then(function (model) {
        window.model = model;
        console.log(model)
    });


// let scaler = new dfd.StandardScaler();
// console.log(scaler)  
// var ele = scaler.fit([19,27.900,0])
// console.log(ele)
// console.log(scaler.transform(ele))


// function getStandardDeviation (array) {
//     const n = array.length
//     const mean = array.reduce((a, b) => a + b) / n
//     return Math.sqrt(array.map(x => Math.pow(x , 2)).reduce((a, b) => a + b) / n)
// }

// function mean(array){
//     const n = array.length
//     const mean_val = array.reduce((a, b) => a + b) / n
//     return mean_val
// }

// const arr = [19,27.900,0]
// const sd = getStandardDeviation([19,27.9,0])
// const mean_val_cal = mean([19,27.9,0])
// console.log(sd,mean_val_cal)

// const zScore = (27.9-mean_val_cal)/sd;
// const temp = []
// for(var i =0;i<3;i=i+1)
// {
//     temp.push((arr[i]-mean_val_cal)/sd);
// }
// temp.push(1)
// temp.push(0)
// console.log(temp)



// Predict function
var predict = function (input) {
    if (window.model) {
        window.model.predict([tf.tensor(input)])
            .array().then(function (scores) {
              console.log(scores)
            });
    } else {
  
        // The model takes a bit to load, 
        // if we are too fast, wait
        setTimeout(function () { predict(input) }, 50);
    }
}

const input = [[-1.43876426,-0.45332,-0.90861367,1,0]]
predict([input])