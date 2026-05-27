var inputNum = document.getElementById("inputNum");

document.getElementById("btnA").addEventListener("click", () => {
    //alert("I got clicked!")
    inputNum.style.backgroundColor = "green";
    alert('You picked ' + inputNum.value);
})