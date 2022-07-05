function estimate()
{
    document.getElementById("form_for_estimate").style.display = 'block';
}

function get_bmi ()
{
    let wt = document.getElementById("weight").value ;
    let ht = document.getElementById("height").value;
    const bmi = (wt / Math.pow(ht,2))*10000;
    document.getElementById("show_bmi").innerHTML = bmi.toFixed(2);
}