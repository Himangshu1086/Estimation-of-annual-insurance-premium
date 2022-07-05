// Requiring module
const express = require("express");
var bodyParser = require('body-parser');
const app = express();
const path = require("path")
const PORT = 3000
const tf  = require("@tensorflow/tfjs")

// Set public as static directory
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/view'))



// Use ejs as template engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var bodyParserEncoded = bodyParser.urlencoded({ extended: false }); 



// Render home template
app.get('/',(req,res)=>{
  res.render('home')
})




const mean_var = require("./mean_variance.json")
// console.log(mean_var)

function zScore(mean , variance , element)
{
    return (element - mean )/Math.sqrt(variance);
}



app.post('/predict',bodyParserEncoded, async(req, res) => {

  const age_zs = zScore( mean_var.mean['0'],mean_var.variance[0],req.body.age);
  const bmi_zs = zScore( mean_var.mean['1'],mean_var.variance[1],req.body.bmi);
  const child_zs = zScore( mean_var.mean['2'],mean_var.variance[2],req.body.children);

  const input = [age_zs,bmi_zs,child_zs, req.body.smoke , req.body.sex]

 await tf.loadLayersModel('http://localhost:3000//Js_Model/model.json')
.then(function (model) {
 const scores =  model.predict([tf.tensor([input])]).arraySync()
 console.log(scores[0][0])
 res.render('predict' , {data:[req.body.age,req.body.bmi,req.body.children, req.body.smoke , req.body.sex] , result:Math.round(scores[0][0])})
});

});







// Server setup
app.listen(PORT, () => {
  console.log(`The server started running on port ${PORT}`) 
});