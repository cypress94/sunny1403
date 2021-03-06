﻿//jQuery(document).ready(function() {

//QUnit.module('Core', {
//        setup: function() {},
//        teardown: function() {}
//    });

QUnit.test("Тест функции person()", function() {

    var a_height = 170;
    var a_weight = 60;
    var a_activity = 2;
    var a_goal = 1;
    var a_age = 20;
    var a_sex = "male";

var per = new person(a_age, a_sex, a_weight, a_height, a_activity, a_goal);
ok(per.weight==a_weight, 'Проверка создания экземпляра класса');

});

QUnit.test("Тест функции person.set_energy() for standart example", function() {

var per = new person(20, "male", 60, 170, 2, 2);
per.set_energy();
equal(per.energy.calories, 1775.6999999999998, 'Стандартный пример');

});


QUnit.test("Тест функции person.set_energy() for female", function() {

var per = new person(20, "female", 60, 170, 2, 2);
per.set_energy();
equal(per.energy.calories, 1775.6999999999998, 'Другой пол');
});

QUnit.test("Тест функции person.set_energy() for another activity", function() {

var per = new person(20, "male", 60, 170, 4, 2);
per.set_energy();
equal(per.energy.calories, 2126.25, 'Больше тренировок');

});


QUnit.test("Тест функции person.set_index() for standart example", function() {

var per = new person(20, "male", 60, 170, 2, 2);
per.set_index();
equal(per.max_index, 24, 'Стандартный пример');
});

QUnit.test("Тест функции person.set_index() for female", function() {
var per = new person(20, "female", 60, 170, 2, 2);
per.set_index();
equal(per.max_index, 24, 'Другой пол');
});

QUnit.test("Тест функции person.set_index() for older person", function() {
var per = new person(30, "male", 60, 170, 2, 2);
per.set_index();
equal(per.max_index, 25, 'Старше');

});

QUnit.test("Тест функции person.set_index() for another activity", function() {

var per = new person(20, "male", 60, 170, 4, 2);
per.set_index();
equal(per.max_index, 24, 'Больше тренировок');

});




QUnit.test("Тест функции person.set_perfect_weight() for standart example", function() {

var per = new person(20, "male", 60, 170, 2, 2);
per.set_perfect_weight();
equal(per.perfect_weight, 63.29159055118111, 'Стандартный пример');
});

QUnit.test("Тест функции person.set_perfect_weight() for female", function() {
var per = new person(20, "female", 60, 170, 2, 2);
per.set_perfect_weight();
equal(per.perfect_weight, 57.19214173228347, 'Другой пол');
});

QUnit.test("Тест функции person.set_perfect_weight() for older person", function() {
var per = new person(30, "male", 60, 170, 2, 2);
per.set_perfect_weight();
equal(per.perfect_weight, 63.29159055118111, 'Старше');

});

QUnit.test("Тест функции person.set_perfect_weight() for another activity", function() {

var per = new person(20, "male", 60, 170, 4, 2);
per.set_perfect_weight();
equal(per.perfect_weight, 63.29159055118111, 'Больше тренировок');

});




// write_food_program
// product

//});
