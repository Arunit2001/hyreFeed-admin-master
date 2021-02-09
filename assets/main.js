let selectElement = document.getElementById("selectType");
selectElement.addEventListener('change', (event) => {
    let options=document.getElementById("options");
    let questionText=document.getElementById("questionText");
    let expected=document.getElementById("expected");
    // let image=document.getElementById("pick-image");
    if(event.target.value=="none"){
        expected.classList.add("d-none");
        options.classList.add("d-none");
        questionText.classList.add("d-none");
        // image.classList.add("d-none");
    }
    if(event.target.value=="mcq"){
        expected.classList.add("d-none");
        options.classList.remove("d-none");
        questionText.classList.remove("d-none");
        // image.classList.add("d-none");
    }
    if(event.target.value=="subjective"){
        expected.classList.remove("d-none");
        questionText.classList.remove("d-none");
        options.classList.add("d-none");
        // image.classList.add("d-none");
    }
    if(event.target.value=="audio"){
        questionText.classList.remove("d-none");
        options.classList.add("d-none");
        expected.classList.remove("d-none");
        // image.classList.remove("d-none");

    }
    if(event.target.value=="end"){
        questionText.classList.remove("d-none");
        expected.classList.remove("d-none");
        options.classList.add("d-none");
        // image.classList.add("d-none");
    }
});
let selectElement2 = document.getElementById("selectType2");
selectElement2.addEventListener('change', (event) => {
    let options=document.getElementById("options2");
    let questionText=document.getElementById("questionText2");
    let expected=document.getElementById("expected2");
    // let image=document.getElementById("pick-image2");
    if(event.target.value=="none"){
        expected.classList.add("d-none");
        options.classList.add("d-none");
        questionText.classList.add("d-none")
        // image.classList.add("d-none");
    }
    if(event.target.value=="mcq"){
        expected.classList.add("d-none");
        options.classList.remove("d-none");
        questionText.classList.remove("d-none");
        // image.classList.add("d-none");
    }
    if(event.target.value=="subjective"){
        expected.classList.remove("d-none");
        questionText.classList.remove("d-none");
        options.classList.add("d-none");
        // image.classList.add("d-none");
    }
    if(event.target.value=="audio"){
        questionText.classList.remove("d-none");
        options.classList.add("d-none");
        // image.classList.remove("d-none");
        expected.classList.remove("d-none");
    }
    if(event.target.value=="end"){
        questionText.classList.remove("d-none");
        expected.classList.remove("d-none");
        options.classList.add("d-none")
        // image.classList.add("d-none");
    }
});
let selectElement3 = document.getElementById("selectType3");
selectElement3.addEventListener('change', (event) => {
    let options=document.getElementById("options3");
    let questionText=document.getElementById("questionText3");
    let expected=document.getElementById("expected3");
    // let image= document.getElementById("pick-image3");
    if(event.target.value=="none"){
        expected.classList.add("d-none");
        options.classList.add("d-none");
        questionText.classList.add("d-none")
        // image.classList.add("d-none");
    }
    if(event.target.value=="mcq"){
        expected.classList.add("d-none");
        options.classList.remove("d-none");
        questionText.classList.remove("d-none");
        // image.classList.add("d-none");
    }
    if(event.target.value=="subjective"){
        expected.classList.remove("d-none");
        questionText.classList.remove("d-none");
        options.classList.add("d-none");
        // image.classList.add("d-none");
    }
    if(event.target.value=="audio"){
        questionText.classList.remove("d-none");
        options.classList.add("d-none");
        expected.classList.remove("d-none");
        // image.classList.remove("d-none");
    }
    if(event.target.value=="end"){
        questionText.classList.remove("d-none");
        expected.classList.remove("d-none");
        options.classList.add("d-none");
        // image.classList.remove("d-none");
    }
});
console.log("hello hello");