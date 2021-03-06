﻿// JavaScript source code

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

function cards_to_same_size() {
    var element1 = document.getElementById('food_info');
    var element2 = document.getElementById('sport_info');
    var style1 = element1.currentStyle || window.getComputedStyle(element1, null);
    var style2 = element2.currentStyle || window.getComputedStyle(element2, null);
    var h1 = +style1.height.slice(0,-2);
    var h2 = +style2.height.slice(0, -2);
    var max = Math.max(h1, h2);
    element1.style.height = max + 'px';
    element2.style.height = max + 'px';
}



function show_all_info() {
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


    per.show_num_info(per);
    per.show_food_program();


    var sport = new sport_activity(a_age, a_sex, a_weight, a_height, a_activity, a_goal);
    sport.show_sport_program();
    cards_to_same_size();

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
        var act_k_pr = 1;
        var act_k_car = 1;

        if (this.activity == 1) { act_k_pr = 0.8; act_k_car = 0.8; }
        if (this.activity == 2) { act_k_pr = 0.9; act_k_car = 0.9; }
        if (this.activity == 3) { act_k_pr = 1.0; act_k_car = 1.0; }
        if (this.activity == 4) { act_k_pr = 1.0; act_k_car = 1.25; }
        if (this.activity == 5) { act_k_pr = 1.0; act_k_car = 1.5; }

        this.energy.water = 50 * this.weight;
        this.energy.fat = 1 * this.weight;
        this.energy.protein = 2 * act_k_pr * this.weight;
        if (this.goal == 1)
            this.energy.carbohydrates = 3 * this.weight * act_k_car;
        if (this.goal == 2)
            this.energy.carbohydrates = 3.5 * this.weight * act_k_car;
        if (this.goal == 3)
            this.energy.carbohydrates = 4 * this.weight * act_k_car;

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

    this.show_num_info = function ( per ) {
        per.set_energy();
        per.set_perfect_weight();
        per.set_index();
        var to_html = "Калорийность: " + per.energy.calories.toFixed(0) + " ккал " +
            "<ul>" +
            "<li>Жиры: " + per.energy.fat.toFixed(0) + " г </li>" +
            "<li>Белки: " + per.energy.protein.toFixed(0) + " г </li>" +
            "<li>Углеводы: " + per.energy.carbohydrates.toFixed(0) + " г </li>" +
            "</ul>" +
            "Вода: " + per.energy.water + " мл <br \>" +
            "<br \>" +
            "Индекс массы тела: " + per.index.toFixed(2) + " (норма: " + per.min_index + " - " + per.max_index + " )<br \>" +
            "Идеальный вес: " + per.perfect_weight.toFixed(0) + " кг<br \>";
        document.getElementById("num_info_text").innerHTML = to_html;
    }

    this.write_food_program = function () {
        var fat = this.energy.fat;
        var pr = this.energy.protein;
        var cur = this.energy.carbohydrates;

        var egg_white_one = new product (0, 0, 3.6);
        var egg_yolk_one = new product(4.51, 0, 2.7);
        var chicken_breast = new product(2, 0, 23);
        var olive_oil = new product(100, 0, 0);
        var groats = new product(0, 72, 0);
        var vegetables = new product(0, 5.5, 0);
        var apple_one = new product(0, 19.6, 0);
        var cottage_cheese = new product( 0, 3.3, 18);
        var nuts = new product(57, 16, 18);

        //жиры
        // желтки
        var f = fat / 4.0 / egg_yolk_one.fat;
        egg_yolk_one.count = +f.toFixed(0);
        fat -= egg_yolk_one.count * egg_yolk_one.fat;
        pr -= egg_yolk_one.count * egg_yolk_one.pr;
        //масло
        f = fat / 2.0 / olive_oil.fat * 100.0;
        olive_oil.count = +f.toFixed(0);
        fat -= olive_oil.count * olive_oil.fat / 100.0;
        //орехи
        f = fat / nuts.fat * 100.0;
        nuts.count = +f.toFixed(0);
        pr -= nuts.count * nuts.pr / 100.0;
        cur -= nuts.count * nuts.cur / 100.0;

        //белки
        //творог
        cottage_cheese.count = 200.0;
        pr -= cottage_cheese.count * cottage_cheese.pr / 100.0;
        cur -= cottage_cheese.count * cottage_cheese.cur / 100.0;
        //яичные белки
        f = pr / 3.0 / egg_white_one.pr;
        egg_white_one.count = +f.toFixed(0);
        pr -= egg_white_one.count * egg_white_one.pr;
        //курица
        f = pr / chicken_breast.pr * 100.0 / 10.0;
        chicken_breast.count = +f.toFixed(0) * 10.0;

        //угли
        //яблоко
        apple_one.count = 1.0;
        cur -= apple_one.count * apple_one.cur;
        //овощи
        vegetables.count = 500.0;
        cur -= vegetables.count * vegetables.cur / 100.0;
        //крупы
        f = cur / groats.cur * 100.0 / 10.0;
        groats.count = +f.toFixed(0) * 10.0;

        var result = "<ul>" +
            "<li>крупы (рис, гречка, овсянка): " + groats.count + "г в сухом виде </li>" +
            "<li>овощи (капуста, помидоры, огурцы): " + vegetables.count + "г </li>" +
            "<li>яблоко (среднее, 200г): " + apple_one.count + "шт </li>" +
            "<li>куриная грудка (нежирное мясо/рыба): " + chicken_breast.count + "г в готовом виде <br \>" +
            "<li>яичные желтки: " + egg_yolk_one.count + "шт </li>" +
            "<li>яичные белки: " + (egg_white_one.count) + "шт </li>" +
            "<li>миндаль (или другие орехи): " + nuts.count + "г </li>" +
            "<li>оливковое (или льняное) масло: " + olive_oil.count + "г </li>" +
            "<li>творог: " + cottage_cheese.count + "г </li>" +
            "</ul>";
        return result;
    }

    this.show_food_program = function () {
        to_html = "Продукты на день: "+
            this.write_food_program()+
            "<br \>Рекомендации: " +
            "<ul>" +
            "<li>Разделите этот набор продуктов на 5-6 приемов пищи по своему желанию; </li>" +
            "<li>Фрукты ешьте в первой половине дня; </li>" +
            "<li>Старайтесь не употреблять угдеводы за 2-3 часа до сна; " +
            "<li>На ночь сьешьте творог для обеспечения организма долгим белком во время сна.</li>" +
            "</ul>";
        document.getElementById("food_info_text").innerHTML = to_html;
    }

}


function product(fat, cur, pr) {
    this.fat= fat;
    this.cur = cur;
    this.pr = pr;
    this.count = 0;
}



function sport_activity(a_age, a_sex, a_weight, a_height, a_activity, a_goal) {
    this.age = a_age;
    this.sex = a_sex;
    this.weight = a_weight;
    this.height = a_height;
    this.activity = a_activity;
    this.goal = a_goal;
    this.energy = {};


    this.get_sport_program = function()
    {
        var program = "";
        this.index = this.weight / Math.pow((this.height / 100), 2); // ИМТ
        if (this.index < 19 && this.goal == 1)
        {
                program = "В вашем случае похудение не рекомендуется!<br \>"
            + "Выберите другую цель.";
        }
        else {
            program = "Тренировка на неделю: ";
            if (this.sex == "male")
            {
                program += 
            "<br \>A: Тренировка груди и спины" +
            "<ul>" +
            "<li> Жим штанги лёжа (грудь)</li>" +
            "<li> Тяга штанги в наклоне (спина)</li>" +
            "<li> Шраги со штангой стоя (трапеции)</li>" +
            "<li> Гиперэкстензия без веса</li>" +
            "</ul>" +
            "B: Тренировка рук" +
            "<ul>" +
            "<li> Сгибание рук стоя со штангой(бицепсы)</li>" +
            "<li> Жим штанги лёжа (трицепсы)</li>" +
            "<li> Жим станги сидя (плечи)</li>" +
            "<li> Весы на перекладине</li>" +
            "</ul>" + 
            "С: Тренировка ног и пресса" +
            "<ul>" +
            "<li> Приседания со штангой</li>" +
            "<li> Сгибание рук стоя</li>" +
            "<li> Обратные скручивания в висе</li>" +
            "</ul>";

                program += 
                "<br \> Общая информация: " +
                "<ul>" +
                "<li>Перед тренировкой разминка 5-10 минут </li>" +
                "<li>Упражнения состоят из 2 разминочных подхода по 10 повторений  ";
                if (this.goal == 1 || this.goal == 2)
                    program += "и 3 рабочих подхода по 7-8 повторений </li>";
                else program += "и 4 рабочих подхода по 8-10 повторений </li>";
            program += "</ul>";
            }
            if (this.sex == "female")
            {
                program +=
            "<br \>A: Тренировка ног" +
            "<ul>" +
            "<li> Велосипед</li>" +
            "<li> Приседания со штангой</li>" +
            "<li> Жим ногами</li>" +
            "<li> Выпады</li>" +
            "<li> Сгибание ног</li>" +
            "<li> Подъём на носки</li>";
                if (this.goal == 1 || this.goal == 2)
                    program += "<li> Дорожка 25 мин</li>";
            program +="</ul>" +
            "B: Тренировка спина-грудь-трицепсы" +
            "<ul>" +
            "<li> Становая тяга</li>" +
            "<li> Тяга вертикального блока к груди</li>" +
            "<li> Гиперэкстензия</li>" +
            "<li> Жим штанги узким хватом</li>" +
            "<li> Жим на наклонной скамье</li>" +
            "</ul>" +
            "С: Тренировка руки-плечи" +
            "<ul>" +
            "<li> Подъём штанги на бицепс</li>" +
            "<li> Жим штанги узким хватом</li>" +
            "<li> Жим гантели сидя</li>" +
            "<li> Тяга штанги к подбородку</li>";
            if (this.goal == 1 || this.goal == 2)
                program += "<li> Дорожка 20 мин</li>";
            program += "</ul>";

            if (this.goal == 1 || this.goal == 2)
                program += "<br \> Уделить один день аэробным нагрузкам (1 час): плавание | быстрая ходьба<br \>"
            program +=
            "<br \> Общая информация: " +
            "<ul>" +
            "<li>Перед тренировкой разминка 5-10 минут </li>";
            if (this.goal == 1 || this.goal == 2)
                program += "<li>Упражнения состоят из 3 подхода по 15 повторений;</li>";
            else program += "<li>Упражнения состоят из 4 подхода по 12 повторений;</li>";
            program += "</ul>";
            }
            program += "<ul>" +
            "<li>Отдых между тренировками - 1-2 дня;</li>" +
            "<li>Отдых между подходами - 2 мин;</li>" +
            "<li>Программу необходимо согласовать с тренером;</li>" +
            "<li>Программу желательно менять каждые несколько месяцев; </li>" +
            "<li>Вес подбирается индивидуально.</li>" +
            "</ul>";
            }
        return program;
    }

    this.show_sport_program = function () {
        to_html = this.get_sport_program();
           
        document.getElementById("sport_info_text").innerHTML = to_html;
    }
}