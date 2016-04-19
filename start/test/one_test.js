
jQuery(document).ready(function() {

    QUnit.module('Core', {
        setup: function() {},
        teardown: function() {}
    });


    QUnit.test('Elements', function(assert) {
        assert.ok(true, 'Working');
    });

    QUnit.test('Тест функции person()', function(assert) {

var per = new person(20, "male", 60, 170, 2, 2);
assert.ok(per.weight==60, 'Проверка создания экземпляра класса');

    });
});