// JavaScript source code

//document.addEventListener("DOMContentLoaded", function () {
//    var elements = document.getElementsByTagName("INPUT");

//    for (var i = 0; i < elements.length; i++) {
//        elements[i].oninvalid = function (e) {
//            e.target.setCustomValidity("");
//            if (!e.target.validity.valid) {
//                e.target.setCustomValidity("This field cannot be left blank");
//            }
//        };
//        elements[i].oninput = function (e) {
//            e.target.setCustomValidity("");
//        };
//    }
//})

//document.addEventListener("DOMContentLoaded", function () {
//    var el = document.getElementById("selector_activity");

//        el.oninvalid = function (e) {
//            e.target.setCustomValidity("");
//            if (!e.target.validity.valid) {
//                e.target.setCustomValidity("Выберите один из пунстов списка");
//            }
//        };
//        el.oninput = function (e) {
//            e.target.setCustomValidity("");
//        };
    
//})

function show_num_info() {
    //alert("ewgtgre");
    var a_height = document.getElementById("height").value;
    var a_weight = document.getElementById("weight").value;
    var a_activity = document.getElementById("selector_activity").value;
    var a_goal = document.getElementById("selector_goal").value;
    var a_age = document.getElementById("age").value;

    var sex_m = document.getElementById("test1").checked;
    var sex_f = document.getElementById("test2").checked;
    var a_sex;
    if (sex_m)
        a_sex = "male";
    else
        a_sex = "female";

    var per = new person(a_age, a_sex, a_weight, a_height, a_activity, a_goal);
    //alert("ВЕС "+per.weight);

    per.set_energy();
    per.set_perfect_weight();
    per.set_index();
    var to_html = "Калорийность: " + per.energy.calories.toFixed(0) + " ккал <br \>" +
        "Жиры: " + per.energy.fat + " г <br \>" +
        "Белки: " + per.energy.protein + " г <br \>" +
        "Углеводы: " + per.energy.carbohydrates + " г <br \>" +
        "Вода: " + per.energy.water + " мл <br \>" +
        "<br \>" +
        "Индекс массы тела: " + per.index.toFixed(2) + " (норма: " + per.min_index + " - " + per.max_index + " )<br \>" +
        "Идеальный вес: " + per.perfect_weight.toFixed(0) + " кг<br \>";
    document.getElementById("num_info_text").innerHTML = to_html;

}

function person(t_age, t_sex, t_weight, t_height, t_activity, t_goal) {
    this.age = t_age;
    this.sex = t_sex;
    this.weight = t_weight;
    this.height = t_height;
    this.activity = t_activity;
    this.goal = t_goal;
    this.energy = {};

    this.index = 0;
    this.min_index = 0;
    this.max_index = 0;
    this.perfect_weight = 0;

    this.set_energy = function () {
        this.energy.water = 50 * this.weight;
        this.energy.fat = 1 * this.weight;
        this.energy.protein = 2 * this.weight;
        if (this.goal == 1)
            this.energy.carbohydrates = 3 * this.weight;
        if (this.goal == 2)
            this.energy.carbohydrates = 3.5 * this.weight;
        if (this.goal == 3)
            this.energy.carbohydrates = 4 * this.weight;

        this.energy.calories = 9.3 * this.energy.fat +
            4.1 * (this.energy.carbohydrates + this.energy.protein);
    }

    this.set_index = function(){
        this.index = this.weight / Math.pow((this.height / 100), 2);

        this.min_index = 19;
        if ((this.age >= 18) && (this.age <= 24))
            this.max_index = 24;
        if ((this.age >= 25) && (this.age <= 34))
            this.max_index = 25;
        if ((this.age >= 35) && (this.age <= 44))
            this.max_index = 26;
        if ((this.age >= 45) && (this.age <= 54))
            this.max_index = 27;
        if ((this.age >= 55) && (this.age <= 64))
            this.max_index = 28;
        if (this.age >= 65)
            this.max_index = 29;
    }

    this.set_perfect_weight = function () {
        if (!(this.sex.localeCompare("male")))
            this.perfect_weight = (this.height * 4.0 / 2.54 - 128.0) * 0.453;
        else {
            this.perfect_weight = (this.height * 3.5 / 2.54 - 108.0) * 0.453;
            //alert("female");
        }
    }

}